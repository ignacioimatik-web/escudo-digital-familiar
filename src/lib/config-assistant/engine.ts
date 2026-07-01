// Sentinel — AI Configuration Assistant Engine v3
// Simplified flow: dispositivo → nivel → instrucciones (no network context)

import {
  type DeviceType,
  type NetworkContext,
  type ProtectionLevel,
  type DeviceConfig,
  type ConfigStep,
  type DeviceInfo,
  deviceTypes,
  getDeviceInfo,
  getDeviceLabel,
} from "./types"
import { findConfig } from "./knowledge-base"

// ── TYPES ──

export type ConversationPhase =
  | "inicio"
  | "nivel"
  | "pasos"
  | "resumen"
  | "dudas"
  | "dns-compare"
  | "ayuda"
  | "finalizado"

export interface ConversationState {
  phase: ConversationPhase
  device: DeviceType | null
  network: NetworkContext
  level: ProtectionLevel | null
  currentStepIndex: number
  config: DeviceConfig | null
  history: { role: "user" | "assistant"; text: string }[]
  deviceInfo: DeviceInfo | null
  processedInputs: Set<string>
}

export interface AssistantResponse {
  message: string
  options?: { value: string; label: string; icon?: string; desc?: string }[]
  steps?: ConfigStep[]
  progress?: { current: number; total: number }
  phase: ConversationPhase
  state: ConversationState
}

// ── INIT ──

export function createInitialState(): ConversationState {
  return {
    phase: "inicio",
    device: null,
    network: "wifi-casa",
    level: null,
    currentStepIndex: 0,
    config: null,
    history: [],
    deviceInfo: null,
    processedInputs: new Set(),
  }
}

// ── FUZZY MATCHING ──

function normalize(text: string): string {
  return text.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
}

function wordOverlap(input: string, keywords: string[]): number {
  const inputWords = normalize(input).split(/\s+/).filter(Boolean)
  if (inputWords.length === 0) return 0
  let matches = 0
  for (const kw of keywords) {
    const kwNorm = normalize(kw)
    const kwWords = kwNorm.split(/\s+/)
    for (const iw of inputWords) {
      for (const kw of kwWords) {
        if (iw === kw || kw.includes(iw) || iw.includes(kw)) {
          matches++
          break
        }
      }
    }
  }
  return matches / inputWords.length
}

// ── KEYWORD DATABASES ──

const deviceKeywords: Record<DeviceType, string[]> = {
  android: ["android", "samsung", "xiaomi", "huawei", "google pixel", "oneplus", "oppo", "realme", "móvil android", "tablet android", "miui", "hyperos", "one ui", "coloros", "pixel", "motorola", "sony", "lg", "nokia", "android tv", "google tv"],
  iphone: ["iphone", "ipad", "apple", "ios", "ipados", "tablet apple", "ipod", "móvil apple", "apple tv", "homepod"],
  windows: ["windows", "pc", "ordenador windows", "portátil windows", "microsoft", "surface", "lenovo", "hp", "dell", "windows 10", "windows 11", "portátil", "sobremesa"],
  macos: ["mac", "macbook", "imac", "mac mini", "mac studio", "mac pro", "macos", "ordenador apple", "macbook air", "macbook pro"],
  router: ["router", "wifi", "red de casa", "modem", "fibra", "movistar", "orange", "vodafone", "digi", "asm", "tp-link", "mikrotik", "router del operador", "ont", "access point"],
  navegador: ["navegador", "chrome", "edge", "firefox", "opera", "brave", "safari", "browser", "dns del navegador", "chromium"],
  "smart-tv": ["tv", "televisión", "smart tv", "samsung tv", "lg tv", "android tv", "google tv", "apple tv", "televisor"],
  tablet: ["tablet android", "ipad", "tablet", "fire tablet", "amazon tablet", "tableta", "samsung tablet", "xiaomi pad"],
  chromebook: ["chromebook", "chromeos"],
  consola: ["playstation", "ps4", "ps5", "xbox", "nintendo switch", "consola", "videojuegos", "nintendo", "play", "xbox series"],
  kindle: ["kindle", "fire tablet amazon", "echo show", "amazon kids", "amazon fire"],
}

const levelKeywords: Record<ProtectionLevel, string[]> = {
  basico: ["básico", "rápido", "sencillo", "simple", "mínimo", "lo justo", "primera vez", "empezar", "fácil", "sin complicaciones", "poco", "suave", "ligero", "lo mínimo"],
  recomendado: ["recomendado", "completo", "normal", "estándar", "equilibrio", "la mayoría", "típico", "lo normal", "ideal", "medio", "balanceado", "correcto", "bueno"],
  avanzado: ["avanzado", "máximo", "máxima", "todo", "muy protegido", "estricto", "exhaustivo", "completo", "extremo", "menor de 12", "pequeño", "exhaustivo", "máxima protección", "blindado", "fuerte"],
}

// ── CLASSIFIERS ──

function classifyDevice(text: string): { device: DeviceType; score: number } | null {
  const normalized = normalize(text)
  let best: { device: DeviceType; score: number } | null = null
  for (const [device, keywords] of Object.entries(deviceKeywords)) {
    const score = wordOverlap(text, keywords)
    if (score > (best?.score ?? 0) && score >= 0.3) {
      best = { device: device as DeviceType, score }
    }
  }
  return best
}

function classifyLevel(text: string): { level: ProtectionLevel; score: number } | null {
  let best: { level: ProtectionLevel; score: number } | null = null
  for (const [level, keywords] of Object.entries(levelKeywords)) {
    const score = wordOverlap(text, keywords)
    if (score > (best?.score ?? 0) && score >= 0.3) {
      best = { level: level as ProtectionLevel, score }
    }
  }
  return best
}

// ── RESPONSE GENERATORS ──

function mensajeInicio(): string {
  return "¡Hola! Me alegra verte por aquí 😊 Voy a ayudarte a proteger los dispositivos de tu familia paso a paso.\n\n**Lo primero: ¿qué dispositivo quieres proteger?**\n\nPuedes elegirlo abajo o escribirme el nombre directamente."
}

function mensajeDispositivo(device: DeviceType, info: DeviceInfo): string {
  const iconos: Record<string, string> = {
    android: "📱", iphone: "📱", windows: "💻", macos: "💻", router: "📡",
    navegador: "🌐", "smart-tv": "📺", tablet: "📱", chromebook: "💻",
    consola: "🎮", kindle: "📖",
  }
  return (iconos[device] || "📱") + " **" + info.label + "** — ¡perfecto! 😊\n\nAhora dime **¿qué nivel de protección necesitas?** Elige según la edad del menor:\n\n• **Básico** 🟢 → A partir de 15 años\n• **Recomendado** 🔵 → De 7 a 14 años\n• **Avanzado** 🔴 → Hasta 12 años"
}

function mensajeNivel(level: ProtectionLevel, config: DeviceConfig): string {
  return "¡Estupendo! 🎉\n\n**Tiempo estimado:** " + config.tiempoEstimado + "\n**Resumen:** " + config.resumen + "\n\n¿Empezamos con el primer paso?"
}

function mensajePaso(step: ConfigStep, current: number, total: number): string {
  let msg = "**Paso " + current + "/" + total + ":** " + step.titulo + "\n\n" + step.descripcion
  if (step.notas && step.notas.length > 0) {
    msg += "\n\n💡 **Consejo:** " + step.notas.join("\n")
  }
  if (step.advertencia) {
    msg += "\n\n⚠️ **Importante:** " + step.advertencia
  }
  return msg
}

function pasoOptions(currentIndex: number, totalPasos: number) {
  const opts: { value: string; label: string }[] = []
  if (currentIndex > 0) {
    opts.push({ value: "__atras__", label: "👈 Volver" })
  }
  if (currentIndex < totalPasos - 1) {
    opts.push({ value: "__siguiente__", label: "👉 Siguiente paso" })
  } else {
    opts.push({ value: "__siguiente__", label: "✅ He terminado" })
  }
  opts.push({ value: "__duda__", label: "❓ Tengo una duda" })
  return opts
}

// ── HELPERS ──

function nivelOptions() {
  return [
    { value: "basico", label: "Básico 🟢", desc: "+15 años o primer paso" },
    { value: "recomendado", label: "Recomendado 🔵", desc: "7-14 años, equilibrio ideal" },
    { value: "avanzado", label: "Avanzado 🔴", desc: "0-12 años o máxima protección" },
  ]
}

function buildConfigResponse(state: ConversationState): AssistantResponse | null {
  if (!state.device || !state.level) return null
  const config = findConfig(state.device, state.network, state.level)
  if (!config) {
    state.phase = "finalizado"
    return {
      message: "No tengo una guía exacta para esa combinación, pero te recomiendo configurar el **router** que protege toda la red de casa. ¿Te parece buena idea?",
      options: [
        { value: "router", label: "Configurar el router" },
        { value: "__ver_dns__", label: "Ver DNS disponibles" },
      ],
      phase: "finalizado",
      state,
    }
  }
  state.config = config
  state.currentStepIndex = 0
  state.phase = "pasos"
  const firstStep = config.pasos[0]
  return {
    message: mensajeNivel(state.level, config) + "\n\n---\n\n" + mensajePaso(firstStep, 1, config.pasos.length),
    options: pasoOptions(0, config.pasos.length).filter(o => o.value !== "__atras__"),
    steps: config.pasos,
    progress: { current: 1, total: config.pasos.length },
    phase: "pasos",
    state,
  }
}

// ── MAIN ENGINE ──

export function processInput(
  state: ConversationState,
  input: string
): AssistantResponse {
  state.history.push({ role: "user", text: input })

  // ── INICIO ──
  if (state.phase === "inicio" && input) {
    const result = classifyDevice(input)
    if (result) {
      state.device = result.device
      state.deviceInfo = getDeviceInfo(result.device)!
      state.phase = "nivel"
      return {
        message: mensajeDispositivo(result.device, state.deviceInfo),
        options: nivelOptions(),
        phase: "nivel",
        state,
        progress: { current: 1, total: 3 },
      }
    }
    return {
      message: mensajeInicio(),
      options: deviceTypes.map(d => ({
        value: d.id,
        label: d.label,
        icon: d.icon,
        desc: d.descripcion.length > 60 ? d.descripcion.slice(0, 60) + "..." : d.descripcion,
      })),
      phase: "inicio",
      state,
      progress: { current: 0, total: 3 },
    }
  }

  // ── DISPOSITIVO (desde botón, sin input) ──
  if (state.phase === "inicio" && !input && state.device && state.deviceInfo) {
    state.phase = "nivel"
    return {
      message: mensajeDispositivo(state.device, state.deviceInfo),
      options: nivelOptions(),
      phase: "nivel",
      state,
      progress: { current: 1, total: 3 },
    }
  }

  // ── NIVEL ──
  if (state.phase === "nivel") {
    let selectedLevel: ProtectionLevel | null = null
    if (input && !["basico", "recomendado", "avanzado"].includes(input)) {
      const result = classifyLevel(input)
      if (result) selectedLevel = result.level
    } else if (["basico", "recomendado", "avanzado"].includes(input)) {
      selectedLevel = input as ProtectionLevel
    }

    if (!selectedLevel) {
      return {
        message: "No lo he entendido bien 😊 Elige un nivel de protección según la edad del menor:",
        options: nivelOptions(),
        phase: "nivel",
        state,
        progress: { current: 1, total: 3 },
      }
    }

    state.level = selectedLevel
    const configResponse = buildConfigResponse(state)
    if (configResponse) return configResponse

    // fallback nivel
    return {
      message: "¿Qué nivel de protección prefieres?",
      options: nivelOptions(),
      phase: "nivel",
      state,
    }
  }

  // ── PASOS ──
  if (state.phase === "pasos") {
    const lower = input.toLowerCase()

    // Ir a paso anterior
    if (input === "__atras__" || lower.includes("atrás") || lower.includes("volver")) {
      if (state.currentStepIndex > 0) {
        state.currentStepIndex = state.currentStepIndex - 1
        const step = state.config!.pasos[state.currentStepIndex]
        return {
          message: mensajePaso(step, state.currentStepIndex + 1, state.config!.pasos.length),
          options: pasoOptions(state.currentStepIndex, state.config!.pasos.length),
          progress: { current: state.currentStepIndex + 1, total: state.config!.pasos.length },
          phase: "pasos",
          state,
        }
      }
      // Ya en el primer paso — no se puede retroceder más
      return {
        message: "Estás en el primer paso. No puedes ir más atrás 😊",
        options: pasoOptions(state.currentStepIndex, state.config?.pasos.length || 0),
        phase: "pasos",
        state,
      }
    }

    // Ir a un paso específico (desde las barras de progreso)
    if (input.startsWith("__ir_a_")) {
      const target = parseInt(input.replace("__ir_a_", "").replace("__", ""), 10)
      if (!isNaN(target) && target >= 0 && state.config && target < state.config.pasos.length) {
        state.currentStepIndex = target
        const step = state.config.pasos[target]
        return {
          message: mensajePaso(step, target + 1, state.config.pasos.length),
          options: pasoOptions(target, state.config.pasos.length),
          progress: { current: target + 1, total: state.config.pasos.length },
          phase: "pasos",
          state,
        }
      }
    }

    if (lower.includes("siguiente") || lower.includes("hecho") || lower.includes("listo") || input === "__siguiente__") {
      const nextIndex = state.currentStepIndex + 1
      if (state.config && nextIndex < state.config.pasos.length) {
        state.currentStepIndex = nextIndex
        const step = state.config.pasos[nextIndex]
        return {
          message: mensajePaso(step, nextIndex + 1, state.config.pasos.length),
          options: pasoOptions(nextIndex, state.config.pasos.length),
          progress: { current: nextIndex + 1, total: state.config.pasos.length },
          phase: "pasos",
          state,
        }
      } else {
        state.phase = "resumen"
        return {
          message: "**¡Todos los pasos completados!** 🎉\n\nAhora vamos a verificar que todo funciona:\n\n" + (state.config?.verificacion || ""),
          options: [
            { value: "__funciona__", label: "Todo funciona!" },
            { value: "__no_funciona__", label: "Algo no funciona" },
            { value: "__ver_dns__", label: "Ver otros DNS" },
          ],
          phase: "resumen",
          state,
        }
      }
    }

    if (lower.includes("duda") || input === "__duda__") {
      return {
        message: "Claro, con gusto te ayudo 👐 Dime qué duda tienes y la resolveremos juntos.",
        options: [{ value: "__siguiente__", label: "Seguir con los pasos" }],
        phase: "dudas",
        state,
      }
    }

    if (lower.includes("dns") || input === "__ver_dns__") {
      return {
        message: "📡 **DNS4.EU — perfiles según la edad**\n\nTodos gratuitos, europeos, sin ánimo de lucro:\n\n🟢 **Protective** → `86.54.11.1` / `86.54.11.201`\n   Para +15 años. Bloquea malware y amenazas.\n\n🔵 **Child Protection** (recomendado) → `86.54.11.12` / `86.54.11.212`\n   Para 7-14 años. Bloquea adultos, violencia, drogas.\n\n🔴 **Child + Ad Blocking** → `86.54.11.11` / `86.54.11.211`\n   Para 0-12 años. Lo mismo + bloquea anuncios.\n\n🟣 **Ad Blocking** → `86.54.11.13` / `86.54.11.213`\n   Solo bloqueo de anuncios, sin filtro infantil.\n\n📱 **Android (DNS privado):** usa el hostname según perfil:\n   • `child.joindns4.eu` → protección infantil\n   • `protective.joindns4.eu` → solo malware\n   • `child-noads.joindns4.eu` → infantil + anti anuncios\n\n📖 Más info: joindns4.eu/for-public",
        options: [{ value: "__siguiente__", label: "Seguir con los pasos" }],
        phase: "dns-compare",
        state,
      }
    }

    // Default in steps
    return {
      message: "😊 ¿Has completado este paso? Puedes decir **'Hecho'** para continuar, **'Volver'** para retroceder, o **'Duda'** si tienes preguntas.",
      options: pasoOptions(state.currentStepIndex, state.config?.pasos.length || 0),
      phase: "pasos",
      state,
    }
  }

  // ── RESUMEN ──
  if (state.phase === "resumen") {
    if (input === "__funciona__" || input.toLowerCase().includes("funciona")) {
      state.phase = "finalizado"
      return {
        message: "**¡Me alegra muchísimo!** 🎉 Todo está funcionando.\n\nRecuerda revisar los ajustes cada 3 meses y adaptar la protección a medida que el menor crece.\n\n**Proteger para educar. Educar para liberar.** 💙",
        options: [
          { value: "__otro__", label: "🔄 Configurar otro dispositivo" },
          { value: "__fin__", label: "No, gracias. ¡He terminado!" },
        ],
        phase: "finalizado",
        state,
      }
    }
    if (input === "__no_funciona__" || input.toLowerCase().includes("no funciona")) {
      return {
        message: "**No te preocupes, vamos a solucionarlo.** 🛠️\n\nErrores frecuentes:\n\n" +
          (state.config?.erroresFrecuentes.map(function(e, i) { return (i + 1) + ". **" + e.problema + "** → " + e.solucion; }).join("\n") || ""),
        options: [
          { value: "__siguiente__", label: "🔄 Intentar de nuevo" },
          { value: "__funciona__", label: "✅ ¡Ya funciona!" },
        ],
        phase: "resumen",
        state,
      }
    }
    return {
      message: "✅ **¿Funciona todo correctamente?**",
      options: [
        { value: "__funciona__", label: "✅ Todo funciona" },
        { value: "__no_funciona__", label: "🔧 Algo no funciona" },
      ],
      phase: "resumen",
      state,
    }
  }

  // ── DUDAS / DNS COMPARE ──
  if (state.phase === "dudas" || state.phase === "dns-compare" || state.phase === "ayuda") {
    if (input === "__siguiente__" || input.toLowerCase().includes("seguir") || input.toLowerCase().includes("volver")) {
      if (state.config && state.currentStepIndex >= 0) {
        state.phase = "pasos"
        const step = state.config.pasos[state.currentStepIndex]
        return {
          message: mensajePaso(step, state.currentStepIndex + 1, state.config.pasos.length),
          options: [
            { value: "__siguiente__", label: "Hecho, siguiente" },
            { value: "__duda__", label: "Tengo una duda" },
          ],
          phase: "pasos",
          state,
        }
      }
      state.phase = "inicio"
      return resetConversation()
    }
    return {
      message: "¿Quieres volver a los pasos de configuración? Cuando quieras, aquí estoy.",
      options: [{ value: "__siguiente__", label: "Sí, volver" }],
      phase: state.phase as any,
      state,
    }
  }

  // ── FINALIZADO ──
  if (state.phase === "finalizado") {
    if (input === "__otro__" || input.toLowerCase().includes("otro") || input.toLowerCase().includes("otra vez")) {
      return resetConversation()
    }
    if (input === "__fin__" || input.toLowerCase().includes("gracias") || input.toLowerCase().includes("nada más")) {
      return {
        message: "😊 De nada. Ha sido un placer ayudarte. **Proteger para educar, educar para liberar.**\n\n¡Hasta pronto! Cuídate mucho 💙",
        options: [{ value: "__otro__", label: "🔄 Empezar de nuevo" }],
        phase: "finalizado",
        state,
      }
    }
    return {
      message: "¿Quieres configurar otro dispositivo? Puedo ayudarte con todos los que tengas en casa.",
      options: [
        { value: "__otro__", label: "✅ Sí, otro dispositivo" },
        { value: "__fin__", label: "No, gracias. ¡Terminamos!" },
      ],
      phase: "finalizado",
      state,
    }
  }

  // ── RESET ──
  return resetConversation()
}

export function resetConversation(): AssistantResponse {
  const newState = createInitialState()
  return {
    message: mensajeInicio(),
    options: deviceTypes.map(d => ({
      value: d.id,
      label: d.label,
      icon: d.icon,
      desc: d.descripcion.length > 60 ? d.descripcion.slice(0, 60) + "..." : d.descripcion,
    })),
    progress: { current: 0, total: 3 },
    phase: "inicio",
    state: newState,
  }
}
