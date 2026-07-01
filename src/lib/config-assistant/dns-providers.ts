// Escudo Digital Familiar — DNS Provider Database
// Comprehensive comparison of free & paid DNS services for family protection

export interface DnsProvider {
  id: string
  name: string
  website: string
  description: string
  primaryIPv4: string
  secondaryIPv4: string
  primaryIPv6?: string
  secondaryIPv6?: string
  dohUrl?: string
  dotAddress?: string
  filtering: "familia" | "adultos" | "malware" | "personalizado"
  tier: "gratuito" | "freemium" | "pago"
  price?: string
  usageLimit?: string
  difficulty: "facil" | "medio" | "avanzado"
  features: string[]
  pros: string[]
  cons: string[]
  recommended: boolean
  europeBased: boolean
  logsPolicy: string
}

export const dnsProviders: DnsProvider[] = [
  {
    id: "dns4eu-child",
    name: "DNS4.EU Child Protection",
    website: "https://joindns4.eu",
    description:
      "Perfil infantil de DNS4.EU. Bloquea contenido para adultos, violencia, drogas, apuestas y malware. Gestionado por Whalebone (CZ.NIC), sin ánimo de lucro.",

    primaryIPv4: "86.54.11.12",
    secondaryIPv4: "86.54.11.212",
    primaryIPv6: "2a13:1001::86:54:11:12",
    secondaryIPv6: "2a13:1001::86:54:11:212",
    dohUrl: "https://child.joindns4.eu/dns-query",
    dotAddress: "child.joindns4.eu",
    filtering: "familia",
    tier: "gratuito",
    difficulty: "facil",
    features: [
      "Bloqueo de contenido para adultos",
      "Bloqueo de violencia y drogas",
      "Bloqueo de malware y phishing",
      "Sin ánimo de lucro",
      "Cumple RGPD",
    ],
    pros: ["Europeo", "Sin registro ni límite", "Baja latencia en Europa"],
    cons: ["Perfiles de protección por separado (no uno solo)"],
    recommended: true,
    europeBased: true,
    logsPolicy: "Sin logs (operado por CZ.NIC, sujeto a legislación checa)",
  },
  {
    id: "dns4eu-protective",
    name: "DNS4.EU Protective",
    website: "https://joindns4.eu",
    description:
      "Perfil básico de DNS4.EU. Bloquea malware, phishing y amenazas. No bloquea contenido para adultos. Ideal para mayores de 15 años o adultos.",
    primaryIPv4: "86.54.11.1",
    secondaryIPv4: "86.54.11.201",
    primaryIPv6: "2a13:1001::86:54:11:1",
    secondaryIPv6: "2a13:1001::86:54:11:201",
    dohUrl: "https://protective.joindns4.eu/dns-query",
    dotAddress: "protective.joindns4.eu",
    filtering: "malware",
    tier: "gratuito",
    difficulty: "facil",
    features: [
      "Bloqueo de malware y phishing",
      "Protección contra amenazas",
      "Sin bloqueo de contenido",
      "Sin ánimo de lucro",
    ],
    pros: ["Europeo", "Muy rápida", "Sin falsos positivos en contenido legítimo"],
    cons: ["No bloquea contenido para adultos"],
    recommended: false,
    europeBased: true,
    logsPolicy: "Sin logs",
  },
  {
    id: "dns4eu-child-noads",
    name: "DNS4.EU Child + Ad Blocking",
    website: "https://joindns4.eu",
    description:
      "Perfil máximo de DNS4.EU. Combina filtro infantil con bloqueo de publicidad. Para menores de 0-12 años o máxima protección.",
    primaryIPv4: "86.54.11.11",
    secondaryIPv4: "86.54.11.211",
    primaryIPv6: "2a13:1001::86:54:11:11",
    secondaryIPv6: "2a13:1001::86:54:11:211",
    dohUrl: "https://child-noads.joindns4.eu/dns-query",
    dotAddress: "child-noads.joindns4.eu",
    filtering: "familia",
    tier: "gratuito",
    difficulty: "facil",
    features: [
      "Bloqueo de contenido para adultos",
      "Bloqueo de publicidad",
      "Bloqueo de malware",
      "Máxima protección",
    ],
    pros: ["Protección completa", "Sin anuncios"],
    cons: ["Algunas webs pueden fallar por el bloqueo de anuncios"],
    recommended: false,
    europeBased: true,
    logsPolicy: "Sin logs",
  },
  {
    id: "cleanbrowsing-family",
    name: "CleanBrowsing (Familia)",
    website: "https://cleanbrowsing.org",
    description:
      "CleanBrowsing Family Filter bloquea contenido para adultos, búsquedas explícitas, proxies/anonymizers y sitios con malware. Es uno de los filtros familiares más completos del mercado con versión gratuita.",
    primaryIPv4: "185.228.168.168",
    secondaryIPv4: "185.228.169.168",
    primaryIPv6: "2a0d:2a00:1::",
    secondaryIPv6: "2a0d:2a00:2::",
    dohUrl: "https://doh.cleanbrowsing.org/doh/family-filter/",
    dotAddress: "family-filter-dns.cleanbrowsing.org",
    filtering: "familia",
    tier: "gratuito",
    difficulty: "facil",
    features: [
      "Bloqueo de contenido para adultos",
      "Bloqueo de proxies y anonymizers",
      "Filtro de búsquedas seguras (Safe Search)",
      "Protección contra malware",
      "DNS sobre HTTPS y TLS",
      "Actualizaciones frecuentes de listas",
      "Versión de pago con panel de control",
    ],
    pros: [
      "Filtro familiar más completo del mercado gratuito",
      "Safe Search forzado en Google, Bing, YouTube",
      "Bloqueo de proxies — los menores no lo saltan",
      "Fácil de recordar (185.228.168.168)",
      "Actualizaciones frecuentes",
    ],
    cons: [
      "Empresa estadounidense (no RGPD)",
      "Versión gratuita sin personalización",
      "Versión de pago necesaria para informes",
    ],
    recommended: true,
    europeBased: false,
    logsPolicy:
      "La versión gratuita guarda registros anónimos 24h; la de pago permite más control",
  },
  {
    id: "cloudflare-families",
    name: "Cloudflare 1.1.1.1 para Familias",
    website: "https://one.one.one.one/families/",
    description:
      "Cloudflare ofrece DNS gratuitos con filtrado familiar en las direcciones 1.1.1.3 (bloqueo de malware) y 1.1.1.2 (bloqueo de malware + contenido para adultos). Rápido, global y privado.",
    primaryIPv4: "1.1.1.3",
    secondaryIPv4: "1.0.0.3",
    primaryIPv6: "2606:4700:4700::1113",
    secondaryIPv6: "2606:4700:4700::1003",
    dohUrl: "https://cloudflare-dns.com/dns-query",
    dotAddress: "cloudflare-dns.com",
    filtering: "familia",
    tier: "gratuito",
    difficulty: "facil",
    features: [
      "Bloqueo de malware (nivel 1.1.1.2)",
      "Bloqueo de malware + contenido adultos (nivel 1.1.1.3)",
      "Velocidad global excelente (CDN)",
      "Sin registro de logs (auditado)",
      "DNS sobre HTTPS y TLS",
      "Sin límite de uso",
    ],
    pros: [
      "Extremadamente rápido (red global CDN)",
      "Auditado por KPMG — sin logs",
      "Fácil de recordar (1.1.1.3)",
      "Gratuito sin límites",
      "Múltiples niveles de filtrado",
    ],
    cons: [
      "Solo dos niveles de filtro (malware vs familia)",
      "Menos granular que otras opciones",
      "Empresa estadounidense",
      "No bloquea proxies ni anonymizers",
    ],
    recommended: true,
    europeBased: false,
    logsPolicy: "Sin logs — auditado independientemente por KPMG",
  },
  {
    id: "adguard-family",
    name: "AdGuard DNS (Protección Familiar)",
    website: "https://adguard-dns.io",
    description:
      "AdGuard DNS Family Protection combina bloqueo de anuncios, rastreadores, malware y contenido para adultos. Versión gratuita con filtrado DNS; versión de pago con protección a nivel de app.",
    primaryIPv4: "94.140.14.15",
    secondaryIPv4: "94.140.15.16",
    primaryIPv6: "2a10:50c0::bad1:ff",
    secondaryIPv6: "2a10:50c0::bad2:ff",
    dohUrl: "https://dns-family.adguard-dns.com/dns-query",
    dotAddress: "dns-family.adguard-dns.com",
    filtering: "familia",
    tier: "freemium",
    price: "Gratuito DNS / 3.99€/mes app completa",
    usageLimit: "Sin límite en DNS gratuito",
    difficulty: "facil",
    features: [
      "Bloqueo de anuncios y rastreadores",
      "Bloqueo de contenido para adultos",
      "Protección contra malware y phishing",
      "DNS sobre HTTPS, TLS, QUIC",
      "App para Android/iOS (versión de pago)",
      "Personalización de listas (versión de pago)",
    ],
    pros: [
      "Bloquea anuncios además de contenido inapropiado",
      "Muy popular y bien mantenido",
      "DNS-over-QUIC para más velocidad",
      "Panel de estadísticas en web",
    ],
    cons: [
      "El bloqueo de anuncios puede romper algunos sitios",
      "Funciones avanzadas son de pago",
      "Empresa con sede en Chipre (jurisdicción mixta)",
    ],
    recommended: true,
    europeBased: true,
    logsPolicy:
      "Sin logs en DNS gratuito; logs anónimos agregados en app de pago",
  },
  {
    id: "quad9",
    name: "Quad9 (9.9.9.9)",
    website: "https://quad9.net",
    description:
      "Quad9 es un DNS gratuito gestionado por la Fundación Quad9 (suiza). Bloquea dominios maliciosos, phishing y malware usando inteligencia de amenazas de múltiples proveedores de ciberseguridad.",
    primaryIPv4: "9.9.9.9",
    secondaryIPv4: "149.112.112.112",
    primaryIPv6: "2620:fe::fe",
    secondaryIPv6: "2620:fe::9",
    dohUrl: "https://dns.quad9.net/dns-query",
    dotAddress: "dns.quad9.net",
    filtering: "malware",
    tier: "gratuito",
    difficulty: "facil",
    features: [
      "Bloqueo de malware, phishing y dominios maliciosos",
      "Inteligencia de amenazas de 19+ proveedores",
      "Sin registro de IPs (certificado por PWC)",
      "DNS sobre HTTPS y TLS",
      "Gratuito sin límites",
      "Gestión por fundación sin ánimo de lucro",
    ],
    pros: [
      "Excelente para protección contra malware",
      "Fundación suiza sin ánimo de lucro",
      "Privacidad garantizada (sin logs de IP)",
      "Rápido y confiable",
    ],
    cons: [
      "NO bloquea contenido para adultos (solo malware)",
      "No tiene filtro familiar como tal",
      "Menos útil como única protección para menores",
      "No bloquea apuestas ni pornografía",
    ],
    recommended: false,
    europeBased: true,
    logsPolicy:
      "Sin registros de IP — certificado por PWC. Solo almacenan datos agregados anónimos",
  },
  {
    id: "opendns-familyshield",
    name: "OpenDNS FamilyShield",
    website: "https://www.opendns.com/setupguide/#familyshield",
    description:
      "OpenDNS FamilyShield (Cisco) bloquea contenido para adultos de forma automática. Es uno de los servicios de DNS familiar más antiguos y conocidos, con bloqueo probado.",
    primaryIPv4: "208.67.222.123",
    secondaryIPv4: "208.67.220.123",
    filtering: "adultos",
    tier: "gratuito",
    difficulty: "facil",
    features: [
      "Bloqueo de contenido para adultos",
      "Protección contra phishing",
      "Fácil de configurar",
      "Sin registro necesario",
    ],
    pros: [
      "Muy conocido y probado durante años",
      "Fácil de recordar",
      "Sin registro ni cuenta necesaria",
      "Funciona en todo el mundo",
    ],
    cons: [
      "No bloquea malware específicamente",
      "No tiene DNS sobre HTTPS nativo",
      "Sin protección contra proxies/anonymizers",
      "Empresa estadounidense (Cisco)",
      "Sin IPv6",
    ],
    recommended: false,
    europeBased: false,
    logsPolicy: "OpenDNS guarda logs anónimos por 24h",
  },
  {
    id: "nextdns",
    name: "NextDNS",
    website: "https://nextdns.io",
    description:
      "NextDNS es un DNS cloud con filtrado personalizable. Versión gratuita generosa (300.000 consultas/mes). Permite crear reglas personalizadas, bloquear categorías específicas y ver estadísticas detalladas.",
    primaryIPv4: "45.90.28.167",
    secondaryIPv4: "45.90.30.167",
    dohUrl: "https://dns.nextdns.io/XXXXX",
    dotAddress: "XXXXX.dns.nextdns.io",
    filtering: "personalizado",
    tier: "freemium",
    price: "Gratuito 300K consultas/mes / 1.99€/mes ilimitado",
    usageLimit: "300.000 consultas/mes en plan gratuito",
    difficulty: "medio",
    features: [
      "Filtrado personalizable por categorías",
      "Bloqueo de anuncios, rastreadores, malware",
      "Bloqueo de contenido para adultos",
      "Estadísticas detalladas en dashboard",
      "Listas blancas y negras personalizadas",
      "DNS sobre HTTPS, TLS, QUIC",
      "App para iOS y Android",
    ],
    pros: [
      "Máxima personalización",
      "Dashboard con estadísticas en tiempo real",
      "Control granular de lo que se bloquea",
      "Compatible con todos los dispositivos",
      "Plan gratuito generoso para uso familiar",
    ],
    cons: [
      "Límite de consultas en plan gratuito",
      "Requiere crear cuenta para configurar",
      "Más complejo de configurar inicialmente",
      "Si se supera el límite, deja de filtrar",
    ],
    recommended: false,
    europeBased: false,
    logsPolicy:
      "Configurable: guarda logs anónimos por 24h por defecto, desactivables",
  },
  {
    id: "controld",
    name: "Control D",
    website: "https://controld.com",
    description:
      "Control D ofrece DNS gestionado con filtros preconfigurados. Dispone de perfiles 'Family' que bloquean contenido para adultos, malware y redes sociales. Plan gratuito con 500K consultas/mes.",
    primaryIPv4: "76.76.2.2",
    secondaryIPv4: "76.76.10.2",
    dohUrl: "https://dns.controld.com/family",
    dotAddress: "family.controld.com",
    filtering: "familia",
    tier: "freemium",
    price: "Gratuito 500K consultas/mes / 2.99€/mes ilimitado",
    usageLimit: "500.000 consultas/mes en plan gratuito",
    difficulty: "medio",
    features: [
      "Bloqueo de contenido para adultos",
      "Bloqueo de malware y phishing",
      "Perfiles preconfigurados (Family, Relax, Strict)",
      "DNS sobre HTTPS y TLS",
      "Estadísticas en dashboard",
      "Personalización de listas",
    ],
    pros: [
      "Perfiles familia listo para usar",
      "Límite generoso en plan gratuito",
      "Fácil configuración con perfiles",
      "Bloqueo de redes sociales opcional",
    ],
    cons: [
      "Requiere crear cuenta",
      "Límite de consultas en plan gratuito",
      "Menos conocido/maduro que otras alternativas",
      "Empresa canadiense",
    ],
    recommended: false,
    europeBased: false,
    logsPolicy: "Logs anónimos por defecto, configurables en dashboard",
  },
  {
    id: "yandex-family",
    name: "Yandex DNS (Familia)",
    website: "https://dns.yandex.com",
    description:
      "Yandex DNS Family bloquea contenido para adultos y sitios maliciosos. Servicio gratuito y sencillo. Adecuado como opción secundaria o de respaldo.",
    primaryIPv4: "77.88.8.7",
    secondaryIPv4: "77.88.8.3",
    filtering: "familia",
    tier: "gratuito",
    difficulty: "facil",
    features: [
      "Bloqueo de contenido para adultos",
      "Protección contra malware y phishing",
      "Gratuito sin límites",
      "Fácil configuración",
    ],
    pros: [
      "Totalmente gratuito",
      "Sencillo de configurar",
      "Sin registro necesario",
    ],
    cons: [
      "⚠️ Servicio discontinuado — no recomendado",
      "Empresa rusa (preocupaciones de privacidad)",
      "Sin DNS sobre HTTPS nativo",
      "Sin IPv6",
    ],
    recommended: false,
    europeBased: false,
    logsPolicy: "Yandex guarda logs; política de privacidad rusa aplicable",
  },
  {
    id: "cira-shield",
    name: "CIRA Canadian Shield (Familia)",
    website: "https://www.cira.ca/cybersecurity-services/canadian-shield",
    description:
      "CIRA Canadian Shield es un DNS gratuito gestionado por la autoridad de Internet de Canadá (CIRA, sin ánimo de lucro). El perfil 'Family' bloquea contenido para adultos, violencia, discursos de odio y malware. Sin registro ni límites.",
    primaryIPv4: "149.112.121.30",
    secondaryIPv4: "149.112.122.30",
    primaryIPv6: "2620:10A:80BB::30",
    secondaryIPv6: "2620:10A:80BC::30",
    dohUrl: "https://family.canadianshield.cira.ca/dns-query",
    dotAddress: "family.canadianshield.cira.ca",
    filtering: "familia",
    tier: "gratuito",
    difficulty: "facil",
    features: [
      "Bloqueo de contenido para adultos y violencia",
      "Bloqueo de discursos de odio",
      "Protección contra malware y phishing",
      "Sin límite de uso ni registro",
      "DNS sobre HTTPS y TLS",
      "Gestionado por CIRA (sin ánimo de lucro)",
    ],
    pros: [
      "Sin ánimo de lucro (autoridad de Internet de Canadá)",
      "Gratuito sin límites ni registro",
      "Bloqueo completo: adultos + violencia + odio + malware",
      "Fácil configuración",
    ],
    cons: [
      "Servidores en Canadá (no Europa)",
      "Menos conocido fuera de Canadá",
      "Sin panel de control ni personalización",
    ],
    recommended: false,
    europeBased: false,
    logsPolicy: "Sin logs — solo datos agregados anónimos para operación",
  },
]

export function getDnsProvider(id: string): DnsProvider | undefined {
  return dnsProviders.find((p) => p.id === id)
}

export function getRecommendedProviders(): DnsProvider[] {
  return dnsProviders.filter((p) => p.recommended)
}

export function getFreeProviders(): DnsProvider[] {
  return dnsProviders.filter((p) => p.tier !== "pago")
}

export const dnsCategories = {
  gratuitos: dnsProviders.filter((p) => p.tier === "gratuito"),
  freemium: dnsProviders.filter((p) => p.tier === "freemium"),
  pago: [
    {
      id: "nextdns-pro",
      name: "NextDNS Pro",
      price: "1.99€/mes",
      extraFeatures: ["Consultas ilimitadas", "Hasta 500.000 reglas", "Equipos ilimitados"],
    },
    {
      id: "controld-pro",
      name: "Control D Pro",
      price: "2.99€/mes",
      extraFeatures: ["Consultas ilimitadas", "Redes ilimitadas", "Soporte prioritario"],
    },
    {
      id: "cleanbrowsing-pro",
      name: "CleanBrowsing Pro",
      price: "5.95€/mes",
      extraFeatures: ["Panel de control completo", "Informes detallados", "Personalización total", "Soporte 24/7"],
    },
    {
      id: "adguard-pro",
      name: "AdGuard DNS Pro",
      price: "3.99€/mes",
      extraFeatures: ["Protección a nivel de app", "Filtrado en todo el dispositivo", "Soporte técnico"],
    },
  ],
}
