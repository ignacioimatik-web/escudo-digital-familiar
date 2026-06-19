"use client"

import { motion } from "framer-motion"
import { Shield, ShieldCheck, ShieldAlert, Check } from "lucide-react"
import { protectionLevels } from "@/content/configurator"
import type { ProtectionLevel } from "@/lib/types"

interface LevelSelectorProps {
  selected: ProtectionLevel | null
  onSelect: (level: ProtectionLevel) => void
}

const iconMap = {
  basico: Shield,
  recomendado: ShieldCheck,
  avanzado: ShieldAlert,
}

const colorMap = {
  basico: { bg: "bg-success-100", text: "text-success-700", border: "border-success-500", selectedBg: "bg-success-50/60" },
  recomendado: { bg: "bg-brand-100", text: "text-brand-700", border: "border-brand-500", selectedBg: "bg-brand-50/60" },
  avanzado: { bg: "bg-accent-100", text: "text-accent-700", border: "border-accent-500", selectedBg: "bg-accent-50/60" },
}

export function LevelSelector({ selected, onSelect }: LevelSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {protectionLevels.map((level) => {
        const Icon = iconMap[level.id as keyof typeof iconMap]
        const colors = colorMap[level.id as keyof typeof colorMap]
        const isSelected = selected === level.id

        return (
          <motion.button
            key={level.id}
            onClick={() => onSelect(level.id)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className={`relative p-4 rounded-xl border text-left transition-all ${
              isSelected
                ? `${colors.border} ${colors.selectedBg} shadow-sm`
                : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
            }`}
          >
            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2 w-5 h-5 bg-brand-500 rounded-full flex items-center justify-center"
              >
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              </motion.div>
            )}
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${
              isSelected ? colors.bg : "bg-slate-100"
            }`}>
              <Icon className={`w-4 h-4 ${isSelected ? colors.text : "text-slate-600"}`} />
            </div>
            <h3 className={`text-sm font-semibold mb-1 ${isSelected ? colors.text : "text-slate-900"}`}>
              {level.label}
            </h3>
            <p className={`text-xs leading-relaxed mb-2 ${isSelected ? "text-slate-700" : "text-slate-600"}`}>
              {level.descripcion}
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              {level.detalle}
            </p>
          </motion.button>
        )
      })}
    </div>
  )
}
