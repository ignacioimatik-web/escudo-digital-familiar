"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type UserRole = "familia" | "colegio" | "profesional" | "catequesis"

interface RoleContextType {
  role: UserRole
  setRole: (role: UserRole) => void
}

const RoleContext = createContext<RoleContextType>({
  role: "familia",
  setRole: () => {},
})

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>("familia")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("sentinel-role") as UserRole | null
    if (saved && ["familia", "colegio", "profesional", "catequesis"].includes(saved)) {
      setRole(saved)
    }
  }, [])

  const handleSetRole = (newRole: UserRole) => {
    setRole(newRole)
    if (mounted) {
      localStorage.setItem("sentinel-role", newRole)
    }
  }

  return (
    <RoleContext.Provider value={{ role, setRole: handleSetRole }}>
      {children}
    </RoleContext.Provider>
  )
}

export function useRole() {
  return useContext(RoleContext)
}

// ── Role content ──
export const roleContent: Record<UserRole, {
  hero: { title: string; highlight: string; subtitle: string; badge: string }
  cta: { primary: string; secondary: string }
  features: { icon: string; title: string; desc: string }[]
}> = {
  familia: {
    hero: {
      title: "Un escudo digital",
      highlight: "para tu familia",
      subtitle: "Método en dos capas — DNS de protección y control parental — para crear un entorno digital seguro, sencillo y eficaz. Sin coste. Sin complicaciones.",
      badge: "👨‍👩‍👧‍👦 Para familias",
    },
    cta: { primary: "Proteger a mi familia", secondary: "Conocer el método" },
    features: [
      { icon: "Shield", title: "DNS de protección", desc: "Bloquea contenido inadecuado en todos los dispositivos de casa" },
      { icon: "Smartphone", title: "Control parental", desc: "Límites de uso, restricciones de apps y acompañamiento" },
      { icon: "Heart", title: "Tranquilidad", desc: "Tus hijos navegan seguros mientras tú haces otras cosas" },
    ],
  },
  colegio: {
    hero: {
      title: "Protege a tus alumnos",
      highlight: "dentro y fuera del aula",
      subtitle: "Implementa un sistema de protección digital en tu centro educativo. DNS en la red del colegio + recursos para que las familias continúen en casa.",
      badge: "🏫 Para centros educativos",
    },
    cta: { primary: "Implementar en el centro", secondary: "Material para familias" },
    features: [
      { icon: "GraduationCap", title: "DNS en el centro", desc: "Protege toda la red del colegio con un solo cambio" },
      { icon: "Users", title: "Coordinación familias", desc: "Recursos para que el método continúe en casa" },
      { icon: "BookOpen", title: "Material didáctico", desc: "Charlas, talleres y guías para toda la comunidad" },
    ],
  },
  profesional: {
    hero: {
      title: "Salud digital infantil",
      highlight: "desde tu consulta",
      subtitle: "Proporciona a las familias recursos de protección digital como parte de la promoción de la salud infantil y adolescente. El entorno digital es un determinante de salud clave.",
      badge: "🩺 Para profesionales sanitarios",
    },
    cta: { primary: "Acceder a recursos", secondary: "Protocolos clínicos" },
    features: [
      { icon: "Stethoscope", title: "Material clínico", desc: "Folletos y guías para entregar en consulta" },
      { icon: "FileText", title: "Protocolos", desc: "Detección precoz de problemas relacionados con pantallas" },
      { icon: "ClipboardList", title: "Investigación", desc: "Colaboración en estudios sobre salud digital infantil" },
    ],
  },
  catequesis: {
    hero: {
      title: "Entornos digitales seguros",
      highlight: "en tu parroquia",
      subtitle: "Crea espacios digitales seguros para los niños y jóvenes de tu comunidad. DNS en la red parroquial + recursos para familias desde una perspectiva cristiana.",
      badge: "⛪ Para parroquias",
    },
    cta: { primary: "Proteger la parroquia", secondary: "Recursos para catequesis" },
    features: [
      { icon: "Heart", title: "Red parroquial segura", desc: "DNS de protección en la red de la parroquia" },
      { icon: "Users", title: "Catequesis digital", desc: "Formación para catequistas sobre el mundo digital" },
      { icon: "Church", title: "Acompañamiento familiar", desc: "Ayuda a las familias a proteger a sus hijos" },
    ],
  },
}
