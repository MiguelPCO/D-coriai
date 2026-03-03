"use client"

import { useRef, useState, useCallback } from "react"
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
  const [pos, setPos] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const updatePos = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const pct = Math.max(2, Math.min(98, ((clientX - rect.left) / rect.width) * 100))
    setPos(pct)
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-2xl cursor-col-resize select-none",
        className,
      )}
      onMouseDown={(e) => {
        isDragging.current = true
        updatePos(e.clientX)
      }}
      onMouseMove={(e) => {
        if (isDragging.current) updatePos(e.clientX)
      }}
      onMouseUp={() => {
        isDragging.current = false
      }}
      onMouseLeave={() => {
        isDragging.current = false
      }}
      onTouchStart={(e) => updatePos(e.touches[0].clientX)}
      onTouchMove={(e) => updatePos(e.touches[0].clientX)}
    >
      {/* Before image */}
      <div className="relative w-full h-full">
        <Image src={before} alt="Antes" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
      </div>

      {/* After image — clipped to reveal from left */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image src={after} alt="Después" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
      </div>

      {/* Divider + handle */}
      <div
        className="absolute inset-y-0 w-0.5 bg-white/90 pointer-events-none"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-2xl flex items-center justify-center gap-0.5">
          <ChevronLeft className="h-3.5 w-3.5 text-foreground" />
          <ChevronRight className="h-3.5 w-3.5 text-foreground" />
        </div>
      </div>

      {/* Labels */}
      <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full pointer-events-none">
        {beforeLabel}
      </span>
      <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full pointer-events-none">
        {afterLabel}
      </span>
    </div>
  )
}
