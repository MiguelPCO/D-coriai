import Link from "next/link"
import { Button } from "@/components/ui/button"

// Placeholder landing page — será reemplazada en Sprint 1 Días 2-3
export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="text-center space-y-6 max-w-xl">
        <h1 className="font-serif text-6xl font-bold tracking-tight text-foreground">
          Décoriai
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Rediseña cualquier habitación con inteligencia artificial. Sube una foto,
          elige tu estilo y obtén el resultado en segundos.
        </p>
        <div className="flex gap-3 justify-center pt-2">
          <Button size="lg" asChild>
            <Link href="/register">Empieza gratis</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/login">Iniciar sesión</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
