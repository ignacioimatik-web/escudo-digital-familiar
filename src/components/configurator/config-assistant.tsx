"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Shield, Smartphone, Monitor, Router, Globe, Tv, Tablet, Gamepad2, BookOpen,
  Wifi, Send, Sparkles, CheckCircle2, ChevronRight,
  MessageCircle, Zap, RefreshCw, Circle, Hexagon, HeartHandshake
} from "lucide-react"
import type { DeviceType, NetworkContext, ConfigStep } from "@/lib/config-assistant/types"
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

const levelIcons: Record<string, React.ElementType> = {
  basico: Shield,
  recomendado: Shield,
  avanzado: Shield,
}

const levelGlowColors: Record<string, string> = {
  basico: "from-cyan-500/30 to-blue-600/30 border-cyan-500/30 shadow-cyan-500/10",
  recomendado: "from-brand-500/30 to-purple-600/30 border-brand-500/30 shadow-brand-500/10",
  avanzado: "from-rose-500/30 to-amber-600/30 border-rose-500/30 shadow-rose-500/10",
}

const levelBadgeColors: Record<string, string> = {
  basico: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  recomendado: "bg-brand-500/20 text-brand-300 border-brand-500/30",
  avanzado: "bg-rose-500/20 text-rose-300 border-rose-500/30",
}

function JarvisHeader({ device, onReset }: { device: DeviceType | null; onReset: () => void }) {
  return (
    <div className="relative overflow-hidden rounded-t-2xl bg-gradient-to-r from-emerald-700 via-teal-600 to-cyan-700 border-b border-teal-500/20">
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-tr from-emerald-400/10 via-teal-400/5 to-cyan-400/10"
        />
      </div>
      <div className="relative z-10 flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-500/30">
              <HeartHandshake className="h-5 w-5 text-white" />
            </div>
            <motion.div
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="absolute -inset-0.5 rounded-xl bg-emerald-400/20 blur-sm -z-10"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold text-white tracking-wide">Asistente Sentinel</p>
              <span className="text-[8px] font-medium text-teal-200/70 bg-white/10 px-1.5 py-0.5 rounded">v2.0</span>
            </div>
            <p className="text-[10px] text-teal-100/70">
              {device
                ? `Protegiendo ${deviceTypes.find(d => d.id === device)?.label?.toLowerCase() || "tu dispositivo"}`
                : "Aquí para ayudarte con la protección digital"}
            </p>
          </div>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-medium text-teal-200/70 bg-white/5 hover:bg-white/10 hover:text-white transition-all"
        >
          <RefreshCw className="w-3 h-3" />
          EMPEZAR DE NUEVO
        </button>
      </div>
    </div>
  )
}

function JarvisProgress({ current, total, phase }: { current: number; total: number; phase: string }) {
  const pct = total > 0 ? (current / total) * 100 : 0
  const phaseLabels: Record<string, string> = {
    inicio: "Empecemos",
    contexto: "¿Dónde se conecta?",
    nivel: "Nivel de protección",
    pasos: "Pasos a seguir",
    resumen: "Verificación final",
    finalizado: "¡Completado!",
  }
  return (
    <div className="px-5 py-2.5 border-b border-teal-500/10 bg-gradient-to-r from-emerald-900/30 to-teal-900/30">
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 shadow-sm shadow-teal-500/30"
          />
        </div>
        <span className="text-[10px] font-medium text-teal-300/70 tabular-nums shrink-0">
          {pct.toFixed(0)}%
        </span>
        <span className="text-[9px] font-medium text-teal-400/60 tracking-wide shrink-0 hidden sm:block">
          {phaseLabels[phase] || phase}
        </span>
      </div>
    </div>
  )
}

function JarvisGlowButton({ label, desc, icon, onClick, glowColor, badgeLabel }: {
  label: string; desc?: string; icon?: string; onClick: () => void; glowColor?: string; badgeLabel?: string
}) {
  const IconComponent = icon ? iconMap[icon] : undefined
  const glow = glowColor || "from-cyan-500/20 to-blue-600/20 border-cyan-500/30"
  return (
    <motion.button
      whileHover={{ y: -1, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`group relative overflow-hidden w-full text-left px-4 py-3.5 rounded-xl bg-gradient-to-br ${glow} backdrop-blur-sm border transition-all duration-300`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative z-10 flex items-center gap-3">
        {IconComponent && (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/10">
            <IconComponent className="w-4.5 h-4.5 text-white/80" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white tracking-wide">{label}</span>
            {badgeLabel && (
              <span className="text-[8px] font-mono px-1.5 py-0.5 rounded border bg-white/5 text-white/50 border-white/10">{badgeLabel}</span>
            )}
          </div>
          {desc && <span className="text-[11px] text-white/40 mt-0.5 block leading-tight">{desc}</span>}
        </div>
        <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors shrink-0" />
      </div>
    </motion.button>
  )
}

function JarvisStepCard({ step, numero, total }: { step: ConfigStep; numero: number; total: number }) {
  // Split description into individual instruction lines
  const instrucciones = step.descripcion.split("\n").filter(Boolean)

  // Extract DNS provider info from description lines
  const dnsIps: string[] = []
  const ipPattern = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g
  const dnsLines: string[] = []
  instrucciones.forEach((line) => {
    if (/^[1-3]️⃣/.test(line.trim())) {
      const ips = line.match(ipPattern)
      if (ips) ips.forEach(ip => { if (!dnsIps.includes(ip)) dnsIps.push(ip) })
      dnsLines.push(line)
    }
  })
  const hasDnsInfo = dnsIps.length > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="relative overflow-hidden rounded-xl border border-emerald-700/20 bg-gradient-to-br from-emerald-950/60 to-teal-950/60 backdrop-blur-sm p-5"
    >
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
            {String(numero).padStart(2, '0')}
          </div>
          <span className="text-[10px] font-medium text-emerald-400/60 tracking-wide">PASO {numero}/{total}</span>
        </div>
        <h4 className="text-sm font-bold text-white mb-3 tracking-wide">{step.titulo}</h4>

        {/* Checklist items */}
        <div className="space-y-2 mb-4">
          {instrucciones.map((linea, i) => {
            const trimmed = linea.trim()
            // Skip blank lines
            if (!trimmed) return null
            // Detect DNS IP lines (1️⃣, 2️⃣) — skip, rendered in DNS card below
            if (/^[1-3]️⃣/.test(trimmed)) return null
            // Detect sub-header lines
            const esSubTitulo = trimmed.startsWith("**") && trimmed.endsWith("**")

            return (
              <div key={i} className="flex items-start gap-2.5">
                {/* Checkbox bullet */}
                <div className="flex h-4 w-4 shrink-0 mt-0.5 items-center justify-center rounded-full border border-emerald-500/40">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </div>
                <span className={`text-[13px] leading-relaxed ${
                  esSubTitulo ? "text-white font-semibold text-sm" : "text-slate-200"
                }`}>
                  {trimmed}
                </span>
              </div>
            )
          })}
        </div>

        {/* DNS Provider Card — prominent */}
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

        {/* Tips section — renamed from "Consejo" */}
        {step.notas && step.notas.length > 0 && (
          <div className="mt-2 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
            <p className="text-[9px] font-medium tracking-wide text-emerald-400/60 mb-1.5">💡 Nota</p>
            {step.notas.map((n, i) => (
              <p key={i} className="text-[12px] text-slate-400 mb-1 last:mb-0">{n}</p>
            ))}
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

export function ConfigAssistant() {
  const [state, setState] = useState<ConversationState>(createInitialState)
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([])
  const [options, setOptions] = useState<{ value: string; label: string; icon?: string; desc?: string }[]>([])
  const [steps, setSteps] = useState<ConfigStep[]>([])
  const [currentStepIdx, setCurrentStepIdx] = useState(-1)
  const [progress, setProgress] = useState({ current: 0, total: 3 })
  const [inputText, setInputText] = useState("")
  const [isFirstMessage, setIsFirstMessage] = useState(true)
  const [isThinking, setIsThinking] = useState(false)
  const aiEnabled = true // Use BigPickle for natural responses
  const scrollRef = useRef<HTMLDivElement>(null)

  // Call the AI API to enhance or generate responses
  const callAI = async (userInput: string, engineResponse: AssistantResponse): Promise<string> => {
    if (!aiEnabled) return engineResponse.message

    try {
      const conv = [
        { role: "user", content: userInput || "(inicio de conversación)" },
      ]
      
      const systemPrompt = `Eres el Asistente Sentinel, un experto en protección digital infantil. 
Tu tono es cercano, amable y muy claro. Explicas cosas técnicas de forma sencilla.

Contexto actual:
- Dispositivo: ${state.device || "ninguno"}
- Nivel: ${state.level || "ninguno"}
- Fase: ${state.phase}
- Opciones disponibles: ${(engineResponse.options || []).map(o => o.label).join(", ")}

Responde de forma natural y amable. Si el usuario pregunta algo que no sabes, sé honesto.
No uses jerga técnica sin explicarla. Mantén las respuestas concisas pero cálidas.`

      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conv, system: systemPrompt }),
      })
      const data = await res.json()
      if (data.response) return data.response
    } catch (e) {
      console.warn("AI call failed, using engine response")
    }
    return engineResponse.message
  }

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
      }, 600)
    }
  }, [isFirstMessage])

  const applyResponse = async (response: AssistantResponse, userInput?: string) => {
    // Enhance message with AI
    const enhancedMessage = response.message ? await callAI(userInput || "", response) : ""
    setState(response.state)
    if (enhancedMessage) {
      setMessages(prev => [...prev, { text: enhancedMessage, isUser: false }])
    }
    setOptions(response.options ?? [])
    // Always sync step index from engine state
    setCurrentStepIdx(response.state.currentStepIndex)
    if (response.steps) {
      setSteps(response.steps)
    } else if (response.phase !== "pasos" && response.phase !== "resumen") {
      setSteps([])
    }
    if (response.progress) setProgress(response.progress)
  }

  const handleOptionClick = async (value: string) => {
    const label = options.find(o => o.value === value)?.label || value
    setMessages(prev => [...prev, { text: label, isUser: true }])
    setOptions([])
    setIsThinking(true)
    
    if (value === "__reset__") {
      setMessages([])
      setOptions([])
      setSteps([])
      setCurrentStepIdx(-1)
      const response = resetConversation()
      await applyResponse(response, "")
      setIsThinking(false)
      return
    }
    const response = processInput(state, value)
    await applyResponse(response, label)
    setIsThinking(false)
  }

  const handleTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const text = inputText.trim()
    if (!text) return
    setMessages(prev => [...prev, { text, isUser: true }])
    setInputText("")
    setIsThinking(true)
    const response = processInput(state, text)
    await applyResponse(response, text)
    setIsThinking(false)
  }

  const handleReset = async () => {
    setMessages([])
    setOptions([])
    setSteps([])
    setCurrentStepIdx(-1)
    const response = resetConversation()
    await applyResponse(response, "")
  }

  return (
    <div className="flex flex-col bg-slate-950 rounded-2xl overflow-hidden border border-teal-500/20 shadow-2xl shadow-teal-500/5">
      <JarvisHeader device={state.device} onReset={handleReset} />
      <JarvisProgress current={progress.current} total={progress.total} phase={state.phase} />

      {/* Content */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5 space-y-4 max-h-[500px] md:max-h-[550px] scroll-smooth"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.03) 0%, transparent 60%)`,
        }}
      >
        <AnimatePresence mode="popLayout">
          {messages.map((msg, i) => (
            msg.isUser ? (
              <motion.div key={`msg-${i}`}
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                className="flex justify-end"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-medium shadow-lg shadow-emerald-500/10 border border-emerald-400/20 backdrop-blur-sm">
                  <CheckCircle2 className="w-4 h-4 text-cyan-300" />
                  {msg.text}
                </div>
              </motion.div>
            ) : (
              <motion.div key={`msg-${i}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-emerald-700/30 bg-gradient-to-br from-emerald-900/30 to-teal-900/20 backdrop-blur-sm p-4 shadow-lg"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <HeartHandshake className="h-3.5 w-3.5 text-emerald-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-medium text-emerald-400/60 mb-1.5">Asistente Sentinel</p>
                    <div className="text-sm text-slate-200 leading-relaxed whitespace-pre-line [&_strong]:text-white [&_strong]:font-semibold [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:bg-emerald-500/10 [&_code]:text-[11px] [&_code]:font-medium [&_code]:text-emerald-300">
                      {msg.text}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          ))}

          {/* Thinking indicator */}
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

          {/* Steps */}
          {steps.length > 0 && currentStepIdx >= 0 && currentStepIdx < steps.length && !isThinking && (
            <motion.div key="steps" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <JarvisStepCard step={steps[currentStepIdx]} numero={currentStepIdx + 1} total={steps.length} />
              <div className="flex items-center justify-center gap-1.5 mt-3">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (i !== currentStepIdx) {
                        setMessages(prev => [...prev, { text: `Ir al paso ${i + 1}`, isUser: true }])
                        setIsThinking(true)
                        setTimeout(() => {
                          const response = processInput(state, `__ir_a_${i}__`)
                          applyResponse(response)
                          setIsThinking(false)
                        }, 300)
                      }
                    }}
                    className={`cursor-pointer rounded-full transition-all duration-500 ${
                      i <= currentStepIdx
                        ? "w-6 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 shadow-sm shadow-emerald-500/30"
                        : "w-1.5 h-1.5 bg-slate-700 hover:bg-slate-500"
                    } ${i < currentStepIdx ? "hover:opacity-80" : ""}`}
                    title={`Ir al paso ${i + 1}`}
                    aria-label={`Ir al paso ${i + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Options */}
        {options.length > 0 && !isThinking && (
          <motion.div
            key={`options-${state.phase}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2 pt-1"
          >
            {/* Device grid */}
            {(state.phase === "inicio") && (
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
                      className="flex flex-col items-center gap-2 p-3 rounded-xl border border-teal-700/30 bg-gradient-to-b from-emerald-900/40 to-teal-950/40 backdrop-blur-sm hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all text-center group"
                    >
                      {Icon && (
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/5 border border-emerald-500/10 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 transition-all">
                          <Icon className="w-5 h-5 text-emerald-400/70 group-hover:text-emerald-300" />
                        </div>
                      )}
                      <span className="text-[11px] font-semibold text-slate-300 leading-tight group-hover:text-white transition-colors">{opt.label}</span>
                      {opt.desc && <span className="text-[9px] text-slate-500 line-clamp-2">{opt.desc}</span>}
                    </motion.button>
                  )
                })}
              </div>
            )}

            {/* Level selection */}
            {state.phase === "nivel" && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {options.map((opt, i) => {
                  const colors = ["from-cyan-500/20 to-blue-600/20 border-cyan-500/30", "from-brand-500/20 to-purple-600/20 border-brand-500/30", "from-rose-500/20 to-amber-600/20 border-rose-500/30"]
                  const badges = ["+15 ANOS", "7-14 ANOS", "0-12 ANOS"]
                  return (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleOptionClick(opt.value)}
                      className={`relative overflow-hidden p-4 rounded-xl bg-gradient-to-br ${colors[i]} backdrop-blur-sm border text-center group transition-all duration-300`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      <div className="relative z-10 flex flex-col items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/10 bg-white/5 group-hover:border-white/20 transition-all">
                          <Shield className={`w-5 h-5 ${i === 0 ? "text-cyan-300" : i === 1 ? "text-brand-300" : "text-rose-300"}`} />
                        </div>
                        <span className="text-sm font-bold text-white tracking-wide">{opt.label}</span>
                        <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${levelBadgeColors[opt.value] || "border-white/10 text-white/40"}`}>
                          {badges[i]}
                        </span>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            )}

            {/* Action buttons */}
            {state.phase !== "inicio" && state.phase !== "nivel" && (
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
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-teal-700/30 bg-gradient-to-b from-emerald-900/40 to-teal-950/40 backdrop-blur-sm text-sm font-medium text-slate-300 hover:border-emerald-500/30 hover:text-emerald-300 transition-all shadow-sm"
                  >
                    {opt.icon && <Shield className="w-4 h-4 text-emerald-400" />}
                    {opt.label}
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Empty / thinking states */}
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

      {/* Input */}
      <form onSubmit={handleTextSubmit} className="flex items-center gap-2 p-4 border-t border-teal-500/10 bg-gradient-to-r from-emerald-950/80 to-teal-950/80">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Cuéntame sobre tu dispositivo..."
          className="flex-1 px-4 py-2.5 rounded-lg bg-white/5 border border-teal-700/30 text-sm text-white placeholder:text-teal-400/30 focus:outline-none focus:border-teal-500/40 focus:ring-1 focus:ring-teal-500/10 transition-all"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-400 hover:to-teal-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/20"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  )
}
