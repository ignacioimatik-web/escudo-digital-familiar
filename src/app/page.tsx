"use client"

import { motion, useInView, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useRef, useCallback } from "react"
import {
  Shield,
  Wifi,
  Smartphone,
  ArrowRight,
  CheckCircle2,
  Users,
  GraduationCap,
  Heart,
  Stethoscope,
  EyeOff,
  Dices,
  ShieldAlert,
  MessageCircle,
  BrainCircuit,
  Baby,
  Smile,
  User,
  UserCheck,
} from "lucide-react"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { PremiumCard } from "@/components/ui/premium-card"
import { Badge } from "@/components/ui/badge"
import { audiences } from "@/content/audiences"
import { NetworkDiagram } from "@/components/shared/network-diagram"
import { useRole, roleContent } from "@/lib/role-context"
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
    icon: Smartphone,
    titulo: "Exposición temprana",
    descripcion: "La edad media del primer contacto con un smartphone es 9 años. Con 7, el 40% ya tiene acceso a Internet sin supervisión.",
  },
  {
    icon: EyeOff,
    titulo: "Pornografía",
    descripcion: "El 90% de los menores acceden a contenido pornográfico antes de los 14 años, normalmente de forma accidental.",
  },
  {
    icon: Dices,
    titulo: "Apuestas online",
    descripcion: "Las plataformas de apuestas y gaming con loot boxes normalizan la conducta adictiva entre los menores.",
  },
  {
    icon: ShieldAlert,
    titulo: "Violencia digital",
    descripcion: "Contenido violento, retos peligrosos y ciberbullo forman parte del ecosistema digital que consumen a diario.",
  },
  {
    icon: MessageCircle,
    titulo: "Redes sociales",
    descripcion: "Algoritmos diseñados para captar atención que generan ansiedad, comparación y adicción en cerebros en desarrollo.",
  },
  {
    icon: BrainCircuit,
    titulo: "Algoritmos opacos",
    descripcion: "Los motores de recomendación amplifican contenido extremo sin que las familias sean conscientes de su impacto.",
  },
]

const audienceIcons: Record<string, React.ElementType> = {
  familias: Users,
  colegios: GraduationCap,
  parroquias: Heart,
  "centros-sanitarios": Stethoscope,
}

function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 })

  const handleMouse = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }, [mouseX, mouseY])

  return (
    <div ref={ref} onMouseMove={handleMouse} className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.12]"
        style={{
          background: "radial-gradient(circle, oklch(0.65 0.17 55 / 0.4), transparent 70%)",
          left: "50%",
          top: "50%",
          x: springX.get() !== 0.5 ? useSpring(mouseX, { stiffness: 50, damping: 20 }) : 0,
          y: springY.get() !== 0.5 ? useSpring(mouseY, { stiffness: 50, damping: 20 }) : 0,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </div>
  )
}

export default function HomePage() {
  const { role } = useRole()
  const content = roleContent[role]

  return (
    <>
      {/* ─── HERO ─── */}
      <Section className="relative overflow-hidden min-h-[85vh] flex items-center">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video/intro.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background/95" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <MouseGlow />
        <Container className="relative text-center py-20 md:py-32">
          <AnimatedSection>
            <AnimatedItem>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Badge
                  variant="default"
                  className="mb-6 bg-white/10 text-white border border-white/20 backdrop-blur-sm inline-flex items-center gap-2 px-4 py-1.5"
                >
                  <span className="flex h-2 w-2 rounded-full bg-success-400 animate-pulse" />
                  {content.hero.badge}
                </Badge>
              </motion.div>
            </AnimatedItem>
            <AnimatedItem>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
                {content.hero.title}
                <br />
                <span className="bg-gradient-to-r from-brand-300 via-cyan-300 to-brand-300 bg-[length:200%_auto] animate-gradient text-transparent bg-clip-text">
                  {content.hero.highlight}
                </span>
              </h1>
            </AnimatedItem>
            <AnimatedItem>
              <p className="mt-6 text-lg md:text-xl text-slate-200/90 max-w-2xl mx-auto leading-relaxed">
                {content.hero.subtitle}
              </p>
            </AnimatedItem>
            <AnimatedItem>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/configurador"
                  className="group inline-flex h-12 items-center gap-2 rounded-xl bg-brand-600 px-6 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all duration-300 hover:bg-brand-700 hover:shadow-xl hover:shadow-brand-600/40 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>{content.cta.primary}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/metodo"
                  className="group inline-flex h-12 items-center gap-2 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-6 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>{content.cta.secondary}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </AnimatedItem>
            <AnimatedItem>
              <motion.div
                className="mt-16 flex items-center justify-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <motion.div
                  className="flex flex-col items-center gap-2 text-slate-400/60 text-xs"
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                  </svg>
                  <span>Desplázate para descubrir</span>
                </motion.div>
              </motion.div>
            </AnimatedItem>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ─── PROBLEMAS ─── */}
      <Section className="relative overflow-hidden">
        <div className="orb orb-3" style={{ opacity: 0.05 }} />
        <Container>
          <AnimatedSection>
            <AnimatedItem>
              <div className="text-center mb-16">
                <Badge variant="accent" className="mb-4">Realidad digital</Badge>
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
                  <PremiumCard hover={true} variant="glass" className="h-full">
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

      {/* ─── VISUAL: CÓMO FUNCIONA ─── */}
      <Section className="relative overflow-hidden bg-gradient-to-b from-background to-slate-50/30">
        <Container>
          <AnimatedSection>
            <AnimatedItem>
              <div className="text-center mb-10">
                <Badge variant="cyan" className="mb-4">Cómo funciona</Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                  Un filtro en tu conexión a Internet
                </h2>
                <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
                  El DNS de protección actúa como un portero digital: antes de que cualquier página web llegue a tus hijos, el sistema decide si es segura o no.
                </p>
              </div>
            </AnimatedItem>
            <AnimatedItem>
              <NetworkDiagram variant="full-home" protected_={true} className="mb-6" />
            </AnimatedItem>
            <AnimatedItem>
              <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                {[
                  { icon: Shield, label: "DNS protector", desc: "Filtra contenido inadecuado antes de que llegue" },
                  { icon: Wifi, label: "Toda la red", desc: "Un solo cambio protege todos tus dispositivos" },
                  { icon: CheckCircle2, label: "Funciona solo", desc: "No necesitas instalar nada en cada dispositivo" },
                ].map(item => (
                  <div key={item.label} className="text-center p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
                    <item.icon className="h-6 w-6 text-brand-500 mx-auto mb-2" />
                    <h3 className="text-sm font-semibold text-slate-900">{item.label}</h3>
                    <p className="text-[11px] text-slate-500 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </AnimatedItem>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ─── MODELO (CRÍTICO: 70% del mensaje) ─── */}
      <Section className="relative overflow-hidden bg-gradient-to-b from-slate-50/80 via-background to-slate-50/30">
        <div className="orb orb-3 opacity-[0.03]" />
        <Container size="lg">
          <AnimatedSection>
            <AnimatedItem>
              <div className="text-center mb-12">
                <Badge variant="default" className="mb-4">Modelo de protección</Badge>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
                  De la protección a la autonomía
                </h2>
                <p className="mt-4 text-lg text-slate-500 max-w-3xl mx-auto">
                  El secreto no está en elegir entre filtros o diálogo. Está en saber cuánto peso dar a cada según la edad del menor.
                </p>
              </div>
            </AnimatedItem>

            <AnimatedItem>
              <motion.div
                className="relative rounded-3xl overflow-hidden mb-10 shadow-lg bg-white"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <img
                  src="/images/modelo-evolucion.jpg"
                  alt="Modelo de Evolución de la Protección Digital Infantil: del control a la autonomía"
                  className="w-full h-auto"
                />
              </motion.div>
            </AnimatedItem>

            <AnimatedItem>
              <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto text-center">
                {[
                  { age: "4-12 años", title: "Predomina la técnica", desc: "Los filtros y restricciones son la base de la seguridad", color: "border-brand-200 bg-brand-50/50" },
                  { age: "13 años", title: "Punto de inflexión", desc: "La educación empieza a pesar más que la tecnología", color: "border-amber-200 bg-amber-50/50 ring-2 ring-amber-300" },
                  { age: "14-18 años", title: "Gana el diálogo", desc: "El acompañamiento educativo es el 80% de la protección", color: "border-cyan-200 bg-cyan-50/50" },
                ].map((item, i) => (
                  <div key={i} className={`rounded-2xl border p-5 ${item.color} transition-all hover:shadow-md`}>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">{item.age}</p>
                    <h3 className="text-base font-bold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </AnimatedItem>

            <AnimatedItem>
              <div className="text-center mt-10">
                <Link
                  href="/modelo"
                  className="group inline-flex h-11 items-center gap-2 rounded-xl bg-brand-600 px-6 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-brand-700 hover:shadow-lg hover:scale-[1.02]"
                >
                  <span>Ver el modelo completo</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </AnimatedItem>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ─── MÉTODO EN 2 CAPAS (RESUMEN) ─── */}
      <Section className="relative overflow-hidden bg-gradient-to-b from-slate-50/50 to-background">
        <Container>
          <AnimatedSection>
            <AnimatedItem>
              <div className="text-center mb-12">
                <Badge variant="default" className="mb-4">Método</Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                  Dos capas de protección
                </h2>
                <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
                  DNS de protección + control parental. Simple, gratuito y eficaz.
                </p>
              </div>
            </AnimatedItem>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <AnimatedItem>
                <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                  <div className="relative group rounded-2xl border border-brand-200/40 bg-gradient-to-br from-brand-50/80 to-white p-6 sm:p-8 shadow-sm hover:shadow-lg hover:shadow-brand-500/10 transition-all duration-300 h-full">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-100 mb-4">
                      <Wifi className="h-7 w-7 text-brand-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">DNS de protección</h3>
                    <p className="text-sm text-slate-500 mb-4 leading-relaxed">Filtrado a nivel de red que bloquea contenido inadecuado antes de que llegue al dispositivo.</p>
                    <Link href="/metodo" className="text-sm font-medium text-brand-600 hover:text-brand-700 inline-flex items-center gap-1 group/link">
                      Ver capa 1 <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatedItem>
              <AnimatedItem>
                <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                  <div className="relative group rounded-2xl border border-cyan-200/40 bg-gradient-to-br from-cyan-50/80 to-white p-6 sm:p-8 shadow-sm hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 h-full">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-100 mb-4">
                      <Smartphone className="h-7 w-7 text-cyan-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">Control parental</h3>
                    <p className="text-sm text-slate-500 mb-4 leading-relaxed">Supervisión y acompañamiento con límites de uso, restricciones de apps y filtros por edad.</p>
                    <Link href="/metodo" className="text-sm font-medium text-cyan-600 hover:text-cyan-700 inline-flex items-center gap-1 group/link">
                      Ver capa 2 <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatedItem>
            </div>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ─── EVOLUCIÓN POR EDADES (RESUMEN) ─── */}
      <Section className="relative overflow-hidden bg-gradient-to-b from-background to-slate-50/30">
        <Container>
          <AnimatedSection>
            <AnimatedItem>
              <div className="text-center mb-12">
                <Badge variant="cyan" className="mb-4">Evolución</Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                  De los filtros al criterio
                </h2>
                <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
                  La protección se adapta a la madurez del menor. Los filtros son un puente; el destino es formar criterio propio.
                </p>
              </div>
            </AnimatedItem>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { icon: Baby, rango: "0-6", titulo: "Primera infancia", desc: "Control total del entorno digital." },
                { icon: Smile, rango: "7-11", titulo: "Infancia", desc: "Permisos ampliados con supervisión." },
                { icon: User, rango: "12-14", titulo: "Adolescencia temprana", desc: "Transición hacia la autonomía." },
                { icon: UserCheck, rango: "15-17", titulo: "Adolescencia tardía", desc: "Criterio personal como filtro principal." },
              ].map((edad) => (
                <AnimatedItem key={edad.rango}>
                  <PremiumCard variant="glass" className="text-center h-full">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 mx-auto mb-3">
                      <edad.icon className="h-6 w-6 text-brand-600" />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 mb-1">{edad.rango} años</p>
                    <h3 className="text-sm font-semibold text-slate-900 mb-1">{edad.titulo}</h3>
                    <p className="text-xs text-slate-500">{edad.desc}</p>
                  </PremiumCard>
                </AnimatedItem>
              ))}
            </div>
            <AnimatedItem>
              <div className="text-center mt-8">
                <Link
                  href="/metodo"
                  className="group inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-white px-6 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:bg-slate-50 hover:shadow-md"
                >
                  <span>Ver método completo por edades</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </AnimatedItem>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ─── AUDIENCIAS ─── */}
      <Section className="relative overflow-hidden bg-gradient-to-b from-slate-50/30 to-background">
        <Container>
          <AnimatedSection>
            <AnimatedItem>
              <div className="text-center mb-16">
                <Badge variant="success" className="mb-4">Comunidades</Badge>
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
                    <PremiumCard variant="glass" className="h-full text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success-100 mx-auto mb-5">
                        <Icon className="h-6 w-6 text-success-500" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">{audience.titulo}</h3>
                      <p className="text-sm text-slate-500 mb-4 line-clamp-3">{audience.descripcion}</p>
                      <Link
                        href={`/${audience.id}`}
                        className="text-sm font-medium text-brand-600 hover:text-brand-700 inline-flex items-center gap-1 group/link"
                      >
                        Saber más <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                      </Link>
                    </PremiumCard>
                  </AnimatedItem>
                )
              })}
            </div>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ─── CTA FINAL ─── */}
      <Section className="relative overflow-hidden bg-gradient-to-b from-background via-brand-50/20 to-background">
        <div className="orb orb-2" style={{ opacity: 0.04 }} />
        <Container className="text-center">
          <AnimatedSection>
            <AnimatedItem>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Shield className="h-12 w-12 text-brand-600 mx-auto mb-6" />
              </motion.div>
            </AnimatedItem>
            <AnimatedItem>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
                Proteger para educar.
                <br />
                <span className="bg-gradient-to-r from-brand-600 to-cyan-600 bg-clip-text text-transparent">Educar para liberar.</span>
              </h2>
              <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed mb-10">
                No se trata de construir muros. Se trata de acompañar a los menores mientras desarrollan el criterio necesario para navegar el mundo digital con libertad y responsabilidad.
              </p>
            </AnimatedItem>
            <AnimatedItem>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/configurador"
                  className="group inline-flex h-12 items-center gap-2 rounded-xl bg-brand-600 px-8 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all duration-300 hover:bg-brand-700 hover:shadow-xl hover:shadow-brand-600/40 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Empezar ahora</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/metodo"
                  className="group inline-flex h-12 items-center gap-2 rounded-xl border border-border bg-white px-8 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:bg-slate-50 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Conocer el método</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </AnimatedItem>
          </AnimatedSection>
        </Container>
      </Section>
    </>
  )
}
