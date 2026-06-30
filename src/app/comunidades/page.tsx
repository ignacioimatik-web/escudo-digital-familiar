"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  Users, GraduationCap, Heart, Stethoscope, Shield,
  ArrowRight, CheckCircle2, Presentation, Sparkles,
  Baby, Smartphone, Smile, User, UserCheck,
  Monitor, Wifi, BookOpen, Star, Play
} from "lucide-react"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"

const communities = [
  {
    id: "familias",
    icon: Users,
    label: "Familias",
    color: "success",
    gradient: "from-emerald-500 to-green-600",
    glow: "bg-emerald-500/20",
    badge: "bg-emerald-100 text-emerald-700",
    desc: "Protege a tus hijos en el entorno digital",
    presentacionSlug: "presentacion-familias",
    presentacionLabel: "Charla para familias",
    presentacionDesc: "17 diapositivas · Enfoque práctico y cercano para madres y padres",
    content: {
      challenge: "Nuestros hijos crecen en un entorno digital lleno de oportunidades, pero también de riesgos: contenido inapropiado, adicción a las pantallas, ciberacoso, privacidad comprometida.",
      approach: "No se trata de prohibir la tecnología, sino de acompañar su uso. Se trata de proteger mientras educamos, de filtrar mientras formamos criterio.",
      benefits: [
        "Protección en dos capas: DNS de protección + control parental",
        "Guías paso a paso para cada dispositivo y sistema operativo",
        "Configurador interactivo adaptado a tu situación familiar",
        "Recursos para hablar con tus hijos sobre el mundo digital",
        "Acompañamiento por edades: de la protección total al criterio propio",
      ],
      steps: [
        "Configura la protección básica usando el configurador guiado",
        "Habla con tus hijos sobre por qué estás poniendo estas protecciones",
        "Revisa y ajusta periódicamente según su madurez",
      ],
    },
  },
  {
    id: "colegios",
    icon: GraduationCap,
    label: "Colegios",
    color: "cyan",
    gradient: "from-cyan-500 to-teal-600",
    glow: "bg-cyan-500/20",
    badge: "bg-cyan-100 text-cyan-700",
    desc: "Implementa protección digital en tu centro educativo",
    presentacionSlug: "presentacion-colegios",
    presentacionLabel: "Charla para colegios",
    presentacionDesc: "17 diapositivas · Enfoque escolar, legal y coordinación con familias",
    content: {
      challenge: "Los centros educativos son el segundo hogar digital de los alumnos. La protección debe extenderse del aula al hogar.",
      approach: "Proteger la red del centro, formar al profesorado y proporcionar recursos a las familias para que continúen la protección en casa.",
      benefits: [
        "Configuración de DNS de protección en la red del centro",
        "Materiales formativos para profesores y personal",
        "Charlas y talleres para familias",
        "Recursos adaptados por ciclos educativos",
        "Protocolo de actuación ante incidentes digitales",
      ],
      steps: [
        "Configura el DNS de protección en la red WiFi del centro",
        "Forma al profesorado con los materiales disponibles",
        "Organiza una charla para familias sobre protección digital",
      ],
    },
  },
  {
    id: "parroquias",
    icon: Heart,
    label: "Parroquias",
    color: "accent",
    gradient: "from-amber-500 to-orange-600",
    glow: "bg-amber-500/20",
    badge: "bg-amber-100 text-amber-700",
    desc: "Crea entornos digitales seguros en tu comunidad",
    presentacionSlug: "presentacion-parroquias",
    presentacionLabel: "Charla para parroquias",
    presentacionDesc: "18 diapositivas · Enfoque pastoral, valores y acompañamiento comunitario",
    content: {
      challenge: "Las parroquias son espacios de confianza donde niños y jóvenes crecen en comunidad. El mundo digital también necesita esa protección.",
      approach: "Ofrecer a las familias herramientas sencillas para proteger a los menores, desde la catequesis hasta los grupos juveniles.",
      benefits: [
        "Configuración de DNS en la red de la parroquia",
        "Materiales para catequesis y grupos de jóvenes",
        "Charlas para familias en el marco de la pastoral familiar",
        "Recursos adaptados al lenguaje y valores cristianos",
        "Formación para catequistas y monitores",
      ],
      steps: [
        "Configura el DNS de protección en la red WiFi de la parroquia",
        "Comparte los recursos con las familias de la catequesis",
        "Organiza una sesión formativa para catequistas y monitores",
      ],
    },
  },
  {
    id: "centros-sanitarios",
    icon: Stethoscope,
    label: "Centros sanitarios",
    color: "brand",
    gradient: "from-brand-500 to-brand-600",
    glow: "bg-brand-500/20",
    badge: "bg-brand-100 text-brand-700",
    desc: "La salud digital como parte de la salud infantil",
    presentacionSlug: "presentacion-sanitarios",
    presentacionLabel: "Charla para sanitarios",
    presentacionDesc: "17 diapositivas · Enfoque clínico, evidencia científica y prevención",
    content: {
      challenge: "El entorno digital es un determinante de salud cada vez más relevante. Los profesionales sanitarios pueden ser el primer punto de detección.",
      approach: "Proporcionar a las familias recursos de protección digital como parte de la promoción de la salud infantil y adolescente.",
      benefits: [
        "Materiales informativos para entregar a familias en consultas",
        "Formación para profesionales sanitarios sobre riesgos digitales",
        "Protocolos de detección de problemas relacionados con pantallas",
        "Recursos adaptados por edades (pediatría, adolescencia)",
        "Red de centros sanitarios comprometidos con la salud digital",
      ],
      steps: [
        "Descarga los materiales informativos para la sala de espera",
        "Comparte el protocolo de detección con el equipo",
        "Deriva a las familias a la plataforma para la configuración",
      ],
    },
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function ComunidadesPage() {
  const [active, setActive] = useState(0)
  const current = communities[active]

  return (
    <>
      {/* Hero */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/40 via-background to-background" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl -z-10" />
        <Container size="md">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="default" className="mb-6">Comunidades</Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
              Para cada comunidad
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed max-w-2xl">
              El Escudo Digital Familiar está diseñado para adaptarse a las necesidades de cada comunidad.
              Selecciona la tuya para obtener información y recursos específicos.
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* Tabs */}
      <Section className="-mt-[200px] pt-0">
        <Container size="md" className="mt-[100px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex flex-wrap gap-2 mb-8"
          >
            {communities.map((c, i) => {
              const Icon = c.icon
              return (
                <button
                  key={c.id}
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    i === active
                      ? "bg-gradient-to-r " + c.gradient + " text-white shadow-md"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-800"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {c.label}
                </button>
              )
            })}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              {/* Hero card con gradiente */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${current.gradient} p-8 md:p-12 text-white mb-8`}
              >
                <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-white/10 blur-3xl" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                      <current.icon className="w-6 h-6" />
                    </div>
                    <Badge variant="default" className="bg-white/20 text-white border-white/20 backdrop-blur-sm">
                      {current.label}
                    </Badge>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-3">{current.desc}</h2>
                  <p className="text-white/80 leading-relaxed max-w-xl">{current.content.challenge}</p>
                </div>
              </motion.div>

              {/* PRESENTACION LINK - Destacado */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="mb-8"
              >
                <Link
                  href={"/descargas/" + current.presentacionSlug}
                  className="group block relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-brand-500/10 hover:-translate-y-0.5"
                >
                  <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-brand-500/10 blur-3xl group-hover:bg-brand-500/20 transition-all" />
                  <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-cyan-500/10 blur-2xl" />

                  <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-5">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-cyan-500 shadow-lg shadow-brand-500/30">
                      <Presentation className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="h-4 w-4 text-amber-400" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">Presentación destacada</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-white mb-1">{current.presentacionLabel}</h3>
                      <p className="text-sm text-slate-400">{current.presentacionDesc}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-sm font-semibold text-white group-hover:text-brand-300 transition-colors">Ver presentación</span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-brand-500 transition-all">
                        <Play className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Approach + Benefits grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${current.gradient}`}>
                      <Shield className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">Nuestro enfoque</h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{current.content.approach}</p>
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  transition={{ delay: 0.05 }}
                  className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm hover:shadow-md transition-all"
                >
                  <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Star className={`h-5 w-5 ${current.id === "familias" ? "text-emerald-500" : current.id === "colegios" ? "text-cyan-500" : current.id === "parroquias" ? "text-amber-500" : "text-brand-500"}`} />
                    Beneficios
                  </h3>
                  <ul className="space-y-2">
                    {current.content.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle2 className={`h-4 w-4 shrink-0 mt-0.5 ${current.id === "familias" ? "text-emerald-500" : current.id === "colegios" ? "text-cyan-500" : current.id === "parroquias" ? "text-amber-500" : "text-brand-500"}`} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Steps */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm mb-8"
              >
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Pasos recomendados</h3>
                <div className="space-y-4">
                  {current.content.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${current.gradient} text-white text-sm font-bold shadow-sm`}>
                        {i + 1}
                      </div>
                      <p className="text-sm text-slate-600 pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* CTA principal */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Link
                  href={"/descargas/" + current.presentacionSlug}
                  className="inline-flex h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 px-6 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:shadow-xl hover:from-brand-700 hover:to-brand-800"
                >
                  <Presentation className="h-4 w-4" />
                  Ver presentación para {current.label.toLowerCase()}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/configurador"
                  className="inline-flex h-12 items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-brand-300 hover:text-brand-700 hover:shadow-md"
                >
                  Ir al configurador
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </Container>
      </Section>
    </>
  )
}
