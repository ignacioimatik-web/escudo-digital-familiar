"use client"

import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { ArrowDown, ArrowUp, Play } from "lucide-react"

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

export function PresentationSlide({ slides, theme }: PresentationSlideProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])

  const accent = theme.accentColor

  // IntersectionObserver
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

  // Keyboard
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
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentSlide, slides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    document.getElementById(`s-${index}`)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="relative bg-black">
      {/* Side nav */}
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

      {/* Bottom nav */}
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
          className="h-9 w-9 rounded-full flex items-center justify-center text-white disabled:opacity-30 transition-all"
          style={{ backgroundColor: accent }}
        >
          <ArrowDown className="h-4 w-4 -rotate-90" />
        </button>
      </div>

      {/* Slides */}
      {slides.map((slide, index) => {
        const gradientFrom = slide.color === "brand" ? "from-brand-950" : slide.color === "success" ? "from-emerald-950" : slide.color === "accent" ? "from-accent-950" : "from-cyan-950"
        const glowColor = slide.color === "brand" ? "bg-brand-500/10" : slide.color === "success" ? "bg-emerald-500/10" : slide.color === "accent" ? "bg-accent-500/10" : "bg-cyan-500/10"
        const accentColor = slide.color === "brand" ? "text-brand-400" : slide.color === "success" ? "text-emerald-400" : slide.color === "accent" ? "text-accent-400" : "text-cyan-400"
        const bulletColor = slide.color === "brand" ? "bg-brand-400" : slide.color === "success" ? "bg-emerald-400" : slide.color === "accent" ? "bg-accent-400" : "bg-cyan-400"
        const chevronColor = slide.color === "brand" ? "text-brand-400" : slide.color === "success" ? "text-emerald-400" : slide.color === "accent" ? "text-accent-400" : "text-cyan-400"

        return (
          <div
            key={slide.id}
            id={`s-${index}`}
            ref={(el) => { slideRefs.current[index] = el }}
            className={`min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 ${gradientFrom} to-slate-900`}
          >
            {/* Pattern */}
            <div className="absolute inset-0 opacity-[0.03]" 
              style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.8) 1px, transparent 1px)`,
                backgroundSize: '50px 50px'
              }} 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full ${glowColor} blur-3xl`} />

            <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12">
              {/* TITLE */}
              {slide.type === "title" && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className="text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                    className="flex justify-center mb-8"
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-3xl backdrop-blur-sm border" 
                      style={{ backgroundColor: `${accent}20`, borderColor: `${accent}40` }}>
                      {slide.icon && <slide.icon className="h-10 w-10" style={{ color: accent }} />}
                    </div>
                  </motion.div>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg">
                    {slide.titulo}
                  </h1>
                  {slide.subtitulo && (
                    <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto">{slide.subtitulo}</p>
                  )}
                  {slide.texto && (
                    <p className="text-lg text-slate-400 max-w-xl mx-auto mt-4">{slide.texto}</p>
                  )}
                  <div className="mt-12 flex items-center justify-center gap-2 text-sm text-slate-500">
                    <Play className="h-4 w-4" />
                    Usa las flechas o el scroll para navegar
                  </div>
                </motion.div>
              )}

              {/* FACT */}
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
                        <div className={`h-2.5 w-2.5 rounded-full shrink-0 shadow-lg ${bulletColor} bg-accent-400`} />
                        <span>{b}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* CENTER */}
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
                  {slide.texto && (
                    <p className="text-xl md:text-2xl text-slate-300 leading-relaxed drop-shadow">
                      {slide.texto}
                    </p>
                  )}
                </motion.div>
              )}

              {/* HIGHLIGHT */}
              {slide.type === "highlight" && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl backdrop-blur-sm border" 
                      style={{ backgroundColor: `${accent}20`, borderColor: `${accent}30` }}>
                      {slide.icon && <slide.icon className="h-8 w-8" style={{ color: accent }} />}
                    </div>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">{slide.titulo}</h2>
                  {slide.desc && <p className="text-lg text-slate-400 mb-10">{slide.desc}</p>}
                  <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                    {slide.subitems?.map((item, i) => {
                      const SubIcon = item.icon
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: i * 0.15 }}
                          className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 text-left hover:bg-white/10 transition-colors"
                        >
                          <SubIcon className="h-8 w-8 text-white mb-4" />
                          <span className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-1 block">{item.label}</span>
                          <h3 className="text-xl font-bold text-white mb-2">{item.tit}</h3>
                          <p className="text-sm text-slate-300">{item.desc}</p>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              )}

              {/* DETAIL */}
              {slide.type === "detail" && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center gap-4 mb-8">
                    {slide.icon && <slide.icon className={`h-8 w-8 ${accentColor}`} />}
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
                        <svg className={`h-5 w-5 shrink-0 ${chevronColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                        <span>{b}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* VISUAL GRID */}
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
                      const GridIcon = item.icon
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
                            <div className="h-16 w-16 rounded-2xl backdrop-blur-sm border flex items-center justify-center" 
                              style={{ backgroundColor: `${accent}20`, borderColor: `${accent}30` }}>
                              <GridIcon className="h-8 w-8" style={{ color: accent }} />
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

              {/* FINAL */}
              {slide.type === "final" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className="text-center max-w-4xl mx-auto"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 150, damping: 12, delay: 0.2 }}
                    className="flex justify-center mb-8"
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-3xl backdrop-blur-sm border"
                      style={{ backgroundColor: `${accent}20`, borderColor: `${accent}30` }}>
                      {slide.icon && <slide.icon className="h-10 w-10" style={{ color: accent }} />}
                    </div>
                  </motion.div>
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 drop-shadow-lg">{slide.titulo}</h2>
                  {slide.subtitulo && (
                    <h3 className="text-3xl md:text-5xl font-bold mb-8 drop-shadow" style={{ color: accent }}>{slide.subtitulo}</h3>
                  )}
                  {slide.desc && (
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed drop-shadow">{slide.desc}</p>
                  )}
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
