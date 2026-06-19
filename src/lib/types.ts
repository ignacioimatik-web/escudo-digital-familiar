export type Difficulty = "facil" | "medio" | "avanzado"

export type DeviceType = "android" | "iphone" | "windows" | "macos" | "router" | "navegador"

export type NetworkContext =
  | "wifi-casa"
  | "datos-moviles"
  | "wifi-datos"
  | "dispositivo-compartido"
  | "dispositivo-personal"

export type ProtectionLevel = "basico" | "recomendado" | "avanzado"

export type AgeGroup = "0-6" | "7-11" | "12-14" | "15-17"

export interface Step {
  numero: number
  titulo: string
  descripcion: string
  nota?: string
}

export interface Warning {
  titulo: string
  descripcion: string
}

export interface FrequentError {
  problema: string
  solucion: string
}

export interface DeviceGuide {
  id: DeviceType
  titulo: string
  descripcion: string
  dificultad: Difficulty
  tiempoEstimado: string
  icono: string
  pasos: Step[]
  advertencias: Warning[]
  validacionFinal: string
  erroresFrecuentes: FrequentError[]
}

export interface MethodLayer {
  id: string
  titulo: string
  subtitulo: string
  descripcion: string
  queHace: string[]
  queNoHace: string[]
  dondeSeConfigura: string[]
  icono: string
}

export interface AgeTransition {
  rango: AgeGroup
  titulo: string
  descripcion: string
  filtros: string
  criterio: string
  acompanamiento: string
}

export interface ConfiguratorStep {
  dispositivo: DeviceType
  contexto: NetworkContext
  nivel: ProtectionLevel
  pasosRecomendados: string[]
  checklist: string[]
  validacion: string
}

export interface FaqItem {
  id: string
  pregunta: string
  respuesta: string
  categoria: string
}

export interface AudienceInfo {
  id: string
  titulo: string
  descripcion: string
  beneficios: string[]
  recursos: string[]
  icono: string
}

export interface LegalSection {
  id: string
  titulo: string
  contenido: string[]
}
