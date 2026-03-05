"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Download, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { BeforeAfterSlider } from "@/components/ui/before-after-slider"
import { Button } from "@/components/ui/button"
import { downloadImage } from "@/lib/download"

interface GenerationResultProps {
  inputImageUrl: string | null
  outputImageUrl: string
  styleName: string
  onReset: () => void
}

export function GenerationResult({
  inputImageUrl,
  outputImageUrl,
  styleName,
  onReset,
}: GenerationResultProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  async function handleDownload() {
    setIsDownloading(true)
    try {
      await downloadImage(outputImageUrl, `diseño-interior-${Date.now()}.webp`)
    } catch {
      toast.error("No se pudo descargar la imagen.")
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <span className="text-xs uppercase tracking-[0.2em] text-warm mb-2 block">
          Resultado
        </span>
        <h2 className="font-serif italic text-3xl font-bold text-foreground leading-tight">
          {styleName ? `Estilo ${styleName}` : "Tu diseño"}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {inputImageUrl
            ? "Arrastra el deslizador para comparar tu habitación original."
            : "Tu espacio generado por IA."}
        </p>
      </div>

      {/* Before / After slider o imagen sola */}
      {inputImageUrl ? (
        <BeforeAfterSlider
          before={inputImageUrl}
          after={outputImageUrl}
          className="aspect-[4/3] w-full"
        />
      ) : (
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={outputImageUrl}
            alt={styleName || "Diseño generado"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 600px"
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-1">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="inline-flex items-center gap-2 h-11 px-6 bg-foreground text-background text-xs uppercase tracking-wide hover:bg-foreground/90 transition-colors disabled:opacity-60"
        >
          {isDownloading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Download className="h-3.5 w-3.5" />
          )}
          {isDownloading ? "Descargando..." : "Descargar"}
        </button>

        <Button
          variant="outline"
          className="rounded-none h-11 px-6 text-xs uppercase tracking-wide"
          onClick={onReset}
        >
          Nueva generación
        </Button>

        <Link
          href="/app/history"
          className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors sm:ml-auto"
        >
          Ver historial →
        </Link>
      </div>
    </div>
  )
}
