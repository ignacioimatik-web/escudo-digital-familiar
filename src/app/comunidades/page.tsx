"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users, GraduationCap, Heart, Stethoscope, Shield, ArrowRight, CheckCircle2 } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import { PremiumCard } from "@/components/ui/premium-card"
import Link from "next/link"

const communities = [
  {
    id: "familias",
    icon: Users,
    label: "Familias",
    color: "success",
    gradient: "from-success-500 to-emerald-600",
    desc: "Protege a tus hijos en el entorno digital",
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
    desc: "Implementa protección digital en tu centro educativo",
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
    gradient: "from-accent-500 to-orange-600",
    desc: "Crea entornos digitales seguros en tu comunidad",
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
    desc: "La salud digital como parte de la salud infantil",
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

export default function ComunidadesPage() {
  const [active, setActive] = useState(0)
  const current = communities[active]

  return (
    <>
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/40 via-background to-background" />
        <Container size="md">
          <Badge variant="default" className="mb-6">Comunidades</Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            Para cada comunidad
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-2xl">
            El Escudo Digital Familiar está diseñado para adaptarse a las necesidades de cada comunidad.
            Selecciona la tuya para obtener información y recursos específicos.
          </p>
        </Container>
      </Section>

      {/* Tabs */}
      <Section className="-mt-[200px] pt-0">
        <Container size="md" className="mt-[100px]">
          <div className="flex flex-wrap gap-2 mb-8">
            {communities.map((c, i) => {
              const Icon = c.icon
              return (
                <button
                  key={c.id}
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    i === active
                      ? "bg-brand-600 text-white shadow-md"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-800"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {c.label}
                </button>
              )
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              {/* Hero card */}
              <div className={`rounded-2xl bg-gradient-to-br ${current.gradient} p-8 md:p-12 text-white mb-8`}>
                <div className="flex items-center gap-3 mb-4">
                  <current.icon className="w-8 h-8 opacity-80" />
                  <Badge variant="default" className="bg-white/20 text-white border-white/20">
                    {current.label}
                  </Badge>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-3">{current.desc}</h2>
                <p className="text-white/80 leading-relaxed max-w-xl">{current.content.challenge}</p>
              </div>

              {/* Approach */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <PremiumCard>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Nuestro enfoque</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{current.content.approach}</p>
                </PremiumCard>

                <PremiumCard>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Beneficios</h3>
                  <ul className="space-y-2">
                    {current.content.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-success-500 mt-0.5 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </PremiumCard>
              </div>

              {/* Steps */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 mb-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Pasos recomendados</h3>
                <div className="space-y-4">
                  {current.content.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-brand-700 text-sm font-bold shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-sm text-slate-600 pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="text-center">
                <Link
                  href="/configurador"
                  className="inline-flex h-12 items-center gap-2 rounded-xl bg-brand-600 px-8 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:bg-brand-700 hover:shadow-xl"
                >
                  Ir al configurador
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </Container>
      </Section>
    </>
  )
}
