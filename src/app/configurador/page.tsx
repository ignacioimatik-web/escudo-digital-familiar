"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ListChecks, Sparkles, ArrowLeft } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import { ConversationalAssistant } from "@/components/configurator/conversational-assistant"
import { ConfiguratorWizard } from "@/components/configurator/configurator-wizard"
import { DnsComparator } from "@/components/configurator/dns-comparator"

type Mode = "chat" | "wizard" | "dns"

export default function ConfiguradorPage() {
  const [mode, setMode] = useState<Mode>("chat")

  return (
    <>
      <Section className="relative overflow-hidden pb-6">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/40 via-background to-background" />
        <Container size="md">
          <div className="flex items-center justify-between">
            <div>
              <Badge variant="default" className="mb-4">Configurador</Badge>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-2">
                Protege tus dispositivos
              </h1>
              <p className="text-base text-slate-500 leading-relaxed max-w-xl">
                Cuéntame tu situación y te guío paso a paso.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <ModeButton active={mode === "chat"} label="Asistente" icon={<Sparkles className="w-4 h-4" />} onClick={() => setMode("chat")} />
              <ModeButton active={mode === "wizard"} label="Rápido" icon={<ListChecks className="w-4 h-4" />} onClick={() => setMode("wizard")} />
              <ModeButton active={mode === "dns"} label="DNS" icon={<Sparkles className="w-4 h-4" />} onClick={() => setMode("dns")} />
            </div>
          </div>
          {/* Mobile mode tabs */}
          <div className="flex sm:hidden gap-2 mt-4">
            <ModeButton active={mode === "chat"} label="Asistente" icon={<Sparkles className="w-4 h-4" />} onClick={() => setMode("chat")} compact />
            <ModeButton active={mode === "wizard"} label="Rápido" icon={<ListChecks className="w-4 h-4" />} onClick={() => setMode("wizard")} compact />
            <ModeButton active={mode === "dns"} label="DNS" icon={<Sparkles className="w-4 h-4" />} onClick={() => setMode("dns")} compact />
          </div>
        </Container>
      </Section>

      <AnimatePresence mode="wait">
        {mode === "chat" && (
          <motion.div key="chat" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            <Section className="-mt-[200px] pt-0">
              <Container size="sm" className="mt-[160px]">
                <ConversationalAssistant />
              </Container>
            </Section>
          </motion.div>
        )}

        {mode === "wizard" && (
          <motion.div key="wizard" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            <Section className="-mt-[200px] pt-0">
              <Container size="md" className="mt-[160px]">
                <div className="flex items-center gap-2 mb-6">
                  <button onClick={() => setMode("chat")} className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Volver al asistente
                  </button>
                </div>
                <ConfiguratorWizard />
              </Container>
            </Section>
          </motion.div>
        )}

        {mode === "dns" && (
          <motion.div key="dns" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            <Section className="-mt-[200px] pt-0">
              <Container size="md" className="mt-[160px]">
                <div className="flex items-center gap-2 mb-6">
                  <button onClick={() => setMode("chat")} className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Volver al asistente
                  </button>
                </div>
                <DnsComparator />
              </Container>
            </Section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function ModeButton({ active, label, icon, onClick, compact }: {
  active: boolean; label: string; icon: React.ReactNode; onClick: () => void; compact?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-xl font-semibold transition-all ${
        active
          ? "bg-brand-600 text-white shadow-sm"
          : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:shadow-sm"
      } ${compact ? "px-3 py-1.5 text-[11px]" : "px-3.5 py-2 text-xs"}`}
    >
      {icon}
      {label}
    </button>
  )
}
