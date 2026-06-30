"use client"

import { Shield, Wifi, Smartphone, CheckCircle2, Printer, ArrowLeft, ArrowRight, Zap, Globe, Clock, Lock } from "lucide-react"
import Link from "next/link"

export default function GuiaRapidaPage() {
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

      <div className="print-area mx-auto my-8 max-w-[900px] space-y-6">

        {/* ═══ PÁGINA 1: PORTADA ═══ */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 shadow-2xl border border-slate-800 min-h-[500px] flex flex-col">
          <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'radial-gradient(circle at 50% 50%, white 1px, transparent 1px)', backgroundSize: '40px 40px'}} />
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-brand-500/20 blur-3xl" />
          <div className="relative z-10 flex-1 flex flex-col p-10 md:p-14">
            <div className="flex items-center gap-3 mb-12">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/20 border border-brand-500/30">
                <Shield className="h-6 w-6 text-brand-400" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-400">Escudo Digital Familiar</p>
                <p className="text-[10px] text-slate-500">Guía rápida</p>
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Guía rápida de protección digital</h1>
              <p className="text-lg text-slate-300 max-w-xl mb-6">DNS de protección + Control parental en 3 pasos.</p>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-500/20 text-brand-300 text-xs font-medium border border-brand-500/20">
                  <Clock className="h-3 w-3" /> 15-30 minutos
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-success-500/20 text-success-300 text-xs font-medium border border-success-500/20">
                  <Zap className="h-3 w-3" /> Sin coste
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-medium border border-cyan-500/20">
                  <Globe className="h-3 w-3" /> Cobertura total
                </span>
              </div>
            </div>
            <div className="pt-8 border-t border-white/10 flex justify-between text-xs text-slate-600">
              <span>escudodigitalfamiliar.org</span>
              <span>Página 1/3</span>
            </div>
          </div>
        </div>

        {/* ═══ PÁGINA 2: PASOS 1-2 ═══ */}
        <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl border border-slate-200">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-brand-500 to-cyan-500" />
          <div className="p-10 md:p-14">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100">
                <span className="text-brand-700 font-bold text-lg">1</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Configura el DNS de protección</h2>
                <p className="text-sm text-slate-500">Filtra el contenido inapropiado a nivel de red</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="rounded-xl bg-brand-50/50 border border-brand-100 p-5">
                <Wifi className="h-6 w-6 text-brand-600 mb-3" />
                <h3 className="text-sm font-bold text-slate-900 mb-2">Opción A: En el router</h3>
                <p className="text-xs text-slate-600 mb-2">Protege TODOS los dispositivos de la casa.</p>
                <ol className="text-xs text-slate-600 space-y-1.5 list-decimal list-inside">
                  <li>Accede al panel del router (192.168.1.1)</li>
                  <li>Busca «DNS» en configuración de red</li>
                  <li>Cambia los DNS a: <code className="px-1 py-0.5 rounded bg-slate-200 text-xs font-mono">91.239.100.101</code> y <code className="px-1 py-0.5 rounded bg-slate-200 text-xs font-mono">91.239.100.102</code></li>
                  <li>Guarda y reinicia el router</li>
                </ol>
              </div>
              <div className="rounded-xl bg-cyan-50/50 border border-cyan-100 p-5">
                <Smartphone className="h-6 w-6 text-cyan-600 mb-3" />
                <h3 className="text-sm font-bold text-slate-900 mb-2">Opción B: En cada dispositivo</h3>
                <p className="text-xs text-slate-600 mb-2">Ideal si el menor usa datos móviles.</p>
                <ol className="text-xs text-slate-600 space-y-1.5 list-decimal list-inside">
                  <li>Android: Ajustes &gt; Red &gt; DNS privado</li>
                  <li>Introduce: <code className="px-1 py-0.5 rounded bg-slate-200 text-xs font-mono">family.dns4.eu</code></li>
                  <li>iOS: Ajustes &gt; WiFi &gt; Configurar DNS</li>
                  <li>Añade <code className="px-1 py-0.5 rounded bg-slate-200 text-xs font-mono">185.228.168.168</code></li>
                </ol>
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
              <div className="flex items-start gap-3">
                <Lock className="h-5 w-5 text-brand-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-slate-900 mb-1">Proveedores DNS recomendados</p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                    <span>⭐ <strong>DNS4.EU</strong>: family.dns4.eu</span>
                    <span>⭐ <strong>CleanBrowsing</strong>: 185.228.168.168</span>
                    <span>🌐 <strong>Cloudflare Familias</strong>: 1.1.1.3</span>
                    <span>🛡️ <strong>AdGuard Family</strong>: 94.140.14.15</span>
                  </div>
                </div>
              </div>
            </div>

            <hr className="my-8 border-slate-200" />

            <div className="flex items-center gap-3 mb-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100">
                <span className="text-cyan-700 font-bold text-lg">2</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Configura el control parental</h2>
                <p className="text-sm text-slate-500">Gestiona tiempos, apps y contenido</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-200 p-5">
                <h3 className="text-sm font-bold text-slate-900 mb-2">📱 Android: Family Link</h3>
                <ul className="text-xs text-slate-600 space-y-1.5">
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-success-500 mt-0.5 shrink-0" /> Descarga Family Link en tu móvil</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-success-500 mt-0.5 shrink-0" /> Crea una cuenta de Google para tu hijo</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-success-500 mt-0.5 shrink-0" /> Configura límites de tiempo y filtros</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-success-500 mt-0.5 shrink-0" /> Activa la aprobación de compras</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 p-5">
                <h3 className="text-sm font-bold text-slate-900 mb-2">🍎 iOS: En Familia</h3>
                <ul className="text-xs text-slate-600 space-y-1.5">
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-success-500 mt-0.5 shrink-0" /> Ve a Ajustes &gt; En Familia</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-success-500 mt-0.5 shrink-0" /> Añade a tu hijo con su Apple ID</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-success-500 mt-0.5 shrink-0" /> Activa Tiempo de Uso con un código</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-success-500 mt-0.5 shrink-0" /> Configura restricciones de contenido</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ PÁGINA 3: PASO 3 + VERIFICACIÓN ═══ */}
        <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl border border-slate-200">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-success-500 to-emerald-500" />
          <div className="p-10 md:p-14">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success-100">
                <span className="text-success-700 font-bold text-lg">3</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Verifica que funciona</h2>
                <p className="text-sm text-slate-500">Confirma que la protección está activa</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="rounded-xl bg-success-50/50 border border-success-200 p-5 text-center">
                <Globe className="h-8 w-8 text-success-600 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-slate-900 mb-1">Test DNS</h3>
                <p className="text-xs text-slate-600">Visita <strong>dnsleaktest.com</strong>. Confirma que ves el proveedor que configuraste.</p>
              </div>
              <div className="rounded-xl bg-success-50/50 border border-success-200 p-5 text-center">
                <Shield className="h-8 w-8 text-success-600 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-slate-900 mb-1">Bloqueo</h3>
                <p className="text-xs text-slate-600">Intenta visitar un sitio para adultos. Debe mostrar error de conexión.</p>
              </div>
              <div className="rounded-xl bg-success-50/50 border border-success-200 p-5 text-center">
                <Smartphone className="h-8 w-8 text-success-600 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-slate-900 mb-1">Control parental</h3>
                <p className="text-xs text-slate-600">Verifica que los límites de tiempo y restricciones están activos.</p>
              </div>
            </div>

            <div className="rounded-xl bg-accent-50 border border-accent-200 p-5">
              <h3 className="text-sm font-bold text-slate-900 mb-3">⚠️ Errores frecuentes</h3>
              <div className="grid md:grid-cols-2 gap-3 text-xs text-slate-600">
                <div className="flex items-start gap-2">
                  <span className="text-accent-500 shrink-0">•</span>
                  <span><strong>El menor sabe la contraseña</strong> — Usa un código que solo sepas tú.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-accent-500 shrink-0">•</span>
                  <span><strong>Solo protegiste un dispositivo</strong> — Configura el router para proteger todos.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-accent-500 shrink-0">•</span>
                  <span><strong>DNS no funciona en datos móviles</strong> — Prueba con otro proveedor DNS.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-accent-500 shrink-0">•</span>
                  <span><strong>No revisas la configuración</strong> — Ajústala cada 3 meses según su edad.</span>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-center">
              <p className="text-sm font-semibold">
                🎉 ¡Ya tienes protegido a tu hijo! Revisa la configuración cada 3 meses.
              </p>
            </div>

            <div className="mt-6 flex justify-between text-xs text-slate-400">
              <span>escudodigitalfamiliar.org</span>
              <span>Página 3/3</span>
            </div>
          </div>
        </div>

        {/* Instrucciones */}
        <div className="no-print mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
          <p className="text-xs text-slate-500 flex items-center gap-2">
            <Printer className="h-3.5 w-3.5" />
            Haz clic en <strong>Descargar PDF</strong> o Ctrl+P → Guardar como PDF. Diseñado para A4 vertical.
          </p>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          .print-area { max-width: 100% !important; margin: 0 !important; padding: 0 !important; }
          .print-area > div { border-radius: 0 !important; break-inside: avoid; page-break-inside: avoid; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>
    </>
  )
}
