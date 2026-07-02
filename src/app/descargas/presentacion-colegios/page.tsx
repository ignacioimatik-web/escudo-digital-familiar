"use client"

import { Shield, Smartphone, AlertTriangle, GraduationCap, Users, Wifi, School, BookOpen, ArrowLeft, Target, Heart } from "lucide-react"
import Link from "next/link"
import { PresentationSlide, type SlideData } from "@/components/presentacion/presentation-slide"

const slides: SlideData[] = [
  { id: 0, type: "title", icon: School, eyebrow: "Para equipos educativos", titulo: "El aula ya no acaba en la puerta.", subtitulo: "Se extiende hasta su bolsillo.", texto: "Protección digital para vuestro centro educativo.", img: "/images/presentaciones/school.jpg" },
  { id: 1, type: "fact", icon: AlertTriangle, titulo: "Lo que ya está pasando en las aulas", color: "accent", bullets: ["95% de los alumnos de secundaria tiene móvil propio", "1 de cada 3 ha sufrido ciberacoso en el entorno escolar", "Más horas frente a la pantalla que dentro del aula", "El colegio ya es su segundo hogar digital"], img: "/images/presentaciones/students.jpg" },
  { id: 2, type: "center", variant: "keynote", eyebrow: "No es un fallo del centro", titulo: "El diseño está hecho para atraparlos", color: "brand", texto: "Ninguna app fue pensada para el aula. Todas fueron pensadas para no soltar la atención. El centro compite contra ingeniería de precisión.", img: "/images/presentaciones/classroom.jpg" },
  { id: 3, type: "center", variant: "keynote", titulo: "El centro no puede hacerlo solo", color: "brand", texto: "Protección digital efectiva es un triángulo: centro, familias y alumnos. Cuando falta un lado, el triángulo se rompe.", img: "/images/presentaciones/teaching.jpg" },
  { id: 4, type: "center", variant: "keynote", titulo: "Ni sólo firewall, ni sólo sermón", color: "cyan", texto: "Un colegio con red segura pero sin formación deja a sus alumnos ciegos fuera del recinto. Formación sin red segura, expuestos dentro de él.", img: "/images/presentaciones/community.jpg" },
  { id: 5, type: "highlight", icon: Target, titulo: "Dos capas para todo el centro", desc: "Red protegida + formación real, coordinadas con las familias", color: "success", subitems: [
    { icon: Wifi, label: "Capa 1", tit: "Red escolar protegida", desc: "DNS de protección en la WiFi del centro. Bloquea contenido inapropiado, malware y apuestas en todo el recinto." },
    { icon: BookOpen, label: "Capa 2", tit: "Formación docente", desc: "Profesorado capacitado en riesgos digitales, detección de ciberacoso y herramientas de protección." },
  ], img: "/images/presentaciones/digital-shield.jpg" },
  { id: 6, type: "detail", icon: Wifi, titulo: "Capa 1: proteger la red del centro", color: "brand", bullets: ["DNS de protección en router y puntos de acceso", "DNS4.EU Child Protection: gratuito, europeo, sin registro de datos", "Red segmentada: alumnado y administración por separado", "Cobertura protegida en todo el recinto escolar"], img: "/images/presentaciones/network-globe.jpg" },
  { id: 7, type: "detail", icon: Smartphone, titulo: "Capa 2: dispositivos y política de uso", color: "cyan", bullets: ["Chromebooks: gestión con Family Link o Google Admin", "Tablets del centro: perfil restringido con DNS forzado", "Móviles personales: DNS privado recomendado a familias", "Una política de uso clara, conocida por todos"], img: "/images/presentaciones/tech.jpg" },
  { id: 8, type: "visual-grid", titulo: "Protección por etapa educativa", color: "success", items: [
    { icon: Users, label: "Infantil", text: "Red protegida. Sin dispositivo propio." },
    { icon: Users, label: "Primaria", text: "Red protegida. Uso guiado." },
    { icon: GraduationCap, label: "ESO", text: "Red + formación + coordinación." },
    { icon: GraduationCap, label: "Bachillerato", text: "Autonomía con criterio propio." },
  ], img: "/images/presentaciones/school.jpg" },
  { id: 9, type: "detail", icon: BookOpen, titulo: "Cómo empezar este trimestre", color: "brand", bullets: ["1. DNS de protección en el router del centro (15 min)", "2. Política de uso de dispositivos, comunicada a todos", "3. Taller de 1 hora para el claustro", "4. Charla para familias con material ya preparado"], img: "/images/presentaciones/teaching.jpg" },
  { id: 10, type: "center", eyebrow: "Recursos Sentinel", titulo: "Todo listo para vuestro centro", color: "cyan", texto: "escudodigitalfamiliar.org — presentación para familias, guías técnicas, carteles y checklist de coordinación. Sin coste.", img: "/images/presentaciones/family-1.jpg" },
  { id: 11, type: "final", icon: Heart, titulo: "Educar es proteger", subtitulo: "Proteger para educar mejor.", desc: "Un centro que protege a su alumnado en el entorno digital enseña algo que va más allá del aula: que su seguridad importa de verdad.", color: "success", img: "/images/presentaciones/family-2.jpg" },
]

export default function PresentacionColegiosPage() {
  return (
    <>
      <div className="no-print fixed top-0 left-0 z-50">
        <Link href="/descargas" className="inline-flex items-center gap-1.5 px-3 py-1.5 m-2 rounded-lg bg-black/40 backdrop-blur-md text-xs text-white/60 hover:text-white transition-colors">
          <ArrowLeft className="h-3 w-3" />
          Descargas
        </Link>
      </div>
      <PresentationSlide slides={slides} theme={{ name: "Colegios", icon: GraduationCap, slug: "colegios", accentColor: "#06b6d4", accentClass: "text-cyan-400", successClass: "text-teal-400" }} />
    </>
  )
}
