"use client"

import { Shield, Smartphone, AlertTriangle, Heart, Users, Wifi, BookOpen, ArrowLeft, Cross } from "lucide-react"
import Link from "next/link"
import { PresentationSlide, type SlideData } from "@/components/presentacion/presentation-slide"

const slides: SlideData[] = [
  { id: 0, type: "title", icon: Cross, eyebrow: "Para la comunidad cristiana", titulo: "También son nuestros en el mundo digital.", subtitulo: "Cuidémoslos también ahí.", texto: "Para sacerdotes, catequistas y agentes de pastoral.", img: "/images/presentaciones/church.jpg" },
  { id: 1, type: "fact", icon: AlertTriangle, titulo: "La realidad que vive vuestra parroquia", color: "accent", bullets: ["Vuestros niños viven gran parte de su vida online", "9 de cada 10 acceden a pornografía antes de los 14", "Las redes sociales son el nuevo parque donde se relacionan", "La comunidad no puede mirar hacia otro lado"], img: "/images/presentaciones/community.jpg" },
  { id: 2, type: "center", variant: "keynote", eyebrow: "No es falta de fe", titulo: "El diseño está hecho para atraparlos", color: "brand", texto: "Ninguna app fue creada pensando en el bien de un niño. Fueron diseñadas para no soltar su atención. Ni las mejores familias compiten solas contra eso.", img: "/images/presentaciones/hands-helping.jpg" },
  { id: 3, type: "center", variant: "keynote", titulo: "No basta acompañar sin proteger", color: "brand", texto: "Un niño no tiene criterio para frenarse solo ante lo que ve. Proteger es el primer gesto de cuidado, antes incluso de la palabra.", img: "/images/presentaciones/family-1.jpg" },
  { id: 4, type: "center", variant: "keynote", titulo: "No basta proteger sin acompañar", color: "cyan", texto: "Los filtros se sortean. Lo que de verdad forma es la palabra, la catequesis, la cercanía. Sin acompañamiento, la protección es frágil.", img: "/images/presentaciones/family-2.jpg" },
  { id: 5, type: "highlight", icon: Shield, titulo: "Dos capas, una misión", desc: "Protección técnica + acompañamiento desde la fe", color: "success", subitems: [
    { icon: Wifi, label: "Capa 1", tit: "Filtros que protegen", desc: "DNS de protección en la red de la parroquia. Gratuito, sencillo, eficaz. Bloquea lo inapropiado antes de que llegue." },
    { icon: Heart, label: "Capa 2", tit: "Acompañamiento que transforma", desc: "Catequesis sobre uso responsable de la tecnología. Formación para catequistas. Cercanía a las familias." },
  ], img: "/images/presentaciones/teaching.jpg" },
  { id: 6, type: "detail", icon: Wifi, titulo: "Capa 1: proteger la red parroquial", color: "brand", bullets: ["DNS de protección en el router de la parroquia", "DNS4.EU Child Protection: europeo, gratuito, sin ánimo de lucro", "Protege todo lo conectado a la WiFi parroquial", "Ideal para salas de catequesis y grupos juveniles"], img: "/images/presentaciones/church.jpg" },
  { id: 7, type: "detail", icon: Heart, titulo: "Capa 2: acompañar desde la fe", color: "accent", bullets: ["Educación digital dentro de la catequesis de Confirmación", "Hablar de redes sociales desde los valores del Evangelio", "Ayudar a discernir qué contenido alimenta el alma", "Formar catequistas como referentes digitales de confianza"], img: "/images/presentaciones/nature.jpg" },
  { id: 8, type: "visual-grid", titulo: "Propuesta por edades", color: "success", items: [
    { icon: Heart, label: "Infancia", text: "Familias: filtros y límites." },
    { icon: Users, label: "Pre-adolesc.", text: "Catequesis y acompañamiento." },
    { icon: Users, label: "Adolescencia", text: "Discernimiento y confianza." },
    { icon: Heart, label: "Jóvenes", text: "Testimonio y misión digital." },
  ], img: "/images/presentaciones/nature.jpg" },
  { id: 9, type: "detail", icon: BookOpen, titulo: "Cómo empezar en la parroquia", color: "brand", bullets: ["1. DNS de protección en el router (15 minutos)", "2. Sesión de formación de 1 hora para catequistas", "3. Charla-taller para familias tras la misa (30 min)", "4. Guía rápida y cartel entregados a cada familia"], img: "/images/presentaciones/church.jpg" },
  { id: 10, type: "center", eyebrow: "Recursos Sentinel", titulo: "Todo listo para vuestra comunidad", color: "cyan", texto: "escudodigitalfamiliar.org — carteles, guías, acuerdo familiar y esta presentación lista para adaptar. Sin coste.", img: "/images/presentaciones/teaching.jpg" },
  { id: 11, type: "final", icon: Cross, titulo: "Proteger es amar", subtitulo: "Cuidar a los pequeños es cuidar el futuro.", desc: "Dejad que los niños vengan a mí (Mc 10,14). Protegerlos en el mundo digital es una forma concreta de vivir el Evangelio hoy.", color: "success", img: "/images/presentaciones/family-2.jpg" },
]

export default function PresentacionParroquiasPage() {
  return (
    <>
      <div className="no-print fixed top-0 left-0 z-50">
        <Link href="/descargas" className="inline-flex items-center gap-1.5 px-3 py-1.5 m-2 rounded-lg bg-black/40 backdrop-blur-md text-xs text-white/60 hover:text-white transition-colors">
          <ArrowLeft className="h-3 w-3" />
          Descargas
        </Link>
      </div>
      <PresentationSlide slides={slides} theme={{ name: "Parroquias", icon: Heart, slug: "parroquias", accentColor: "#f97316", accentClass: "text-accent-400", successClass: "text-orange-400" }} />
    </>
  )
}
