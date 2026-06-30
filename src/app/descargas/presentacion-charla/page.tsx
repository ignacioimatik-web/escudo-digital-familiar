"use client"

import { motion } from "framer-motion"
import { useState, useEffect, useRef, useCallback } from "react"
import {
  Shield, Smartphone, AlertTriangle, Users, Heart,
  Baby, Smile, User, UserCheck, Wifi,
  ArrowDown, ArrowUp, Play, ChevronRight
} from "lucide-react"

const slides = [
  {
    id: 0, type: "title",
    titulo: "Protege a tus hijos en el mundo digital",
    subtitulo: "Un método sencillo, gratuito y eficaz en dos capas",
    color: "brand",
  },
  {
    id: 1, type: "fact",
    icon: AlertTriangle,
    titulo: "La realidad digital de los menores",
    bullets: [
      "La edad media del primer móvil: 9 años",
      "El 90% accede a pornografía antes de los 14",
      "Pasan 4-6 horas al día frente a pantallas",
      "El 70% ha tenido contacto con desconocidos online",
    ],
    color: "accent",
  },
  {
    id: 2, type: "fact",
    icon: AlertTriangle,
    titulo: "No es mala voluntad. Es diseño.",
    bullets: [
      "Las apps están diseñadas para captar atención",
      "Los algoritmos amplifican contenido extremo",
      "Las notificaciones crean adicción",
      "No es falta de carácter. Es ingeniería.",
    ],
    color: "accent",
  },
  {
    id: 3, type: "center",
    titulo: "No basta educar sin proteger",
    texto: "Un niño de 8 años no tiene criterio para filtrar. La exposición temprana deja huella. Proteger es el primer paso para educar.",
    color: "brand",
  },
  {
    id: 4, type: "center",
    titulo: "No basta proteger sin educar",
    texto: "Los filtros se pueden eludir. El objetivo final es formar criterio propio. Sin diálogo, la protección es frágil.",
    color: "brand",
  },
  {
    id: 5, type: "highlight",
    titulo: "Modelo de 2 capas",
    icon: Shield,
    desc: "Protección técnica + acompañamiento humano",
    subitems: [
      { icon: Wifi, label: "Capa 1", tit: "DNS de protección", desc: "Filtra a nivel de red. Bloquea contenido inapropiado antes de que llegue." },
      { icon: Smartphone, label: "Capa 2", tit: "Control parental", desc: "Gestiona tiempos, apps, compras y contenido según la edad." },
    ],
    color: "success",
  },
  {
    id: 6, type: "detail",
    icon: Wifi,
    titulo: "Capa 1: DNS de protección",
    bullets: [
      "El DNS es la agenda telefónica de Internet",
      "Un DNS de protección bloquea dominios maliciosos",
      "Protege TODOS los dispositivos de la red",
      "Gratuito. 5 minutos. Configurar y olvidar.",
    ],
    color: "brand",
  },
  {
    id: 7, type: "detail",
    icon: Smartphone,
    titulo: "Capa 2: Control parental",
    bullets: [
      "Android: Google Family Link",
      "iOS: En Familia + Tiempo de Uso",
      "Límites de tiempo, apps, compras",
      "Se adapta a la edad y madurez del menor",
    ],
    color: "cyan",
  },
  {
    id: 8, type: "visual-grid",
    titulo: "Protección por edades",
    items: [
      { icon: Baby, label: "0-6 años", text: "Control total. El adulto decide." },
      { icon: Smile, label: "7-11 años", text: "Filtros + diálogo inicial." },
      { icon: User, label: "12-14 años", text: "Relajar filtros. Fortalecer criterio." },
      { icon: UserCheck, label: "15-17 años", text: "Criterio propio. Adulto como referencia." },
    ],
    color: "success",
  },
  {
    id: 9, type: "detail",
    icon: Wifi,
    titulo: "¿Cómo configurar el DNS?",
    bullets: [
      "Opción 1: En el router → protege toda la red",
      "Opción 2: DNS privado en Android (Ajustes > Red)",
      "Opción 3: Perfil DNS en iOS o configurar por WiFi",
      "DNS recomendado: DNS4.EU (family.dns4.eu)",
    ],
    color: "brand",
  },
  {
    id: 10, type: "detail",
    icon: Smartphone,
    titulo: "Proveedores DNS recomendados",
    bullets: [
      "⭐ DNS4.EU — Europeo, sin ánimo de lucro, gratuito",
      "⭐ CleanBrowsing — Filtro familiar muy completo",
      "Cloudflare 1.1.1.3 — Rápido y fiable",
      "AdGuard Family — Bloquea anuncios + adultos",
    ],
    color: "cyan",
  },
  {
    id: 11, type: "center",
    titulo: "DNS gratis, sin límites, sin registro",
    texto: "Todos los proveedores que recomendamos tienen versión gratuita sin límite de consultas. No necesitas dar ningún dato personal.",
    color: "success",
  },
  {
    id: 12, type: "detail",
    icon: Smartphone,
    titulo: "Control parental paso a paso",
    bullets: [
      "Android: Descarga Family Link en tu móvil",
      "Crea una cuenta de Google para tu hijo",
      "Configura límites: tiempo, apps, compras",
      "iOS: En Familia > Añadir hijo > Tiempo de Uso",
    ],
    color: "brand",
  },
  {
    id: 13, type: "center",
    titulo: "15-30 minutos. Sin coste.",
    texto: "Configurar la protección completa te llevará menos de media hora. Es gratis. Y una vez configurado, funciona solo.",
    color: "success",
  },
  {
    id: 14, type: "fact",
    icon: AlertTriangle,
    titulo: "Errores frecuentes",
    bullets: [
      "Poner la contraseña que el menor conoce",
      "Proteger solo un dispositivo y olvidar los demás",
      "Confiar solo en los filtros sin dialogar",
      "Configurar una vez y no revisar nunca más",
    ],
    color: "accent",
  },
  {
    id: 15, type: "center",
    titulo: "La tecnología avanza. El acompañamiento también.",
    texto: "Revisa la configuración cada 3 meses. A medida que el menor crece, la protección debe adaptarse. El diálogo es la capa más importante.",
    color: "brand",
  },
  {
    id: 16, type: "center",
    titulo: "¿Y si tengo dudas?",
    texto: "escudodigitalfamiliar.org — Guías paso a paso, configurador interactivo, comparativa de DNS y recursos descargables para ayudarte en todo momento.",
    color: "cyan",
  },
  {
    id: 17, type: "final",
    titulo: "Proteger para educar",
    subtitulo: "Educar para liberar.",
    desc: "No se trata de construir muros. Se trata de acompañar a los menores mientras desarrollan el criterio necesario para navegar el mundo digital con libertad y responsabilidad.",
    color: "success",
  },
]

const slideBgColors: Record<string, string> = {
  brand: "bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900",
  cyan: "bg-gradient-to-br from-slate-900 via-cyan-950 to-slate-900",
  accent: "bg-gradient-to-br from-slate-900 via-accent-950 to-slate-900",
  success: "bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900",
}

const glowColors: Record<string, string> = {
  brand: "bg-brand-500/10",
  cyan: "bg-cyan-500/10",
  accent: "bg-accent-500/10",
  success: "bg-emerald-500/10",
}

export default function PresentacionCharlaPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])

  // IntersectionObserver — detecta qué slide está visible al hacer scroll
  useEffect(() => {
    const observers: IntersectionObserver[] = []
    slideRefs.current.forEach((ref, i) => {
      if (!ref) return
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setCurrentSlide(i)
            }
          })
        },
        { threshold: 0.5 }
      )
      observer.observe(ref)
      observers.push(observer)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  // Teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === " " || e.key === "ArrowRight") {
        e.preventDefault()
        setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1))
        document.getElementById(`s-${Math.min(currentSlide + 1, slides.length - 1)}`)?.scrollIntoView({ behavior: "smooth" })
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault()
        setCurrentSlide((prev) => Math.max(prev - 1, 0))
        document.getElementById(`s-${Math.max(currentSlide - 1, 0)}`)?.scrollIntoView({ behavior: "smooth" })
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentSlide])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    document.getElementById(`s-${index}`)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="relative bg-black">
      {/* Navegación lateral */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === i ? "bg-white w-4" : "bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Diapositiva ${i + 1}`}
          />
        ))}
      </div>

      {/* Contador + navegación inferior */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <span className="text-xs text-white/40 font-mono">
          {String(currentSlide + 1).padStart(2, "0")}/{String(slides.length).padStart(2, "0")}
        </span>
        <button
          onClick={() => goToSlide(Math.max(currentSlide - 1, 0))}
          disabled={currentSlide === 0}
          className="h-9 w-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/70 hover:bg-white/20 disabled:opacity-30 transition-all"
        >
          <ArrowDown className="h-4 w-4 rotate-90" />
        </button>
        <button
          onClick={() => goToSlide(Math.min(currentSlide + 1, slides.length - 1))}
          disabled={currentSlide === slides.length - 1}
          className="h-9 w-9 rounded-full bg-brand-600 flex items-center justify-center text-white hover:bg-brand-700 disabled:opacity-30 transition-all"
        >
          <ArrowDown className="h-4 w-4 -rotate-90" />
        </button>
      </div>

      {/* Slides */}
      {slides.map((slide, index) => {
        const bg = slideBgColors[slide.color]
        const glow = glowColors[slide.color]

        return (
          <div
            key={slide.id}
            id={`s-${index}`}
            ref={(el) => { slideRefs.current[index] = el }}
            className="min-h-screen flex items-center justify-center relative overflow-hidden snap-start"
          >
            {/* Pattern dots */}
            <div className={`absolute inset-0 opacity-[0.03] ${bg}`} 
              style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.8) 1px, transparent 1px)`,
                backgroundSize: '50px 50px'
              }} 
            />
            <div className={`absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80`} />

            {/* Ambient glow */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full ${glow} blur-3xl`} />

            <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12">
              {/* ═══ TITLE ═══ */}
              {slide.type === "title" && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-8">
                    <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-brand-500/20 backdrop-blur-sm border border-brand-500/30">
                      <Shield className="h-10 w-10 text-brand-400" />
                    </div>
                  </div>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg">
                    {slide.titulo}
                  </h1>
                  <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto">{slide.subtitulo}</p>
                  <div className="mt-12 flex items-center justify-center gap-2 text-sm text-slate-500">
                    <Play className="h-4 w-4" />
                    Usa las flechas o el scroll para navegar
                  </div>
                </motion.div>
              )}

              {/* ═══ FACT ═══ */}
              {slide.type === "fact" && slide.icon && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center gap-3 mb-8">
                    <slide.icon className="h-8 w-8 text-accent-400" />
                    <span className="text-sm font-semibold uppercase tracking-widest text-accent-400">Realidad</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-10 max-w-3xl drop-shadow-lg">{slide.titulo}</h2>
                  <div className="space-y-5 max-w-3xl">
                    {slide.bullets?.map((b, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.12 }}
                        className="flex items-center gap-4 text-lg md:text-xl text-slate-200"
                      >
                        <div className="h-2.5 w-2.5 rounded-full bg-accent-400 shrink-0 shadow-lg shadow-accent-500/30" />
                        <span>{b}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ═══ CENTER ═══ */}
              {slide.type === "center" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="text-center max-w-4xl mx-auto"
                >
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight drop-shadow-lg">
                    {slide.titulo}
                  </h2>
                  <p className="text-xl md:text-2xl text-slate-300 leading-relaxed drop-shadow">
                    {slide.texto}
                  </p>
                </motion.div>
              )}

              {/* ═══ HIGHLIGHT ═══ */}
              {slide.type === "highlight" && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-success-500/20 border border-success-500/30">
                      <Shield className="h-8 w-8 text-success-400" />
                    </div>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">{slide.titulo}</h2>
                  <p className="text-lg text-slate-400 mb-10">{slide.desc}</p>
                  <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                    {slide.subitems?.map((item, i) => {
                      const Icon = item.icon
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: i * 0.15 }}
                          className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 text-left hover:bg-white/10 transition-colors"
                        >
                          <Icon className="h-8 w-8 text-white mb-4" />
                          <span className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-1 block">{item.label}</span>
                          <h3 className="text-xl font-bold text-white mb-2">{item.tit}</h3>
                          <p className="text-sm text-slate-300">{item.desc}</p>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              )}

              {/* ═══ DETAIL ═══ */}
              {slide.type === "detail" && slide.icon && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <slide.icon className={`h-8 w-8 ${slide.color === "brand" ? "text-brand-400" : "text-cyan-400"}`} />
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">{slide.titulo}</h2>
                  </div>
                  <div className="space-y-4 max-w-3xl mt-8">
                    {slide.bullets?.map((b, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: i * 0.1 }}
                        className="flex items-center gap-4 text-lg md:text-xl text-slate-200"
                      >
                        <ChevronRight className={`h-5 w-5 shrink-0 ${slide.color === "brand" ? "text-brand-400" : "text-cyan-400"}`} />
                        <span>{b}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ═══ VISUAL GRID ═══ */}
              {slide.type === "visual-grid" && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-10 text-center drop-shadow-lg">{slide.titulo}</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                    {slide.items?.map((item, i) => {
                      const Icon = item.icon
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: i * 0.1 }}
                          className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 text-center hover:bg-white/15 transition-all duration-300 hover:-translate-y-1"
                        >
                          <div className="flex justify-center mb-4">
                            <div className="h-16 w-16 rounded-2xl bg-success-500/20 border border-success-500/30 flex items-center justify-center">
                              <Icon className="h-8 w-8 text-success-400" />
                            </div>
                          </div>
                          <p className="text-3xl font-bold text-white mb-1">{item.label}</p>
                          <p className="text-xs text-slate-400">{item.text}</p>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              )}

              {/* ═══ FINAL ═══ */}
              {slide.type === "final" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className="text-center max-w-4xl mx-auto"
                >
                  <div className="flex justify-center mb-8">
                    <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-success-500/20 border border-success-500/30">
                      <Heart className="h-10 w-10 text-success-400" />
                    </div>
                  </div>
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 drop-shadow-lg">{slide.titulo}</h2>
                  <h3 className="text-3xl md:text-5xl font-bold text-success-400 mb-8 drop-shadow">{slide.subtitulo}</h3>
                  <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed drop-shadow">{slide.desc}</p>
                  <div className="mt-12 text-sm text-slate-500">
                    escudodigitalfamiliar.org
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
