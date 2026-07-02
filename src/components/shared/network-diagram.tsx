"use client"

import { motion } from "framer-motion"

interface NetworkDiagramProps {
  variant?: "router-dns" | "full-home" | "mobile"
  protected_: boolean
  className?: string
}

export function NetworkDiagram({ variant = "full-home", protected_, className = "" }: NetworkDiagramProps) {
  return (
    <div className={`relative ${className}`}>
      {variant === "router-dns" && <RouterDnsDiagram protected_={protected_} />}
      {variant === "mobile" && <MobileDiagram protected_={protected_} />}
      {variant === "full-home" && <FullHomeDiagram protected_={protected_} />}
    </div>
  )
}

// ── Icon Paths ──
const Icons = {
  router: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12v4a2 2 0 002 2h10a2 2 0 002-2v-4m-9 4h2",
  phone: "M4 7c0-1.657.895-3 2-3h12c1.105 0 2 1.343 2 3v10c0 1.657-.895 3-2 3H6c-1.105 0-2-1.343-2-3V7z M10 17h4",
  laptop: "M4 5c0-1.105.895-2 2-2h12c1.105 0 2 .895 2 2v9H4V5z M2 16h20v1a1 1 0 01-1 1H3a1 1 0 01-1-1v-1z",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  check: "M9 12l2 2 4-4",
  cloud: "M17.5 19H6.5A4.5 4.5 0 017.5 10a6 6 0 0112 0 4.5 4.5 0 01-2 9z",
  wifi: "M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M18.36 14.28a6 6 0 00-4.36-1.74 6 6 0 00-4.36 1.74M12 18h.01",
  block: "M12 2a10 10 0 110 20 10 10 0 010-20z M4.93 4.93l14.14 14.14",
  server: "M20 6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6z M2 6h20 M2 12h20 M2 18h20 M8 6v12 M16 6v12",
}

function AnimatedPath({ d, color, delay = 0 }: { d: string; color: string; delay?: number }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.8, delay, ease: "easeInOut" }}
    />
  )
}

function SvgIcon({ path, size = 24, color = "#64748b" }: { path: string; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  )
}

// ── Router → DNS → Protected ──
function RouterDnsDiagram({ protected_ }: { protected_: boolean }) {
  const ok = "#22c55e"
  const muted = "#94a3b8"
  const accent = protected_ ? ok : "#ef4444"

  return (
    <svg viewBox="0 0 400 160" className="w-full max-w-md mx-auto" fill="none">
      {/* Router */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        <rect x="20" y="50" width="60" height="40" rx="8" className="fill-brand-100 stroke-brand-300" strokeWidth="1.5" />
        <path d={Icons.router} stroke="#6366f1" strokeWidth="1.5" transform="translate(32, 58)" />
        <text x="50" y="105" textAnchor="middle" className="fill-slate-600 text-[10px] font-medium">Router</text>
      </motion.g>

      {/* Arrow */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <line x1="80" y1="70" x2="120" y2="70" stroke={protected_ ? ok : muted} strokeWidth="2" strokeDasharray={protected_ ? "none" : "5,3"} />
        <polygon points="118,65 128,70 118,75" fill={protected_ ? ok : muted} />
      </motion.g>

      {/* DNS Shield */}
      <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, type: "spring" }}>
        <rect x="130" y="40" width="80" height="60" rx="12" className={protected_ ? "fill-success-50 stroke-success-300" : "fill-red-50 stroke-red-300"} strokeWidth="1.5" />
        <path d={Icons.shield} stroke={accent} strokeWidth="1.5" transform="translate(154, 54)" />
        {protected_ && <path d={Icons.check} stroke={ok} strokeWidth="2" transform="translate(154, 54)" />}
        {!protected_ && <path d={Icons.block} stroke="#ef4444" strokeWidth="1.5" transform="translate(154, 54)" />}
        <text x="170" y="115" textAnchor="middle" className={protected_ ? "fill-success-600 text-[10px] font-semibold" : "fill-red-500 text-[10px] font-semibold"}>
          {protected_ ? "✓ PROTEGIDO" : "SIN FILTRO"}
        </text>
      </motion.g>

      {/* Arrow 2 */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        <line x1="210" y1="70" x2="250" y2="70" stroke={protected_ ? ok : muted} strokeWidth="2" strokeDasharray={protected_ ? "none" : "5,3"} />
        <polygon points="248,65 258,70 248,75" fill={protected_ ? ok : muted} />
      </motion.g>

      {/* Internet Cloud */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
        <rect x="260" y="45" width="60" height="50" rx="25" className="fill-slate-50 stroke-slate-300" strokeWidth="1.5" />
        <path d={Icons.cloud} stroke="#94a3b8" strokeWidth="1.5" transform="translate(276, 57)" />
        <text x="290" y="110" textAnchor="middle" className="fill-slate-500 text-[10px]">Internet</text>
      </motion.g>

      {/* Blocked content indicator */}
      {protected_ && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
          <rect x="310" y="42" width="70" height="56" rx="8" fill="#fef2f2" stroke="#fecaca" strokeWidth="1" />
          <path d="M325 56 L335 66 M335 56 L325 66" stroke="#ef4444" strokeWidth="2" />
          <text x="345" y="75" textAnchor="middle" className="fill-red-500 text-[9px] font-semibold">Contenido</text>
          <text x="345" y="88" textAnchor="middle" className="fill-red-500 text-[9px] font-semibold">bloqueado</text>
        </motion.g>
      )}
    </svg>
  )
}

// ── Full Home Network ──
function FullHomeDiagram({ protected_ }: { protected_: boolean }) {
  const ok = "#22c55e"

  return (
    <svg viewBox="0 0 500 260" className="w-full max-w-xl mx-auto" fill="none">
      {/* Background */}
      <rect x="2" y="2" width="496" height="256" rx="16" className="fill-slate-50/50 stroke-slate-200" strokeWidth="1" />

      {/* Title */}
      <text x="250" y="28" textAnchor="middle" className="fill-slate-700 text-[11px] font-bold">🌐 Tu red doméstica</text>

      {/* Internet top */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        <rect x="210" y="36" width="80" height="36" rx="18" className="fill-slate-100 stroke-slate-300" strokeWidth="1" />
        <path d={Icons.cloud} stroke="#94a3b8" strokeWidth="1.5" transform="translate(228, 46)" />
        <text x="250" y="86" textAnchor="middle" className="fill-slate-500 text-[9px]">Internet</text>
      </motion.g>

      {/* Arrow down */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <line x1="250" y1="72" x2="250" y2="100" stroke="#94a3b8" strokeWidth="1.5" />
        <polygon points="246,98 250,106 254,98" fill="#94a3b8" />
      </motion.g>

      {/* DNS Shield (in the middle) */}
      <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, type: "spring" }}>
        <rect x="195" y="104" width="110" height="40" rx="20" className={protected_ ? "fill-success-50 stroke-success-300" : "fill-red-50 stroke-red-300"} strokeWidth="1.5" />
        <path d={Icons.shield} stroke={protected_ ? ok : "#ef4444"} strokeWidth="1.5" transform="translate(213, 114)" />
        {protected_ && <path d={Icons.check} stroke={ok} strokeWidth="2" transform="translate(213, 114)" />}
        {!protected_ && <g transform="translate(213, 114)"><circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="1.5" /><line x1="6" y1="6" x2="18" y2="18" stroke="#ef4444" strokeWidth="1.5" /></g>}
        <text x="250" y="130" textAnchor="middle" className={protected_ ? "fill-success-700 text-[10px] font-bold" : "fill-red-600 text-[10px] font-bold"}>
          DNS {protected_ ? "PROTEGIDO" : "SIN FILTRO"}
        </text>
      </motion.g>

      {/* Arrow down to router */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <line x1="250" y1="144" x2="250" y2="168" stroke={protected_ ? ok : "#94a3b8"} strokeWidth="1.5" />
        <polygon points="246,166 250,174 254,166" fill={protected_ ? ok : "#94a3b8"} />
      </motion.g>

      {/* Router */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        <rect x="215" y="172" width="70" height="40" rx="8" className="fill-brand-100 stroke-brand-300" strokeWidth="1.5" />
        <path d={Icons.router} stroke="#6366f1" strokeWidth="1.5" transform="translate(228, 182)" />
        <text x="250" y="226" textAnchor="middle" className="fill-slate-600 text-[10px] font-medium">Router (WiFi)</text>
      </motion.g>

      {/* Devices connected to router */}
      <g>
        {/* Phone */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          <line x1="215" y1="192" x2="100" y2="192" stroke={protected_ ? ok : "#cbd5e1"} strokeWidth="1.5" />
          <circle cx="100" cy="192" r="4" fill={protected_ ? ok : "#cbd5e1"} />
          <rect x="60" y="208" width="44" height="30" rx="6" className="fill-white stroke-slate-300" strokeWidth="1" />
          <path d={Icons.phone} stroke="#64748b" strokeWidth="1.2" transform="translate(70, 214)" />
          <text x="82" y="248" textAnchor="middle" className="fill-slate-500 text-[8px]">Móvil</text>
          {protected_ && <motion.path initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} d="M96 212 L99 215 L105 209" stroke={ok} strokeWidth="1.5" />}
        </motion.g>

        {/* Laptop */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
          <line x1="285" y1="192" x2="370" y2="192" stroke={protected_ ? ok : "#cbd5e1"} strokeWidth="1.5" />
          <circle cx="370" cy="192" r="4" fill={protected_ ? ok : "#cbd5e1"} />
          <rect x="350" y="208" width="50" height="32" rx="4" className="fill-white stroke-slate-300" strokeWidth="1" />
          <path d={Icons.laptop} stroke="#64748b" strokeWidth="1.2" transform="translate(360, 214)" />
          <text x="375" y="250" textAnchor="middle" className="fill-slate-500 text-[8px]">Ordenador</text>
          {protected_ && <motion.path initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} d="M365 213 L368 216 L376 210" stroke={ok} strokeWidth="1.5" />}
        </motion.g>

        {/* Tablet */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}>
          <line x1="250" y1="212" x2="250" y2="240" stroke={protected_ ? ok : "#cbd5e1"} strokeWidth="1.5" />
          <circle cx="250" cy="240" r="4" fill={protected_ ? ok : "#cbd5e1"} />
          <rect x="235" y="244" width="30" height="38" rx="4" className="fill-white stroke-slate-300" strokeWidth="1" />
          <text x="250" y="288" textAnchor="middle" className="fill-slate-500 text-[8px]">Tablet</text>
        </motion.g>
      </g>

      {/* Legend */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
        <text x="420" y="228" textAnchor="middle" className="fill-slate-400 text-[8px]">Protegido</text>
        <circle cx="403" cy="225" r="4" fill={ok} />
      </motion.g>
    </svg>
  )
}

// ── Mobile only ──
function MobileDiagram({ protected_ }: { protected_: boolean }) {
  const ok = "#22c55e"

  return (
    <svg viewBox="0 0 280 180" className="w-full max-w-sm mx-auto" fill="none">
      {/* Phone */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        <rect x="20" y="50" width="40" height="70" rx="8" className="fill-white stroke-slate-300" strokeWidth="1.5" />
        <path d="M28 60 L52 60" stroke="#e2e8f0" strokeWidth="1" />
        <rect x="25" y="64" width="30" height="4" rx="1" className="fill-brand-100" />
        <rect x="25" y="70" width="20" height="4" rx="1" className="fill-slate-100" />
        <rect x="25" y="76" width="25" height="4" rx="1" className="fill-slate-100" />
        <circle cx="40" cy="115" r="10" className="fill-slate-100 stroke-slate-300" strokeWidth="1" />
        <text x="40" y="138" textAnchor="middle" className="fill-slate-500 text-[8px]">Móvil</text>
      </motion.g>

      {/* DNS Shield */}
      <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, type: "spring" }}>
        <rect x="90" y="55" width="70" height="60" rx="12" className={protected_ ? "fill-success-50 stroke-success-300" : "fill-red-50 stroke-red-300"} strokeWidth="1.5" />
        <path d={Icons.shield} stroke={protected_ ? ok : "#ef4444"} strokeWidth="1.5" transform="translate(112, 68)" />
        <text x="125" y="100" textAnchor="middle" className={protected_ ? "fill-success-600 text-[9px] font-bold" : "fill-red-500 text-[9px] font-bold"}>
          DNS
        </text>
        <text x="125" y="110" textAnchor="middle" className={protected_ ? "fill-success-500 text-[8px]" : "fill-red-400 text-[8px]"}>
          {protected_ ? "ACTIVO" : "INACTIVO"}
        </text>
      </motion.g>

      {/* Arrow 1 */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <line x1="60" y1="85" x2="90" y2="85" stroke={protected_ ? ok : "#94a3b8"} strokeWidth="1.5" />
        <polygon points="87,81 96,85 87,89" fill={protected_ ? ok : "#94a3b8"} />
      </motion.g>

      {/* Internet */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        <rect x="190" y="58" width="50" height="54" rx="12" className="fill-slate-50 stroke-slate-300" strokeWidth="1.5" />
        <path d={Icons.cloud} stroke="#94a3b8" strokeWidth="1.5" transform="translate(200, 70)" />
        <text x="215" y="100" textAnchor="middle" className="fill-slate-500 text-[8px]">Internet</text>
      </motion.g>

      {/* Arrow 2 */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
        <line x1="160" y1="85" x2="190" y2="85" stroke={protected_ ? ok : "#94a3b8"} strokeWidth="1.5" />
        <polygon points="187,81 196,85 187,89" fill={protected_ ? ok : "#94a3b8"} />
      </motion.g>

      {/* Block indicator */}
      {protected_ && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          <rect x="200" y="125" width="50" height="30" rx="6" className="fill-red-50 stroke-red-200" strokeWidth="1" />
          <text x="225" y="140" textAnchor="middle" className="fill-red-500 text-[8px] font-semibold">🚫 Contenido</text>
          <text x="225" y="150" textAnchor="middle" className="fill-red-500 text-[8px] font-semibold">bloqueado</text>
        </motion.g>
      )}

      {/* Status text */}
      <text x="140" y="170" textAnchor="middle" className={protected_ ? "fill-success-600 text-[10px] font-semibold" : "fill-red-500 text-[10px] font-semibold"}>
        {protected_ ? "✓ Datos móviles protegidos" : "⚠ Sin protección DNS"}
      </text>
    </svg>
  )
}
