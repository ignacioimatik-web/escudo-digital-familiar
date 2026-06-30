// Escudo Digital Familiar — Core Types for AI Configuration Assistant

export type DeviceType =
  | "android"
  | "iphone"
  | "windows"
  | "macos"
  | "router"
  | "navegador"
  | "smart-tv"
  | "tablet"
  | "chromebook"
  | "consola"
  | "kindle"

export type NetworkContext =
  | "wifi-casa"
  | "datos-moviles"
  | "wifi-datos"
  | "dispositivo-compartido"
  | "dispositivo-personal"
  | "varias-redes"
  | "wifi-publica"

export type ProtectionLevel = "basico" | "recomendado" | "avanzado"

export interface ConfigStep {
  id: string
  numero: number
  titulo: string
  descripcion: string
  notas?: string[]
  advertencia?: string
  dificultad?: "facil" | "medio" | "avanzado"
}

export interface DeviceConfig {
  id: string
  device: DeviceType
  network: NetworkContext
  level: ProtectionLevel
  titulo: string
  resumen: string
  tiempoEstimado: string
  dnsRecomendado: string[]
  pasos: ConfigStep[]
  verificacion: string
  erroresFrecuentes: { problema: string; solucion: string }[]
}

export interface Question {
  id: string
  type: "option" | "text" | "confirm"
  question: string
  description?: string
  options?: { value: string; label: string; description?: string; icon?: string }[]
  validation?: (input: string) => string | null // returns error message or null
}

export interface Scenario {
  id: string
  keywords: string[]
  question: string
  response: string
  followUp?: Question[]
}

export interface DeviceInfo {
  id: DeviceType
  label: string
  icon: string
  descripcion: string
  osTypes: string[]
  hasNativeParentalControl: boolean
  hasDnsConfig: boolean
  dnsDifficulty: "facil" | "medio" | "avanzado"
  notas: string[]
}

export interface ContextInfo {
  id: NetworkContext
  label: string
  icon: string
  descripcion: string
  recomendacionDns: string
  particularidades: string[]
}

export const deviceTypes: DeviceInfo[] = [
  {
    id: "android",
    label: "Android",
    icon: "Smartphone",
    descripcion: "Móviles y tablets con sistema Android (Samsung, Xiaomi, Google Pixel, etc.)",
    osTypes: ["Android 9+", "Android 8-", "MIUI/HyperOS", "One UI", "ColorOS"],
    hasNativeParentalControl: true,
    hasDnsConfig: true,
    dnsDifficulty: "facil",
    notas: [
      "DNS privado nativo desde Android 9 (Pie)",
      "Google Family Link es el control parental gratuito",
      "Algunos fabricantes (Xiaomi) pueden tener opciones adicionales",
    ],
  },
  {
    id: "iphone",
    label: "iPhone / iPad",
    icon: "Smartphone",
    descripcion: "Dispositivos Apple con iOS/iPadOS (iPhone, iPad, iPod Touch)",
    osTypes: ["iOS 16+", "iOS 14-15", "iOS 13-"],
    hasNativeParentalControl: true,
    hasDnsConfig: true,
    dnsDifficulty: "medio",
    notas: [
      "DNS se configura por red WiFi (no afecta datos móviles sin perfil)",
      "Tiempo de Uso + En Familia es el control parental nativo",
      "Para datos móviles necesitas perfil de configuración DNS",
    ],
  },
  {
    id: "windows",
    label: "Windows",
    icon: "Monitor",
    descripcion: "Ordenadores con Windows 10/11",
    osTypes: ["Windows 11", "Windows 10", "Windows 8/8.1"],
    hasNativeParentalControl: true,
    hasDnsConfig: true,
    dnsDifficulty: "medio",
    notas: [
      "DNS se configura en propiedades de red (varias interfaces)",
      "Microsoft Family Safety funciona bien con Edge",
      "Chrome y Firefox requieren configurar DNS seguro aparte",
    ],
  },
  {
    id: "macos",
    label: "macOS",
    icon: "Monitor",
    descripcion: "Ordenadores Apple Mac (MacBook, iMac, Mac Mini, Mac Studio)",
    osTypes: ["macOS Ventura+", "macOS Monterey", "macOS anteriores"],
    hasNativeParentalControl: true,
    hasDnsConfig: true,
    dnsDifficulty: "medio",
    notas: [
      "DNS se configura en Red > Avanzado > DNS",
      "Tiempo de Uso funciona como en iOS",
      "Requiere contraseña de administrador para cambios de DNS",
    ],
  },
  {
    id: "router",
    label: "Router WiFi",
    icon: "Router",
    descripcion: "Router del hogar (protege TODOS los dispositivos de la red a la vez)",
    osTypes: ["Movistar", "Orange", "Vodafone", "Digi", "ASUS", "TP-Link", "MikroTik"],
    hasNativeParentalControl: false,
    hasDnsConfig: true,
    dnsDifficulty: "avanzado",
    notas: [
      "Cambiar DNS en el router protege TODA la red doméstica",
      "Cada fabricante tiene una interfaz diferente",
      "Requiere acceso al panel de administración del router",
      "Es la configuración más efectiva para protección familiar",
    ],
  },
  {
    id: "navegador",
    label: "Navegador Web",
    icon: "Globe",
    descripcion: "Configurar DNS directamente en Chrome, Edge o Firefox",
    osTypes: ["Chrome", "Edge", "Firefox", "Opera", "Brave", "Safari"],
    hasNativeParentalControl: false,
    hasDnsConfig: true,
    dnsDifficulty: "facil",
    notas: [
      "Solo protege la navegación dentro de ese navegador",
      "No protege otras apps del dispositivo",
      "Ideal como medida rápida o complementaria",
      "Firefox permite DoH nativo desde ajustes",
    ],
  },
  {
    id: "smart-tv",
    label: "Smart TV",
    icon: "Tv",
    descripcion: "Televisores inteligentes (Samsung, LG, Android TV, Apple TV)",
    osTypes: ["Android TV/Google TV", "Samsung Tizen", "LG webOS", "Apple tvOS"],
    hasNativeParentalControl: false,
    hasDnsConfig: true,
    dnsDifficulty: "medio",
    notas: [
      "Muchas Smart TV permiten cambiar DNS en ajustes de red",
      "Android TV permite DNS privado igual que Android",
      "Apple TV se configura como dispositivo iOS",
      "La opción más segura es configurar el DNS en el router",
    ],
  },
  {
    id: "tablet",
    label: "Tablet",
    icon: "Tablet",
    descripcion: "Tablets Android o iPadOS (para niños pequeños)",
    osTypes: ["iPadOS", "Android Tablet", "Fire OS (Amazon)"],
    hasNativeParentalControl: true,
    hasDnsConfig: true,
    dnsDifficulty: "facil",
    notas: [
      "Las tablets Android se configuran igual que Android",
      "iPad sigue las mismas instrucciones que iPhone",
      "Amazon Fire Tablet tiene su propio sistema (requiere ajustes adicionales)",
      "Son el dispositivo ideal para menores pequeños",
    ],
  },
  {
    id: "chromebook",
    label: "Chromebook",
    icon: "Monitor",
    descripcion: "Portátiles con ChromeOS (usados en colegios frecuentemente)",
    osTypes: ["ChromeOS"],
    hasNativeParentalControl: true,
    hasDnsConfig: true,
    dnsDifficulty: "medio",
    notas: [
      "Chromebooks gestionados por la escuela pueden tener DNS bloqueado",
      "Family Link funciona nativamente con ChromeOS",
      "DNS se configura en ajustes de red o navegador",
    ],
  },
  {
    id: "consola",
    label: "Consola / Videoconsola",
    icon: "Gamepad2",
    descripcion: "PlayStation, Xbox, Nintendo Switch",
    osTypes: ["PlayStation 4/5", "Xbox One/Series", "Nintendo Switch"],
    hasNativeParentalControl: true,
    hasDnsConfig: true,
    dnsDifficulty: "medio",
    notas: [
      "Todas las consolas modernas permiten cambiar DNS",
      "Tienen control parental propio para limitar contenido",
      "La opción más segura es configurar DNS en el router",
      "Los juegos online pueden tener chats no moderados",
    ],
  },
  {
    id: "kindle",
    label: "Kindle / Fire Tablet",
    icon: "BookOpen",
    descripcion: "Dispositivos Amazon (Kindle, Fire Tablet, Echo Show)",
    osTypes: ["Fire OS", "Kindle Firmware"],
    hasNativeParentalControl: true,
    hasDnsConfig: false,
    dnsDifficulty: "avanzado",
    notas: [
      "Amazon Fire Tablet tiene 'Amazon Kids' como control parental",
      "Kindle básico no permite cambiar DNS fácilmente",
      "Para Fire Tablet: configurar DNS en el router es la mejor opción",
    ],
  },
]

export const networkContexts: ContextInfo[] = [
  {
    id: "wifi-casa",
    label: "Wi-Fi de casa",
    icon: "Wifi",
    descripcion: "El dispositivo se conecta principalmente al WiFi del hogar",
    recomendacionDns: "Configurar DNS en el router (protege todos los dispositivos de la casa)",
    particularidades: [
      "Es la situación más común y fácil de proteger",
      "Configurar el router protege todos los dispositivos a la vez",
      "Si el menor usa datos móviles fuera de casa, necesitas capa adicional",
    ],
  },
  {
    id: "datos-moviles",
    label: "Solo datos móviles",
    icon: "Signal",
    descripcion: "El menor usa Internet principalmente con datos del móvil (sin WiFi en casa)",
    recomendacionDns: "Configurar DNS privado en el dispositivo (Android) o perfil DNS (iOS)",
    particularidades: [
      "El DNS del router no protege cuando está fuera de casa",
      "Android: usar DNS privado nativo (funciona en datos móviles)",
      "iOS: requiere perfil de configuración DNS para datos móviles",
      "Algunos operadores bloquean DNS de terceros",
    ],
  },
  {
    id: "wifi-datos",
    label: "Wi-Fi + datos móviles",
    icon: "Wifi",
    descripcion: "El menor usa tanto WiFi en casa como datos móviles fuera",
    recomendacionDns: "Configurar DNS en router + DNS privado en el dispositivo como respaldo",
    particularidades: [
      "Necesitas protección en ambas redes",
      "Router para la red de casa + DNS privado en el dispositivo",
      "Verifica que el DNS privado funciona también en datos móviles",
    ],
  },
  {
    id: "dispositivo-compartido",
    label: "Dispositivo compartido",
    icon: "Users",
    descripcion: "Varias personas (adultos y menores) usan el mismo dispositivo",
    recomendacionDns: "Crear perfiles de usuario separados + DNS en el router",
    particularidades: [
      "No puedes aplicar control parental al adulto",
      "Crea cuentas de usuario separadas para cada persona",
      "El DNS a nivel de router protege a todos sin afectar al adulto",
      "Windows: cuenta estándar para el menor, administrador para el adulto",
    ],
  },
  {
    id: "dispositivo-personal",
    label: "Dispositivo personal del menor",
    icon: "Smartphone",
    descripcion: "El dispositivo es exclusivo del menor (su primer móvil o tablet)",
    recomendacionDns: "Control parental completo + DNS en dispositivo y router",
    particularidades: [
      "El menor es el único usuario — puedes aplicar todas las restricciones",
      "Configura DNS + control parental sin miedo a afectar a otros",
      "Ideal para primer móvil (normalmente a los 11-12 años)",
      "Establece las reglas claras desde el principio",
    ],
  },
  {
    id: "varias-redes",
    label: "Se conecta a varias redes",
    icon: "Network",
    descripcion: "El menor se conecta desde casa, colegio, casa de amigos, etc.",
    recomendacionDns: "DNS privado en el dispositivo (funciona en cualquier WiFi)",
    particularidades: [
      "El DNS del router solo protege en casa",
      "DNS privado en Android funciona en cualquier WiFi",
      "iOS: perfil DNS o configurar en cada red por separado",
      "El navegador con DoH también funciona en cualquier red",
    ],
  },
  {
    id: "wifi-publica",
    label: "Wi-Fi público / hotspots",
    icon: "Wifi",
    descripcion: "El menor se conecta en bibliotecas, cafeterías, centros comerciales",
    recomendacionDns: "DNS privado en el dispositivo + navegador con DoH",
    particularidades: [
      "Las WiFi públicas pueden bloquear DNS de terceros",
      "Usar DoH en el navegador evita que la WiFi manipule el DNS",
      "Android con DNS privado funciona en la mayoría de WiFi públicas",
      "Restringe el uso de WiFi públicas para menores pequeños",
    ],
  },
]

export function getDeviceInfo(id: string): DeviceInfo | undefined {
  return deviceTypes.find((d) => d.id === id)
}

export function getNetworkContext(id: string): ContextInfo | undefined {
  return networkContexts.find((c) => c.id === id)
}

export function getDeviceLabel(id: string): string {
  return getDeviceInfo(id)?.label ?? id
}

export function getContextLabel(id: string): string {
  return getNetworkContext(id)?.label ?? id
}
