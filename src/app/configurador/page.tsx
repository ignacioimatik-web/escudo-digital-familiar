"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, ListChecks, ArrowRight, Sparkles } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import { ConfigAssistant } from "@/components/configurator/config-assistant"
import { ConfiguratorWizard } from "@/components/configurator/configurator-wizard"
import { DnsComparator } from "@/components/configurator/dns-comparator"

export default function ConfiguradorPage() {
  const [mode, setMode] = useState<"select" | "assistant" | "wizard" | "dns">("select")

  return (
    <>
      <Section className="relative overflow-hidden pb-8 md:pb-10">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/40 via-background to-background" />
        <Container size="md">
          <Badge variant="default" className="mb-6">Configurador</Badge>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-3">
            Protege tus dispositivos
          </h1>
          <p className="text-base text-slate-500 leading-relaxed max-w-2xl">
            Te guiamos paso a paso para configurar la protección DNS en cualquier dispositivo.
          </p>
        </Container>
      </Section>

      {mode === "select" && (
        <Section className="-mt-[300px] pt-0">
          <Container size="md" className="mt-[200px]">
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <motion.button
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setMode("assistant")}
                className="relative rounded-2xl border-2 border-brand-200 bg-white p-6 text-left hover:border-brand-400 hover:shadow-lg transition-all group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 mb-4 group-hover:bg-brand-200 transition-colors">
                  <MessageCircle className="h-6 w-6 text-brand-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2 flex items-center gap-2">
                  Asistente IA
                  <Sparkles className="h-4 w-4 text-accent-500" />
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Guiado paso a paso. Te hago preguntas, me respondes y te doy las instrucciones exactas para tu caso.
                </p>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-brand-600">
                  Iniciar <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </motion.button>

              <motion.button
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setMode("wizard")}
                className="relative rounded-2xl border border-slate-200 bg-white p-6 text-left hover:border-slate-300 hover:shadow-md transition-all group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 mb-4 group-hover:bg-slate-200 transition-colors">
                  <ListChecks className="h-6 w-6 text-slate-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Rápido
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Selecciona dispositivo, contexto y nivel. Obtén los pasos directamente.
                </p>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-brand-600">
                  Ir <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </motion.button>

              <motion.button
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setMode("dns")}
                className="relative rounded-2xl border border-slate-200 bg-white p-6 text-left hover:border-slate-300 hover:shadow-md transition-all group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100 mb-4 group-hover:bg-cyan-200 transition-colors">
                  <Sparkles className="h-6 w-6 text-cyan-500" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Comparar DNS
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Compara todos los proveedores DNS gratuitos y de pago para elegir el mejor.
                </p>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-brand-600">
                  Ver <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </motion.button>
            </div>

            <div className="text-center">
              <button
                onClick={() => setMode("assistant")}
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-brand-600 px-8 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:bg-brand-700 hover:shadow-xl"
              >
                <MessageCircle className="h-4 w-4" />
                Iniciar asistente inteligente
              </button>
            </div>
          </Container>
        </Section>
      )}

      {mode === "assistant" && (
        <Section className="-mt-[300px] pt-0">
          <Container size="md" className="mt-[100px]">
            <div className="mb-4 flex items-center justify-between">
              <button
                onClick={() => setMode("select")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-500 transition-all"
              >
                ← Volver al menú
              </button>
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600/10 border border-cyan-500/20 text-xs font-mono text-cyan-400/70 hover:text-cyan-300 hover:border-cyan-500/40 transition-all"
              >
                ↻ REINICIAR
              </button>
            </div>
            <div className="rounded-2xl border border-cyan-500/20 bg-slate-950 shadow-2xl shadow-cyan-500/5 overflow-hidden">
              <ConfigAssistant />
            </div>
          </Container>
        </Section>
      )}

      {mode === "wizard" && (
        <Section className="-mt-[300px] pt-0">
          <Container size="md" className="mt-[100px]">
            <div className="mb-4">
              <button
                onClick={() => setMode("select")}
                className="text-sm text-slate-500 hover:text-slate-700 flex items-center gap-1.5 transition-colors"
              >
                ← Volver al menú
              </button>
            </div>
            <ConfiguratorWizard />
          </Container>
        </Section>
      )}

      {mode === "dns" && (
        <Section className="-mt-[300px] pt-0">
          <Container size="md" className="mt-[100px]">
            <div className="mb-4">
              <button
                onClick={() => setMode("select")}
                className="text-sm text-slate-500 hover:text-slate-700 flex items-center gap-1.5 transition-colors"
              >
                ← Volver al menú
              </button>
            </div>
            <DnsComparator />
          </Container>
        </Section>
      )}
    </>
  )
}
