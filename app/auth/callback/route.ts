import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// Maneja el redirect de confirmación de email de Supabase
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/app"

  // Prevenir open redirect — solo rutas relativas
  const safePath = next.startsWith("/") ? next : "/app"

  if (code) {
    try {
      const supabase = await createClient()
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      if (!error) {
        return NextResponse.redirect(`${origin}${safePath}`)
      }
    } catch {
      // fall through to error redirect
    }
  }

  const errorParam = encodeURIComponent("Enlace de confirmación inválido")
  return NextResponse.redirect(`${origin}/login?error=${errorParam}`)
}
