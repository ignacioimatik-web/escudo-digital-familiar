"use client"

import { Shield, Printer, ArrowLeft, CheckSquare, Wifi, Smartphone, Eye, MessageCircle, RefreshCw } from "lucide-react"
import Link from "next/link"

const items = [
  {
    icon: Wifi,
    label: "DNS en el router",
    desc: "He cambiado los DNS del router por DNS4.EU o CleanBrowsing",
    color: "brand",
  },
  {
    icon: Smartphone,
    label: "DNS en cada dispositivo",
    desc: "He configurado DNS privado en Android o perfil DNS en iOS",
    color: "cyan",
  },
  {
    icon: Smartphone,
    label: "Control parental activado",
    desc: "Tengo Family Link (Android) o En Familia (iOS) configurado",
    color: "success",
  },
  {
    icon: Eye,
    label: "Límites de tiempo",
    desc: "He puesto límites diarios de uso y horarios de descanso",
    color: "brand",
  },
  {
    icon: Eye,
    label: "Filtros de contenido",
    desc: "He bloqueado contenido explícito y restrinjo compras",
    color: "accent",
  },
  {
    icon: MessageCircle,
    label: "Diálogo con mis hijos",
    desc: "He hablado con ellos sobre por qué hemos puesto estas protecciones",
    color: "success",
  },
  {
    icon: RefreshCw,
    label: "Revisión programada",
    desc: "He puesto un recordatorio para revisar los ajustes cada 3 meses",
    color: "accent",
  },
]

export default function ChecklistPage() {
  return (
    <>
      {/* Toolbar */}
      <div className="no-print sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-5xl px-4 flex h-14 items-center justify-between">
          <Link href="/descargas" className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Link>
          <button
            onClick={() => window.print()}
            className="inline-flex h-9 items-center gap-2 rounded-xl bg-brand-600 px-4 text-sm font-medium text-white shadow-sm hover:bg-brand-700"
          >
            <Printer className="h-4 w-4" />
            Descargar PDF
          </button>
        </div>
      </div>

      <div className="print-area mx-auto my-8 max-w-[700px]">
        <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl border border-slate-200">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-brand-500 via-cyan-500 to-success-500" />

          <div className="p-10 md:p-12">
            {/* Header */}
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100">
                <CheckSquare className="h-6 w-6 text-brand-600" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">Escudo Digital Familiar</p>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Checklist de protección digital</h1>
            <p className="text-sm text-slate-500 mb-8">Marca cada paso cuando lo hayas completado. ¡No dejes ninguno sin hacer!</p>

            {/* Items */}
            <div className="space-y-4">
              {items.map((item, i) => {
                const Icon = item.icon
                const colorMap: Record<string, { bg: string; dot: string }> = {
                  brand: { bg: "bg-brand-50/50 border-brand-200", dot: "bg-brand-500" },
                  cyan: { bg: "bg-cyan-50/50 border-cyan-200", dot: "bg-cyan-500" },
                  success: { bg: "bg-success-50/50 border-success-200", dot: "bg-success-500" },
                  accent: { bg: "bg-accent-50/50 border-accent-200", dot: "bg-accent-500" },
                }
                const c = colorMap[item.color] || colorMap.brand

                return (
                  <div key={i} className={`flex items-start gap-4 p-4 rounded-xl border ${c.bg} ${c.dot.replace('bg-', 'border-l-4 border-l-')}`}
                    style={{borderLeft: `4px solid var(--color-${item.color === 'brand' ? 'brand' : item.color}-500)`}}>
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.color === 'brand' ? 'bg-brand-100' : item.color === 'cyan' ? 'bg-cyan-100' : item.color === 'success' ? 'bg-success-100' : 'bg-accent-100'}`}>
                      <Icon className={`h-4 w-4 ${item.color === 'brand' ? 'text-brand-600' : item.color === 'cyan' ? 'text-cyan-500' : item.color === 'success' ? 'text-success-500' : 'text-accent-500'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 border-slate-300 bg-white">
                          <div className="h-2.5 w-2.5 rounded-sm bg-transparent" />
                        </div>
                        <h3 className="text-sm font-bold text-slate-900">{item.label}</h3>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 ml-8">{item.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Footer */}
            <div className="mt-10 p-5 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 text-white text-center">
              <Shield className="h-8 w-8 mx-auto mb-2 opacity-80" />
              <p className="text-sm font-semibold">Proteger para educar. Educar para liberar.</p>
              <p className="text-xs text-white/60 mt-1">escudodigitalfamiliar.org</p>
            </div>
          </div>
        </div>

        <div className="no-print mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
          <p className="text-xs text-slate-500 flex items-center gap-2">
            <Printer className="h-3.5 w-3.5" />
            Ctrl+P → Guardar como PDF. Diseñado para A4.
          </p>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          .print-area { max-width: 100% !important; margin: 0 !important; padding: 0 !important; }
          .print-area > div { border-radius: 0 !important; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>
    </>
  )
}
