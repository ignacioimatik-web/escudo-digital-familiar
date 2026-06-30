"use client"

import { motion } from "framer-motion"
import { Shield, CheckCircle2, XCircle, ExternalLink, Star } from "lucide-react"
import { dnsProviders } from "@/lib/config-assistant/dns-providers"

const tierColors: Record<string, string> = {
  gratuito: "bg-success-100 text-success-700 border-success-200",
  freemium: "bg-accent-100 text-accent-700 border-accent-200",
  pago: "bg-slate-100 text-slate-700 border-slate-200",
}

const tierLabels: Record<string, string> = {
  gratuito: "100% Gratuito",
  freemium: "Freemium",
  pago: "De pago",
}

export function DnsComparator() {
  const freeProviders = dnsProviders.filter((p) => p.tier !== "pago")
  const paidProviders = dnsProviders.filter((p) => p.tier === "pago")

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-3">Comparativa de DNS</h2>
        <p className="text-slate-500 text-sm leading-relaxed">
          Todos los proveedores DNS con protección familiar. Los marcados con ⭐ son los que recomiendo como primera opción.
        </p>
      </div>

      {/* Free providers */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-success-600 mb-4 flex items-center gap-2">
          <Shield className="w-4 h-4" />
          DNS gratuitos
        </h3>

        <div className="grid gap-4">
          {freeProviders.map((provider, index) => (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`rounded-2xl border p-5 ${
                provider.recommended
                  ? "border-brand-300 bg-brand-50/50"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-semibold text-slate-900">
                      {provider.name}
                    </h4>
                    {provider.recommended && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-100 text-brand-700 text-[10px] font-semibold">
                        <Star className="w-3 h-3" /> Recomendado
                      </span>
                    )}
                  </div>
                  <span className={`inline-block mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${tierColors[provider.tier]}`}>
                    {tierLabels[provider.tier]}
                  </span>
                </div>
                <a
                  href={provider.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-brand-600 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                {provider.description}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                    Servidores DNS
                  </p>
                  <div className="space-y-1">
                    <code className="block px-2 py-1 rounded bg-slate-100 text-xs font-mono text-slate-700">
                      {provider.primaryIPv4}
                    </code>
                    <code className="block px-2 py-1 rounded bg-slate-100 text-xs font-mono text-slate-700">
                      {provider.secondaryIPv4}
                    </code>
                    {provider.dohUrl && (
                      <code className="block px-2 py-1 rounded bg-slate-100 text-xs font-mono text-slate-600 truncate">
                        DoH: {provider.dohUrl}
                      </code>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                    País / Privacidad
                  </p>
                  <p className="text-sm text-slate-700 mb-2">
                    {provider.europeBased ? "🇪🇺 Europa (RGPD)" : "🌍 Fuera de Europa"}
                  </p>
                  <p className="text-xs text-slate-500">{provider.logsPolicy}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-success-600 mb-1.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Ventajas
                  </p>
                  <ul className="space-y-1">
                    {provider.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-xs text-slate-600">
                        <CheckCircle2 className="w-3 h-3 text-success-500 mt-0.5 shrink-0" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-accent-600 mb-1.5 flex items-center gap-1">
                    <XCircle className="w-3 h-3" /> Limitaciones
                  </p>
                  <ul className="space-y-1">
                    {provider.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-xs text-slate-600">
                        <XCircle className="w-3 h-3 text-accent-400 mt-0.5 shrink-0" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {provider.usageLimit && (
                <div className="mt-3 p-2 rounded-lg bg-accent-50 border border-accent-100">
                  <p className="text-xs text-accent-700">
                    ⚠️ Límite de uso: {provider.usageLimit}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick comparison table */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden mb-8">
        <div className="p-4 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-900">Tabla rápida</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left p-3 font-semibold text-slate-700">Proveedor</th>
                <th className="text-left p-3 font-semibold text-slate-700">DNS Primario</th>
                <th className="text-left p-3 font-semibold text-slate-700">Bloquea adultos</th>
                <th className="text-left p-3 font-semibold text-slate-700">DoH</th>
                <th className="text-left p-3 font-semibold text-slate-700">Precio</th>
                <th className="text-left p-3 font-semibold text-slate-700">RGPD</th>
              </tr>
            </thead>
            <tbody>
              {dnsProviders.map((p, i) => (
                <tr key={p.id} className={`border-b border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                  <td className="p-3 font-medium text-slate-800">{p.recommended ? `⭐ ${p.name}` : p.name}</td>
                  <td className="p-3 font-mono text-slate-600">{p.primaryIPv4}</td>
                  <td className="p-3">
                    {p.filtering === "familia" ? (
                      <span className="text-success-600">✅</span>
                    ) : p.filtering === "malware" ? (
                      <span className="text-accent-500">⚠️</span>
                    ) : (
                      <span className="text-cyan-600">🔄</span>
                    )}
                  </td>
                  <td className="p-3">{p.dohUrl ? "✅" : "❌"}</td>
                  <td className="p-3">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                      p.tier === "gratuito" ? "text-success-600" : "text-accent-600"
                    }`}>
                      {p.tier === "gratuito" ? "Gratis" : p.tier === "freemium" ? "Freemium" : "Pago"}
                    </span>
                  </td>
                  <td className="p-3">{p.europeBased ? "✅" : "❌"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Paid options explanation */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <h3 className="text-base font-semibold text-slate-900 mb-3">
          💳 Vale la pena pagar por DNS?
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          Los DNS gratuitos (DNS4.EU, CleanBrowsing, Cloudflare) son suficientes para la mayoría de familias.
          Las opciones de pago añaden:
        </p>
        <ul className="space-y-2 text-sm text-slate-600">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" />
            <span><strong>Dashboard de control:</strong> ves qué sitios intenta visitar el menor</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" />
            <span><strong>Listas personalizadas:</strong> añades o quitas sitios del filtro</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" />
            <span><strong>Consultas ilimitadas:</strong> sin límite mensual</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" />
            <span><strong>Más dispositivos o redes:</strong> proteges varios hogares</span>
          </li>
        </ul>
        <div className="mt-4 p-3 rounded-xl bg-brand-50 border border-brand-100">
          <p className="text-xs text-brand-700">
            💡 <strong>Mi recomendación:</strong> empieza con DNS4.EU o CleanBrowsing (gratuitos).
            Si necesitas más control, NextDNS por 1.99€/mes es la mejor relación calidad-precio.
          </p>
        </div>
      </div>
    </div>
  )
}
