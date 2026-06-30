"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, RotateCcw, ChevronDown, Shield, Wifi, Smartphone, Monitor, Router, Globe, Tv, Tablet, Gamepad2, BookOpen, Send, ArrowLeft } from "lucide-react"
import type { DeviceType, NetworkContext, ProtectionLevel, ConfigStep } from "@/lib/config-assistant/types"
import { deviceTypes, networkContexts } from "@/lib/config-assistant/types"
import { processInput, createInitialState, resetConversation } from "@/lib/config-assistant/engine"
import type { ConversationState, AssistantResponse } from "@/lib/config-assistant/engine"

const iconMap: Record<string, React.ElementType> = {
  Smartphone, Monitor, Router, Globe, Tv, Tablet, Gamepad2, BookOpen, Wifi, Send, Shield, MessageCircle,
}

interface ChatMessageProps {
  message: string
  isUser: boolean
}

function ChatMessage({ message, isUser }: ChatMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? "bg-brand-600 text-white rounded-br-md"
            : "bg-slate-100 text-slate-700 rounded-bl-md"
        }`}
      >
        <div className="prose prose-sm max-w-none prose-p:my-1 prose-strong:text-inherit">
          {message.split("\n").map((line, i) => (
            <p key={i} className={line.startsWith("|") ? "font-mono text-xs" : ""}>
              {line.startsWith("- ") || line.startsWith("**") ? (
                <span dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/`(.*?)`/g, "<code class='bg-slate-200/50 px-1 rounded text-xs'>$1</code>") }} />
              ) : (
                <span dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/`(.*?)`/g, "<code class='bg-slate-200/50 px-1 rounded text-xs'>$1</code>") }} />
              )}
            </p>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

interface OptionButtonProps {
  value: string
  label: string
  icon?: string
  onClick: (value: string) => void
}

function OptionButton({ value, label, icon, onClick }: OptionButtonProps) {
  const IconComponent = icon ? iconMap[icon] : undefined
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(value)}
      className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 font-medium hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 transition-all shadow-sm"
    >
      {IconComponent && <IconComponent className="w-4 h-4 text-brand-500" />}
      {label}
    </motion.button>
  )
}

// ── Device Card Selector ────────────────────────────────────

const deviceIconMap: Record<string, React.ElementType> = {
  android: Smartphone,
  iphone: Smartphone,
  windows: Monitor,
  macos: Monitor,
  router: Router,
  navegador: Globe,
  "smart-tv": Tv,
  tablet: Tablet,
  chromebook: Monitor,
  consola: Gamepad2,
  kindle: BookOpen,
}

type Phase = "welcome" | "device" | "chat"

export function ConfigAssistant() {
  const [phase, setPhase] = useState<Phase>("welcome")
  const [state, setState] = useState<ConversationState>(createInitialState)
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([])
  const [options, setOptions] = useState<{ value: string; label: string; icon?: string }[]>([])
  const [steps, setSteps] = useState<ConfigStep[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [inputText, setInputText] = useState("")
  const [showSteps, setShowSteps] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, options])

  const handleAssistantResponse = (response: AssistantResponse) => {
    setMessages((prev) => [...prev, { text: response.message, isUser: false }])
    setOptions(response.options ?? [])
    if (response.steps) {
      setSteps(response.steps)
      setCurrentStep(0)
    }
    setState(response.state)
  }

  const startAssistant = () => {
    setPhase("chat")
    const response = processInput(createInitialState(), "")
    handleAssistantResponse(response)
  }

  const handleOptionClick = (value: string) => {
    if (value === "__reset__") {
      setMessages([])
      setOptions([])
      setSteps([])
      const response = resetConversation()
      handleAssistantResponse(response)
      return
    }

    setMessages((prev) => [...prev, { text: value, isUser: true }])

    let engineResponse: AssistantResponse

    if (value === "__siguiente__") {
      engineResponse = processInput(state, "__siguiente__")
    } else if (value === "__duda__") {
      engineResponse = processInput(state, "__duda__")
    } else if (value === "__ver_dns__") {
      engineResponse = processInput(state, "__ver_dns__")
    } else if (value === "__continuar__" || value === "__funciona__" || value === "__no_funciona__" || value === "__otro__" || value === "__fin__") {
      engineResponse = processInput(state, value)
    } else {
      // Regular value — could be device, network, or level
      engineResponse = processInput(state, value)
    }

    handleAssistantResponse(engineResponse)
  }

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const text = inputText.trim()
    if (!text) return

    setMessages((prev) => [...prev, { text, isUser: true }])
    setInputText("")

    const response = processInput(state, text)
    handleAssistantResponse(response)
  }

  // Welcome screen
  if (phase === "welcome") {
    return (
      <div className="flex flex-col items-center justify-center py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-lg mx-auto"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-100 mx-auto mb-6">
            <MessageCircle className="h-10 w-10 text-brand-600" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mb-4">
            Asistente de configuración
          </h2>
          <p className="text-slate-500 leading-relaxed mb-8">
            Te guío paso a paso para proteger los dispositivos de tu familia. 
            Solo dime qué tienes y te doy las instrucciones exactas para tu caso.
          </p>
          <button
            onClick={startAssistant}
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-brand-600 px-8 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:bg-brand-700 hover:shadow-xl"
          >
            <MessageCircle className="h-4 w-4" />
            Iniciar asistente
          </button>
          <p className="mt-4 text-xs text-slate-400">También puedes seleccionar un dispositivo directamente abajo</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-10 w-full max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4 text-center">
            O elige un dispositivo
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {deviceTypes.map((d) => {
              const Icon = deviceIconMap[d.id] || Smartphone
              return (
                <button
                  key={d.id}
                  onClick={() => {
                    setPhase("chat")
                    const freshState = createInitialState()
                    const response = processInput(freshState, d.label)
                    handleAssistantResponse(response)
                  }}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-200 bg-white hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 transition-all"
                >
                  <Icon className="w-6 h-6 text-brand-500" />
                  <span className="text-xs font-semibold text-slate-700">{d.label}</span>
                </button>
              )
            })}
          </div>
        </motion.div>
      </div>
    )
  }

  // Chat interface
  return (
    <div className="flex flex-col h-[600px] md:h-[650px]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-white rounded-t-2xl">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100">
            <MessageCircle className="h-4 w-4 text-brand-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Asistente Escudo Digital</p>
            <p className="text-xs text-slate-400">
              {state.device ? `${deviceTypes.find(d => d.id === state.device)?.label ?? ""}` : "Esperando..."}
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            setMessages([])
            setOptions([])
            setSteps([])
            const response = resetConversation()
            handleAssistantResponse(response)
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Nuevo
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-1 scroll-smooth">
        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg.text} isUser={msg.isUser} />
        ))}

        {/* Steps progress indicator */}
        {steps.length > 0 && state.phase === "mostrando-pasos" && (
          <div className="mb-4 p-3 rounded-xl bg-brand-50 border border-brand-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-brand-700">Progreso</span>
              <span className="text-xs text-brand-600 font-medium">
                Paso {state.currentStepIndex + 1} de {steps.length}
              </span>
            </div>
            <div className="flex gap-1">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-1.5 rounded-full ${
                    i <= state.currentStepIndex ? "bg-brand-500" : "bg-brand-200"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* DNS Comparison quick summary */}
        {state.phase === "mostrando-dns-compare" && (
          <div className="mb-4 overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="text-left p-2 border border-slate-200 font-semibold">Proveedor</th>
                  <th className="text-left p-2 border border-slate-200 font-semibold">DNS Primario</th>
                  <th className="text-left p-2 border border-slate-200 font-semibold">Bloqueo</th>
                  <th className="text-left p-2 border border-slate-200 font-semibold">Precio</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "DNS4.EU ⭐", ip: "91.239.100.101", filter: "✅ Familia", price: "Gratis" },
                  { name: "CleanBrowsing ⭐", ip: "185.228.168.168", filter: "✅ Familia", price: "Gratis" },
                  { name: "Cloudflare 1.1.1.3", ip: "1.1.1.3", filter: "✅ Familia", price: "Gratis" },
                  { name: "AdGuard Family", ip: "94.140.14.15", filter: "✅ Familia", price: "Gratis" },
                  { name: "CIRA Shield", ip: "149.112.121.30", filter: "✅ Familia", price: "Gratis" },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                    <td className="p-2 border border-slate-200 font-medium">{row.name}</td>
                    <td className="p-2 border border-slate-200 font-mono">{row.ip}</td>
                    <td className="p-2 border border-slate-200">{row.filter}</td>
                    <td className="p-2 border border-slate-200 text-success-600 font-medium">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Option buttons */}
        {options.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2 mb-1">
            {options.map((opt, i) => (
              <OptionButton
                key={i}
                value={opt.value}
                label={opt.label}
                icon={opt.icon}
                onClick={handleOptionClick}
              />
            ))}
          </div>
        )}

        {/* Show loading dots while waiting */}
        {options.length === 0 && state.phase !== "finalizado" && (
          <div className="flex gap-1.5 py-2">
            <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-2 h-2 rounded-full bg-brand-400" />
            <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} className="w-2 h-2 rounded-full bg-brand-400" />
            <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} className="w-2 h-2 rounded-full bg-brand-400" />
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleTextSubmit} className="flex items-center gap-2 p-4 border-t border-slate-200 bg-white rounded-b-2xl">
        <ArrowLeft className="w-4 h-4 text-slate-300 rotate-90" />
        <input
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Escribe tu respuesta aquí..."
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white hover:bg-brand-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  )
}
