import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Sparkles, History, Home, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  async function signOut() {
    "use server"
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 border-r border-border flex flex-col bg-white">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-border">
          <Link href="/" className="font-serif text-xl font-bold tracking-tight">
            Décoriai
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5">
          <Link
            href="/app"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <Home className="h-4 w-4" />
            Inicio
          </Link>
          <Link
            href="/app/generate"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <Sparkles className="h-4 w-4" />
            Generar
          </Link>
          <Link
            href="/app/history"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <History className="h-4 w-4" />
            Historial
          </Link>
        </nav>

        {/* User footer */}
        <div className="p-3 border-t border-border space-y-1">
          <p className="px-3 py-1 text-xs text-muted-foreground truncate">
            {user.email}
          </p>
          <form action={signOut}>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
              type="submit"
            >
              <LogOut className="h-4 w-4" />
              Cerrar sesión
            </Button>
          </form>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
