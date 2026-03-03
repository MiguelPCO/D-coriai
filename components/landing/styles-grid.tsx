import Image from "next/image"
import { STYLES, getUnsplashUrl } from "@/lib/constants/styles"

export function StylesGrid() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span className="text-sm text-warm font-medium tracking-wide uppercase">
              Estilos disponibles
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mt-3 text-foreground">
              6 estilos de diseño
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
            Cada estilo tiene un prompt optimizado que guía a la IA para
            obtener los mejores resultados.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {STYLES.map((style) => (
            <div
              key={style.id}
              className="group relative overflow-hidden rounded-xl aspect-[4/3] cursor-default"
            >
              <Image
                src={getUnsplashUrl(style.photoId, 600)}
                alt={`Estilo ${style.name}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

              {/* Style info */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="font-serif text-white font-semibold text-lg leading-tight">
                  {style.name}
                </p>
                <p className="text-white/70 text-xs mt-0.5 hidden md:block">
                  {style.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
