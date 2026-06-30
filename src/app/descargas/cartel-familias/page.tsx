"use client"

import { Shield, Wifi, Smartphone, Heart, Printer, ArrowLeft, Sparkles, Star, Zap } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function CartelFamiliasPage() {
  return (
    <>
      {/* Toolbar */}
      <div className="no-print sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-5xl px-4 flex h-14 items-center justify-between">
          <Link href="/descargas" className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Volver a descargas
          </Link>
          <button
            onClick={() => window.print()}
            className="inline-flex h-9 items-center gap-2 rounded-xl bg-brand-600 px-4 text-sm font-medium text-white shadow-sm hover:bg-brand-700 transition-all"
          >
            <Printer className="h-4 w-4" />
            Descargar PDF
          </button>
        </div>
      </div>

      {/* Poster */}
      <div className="print-area mx-auto my-8 max-w-[900px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 shadow-2xl border border-slate-800"
        >
          {/* Animated grid pattern */}
          <div className="absolute inset-0 opacity-[0.04]" 
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.8) 1px, transparent 1px),
                                radial-gradient(circle at 75% 75%, rgba(255,255,255,0.8) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }} 
          />
          
          {/* Glowing orbs */}
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-brand-500/20 blur-3xl animate-pulse" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-cyan-500/15 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/4 w-48 h-48 rounded-full bg-success-500/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

          {/* Decorative top line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-500 via-cyan-500 to-success-500" />

          {/* Content */}
          <div className="relative z-10 p-10 md:p-14 lg:p-16 flex flex-col min-h-[550px]">
            {/* Header */}
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/20 backdrop-blur-sm border border-brand-500/30">
                  <Shield className="h-7 w-7 text-brand-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-400">Escudo Digital Familiar</p>
                  <p className="text-[10px] text-slate-500">Protección digital para menores</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">Protege</p>
                <p className="text-2xl font-bold text-brand-400">a tus hijos</p>
              </div>
            </div>

            {/* Main message */}
            <div className="flex-1 flex flex-col justify-center py-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05] mb-6">
                  2 capas.
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-cyan-400 to-success-400">
                    Protección total.
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed mb-10">
                  Un método sencillo, gratuito y eficaz para crear un entorno digital seguro para tus hijos.
                </p>
              </motion.div>

              {/* Las 2 capas */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="grid grid-cols-2 gap-4 max-w-xl"
              >
                <div className="group rounded-2xl bg-white/[0.06] backdrop-blur-sm border border-white/10 p-5 hover:bg-white/[0.10] transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/30">
                      <Wifi className="h-4 w-4 text-brand-300" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-400">Capa 1</span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">DNS de protección</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Filtra a nivel de red. Bloquea pornografía, apuestas, violencia y malware antes de que lleguen.
                  </p>
                </div>
                <div className="group rounded-2xl bg-white/[0.06] backdrop-blur-sm border border-white/10 p-5 hover:bg-white/[0.10] transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/30">
                      <Smartphone className="h-4 w-4 text-cyan-300" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Capa 2</span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">Control parental</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Gestiona tiempos, apps, compras y contenido. Acompaña a tus hijos mientras crecen.
                  </p>
                </div>
              </motion.div>

              {/* Badge de impacto */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-500/20 to-cyan-500/20 border border-brand-500/30 text-xs text-brand-300 w-fit"
              >
                <Zap className="h-3.5 w-3.5" />
                <span className="font-semibold">15 minutos · Sin coste · Sin registro</span>
              </motion.div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-8 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Heart className="h-3 w-3 text-brand-400" />
                <span>Proteger para educar. Educar para liberar.</span>
              </div>
              <div className="text-[10px] text-slate-600">
                escudodigitalfamiliar.org
              </div>
            </div>
          </div>
        </motion.div>

        {/* Instrucciones */}
        <div className="no-print mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
          <p className="text-xs text-slate-500 flex items-center gap-2">
            <Printer className="h-3.5 w-3.5" />
            Haz clic en <strong className="text-slate-700">Descargar PDF</strong> o Ctrl+P → Guardar como PDF. Diseñado para A4 apaisado.
          </p>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          .print-area { max-width: 100% !important; margin: 0 !important; padding: 0 !important; }
          .print-area > div { border-radius: 0 !important; min-height: 100vh !important; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>
    </>
  )
}
