"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Progress } from "@/components/configurator/Progress"
import { DeviceSelector } from "@/components/configurator/DeviceSelector"
import { NetworkSelector } from "@/components/configurator/NetworkSelector"
import { LevelSelector } from "@/components/configurator/LevelSelector"
import { RecommendationView } from "@/components/configurator/RecommendationView"
import { getRecommendedSteps } from "@/content/configurator"
import type { DeviceType, NetworkContext, ProtectionLevel } from "@/lib/types"

const TOTAL_STEPS = 4

const stepTitles = [
  "Selecciona tu dispositivo",
  "¿Cuál es tu contexto de red?",
  "Elige el nivel de protección",
  "Tu recomendación personalizada",
]

const stepDescriptions = [
  "Selecciona el dispositivo que quieres proteger",
  "¿Cómo se conecta principalmente a Internet?",
  "Según la edad y situación del menor",
  "Pasos específicos para tu situación",
]

export default function ConfiguradorPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [device, setDevice] = useState<DeviceType | null>(null)
  const [context, setContext] = useState<NetworkContext | null>(null)
  const [level, setLevel] = useState<ProtectionLevel | null>(null)

  const canGoNext = () => {
    switch (currentStep) {
      case 1:
        return device !== null
      case 2:
        return context !== null
      case 3:
        return level !== null
      default:
        return false
    }
  }

  const handleNext = () => {
    if (canGoNext() && currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleReset = () => {
    setCurrentStep(1)
    setDevice(null)
    setContext(null)
    setLevel(null)
  }

  const recommendation =
    device && context && level ? getRecommendedSteps(device, context, level) : null

  return (
    <>
      <Section className="relative overflow-hidden pb-10 md:pb-14">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/40 via-background to-background" />
        <Container size="md">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-3">
            Configurador
          </h1>
          <p className="text-base text-slate-500 leading-relaxed max-w-2xl">
            Selecciona tu situación y obtén pasos personalizados para proteger el dispositivo.
          </p>
        </Container>
      </Section>

      <Section className="-mt-[400px] pt-0">
        <Container size="md">
          <div className="mb-6 mt-[200px]">
            <Progress currentStep={currentStep} totalSteps={TOTAL_STEPS} />
          </div>

          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900 mb-1">
              {stepTitles[currentStep - 1]}
            </h2>
            <p className="text-sm text-slate-500">{stepDescriptions[currentStep - 1]}</p>
          </div>

          <div className="mt-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.25 }}
              >
                {currentStep === 1 && (
                  <DeviceSelector selected={device} onSelect={setDevice} />
                )}

                {currentStep === 2 && (
                  <NetworkSelector selected={context} onSelect={setContext} />
                )}

                {currentStep === 3 && (
                  <LevelSelector selected={level} onSelect={setLevel} />
                )}

                {currentStep === 4 && recommendation && device && context && level && (
                  <RecommendationView
                    device={device}
                    context={context}
                    level={level}
                    recommendation={recommendation}
                    onReset={handleReset}
                  />
                )}

                {currentStep === 4 && !recommendation && (
                  <div className="text-center py-10 rounded-2xl border border-slate-200 bg-white">
                    <p className="text-slate-500 mb-2 text-sm">
                      No tenemos una recomendación específica para esta combinación.
                    </p>
                    <p className="text-slate-600 text-sm">
                      Consulta las guías individuales para configurar tu dispositivo.
                    </p>
                    <button
                      onClick={handleReset}
                      className="mt-5 px-5 py-2.5 rounded-xl bg-brand-500 text-white text-sm font-semibold hover:bg-brand-600 transition-colors inline-flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Empezar de nuevo
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {currentStep < TOTAL_STEPS && (
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-200">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 font-semibold hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Anterior
                </button>
                <button
                  onClick={handleNext}
                  disabled={!canGoNext()}
                  className="px-5 py-2.5 rounded-xl bg-brand-500 text-white text-sm font-semibold hover:bg-brand-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Siguiente
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </Container>
      </Section>
    </>
  )
}
