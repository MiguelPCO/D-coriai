import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, History } from "lucide-react"
import { createClient } from "@/lib/supabase/server"

export default async function AppDashboard() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const firstName = user?.email?.split("@")[0] ?? "ahí"

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="font-serif text-4xl font-bold mb-2">
        Hola, {firstName} 👋
      </h1>
      <p className="text-muted-foreground mb-8">
        ¿Qué habitación vamos a transformar hoy?
      </p>

      <div className="grid grid-cols-2 gap-4">
        <Link href="/app/generate">
          <div className="border border-border rounded-xl p-6 hover:border-foreground transition-colors cursor-pointer bg-white">
            <Sparkles className="h-8 w-8 mb-3 text-warm" />
            <h2 className="font-semibold mb-1">Nueva generación</h2>
            <p className="text-sm text-muted-foreground">
              Sube una foto y elige un estilo para rediseñar tu espacio.
            </p>
          </div>
        </Link>
        <Link href="/app/history">
          <div className="border border-border rounded-xl p-6 hover:border-foreground transition-colors cursor-pointer bg-white">
            <History className="h-8 w-8 mb-3 text-muted-foreground" />
            <h2 className="font-semibold mb-1">Historial</h2>
            <p className="text-sm text-muted-foreground">
              Revisa todas tus generaciones anteriores.
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}
