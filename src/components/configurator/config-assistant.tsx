"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HeartHandshake, CheckCircle2, Send, Shield, Sparkles, Wifi, Smartphone, Monitor, Router, Globe, Tv, Tablet, Gamepad2, BookOpen, RefreshCw, Circle, Hexagon, HeartHandshake as HeartIcon } from "lucide-react"
import { processInput, createInitialState, resetConversation } from "@/lib/config-assistant/engine"
import { deviceTypes } from "@/lib/config-assistant/types"
import type { AssistantResponse, ConversationState } from "@/lib/config-assistant/engine"
import type { ConfigStep } from "@/lib/config-assistant/types"
import type { DeviceType } from "@/lib/config-assistant/types"

// ── Sub-components ──

function JarvisHeader({ device, onReset }: { device: string | null; onReset: () => void }) {
  return (
    <div className="relative overflow-hidden rounded-t-2xl bg-gradient-to-r from-emerald-700 via-teal-600 to-cyan-700">
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.8) 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
      <div className="relative z-10 flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
            <HeartHandshake className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white tracking-tight">Asistente Sentinel</h2>
              <span className="text-[8px] font-semibold px-1.5 py-0.5 rounded-full bg-white/10 text-white/60 border border-white/10">v2.0</span>
            </div>
            <p className="text-[11px] text-white/60">{device ? `Protegiendo ${device}` : "Aquí para ayudarte"}</p>
          </div>
        </div>
        <button onClick={onReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-medium text-white/50 hover:bg-white/10 hover:text-white/70 transition-all"
        >
          <RefreshCw className="w-3 h-3" /> Empezar de nuevo
        </button>
      </div>
    </div>
  )
}

function JarvisProgress({ current, total, phase }: { current: number; total: number; phase: string }) {
  const pct = total > 0 ? (current / total) * 100 : 0
  const phaseLabels: Record<string, string> = { inicio: "elige dispositivo", nivel: "elige nivel", pasos: "siguiendo pasos", resumen: "verificando", finalizado: "completado", "": "esperando" }
  return (
    <div className="px-5 py-2.5 border-b border-teal-500/10 bg-gradient-to-r from-emerald-950/50 to-teal-950/50">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[9px] font-medium text-emerald-500/60 uppercase tracking-wider">{phaseLabels[phase] || phase}</span>
        <span className="text-[9px] font-mono text-emerald-400/40">{String(current).padStart(2, '0')}/{String(total).padStart(2, '0')}</span>
      </div>
      <div className="h-1 rounded-full bg-emerald-500/10 overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 shadow-sm shadow-emerald-400/20" />
      </div>
    </div>
  )
}

function JarvisStepCard({ step, numero, total }: { step: ConfigStep; numero: number; total: number }) {
  const instrucciones = step.descripcion ? step.descripcion.split("\n").filter(Boolean) : []
  const dnsIps: string[] = []
  const ipPattern = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g
  const dnsLines: string[] = []
  instrucciones.forEach(line => {
    const trimmed = line.trim()
    if (trimmed.match(/^[1-9]️⃣/)) {
      const ips = trimmed.match(ipPattern)
      if (ips) dnsIps.push(...ips)
      dnsLines.push(trimmed)
    }
  })
  const hasDnsInfo = dnsIps.length > 0

  const filteredLines = instrucciones.filter(line => {
    const t = line.trim()
    const hasDns = t.match(/^[1-9]️⃣/)
    return !hasDns
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="relative overflow-hidden rounded-xl border border-emerald-700/20 bg-gradient-to-br from-emerald-950/60 to-teal-950/60 backdrop-blur-sm p-5"
    >
      <div className="absolute inset-0 opacity-[0.015]"
        style={{ backgroundImage: `radial-gradient(circle at 50% 50%, rgba(16,185,129,0.5) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <span className="text-[11px] font-bold text-emerald-300">{String(numero).padStart(2, '0')}</span>
          </div>
          <div>
            <p className="text-[9px] font-medium text-emerald-400/50 uppercase tracking-widest">paso {numero}/{total}</p>
            <h3 className="text-sm font-bold text-white">{step.titulo}</h3>
          </div>
        </div>

        {hasDnsInfo && (
          <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-emerald-900/40 to-teal-900/40 border border-emerald-500/30 shadow-sm">
            <p className="text-[9px] font-semibold uppercase tracking-wider text-emerald-400 mb-2">🌐 Servidores DNS</p>
            <div className="flex flex-wrap gap-2">
              {dnsIps.map((ip) => (
                <code key={ip} className="text-[12px] font-mono text-emerald-200 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md">{ip}</code>
              ))}
            </div>
          </div>
        )}

        {filteredLines.length > 0 && (
          <div className="space-y-2 mb-3">
            {filteredLines.map((line, i) => {
              const trimmed = line.trim()
              const esSubTitulo = trimmed.startsWith("**") && trimmed.endsWith("**")
              return (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="flex h-4 w-4 shrink-0 mt-0.5 items-center justify-center rounded-full border border-emerald-500/40">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className={`text-[13px] leading-relaxed ${esSubTitulo ? "text-white font-semibold text-sm" : "text-slate-200"}`}>{trimmed}</span>
                </div>
              )
            })}
          </div>
        )}

        {step.notas && step.notas.length > 0 && (
          <div className="mt-2 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
            <p className="text-[9px] font-medium tracking-wide text-emerald-400/60 mb-1.5">💡 Nota</p>
            {step.notas.map((n, i) => <p key={i} className="text-[12px] text-slate-400 mb-1 last:mb-0">{n}</p>)}
          </div>
        )}
        {step.advertencia && (
          <div className="mt-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <p className="text-[12px] text-amber-300">⚠️ {step.advertencia}</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

const iconMap: Record<string, React.ElementType> = {
  Shield, Smartphone: Shield, Monitor: Shield, Router: Shield,
  Globe: Shield, Tv: Shield, Tablet: Shield, Gamepad2: Shield,
  BookOpen: Shield, HeartHandshake,
}

const levelBadgeColors: Record<string, string> = {
  basico: "border-cyan-500/40 text-cyan-300",
  recomendado: "border-brand-500/40 text-brand-300",
  avanzado: "border-rose-500/40 text-rose-300",
}

// ── AI Chat Component ──

function AiChat({ state }: { state: ConversationState }) {
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
    const newMsg = { role: "user" as const, content: text }
    setAiMessages(prev => [...prev, newMsg])
    setLoading(true)

    try {
      const deviceLabel = state.device
        ? deviceTypes.find(d => d.id === state.device)?.label || state.device
        : "ninguno"
      const levelLabel = state.level || "ninguno"

      const system = `Eres el Asistente Sentinel, experto en protección digital infantil.
Respondes en español de España, con tono cercano y muy claro.
Respuestas cortas, máximo 4-5 líneas. Usas emojis de vez en cuando.

Contexto del usuario:
- Dispositivo: ${deviceLabel}
- Nivel: ${levelLabel}`

      // Solo enviar el último mensaje, no todo el historial
      const conv = [{ role: "user" as const, content: text }]

      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conv, system }),
      })
      const data = await res.json()
      console.log("[Sentinel AI] API response:", data)
      const response = data.response
      if (!response) {
        console.error("[Sentinel AI] Empty response from API:", data)
        setAiMessages(prev => [...prev, { role: "assistant", content: "Lo siento, no he podido procesar tu pregunta. ¿Puedes reformularla?" }])
        setLoading(false)
        return
      }
      setAiMessages(prev => [...prev, { role: "assistant", content: response }])
    } catch (e) {
      console.error("[Sentinel AI] Fetch error:", e)
      setAiMessages(prev => [...prev, { role: "assistant", content: "Lo siento, hubo un error. Inténtalo de nuevo." }])
    }
    setLoading(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="mt-4 rounded-xl border border-teal-500/20 bg-slate-950 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-teal-500/10 bg-gradient-to-r from-emerald-900/30 to-teal-900/30">
        <Sparkles className="w-4 h-4 text-emerald-400" />
        <span className="text-xs font-semibold text-emerald-300">Chat IA — Pregúntame lo que quieras</span>
      </div>

      {/* Messages */}
      <div ref={chatRef} className="h-56 overflow-y-auto px-4 py-3 space-y-3"
        style={{ backgroundImage: `radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.02) 0%, transparent 60%)` }}
      >
        {aiMessages.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Sparkles className="w-8 h-8 text-emerald-500/20 mb-2" />
            <p className="text-xs text-slate-500">Pregúntame sobre protección digital, DNS, controles parentales...</p>
          </div>
        )}
        {aiMessages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] rounded-xl px-3.5 py-2 text-sm leading-relaxed ${
              msg.role === "user"
                ? "bg-emerald-600/20 border border-emerald-500/20 text-white"
                : "bg-slate-800/50 border border-slate-700/30 text-slate-200"
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/50 border border-slate-700/30">
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 p-3 border-t border-teal-500/10">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe tu pregunta..."
          className="flex-1 px-3.5 py-2 rounded-lg bg-white/5 border border-teal-700/30 text-sm text-white placeholder:text-teal-400/30 focus:outline-none focus:border-teal-500/40 transition-all"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || loading}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-400 hover:to-teal-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}

// ── Main ConfigAssistant ──

export function ConfigAssistant() {
  const [state, setState] = useState<ConversationState>(createInitialState)
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([])
  const [options, setOptions] = useState<{ value: string; label: string; icon?: string; desc?: string }[]>([])
  const [steps, setSteps] = useState<ConfigStep[]>([])
  const [currentStepIdx, setCurrentStepIdx] = useState(-1)
  const [progress, setProgress] = useState({ current: 0, total: 3 })
  const [isFirstMessage, setIsFirstMessage] = useState(true)
  const [isThinking, setIsThinking] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, options, steps, isThinking])

  useEffect(() => {
    if (isFirstMessage) {
      setIsFirstMessage(false)
      setIsThinking(true)
      setTimeout(() => {
        const response = processInput(createInitialState(), "")
        applyResponse(response)
        setIsThinking(false)
      }, 300)
    }
  }, [isFirstMessage])

  const applyResponse = (response: AssistantResponse) => {
    setState(response.state)
    if (response.message) setMessages(prev => [...prev, { text: response.message, isUser: false }])
    setOptions(response.options ?? [])
    setCurrentStepIdx(response.state.currentStepIndex)
    if (response.steps) setSteps(response.steps)
    else if (response.phase !== "pasos" && response.phase !== "resumen") setSteps([])
    if (response.progress) setProgress(response.progress)
  }

  const handleOptionClick = (value: string) => {
    const label = options.find(o => o.value === value)?.label || value
    setMessages(prev => [...prev, { text: label, isUser: true }])
    setOptions([])
    setIsThinking(true)
    if (value === "__reset__") {
      setMessages([]); setOptions([]); setSteps([]); setCurrentStepIdx(-1)
      applyResponse(resetConversation())
      setIsThinking(false); return
    }
    const response = processInput(state, value)
    applyResponse(response)
    setIsThinking(false)
  }

  return (
    <div>
      {/* Configurador (solo botones - sin input de texto) */}
      <div className="flex flex-col bg-slate-950 rounded-2xl overflow-hidden border border-teal-500/20 shadow-2xl shadow-teal-500/5">
        <JarvisHeader device={state.device} onReset={() => { setMessages([]); setOptions([]); setSteps([]); setCurrentStepIdx(-1); applyResponse(resetConversation()) }} />
        <JarvisProgress current={progress.current} total={progress.total} phase={state.phase} />

        <div ref={scrollRef} className="overflow-y-auto px-5 py-5 space-y-4 max-h-[500px] md:max-h-[550px] scroll-smooth"
          style={{ backgroundImage: `radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.03) 0%, transparent 60%)` }}
        >
          <AnimatePresence mode="popLayout">
            {messages.map((msg, i) => (
              msg.isUser ? (
                <motion.div key={`msg-${i}`} initial={{ opacity: 0, x: 20, scale: 0.95 }} animate={{ opacity: 1, x: 0, scale: 1 }} className="flex justify-end">
                  <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-medium shadow-lg shadow-emerald-500/10 border border-emerald-400/20 backdrop-blur-sm">
                    <CheckCircle2 className="w-4 h-4 text-cyan-300" />{msg.text}
                  </div>
                </motion.div>
              ) : (
                <motion.div key={`msg-${i}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-emerald-700/30 bg-gradient-to-br from-emerald-900/30 to-teal-900/20 backdrop-blur-sm p-4 shadow-lg"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <HeartHandshake className="h-3.5 w-3.5 text-emerald-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-medium text-emerald-400/60 mb-1.5">Asistente Sentinel</p>
                      <div className="text-sm text-slate-200 leading-relaxed whitespace-pre-line [&_strong]:text-white [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:bg-emerald-500/10 [&_code]:text-[11px] [&_code]:font-medium [&_code]:text-emerald-300">{msg.text}</div>
                    </div>
                  </div>
                </motion.div>
              )
            ))}

            {isThinking && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-900/20 border border-emerald-700/20">
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-medium text-emerald-400/60 ml-1">Pensando...</span>
                </div>
              </motion.div>
            )}

            {steps.length > 0 && currentStepIdx >= 0 && currentStepIdx < steps.length && !isThinking && (
              <motion.div key="steps" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <JarvisStepCard step={steps[currentStepIdx]} numero={currentStepIdx + 1} total={steps.length} />
                <div className="flex items-center justify-center gap-1.5 mt-3">
                  {steps.map((_, i) => (
                    <button key={i} onClick={() => { if (i !== currentStepIdx) { setIsThinking(true); setTimeout(() => { applyResponse(processInput(state, `__ir_a_${i}__`)); setIsThinking(false) }, 200) } }}
                      className={`cursor-pointer rounded-full transition-all duration-500 ${i <= currentStepIdx ? "w-6 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 shadow-sm shadow-emerald-500/30" : "w-1.5 h-1.5 bg-slate-700 hover:bg-slate-500"}`}
                      title={`Ir al paso ${i + 1}`} aria-label={`Ir al paso ${i + 1}`} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {options.length > 0 && !isThinking && (
            <motion.div key={`options-${state.phase}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2 pt-1">
              {state.phase === "inicio" && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {options.map((opt, i) => {
                    const Icon = opt.icon ? iconMap[opt.icon] : undefined
                    return (
                      <motion.button key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                        whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} onClick={() => handleOptionClick(opt.value)}
                        className="flex flex-col items-center gap-2 p-3 rounded-xl border border-teal-700/30 bg-gradient-to-b from-emerald-900/40 to-teal-950/40 backdrop-blur-sm hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all text-center group"
                      >
                        {Icon && <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/5 border border-emerald-500/10 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 transition-all"><Icon className="w-5 h-5 text-emerald-400/70 group-hover:text-emerald-300" /></div>}
                        <span className="text-[11px] font-semibold text-slate-300 leading-tight group-hover:text-white transition-colors">{opt.label}</span>
                        {opt.desc && <span className="text-[9px] text-slate-500 line-clamp-2">{opt.desc}</span>}
                      </motion.button>
                    )
                  })}
                </div>
              )}
              {state.phase === "nivel" && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {options.map((opt, i) => {
                    const colors = ["from-cyan-500/20 to-blue-600/20 border-cyan-500/30", "from-brand-500/20 to-purple-600/20 border-brand-500/30", "from-rose-500/20 to-amber-600/20 border-rose-500/30"]
                    const badges = ["+15 ANOS", "7-14 ANOS", "0-12 ANOS"]
                    return (
                      <motion.button key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                        whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={() => handleOptionClick(opt.value)}
                        className={`relative overflow-hidden p-4 rounded-xl bg-gradient-to-br ${colors[i]} backdrop-blur-sm border text-center group transition-all duration-300`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        <div className="relative z-10 flex flex-col items-center gap-2">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/10 bg-white/5 group-hover:border-white/20 transition-all">
                            <Shield className={`w-5 h-5 ${i === 0 ? "text-cyan-300" : i === 1 ? "text-brand-300" : "text-rose-300"}`} />
                          </div>
                          <span className="text-sm font-bold text-white tracking-wide">{opt.label}</span>
                          <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${levelBadgeColors[opt.value] || "border-white/10 text-white/40"}`}>{badges[i]}</span>
                        </div>
                      </motion.button>
                    )
                  })}
                </div>
              )}
              {state.phase !== "inicio" && state.phase !== "nivel" && (
                <div className="flex flex-wrap gap-2">
                  {options.map((opt, i) => (
                    <motion.button key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={() => handleOptionClick(opt.value)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-teal-700/30 bg-gradient-to-b from-emerald-900/40 to-teal-950/40 backdrop-blur-sm text-sm font-medium text-slate-300 hover:border-emerald-500/30 hover:text-emerald-300 transition-all shadow-sm"
                    >
                      {opt.icon && <Shield className="w-4 h-4 text-emerald-400" />}{opt.label}
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {messages.length === 0 && options.length === 0 && !isThinking && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="relative mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                  <HeartHandshake className="h-8 w-8 text-emerald-400/50" />
                </div>
                <motion.div animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute -inset-1 rounded-2xl bg-emerald-400/5 blur-sm" />
              </div>
              <p className="text-sm text-slate-500 font-medium">Preparando el asistente...</p>
            </div>
          )}
        </div>
      </div>

      {/* Chat IA — responde autónomamente */}
      <AiChat state={state} />
    </div>
  )
}
