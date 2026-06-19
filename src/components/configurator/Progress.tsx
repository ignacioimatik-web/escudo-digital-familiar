"use client"

import { motion } from "framer-motion"

interface ProgressProps {
  currentStep: number
  totalSteps: number
}

export function Progress({ currentStep, totalSteps }: ProgressProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-slate-600">
          Paso {currentStep} de {totalSteps}
        </span>
        <span className="text-sm text-slate-500">
          {Math.round(progress)}% completado
        </span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-brand-500 to-brand-600"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}
