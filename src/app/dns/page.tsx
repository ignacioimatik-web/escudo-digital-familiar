"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import {
  Shield, CheckCircle2, XCircle, ArrowRight, Star,
  Globe, Lock, Zap, Sparkles, Server, Euro,
  Wifi, Smartphone, Monitor, Crosshair, ExternalLink
} from "lucide-react"
import { dnsProviders } from "@/lib/config-assistant/dns-providers"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
}

const tierColors: Record<string, string> = {
  gratuito: "from-emerald-500 to-green-600",
  freemium: "from-amber-500 to-orange-600",
  pago: "from-slate-500 to-slate-600",
}

const tierLabels: Record<string, string> = {
  gratuito: "Gratuito",
  freemium: "Freemium",
  pago: "De pago",
}

export default function DnsPage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95])

  const recommended = dnsProviders.filter(p => p.recommended)
  const freeProviders = dnsProviders.filter(p => p.tier !== "pago")
  const paidProviders = dnsProviders.filter(p => p.tier === "pago")

  return (
    <div className="bg-white">
      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900" />
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-brand-500/20 blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-cyan-500/15 blur-[120px]" />
        <div className="absolute top-3/4 left-1/3 w-[300px] h-[300px] rounded-full bg-emerald-500/10 blur-[100px]" />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} 
        />

        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-medium mb-8 backdrop-blur-sm">
              <Shield className="h-3.5 w-3.5" />
              DNS de protección familiar
            </div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.05] mb-6"
          >
            El DNS que
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-cyan-400 to-emerald-400">
              protege tu hogar
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Compara los mejores proveedores DNS con protección familiar. Gratuitos, 
            rápidos y diseñados para bloquear contenido inapropiado antes de que llegue a tus hijos.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/configurador"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-brand-600 px-6 text-sm font-semibold text-white shadow-lg shadow-brand-600/30 transition-all hover:bg-brand-700 hover:shadow-xl hover:shadow-brand-600/40"
            >
              Configurar ahora
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#comparativa"
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-6 text-sm font-semibold text-slate-200 transition-all hover:bg-white/10"
            >
              Ver comparativa
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            {[
              { value: "9+", label: "Proveedores" },
              { value: "100%", label: "Gratis opciones" },
              { value: "5 min", label: "Configuración" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-white">{s.value}</p>
                <p className="text-xs text-slate-500 mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="w-5 h-8 rounded-full border-2 border-white/20 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-white/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ ¿POR QUÉ DNS? ═══ */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold mb-4">
              <Sparkles className="h-3 w-3" />
              ¿Por qué es importante?
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
              El DNS es tu primera línea de defensa
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Antes de que el contenido llegue al dispositivo, el DNS decide si debe bloquearlo. 
              Es la capa más eficaz porque actúa antes, en toda la red, y no requiere instalar nada.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Shield, tit: "Bloquea antes de que llegue", desc: "Actúa a nivel de red, no en el dispositivo. El contenido inapropiado ni siquiera entra en casa.", color: "brand" },
              { icon: Wifi, tit: "Protege toda la red", desc: "Un solo cambio en el router protege todos los dispositivos conectados: móviles, tablets, PCs, Smart TVs.", color: "cyan" },
              { icon: Zap, tit: "Gratuito y sin mantenimiento", desc: "Los mejores proveedores son 100% gratuitos. Se configura una vez y funciona para siempre.", color: "success" },
            ].map((item, i) => {
              const Icon = item.icon
              const colors: Record<string, string> = {
                brand: "bg-brand-50 text-brand-600 border-brand-200",
                cyan: "bg-cyan-50 text-cyan-500 border-cyan-200",
                success: "bg-emerald-50 text-emerald-600 border-emerald-200",
              }
              return (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  transition={{ delay: i * 0.1 }}
                  className={`rounded-2xl border p-6 ${colors[item.color]}`}
                >
                  <Icon className="h-8 w-8 mb-4" />
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.tit}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ RECOMENDADOS ═══ */}
      <section className="py-24 md:py-32 px-6 bg-slate-50/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold mb-4">
              <Star className="h-3 w-3" />
              Nuestra recomendación
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
              Los mejores DNS gratuitos
            </h2>
            <p className="text-lg text-slate-500 max-w-xl mx-auto">
              Probados, verificados y recomendados. Todos gratuitos, sin límites y con protección familiar activa.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {recommended.map((provider, i) => (
              <motion.div
                key={provider.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: i * 0.1 }}
                className="relative rounded-3xl bg-white border-2 border-brand-100 shadow-xl shadow-brand-500/5 overflow-hidden group hover:border-brand-300 transition-all duration-300"
              >
                {/* Ribbon */}
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-lg shadow-brand-500/30">
                  <Star className="h-3 w-3" />
                  Recomendado
                </div>

                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-slate-900">{provider.name}</h3>
                    <a href={provider.website} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-brand-600 transition-colors">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">{provider.description}</p>

                  {/* Server IPs */}
                  <div className="mb-6">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Servidores DNS</p>
                    <div className="flex flex-wrap gap-2">
                      <code className="px-3 py-1.5 rounded-lg bg-slate-100 text-xs font-mono text-slate-700 font-semibold">{provider.primaryIPv4}</code>
                      <code className="px-3 py-1.5 rounded-lg bg-slate-100 text-xs font-mono text-slate-700 font-semibold">{provider.secondaryIPv4}</code>
                      {provider.dohUrl && (
                        <code className="px-3 py-1.5 rounded-lg bg-brand-50 text-xs font-mono text-brand-700 font-semibold">DoH ✓</code>
                      )}
                    </div>
                  </div>

                  {/* Features grid */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {provider.features.slice(0, 4).map((f, j) => (
                      <div key={j} className="flex items-start gap-1.5 text-xs text-slate-600">
                        <CheckCircle2 className="h-3 w-3 text-emerald-500 mt-0.5 shrink-0" />
                        <span className="leading-tight">{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-200">
                      {provider.europeBased ? "🇪🇺 Europa (RGPD)" : "🌍 Global"}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-semibold">
                      Sin logs
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 text-[10px] font-semibold">
                      Gratuito
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ COMPARATIVA COMPLETA ═══ */}
      <section id="comparativa" className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 text-xs font-semibold mb-4">
              <Server className="h-3 w-3" />
              Comparativa completa
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
              Todos los proveedores, un vistazo
            </h2>
            <p className="text-lg text-slate-500 max-w-xl mx-auto">
              DNS gratuitos y de pago con protección familiar. Ordenados por relevancia.
            </p>
          </motion.div>

          {/* Cards grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-2 gap-4 mb-12"
          >
            {freeProviders.map((p, i) => (
              <motion.div
                key={p.id}
                variants={fadeUp}
                className={`rounded-2xl border p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${
                  p.recommended 
                    ? "border-brand-200 bg-gradient-to-br from-brand-50/50 to-white shadow-md" 
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-slate-900">{p.name}</h3>
                      {p.recommended && <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />}
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                      p.tier === "gratuito" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}>
                      <Zap className="h-2.5 w-2.5" />
                      {tierLabels[p.tier]}
                      {p.usageLimit && ` · ${p.usageLimit}`}
                    </span>
                  </div>
                  <a href={p.website} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-brand-600 transition-colors">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-2">{p.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  <code className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-mono text-slate-600">{p.primaryIPv4}</code>
                  <code className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-mono text-slate-600">{p.secondaryIPv4}</code>
                  {p.dohUrl && <span className="px-2 py-0.5 rounded bg-brand-50 text-[10px] font-mono text-brand-600">DoH</span>}
                </div>

                <div className="flex flex-wrap gap-1.5 text-[10px]">
                  {p.europeBased ? (
                    <span className="flex items-center gap-1 text-emerald-600">✅ RGPD</span>
                  ) : (
                    <span className="flex items-center gap-1 text-slate-400">🌍 Global</span>
                  )}
                  <span className="text-slate-400">·</span>
                  <span>{p.logsPolicy.length < 50 ? p.logsPolicy : "Privacidad garantizada"}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Quick comparison table */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm"
          >
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-sm font-bold text-slate-900">Tabla rápida comparativa</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left p-3 font-semibold text-slate-700">Proveedor</th>
                    <th className="text-left p-3 font-semibold text-slate-700">DNS Primario</th>
                    <th className="text-left p-3 font-semibold text-slate-700">Bloqueo</th>
                    <th className="text-left p-3 font-semibold text-slate-700">DoH</th>
                    <th className="text-left p-3 font-semibold text-slate-700">Precio</th>
                    <th className="text-left p-3 font-semibold text-slate-700">RGPD</th>
                  </tr>
                </thead>
                <tbody>
                  {dnsProviders.map((p, i) => (
                    <tr key={p.id} className={`border-b border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"} ${p.recommended ? "bg-brand-50/30" : ""}`}>
                      <td className="p-3 font-medium text-slate-800">
                        {p.recommended ? <span className="flex items-center gap-1">⭐ {p.name}</span> : p.name}
                      </td>
                      <td className="p-3 font-mono text-slate-600">{p.primaryIPv4}</td>
                      <td className="p-3">
                        {p.filtering === "familia" ? <span className="text-emerald-600 text-xs">✅ Familia</span> 
                          : p.filtering === "malware" ? <span className="text-amber-500 text-xs">⚠️ Malware</span>
                          : <span className="text-cyan-600 text-xs">🔄 Mixto</span>}
                      </td>
                      <td className="p-3">{p.dohUrl ? <span className="text-emerald-600">✅</span> : "❌"}</td>
                      <td className="p-3">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                          p.tier === "gratuito" ? "text-emerald-600 bg-emerald-50" : "text-amber-600 bg-amber-50"
                        }`}>
                          {p.tier === "gratuito" ? "Gratis" : p.tier === "freemium" ? "Freemium" : "Pago"}
                        </span>
                      </td>
                      <td className="p-3">{p.europeBased ? <span className="text-emerald-600">✅</span> : "❌"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Paid explanation */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-8 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 p-6"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100">
                <Euro className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-2">¿Merece la pena pagar por DNS?</h3>
                <p className="text-sm text-slate-600 mb-3">
                  Los DNS gratuitos (DNS4.EU, CleanBrowsing, Cloudflare) son suficientes para la mayoría de familias. 
                  Las opciones de pago añaden dashboard de control, listas personalizadas y consultas ilimitadas.
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    "📊 Dashboard: ves qué intentan visitar",
                    "📋 Listas personalizadas de bloqueo",
                    "🔄 Consultas ilimitadas",
                    "🏠 Proteges varios hogares",
                  ].map((tip, j) => (
                    <div key={j} className="flex items-center gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-24 md:py-32 px-6 bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="flex justify-center mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500/20 border border-brand-500/30 backdrop-blur-sm">
                <Shield className="h-8 w-8 text-brand-400" />
              </div>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Protege a tu familia ahora
            </h2>
            <p className="text-lg text-slate-300 max-w-xl mx-auto mb-8">
              Elige tu proveedor DNS, configúralo en 5 minutos y olvídate. 
              Nosotros te guiamos paso a paso.
            </p>
            <Link
              href="/configurador"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-brand-600 px-8 text-sm font-semibold text-white shadow-lg shadow-brand-600/30 transition-all hover:bg-brand-700 hover:shadow-xl hover:shadow-brand-600/40"
            >
              Ir al configurador guiado
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="py-8 px-6 border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <span>Escudo Digital Familiar — Protección digital para menores</span>
          <Link href="/descargas" className="hover:text-brand-600 transition-colors">Recursos descargables</Link>
        </div>
      </footer>
    </div>
  )
}
