"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HeartHandshake, CheckCircle2, Send, Shield, Sparkles, RefreshCw, ArrowRight } from "lucide-react"
import { processInput, createInitialState, resetConversation } from "@/lib/config-assistant/engine"
import { deviceTypes } from "@/lib/config-assistant/types"
import type { AssistantResponse, ConversationState } from "@/lib/config-assistant/engine"
import type { ConfigStep } from "@/lib/config-assistant/types"

// ── Sub-components ──

function JarvisHeader({ device, onReset }: { device: string | null; onReset: () => void }) {
  return (
    <div className="relative overflow-hidden rounded-t-2xl bg-gradient-to-r from-brand-700 to-brand-500">
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.6) 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
      <div className="relative z-10 flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 shadow-sm">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white tracking-tight">Asistente Sentinel</h2>
              <span className="text-[8px] font-semibold px-1.5 py-0.5 rounded-full bg-white/15 text-white/70 border border-white/20">v2.0</span>
            </div>
            <p className="text-[11px] text-white/70">{device ? `Protegiendo ${device}` : "Aquí para ayudarte"}</p>
          </div>
        </div>
        <button onClick={onReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-[10px] font-medium text-white/60 hover:bg-white/20 hover:text-white/80 transition-all"
        >
          <RefreshCw className="w-3 h-3" /> Nuevo
        </button>
      </div>
    </div>
  )
}

function JarvisProgress({ current, total, phase }: { current: number; total: number; phase: string }) {
  const pct = total > 0 ? (current / total) * 100 : 0
  const phaseLabels: Record<string, string> = { inicio: "elige dispositivo", nivel: "elige nivel", pasos: "siguiendo pasos", resumen: "verificar", finalizado: "completado", "": "esperando" }
  return (
    <div className="px-5 py-2.5 border-b border-slate-100 bg-white/80">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[9px] font-semibold text-brand-500/70 uppercase tracking-wider">{phaseLabels[phase] || phase}</span>
        <span className="text-[9px] font-mono text-slate-400">{String(current).padStart(2, '0')}/{String(total).padStart(2, '0')}</span>
      </div>
      <div className="h-1.5 rounded-full bg-brand-100 overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-400 shadow-sm shadow-brand-500/20" />
      </div>
    </div>
  )
}

function JarvisStepCard({ step, numero, total }: { step: ConfigStep; numero: number; total: number }) {
  const instrucciones = step.descripcion ? step.descripcion.split("\n").filter(Boolean) : []
  const ipPattern = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g
  const dnsIps: string[] = []
  instrucciones.forEach(line => {
    const trimmed = line.trim()
    if (trimmed.match(/^[1-9]️⃣/)) {
      const ips = trimmed.match(ipPattern)
      if (ips) dnsIps.push(...ips)
    }
  })
  const hasDnsInfo = dnsIps.length > 0
  const filteredLines = instrucciones.filter(line => !line.trim().match(/^[1-9]️⃣/))

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-100 text-brand-600 text-[11px] font-bold">{String(numero).padStart(2, '0')}</div>
        <div>
          <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest">paso {numero}/{total}</p>
          <h3 className="text-sm font-bold text-slate-900">{step.titulo}</h3>
        </div>
      </div>

      {hasDnsInfo && (
        <div className="mb-4 p-3 rounded-xl bg-brand-50 border border-brand-200 shadow-sm">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-brand-600 mb-2">🌐 Servidores DNS</p>
          <div className="flex flex-wrap gap-2">
            {dnsIps.map((ip) => (
              <code key={ip} className="text-[12px] font-mono text-brand-700 bg-brand-100 border border-brand-200 px-2.5 py-1 rounded-md">{ip}</code>
            ))}
          </div>
        </div>
      )}

      {filteredLines.length > 0 && (
        <div className="space-y-2 mb-3">
          {filteredLines.map((line, i) => {
            const trimmed = line.trim()
            return (
              <div key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-success-500 mt-0.5 shrink-0" />
                <span className="text-[13px] text-slate-700 leading-relaxed">{trimmed}</span>
              </div>
            )
          })}
        </div>
      )}

      {step.notas && step.notas.length > 0 && (
        <div className="mt-2 p-3 rounded-lg bg-amber-50 border border-amber-100">
          <p className="text-[9px] font-medium text-amber-600/70 mb-1.5">💡 Nota</p>
          {step.notas.map((n, i) => <p key={i} className="text-[12px] text-amber-800 mb-1 last:mb-0">{n}</p>)}
        </div>
      )}
      {step.advertencia && (
        <div className="mt-2 p-3 rounded-lg bg-red-50 border border-red-100">
          <p className="text-[12px] text-red-700">⚠️ {step.advertencia}</p>
        </div>
      )}
    </motion.div>
  )
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
    setAiMessages(prev => [...prev, { role: "user" as const, content: text }])
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

      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: text }], system }),
      })
      const data = await res.json()
      console.log("[Sentinel AI] API response:", JSON.stringify(data))
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
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  return (
    <div className="mt-4 rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50">
        <Sparkles className="w-4 h-4 text-brand-500" />
        <span className="text-xs font-semibold text-slate-700">Chat IA — Pregúntame lo que quieras</span>
      </div>
      <div ref={chatRef} className="h-56 overflow-y-auto px-4 py-3 space-y-3">
        {aiMessages.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Sparkles className="w-8 h-8 text-slate-300 mb-2" />
            <p className="text-xs text-slate-400">Pregúntame sobre protección digital, DNS, controles parentales...</p>
          </div>
        )}
        {aiMessages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] rounded-xl px-3.5 py-2 text-sm leading-relaxed ${
              msg.role === "user"
                ? "bg-brand-600 text-white rounded-br-sm"
                : "bg-slate-100 text-slate-700 rounded-bl-sm"
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
        <input
          type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
          placeholder="Escribe tu pregunta..."
          className="flex-1 px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-brand-300 focus:ring-1 focus:ring-brand-200 transition-all"
        />
        <button onClick={handleSend} disabled={!input.trim() || loading}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white hover:bg-brand-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
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
  const [debugInfo, setDebugInfo] = useState("")
  const stateRef = useRef(state)
  stateRef.current = state
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, options, steps, isThinking])

  useEffect(() => {
    if (isFirstMessage) {
      setIsFirstMessage(false)
      setIsThinking(true)
      setTimeout(() => {
        const freshState = createInitialState()
        const response = processInput(freshState, "")
        applyResponseFromState(freshState, response)
        setIsThinking(false)
      }, 300)
    }
  }, [isFirstMessage])

  const applyResponseFromState = (currentState: ConversationState, response: AssistantResponse) => {
    setState(currentState)
    if (response.message) setMessages(prev => [...prev, { text: response.message, isUser: false }])
    setOptions(response.options ?? [])
    setCurrentStepIdx(response.state.currentStepIndex)
    if (response.steps) {
      setSteps(response.steps)
      const firstStep = response.steps[0]
      setDebugInfo(`Config: ${currentState.device} / ${currentState.network} / ${currentState.level} → ${firstStep?.titulo || "sin pasos"}`)
    } else if (response.phase !== "pasos" && response.phase !== "resumen") {
      setSteps([])
      setDebugInfo(`Fase: ${response.phase} / Device: ${currentState.device} / Level: ${currentState.level}`)
    }
    if (response.progress) setProgress(response.progress)
  }

  const handleOptionClick = (value: string) => {
    const label = options.find(o => o.value === value)?.label || value
    setMessages(prev => [...prev, { text: label, isUser: true }])
    setOptions([])
    setIsThinking(true)

    // Use latest state via ref to avoid stale closure
    const currentState: ConversationState = JSON.parse(JSON.stringify(stateRef.current))
    
    if (value === "__reset__") {
      setMessages([]); setOptions([]); setSteps([]); setCurrentStepIdx(-1)
      const freshState = createInitialState()
      const response = processInput(freshState, "")
      applyResponseFromState(freshState, response)
      setIsThinking(false); return
    }
    
    const response = processInput(currentState, value)
    applyResponseFromState(currentState, response)
    setIsThinking(false)
  }

  const levelColors = ["border-cyan-200 bg-cyan-50 text-cyan-700", "border-brand-200 bg-brand-50 text-brand-700", "border-rose-200 bg-rose-50 text-rose-700"]
  const levelBadges = ["+15 AÑOS", "7-14 AÑOS", "0-12 AÑOS"]
  const levelShieldColors = ["text-cyan-600", "text-brand-600", "text-rose-600"]

  return (
    <div>
      {/* Configurador */}
      <div className="flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
        <JarvisHeader device={state.device} onReset={() => { setMessages([]); setOptions([]); setSteps([]); setCurrentStepIdx(-1); const s = createInitialState(); applyResponseFromState(s, processInput(s, "")) }} />
        <JarvisProgress current={progress.current} total={progress.total} phase={state.phase} />
        {debugInfo && <div className="px-4 py-1.5 bg-amber-50 border-b border-amber-200 text-[10px] font-mono text-amber-700 truncate">{debugInfo}</div>}

        <div ref={scrollRef} className="overflow-y-auto px-5 py-5 space-y-4 max-h-[500px] md:max-h-[550px] scroll-smooth">
          <AnimatePresence mode="popLayout">
            {messages.map((msg, i) => (
              msg.isUser ? (
                <motion.div key={`msg-${i}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex justify-end">
                  <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-brand-600 text-white text-sm font-medium shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-white/70" />{msg.text}
                  </div>
                </motion.div>
              ) : (
                <motion.div key={`msg-${i}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-100">
                      <Shield className="h-3.5 w-3.5 text-brand-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-semibold text-brand-600 mb-1.5">Asistente Sentinel</p>
                      <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line [&_strong]:text-slate-900 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:bg-brand-50 [&_code]:text-[11px] [&_code]:font-medium [&_code]:text-brand-700">{msg.text}</div>
                    </div>
                  </div>
                </motion.div>
              )
            ))}

            {isThinking && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100">
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                  <span className="text-[10px] font-medium text-slate-500 ml-1">Pensando...</span>
                </div>
              </motion.div>
            )}

            {steps.length > 0 && currentStepIdx >= 0 && currentStepIdx < steps.length && !isThinking && (
              <motion.div key="steps" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <JarvisStepCard step={steps[currentStepIdx]} numero={currentStepIdx + 1} total={steps.length} />
                <div className="flex items-center justify-center gap-1.5 mt-3">
                  {steps.map((_, i) => (
                    <button key={i} onClick={() => { if (i !== currentStepIdx) { setIsThinking(true); const s = JSON.parse(JSON.stringify(stateRef.current)); setTimeout(() => { applyResponseFromState(s, processInput(s, `__ir_a_${i}__`)); setIsThinking(false) }, 200) } }}
                      className={`cursor-pointer rounded-full transition-all duration-500 ${i <= currentStepIdx ? "w-6 h-1.5 bg-brand-400" : "w-1.5 h-1.5 bg-slate-300 hover:bg-slate-400"}`}
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
                  {options.map((opt, i) => (
                    <motion.button key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                      whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} onClick={() => handleOptionClick(opt.value)}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl border border-slate-200 bg-white hover:border-brand-300 hover:shadow-sm transition-all text-center group"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 group-hover:bg-brand-100 transition-all">
                        <Shield className="w-5 h-5 text-brand-400 group-hover:text-brand-600" />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-700 group-hover:text-brand-700 transition-colors">{opt.label}</span>
                      {opt.desc && <span className="text-[9px] text-slate-400 line-clamp-2">{opt.desc}</span>}
                    </motion.button>
                  ))}
                </div>
              )}
              {state.phase === "nivel" && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {options.map((opt, i) => (
                    <motion.button key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                      whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={() => handleOptionClick(opt.value)}
                      className={`relative overflow-hidden p-4 rounded-xl border-2 ${levelColors[i]} text-center group transition-all duration-300 hover:shadow-sm`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Shield className={`w-5 h-5 ${levelShieldColors[i]}`} />
                        <span className="text-sm font-bold text-slate-800">{opt.label}</span>
                        <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-white/80 border border-inherit text-inherit">{levelBadges[i]}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
              {state.phase !== "inicio" && state.phase !== "nivel" && (
                <div className="flex flex-wrap gap-2">
                  {options.map((opt, i) => (
                    <motion.button key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={() => handleOptionClick(opt.value)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:border-brand-300 hover:text-brand-700 hover:shadow-sm transition-all"
                    >
                      {opt.label} <ArrowRight className="w-3.5 h-3.5" />
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {messages.length === 0 && options.length === 0 && !isThinking && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 mb-4">
                <Shield className="h-8 w-8 text-brand-300" />
              </div>
              <p className="text-sm text-slate-500 font-medium">Preparando el asistente...</p>
            </div>
          )}
        </div>
      </div>

      <AiChat state={state} />
    </div>
  )
}
