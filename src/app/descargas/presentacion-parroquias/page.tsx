"use client"

import { Shield, Smartphone, AlertTriangle, Heart, Users, Wifi, BookOpen, Church, ArrowLeft, Lightbulb, Cross } from "lucide-react"
import Link from "next/link"
import { PresentationSlide, type SlideData } from "@/components/presentacion/presentation-slide"

const slides: SlideData[] = [
  { id: 0, type: "title", icon: Heart, titulo: "Protección digital en la comunidad parroquial", subtitulo: "Cuidar a los niños y jóvenes también en el mundo digital", texto: "Para sacerdotes, catequistas, monitores y agentes de pastoral" },
  { id: 1, type: "fact", icon: AlertTriangle, titulo: "El mundo digital también necesita pastoral", color: "accent", bullets: ["Los niños y jóvenes de tu parroquia viven gran parte de su vida online", "El 90% accede a pornografía antes de los 14, a menudo sin buscarlo", "Las redes sociales son el nuevo «parque» donde se relacionan", "La parroquia no puede estar ausente de esta realidad"] },
  { id: 2, type: "fact", icon: AlertTriangle, titulo: "Una llamada a la responsabilidad", color: "accent", bullets: ["La Iglesia tiene el deber de proteger a los más pequeños", "Los catequistas y monitores son figuras de referencia y confianza", "Las familias esperan orientación de la comunidad parroquial", "La protección digital es una forma concreta de caridad"] },
  { id: 3, type: "center", titulo: "No se trata de tecnología. Se trata de personas.", color: "brand", texto: "Detrás de cada pantalla hay un hijo de Dios. La protección digital no es un tema técnico — es una cuestión de amor, cuidado y responsabilidad comunitaria." },
  { id: 4, type: "center", titulo: "El reto de nuestro tiempo", color: "brand", texto: "La tecnología avanza más rápido que nuestra capacidad de acompañar. Pero la Iglesia tiene algo que el mundo digital no puede dar: comunidad, verdad y amor incondicional." },
  { id: 5, type: "highlight", icon: Shield, titulo: "Dos capas, una misión", desc: "Protección técnica + Acompañamiento humano desde la fe", color: "success", subitems: [
    { icon: Wifi, label: "Dimensión técnica", tit: "Filtros que protegen", desc: "DNS de protección en la red de la parroquia. Gratuito, sencillo, eficaz. Bloquea contenido inapropiado antes de que llegue." },
    { icon: Heart, label: "Dimensión humana", tit: "Acompañamiento que transforma", desc: "Catequesis sobre uso responsable de la tecnología. Formación para catequistas. Apoyo a las familias." },
  ]},
  { id: 6, type: "detail", icon: Wifi, titulo: "Proteger la red de la parroquia", color: "brand", bullets: ["Configura DNS de protección en el router de la parroquia", "DNS4.EU — europeo, sin ánimo de lucro, gratuito, sin registro", "Protege todos los dispositivos conectados a la WiFi parroquial", "Ideal para salas de catequesis, grupos juveniles y despachos"] },
  { id: 7, type: "detail", icon: Heart, titulo: "Acompañar desde la fe", color: "accent", bullets: ["Integrar la educación digital en la catequesis de Confirmación", "Hablar del uso de redes sociales desde los valores del Evangelio", "Ayudar a los jóvenes a discernir qué contenido alimenta su alma", "Formar a catequistas para que sean referentes digitales"] },
  { id: 8, type: "center", titulo: "El valor de la comunidad", color: "success", texto: "Una familia sola puede sentirse abrumada. Pero cuando la parroquia se implica —con formación, recursos y acompañamiento— las familias se sienten sostenidas. La protección digital deja de ser una carga y se convierte en una misión compartida." },
  { id: 9, type: "detail", icon: Users, titulo: "Cómo implicar a las familias", color: "cyan", bullets: ["Organiza una charla-taller después de la misa (30 minutos)", "Entrega el cartel y la guía rápida a cada familia", "Crea un grupo de WhatsApp de familias para compartir dudas", "Ofrece acompañamiento personalizado a quien lo necesite"] },
  { id: 10, type: "visual-grid", titulo: "Propuesta por edades", color: "success", items: [
    { icon: Heart, label: "Infancia", text: "Familias: filtros + límites" },
    { icon: Heart, label: "Pre-adolesc.", text: "Catequesis + acompañamiento" },
    { icon: Heart, label: "Adolescencia", text: "Discernimiento + confianza" },
    { icon: Heart, label: "Jóvenes", text: "Testimonio + misión digital" },
  ]},
  { id: 11, type: "detail", icon: BookOpen, titulo: "Formación para catequistas", color: "brand", bullets: ["Sesión de 1 hora: realidades digitales de los niños y jóvenes", "Guía práctica de protección digital para catequistas", "Recursos para hablar con familias en las reuniones de grupo", "Detección de señales de alerta en el entorno digital"] },
  { id: 12, type: "center", titulo: "Una charla para tu comunidad", color: "cyan", texto: "Presentación lista de 18 diapositivas adaptada a parroquias. Con lenguaje cercano, valores cristianos y mensajes claros. Descárgala, ajústala y preséntala." },
  { id: 13, type: "center", titulo: "Gratuito, sencillo, al alcance de todos", color: "success", texto: "Los DNS de protección son gratuitos. Los recursos son descargables. La formación puede ser impartida por cualquier catequista con los materiales adecuados. La parroquia no necesita presupuesto — necesita compromiso." },
  { id: 14, type: "fact", icon: AlertTriangle, titulo: "Errores que evitar", color: "accent", bullets: ["Pensar que la tecnología es «cosa de jóvenes» y no formarse", "No hablar del tema por miedo o desconocimiento", "Dejar la protección digital solo en manos de las familias", "No aprovechar la capilaridad de la parroquia para llegar a todos"] },
  { id: 15, type: "center", titulo: "La parroquia como red de apoyo", color: "brand", texto: "No hay mejor lugar que la parroquia para crear una red de protección comunitaria. Familias que se ayudan, catequistas que acompañan, una comunidad que cuida. Eso es Iglesia." },
  { id: 16, type: "center", titulo: "Recursos para la parroquia", color: "cyan", texto: "escudodigitalfamiliar.org/descargas — Carteles para imprimir, guías rápidas, presentaciones listas para charlas y acuerdos familiares." },
  { id: 17, type: "final", icon: Cross, titulo: "Proteger es amar", subtitulo: "Cuidar a los pequeños es cuidar el futuro.", desc: "«Dejad que los niños vengan a mí» (Mc 10,14). Proteger a los niños en el mundo digital es una forma concreta de vivir el Evangelio hoy.", color: "success" },
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
