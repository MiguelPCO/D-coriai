import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { GenerationCard } from "@/components/history/GenerationCard"

export default async function HistoryPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: generations } = await supabase
    .from("generations")
    .select("*")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false })

  const hasGenerations = generations && generations.length > 0

  return (
    <div className="p-6 md:p-10">
      {/* Header */}
      <div className="mb-10">
        <span className="text-xs uppercase tracking-[0.2em] text-warm mb-2 block">
          Tu historial
        </span>
        <div className="flex items-end justify-between gap-4">
          <h1 className="font-serif italic text-4xl font-bold text-foreground leading-tight">
            Tus diseños.
            {hasGenerations && (
              <span className="font-sans not-italic text-2xl font-light text-muted-foreground ml-3">
                ({generations!.length})
              </span>
            )}
          </h1>
          {hasGenerations && (
            <Link
              href="/app/generate"
              className="text-xs uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors shrink-0 mb-1"
            >
              + Nueva generación
            </Link>
          )}
        </div>
      </div>

      {/* Empty state */}
      {!hasGenerations && (
        <div className="border border-dashed border-border py-28 flex flex-col items-center justify-center text-center">
          <p className="font-serif italic text-2xl text-muted-foreground mb-2">
            Aún no hay diseños.
          </p>
          <p className="text-sm text-muted-foreground mb-8 max-w-xs">
            Sube una foto de tu habitación y elige un estilo para empezar.
          </p>
          <Link
            href="/app/generate"
            className="inline-flex items-center h-11 px-8 bg-foreground text-background text-xs uppercase tracking-wide hover:bg-foreground/90 transition-colors"
          >
            Crear primera generación →
          </Link>
        </div>
      )}

      {/* Grid — orden descendente de izquierda a derecha */}
      {hasGenerations && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {generations.map((generation) => (
            <GenerationCard key={generation.id} generation={generation} />
          ))}
        </div>
      )}
    </div>
  )
}
