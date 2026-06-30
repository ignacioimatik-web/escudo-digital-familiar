"use client"

import { Shield, Smartphone, AlertTriangle, Heart, Users, Wifi, BookOpen, ArrowLeft, Cross } from "lucide-react"
import Link from "next/link"
import { PresentationSlide, type SlideData } from "@/components/presentacion/presentation-slide"

const slides: SlideData[] = [
  { id: 0, type: "title", icon: Heart, titulo: "Proteccion digital en la comunidad parroquial", subtitulo: "Cuidar a los ninos y jovenes tambien en el mundo digital", texto: "Para sacerdotes, catequistas, monitores y agentes de pastoral", img: "/images/presentaciones/church.jpg" },
  { id: 1, type: "fact", icon: AlertTriangle, titulo: "El mundo digital tambien necesita pastoral", color: "accent", bullets: ["Los ninos y jovenes de tu parroquia viven gran parte de su vida online", "El 90% accede a pornografia antes de los 14, a menudo sin buscarlo", "Las redes sociales son el nuevo parque donde se relacionan", "La parroquia no puede estar ausente de esta realidad"], img: "/images/presentaciones/child-screen.jpg" },
  { id: 2, type: "fact", icon: AlertTriangle, titulo: "Una llamada a la responsabilidad", color: "accent", bullets: ["La Iglesia tiene el deber de proteger a los mas pequenos", "Los catequistas y monitores son figuras de referencia y confianza", "Las familias esperan orientacion de la comunidad parroquial", "La proteccion digital es una forma concreta de caridad"], img: "/images/presentaciones/church.jpg" },
  { id: 3, type: "center", titulo: "No se trata de tecnologia. Se trata de personas.", color: "brand", texto: "Detras de cada pantalla hay un hijo de Dios. La proteccion digital no es un tema tecnico - es una cuestion de amor, cuidado y responsabilidad comunitaria.", img: "/images/presentaciones/family-2.jpg" },
  { id: 4, type: "center", titulo: "El reto de nuestro tiempo", color: "brand", texto: "La tecnologia avanza mas rapido que nuestra capacidad de acompanar. Pero la Iglesia tiene algo que el mundo digital no puede dar: comunidad, verdad y amor incondicional.", img: "/images/presentaciones/church.jpg" },
  { id: 5, type: "highlight", icon: Shield, titulo: "Dos capas, una mision", desc: "Proteccion tecnica + Acompanamiento humano desde la fe", color: "success", subitems: [
    { icon: Wifi, label: "Dimension tecnica", tit: "Filtros que protegen", desc: "DNS de proteccion en la red de la parroquia. Gratuito, sencillo, eficaz. Bloquea contenido inapropiado antes de que llegue." },
    { icon: Heart, label: "Dimension humana", tit: "Acompanamiento que transforma", desc: "Catequesis sobre uso responsable de la tecnologia. Formacion para catequistas. Apoyo a las familias." },
  ], img: "/images/presentaciones/nature.jpg" },
  { id: 6, type: "detail", icon: Wifi, titulo: "Proteger la red de la parroquia", color: "brand", bullets: ["Configura DNS de proteccion en el router de la parroquia", "DNS4.EU - europeo, sin animo de lucro, gratuito, sin registro", "Protege todos los dispositivos conectados a la WiFi parroquial", "Ideal para salas de catequesis, grupos juveniles y despachos"], img: "/images/presentaciones/church.jpg" },
  { id: 7, type: "detail", icon: Heart, titulo: "Acompanar desde la fe", color: "accent", bullets: ["Integrar la educacion digital en la catequesis de Confirmacion", "Hablar del uso de redes sociales desde los valores del Evangelio", "Ayudar a los jovenes a discernir que contenido alimenta su alma", "Formar a catequistas para que sean referentes digitales"], img: "/images/presentaciones/family-1.jpg" },
  { id: 8, type: "center", titulo: "El valor de la comunidad", color: "success", texto: "Una familia sola puede sentirse abrumada. Pero cuando la parroquia se implica -con formacion, recursos y acompanamiento- las familias se sienten sostenidas.", img: "/images/presentaciones/family-2.jpg" },
  { id: 9, type: "detail", icon: Users, titulo: "Como implicar a las familias", color: "cyan", bullets: ["Organiza una charla-taller despues de la misa (30 minutos)", "Entrega el cartel y la guia rapida a cada familia", "Crea un grupo de WhatsApp de familias para compartir dudas", "Ofrece acompanamiento personalizado a quien lo necesite"], img: "/images/presentaciones/teaching.jpg" },
  { id: 10, type: "visual-grid", titulo: "Propuesta por edades", color: "success", items: [
    { icon: Heart, label: "Infancia", text: "Familias: filtros + limites" },
    { icon: Heart, label: "Pre-adolesc.", text: "Catequesis + acompanamiento" },
    { icon: Heart, label: "Adolescencia", text: "Discernimiento + confianza" },
    { icon: Heart, label: "Jovenes", text: "Testimonio + mision digital" },
  ], img: "/images/presentaciones/nature.jpg" },
  { id: 11, type: "detail", icon: BookOpen, titulo: "Formacion para catequistas", color: "brand", bullets: ["Sesion de 1 hora: realidades digitales de los ninos y jovenes", "Guia practica de proteccion digital para catequistas", "Recursos para hablar con familias en las reuniones de grupo", "Deteccion de senales de alerta en el entorno digital"], img: "/images/presentaciones/church.jpg" },
  { id: 12, type: "center", titulo: "Una charla para tu comunidad", color: "cyan", texto: "Presentacion lista de 18 diapositivas adaptada a parroquias. Con lenguaje cercano, valores cristianos y mensajes claros. Descargala, ajustala y presentala.", img: "/images/presentaciones/teaching.jpg" },
  { id: 13, type: "center", titulo: "Gratuito, sencillo, al alcance de todos", color: "success", texto: "Los DNS de proteccion son gratuitos. Los recursos son descargables. La formacion puede ser impartida por cualquier catequista con los materiales adecuados.", img: "/images/presentaciones/nature.jpg" },
  { id: 14, type: "fact", icon: AlertTriangle, titulo: "Errores que evitar", color: "accent", bullets: ["Pensar que la tecnologia es cosa de jovenes y no formarse", "No hablar del tema por miedo o desconocimiento", "Dejar la proteccion digital solo en manos de las familias", "No aprovechar la capilaridad de la parroquia para llegar a todos"], img: "/images/presentaciones/child-screen.jpg" },
  { id: 15, type: "center", titulo: "La parroquia como red de apoyo", color: "brand", texto: "No hay mejor lugar que la parroquia para crear una red de proteccion comunitaria. Familias que se ayudan, catequistas que acompanan, una comunidad que cuida.", img: "/images/presentaciones/church.jpg" },
  { id: 16, type: "center", titulo: "Recursos para la parroquia", color: "cyan", texto: "escudodigitalfamiliar.org/descargas - Carteles para imprimir, guias rapidas, presentaciones listas para charlas y acuerdos familiares.", img: "/images/presentaciones/teaching.jpg" },
  { id: 17, type: "final", icon: Cross, titulo: "Proteger es amar", subtitulo: "Cuidar a los pequenos es cuidar el futuro.", desc: "Dejad que los ninos vengan a mi (Mc 10,14). Proteger a los ninos en el mundo digital es una forma concreta de vivir el Evangelio hoy.", color: "success", img: "/images/presentaciones/family-2.jpg" },
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
