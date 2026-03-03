import { NextResponse } from "next/server"
import Replicate from "replicate"
import { createClient } from "@/lib/supabase/server"
import { STYLES } from "@/lib/constants/styles"

export async function POST(request: Request) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = (await request.json()) as {
    inputImageUrl?: string
    style?: string
    prompt?: string
  }
  const { inputImageUrl, style, prompt } = body

  if (!inputImageUrl || !style) {
    return NextResponse.json(
      { error: "Faltan campos requeridos." },
      { status: 400 },
    )
  }

  const styleData = STYLES.find((s) => s.id === style)
  if (!styleData) {
    return NextResponse.json({ error: "Estilo no válido." }, { status: 400 })
  }

  // Componer el prompt final: boost del estilo + instrucciones del usuario
  const fullPrompt = [styleData.promptBoost, prompt]
    .filter(Boolean)
    .join(", ")

  // Insertar registro en DB con status "processing"
  const { data: generation, error: dbError } = await supabase
    .from("generations")
    .insert({
      user_id: user.id,
      prompt: fullPrompt,
      style,
      input_image_url: inputImageUrl,
      status: "processing",
    })
    .select()
    .single()

  if (dbError || !generation) {
    return NextResponse.json(
      { error: "Error al guardar la generación." },
      { status: 500 },
    )
  }

  // Crear predicción en Replicate (no-bloqueante — devuelve ID inmediatamente)
  try {
    const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN! })

    const prediction = await replicate.predictions.create({
      model: "adirik/interior-design",
      input: {
        image: inputImageUrl,
        prompt: fullPrompt,
        negative_prompt:
          "lowres, watermark, banner, logo, text, deformed, blurry, out of focus, surreal, ugly, low quality",
        num_inference_steps: 30,
        guidance_scale: 15,
        prompt_strength: 0.8,
      },
    })

    // Guardar el replicate_id para poder hacer polling
    await supabase
      .from("generations")
      .update({ replicate_id: prediction.id })
      .eq("id", generation.id)

    return NextResponse.json({ generationId: generation.id })
  } catch (err) {
    // Marcar como fallido si Replicate falla al crear la predicción
    await supabase
      .from("generations")
      .update({
        status: "failed",
        error_message:
          err instanceof Error ? err.message : "Error en Replicate",
      })
      .eq("id", generation.id)

    return NextResponse.json(
      { error: "Error al iniciar la generación." },
      { status: 500 },
    )
  }
}
