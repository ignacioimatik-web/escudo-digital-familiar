"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle2, Circle } from "lucide-react"

interface StepChecklistProps {
  steps: string[]
}

export function StepChecklist({ steps }: StepChecklistProps) {
  const [completed, setCompleted] = useState<Set<number>>(new Set())

  const toggleStep = (index: number) => {
    const newCompleted = new Set(completed)
    if (newCompleted.has(index)) {
      newCompleted.delete(index)
    } else {
      newCompleted.add(index)
    }
    setCompleted(newCompleted)
  }

  const progress = (completed.size / steps.length) * 100

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-slate-700">
          Progreso: {completed.size} de {steps.length}
        </span>
        <span className="text-sm text-slate-500">{Math.round(progress)}%</span>
      </div>
      {steps.map((step, index) => {
        const isCompleted = completed.has(index)
        return (
          <motion.button
            key={index}
            onClick={() => toggleStep(index)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`w-full flex items-start gap-3 p-4 rounded-xl border-2 transition-all text-left ${
              isCompleted
                ? "border-success-300 bg-success-50"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            {isCompleted ? (
              <CheckCircle2 className="w-5 h-5 text-success-500 flex-shrink-0 mt-0.5" />
            ) : (
              <Circle className="w-5 h-5 text-slate-300 flex-shrink-0 mt-0.5" />
            )}
            <span className={`text-sm ${isCompleted ? "text-success-900 line-through" : "text-slate-700"}`}>
              {step}
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}
