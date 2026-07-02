"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight, Shield, Brain, Navigation, AlertTriangle, Lock, Users, BookOpen } from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}
const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
}

function FadeInView({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  return (
    <motion.div ref={ref} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className={className}>
      {children}
    </motion.div>
  )
}

function FadeItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return <motion.div variants={fadeUp} className={className}>{children}</motion.div>
}

// ── The Crossing Chart SVG ──
function CrossingChart() {
  const w = 900, h = 520, pad = { top: 40, right: 40, bottom: 70, left: 70 }
  const gx = (x: number) => pad.left + (x / 18) * (w - pad.left - pad.right)
  const gy = (y: number) => pad.top + (1 - y / 100) * (h - pad.top - pad.bottom)

  // Control points for smooth bezier curves
  const pTech = [
    { x: 4, y: 98 }, { x: 7, y: 82 }, { x: 10, y: 60 },
    { x: 13, y: 45 }, { x: 15.5, y: 35 }, { x: 18, y: 25 },
  ]
  const pEdu = [
    { x: 4, y: 5 }, { x: 7, y: 18 }, { x: 10, y: 35 },
    { x: 13, y: 55 }, { x: 15.5, y: 70 }, { x: 18, y: 83 },
  ]

  const techD = pTech.map((p, i) => {
    const px = gx(p.x), py = gy(p.y)
    if (i === 0) return `M ${px} ${py}`
    const prev = pTech[i - 1]
    const cpx = gx((prev.x + p.x) / 2), cpy = gy(prev.y)
    return `C ${cpx} ${cpy} ${cpx} ${py} ${px} ${py}`
  }).join(" ")

  const eduD = pEdu.map((p, i) => {
    const px = gx(p.x), py = gy(p.y)
    if (i === 0) return `M ${px} ${py}`
    const prev = pEdu[i - 1]
    const cpx = gx((prev.x + p.x) / 2), cpy = gy(prev.y)
    return `C ${cpx} ${cpy} ${cpx} ${py} ${px} ${py}`
  }).join(" ")

  // Area paths (close to bottom)
  const techArea = techD + ` L ${gx(18)} ${gy(0)} L ${gx(4)} ${gy(0)} Z`
  const eduArea = eduD + ` L ${gx(18)} ${gy(0)} L ${gx(4)} ${gy(0)} Z`

  const inflectionX = gx(13)

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" fill="none">
      <defs>
        <linearGradient id="techGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2c5c8f" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#2c5c8f" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="eduGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8935a" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#e8935a" stopOpacity="0.05" />
        </linearGradient>
        <filter id="glowTech"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <filter id="glowEdu"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>

      {/* Grid lines */}
      {[0, 20, 40, 60, 80, 100].map(v => (
        <line key={v} x1={pad.left} y1={gy(v)} x2={w - pad.right} y2={gy(v)} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4,4" />
      ))}

      {/* Y-axis label */}
      <text x={pad.left - 8} y={pad.top - 8} textAnchor="start" className="fill-slate-400 text-[10px] font-semibold uppercase tracking-wider">Peso Estratégico (%)</text>
      {[0, 20, 40, 60, 80, 100].map(v => (
        <text key={v} x={pad.left - 10} y={gy(v) + 4} textAnchor="end" className="fill-slate-400 text-[11px]">{v}%</text>
      ))}

      {/* X-axis labels */}
      <text x={gx(4)} y={h - 10} textAnchor="middle" className="fill-slate-700 text-[13px] font-bold">4 Años</text>
      <text x={inflectionX} y={h - 10} textAnchor="middle" className="fill-slate-700 text-[13px] font-bold">13 Años</text>
      <text x={gx(18)} y={h - 10} textAnchor="middle" className="fill-slate-700 text-[13px] font-bold">18 Años</text>
      <text x={(pad.left + w - pad.right) / 2} y={h - 45} textAnchor="middle" className="fill-slate-400 text-[10px] font-semibold uppercase tracking-wider">Edad del Menor</text>

      {/* Inflection point line */}
      <motion.line
        x1={inflectionX} y1={gy(0)} x2={inflectionX} y2={gy(100)}
        stroke="#f59e0b" strokeWidth="2" strokeDasharray="6,4"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.5 }}
      />
      <motion.circle
        cx={inflectionX} cy={gy(0)} r={4} fill="#f59e0b"
        initial={{ scale: 0 }} whileInView={{ scale: 1 }}
        viewport={{ once: true }} transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.7 }}
      />

      {/* Tech area (blue) */}
      <motion.path
        d={techArea} fill="url(#techGrad)"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.8 }}
      />

      {/* Edu area (orange) */}
      <motion.path
        d={eduArea} fill="url(#eduGrad)"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }}
      />

      {/* Tech curve (blue line) */}
      <motion.path
        d={techD} stroke="#1a2942" strokeWidth="3" strokeLinecap="round"
        fill="none" filter="url(#glowTech)"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
        viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeInOut" }}
      />
      {pTech.map((p, i) => (
        <motion.circle
          key={i} cx={gx(p.x)} cy={gy(p.y)} r={5} fill="#1a2942"
          initial={{ scale: 0 }} whileInView={{ scale: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.8 + i * 0.15, type: "spring" }}
        />
      ))}

      {/* Edu curve (orange line) */}
      <motion.path
        d={eduD} stroke="#e8935a" strokeWidth="3" strokeLinecap="round"
        fill="none" filter="url(#glowEdu)"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
        viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
      />
      {pEdu.map((p, i) => (
        <motion.circle
          key={i} cx={gx(p.x)} cy={gy(p.y)} r={5} fill="#e8935a"
          initial={{ scale: 0 }} whileInView={{ scale: 1 }}
          viewport={{ once: true }} transition={{ delay: 1.0 + i * 0.15, type: "spring" }}
        />
      ))}

      {/* Curve labels */}
      <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.5 }}>
        <rect x={gx(5.5) - 4} y={gy(68) - 12} width="14" height="14" rx="3" fill="#1a2942" />
        <text x={gx(5.5) + 14} y={gy(68) + 3} className="fill-slate-700 text-[11px] font-bold">Protección Técnica</text>
      </motion.g>
      <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.7 }}>
        <rect x={gx(5.5) - 4} y={gy(28) - 12} width="14" height="14" rx="3" fill="#e8935a" />
        <text x={gx(5.5) + 14} y={gy(28) + 3} className="fill-slate-700 text-[11px] font-bold">Acompañamiento Educativo</text>
      </motion.g>

      {/* Inflection data box */}
      <motion.g
        initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ delay: 1.2, type: "spring" }}
      >
        <rect x={inflectionX - 80} y={gy(50) - 44} width="160" height="36" rx="8" fill="white" stroke="#f59e0b" strokeWidth="1.5" className="shadow-sm" />
        <text x={inflectionX - 70} y={gy(50) - 28} className="fill-slate-600 text-[9px] font-medium">Protección Técnica: ~45%</text>
        <text x={inflectionX - 70} y={gy(50) - 16} className="fill-slate-600 text-[9px] font-medium">Acomp. Educativo: ~55%</text>
      </motion.g>

      {/* Icons */}
      <motion.g initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 2, type: "spring" }}>
        <rect x={gx(4) - 14} y={gy(100) - 34} width="28" height="28" rx="6" fill="#1a2942" />
        <Lock className="text-white" style={{ transform: `translate(${gx(4) - 7}px, ${gy(100) - 27}px)`, width: 14, height: 14 }} />
      </motion.g>
      <motion.g initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 2.15, type: "spring" }}>
        <rect x={gx(18) - 14} y={gy(85) - 34} width="28" height="28" rx="6" fill="#e8935a" />
        <Users className="text-white" style={{ transform: `translate(${gx(18) - 7}px, ${gy(85) - 27}px)`, width: 14, height: 14 }} />
      </motion.g>
    </svg>
  )
}

// ── Risk cards ──
const risks = [
  { icon: Navigation, color: "brand", title: "Incapacidad de navegación segura", desc: "Sin formación, el joven carece de las habilidades necesarias para identificar y gestionar peligros por sí mismo cuando las barreras técnicas fallan." },
  { icon: Shield, color: "accent", title: "Pérdida de eficacia de la protección", desc: "Si solo existen limitaciones técnicas sin base educativa, la seguridad se vuelve ineficaz a medida que el adolescente busca independencia." },
  { icon: Brain, color: "brand", title: "Falta de autonomía personal", desc: "La falta de acompañamiento impide que el adolescente desarrolle el criterio propio necesario para tomar decisiones responsables en el entorno digital." },
  { icon: AlertTriangle, color: "accent", title: "Vulnerabilidad en la adolescencia", desc: "Después de los 13 años, el peso de la técnica cae por debajo del 50%; sin educación, el joven queda desprotegido en la etapa de mayor riesgo." },
]

const navItems = [
  { id: "grafico", label: "El modelo" },
  { id: "fases", label: "Tres fases" },
  { id: "riesgos", label: "Riesgos" },
  { id: "aplicar", label: "Aplicarlo" },
]

export default function ModeloPage() {
  return (
    <>
      {/* ─── Sticky nav ─── */}
      <nav className="sticky top-16 z-40 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl">
        <Container size="lg">
          <div className="flex items-center gap-6 py-3 overflow-x-auto">
            {navItems.map(item => (
              <a key={item.id} href={`#${item.id}`} className="text-xs font-semibold text-slate-500 hover:text-brand-600 transition-colors whitespace-nowrap uppercase tracking-wider">
                {item.label}
              </a>
            ))}
          </div>
        </Container>
      </nav>

      {/* ─── HERO ─── */}
      <Section className="relative overflow-hidden bg-gradient-to-b from-brand-950 via-brand-900 to-slate-900 pt-20 pb-0">
        <div className="orb orb-1 opacity-30" />
        <div className="orb orb-2 opacity-20" />
        <Container size="lg" className="text-center relative">
          <FadeInView>
            <FadeItem>
              <Badge variant="default" className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm">
                🔬 Modelo de protección
              </Badge>
            </FadeItem>
            <FadeItem>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight">
                Evolución de la<br />
                <span className="bg-gradient-to-r from-brand-300 via-cyan-300 to-brand-300 bg-[length:200%_auto] animate-gradient text-transparent bg-clip-text">
                  Protección Digital Infantil
                </span>
              </h1>
            </FadeItem>
            <FadeItem>
              <p className="mt-6 text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto font-light">
                Del control a la autonomía
              </p>
            </FadeItem>
            <FadeItem>
              <p className="mt-4 text-slate-400 max-w-xl mx-auto">
                Un modelo basado en evidencia que equilibra protección técnica y acompañamiento educativo según la edad del menor.
              </p>
            </FadeItem>
          </FadeInView>
        </Container>
      </Section>

      {/* ─── THE CHART ─── */}
      <Section id="grafico" className="relative -mt-24 pt-0">
        <Container size="lg">
          <motion.div
            className="bg-white rounded-3xl border border-slate-200 shadow-xl p-4 sm:p-8 md:p-12 -mt-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="/images/modelo-evolucion.png"
              alt="Modelo de Evolución de la Protección Digital Infantil: del control a la autonomía"
              className="w-full h-auto"
            />
          </motion.div>
        </Container>
      </Section>

      {/* ─── THREE PHASES ─── */}
      <Section id="fases" className="bg-gradient-to-b from-slate-50/80 to-background">
        <Container size="lg">
          <FadeInView>
            <FadeItem>
              <div className="text-center mb-16">
                <Badge variant="default" className="mb-4">Las tres fases</Badge>
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
                  El viaje de la protección a la autonomía
                </h2>
                <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
                  El modelo se divide en tres etapas claras. Cada una requiere un equilibrio distinto entre técnica y educación.
                </p>
              </div>
            </FadeItem>

            {[
              {
                phase: "Fase 1", ages: "4 — 12 años",
                title: "Infancia Temprana: El Predominio Técnico",
                color: "brand",
                desc: "A los 4 años, la protección técnica es del 100%. En esta etapa, las restricciones tecnológicas rígidas son la base fundamental para garantizar la seguridad del menor.",
                balance: "Técnica 100% → 60% · Educación 0% → 40%",
                img: <Lock className="w-10 h-10" />,
              },
              {
                phase: "⚡ Punto de Inflexión", ages: "13 años",
                title: "El Cambio de Mando",
                color: "accent",
                desc: "Al inicio de la adolescencia, el peso estratégico de la educación supera a las barreras técnicas, marcando el inicio de la transición hacia la autonomía personal.",
                balance: "Técnica ~45% · Educación ~55%",
                img: <Brain className="w-10 h-10" />,
                highlight: true,
              },
              {
                phase: "Fase 2", ages: "14 — 18 años",
                title: "Adolescencia y Madurez: El Poder del Diálogo",
                color: "cyan",
                desc: "La relevancia de la técnica disminuye drásticamente, mientras el acompañamiento educativo debe alcanzar más del 80% del peso estratégico al llegar a los 18 años.",
                balance: "Técnica 25% · Educación >80%",
                img: <Users className="w-10 h-10" />,
              },
            ].map((phase, i) => (
              <FadeItem key={i}>
                <motion.div
                  className={`relative rounded-3xl p-8 md:p-12 mb-8 border overflow-hidden ${
                    phase.highlight
                      ? "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200/60 shadow-lg shadow-amber-500/10"
                      : phase.color === "brand"
                        ? "bg-gradient-to-br from-brand-50 to-white border-brand-200/40"
                        : "bg-gradient-to-br from-cyan-50 to-white border-cyan-200/40"
                  }`}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {phase.highlight && (
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-amber-200/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
                  )}
                  <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 relative z-10">
                    <div className={`flex h-16 w-16 items-center justify-center rounded-2xl shrink-0 ${
                      phase.highlight ? "bg-amber-100 text-amber-600" : phase.color === "brand" ? "bg-brand-100 text-brand-600" : "bg-cyan-100 text-cyan-600"
                    }`}>
                      {phase.img}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-xs font-bold uppercase tracking-widest ${
                          phase.highlight ? "text-amber-500" : phase.color === "brand" ? "text-brand-500" : "text-cyan-500"
                        }`}>{phase.phase}</span>
                        <span className="text-xs text-slate-400 font-medium">{phase.ages}</span>
                      </div>
                      <h3 className={`text-2xl md:text-3xl font-bold mb-3 ${
                        phase.highlight ? "text-slate-900" : "text-slate-900"
                      }`}>{phase.title}</h3>
                      <p className="text-slate-600 leading-relaxed max-w-2xl">{phase.desc}</p>
                    </div>
                    <div className={`shrink-0 px-5 py-3 rounded-xl text-sm font-bold whitespace-nowrap ${
                      phase.highlight
                        ? "bg-white/80 border border-amber-200 text-amber-700"
                        : "bg-white border border-slate-200 text-slate-700"
                    }`}>
                      {phase.balance}
                    </div>
                  </div>
                </motion.div>
              </FadeItem>
            ))}
          </FadeInView>
        </Container>
      </Section>

      {/* ─── RISKS ─── */}
      <Section id="riesgos" className="bg-gradient-to-b from-background to-slate-50/50">
        <Container size="lg">
          <FadeInView>
            <FadeItem>
              <div className="text-center mb-14">
                <Badge variant="accent" className="mb-4">⚠️ Riesgos</Badge>
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
                  Riesgos de no priorizar la educación
                </h2>
                <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
                  Cuando la protección técnica no se complementa con acompañamiento educativo, el menor queda expuesto en la etapa de mayor vulnerabilidad.
                </p>
              </div>
            </FadeItem>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {risks.map((risk, i) => {
                const Icon = risk.icon
                const isBrand = risk.color === "brand"
                return (
                  <FadeItem key={i}>
                    <motion.div
                      className="h-full rounded-2xl border bg-white p-6 sm:p-7 shadow-sm hover:shadow-md transition-all duration-300"
                      whileHover={{ y: -4 }}
                    >
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl mb-5 ${
                        isBrand ? "bg-brand-100" : "bg-accent-100"
                      }`}>
                        <Icon className={`h-6 w-6 ${isBrand ? "text-brand-600" : "text-accent-500"}`} />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mb-2">{risk.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{risk.desc}</p>
                    </motion.div>
                  </FadeItem>
                )
              })}
            </div>
          </FadeInView>
        </Container>
      </Section>

      {/* ─── APPLY ─── */}
      <Section id="aplicar" className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-brand-950 to-slate-900">
        <div className="orb orb-1 opacity-20" />
        <Container size="lg" className="text-center relative">
          <FadeInView>
            <FadeItem>
              <Badge variant="default" className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm">
                🎯 Ponerlo en práctica
              </Badge>
            </FadeItem>
            <FadeItem>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                Cómo aplicar este modelo
              </h2>
            </FadeItem>
            <FadeItem>
              <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
                La clave no está en elegir entre tecnología o educación. Está en saber cuánto peso dar a cada una según la edad del menor.
              </p>
            </FadeItem>
            <FadeItem>
              <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
                {[
                  { step: "01", title: "Diagnostica", desc: "Evalúa la edad y madurez del menor para determinar el punto actual en la curva." },
                  { step: "02", title: "Equilibra", desc: "Ajusta la dosis de protección técnica y acompañamiento educativo según la fase." },
                  { step: "03", title: "Evoluciona", desc: "Revisa cada 3 meses. El modelo cambia, y tu estrategia también debe hacerlo." },
                ].map((item, i) => (
                  <motion.div
                    key={i} className="text-center p-6"
                    whileHover={{ y: -4 }}
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 border border-white/10 mx-auto mb-5">
                      <span className="text-lg font-bold text-brand-300">{item.step}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </FadeItem>
            <FadeItem>
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/configurador"
                  className="group inline-flex h-12 items-center gap-2 rounded-xl bg-brand-600 px-8 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all duration-300 hover:bg-brand-700 hover:shadow-xl hover:scale-[1.02]"
                >
                  <span>Ir al configurador</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/metodo"
                  className="group inline-flex h-12 items-center gap-2 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-8 text-sm font-semibold text-white hover:bg-white/10 transition-all duration-300"
                >
                  <span>Conocer el método</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </FadeItem>
          </FadeInView>
        </Container>
      </Section>
    </>
  )
}
