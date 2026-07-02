"use client"

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { ArrowDown, Play, NotebookText, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SlideData {
  id: number
  type: "title" | "fact" | "center" | "highlight" | "detail" | "visual-grid" | "final"
  titulo: string
  subtitulo?: string
  texto?: string
  desc?: string
  icon?: React.ElementType
  bullets?: string[]
  subitems?: { icon: React.ElementType; label: string; tit: string; desc: string }[]
  items?: { icon: React.ElementType; label: string; text: string }[]
  color?: "brand" | "accent" | "success" | "cyan"
  img?: string
  /** "keynote" = tipografía más grande y minimalista, tipo Apple Keynote */
  variant?: "keynote"
  /** Etiqueta corta que aparece encima del título (kicker) */
  eyebrow?: string
  /** Notas del orador — no se muestran en pantalla, solo en el panel de notas (tecla "N") */
  speakerNotes?: string[]
}

export interface PresentationTheme {
  name: string
  icon: React.ElementType
  slug: string
  accentColor: string
  accentClass: string
  successClass: string
}

interface PresentationSlideProps {
  slides: SlideData[]
  theme: PresentationTheme
}

const colorMap = {
  brand: {
    gradientFrom: "from-brand-950",
    glow: "bg-brand-500/10",
    text: "text-brand-400",
    bullet: "bg-brand-400",
    tint: "from-brand-900/30 via-transparent to-brand-950/40",
    aurora: ["#1d3a8f", "#0b1220"],
  },
  success: {
    gradientFrom: "from-emerald-950",
    glow: "bg-emerald-500/10",
    text: "text-emerald-400",
    bullet: "bg-emerald-400",
    tint: "from-emerald-900/30 via-transparent to-emerald-950/40",
    aurora: ["#0f5132", "#0b1220"],
  },
  accent: {
    gradientFrom: "from-accent-950",
    glow: "bg-accent-500/10",
    text: "text-accent-400",
    bullet: "bg-accent-400",
    tint: "from-amber-900/25 via-transparent to-amber-950/35",
    aurora: ["#7c2d12", "#0b1220"],
  },
  cyan: {
    gradientFrom: "from-cyan-950",
    glow: "bg-cyan-500/10",
    text: "text-cyan-400",
    bullet: "bg-cyan-400",
    tint: "from-cyan-900/30 via-transparent to-cyan-950/40",
    aurora: ["#0e5c66", "#0b1220"],
  },
} as const

function AnimatedAurora({ colors }: { colors: readonly [string, string] }) {
  return (
    <motion.div
      aria-hidden
      className="absolute inset-0 opacity-60 mix-blend-screen"
      style={{
        backgroundImage: `linear-gradient(120deg, ${colors[0]}55, transparent 40%, ${colors[1]}66, transparent 70%, ${colors[0]}44)`,
        backgroundSize: "250% 250%",
      }}
      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
      transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
    />
  )
}

function SlideBackgroundImage({ src, priority }: { src: string; priority: boolean }) {
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"])

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden">
      <motion.div
        style={{ y }}
        initial={{ scale: 1.12 }}
        animate={{ scale: 1.04 }}
        transition={{ duration: 9, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src={src}
          alt=""
          fill
          className="object-cover opacity-[0.1]"
          priority={priority}
          sizes="100vw"
        />
      </motion.div>
    </div>
  )
}

export function PresentationSlide({ slides, theme }: PresentationSlideProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showNotes, setShowNotes] = useState(false)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])

  const accent = theme.accentColor
  const hasAnyNotes = slides.some((s) => s.speakerNotes && s.speakerNotes.length > 0)
  const activeNotes = slides[currentSlide]?.speakerNotes

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    slideRefs.current.forEach((ref, i) => {
      if (!ref) return
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setCurrentSlide(i)
          })
        },
        { threshold: 0.5 }
      )
      observer.observe(ref)
      observers.push(observer)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === " " || e.key === "ArrowRight") {
        e.preventDefault()
        const next = Math.min(currentSlide + 1, slides.length - 1)
        setCurrentSlide(next)
        document.getElementById(`s-${next}`)?.scrollIntoView({ behavior: "smooth" })
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault()
        const prev = Math.max(currentSlide - 1, 0)
        setCurrentSlide(prev)
        document.getElementById(`s-${prev}`)?.scrollIntoView({ behavior: "smooth" })
      } else if (e.key.toLowerCase() === "n" && hasAnyNotes) {
        e.preventDefault()
        setShowNotes((prev) => !prev)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentSlide, slides.length, hasAnyNotes])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    document.getElementById(`s-${index}`)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="relative bg-black">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-white/5">
        <motion.div
          className="h-full"
          style={{ backgroundColor: accent }}
          animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

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

      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <span className="text-xs text-white/40 font-mono">
          {String(currentSlide + 1).padStart(2, "0")}/{String(slides.length).padStart(2, "0")}
        </span>
        {hasAnyNotes && (
          <button
            onClick={() => setShowNotes((prev) => !prev)}
            title="Notas del orador (tecla N)"
            className={cn(
              "h-9 w-9 rounded-full backdrop-blur-md border flex items-center justify-center transition-all",
              showNotes
                ? "bg-white/90 border-white/90 text-slate-900"
                : "bg-white/10 border-white/20 text-white/70 hover:bg-white/20"
            )}
          >
            <NotebookText className="h-4 w-4" />
          </button>
        )}
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
          className="h-9 w-9 rounded-full flex items-center justify-center text-white disabled:opacity-30 transition-all shadow-lg"
          style={{ backgroundColor: accent, boxShadow: `0 8px 24px -8px ${accent}80` }}
        >
          <ArrowDown className="h-4 w-4 -rotate-90" />
        </button>
      </div>

      {/* Panel de notas del orador — no se imprime ni sale en pantalla al proyectar */}
      {hasAnyNotes && (
        <AnimatePresence>
          {showNotes && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.25 }}
              className="no-print fixed bottom-20 right-6 z-50 w-[min(92vw,26rem)] max-h-[55vh] overflow-y-auto rounded-2xl bg-slate-950/95 backdrop-blur-xl border border-white/15 shadow-2xl p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: accent }}>
                  <NotebookText className="h-3.5 w-3.5" />
                  Notas del orador
                </div>
                <button
                  onClick={() => setShowNotes(false)}
                  className="h-6 w-6 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Cerrar notas"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              {activeNotes && activeNotes.length > 0 ? (
                <ul className="space-y-2.5">
                  {activeNotes.map((note, i) => (
                    <li key={i} className="text-sm text-slate-200 leading-relaxed flex gap-2.5">
                      <span className="shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-white/30" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-400 italic">Sin notas para esta diapositiva.</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {slides.map((slide, index) => {
        const palette = colorMap[slide.color ?? "brand"]
        const hasImage = !!slide.img
        const isKeynote = slide.variant === "keynote"

        return (
          <div
            key={slide.id}
            id={`s-${index}`}
            ref={(el) => { slideRefs.current[index] = el }}
            className={`min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 ${palette.gradientFrom} to-slate-900`}
          >
            {/* Background image with Ken Burns zoom + parallax */}
            {hasImage && <SlideBackgroundImage src={slide.img!} priority={index < 3} />}

            {/* Animated aurora overlay */}
            <AnimatedAurora colors={palette.aurora} />

            {/* Pattern dots */}
            <div className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.8) 1px, transparent 1px)`,
                backgroundSize: '50px 50px'
              }}
            />

            {/* Dark gradient overlay — keeps text readable */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/85" />

            {/* Vignette for extra contrast at edges */}
            <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.55)_100%)]" />

            {/* Color-tinted gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-b ${palette.tint}`} />

            {/* Ambient glow */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full ${palette.glow} blur-3xl`} />

            <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12">
              {slide.type === "title" && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className="text-center"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -8 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                    className="flex justify-center mb-8"
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-3xl backdrop-blur-md border shadow-2xl"
                      style={{ backgroundColor: `${accent}20`, borderColor: `${accent}40`, boxShadow: `0 20px 60px -20px ${accent}90` }}>
                      {slide.icon && <slide.icon className="h-10 w-10" style={{ color: accent }} />}
                    </div>
                  </motion.div>
                  {slide.eyebrow && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                      className="text-sm font-semibold uppercase tracking-[0.3em] mb-4"
                      style={{ color: accent }}
                    >
                      {slide.eyebrow}
                    </motion.p>
                  )}
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6 [text-shadow:_0_4px_30px_rgba(0,0,0,0.65)]">
                    {slide.titulo}
                  </h1>
                  {slide.subtitulo && (
                    <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto [text-shadow:_0_2px_10px_rgba(0,0,0,0.5)]">{slide.subtitulo}</p>
                  )}
                  {slide.texto && (
                    <p className="text-lg text-slate-400 max-w-xl mx-auto mt-4">{slide.texto}</p>
                  )}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="mt-12 flex items-center justify-center gap-2 text-sm text-slate-500"
                  >
                    <Play className="h-4 w-4" />
                    Usa las flechas o el scroll para navegar
                  </motion.div>
                </motion.div>
              )}

              {slide.type === "fact" && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center gap-3 mb-8">
                    {slide.icon && <slide.icon className="h-8 w-8 text-accent-400" />}
                    <span className="text-sm font-semibold uppercase tracking-widest text-accent-400">Realidad</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-10 max-w-3xl leading-tight [text-shadow:_0_4px_24px_rgba(0,0,0,0.6)]">{slide.titulo}</h2>
                  <div className="space-y-3 max-w-3xl rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/10 p-6 md:p-8 shadow-[0_8px_40px_rgba(0,0,0,0.35)]">
                    {slide.bullets?.map((b, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.12 }}
                        className="flex items-center gap-4 text-lg md:text-xl text-slate-200 py-1"
                      >
                        <div className={`h-2.5 w-2.5 rounded-full shrink-0 shadow-lg ${palette.bullet}`} />
                        <span>{b}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {slide.type === "center" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="text-center max-w-4xl mx-auto"
                >
                  {slide.eyebrow && (
                    <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.3em] mb-5" style={{ color: accent }}>
                      {slide.eyebrow}
                    </p>
                  )}
                  <h2 className={cn(
                    "font-bold text-white leading-[1.05] tracking-tight [text-shadow:_0_4px_30px_rgba(0,0,0,0.65)]",
                    isKeynote ? "text-5xl md:text-7xl lg:text-8xl font-black mb-10" : "text-3xl md:text-5xl lg:text-6xl mb-8"
                  )}>
                    {slide.titulo}
                  </h2>
                  {slide.texto && (
                    <p className={cn(
                      "mx-auto leading-relaxed [text-shadow:_0_2px_12px_rgba(0,0,0,0.5)]",
                      isKeynote ? "text-lg md:text-xl text-slate-400 max-w-xl font-light" : "text-xl md:text-2xl text-slate-300"
                    )}>
                      {slide.texto}
                    </p>
                  )}
                </motion.div>
              )}

              {slide.type === "highlight" && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6 }}
                  className="text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, damping: 14 }}
                    className="flex justify-center mb-6"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl backdrop-blur-md border shadow-xl"
                      style={{ backgroundColor: `${accent}20`, borderColor: `${accent}30`, boxShadow: `0 16px 40px -16px ${accent}70` }}>
                      {slide.icon && <slide.icon className="h-8 w-8" style={{ color: accent }} />}
                    </div>
                  </motion.div>
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 [text-shadow:_0_4px_24px_rgba(0,0,0,0.6)]">{slide.titulo}</h2>
                  {slide.desc && <p className="text-lg text-slate-400 mb-10">{slide.desc}</p>}
                  <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto items-stretch relative">
                    {slide.subitems?.map((item, i) => {
                      const SubIcon = item.icon
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: i * 0.15 }}
                          className="relative rounded-2xl bg-white/[0.05] backdrop-blur-xl border border-white/10 p-8 text-left hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
                        >
                          <SubIcon className="h-8 w-8 text-white mb-4" style={{ color: accent }} />
                          <span className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-1 block">{item.label}</span>
                          <h3 className="text-xl font-bold text-white mb-2">{item.tit}</h3>
                          <p className="text-sm text-slate-300 leading-relaxed">{item.desc}</p>
                        </motion.div>
                      )
                    })}
                    {slide.subitems?.length === 2 && (
                      <div
                        className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-11 w-11 rounded-full items-center justify-center text-lg font-bold text-white z-10 shadow-xl border border-white/20"
                        style={{ backgroundColor: accent }}
                      >
                        +
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {slide.type === "detail" && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center gap-4 mb-8">
                    {slide.icon && (
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl backdrop-blur-md border"
                        style={{ backgroundColor: `${accent}18`, borderColor: `${accent}35` }}>
                        <slide.icon className="h-6 w-6" style={{ color: accent }} />
                      </div>
                    )}
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight [text-shadow:_0_4px_24px_rgba(0,0,0,0.6)]">{slide.titulo}</h2>
                  </div>
                  <div className="space-y-3 max-w-3xl mt-8 rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/10 p-6 md:p-8 shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
                    {slide.bullets?.map((b, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: i * 0.1 }}
                        className="flex items-center gap-4 text-lg md:text-xl text-slate-200 py-1"
                      >
                        <svg className="h-5 w-5 shrink-0" style={{ color: accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                        <span>{b}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {slide.type === "visual-grid" && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-10 text-center [text-shadow:_0_4px_24px_rgba(0,0,0,0.6)]">{slide.titulo}</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                    {slide.items?.map((item, i) => {
                      const GridIcon = item.icon
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20, scale: 0.9 }}
                          whileInView={{ opacity: 1, y: 0, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: i * 0.1 }}
                          className="rounded-2xl bg-white/[0.05] backdrop-blur-xl border border-white/10 p-6 text-center hover:bg-white/[0.1] hover:border-white/20 transition-all duration-300 hover:-translate-y-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
                        >
                          <div className="flex justify-center mb-4">
                            <div className="h-16 w-16 rounded-2xl backdrop-blur-sm border flex items-center justify-center"
                              style={{ backgroundColor: `${accent}20`, borderColor: `${accent}30` }}>
                              <GridIcon className="h-8 w-8" style={{ color: accent }} />
                            </div>
                          </div>
                          <p className="text-2xl md:text-3xl font-bold text-white mb-1">{item.label}</p>
                          <p className="text-xs text-slate-400 leading-relaxed">{item.text}</p>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              )}

              {slide.type === "final" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className="text-center max-w-4xl mx-auto"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: 8 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 150, damping: 12, delay: 0.2 }}
                    className="flex justify-center mb-8"
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-3xl backdrop-blur-md border shadow-2xl"
                      style={{ backgroundColor: `${accent}20`, borderColor: `${accent}30`, boxShadow: `0 20px 60px -20px ${accent}90` }}>
                      {slide.icon && <slide.icon className="h-10 w-10" style={{ color: accent }} />}
                    </div>
                  </motion.div>
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 leading-[1.05] [text-shadow:_0_4px_30px_rgba(0,0,0,0.65)]">{slide.titulo}</h2>
                  {slide.subtitulo && (
                    <h3 className="text-3xl md:text-5xl font-bold mb-8 [text-shadow:_0_4px_24px_rgba(0,0,0,0.5)]" style={{ color: accent }}>{slide.subtitulo}</h3>
                  )}
                  {slide.desc && (
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed [text-shadow:_0_2px_12px_rgba(0,0,0,0.5)]">{slide.desc}</p>
                  )}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-12 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 px-5 py-2 text-sm text-slate-300"
                  >
                    escudodigitalfamiliar.org
                  </motion.div>
                </motion.div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
