"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Container } from "@/components/ui/container"

const navItems = [
  { href: "/metodo", label: "Método" },
  { href: "/guias", label: "Guías" },
  { href: "/configurador", label: "Configurador" },
  { href: "/comunidades", label: "Comunidades" },
  { href: "/faq", label: "FAQ" },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const previousPathname = useRef(pathname)

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      setOpen(false)
      previousPathname.current = pathname
    }
  }, [pathname])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="Escudo Digital Familiar - Inicio"
          >
            <div className="flex h-9 w-9 items-center justify-center">
              <Image src="/images/logo.png" alt="Escudo Digital Familiar" width={36} height={36} className="object-contain" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-slate-900">
              Escudo Digital
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1" aria-label="Navegación principal">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3.5 py-2 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "text-brand-700 bg-brand-50"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/presentacion"
              className="inline-flex h-9 items-center rounded-lg bg-brand-600 px-4 text-sm font-medium text-white shadow-sm shadow-brand-600/20 transition-all hover:bg-brand-700 hover:shadow-md hover:shadow-brand-600/30"
            >
              Presentación
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 pt-2 border-t border-border/40">
            <nav className="flex flex-col gap-1" aria-label="Navegación móvil">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-3.5 py-3 text-base font-medium rounded-lg transition-colors",
                      isActive
                        ? "text-brand-700 bg-brand-50"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                )
              })}
              <Link
                href="/presentacion"
                className="mt-2 inline-flex h-11 items-center justify-center rounded-lg bg-brand-600 px-4 text-base font-medium text-white hover:bg-brand-700 transition-colors"
              >
                Presentación
              </Link>
            </nav>
          </div>
        )}
      </Container>
    </header>
  )
}
