"use client"

import { Shield, Smartphone, AlertTriangle, GraduationCap, Users, Wifi, School, BookOpen, ArrowLeft, Target, Heart } from "lucide-react"
import Link from "next/link"
import { PresentationSlide, type SlideData } from "@/components/presentacion/presentation-slide"

const slides: SlideData[] = [
  { id: 0, type: "title", icon: School, titulo: "Proteccion digital en el ambito escolar", subtitulo: "Responsabilidad compartida: centro, familias y alumnos", texto: "Para equipos directivos, docentes y personal educativo", img: "/images/presentaciones/school.jpg" },
  { id: 1, type: "fact", icon: AlertTriangle, titulo: "Realidad digital en las aulas", color: "accent", bullets: ["El 95% de los alumnos de secundaria tiene movil propio", "1 de cada 3 ha sufrido ciberacoso en el entorno escolar", "Los menores pasan mas horas frente a pantallas que en el aula", "El colegio es el segundo hogar digital de los alumnos"], img: "/images/presentaciones/students.jpg" },
  { id: 2, type: "fact", icon: AlertTriangle, titulo: "El centro educativo como espacio protegido", color: "accent", bullets: ["La ley obliga a proteger a los menores en el entorno digital del centro", "La red WiFi del colegio debe ser un espacio seguro", "Los docentes necesitan formacion en proteccion digital", "La coordinacion con las familias es clave para la efectividad"], img: "/images/presentaciones/classroom.jpg" },
  { id: 3, type: "center", titulo: "El colegio no puede hacerlo solo", color: "brand", texto: "La proteccion digital efectiva requiere un triangulo: centro educativo, familias y alumnos trabajando juntos. Cada parte tiene un rol fundamental.", img: "/images/presentaciones/teaching.jpg" },
  { id: 4, type: "highlight", icon: Target, titulo: "Tres frentes de accion", desc: "Proteccion tecnica + Formacion + Coordinacion familiar", color: "success", subitems: [
    { icon: Wifi, label: "Frente 1", tit: "Red escolar protegida", desc: "DNS de proteccion en la red WiFi del centro. Bloquea contenido inapropiado, malware y apuestas en todo el recinto escolar." },
    { icon: BookOpen, label: "Frente 2", tit: "Formacion docente", desc: "Capacitacion del profesorado en riesgos digitales, deteccion de ciberacoso y herramientas de proteccion." },
  ], img: "/images/presentaciones/digital-shield.jpg" },
  { id: 5, type: "center", titulo: "Frente 3: Coordinacion con familias", color: "cyan", texto: "El centro como puente: proporciona a las familias los recursos y la formacion para que la proteccion continue en casa. Charlas, guias, material descargable.", img: "/images/presentaciones/community.jpg" },
  { id: 6, type: "detail", icon: Wifi, titulo: "Proteger la red del centro", color: "brand", bullets: ["Configurar DNS de proteccion en el router y puntos de acceso", "DNS4.EU Child Protection (86.54.11.12) - gratuito, europeo, sin logs", "Segmentar la red: red para alumnos, otra para administracion", "Cobertura WiFi protegida en todo el recinto escolar"], img: "/images/presentaciones/network-globe.jpg" },
  { id: 7, type: "detail", icon: Smartphone, titulo: "Dispositivos y control parental", color: "cyan", bullets: ["Chromebooks: Gestion administrativa con Family Link o Google Admin", "Tablets del centro: perfil restringido con DNS forzado", "Moviles personales: recomendar DNS privado a las familias", "Crear una politica de uso de dispositivos en el centro"], img: "/images/presentaciones/tech.jpg" },
  { id: 8, type: "visual-grid", titulo: "Proteccion por etapa educativa", color: "success", items: [
    { icon: Users, label: "Infantil", text: "Red protegida. Sin dispositivos." },
    { icon: Users, label: "Primaria", text: "Red protegida. Uso guiado." },
    { icon: Users, label: "ESO", text: "Red + formacion + coordinacion" },
    { icon: Users, label: "Bachillerato", text: "Autonomia + criterio propio." },
  ], img: "/images/presentaciones/school.jpg" },
  { id: 9, type: "detail", icon: AlertTriangle, titulo: "Prevencion del ciberacoso", color: "accent", bullets: ["El DNS de proteccion bloquea sitios de acoso y contenido vejatorio", "Formacion al profesorado para detectar senales de alerta", "Protocolo claro de actuacion ante incidentes", "Canal de denuncia anonimo para alumnos"], img: "/images/presentaciones/school.jpg" },
  { id: 10, type: "detail", icon: BookOpen, titulo: "Formacion para docentes", color: "brand", bullets: ["Taller practico de 1 hora: configurar DNS en el centro y en casa", "Guia de deteccion temprana de riesgos digitales en el aula", "Material didactico para trabajar la ciudadania digital", "Recursos para la reunion con familias"], img: "/images/presentaciones/teaching.jpg" },
  { id: 11, type: "center", titulo: "La charla para familias", color: "cyan", texto: "El centro organiza, el especialista presenta. Entregamos la presentacion lista para usar. Incluye: guias, checklist y acuerdo familiar descargable.", img: "/images/presentaciones/family-1.jpg" },
  { id: 12, type: "center", titulo: "Cuanto cuesta? Nada.", color: "success", texto: "DNS4.EU y CleanBrowsing tienen version gratuita sin limites. La formacion del profesorado puede ser online. Los materiales son descargables. La inversion es tiempo, no dinero.", img: "/images/presentaciones/nature.jpg" },
  { id: 13, type: "fact", icon: AlertTriangle, titulo: "Errores frecuentes en centros", color: "accent", bullets: ["Pensar que la proteccion digital es solo cosa de familias", "No formar al profesorado y esperar que actuen por instinto", "Configurar la red y no comunicarlo a las familias", "No tener un protocolo actualizado de ciberacoso"], img: "/images/presentaciones/child-screen.jpg" },
  { id: 14, type: "center", titulo: "El colegio como referencia", color: "brand", texto: "Cuando el centro toma la iniciativa, las familias se suman. La proteccion digital empieza en la red del colegio y continua en cada hogar. Sois el primer eslabon.", img: "/images/presentaciones/school.jpg" },
  { id: 15, type: "center", titulo: "Recursos para el centro", color: "cyan", texto: "escudodigitalfamiliar.org/descargas - Carteles, guias tecnicas, presentaciones listas y checklists para coordinar con las familias.", img: "/images/presentaciones/teaching.jpg" },
  { id: 16, type: "final", icon: Heart, titulo: "Educar es proteger", subtitulo: "Proteger para educar mejor.", desc: "Un centro educativo que protege a sus alumnos en el entorno digital esta dando una leccion que va mas alla del aula: les esta ensenando que su seguridad importa.", color: "success", img: "/images/presentaciones/family-2.jpg" },
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
