"use client"

import { useActionState } from "react"
import Link from "next/link"
import Image from "next/image"
import { login } from "@/lib/actions/auth"
import { SubmitButton } from "@/components/ui/submit-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

const PANEL_IMAGE =
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85"

export default function LoginPage() {
  const [state, formAction] = useActionState(login, null)

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* ── Panel izquierdo — imagen editorial ── */}
      <div className="relative hidden lg:block">
        <Image
          src={PANEL_IMAGE}
          alt="Interior elegante"
          fill
          className="object-cover"
          priority
          sizes="50vw"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Contenido sobre la imagen */}
        <div className="absolute inset-0 flex flex-col justify-between p-12">
          <Link href="/" className="font-serif italic text-white text-2xl font-bold">
            Décoriai
          </Link>
          <blockquote className="text-white">
            <p className="font-serif italic text-2xl leading-snug mb-4 max-w-xs">
              "El diseño es la forma en que las primeras impresiones se
              convierten en recuerdos."
            </p>
            <cite className="text-white/50 text-xs uppercase tracking-widest not-italic">
              — Diseño de interiores con IA
            </cite>
          </blockquote>
        </div>
      </div>

      {/* ── Panel derecho — formulario ── */}
      <div className="flex flex-col items-center justify-center px-6 py-16 bg-background">
        <div className="w-full max-w-sm">
          {/* Logo mobile */}
          <Link
            href="/"
            className="font-serif italic text-2xl font-bold text-foreground mb-10 block lg:hidden"
          >
            Décoriai
          </Link>

          {/* Header */}
          <div className="mb-8">
            <span className="text-xs uppercase tracking-[0.2em] text-warm mb-3 block">
              Bienvenido de nuevo
            </span>
            <h1 className="font-serif italic text-3xl font-bold text-foreground leading-tight">
              Inicia sesión en
              <br />
              tu cuenta.
            </h1>
          </div>

          {/* Error */}
          {state?.error && (
            <Alert variant="destructive" className="mb-6 rounded-none">
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}

          {/* Form */}
          <form action={formAction} className="space-y-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-xs uppercase tracking-[0.15em]"
              >
                Correo electrónico
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="tu@correo.com"
                className="h-11 rounded-none bg-white focus-visible:ring-0 focus-visible:border-foreground"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="password"
                className="text-xs uppercase tracking-[0.15em]"
              >
                Contraseña
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="••••••••"
                className="h-11 rounded-none bg-white focus-visible:ring-0 focus-visible:border-foreground"
              />
            </div>

            <div className="pt-2">
              <SubmitButton label="Iniciar sesión" loadingLabel="Iniciando..." />
            </div>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            ¿No tienes cuenta?{" "}
            <Link
              href="/register"
              className="text-foreground underline underline-offset-4 hover:text-foreground/70 transition-colors"
            >
              Regístrate gratis
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
