"use client"

import { Shield, Smartphone, AlertTriangle, Stethoscope, Users, Heart, Baby, Clock, BookOpen, ArrowLeft, Activity, Brain } from "lucide-react"
import Link from "next/link"
import { PresentationSlide, type SlideData } from "@/components/presentacion/presentation-slide"

const slides: SlideData[] = [
  { id: 0, type: "title", icon: Stethoscope, titulo: "Salud digital infantil: un nuevo determinante de salud", subtitulo: "Evidencia, recomendaciones y recursos para la consulta", texto: "Para pediatras, medicos de familia, enfermeros y profesionales sanitarios", img: "/images/presentaciones/health.jpg" },
  { id: 1, type: "fact", icon: AlertTriangle, titulo: "Datos que no podemos ignorar", color: "accent", bullets: ["La OMS recomienda 0 pantallas antes de los 2 anos y maximo 1h/dia de 2 a 5", "El 40% de los ninos de 7 anos ya tiene acceso a Internet sin supervision", "La exposicion temprana a pantallas se asocia con retraso en el lenguaje", "El sueno, la atencion y la salud mental se ven afectados por el uso excesivo"], img: "/images/presentaciones/child-screen.jpg" },
  { id: 2, type: "fact", icon: Brain, titulo: "Impactos documentados en salud infantil", color: "accent", bullets: ["Trastornos del sueno: la luz azul inhibe la melatonina hasta 2 horas", "Obesidad infantil: el sedentarismo digital se correlaciona con IMC elevado", "Problemas de atencion: la multitarea digital afecta la capacidad de concentracion", "Salud mental: ansiedad, depresion y comparacion social en adolescentes"], img: "/images/presentaciones/health.jpg" },
  { id: 3, type: "center", titulo: "El entorno digital es un determinante de salud", color: "brand", texto: "Igual que preguntamos por alimentacion, ejercicio y vacunas, debemos preguntar por el uso de pantallas. La salud digital es ya una parte fundamental de la salud infantil.", img: "/images/presentaciones/family-1.jpg" },
  { id: 4, type: "highlight", icon: Activity, titulo: "Abordaje en 3 niveles", desc: "Prevencion universal + Deteccion precoz + Intervencion familiar", color: "success", subitems: [
    { icon: Shield, label: "Nivel 1", tit: "Prevencion universal", desc: "Recomendar limites de pantallas segun edad. Informar sobre DNS de proteccion y control parental en todas las consultas." },
    { icon: Stethoscope, label: "Nivel 2", tit: "Deteccion precoz", desc: "Identificar senales de alerta: cambios de conducta, problemas de sueno, aislamiento social, bajo rendimiento escolar." },
  ], img: "/images/presentaciones/nature.jpg" },
  { id: 5, type: "center", titulo: "Nivel 3: Intervencion familiar", color: "cyan", texto: "Proporcionar recursos concretos: guia de configuracion DNS, acuerdo familiar digital y pautas de uso saludable. Derivar a la plataforma para seguimiento.", img: "/images/presentaciones/family-2.jpg" },
  { id: 6, type: "detail", icon: Baby, titulo: "Recomendaciones por edades (evidencia OMS/AAP)", color: "brand", bullets: ["0-2 anos: cero pantallas (excepto videollamadas con familiares)", "2-5 anos: maximo 1 hora/dia, siempre acompanado de un adulto", "6-12 anos: maximo 1-2 horas/dia de ocio digital, con supervision", "13-17 anos: negociar limites, priorizar sueno y actividad fisica"], img: "/images/presentaciones/family-2.jpg" },
  { id: 7, type: "detail", icon: Clock, titulo: "Indicadores de alarma en la consulta", color: "accent", bullets: ["El menor se muestra irritable cuando no tiene el dispositivo", "Duerme menos de 8 horas y tiene dificultad para despertarse", "Ha bajado el rendimiento escolar sin otra causa aparente", "Prefiere la pantalla a jugar con amigos o hacer deporte"], img: "/images/presentaciones/teaching.jpg" },
  { id: 8, type: "center", titulo: "Que podemos hacer desde la consulta", color: "success", texto: "Preguntar, informar y proporcionar herramientas. No necesitamos ser expertos en tecnologia - necesitamos ser el primer punto de apoyo para las familias.", img: "/images/presentaciones/nature.jpg" },
  { id: 9, type: "detail", icon: Shield, titulo: "Herramientas para recomendar a las familias", color: "brand", bullets: ["DNS de proteccion: DNS4.EU (family.dns4.eu) - gratuito, europeo, RGPD", "Control parental: Google Family Link (Android) y Tiempo de Uso (iOS)", "Configuracion en 15-30 minutos, sin coste, sin datos personales", "El metodo de 2 capas: DNS + control parental cubre todos los riesgos"], img: "/images/presentaciones/tech.jpg" },
  { id: 10, type: "detail", icon: Heart, titulo: "El papel del profesional sanitario", color: "cyan", bullets: ["Eres la voz de la evidencia cientifica en un mar de desinformacion", "Las familias confian en tu criterio mas que en cualquier fuente digital", "Una recomendacion tuya tiene mas impacto que cien articulos online", "Puedes ser el punto de inflexion para una familia"], img: "/images/presentaciones/teaching.jpg" },
  { id: 11, type: "visual-grid", titulo: "Recursos para la consulta", color: "success", items: [
    { icon: BookOpen, label: "Folleto sala espera", text: "Informacion basica familiar" },
    { icon: Shield, label: "Guia rapida DNS", text: "Pasos concretos para padres" },
    { icon: Heart, label: "Acuerdo digital", text: "Plantilla para la familia" },
    { icon: Stethoscope, label: "Presentacion", text: "Para sesiones clinicas" },
  ], img: "/images/presentaciones/health.jpg" },
  { id: 12, type: "center", titulo: "La salud digital como parte de la historia clinica", color: "brand", texto: "Incluir preguntas sobre uso de pantallas en la anamnesis: cuantas horas al dia? hay supervision? tienen proteccion DNS? control parental activado?", img: "/images/presentaciones/nature.jpg" },
  { id: 13, type: "fact", icon: AlertTriangle, titulo: "Errores frecuentes en el entorno sanitario", color: "accent", bullets: ["No preguntar por pantallas por falta de tiempo en la consulta", "Pensar que la proteccion digital es responsabilidad solo de los padres", "No tener materiales actualizados para entregar a las familias", "Subestimar el impacto del entorno digital en la salud infantil"], img: "/images/presentaciones/child-screen.jpg" },
  { id: 14, type: "center", titulo: "No hace falta ser experto en tecnologia", color: "success", texto: "Solo necesitas 3 cosas: preguntar, informar y derivar a los recursos adecuados. Nosotros ponemos los materiales: guias, carteles, acuerdos y presentaciones.", img: "/images/presentaciones/health.jpg" },
  { id: 15, type: "center", titulo: "Materiales para tu consulta", color: "cyan", texto: "escudodigitalfamiliar.org/descargas - Folleto para sala de espera, guia rapida de configuracion, acuerdo familiar digital y esta presentacion para sesiones clinicas.", img: "/images/presentaciones/teaching.jpg" },
  { id: 16, type: "final", icon: Heart, titulo: "Prevenir es curar", subtitulo: "La mejor medicina digital es la prevencion.", desc: "Cada vez que recomiendas limites de pantalla o ayudas a una familia a configurar la proteccion digital, estas previniendo problemas de sueno, atencion, salud mental y desarrollo infantil.", color: "success", img: "/images/presentaciones/family-2.jpg" },
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
