// Sprint 1 Día 4 — se implementa el formulario real aquí
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-1">
          <Link href="/" className="font-serif text-2xl font-bold">
            interior.ai
          </Link>
          <p className="text-muted-foreground text-sm">Crea tu cuenta gratis</p>
        </div>

        <div className="border border-border rounded-xl p-6 bg-white space-y-4">
          <p className="text-sm text-center text-muted-foreground">
            Formulario de registro — Sprint 1 Día 4
          </p>
          <Button className="w-full" asChild>
            <Link href="/app">Registrarme (mock)</Link>
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="text-foreground underline underline-offset-4">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
