"use client"

import { useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface BeforeAfterSliderProps {
  before: string
  after: string
  beforeLabel?: string
  afterLabel?: string
  className?: string
}

export function BeforeAfterSlider({
  before,
  after,
  beforeLabel = "Antes",
  afterLabel = "Después",
  className,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const afterClipRef = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  // afterLabel sits on the LEFT (the AI redesign side)
  // beforeLabel sits on the RIGHT (the original photo side)
  const afterLabelRef = useRef<HTMLSpanElement>(null)
  const beforeLabelRef = useRef<HTMLSpanElement>(null)
  const isDragging = useRef(false)
  const rafRef = useRef<number | null>(null)

  /** Apply position directly to DOM — zero React re-renders during drag */
  const applyPos = useCallback((pct: number) => {
    if (afterClipRef.current) {
      afterClipRef.current.style.clipPath = `inset(0 ${100 - pct}% 0 0)`
    }
    if (dividerRef.current) {
      dividerRef.current.style.left = `${pct}%`
    }

    // after image (left side) dominates when pct > 50
    const afterDominant = pct >= 50

    if (afterLabelRef.current) {
      afterLabelRef.current.style.opacity = afterDominant ? "1" : "0.45"
      afterLabelRef.current.style.background = afterDominant
        ? "rgba(255,255,255,0.95)"
        : "rgba(0,0,0,0.55)"
      afterLabelRef.current.style.color = afterDominant ? "#1a1714" : "rgba(255,255,255,0.65)"
      afterLabelRef.current.style.transform = afterDominant ? "scale(1.06)" : "scale(1)"
    }
    if (beforeLabelRef.current) {
      beforeLabelRef.current.style.opacity = afterDominant ? "0.45" : "1"
      beforeLabelRef.current.style.background = afterDominant
        ? "rgba(0,0,0,0.55)"
        : "rgba(255,255,255,0.95)"
      beforeLabelRef.current.style.color = afterDominant ? "rgba(255,255,255,0.65)" : "#1a1714"
      beforeLabelRef.current.style.transform = afterDominant ? "scale(1)" : "scale(1.06)"
    }
  }, [])

  const scheduleUpdate = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const pct = Math.max(2, Math.min(98, ((clientX - rect.left) / rect.width) * 100))
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        applyPos(pct)
        rafRef.current = null
      })
    },
    [applyPos],
  )

  // Set initial state
  useEffect(() => {
    applyPos(50)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [applyPos])

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-2xl cursor-col-resize select-none",
        className,
      )}
      onMouseDown={(e) => {
        isDragging.current = true
        scheduleUpdate(e.clientX)
      }}
      onMouseMove={(e) => {
        if (isDragging.current) scheduleUpdate(e.clientX)
      }}
      onMouseUp={() => {
        isDragging.current = false
      }}
      onMouseLeave={() => {
        isDragging.current = false
      }}
      onTouchStart={(e) => {
        e.preventDefault()
        scheduleUpdate(e.touches[0].clientX)
      }}
      onTouchMove={(e) => {
        e.preventDefault()
        scheduleUpdate(e.touches[0].clientX)
      }}
    >
      {/* Before image — full width, visible on the right of the divider */}
      <div className="relative w-full h-full">
        <Image
          src={before}
          alt={beforeLabel}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* After image — clipped, revealed from left as divider moves right */}
      <div
        ref={afterClipRef}
        className="absolute inset-0"
        style={{ clipPath: "inset(0 50% 0 0)" }}
      >
        <Image
          src={after}
          alt={afterLabel}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Divider — line + handle */}
      <div
        ref={dividerRef}
        className="absolute inset-y-0 pointer-events-none"
        style={{ left: "50%", transform: "translateX(-50%)", willChange: "left" }}
      >
        {/* Vertical line */}
        <div className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_10px_rgba(0,0,0,0.35)]" />
        {/* Circular handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-2xl flex items-center justify-center gap-0.5">
          <ChevronLeft className="h-3.5 w-3.5 text-foreground/80" />
          <ChevronRight className="h-3.5 w-3.5 text-foreground/80" />
        </div>
      </div>

      {/* Después label — bottom-left, on the AI redesign side */}
      <span
        ref={afterLabelRef}
        className="absolute bottom-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full pointer-events-none"
        style={{
          background: "rgba(0,0,0,0.55)",
          color: "rgba(255,255,255,0.65)",
          opacity: 0.45,
          transform: "scale(1)",
          transition: "opacity 0.22s ease, background 0.22s ease, color 0.22s ease, transform 0.22s ease",
        }}
      >
        {afterLabel}
      </span>

      {/* Antes label — bottom-right, on the original photo side */}
      <span
        ref={beforeLabelRef}
        className="absolute bottom-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full pointer-events-none"
        style={{
          background: "rgba(255,255,255,0.95)",
          color: "#1a1714",
          opacity: 1,
          transform: "scale(1.06)",
          transition: "opacity 0.22s ease, background 0.22s ease, color 0.22s ease, transform 0.22s ease",
        }}
      >
        {beforeLabel}
      </span>
    </div>
  )
}
