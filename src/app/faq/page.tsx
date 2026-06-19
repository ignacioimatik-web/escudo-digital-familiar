"use client"

import { useState } from "react"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import { PremiumCard } from "@/components/ui/premium-card"
import { ChevronDown } from "lucide-react"
import { faqItems } from "@/content/faq"

interface FaqAccordionProps {
  pregunta: string
  respuesta: string
}

function FaqAccordion({ pregunta, respuesta }: FaqAccordionProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
      >
        <span className="font-semibold text-slate-900">{pregunta}</span>
        <ChevronDown
          className={`w-5 h-5 text-slate-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-4 pt-2 border-t border-slate-100">
          <p className="text-slate-600 leading-relaxed">{respuesta}</p>
        </div>
      )}
    </div>
  )
}

export default function FaqPage() {
  return (
    <>
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/40 via-background to-background" />
        <Container size="md">
          <Badge variant="muted" className="mb-6">
            Preguntas frecuentes
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            Resolvemos tus dudas
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-2xl">
            Respuestas a las preguntas más comunes sobre protección digital familiar, DNS, control parental y el método Escudo Digital Familiar.
          </p>
        </Container>
      </Section>

      <Section>
        <Container size="md">
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <FaqAccordion
                key={index}
                pregunta={item.pregunta}
                respuesta={item.respuesta}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-50/50">
        <Container size="md">
          <PremiumCard className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              ¿No encuentras lo que buscas?
            </h2>
            <p className="text-slate-600 mb-6">
              Si tienes alguna pregunta específica sobre tu situación, consulta nuestras guías o usa el configurador para obtener recomendaciones personalizadas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/guias"
                className="px-6 py-3 bg-brand-500 text-white rounded-xl font-semibold hover:bg-brand-600 transition-colors"
              >
                Ver guías
              </a>
              <a
                href="/configurador"
                className="px-6 py-3 border-2 border-brand-500 text-brand-500 rounded-xl font-semibold hover:bg-brand-50 transition-colors"
              >
                Ir al configurador
              </a>
            </div>
          </PremiumCard>
        </Container>
      </Section>
    </>
  )
}
