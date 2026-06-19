"use client"

import { motion } from "framer-motion"
import { Smartphone, Monitor, Router, Globe, Check } from "lucide-react"
import { deviceTypes } from "@/content/configurator"
import type { DeviceType } from "@/lib/types"

interface DeviceSelectorProps {
  selected: DeviceType | null
  onSelect: (device: DeviceType) => void
}

const iconMap = {
  Smartphone,
  Monitor,
  Router,
  Globe,
}

export function DeviceSelector({ selected, onSelect }: DeviceSelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {deviceTypes.map((device) => {
        const Icon = iconMap[device.icon as keyof typeof iconMap]
        const isSelected = selected === device.id

        return (
          <motion.button
            key={device.id}
            onClick={() => onSelect(device.id)}
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
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${
              isSelected ? "bg-brand-500" : "bg-slate-100"
            }`}>
              <Icon className={`w-4 h-4 ${isSelected ? "text-white" : "text-slate-600"}`} />
            </div>
            <h3 className={`text-sm font-semibold mb-1 ${isSelected ? "text-brand-900" : "text-slate-900"}`}>
              {device.label}
            </h3>
            <p className={`text-xs leading-relaxed ${isSelected ? "text-brand-700" : "text-slate-500"}`}>
              {device.descripcion}
            </p>
          </motion.button>
        )
      })}
    </div>
  )
}
