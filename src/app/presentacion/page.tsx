"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import {
  Shield,
  Wifi,
  Smartphone,
  AlertTriangle,
  Users,
  XCircle,
  Baby,
  Smile,
  User,
  UserCheck,
  Settings,
  HelpCircle,
  ArrowDown,
  ArrowUp,
} from "lucide-react"
import { useState, useEffect } from "react"
import { Container } from "@/components/ui/container"
import { Badge } from "@/components/ui/badge"

const slides = [
  {
    id: 1,
    icon: AlertTriangle,
    titulo: "El problema",
    contenido: [
      "Pantallas desde los 9 años.",
      "Pornografía antes de los 14.",
      "Apuestas, violencia, redes, algoritmos.",
    ],
    img: "/images/presentacion/slide-1.jpg",
  },
  {
    id: 2,
    icon: AlertTriangle,
    titulo: "El contenido llega antes de que lo busquen",
    contenido: [
      "Algoritmos que amplifican contenido extremo.",
      "Notificaciones constantes.",
      "Diseño adictivo para captar atención.",
    ],
    img: "/images/presentacion/slide-2.jpg",
  },
  {
    id: 3,
    icon: XCircle,
    titulo: "No basta educar sin proteger",
    contenido: [
      "Un niño de 8 años no tiene criterio para filtrar.",
      "La exposición temprana deja huella.",
      "Proteger es el primer paso de educar.",
    ],
    img: "/images/presentacion/slide-3.jpg",
  },
  {
    id: 4,
    icon: XCircle,
    titulo: "No basta proteger sin educar",
    contenido: [
      "Los filtros se pueden eludir.",
      "El objetivo final es formar criterio.",
      "Sin diálogo, la protección es frágil.",
    ],
    img: "/images/presentacion/slide-4.jpg",
  },
  {
    id: 5,
    icon: Shield,
    titulo: "Modelo de 2 capas",
    contenido: [
      "Capa 1: DNS de protección (filtra a nivel de red).",
      "Capa 2: Control parental (apps, horarios, permisos).",
      "Complementarias, no excluyentes.",
    ],
    img: "/images/presentacion/slide-5.jpg",
  },
  {
    id: 6,
    icon: Wifi,
    titulo: "Capa 1: DNS de protección",
    contenido: [
      "Bloquea dominios maliciosos, pornografía, apuestas.",
      "Protege todos los dispositivos de la red.",
      "No controla apps ni tiempo de uso.",
    ],
    img: "/images/presentacion/slide-6.jpg",
  },
  {
    id: 7,
    icon: Smartphone,
    titulo: "Capa 2: Control parental",
    contenido: [
      "Límites de tiempo y horarios.",
      "Restricción de apps y compras.",
      "Filtros de contenido por edad.",
    ],
    img: "/images/presentacion/slide-7.jpg",
  },
  {
    id: 8,
    icon: Users,
    titulo: "Del control a la autonomía",
    contenido: [
      "0-6 años: Control total. El adulto decide.",
      "7-11 años: Filtros + diálogo inicial.",
      "12-14 años: Relajar filtros, fortalecer criterio.",
      "15-17 años: Criterio propio. El adulto es referencia.",
    ],
    img: "/images/presentacion/slide-8.jpg",
  },
  {
    id: 9,
    icon: Settings,
    titulo: "Configuración práctica",
    contenido: [
      "DNS en el router (protege toda la red).",
      "DNS privado en cada dispositivo.",
      "Family Link (Android) o Tiempo de Uso (iOS).",
      "15-30 minutos. Sin coste.",
    ],
    img: "/images/presentacion/slide-9.jpg",
  },
  {
    id: 10,
    icon: HelpCircle,
    titulo: "Errores frecuentes",
    contenido: [
      "El menor conoce la contraseña y desactiva todo.",
      "Configurar solo un dispositivo y olvidar los demás.",
      "Confiar solo en los filtros sin dialogar.",
      "No revisar ni ajustar la configuración periódicamente.",
    ],
    img: "/images/presentacion/slide-10.jpg",
  },
  {
    id: 11,
    icon: Shield,
    titulo: "Proteger para educar",
    contenido: [
      "Educar para liberar.",
      "No es construir muros.",
      "Es acompañar mientras crece el criterio.",
    ],
    img: "/images/presentacion/slide-11.jpg",
  },
]

export default function PresentacionPage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault()
        setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setCurrentSlide((prev) => Math.max(prev - 1, 0))
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    const element = document.getElementById(`slide-${index}`)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="relative">
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              currentSlide === index
                ? "bg-white w-3"
                : "bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="fixed bottom-6 right-6 z-50 hidden md:flex flex-col gap-2">
        <button
          onClick={() => goToSlide(Math.max(currentSlide - 1, 0))}
          disabled={currentSlide === 0}
          className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-sm flex items-center justify-center text-white hover:bg-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          aria-label="Slide anterior"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
        <button
          onClick={() => goToSlide(Math.min(currentSlide + 1, slides.length - 1))}
          disabled={currentSlide === slides.length - 1}
          className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-sm flex items-center justify-center text-white hover:bg-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          aria-label="Slide siguiente"
        >
          <ArrowDown className="h-4 w-4" />
        </button>
      </div>

      {slides.map((slide, index) => {
        const Icon = slide.icon

        return (
          <div
            key={slide.id}
            id={`slide-${index}`}
            className="min-h-screen flex items-center justify-center relative overflow-hidden"
          >
            {/* Background image */}
            <div className="absolute inset-0">
              <Image
                src={slide.img}
                alt=""
                fill
                className="object-cover"
                priority={index < 3}
                sizes="100vw"
              />
            </div>

            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

            {/* Slide number */}
            <div className="absolute top-4 left-4 z-10 text-xs text-white/50 font-mono">
              {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </div>

            <Container size="md" className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-20%" }}
                className="text-center"
              >
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm mb-8 border border-white/10">
                  <Icon className="h-10 w-10 text-white" />
                </div>

                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-8 leading-tight drop-shadow-lg">
                  {slide.titulo}
                </h2>

                <div className="space-y-4 max-w-2xl mx-auto">
                  {slide.contenido.map((linea, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="text-lg md:text-xl text-white/80 leading-relaxed drop-shadow"
                    >
                      {linea}
                    </motion.p>
                  ))}
                </div>

                {index === 7 && (
                  <div className="mt-12 grid grid-cols-4 gap-4 max-w-3xl mx-auto">
                    {[
                      { icon: Baby, label: "0-6" },
                      { icon: Smile, label: "7-11" },
                      { icon: User, label: "12-14" },
                      { icon: UserCheck, label: "15-17" },
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col items-center gap-2">
                        <div className="h-12 w-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/10">
                          <item.icon className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xs font-medium text-white/60">{item.label} años</span>
                      </div>
                    ))}
                  </div>
                )}

                {index === 4 && (
                  <div className="mt-12 flex items-center justify-center gap-8">
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-16 w-16 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/10">
                        <Wifi className="h-8 w-8 text-white" />
                      </div>
                      <Badge variant="default" className="bg-white/15 text-white border-white/20">
                        Capa 1
                      </Badge>
                    </div>
                    <div className="text-3xl text-white/40 drop-shadow">+</div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-16 w-16 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/10">
                        <Smartphone className="h-8 w-8 text-white" />
                      </div>
                      <Badge variant="default" className="bg-white/15 text-white border-white/20">
                        Capa 2
                      </Badge>
                    </div>
                  </div>
                )}
              </motion.div>
            </Container>
          </div>
        )
      })}
    </div>
  )
}
