"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Shield, Smartphone, Monitor, Router, Globe, Tv, Tablet, Gamepad2, BookOpen,
  Wifi, Send, Sparkles, CheckCircle2, ArrowRight, RotateCcw, ChevronRight,
  MessageCircle, Zap, RefreshCw
} from "lucide-react"
import type { DeviceType, NetworkContext, ProtectionLevel, ConfigStep } from "@/lib/config-assistant/types"
import { deviceTypes, networkContexts } from "@/lib/config-assistant/types"
import { processInput, createInitialState, resetConversation } from "@/lib/config-assistant/engine"
import type { ConversationState, AssistantResponse } from "@/lib/config-assistant/engine"

const iconMap: Record<string, React.ElementType> = {
  Smartphone, Monitor, Router, Globe, Tv, Tablet, Gamepad2, BookOpen, Wifi, Send, Shield, MessageCircle,
}

const deviceIconMap: Record<string, React.ElementType> = {
  android: Smartphone, iphone: Smartphone, windows: Monitor, macos: Monitor,
  router: Router, navegador: Globe, "smart-tv": Tv, tablet: Tablet,
  chromebook: Monitor, consola: Gamepad2, kindle: BookOpen,
}

interface OptionCardProps {
  value: string
  label: string
  icon?: string
  desc?: string
  onClick: (value: string) => void
  color?: string
}

function OptionCard({ value, label, icon, desc, onClick, color }: OptionCardProps) {
  const IconComponent = icon ? iconMap[icon] : undefined
  const cardColor = color || "brand"
  const colorClasses: Record<string, string> = {
    brand: "hover:border-brand-300 hover:bg-brand-50",
    success: "hover:border-emerald-300 hover:bg-emerald-50",
    accent: "hover:border-amber-300 hover:bg-amber-50",
    cyan: "hover:border-cyan-300 hover:bg-cyan-50",
  }
  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(value)}
      className={`flex items-start gap-3 px-4 py-3.5 rounded-xl border-2 border-slate-200 bg-white text-left transition-all shadow-sm ${colorClasses[color || "brand"]}`}
    >
      {IconComponent && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50">
          <IconComponent className="w-5 h-5 text-brand-600" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <span className="text-sm font-semibold text-slate-900 block truncate">{label}</span>
        {desc && <span className="text-xs text-slate-500 mt-0.5 block leading-tight">{desc}</span>}
      </div>
      <ChevronRight className="w-4 h-4 text-slate-300 mt-2 shrink-0" />
    </motion.button>
  )
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = total > 0 ? (current / total) * 100 : 0
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-cyan-500"
        />
      </div>
      <span className="text-[10px] font-semibold text-slate-400 tabular-nums shrink-0">
        {current}/{total}
      </span>
    </div>
  )
}

function StepCard({ step, numero, total }: { step: ConfigStep; numero: number; total: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="rounded-xl border border-brand-200 bg-brand-50/50 p-5"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-white text-[10px] font-bold">
          {numero}
        </div>
        <span className="text-xs font-semibold text-brand-700 uppercase tracking-wider">Paso {numero}/{total}</span>
      </div>
      <h4 className="text-sm font-bold text-slate-900 mb-2">{step.titulo}</h4>
      <div className="text-sm text-slate-600 leading-relaxed mb-3 whitespace-pre-line">{step.descripcion}</div>
      {step.notas && step.notas.length > 0 && (
        <div className="mt-2 p-3 rounded-lg bg-white/80 border border-brand-100">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-600 mb-1.5">📌 Notas</p>
          {step.notas.map((n, i) => (
            <p key={i} className="text-xs text-slate-600 mb-1 last:mb-0">• {n}</p>
          ))}
        </div>
      )}
      {step.advertencia && (
        <div className="mt-2 p-3 rounded-lg bg-amber-50 border border-amber-200">
          <p className="text-xs text-amber-700">⚠️ {step.advertencia}</p>
        </div>
      )}
    </motion.div>
  )
}

export function ConfigAssistant() {
  const [state, setState] = useState<ConversationState>(createInitialState)
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([])
  const [options, setOptions] = useState<{ value: string; label: string; icon?: string; desc?: string }[]>([])
  const [steps, setSteps] = useState<ConfigStep[]>([])
  const [currentStepIdx, setCurrentStepIdx] = useState(-1)
  const [progress, setProgress] = useState({ current: 0, total: 3 })
  const [inputText, setInputText] = useState("")
  const [isFirstMessage, setIsFirstMessage] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, options, steps])

  // Auto-start
  useEffect(() => {
    if (isFirstMessage) {
      setIsFirstMessage(false)
      const response = processInput(createInitialState(), "")
      applyResponse(response)
    }
  }, [isFirstMessage])

  const applyResponse = (response: AssistantResponse) => {
    setState(response.state)
    if (response.message) {
      setMessages(prev => [...prev, { text: response.message, isUser: false }])
    }
    setOptions(response.options ?? [])
    if (response.steps) {
      setSteps(response.steps)
      setCurrentStepIdx(0)
    } else if (response.phase !== "pasos" && response.phase !== "resumen") {
      setSteps([])
      setCurrentStepIdx(-1)
    }
    if (response.progress) {
      setProgress(response.progress)
    }
  }

  const handleOptionClick = (value: string) => {
    // Add user selection as message
    const label = options.find(o => o.value === value)?.label || value
    setMessages(prev => [...prev, { text: label, isUser: true }])

    // Handle reset
    if (value === "__reset__") {
      setMessages([])
      setOptions([])
      setSteps([])
      setCurrentStepIdx(-1)
      const response = resetConversation()
      applyResponse(response)
      return
    }

    // Handle device selection from keyboard
    if (value === "__text_input__") {
      const response = processInput(state, inputText)
      applyResponse(response)
      setInputText("")
      return
    }

    // Process through engine
    let response: AssistantResponse
    if (value === "__siguiente__") {
      response = processInput(state, "__siguiente__")
    } else if (value === "__duda__") {
      response = processInput(state, "__duda__")
    } else if (value === "__funciona__") {
      response = processInput(state, "__funciona__")
    } else if (value === "__no_funciona__") {
      response = processInput(state, "__no_funciona__")
    } else if (value === "__ver_dns__") {
      response = processInput(state, "__ver_dns__")
    } else if (value === "__fin__") {
      response = processInput(state, "__fin__")
    } else if (value === "__otro__") {
      response = processInput(state, "__otro__")
    } else {
      response = processInput(state, value)
    }
    applyResponse(response)
  }

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const text = inputText.trim()
    if (!text) return

    setMessages(prev => [...prev, { text, isUser: true }])
    setInputText("")
    const response = processInput(state, text)
    applyResponse(response)
  }

  const handleReset = () => {
    setMessages([])
    setOptions([])
    setSteps([])
    setCurrentStepIdx(-1)
    const response = resetConversation()
    applyResponse(response)
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-white rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-cyan-500 shadow-sm">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">Asistente inteligente</p>
            <p className="text-[10px] text-slate-400">
              {state.device
                ? `🖥️ ${deviceTypes.find(d => d.id === state.device)?.label || ""}`
                : "Selecciona un dispositivo para empezar"}
            </p>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-medium text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <RefreshCw className="w-3 h-3" />
          Nuevo
        </button>
      </div>

      {/* Progress */}
      <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50">
        <ProgressBar current={progress.current} total={progress.total} />
      </div>

      {/* Content area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5 space-y-4 max-h-[500px] md:max-h-[550px] scroll-smooth">
        <AnimatePresence mode="popLayout">
          {messages.map((msg, i) => (
            msg.isUser ? (
              // User selection pill
              <motion.div
                key={`msg-${i}`}
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                className="flex justify-end"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-medium shadow-md shadow-brand-500/20">
                  <CheckCircle2 className="w-4 h-4" />
                  {msg.text}
                </div>
              </motion.div>
            ) : (
              // Assistant message card
              <motion.div
                key={`msg-${i}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-100">
                    <MessageCircle className="h-4 w-4 text-brand-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-brand-700 mb-1">Asistente</p>
                    <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line [&_strong]:text-slate-900 [&_strong]:font-semibold [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:bg-slate-100 [&_code]:text-xs [&_code]:font-mono [&_code]:text-brand-700">
                      {msg.text}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          ))}

          {/* Steps display */}
          {steps.length > 0 && currentStepIdx >= 0 && currentStepIdx < steps.length && (
            <motion.div key="steps" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <StepCard step={steps[currentStepIdx]} numero={currentStepIdx + 1} total={steps.length} />

              {/* Step progress dots */}
              <div className="flex items-center justify-center gap-1.5 mt-3">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all ${
                      i <= currentStepIdx ? "w-6 bg-brand-500" : "w-1.5 bg-slate-200"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Options grid */}
        {options.length > 0 && (
          <motion.div
            key={`options-${state.phase}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2 pt-1"
          >
            {state.phase === "inicio" || state.phase === "dispositivo" ? (
              // Device grid - visual
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {options.map((opt, i) => {
                  const Icon = opt.icon ? iconMap[opt.icon] : undefined
                  return (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleOptionClick(opt.value)}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl border-2 border-slate-200 bg-white hover:border-brand-300 hover:bg-brand-50 transition-all text-center"
                    >
                      {Icon && <Icon className="w-6 h-6 text-brand-500" />}
                      <span className="text-[11px] font-semibold text-slate-700 leading-tight">{opt.label}</span>
                      {opt.desc && <span className="text-[9px] text-slate-400 line-clamp-2">{opt.desc}</span>}
                    </motion.button>
                  )
                })}
              </div>
            ) : state.phase === "contexto" ? (
              // Network context - list
              <div className="space-y-1.5">
                {options.map((opt, i) => (
                  <OptionCard key={i} value={opt.value} label={opt.label} icon={opt.icon} desc={opt.desc} onClick={handleOptionClick} color="brand" />
                ))}
              </div>
            ) : (
              // Action buttons
              <div className="flex flex-wrap gap-2">
                {options.map((opt, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleOptionClick(opt.value)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 transition-all shadow-sm"
                  >
                    {opt.icon && <Shield className="w-4 h-4 text-brand-500" />}
                    {opt.label}
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Empty state */}
        {messages.length === 0 && options.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-100 mb-4">
              <Sparkles className="h-8 w-8 text-brand-600" />
            </div>
            <p className="text-sm text-slate-500">Preparando tu asistente...</p>
          </div>
        )}
      </div>

      {/* Text input */}
      <form onSubmit={handleTextSubmit} className="flex items-center gap-2 p-4 border-t border-slate-200 bg-white rounded-b-2xl">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Escribe tu respuesta aquí..."
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-brand-500 to-cyan-500 text-white hover:from-brand-600 hover:to-cyan-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  )
}
