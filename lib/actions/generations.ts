"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"

/** Extrae el path relativo del bucket a partir de una URL pública de Supabase Storage */
function storagePath(url: string): string | null {
  const match = url.match(/\/object\/public\/generations\/(.+)/)
  return match ? match[1] : null
}

export async function deleteGeneration(
  id: string,
): Promise<{ error?: string }> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" }

  // Leer las URLs antes de borrar para limpiar Storage
  const { data: generation } = await supabase
    .from("generations")
    .select("input_image_url, output_image_url")
    .eq("id", id)
    .single()

  if (generation) {
    const paths = [generation.input_image_url, generation.output_image_url]
      .filter(Boolean)
      .map((url) => storagePath(url!))
      .filter(Boolean) as string[]

    if (paths.length > 0) {
      await supabase.storage.from("generations").remove(paths)
    }
  }

  // RLS garantiza que solo el propietario puede borrar su propio registro
  const { error } = await supabase.from("generations").delete().eq("id", id)
  if (error) return { error: error.message }

  revalidatePath("/app/history")
  return {}
}
