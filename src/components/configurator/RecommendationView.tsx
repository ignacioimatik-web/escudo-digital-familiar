"use client"

import { motion } from "framer-motion"
import { CheckCircle2, AlertTriangle, ExternalLink } from "lucide-react"
import { StepChecklist } from "./StepChecklist"
import type { ConfiguratorStep } from "@/lib/types"
import { deviceTypes, networkContexts, protectionLevels } from "@/content/configurator"
import type { DeviceType, NetworkContext, ProtectionLevel } from "@/lib/types"

interface RecommendationViewProps {
  device: DeviceType
  context: NetworkContext
  level: ProtectionLevel
  recommendation: ConfiguratorStep
  onReset: () => void
}

export function RecommendationView({
  device,
  context,
  level,
  recommendation,
  onReset,
}: RecommendationViewProps) {
  const deviceLabel = deviceTypes.find((d) => d.id === device)?.label || device
  const contextLabel = networkContexts.find((c) => c.id === context)?.label || context
  const levelLabel = protectionLevels.find((l) => l.id === level)?.label || level

  const guidePath = `/guias/${device === "iphone" ? "ios" : device === "navegador" ? "navegadores" : device}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="bg-gradient-to-br from-brand-50 to-brand-100/50 rounded-2xl p-6 border border-brand-200">
        <h3 className="text-xl font-semibold text-brand-900 mb-4">Tu configuración personalizada</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/80 rounded-xl p-4">
            <p className="text-xs text-slate-500 mb-1">Dispositivo</p>
            <p className="font-semibold text-slate-900">{deviceLabel}</p>
          </div>
          <div className="bg-white/80 rounded-xl p-4">
            <p className="text-xs text-slate-500 mb-1">Contexto</p>
            <p className="font-semibold text-slate-900">{contextLabel}</p>
          </div>
          <div className="bg-white/80 rounded-xl p-4">
            <p className="text-xs text-slate-500 mb-1">Nivel</p>
            <p className="font-semibold text-slate-900">{levelLabel}</p>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-success-500" />
          Pasos recomendados
        </h4>
        <div className="space-y-3">
          {recommendation.pasosRecomendados.map((paso, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-200"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center font-semibold text-sm">
                {index + 1}
              </div>
              <p className="text-slate-700 pt-1">{paso}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-slate-900 mb-4">Lista de verificación</h4>
        <StepChecklist steps={recommendation.checklist} />
      </div>

      <div className="bg-accent-50 border border-accent-200 rounded-2xl p-6">
        <h4 className="text-lg font-semibold text-accent-900 mb-3 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-accent-600" />
          Validación final
        </h4>
        <p className="text-accent-800">{recommendation.validacion}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button
          onClick={onReset}
          className="flex-1 px-6 py-3 rounded-xl border-2 border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
        >
          Empezar de nuevo
        </button>
        <a
          href={guidePath}
          className="flex-1 px-6 py-3 rounded-xl bg-brand-500 text-white font-semibold hover:bg-brand-600 transition-colors flex items-center justify-center gap-2"
        >
          Ver guía completa
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  )
}
