"use client"

import { Shield, Smartphone, AlertTriangle, Users, Heart, Baby, Smile, User, UserCheck, Wifi, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { PresentationSlide, type SlideData } from "@/components/presentacion/presentation-slide"

const slides: SlideData[] = [
  { id: 0, type: "title", icon: Shield, titulo: "Protege a tus hijos en el mundo digital", subtitulo: "Un metodo sencillo, gratuito y eficaz en dos capas", texto: "Para familias que quieren lo mejor para sus hijos", img: "/images/presentaciones/family-tablet.jpg" },
  { id: 1, type: "fact", icon: AlertTriangle, titulo: "La realidad digital de los menores", color: "accent", bullets: ["La edad media del primer movil: 9 anos", "El 90% accede a pornografia antes de los 14", "Pasan 4-6 horas al dia frente a pantallas", "Las familias no pueden estar todo el tiempo supervisando"], img: "/images/presentaciones/child-screen.jpg" },
  { id: 2, type: "fact", icon: AlertTriangle, titulo: "No es mala voluntad. Es diseno.", color: "accent", bullets: ["Las apps estan disenadas para captar atencion infantil", "Los algoritmos amplifican contenido extremo sin control", "Las notificaciones crean adiccion en cerebros en desarrollo", "Los menores no tienen culpa - necesitan proteccion"], img: "/images/presentaciones/family-dinner.jpg" },
  { id: 3, type: "center", titulo: "No basta educar sin proteger", color: "brand", texto: "Un nino de 8 anos no tiene criterio para filtrar. La exposicion temprana deja huella imborrable. Proteger es el primer paso para educar.", img: "/images/presentaciones/family-1.jpg" },
  { id: 4, type: "center", titulo: "No basta proteger sin educar", color: "brand", texto: "Los filtros se pueden eludir. El objetivo final no es encerrar, sino formar criterio propio. Sin dialogo, la proteccion es fragil.", img: "/images/presentaciones/family-outdoor.jpg" },
  { id: 5, type: "highlight", icon: Shield, titulo: "Que podemos hacer?", desc: "Un modelo sencillo de 2 capas que cualquier familia puede implementar hoy", color: "success", subitems: [
    { icon: Wifi, label: "Capa 1", tit: "DNS de proteccion", desc: "Filtra a nivel de red. Bloquea contenido inapropiado antes de que llegue al dispositivo. Gratuito. 5 minutos." },
    { icon: Smartphone, label: "Capa 2", tit: "Control parental", desc: "Gestiona tiempos, apps, compras y contenido segun la edad. Se adapta al crecimiento del menor." },
  ], img: "/images/presentaciones/family-2.jpg" },
  { id: 6, type: "detail", icon: Wifi, titulo: "Capa 1: DNS de proteccion", color: "brand", bullets: ["El DNS es la agenda telefonica de Internet", "Un DNS de proteccion bloquea dominios maliciosos y pornograficos", "Protege TODOS los dispositivos de la red domestica", "Gratuito. 5 minutos. Configurar y olvidar."], img: "/images/presentaciones/tech.jpg" },
  { id: 7, type: "detail", icon: Smartphone, titulo: "Capa 2: Control parental", color: "cyan", bullets: ["Android: Google Family Link - descarga y configura en 10 min", "iOS: En Familia + Tiempo de Uso - control por edades", "Pon limites de tiempo, restringe apps, bloquea compras", "Acompanalos mientras aprenden a usar la tecnologia"], img: "/images/presentaciones/social.jpg" },
  { id: 8, type: "visual-grid", titulo: "Proteccion por edades", color: "success", items: [
    { icon: Baby, label: "0-6 anos", text: "Control total. El adulto decide." },
    { icon: Smile, label: "7-11 anos", text: "Filtros + dialogo inicial." },
    { icon: User, label: "12-14 anos", text: "Relajar filtros. Fortalecer criterio." },
    { icon: UserCheck, label: "15-17 anos", text: "Criterio propio. Referencia adulta." },
  ], img: "/images/presentaciones/nature.jpg" },
  { id: 9, type: "detail", icon: Wifi, titulo: "DNS recomendados para familias", color: "brand", bullets: ["DNS4.EU - Europeo, sin animo de lucro, gratuito, sin registro", "CleanBrowsing Family - Filtro muy completo, bloquea proxies", "Cloudflare 1.1.1.3 - Rapido, global, fiable", "AdGuard Family - Bloquea anuncios + contenido para adultos"], img: "/images/presentaciones/tech.jpg" },
  { id: 10, type: "center", titulo: "DNS gratis, sin limites, sin registro", color: "success", texto: "Todos los proveedores que recomendamos tienen version gratuita sin limite de consultas. No necesitas dar ningun dato personal.", img: "/images/presentaciones/nature.jpg" },
  { id: 11, type: "detail", icon: Smartphone, titulo: "Como empezar hoy mismo", color: "brand", bullets: ["1. Cambia el DNS del router (5 min) - protege toda la casa", "2. Configura DNS privado en cada dispositivo (5 min)", "3. Instala Family Link o activa Tiempo de Uso (10 min)", "4. Habla con tus hijos sobre por que lo haces (sin miedo)"], img: "/images/presentaciones/teaching.jpg" },
  { id: 12, type: "center", titulo: "15-30 minutos. Sin coste.", color: "success", texto: "Configurar la proteccion completa te llevara menos de media hora. Es gratis. Y una vez configurado, funciona solo.", img: "/images/presentaciones/nature.jpg" },
  { id: 13, type: "fact", icon: AlertTriangle, titulo: "Errores comunes en familia", color: "accent", bullets: ["Poner la contrasena que el menor conoce y la desactiva", "Proteger solo el movil y olvidar la tablet, el PC o la tele", "Confiar solo en los filtros sin hablar con ellos", "Configurar una vez y no revisar nunca mas los ajustes"], img: "/images/presentaciones/child-screen.jpg" },
  { id: 14, type: "center", titulo: "La proteccion debe crecer con ellos", color: "brand", texto: "Revisa la configuracion cada 3 meses. A medida que el menor crece, la proteccion se adapta. El dialogo es la capa mas importante.", img: "/images/presentaciones/teaching.jpg" },
  { id: 15, type: "center", titulo: "No estas solo en esto", color: "cyan", texto: "escudodigitalfamiliar.org - Guias paso a paso, configurador interactivo, comparativa de DNS y recursos descargables. Todo gratis.", img: "/images/presentaciones/family-1.jpg" },
  { id: 16, type: "final", icon: Heart, titulo: "Proteger para educar", subtitulo: "Educar para liberar.", desc: "No se trata de construir muros. Se trata de acompanar a tus hijos mientras desarrollan el criterio necesario para navegar el mundo digital con libertad y responsabilidad.", color: "success", img: "/images/presentaciones/family-2.jpg" },
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
