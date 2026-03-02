// Sprint 1 Día 4 — se implementa el formulario real aquí
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-1">
          <Link href="/" className="font-serif text-2xl font-bold">
            interior.ai
          </Link>
          <p className="text-muted-foreground text-sm">Inicia sesión en tu cuenta</p>
        </div>

        <div className="border border-border rounded-xl p-6 bg-white space-y-4">
          <p className="text-sm text-center text-muted-foreground">
            Formulario de login — Sprint 1 Día 4
          </p>
          <Button className="w-full" asChild>
            <Link href="/app">Entrar (mock)</Link>
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          ¿No tienes cuenta?{" "}
          <Link href="/register" className="text-foreground underline underline-offset-4">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  )
}
