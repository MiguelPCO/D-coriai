import { Upload, Palette, Sparkles } from "lucide-react"

const STEPS = [
  {
    number: "01",
    icon: Upload,
    title: "Sube una foto",
    description:
      "Haz una foto de tu habitación con el móvil o sube una imagen desde tu ordenador. Cualquier ángulo funciona.",
  },
  {
    number: "02",
    icon: Palette,
    title: "Elige tu estilo",
    description:
      "Selecciona entre 6 estilos de diseño: Minimalista, Nórdico, Industrial, Mediterráneo, Japandi o Clásico.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Obtén el resultado",
    description:
      "La IA genera la versión rediseñada de tu espacio en segundos. Descárgala o compártela directamente.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Header */}
        <div className="max-w-xl mb-16">
          <span className="text-sm text-warm font-medium tracking-wide uppercase">
            Simple y rápido
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mt-3 text-foreground">
            Cómo funciona
          </h2>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {STEPS.map((step) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="relative">
                {/* Number */}
                <span className="font-serif text-6xl font-bold text-warm/20 leading-none block mb-4">
                  {step.number}
                </span>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center mb-5 border border-border">
                  <Icon className="h-5 w-5 text-foreground" />
                </div>

                {/* Text */}
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
