"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, Sparkles, Send, CheckCircle2, ArrowRight, Smartphone, Monitor, Router, Globe, Tv, Tablet, Gamepad2, BookOpen } from "lucide-react"
import { findConfig } from "@/lib/config-assistant/knowledge-base"
import { deviceTypes } from "@/lib/config-assistant/types"
import type { DeviceType, ConfigStep } from "@/lib/config-assistant/types"
import type { DeviceConfig } from "@/lib/config-assistant/types"

const iconMap: Record<string, React.ElementType> = {
  Smartphone, Monitor, Router, Globe, Tv, Tablet, Gamepad2, BookOpen,
}

// ── AI Chat ──
function AiChat() {
  const [aiMessages, setAiMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" })
  }, [aiMessages, loading])

  const handleSend = async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput("")
    setAiMessages(prev => [...prev, { role: "user", content: text }])
    setLoading(true)
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: text }],
          system: "Eres el Asistente Sentinel, experto en protección digital infantil. Respondes en español, claro y breve.",
        }),
      })
      const data = await res.json()
      const response = data.response || "Lo siento, no he podido procesar tu pregunta."
      setAiMessages(prev => [...prev, { role: "assistant", content: response }])
    } catch {
      setAiMessages(prev => [...prev, { role: "assistant", content: "Error de conexión. Inténtalo de nuevo." }])
    }
    setLoading(false)
  }

  return (
    <div className="mt-4 rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50">
        <Sparkles className="w-4 h-4 text-brand-500" />
        <span className="text-xs font-semibold text-slate-700">Chat IA — Pregúntame lo que quieras</span>
      </div>
      <div ref={chatRef} className="h-48 overflow-y-auto px-4 py-3 space-y-3">
        {aiMessages.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Sparkles className="w-8 h-8 text-slate-300 mb-2" />
            <p className="text-xs text-slate-400">Pregúntame sobre protección digital, DNS, controles parentales...</p>
          </div>
        )}
        {aiMessages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] rounded-xl px-3.5 py-2 text-sm leading-relaxed ${
              msg.role === "user" ? "bg-brand-600 text-white rounded-br-sm" : "bg-slate-100 text-slate-700 rounded-bl-sm"
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100">
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-1.5 h-1.5 rounded-full bg-brand-400" />
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-brand-400" />
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-brand-400" />
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 p-3 border-t border-slate-100">
        <input type="text" value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
          placeholder="Escribe tu pregunta..." className="flex-1 px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-brand-300 focus:ring-1 focus:ring-brand-200 transition-all" />
        <button onClick={handleSend} disabled={!input.trim() || loading}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white hover:bg-brand-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed">
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}

// ── Step Card ──
const stepThemes = [
  { gradient: "from-brand-500/5 via-brand-400/5 to-transparent", accent: "bg-brand-500" },
  { gradient: "from-cyan-500/5 via-cyan-400/5 to-transparent", accent: "bg-cyan-500" },
  { gradient: "from-violet-500/5 via-violet-400/5 to-transparent", accent: "bg-violet-500" },
  { gradient: "from-emerald-500/5 via-emerald-400/5 to-transparent", accent: "bg-emerald-500" },
  { gradient: "from-amber-500/5 via-amber-400/5 to-transparent", accent: "bg-amber-500" },
  { gradient: "from-rose-500/5 via-rose-400/5 to-transparent", accent: "bg-rose-500" },
  { gradient: "from-sky-500/5 via-sky-400/5 to-transparent", accent: "bg-sky-500" },
  { gradient: "from-teal-500/5 via-teal-400/5 to-transparent", accent: "bg-teal-500" },
  { gradient: "from-indigo-500/5 via-indigo-400/5 to-transparent", accent: "bg-indigo-500" },
]

function StepCard({ step, i, total }: { step: ConfigStep; i: number; total: number }) {
  const theme = stepThemes[i % stepThemes.length]
  const isDnsStep = step.titulo.toLowerCase().includes("dns")
  const isParentalStep = step.titulo.toLowerCase().includes("familia") || step.titulo.toLowerCase().includes("tiempo") || step.titulo.toLowerCase().includes("control")
  const isRouterStep = step.titulo.toLowerCase().includes("router") || step.titulo.toLowerCase().includes("wifi")

  // Decorative icon per step
  let decorIcon = "🛡️"
  if (isDnsStep) decorIcon = "🌐"
  else if (isParentalStep) decorIcon = "👨‍👩‍👧‍👦"
  else if (isRouterStep) decorIcon = "📶"

  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-80`} />
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: `radial-gradient(circle at 30% 40%, currentColor 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />
      {/* Side accent bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${theme.accent} opacity-30`} />
      
      {/* Content */}
      <div className="relative z-10 p-4 pl-5">
        <div className="flex items-center gap-3 mb-3">
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${theme.accent} bg-opacity-10 border border-slate-200/60`}>
            <span className="text-xs font-bold text-slate-500">{i + 1}</span>
          </div>
          <div className="flex-1">
            <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider">paso {i + 1} de {total}</p>
            <h3 className="text-sm font-bold text-slate-900 leading-tight">{step.titulo}</h3>
          </div>
          <div className="text-lg opacity-30">{decorIcon}</div>
        </div>

        <div className="space-y-2">
          {step.descripcion.split("\n").filter(Boolean).map((line, j) => {
            const trimmed = line.trim()
            const isHeader = trimmed.startsWith("**") && trimmed.endsWith("**")
            if (isHeader) {
              return <p key={j} className="text-xs font-bold text-slate-800 mt-1">{trimmed.replace(/\*\*/g, "")}</p>
            }
            return (
              <div key={j} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-success-500 mt-0.5 shrink-0" />
                <span className="text-[13px] text-slate-700 leading-relaxed">{trimmed}</span>
              </div>
            )
          })}
        </div>

        {step.notas && step.notas.length > 0 && (
          <div className="mt-3 p-2.5 rounded-lg bg-amber-50/80 border border-amber-200/60 backdrop-blur-sm">
            {step.notas.map((n, j) => <p key={j} className="text-[11px] text-amber-700 mb-1 last:mb-0">💡 {n}</p>)}
          </div>
        )}
        {step.advertencia && (
          <div className="mt-2 p-2.5 rounded-lg bg-red-50/80 border border-red-200/60 backdrop-blur-sm">
            <p className="text-[11px] text-red-700">⚠️ {step.advertencia}</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Main Assistant ──
export function ConfigAssistant() {
  const [step, setStep] = useState<"bienvenida" | "seleccion" | "pasos">("bienvenida")
  const [device, setDevice] = useState<DeviceType | null>(null)
  const [config, setConfig] = useState<DeviceConfig | null>(null)

  const handleDeviceSelect = (id: string) => {
    const d = id as DeviceType
    const c = findConfig(d, "wifi-casa", "recomendado")
    if (c) {
      setDevice(d)
      setConfig(c)
      setStep("pasos")
    }
  }

  return (
    <div>
      {/* Configurador */}
      <div className="flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
        {/* Header */}
        <div className="relative overflow-hidden rounded-t-2xl bg-gradient-to-r from-brand-700 to-brand-500 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 border border-white/20">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Asistente Sentinel</h2>
              <p className="text-[11px] text-white/70">Protección digital paso a paso</p>
            </div>
          </div>
        </div>

        <div className="p-5">
          <AnimatePresence mode="wait">
            {step === "bienvenida" && (
              <motion.div key="bienvenida" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-6">
                <div className="flex justify-center mb-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50">
                    <Shield className="h-7 w-7 text-brand-500" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Protege a tu familia</h3>
                <p className="text-sm text-slate-500 mb-6 max-w-sm mx-auto">Te guío paso a paso para configurar la protección digital en cualquier dispositivo.</p>
                <button onClick={() => setStep("seleccion")}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition-all shadow-sm">
                  Comenzar <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {step === "seleccion" && (
              <motion.div key="seleccion" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <h3 className="text-base font-bold text-slate-900 mb-1">¿Qué dispositivo quieres proteger?</h3>
                <p className="text-sm text-slate-500 mb-5">Selecciona el tipo de dispositivo</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {deviceTypes.map((d) => {
                    const Icon = iconMap[d.icon as keyof typeof iconMap] || Smartphone
                    return (
                      <motion.button key={d.id} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
                        onClick={() => handleDeviceSelect(d.id)}
                        className="flex flex-col items-center gap-2 p-3.5 rounded-xl border border-slate-200 bg-white hover:border-brand-300 hover:shadow-sm transition-all text-center group">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 group-hover:bg-brand-100 transition-all">
                          <Icon className="w-5 h-5 text-brand-400 group-hover:text-brand-600" />
                        </div>
                        <span className="text-xs font-semibold text-slate-700 group-hover:text-brand-700">{d.label}</span>
                      </motion.button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {step === "pasos" && config && (
              <motion.div key="pasos" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{config.titulo}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      ⏱️ {config.tiempoEstimado} · {config.pasos.length} pasos
                    </p>
                  </div>
                  <button onClick={() => { setStep("seleccion"); setDevice(null); setConfig(null) }}
                    className="text-xs font-medium text-brand-600 hover:text-brand-700 shrink-0">
                    Cambiar dispositivo
                  </button>
                </div>
                <div className="space-y-3 mb-5">
                  {config.pasos.map((paso, i) => (
                    <StepCard key={paso.id || i} step={paso} i={i} total={config.pasos.length} />
                  ))}
                </div>
                <div className="rounded-xl border border-success-200 bg-success-50 p-4">
                  <h4 className="text-xs font-bold text-success-700 mb-1">✅ Verificación final</h4>
                  <p className="text-xs text-success-600">{config.verificacion}</p>
                </div>
                {config.erroresFrecuentes.length > 0 && (
                  <div className="mt-3 rounded-xl border border-slate-200 bg-white p-4">
                    <h4 className="text-xs font-bold text-slate-700 mb-2">Problemas frecuentes</h4>
                    <div className="space-y-1.5">
                      {config.erroresFrecuentes.slice(0, 3).map((err, i) => (
                        <p key={i} className="text-[11px] text-slate-600">⚠️ {err.problema} → {err.solucion}</p>
                      ))}
                    </div>
                  </div>
                )}
                <button onClick={() => { setStep("seleccion"); setDevice(null); setConfig(null) }}
                  className="mt-4 w-full py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
                  Configurar otro dispositivo
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Chat IA */}
      <AiChat />
    </div>
  )
}
