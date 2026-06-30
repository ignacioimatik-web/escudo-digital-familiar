// Escudo Digital Familiar — AI Configuration Assistant Engine
// Smart decision tree that guides users step-by-step through DNS configuration

import {
  type DeviceType,
  type NetworkContext,
  type ProtectionLevel,
  type DeviceConfig,
  type ConfigStep,
  type DeviceInfo,
  type ContextInfo,
  deviceTypes,
  networkContexts,
  getDeviceInfo,
  getNetworkContext,
  getDeviceLabel,
  getContextLabel,
} from "./types"
import { findConfig, knowledgeBase } from "./knowledge-base"
import { dnsProviders, getRecommendedProviders } from "./dns-providers"

// ── TYPES ────────────────────────────────────────────────────

export type ConversationPhase =
  | "saludo"
  | "seleccionar-dispositivo"
  | "seleccionar-contexto"
  | "seleccionar-nivel"
  | "mostrando-pasos"
  | "mostrando-resumen"
  | "pregunta-dudas"
  | "mostrando-dns-compare"
  | "mostrando-ayuda"
  | "finalizado"

export interface ConversationState {
  phase: ConversationPhase
  device: DeviceType | null
  network: NetworkContext | null
  level: ProtectionLevel | null
  currentStepIndex: number
  config: DeviceConfig | null
  history: string[]
  deviceInfo: DeviceInfo | null
}

export interface AssistantResponse {
  message: string
  options?: { value: string; label: string; icon?: string }[]
  steps?: ConfigStep[]
  phase: ConversationPhase
  state: ConversationState
}

// ── INITIAL STATE ────────────────────────────────────────────

export function createInitialState(): ConversationState {
  return {
    phase: "saludo",
    device: null,
    network: null,
    level: null,
    currentStepIndex: 0,
    config: null,
    history: [],
    deviceInfo: null,
  }
}

// ── PHRASE MATCHING ──────────────────────────────────────────

const deviceKeywords: Record<DeviceType, string[]> = {
  android: ["android", "samsung", "xiaomi", "huawei", "google pixel", "oneplus", "oppo", "realme", "móvil android", "tablet android", "miui", "hyperos", "one ui", "coloros"],
  iphone: ["iphone", "ipad", "apple", "ios", "ipados", "tablet apple", "ipod", "móvil apple"],
  windows: ["windows", "pc", "ordenador windows", "portátil windows", "microsoft", "surface", "lenovo", "hp", "dell", "windows 10", "windows 11"],
  macos: ["mac", "macbook", "imac", "mac mini", "mac studio", "mac pro", "macos", "ordenador apple"],
  router: ["router", "wifi", "red de casa", "modem", "fibra", "movistar", "orange", "vodafone", "digi", "asm", "tp-link", "mikrotik", "router del operador"],
  navegador: ["navegador", "chrome", "edge", "firefox", "opera", "brave", "safari", "browser", "dns del navegador"],
  "smart-tv": ["tv", "televisión", "smart tv", "samsung tv", "lg tv", "android tv", "google tv", "apple tv", "televisor"],
  tablet: ["tablet android", "ipad", "tablet", "fire tablet", "amazon tablet", "tableta"],
  chromebook: ["chromebook", "chromeos"],
  consola: ["playstation", "ps4", "ps5", "xbox", "nintendo switch", "consola", "videojuegos"],
  kindle: ["kindle", "fire tablet amazon", "echo show", "amazon kids"],
}

const networkKeywords: Record<NetworkContext, string[]> = {
  "wifi-casa": ["wifi de casa", "wifi casa", "red de casa", "en casa", "hogar", "solo en casa", "conectado en casa"],
  "datos-moviles": ["datos móviles", "solo datos", "4g", "5g", "fuera de casa", "no tengo wifi", "sin wifi", "operador", "movistar", "orange", "vodafone", "datos del móvil"],
  "wifi-datos": ["wifi y datos", "tanto wifi como datos", "los dos", "ambas redes", "wifi y móvil", "en casa y fuera"],
  "dispositivo-compartido": ["compartido", "varios usuarios", "lo usamos varios", "familiar", "compartimos", "un solo dispositivo", "lo usa toda la familia"],
  "dispositivo-personal": ["suyo", "del menor", "personal", "solo él", "exclusivo", "solo para el", "primer móvil"],
  "varias-redes": ["varias redes", "casa de amigos", "colegio", "biblioteca", "se conecta en diferentes sitios", "en varios sitios"],
  "wifi-publica": ["wifi pública", "público", "cafetería", "biblioteca", "hotspot", "wifi gratis", "wifi abierta"],
}

const levelKeywords: Record<ProtectionLevel, string[]> = {
  basico: ["básico", "rápido", "sencillo", "simple", "mínimo", "lo justo", "primera vez", "empezar", "fácil", "sin complicaciones"],
  recomendado: ["recomendado", "completo", "normal", "estándar", "equilibrio", "la mayoría", "típico", "lo normal", "ideal"],
  avanzado: ["avanzado", "máximo", "máxima", "todo", "muy protegido", "estricto", "exhaustivo", "completo", "extremo", "menor de 12", "pequeño"],
}

const helpKeywords = [
  "ayuda", "qué hago", "cómo", "no entiendo", "explica", "duda", "problema", "error",
  "no funciona", "falla", "no puedo", "no me deja", "atascado",
]

const dnsCompareKeywords = [
  "comparar", "dns", "proveedor", "cuál es mejor", "alternativas", "dns4", "cleanbrowsing",
  "cloudflare", "adguard", "opciones", "cuál elijo", "qué dns", "diferencias", "recomiendas",
]

function matchKeywords(text: string, keywords: string[]): boolean {
  const lower = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  return keywords.some((k) => lower.includes(k.toLowerCase()))
}

// ── INTENT CLASSIFICATION ────────────────────────────────────

export function classifyDevice(text: string): DeviceType | null {
  for (const [device, keywords] of Object.entries(deviceKeywords)) {
    if (matchKeywords(text, keywords)) return device as DeviceType
  }
  return null
}

export function classifyNetwork(text: string): NetworkContext | null {
  for (const [network, keywords] of Object.entries(networkKeywords)) {
    if (matchKeywords(text, keywords)) return network as NetworkContext
  }
  return null
}

export function classifyLevel(text: string): ProtectionLevel | null {
  for (const [level, keywords] of Object.entries(levelKeywords)) {
    if (matchKeywords(text, keywords)) return level as ProtectionLevel
  }
  return null
}

export function isHelpQuestion(text: string): boolean {
  return matchKeywords(text, helpKeywords)
}

export function isDnsCompare(text: string): boolean {
  return matchKeywords(text, dnsCompareKeywords)
}

// ── RESPONSE GENERATION ──────────────────────────────────────

function getDeviceIcon(deviceType: DeviceType): string {
  const icons: Record<string, string> = {
    android: "📱",
    iphone: "📱",
    windows: "💻",
    macos: "💻",
    router: "📡",
    navegador: "🌐",
    "smart-tv": "📺",
    tablet: "📱",
    chromebook: "💻",
    consola: "🎮",
    kindle: "📖",
  }
  return icons[deviceType] ?? "❓"
}

function getProtectionEmoji(level: ProtectionLevel): string {
  switch (level) {
    case "basico": return "🛡️"
    case "recomendado": return "🛡️🛡️"
    case "avanzado": return "🛡️🛡️🛡️"
  }
}

function saludoMessage(): string {
  return (
    "¡Hola! Soy tu asistente de configuración de **Escudo Digital Familiar**. 🛡️\n\n" +
    "Te voy a guiar paso a paso para proteger a los menores de tu familia " +
    "frente a contenido violento, pornografía, apuestas y malware.\n\n" +
    "**¿Qué dispositivo quieres proteger?**\n\n" +
    "Cuéntame qué tienes o selecciónalo abajo 👇"
  )
}

function deviceSelectedMessage(device: DeviceType, info: DeviceInfo): string {
  const icon = getDeviceIcon(device)
  return (
    `✅ **${info.label}** — ¡perfecto!\n\n` +
    `${icon} ${info.descripcion}\n\n` +
    (info.hasDnsConfig
      ? `✅ Soporta configuración DNS (dificultad: ${info.dnsDifficulty === "facil" ? "fácil" : info.dnsDifficulty === "medio" ? "media" : "avanzada"})`
      : `⚠️ Este dispositivo no permite cambiar DNS fácilmente. Te recomendaré la mejor alternativa.\n`) +
    "\n**¿En qué contexto se conecta a Internet?**\n\n" +
    "Selecciona la opción que mejor describa su situación 👇"
  )
}

function networkSelectedMessage(network: NetworkContext, info: ContextInfo): string {
  return (
    `✅ **${info.label}** — entendido.\n\n` +
    `${info.descripcion}\n\n` +
    `📌 _${info.recomendacionDns}_\n\n` +
    "**¿Qué nivel de protección quieres?**\n\n" +
    "- 🛡️ **Básico**: Rápido, protección mínima. Ideal como primer paso o adolescentes.\n" +
    "- 🛡️🛡️ **Recomendado**: Equilibrio protección/autonomía. Para la mayoría de familias.\n" +
    "- 🛡️🛡️🛡️ **Avanzado**: Protección máxima. Para menores de 12 años o situaciones de riesgo."
  )
}

function levelSelectedMessage(level: ProtectionLevel, config: DeviceConfig): string {
  const emoji = getProtectionEmoji(level)
  const levelNames: Record<ProtectionLevel, string> = {
    basico: "Básico 🛡️",
    recomendado: "Recomendado 🛡️🛡️",
    avanzado: "Avanzado 🛡️🛡️🛡️",
  }
  return (
    `✅ **${levelNames[level]}** — excelente elección.\n\n` +
    `${emoji} He preparado una guía personalizada para tu caso:\n\n` +
    `📋 **${config.titulo}**\n` +
    `⏱️ Tiempo estimado: ${config.tiempoEstimado}\n` +
    `📝 ${config.resumen}\n\n` +
    `**Te recomiendo empezar con estos DNS:**\n` +
    config.dnsRecomendado.map((ip) => `- \`${ip}\``).join("\n") +
    "\n\n¿Empezamos con el **paso 1**? O si quieres, puedo explicarte las diferencias entre proveedores DNS."
  )
}

function stepMessage(step: ConfigStep, current: number, total: number): string {
  let msg = `**Paso ${current}/${total}: ${step.titulo}**\n\n${step.descripcion}\n\n`

  if (step.notas && step.notas.length > 0) {
    msg += "📌 **Notas:**\n" + step.notas.map((n) => `- ${n}`).join("\n") + "\n\n"
  }

  if (step.advertencia) {
    msg += `⚠️ **Atención:** ${step.advertencia}\n\n`
  }

  if (current < total) {
    msg += "¿Has completado este paso? Confírmame y pasamos al siguiente 👇"
  } else {
    msg += "🎉 **¡Último paso!** Confírmalo cuando esté listo para ver la verificación final."
  }

  return msg
}

function verificationMessage(config: DeviceConfig): string {
  return (
    "✅ **¡Todos los pasos completados!**\n\n" +
    "Ahora **verifica que funciona correctamente:**\n\n" +
    config.verificacion +
    "\n\n**Problemas comunes que puedes encontrar:**\n" +
    config.erroresFrecuentes.slice(0, 3).map(
      (e) => `⚠️ *${e.problema}* → ${e.solucion}`
    ).join("\n") +
    "\n\n¿Funciona todo correctamente? ¿Tienes alguna duda?"
  )
}

function dnsComparisonMessage(): string {
  const recommended = getRecommendedProviders()
  const all = dnsProviders

  let msg =
    "📊 **Comparativa de DNS gratuitos para protección familiar**\n\n" +
    "Aquí tienes los principales proveedores DNS gratuitos que recomiendo:\n\n"

  all.forEach((p) => {
    msg +=
      `${p.recommended ? "⭐ " : ""}**${p.name}**\n` +
      `- Servidores: \`${p.primaryIPv4}\` y \`${p.secondaryIPv4}\`\n` +
      `- Tipo: ${p.tier === "gratuito" ? "✅ Gratuito sin límites" : `🆓 Gratuito con límites (${p.usageLimit})`}\n` +
      `- Bloqueo: ${p.filtering === "familia" ? "✅ Contenido para adultos + malware" : p.filtering === "malware" ? "⚠️ Solo malware" : "✅ Personalizable"}\n` +
      `- Privacidad: ${p.logsPolicy}\n` +
      (p.dohUrl ? `- DoH: ✅\n` : "") +
      `- 🌍 ${p.europeBased ? "Basado en Europa (RGPD)" : "Fuera de Europa"}\n\n`
  })

  msg +=
    "---\n\n" +
    "**💳 Opciones de pago** (si quieres funciones extra):\n" +
    "| Proveedor | Precio | Ventajas extra |\n" +
    "|-----------|--------|---------------|\n" +
    "| NextDNS Pro | 1.99€/mes | Consultas ilimitadas |\n" +
    "| Control D Pro | 2.99€/mes | Redes ilimitadas |\n" +
    "| CleanBrowsing Pro | 5.95€/mes | Panel completo + informes |\n" +
    "| AdGuard Pro | 3.99€/mes | App de protección completa |\n\n" +
    "**Mi recomendación:** empieza con DNS4.EU o CleanBrowsing (ambos gratuitos). " +
    "Si necesitas más control, NextDNS por 1.99€/mes es la mejor relación calidad-precio."

  return msg
}

function helpResponse(text: string): string {
  const lowered = text.toLowerCase()

  if (lowered.includes("contraseña") || lowered.includes("password") || lowered.includes("olvid")) {
    return (
      "🔑 **Problema con contraseñas:**\n\n" +
      "1. **Router**: Si olvidaste la contraseña, busca el botón **Reset** (con un clip 10s).\n" +
      "2. **Apple ID**: Usa **iforgot.apple.com** para recuperarla.\n" +
      "3. **Cuenta Microsoft**: **account.live.com/password/reset**\n" +
      "4. **Google/Family Link**: **accounts.google.com/recovery**\n\n" +
      "¿Es alguno de estos tu caso?"
    )
  }

  if (lowered.includes("ip del router") || lowered.includes("acceder al router") || lowered.includes("panel del router")) {
    return (
      "🌐 **Para acceder al router:**\n\n" +
      "1. Abre un navegador\n" +
      "2. Prueba estas direcciones (una por una):\n" +
      "   - **192.168.1.1** (la más común)\n" +
      "   - **192.168.0.1**\n" +
      "   - **192.168.1.254**\n" +
      "3. Usuario y contraseña suelen estar en una **pegatina debajo del router**\n\n" +
      "Si no funciona, busca el modelo de tu router en Google + 'contraseña por defecto'."
    )
  }

  if (lowered.includes("no funciona") || lowered.includes("no me funciona") || lowered.includes("falla")) {
    return (
      "🛠️ **Vamos a solucionarlo.** Dime exactamente qué pasa:\n\n" +
      "1. ¿Qué dispositivo estás configurando?\n" +
      "2. ¿Qué proveedor DNS elegiste?\n" +
      "3. ¿Qué error o problema ves exactamente?\n\n" +
      "Cuéntame los detalles y te ayudo paso a paso."
    )
  }

  // Default help
  return (
    "🤔 **¿Necesitas ayuda?**\n\n" +
    "Puedo ayudarte con:\n\n" +
    "- 🔍 **Elegir el mejor DNS** para tu caso\n" +
    "- 📋 **Guiarte paso a paso** en la configuración\n" +
    "- 🛠️ **Resolver problemas** (DNS no funciona, contraseñas, etc.)\n" +
    "- 📊 **Comparar proveedores** DNS gratuitos y de pago\n\n" +
    "¿Qué necesitas?"
  )
}

// ── MAIN ENGINE ──────────────────────────────────────────────

export function processInput(
  state: ConversationState,
  input: string
): AssistantResponse {
  state.history.push(input)

  // ── HELP / DOUBTS ──────────────────
  if (isHelpQuestion(input) && state.phase !== "saludo") {
    return {
      message: helpResponse(input),
      options: [
        { value: "__continuar__", label: "↩️ Volver a la configuración" },
      ],
      phase: "mostrando-ayuda",
      state,
    }
  }

  // ── DNS COMPARISON ─────────────────
  if (isDnsCompare(input)) {
    return {
      message: dnsComparisonMessage(),
      options: [
        { value: "__continuar__", label: "↩️ Volver a la configuración" },
      ],
      phase: "mostrando-dns-compare",
      state,
    }
  }

  // ── PHASE SALUDO ───────────────────
  if (state.phase === "saludo") {
    const device = classifyDevice(input)
    if (device) {
      state.device = device
      state.deviceInfo = getDeviceInfo(device)!
      state.phase = "seleccionar-dispositivo"
      return {
        message: deviceSelectedMessage(device, state.deviceInfo),
        options: networkContexts.map((c) => ({
          value: c.id,
          label: c.label,
          icon: c.icon,
        })),
        phase: "seleccionar-contexto",
        state,
      }
    }
    return {
      message: saludoMessage(),
      options: deviceTypes.map((d) => ({
        value: d.id,
        label: d.label,
        icon: d.icon,
      })),
      phase: "saludo",
      state,
    }
  }

  // ── PHASE SELECT DEVICE (from button) ──
  if (state.phase === "seleccionar-dispositivo") {
    const device = classifyDevice(input)
    if (device) {
      state.device = device
      state.deviceInfo = getDeviceInfo(device)!
      state.phase = "seleccionar-contexto"
      return {
        message: deviceSelectedMessage(device, state.deviceInfo),
        options: networkContexts.map((c) => ({
          value: c.id,
          label: c.label,
          icon: c.icon,
        })),
        phase: "seleccionar-contexto",
        state,
      }
    }
    return {
      message: "No he identificado el dispositivo. ¿Puedes decirme cuál es? 📱💻📡",
      options: deviceTypes.map((d) => ({ value: d.id, label: d.label })),
      phase: "seleccionar-dispositivo",
      state,
    }
  }

  // ── PHASE SELECT NETWORK ─────────────────
  if (state.phase === "seleccionar-contexto") {
    const network = classifyNetwork(input)
    if (network) {
      state.network = network
      state.phase = "seleccionar-nivel"
      const ctxInfo = getNetworkContext(network) ?? networkContexts[0]
      return {
        message: networkSelectedMessage(network, ctxInfo),
        options: [
          { value: "basico", label: "🛡️ Básico" },
          { value: "recomendado", label: "🛡️🛡️ Recomendado" },
          { value: "avanzado", label: "🛡️🛡️🛡️ Avanzado" },
        ],
        phase: "seleccionar-nivel",
        state,
      }
    }
    return {
      message: "¿En qué contexto se conecta? Elige una opción 👇",
      options: networkContexts.map((c) => ({ value: c.id, label: c.label })),
      phase: "seleccionar-contexto",
      state,
    }
  }

  // ── PHASE SELECT LEVEL ──────────────────
  if (state.phase === "seleccionar-nivel") {
    const level = classifyLevel(input)
    if (level) {
      state.level = level
      if (state.device && state.network && state.level) {
        const config = findConfig(state.device, state.network, state.level)
        if (config) {
          state.config = config
          state.currentStepIndex = 0
          state.phase = "mostrando-pasos"

          const firstStep = config.pasos[0]
          const stepResp = stepMessage(firstStep, 1, config.pasos.length)

          return {
            message: levelSelectedMessage(level, config) + "\n\n---\n\n" + stepResp,
            options: [
              { value: "__siguiente__", label: "✅ Hecho, siguiente paso" },
              { value: "__ver_dns__", label: "📊 Comparar DNS" },
              { value: "__duda__", label: "❓ Tengo una duda" },
            ],
            steps: config.pasos,
            phase: "mostrando-pasos",
            state,
          }
        } else {
          // No config found for this combination
          state.phase = "finalizado"
          return {
            message:
              "No tengo una guía específica para esta combinación. " +
              "Pero no te preocupes — puedes usar la **guía del router** que protege todos los dispositivos.\n\n" +
              "¿Quieres que te guíe para configurar el router?",
            options: [
              { value: "router", label: "📡 Configurar el router" },
              { value: "__ver_dns__", label: "📊 Ver DNS disponibles" },
            ],
            phase: "finalizado",
            state,
          }
        }
      }
    }
    return {
      message: "¿Qué nivel de protección prefieres?",
      options: [
        { value: "basico", label: "🛡️ Básico" },
        { value: "recomendado", label: "🛡️🛡️ Recomendado" },
        { value: "avanzado", label: "🛡️🛡️🛡️ Avanzado" },
      ],
      phase: "seleccionar-nivel",
      state,
    }
  }

  // ── PHASE SHOWING STEPS ─────────────────
  if (state.phase === "mostrando-pasos") {
    const input_lower = input.toLowerCase()

    if (input_lower.includes("siguiente") || input_lower.includes("hecho") || input_lower.includes("listo") || input === "__siguiente__") {
      const nextIndex = state.currentStepIndex + 1
      if (state.config && nextIndex < state.config.pasos.length) {
        state.currentStepIndex = nextIndex
        const step = state.config.pasos[nextIndex]
        return {
          message: stepMessage(step, nextIndex + 1, state.config.pasos.length),
          options: [
            { value: "__siguiente__", label: "✅ Hecho, siguiente" },
            { value: "__duda__", label: "❓ Tengo una duda" },
          ],
          phase: "mostrando-pasos",
          state,
        }
      } else {
        // All steps completed
        state.phase = "mostrando-resumen"
        return {
          message: verificationMessage(state.config!),
          options: [
            { value: "__funciona__", label: "✅ ¡Todo funciona!" },
            { value: "__no_funciona__", label: "❌ Algo no funciona" },
            { value: "__ver_dns__", label: "📊 Ver otros DNS" },
          ],
          phase: "mostrando-resumen",
          state,
        }
      }
    }

    if (input_lower.includes("duda") || input_lower.includes("pregunta") || input === "__duda__") {
      return {
        message: "Claro, dime qué duda tienes y te ayudo.",
        options: [
          { value: "__siguiente__", label: "↩️ Seguir con los pasos" },
        ],
        phase: "pregunta-dudas",
        state,
      }
    }

    if (input_lower.includes("dns") || input === "__ver_dns__") {
      return {
        message: dnsComparisonMessage(),
        options: [
          { value: "__siguiente__", label: "↩️ Seguir con los pasos" },
        ],
        phase: "mostrando-dns-compare",
        state,
      }
    }

    // User might be asking about current step or reporting an issue
    const step = state.config?.pasos[state.currentStepIndex]
    if (step && (input_lower.includes("no") || input_lower.includes("error") || input_lower.includes("problema") || input_lower.includes("explica"))) {
      return {
        message:
          `Veamos el paso actual: **${step.titulo}**\n\n` +
          step.descripcion +
          (step.advertencia ? `\n\n⚠️ ${step.advertencia}` : "") +
          (step.notas ? "\n\n📌 " + step.notas.join("\n") : "") +
          "\n\n¿Te sirve? ¿O necesitas más detalles?",
        options: [
          { value: "__siguiente__", label: "✅ Ya lo hice, siguiente" },
          { value: "__duda__", label: "❓ Otra duda" },
        ],
        phase: "mostrando-pasos",
        state,
      }
    }

    // Any other input during steps — try to offer help
    return {
      message:
        "¿Has completado este paso?\n\n" +
        "Puedes decirme:\n" +
        "- **'Hecho'** o **'Siguiente'** → pasar al siguiente paso\n" +
        "- **'Duda'** → preguntarme algo\n" +
        "- **'DNS'** → ver comparativa de proveedores\n" +
        "- **'Ayuda'** → resolver un problema",
      options: [
        { value: "__siguiente__", label: "✅ Siguiente paso" },
        { value: "__duda__", label: "❓ Tengo una duda" },
        { value: "__ver_dns__", label: "📊 Comparar DNS" },
      ],
      phase: "mostrando-pasos",
      state,
    }
  }

  // ── PHASE RESUMEN / VERIFICATION ──────────
  if (state.phase === "mostrando-resumen" || state.phase === "finalizado") {
    const input_lower = input.toLowerCase()

    if (input === "__funciona__" || input_lower.includes("funciona") || input_lower.includes("bien")) {
      return {
        message:
          "🎉 **¡Excelente!** Todo está funcionando.\n\n" +
          "Recuerda:\n" +
          "1. Revisa los ajustes cada 3 meses\n" +
          "2. Adapta la protección a medida que el menor crece\n" +
          "3. Habla con tus hijos sobre por qué has puesto estas protecciones\n\n" +
          "¿Necesitas ayuda con algo más?",
        options: [
          { value: "__otro__", label: "🔄 Configurar otro dispositivo" },
          { value: "__fin__", label: "✅ No, gracias" },
        ],
        phase: "finalizado",
        state,
      }
    }

    if (input === "__no_funciona__" || input_lower.includes("no funciona")) {
      const config = state.config
      let msg = "🛠️ **Vamos a solucionarlo.**\n\n"
      if (config) {
        msg += "**Errores frecuentes para tu configuración:**\n\n"
        config.erroresFrecuentes.forEach((e, i) => {
          msg += `${i + 1}. **${e.problema}**\n   → ${e.solucion}\n`
        })
      }
      msg += "\n¿Te ayuda esto? ¿O tienes un error diferente?"
      return {
        message: msg,
        options: [
          { value: "__continuar__", label: "🔄 Intentar de nuevo" },
          { value: "__funciona__", label: "✅ ¡Ya funciona!" },
        ],
        phase: "mostrando-ayuda",
        state,
      }
    }

    if (input === "__otro__" || input === "__continuar__" || input_lower.includes("otro") || input_lower.includes("otra vez")) {
      return resetConversation()
    }

    if (input === "__fin__" || input_lower.includes("gracias") || input_lower.includes("nada más")) {
      return {
        message:
          "De nada. 😊 Recuerda que la tecnología es una herramienta, " +
          "pero lo más importante es el **diálogo y el acompañamiento**.\n\n" +
          "**Proteger para educar. Educar para liberar.** 🛡️",
        options: [],
        phase: "finalizado",
        state,
      }
    }
  }

  // ── DEFAULT ─────────────────────────
  return {
    message:
      "No estoy seguro de haber entendido. ¿Puedes reformularlo?\n\n" +
      "Puedes decirme:\n" +
      "- **'Ayuda'** para solucionar un problema\n" +
      "- **'DNS'** para comparar proveedores\n" +
      "- Decirme qué dispositivo tienes para empezar\n" +
      "- **'Empezar'** para volver al inicio",
    options: [
      { value: "__reset__", label: "🔄 Empezar de nuevo" },
      { value: "__ver_dns__", label: "📊 Comparar DNS" },
    ],
    phase: state.phase,
    state,
  }
}

// ── RESET ────────────────────────────────────────────────────

export function resetConversation(): AssistantResponse {
  const newState = createInitialState()
  return {
    message: saludoMessage(),
    options: deviceTypes.map((d) => ({
      value: d.id,
      label: d.label,
      icon: d.icon,
    })),
    phase: "saludo",
    state: newState,
  }
}
