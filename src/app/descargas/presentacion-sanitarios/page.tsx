"use client"

import { Shield, Smartphone, AlertTriangle, Stethoscope, Users, Heart, Baby, Clock, BookOpen, ArrowLeft, Activity, Brain } from "lucide-react"
import Link from "next/link"
import { PresentationSlide, type SlideData } from "@/components/presentacion/presentation-slide"

const slides: SlideData[] = [
  { id: 0, type: "title", icon: Stethoscope, titulo: "Salud digital infantil: un nuevo determinante de salud", subtitulo: "Evidencia, recomendaciones y recursos para la consulta", texto: "Para pediatras, médicos de familia, enfermeros y profesionales sanitarios" },
  { id: 1, type: "fact", icon: AlertTriangle, titulo: "Datos que no podemos ignorar", color: "accent", bullets: ["La OMS recomienda 0 pantallas antes de los 2 años y máximo 1h/día de 2 a 5", "El 40% de los niños de 7 años ya tiene acceso a Internet sin supervisión", "La exposición temprana a pantallas se asocia con retraso en el lenguaje", "El sueño, la atención y la salud mental se ven afectados por el uso excesivo"] },
  { id: 2, type: "fact", icon: Brain, titulo: "Impactos documentados en salud infantil", color: "accent", bullets: ["Trastornos del sueño: la luz azul inhibe la melatonina hasta 2 horas", "Obesidad infantil: el sedentarismo digital se correlaciona con IMC elevado", "Problemas de atención: la multitarea digital afecta la capacidad de concentración", "Salud mental: ansiedad, depresión y comparación social en adolescentes"] },
  { id: 3, type: "center", titulo: "El entorno digital es un determinante de salud", color: "brand", texto: "Igual que preguntamos por alimentación, ejercicio y vacunas, debemos preguntar por el uso de pantallas. La salud digital es ya una parte fundamental de la salud infantil." },
  { id: 4, type: "highlight", icon: Activity, titulo: "Abordaje en 3 niveles", desc: "Prevención universal + Detección precoz + Intervención familiar", color: "success", subitems: [
    { icon: Shield, label: "Nivel 1", tit: "Prevención universal", desc: "Recomendar límites de pantallas según edad. Informar sobre DNS de protección y control parental en todas las consultas." },
    { icon: Stethoscope, label: "Nivel 2", tit: "Detección precoz", desc: "Identificar señales de alerta: cambios de conducta, problemas de sueño, aislamiento social, bajo rendimiento escolar." },
  ]},
  { id: 5, type: "center", titulo: "Nivel 3: Intervención familiar", color: "cyan", texto: "Proporcionar recursos concretos: guía de configuración DNS, acuerdo familiar digital y pautas de uso saludable. Derivar a la plataforma para seguimiento." },
  { id: 6, type: "detail", icon: Baby, titulo: "Recomendaciones por edades (evidencia OMS/AAP)", color: "brand", bullets: ["0-2 años: cero pantallas (excepto videollamadas con familiares)", "2-5 años: máximo 1 hora/día, siempre acompañado de un adulto", "6-12 años: máximo 1-2 horas/día de ocio digital, con supervisión", "13-17 años: negociar límites, priorizar sueño y actividad física"] },
  { id: 7, type: "detail", icon: Clock, titulo: "Indicadores de alarma en la consulta", color: "accent", bullets: ["El menor se muestra irritable cuando no tiene el dispositivo", "Duerme menos de 8 horas y tiene dificultad para despertarse", "Ha bajado el rendimiento escolar sin otra causa aparente", "Prefiere la pantalla a jugar con amigos o hacer deporte"] },
  { id: 8, type: "center", titulo: "Qué podemos hacer desde la consulta", color: "success", texto: "Preguntar, informar y proporcionar herramientas. No necesitamos ser expertos en tecnología — necesitamos ser el primer punto de apoyo para las familias. 5 minutos en la consulta pueden marcar la diferencia." },
  { id: 9, type: "detail", icon: Shield, titulo: "Herramientas para recomendar a las familias", color: "brand", bullets: ["DNS de protección: DNS4.EU (family.dns4.eu) — gratuito, europeo, RGPD", "Control parental: Google Family Link (Android) y Tiempo de Uso (iOS)", "Configuración en 15-30 minutos, sin coste, sin datos personales", "El método de 2 capas: DNS + control parental cubre todos los riesgos"] },
  { id: 10, type: "detail", icon: Heart, titulo: "El papel del profesional sanitario", color: "cyan", bullets: ["Eres la voz de la evidencia científica en un mar de desinformación", "Las familias confían en tu criterio más que en cualquier fuente digital", "Una recomendación tuya tiene más impacto que cien artículos online", "Puedes ser el punto de inflexión para una familia"] },
  { id: 11, type: "visual-grid", titulo: "Recursos para la consulta", color: "success", items: [
    { icon: BookOpen, label: "Folleto sala espera", text: "Información básica familiar" },
    { icon: Shield, label: "Guía rápida DNS", text: "Pasos concretos para padres" },
    { icon: Heart, label: "Acuerdo digital", text: "Plantilla para la familia" },
    { icon: Stethoscope, label: "Presentación", text: "Para sesiones clínicas" },
  ]},
  { id: 12, type: "center", titulo: "La salud digital como parte de la historia clínica", color: "brand", texto: "Incluir preguntas sobre uso de pantallas en la anamnesis: ¿cuántas horas al día? ¿hay supervisión? ¿tienen protección DNS? ¿control parental activado? Son preguntas que salvan salud." },
  { id: 13, type: "fact", icon: AlertTriangle, titulo: "Errores frecuentes en el entorno sanitario", color: "accent", bullets: ["No preguntar por pantallas por falta de tiempo en la consulta", "Pensar que la protección digital es responsabilidad solo de los padres", "No tener materiales actualizados para entregar a las familias", "Subestimar el impacto del entorno digital en la salud infantil"] },
  { id: 14, type: "center", titulo: "No hace falta ser experto en tecnología", color: "success", texto: "Solo necesitas 3 cosas: preguntar, informar y derivar a los recursos adecuados. Nosotros ponemos los materiales: guías, carteles, acuerdos y presentaciones listas para usar." },
  { id: 15, type: "center", titulo: "Materiales para tu consulta", color: "cyan", texto: "escudodigitalfamiliar.org/descargas — Folleto para sala de espera, guía rápida de configuración, acuerdo familiar digital y esta presentación para sesiones clínicas." },
  { id: 16, type: "final", icon: Heart, titulo: "Prevenir es curar", subtitulo: "La mejor medicina digital es la prevención.", desc: "Cada vez que recomiendas límites de pantalla o ayudas a una familia a configurar la protección digital, estás previniendo problemas de sueño, atención, salud mental y desarrollo infantil.", color: "success" },
]

export default function PresentacionSanitariosPage() {
  return (
    <>
      <div className="no-print fixed top-0 left-0 z-50">
        <Link href="/descargas" className="inline-flex items-center gap-1.5 px-3 py-1.5 m-2 rounded-lg bg-black/40 backdrop-blur-md text-xs text-white/60 hover:text-white transition-colors">
          <ArrowLeft className="h-3 w-3" />
          Descargas
        </Link>
      </div>
      <PresentationSlide slides={slides} theme={{ name: "Centros Sanitarios", icon: Stethoscope, slug: "sanitarios", accentColor: "#6366f1", accentClass: "text-indigo-400", successClass: "text-brand-400" }} />
    </>
  )
}
