import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CtaSection() {
  return (
    <section className="py-24 md:py-36 bg-foreground text-background">
      <div className="max-w-4xl mx-auto px-6 md:px-16 text-center">
        <span className="inline-block text-sm font-medium tracking-wide uppercase text-background/50 mb-6">
          Empieza hoy
        </span>

        <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
          ¿Lista para transformar
          <br />
          tu espacio?
        </h2>

        <p className="text-background/60 text-lg leading-relaxed max-w-lg mx-auto mb-10">
          Completamente gratis. Sin tarjeta de crédito. Sin instalaciones.
          Solo sube una foto y deja que la IA haga el resto.
        </p>

        <Button
          size="lg"
          variant="secondary"
          className="gap-2 bg-background text-foreground hover:bg-background/90 h-14 px-8 text-base"
          asChild
        >
          <Link href="/register">
            Empieza gratis <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
