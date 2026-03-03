import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { HowItWorks } from "@/components/landing/how-it-works"
import { StylesGrid } from "@/components/landing/styles-grid"
import { BeforeAfterSection } from "@/components/landing/before-after-section"
import { CtaSection } from "@/components/landing/cta-section"
import Link from "next/link"

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <StylesGrid />
        <BeforeAfterSection />
        <CtaSection />
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-background/40 border-t border-background/10">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-serif text-background/70 font-semibold">
            Décoriai
          </span>
          <p className="text-xs">
            © {new Date().getFullYear()} Décoriai · Proyecto de portfolio
          </p>
          <nav className="flex items-center gap-5 text-xs">
            <Link href="/login" className="hover:text-background transition-colors">
              Iniciar sesión
            </Link>
            <Link href="/register" className="hover:text-background transition-colors">
              Registro
            </Link>
          </nav>
        </div>
      </footer>
    </>
  )
}
