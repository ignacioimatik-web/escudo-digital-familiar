"use client"

import Link from "next/link"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import {
  Users, GraduationCap, Heart, Stethoscope,
  FileText, Eye, Presentation,
  Shield, CheckSquare, FileSignature, Sparkles
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
      { href: "/descargas/cartel-familias", icon: FileText, label: "Cartel «Protege a tus hijos»", tipo: "1 página · A4", desc: "Póster impactante con el mensaje clave de la protección digital.", premium: true },
      { href: "/descargas/guia-rapida", icon: FileText, label: "Guía rápida DNS + Control Parental", tipo: "3 páginas · A4", desc: "Pasos esenciales ilustrados para configurar la protección." },
      { href: "/descargas/checklist", icon: CheckSquare, label: "Checklist de protección", tipo: "1 página · A4", desc: "Verifica que tienes todo configurado correctamente." },
      { href: "/descargas/acuerdo-familiar", icon: FileSignature, label: "Acuerdo familiar digital", tipo: "1 página · A4", desc: "Plantilla para pactar el uso de tecnología con tus hijos." },
      { href: "/descargas/presentacion-familias", icon: Presentation, label: "Presentación para familias", tipo: "17 diapositivas", desc: "Charla especializada para madres y padres. Enfoque práctico y cercano.", premium: true },
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
      { href: "/descargas/cartel-familias", icon: FileText, label: "Cartel para el centro", tipo: "1 página · A4", desc: "Póster para anunciar la protección digital en el centro." },
      { href: "/descargas/guia-rapida", icon: FileText, label: "Guía de configuración", tipo: "3 páginas · A4", desc: "Cómo configurar DNS en la red del colegio." },
      { href: "/descargas/presentacion-colegios", icon: Presentation, label: "Presentación para colegios", tipo: "17 diapositivas", desc: "Charla para equipos docentes y directivos. Enfoque escolar y legal.", premium: true },
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
      { href: "/descargas/cartel-familias", icon: FileText, label: "Cartel para la parroquia", tipo: "1 página · A4", desc: "Anuncia las charlas de protección digital." },
      { href: "/descargas/presentacion-parroquias", icon: Presentation, label: "Presentación para parroquias", tipo: "18 diapositivas", desc: "Charla para catequistas y comunidades. Enfoque pastoral y valores.", premium: true },
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
      { href: "/descargas/cartel-familias", icon: FileText, label: "Folleto para sala de espera", tipo: "1 página · A4", desc: "Información para familias sobre salud digital." },
      { href: "/descargas/presentacion-sanitarios", icon: Presentation, label: "Presentación para sanitarios", tipo: "17 diapositivas", desc: "Salud digital infantil para pediatras y profesionales. Enfoque clínico.", premium: true },
    ],
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function DescargasPage() {
  return (
    <>
      {/* Hero */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/40 via-background to-background" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -z-10" />
        <Container size="md">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="default" className="mb-6">Recursos descargables</Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
              Descargas
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed max-w-2xl">
              Materiales gratuitos y descargables para cada comunidad. Carteles, guías, checklists y presentaciones listas para usar.
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* Recursos por área */}
      {areas.map((area, areaIndex) => {
        const AreaIcon = area.icon
        return (
          <Section key={area.id} className={areaIndex === 0 ? "" : "pt-0"}>
            <Container size="md">
              {/* Header de área */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                className={`flex items-center gap-3 mb-8 p-4 rounded-2xl ${area.bgColor} border ${area.borderColor} relative overflow-hidden`}
              >
                <div className={`absolute -top-6 -right-6 w-24 h-24 ${area.glow} rounded-full blur-2xl`} />
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${area.color} shadow-sm relative`}>
                  <AreaIcon className="h-6 w-6 text-white" />
                </div>
                <div className="relative">
                  <h2 className="text-xl font-bold text-slate-900">{area.label}</h2>
                  <p className="text-sm text-slate-500">{area.desc}</p>
                </div>
              </motion.div>

              {/* Cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {area.recursos.map((r, i) => {
                  const RIcon = r.icon
                  return (
                    <motion.div
                      key={r.href + r.label}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUp}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                    >
                      <Link
                        href={r.href}
                        className="group relative rounded-2xl border border-border/60 bg-card p-5 transition-all duration-300 hover:shadow-lg hover:shadow-brand-500/5 hover:border-brand-200 hover:-translate-y-1 block h-full"
                      >
                        {r.premium && (
                          <div className="absolute -top-2 -right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 text-white text-[9px] font-bold uppercase tracking-wider shadow-lg">
                            <Sparkles className="h-2.5 w-2.5" />
                            Nuevo
                          </div>
                        )}
                        <div className="flex items-start gap-4">
                          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${area.color} shadow-xs`}>
                            <RIcon className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-slate-900 mb-1 group-hover:text-brand-700 transition-colors">
                              {r.label}
                            </h3>
                            <p className="text-xs text-slate-500 leading-relaxed mb-2 line-clamp-2">
                              {r.desc}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                                {r.tipo}
                              </span>
                              <span className="flex items-center gap-1 text-[10px] font-semibold text-brand-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Eye className="h-3 w-3" />
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
            </Container>
          </Section>
        )
      })}

      {/* CTA final */}
      <Section className="bg-slate-50/50">
        <Container size="md">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center max-w-lg mx-auto"
          >
            <Shield className="h-10 w-10 text-brand-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              ¿Necesitas un recurso personalizado?
            </h2>
            <p className="text-slate-600 text-sm mb-6">
              Si tu comunidad necesita materiales específicos, contáctanos y los preparamos.
            </p>
            <a
              href="mailto:contacto@escudodigitalfamiliar.org"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-brand-600 px-6 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:bg-brand-700 hover:shadow-xl"
            >
              Solicitar recurso
            </a>
          </motion.div>
        </Container>
      </Section>
    </>
  )
}
