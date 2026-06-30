"use client"

import { Shield, Wifi, Smartphone, Heart, Printer, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CartelFamiliasPage() {
  return (
    <>
      {/* Toolbar — visible en web, oculto al imprimir */}
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

      {/* Poster — diseño A4 apaisado optimizado para impresión */}
      <div className="print-area mx-auto my-8 max-w-[900px]">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 shadow-2xl border border-slate-800">
          {/* Pattern de fondo */}
          <div className="absolute inset-0 opacity-[0.04]" 
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.8) 1px, transparent 1px),
                                radial-gradient(circle at 75% 75%, rgba(255,255,255,0.8) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }} 
          />
          
          {/* Gradientes decorativos */}
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-brand-500/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-cyan-500/10 blur-3xl" />
          
          {/* Contenido */}
          <div className="relative z-10 p-10 md:p-14 lg:p-16 flex flex-col min-h-[500px]">
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

            {/* Mensaje central */}
            <div className="flex-1 flex flex-col justify-center py-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05] mb-6">
                2 capas.
                <br />
                <span className="text-brand-400">Protección total.</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed mb-10">
                Un método sencillo, gratuito y eficaz para crear un entorno digital seguro para tus hijos.
              </p>

              {/* Las 2 capas visuales */}
              <div className="grid grid-cols-2 gap-4 max-w-xl">
                <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-5">
                  <Wifi className="h-8 w-8 text-brand-400 mb-3" />
                  <h3 className="text-base font-bold text-white mb-1">Capa 1: DNS</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Filtra a nivel de red. Bloquea pornografía, apuestas, violencia y malware antes de que lleguen al dispositivo.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-5">
                  <Smartphone className="h-8 w-8 text-cyan-400 mb-3" />
                  <h3 className="text-base font-bold text-white mb-1">Capa 2: Control parental</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Gestiona tiempos, apps, compras y contenido. Acompaña a tus hijos mientras desarrollan su criterio.
                  </p>
                </div>
              </div>
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
        </div>

        {/* Instrucciones de impresión */}
        <div className="no-print mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
          <p className="text-xs text-slate-500 flex items-center gap-2">
            <Printer className="h-3.5 w-3.5" />
            Haz clic en <strong className="text-slate-700">Descargar PDF</strong> o usa Ctrl+P y selecciona &quot;Guardar como PDF&quot;.
            Diseñado para impresión A4 apaisado.
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
