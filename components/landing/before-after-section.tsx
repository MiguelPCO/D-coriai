import { BeforeAfterSlider } from "@/components/ui/before-after-slider"
import { getUnsplashUrl } from "@/lib/constants/styles"

const EXAMPLES = [
  {
    label: "Salón · Estilo Nórdico",
    before: getUnsplashUrl("photo-1502672260266-1c1ef2d93688", 900),
    after: getUnsplashUrl("photo-1555041469-a586c61ea9bc", 900),
  },
  {
    label: "Dormitorio · Estilo Japandi",
    before: getUnsplashUrl("photo-1556909114-f6e7ad7d3136", 900),
    after: getUnsplashUrl("photo-1615873968403-89e068629265", 900),
  },
  {
    label: "Comedor · Estilo Clásico",
    before: getUnsplashUrl("photo-1484154218962-a197022b5858", 900),
    after: getUnsplashUrl("photo-1567016376408-0226e4d0c1ea", 900),
  },
]

export function BeforeAfterSection() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Header */}
        <div className="max-w-xl mb-14">
          <span className="text-sm text-warm font-medium tracking-wide uppercase">
            Ve la diferencia
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mt-3 text-foreground">
            La transformación,
            <br />
            en tiempo real.
          </h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            Arrastra el deslizador para comparar la habitación original con el
            resultado generado por IA.
          </p>
        </div>

        {/* Sliders */}
        <div className="grid md:grid-cols-3 gap-4">
          {EXAMPLES.map((example) => (
            <div key={example.label} className="space-y-3">
              <BeforeAfterSlider
                before={example.before}
                after={example.after}
                className="aspect-[3/4]"
              />
              <p className="text-sm text-muted-foreground font-medium">
                {example.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
