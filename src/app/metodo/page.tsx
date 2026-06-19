import type { Metadata } from "next"
import Link from "next/link"
import {
  Wifi,
  Smartphone,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Shield,
  Baby,
  Smile,
  User,
  UserCheck,
} from "lucide-react"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { PremiumCard } from "@/components/ui/premium-card"
import { Badge } from "@/components/ui/badge"
import {
  methodLayers,
  vpnExplanation,
  ageTransitions,
  methodPrinciples,
} from "@/content/method"

export const metadata: Metadata = {
  title: "El Método",
  description:
    "Método de protección digital para menores en dos capas: DNS de protección y control parental. De los filtros al criterio, adaptado a cada edad.",
}

const ageIcons = [Baby, Smile, User, UserCheck]

export default function MetodoPage() {
  return (
    <>
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/40 via-background to-background" />
        <Container size="md">
          <Badge variant="default" className="mb-6">Metodología</Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            El método Escudo Digital Familiar
          </h1>
          <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl">
            Un sistema de protección digital para menores basado en dos capas complementarias: filtrado técnico a nivel de red y acompañamiento humano consciente. Simple, gratuito y eficaz.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Badge variant="outline">2 capas</Badge>
            <Badge variant="outline">Sin coste</Badge>
            <Badge variant="outline">15-30 min configuración</Badge>
            <Badge variant="outline">Adaptado por edades</Badge>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="text-center mb-16">
            <Badge variant="cyan" className="mb-4">Fundamentos</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Principios del método
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {methodPrinciples.map((p) => (
              <PremiumCard key={p.titulo} className="text-center">
                <h3 className="text-base font-semibold text-slate-900 mb-2">{p.titulo}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{p.descripcion}</p>
              </PremiumCard>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-50/50">
        <Container>
          <div className="text-center mb-16">
            <Badge variant="default" className="mb-4">Capa 1</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              {methodLayers[0].titulo}
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
              {methodLayers[0].subtitulo}
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <PremiumCard hover={false} className="mb-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-100 mb-6">
                <Wifi className="h-7 w-7 text-brand-600" />
              </div>
              <p className="text-slate-600 leading-relaxed text-lg mb-8">
                {methodLayers[0].descripcion}
              </p>

              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-success-500 uppercase tracking-wider mb-4">
                    <CheckCircle2 className="h-4 w-4" />
                    Qué hace
                  </h4>
                  <ul className="space-y-3">
                    {methodLayers[0].queHace.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success-400 mt-0.5 shrink-0" />
                        <span className="text-sm text-slate-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-accent-500 uppercase tracking-wider mb-4">
                    <XCircle className="h-4 w-4" />
                    Qué no hace
                  </h4>
                  <ul className="space-y-3">
                    {methodLayers[0].queNoHace.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <XCircle className="h-4 w-4 text-accent-300 mt-0.5 shrink-0" />
                        <span className="text-sm text-slate-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border/40">
                <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3">
                  Dónde se configura
                </h4>
                <div className="flex flex-wrap gap-2">
                  {methodLayers[0].dondeSeConfigura.map((item) => (
                    <Badge key={item} variant="outline">{item}</Badge>
                  ))}
                </div>
              </div>
            </PremiumCard>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="text-center mb-16">
            <Badge variant="cyan" className="mb-4">Capa 2</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              {methodLayers[1].titulo}
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
              {methodLayers[1].subtitulo}
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <PremiumCard hover={false} className="mb-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-100 mb-6">
                <Smartphone className="h-7 w-7 text-cyan-500" />
              </div>
              <p className="text-slate-600 leading-relaxed text-lg mb-8">
                {methodLayers[1].descripcion}
              </p>

              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-success-500 uppercase tracking-wider mb-4">
                    <CheckCircle2 className="h-4 w-4" />
                    Qué hace
                  </h4>
                  <ul className="space-y-3">
                    {methodLayers[1].queHace.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success-400 mt-0.5 shrink-0" />
                        <span className="text-sm text-slate-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-accent-500 uppercase tracking-wider mb-4">
                    <XCircle className="h-4 w-4" />
                    Qué no hace
                  </h4>
                  <ul className="space-y-3">
                    {methodLayers[1].queNoHace.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <XCircle className="h-4 w-4 text-accent-300 mt-0.5 shrink-0" />
                        <span className="text-sm text-slate-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border/40">
                <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3">
                  Dónde se configura
                </h4>
                <div className="flex flex-wrap gap-2">
                  {methodLayers[1].dondeSeConfigura.map((item) => (
                    <Badge key={item} variant="outline">{item}</Badge>
                  ))}
                </div>
              </div>
            </PremiumCard>
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-50/50">
        <Container size="md">
          <div className="text-center mb-12">
            <Badge variant="accent" className="mb-4">Aclaración</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              {vpnExplanation.titulo}
            </h2>
          </div>
          <PremiumCard hover={false}>
            <div className="space-y-4">
              {vpnExplanation.contenido.map((p, i) => (
                <p key={i} className="text-slate-600 leading-relaxed">{p}</p>
              ))}
            </div>
            <div className="mt-6 p-4 rounded-xl bg-brand-50 border border-brand-100">
              <p className="text-sm font-medium text-brand-700">
                {vpnExplanation.razonPrincipal}
              </p>
            </div>
          </PremiumCard>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="text-center mb-16">
            <Badge variant="success" className="mb-4">Evolución</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              De los filtros al criterio
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
              La protección se adapta a la madurez del menor. El objetivo final no es mantener filtros para siempre, sino formar personas con criterio propio.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-brand-200 hidden sm:block" />

            <div className="space-y-12">
              {ageTransitions.map((transition, i) => {
                const AgeIcon = ageIcons[i]
                const isEven = i % 2 === 0

                return (
                  <div
                    key={transition.rango}
                    className={`relative flex flex-col sm:flex-row gap-6 ${
                      !isEven ? "sm:flex-row-reverse" : ""
                    }`}
                  >
                    <div className="hidden sm:flex flex-col items-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-100 border-4 border-white shadow-sm z-10">
                        <AgeIcon className="h-7 w-7 text-brand-600" />
                      </div>
                    </div>

                    <div className={`flex-1 ${!isEven ? "sm:text-right" : ""}`}>
                      <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 mb-1">
                        {transition.rango} años
                      </p>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">
                        {transition.titulo}
                      </h3>
                      <p className="text-slate-500 leading-relaxed mb-4">
                        {transition.descripcion}
                      </p>

                      <div className="grid sm:grid-cols-3 gap-4">
                        <div className="p-3 rounded-lg bg-brand-50">
                          <p className="text-xs font-semibold text-brand-700 uppercase tracking-wider mb-1">
                            Filtros
                          </p>
                          <p className="text-sm text-slate-600">{transition.filtros}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-cyan-50">
                          <p className="text-xs font-semibold text-cyan-500 uppercase tracking-wider mb-1">
                            Criterio
                          </p>
                          <p className="text-sm text-slate-600">{transition.criterio}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-success-50">
                          <p className="text-xs font-semibold text-success-500 uppercase tracking-wider mb-1">
                            Acompañamiento
                          </p>
                          <p className="text-sm text-slate-600">{transition.acompanamiento}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-gradient-to-b from-brand-50/40 to-background">
        <Container className="text-center">
          <Shield className="h-12 w-12 text-brand-600 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
            ¿Listo para empezar?
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed mb-10">
            Configura la protección digital de tu familia en menos de 30 minutos con nuestro configurador guiado.
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
              href="/guias/android"
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-border bg-white px-8 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50"
            >
              Ver guías por dispositivo
            </Link>
          </div>
        </Container>
      </Section>
    </>
  )
}
