import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1200&q=85"

export function Hero() {
  return (
    <section className="relative min-h-screen grid lg:grid-cols-2">
      {/* Left — content */}
      <div className="relative z-10 flex flex-col justify-center px-8 md:px-16 lg:px-20 py-32 bg-background">
        {/* Tag */}
        <span className="inline-flex items-center gap-2 text-sm text-warm font-medium mb-6 tracking-wide uppercase">
          <span className="w-8 h-px bg-warm" />
          Rediseño de interiores con IA
        </span>

        {/* Headline */}
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-foreground mb-6">
          Tu habitación,
          <br />
          <em className="not-italic text-warm">reinventada.</em>
        </h1>

        {/* Sub */}
        <p className="text-lg text-muted-foreground leading-relaxed max-w-md mb-10">
          Sube una foto, elige un estilo y la IA transforma tu espacio en
          segundos. Sin instalaciones, sin coste.
        </p>

        {/* CTA */}
        <div className="flex flex-wrap items-center gap-4">
          <Button size="lg" className="gap-2" asChild>
            <Link href="/register">
              Empieza gratis <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Link
            href="/login"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
          >
            Ya tengo cuenta
          </Link>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 mt-12 pt-8 border-t border-border">
          {[
            { value: "6", label: "estilos de diseño" },
            { value: "~30s", label: "por generación" },
            { value: "100%", label: "gratis" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-serif text-2xl font-bold text-foreground">
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right — hero image */}
      <div className="relative min-h-[50vh] lg:min-h-screen">
        <Image
          src={HERO_IMAGE}
          alt="Habitación rediseñada con Décoriai"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        {/* Subtle overlay for blending */}
        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background to-transparent lg:block hidden" />
      </div>
    </section>
  )
}
