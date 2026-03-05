"use client"

import Image from "next/image"
import { Check } from "lucide-react"
import { STYLES, STYLE_MIXES } from "@/lib/constants/styles"
import { cn } from "@/lib/utils"

interface StyleSelectorProps {
  value: string | null
  onChange: (id: string) => void
  disabled?: boolean
  onSuggestion?: (text: string) => void
}

export function StyleSelector({ value, onChange, disabled, onSuggestion }: StyleSelectorProps) {
  return (
    <div className="flex flex-col divide-y divide-border border border-border">
      {STYLES.map((style) => {
        const selected = value === style.id
        return (
          <div key={style.id}>
            <button
              type="button"
              disabled={disabled}
              onClick={() => onChange(style.id)}
              className={cn(
                "flex items-center gap-4 px-4 py-3 w-full text-left transition-colors",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                selected ? "bg-warm/10" : "hover:bg-warm/5",
              )}
            >
              {/* Thumbnail cuadrado 56×56 */}
              <div className="relative h-14 w-14 shrink-0 overflow-hidden">
                <Image
                  src={style.image}
                  alt={style.name}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
                {selected && (
                  <div className="absolute inset-0 bg-warm/20 flex items-center justify-center">
                    <Check className="h-4 w-4 text-warm" />
                  </div>
                )}
              </div>

              {/* Texto */}
              <div className="flex-1 min-w-0">
                <p
                  className={cn(
                    "font-serif italic text-sm font-semibold leading-tight",
                    selected ? "text-foreground" : "text-foreground/80",
                  )}
                >
                  {style.name}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">
                  {style.description}
                </p>
              </div>

              {/* Dot indicador */}
              {selected && (
                <div className="h-1.5 w-1.5 rounded-full bg-warm shrink-0" />
              )}
            </button>

            {/* Chips de sugerencia */}
            {selected && onSuggestion && (
              <div className="px-4 pb-3 flex flex-wrap gap-1.5 bg-warm/10 border-b border-border">
                {style.promptSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    disabled={disabled}
                    onClick={(e) => { e.stopPropagation(); onSuggestion(suggestion) }}
                    className="text-[10px] px-2 py-1 border border-warm/30 text-warm/80 hover:bg-warm/10 hover:border-warm transition-colors"
                  >
                    + {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        )
      })}

      {/* Sección Mezclas populares */}
      <div className="border-t border-border">
        <div className="px-4 py-2 bg-muted/30">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Mezclas populares
          </p>
        </div>
        {STYLE_MIXES.map((mix) => {
          const selected = value === mix.id
          return (
            <button
              key={mix.id}
              type="button"
              disabled={disabled}
              onClick={() => onChange(mix.id)}
              className={cn(
                "flex items-center gap-4 px-4 py-3 w-full text-left transition-colors border-t border-border/50",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                selected ? "bg-warm/10" : "hover:bg-warm/5",
              )}
            >
              {/* Dos thumbnails solapados */}
              <div className="relative h-14 w-[4.5rem] shrink-0">
                {mix.styleIds.map((sid, i) => {
                  const s = STYLES.find((s) => s.id === sid)
                  return s ? (
                    <div
                      key={sid}
                      className={cn(
                        "absolute h-10 w-10 overflow-hidden border-2 border-background",
                        i === 0 ? "left-0 top-0" : "left-4 top-2 opacity-80",
                      )}
                    >
                      <Image src={s.image} alt={s.name} fill className="object-cover" sizes="40px" />
                    </div>
                  ) : null
                })}
              </div>

              <div className="flex-1 min-w-0">
                <p
                  className={cn(
                    "font-serif italic text-sm font-semibold leading-tight",
                    selected ? "text-foreground" : "text-foreground/80",
                  )}
                >
                  {mix.name}
                </p>
                <p className="text-[10px] text-warm/70 mt-0.5">{mix.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">{mix.description}</p>
              </div>

              {selected && <div className="h-1.5 w-1.5 rounded-full bg-warm shrink-0" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}
