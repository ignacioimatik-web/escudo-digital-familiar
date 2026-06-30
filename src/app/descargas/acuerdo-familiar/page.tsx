"use client"

import { Shield, Printer, ArrowLeft, FileSignature, Heart, Smartphone, Clock, Moon, MessageCircle, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function AcuerdoFamiliarPage() {
  return (
    <>
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
          {/* Decorative top */}
          <div className="h-2 bg-gradient-to-r from-brand-500 via-success-500 to-cyan-500" />

          <div className="p-10 md:p-12">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100">
                  <FileSignature className="h-7 w-7 text-brand-600" />
                </div>
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-1">Escudo Digital Familiar</p>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Acuerdo familiar de uso digital</h1>
              <p className="text-sm text-slate-500">Un pacto entre todos los miembros de la familia para un uso saludable de la tecnología.</p>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 text-white text-center mb-8">
              <Heart className="h-6 w-6 mx-auto mb-2 opacity-80" />
              <p className="text-sm font-semibold">La tecnología es una herramienta, no un fin.</p>
              <p className="text-xs text-white/70 mt-1">Este acuerdo nos ayuda a usarla con responsabilidad y cariño.</p>
            </div>

            {/* Sections */}
            <div className="space-y-6">
              <div className="rounded-xl border border-slate-200 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="h-5 w-5 text-brand-500" />
                  <h2 className="text-base font-bold text-slate-900">Tiempo de uso</h2>
                </div>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-300 w-6">☐</span>
                    <span>Máximo <strong>_______</strong> minutos al día de lunes a viernes</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-300 w-6">☐</span>
                    <span>Máximo <strong>_______</strong> minutos al día en fin de semana</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-300 w-6">☐</span>
                    <span>Sin pantallas durante las comidas</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Moon className="h-5 w-5 text-cyan-500" />
                  <h2 className="text-base font-bold text-slate-900">Descanso digital</h2>
                </div>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-300 w-6">☐</span>
                    <span>Apagar dispositivos <strong>1 hora</strong> antes de dormir</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-300 w-6">☐</span>
                    <span>Los dispositivos se cargan fuera del dormitorio</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-300 w-6">☐</span>
                    <span>Hora de apagado: <strong>________</strong></span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Smartphone className="h-5 w-5 text-success-500" />
                  <h2 className="text-base font-bold text-slate-900">Contenido y aplicaciones</h2>
                </div>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-300 w-6">☐</span>
                    <span>No descargar apps sin permiso de los padres</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-300 w-6">☐</span>
                    <span>No compartir datos personales ni fotos sin preguntar</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-300 w-6">☐</span>
                    <span>Redes sociales permitidas: <strong>________________</strong></span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <MessageCircle className="h-5 w-5 text-accent-500" />
                  <h2 className="text-base font-bold text-slate-900">Diálogo y confianza</h2>
                </div>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-300 w-6">☐</span>
                    <span>Si veo algo que me incomoda, se lo cuento a mis padres</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-300 w-6">☐</span>
                    <span>Si alguien me pide algo raro, lo digo sin miedo</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-300 w-6">☐</span>
                    <span>Revisamos el acuerdo juntos cada 3 meses</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-accent-200 bg-accent-50 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="h-5 w-5 text-accent-500" />
                  <h2 className="text-base font-bold text-slate-900">Consecuencias</h2>
                </div>
                <p className="text-sm text-slate-600">Si no se cumple el acuerdo, hablaremos de lo que ha pasado y ajustaremos el acuerdo juntos. Las restricciones de protección son para la seguridad de todos y no son negociables.</p>
              </div>
            </div>

            {/* Firma */}
            <div className="mt-8 p-5 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-sm font-semibold text-slate-900 mb-4">Firmamos este acuerdo el día <strong>____</strong> de <strong>__________</strong> de <strong>20____</strong></p>
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Padre / Madre</p>
                  <div className="border-b border-slate-300 h-6" />
                  <p className="text-xs text-slate-400 mt-1">Firma</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Hijo / Hija</p>
                  <div className="border-b border-slate-300 h-6" />
                  <p className="text-xs text-slate-400 mt-1">Firma</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center text-xs text-slate-400">
              escudodigitalfamiliar.org
            </div>
          </div>
        </div>

        <div className="no-print mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
          <p className="text-xs text-slate-500 flex items-center gap-2">
            <Printer className="h-3.5 w-3.5" />
            Ctrl+P → Guardar como PDF. Diseñado para imprimir y rellenar a mano.
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
