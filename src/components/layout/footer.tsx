import Link from "next/link"
import { Shield } from "lucide-react"
import { Container } from "@/components/ui/container"

const footerLinks = {
  plataforma: [
    { href: "/metodo", label: "El Método" },
    { href: "/presentacion", label: "Presentación" },
    { href: "/configurador", label: "Configurador" },
    { href: "/faq", label: "Preguntas frecuentes" },
  ],
  guias: [
    { href: "/guias/android", label: "Android" },
    { href: "/guias/ios", label: "iOS" },
    { href: "/guias/windows", label: "Windows" },
    { href: "/guias/macos", label: "macOS" },
    { href: "/guias/router", label: "Router" },
    { href: "/guias/navegadores", label: "Navegadores" },
  ],
  comunidades: [
    { href: "/familias", label: "Familias" },
    { href: "/colegios", label: "Colegios" },
    { href: "/parroquias", label: "Parroquias" },
    { href: "/centros-sanitarios", label: "Centros sanitarios" },
  ],
  legal: [
    { href: "/legal", label: "Aviso legal" },
    { href: "/descargas", label: "Descargas" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-slate-50">
      <Container>
        <div className="py-12 md:py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 md:gap-10">
          <div className="sm:col-span-2 md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2.5 group"
              aria-label="Escudo Digital Familiar - Inicio"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
                <Shield className="h-4 w-4 text-white" strokeWidth={2.2} />
              </div>
              <span className="text-base font-semibold tracking-tight text-slate-900">
                Escudo Digital
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-500 max-w-xs">
              Protegiendo a los menores en el entorno digital con un método sencillo y eficaz en dos capas.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
              Plataforma
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.plataforma.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-brand-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
              Guías
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.guias.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-brand-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
              Comunidades
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.comunidades.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-brand-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-brand-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} Escudo Digital Familiar. Todos los derechos reservados.
          </p>
          <p className="text-xs text-slate-400">
            Hecho con dedicación para la protección de los menores.
          </p>
        </div>
      </Container>
    </footer>
  )
}
