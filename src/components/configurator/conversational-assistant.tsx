"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, Sparkles, Send, CheckCircle2, ArrowRight, Smartphone, Monitor, Router, Globe, Tv, Tablet, Gamepad2, BookOpen, RefreshCw, MessageCircle } from "lucide-react"
import { findConfig } from "@/lib/config-assistant/knowledge-base"
import type { DeviceType, DeviceConfig, ProtectionLevel, ConfigStep } from "@/lib/config-assistant/types"

// ── Icon map from device IDs ──
const iconMap: Record<string, React.ElementType> = {
  Smartphone, Monitor, Router, Globe, Tv, Tablet, Gamepad2, BookOpen,
}

// ── Age ranges ──
const ageRanges = [
  { min: 0, max: 6, label: "0-6 años", level: "avanzado" as ProtectionLevel },
  { min: 7, max: 11, label: "7-11 años", level: "recomendado" as ProtectionLevel },
  { min: 12, max: 14, label: "12-14 años", level: "recomendado" as ProtectionLevel },
  { min: 15, max: 17, label: "15-17 años", level: "basico" as ProtectionLevel },
]

// ── Simple age extractor ──
function extractAges(text: string): number[] {
  const ages: number[] = []
  const patterns = [
    /(\d+)\s*(?:y\s*|,?\s*)*(?=años|a�os|annee)/gi,
    /(\d+)\s*(?=años|a�os|annee)/gi,
    /tiene?\s*(\d+)/gi,
    /(\d+)\s*(?:años|a�os)/gi,
  ]
  for (const pat of patterns) {
    let m
    while ((m = pat.exec(text)) !== null) {
      const age = parseInt(m[1])
      if (age >= 0 && age <= 18 && !ages.includes(age)) ages.push(age)
    }
  }
  return ages
}

// ── Detect device mentions ──
function extractDevices(text: string): string[] {
  const found: string[] = []
  const keywords: [RegExp, string][] = [
    [/android|samsung|xiaomi|huawei|oppo|realme|poco|motorola|google pixel|oneplus/i, "android"],
    [/iphone|ipad|ios|apple/i, "iphone"],
    [/windows|pc|ordenador|portátil|laptop|computer|microsoft/i, "windows"],
    [/mac(os)?|macbook|imac|apple/i, "macos"],
    [/router|wifi|red|casa/i, "router"],
    [/navegador|chrome|edge|firefox|opera|browser/i, "navegador"],
    [/tele|tv|smart.?tv|televisión/i, "tv"],
    [/tablet|ipad/i, "tablet"],
    [/consola|xbox|playstation|nintendo|gamepad/i, "gamepad"],
    [/kindle|lector|libro/i, "book"],
  ]
  for (const [re, id] of keywords) {
    if (re.test(text) && !found.includes(id)) found.push(id)
  }
  return found
}

// ── Whether text asks a general question (not a config request) ──
function isQuestion(text: string): boolean {
  return /^(qué|cuál|cómo|por qué|qué es|para qué|dónde|cuándo|quién|explica|dime|cuéntame|sugiere|recomiéndame)\b/i.test(text.trim())
}

// ── Step card with colored theme ──
const stepThemes = [
  { gradient: "from-brand-500/5 via-brand-400/5 to-transparent", accent: "bg-brand-500", dot: "bg-brand-500" },
  { gradient: "from-cyan-500/5 via-cyan-400/5 to-transparent", accent: "bg-cyan-500", dot: "bg-cyan-500" },
  { gradient: "from-violet-500/5 via-violet-400/5 to-transparent", accent: "bg-violet-500", dot: "bg-violet-500" },
  { gradient: "from-emerald-500/5 via-emerald-400/5 to-transparent", accent: "bg-emerald-500", dot: "bg-emerald-500" },
  { gradient: "from-amber-500/5 via-amber-400/5 to-transparent", accent: "bg-amber-500", dot: "bg-amber-500" },
  { gradient: "from-rose-500/5 via-rose-400/5 to-transparent", accent: "bg-rose-500", dot: "bg-rose-500" },
  { gradient: "from-sky-500/5 via-sky-400/5 to-transparent", accent: "bg-sky-500", dot: "bg-sky-500" },
  { gradient: "from-teal-500/5 via-teal-400/5 to-transparent", accent: "bg-teal-500", dot: "bg-teal-500" },
  { gradient: "from-indigo-500/5 via-indigo-400/5 to-transparent", accent: "bg-indigo-500", dot: "bg-indigo-500" },
]

function StepCardInline({ step, i, total }: { step: ConfigStep; i: number; total: number }) {
  const theme = stepThemes[i % stepThemes.length]
  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm group hover:shadow-md transition-all">
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-80`} />
      <div className="absolute left-0 top-0 bottom-0 w-1 opacity-30" style={{ backgroundColor: `var(--${theme.accent.replace('bg-', '')})` }} />
      <div className="relative z-10 p-4 pl-5">
        <div className="flex items-center gap-3 mb-2">
          <div className={`flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100`}>
            <span className="text-[11px] font-bold text-slate-500">{i + 1}</span>
          </div>
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">paso {i + 1} de {total}</p>
        </div>
        <h4 className="text-sm font-bold text-slate-900 mb-1">{step.titulo}</h4>
        <p className="text-[13px] text-slate-600 leading-relaxed whitespace-pre-line">{step.descripcion}</p>
        {step.notas && step.notas.length > 0 && (
          <div className="mt-2 p-2 rounded-lg bg-amber-50/80 border border-amber-200/60">
            {step.notas.map((n, j) => <p key={j} className="text-[11px] text-amber-700 mb-0.5 last:mb-0">💡 {n}</p>)}
          </div>
        )}
        {step.advertencia && (
          <div className="mt-2 p-2 rounded-lg bg-red-50/80 border border-red-200/60">
            <p className="text-[11px] text-red-700">⚠️ {step.advertencia}</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Message types ──
type Message = {
  role: "user" | "assistant" | "cards"
  content?: string
  config?: DeviceConfig
}

// ── Device quick-pick list ──
const quickDevices = [
  { id: "android" as DeviceType, label: "Android", icon: "Smartphone" },
  { id: "iphone" as DeviceType, label: "iPhone/iPad", icon: "Smartphone" },
  { id: "windows" as DeviceType, label: "Windows", icon: "Monitor" },
  { id: "macos" as DeviceType, label: "macOS", icon: "Monitor" },
  { id: "router" as DeviceType, label: "Router", icon: "Router" },
  { id: "navegador" as DeviceType, label: "Navegadores", icon: "Globe" },
]

// ── MAIN COMPONENT ──
export function ConversationalAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "👋 ¡Hola! Soy tu asistente de protección digital.\n\nCuéntame sobre tu situación. Por ejemplo:\n\n• *\"Tengo hijos de 7 y 12 años\"*\n• *\"Quiero proteger el móvil Android de mi hijo\"*\n• *\"¿Qué necesito para proteger a mi familia?\"*\n\nO directamente dime qué dispositivo quieres configurar 👇",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<"chat" | "device" | "done">("chat")
  const [pendingDevice, setPendingDevice] = useState<DeviceType | null>(null)
  const [pendingLevel, setPendingLevel] = useState<ProtectionLevel | null>(null)
  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, loading])

  // ── Add config cards to chat ──
  const showConfig = useCallback((device: DeviceType, level: ProtectionLevel) => {
    const config = findConfig(device, "wifi-casa", level)
    if (config) {
      setMessages(prev => [...prev, {
        role: "cards",
        config,
      }])
      setMessages(prev => [...prev, {
        role: "assistant",
        content: `✅ Aquí tienes la guía para **${config.titulo}**. Sigue los pasos y en unos minutos estarás protegido.\n\n¿Necesitas configurar otro dispositivo o tienes alguna pregunta?`,
      }])
      setStep("done")
    }
  }, [])

  // ── Handle user input ──
  const handleSend = useCallback(async (text?: string) => {
    const inputText = (text || input).trim()
    if (!inputText || loading) return
    setInput("")
    setMessages(prev => [...prev, { role: "user", content: inputText }])
    setLoading(true)

    // Detect ages
    const ages = extractAges(inputText)
    const devices = extractDevices(inputText)
    const isQ = isQuestion(inputText)

    // If it's a general question, send to AI
    if (isQ && devices.length === 0 && ages.length === 0) {
      try {
        const res = await fetch("/api/assistant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [{ role: "user", content: inputText }],
            system: `Eres el Asistente Sentinel, experto en protección digital infantil. Respondes en español, amable y claro. Máximo 3 párrafos.`,
          }),
        })
        const data = await res.json()
        const response = data.response || "Lo siento, no he podido procesar tu pregunta."
        setMessages(prev => [...prev, { role: "assistant", content: response }])
      } catch {
        setMessages(prev => [...prev, { role: "assistant", content: "Error de conexión. Inténtalo de nuevo." }])
      }
      setLoading(false)
      return
    }

    // ── LOGIC FLOW ──

    // Case 1: Ages detected → recommend level
    if (ages.length > 0) {
      const youngest = Math.min(...ages)
      const range = ageRanges.find(r => youngest >= r.min && youngest <= r.max)
      const level = range?.level || "recomendado"
      setPendingLevel(level)

      const ageList = ages.sort((a, b) => a - b).join(" y ")
      const levelName = level === "avanzado" ? "máxima protección 🛡️🛡️🛡️" : level === "recomendado" ? "protección recomendada 🛡️🛡️" : "protección básica 🛡️"

      if (devices.length > 0) {
        // We have both ages and devices → recommend
        const deviceNames = devices.map(d => quickDevices.find(q => q.id === d)?.label || d).join(", ")
        setMessages(prev => [...prev, {
          role: "assistant",
          content: `📋 Entendido: tienes hijos de **${ageList}** años y quieres proteger **${deviceNames}**.\n\nPara la edad del menor, recomiendo **${levelName}**. Voy a preparar tu guía personalizada...`,
        }])

        // Use first device
        const firstDevice = devices[0] as DeviceType
        const config = findConfig(firstDevice, "wifi-casa", level)
        if (config) {
          setTimeout(() => {
            setMessages(prev => [...prev, {
              role: "cards",
              config,
            }])
            setMessages(prev => [...prev, {
              role: "assistant",
              content: `✅ Aquí tienes la guía para **${config.titulo}**.\n\n¿Quieres configurar también los otros dispositivos o tienes alguna pregunta?`,
            }])
            setStep("done")
            setLoading(false)
          }, 800)
          return
        }
      } else {
        // Ages but no device → ask what device
        setMessages(prev => [...prev, {
          role: "assistant",
          content: `📋 Entendido: tienes hijos de **${ageList}** años. Para esa edad recomiendo **${levelName}**.\n\n¿Qué dispositivo quieres proteger?`,
        }])
        setStep("device")
        setLoading(false)
        return
      }
    }

    // Case 2: Devices detected but no ages → ask ages
    if (devices.length > 0 && ages.length === 0) {
      const deviceNames = devices.map(d => quickDevices.find(q => q.id === d)?.label || d).join(", ")
      setPendingDevice(devices[0] as DeviceType)
      setMessages(prev => [...prev, {
        role: "assistant",
        content: `👍 Perfecto, veo que quieres proteger **${deviceNames}**.\n\n¿De qué edad son los menores que van a usar el dispositivo? Así puedo recomendarte el nivel de protección adecuado.`,
      }])
      setLoading(false)
      return
    }

    // Case 3: Neither ages nor devices → general guidance
    setMessages(prev => [...prev, {
      role: "assistant",
      content: `No te preocupes, te ayudo. La protección digital de menores se basa en **dos capas**:\n\n1️⃣ **DNS de protección** → filtra contenido a nivel de red\n2️⃣ **Control parental** → supervisa y limita el uso\n\nCuéntame:\n• ¿Qué **edad** tienen los menores?\n• ¿Qué **dispositivos** usan? (Android, iPhone, Windows, etc.)`,
    }])
    setStep("device")
    setLoading(false)
  }, [input, loading])

  // ── Device quick-select handler ──
  const handleQuickDevice = (deviceId: DeviceType) => {
    if (pendingLevel) {
      showConfig(deviceId, pendingLevel)
    } else {
      setPendingDevice(deviceId)
      setMessages(prev => [...prev, { role: "assistant", content: `¿De qué edad es el menor que usará el dispositivo?` }])
    }
  }

  // ── Age quick-select from device step ──
  const handleQuickAge = (level: ProtectionLevel, label: string) => {
    setPendingLevel(level)
    if (pendingDevice) {
      showConfig(pendingDevice, level)
    } else {
      setMessages(prev => [...prev, { role: "assistant", content: `👍 **${label}** — buena elección. ¿Qué dispositivo quieres proteger?` }])
      setStep("device")
    }
  }

  return (
    <div className="flex flex-col h-[600px] sm:h-[650px] rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
      {/* ── Header ── */}
      <div className="relative overflow-hidden bg-gradient-to-r from-brand-700 to-brand-500 px-5 py-4 shrink-0">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 30% 40%, white 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
        <div className="flex items-center gap-3 relative z-10">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 border border-white/20">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-bold text-white truncate">Asistente Sentinela</h2>
            <p className="text-[11px] text-white/70">Dime tu situación y te guío</p>
          </div>
          {messages.length > 1 && (
            <button
              onClick={() => {
                setMessages([messages[0]])
                setStep("chat")
                setPendingDevice(null)
                setPendingLevel(null)
              }}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-all"
              title="Empezar de nuevo"
            >
              <RefreshCw className="h-4 w-4 text-white" />
            </button>
          )}
        </div>
      </div>

      {/* ── Messages ── */}
      <div ref={chatRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={`msg-${i}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              {msg.role === "user" && (
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-brand-600 text-white px-4 py-2.5 text-sm leading-relaxed shadow-sm">
                    {msg.content}
                  </div>
                </div>
              )}

              {msg.role === "assistant" && (
                <div className="flex justify-start">
                  <div className="max-w-[90%] rounded-2xl rounded-bl-sm bg-slate-100 text-slate-700 px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line">
                    {msg.content}
                  </div>
                </div>
              )}

              {msg.role === "cards" && msg.config && (
                <div className="space-y-3 my-3">
                  <div className="flex items-center gap-2 px-1">
                    <BadgeDot color="success" />
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tu guía personalizada</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="px-2.5 py-1 rounded-full bg-brand-100 text-brand-700 text-[11px] font-medium">⏱️ {msg.config.tiempoEstimado}</span>
                    <span className="px-2.5 py-1 rounded-full bg-cyan-100 text-cyan-700 text-[11px] font-medium">📋 {msg.config.pasos.length} pasos</span>
                  </div>
                  <div className="space-y-2.5">
                    {msg.config.pasos.map((paso, j) => (
                      <StepCardInline key={paso.id || j} step={paso} i={j} total={msg.config!.pasos.length} />
                    ))}
                  </div>
                  <div className="rounded-xl border border-success-200 bg-success-50 p-3.5">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-5 w-5 text-success-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-success-700 mb-0.5">✅ Verificación final</p>
                        <p className="text-[12px] text-success-600 leading-relaxed">{msg.config.verificacion}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-100">
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-2 h-2 rounded-full bg-brand-400" />
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} className="w-2 h-2 rounded-full bg-brand-400" />
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} className="w-2 h-2 rounded-full bg-brand-400" />
            </div>
          </motion.div>
        )}

        {/* ── Device quick-pick (after asking) ── */}
        {step === "device" && !loading && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
            <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm w-full max-w-[90%]">
              <p className="text-[11px] font-semibold text-slate-500 mb-2 px-1">O selecciona rápido:</p>
              <div className="grid grid-cols-3 gap-1.5">
                {quickDevices.map(d => {
                  const Icon = iconMap[d.icon] || Smartphone
                  return (
                    <button
                      key={d.id}
                      onClick={() => handleQuickDevice(d.id)}
                      className="flex flex-col items-center gap-1 p-2 rounded-xl border border-slate-100 bg-slate-50 hover:bg-brand-50 hover:border-brand-200 transition-all"
                    >
                      <Icon className="w-4 h-4 text-slate-400" />
                      <span className="text-[10px] font-medium text-slate-600">{d.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Age/level quick-pick ── */}
        {step === "device" && pendingDevice && !loading && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
            <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm">
              <p className="text-[11px] font-semibold text-slate-500 mb-2 px-1">¿Qué edad tiene?</p>
              <div className="flex flex-wrap gap-1.5">
                {ageRanges.map(r => (
                  <button
                    key={r.label}
                    onClick={() => handleQuickAge(r.level, r.label)}
                    className="px-3 py-1.5 rounded-lg border border-slate-100 bg-slate-50 text-[11px] font-medium text-slate-600 hover:bg-brand-50 hover:border-brand-200 hover:text-brand-700 transition-all"
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {messages.length <= 1 && !loading && (
          <div className="flex justify-center mt-1">
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
              <MessageCircle className="w-3 h-3" />
              Ej: "Tengo hijos de 7 y 12 años" o "Proteger Android"
            </div>
          </div>
        )}
      </div>

      {/* ── Input ── */}
      <div className="shrink-0 border-t border-slate-200 bg-white px-4 py-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
            placeholder="Escribe aquí tu situación..."
            disabled={loading}
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-brand-300 focus:ring-1 focus:ring-brand-200 transition-all disabled:opacity-50"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white hover:bg-brand-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Badge dot helper ──
function BadgeDot({ color }: { color: string }) {
  const colors: Record<string, string> = { success: "bg-success-500", brand: "bg-brand-500", cyan: "bg-cyan-500" }
  return <span className={`flex h-2 w-2 rounded-full ${colors[color] || colors.success} shrink-0`} />
}

function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ")
}
