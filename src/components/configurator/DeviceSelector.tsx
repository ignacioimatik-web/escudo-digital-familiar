"use client"

import { motion } from "framer-motion"
import { Smartphone, Monitor, Router, Globe } from "lucide-react"
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {deviceTypes.map((device) => {
        const Icon = iconMap[device.icon as keyof typeof iconMap]
        const isSelected = selected === device.id

        return (
          <motion.button
            key={device.id}
            onClick={() => onSelect(device.id)}
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
            <h3 className={`text-lg font-semibold mb-1 ${isSelected ? "text-brand-900" : "text-slate-900"}`}>
              {device.label}
            </h3>
          </motion.button>
        )
      })}
    </div>
  )
}
