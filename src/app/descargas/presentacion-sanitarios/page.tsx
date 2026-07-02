"use client"

import { Shield, Smartphone, AlertTriangle, Stethoscope, Users, Heart, Baby, Clock, BookOpen, ArrowLeft, Activity, Brain } from "lucide-react"
import Link from "next/link"
import { PresentationSlide, type SlideData } from "@/components/presentacion/presentation-slide"

const slides: SlideData[] = [
  { id: 0, type: "title", icon: Stethoscope, eyebrow: "Salud digital", titulo: "La pantalla ya es un signo vital más.", subtitulo: "Pregúntalo como preguntas por el sueño.", texto: "Evidencia y recursos para pediatría y atención primaria.", img: "/images/presentaciones/health-professional.jpg" },
  { id: 1, type: "fact", icon: AlertTriangle, titulo: "Datos que ya no podemos ignorar", color: "accent", bullets: ["OMS: 0 pantallas antes de los 2 años, máximo 1h de 2 a 5", "40% de los niños de 7 años accede a Internet sin supervisión", "La exposición temprana se asocia con retraso del lenguaje", "Sueño, atención y salud mental, afectados por el uso excesivo"], img: "/images/presentaciones/child-sad.jpg" },
  { id: 2, type: "center", variant: "keynote", eyebrow: "No es falta de disciplina", titulo: "El diseño está hecho para atraparlos", color: "brand", texto: "Ningún paciente pediátrico compite en igualdad contra algoritmos diseñados para capturar atención. La prevención empieza reconociendo esto.", img: "/images/presentaciones/tech-abstract.jpg" },
  { id: 3, type: "center", variant: "keynote", titulo: "No basta informar sin herramientas", color: "brand", texto: "Decirle a una familia 'menos pantalla' sin darle un método concreto es como recetar dieta sin plan de comidas. No se sostiene.", img: "/images/presentaciones/stethoscope.jpg" },
  { id: 4, type: "center", variant: "keynote", titulo: "No bastan herramientas sin seguimiento", color: "cyan", texto: "Configurar un filtro una vez no es prevención, es un parche. La salud digital, como cualquier otra, se revisa en cada consulta.", img: "/images/presentaciones/doctor-child.jpg" },
  { id: 5, type: "highlight", icon: Activity, titulo: "Dos capas para la prevención", desc: "Protección técnica + criterio clínico en cada consulta", color: "success", subitems: [
    { icon: Shield, label: "Capa 1", tit: "DNS de protección", desc: "Recomienda un DNS familiar en cada revisión. Gratuito, europeo, RGPD. Bloquea antes de que el contenido llegue." },
    { icon: Stethoscope, label: "Capa 2", tit: "Detección precoz", desc: "Preguntar por pantallas en la anamnesis. Identificar irritabilidad, insomnio y aislamiento como señales de alerta." },
  ], img: "/images/presentaciones/family-conversation.jpg" },
  { id: 6, type: "detail", icon: Baby, titulo: "Capa 1: límites por edad (OMS/AAP)", color: "brand", bullets: ["0-2 años: cero pantallas, salvo videollamada familiar", "2-5 años: máximo 1h/día, siempre acompañado", "6-12 años: 1-2h/día de ocio digital, con supervisión", "13-17 años: negociar límites, priorizar sueño y deporte"], img: "/images/presentaciones/nature-children.jpg" },
  { id: 7, type: "detail", icon: Clock, titulo: "Capa 2: señales de alarma en consulta", color: "cyan", bullets: ["Irritabilidad marcada al retirar el dispositivo", "Menos de 8 horas de sueño, dificultad para despertar", "Bajada de rendimiento escolar sin otra causa", "Prefiere la pantalla al juego o al deporte"], img: "/images/presentaciones/digital-shield.jpg" },
  { id: 8, type: "visual-grid", titulo: "Prevención por etapa", color: "success", items: [
    { icon: Baby, label: "0-2 años", text: "Cero pantallas. Sin excepción." },
    { icon: Users, label: "2-5 años", text: "1h/día. Siempre acompañado." },
    { icon: Clock, label: "6-12 años", text: "Límite claro. Supervisión activa." },
    { icon: Heart, label: "13-17 años", text: "Negociar. Priorizar el sueño." },
  ], img: "/images/presentaciones/health-professional.jpg" },
  { id: 9, type: "detail", icon: Shield, titulo: "Qué recomendar hoy mismo", color: "brand", bullets: ["DNS4.EU (family.dns4.eu): gratuito, europeo, sin datos personales", "Family Link (Android) o Tiempo de Uso (iOS): 15-30 min", "Incluir la pregunta en cada revisión, no solo una vez", "Entregar la guía rápida en papel, no solo de palabra"], img: "/images/presentaciones/network.jpg" },
  { id: 10, type: "center", eyebrow: "Recursos Sentinel", titulo: "Todo listo para tu consulta", color: "cyan", texto: "escudodigitalfamiliar.org — folleto de sala de espera, guía DNS, acuerdo familiar y esta presentación para sesiones clínicas. Sin coste.", img: "/images/presentaciones/teaching.jpg" },
  { id: 11, type: "final", icon: Heart, titulo: "Prevenir es curar", subtitulo: "La mejor medicina digital es la prevención.", desc: "Cada recomendación de límites de pantalla, cada DNS configurado, previene problemas de sueño, atención y salud mental antes de que aparezcan.", color: "success", img: "/images/presentaciones/nature-peace.jpg" },
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
