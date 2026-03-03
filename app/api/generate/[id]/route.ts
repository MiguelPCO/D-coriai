import { NextResponse } from "next/server"
import Replicate from "replicate"
import { createClient } from "@/lib/supabase/server"

/** Extrae una URL de string del output de Replicate (string | string[] | FileOutput[]) */
function extractOutputUrl(output: unknown): string | null {
  if (typeof output === "string" && output.startsWith("http")) return output
  if (Array.isArray(output) && output.length > 0) {
    const first = output[0]
    if (typeof first === "string") return first
    // FileOutput object (Replicate SDK v1+)
    if (first && typeof first === "object" && "url" in first) {
      const url = (first as { url: unknown }).url
      return typeof url === "function" ? (url as () => string)() : String(url)
    }
  }
  return null
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data: generation } = await supabase
    .from("generations")
    .select("*")
    .eq("id", id)
    .single()

  if (!generation) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  // Ya resuelta en DB — devolver directamente
  if (generation.status !== "processing") {
    return NextResponse.json({
      status: generation.status,
      outputImageUrl: generation.output_image_url,
    })
  }

  // Sin replicate_id aún (race condition entre insert y update)
  if (!generation.replicate_id) {
    return NextResponse.json({ status: "processing" })
  }

  // Consultar estado en Replicate
  try {
    const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN! })
    const prediction = await replicate.predictions.get(generation.replicate_id)

    if (prediction.status === "succeeded") {
      const replicateUrl = extractOutputUrl(prediction.output)

      if (!replicateUrl) {
        await supabase
          .from("generations")
          .update({ status: "failed", error_message: "Sin URL de salida" })
          .eq("id", id)
        return NextResponse.json({ status: "failed" })
      }

      // Re-subir a Supabase Storage para URL permanente (las de Replicate expiran)
      let outputImageUrl = replicateUrl // fallback si falla el re-upload

      try {
        const imgResponse = await fetch(replicateUrl)
        const imgBlob = await imgResponse.blob()
        const outputPath = `${generation.user_id}/output-${generation.id}.webp`

        const { error: storageError } = await supabase.storage
          .from("generations")
          .upload(outputPath, imgBlob, {
            contentType: "image/webp",
            upsert: true,
          })

        if (!storageError) {
          const {
            data: { publicUrl },
          } = supabase.storage.from("generations").getPublicUrl(outputPath)
          outputImageUrl = publicUrl
        }
      } catch {
        // Usar URL de Replicate como fallback (expira en ~1h)
      }

      await supabase
        .from("generations")
        .update({ status: "completed", output_image_url: outputImageUrl })
        .eq("id", id)

      return NextResponse.json({ status: "completed", outputImageUrl })
    }

    if (
      prediction.status === "failed" ||
      prediction.status === "canceled"
    ) {
      await supabase
        .from("generations")
        .update({
          status: "failed",
          error_message: (prediction.error as string | null) ?? "La generación falló",
        })
        .eq("id", id)
      return NextResponse.json({ status: "failed" })
    }

    // Todavía en cola o procesando
    return NextResponse.json({ status: "processing" })
  } catch {
    // Error transitorio — no marcar como fallido, el cliente reintentará
    return NextResponse.json({ status: "processing" })
  }
}
