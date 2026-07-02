"use client"

import { Shield, Wifi, Smartphone, AlertTriangle, Heart, Baby, Smile, User, UserCheck } from "lucide-react"
import { PresentationSlide, type SlideData } from "@/components/presentacion/presentation-slide"

const slides: SlideData[] = [
  { id: 0, type: "title", icon: Shield, eyebrow: "Escudo Digital Familiar", titulo: "Sus hijos ya viven online.", subtitulo: "Ustedes deciden cómo.", texto: "Un método de dos capas. Gratis. Menos de media hora.", img: "/images/presentaciones/digital-shield.jpg" },
  { id: 1, type: "fact", icon: AlertTriangle, titulo: "Una generación sin manual de instrucciones", color: "accent", bullets: ["9 años: la edad media del primer móvil propio", "9 de cada 10 ven pornografía antes de los 14", "Más de 5 horas de pantalla al día, todos los días", "Y casi nada frenándolo por el camino"], img: "/images/presentaciones/child-sad.jpg" },
  { id: 2, type: "center", variant: "keynote", eyebrow: "No es culpa de nadie", titulo: "El diseño está hecho para atraparlos", color: "brand", texto: "Cada notificación, cada scroll infinito, cada autoplay. Detrás hay equipos enteros de ingenieros trabajando para no soltar su atención.", img: "/images/presentaciones/tech-abstract.jpg" },
  { id: 3, type: "center", variant: "keynote", titulo: "No basta proteger sin educar", color: "brand", texto: "Los filtros se sortean. El objetivo no es encerrarlos, es formar su criterio. Sin diálogo, la protección es papel mojado.", img: "/images/presentaciones/family-outdoor.jpg" },
  { id: 4, type: "center", variant: "keynote", titulo: "No basta educar sin proteger", color: "cyan", texto: "Un niño de 8 años no tiene criterio para frenarse solo. Proteger es el primer paso, no el último, para poder educar.", img: "/images/presentaciones/family-warm.jpg" },
  { id: 5, type: "highlight", icon: Shield, titulo: "Dos capas. Una tarde.", desc: "Todo lo que necesita cualquier hogar, colegio o comunidad", color: "success", subitems: [
    { icon: Wifi, label: "Capa 1", tit: "DNS de protección", desc: "Filtra a nivel de red. Bloquea lo inapropiado antes de que llegue a la pantalla. Gratis. 5 minutos." },
    { icon: Smartphone, label: "Capa 2", tit: "Control parental", desc: "Tiempos, apps, compras y contenido según la edad. Crece con cada etapa." },
  ], img: "/images/presentaciones/family-conversation.jpg" },
  { id: 6, type: "detail", icon: Wifi, titulo: "Capa 1: DNS de protección", color: "brand", bullets: ["El DNS es la agenda telefónica de Internet", "Bloquea dominios maliciosos y pornográficos antes de cargar", "Protege TODOS los dispositivos de la red, sin excepción", "Gratis. 5 minutos. Se configura y se olvida"], img: "/images/presentaciones/network.jpg" },
  { id: 7, type: "detail", icon: Smartphone, titulo: "Capa 2: Control parental", color: "cyan", bullets: ["Android: Google Family Link, 10 minutos", "iOS: En Familia + Tiempo de Uso, control por edad", "Límites de tiempo, apps restringidas, compras bloqueadas", "Acompañar mientras aprenden, no solo vigilar"], img: "/images/presentaciones/social-media.jpg" },
  { id: 8, type: "visual-grid", titulo: "La protección crece con ellos", color: "success", items: [
    { icon: Baby, label: "0-6 años", text: "Decide el adulto. Sin excepciones." },
    { icon: Smile, label: "7-11 años", text: "Filtros + primeras conversaciones." },
    { icon: User, label: "12-14 años", text: "Menos filtro, más criterio." },
    { icon: UserCheck, label: "15-17 años", text: "Su criterio. La presencia del adulto." },
  ], img: "/images/presentaciones/nature-children.jpg" },
  { id: 9, type: "detail", icon: Smartphone, titulo: "Empieza hoy, no mañana", color: "brand", bullets: ["1. Cambia el DNS del router: protege toda la casa (5 min)", "2. DNS privado en cada móvil y tablet (5 min)", "3. Family Link o Tiempo de Uso activado (10 min)", "4. Cuéntales por qué lo haces, sin miedo ni castigo"], img: "/images/presentaciones/teaching.jpg" },
  { id: 10, type: "center", eyebrow: "Recursos Sentinel", titulo: "Un recurso para cada comunidad", color: "cyan", texto: "escudodigitalfamiliar.org — guías para familias, colegios, parroquias y centros sanitarios. Configurador interactivo y comparador de DNS. Para siempre gratis.", img: "/images/presentaciones/community.jpg" },
  { id: 11, type: "final", icon: Heart, titulo: "Proteger para educar", subtitulo: "Educar para liberar.", desc: "No se trata de construir muros. Se trata de acompañar mientras aprenden a navegar el mundo digital con libertad y responsabilidad.", color: "success", img: "/images/presentaciones/nature-peace.jpg" },
]

export default function PresentacionPage() {
  return (
    <PresentationSlide
      slides={slides}
      theme={{ name: "Escudo Digital Familiar", icon: Shield, slug: "general", accentColor: "#3b82f6", accentClass: "text-brand-400", successClass: "text-emerald-400" }}
    />
  )
}
