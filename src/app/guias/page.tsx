import Link from "next/link"
import { Smartphone, Monitor, Router, Globe } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import { PremiumCard } from "@/components/ui/premium-card"

const guides = [
  { href: "/guias/android", label: "Android", icon: Smartphone, desc: "Configura DNS privado y Google Family Link" },
  { href: "/guias/ios", label: "iPhone / iPad", icon: Smartphone, desc: "Configura DNS personalizado y Tiempo de Uso" },
  { href: "/guias/windows", label: "Windows", icon: Monitor, desc: "Configura DNS manual y Microsoft Family Safety" },
  { href: "/guias/macos", label: "macOS", icon: Monitor, desc: "Configura DNS manual y Tiempo de Uso" },
  { href: "/guias/router", label: "Router", icon: Router, desc: "Protege toda tu red doméstica" },
  { href: "/guias/navegadores", label: "Navegadores", icon: Globe, desc: "DNS seguro en Chrome, Edge, Firefox y Opera" },
]

export default function GuiasIndexPage() {
  return (
    <>
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/40 via-background to-background" />
        <Container size="md">
          <Badge variant="default" className="mb-6">Guías</Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            Guías de configuración
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-2xl">
            Instrucciones paso a paso para configurar la protección digital en cada dispositivo.
            También puedes usar el <Link href="/configurador" className="text-brand-600 font-medium underline">configurador guiado</Link> para obtener instrucciones personalizadas.
          </p>
        </Container>
      </Section>

      <Section>
        <Container size="md">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {guides.map((g) => (
              <Link key={g.href} href={g.href}>
                <PremiumCard className="h-full">
                  <g.icon className="w-8 h-8 text-brand-500 mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{g.label}</h3>
                  <p className="text-sm text-slate-500">{g.desc}</p>
                </PremiumCard>
              </Link>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-xl bg-brand-50 border border-brand-100">
            <p className="text-sm text-brand-700">
              💡 ¿No sabes por dónde empezar? Usa el{" "}
              <Link href="/configurador" className="font-semibold underline">asistente inteligente</Link>
              {" "}— te guía paso a paso según tu dispositivo y situación.
            </p>
          </div>
        </Container>
      </Section>
    </>
  )
}
