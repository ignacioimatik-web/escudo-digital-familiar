"use client"

import { motion } from "framer-motion"
import { Wifi, Smartphone, WifiOff, Users, User } from "lucide-react"
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {networkContexts.map((context) => {
        const Icon = iconMap[context.id as keyof typeof iconMap]
        const isSelected = selected === context.id

        return (
          <motion.button
            key={context.id}
            onClick={() => onSelect(context.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative p-6 rounded-2xl border-2 transition-all text-left ${
              isSelected
                ? "border-brand-500 bg-brand-50 shadow-lg shadow-brand-500/10"
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
              isSelected ? "bg-brand-500" : "bg-slate-100"
            }`}>
              <Icon className={`w-6 h-6 ${isSelected ? "text-white" : "text-slate-600"}`} />
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${isSelected ? "text-brand-900" : "text-slate-900"}`}>
              {context.label}
            </h3>
            <p className={`text-sm ${isSelected ? "text-brand-700" : "text-slate-600"}`}>
              {context.descripcion}
            </p>
          </motion.button>
        )
      })}
    </div>
  )
}
