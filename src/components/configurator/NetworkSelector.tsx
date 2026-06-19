"use client"

import { motion } from "framer-motion"
import { Wifi, Smartphone, WifiOff, Users, User, Check } from "lucide-react"
import { networkContexts } from "@/content/configurator"
import type { NetworkContext } from "@/lib/types"

interface NetworkSelectorProps {
  selected: NetworkContext | null
  onSelect: (context: NetworkContext) => void
}

const iconMap = {
  "wifi-casa": Wifi,
  "datos-moviles": Smartphone,
  "wifi-datos": WifiOff,
  "dispositivo-compartido": Users,
  "dispositivo-personal": User,
}

export function NetworkSelector({ selected, onSelect }: NetworkSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {networkContexts.map((context) => {
        const Icon = iconMap[context.id as keyof typeof iconMap]
        const isSelected = selected === context.id

        return (
          <motion.button
            key={context.id}
            onClick={() => onSelect(context.id)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className={`relative p-4 rounded-xl border text-left transition-all ${
              isSelected
                ? "border-brand-500 bg-brand-50/60 shadow-sm"
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
            <div className="flex items-start gap-3">
              <div className={`w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center ${
                isSelected ? "bg-brand-500" : "bg-slate-100"
              }`}>
                <Icon className={`w-4 h-4 ${isSelected ? "text-white" : "text-slate-600"}`} />
              </div>
              <div className="min-w-0">
                <h3 className={`text-sm font-semibold mb-0.5 ${isSelected ? "text-brand-900" : "text-slate-900"}`}>
                  {context.label}
                </h3>
                <p className={`text-xs leading-relaxed mb-1 ${isSelected ? "text-brand-700" : "text-slate-600"}`}>
                  {context.descripcion}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {context.detalle}
                </p>
              </div>
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}
