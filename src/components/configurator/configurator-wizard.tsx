"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, RotateCcw, CheckCircle2, Smartphone, Monitor, Router, Globe, Tv, Tablet, Gamepad2, BookOpen, Wifi, Signal, Users, Network } from "lucide-react"
import { Container } from "@/components/ui/container"
import { deviceTypes, networkContexts } from "@/lib/config-assistant/types"
import type { DeviceType, NetworkContext, ProtectionLevel, ConfigStep } from "@/lib/config-assistant/types"
import { findConfig } from "@/lib/config-assistant/knowledge-base"
import { DeviceConfig } from "@/lib/config-assistant/types"

const TOTAL_STEPS = 4

const deviceIconMap: Record<string, React.ElementType> = {
  Smartphone, Monitor, Router, Globe, Tv, Tablet, Gamepad2, BookOpen,
}

const networkIconMap: Record<string, React.ElementType> = {
  Wifi, Signal, Users, Smartphone, Network,
}

export function ConfiguratorWizard() {
  const [step, setStep] = useState(1)
  const [device, setDevice] = useState<DeviceType | null>(null)
  const [network, setNetwork] = useState<NetworkContext | null>(null)
  const [level, setLevel] = useState<ProtectionLevel | null>(null)
  const [currentConfig, setCurrentConfig] = useState<DeviceConfig | null>(null)
  const [currentStepIdx, setCurrentStepIdx] = useState(0)

  const config = device && network && level ? findConfig(device, network, level) : null

  const canGoNext = () => {
    switch (step) {
      case 1: return device !== null
      case 2: return network !== null
      case 3: return level !== null
      case 4: return true
      default: return false
    }
  }

  const handleNext = () => {
    if (step === 3 && config) {
      setCurrentConfig(config)
      setCurrentStepIdx(0)
    }
    if (canGoNext() && step < TOTAL_STEPS) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleReset = () => {
    setStep(1)
    setDevice(null)
    setNetwork(null)
    setLevel(null)
    setCurrentConfig(null)
    setCurrentStepIdx(0)
  }

  const progress = ((step - 1) / (TOTAL_STEPS - 1)) * 100

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-slate-500">
            Paso {step} de {TOTAL_STEPS}
          </span>
          <span className="text-xs font-medium text-brand-600">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-slate-100">
          <div
            className="h-1.5 rounded-full bg-brand-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2 }}
        >
          {/* Step 1: Device */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">¿Qué dispositivo quieres proteger?</h2>
              <p className="text-sm text-slate-500 mb-6">Selecciona el tipo de dispositivo</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {deviceTypes.map((d) => {
                  const Icon = deviceIconMap[d.icon as keyof typeof deviceIconMap] || Smartphone
                  const isSelected = device === d.id
                  return (
                    <button
                      key={d.id}
                      onClick={() => setDevice(d.id)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all text-center ${
                        isSelected
                          ? "border-brand-500 bg-brand-50 shadow-sm"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${isSelected ? "text-brand-600" : "text-slate-400"}`} />
                      <span className={`text-xs font-semibold ${isSelected ? "text-brand-700" : "text-slate-700"}`}>
                        {d.label}
                      </span>
                      <span className="text-[10px] text-slate-400 line-clamp-2">{d.descripcion}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Step 2: Network */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">¿En qué contexto se conecta?</h2>
              <p className="text-sm text-slate-500 mb-6">¿Cómo usa Internet el menor?</p>
              <div className="space-y-2">
                {networkContexts.map((c) => {
                  const Icon = networkIconMap[c.icon as keyof typeof networkIconMap] || Smartphone
                  const isSelected = network === c.id
                  return (
                    <button
                      key={c.id}
                      onClick={() => setNetwork(c.id)}
                      className={`w-full flex items-start gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                        isSelected
                          ? "border-brand-500 bg-brand-50 shadow-sm"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <Icon className={`w-5 h-5 mt-0.5 ${isSelected ? "text-brand-600" : "text-slate-400"}`} />
                      <div className="flex-1">
                        <p className={`text-sm font-semibold ${isSelected ? "text-brand-700" : "text-slate-700"}`}>
                          {c.label}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">{c.descripcion}</p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Step 3: Level */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">¿Qué nivel de protección necesitas?</h2>
              <p className="text-sm text-slate-500 mb-6">Según la edad y situación del menor</p>
              <div className="space-y-3">
                {[
                  { id: "basico" as ProtectionLevel, label: "🛡️ Básico", desc: "Protección mínima. Ideal como primer paso o para adolescentes maduros.", recom: "+15 años" },
                  { id: "recomendado" as ProtectionLevel, label: "🛡️🛡️ Recomendado", desc: "Equilibrio entre protección y autonomía. Para la mayoría de familias.", recom: "7-14 años" },
                  { id: "avanzado" as ProtectionLevel, label: "🛡️🛡️🛡️ Avanzado", desc: "Protección máxima. Recomendado para menores de 12 años o riesgo alto.", recom: "0-12 años" },
                ].map((opt) => {
                  const isSelected = level === opt.id
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setLevel(opt.id)}
                      className={`w-full flex items-start gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                        isSelected
                          ? "border-brand-500 bg-brand-50 shadow-sm"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <div className="flex-1">
                        <p className={`text-sm font-semibold ${isSelected ? "text-brand-700" : "text-slate-700"}`}>
                          {opt.label}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">{opt.desc}</p>
                      </div>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        isSelected ? "bg-brand-100 text-brand-700" : "bg-slate-100 text-slate-500"
                      }`}>
                        {opt.recom}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Step 4: Results */}
          {step === 4 && config && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900 mb-1">Tu guía personalizada</h2>
                <p className="text-sm text-slate-500">{config.titulo}</p>
              </div>

              {/* Info badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-2.5 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-medium">
                  ⏱️ {config.tiempoEstimado}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-cyan-100 text-cyan-700 text-xs font-medium">
                  📋 {config.pasos.length} pasos
                </span>
                <span className="px-2.5 py-1 rounded-full bg-success-100 text-success-700 text-xs font-medium">
                  {config.dnsRecomendado.map(ip => `DNS: ${ip}`).join(" | ")}
                </span>
              </div>

              {/* Steps */}
              <div className="space-y-3 mb-8">
                {config.pasos.map((paso) => (
                  <div key={paso.id} className="rounded-xl border border-slate-200 bg-white p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-100 text-brand-700 text-xs font-bold shrink-0">
                        {paso.numero}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-slate-900 mb-1">{paso.titulo}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{paso.descripcion}</p>
                        {paso.notas && paso.notas.length > 0 && (
                          <div className="mt-2 space-y-0.5">
                            {paso.notas.map((nota, i) => (
                              <p key={i} className="text-xs text-slate-500 flex items-start gap-1.5">
                                <span className="text-brand-400 mt-0.5">•</span>
                                {nota}
                              </p>
                            ))}
                          </div>
                        )}
                        {paso.advertencia && (
                          <div className="mt-2 p-2 rounded-lg bg-accent-50 border border-accent-100">
                            <p className="text-xs text-accent-700 flex items-start gap-1.5">
                              <span>⚠️</span>
                              {paso.advertencia}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Verification */}
              <div className="rounded-xl border border-success-200 bg-success-50 p-4 mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success-600 mt-0.5 shrink-0" />
                  <div>
                    <h3 className="text-sm font-semibold text-success-700 mb-1">Verificación final</h3>
                    <p className="text-sm text-success-600">{config.verificacion}</p>
                  </div>
                </div>
              </div>

              {/* Common issues */}
              {config.erroresFrecuentes.length > 0 && (
                <div className="rounded-xl border border-slate-200 bg-white p-4 mb-6">
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">Problemas frecuentes</h3>
                  <div className="space-y-2">
                    {config.erroresFrecuentes.map((err, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-slate-50">
                        <p className="text-xs font-semibold text-accent-600 mb-0.5">⚠️ {err.problema}</p>
                        <p className="text-xs text-slate-600">→ {err.solucion}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* No config found */}
          {step === 4 && !config && (
            <div className="text-center py-10 rounded-2xl border border-slate-200 bg-white">
              <p className="text-slate-500 mb-2">No tenemos una guía para esta combinación.</p>
              <button
                onClick={() => { setDevice("router"); setNetwork("wifi-casa"); setLevel("recomendado") }}
                className="mt-3 text-sm text-brand-600 hover:text-brand-700 font-medium"
              >
                Prueba con la guía del router (protege toda la red)
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      {step < TOTAL_STEPS && (
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-200">
          <button
            onClick={handleBack}
            disabled={step === 1}
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
            {step === 3 ? "Ver guía" : "Siguiente"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {step === TOTAL_STEPS && (
        <div className="flex justify-center mt-8 pt-6 border-t border-slate-200">
          <button
            onClick={handleReset}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Configurar otro dispositivo
          </button>
        </div>
      )}
    </div>
  )
}
