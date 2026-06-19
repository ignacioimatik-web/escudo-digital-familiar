import type { Metadata } from "next"
import Link from "next/link"
import { Router, Clock, ArrowRight, CheckCircle2 } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import { PremiumCard } from "@/components/ui/premium-card"
import { StepCard } from "@/components/shared/step-card"
import { WarningBox } from "@/components/shared/warning-box"
import { getDeviceGuide } from "@/content/devices"

const guide = getDeviceGuide("router")!

export const metadata: Metadata = {
  title: "Guía Router",
  description:
    "Configura DNS de protección en el router para proteger todos los dispositivos de la red doméstica. Guía paso a paso.",
}

const difficultyLabel = {
  facil: "Fácil",
  medio: "Intermedio",
  avanzado: "Avanzado",
}

const difficultyVariant = {
  facil: "success",
  medio: "default",
  avanzado: "accent",
} as const

export default function RouterPage() {
  return (
    <>
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/40 via-background to-background" />
        <Container size="md">
          <Badge variant="success" className="mb-6">
            Guía paso a paso
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            {guide.titulo}
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mb-8">
            {guide.descripcion}
          </p>

          <div className="flex flex-wrap gap-3">
            <Badge variant={difficultyVariant[guide.dificultad]} className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {guide.tiempoEstimado}
            </Badge>
            <Badge variant={difficultyVariant[guide.dificultad]}>
              Dificultad: {difficultyLabel[guide.dificultad]}
            </Badge>
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="md">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Pasos de configuración</h2>
            <p className="text-slate-500">Sigue estos pasos en orden para configurar la protección completa.</p>
          </div>

          <div className="space-y-4">
            {guide.pasos.map((paso) => (
              <StepCard
                key={paso.numero}
                numero={paso.numero}
                titulo={paso.titulo}
                descripcion={paso.descripcion}
                nota={paso.nota}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-50/50">
        <Container size="md">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Advertencias importantes</h2>
            <p className="text-slate-500">Presta atención a estos puntos para que la protección funcione correctamente.</p>
          </div>

          <div className="space-y-4">
            {guide.advertencias.map((adv, i) => (
              <WarningBox key={i} titulo={adv.titulo} descripcion={adv.descripcion} />
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="md">
          <PremiumCard hover={false} className="mb-8">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-6 w-6 text-success-500 shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Validación final</h3>
                <p className="text-slate-600 leading-relaxed">{guide.validacionFinal}</p>
              </div>
            </div>
          </PremiumCard>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Errores frecuentes</h2>
            <p className="text-slate-500 mb-6">Si algo no funciona, revisa estas soluciones.</p>

            <div className="space-y-4">
              {guide.erroresFrecuentes.map((error, i) => (
                <div key={i} className="p-5 rounded-xl bg-white border border-border/60">
                  <p className="text-sm font-semibold text-accent-500 mb-2">Problema: {error.problema}</p>
                  <p className="text-sm text-slate-600">
                    <span className="font-medium text-slate-700">Solución:</span> {error.solucion}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-gradient-to-b from-brand-50/40 to-background">
        <Container className="text-center">
          <Router className="h-12 w-12 text-brand-600 mx-auto mb-6" />
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mb-4">
            ¿Listo para configurar tu dispositivo?
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed mb-8">
            Usa nuestro configurador guiado para adaptar la protección a tu situación.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/configurador"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-brand-600 px-8 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:bg-brand-700 hover:shadow-xl"
            >
              Ir al configurador
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/guias/navegadores"
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-border bg-white px-8 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50"
            >
              Siguiente guía: Navegadores
            </Link>
          </div>
        </Container>
      </Section>
    </>
  )
}
