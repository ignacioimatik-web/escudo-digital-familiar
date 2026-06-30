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
  return "¡Hola! Me alegra verte por aquí 😊 Voy a ayudarte a proteger los dispositivos de tu familia de una forma muy sencilla, paso a paso.\n\n**Lo primero: ¿qué dispositivo te gustaría proteger?**\n\nPuedes elegirlo abajo o escribirme el nombre directamente — lo que te resulte más cómodo."
}

function mensajeDispositivo(device: DeviceType, info: DeviceInfo): string {
  const iconos: Record<string, string> = {
    android: "📱", iphone: "📱", windows: "💻", macos: "💻", router: "📡",
    navegador: "🌐", "smart-tv": "📺", tablet: "📱", chromebook: "💻",
    consola: "🎮", kindle: "📖",
  }
  return (iconos[device] || "📱") + " **" + info.label + "** — ¡perfecto! Ahora cuéntame: ¿cómo se conecta este dispositivo a Internet? Así puedo darte la mejor recomendación."
}

function mensajeContexto(network: NetworkContext, info: any): string {
  return "¡Genial! Ahora dime **¿qué nivel de protección necesitas?** Elige según la edad del menor:\n\n• **Básico** 🟢 → A partir de 15 años\n• **Recomendado** 🔵 → De 7 a 14 años\n• **Avanzado** 🔴 → Hasta 12 años"
}

function mensajeNivel(level: ProtectionLevel, config: DeviceConfig): string {
  return "¡Estupendo! Has elegido el nivel adecuado. 🎉\n\n**Tiempo estimado:** " + config.tiempoEstimado + "\n**Resumen:** " + config.resumen + "\n\n¿Te parece bien si empezamos con el primer paso?"
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
     message: "No me ha quedado del todo claro 😅 ¿puedes elegir una de estas opciones? Así me aseguro de darte la mejor recomendación.",
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
 { value: "basico", label: "Básico", desc: "+15 años o primer paso" },
 { value: "recomendado", label: "Recomendado", desc: "7-14 años, equilibrio ideal" },
 { value: "avanzado", label: "Avanzado", desc: "0-12 años o riesgo alto" },
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
     message: "No lo he entendido bien 😊 Elige un nivel de protección según la edad:",
     options: [
       { value: "basico", label: "Básico (+15 años)" },
       { value: "recomendado", label: "Recomendado (7-14 años)" },
       { value: "avanzado", label: "Avanzado (0-12 años)" },
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
 { value: "__siguiente__", label: "Hecho, siguiente paso" },
 { value: "__duda__", label: "Tengo una duda" },
 { value: "__ver_dns__", label: "Comparar DNS" },
 ],
 steps: config.pasos,
 progress: { current: 1, total: config.pasos.length },
 phase: "pasos",
 state,
 }
 } else {
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
 }

 return {
 message: "¿Qué nivel de protección prefieres? Elige según la edad del menor:",
 options: [
   { value: "basico", label: "Básico (+15 años)" },
   { value: "recomendado", label: "Recomendado (7-14 años)" },
   { value: "avanzado", label: "Avanzado (0-12 años)" },
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
 { value: "__siguiente__", label: "Hecho, siguiente" },
 { value: "__duda__", label: "Tengo una duda" },
 ],
 progress: { current: nextIndex + 1, total: state.config.pasos.length },
 phase: "pasos",
 state,
 }
 } else {
 state.phase = "resumen"
 return {
 message: "**¡Todos los pasos completados!** 🎉\n\nAhora vamos a verificar que todo funciona correctamente:\n\n" + (state.config?.verificacion || ""),
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
     message: "📡 **Comparativa de DNS gratuitos con protección familiar**\n\nTodos son gratuitos y sin límite de consultas:\n\n• **DNS4.EU** → `91.239.100.100` — Europeo, respeta RGPD, sin ánimo de lucro\n• **CleanBrowsing** → `185.228.168.168` — Filtro muy completo\n• **Cloudflare Familias** → `1.1.1.3` — Muy rápido, cobertura global\n• **AdGuard Family** → `94.140.14.15` — Bloquea anuncios además de contenido\n\n¿Te ayuda esto? Puedes seguir con los pasos cuando quieras.",
     options: [{ value: "__siguiente__", label: "Seguir con los pasos" }],
     phase: "dns-compare",
     state,
   }
 }

 // Default in steps
 return {
   message: "😊 ¿Has completado este paso? Puedes decir **'Hecho'** para continuar, **'Duda'** si tienes preguntas, o **'DNS'** para ver proveedores disponibles.",
   options: [
     { value: "__siguiente__", label: "✅ Siguiente paso" },
     { value: "__duda__", label: "❓ Tengo una duda" },
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
     message: "**¡Me alegra muchísimo!** 🎉 Todo está funcionando correctamente.\n\nRecuerda revisar los ajustes cada 3 meses y adaptar la protección a medida que el menor crece. La protección digital es un proceso, no un destino.\n\n**Proteger para educar. Educar para liberar.** 💙",
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
     message: "**No te preocupes, vamos a solucionarlo juntos.** 🛠️\n\nRevisa estos errores frecuentes:\n\n" +
     (state.config?.erroresFrecuentes.map(function(e, i) { return (i + 1) + ". **" + e.problema + "** → " + e.solucion; }).join("\n") || ""),
     options: [
       { value: "__siguiente__", label: "🔄 Intentar de nuevo" },
       { value: "__funciona__", label: "✅ ¡Ya funciona!" },
     ],
     phase: "resumen",
     state,
   }
 }
 // Default resumen
 return {
   message: "✅ **¿Funciona todo correctamente?** Dime cómo va.",
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
 { value: "__siguiente__", label: " Hecho, siguiente" },
 { value: "__duda__", label: " Tengo una duda" },
 ],
 phase: "pasos",
 state,
 }
 }
 state.phase = "inicio"
 return resetConversation()
 return {
   message: "¿Quieres volver a los pasos de configuración? Cuando quieras, aquí estoy.",
   options: [{ value: "__siguiente__", label: "Sí, volver" }],
   phase: state.phase as any,
   state,
 }
 }
 }

 // ── FINALIZADO ──
 if (state.phase === "finalizado") {
 if (input === "__otro__" || input.toLowerCase().includes("otro") || input.toLowerCase().includes("otra vez")) {
 return resetConversation()
 }
 if (input === "__fin__" || input.toLowerCase().includes("gracias") || input.toLowerCase().includes("nada más")) {
 return {
   message: "😊 De nada. Ha sido un placer ayudarte. Recuerda: **proteger para educar, educar para liberar.**\n\n¡Hasta pronto! Cuídate mucho 💙",
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
