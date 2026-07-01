"use client"

import Link from "next/link"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import {
  Users, GraduationCap, Heart, Stethoscope,
  FileText, Eye, Presentation,
  Shield, CheckSquare, FileSignature, Sparkles,
  ChevronDown
} from "lucide-react"

const areas = [
  {
    id: "familias",
    icon: Users,
    label: "Familias",
    color: "from-success-500 to-emerald-600",
    glow: "bg-success-500/10",
    bgColor: "bg-success-50",
    textColor: "text-success-600",
    borderColor: "border-success-200",
    desc: "Recursos para proteger a tus hijos en casa",
    recursos: [
      { href: "/descargas/cartel-familias", icon: FileText, label: "Cartel «Protege a tus hijos»", tipo: "1 pág · A4", desc: "Póster impactante con el mensaje clave de la protección digital.", premium: true },
      { href: "/descargas/guia-rapida", icon: FileText, label: "Guía rápida DNS + Control Parental", tipo: "3 pág · A4", desc: "Pasos esenciales ilustrados para configurar la protección." },
      { href: "/descargas/checklist", icon: CheckSquare, label: "Checklist de protección", tipo: "1 pág · A4", desc: "Verifica que tienes todo configurado correctamente." },
      { href: "/descargas/acuerdo-familiar", icon: FileSignature, label: "Acuerdo familiar digital", tipo: "1 pág · A4", desc: "Plantilla para pactar el uso de tecnología con tus hijos." },
      { href: "/descargas/presentacion-familias", icon: Presentation, label: "Presentación para familias", tipo: "17 diapositivas", desc: "Charla para madres y padres.", premium: true },
    ],
  },
  {
    id: "colegios",
    icon: GraduationCap,
    label: "Colegios",
    color: "from-cyan-500 to-teal-600",
    glow: "bg-cyan-500/10",
    bgColor: "bg-cyan-50",
    textColor: "text-cyan-600",
    borderColor: "border-cyan-200",
    desc: "Recursos para implementar protección en el centro",
    recursos: [
      { href: "/descargas/cartel-familias", icon: FileText, label: "Cartel para el centro", tipo: "1 pág · A4", desc: "Póster para anunciar la protección digital." },
      { href: "/descargas/guia-rapida", icon: FileText, label: "Guía de configuración", tipo: "3 pág · A4", desc: "Cómo configurar DNS en la red del colegio." },
      { href: "/descargas/presentacion-colegios", icon: Presentation, label: "Presentación para colegios", tipo: "17 diapositivas", desc: "Charla para equipos docentes.", premium: true },
    ],
  },
  {
    id: "parroquias",
    icon: Heart,
    label: "Parroquias",
    color: "from-accent-500 to-orange-600",
    glow: "bg-accent-500/10",
    bgColor: "bg-accent-50",
    textColor: "text-accent-600",
    borderColor: "border-accent-200",
    desc: "Recursos para crear entornos digitales seguros",
    recursos: [
      { href: "/descargas/cartel-familias", icon: FileText, label: "Cartel para la parroquia", tipo: "1 pág · A4", desc: "Anuncia las charlas de protección digital." },
      { href: "/descargas/presentacion-parroquias", icon: Presentation, label: "Presentación para parroquias", tipo: "18 diapositivas", desc: "Charla para catequistas y comunidades.", premium: true },
    ],
  },
  {
    id: "centros-sanitarios",
    icon: Stethoscope,
    label: "Centros sanitarios",
    color: "from-brand-500 to-brand-600",
    glow: "bg-brand-500/10",
    bgColor: "bg-brand-50",
    textColor: "text-brand-600",
    borderColor: "border-brand-200",
    desc: "Recursos para la consulta pediátrica",
    recursos: [
      { href: "/descargas/cartel-familias", icon: FileText, label: "Folleto para sala de espera", tipo: "1 pág · A4", desc: "Información para familias sobre salud digital." },
      { href: "/descargas/presentacion-sanitarios", icon: Presentation, label: "Presentación para sanitarios", tipo: "17 diapositivas", desc: "Salud digital infantil para pediatras.", premium: true },
    ],
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

function AreaAccordion({ area, areaIndex, isOpen, onToggle }: {
  area: typeof areas[0]
  areaIndex: number
  isOpen: boolean
  onToggle: () => void
}) {
  const AreaIcon = area.icon

  return (
    <div className={areaIndex === 0 ? "-mt-8 sm:-mt-12" : "mt-2"}>
      <Container size="md">
        {/* Header — botón plegable */}
        <motion.button
          onClick={onToggle}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className={`w-full flex items-center justify-between gap-3 p-3 rounded-xl ${area.bgColor} border ${area.borderColor} relative overflow-hidden text-left transition-all duration-200 hover:shadow-md group cursor-pointer`}
        >
          <div className={`absolute -top-6 -right-6 w-20 h-20 ${area.glow} rounded-full blur-2xl`} />
          <div className="flex items-center gap-3 relative min-w-0">
            <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${area.color} shadow-sm shrink-0`}>
              <AreaIcon className="h-4.5 w-4.5 text-white" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base font-bold text-slate-900">{area.label}</h2>
              <p className="text-xs text-slate-500">{area.desc}</p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className={`shrink-0 flex h-7 w-7 items-center justify-center rounded-md ${area.bgColor} group-hover:bg-white/50 transition-colors`}
          >
            <ChevronDown className={`h-4 w-4 ${area.textColor}`} />
          </motion.div>
        </motion.button>

        {/* Contenido plegable */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 pt-3 pb-1">
                {area.recursos.map((r, i) => {
                  const RIcon = r.icon
                  return (
                    <motion.div
                      key={r.href + r.label}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: i * 0.03 }}
                    >
                      <Link
                        href={r.href}
                        className="group relative rounded-xl border border-border/60 bg-card p-3 transition-all duration-200 hover:shadow-md hover:shadow-brand-500/5 hover:border-brand-200 hover:-translate-y-0.5 block h-full"
                      >
                        {r.premium && (
                          <div className="absolute -top-1.5 -right-1.5 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 text-white text-[7px] font-bold uppercase tracking-wider shadow-md z-10">
                            <Sparkles className="h-2 w-2" />
                            Nuevo
                          </div>
                        )}
                        <div className="flex flex-col gap-2">
                          <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${area.color} shadow-xs shrink-0`}>
                            <RIcon className="h-4 w-4 text-white" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-[11px] font-semibold text-slate-900 leading-tight group-hover:text-brand-700 transition-colors line-clamp-2">
                              {r.label}
                            </h3>
                            <p className="text-[10px] text-slate-400 leading-relaxed mt-0.5 line-clamp-2">
                              {r.desc}
                            </p>
                            <div className="flex items-center justify-between mt-1.5">
                              <span className="text-[8px] font-medium text-slate-400 uppercase tracking-wider">
                                {r.tipo}
                              </span>
                              <span className="flex items-center gap-0.5 text-[8px] font-semibold text-brand-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Eye className="h-2.5 w-2.5" />
                                Ver
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </div>
  )
}

export default function DescargasPage() {
  const [openAreas, setOpenAreas] = useState<string[]>(["familias"])

  const toggleArea = (id: string) => {
    setOpenAreas(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    )
  }

  return (
    <>
      {/* Hero compacto */}
      <Section className="relative overflow-hidden pb-0">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/40 via-background to-background" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -z-10" />
        <Container size="md">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.4 }}
          >
            <Badge variant="default" className="mb-4">Recursos descargables</Badge>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
              Descargas
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xl">
              Materiales gratuitos para cada comunidad. Pulsa en cada área para ver sus recursos.
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* Acordeones por comunidad — compactos y pegados al hero */}
      {areas.map((area, i) => (
        <AreaAccordion
          key={area.id}
          area={area}
          areaIndex={i}
          isOpen={openAreas.includes(area.id)}
          onToggle={() => toggleArea(area.id)}
        />
      ))}

      {/* CTA final compacto */}
      <section className="py-10 sm:py-14 bg-slate-50/50 mt-4">
        <Container size="md">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center max-w-md mx-auto"
          >
            <Shield className="h-8 w-8 text-brand-500 mx-auto mb-3" />
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              ¿Necesitas un recurso personalizado?
            </h2>
            <p className="text-slate-500 text-xs mb-4">
              Si tu comunidad necesita materiales específicos, contáctanos y los preparamos.
            </p>
            <a
              href="mailto:contacto@escudodigitalfamiliar.org"
              className="inline-flex h-9 items-center gap-2 rounded-xl bg-brand-600 px-5 text-xs font-semibold text-white shadow-md shadow-brand-600/20 transition-all hover:bg-brand-700 hover:shadow-lg"
            >
              Solicitar recurso
            </a>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
