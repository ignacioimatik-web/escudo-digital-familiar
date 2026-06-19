"use client"

import { motion } from "framer-motion"
import { Shield, ShieldCheck, ShieldAlert } from "lucide-react"
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
  basico: { bg: "bg-success-100", text: "text-success-700", border: "border-success-500", selectedBg: "bg-success-50" },
  recomendado: { bg: "bg-brand-100", text: "text-brand-700", border: "border-brand-500", selectedBg: "bg-brand-50" },
  avanzado: { bg: "bg-accent-100", text: "text-accent-700", border: "border-accent-500", selectedBg: "bg-accent-50" },
}

export function LevelSelector({ selected, onSelect }: LevelSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {protectionLevels.map((level) => {
        const Icon = iconMap[level.id as keyof typeof iconMap]
        const colors = colorMap[level.id as keyof typeof colorMap]
        const isSelected = selected === level.id

        return (
          <motion.button
            key={level.id}
            onClick={() => onSelect(level.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative p-6 rounded-2xl border-2 transition-all text-left ${
              isSelected
                ? `${colors.border} ${colors.selectedBg} shadow-lg`
                : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
            }`}
          >
            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-4 right-4 w-6 h-6 bg-brand-500 rounded-full flex items-center justify-center"
              >
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
            )}
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
              isSelected ? colors.bg : "bg-slate-100"
            }`}>
              <Icon className={`w-6 h-6 ${isSelected ? colors.text : "text-slate-600"}`} />
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${isSelected ? colors.text : "text-slate-900"}`}>
              {level.label}
            </h3>
            <p className={`text-sm ${isSelected ? "text-slate-700" : "text-slate-600"}`}>
              {level.descripcion}
            </p>
          </motion.button>
        )
      })}
    </div>
  )
}
