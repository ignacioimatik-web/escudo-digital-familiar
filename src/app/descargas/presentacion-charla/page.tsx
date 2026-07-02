"use client"

import { Shield, Wifi, Smartphone, AlertTriangle, Heart, Baby, Smile, User, UserCheck, MessageCircle, BookOpen, Clock } from "lucide-react"
import Link from "next/link"
import { PresentationSlide, type SlideData } from "@/components/presentacion/presentation-slide"

const slides: SlideData[] = [
  {
    id: 0, type: "title", icon: Heart, eyebrow: "Charla para familias",
    titulo: "Tus hijos ya viven online.",
    subtitulo: "Aprende a protegerlos en 30 minutos.",
    texto: "Una charla práctica para madres, padres y educadores.",
    img: "/images/presentaciones/family-tablet.jpg",
    speakerNotes: [
      "⏱️ Duración total estimada: 35-40 minutos",
      "🎯 Objetivo: que cada familia salga sabiendo exactamente qué hacer mañana",
      "👋 Preséntate brevemente: quién eres y por qué te importa este tema",
      "📱 Pregunta inicial: '¿Cuántos de vosotros le habéis dejado el móvil a vuestro hijo hoy?'",
      "🗣️ Tono: cercano, sin tecnicismos, sin culpabilizar",
    ],
  },
  {
    id: 1, type: "fact", icon: AlertTriangle,
    titulo: "La realidad que no vemos",
    color: "accent",
    bullets: [
      "9 años: la edad media del primer móvil propio",
      "9 de cada 10 menores ven pornografía antes de los 14",
      "Más de 5 horas de pantalla al día de media",
      "El 70% ha tenido contacto con desconocidos online",
    ],
    img: "/images/presentaciones/child-screen.jpg",
    speakerNotes: [
      "⏱️ 3 min — Lee los datos en voz alta, haz pausa después de cada uno",
      "💡 Pregunta retórica: '¿Cuántos de estos datos conocíais?'",
      "📊 No uses tono alarmista. Son datos, no amenazas",
      "🎯 Clave: 'Esto no pasa en otras familias. Pasa en todas.'",
    ],
  },
  {
    id: 2, type: "center", variant: "keynote",
    eyebrow: "No es culpa de nadie",
    titulo: "El diseño está hecho para atraparlos",
    color: "brand",
    texto: "Cada notificación, cada scroll infinito, cada autoplay. Hay equipos de ingenieros trabajando para no soltar su atención. No compites en igualdad.",
    img: "/images/presentaciones/family-dinner.jpg",
    speakerNotes: [
      "⏱️ 2 min",
      "💡 Explica: 'Las apps no son malas. Están diseñadas para captar atención. Eso es su negocio.'",
      "📱 Ejemplo: 'TikTok no es malo, pero su algoritmo está optimizado para que no puedas dejar de ver.'",
      "🎯 Quita la culpa: 'No es que tus hijos tengan poca fuerza de voluntad. Es que el sistema está diseñado contra ellos.'",
    ],
  },
  {
    id: 3, type: "center", variant: "keynote",
    titulo: "No basta educar sin proteger",
    color: "brand",
    texto: "Un niño de 8 años no tiene criterio para frenarse solo. La exposición temprana deja huella. Proteger es el primer paso para poder educar.",
    img: "/images/presentaciones/family-1.jpg",
    speakerNotes: [
      "⏱️ 1.5 min",
      "💡 Pregunta: 'Si tu hijo de 8 años viera algo que no debería... ¿podría dejar de mirar?'",
      "🎯 Clave: 'La protección no sustituye a la educación. La hace posible.'",
    ],
  },
  {
    id: 4, type: "center", variant: "keynote",
    titulo: "No basta proteger sin educar",
    color: "cyan",
    texto: "Los filtros se sortean. El objetivo no es encerrarlos, es formar su criterio. Sin diálogo, la protección es papel mojado.",
    img: "/images/presentaciones/family-outdoor.jpg",
    speakerNotes: [
      "⏱️ 1.5 min",
      "💡 Ejemplo: 'Un filtro DNS no te servirá de nada si tu hijo de 15 años sabe usar una VPN.'",
      "🎯 Clave: 'La tecnología es tu aliada, pero no hace el trabajo sola.'",
    ],
  },
  {
    id: 5, type: "highlight", icon: Shield,
    titulo: "Dos capas. Una tarde.",
    desc: "Todo lo que necesitas para proteger tu casa, hoy mismo",
    color: "success",
    subitems: [
      { icon: Wifi, label: "Capa 1", tit: "DNS de protección", desc: "Filtra todo lo malo antes de que llegue a la pantalla. 5 minutos. Gratis. Una vez configurado, funciona solo." },
      { icon: Smartphone, label: "Capa 2", tit: "Control parental", desc: "Tiempos, apps, compras y contenido según la edad. Se adapta al crecimiento de tus hijos." },
    ],
    img: "/images/presentaciones/family-2.jpg",
    speakerNotes: [
      "⏱️ 3 min — Este es el slide más importante de toda la charla",
      "🎯 Tómate tu tiempo. Explica bien cada capa",
      "💡 Capa 1: 'Si no sabes qué es un DNS, no pasa nada. Es como cambiar un número en la configuración de tu router.'",
      "💡 Capa 2: 'El control parental no es vigilancia. Es acompañamiento digital.'",
      "📱 Pregunta: '¿Alguien aquí usa ya Family Link o Tiempo de Uso?'",
    ],
  },
  {
    id: 6, type: "detail", icon: Wifi,
    titulo: "Capa 1: DNS de protección",
    color: "brand",
    bullets: [
      "El DNS es la agenda telefónica de Internet",
      "Bloquea dominios maliciosos y pornográficos antes de que carguen",
      "Protege TODOS los dispositivos de tu WiFi sin excepción",
      "Gratis. 5 minutos. Se configura y se olvida",
    ],
    img: "/images/presentaciones/tech.jpg",
    speakerNotes: [
      "⏱️ 3 min",
      "💡 Explicación sencilla: 'Cuando escribes google.com, el DNS traduce eso a números. Un DNS de protección bloquea las direcciones malas.'",
      "📱 Muéstrales el móvil: 'En Android se llama DNS privado, en iOS se configura red por red'",
      "📋 DNS que recomendar: 'DNS4.EU (child.joindns4.eu) o CleanBrowsing Family'",
    ],
  },
  {
    id: 7, type: "detail", icon: Smartphone,
    titulo: "Capa 2: Control parental",
    color: "cyan",
    bullets: [
      "Android: Google Family Link, se configura en 10 minutos",
      "iOS: En Familia + Tiempo de Uso, control por edad",
      "Límites de tiempo, apps restringidas, compras bloqueadas",
      "Acompáñalos mientras aprenden, no los vigiles solamente",
    ],
    img: "/images/presentaciones/social.jpg",
    speakerNotes: [
      "⏱️ 3 min",
      "💡 Consejo práctico: 'La contraseña del control parental NO debe saberla el menor. Esa es la regla número uno.'",
      "📱 Android vs iOS: 'Si tenéis Android, usad Family Link. Si tenéis iPhone, usad Tiempo de Uso. Ambos son gratis.'",
      "🎯 Clave: 'No pongáis 100 restricciones el primer día. Empezad con lo básico e id ajustando.'",
    ],
  },
  {
    id: 8, type: "visual-grid",
    titulo: "La protección crece con ellos",
    color: "success",
    items: [
      { icon: Baby, label: "0-6 años", text: "Decide el adulto. Sin excepciones." },
      { icon: Smile, label: "7-11 años", text: "Filtros + primeras conversaciones." },
      { icon: User, label: "12-14 años", text: "Menos filtro, más criterio." },
      { icon: UserCheck, label: "15-17 años", text: "Su criterio. Tu presencia." },
    ],
    img: "/images/presentaciones/nature.jpg",
    speakerNotes: [
      "⏱️ 2 min",
      "💡 Explica: 'No es lo mismo proteger a un niño de 6 que a un adolescente de 16. La protección debe evolucionar.'",
      "🎯 Clave: 'El objetivo final no es mantener filtros para siempre. Es que cuando se los quites, tengan criterio propio.'",
    ],
  },
  {
    id: 9, type: "detail", icon: Clock,
    titulo: "Cómo empezar mañana mismo",
    color: "brand",
    bullets: [
      "1. Cambia el DNS del router: protege toda la casa (5 min)",
      "2. Configura el DNS privado en cada móvil (5 min)",
      "3. Activa Family Link o Tiempo de Uso (10 min)",
      "4. Habla con tus hijos. Sin miedo, sin castigo.",
    ],
    img: "/images/presentaciones/teaching.jpg",
    speakerNotes: [
      "⏱️ 2 min",
      "📋 Entrega la guía rápida impresa (disponible en descargas)",
      "💡 'No necesitáis hacerlo todo hoy. Haced un paso cada día.'",
      "🎯 'El paso 4 es el más importante. Decirles: voy a poner esto porque te quiero y mi trabajo es protegerte.'",
    ],
  },
  {
    id: 10, type: "detail", icon: MessageCircle,
    titulo: "Preguntas frecuentes",
    color: "accent",
    bullets: [
      "¿Y si mi hijo sabe más de tecnología que yo? Que te enseñe. Hazlo con él.",
      "¿Esto funciona también con datos móviles? En Android sí. En iOS necesitas configurar cada red.",
      "¿Y si el menor se salta los filtros? Habla con él. La tecnología no es suficiente.",
      "¿Cada cuánto hay que revisarlo? Cada 3 meses. La protección crece con ellos.",
    ],
    img: "/images/presentaciones/digital-shield.jpg",
    speakerNotes: [
      "⏱️ 3-5 min — Abre turno de preguntas reales",
      "💡 Pregunta al público: '¿Alguna duda que no haya salido?'",
      "📋 Si no sabes algo: 'No lo sé, pero lo miramos juntos en la web'",
      "🎯 Clave: 'No hace falta ser experto en tecnología. Solo hace faltar querer protegerlos.'",
    ],
  },
  {
    id: 11, type: "center",
    eyebrow: "No estás solo",
    titulo: "Todo lo que necesitas, gratis y para siempre",
    color: "cyan",
    texto: "escudodigitalfamiliar.org — guías paso a paso, configurador interactivo, comparador de DNS, acuerdo familiar descargable. Todo gratis. Siempre.",
    img: "/images/presentaciones/family-1.jpg",
    speakerNotes: [
      "⏱️ 1 min",
      "📱 Diles que abran la web ahora mismo en el móvil",
      "📋 Entrega el cartel con el código QR (disponible en descargas)",
      "💡 'Guardad esta página en favoritos. La vais a necesitar.'",
    ],
  },
  {
    id: 12, type: "final", icon: Heart,
    titulo: "Proteger para educar",
    subtitulo: "Educar para liberar.",
    desc: "No se trata de construir muros. Se trata de acompañar a tus hijos mientras aprenden a navegar el mundo digital con libertad, criterio y responsabilidad.",
    color: "success",
    img: "/images/presentaciones/family-2.jpg",
    speakerNotes: [
      "⏱️ 1 min — Cierre emocional",
      "🎯 Mensaje final: 'Vais a llegar a casa, vais a abrir el router, y en 30 minutos vais a haber hecho más por la protección digital de vuestros hijos que la mayoría de las familias.'",
      "👏 Agradece su asistencia y ofrece tu contacto si procede",
      "📋 Recuerda: 'Compartid esto con otras familias. Entre más seamos, mejor.'",
    ],
  },
]

export default function PresentacionCharlaPage() {
  return (
    <>
      <div className="no-print fixed top-0 left-0 z-50">
        <Link href="/descargas" className="inline-flex items-center gap-1.5 px-3 py-1.5 m-2 rounded-lg bg-black/40 backdrop-blur-md text-xs text-white/60 hover:text-white transition-colors">
          <BookOpen className="h-3 w-3" />
          Descargas
        </Link>
      </div>
      <PresentationSlide
        slides={slides}
        theme={{ name: "Charla para Familias", icon: Heart, slug: "charla", accentColor: "#22c55e", accentClass: "text-emerald-400", successClass: "text-brand-400" }}
      />
    </>
  )
}
