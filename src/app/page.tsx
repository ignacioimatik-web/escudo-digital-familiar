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
                className="relative rounded-3xl overflow-hidden mb-10 shadow-lg"
                style={{ backgroundColor: '#f5eedc' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {/* Cloud-like decorative border */}
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: `radial-gradient(circle at 20% 30%, #7fb0d0 8px, transparent 8px),
                                    radial-gradient(circle at 80% 20%, #7fb0d0 6px, transparent 6px),
                                    radial-gradient(circle at 50% 10%, #7fb0d0 10px, transparent 10px),
                                    radial-gradient(circle at 15% 70%, #7fb0d0 5px, transparent 5px),
                                    radial-gradient(circle at 90% 80%, #7fb0d0 7px, transparent 7px)`,
                  backgroundSize: '120px 120px'
                }} />
                <div className="relative z-10 p-4 sm:p-6 md:p-8">
                <svg viewBox="0 0 800 420" className="w-full h-auto" fill="none">
                  <defs>
                    {/* Plastilina-style filters */}
                    <filter id="puffBlue">
                      <feGaussianBlur stdDeviation="1.5" result="blur" />
                      <feSpecularLighting in="blur" surfaceScale="3" specularConstant="0.6" specularExponent="15" result="spec">
                        <fePointLight x="200" y="100" z="200" />
                      </feSpecularLighting>
                      <feComposite in="SourceGraphic" in2="spec" operator="arithmetic" k1="0" k2="1" k3="0.3" k4="0" />
                      <feGaussianBlur stdDeviation="0.5" />
                    </filter>
                    <filter id="shadowDrop">
                      <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#00000022" />
                    </filter>
                    <linearGradient id="areaBlue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1a2942" stopOpacity="0.12" />
                      <stop offset="100%" stopColor="#1a2942" stopOpacity="0.02" />
                    </linearGradient>
                    <linearGradient id="areaOrange" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#e8935a" stopOpacity="0.12" />
                      <stop offset="100%" stopColor="#e8935a" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>

                  {/* Ejes - marrón oscuro tipo plastilina */}
                  <line x1="80" y1="40" x2="80" y2="340" stroke="#5c4033" strokeWidth="4" strokeLinecap="round" />
                  <line x1="80" y1="340" x2="740" y2="340" stroke="#5c4033" strokeWidth="4" strokeLinecap="round" />

                  {/* Grid suave */}
                  {[20,40,60,80].map(v => (
                    <line key={v} x1="80" y1={40+(1-v/100)*300} x2="740" y2={40+(1-v/100)*300} stroke="#d4c9b0" strokeWidth="1.5" strokeDasharray="5,5" />
                  ))}

                  {/* Eje Y labels */}
                  <text x="70" y="28" textAnchor="end" className="fill-[#5c4033] text-[10px] font-bold">Peso (%)</text>
                  {[0,20,40,60,80,100].map(v => (
                    <text key={v} x="72" y={44+(1-v/100)*300} textAnchor="end" className="fill-[#5c4033] text-[9px] font-bold">{v}%</text>
                  ))}

                  {/* Eje X labels */}
                  <text x="110" y="360" textAnchor="middle" className="fill-[#5c4033] text-[11px] font-bold">4 Años</text>
                  <text x="420" y="360" textAnchor="middle" className="fill-[#5c4033] text-[11px] font-bold">13 Años</text>
                  <text x="710" y="360" textAnchor="middle" className="fill-[#5c4033] text-[11px] font-bold">18 Años</text>

                  {/* Áreas de relleno */}
                  <path d="M 110 100 Q 265 160 420 200 Q 575 240 710 260 L 710 340 L 110 340 Z" fill="url(#areaBlue)" />
                  <path d="M 110 300 Q 265 240 420 200 Q 575 150 710 100 L 710 340 L 110 340 Z" fill="url(#areaOrange)" />

                  {/* Curva AZUL plastilina (Protección Técnica) */}
                  <path d="M 110 100 Q 265 160 420 200 Q 575 240 710 260"
                    stroke="#1a2942" strokeWidth="8" strokeLinecap="round" fill="none"
                    filter="url(#shadowDrop)" />
                  <path d="M 110 100 Q 265 160 420 200 Q 575 240 710 260"
                    stroke="#2c5c8f" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.6" />

                  {/* Curva NARANJA plastilina (Acompañamiento) */}
                  <path d="M 110 300 Q 265 240 420 200 Q 575 150 710 100"
                    stroke="#8b4513" strokeWidth="8" strokeLinecap="round" fill="none"
                    filter="url(#shadowDrop)" />
                  <path d="M 110 300 Q 265 240 420 200 Q 575 150 710 100"
                    stroke="#e8935a" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.7" />

                  {/* Nudo/unión en el punto de inflexión */}
                  <g filter="url(#shadowDrop)">
                    <circle cx="420" cy="200" r="16" fill="#f5eedc" stroke="#5c4033" strokeWidth="3" />
                    <path d="M 412 192 Q 420 200 428 192" stroke="#1a2942" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    <path d="M 412 208 Q 420 200 428 208" stroke="#e8935a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    <circle cx="420" cy="200" r="5" fill="#d4875a" />
                  </g>

                  {/* Línea vertical guía en punto de inflexión */}
                  <line x1="420" y1="40" x2="420" y2="340" stroke="#d4875a" strokeWidth="2" strokeDasharray="6,4" opacity="0.5" />
                  <text x="420" y="378" textAnchor="middle" className="fill-[#d4875a] text-[10px] font-bold">⚡ Punto de inflexión</text>

                  {/* Caja de datos */}
                  <rect x="335" y="48" width="170" height="42" rx="8" fill="white" stroke="#d4875a" strokeWidth="1.5" filter="url(#shadowDrop)" />
                  <text x="345" y="64" className="fill-[#1a2942] text-[9px] font-bold">Protección: ~45%</text>
                  <text x="345" y="80" className="fill-[#e8935a] text-[9px] font-bold">Acompañamiento: ~55%</text>

                  {/* Leyenda */}
                  <g transform="translate(600, 42)">
                    <rect x="0" y="0" width="14" height="14" rx="3" fill="#2c5c8f" />
                    <text x="20" y="11" className="fill-[#5c4033] text-[9px] font-bold">Protección Técnica</text>
                    <rect x="0" y="22" width="14" height="14" rx="3" fill="#e8935a" />
                    <text x="20" y="33" className="fill-[#5c4033] text-[9px] font-bold">Acompañamiento</text>
                  </g>

                  {/* Iconos extremos */}
                  <g transform="translate(105, 85)">
                    <rect x="-10" y="-10" width="20" height="20" rx="5" fill="#1a2942" />
                    <path d="M-4-4L4-4L4-1L2-1L2 2L-2 2L-2-1L-4-1Z" fill="white" />
                    <circle cx="0" cy="-6" r="3" fill="white" />
                  </g>
                  <g transform="translate(705, 88)">
                    <rect x="-10" y="-10" width="20" height="20" rx="5" fill="#e8935a" />
                    <circle cx="0" cy="-3" r="3" fill="white" />
                    <path d="M-4 1 Q0 6 4 1" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  </g>
                </svg>
                </div>
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
