// Escudo Digital Familiar - AI Configuration Assistant Engine v2
// Conversational decision tree with dedup protection and natural flow

import {
  type DeviceType,
  type NetworkContext,
  type ProtectionLevel,
  type DeviceConfig,
  type ConfigStep,
  type DeviceInfo,
  deviceTypes,
  networkContexts,
  getDeviceInfo,
  getNetworkContext,
  getDeviceLabel,
  getContextLabel,
} from "./types"
import { findConfig } from "./knowledge-base"
import { dnsProviders } from "./dns-providers"

// ── TYPES ──

export type ConversationPhase =
  | "inicio"
  | "dispositivo"
  | "contexto"
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
  network: NetworkContext | null
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
    network: null,
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
    // Check if any input word matches any keyword word, or keyword is a substring
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

// ── KEYWORD DATABASES (expanded) ──

const deviceKeywords: Record<DeviceType, string[]> = {
  android: ["android", "samsung", "xiaomi", "huawei", "google pixel", "oneplus", "oppo", "realme", "móvil android", "tablet android", "miui", "hyperos", "one ui", "coloros", "pixel", "motorola", "sony", "lg", "nokia", "android tv", "google tv"],
  iphone: ["iphone", "ipad", "apple", "ios", "ipados", "tablet apple", "ipod", "móvil apple", "apple tv", "homepod"],
  windows: ["windows", "pc", "ordenador windows", "portátil windows", "microsoft", "surface", "lenovo", "hp", "dell", "windows 10", "windows 11", "portátil", "sobremesa"],
  macos: ["mac", "macbook", "imac", "mac mini", "mac studio", "mac pro", "macos", "ordenador apple", "macbook air", "macbook pro"],
  router: ["router", "wifi", "red de casa", "modem", "fibra", "movistar", "orange", "vodafone", "digi", "asm", "tp-link", "mikrotik", "router del operador", "ont", "access point", "access point"],
  navegador: ["navegador", "chrome", "edge", "firefox", "opera", "brave", "safari", "browser", "dns del navegador", "chromium"],
  "smart-tv": ["tv", "televisión", "smart tv", "samsung tv", "lg tv", "android tv", "google tv", "apple tv", "televisor", "televisor"],
  tablet: ["tablet android", "ipad", "tablet", "fire tablet", "amazon tablet", "tableta", "samsung tablet", "xiaomi pad"],
  chromebook: ["chromebook", "chromeos"],
  consola: ["playstation", "ps4", "ps5", "xbox", "nintendo switch", "consola", "videojuegos", "nintendo", "play", "xbox series"],
  kindle: ["kindle", "fire tablet amazon", "echo show", "amazon kids", "amazon fire"],
}

const networkKeywords: Record<NetworkContext, string[]> = {
  "wifi-casa": ["wifi de casa", "wifi casa", "red de casa", "en casa", "hogar", "solo en casa", "conectado en casa", "desde casa", "doméstico", "en mi casa"],
  "datos-moviles": ["datos móviles", "solo datos", "4g", "5g", "fuera de casa", "no tengo wifi", "sin wifi", "operador", "movistar", "orange", "vodafone", "datos del móvil", "tarifa de datos", "solo con datos"],
  "wifi-datos": ["wifi y datos", "tanto wifi como datos", "los dos", "ambas redes", "wifi y móvil", "en casa y fuera", "ambas", "wifi i datos", "mezcla"],
  "dispositivo-compartido": ["compartido", "varios usuarios", "lo usamos varios", "familiar", "compartimos", "un solo dispositivo", "lo usa toda la familia", "lo usa todo el mundo", "uso compartido"],
  "dispositivo-personal": ["suyo", "del menor", "personal", "solo él", "exclusivo", "solo para el", "primer móvil", "primero", "exclusivo", "propio"],
  "varias-redes": ["varias redes", "casa de amigos", "colegio", "biblioteca", "se conecta en diferentes sitios", "en varios sitios", "se mueve", "diferentes sitios", "se conecta en distintos sitios"],
  "wifi-publica": ["wifi pública", "público", "cafetería", "biblioteca", "hotspot", "wifi gratis", "wifi abierta", "wifi público", "wifi libre", "wifi de centro comercial"],
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

function classifyNetwork(text: string): { network: NetworkContext; score: number } | null {
  let best: { network: NetworkContext; score: number } | null = null
  for (const [net, keywords] of Object.entries(networkKeywords)) {
    const score = wordOverlap(text, keywords)
    if (score > (best?.score ?? 0) && score >= 0.3) {
      best = { network: net as NetworkContext, score }
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
  return "¡Hola! Soy tu asistente de configuración. <S>\n\nTe ayudaré a proteger los dispositivos de tu familia en solo unos pasos.\n\n**¿Qué dispositivo quieres proteger?**\n\nPuedes seleccionarlo abajo o escribirme el nombre directamente."
}

function mensajeDispositivo(device: DeviceType, info: DeviceInfo): string {
  const iconos: Record<string, string> = {
    android: "[M]", iphone: "[M]", windows: "[PC]", macos: "[PC]", router: "[R]",
    navegador: "[G]", "smart-tv": "[TV]", tablet: "[M]", chromebook: "[PC]",
    consola: "[GAME]", kindle: "[BOOK]",
  }
  return "" + (iconos[device] || "[M]") + " " + info.label + " - perfecto! Cuentame: en que contexto se conecta a Internet?"
}

function mensajeContexto(network: NetworkContext, info: any): string {
  return "Entendido. Ahora ¿que nivel de proteccion necesitas? - Basico: +15 anos - Recomendado: 7-14 anos - Avanzado: 0-12 anos"
}

function mensajeNivel(level: ProtectionLevel, config: DeviceConfig): string {
  return "Excelente eleccion. Tiempo: " + config.tiempoEstimado + ". " + config.resumen + ". ¿Empezamos con el primer paso?"
}

function mensajePaso(step: ConfigStep, current: number, total: number): string {
  let msg = "Paso " + current + "/" + total + ": " + step.titulo + ". " + step.descripcion
  if (step.notas && step.notas.length > 0) {
    msg += ". Notas: " + step.notas.join(". ")
  }
  if (step.advertencia) {
    msg += ". ATENCION: " + step.advertencia
  }
  return msg
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
      state.phase = "contexto"
      return {
        message: mensajeDispositivo(result.device, state.deviceInfo),
        options: networkContexts.map(c => ({
          value: c.id,
          label: c.label,
          icon: c.icon,
          desc: c.descripcion.length > 60 ? c.descripcion.slice(0, 60) + "..." : c.descripcion,
        })),
        phase: "contexto",
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

  // ── DISPOSITIVO (desde botón) ──
  if (state.phase === "inicio" && !input && state.device && state.deviceInfo) {
    state.phase = "contexto"
    return {
      message: mensajeDispositivo(state.device, state.deviceInfo),
      options: networkContexts.map(c => ({
        value: c.id,
        label: c.label,
        icon: c.icon,
        desc: c.descripcion,
      })),
      phase: "contexto",
      state,
      progress: { current: 1, total: 3 },
    }
  }

  // ── CONTEXTO ──
  if (state.phase === "contexto") {
    let selectedNetwork: NetworkContext | null = null

    if (input) {
      const result = classifyNetwork(input)
      if (result) selectedNetwork = result.network
    }

    if (input && !selectedNetwork) {
      return {
        message: "No he identificado bien el contexto. ¿Puedes elegir una de estas opciones?",
        options: networkContexts.map(c => ({ value: c.id, label: c.label, icon: c.icon })),
        phase: "contexto",
        state,
        progress: { current: 1, total: 3 },
      }
    }

    state.network = selectedNetwork!
    state.phase = "nivel"
    return {
      message: mensajeContexto(selectedNetwork!, getNetworkContext(selectedNetwork!)),
      options: [
        { value: "basico", label: "<S> Básico", desc: "+15 años o primer paso" },
        { value: "recomendado", label: "<S><S> Recomendado", desc: "7-14 años, equilibrio ideal" },
        { value: "avanzado", label: "<S><S><S> Avanzado", desc: "0-12 años o riesgo alto" },
      ],
      phase: "nivel",
      state,
      progress: { current: 2, total: 3 },
    }
  }

  // ── NIVEL ──
  if (state.phase === "nivel") {
    let selectedLevel: ProtectionLevel | null = null

    if (input) {
      const result = classifyLevel(input)
      if (result) selectedLevel = result.level
    }

    if (input && !selectedLevel) {
      return {
        message: "Elige un nivel de protección:",
        options: [
          { value: "basico", label: "<S> Básico", desc: "+15 años" },
          { value: "recomendado", label: "<S><S> Recomendado", desc: "7-14 años" },
          { value: "avanzado", label: "<S><S><S> Avanzado", desc: "0-12 años" },
        ],
        phase: "nivel",
        state,
        progress: { current: 2, total: 3 },
      }
    }

    state.level = selectedLevel!

    if (state.device && state.network && state.level) {
      const config = findConfig(state.device, state.network, state.level)
      if (config) {
        state.config = config
        state.currentStepIndex = 0
        state.phase = "pasos"

        const firstStep = config.pasos[0]
        return {
          message: mensajeNivel(state.level, config) + "\n\n---\n\n" + mensajePaso(firstStep, 1, config.pasos.length),
          options: [
            { value: "__siguiente__", label: "[OK] Hecho, siguiente paso" },
            { value: "__duda__", label: "[?] Tengo una duda" },
            { value: "__ver_dns__", label: "[CHART] Comparar DNS" },
          ],
          steps: config.pasos,
          progress: { current: 3, total: 3 },
          phase: "pasos",
          state,
        }
      } else {
        state.phase = "finalizado"
        return {
          message: "No tengo una guía exacta para esta combinación, pero puedes configurar el **router** que protege toda la red. ¿Te parece?",
          options: [
            { value: "router", label: "[R] Configurar el router" },
            { value: "__ver_dns__", label: "[CHART] Ver DNS disponibles" },
          ],
          phase: "finalizado",
          state,
        }
      }
    }

    return {
      message: "¿Qué nivel prefieres?",
      options: [
        { value: "basico", label: "<S> Básico" },
        { value: "recomendado", label: "<S><S> Recomendado" },
        { value: "avanzado", label: "<S><S><S> Avanzado" },
      ],
      phase: "nivel",
      state,
    }
  }

  // ── PASOS ──
  if (state.phase === "pasos") {
    const lower = input.toLowerCase()

    if (lower.includes("siguiente") || lower.includes("hecho") || lower.includes("listo") || input === "__siguiente__") {
      const nextIndex = state.currentStepIndex + 1
      if (state.config && nextIndex < state.config.pasos.length) {
        state.currentStepIndex = nextIndex
        const step = state.config.pasos[nextIndex]
        return {
          message: mensajePaso(step, nextIndex + 1, state.config.pasos.length),
          options: [
            { value: "__siguiente__", label: "[OK] Hecho, siguiente" },
            { value: "__duda__", label: "[?] Tengo una duda" },
          ],
          phase: "pasos",
          state,
        }
      } else {
        state.phase = "resumen"
        return {
          message: "[!] **¡Todos los pasos completados!**\n\nAhora verifica que funciona:\n\n" + (state.config?.verificacion || ""),
          options: [
            { value: "__funciona__", label: "[OK] ¡Todo funciona!" },
            { value: "__no_funciona__", label: "[NO] Algo no funciona" },
            { value: "__ver_dns__", label: "[CHART] Ver otros DNS" },
          ],
          phase: "resumen",
          state,
        }
      }
    }

    if (lower.includes("duda") || input === "__duda__") {
      return {
        message: "Claro, dime qué duda tienes y te ayudo.",
        options: [{ value: "__siguiente__", label: "[BACK] Seguir con los pasos" }],
        phase: "dudas",
        state,
      }
    }

    if (lower.includes("dns") || input === "__ver_dns__") {
      return {
        message: "[CHART] **Comparativa de DNS gratuitos**\n\nLos mejores proveedores con protección familiar:\n\n[STAR] **DNS4.EU** - 91.239.100.101 - Europeo, RGPD, sin ánimo de lucro\n[STAR] **CleanBrowsing** - 185.228.168.168 - Filtro muy completo\n**Cloudflare Familias** - 1.1.1.3 - Rápido y global\n**AdGuard Family** - 94.140.14.15 - Bloquea anuncios\n\n[Todos gratuitos y sin límite de consultas]",
        options: [{ value: "__siguiente__", label: "[BACK] Seguir con los pasos" }],
        phase: "dns-compare",
        state,
      }
    }

    // Default in steps
    return {
      message: "¿Has completado este paso? Puedes decir **'Hecho'** para continuar, **'Duda'** si tienes preguntas, o **'DNS'** para ver proveedores.",
      options: [
        { value: "__siguiente__", label: "[OK] Siguiente paso" },
        { value: "__duda__", label: "[?] Tengo una duda" },
      ],
      phase: "pasos",
      state,
    }
  }

  // ── RESUMEN ──
  if (state.phase === "resumen") {
    if (input === "__funciona__" || input.toLowerCase().includes("funciona")) {
      state.phase = "finalizado"
      return {
        message: "[!] **¡Excelente!** Todo está funcionando.\n\nRecuerda revisar los ajustes cada 3 meses y adaptar la protección a medida que el menor crece.\n\n**Proteger para educar. Educar para liberar.** <S>",
        options: [
          { value: "__otro__", label: "[REFR] Configurar otro dispositivo" },
          { value: "__fin__", label: "[OK] No, gracias" },
        ],
        phase: "finalizado",
        state,
      }
    }
    if (input === "__no_funciona__" || input.toLowerCase().includes("no funciona")) {
      return {
        message: "[FIX] **Vamos a solucionarlo.**\n\nRevisa los errores frecuentes para tu configuración:\n" +
          (state.config?.erroresFrecuentes.map(function(e, i) { return (i + 1) + ". " + e.problema + " -> " + e.solucion; }).join("\n") || ""),
        options: [
          { value: "__siguiente__", label: "[REFR] Intentar de nuevo" },
          { value: "__funciona__", label: "[OK] ¡Ya funciona!" },
        ],
        phase: "resumen",
        state,
      }
    }
    // Default resumen
    return {
      message: "¿Funciona todo correctamente?",
      options: [
        { value: "__funciona__", label: "[OK] ¡Todo funciona!" },
        { value: "__no_funciona__", label: "[NO] Algo no funciona" },
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
            { value: "__siguiente__", label: "[OK] Hecho, siguiente" },
            { value: "__duda__", label: "[?] Tengo una duda" },
          ],
          phase: "pasos",
          state,
        }
      }
      state.phase = "inicio"
      return resetConversation()
    }
    return {
      message: "¿Quieres volver a los pasos de configuración?",
      options: [{ value: "__siguiente__", label: "[BACK] Sí, volver" }],
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
        message: "😊 De nada. Recuerda: proteger para educar, educar para liberar.\n\n¡Hasta pronto! <S>",
        options: [{ value: "__otro__", label: "[REFR] Empezar de nuevo" }],
        phase: "finalizado",
        state,
      }
    }
    return {
      message: "¿Quieres configurar otro dispositivo?",
      options: [
        { value: "__otro__", label: "[REFR] Sí, otro dispositivo" },
        { value: "__fin__", label: "[OK] No, gracias" },
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
