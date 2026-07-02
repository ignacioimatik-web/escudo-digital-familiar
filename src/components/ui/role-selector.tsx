"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { useRole, type UserRole } from "@/lib/role-context"

const roles: { id: UserRole; label: string; icon: string }[] = [
  { id: "familia", label: "Familia", icon: "👨‍👩‍👧‍👦" },
  { id: "colegio", label: "Colegio", icon: "🏫" },
  { id: "profesional", label: "Sanitario", icon: "🩺" },
  { id: "catequesis", label: "Parroquia", icon: "⛪" },
]

export function RoleSelector({ compact = false }: { compact?: boolean }) {
  const { role, setRole } = useRole()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const current = roles.find(r => r.id === role)!

  return (
    <div ref={ref} className={`relative ${compact ? "" : ""}`}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 rounded-xl font-semibold transition-all ${
          compact
            ? "px-2.5 py-1 text-[10px] bg-white/10 text-white/80 border border-white/10 hover:bg-white/20"
            : "px-3 py-1.5 text-[11px] bg-white/10 text-white/90 border border-white/20 hover:bg-white/20"
        }`}
      >
        <span>{current.icon}</span>
        <span>{current.label}</span>
        <svg className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`absolute left-0 mt-1.5 bg-white rounded-xl border border-slate-200 shadow-lg z-50 overflow-hidden ${
              compact ? "min-w-[140px]" : "min-w-[160px]"
            }`}
          >
            {roles.map(r => (
              <button
                key={r.id}
                onClick={() => { setRole(r.id); setOpen(false) }}
                className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-medium transition-colors ${
                  r.id === role
                    ? "bg-brand-50 text-brand-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span>{r.icon}</span>
                <span>{r.label}</span>
                {r.id === role && (
                  <svg className="w-3.5 h-3.5 ml-auto text-brand-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
