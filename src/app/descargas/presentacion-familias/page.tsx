"use client"

import { Shield, Smartphone, AlertTriangle, Users, Heart, Baby, Smile, User, UserCheck, Wifi, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { PresentationSlide, type SlideData } from "@/components/presentacion/presentation-slide"

const slides: SlideData[] = [
  { id: 0, type: "title", icon: Shield, eyebrow: "Para familias que cuidan", titulo: "Tus hijos ya viven online.", subtitulo: "Tú decides cómo.", texto: "Un método de dos capas. Gratis. Menos de media hora.", img: "/images/presentaciones/family-tablet.jpg" },
  { id: 1, type: "fact", icon: AlertTriangle, titulo: "Nadie les preparó para esto", color: "accent", bullets: ["9 años: la edad media del primer móvil propio", "9 de cada 10 ven pornografía antes de los 14", "5 horas de pantalla al día, todos los días", "Y casi nada frenándolo por el camino"], img: "/images/presentaciones/child-screen.jpg" },
  { id: 2, type: "center", variant: "keynote", eyebrow: "No es culpa tuya", titulo: "El diseño está hecho para atraparlos", color: "brand", texto: "Cada notificación, cada scroll infinito, cada autoplay. Compites contra un equipo de ingenieros que trabaja para no soltarlos.", img: "/images/presentaciones/family-dinner.jpg" },
  { id: 3, type: "center", variant: "keynote", titulo: "No basta educar sin proteger", color: "brand", texto: "Un niño de 8 años no tiene criterio para frenarse solo. Proteger es el primer paso para poder educar.", img: "/images/presentaciones/family-1.jpg" },
  { id: 4, type: "center", variant: "keynote", titulo: "No basta proteger sin educar", color: "cyan", texto: "Los filtros se sortean. El objetivo no es encerrarlos, es formar su criterio. Sin diálogo, la protección es papel mojado.", img: "/images/presentaciones/family-outdoor.jpg" },
  { id: 5, type: "highlight", icon: Shield, titulo: "Dos capas. Una tarde.", desc: "Todo lo que necesita tu casa, hoy mismo", color: "success", subitems: [
    { icon: Wifi, label: "Capa 1", tit: "DNS de protección", desc: "Filtra a nivel de red. Bloquea lo inapropiado antes de que llegue a la pantalla. Gratis. 5 minutos." },
    { icon: Smartphone, label: "Capa 2", tit: "Control parental", desc: "Tiempos, apps, compras y contenido según la edad. Crece con tus hijos." },
  ], img: "/images/presentaciones/family-2.jpg" },
  { id: 6, type: "detail", icon: Wifi, titulo: "Capa 1: DNS de protección", color: "brand", bullets: ["El DNS es la agenda telefónica de Internet", "Bloquea dominios maliciosos y pornográficos antes de cargar", "Protege TODOS los dispositivos de tu WiFi, sin excepción", "Gratis. 5 minutos. Se configura y se olvida"], img: "/images/presentaciones/tech.jpg" },
  { id: 7, type: "detail", icon: Smartphone, titulo: "Capa 2: Control parental", color: "cyan", bullets: ["Android: Google Family Link, 10 minutos", "iOS: En Familia + Tiempo de Uso, control por edad", "Límites de tiempo, apps restringidas, compras bloqueadas", "Acompáñalos mientras aprenden, no los vigiles solamente"], img: "/images/presentaciones/social.jpg" },
  { id: 8, type: "visual-grid", titulo: "La protección crece con ellos", color: "success", items: [
    { icon: Baby, label: "0-6 años", text: "Decides tú. Sin excepciones." },
    { icon: Smile, label: "7-11 años", text: "Filtros + primeras conversaciones." },
    { icon: User, label: "12-14 años", text: "Menos filtro, más criterio." },
    { icon: UserCheck, label: "15-17 años", text: "Su criterio. Tu presencia." },
  ], img: "/images/presentaciones/nature.jpg" },
  { id: 9, type: "detail", icon: Smartphone, titulo: "Empieza hoy, no mañana", color: "brand", bullets: ["1. Cambia el DNS del router: protege toda la casa (5 min)", "2. DNS privado en cada móvil y tablet (5 min)", "3. Family Link o Tiempo de Uso activado (10 min)", "4. Cuéntales por qué lo haces, sin miedo ni castigo"], img: "/images/presentaciones/teaching.jpg" },
  { id: 10, type: "center", eyebrow: "Recursos Sentinel", titulo: "Todo lo que necesitas, gratis", color: "cyan", texto: "escudodigitalfamiliar.org — guías paso a paso, configurador interactivo y comparador de DNS. Para siempre gratis.", img: "/images/presentaciones/family-1.jpg" },
  { id: 11, type: "final", icon: Heart, titulo: "Proteger para educar", subtitulo: "Educar para liberar.", desc: "No se trata de construir muros. Se trata de acompañar a tus hijos mientras aprenden a navegar el mundo digital con libertad y responsabilidad.", color: "success", img: "/images/presentaciones/family-2.jpg" },
]

export default function PresentacionFamiliasPage() {
  return (
    <>
      <div className="no-print fixed top-0 left-0 z-50">
        <Link href="/descargas" className="inline-flex items-center gap-1.5 px-3 py-1.5 m-2 rounded-lg bg-black/40 backdrop-blur-md text-xs text-white/60 hover:text-white transition-colors">
          <ArrowLeft className="h-3 w-3" />
          Descargas
        </Link>
      </div>
      <PresentationSlide slides={slides} theme={{ name: "Familias", icon: Users, slug: "familias", accentColor: "#22c55e", accentClass: "text-success-400", successClass: "text-emerald-400" }} />
    </>
  )
}
