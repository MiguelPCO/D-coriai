import { BeforeAfterSlider } from "@/components/ui/before-after-slider"

const EXAMPLES = [
  {
    label: "Salón · Estilo Nórdico",
    before: "/images/salonantes.webp",
    after: "/images/salondespues.webp",
  },
  {
    label: "Dormitorio · Estilo Japandi",
    before: "/images/dormitorioantes.jpg",
    after: "/images/dormitoriodespues.webp",
  },
  {
    label: "Comedor · Estilo Clásico",
    before: "/images/comedorantes.webp",
    after: "/images/comedordespues.webp",
  },
]

export function BeforeAfterSection() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header — 2-col editorial */}
        <div className="grid md:grid-cols-[1fr_auto] items-end gap-8 mb-14 md:mb-16">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-warm mb-4 block">
              Ve la diferencia
            </span>
            <h2 className="font-serif italic text-4xl md:text-5xl font-bold text-foreground leading-tight">
              La transformación,
              <br />
              en tiempo real.
            </h2>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs md:text-right">
            Arrastra el deslizador para comparar la habitación original con el
            resultado generado por IA.
          </p>
        </div>

        {/* Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-3">
          {EXAMPLES.map((example, i) => (
            <div
              key={example.label}
              className={i === 2 ? "hidden md:block space-y-3" : "space-y-3"}
            >
              <BeforeAfterSlider
                before={example.before}
                after={example.after}
                className="aspect-[4/3] md:aspect-[3/4]"
              />
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                {example.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
