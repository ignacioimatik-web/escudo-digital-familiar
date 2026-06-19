"use client"

import { motion, useInView } from "framer-motion"
import { useEffect, useRef } from "react"
import {
  Shield,
  Wifi,
  Smartphone,
  ArrowRight,
  AlertTriangle,
  Users,
  GraduationCap,
  Heart,
  Stethoscope,
  CheckCircle2,
  Baby,
  Smile,
  User,
  UserCheck,
} from "lucide-react"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { PremiumCard } from "@/components/ui/premium-card"
import { Badge } from "@/components/ui/badge"
import { methodLayers, ageTransitions } from "@/content/method"
import { audiences } from "@/content/audiences"
import Link from "next/link"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

function AnimatedSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function AnimatedItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  )
}

function SlowVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    if (ref.current) ref.current.playbackRate = 0.5
  }, [])
  return (
    <video ref={ref} autoPlay muted loop playsInline className="w-full block">
      <source src={src} type="video/mp4" />
    </video>
  )
}

const problems = [
  {
    icon: AlertTriangle,
    titulo: "Exposición temprana",
    descripcion: "La edad media del primer contacto con un smartphone es 9 años. Con 7, el 40% ya tiene acceso a Internet sin supervisión.",
  },
  {
    icon: AlertTriangle,
    titulo: "Pornografía",
    descripcion: "El 90% de los menores acceden a contenido pornográfico antes de los 14 años, normalmente de forma accidental.",
  },
  {
    icon: AlertTriangle,
    titulo: "Apuestas online",
    descripcion: "Las plataformas de apuestas y gaming con loot boxes normalizan la conducta adictiva entre los menores.",
  },
  {
    icon: AlertTriangle,
    titulo: "Violencia digital",
    descripcion: "Contenido violento, retos peligrosos y ciberbullo forman parte del ecosistema digital que consumen a diario.",
  },
  {
    icon: AlertTriangle,
    titulo: "Redes sociales",
    descripcion: "Algoritmos diseñados para captar atención que generan ansiedad, comparación y adicción en cerebros en desarrollo.",
  },
  {
    icon: AlertTriangle,
    titulo: "Algoritmos opacos",
    descripcion: "Los motores de recomendación amplifican contenido extremo sin que las familias sean conscientes de su impacto.",
  },
]

const ageIcons = [Baby, Smile, User, UserCheck]

const audienceIcons: Record<string, React.ElementType> = {
  familias: Users,
  colegios: GraduationCap,
  parroquias: Heart,
  "centros-sanitarios": Stethoscope,
}

export default function HomePage() {
  return (
    <>
      <Section className="relative overflow-hidden min-h-[80vh] flex items-center">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video/intro.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background/90" />
        <Container className="relative text-center py-16 md:py-28">
          <AnimatedSection>
            <AnimatedItem>
              <Badge variant="default" className="mb-6 bg-white/15 text-white border border-white/20">
                Protección digital para menores
              </Badge>
            </AnimatedItem>
            <AnimatedItem>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
                Un escudo digital
                <br />
                <span className="text-brand-300">para tu familia</span>
              </h1>
            </AnimatedItem>
            <AnimatedItem>
              <p className="mt-6 text-lg md:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed">
                Método en dos capas — DNS de protección y control parental — para crear un entorno digital seguro, sencillo y eficaz. Sin coste. Sin complicaciones.
              </p>
            </AnimatedItem>
            <AnimatedItem>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/configurador"
                  className="inline-flex h-12 items-center gap-2 rounded-xl bg-brand-600 px-6 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:bg-brand-700 hover:shadow-xl hover:shadow-brand-600/30"
                >
                  Configurador guiado
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/presentacion"
                  className="inline-flex h-12 items-center gap-2 rounded-xl border border-border bg-white px-6 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-300"
                >
                  Material de presentación
                </Link>
              </div>
            </AnimatedItem>
          </AnimatedSection>
        </Container>
      </Section>

      <Section className="bg-slate-50/50">
        <Container>
          <AnimatedSection>
            <AnimatedItem>
              <div className="text-center mb-16">
                <Badge variant="accent" className="mb-4">El problema</Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                  El entorno digital no es seguro para los menores
                </h2>
                <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
                  Los menores están expuestos a riesgos reales que pueden afectar su desarrollo. No es cuestión de prohibir, sino de proteger mientras crecen.
                </p>
              </div>
            </AnimatedItem>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {problems.map((p) => (
                <AnimatedItem key={p.titulo}>
                  <PremiumCard hover={false} className="h-full">
                    <p.icon className="h-5 w-5 text-accent-500 mb-4" />
                    <h3 className="text-base font-semibold text-slate-900 mb-2">{p.titulo}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{p.descripcion}</p>
                  </PremiumCard>
                </AnimatedItem>
              ))}
            </div>
          </AnimatedSection>
        </Container>
      </Section>

      <Section>
        <Container>
          <AnimatedSection>
            <AnimatedItem>
              <div className="text-center mb-16">
                <Badge variant="cyan" className="mb-4">El método</Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                  Dos capas de protección complementarias
                </h2>
                <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
                  Un sistema sencillo que combina filtrado técnico con acompañamiento humano.
                </p>
              </div>
            </AnimatedItem>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {methodLayers.map((layer, i) => {
                const Icon = i === 0 ? Wifi : Smartphone
                return (
                  <AnimatedItem key={layer.id}>
                    <PremiumCard className="h-full">
                      <div className={`flex h-14 w-14 items-center justify-center rounded-xl mb-6 ${i === 0 ? "bg-brand-100" : "bg-cyan-100"}`}>
                        <Icon className={`h-7 w-7 ${i === 0 ? "text-brand-600" : "text-cyan-500"}`} />
                      </div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                        Capa {i + 1}
                      </p>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">{layer.titulo}</h3>
                      <p className="text-sm text-slate-500 mb-6">{layer.subtitulo}</p>
                      <p className="text-slate-600 leading-relaxed mb-6">{layer.descripcion}</p>
                      <div className="space-y-2">
                        {layer.queHace.slice(0, 3).map((item) => (
                          <div key={item} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-success-500 mt-0.5 shrink-0" />
                            <span className="text-sm text-slate-600">{item}</span>
                          </div>
                        ))}
                      </div>
                      <Link
                        href="/metodo"
                        className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700"
                      >
                        Ver método completo <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </PremiumCard>
                  </AnimatedItem>
                )
              })}
            </div>
          </AnimatedSection>
        </Container>
      </Section>

      <Section className="bg-slate-50/50">
        <Container>
          <AnimatedSection>
            <AnimatedItem>
              <div className="text-center mb-16">
                <Badge variant="success" className="mb-4">Transición por edad</Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                  De los filtros al criterio
                </h2>
                <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
                  La protección se adapta a la madurez del menor. Los filtros son un puente; el destino es formar criterio propio.
                </p>
              </div>
            </AnimatedItem>
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-brand-200 hidden sm:block" />
              <div className="grid sm:grid-cols-2 gap-8">
                {ageTransitions.map((transition, i) => {
                  const AgeIcon = ageIcons[i]
                  return (
                    <AnimatedItem key={transition.rango}>
                      <div className={`relative flex gap-4 ${i % 2 === 1 ? "sm:flex-row-reverse sm:text-right" : ""}`}>
                        <div className="hidden sm:flex flex-col items-center">
                          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-100 border-4 border-white shadow-sm z-10">
                            <AgeIcon className="h-7 w-7 text-brand-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 mb-1">
                            {transition.rango} años
                          </p>
                          <h3 className="text-lg font-semibold text-slate-900 mb-2">{transition.titulo}</h3>
                          <p className="text-sm text-slate-500 leading-relaxed mb-3">{transition.descripcion}</p>
                          <p className="text-sm text-slate-600">
                            <span className="font-medium text-slate-700">Acompañamiento:</span> {transition.acompanamiento}
                          </p>
                        </div>
                      </div>
                    </AnimatedItem>
                  )
                })}
              </div>
            </div>
            <AnimatedItem>
              <div className="mt-16 rounded-2xl overflow-hidden border border-border/60 max-w-2xl mx-auto">
                <SlowVideo src="/video/intro_telemet.mp4" />
              </div>
            </AnimatedItem>
          </AnimatedSection>
        </Container>
      </Section>

      <Section>
        <Container>
          <AnimatedSection>
            <AnimatedItem>
              <div className="text-center mb-16">
                <Badge variant="default" className="mb-4">Para todos</Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                  Diseñado para tu comunidad
                </h2>
              </div>
            </AnimatedItem>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {audiences.map((audience) => {
                const Icon = audienceIcons[audience.id] || Shield
                return (
                  <AnimatedItem key={audience.id}>
                    <PremiumCard className="h-full text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success-100 mx-auto mb-5">
                        <Icon className="h-6 w-6 text-success-500" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">{audience.titulo}</h3>
                      <p className="text-sm text-slate-500 mb-4 line-clamp-3">{audience.descripcion}</p>
                      <Link
                        href={`/${audience.id}`}
                        className="text-sm font-medium text-brand-600 hover:text-brand-700 inline-flex items-center gap-1"
                      >
                        Saber más <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </PremiumCard>
                  </AnimatedItem>
                )
              })}
            </div>
          </AnimatedSection>
        </Container>
      </Section>

      <Section className="bg-gradient-to-b from-brand-50/40 to-background">
        <Container className="text-center">
          <AnimatedSection>
            <AnimatedItem>
              <Shield className="h-12 w-12 text-brand-600 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
                Proteger para educar.
                <br />
                <span className="text-brand-600">Educar para liberar.</span>
              </h2>
              <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed mb-10">
                No se trata de construir muros. Se trata de acompañar a los menores mientras desarrollan el criterio necesario para navegar el mundo digital con libertad y responsabilidad.
              </p>
            </AnimatedItem>
            <AnimatedItem>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/configurador"
                  className="inline-flex h-12 items-center gap-2 rounded-xl bg-brand-600 px-8 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:bg-brand-700 hover:shadow-xl"
                >
                  Empezar ahora
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/metodo"
                  className="inline-flex h-12 items-center gap-2 rounded-xl border border-border bg-white px-8 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50"
                >
                  Conocer el método
                </Link>
              </div>
            </AnimatedItem>
          </AnimatedSection>
        </Container>
      </Section>
    </>
  )
}
