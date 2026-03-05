"use client"

import { useState, useTransition } from "react"
import Image from "next/image"
import { Download, Trash2, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { type Generation } from "@/types/database"
import { STYLES } from "@/lib/constants/styles"
import { deleteGeneration } from "@/lib/actions/generations"
import { downloadImage } from "@/lib/download"
import { BeforeAfterSlider } from "@/components/ui/before-after-slider"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

const STATUS_BADGE: Record<
  Generation["status"],
  { label: string; className: string }
> = {
  pending: { label: "Pendiente", className: "bg-stone-100 text-stone-600" },
  processing: {
    label: "Procesando…",
    className: "bg-blue-50 text-blue-700",
  },
  completed: {
    label: "Completado",
    className: "bg-emerald-50 text-emerald-700",
  },
  failed: { label: "Error", className: "bg-red-50 text-red-700" },
}

function relativeTime(dateStr: string): string {
  const mins = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000)
  if (mins < 1) return "Ahora mismo"
  if (mins < 60) return `Hace ${mins}m`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `Hace ${hours}h`
  return `Hace ${Math.floor(hours / 24)}d`
}

interface GenerationCardProps {
  generation: Generation
}

export function GenerationCard({ generation }: GenerationCardProps) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [isDownloading, setIsDownloading] = useState(false)

  const styleName =
    STYLES.find((s) => s.id === generation.style)?.name ??
    (generation.style ?? "Sin estilo")
  const thumbnailUrl =
    generation.output_image_url ?? generation.input_image_url
  const isCompleted = generation.status === "completed"
  const badge = STATUS_BADGE[generation.status]

  function handleDelete() {
    startTransition(async () => {
      const { error } = await deleteGeneration(generation.id)
      if (error) toast.error("No se pudo eliminar la generación.")
      else toast.success("Generación eliminada.")
    })
  }

  async function handleDownload() {
    if (!generation.output_image_url) return
    setIsDownloading(true)
    try {
      await downloadImage(
        generation.output_image_url,
        `diseño-interior-${generation.id}.webp`,
      )
    } catch {
      toast.error("No se pudo descargar la imagen.")
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <>
      {/* ── Tarjeta ────────────────────────────────────────────────────────── */}
      <div
        className={cn(
          "relative overflow-hidden group",
          isCompleted && "cursor-pointer",
        )}
        onClick={() => isCompleted && setOpen(true)}
      >
        {/* Thumbnail */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {thumbnailUrl ? (
            <Image
              src={thumbnailUrl}
              alt={styleName}
              fill
              className={cn(
                "object-cover transition-transform duration-500",
                isCompleted && "group-hover:scale-[1.03]",
              )}
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-6 w-6 text-muted-foreground animate-spin" />
            </div>
          )}

          {/* Gradient inferior — nombre + tiempo en hover */}
          {isCompleted && (
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          )}
          {isCompleted && (
            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-1 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
              <p className="font-serif italic text-sm font-semibold text-white leading-tight">
                {styleName}
              </p>
              <p className="text-xs text-white/70 mt-0.5">
                {relativeTime(generation.created_at)}
              </p>
            </div>
          )}

          {/* Overlay central "Ver comparativa" */}
          {isCompleted && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <span className="text-white text-xs uppercase tracking-widest font-medium">
                {generation.input_image_url ? "Ver comparativa" : "Ver diseño"}
              </span>
            </div>
          )}

          {/* Badge de estado — solo si no está completada */}
          {generation.status !== "completed" && (
            <span
              className={cn(
                "absolute top-2 right-2 px-2 py-0.5 text-xs font-medium rounded-full",
                badge.className,
              )}
            >
              {badge.label}
            </span>
          )}

          {/* Botón delete — visible en hover */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleDelete()
            }}
            disabled={isPending}
            aria-label="Eliminar generación"
            className="absolute top-2 left-2 p-1.5 bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 disabled:opacity-50"
          >
            {isPending ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Trash2 className="h-3.5 w-3.5" />
            )}
          </button>
        </div>

        {/* Footer externo — solo para generaciones NO completadas */}
        {generation.status !== "completed" && (
          <div className="pt-2 pb-1">
            <p className="font-serif italic text-sm font-semibold text-foreground leading-tight">
              {styleName}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {relativeTime(generation.created_at)}
            </p>
          </div>
        )}
      </div>

      {/* ── Dialog — solo para generaciones completadas ──────────────────── */}
      {isCompleted && generation.output_image_url && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-2xl rounded-none p-0 gap-0 overflow-hidden">
            <DialogHeader className="px-6 pt-6 pb-4">
              <DialogTitle className="font-serif italic text-xl font-bold">
                {styleName !== "Sin estilo" ? `Estilo ${styleName}` : "Tu diseño"}
              </DialogTitle>
              <p className="text-xs text-muted-foreground">
                {relativeTime(generation.created_at)}
              </p>
            </DialogHeader>

            {generation.input_image_url ? (
              <BeforeAfterSlider
                before={generation.input_image_url}
                after={generation.output_image_url}
                className="aspect-[4/3] w-full"
              />
            ) : (
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={generation.output_image_url}
                  alt={styleName}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 672px"
                />
              </div>
            )}

            <DialogFooter className="px-6 py-4 border-t border-border flex-row items-center justify-between gap-3">
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="inline-flex items-center gap-2 h-9 px-5 bg-foreground text-background text-xs uppercase tracking-wide hover:bg-foreground/90 transition-colors disabled:opacity-60"
              >
                {isDownloading ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <Download className="h-3 w-3" />
                )}
                {isDownloading ? "Descargando..." : "Descargar"}
              </button>

              <button
                onClick={() => {
                  setOpen(false)
                  handleDelete()
                }}
                disabled={isPending}
                className="text-xs text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50 flex items-center gap-1.5"
              >
                <Trash2 className="h-3 w-3" />
                Eliminar
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
