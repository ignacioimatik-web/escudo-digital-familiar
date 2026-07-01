// Escudo Digital Familiar — Comprehensive Configuration Knowledge Base
// Covers ALL device × network × protection level combinations

import type { DeviceConfig, DeviceType, NetworkContext, ProtectionLevel } from "./types"

function cfg(
  device: DeviceType,
  network: NetworkContext,
  level: ProtectionLevel,
  data: Omit<DeviceConfig, "id" | "device" | "network" | "level">
): DeviceConfig {
  return { id: `${device}-${network}-${level}`, device, network, level, ...data }
}

// ── SHARED DNS INFO ──────────────────────────────────────────

const DNS_TABLE = `
| Proveedor | Perfil | DNS Primario | DNS Secundario | ¿Bloquea adultos? |
|-----------|--------|-------------|----------------|-------------------|
| **DNS4.EU** (recomendado) | Child Protection | 86.54.11.12 | 86.54.11.212 | ✅ Sí |
| **DNS4.EU** | Protective | 86.54.11.1 | 86.54.11.201 | ❌ Solo malware |
| **DNS4.EU** | Child + Ad Block | 86.54.11.11 | 86.54.11.211 | ✅ Sí + anuncios |
| **CleanBrowsing Family** | Family | 185.228.168.168 | 185.228.169.168 | ✅ Sí |
| **Cloudflare Familias** | Family | 1.1.1.3 | 1.0.0.3 | ✅ Sí |
| **AdGuard Family** | Family | 94.140.14.15 | 94.140.15.16 | ✅ Sí |
| **CIRA Canadian Shield** | Family | 149.112.121.30 | 149.112.122.30 | ✅ Sí |
| **Quad9** | Malware only | 9.9.9.9 | 149.112.112.112 | ❌ Solo malware |
`

// DNS4.EU perfiles (según https://joindns4.eu/for-public)
const DNS4_PROTECTIVE = "86.54.11.1"
const DNS4_PROTECTIVE2 = "86.54.11.201"
const DNS4_CHILD = "86.54.11.12"
const DNS4_CHILD2 = "86.54.11.212"
const DNS4_NOADS = "86.54.11.13"
const DNS4_NOADS2 = "86.54.11.213"
const DNS4_CHILD_NOADS = "86.54.11.11"
const DNS4_CHILD_NOADS2 = "86.54.11.211"
const DNS4_UNFILTERED = "86.54.11.100"
const DNS4_UNFILTERED2 = "86.54.11.200"

// Hostnames para DNS privado Android (DoT)
const DNS4_CHILD_HOST = "child.joindns4.eu"
const DNS4_PROTECTIVE_HOST = "protective.joindns4.eu"
const DNS4_CHILD_NOADS_HOST = "child-noads.joindns4.eu"

// Aliases para compatibilidad (Child Protection es el perfil familiar recomendado)
const DNS_FAMILIA_SURF = DNS4_CHILD
const DNS_FAMILIA_SURF2 = DNS4_CHILD2
const CLEAN_BROWSING = "185.228.168.168"
const CLEAN_BROWSING2 = "185.228.169.168"
const CLOUDFLARE_FAMILY = "1.1.1.3"
const CLOUDFLARE_FAMILY2 = "1.0.0.3"
const ADGUARD_FAMILY = "94.140.14.15"
const ADGUARD_FAMILY2 = "94.140.15.16"

// ── ANDROID ──────────────────────────────────────────────────

const androidPasosBase: DeviceConfig["pasos"] = [
  {
    id: "android-dns-1",
    numero: 1,
    titulo: "Abrir ajustes de red",
    descripcion:
      "📍 Abre **Ajustes** en el móvil\n📶 Entra en **Red e Internet** o **Conexiones**\n🔍 Busca **DNS privado** (suele estar abajo del todo)\n\n✏️ En Samsung: Ajustes > Conexiones > Más ajustes > DNS privado\n✏️ En Xiaomi: Ajustes > Conexión y compartir > DNS privado\n✏️ En Google Pixel: Ajustes > Red e Internet > DNS privado",
    notas: [
      "Si no ves \"DNS privado\", tu móvil es muy antiguo (Android 8 o anterior). No te preocupes, puedes configurar el DNS en el router en su lugar.",
    ],
  },
  {
    id: "android-dns-2",
    numero: 2,
    titulo: "Activar DNS privado",
    descripcion:
      "🔘 Pulsa en la opción **\"Nombre del host del proveedor de DNS privado\"**\n✏️ En el recuadro que aparece, escribe exactamente:\n\n📝 **child.joindns4.eu** (protección infantil)\n\n✅ Pulsa **Guardar** o **Aceptar**\n\n💡 Otros perfiles DNS4.EU según edad:\n   • **protective.joindns4.eu** → +15 años, solo malware\n   • **child-noads.joindns4.eu** → 0-12 años, infantil + sin anuncios\n\n💡 Alternativas si DNS4.EU no funciona:\n   • **family-filter-dns.cleanbrowsing.org** (CleanBrowsing)\n   • **cloudflare-dns.com** (Cloudflare Familias)",
    notas: [
      "Escribe el nombre exactamente como aparece, sin espacios ni http://",
    ],
  },
  {
    id: "android-dns-3",
    numero: 3,
    titulo: "Verificar que funciona",
    descripcion:
      "🌐 Abre el navegador Chrome\n🔤 Escribe en la barra: **dnsleaktest.com**\n🔍 Pulsa **Extended Test**\n👀 Mira que los servidores que salen sean del proveedor que elegiste\n\n🎯 **Para asegurarte:** intenta entrar a una página de apuestas o contenido para adultos. Si no carga, ¡el DNS funciona!",
    notas: [
      "Si ves los servidores de tu operador (Movistar, Orange...), el DNS privado no se ha activado bien. Repite el paso 2.",
    ],
  },
]

const androidPasosFamilyLink: DeviceConfig["pasos"] = [
  {
    id: "android-fl-1",
    numero: 4,
    titulo: "Instalar Google Family Link",
    descripcion:
      "📲 En **tu móvil** (el del adulto):\n   1. Abre Google Play\n   2. Busca **Family Link**\n   3. Pulsa **Instalar**\n👶 Crea una cuenta de Google para el menor (o usa la que ya tenga)\n🔗 Sigue los pasos para **vincular su dispositivo**",
    advertencia: "Importante: instala Family Link en TU móvil primero, luego vinculas el dispositivo del menor. No al revés.",
  },
  {
    id: "android-fl-2",
    numero: 5,
    titulo: "Configurar filtros de contenido",
    descripcion:
      "👤 Abre Family Link en tu móvil\n👶 Selecciona la cuenta del menor\n⚙️ Ve a **Gestionar configuración**\n🎯 Pulsa en **Filtros de Google Play**\n🔢 Elige la edad máxima para las apps:\n   • 0-6 años → solo apps infantiles\n   • 7-11 años → hasta +12 con permiso\n   • 12-14 años → hasta +16 con diálogo\n   • 15-17 años → +18 con responsabilidad",
    notas: [
      "Puedes cambiar estos filtros cuando quieras desde tu móvil",
    ],
  },
  {
    id: "android-fl-3",
    numero: 6,
    titulo: "Establecer límites de tiempo",
    descripcion:
      "⏰ En Family Link, pulsa **Límites de tiempo**\n📅 Elige los días de la semana\n🌙 Pon una **hora de dormir** (ej: 21:00 - 7:00)\n⏱️ Pon un **tiempo máximo diario** (ej: 2 horas)\n\n👶 Según la edad:\n   • 0-6 años: 30-60 minutos al día\n   • 7-11 años: 1-2 horas al día\n   • 12-14 años: 2-3 horas, revisa cada semana\n   • 15-17 años: habla con él/ella y llegar a un acuerdo",
    notas: [
      "Los límites se pausan los fines de semana si tú quieres",
    ],
  },
]

const androidEdgeCases = [
  { problema: "DNS privado no se guarda", solucion: "Verifica el nombre del host (sin espacios, sin http://). Algunos fabricantes requieren reiniciar el dispositivo." },
  { problema: "No aparece la opción DNS privado", solucion: "Tu Android es anterior a 9.0. Opciones: (1) usa DNS Changer de Google Play, (2) configura en el router, (3) usa navegador con DoH." },
  { problema: "El DNS no funciona con datos móviles", solucion: "Algunos operadores bloquean DNS de terceros. Prueba con otro proveedor DNS. Si falla, usa Cloudflare 1.1.1.3 que suele funcionar mejor con operadores." },
  { problema: "El menor desactiva el DNS", solucion: "En Family Link, bloquea los cambios de configuración de red. Si no es suficiente, cambia el DNS en el router (el menor no puede modificarlo)." },
  { problema: "Family Link no envía notificaciones", solucion: "Comprueba que las notificaciones de Family Link están activadas en ajustes del dispositivo del adulto." },
]

// ── KNOWLEDGE BASE ───────────────────────────────────────────

export const knowledgeBase: DeviceConfig[] = [
  // ═══════════════════════════════════════
  // ANDROID
  // ═══════════════════════════════════════

  cfg("android", "wifi-casa", "basico", {
    titulo: "Protección básica en Android (WiFi en casa)",
    resumen: "Configuración rápida: DNS privado + filtros básicos de Play Store.",
    tiempoEstimado: "10-15 minutos",
    dnsRecomendado: [DNS_FAMILIA_SURF, DNS_FAMILIA_SURF2],
    pasos: androidPasosBase.slice(0, 3),
    verificacion:
      "Visita un sitio bloqueado desde el navegador. Debería mostrar error de conexión. Eso confirma que el DNS funciona.",
    erroresFrecuentes: androidEdgeCases.filter((_, i) => i !== 4),
  }),

  cfg("android", "wifi-casa", "recomendado", {
    titulo: "Protección recomendada en Android (WiFi en casa)",
    resumen: "DNS privado en el móvil + Google Family Link completo.",
    tiempoEstimado: "20-25 minutos",
    dnsRecomendado: [DNS_FAMILIA_SURF, CLEAN_BROWSING],
    pasos: [
      ...androidPasosBase,
      ...androidPasosFamilyLink.map((p, i) => ({
        ...p,
        numero: p.numero + 1,
      })),
      {
        id: "android-compras",
        numero: 8,
        titulo: "Activar aprobación de compras",
        descripcion:
          "En Family Link, ve a **Gestionar configuración > Controles de cuentas > Aprobación de compras y descargas**. Actívala. Así ninguna compra ni descarga de apps en Play Store se realizará sin que tú la autorices desde tu móvil.",
      },
      {
        id: "android-router-bonus",
        numero: 9,
        titulo: "🌟 Extra: proteger también el WiFi de casa (opcional)",
        descripcion:
          "Si quieres proteger TODOS los dispositivos de casa (no solo el móvil), configura el DNS en el router:\n\n📍 Abre el navegador\n🔤 Escribe: **192.168.1.1**\n🔑 usuario **admin** / contraseña **admin**\n🔍 Busca **\"DNS\"** en los ajustes\n✏️ Cambia a **manual**\n📝 En DNS principal escribe:\n   1️⃣ **91.239.100.101**\n📝 En DNS secundario escribe:\n   2️⃣ **91.239.100.102**\n💾 Pulsa **Guardar**",
        notas: [
          "Esto es OPCIONAL. El móvil ya está protegido desde el paso 1",
          "El router protege también a la tablet, la tele, el ordenador...",
        ],
      },
    ],
    verificacion:
      "Verifica que el sitio bloqueado no carga. Comprueba que Family Link muestra el informe de actividad semanal.",
    erroresFrecuentes: androidEdgeCases,
  }),

  cfg("android", "wifi-casa", "avanzado", {
    titulo: "Protección avanzada en Android (WiFi en casa)",
    resumen: "Máxima protección: router + DNS privado + Family Link máximo + bloqueo de alternativas.",
    tiempoEstimado: "30-40 minutos",
    dnsRecomendado: [DNS_FAMILIA_SURF, CLEAN_BROWSING, CLOUDFLARE_FAMILY],
    pasos: [
      ...androidPasosBase,
      {
        id: "android-adv-fl",
        numero: 4,
        titulo: "Family Link con restricciones máximas",
        descripcion:
          "Configura todas las opciones de Family Link: filtros estrictos, límites de tiempo, aprobación de descargas y compras, bloqueo de instalación de apps.",
      },
      {
        id: "android-adv-browsers",
        numero: 5,
        titulo: "Bloquear navegadores alternativos",
        descripcion:
          "En Family Link, bloquea la instalación de navegadores que no respeten el DNS del sistema (Firefox, Opera, Brave). Permite solo Chrome o el navegador por defecto.",
        advertencia: "Algunos navegadores (Firefox) tienen su propio DoH que puede saltarse el DNS del sistema.",
      },
      {
        id: "android-adv-locks",
        numero: 6,
        titulo: "Proteger la configuración",
        descripcion:
          "Bloquea los cambios de configuración de red en Family Link. El menor no podrá modificar el DNS ni desactivar las restricciones sin tu permiso.",
      },
      {
        id: "android-adv-router-bonus",
        numero: 7,
        titulo: "🌟 Extra: DNS en el router para doble capa (opcional)",
        descripcion:
          "Si además quieres proteger todos los dispositivos de casa, añade el DNS en el router:\n\n📍 Abre el navegador\n🔤 Escribe: **192.168.1.1**\n🔑 usuario **admin** / contraseña **admin**\n🔍 Busca **\"DNS\"**\n✏️ Cambia a **manual**\n📝 1️⃣ **91.239.100.101** 2️⃣ **91.239.100.102**\n💾 **Guardar**",
        notas: ["Opcional: el móvil ya está protegido con los pasos anteriores"],
      },
    ],
    verificacion:
      "Intenta instalar una app no permitida — debe bloquearse. Intenta cambiar el DNS — debe estar bloqueado. Verifica bloqueo desde cualquier red.",
    erroresFrecuentes: androidEdgeCases,
  }),

  cfg("android", "datos-moviles", "basico", {
    titulo: "Protección básica en Android (solo datos móviles)",
    resumen: "DNS privado en el dispositivo, que funciona también con datos móviles.",
    tiempoEstimado: "5-10 minutos",
    dnsRecomendado: [DNS_FAMILIA_SURF, CLOUDFLARE_FAMILY],
    pasos: [
      {
        id: "android-mobile-1",
        numero: 1,
        titulo: "Configurar DNS privado",
        descripcion:
          "Ve a **Ajustes > Red e Internet > DNS privado** y selecciona **'Nombre del host del proveedor de DNS privado'**. Introduce: **dns4.eu**",
        notas: [
          "El DNS privado en Android funciona TAMBIÉN con datos móviles, no solo WiFi",
          "Si tu operador bloquea ciertos proveedores DNS, prueba con **cloudflare-dns.com** (Cloudflare Familias)",
        ],
      },
      {
        id: "android-mobile-2",
        numero: 2,
        titulo: "Verificar en datos móviles",
        descripcion:
          "Desactiva el WiFi y abre un navegador con datos móviles. Visita **dnsleaktest.com** para confirmar que el DNS configurado es el que estás usando.",
      },
    ],
    verificacion:
      "Con datos móviles activos (WiFi apagado), visita un sitio bloqueado. Debe mostrar error de conexión.",
    erroresFrecuentes: [
      {
        problema: "El DNS no funciona en datos móviles",
        solucion:
          "Algunos operadores (Movistar, Orange) bloquean DNS de terceros en la red móvil. Prueba con Cloudflare (1.1.1.3) ya que suele funcionar mejor. Si sigue fallando, considera cambiar de operador o usar una VPN con filtrado.",
      },
      {
        problema: "Los datos móviles son muy lentos con DNS privado",
        solucion:
          "Prueba con otro proveedor. Cloudflare suele ser el más rápido. O usa Quad9 (9.9.9.9 que aunque no bloquea adultos, sí protege contra malware).",
      },
    ],
  }),

  cfg("android", "datos-moviles", "recomendado", {
    titulo: "Protección recomendada en Android (solo datos móviles)",
    resumen: "DNS privado + Family Link completo, sin depender de WiFi.",
    tiempoEstimado: "20-30 minutos",
    dnsRecomendado: [DNS_FAMILIA_SURF, CLOUDFLARE_FAMILY],
    pasos: [
      ...androidPasosBase,
      ...androidPasosFamilyLink.map((p, i) => ({ ...p, numero: i + 4 })),
      {
        id: "android-mobile-rec-compras",
        numero: 7,
        titulo: "Activar aprobación de compras",
        descripcion: "En Family Link, activa la aprobación para todas las compras y descargas.",
      },
    ],
    verificacion:
      "Desactiva WiFi y verifica que el DNS sigue funcionando. Comprueba que Family Link muestra el informe de actividad desde la red móvil.",
    erroresFrecuentes: androidEdgeCases,
  }),

  cfg("android", "datos-moviles", "avanzado", {
    titulo: "Protección avanzada en Android (solo datos móviles)",
    resumen: "Máxima protección móvil: DNS privado doble + Family Link máximo + apps de control adicional.",
    tiempoEstimado: "25-35 minutos",
    dnsRecomendado: [CLEAN_BROWSING, CLOUDFLARE_FAMILY],
    pasos: [
      { id: "android-mob-adv-1", numero: 1, titulo: "DNS privado con CleanBrowsing", descripcion: "Configura **family-filter-dns.cleanbrowsing.org** como DNS privado. CleanBrowsing bloquea proxies/anonymizers." },
      { id: "android-mob-adv-2", numero: 2, titulo: "Family Link con restricciones máximas", descripcion: "Abre Family Link, selecciona la cuenta del menor. Ve a Gestionar configuración > Filtros. Pon el límite de edad más bajo para apps. Activa: requerir aprobación para descargas y compras, supervisar actividad, y bloquear la instalación de apps no aprobadas." },
      { id: "android-mob-adv-3", numero: 3, titulo: "Bloquear cambios de red", descripcion: "En Family Link: Gestionar configuración > Ajustes de Android > Bloquear cambios de configuración de red. Así el menor no podrá desactivar el DNS privado ni cambiar la red sin tu permiso." },
      { id: "android-mob-adv-4", numero: 4, titulo: "App de respaldo DNS", descripcion: "Instala **AdGuard** (versión gratuita) desde Play Store. Activa 'Protección DNS' en la app y elige un filtro DNS. Esto añade bloqueo de anuncios y rastreadores como capa extra además del DNS privado." },
    ],
    verificacion: "Intenta usar un proxy/anonymizer desde el móvil — debe estar bloqueado por CleanBrowsing.",
    erroresFrecuentes: androidEdgeCases,
  }),

  // Android × wifi-datos × todos los niveles
  cfg("android", "wifi-datos", "basico", {
    titulo: "Protección básica Android (WiFi + datos móviles)",
    resumen: "DNS privado en el dispositivo que funciona en ambas redes.",
    tiempoEstimado: "10-15 minutos",
    dnsRecomendado: [DNS_FAMILIA_SURF, CLOUDFLARE_FAMILY],
    pasos: [
      ...androidPasosBase.slice(0, 3),
      {
        id: "android-dual-check",
        numero: 4,
        titulo: "Verificar en WiFi y datos",
        descripcion:
          "Verifica el DNS conectado a WiFi. Luego desactiva WiFi y verifica de nuevo con datos móviles. Debe funcionar igual en ambas redes.",
      },
    ],
    verificacion: "El DNS debe funcionar tanto en WiFi como en datos móviles. Prueba en ambas redes.",
    erroresFrecuentes: androidEdgeCases,
  }),

  cfg("android", "wifi-datos", "recomendado", {
    titulo: "Protección recomendada Android (WiFi + datos móviles)",
    resumen: "Router + DNS privado + Family Link para cobertura completa.",
    tiempoEstimado: "25-35 minutos",
    dnsRecomendado: [CLEAN_BROWSING, DNS_FAMILIA_SURF],
    pasos: [
      { id: "android-dual-r1", numero: 1, titulo: "Configurar DNS en el router", descripcion: "📍 Abre Chrome o Safari\n🔤 Escribe en la barra: **192.168.1.1**\n🔑 Usuario: **admin** / Contraseña: **admin**\n🔍 Busca **DNS** en los ajustes\n✏️ Cambia a **manual**\n📝 Escribe:\n   1️⃣ **91.239.100.101**\n   2️⃣ **91.239.100.102**\n💾 Pulsa **Guardar**" },
      ...androidPasosBase.map((p) => ({ ...p, numero: p.numero + 1 })),
      ...androidPasosFamilyLink.map((p, i) => ({ ...p, numero: i + 5 })),
    ],
    verificacion: "Verifica protección en ambas redes. El router protege en casa, el DNS privado fuera.",
    erroresFrecuentes: androidEdgeCases,
  }),

  cfg("android", "wifi-datos", "avanzado", {
    titulo: "Protección avanzada Android (WiFi + datos)",
    resumen: "Doble DNS + Family Link máximo + bloqueo de proxies en todas las redes.",
    tiempoEstimado: "30-40 minutos",
    dnsRecomendado: [CLEAN_BROWSING, CLOUDFLARE_FAMILY],
    pasos: [
      { id: "android-dual-a1", numero: 1, titulo: "Router con DNS4.EU", descripcion: "📍 Abre el navegador\n🔤 Escribe: **192.168.1.1**\n🔑 Usuario: **admin** / Contraseña: **admin**\n🔍 Busca **DNS** en los ajustes\n✏️ Cambia a **manual**\n📝 Pon estos números:\n   1️⃣ **91.239.100.101**\n   2️⃣ **91.239.100.102**\n💾 Pulsa **Guardar**\n🔄 Espera 30 segundos" },
      { id: "android-dual-a2", numero: 2, titulo: "DNS privado con CleanBrowsing", descripcion: "En el móvil Android, ve a Ajustes > Red e Internet > DNS privado. Selecciona 'Nombre del host del proveedor' e introduce: **family-filter-dns.cleanbrowsing.org**. Esto protege también cuando el móvil no está en casa." },
      { id: "android-dual-a3", numero: 3, titulo: "Family Link máximo", descripcion: "Abre Family Link, selecciona la cuenta del menor. Ve a Gestionar configuración > Filtros > Google Play y pon el límite de edad más restrictivo. Activa la supervisión de descargas, compras y la aprobación para instalar apps." },
      { id: "android-dual-a4", numero: 4, titulo: "Bloqueo de proxies", descripcion: "Al usar CleanBrowsing como DNS privado, los proxies y VPN quedan bloqueados automáticamente. Verifica intentando usar un proxy desde el navegador del menor — debe fallar." },
      { id: "android-dual-a5", numero: 5, titulo: "DoH en navegador como respaldo", descripcion: "En Chrome: Ajustes > Privacidad y seguridad > Usar DNS seguro > Elegir proveedor personalizado > **https://doh.cleanbrowsing.org/doh/family-filter/** . Esto añade una tercera capa de protección DNS." },
    ],
    verificacion: "Prueba bloqueo en WiFi, datos móviles y usando proxies. Todo debe estar bloqueado.",
    erroresFrecuentes: androidEdgeCases,
  }),

  // Android × dispositivo-compartido
  cfg("android", "dispositivo-compartido", "recomendado", {
    titulo: "Android compartido entre adulto y menor",
    resumen: "Perfiles de usuario separados + DNS privado + Family Link solo en perfil del menor.",
    tiempoEstimado: "20-30 minutos",
    dnsRecomendado: [DNS_FAMILIA_SURF, CLEAN_BROWSING],
    pasos: [
      {
        id: "android-shared-1",
        numero: 1,
        titulo: "Crear perfil de usuario para el menor",
        descripcion:
          "Ve a **Ajustes > Sistema > Usuarios múltiples > Añadir usuario**. Selecciona **'Usuario restringido'** o añade una cuenta de Google para el menor.",
        advertencia: "No uses 'Invitado' — el menor puede cambiar a otro perfil sin restricciones.",
      },
      {
        id: "android-shared-2",
        numero: 2,
        titulo: "Configurar DNS privado (afecta a todos los perfiles)",
        descripcion: "El DNS privado configurado a nivel de sistema protege TODOS los perfiles, incluido el del adulto.",
        notas: ["Esto es bueno porque protege al menor aunque el adulto no tenga restricciones", "El adulto puede acceder a sitios bloqueados usando un navegador con DoH desactivado"],
      },
      {
        id: "android-shared-3",
        numero: 3,
        titulo: "Family Link solo en el perfil del menor",
        descripcion: "Vincula Family Link solo a la cuenta del menor. El adulto no necesita restricciones de tiempo.",
      },
    ],
    verificacion: "Cambia al perfil del menor y verifica las restricciones. Cambia al perfil del adulto — sin restricciones.",
    erroresFrecuentes: [
      { problema: "El menor cambia al perfil del adulto", solucion: "Protege el perfil del adulto con contraseña/patrón. Sin acceso, el menor no puede cambiarse." },
      { problema: "El DNS bloquea contenido del adulto", solucion: "El adulto puede usar Firefox con DoH desactivado para saltar el filtro puntualmente, o añadir excepciones." },
    ],
  }),

  cfg("android", "dispositivo-personal", "recomendado", {
    titulo: "Android personal del menor",
    resumen: "Protección completa: DNS privado + Family Link + control total.",
    tiempoEstimado: "20-30 minutos",
    dnsRecomendado: [DNS_FAMILIA_SURF, CLEAN_BROWSING],
    pasos: [
      ...androidPasosBase,
      ...androidPasosFamilyLink.map((p, i) => ({ ...p, numero: i + 4 })),
      {
        id: "android-personal-fin",
        numero: 7,
        titulo: "Revisar y ajustar trimestralmente",
        descripcion: "La protección debe evolucionar con la edad del menor. Revisa los ajustes cada 3 meses y adáptalos a su madurez.",
      },
    ],
    verificacion: "Todas las capas activas: DNS + Family Link + límites. El menor no puede desactivar nada.",
    erroresFrecuentes: androidEdgeCases,
  }),

  // ═══════════════════════════════════════
  // iPhone / iPad
  // ═══════════════════════════════════════

  cfg("iphone", "wifi-casa", "basico", {
    titulo: "Protección básica en iPhone/iPad",
    resumen: "Perfil DNS de protección + restricciones básicas en Tiempo de Uso.",
    tiempoEstimado: "10-15 minutos",
    dnsRecomendado: [CLEAN_BROWSING, CLOUDFLARE_FAMILY],
    pasos: [
      {
        id: "ios-dns-perfil",
        numero: 1,
        titulo: "Instalar perfil DNS de protección",
        descripcion:
          "En iOS/iPadOS el DNS se configura por red WiFi. Sigue estos pasos:\n\n📱 Abre **Ajustes** > **Wi-Fi**\nℹ️ Pulsa el icono (i) junto a tu red\n⬇️ Baja a **Configurar DNS**\n✏️ Cambia de **Automático** a **Manual**\n❌ Elimina los DNS existentes\n➕ Añade estos DNS:\n   1️⃣ **86.54.11.12** (DNS4.EU Child Protection)\n   2️⃣ **86.54.11.212** (DNS4.EU secundario)\n💾 Pulsa **Guardar**",
        notas: [
          "Esto protege SOLO en esta red WiFi. Al cambiar de red tendrás que repetir la configuración.",
          "Si no ves \"Perfil descargado\" en Ajustes, abre Safari y prueba otra vez.",
        ],
      },
      {
        id: "ios-basico-tiempo",
        numero: 2,
        titulo: "Restricciones de contenido en Tiempo de Uso",
        descripcion:
          "⚙️ **Ajustes > Tiempo de Uso**\n🔢 Pon un código de 4 números (que el menor NO sepa)\n🌐 **Restricciones de contenido > Contenido web > Limitar contenido para adultos**\n🛑 Activa **bloquear compras en iTunes y App Store**",
        advertencia: "Sin el código, el menor puede desactivar todas las restricciones. No se lo digas.",
      },
    ],
    verificacion:
      "Conectado a cualquier red, visita un sitio para adultos. Debe mostrar Sitio web bloqueado.",
    erroresFrecuentes: [
      { problema: "No aparece Perfil descargado en Ajustes", solucion: "Asegúrate de usar Safari, no Chrome. Si sigue sin aparecer, reinicia el iPhone y vuelve a descargar." },
      { problema: "El menor conoce el código de Tiempo de Uso", solucion: "Cámbialo inmediatamente en Ajustes > Tiempo de Uso > Cambiar código." },
    ],
  }),

  cfg("iphone", "wifi-casa", "recomendado", {
    titulo: "Protección recomendada en iPhone/iPad",
    resumen: "Perfil DNS + En Familia + Tiempo de Uso completo.",
    tiempoEstimado: "20-30 minutos",
    dnsRecomendado: [DNS4_CHILD, CLEAN_BROWSING],
    pasos: [
      {
        id: "ios-rec-perfil",
        numero: 1,
        titulo: "Instalar perfil DNS de protección",
        descripcion:
          "En iOS el DNS se configura por red WiFi. Así proteges el iPhone/iPad en casa:\n\n📱 **Ajustes** > **Wi-Fi**\nℹ️ Pulsa (i) junto a tu red\n⬇️ **Configurar DNS** > **Manual**\n❌ Elimina los DNS que aparezcan\n➕ Añade:\n   1️⃣ **86.54.11.12** (DNS4.EU Child Protection)\n   2️⃣ **86.54.11.212** (DNS4.EU secundario)\n💾 **Guardar**",
        notas: [
          "Esto protege SOLO en esta red WiFi. Para más redes, repite la configuración o instala un perfil DNS.",
          "Si no ves \"Perfil descargado\" en Ajustes, abre Safari y prueba otra vez.",
        ],
      },
      {
        id: "ios-rec-tiempo",
        numero: 2,
        titulo: "Configurar Tiempo de Uso",
        descripcion:
          "📱 En el iPhone del menor:\\n⚙️ **Ajustes > Tiempo de Uso**\\n🔢 Pon un código de 4 números (que el menor NO sepa)\\n🌐 **Restricciones de contenido > Contenido web > Limitar contenido para adultos**\\n🛑 Activa **bloquear compras**\\n⏱️ Pon **límites de apps** (ej: 1-2h para juegos y redes)",
        notas: [
          "Límites de apps: 1-2h diarias para redes sociales y juegos",
          "Sin el código, el menor no puede desactivar nada",
        ],
      },
      {
        id: "ios-rec-familia",
        numero: 3,
        titulo: "Configurar En Familia",
        descripcion: "👤 En **tu** iPhone (el del adulto):\\n⚙️ Ajustes > **tu nombre** > **En Familia**\\n➕ **Añadir miembro**\\n👶 Crea un Apple ID para el menor si no tiene uno",
      },
    ],
    verificacion:
      "Conectado a cualquier red, visita un sitio para adultos. Debe mostrar 'Sitio web bloqueado'. Verifica también con datos móviles.",
    erroresFrecuentes: [
      { problema: "No aparece 'Perfil descargado' en Ajustes", solucion: "Asegúrate de usar Safari. Si sigue sin aparecer, reinicia el iPhone y vuelve a descargar el perfil." },
      { problema: "El menor conoce el código de Tiempo de Uso", solucion: "Cámbialo inmediatamente en Ajustes > Tiempo de Uso > Cambiar código." },
      { problema: "El menor tiene su propio Apple ID", solucion: "Si el menor ya tiene Apple ID, añádelo a En Familia desde Ajustes > En Familia > Añadir miembro > Invitar a otra persona." },
    ],
  }),

  // iPhone × all other critical contexts
  cfg("iphone", "datos-moviles", "recomendado", {
    titulo: "Protección en iPhone/iPad (solo datos móviles)",
    resumen: "Perfil DNS + En Familia + Tiempo de Uso sin depender de WiFi.",
    tiempoEstimado: "20-30 minutos",
    dnsRecomendado: [CLEAN_BROWSING, CLOUDFLARE_FAMILY],
    pasos: [
      {
        id: "ios-mobile-perfil",
        numero: 1,
        titulo: "Instalar perfil de DNS (imprescindible para datos móviles)",
        descripcion:
          "En iOS no hay DNS privado nativo para datos móviles. La opción más sencilla es:\n\n1️⃣ Configurar el **router** con DNS de protección (protege todas las redes WiFi)\n2️⃣ Para datos móviles, usa la app **DNS Profile** desde la App Store\n\nOtra opción: ve a **Ajustes > Wi-Fi > (i) junto a tu red > Configurar DNS > Manual** y añade:\n   **86.54.11.12** y **86.54.11.212** (DNS4.EU)",
        notas: [
          "Sin perfil, los datos móviles NO están protegidos",
          "El perfil funciona tanto en WiFi como en datos móviles",
          "Descarga el perfil desde Safari, luego ve a Ajustes > Perfil descargado > Instalar",
        ],
        advertencia: "Necesitas saber la contraseña del Apple ID del adulto para instalar perfiles.",
      },
      {
        id: "ios-mobile-tiempo",
        numero: 2,
        titulo: "Configurar Tiempo de Uso completo",
        descripcion:
          "Ajustes > Tiempo de Uso. Actívalo con código. Configura restricciones de contenido, límites de apps y bloqueo de compras.",
      },
    ],
    verificacion: "Desactiva WiFi, visita un sitio bloqueado con datos móviles — debe mostrar error.",
    erroresFrecuentes: [
      { problema: "No encuentro cómo instalar perfil DNS", solucion: "Configura el DNS manualmente: Ajustes > Wi-Fi > (i) junto a tu red > Configurar DNS > Manual. Añade 86.54.11.12 y 86.54.11.212 (DNS4.EU Child Protection)." },
      { problema: "El operador bloquea el DNS", solucion: "Prueba con Cloudflare (1.1.1.3 / 1.0.0.3) en el perfil. Si sigue sin funcionar, considera cambiar de operador." },
    ],
  }),

  cfg("iphone", "wifi-datos", "recomendado", {
    titulo: "Protección iPhone/iPad (WiFi + datos móviles)",
    resumen: "Router + perfil DNS + En Familia + Tiempo de Uso — cobertura total.",
    tiempoEstimado: "25-35 minutos",
    dnsRecomendado: [DNS_FAMILIA_SURF, CLEAN_BROWSING],
    pasos: [
      { id: "ios-dual-router", numero: 1, titulo: "DNS en el router", descripcion: "📍 Abre Chrome o Safari\n🔤 Escribe: **192.168.1.1**\n🔑 Usuario: **admin** / Contraseña: **admin**\n🔍 Busca **DNS**\n✏️ Cambia a **manual**\n📝 Escribe:\n   1️⃣ **91.239.100.101**\n   2️⃣ **91.239.100.102**\n💾 Pulsa **Guardar**" },
      { id: "ios-dual-perfil", numero: 2, titulo: "Perfil DNS para datos móviles", descripcion: "📱 **Ajustes** > **Wi-Fi**\nℹ️ Pulsa (i) junto a tu red\n⬇️ **Configurar DNS** > **Manual**\n❌ Elimina DNS existentes\n➕ Añade:\n   1️⃣ **86.54.11.12**\n   2️⃣ **86.54.11.212**\n💾 **Guardar**" },
      { id: "ios-dual-familia", numero: 3, titulo: "En Familia + Tiempo de Uso", descripcion: "👤 En tu iPhone: Ajustes > **tu nombre** > **En Familia**\n➕ Pulsa **Añadir miembro**\n👶 Crea un Apple ID para el menor\n📱 En el móvil del menor:\n   ⏰ Ajustes > **Tiempo de Uso** > **Activar**\n   🔢 Pon un código de 4 números (que el menor NO sepa)\n   🌐 Contenido web > **Limitar contenido para adultos**\n   🛑 Activa **bloquear compras**" },
    ],
    verificacion: "Prueba bloqueo en WiFi, luego con datos móviles. Ambos deben funcionar.",
    erroresFrecuentes: [],
  }),

  cfg("iphone", "dispositivo-compartido", "recomendado", {
    titulo: "iPhone/iPad compartido entre adulto y menor",
    resumen: "Perfiles separados con En Familia para el menor, DNS a nivel de router.",
    tiempoEstimado: "20-30 minutos",
    dnsRecomendado: [DNS_FAMILIA_SURF, CLEAN_BROWSING],
    pasos: [
      { id: "ios-shared-1", numero: 1, titulo: "DNS en el router (protege a todos)", descripcion: "📍 Abre Chrome o Safari\n🔤 Escribe: **192.168.1.1**\n🔑 Usuario: **admin** / Contraseña: **admin**\n🔍 Busca **DNS**\n✏️ Cambia a **manual**\n📝 Escribe:\n   1️⃣ **91.239.100.101**\n   2️⃣ **91.239.100.102**\n💾 Guardar. El menor queda protegido en casa." },
      { id: "ios-shared-2", numero: 2, titulo: "En Familia con cuenta del menor", descripcion: "En Familia > Añadir miembro. Crea un Apple ID para el menor y asígnale restricciones." },
      { id: "ios-shared-3", numero: 3, titulo: "Tiempo de Uso solo para el menor", descripcion: "Activa Tiempo de Uso para la cuenta del menor. El adulto no tendrá restricciones." },
    ],
    verificacion: "Cambia a la cuenta del menor — restricciones activas. Usa la cuenta del adulto — sin restricciones.",
    erroresFrecuentes: [
      { problema: "El adulto también tiene restricciones", solucion: "Tiempo de Uso debe configurarse solo para la cuenta del menor. El adulto debe tener su propio Apple ID sin restricciones." },
    ],
  }),

  cfg("iphone", "dispositivo-personal", "recomendado", {
    titulo: "iPhone/iPad personal del menor",
    resumen: "Protección completa: En Familia + Tiempo de Uso + perfil DNS + router.",
    tiempoEstimado: "25-30 minutos",
    dnsRecomendado: [CLEAN_BROWSING, DNS_FAMILIA_SURF],
    pasos: [
      { id: "ios-own-1", numero: 1, titulo: "Router con DNS familiar", descripcion: "📍 Abre Chrome o Safari\n🔤 Escribe: **192.168.1.1**\n🔑 Usuario: **admin** / Contraseña: **admin**\n🔍 Busca **DNS**\n✏️ Cambia a **manual**\n📝 Escribe:\n   1️⃣ **91.239.100.101**\n   2️⃣ **91.239.100.102**\n💾 Guardar" },
      { id: "ios-own-2", numero: 2, titulo: "Perfil DNS en el dispositivo", descripcion: "📱 **Ajustes** > **Wi-Fi**\nℹ️ Pulsa (i) junto a tu red\n⬇️ **Configurar DNS** > **Manual**\n❌ Elimina DNS\n➕ Añade:\n   1️⃣ **86.54.11.12**\n   2️⃣ **86.54.11.212**\n💾 **Guardar**" },
      { id: "ios-own-3", numero: 3, titulo: "En Familia", descripcion: "👤 Ajustes > **tu nombre** > **En Familia**\n➕ **Añadir miembro**\n👶 Crea un Apple ID para el menor\n✅ Activa Compartir en Familia" },
      { id: "ios-own-4", numero: 4, titulo: "Tiempo de Uso con código", descripcion: "Establece todas las restricciones en el dispositivo del menor con un código secreto." },
    ],
    verificacion: "Todas las capas activas: DNS en router, perfil DNS, En Familia, Tiempo de Uso.",
    erroresFrecuentes: [],
  }),

  // ═══════════════════════════════════════
  // WINDOWS
  // ═══════════════════════════════════════

  cfg("windows", "wifi-casa", "recomendado", {
    titulo: "Protección en Windows (WiFi en casa)",
    resumen: "DNS manual + Microsoft Family Safety + Edge como navegador principal.",
    tiempoEstimado: "20-30 minutos",
    dnsRecomendado: [DNS_FAMILIA_SURF, CLEAN_BROWSING],
    pasos: [
      {
        id: "win-dns",
        numero: 1,
        titulo: "Configurar DNS manual",
        descripcion:
          "**Panel de Control > Redes e Internet > Centro de redes > Cambiar configuración del adaptador**. Clic derecho en tu conexión > **Propiedades > IPv4 > Propiedades**. Marca 'Usar las siguientes direcciones de servidor DNS'.",
        notas: [
          `DNS preferido: ${DNS_FAMILIA_SURF} (o ${CLEAN_BROWSING})`,
          `DNS alternativo: ${DNS_FAMILIA_SURF2} (o ${CLEAN_BROWSING2})`,
          "En WiFi: asegúrate de seleccionar el adaptador correcto (Wi-Fi, no Ethernet a menos que uses cable)",
        ],
      },
      {
        id: "win-account",
        numero: 2,
        titulo: "Crear cuenta Microsoft para el menor",
        descripcion:
          "Ve a **account.microsoft.com/family** y añade un miembro. Crea una cuenta Microsoft para el menor si no tiene una.",
        advertencia: "El menor debe usar una cuenta Microsoft (no cuenta local) para que Family Safety funcione.",
      },
      {
        id: "win-familysafety",
        numero: 3,
        titulo: "Configurar Microsoft Family Safety",
        descripcion:
          "Inicia sesión en **family.microsoft.com** con tu cuenta. Selecciona al menor y configura filtros de contenido web (Edge), apps y juegos.",
        notas: ["Los filtros web solo funcionan en Microsoft Edge", "Si el menor usa Chrome o Firefox, los filtros no se aplican"],
      },
      {
        id: "win-time",
        numero: 4,
        titulo: "Establecer límites de tiempo de pantalla",
        descripcion:
          "En Family Safety > **Tiempo en pantalla**, establece horarios permitidos y tiempo máximo diario por dispositivo.",
      },
      {
        id: "win-edge",
        numero: 5,
        titulo: "Configurar Edge con protección",
        descripcion:
          "Asegúrate de que el menor use Microsoft Edge (no Chrome u otro navegador). Edge respeta los filtros de Family Safety. Configura también **DNS seguro en Edge**: edge://settings/privacy > DNS seguro > Elegir proveedor.",
        notas: ["Edge permite configurar DNS seguro independientemente del DNS del sistema", "Usa el mismo proveedor que en el paso 1 para consistencia"],
      },
      {
        id: "win-admin",
        numero: 6,
        titulo: "Crear cuenta estándar para el menor",
        descripcion:
          "Crea una cuenta de usuario **Estándar** (no Administrador) para el menor. Con permisos de administrador podría desactivar todos los filtros.",
        advertencia: "Si el menor tiene permisos de administrador, puede desinstalar Family Safety, cambiar DNS y eliminar restricciones.",
      },
    ],
    verificacion:
      "Intenta acceder a un sitio bloqueado en Edge. Debe mostrar página de bloqueo. Verifica límite de tiempo: al agotarse, se bloquea el acceso.",
    erroresFrecuentes: [
      { problema: "Los cambios de DNS no se aplican", solucion: "Abre terminal (cmd) como administrador y ejecuta: **ipconfig /flushdns**. Luego reinicia el navegador." },
      { problema: "Family Safety no sincroniza", solucion: "Asegúrate de que el menor ha iniciado sesión con su cuenta Microsoft en el equipo y que está conectado a Internet." },
      { problema: "El menor usa Chrome a pesar de las restricciones", solucion: "Bloquea Chrome con Family Safety. O mejor: desinstala Chrome y explica por qué. Alternativa: configura DoH en Chrome para que al menos use DNS seguro." },
    ],
  }),

  // ═══════════════════════════════════════
  // macOS
  // ═══════════════════════════════════════

  cfg("macos", "wifi-casa", "recomendado", {
    titulo: "Protección en macOS (WiFi en casa)",
    resumen: "DNS manual + En Familia + Tiempo de Uso.",
    tiempoEstimado: "20-25 minutos",
    dnsRecomendado: [DNS_FAMILIA_SURF, CLEAN_BROWSING],
    pasos: [
      {
        id: "mac-dns",
        numero: 1,
        titulo: "Configurar DNS manual",
        descripcion:
          "**Preferencias del Sistema > Red > Wi-Fi (o Ethernet) > Avanzado > DNS**. Pulsa + y añade las direcciones DNS del proveedor elegido. Aceptar y Aplicar.",
        notas: [
          `DNS4.EU: ${DNS_FAMILIA_SURF} y ${DNS_FAMILIA_SURF2}`,
          `CleanBrowsing: ${CLEAN_BROWSING} y ${CLEAN_BROWSING2}`,
          "Si hay DNS existentes, puedes mantenerlos como respaldo o eliminarlos. El orden importa: el primero es el principal.",
        ],
      },
      {
        id: "mac-familia",
        numero: 2,
        titulo: "Configurar En Familia",
        descripcion:
          "**Preferencias del Sistema > En Familia**. Añade al menor con su Apple ID. Activa Compartir en Familia para gestionar compras y suscripciones.",
      },
      {
        id: "mac-tiempo",
        numero: 3,
        titulo: "Tiempo de Uso",
        descripcion:
          "**Preferencias del Sistema > Tiempo de Uso**. Actívalo para el menor. Establece código de acceso (que el menor no conozca). Configura restricciones de contenido web, apps y tiempo de pantalla.",
      },
      {
        id: "mac-lock",
        numero: 4,
        titulo: "Bloquear cambios de configuración",
        descripcion:
          "En Tiempo de Uso > **Contenido y privacidad > Restricciones > Cambios de cuenta**. Selecciona **'No permitir'** para que el menor no pueda modificar el DNS ni otras configuraciones de red.",
      },
    ],
    verificacion:
      "Intenta acceder a contenido para adultos en Safari — debe mostrar bloqueo. Verifica límites de tiempo funcionan.",
    erroresFrecuentes: [
      { problema: "No puedo guardar cambios de DNS", solucion: "Necesitas permisos de administrador. Introduce la contraseña de tu cuenta de administrador cuando se solicite." },
      { problema: "El menor cambia el DNS", solucion: "Bloquea cambios de cuenta en Tiempo de Uso. Así el menor no puede modificar configuraciones de red." },
    ],
  }),

  // ═══════════════════════════════════════
  // ROUTER
  // ═══════════════════════════════════════

  cfg("router", "wifi-casa", "recomendado", {
    titulo: "Protección a nivel de router (recomendada)",
    resumen: "Configurar DNS en el router protege TODOS los dispositivos de la red. Es la solución más efectiva.",
    tiempoEstimado: "20-30 minutos",
    dnsRecomendado: [DNS_FAMILIA_SURF, CLEAN_BROWSING],
    pasos: [
      {
        id: "router-access",
        numero: 1,
        titulo: "Acceder al panel del router",
        descripcion:
          "Abre un navegador y escribe la IP del router (normalmente **192.168.1.1**, **192.168.0.1** o **192.168.1.254**). Introduce usuario y contraseña.",
        notas: [
          "Si no sabes la IP: en Windows abre cmd y escribe **ipconfig** — la 'Puerta de enlace predeterminada' es la IP del router",
          "En Mac: Preferencias del Sistema > Red > Wi-Fi > Avanzado > Router",
          "Usuario/contraseña suelen estar en una pegatina debajo del router",
          "Routers de operador: Movistar (admin/admin o en pegatina), Orange (admin/admin o en pegatina), Vodafone (admin/pegatina)",
        ],
        advertencia: "No cambies nada que no entiendas. Anota la configuración original por si necesitas revertir.",
      },
      {
        id: "router-dns",
        numero: 2,
        titulo: "Localizar y cambiar configuración DNS",
        descripcion:
          "Busca la sección **WAN, Internet, DNS** o **Configuración de red**. Varía según el fabricante. Sustituye los DNS actuales por los del proveedor elegido.",
        notas: [
          `DNS4.EU: ${DNS_FAMILIA_SURF} / ${DNS_FAMILIA_SURF2}`,
          `CleanBrowsing Family: ${CLEAN_BROWSING} / ${CLEAN_BROWSING2}`,
          "Cloudflare Familias: 1.1.1.3 / 1.0.0.3",
          "AdGuard Family: 94.140.14.15 / 94.140.15.16",
        ],
      },
      {
        id: "router-reboot",
        numero: 3,
        titulo: "Reiniciar router y reconectar dispositivos",
        descripcion:
          "Guarda los cambios (suele haber un botón 'Guardar' o 'Aplicar'). Reinicia el router (apagar 10s y encender). Reconecta los dispositivos a la WiFi.",
      },
      {
        id: "router-verify",
        numero: 4,
        titulo: "Validar la configuración",
        descripcion:
          "Visita **dnsleaktest.com** desde cualquier dispositivo conectado a la WiFi. Haz 'Extended Test'. Confirma que los DNS mostrados son los que configuraste.",
        notas: [
          "También prueba a visitar un sitio bloqueado para confirmar el filtrado",
          "El cambio puede tardar unos minutos en propagarse por todos los dispositivos",
        ],
      },
    ],
    verificacion:
      "Desde cualquier dispositivo de la red: bloqueo de contenido activo. dnsleaktest.com confirma los DNS correctos.",
    erroresFrecuentes: [
      { problema: "No puedo acceder al panel del router", solucion: "Prueba 192.168.1.1, 192.168.0.1 o 192.168.1.254. Si nada funciona, busca la IP exacta en la pegatina del router o contacta con tu operador." },
      { problema: "Los dispositivos no obtienen los nuevos DNS", solucion: "Renueva la IP: en Windows **ipconfig /release** y **ipconfig /renew**. En Mac: desactiva y reactiva WiFi. O simplemente reinicia el dispositivo." },
      { problema: "Olvidé la contraseña del router", solucion: "Busca el botón de reset en el router (un agujero pequeñito). Pulsa con un clip 10 segundos. El router volverá a valores de fábrica (incluyendo usuario/contraseña de la pegatina)." },
      { problema: "El router del operador no permite cambiar DNS", solucion: "Algunos routers de operador bloquean el cambio. Soluciones: (1) pon tu router propio, (2) cambia a modo bridge + router propio, (3) configura DNS en cada dispositivo." },
    ],
  }),

  // ═══════════════════════════════════════
  // NAVEGADOR (browser-level protection)
  // ═══════════════════════════════════════

  cfg("navegador", "wifi-casa", "basico", {
    titulo: "Protección en navegadores",
    resumen: "DNS sobre HTTPS (DoH) en Chrome, Edge o Firefox. Rápido y sin instalar nada.",
    tiempoEstimado: "5-10 minutos",
    dnsRecomendado: [DNS_FAMILIA_SURF, CLOUDFLARE_FAMILY],
    pasos: [
      {
        id: "browser-chrome",
        numero: 1,
        titulo: "Chrome: Activar DNS seguro",
        descripcion:
          "**Chrome > Configuración > Privacidad y seguridad > Seguridad**. Activa **'Usar DNS seguro'** y elige **'Con' > 'CleanBrowsing'** o introduce URL personalizada: **https://dns4.eu/dns-query**",
        notas: ["Chrome usa el DNS del sistema por defecto. Activar DNS seguro lo sobreescribe.", "Elegir 'Con tu proveedor de servicios actual' NO cambia el DNS, solo lo cifra."],
      },
      {
        id: "browser-edge",
        numero: 2,
        titulo: "Edge: Activar DNS seguro",
        descripcion:
          "**Edge > Configuración > Privacidad, búsqueda y servicios > Seguridad**. Activa **'Usar DNS seguro'** y elige un proveedor o introduce URL personalizada.",
      },
      {
        id: "browser-firefox",
        numero: 3,
        titulo: "Firefox: Habilitar DNS sobre HTTPS",
        descripcion:
          "**Firefox > Ajustes > General > Configuración de red > Ajustes**. Activa **'Habilitar DNS sobre HTTPS'**. Selecciona **'Proveedor personalizado'** e introduce: **https://dns4.eu/dns-query**",
        advertencia: "Firefox por defecto usa DoH de Cloudflare. Si el menor sabe cambiar esto, puede desactivar la protección.",
      },
      {
        id: "browser-verify",
        numero: 4,
        titulo: "Verificar",
        descripcion: "Visita **dnsleaktest.com** y haz 'Extended Test'. Confirma que el DNS corresponde al proveedor configurado.",
      },
    ],
    verificacion:
      "Visita un sitio bloqueado desde el navegador configurado — debe mostrar error de conexión.",
    erroresFrecuentes: [
      { problema: "La configuración no se guarda", solucion: "Cierra completamente el navegador y vuelve a abrirlo. Algunos navegadores requieren reinicio." },
      { problema: "El sitio no se bloquea aunque configuré DoH", solucion: "Verifica la URL del proveedor. Debe ser https://dominio/dns-query. Si usas CleanBrowsing: https://doh.cleanbrowsing.org/doh/family-filter/" },
      { problema: "El menor usa otro navegador", solucion: "El DoH se configura por navegador. Si el menor usa Safari (sin DoH), no está protegido. Configura en TODOS los navegadores instalados." },
    ],
  }),

  // ═══════════════════════════════════════
  // SMART TV
  // ═══════════════════════════════════════

  cfg("smart-tv", "wifi-casa", "recomendado", {
    titulo: "Protección en Smart TV",
    resumen: "La mejor opción es configurar el DNS en el router. La Smart TV heredará la protección automáticamente.",
    tiempoEstimado: "15-20 minutos (router) o 5-10 min (TV)",
    dnsRecomendado: [DNS_FAMILIA_SURF, CLEAN_BROWSING],
    pasos: [
      {
        id: "tv-router",
        numero: 1,
        titulo: "Opción A: DNS en el router (recomendado)",
        descripcion:
          "Es la opción más fácil. Al cambiar el DNS del router, la TV se protege sola:\n\n📍 Abre Chrome o Safari\n🔤 Escribe: **192.168.1.1**\n🔑 Usuario: **admin** / Contraseña: **admin**\n🔍 Busca **\"DNS\"** en los ajustes\n✏️ Cambia a **manual**\n📝 Escribe:\n   1️⃣ **91.239.100.101**\n   2️⃣ **91.239.100.102**\n💾 Pulsa **Guardar**\n✅ La TV ya filtra YouTube, Netflix y navegador",
        notas: ["Esta es la solución más sencilla y efectiva", "Protege también cualquier otro dispositivo conectado al WiFi"],
      },
      {
        id: "tv-manual",
        numero: 2,
        titulo: "Opción B: DNS manual en la Smart TV",
        descripcion:
          "Si no puedes cambiar el router: **Ajustes de red de la TV > Configuración manual de IP > DNS**. Introduce las direcciones del proveedor elegido.",
        notas: [
          "Android TV: Ajustes > Red e Internet > WiFi > DNS privado (igual que Android)",
          "Samsung Tizen: Ajustes > Red > Configuración de red > DNS manual",
          "LG webOS: Ajustes > Red > Conexión WiFi > Avanzado > DNS",
          "Apple TV: Ajustes > Red > WiFi > Configurar DNS > Manual",
        ],
      },
      {
        id: "tv-parental",
        numero: 3,
        titulo: "Control parental de la plataforma",
        descripcion:
          "Además del DNS, configura el control parental nativo de la plataforma: Netflix (PIN para perfiles infantiles), YouTube (Modo restringido), Disney+, etc.",
      },
    ],
    verificacion:
      "En la Smart TV, intenta acceder a contenido no apropiado desde YouTube o navegador. Debe estar bloqueado.",
    erroresFrecuentes: [
      { problema: "La Smart TV no tiene opción de cambiar DNS", solucion: "Algunas TVs básicas no lo permiten. La única solución es configurar el DNS en el router." },
      { problema: "YouTube sigue mostrando contenido inapropiado", solucion: "El DNS bloquea dominios, no contenido dentro de YouTube. Activa el Modo Restringido de YouTube en la configuración de la app." },
    ],
  }),

  // ═══════════════════════════════════════
  // CONSOLA
  // ═══════════════════════════════════════

  cfg("consola", "wifi-casa", "recomendado", {
    titulo: "Protección en consolas (PS5, Xbox, Switch)",
    resumen: "DNS en el router + control parental de la consola.",
    tiempoEstimado: "15-20 minutos",
    dnsRecomendado: [DNS_FAMILIA_SURF, CLEAN_BROWSING],
    pasos: [
      {
        id: "console-router",
        numero: 1,
        titulo: "DNS en el router (método principal)",
        descripcion:
          "Al cambiar el DNS del router, la consola se protege sola. Haz esto:\n\n📍 Abre Chrome o Safari en tu móvil u ordenador\n🔤 Escribe: **192.168.1.1**\n🔑 Usuario: **admin** / Contraseña: **admin**\n🔍 Busca **\"DNS\"** en los ajustes\n✏️ Cambia de **automático** a **manual**\n📝 Escribe estos números:\n   1️⃣ **91.239.100.101**\n   2️⃣ **91.239.100.102**\n💾 Pulsa **Guardar**\n🔄 La consola se reconectará sola con protección",
      },
      {
        id: "console-ps",
        numero: 2,
        titulo: "Control parental en PlayStation",
        descripcion:
          "**PS5: Ajustes > Control familiar y parental > Gestión de familia**. Crea una cuenta para el menor con restricciones de edad, tiempo de juego y comunicación online.",
        notas: ["Puedes limitar el acceso a juegos según PEGI", "Restringe la comunicación con otros jugadores", "Establece límites de tiempo de juego"],
      },
      {
        id: "console-xbox",
        numero: 3,
        titulo: "Control parental en Xbox",
        descripcion:
          "**Xbox Family Settings** (app móvil). Gestiona el tiempo de juego, filtros de contenido y comunicación desde tu móvil.",
      },
      {
        id: "console-switch",
        numero: 4,
        titulo: "Control parental en Nintendo Switch",
        descripcion:
          "**Nintendo Switch Parental Controls** (app móvil). Establece límites de tiempo, restringe juegos por clasificación y monitoriza la actividad.",
      },
    ],
    verificacion:
      "Verifica que la consola no puede acceder a contenido no apto. Comprueba que los límites de tiempo funcionan.",
    erroresFrecuentes: [
      { problema: "La consola no respeta el DNS del router", solucion: "Algunas consolas tienen DNS fijo. Configura manualmente el DNS en los ajustes de red de la consola." },
      { problema: "El menor juega online con desconocidos", solucion: "Activa las restricciones de comunicación en los ajustes de control parental de la consola." },
    ],
  }),

  // ═══════════════════════════════════════
  // CHROMEBOOK
  // ═══════════════════════════════════════

  cfg("chromebook", "wifi-casa", "recomendado", {
    titulo: "Protección en Chromebook",
    resumen: "Family Link + DNS privado en ChromeOS.",
    tiempoEstimado: "15-20 minutos",
    dnsRecomendado: [DNS_FAMILIA_SURF, CLOUDFLARE_FAMILY],
    pasos: [
      {
        id: "cb-familylink",
        numero: 1,
        titulo: "Family Link en Chromebook",
        descripcion:
          "Los Chromebooks gestionados por la escuela ya suelen tener control parental. Para uso personal: vincula la cuenta del menor a Family Link igual que en Android.",
      },
      {
        id: "cb-dns",
        numero: 2,
        titulo: "DNS privado en ChromeOS",
        descripcion:
          "**Ajustes > Red > WiFi > DNS privado**. Selecciona 'Nombre del host del proveedor' e introduce la dirección del proveedor.",
      },
    ],
    verificacion: "Verifica el bloqueo de contenido desde Chrome. Comprueba que Family Link gestiona el tiempo de uso.",
    erroresFrecuentes: [
      { problema: "El Chromebook está gestionado por el colegio", solucion: "Si el colegio gestiona el dispositivo, no podrás cambiar DNS ni instalar Family Link. Consulta con el centro." },
    ],
  }),

  // ═══════════════════════════════════════
  // WINDOWS — remaining contexts
  // ═══════════════════════════════════════

  cfg("windows", "wifi-casa", "basico", {
    titulo: 'Protección básica en Windows (WiFi en casa)',
    resumen: 'Configuración rápida: DNS manual + cuenta estándar para el menor + Edge con DoH.',
    tiempoEstimado: '10-15 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLOUDFLARE_FAMILY],
    pasos: [
      {
        id: 'win-wc-b1',
        numero: 1,
        titulo: 'Configurar DNS manual',
        descripcion: "**Panel de Control > Redes e Internet > Centro de redes > Cambiar configuración del adaptador**. Clic derecho en tu conexión > **Propiedades > IPv4 > Propiedades**. Marca 'Usar las siguientes direcciones de servidor DNS'.",
        notas: ['DNS preferido: 91.239.100.101 (o 185.228.168.168)', 'DNS alternativo: 91.239.100.102 (o 185.228.169.168)'],
      },
      {
        id: 'win-wc-b2',
        numero: 2,
        titulo: 'Activar filtro web en Edge',
        descripcion: "Abre Edge, ve a **Configuración > Privacidad, búsqueda y servicios > Seguridad**. Activa **'Usar DNS seguro'** y elige el mismo proveedor.",
        notas: ['Edge es el navegador que respeta los filtros de Family Safety'],
      },
      {
        id: 'win-wc-b3',
        numero: 3,
        titulo: 'Crear cuenta estándar para el menor',
        descripcion: 'Crea una cuenta **Estándar** para el menor en **Configuración > Cuentas > Familia y otros usuarios**. Así no puede modificar configuraciones del sistema.',
        notas: ['La cuenta debe ser Estándar, no Administrador'],
      },
      {
        id: 'win-wc-b4',
        numero: 4,
        titulo: 'Verificar protección',
        descripcion: 'Desde la cuenta del menor, abre Edge e intenta acceder a un sitio bloqueado. Debe mostrar error de conexión.',
      },
    ],
    verificacion: 'Desde la cuenta del menor en Edge, visita un sitio bloqueado. Debe mostrar error.',
    erroresFrecuentes: [
      { problema: 'Los cambios de DNS no se aplican', solucion: 'Abre cmd como administrador: **ipconfig /flushdns**. Luego reinicia.' },
    ],
  }),
  cfg("windows", "wifi-casa", "avanzado", {
    titulo: 'Protección avanzada en Windows (WiFi en casa)',
    resumen: 'Máxima protección: DNS + Family Safety total + bloqueo de navegadores y VPN.',
    tiempoEstimado: '30-40 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLEAN_BROWSING, CLOUDFLARE_FAMILY],
    pasos: [
      {
        id: 'win-wc-a1',
        numero: 1,
        titulo: 'Configurar DNS manual',
        descripcion: 'Panel de Control > Redes > Conexión WiFi > Propiedades > IPv4. Introduce los DNS del proveedor principal.',
        notas: ['DNS primario: 91.239.100.101 (DNS4.EU)', 'DNS secundario: 185.228.168.168 (CleanBrowsing)'],
      },
      {
        id: 'win-wc-a2',
        numero: 2,
        titulo: 'Microsoft Family Safety completo',
        descripcion: 'Configura TODAS las opciones de Family Safety: filtros web, límites de apps, límites de tiempo, bloqueo de compras, restricciones por edad.',
        notas: ['Family Safety requiere que el menor use una cuenta Microsoft'],
      },
      {
        id: 'win-wc-a3',
        numero: 3,
        titulo: 'Bloquear navegadores alternativos',
        descripcion: 'En Family Safety, bloquea Chrome, Firefox, Opera y Brave. El menor solo podrá usar Edge que respeta los filtros.',
        notas: ['Chrome y Firefox pueden saltarse los filtros de Family Safety con DoH'],
      },
      {
        id: 'win-wc-a4',
        numero: 4,
        titulo: 'Configurar DNS seguro en Edge',
        descripcion: 'Edge > Configuración > Privacidad > DNS seguro. Actívalo con el proveedor elegido. Esto añade una capa extra de protección DNS cifrada.',
        notas: ['El DNS seguro de Edge funciona incluso si alguien cambia el DNS del sistema'],
      },
      {
        id: 'win-wc-a5',
        numero: 5,
        titulo: 'Deshabilitar VPN y proxies',
        descripcion: 'Family Safety > Restricciones > Bloquear VPN. Así el menor no puede usar una VPN para saltarse los filtros.',
        notas: ['Algunas VPN gratuitas pueden eludir los filtros DNS'],
      },
      {
        id: 'win-wc-a6',
        numero: 6,
        titulo: 'Verificación completa',
        descripcion: 'Intenta: (1) visitar sitio bloqueado en Edge, (2) instalar Chrome (bloqueado), (3) usar VPN (bloqueada). Todo debe fallar.',
      },
    ],
    verificacion: 'Navegadores alternativos bloqueados, VPN bloqueada, DNS protegido en múltiples capas.',
    erroresFrecuentes: [
      { problema: 'Los cambios de DNS no se aplican', solucion: 'Abre terminal (cmd) como administrador y ejecuta: **ipconfig /flushdns**. Luego reinicia el navegador.' },
      { problema: 'Family Safety no sincroniza', solucion: 'Asegúrate de que el menor ha iniciado sesión con su cuenta Microsoft en el equipo y que está conectado a Internet.' },
      { problema: 'El menor usa Chrome a pesar de las restricciones', solucion: 'Bloquea Chrome con Family Safety. O mejor: desinstala Chrome y configura DoH en Chrome como alternativa.' },
      { problema: 'El menor usa una VPN para saltarse filtros', solucion: 'Bloquea VPN en Family Safety. CleanBrowsing también bloquea proxies/anonymizers.' },
    ],
  }),
  cfg("windows", "datos-moviles", "basico", {
    titulo: 'Protección básica en Windows (solo datos móviles)',
    resumen: 'DNS manual en la conexión de datos (hotspot/dongle).',
    tiempoEstimado: '5-10 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLOUDFLARE_FAMILY],
    pasos: [
      {
        id: 'win-mob-b1',
        numero: 1,
        titulo: 'Configurar DNS en la conexión de datos',
        descripcion: 'Si usas un móvil como hotspot o un dongle USB: **Panel de Control > Centro de redes > Cambiar configuración del adaptador**. Selecciona el adaptador de la conexión de datos y configura DNS manual.',
        notas: ['DNS preferido: 91.239.100.101', 'DNS alternativo: 1.1.1.3'],
      },
      {
        id: 'win-mob-b2',
        numero: 2,
        titulo: 'Verificar con datos móviles',
        descripcion: 'Desconecta el WiFi, usa solo la conexión de datos. Visita **dnsleaktest.com** para confirmar el DNS.',
      },
    ],
    verificacion: 'Con solo datos móviles, visita un sitio bloqueado. Debe fallar.',
    erroresFrecuentes: [
      { problema: 'La conexión de datos cambia de adaptador', solucion: 'Cada vez que conectes un nuevo dispositivo de datos, configura el DNS en ese adaptador.' },
    ],
  }),
  cfg("windows", "datos-moviles", "recomendado", {
    titulo: 'Protección recomendada en Windows (solo datos móviles)',
    resumen: 'DNS + DoH en Edge + Family Safety para protección completa fuera de casa.',
    tiempoEstimado: '20-30 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLEAN_BROWSING],
    pasos: [
      {
        id: 'win-mob-r1',
        numero: 1,
        titulo: 'Configurar DNS en conexión de datos',
        descripcion: 'Configura DNS manual en el adaptador de red de la conexión de datos (hotspot/dongle).',
        notas: ['DNS: 91.239.100.101 / 91.239.100.102'],
      },
      {
        id: 'win-mob-r2',
        numero: 2,
        titulo: 'Configurar DNS en Edge para respaldo',
        descripcion: 'Edge > Ajustes > Privacidad > DNS seguro. Actívalo con el mismo proveedor. El DoH de Edge funciona incluso si el DNS del sistema se bloquea.',
        notas: ['Algunos operadores bloquean puertos DNS no estándar; DoH lo evita'],
      },
      {
        id: 'win-mob-r3',
        numero: 3,
        titulo: 'Microsoft Family Safety',
        descripcion: 'Configura Family Safety para gestionar contenido y tiempo incluso cuando el menor está fuera de casa.',
        notas: ['Family Safety funciona en cualquier conexión a Internet'],
      },
      {
        id: 'win-mob-r4',
        numero: 4,
        titulo: 'Verificar fuera de casa',
        descripcion: 'Conecta el portátil a un hotspot móvil. Verifica bloqueo de sitios. Comprueba que Edge sigue protegido.',
      },
    ],
    verificacion: 'Conectado a hotspot móvil: verifica bloqueo en Edge y que Family Safety está activo.',
    erroresFrecuentes: [
      { problema: 'Los cambios de DNS no se aplican', solucion: 'Abre terminal (cmd) como administrador y ejecuta: **ipconfig /flushdns**. Luego reinicia el navegador.' },
      { problema: 'Family Safety no sincroniza', solucion: 'Asegúrate de que el menor ha iniciado sesión con su cuenta Microsoft en el equipo y que está conectado a Internet.' },
      { problema: 'El menor usa Chrome a pesar de las restricciones', solucion: 'Bloquea Chrome con Family Safety. O mejor: desinstala Chrome y configura DoH en Chrome como alternativa.' },
    ],
  }),
  cfg("windows", "datos-moviles", "avanzado", {
    titulo: 'Protección avanzada en Windows (solo datos móviles)',
    resumen: 'Doble capa DNS + Family Safety máximo + bloqueo de proxies en conexión móvil.',
    tiempoEstimado: '25-35 minutos',
    dnsRecomendado: [CLEAN_BROWSING, CLOUDFLARE_FAMILY],
    pasos: [
      {
        id: 'win-mob-a1',
        numero: 1,
        titulo: 'DNS manual + DoH doble capa',
        descripcion: 'Configura DNS manual en la conexión de datos + DNS seguro en Edge con proveedores DIFERENTES. Si uno falla, el otro protege.',
        notas: ['DNS manual: CleanBrowsing', 'Edge DoH: Cloudflare Familias'],
      },
      {
        id: 'win-mob-a2',
        numero: 2,
        titulo: 'Family Safety máximo + bloqueo de proxies',
        descripcion: 'Activa todas las restricciones de Family Safety. Bloquea VPN y proxies externos.',
        notas: ['CleanBrowsing bloquea proxies/anonymizers automáticamente'],
      },
      {
        id: 'win-mob-a3',
        numero: 3,
        titulo: 'Bloqueo de instalación de apps',
        descripcion: 'En Family Safety, bloquea la instalación de nuevas apps sin aprobación. Así el menor no puede instalar navegadores alternativos ni VPNs.',
      },
    ],
    verificacion: 'Prueba con proxies, VPN, navegadores alternativos. Todo debe estar bloqueado.',
    erroresFrecuentes: [
      { problema: 'Los cambios de DNS no se aplican', solucion: 'Abre terminal (cmd) como administrador y ejecuta: **ipconfig /flushdns**. Luego reinicia el navegador.' },
      { problema: 'Family Safety no sincroniza', solucion: 'Asegúrate de que el menor ha iniciado sesión con su cuenta Microsoft en el equipo y que está conectado a Internet.' },
      { problema: 'El menor usa Chrome a pesar de las restricciones', solucion: 'Bloquea Chrome con Family Safety. O mejor: desinstala Chrome y configura DoH en Chrome como alternativa.' },
    ],
  }),
  cfg("windows", "wifi-datos", "basico", {
    titulo: 'Protección básica Windows (WiFi + datos móviles)',
    resumen: 'DNS manual configurado en ambas interfaces de red.',
    tiempoEstimado: '10-15 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLOUDFLARE_FAMILY],
    pasos: [
      {
        id: 'win-dual-b1',
        numero: 1,
        titulo: 'Configurar DNS WiFi en casa',
        descripcion: 'Panel de Control > Redes > Adaptador WiFi > IPv4 > DNS manual. Introduce DNS del proveedor.',
        notas: ['DNS: 91.239.100.101 / 91.239.100.102'],
      },
      {
        id: 'win-dual-b2',
        numero: 2,
        titulo: 'Configurar DNS para datos móviles',
        descripcion: 'Cuando uses hotspot/dongle, repite la configuración en el adaptador de conexión de datos correspondiente.',
        notas: ['Cada red (WiFi, Ethernet, hotspot) tiene su propia configuración de DNS'],
      },
      {
        id: 'win-dual-b3',
        numero: 3,
        titulo: 'Verificar en ambas redes',
        descripcion: 'Prueba el bloqueo en WiFi de casa, luego desconecta y prueba con datos móviles. Ambos deben bloquear.',
      },
    ],
    verificacion: 'Prueba bloqueo en WiFi y luego con datos móviles. Ambos deben funcionar.',
    erroresFrecuentes: [
      { problema: 'Cada interfaz requiere configuración separada', solucion: 'Configura el DNS en cada adaptador de red por separado. No se hereda entre interfaces.' },
    ],
  }),
  cfg("windows", "wifi-datos", "recomendado", {
    titulo: 'Protección recomendada Windows (WiFi + datos móviles)',
    resumen: 'DNS dual + DoH en Edge + Family Safety completo en ambas redes.',
    tiempoEstimado: '25-30 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLEAN_BROWSING],
    pasos: [
      {
        id: 'win-dual-r1',
        numero: 1,
        titulo: 'Configurar DNS en ambas interfaces',
        descripcion: 'Configura DNS manual tanto en el adaptador WiFi como en el de datos móviles. Usa el mismo proveedor en ambos.',
        notas: ['DNS recomendado: 91.239.100.101 / 185.228.168.168'],
      },
      {
        id: 'win-dual-r2',
        numero: 2,
        titulo: 'DNS seguro en Edge como respaldo',
        descripcion: 'Activa DoH en Edge. Así aunque cambien los DNS del sistema, Edge seguirá protegido.',
      },
      {
        id: 'win-dual-r3',
        numero: 3,
        titulo: 'Family Safety completo',
        descripcion: 'Configura Family Safety al completo: filtros web, límites de tiempo, control de apps. Funciona en cualquier red.',
      },
      {
        id: 'win-dual-r4',
        numero: 4,
        titulo: 'Cuenta estándar para el menor',
        descripcion: 'El menor debe usar una cuenta Estándar, no Administrador.',
      },
      {
        id: 'win-dual-r5',
        numero: 5,
        titulo: 'Verificación dual',
        descripcion: 'Conectado a WiFi: verifica bloqueo. Cambia a datos móviles: verifica bloqueo de nuevo.',
      },
    ],
    verificacion: 'Verifica protección tanto en WiFi de casa como en datos móviles.',
    erroresFrecuentes: [
      { problema: 'Los cambios de DNS no se aplican', solucion: 'Abre terminal (cmd) como administrador y ejecuta: **ipconfig /flushdns**. Luego reinicia el navegador.' },
      { problema: 'Family Safety no sincroniza', solucion: 'Asegúrate de que el menor ha iniciado sesión con su cuenta Microsoft en el equipo y que está conectado a Internet.' },
      { problema: 'El menor usa Chrome a pesar de las restricciones', solucion: 'Bloquea Chrome con Family Safety. O mejor: desinstala Chrome y configura DoH en Chrome como alternativa.' },
    ],
  }),
  cfg("windows", "wifi-datos", "avanzado", {
    titulo: 'Protección avanzada Windows (WiFi + datos)',
    resumen: 'DNS multi-capa + Family Safety máximo + bloqueo de proxies en todas las redes.',
    tiempoEstimado: '30-40 minutos',
    dnsRecomendado: [CLEAN_BROWSING, CLOUDFLARE_FAMILY],
    pasos: [
      {
        id: 'win-dual-a1',
        numero: 1,
        titulo: 'DNS en ambas redes con proveedores distintos',
        descripcion: 'WiFi: DNS4.EU. Datos móviles: CleanBrowsing. Si uno falla, el otro protege.',
      },
      {
        id: 'win-dual-a2',
        numero: 2,
        titulo: 'DoH en Edge y bloqueo de alternativas',
        descripcion: 'Activa DoH en Edge, bloquea Chrome, Firefox y cualquier otro navegador con Family Safety.',
      },
      {
        id: 'win-dual-a3',
        numero: 3,
        titulo: 'Family Safety máximo + bloqueo VPN',
        descripcion: 'Todas las restricciones activadas. Bloqueo de VPN y proxies.',
      },
      {
        id: 'win-dual-a4',
        numero: 4,
        titulo: 'Verificación exhaustiva',
        descripcion: 'Prueba bloqueo en WiFi, datos móviles, con proxies, con VPN. Todo debe fallar.',
      },
    ],
    verificacion: 'Prueba bloqueo en WiFi, datos móviles, proxies y VPN. Todo bloqueado.',
    erroresFrecuentes: [
      { problema: 'Los cambios de DNS no se aplican', solucion: 'Abre terminal (cmd) como administrador y ejecuta: **ipconfig /flushdns**. Luego reinicia el navegador.' },
      { problema: 'Family Safety no sincroniza', solucion: 'Asegúrate de que el menor ha iniciado sesión con su cuenta Microsoft en el equipo y que está conectado a Internet.' },
      { problema: 'El menor usa Chrome a pesar de las restricciones', solucion: 'Bloquea Chrome con Family Safety. O mejor: desinstala Chrome y configura DoH en Chrome como alternativa.' },
    ],
  }),
  cfg("windows", "dispositivo-compartido", "basico", {
    titulo: 'Protección básica en Windows compartido',
    resumen: 'Cuentas separadas + DNS a nivel de sistema + contraseña de adulto.',
    tiempoEstimado: '15-20 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLOUDFLARE_FAMILY],
    pasos: [
      {
        id: 'win-shared-b1',
        numero: 1,
        titulo: 'Crear cuentas separadas',
        descripcion: '**Configuración > Cuentas > Familia y otros usuarios**. Crea una cuenta para el adulto (Administrador) y otra para el menor (Estándar).',
        notas: ['El adulto debe tener la cuenta Administrador', 'El menor debe usar cuenta Estándar'],
      },
      {
        id: 'win-shared-b2',
        numero: 2,
        titulo: 'Configurar DNS a nivel de sistema',
        descripcion: 'El DNS afecta a TODAS las cuentas del equipo. Configúralo en el adaptador de red con DNS del proveedor familiar.',
        notas: ['DNS: 91.239.100.101 / 91.239.100.102'],
      },
      {
        id: 'win-shared-b3',
        numero: 3,
        titulo: 'Proteger la cuenta del adulto',
        descripcion: 'Pon contraseña fuerte en la cuenta del adulto. El menor no debe poder acceder a ella.',
      },
    ],
    verificacion: 'Inicia sesión con la cuenta del menor — DNS activo. Con la del adulto — sin restricciones.',
    erroresFrecuentes: [
      { problema: 'El menor accede a la cuenta del adulto', solucion: 'Pon una contraseña segura en la cuenta del adulto. Usa Windows Hello si es posible.' },
    ],
  }),
  cfg("windows", "dispositivo-compartido", "recomendado", {
    titulo: 'Protección recomendada en Windows compartido',
    resumen: 'Cuentas separadas + Family Safety solo para el menor + DNS de sistema.',
    tiempoEstimado: '20-30 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLEAN_BROWSING],
    pasos: [
      {
        id: 'win-shared-r1',
        numero: 1,
        titulo: 'Cuentas separadas + DNS de sistema',
        descripcion: 'Adulto: Administrador. Menor: Estándar. DNS configurado en el adaptador de red.',
      },
      {
        id: 'win-shared-r2',
        numero: 2,
        titulo: 'Family Safety solo para el menor',
        descripcion: 'Vincula la cuenta del menor a Family Safety. El adulto no necesita restricciones.',
      },
      {
        id: 'win-shared-r3',
        numero: 3,
        titulo: 'Límites de tiempo en cuenta del menor',
        descripcion: 'Configura horarios y límites en Family Safety para la cuenta del menor.',
      },
      {
        id: 'win-shared-r4',
        numero: 4,
        titulo: 'Barrera anti-cambio',
        descripcion: 'Como el menor es Estándar, no puede cambiar DNS ni desinstalar Family Safety.',
      },
    ],
    verificacion: 'El adulto puede usar el equipo sin restricciones. El menor tiene todas las protecciones activas.',
    erroresFrecuentes: [
      { problema: 'El menor usa otro navegador', solucion: 'Bloquea otros navegadores en Family Safety.' },
    ],
  }),
  cfg("windows", "dispositivo-compartido", "avanzado", {
    titulo: 'Protección avanzada en Windows compartido',
    resumen: 'Triple DNS + Family Safety máximo + cifrado de disco + monitorización.',
    tiempoEstimado: '30-40 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLEAN_BROWSING, CLOUDFLARE_FAMILY],
    pasos: [
      {
        id: 'win-shared-a1',
        numero: 1,
        titulo: 'DNS en router + sistema + DoH',
        descripcion: 'Triple capa: router con DNS4.EU, sistema Windows con CleanBrowsing, Edge con DoH.',
      },
      {
        id: 'win-shared-a2',
        numero: 2,
        titulo: 'Family Safety máximo + control de apps',
        descripcion: 'Todas las restricciones activadas. Bloqueo de instalación de nuevas apps.',
      },
      {
        id: 'win-shared-a3',
        numero: 3,
        titulo: 'BitLocker o protección de disco',
        descripcion: 'Si el disco está cifrado (BitLocker), el menor no puede acceder a archivos del adulto ni arrancar desde USB.',
      },
      {
        id: 'win-shared-a4',
        numero: 4,
        titulo: 'Registro de actividad',
        descripcion: 'Activa el informe de actividad en Family Safety para monitorizar el uso del menor.',
      },
    ],
    verificacion: 'Verifica: DNS bloquea, Family Safety activo, disco cifrado, actividades registradas.',
    erroresFrecuentes: [
      { problema: 'Los cambios de DNS no se aplican', solucion: 'Abre terminal (cmd) como administrador y ejecuta: **ipconfig /flushdns**. Luego reinicia el navegador.' },
      { problema: 'Family Safety no sincroniza', solucion: 'Asegúrate de que el menor ha iniciado sesión con su cuenta Microsoft en el equipo y que está conectado a Internet.' },
      { problema: 'El menor usa Chrome a pesar de las restricciones', solucion: 'Bloquea Chrome con Family Safety. O mejor: desinstala Chrome y configura DoH en Chrome como alternativa.' },
    ],
  }),
  cfg("windows", "dispositivo-personal", "basico", {
    titulo: 'Protección básica en Windows personal del menor',
    resumen: 'DNS manual + cuenta Microsoft + Family Safety básico.',
    tiempoEstimado: '10-15 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLOUDFLARE_FAMILY],
    pasos: [
      {
        id: 'win-own-b1',
        numero: 1,
        titulo: 'Configurar DNS manual',
        descripcion: 'Panel de Control > Redes > Adaptador WiFi > IPv4 > DNS manual.',
        notas: ['DNS: 91.239.100.101 / 91.239.100.102'],
      },
      {
        id: 'win-own-b2',
        numero: 2,
        titulo: 'Crear cuenta Microsoft del menor',
        descripcion: 'Crea una cuenta Microsoft para el menor y asegúrate que sea Estándar en el equipo.',
      },
      {
        id: 'win-own-b3',
        numero: 3,
        titulo: 'Family Safety básico',
        descripcion: 'Configura filtros web en Edge y límites de tiempo básicos.',
      },
    ],
    verificacion: 'DNS configurado. Family Safety activo. Cuenta Estándar.',
    erroresFrecuentes: [
      { problema: 'Los cambios de DNS no se aplican', solucion: 'Abre terminal (cmd) como administrador y ejecuta: **ipconfig /flushdns**. Luego reinicia el navegador.' },
      { problema: 'Family Safety no sincroniza', solucion: 'Asegúrate de que el menor ha iniciado sesión con su cuenta Microsoft en el equipo y que está conectado a Internet.' },
      { problema: 'El menor usa Chrome a pesar de las restricciones', solucion: 'Bloquea Chrome con Family Safety. O mejor: desinstala Chrome y configura DoH en Chrome como alternativa.' },
    ],
  }),
  cfg("windows", "dispositivo-personal", "recomendado", {
    titulo: 'Protección recomendada en Windows personal del menor',
    resumen: 'DNS + Family Safety completo + Edge con DoH + cuenta Estándar.',
    tiempoEstimado: '20-30 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLEAN_BROWSING],
    pasos: [
      {
        id: 'win-own-r1',
        numero: 1,
        titulo: 'DNS manual + Family Safety completo',
        descripcion: 'DNS en adaptador de red + Family Safety con todas las restricciones.',
      },
      {
        id: 'win-own-r2',
        numero: 2,
        titulo: 'Edge como navegador principal + DoH',
        descripcion: 'Asegúrate de que el menor usa Edge. Configura DoH. Bloquea otros navegadores con Family Safety.',
      },
      {
        id: 'win-own-r3',
        numero: 3,
        titulo: 'Límites de tiempo y horarios',
        descripcion: 'Establece horarios de uso (ej: no usar después de las 21:00) y tiempo máximo diario.',
      },
      {
        id: 'win-own-r4',
        numero: 4,
        titulo: 'Cuenta Estándar + sin permisos de admin',
        descripcion: 'Verifica que el menor NO tiene permisos de administrador.',
      },
    ],
    verificacion: 'Todas las capas activas: DNS, Family Safety, límites de tiempo, Edge protegido.',
    erroresFrecuentes: [
      { problema: 'Los cambios de DNS no se aplican', solucion: 'Abre terminal (cmd) como administrador y ejecuta: **ipconfig /flushdns**. Luego reinicia el navegador.' },
      { problema: 'Family Safety no sincroniza', solucion: 'Asegúrate de que el menor ha iniciado sesión con su cuenta Microsoft en el equipo y que está conectado a Internet.' },
      { problema: 'El menor usa Chrome a pesar de las restricciones', solucion: 'Bloquea Chrome con Family Safety. O mejor: desinstala Chrome y configura DoH en Chrome como alternativa.' },
    ],
  }),
  cfg("windows", "dispositivo-personal", "avanzado", {
    titulo: 'Protección avanzada en Windows personal del menor',
    resumen: 'Máxima protección individual: triple DNS + Family Safety total + monitorización semanal.',
    tiempoEstimado: '30-40 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLEAN_BROWSING, CLOUDFLARE_FAMILY],
    pasos: [
      {
        id: 'win-own-a1',
        numero: 1,
        titulo: 'DNS triple capa (router + sistema + DoH)',
        descripcion: 'Router con DNS4.EU, sistema con CleanBrowsing, Edge con Cloudflare Familias.',
      },
      {
        id: 'win-own-a2',
        numero: 2,
        titulo: 'Family Safety máximo',
        descripcion: 'Todas las opciones activadas: filtros, tiempo, apps, compras, informes.',
      },
      {
        id: 'win-own-a3',
        numero: 3,
        titulo: 'Bloqueo absoluto de navegadores y VPN',
        descripcion: 'Solo Edge permitido. Bloquea VPN, proxies y herramientas de cambio de DNS.',
      },
      {
        id: 'win-own-a4',
        numero: 4,
        titulo: 'Control de instalaciones',
        descripcion: 'Bloquea instalación de software sin aprobación. Desactiva cmd/PowerShell para el menor.',
      },
      {
        id: 'win-own-a5',
        numero: 5,
        titulo: 'Monitorización semanal',
        descripcion: 'Revisa el informe de actividad de Family Safety semanalmente. Ajusta restricciones según comportamiento.',
      },
    ],
    verificacion: 'El menor no puede saltarse ninguna capa de protección. Revisión semanal activa.',
    erroresFrecuentes: [
      { problema: 'Los cambios de DNS no se aplican', solucion: 'Abre terminal (cmd) como administrador y ejecuta: **ipconfig /flushdns**. Luego reinicia el navegador.' },
      { problema: 'Family Safety no sincroniza', solucion: 'Asegúrate de que el menor ha iniciado sesión con su cuenta Microsoft en el equipo y que está conectado a Internet.' },
      { problema: 'El menor usa Chrome a pesar de las restricciones', solucion: 'Bloquea Chrome con Family Safety. O mejor: desinstala Chrome y configura DoH en Chrome como alternativa.' },
    ],
  }),
  cfg("windows", "varias-redes", "basico", {
    titulo: 'Protección básica Windows (varias redes)',
    resumen: 'DNS manual en cada red o DoH en Edge como alternativa rápida.',
    tiempoEstimado: '5-15 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLOUDFLARE_FAMILY],
    pasos: [
      {
        id: 'win-vr-b1',
        numero: 1,
        titulo: 'DNS manual en cada red (opción básica)',
        descripcion: 'Cada vez que te conectes a una WiFi nueva, configura el DNS manual en propiedades de red.',
        notas: ['Esto requiere configurar el DNS en CADA red por separado'],
      },
      {
        id: 'win-vr-b2',
        numero: 2,
        titulo: 'Alternativa: DNS seguro en Edge',
        descripcion: 'Edge > Configuración > Privacidad > DNS seguro. Actívalo. El DoH funciona en cualquier red WiFi.',
        notas: ['DoH en Edge es la opción más práctica si el menor usa varias redes'],
      },
    ],
    verificacion: 'En cada red que uses, verifica que el DNS bloquea contenido.',
    erroresFrecuentes: [
      { problema: 'Olvido configurar el DNS en una red nueva', solucion: 'Usa DoH en Edge. Se configura una vez y funciona en todas las redes.' },
    ],
  }),
  cfg("windows", "varias-redes", "recomendado", {
    titulo: 'Protección recomendada Windows (varias redes)',
    resumen: 'DoH en Edge como solución principal + DNS del sistema como respaldo + Family Safety.',
    tiempoEstimado: '20-30 minutos',
    dnsRecomendado: [CLEAN_BROWSING, DNS_FAMILIA_SURF],
    pasos: [
      {
        id: 'win-vr-r1',
        numero: 1,
        titulo: 'DNS seguro en Edge (recomendado)',
        descripcion: 'Activa DNS seguro en Edge con CleanBrowsing o DNS4.EU. Esto funciona en TODAS las redes WiFi automáticamente.',
        notas: ['No necesitas configurar cada red por separado', 'Edge se encarga del DNS cifrado en cualquier red'],
      },
      {
        id: 'win-vr-r2',
        numero: 2,
        titulo: 'Family Safety completo',
        descripcion: 'Family Safety funciona independientemente de la red a la que esté conectado el menor.',
      },
      {
        id: 'win-vr-r3',
        numero: 3,
        titulo: 'DNS del sistema como respaldo',
        descripcion: 'Configura también DNS manual en el adaptador WiFi principal para cuando el menor use otros navegadores.',
      },
      {
        id: 'win-vr-r4',
        numero: 4,
        titulo: 'Cuenta Estándar',
        descripcion: 'Asegura que el menor no tiene permisos de admin.',
      },
    ],
    verificacion: 'Funciona en WiFi de casa, colegio, cafeterías. Verifica en al menos 2 redes diferentes.',
    erroresFrecuentes: [
      { problema: 'Los cambios de DNS no se aplican', solucion: 'Abre terminal (cmd) como administrador y ejecuta: **ipconfig /flushdns**. Luego reinicia el navegador.' },
      { problema: 'Family Safety no sincroniza', solucion: 'Asegúrate de que el menor ha iniciado sesión con su cuenta Microsoft en el equipo y que está conectado a Internet.' },
      { problema: 'El menor usa Chrome a pesar de las restricciones', solucion: 'Bloquea Chrome con Family Safety. O mejor: desinstala Chrome y configura DoH en Chrome como alternativa.' },
    ],
  }),
  cfg("windows", "varias-redes", "avanzado", {
    titulo: 'Protección avanzada Windows (varias redes)',
    resumen: 'DoH + DNS sistema + Family Safety máximo + bloqueo VPN en múltiples redes.',
    tiempoEstimado: '30-40 minutos',
    dnsRecomendado: [CLEAN_BROWSING, CLOUDFLARE_FAMILY],
    pasos: [
      {
        id: 'win-vr-a1',
        numero: 1,
        titulo: 'DoH en Edge + DNS sistema',
        descripcion: 'Edge con DoH (Cloudflare Familias) + DNS del sistema (CleanBrowsing) = capas complementarias.',
      },
      {
        id: 'win-vr-a2',
        numero: 2,
        titulo: 'Family Safety máximo + bloqueo VPN',
        descripcion: 'Todas las restricciones. Bloquea VPN para que el menor no pueda saltarse filtros en redes externas.',
      },
      {
        id: 'win-vr-a3',
        numero: 3,
        titulo: 'Solo Edge permitido',
        descripcion: 'Bloquea todos los demás navegadores con Family Safety.',
      },
      {
        id: 'win-vr-a4',
        numero: 4,
        titulo: 'Verificación en múltiples redes',
        descripcion: 'Prueba la protección en WiFi de casa, WiFi del colegio, WiFi pública. Debe funcionar en todas.',
      },
    ],
    verificacion: 'Verifica protección en 3 redes diferentes. Intenta saltar filtros con VPN o proxy — debe fallar.',
    erroresFrecuentes: [
      { problema: 'Los cambios de DNS no se aplican', solucion: 'Abre terminal (cmd) como administrador y ejecuta: **ipconfig /flushdns**. Luego reinicia el navegador.' },
      { problema: 'Family Safety no sincroniza', solucion: 'Asegúrate de que el menor ha iniciado sesión con su cuenta Microsoft en el equipo y que está conectado a Internet.' },
      { problema: 'El menor usa Chrome a pesar de las restricciones', solucion: 'Bloquea Chrome con Family Safety. O mejor: desinstala Chrome y configura DoH en Chrome como alternativa.' },
    ],
  }),

  // ═══════════════════════════════════════
  // macOS — remaining contexts
  // ═══════════════════════════════════════

  cfg("macos", "wifi-casa", "basico", {
    titulo: 'Protección básica en macOS (WiFi en casa)',
    resumen: 'DNS manual + Safari con restricciones de contenido web.',
    tiempoEstimado: '10-15 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLOUDFLARE_FAMILY],
    pasos: [
      {
        id: 'mac-wc-b1',
        numero: 1,
        titulo: 'Configurar DNS manual',
        descripcion: '**Preferencias del Sistema > Red > Wi-Fi > Avanzado > DNS**. Pulsa + y añade las direcciones DNS. Aceptar y Aplicar.',
        notas: ['DNS: 91.239.100.101 / 91.239.100.102'],
      },
      {
        id: 'mac-wc-b2',
        numero: 2,
        titulo: 'Activar restricciones de contenido web en Safari',
        descripcion: '**Preferencias del Sistema > Tiempo de Uso > Contenido y privacidad**. Actívalo con un código. En **Contenido web > Limitar contenido para adultos**.',
        notas: ['El código debe ser secreto, el menor no debe conocerlo'],
      },
      {
        id: 'mac-wc-b3',
        numero: 3,
        titulo: 'Verificar',
        descripcion: 'Desde Safari, intenta acceder a contenido para adultos. Debe mostrar bloqueo.',
      },
    ],
    verificacion: 'Safari bloquea contenido para adultos. DNS configurado correctamente.',
    erroresFrecuentes: [
      { problema: 'No puedo guardar cambios de DNS', solucion: 'Necesitas permisos de administrador.' },
    ],
  }),
  cfg("macos", "wifi-casa", "avanzado", {
    titulo: 'Protección avanzada en macOS (WiFi en casa)',
    resumen: 'Máxima protección: DNS multi-proveedor + Tiempo de Uso total + bloqueo de navegadores + DoH.',
    tiempoEstimado: '30-40 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLEAN_BROWSING, CLOUDFLARE_FAMILY],
    pasos: [
      {
        id: 'mac-wc-a1',
        numero: 1,
        titulo: 'DNS manual avanzado',
        descripcion: 'Configura DNS en Preferencias del Sistema > Red. Usa dos proveedores distintos como primario/secundario.',
        notas: ['DNS primario: CleanBrowsing', 'DNS secundario: Cloudflare Familias'],
      },
      {
        id: 'mac-wc-a2',
        numero: 2,
        titulo: 'Tiempo de Uso completo',
        descripcion: 'Todas las restricciones: contenido web, apps, tiempo de pantalla, compras. Código secreto.',
      },
      {
        id: 'mac-wc-a3',
        numero: 3,
        titulo: 'Bloquear cambios de configuración',
        descripcion: 'Tiempo de Uso > Contenido y privacidad > Restricciones > No permitir cambios de cuenta.',
      },
      {
        id: 'mac-wc-a4',
        numero: 4,
        titulo: 'Restringir navegadores alternativos',
        descripcion: 'Con Tiempo de Uso, bloquea la instalación de otros navegadores (Chrome, Firefox, Brave) o restringe su uso.',
      },
      {
        id: 'mac-wc-a5',
        numero: 5,
        titulo: 'DoH en navegadores como respaldo',
        descripcion: 'En Chrome/Edge/Firefox, activa DNS sobre HTTPS como capa adicional de protección.',
        notas: ['Así aunque alguien cambie el DNS del sistema, los navegadores siguen protegidos'],
      },
    ],
    verificacion: 'Navegadores alternativos bloqueados, cambios de red imposibles, DNS activo en todas las capas.',
    erroresFrecuentes: [
      { problema: 'No puedo guardar cambios de DNS', solucion: 'Necesitas permisos de administrador. Introduce la contraseña de tu cuenta de administrador cuando se solicite.' },
      { problema: 'El menor cambia el DNS', solucion: 'Bloquea cambios de cuenta en Tiempo de Uso > Contenido y privacidad > Restricciones.' },
      { problema: 'Tiempo de Uso no se activa', solucion: 'Asegúrate de tener configurado En Familia primero. Tiempo de Uso necesita un familiar organizador.' },
      { problema: 'El menor usa Chrome con su propio DNS', solucion: 'Bloquea Chrome con Tiempo de Uso o configura DoH en Chrome con el mismo proveedor.' },
    ],
  }),
  cfg("macos", "datos-moviles", "basico", {
    titulo: 'Protección básica en macOS (solo datos móviles)',
    resumen: 'DNS manual en la conexión de datos (hotspot/dongle USB).',
    tiempoEstimado: '5-10 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLOUDFLARE_FAMILY],
    pasos: [
      {
        id: 'mac-mob-b1',
        numero: 1,
        titulo: 'Configurar DNS en la conexión de datos',
        descripcion: '**Preferencias del Sistema > Red**. Selecciona el servicio de datos (USB, Bluetooth, iPhone USB). **Avanzado > DNS**. Añade las direcciones del proveedor.',
        notas: ['DNS: 91.239.100.101 / 1.1.1.3', 'Si usas un iPhone como hotspot por USB, macOS lo reconoce como un servicio de red separado'],
      },
      {
        id: 'mac-mob-b2',
        numero: 2,
        titulo: 'Verificar con datos móviles',
        descripcion: 'Desconecta el WiFi, prueba el bloqueo usando solo la conexión de datos. Visita **dnsleaktest.com** para confirmar.',
      },
    ],
    verificacion: 'Conectado solo a datos móviles, visita un sitio bloqueado. No debe cargar.',
    erroresFrecuentes: [
      { problema: 'No aparece el servicio de datos en Red', solucion: 'Conecta el dispositivo primero (iPhone por USB, dongle). Luego aparecerá en Preferencias del Sistema > Red.' },
    ],
  }),
  cfg("macos", "datos-moviles", "recomendado", {
    titulo: 'Protección recomendada en macOS (solo datos móviles)',
    resumen: 'DNS + Tiempo de Uso completo + bloqueo de cambios de red.',
    tiempoEstimado: '20-30 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLEAN_BROWSING],
    pasos: [
      {
        id: 'mac-mob-r1',
        numero: 1,
        titulo: 'DNS en conexión de datos',
        descripcion: 'Configura DNS manual en el servicio de datos móviles (hotspot/dongle).',
        notas: ['DNS: 91.239.100.101 / 185.228.168.168'],
      },
      {
        id: 'mac-mob-r2',
        numero: 2,
        titulo: 'Tiempo de Uso completo',
        descripcion: 'Configura Tiempo de Uso para el menor con todas las restricciones. Funciona en cualquier conexión.',
      },
      {
        id: 'mac-mob-r3',
        numero: 3,
        titulo: 'Bloquear cambios de red',
        descripcion: 'Tiempo de Uso > Restricciones > No permitir cambios de red. Así el menor no puede modificar DNS ni desactivar WiFi.',
      },
    ],
    verificacion: 'Tiempo de Uso activo. DNS funcionando en datos móviles. Menor no puede cambiar configuración.',
    erroresFrecuentes: [
      { problema: 'No puedo guardar cambios de DNS', solucion: 'Necesitas permisos de administrador. Introduce la contraseña de tu cuenta de administrador cuando se solicite.' },
      { problema: 'El menor cambia el DNS', solucion: 'Bloquea cambios de cuenta en Tiempo de Uso > Contenido y privacidad > Restricciones.' },
      { problema: 'Tiempo de Uso no se activa', solucion: 'Asegúrate de tener configurado En Familia primero. Tiempo de Uso necesita un familiar organizador.' },
    ],
  }),
  cfg("macos", "datos-moviles", "avanzado", {
    titulo: 'Protección avanzada en macOS (solo datos móviles)',
    resumen: 'DNS doble + DoH + Tiempo de Uso máximo + bloqueo de instalación de apps.',
    tiempoEstimado: '25-35 minutos',
    dnsRecomendado: [CLEAN_BROWSING, CLOUDFLARE_FAMILY],
    pasos: [
      {
        id: 'mac-mob-a1',
        numero: 1,
        titulo: 'DNS doble en datos móviles',
        descripcion: 'DNS manual + DoH en Safari/Chrome como respaldo. Si el DNS del sistema falla, el navegador sigue protegido.',
      },
      {
        id: 'mac-mob-a2',
        numero: 2,
        titulo: 'Tiempo de Uso máximo + bloqueo de cambios',
        descripcion: 'Todas las restricciones activadas. Cambios de red y cuenta bloqueados.',
      },
      {
        id: 'mac-mob-a3',
        numero: 3,
        titulo: 'Restringir instalación de apps',
        descripcion: 'Con Tiempo de Uso, bloquea la instalación de apps sin aprobación, especialmente VPNs y navegadores alternativos.',
      },
    ],
    verificacion: 'Protección funcionando solo con datos móviles. Menor no puede instalar alternativas.',
    erroresFrecuentes: [
      { problema: 'No puedo guardar cambios de DNS', solucion: 'Necesitas permisos de administrador. Introduce la contraseña de tu cuenta de administrador cuando se solicite.' },
      { problema: 'El menor cambia el DNS', solucion: 'Bloquea cambios de cuenta en Tiempo de Uso > Contenido y privacidad > Restricciones.' },
      { problema: 'Tiempo de Uso no se activa', solucion: 'Asegúrate de tener configurado En Familia primero. Tiempo de Uso necesita un familiar organizador.' },
    ],
  }),
  cfg("macos", "wifi-datos", "basico", {
    titulo: 'Protección básica macOS (WiFi + datos móviles)',
    resumen: 'DNS manual en ambas interfaces de red (WiFi y datos).',
    tiempoEstimado: '10-15 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLOUDFLARE_FAMILY],
    pasos: [
      {
        id: 'mac-dual-b1',
        numero: 1,
        titulo: 'DNS en WiFi de casa',
        descripcion: 'Configura DNS en Preferencias del Sistema > Red > Wi-Fi > Avanzado > DNS.',
        notas: ['DNS: 91.239.100.101 / 91.239.100.102'],
      },
      {
        id: 'mac-dual-b2',
        numero: 2,
        titulo: 'DNS en conexión de datos',
        descripcion: 'Cuando uses datos móviles, configura el DNS en el servicio de red correspondiente.',
      },
      {
        id: 'mac-dual-b3',
        numero: 3,
        titulo: 'Verificar en ambas',
        descripcion: 'Prueba el bloqueo en WiFi, luego desconecta y prueba con datos móviles.',
      },
    ],
    verificacion: 'Bloqueo funcionando tanto en WiFi como en datos móviles.',
    erroresFrecuentes: [
      { problema: 'Las configuraciones no se heredan entre interfaces', solucion: 'Cada interfaz de red (Wi-Fi, USB, Bluetooth) tiene su propia configuración DNS. Configúralas todas.' },
    ],
  }),
  cfg("macos", "wifi-datos", "recomendado", {
    titulo: 'Protección recomendada macOS (WiFi + datos móviles)',
    resumen: 'DNS dual + Tiempo de Uso completo en ambas redes.',
    tiempoEstimado: '20-30 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLEAN_BROWSING],
    pasos: [
      {
        id: 'mac-dual-r1',
        numero: 1,
        titulo: 'DNS en WiFi + datos',
        descripcion: 'Configura DNS manual tanto en Wi-Fi como en el servicio de datos. Usa el mismo proveedor.',
        notas: ['DNS recomendado: 91.239.100.101 o 185.228.168.168'],
      },
      {
        id: 'mac-dual-r2',
        numero: 2,
        titulo: 'Tiempo de Uso completo',
        descripcion: 'Todas las restricciones de contenido web, apps y tiempo.',
      },
      {
        id: 'mac-dual-r3',
        numero: 3,
        titulo: 'Bloqueo de cambios de red y cuenta',
        descripcion: 'El menor no puede modificar DNS ni configuración de red.',
      },
    ],
    verificacion: 'Verifica protección tanto en WiFi de casa como en datos móviles.',
    erroresFrecuentes: [
      { problema: 'No puedo guardar cambios de DNS', solucion: 'Necesitas permisos de administrador. Introduce la contraseña de tu cuenta de administrador cuando se solicite.' },
      { problema: 'El menor cambia el DNS', solucion: 'Bloquea cambios de cuenta en Tiempo de Uso > Contenido y privacidad > Restricciones.' },
      { problema: 'Tiempo de Uso no se activa', solucion: 'Asegúrate de tener configurado En Familia primero. Tiempo de Uso necesita un familiar organizador.' },
    ],
  }),
  cfg("macos", "wifi-datos", "avanzado", {
    titulo: 'Protección avanzada macOS (WiFi + datos)',
    resumen: 'DNS multi-capa + Tiempo de Uso máximo en ambas redes.',
    tiempoEstimado: '30-40 minutos',
    dnsRecomendado: [CLEAN_BROWSING, CLOUDFLARE_FAMILY],
    pasos: [
      {
        id: 'mac-dual-a1',
        numero: 1,
        titulo: 'DNS en ambas redes con distintos proveedores',
        descripcion: 'WiFi: CleanBrowsing. Datos: Cloudflare Familias.',
      },
      {
        id: 'mac-dual-a2',
        numero: 2,
        titulo: 'DoH en navegador',
        descripcion: 'Activa DNS sobre HTTPS en los navegadores instalados.',
      },
      {
        id: 'mac-dual-a3',
        numero: 3,
        titulo: 'Tiempo de Uso máximo + bloqueo total',
        descripcion: 'Restricciones completas. Bloqueo de cambios de configuración, apps no autorizadas, instalaciones.',
      },
    ],
    verificacion: 'Protección completa en cualquier red.',
    erroresFrecuentes: [
      { problema: 'No puedo guardar cambios de DNS', solucion: 'Necesitas permisos de administrador. Introduce la contraseña de tu cuenta de administrador cuando se solicite.' },
      { problema: 'El menor cambia el DNS', solucion: 'Bloquea cambios de cuenta en Tiempo de Uso > Contenido y privacidad > Restricciones.' },
      { problema: 'Tiempo de Uso no se activa', solucion: 'Asegúrate de tener configurado En Familia primero. Tiempo de Uso necesita un familiar organizador.' },
    ],
  }),
  cfg("macos", "dispositivo-compartido", "basico", {
    titulo: 'Protección básica en macOS compartido',
    resumen: 'Cuentas separadas + DNS a nivel de sistema + contraseña de administrador.',
    tiempoEstimado: '15-20 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLOUDFLARE_FAMILY],
    pasos: [
      {
        id: 'mac-shared-b1',
        numero: 1,
        titulo: 'Cuentas de usuario separadas',
        descripcion: '**Preferencias del Sistema > Usuarios y grupos**. Crea una cuenta para el adulto (Administrador) y otra para el menor (Estándar).',
        notas: ['El adulto debe tener cuenta de administrador'],
      },
      {
        id: 'mac-shared-b2',
        numero: 2,
        titulo: 'DNS configurado a nivel de sistema',
        descripcion: 'El DNS configurado en Red afecta a TODOS los usuarios del Mac. Configúralo con proveedor familiar.',
      },
      {
        id: 'mac-shared-b3',
        numero: 3,
        titulo: 'Proteger cuenta del adulto con contraseña',
        descripcion: 'Asegúrate de que la cuenta del adulto tiene contraseña segura. El menor no debe poder iniciar sesión como administrador.',
      },
    ],
    verificacion: 'Inicia sesión como menor — DNS activo. Como adulto — sin restricciones.',
    erroresFrecuentes: [
      { problema: 'El menor conoce la contraseña del adulto', solucion: 'Cambia la contraseña del administrador inmediatamente. Usa una contraseña segura.' },
    ],
  }),
  cfg("macos", "dispositivo-compartido", "recomendado", {
    titulo: 'Protección recomendada en macOS compartido',
    resumen: 'Cuentas separadas + En Familia + Tiempo de Uso solo para el menor.',
    tiempoEstimado: '20-30 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLEAN_BROWSING],
    pasos: [
      {
        id: 'mac-shared-r1',
        numero: 1,
        titulo: 'Cuentas separadas + DNS de sistema',
        descripcion: 'Adulto: Administrador. Menor: Estándar. DNS configurado en Red para todos los usuarios.',
      },
      {
        id: 'mac-shared-r2',
        numero: 2,
        titulo: 'En Familia + Tiempo de Uso solo para el menor',
        descripcion: 'Configura En Familia y aplica Tiempo de Uso solo a la cuenta del menor.',
      },
      {
        id: 'mac-shared-r3',
        numero: 3,
        titulo: 'Bloqueo de cambios de red',
        descripcion: 'El menor, como usuario Estándar, no puede modificar DNS ni configuraciones de red.',
      },
    ],
    verificacion: 'Menor protegido, adulto sin restricciones. Menor no puede cambiar DNS.',
    erroresFrecuentes: [
      { problema: 'Tiempo de Uso se aplica también al adulto', solucion: 'Asegúrate de configurar Tiempo de Uso solo para la cuenta del menor, no para el dispositivo completo.' },
    ],
  }),
  cfg("macos", "dispositivo-compartido", "avanzado", {
    titulo: 'Protección avanzada en macOS compartido',
    resumen: 'Triple DNS + Tiempo de Uso máximo + FileVault + monitorización.',
    tiempoEstimado: '30-40 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLEAN_BROWSING, CLOUDFLARE_FAMILY],
    pasos: [
      {
        id: 'mac-shared-a1',
        numero: 1,
        titulo: 'DNS triple capa (router + sistema + DoH)',
        descripcion: 'Protección máxima: router con DNS4.EU, Mac con CleanBrowsing, navegadores con DoH.',
      },
      {
        id: 'mac-shared-a2',
        numero: 2,
        titulo: 'Tiempo de Uso máximo en cuenta del menor',
        descripcion: 'Restricciones completas para la cuenta del menor. El adulto no tiene restricciones.',
      },
      {
        id: 'mac-shared-a3',
        numero: 3,
        titulo: 'FileVault para cifrado de disco',
        descripcion: 'Activa FileVault (Cifrado de disco). Así el menor no puede acceder a archivos del adulto ni arrancar desde otro volumen.',
      },
      {
        id: 'mac-shared-a4',
        numero: 4,
        titulo: 'Registro de actividad',
        descripcion: 'Activa los informes de actividad de Tiempo de Uso para monitorizar el uso del menor.',
      },
    ],
    verificacion: 'Datos del adulto cifrados. Menor protegido. Actividad registrada.',
    erroresFrecuentes: [
      { problema: 'No puedo guardar cambios de DNS', solucion: 'Necesitas permisos de administrador. Introduce la contraseña de tu cuenta de administrador cuando se solicite.' },
      { problema: 'El menor cambia el DNS', solucion: 'Bloquea cambios de cuenta en Tiempo de Uso > Contenido y privacidad > Restricciones.' },
      { problema: 'Tiempo de Uso no se activa', solucion: 'Asegúrate de tener configurado En Familia primero. Tiempo de Uso necesita un familiar organizador.' },
    ],
  }),
  cfg("macos", "dispositivo-personal", "basico", {
    titulo: 'Protección básica en macOS personal del menor',
    resumen: 'DNS manual + En Familia + Tiempo de Uso básico.',
    tiempoEstimado: '10-15 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLOUDFLARE_FAMILY],
    pasos: [
      {
        id: 'mac-own-b1',
        numero: 1,
        titulo: 'Configurar DNS manual',
        descripcion: 'Preferencias del Sistema > Red > Wi-Fi > Avanzado > DNS. Añade DNS del proveedor.',
        notas: ['DNS: 91.239.100.101 / 91.239.100.102'],
      },
      {
        id: 'mac-own-b2',
        numero: 2,
        titulo: 'En Familia y cuenta del menor',
        descripcion: 'Configura En Familia y crea un Apple ID para el menor.',
      },
      {
        id: 'mac-own-b3',
        numero: 3,
        titulo: 'Tiempo de Uso básico',
        descripcion: 'Activa Tiempo de Uso con restricciones básicas de contenido web (limitar adultos).',
      },
    ],
    verificacion: 'DNS configurado. Tiempo de Uso activo.',
    erroresFrecuentes: [
      { problema: 'No puedo guardar cambios de DNS', solucion: 'Necesitas permisos de administrador. Introduce la contraseña de tu cuenta de administrador cuando se solicite.' },
      { problema: 'El menor cambia el DNS', solucion: 'Bloquea cambios de cuenta en Tiempo de Uso > Contenido y privacidad > Restricciones.' },
      { problema: 'Tiempo de Uso no se activa', solucion: 'Asegúrate de tener configurado En Familia primero. Tiempo de Uso necesita un familiar organizador.' },
    ],
  }),
  cfg("macos", "dispositivo-personal", "recomendado", {
    titulo: 'Protección recomendada en macOS personal del menor',
    resumen: 'DNS + En Familia + Tiempo de Uso completo + bloqueo de cambios.',
    tiempoEstimado: '20-30 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLEAN_BROWSING],
    pasos: [
      {
        id: 'mac-own-r1',
        numero: 1,
        titulo: 'DNS + En Familia + Tiempo de Uso completo',
        descripcion: 'DNS manual, En Familia configurado, Tiempo de Uso con todas las restricciones.',
      },
      {
        id: 'mac-own-r2',
        numero: 2,
        titulo: 'Límites de tiempo y horarios',
        descripcion: 'Establece horarios de uso y tiempo máximo diario en Tiempo de Uso.',
      },
      {
        id: 'mac-own-r3',
        numero: 3,
        titulo: 'Bloqueo de cambios de configuración',
        descripcion: 'Tiempo de Uso > Contenido y privacidad > No permitir cambios de cuenta/red.',
      },
      {
        id: 'mac-own-r4',
        numero: 4,
        titulo: 'Cuenta Estándar para el menor',
        descripcion: 'Verifica que el menor no tiene permisos de administrador.',
      },
    ],
    verificacion: 'Todas las capas activas. Menor no puede desactivar protecciones.',
    erroresFrecuentes: [
      { problema: 'No puedo guardar cambios de DNS', solucion: 'Necesitas permisos de administrador. Introduce la contraseña de tu cuenta de administrador cuando se solicite.' },
      { problema: 'El menor cambia el DNS', solucion: 'Bloquea cambios de cuenta en Tiempo de Uso > Contenido y privacidad > Restricciones.' },
      { problema: 'Tiempo de Uso no se activa', solucion: 'Asegúrate de tener configurado En Familia primero. Tiempo de Uso necesita un familiar organizador.' },
    ],
  }),
  cfg("macos", "dispositivo-personal", "avanzado", {
    titulo: 'Protección avanzada en macOS personal del menor',
    resumen: 'Triple DNS + Tiempo de Uso máximo + FileVault + Find My + revisión mensual.',
    tiempoEstimado: '30-45 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLEAN_BROWSING, CLOUDFLARE_FAMILY],
    pasos: [
      {
        id: 'mac-own-a1',
        numero: 1,
        titulo: 'DNS triple capa (router + Mac + DoH)',
        descripcion: 'Router con DNS4.EU + Mac con CleanBrowsing + navegadores con DoH.',
      },
      {
        id: 'mac-own-a2',
        numero: 2,
        titulo: 'Tiempo de Uso máximo',
        descripcion: 'Todas las restricciones: web, apps, tiempo, compras, cambios de configuración.',
      },
      {
        id: 'mac-own-a3',
        numero: 3,
        titulo: 'Restringir instalación de apps',
        descripcion: 'App Store solo con aprobación. Bloquear instalación de apps de terceros no autorizadas.',
      },
      {
        id: 'mac-own-a4',
        numero: 4,
        titulo: 'FileVault + Find My Mac',
        descripcion: 'Activa FileVault y Buscar mi Mac. Si el menor pierde el equipo, los datos están seguros.',
      },
      {
        id: 'mac-own-a5',
        numero: 5,
        titulo: 'Revisión mensual',
        descripcion: 'Revisa los informes de actividad mensualmente y ajusta las restricciones según la edad y madurez.',
      },
    ],
    verificacion: 'Protección total del dispositivo y los datos. Revisión mensual programada.',
    erroresFrecuentes: [
      { problema: 'No puedo guardar cambios de DNS', solucion: 'Necesitas permisos de administrador. Introduce la contraseña de tu cuenta de administrador cuando se solicite.' },
      { problema: 'El menor cambia el DNS', solucion: 'Bloquea cambios de cuenta en Tiempo de Uso > Contenido y privacidad > Restricciones.' },
      { problema: 'Tiempo de Uso no se activa', solucion: 'Asegúrate de tener configurado En Familia primero. Tiempo de Uso necesita un familiar organizador.' },
    ],
  }),
  cfg("macos", "varias-redes", "basico", {
    titulo: 'Protección básica macOS (varias redes)',
    resumen: 'DNS manual por red o DoH en navegador como alternativa rápida.',
    tiempoEstimado: '5-15 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLOUDFLARE_FAMILY],
    pasos: [
      {
        id: 'mac-vr-b1',
        numero: 1,
        titulo: 'Configurar DNS en cada red manualmente',
        descripcion: 'En cada WiFi nueva: Preferencias del Sistema > Red > Wi-Fi > Avanzado > DNS. Añade los DNS.',
        notas: ['Hay que repetirlo para cada red nueva'],
      },
      {
        id: 'mac-vr-b2',
        numero: 2,
        titulo: 'Alternativa: DoH en Chrome/Edge',
        descripcion: 'Activa DNS seguro en Chrome o Edge. Safari no tiene DoH nativo; usa Chrome o Edge que sí lo soportan.',
        notas: ['Chrome: Configuración > Privacidad > DNS seguro', 'Edge: Configuración > Privacidad > DNS seguro'],
      },
    ],
    verificacion: 'En cada red nueva, verifica que el DNS bloquea contenido.',
    erroresFrecuentes: [
      { problema: 'Safari no tiene DoH nativo', solucion: 'Usa Chrome o Edge para DoH. Safari no permite configurar DNS sobre HTTPS.' },
    ],
  }),
  cfg("macos", "varias-redes", "recomendado", {
    titulo: 'Protección recomendada macOS (varias redes)',
    resumen: 'DoH en navegador como solución principal + Tiempo de Uso + bloqueo de cambios.',
    tiempoEstimado: '20-30 minutos',
    dnsRecomendado: [CLEAN_BROWSING, DNS_FAMILIA_SURF],
    pasos: [
      {
        id: 'mac-vr-r1',
        numero: 1,
        titulo: 'DoH en navegador como solución principal',
        descripcion: 'Configura DNS seguro en Chrome o Edge. Funciona en cualquier red WiFi sin configuración adicional.',
        notas: ['Elegir proveedor: CleanBrowsing o DNS4.EU'],
      },
      {
        id: 'mac-vr-r2',
        numero: 2,
        titulo: 'Tiempo de Uso completo',
        descripcion: 'Tiempo de Uso funciona independientemente de la red.',
      },
      {
        id: 'mac-vr-r3',
        numero: 3,
        titulo: 'Bloqueo de cambios de red',
        descripcion: 'Tiempo de Uso > Restricciones > No permitir cambios de red.',
      },
    ],
    verificacion: 'Funciona en cualquier WiFi. Verifica en al menos 2 redes distintas.',
    erroresFrecuentes: [
      { problema: 'No puedo guardar cambios de DNS', solucion: 'Necesitas permisos de administrador. Introduce la contraseña de tu cuenta de administrador cuando se solicite.' },
      { problema: 'El menor cambia el DNS', solucion: 'Bloquea cambios de cuenta en Tiempo de Uso > Contenido y privacidad > Restricciones.' },
      { problema: 'Tiempo de Uso no se activa', solucion: 'Asegúrate de tener configurado En Familia primero. Tiempo de Uso necesita un familiar organizador.' },
    ],
  }),
  cfg("macos", "varias-redes", "avanzado", {
    titulo: 'Protección avanzada macOS (varias redes)',
    resumen: 'DoH + DNS sistema + Tiempo de Uso máximo + verificación multi-red.',
    tiempoEstimado: '30-40 minutos',
    dnsRecomendado: [CLEAN_BROWSING, CLOUDFLARE_FAMILY],
    pasos: [
      {
        id: 'mac-vr-a1',
        numero: 1,
        titulo: 'DoH + DNS sistema + router',
        descripcion: 'Triple capa para todas las redes: router en casa, DNS sistema como respaldo, DoH en navegador.',
      },
      {
        id: 'mac-vr-a2',
        numero: 2,
        titulo: 'Tiempo de Uso máximo + bloqueo VPN',
        descripcion: 'Restricciones totales. Bloquea instalación de VPNs y proxies.',
      },
      {
        id: 'mac-vr-a3',
        numero: 3,
        titulo: 'Verificación en múltiples redes',
        descripcion: 'Prueba en casa, colegio, biblioteca. La protección debe funcionar en todas.',
      },
    ],
    verificacion: 'Protección en cualquier red. Sin puntos débiles.',
    erroresFrecuentes: [
      { problema: 'No puedo guardar cambios de DNS', solucion: 'Necesitas permisos de administrador. Introduce la contraseña de tu cuenta de administrador cuando se solicite.' },
      { problema: 'El menor cambia el DNS', solucion: 'Bloquea cambios de cuenta en Tiempo de Uso > Contenido y privacidad > Restricciones.' },
      { problema: 'Tiempo de Uso no se activa', solucion: 'Asegúrate de tener configurado En Familia primero. Tiempo de Uso necesita un familiar organizador.' },
    ],
  }),

  // ═══════════════════════════════════════
  // ROUTER — remaining contexts
  // ═══════════════════════════════════════

  cfg("router", "wifi-casa", "basico", {
    titulo: 'Protección básica a nivel de router',
    resumen: 'Cambio rápido de DNS en el router para proteger toda la red.',
    tiempoEstimado: '10-15 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLEAN_BROWSING],
    pasos: [
      {
        id: 'router-wc-b1',
        numero: 1,
        titulo: 'Acceder al panel del router',
        descripcion: 'Abre un navegador y escribe la IP del router (normalmente 192.168.1.1 o 192.168.0.1). Introduce usuario y contraseña.',
        notas: ['Usuario/contraseña suelen estar en una pegatina debajo del router'],
      },
      {
        id: 'router-wc-b2',
        numero: 2,
        titulo: 'Cambiar DNS en la configuración WAN',
        descripcion: 'Busca la sección **WAN, Internet, DNS o Configuración de red**. Sustituye los DNS actuales por los del proveedor elegido.',
        notas: ['DNS4.EU: 91.239.100.101 / 91.239.100.102', 'CleanBrowsing: 185.228.168.168 / 185.228.169.168'],
      },
      {
        id: 'router-wc-b3',
        numero: 3,
        titulo: 'Guardar y verificar',
        descripcion: 'Guarda los cambios. Visita **dnsleaktest.com** desde cualquier dispositivo. Confirma los DNS.',
      },
    ],
    verificacion: 'Desde cualquier dispositivo: dnsleaktest.com muestra los DNS configurados. Sitio bloqueado no carga.',
    erroresFrecuentes: [
      { problema: 'No puedo acceder al panel del router', solucion: 'Prueba 192.168.1.1, 192.168.0.1 o 192.168.1.254. Busca la IP exacta en la pegatina del router.' },
      { problema: 'Los dispositivos no obtienen los nuevos DNS', solucion: 'Renueva la IP: en Windows **ipconfig /release** e **ipconfig /renew**. En Mac: desactiva y reactiva WiFi.' },
      { problema: 'Olvidé la contraseña del router', solucion: 'Busca el botón de reset en el router. Pulsa con un clip 10 segundos. Vuelve a valores de fábrica.' },
      { problema: 'El router del operador no permite cambiar DNS', solucion: 'Algunos routers de operador bloquean el cambio. Soluciones: pon tu propio router, cambia a modo bridge, o configura DNS en cada dispositivo.' },
    ],
  }),
  cfg("router", "wifi-casa", "avanzado", {
    titulo: 'Protección avanzada a nivel de router',
    resumen: 'DNS redundante + configuración permanente + verificación exhaustiva + contraseña segura del router.',
    tiempoEstimado: '25-35 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLEAN_BROWSING, CLOUDFLARE_FAMILY],
    pasos: [
      {
        id: 'router-wc-a1',
        numero: 1,
        titulo: 'Acceder al router y registrar DNS actuales',
        descripcion: 'Antes de cambiar nada, anota o captura la configuración DNS actual por si necesitas revertir.',
        notas: ['Si algo falla, puedes restaurar los valores originales'],
      },
      {
        id: 'router-wc-a2',
        numero: 2,
        titulo: 'Configurar DNS primario y secundario con proveedores distintos',
        descripcion: 'Usa dos proveedores diferentes para redundancia. Ej: primario DNS4.EU, secundario CleanBrowsing.',
      },
      {
        id: 'router-wc-a3',
        numero: 3,
        titulo: 'Desactivar DNS dinámico del operador',
        descripcion: "Algunos routers reemplazan automáticamente los DNS manuales. Busca opciones como 'Obtener DNS automáticamente' y DESMÁRCALA.",
      },
      {
        id: 'router-wc-a4',
        numero: 4,
        titulo: 'Reiniciar router y reconectar todos los dispositivos',
        descripcion: 'Apaga el router 30 segundos. Enciende. Reconecta todos los dispositivos a la WiFi para que tomen los nuevos DNS.',
      },
      {
        id: 'router-wc-a5',
        numero: 5,
        titulo: 'Verificación exhaustiva',
        descripcion: 'dnsleaktest.com desde varios dispositivos. También prueba bloqueo de contenido desde PC, móvil, Smart TV, consola.',
      },
      {
        id: 'router-wc-a6',
        numero: 6,
        titulo: 'Proteger el acceso al router',
        descripcion: 'Cambia la contraseña del router por una segura. Así el menor no puede acceder al panel y revertir los cambios.',
      },
    ],
    verificacion: 'Todos los dispositivos protegidos. DNS no se resetea. Router seguro.',
    erroresFrecuentes: [
      { problema: 'No puedo acceder al panel del router', solucion: 'Prueba 192.168.1.1, 192.168.0.1 o 192.168.1.254. Busca la IP exacta en la pegatina del router.' },
      { problema: 'Los dispositivos no obtienen los nuevos DNS', solucion: 'Renueva la IP: en Windows **ipconfig /release** e **ipconfig /renew**. En Mac: desactiva y reactiva WiFi.' },
      { problema: 'Olvidé la contraseña del router', solucion: 'Busca el botón de reset en el router. Pulsa con un clip 10 segundos. Vuelve a valores de fábrica.' },
      { problema: 'El router del operador no permite cambiar DNS', solucion: 'Algunos routers de operador bloquean el cambio. Soluciones: pon tu propio router, cambia a modo bridge, o configura DNS en cada dispositivo.' },
    ],
  }),
  cfg("router", "dispositivo-compartido", "basico", {
    titulo: 'Protección básica router (dispositivo compartido)',
    resumen: 'DNS en router + contraseña segura + separación de redes.',
    tiempoEstimado: '15-20 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLEAN_BROWSING],
    pasos: [
      {
        id: 'router-shared-b1',
        numero: 1,
        titulo: 'Cambiar DNS en el router',
        descripcion: 'Accede al router y configura DNS familiar. Esto protege a TODOS los dispositivos conectados.',
      },
      {
        id: 'router-shared-b2',
        numero: 2,
        titulo: 'Cambiar contraseña del router',
        descripcion: 'Asegúrate de que la contraseña del router es segura y solo el adulto la conoce.',
      },
      {
        id: 'router-shared-b3',
        numero: 3,
        titulo: 'Crear WiFi de invitados (opcional)',
        descripcion: 'Si el adulto necesita navegar sin restricciones, crea una red WiFi de invitados sin protección DNS.',
        notas: ['El menor debe conectarse SOLO a la red principal', 'La red de invitados no tiene filtros'],
      },
    ],
    verificacion: 'Menor conectado a red principal protegida. Adulto puede acceder a red de invitados sin filtros.',
    erroresFrecuentes: [
      { problema: 'Mi router no tiene WiFi de invitados', solucion: 'No es necesario. El DNS en el router protege a todos; el adulto puede usar DoH desactivado en su navegador para excepciones.' },
    ],
  }),
  cfg("router", "dispositivo-compartido", "recomendado", {
    titulo: 'Protección recomendada router (dispositivo compartido)',
    resumen: 'Router con DNS familiar + dos redes WiFi + control parental combinado.',
    tiempoEstimado: '25-35 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLEAN_BROWSING],
    pasos: [
      {
        id: 'router-shared-r1',
        numero: 1,
        titulo: 'DNS familiar en el router',
        descripcion: 'Configura DNS con DNS4.EU o CleanBrowsing. Toda la red protegida, todos los dispositivos.',
      },
      {
        id: 'router-shared-r2',
        numero: 2,
        titulo: 'Red WiFi principal + red de invitados',
        descripcion: 'Red principal: DNS familiar (para el menor). Red de invitados: DNS automático (para adultos invitados o uso puntual).',
        notas: ['No todos los routers soportan dos redes WiFi. Si el tuyo no, configura DNS en cada dispositivo.'],
      },
      {
        id: 'router-shared-r3',
        numero: 3,
        titulo: 'Control parental por dispositivo',
        descripcion: 'Combina el DNS del router con Family Safety (Windows) o Tiempo de Uso (Mac) para cada dispositivo del menor.',
        notas: ['El router da la capa base. El control parental del dispositivo da gestión detallada.'],
      },
    ],
    verificacion: 'Redes separadas. Menor solo usa la red protegida. Control parental dual (router + dispositivo).',
    erroresFrecuentes: [
      { problema: 'No puedo acceder al panel del router', solucion: 'Prueba 192.168.1.1, 192.168.0.1 o 192.168.1.254. Busca la IP exacta en la pegatina del router.' },
      { problema: 'Los dispositivos no obtienen los nuevos DNS', solucion: 'Renueva la IP: en Windows **ipconfig /release** e **ipconfig /renew**. En Mac: desactiva y reactiva WiFi.' },
      { problema: 'Olvidé la contraseña del router', solucion: 'Busca el botón de reset en el router. Pulsa con un clip 10 segundos. Vuelve a valores de fábrica.' },
      { problema: 'El router del operador no permite cambiar DNS', solucion: 'Algunos routers de operador bloquean el cambio. Soluciones: pon tu propio router, cambia a modo bridge, o configura DNS en cada dispositivo.' },
    ],
  }),
  cfg("router", "dispositivo-compartido", "avanzado", {
    titulo: 'Protección avanzada router (dispositivo compartido)',
    resumen: 'Router DNS + red segregada + seguridad del router + logs de actividad.',
    tiempoEstimado: '30-40 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLEAN_BROWSING, CLOUDFLARE_FAMILY],
    pasos: [
      {
        id: 'router-shared-a1',
        numero: 1,
        titulo: 'Router con DNS familiar + red de invitados',
        descripcion: 'Red principal con DNS4.EU. Red de invitados con DNS del operador (sin filtros).',
      },
      {
        id: 'router-shared-a2',
        numero: 2,
        titulo: 'Control parental + DNS por dispositivo',
        descripcion: 'Cada dispositivo del menor tiene su propia capa de protección además del router.',
      },
      {
        id: 'router-shared-a3',
        numero: 3,
        titulo: 'Bloqueo de páginas de administración del router',
        descripcion: 'Cambia el puerto de administración del router (no el 80/443 por defecto) para que sea más difícil de acceder.',
      },
      {
        id: 'router-shared-a4',
        numero: 4,
        titulo: 'Registro de actividad del router',
        descripcion: 'Activa los logs del router (si está disponible) para ver qué sitios se han intentado visitar.',
      },
    ],
    verificacion: 'Router asegurado, redes separadas, actividad registrada, dispositivos individuales también protegidos.',
    erroresFrecuentes: [
      { problema: 'No puedo acceder al panel del router', solucion: 'Prueba 192.168.1.1, 192.168.0.1 o 192.168.1.254. Busca la IP exacta en la pegatina del router.' },
      { problema: 'Los dispositivos no obtienen los nuevos DNS', solucion: 'Renueva la IP: en Windows **ipconfig /release** e **ipconfig /renew**. En Mac: desactiva y reactiva WiFi.' },
      { problema: 'Olvidé la contraseña del router', solucion: 'Busca el botón de reset en el router. Pulsa con un clip 10 segundos. Vuelve a valores de fábrica.' },
      { problema: 'El router del operador no permite cambiar DNS', solucion: 'Algunos routers de operador bloquean el cambio. Soluciones: pon tu propio router, cambia a modo bridge, o configura DNS en cada dispositivo.' },
    ],
  }),

  // ═══════════════════════════════════════
  // NAVEGADOR — remaining contexts
  // ═══════════════════════════════════════

  cfg("navegador", "wifi-casa", "recomendado", {
    titulo: 'Protección recomendada en navegadores (WiFi en casa)',
    resumen: 'DoH en todos los navegadores + verificación cruzada + eliminación de navegadores inseguros.',
    tiempoEstimado: '15-20 minutos',
    dnsRecomendado: [CLEAN_BROWSING, DNS_FAMILIA_SURF],
    pasos: [
      {
        id: 'nav-wc-r1',
        numero: 1,
        titulo: 'Chrome: DNS seguro con CleanBrowsing',
        descripcion: "**Chrome > Configuración > Privacidad y seguridad > Seguridad**. Activa 'Usar DNS seguro'. Elige 'CleanBrowsing' o proveedor personalizado.",
        notas: ['Proveedor personalizado: https://doh.cleanbrowsing.org/doh/family-filter/'],
      },
      {
        id: 'nav-wc-r2',
        numero: 2,
        titulo: 'Edge: DNS seguro con CleanBrowsing',
        descripcion: "**Edge > Configuración > Privacidad, búsqueda y servicios > Seguridad**. Activa 'Usar DNS seguro'.",
      },
      {
        id: 'nav-wc-r3',
        numero: 3,
        titulo: 'Firefox: DoH con proveedor familiar',
        descripcion: "**Firefox > Ajustes > General > Configuración de red > Ajustes**. Activa 'Habilitar DNS sobre HTTPS'. Selecciona 'Proveedor personalizado'.",
        notas: ['URL: https://doh.cleanbrowsing.org/doh/family-filter/'],
      },
      {
        id: 'nav-wc-r4',
        numero: 4,
        titulo: 'Safari: sin DoH nativo',
        descripcion: 'Safari no soporta DoH. Para proteger Safari, configura el DNS a nivel de sistema. Safari usará el DNS del sistema automáticamente.',
        notas: ['Si quieres proteger Safari: configura DNS en el router o en Preferencias del Sistema > Red'],
      },
      {
        id: 'nav-wc-r5',
        numero: 5,
        titulo: 'Opera / Brave: activar DoH',
        descripcion: 'Opera: Configuración > Privacidad > DNS seguro. Brave: Configuración > Privacidad > DNS seguro. Actívalo con el mismo proveedor.',
      },
      {
        id: 'nav-wc-r6',
        numero: 6,
        titulo: 'Verificar y desinstalar navegadores no seguros',
        descripcion: 'Verifica con dnsleaktest.com desde cada navegador. Desinstala aquellos navegadores que no se puedan configurar con DoH.',
      },
    ],
    verificacion: 'Todos los navegadores instalados tienen DoH activo. Safari usa DNS del sistema.',
    erroresFrecuentes: [
      { problema: 'La configuración no se guarda', solucion: 'Cierra completamente el navegador y vuelve a abrirlo. Algunos navegadores requieren reinicio.' },
      { problema: 'El sitio no se bloquea aunque configuré DoH', solucion: 'Verifica la URL del proveedor. Debe ser https://dominio/dns-query. CleanBrowsing: https://doh.cleanbrowsing.org/doh/family-filter/' },
      { problema: 'El menor usa otro navegador', solucion: 'El DoH se configura por navegador. Si el menor usa Safari (sin DoH), no está protegido. Configura en TODOS los navegadores.' },
    ],
  }),
  cfg("navegador", "wifi-casa", "avanzado", {
    titulo: 'Protección avanzada en navegadores (WiFi en casa)',
    resumen: 'DoH bloqueado + perfiles supervisados + políticas para evitar desactivación.',
    tiempoEstimado: '20-30 minutos',
    dnsRecomendado: [CLEAN_BROWSING, CLOUDFLARE_FAMILY, DNS_FAMILIA_SURF],
    pasos: [
      {
        id: 'nav-wc-a1',
        numero: 1,
        titulo: 'DoH en todos los navegadores instalados',
        descripcion: 'Configura DoH en Chrome, Edge, Firefox, Opera, Brave con CleanBrowsing o DNS4.EU.',
      },
      {
        id: 'nav-wc-a2',
        numero: 2,
        titulo: 'Desinstalar navegadores que no soporten DoH',
        descripcion: 'Safari y navegadores antiguos no soportan DoH. Si estás en macOS, usa Chrome/Edge en lugar de Safari para el menor.',
        notas: ['El menor debe usar solo navegadores con DoH activado'],
      },
      {
        id: 'nav-wc-a3',
        numero: 3,
        titulo: 'Activar modo supervisado o perfiles gestionados',
        descripcion: 'Chrome: crea un perfil supervisado (Family Link). Edge: perfil con Family Safety. Firefox: configurar política de empresa para bloquear cambios de DoH.',
      },
      {
        id: 'nav-wc-a4',
        numero: 4,
        titulo: 'Proteger la configuración de DoH',
        descripcion: 'En Chrome, usa políticas de grupo (si es posible) para que el menor no pueda desactivar DNS seguro.',
      },
      {
        id: 'nav-wc-a5',
        numero: 5,
        titulo: 'Verificación mensual',
        descripcion: 'Cada mes, comprueba que todos los navegadores siguen teniendo DoH activado. El menor podría haberlo desactivado.',
      },
    ],
    verificacion: 'DoH activo y protegido contra desactivación. Menor no puede desactivarlo.',
    erroresFrecuentes: [
      { problema: 'La configuración no se guarda', solucion: 'Cierra completamente el navegador y vuelve a abrirlo. Algunos navegadores requieren reinicio.' },
      { problema: 'El sitio no se bloquea aunque configuré DoH', solucion: 'Verifica la URL del proveedor. Debe ser https://dominio/dns-query. CleanBrowsing: https://doh.cleanbrowsing.org/doh/family-filter/' },
      { problema: 'El menor usa otro navegador', solucion: 'El DoH se configura por navegador. Si el menor usa Safari (sin DoH), no está protegido. Configura en TODOS los navegadores.' },
    ],
  }),
  cfg("navegador", "varias-redes", "basico", {
    titulo: 'Protección básica navegadores (varias redes)',
    resumen: 'DoH en el navegador principal del menor. Funciona en cualquier red.',
    tiempoEstimado: '5-10 minutos',
    dnsRecomendado: [CLEAN_BROWSING, CLOUDFLARE_FAMILY],
    pasos: [
      {
        id: 'nav-vr-b1',
        numero: 1,
        titulo: 'Elegir el navegador principal del menor',
        descripcion: 'Elige Chrome o Edge (ambos soportan DoH). Configura el DNS seguro con CleanBrowsing.',
        notas: ['El DoH funciona en cualquier red WiFi automáticamente'],
      },
      {
        id: 'nav-vr-b2',
        numero: 2,
        titulo: 'Configurar DoH',
        descripcion: 'Activa DNS seguro en el navegador elegido. Esto protegerá la navegación en todas las redes.',
      },
      {
        id: 'nav-vr-b3',
        numero: 3,
        titulo: 'Verificar en varias redes',
        descripcion: 'Prueba el navegador en casa, en el colegio, en una cafetería. El bloqueo debe funcionar en todas.',
      },
    ],
    verificacion: 'Bloqueo de contenido funcionando en varias redes distintas.',
    erroresFrecuentes: [
      { problema: 'El menor usa la WiFi del colegio que bloquea DoH', solucion: 'Algunas redes bloquean DoH. En ese caso, el navegador debería caer a DNS del sistema. Configura también DNS en el sistema.' },
    ],
  }),
  cfg("navegador", "varias-redes", "recomendado", {
    titulo: 'Protección recomendada navegadores (varias redes)',
    resumen: 'DoH en Chrome, Edge y Firefox + desinstalar navegadores inseguros.',
    tiempoEstimado: '15-20 minutos',
    dnsRecomendado: [CLEAN_BROWSING, DNS_FAMILIA_SURF],
    pasos: [
      {
        id: 'nav-vr-r1',
        numero: 1,
        titulo: 'DoH en Chrome y Edge (misma configuración)',
        descripcion: 'Configura DoH con CleanBrowsing en ambos navegadores. Así si el menor usa uno u otro, está protegido.',
      },
      {
        id: 'nav-vr-r2',
        numero: 2,
        titulo: 'Configurar DoH también en Firefox',
        descripcion: 'Firefox: DoH con proveedor personalizado. Asegúrate de que el menor no pueda desactivarlo.',
      },
      {
        id: 'nav-vr-r3',
        numero: 3,
        titulo: 'Desinstalar navegadores sin DoH',
        descripcion: 'Safari, navegadores antiguos o alternativos sin DoH NO protegen al menor.',
      },
      {
        id: 'nav-vr-r4',
        numero: 4,
        titulo: 'Verificar en 3 redes diferentes',
        descripcion: 'Casa, colegio, WiFi pública. El bloqueo debe funcionar independientemente de la red.',
      },
    ],
    verificacion: 'Todos los navegadores disponibles protegen en cualquier red.',
    erroresFrecuentes: [
      { problema: 'La configuración no se guarda', solucion: 'Cierra completamente el navegador y vuelve a abrirlo. Algunos navegadores requieren reinicio.' },
      { problema: 'El sitio no se bloquea aunque configuré DoH', solucion: 'Verifica la URL del proveedor. Debe ser https://dominio/dns-query. CleanBrowsing: https://doh.cleanbrowsing.org/doh/family-filter/' },
      { problema: 'El menor usa otro navegador', solucion: 'El DoH se configura por navegador. Si el menor usa Safari (sin DoH), no está protegido. Configura en TODOS los navegadores.' },
    ],
  }),
  cfg("navegador", "varias-redes", "avanzado", {
    titulo: 'Protección avanzada navegadores (varias redes)',
    resumen: 'DoH multi-proveedor + perfiles supervisados + políticas inmutables.',
    tiempoEstimado: '20-30 minutos',
    dnsRecomendado: [CLEAN_BROWSING, CLOUDFLARE_FAMILY, DNS_FAMILIA_SURF],
    pasos: [
      {
        id: 'nav-vr-a1',
        numero: 1,
        titulo: 'DoH en todos los navegadores con distintos proveedores',
        descripcion: 'Chrome: CleanBrowsing. Edge: DNS4.EU. Firefox: Cloudflare Familias. Si uno falla, los otros protegen.',
      },
      {
        id: 'nav-vr-a2',
        numero: 2,
        titulo: 'Perfiles supervisados en todos los navegadores',
        descripcion: 'Activa supervisión en Chrome (Family Link), Edge (Family Safety), Firefox (políticas).',
      },
      {
        id: 'nav-vr-a3',
        numero: 3,
        titulo: 'Bloquear cambio de configuración de DoH',
        descripcion: 'Usa políticas de grupo o configuración gestionada para que el menor no pueda desactivar DNS seguro.',
        notas: ["En Chrome: política 'DnsOverHttpsMode' = 'secure'"],
      },
      {
        id: 'nav-vr-a4',
        numero: 4,
        titulo: 'Verificación mensual continua',
        descripcion: 'Revisa mensualmente que el DoH sigue activo en todos los navegadores.',
      },
    ],
    verificacion: 'Protección máxima en cualquier red. Menor no puede desactivar DoH.',
    erroresFrecuentes: [
      { problema: 'La configuración no se guarda', solucion: 'Cierra completamente el navegador y vuelve a abrirlo. Algunos navegadores requieren reinicio.' },
      { problema: 'El sitio no se bloquea aunque configuré DoH', solucion: 'Verifica la URL del proveedor. Debe ser https://dominio/dns-query. CleanBrowsing: https://doh.cleanbrowsing.org/doh/family-filter/' },
      { problema: 'El menor usa otro navegador', solucion: 'El DoH se configura por navegador. Si el menor usa Safari (sin DoH), no está protegido. Configura en TODOS los navegadores.' },
    ],
  }),
  cfg("navegador", "wifi-publica", "basico", {
    titulo: 'Protección básica navegadores (WiFi pública)',
    resumen: 'DoH en Chrome o Edge + evitar Safari en redes públicas.',
    tiempoEstimado: '5-10 minutos',
    dnsRecomendado: [CLEAN_BROWSING, CLOUDFLARE_FAMILY],
    pasos: [
      {
        id: 'nav-wp-b1',
        numero: 1,
        titulo: 'Activar DoH en el navegador principal',
        descripcion: 'Chrome o Edge: Configuración > Privacidad > DNS seguro. Elige CleanBrowsing.',
        notas: ['El DoH funciona incluso en WiFi públicas que bloquean DNS de terceros'],
      },
      {
        id: 'nav-wp-b2',
        numero: 2,
        titulo: 'Evitar Safari en WiFi públicas',
        descripcion: 'Safari no tiene DoH. En WiFi públicas, el operador puede redirigir o manipular el tráfico DNS de Safari. Usa Chrome o Edge.',
      },
      {
        id: 'nav-wp-b3',
        numero: 3,
        titulo: 'Verificar en WiFi pública',
        descripcion: 'Conéctate a una WiFi pública. Visita **dnsleaktest.com** — debe mostrar el proveedor DoH, no el DNS de la WiFi.',
      },
    ],
    verificacion: 'Conectado a WiFi pública: DoH funciona, Safari no se usa.',
    erroresFrecuentes: [
      { problema: 'La WiFi pública redirige al portal de autenticación', solucion: 'El portal cautivo puede interferir con DoH. Una vez autenticado, DoH debería funcionar.' },
    ],
  }),
  cfg("navegador", "wifi-publica", "recomendado", {
    titulo: 'Protección recomendada navegadores (WiFi pública)',
    resumen: 'DoH + DNS del sistema + educación sobre riesgos.',
    tiempoEstimado: '10-15 minutos',
    dnsRecomendado: [CLEAN_BROWSING, DNS_FAMILIA_SURF],
    pasos: [
      {
        id: 'nav-wp-r1',
        numero: 1,
        titulo: 'DoH en Chrome/Edge con CleanBrowsing',
        descripcion: 'CleanBrowsing bloquea proxies y anonymizers, muy común en WiFi públicas.',
      },
      {
        id: 'nav-wp-r2',
        numero: 2,
        titulo: 'DNS del sistema como respaldo',
        descripcion: 'Además del DoH, configura DNS manual en el sistema. Si el navegador no usa DoH por algún motivo, el DNS del sistema protege.',
      },
      {
        id: 'nav-wp-r3',
        numero: 3,
        titulo: 'Advertir al menor sobre riesgos de WiFi públicas',
        descripcion: 'Explica que no debe hacer compras ni introducir contraseñas en WiFi públicas aunque el DNS esté protegido.',
        notas: ['El DNS protege contra contenido inapropiado, no contra phishing o redes fraudulentas'],
      },
    ],
    verificacion: 'DoH activo en WiFi pública. DNS de sistema como respaldo.',
    erroresFrecuentes: [
      { problema: 'La configuración no se guarda', solucion: 'Cierra completamente el navegador y vuelve a abrirlo. Algunos navegadores requieren reinicio.' },
      { problema: 'El sitio no se bloquea aunque configuré DoH', solucion: 'Verifica la URL del proveedor. Debe ser https://dominio/dns-query. CleanBrowsing: https://doh.cleanbrowsing.org/doh/family-filter/' },
      { problema: 'El menor usa otro navegador', solucion: 'El DoH se configura por navegador. Si el menor usa Safari (sin DoH), no está protegido. Configura en TODOS los navegadores.' },
    ],
  }),
  cfg("navegador", "wifi-publica", "avanzado", {
    titulo: 'Protección avanzada navegadores (WiFi pública)',
    resumen: 'DoH multi-navegador + VPN + restricciones de uso + educación continua.',
    tiempoEstimado: '20-30 minutos',
    dnsRecomendado: [CLEAN_BROWSING, CLOUDFLARE_FAMILY, DNS_FAMILIA_SURF],
    pasos: [
      {
        id: 'nav-wp-a1',
        numero: 1,
        titulo: 'DoH en múltiples navegadores + VPN',
        descripcion: 'Chrome y Edge con DoH + VPN con filtrado DNS (si es necesario). Las WiFi públicas son más seguras con VPN.',
      },
      {
        id: 'nav-wp-a2',
        numero: 2,
        titulo: 'Restringir uso de WiFi públicas',
        descripcion: 'Establece una regla: el menor no debe conectarse a WiFi públicas sin permiso. Si lo hace, solo navegadores con DoH.',
      },
      {
        id: 'nav-wp-a3',
        numero: 3,
        titulo: 'Modo seguro en el navegador',
        descripcion: "Activa siempre 'Modo seguro' o 'Navegación segura' en Chrome/Edge como capa adicional contra phishing.",
      },
      {
        id: 'nav-wp-a4',
        numero: 4,
        titulo: 'Verificación mensual y educación',
        descripcion: 'Revisa el historial de navegación mensualmente. Educa al menor sobre los peligros de las WiFi públicas.',
      },
    ],
    verificacion: 'Máxima protección en WiFi públicas. Menor educado sobre riesgos.',
    erroresFrecuentes: [
      { problema: 'La configuración no se guarda', solucion: 'Cierra completamente el navegador y vuelve a abrirlo. Algunos navegadores requieren reinicio.' },
      { problema: 'El sitio no se bloquea aunque configuré DoH', solucion: 'Verifica la URL del proveedor. Debe ser https://dominio/dns-query. CleanBrowsing: https://doh.cleanbrowsing.org/doh/family-filter/' },
      { problema: 'El menor usa otro navegador', solucion: 'El DoH se configura por navegador. Si el menor usa Safari (sin DoH), no está protegido. Configura en TODOS los navegadores.' },
    ],
  }),

  // ═══════════════════════════════════════
  // SMART TV — remaining contexts
  // ═══════════════════════════════════════

  cfg("smart-tv", "wifi-casa", "basico", {
    titulo: 'Protección básica en Smart TV',
    resumen: 'DNS en router o TV + control parental básico de plataformas.',
    tiempoEstimado: '10-15 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLEAN_BROWSING],
    pasos: [
      {
        id: 'tv-wc-b1',
        numero: 1,
        titulo: 'Opción A: DNS en el router',
        descripcion: 'La forma más sencilla: configura el DNS en el router. La Smart TV heredará la protección automáticamente.',
        notas: ['Protege también todos los demás dispositivos conectados'],
      },
      {
        id: 'tv-wc-b2',
        numero: 2,
        titulo: 'Opción B: DNS manual en la TV',
        descripcion: 'Si no puedes cambiar el router: **Ajustes de red de la TV > Configuración manual > DNS**. Introduce las direcciones del proveedor.',
        notas: ['Android TV: Ajustes > Red e Internet > WiFi > DNS privado', 'Samsung Tizen: Ajustes > Red > Configuración de red > DNS manual'],
      },
      {
        id: 'tv-wc-b3',
        numero: 3,
        titulo: 'Activar control parental básico en plataformas',
        descripcion: 'Activa el control parental en YouTube (Modo restringido), Netflix (PIN infantil) y otras apps.',
      },
    ],
    verificacion: 'YouTube sin contenido inapropiado. Netflix bloqueado en perfiles infantiles.',
    erroresFrecuentes: [
      { problema: 'La Smart TV no tiene opción de cambiar DNS', solucion: 'Algunas TVs básicas no lo permiten. La única solución es configurar el DNS en el router.' },
      { problema: 'YouTube sigue mostrando contenido inapropiado', solucion: 'El DNS bloquea dominios, no contenido dentro de YouTube. Activa el Modo Restringido de YouTube.' },
    ],
  }),
  cfg("smart-tv", "wifi-casa", "avanzado", {
    titulo: 'Protección avanzada en Smart TV',
    resumen: 'Doble DNS (router + TV) + control parental completo en todas las plataformas + restricción de apps.',
    tiempoEstimado: '25-35 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLEAN_BROWSING, CLOUDFLARE_FAMILY],
    pasos: [
      {
        id: 'tv-wc-a1',
        numero: 1,
        titulo: 'DNS en el router como medida principal',
        descripcion: 'Configura el router con DNS4.EU o CleanBrowsing. La TV hereda la protección.',
      },
      {
        id: 'tv-wc-a2',
        numero: 2,
        titulo: 'DNS manual en la TV como doble capa',
        descripcion: 'Además del router, configura DNS manual en la TV con un proveedor diferente. Router: DNS4.EU, TV: CleanBrowsing.',
      },
      {
        id: 'tv-wc-a3',
        numero: 3,
        titulo: 'Control parental en todas las plataformas',
        descripcion: 'Netflix: PIN por perfil. YouTube: Modo restringido. Disney+: perfil infantil. Prime Video: PIN parental.',
      },
      {
        id: 'tv-wc-a4',
        numero: 4,
        titulo: 'Restringir instalación de apps',
        descripcion: 'Android TV: bloquea instalación de apps de orígenes desconocidos. Samsung/LG: activa control parental de la tienda de apps.',
      },
      {
        id: 'tv-wc-a5',
        numero: 5,
        titulo: 'Verificación completa',
        descripcion: 'Prueba YouTube con búsqueda de contenido sensible — bloqueado. Netflix — perfil infantil sin acceso a contenido +18.',
      },
    ],
    verificacion: 'Contenido bloqueado en todas las plataformas. No se pueden instalar apps no autorizadas.',
    erroresFrecuentes: [
      { problema: 'El menor usa el navegador web de la TV', solucion: 'Bloquea o desinstala el navegador web de la Smart TV si es posible.' },
    ],
  }),

  // ═══════════════════════════════════════
  // TABLET
  // ═══════════════════════════════════════

  cfg("tablet", "wifi-casa", "basico", {
    titulo: 'Protección básica en Tablet (WiFi en casa)',
    resumen: 'Configuración según el sistema de la tablet + control parental básico.',
    tiempoEstimado: '10-15 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLEAN_BROWSING],
    pasos: [
      {
        id: 'tab-wc-b1',
        numero: 1,
        titulo: 'Identificar el sistema de la tablet',
        descripcion: 'Las tablets pueden ser iPad (iOS), Android o Amazon Fire. Cada una se configura de forma diferente.',
        notas: ['iPad: sigue las instrucciones de iPhone', 'Android: sigue las instrucciones de Android', 'Fire Tablet: Amazon Kids'],
      },
      {
        id: 'tab-wc-b2',
        numero: 2,
        titulo: 'Configurar DNS según el sistema',
        descripcion: 'iPad: DNS en red WiFi (Ajustes > Wi-Fi > Configurar DNS). Android: DNS privado (Ajustes > Red > DNS privado). Fire: solo posible a través del router.',
      },
      {
        id: 'tab-wc-b3',
        numero: 3,
        titulo: 'Activar control parental',
        descripcion: 'iPad: Tiempo de Uso. Android: Family Link. Fire: Amazon Kids.',
      },
    ],
    verificacion: 'DNS configurado. Control parental activo según el sistema.',
    erroresFrecuentes: [
      { problema: 'Tengo una Amazon Fire Tablet', solucion: 'Fire Tablet no permite cambiar DNS fácilmente. Configura DNS en el router o usa Amazon Kids para restricciones de contenido.' },
    ],
  }),
  cfg("tablet", "wifi-casa", "recomendado", {
    titulo: 'Protección recomendada en Tablet (WiFi en casa)',
    resumen: 'DNS + control parental + límites de tiempo + solo apps aprobadas.',
    tiempoEstimado: '15-20 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLEAN_BROWSING],
    pasos: [
      {
        id: 'tab-wc-r1',
        numero: 1,
        titulo: 'DNS + control parental completo',
        descripcion: 'Configura DNS según el sistema + control parental nativo con todas las restricciones.',
      },
      {
        id: 'tab-wc-r2',
        numero: 2,
        titulo: 'Límites de tiempo para niños pequeños',
        descripcion: 'Para tablets de niños pequeños (3-7 años): 30-60 minutos al día. Bloqueo automático al alcanzar el límite.',
      },
      {
        id: 'tab-wc-r3',
        numero: 3,
        titulo: 'Solo apps aprobadas',
        descripcion: 'Configura el control parental para que SOLO las apps aprobadas por el adulto se puedan usar. Ideal para niños pequeños.',
      },
    ],
    verificacion: 'Niño solo puede usar apps aprobadas. Tiempo limitado. Contenido filtrado.',
    erroresFrecuentes: [
      { problema: 'El niño encuentra contenido inapropiado en YouTube Kids', solucion: 'YouTube Kids tiene su propia configuración de filtros. Revísala en la app.' },
    ],
  }),
  cfg("tablet", "wifi-casa", "avanzado", {
    titulo: 'Protección avanzada en Tablet (WiFi en casa)',
    resumen: 'Triple DNS + control parental máximo + modo niño + revisión semanal.',
    tiempoEstimado: '20-30 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLEAN_BROWSING, CLOUDFLARE_FAMILY],
    pasos: [
      {
        id: 'tab-wc-a1',
        numero: 1,
        titulo: 'DNS en router + dispositivo + DoH',
        descripcion: 'Triple capa: router con DNS4.EU, tablet con DNS privado (Android) o perfil (iPad), navegador con DoH.',
      },
      {
        id: 'tab-wc-a2',
        numero: 2,
        titulo: 'Control parental máximo + modo niño',
        descripcion: 'Activa el modo niño (Amazon Kids, Family Link, Tiempo de Uso) con restricciones totales.',
      },
      {
        id: 'tab-wc-a3',
        numero: 3,
        titulo: 'Bloquear compras y descargas',
        descripcion: 'Desactiva las compras in-app y bloquea descargas de apps sin aprobación.',
      },
      {
        id: 'tab-wc-a4',
        numero: 4,
        titulo: 'Revisión semanal',
        descripcion: 'Las tablets son a menudo el primer dispositivo digital. Revisa semanalmente el uso y ajusta restricciones.',
      },
    ],
    verificacion: 'Protección completa. El niño no puede salirse del entorno controlado.',
    erroresFrecuentes: [
      { problema: 'El niño sabe la contraseña del control parental', solucion: 'Cambia inmediatamente la contraseña. No la compartas con el niño.' },
    ],
  }),
  cfg("tablet", "wifi-datos", "basico", {
    titulo: 'Protección básica Tablet (WiFi + datos móviles)',
    resumen: 'DNS en WiFi + protección básica para datos móviles.',
    tiempoEstimado: '10-15 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLOUDFLARE_FAMILY],
    pasos: [
      {
        id: 'tab-dual-b1',
        numero: 1,
        titulo: 'DNS en WiFi de casa',
        descripcion: 'Configura DNS en la red WiFi de casa según el sistema de la tablet.',
      },
      {
        id: 'tab-dual-b2',
        numero: 2,
        titulo: 'Protección con datos móviles',
        descripcion: 'iPad: necesita perfil DNS para datos móviles. Android: DNS privado funciona también en datos. Fire: solo router.',
      },
      {
        id: 'tab-dual-b3',
        numero: 3,
        titulo: 'Verificar en ambas redes',
        descripcion: 'Prueba el bloqueo en WiFi y luego con datos móviles.',
      },
    ],
    verificacion: 'Bloqueo en WiFi y datos móviles.',
    erroresFrecuentes: [
      { problema: 'La tablet 4G no protege los datos móviles', solucion: 'iPad: instala perfil DNS. Android: usa DNS privado (funciona en 4G/5G). Fire: solo router.' },
    ],
  }),
  cfg("tablet", "wifi-datos", "recomendado", {
    titulo: 'Protección recomendada Tablet (WiFi + datos móviles)',
    resumen: 'Router + dispositivo + control parental completo en ambas redes.',
    tiempoEstimado: '20-25 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLEAN_BROWSING],
    pasos: [
      {
        id: 'tab-dual-r1',
        numero: 1,
        titulo: 'DNS en router (WiFi) + DNS en dispositivo (datos)',
        descripcion: 'Router con DNS4.EU para WiFi. Tablet con DNS privado (Android) o perfil (iPad) para datos móviles.',
      },
      {
        id: 'tab-dual-r2',
        numero: 2,
        titulo: 'Control parental completo en ambas redes',
        descripcion: 'Family Link / Tiempo de Uso / Amazon Kids funcionando independientemente de la red.',
      },
      {
        id: 'tab-dual-r3',
        numero: 3,
        titulo: 'Límites de tiempo y contenido',
        descripcion: 'Configura límites de tiempo y restricciones de contenido. Funcionan en WiFi y datos.',
      },
    ],
    verificacion: 'Protección consistente tanto en WiFi como en datos móviles.',
    erroresFrecuentes: [
      { problema: 'Los límites de tiempo no se aplican con datos móviles', solucion: 'Los límites de tiempo de Family Link / Tiempo de Uso funcionan en cualquier conexión. Verifica la configuración.' },
    ],
  }),
  cfg("tablet", "wifi-datos", "avanzado", {
    titulo: 'Protección avanzada Tablet (WiFi + datos)',
    resumen: 'Doble DNS + control parental máximo + modo niño + solo apps aprobadas.',
    tiempoEstimado: '25-30 minutos',
    dnsRecomendado: [CLEAN_BROWSING, CLOUDFLARE_FAMILY],
    pasos: [
      {
        id: 'tab-dual-a1',
        numero: 1,
        titulo: 'Doble DNS + control parental máximo',
        descripcion: 'Router + dispositivo con distintos proveedores DNS. Control parental al máximo.',
      },
      {
        id: 'tab-dual-a2',
        numero: 2,
        titulo: 'Bloqueo de navegadores alternativos',
        descripcion: 'Restringe el uso de navegadores que puedan saltarse el DNS del sistema (Firefox con DoH propio).',
      },
      {
        id: 'tab-dual-a3',
        numero: 3,
        titulo: 'Solo apps aprobadas + modo niño',
        descripcion: 'La tablet solo muestra apps aprobadas. Sin acceso a tienda de apps ni navegador web.',
      },
    ],
    verificacion: 'Protección completa en cualquier red. El niño no puede salirse del entorno.',
    erroresFrecuentes: [

    ],
  }),
  cfg("tablet", "dispositivo-personal", "basico", {
    titulo: 'Protección básica Tablet personal del menor',
    resumen: 'DNS + control parental según la edad del menor.',
    tiempoEstimado: '10-15 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLEAN_BROWSING],
    pasos: [
      {
        id: 'tab-own-b1',
        numero: 1,
        titulo: 'Configurar DNS + control parental',
        descripcion: 'DNS según sistema + Family Link / Tiempo de Uso / Amazon Kids activado.',
      },
      {
        id: 'tab-own-b2',
        numero: 2,
        titulo: 'Crear perfil infantil',
        descripcion: 'Configura un perfil infantil con apps aprobadas, límites de tiempo y contenido filtrado.',
      },
    ],
    verificacion: 'Perfil infantil configurado con restricciones básicas.',
    erroresFrecuentes: [
      { problema: 'El niño pequeño desbloquea ajustes', solucion: 'Activa el modo guiado o fijar pantalla para que no pueda salir de la app activa.' },
    ],
  }),
  cfg("tablet", "dispositivo-personal", "recomendado", {
    titulo: 'Protección recomendada Tablet personal del menor',
    resumen: 'DNS + control parental + límites por edad + sin compras ni navegador.',
    tiempoEstimado: '15-25 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLEAN_BROWSING],
    pasos: [
      {
        id: 'tab-own-r1',
        numero: 1,
        titulo: 'DNS + control parental completo',
        descripcion: 'DNS en router y/o dispositivo + control parental con todas las restricciones.',
      },
      {
        id: 'tab-own-r2',
        numero: 2,
        titulo: 'Límites de edad y contenido',
        descripcion: 'Configura restricciones según la edad del menor (3-5 años: solo contenido preescolar, 6-9: contenido educativo).',
      },
      {
        id: 'tab-own-r3',
        numero: 3,
        titulo: 'Sin acceso a compras ni navegador',
        descripcion: 'Bloquea compras in-app, descargas sin aprobación y el acceso al navegador web.',
      },
    ],
    verificacion: 'El menor solo puede usar apps adecuadas para su edad. Sin riesgo de compras accidentales.',
    erroresFrecuentes: [
      { problema: 'El menor descarga apps sin permiso', solucion: 'Bloquea las descargas en Family Link / Tiempo de Uso / Amazon Kids. Requiere aprobación del adulto.' },
    ],
  }),
  cfg("tablet", "dispositivo-personal", "avanzado", {
    titulo: 'Protección avanzada Tablet personal del menor',
    resumen: 'Máxima protección + modo monoaplicación + revisión semanal.',
    tiempoEstimado: '20-30 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLEAN_BROWSING, CLOUDFLARE_FAMILY],
    pasos: [
      {
        id: 'tab-own-a1',
        numero: 1,
        titulo: 'Máxima protección: DNS triple + control parental total',
        descripcion: 'Router + dispositivo + DoH. Control parental con todas las opciones activadas.',
      },
      {
        id: 'tab-own-a2',
        numero: 2,
        titulo: 'Modo monoaplicación (opcional)',
        descripcion: 'Algunas tablets permiten fijar la pantalla a una sola app. Ideal para niños muy pequeños (3-4 años).',
        notas: ['Android: Fijar pantalla en Ajustes > Seguridad', 'iPad: Acceso guiado en Ajustes > Accesibilidad'],
      },
      {
        id: 'tab-own-a3',
        numero: 3,
        titulo: 'Revisión semanal del uso',
        descripcion: 'La tablet es a menudo el primer dispositivo. Revisa semanalmente el tiempo de uso, apps usadas y contenido.',
      },
    ],
    verificacion: 'Protección absoluta. Ideal para niños pequeños (3-7 años).',
    erroresFrecuentes: [

    ],
  }),

  // ═══════════════════════════════════════
  // CHROMEBOOK — remaining contexts
  // ═══════════════════════════════════════

  cfg("chromebook", "wifi-casa", "basico", {
    titulo: 'Protección básica en Chromebook (WiFi en casa)',
    resumen: 'DNS privado + Family Link básico.',
    tiempoEstimado: '10-15 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLOUDFLARE_FAMILY],
    pasos: [
      {
        id: 'cb-wc-b1',
        numero: 1,
        titulo: 'Configurar DNS privado en ChromeOS',
        descripcion: "**Ajustes > Red > WiFi > DNS privado**. Selecciona 'Nombre del host del proveedor' e introduce la dirección.",
        notas: ['dns4.eu', 'family-filter-dns.cleanbrowsing.org'],
      },
      {
        id: 'cb-wc-b2',
        numero: 2,
        titulo: 'Family Link básico',
        descripcion: 'Vincula la cuenta del menor a Family Link desde el dispositivo del adulto. Configura filtros de contenido básicos.',
      },
    ],
    verificacion: 'DNS configurado. Family Link activo. Verifica bloqueo desde Chrome.',
    erroresFrecuentes: [
      { problema: 'El Chromebook está gestionado por el colegio', solucion: 'Si el colegio gestiona el dispositivo, no podrás cambiar DNS ni instalar Family Link. Consulta con el centro.' },
    ],
  }),
  cfg("chromebook", "wifi-casa", "avanzado", {
    titulo: 'Protección avanzada en Chromebook (WiFi en casa)',
    resumen: 'DNS privado + Family Link máximo + bloqueo de modo invitado + supervisión.',
    tiempoEstimado: '20-30 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLEAN_BROWSING, CLOUDFLARE_FAMILY],
    pasos: [
      {
        id: 'cb-wc-a1',
        numero: 1,
        titulo: 'DNS privado + Family Link completo',
        descripcion: 'DNS privado configurado + Family Link con todas las restricciones: filtros, tiempo, apps, compras.',
      },
      {
        id: 'cb-wc-a2',
        numero: 2,
        titulo: 'Bloquear modo invitado',
        descripcion: 'En Family Link, bloquea el modo invitado de ChromeOS. Así el menor no puede navegar sin restricciones.',
      },
      {
        id: 'cb-wc-a3',
        numero: 3,
        titulo: 'Restringir cambios de configuración',
        descripcion: 'Family Link > Ajustes > Restricciones de ChromeOS. Bloquea cambios de DNS y configuración de red.',
      },
      {
        id: 'cb-wc-a4',
        numero: 4,
        titulo: 'Supervisar actividad',
        descripcion: 'Activa los informes de actividad semanales en Family Link. Revisa los sitios visitados.',
      },
    ],
    verificacion: 'Family Link con todas las restricciones. Menor no puede esquivar filtros usando modo invitado.',
    erroresFrecuentes: [
      { problema: 'El menor crea otro perfil de Chrome', solucion: 'Family Link debería bloquear la creación de nuevos perfiles. Verifica en las restricciones de ChromeOS.' },
    ],
  }),
  cfg("chromebook", "varias-redes", "basico", {
    titulo: 'Protección básica Chromebook (varias redes)',
    resumen: 'DNS privado en ChromeOS (funciona en cualquier WiFi).',
    tiempoEstimado: '5-10 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLOUDFLARE_FAMILY],
    pasos: [
      {
        id: 'cb-vr-b1',
        numero: 1,
        titulo: 'DNS privado en ChromeOS',
        descripcion: 'El DNS privado configurado en ChromeOS funciona en TODAS las redes WiFi, no solo en casa.',
      },
      {
        id: 'cb-vr-b2',
        numero: 2,
        titulo: 'Verificar en varias redes',
        descripcion: 'Conecta el Chromebook a otra WiFi (colegio, biblioteca). Verifica que el DNS sigue protegiendo.',
      },
    ],
    verificacion: 'DNS bloqueando en casa y en otra red. Verificado.',
    erroresFrecuentes: [
      { problema: 'El colegio bloquea DNS personalizados', solucion: 'Si la red del colegio bloquea DNS externos, el DNS privado puede no funcionar. Prueba con DoH en Chrome como alternativa.' },
    ],
  }),
  cfg("chromebook", "varias-redes", "recomendado", {
    titulo: 'Protección recomendada Chromebook (varias redes)',
    resumen: 'DNS privado + Family Link completo + bloqueo de modo invitado + verificación multi-red.',
    tiempoEstimado: '20-25 minutos',
    dnsRecomendado: [CLEAN_BROWSING, DNS_FAMILIA_SURF],
    pasos: [
      {
        id: 'cb-vr-r1',
        numero: 1,
        titulo: 'DNS privado + Family Link completo',
        descripcion: 'DNS privado (funciona en todas las redes) + Family Link con todas las restricciones.',
      },
      {
        id: 'cb-vr-r2',
        numero: 2,
        titulo: 'Bloqueo de modo invitado',
        descripcion: 'El menor no puede usar el modo invitado para evitar las restricciones.',
      },
      {
        id: 'cb-vr-r3',
        numero: 3,
        titulo: 'Verificar en 2+ redes',
        descripcion: 'Prueba protección en casa, colegio y otra WiFi. Debe funcionar igual.',
      },
    ],
    verificacion: 'Protección consistente en todas las redes que use el menor.',
    erroresFrecuentes: [

    ],
  }),
  cfg("chromebook", "varias-redes", "avanzado", {
    titulo: 'Protección avanzada Chromebook (varias redes)',
    resumen: 'DNS privado + DoH en Chrome + Family Link máximo + supervisión multi-red.',
    tiempoEstimado: '25-30 minutos',
    dnsRecomendado: [CLEAN_BROWSING, CLOUDFLARE_FAMILY, DNS_FAMILIA_SURF],
    pasos: [
      {
        id: 'cb-vr-a1',
        numero: 1,
        titulo: 'DNS privado + DoH en Chrome',
        descripcion: 'ChromeOS DNS privado + DNS seguro en Chrome como capa adicional.',
      },
      {
        id: 'cb-vr-a2',
        numero: 2,
        titulo: 'Family Link máximo + políticas',
        descripcion: 'Todas las restricciones de Family Link activadas. Bloqueo total de cambios de configuración.',
      },
      {
        id: 'cb-vr-a3',
        numero: 3,
        titulo: 'Supervisión continua multi-red',
        descripcion: 'Informes de actividad semanales. Verifica que las protecciones funcionan en cualquier red.',
      },
    ],
    verificacion: 'Máxima protección en cualquier red. Supervisión semanal activa.',
    erroresFrecuentes: [

    ],
  }),

  // ═══════════════════════════════════════
  // CONSOLA — remaining contexts
  // ═══════════════════════════════════════

  cfg("consola", "wifi-casa", "basico", {
    titulo: 'Protección básica en consolas',
    resumen: 'DNS en router o manual + control parental básico.',
    tiempoEstimado: '10-15 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLEAN_BROWSING],
    pasos: [
      {
        id: 'con-wc-b1',
        numero: 1,
        titulo: 'Opción A: DNS en el router (recomendado)',
        descripcion: 'Configura el router con DNS familiar. La consola heredará la protección sin necesidad de configurarla manualmente.',
        notas: ['Protege todas las consolas y dispositivos de la red'],
      },
      {
        id: 'con-wc-b2',
        numero: 2,
        titulo: 'Opción B: DNS manual en la consola',
        descripcion: 'Si no puedes cambiar el router, configura DNS manual en los ajustes de red de la consola.',
        notas: ['PS5: Ajustes > Red > Configurar conexión > DNS manual', 'Xbox: Configuración > Red > Configuración avanzada > DNS manual', 'Switch: Configuración > Internet > Cambiar ajustes > DNS manual'],
      },
      {
        id: 'con-wc-b3',
        numero: 3,
        titulo: 'Control parental básico',
        descripcion: 'Activa el control parental en la consola para restringir contenido según la edad del menor.',
      },
    ],
    verificacion: 'Contenido bloqueado por DNS. Control parental activo.',
    erroresFrecuentes: [
      { problema: 'La consola no respeta el DNS del router', solucion: 'Algunas consolas tienen DNS fijo. Configura manualmente el DNS en los ajustes de red de la consola.' },
      { problema: 'El menor juega online con desconocidos', solucion: 'Activa las restricciones de comunicación en los ajustes de control parental de la consola.' },
    ],
  }),
  cfg("consola", "wifi-casa", "avanzado", {
    titulo: 'Protección avanzada en consolas',
    resumen: 'Doble DNS + control parental completo + restricción de comunicación + límites de tiempo.',
    tiempoEstimado: '25-35 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLEAN_BROWSING, CLOUDFLARE_FAMILY],
    pasos: [
      {
        id: 'con-wc-a1',
        numero: 1,
        titulo: 'DNS en router + DNS manual en consola',
        descripcion: 'Doble capa: router con DNS4.EU + DNS manual en la consola con CleanBrowsing.',
      },
      {
        id: 'con-wc-a2',
        numero: 2,
        titulo: 'Control parental completo en todas las consolas',
        descripcion: 'PS5: restricciones PEGI, comunicación online limitada, tiempo de juego. Xbox: app Family Settings con control completo. Switch: app Parental Controls.',
      },
      {
        id: 'con-wc-a3',
        numero: 3,
        titulo: 'Restringir comunicación online',
        descripcion: 'Bloquea el chat de voz y mensajes con desconocidos en todas las consolas.',
        notas: ['PS5: Ajustes > Familia > Restricciones de comunicación', 'Xbox: Configuración > Privacidad > Comunicación', 'Switch: App Parental Controls > Restricciones de comunicación'],
      },
      {
        id: 'con-wc-a4',
        numero: 4,
        titulo: 'Límites de tiempo de juego',
        descripcion: 'Establece límites de tiempo diarios y horarios en cada consola.',
        notas: ['PS5: max 1-2h al día', 'Xbox: límite por app (juegos)', 'Switch: límite por hora de juego'],
      },
      {
        id: 'con-wc-a5',
        numero: 5,
        titulo: 'Revisión mensual',
        descripcion: 'Revisa la actividad mensualmente. Ajusta restricciones según la madurez del menor.',
      },
    ],
    verificacion: 'Contenido bloqueado, comunicación restringida, tiempo limitado. Revisión mensual activa.',
    erroresFrecuentes: [
      { problema: 'El menor juega juegos +18 a pesar del control parental', solucion: 'Verifica que la clasificación PEGI está correctamente configurada. Algunos juegos online pueden no tener PEGI.' },
    ],
  }),

  // ═══════════════════════════════════════
  // KINDLE (no soporta DNS nativo — solo 2 niveles)
  // ═══════════════════════════════════════

  cfg("kindle", "wifi-casa", "basico", {
    titulo: 'Protección básica en Kindle / Fire Tablet',
    resumen: 'DNS en el router + Amazon Kids (Fire Tablet) o control parental (Kindle).',
    tiempoEstimado: '10-15 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLEAN_BROWSING],
    pasos: [
      {
        id: 'kin-wc-b1',
        numero: 1,
        titulo: 'Opción principal: DNS en el router',
        descripcion: 'Kindle y Fire Tablet no permiten cambiar DNS fácilmente. La MEJOR opción es configurar DNS en el router. El Kindle heredará la protección automáticamente.',
        notas: ['Amazon Fire Tablet: Amazon Kids es el control parental nativo'],
      },
      {
        id: 'kin-wc-b2',
        numero: 2,
        titulo: 'Activar Amazon Kids (Fire Tablet)',
        descripcion: 'En Fire Tablet: abre la app **Amazon Kids** y configura un perfil infantil. Selecciona las apps permitidas, establece límites de tiempo y contenido.',
        notas: ['Amazon Kids permite controlar qué apps usa el menor', 'También puedes establecer límites de tiempo y bloquear compras'],
      },
      {
        id: 'kin-wc-b3',
        numero: 3,
        titulo: 'Kindle básico (e-reader)',
        descripcion: 'Los Kindle básicos (e-reader) solo muestran libros de Amazon. El control parental es muy limitado. Activa las restricciones de la tienda Kindle.',
        notas: ['Kindle e-reader: Ajustes > Parental Controls', 'Puedes restringir la navegación web y la tienda'],
      },
    ],
    verificacion: 'DNS protege vía router. Amazon Kids o control parental activo.',
    erroresFrecuentes: [
      { problema: 'Kindle no bloquea contenido inapropiado', solucion: 'Kindle básico (e-reader) tiene filtros limitados. Configura DNS en el router y activa las restricciones parentales de Kindle.' },
      { problema: 'El menor descarga libros sin permiso', solucion: 'Desactiva las compras con 1-click en Ajustes > Cuenta > Configuración de 1-click.' },
    ],
  }),
  cfg("kindle", "wifi-casa", "recomendado", {
    titulo: 'Protección recomendada en Kindle / Fire Tablet',
    resumen: 'DNS en router + Amazon Kids completo + bloqueo de navegador + compras desactivadas.',
    tiempoEstimado: '15-20 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLEAN_BROWSING],
    pasos: [
      {
        id: 'kin-wc-r1',
        numero: 1,
        titulo: 'DNS en el router (medida principal)',
        descripcion: 'Configura el router con DNS4.EU o CleanBrowsing. El Kindle/Fire Tablet se beneficia automáticamente.',
      },
      {
        id: 'kin-wc-r2',
        numero: 2,
        titulo: 'Amazon Kids + control completo',
        descripcion: 'Fire Tablet: Amazon Kids con todas las restricciones. Kindle: control parental + restricciones de tienda.',
      },
      {
        id: 'kin-wc-r3',
        numero: 3,
        titulo: 'Restringir el navegador Silk',
        descripcion: 'Fire Tablet: en Amazon Kids, bloquea el acceso al navegador Silk. Así el menor no puede navegar libremente.',
        notas: ['El navegador Silk puede saltarse los filtros de contenido si el DNS no está configurado'],
      },
      {
        id: 'kin-wc-r4',
        numero: 4,
        titulo: 'Desactivar compras con 1-click',
        descripcion: 'Kindle y Fire Tablet: desactiva las compras con 1-click para evitar compras accidentales de libros o apps.',
      },
    ],
    verificacion: 'DNS vía router, Amazon Kids con control total, sin compras accidentales, navegador bloqueado.',
    erroresFrecuentes: [
      { problema: 'Amazon Kids tiene contenido limitado', solucion: 'Puedes añadir contenido aprobado manualmente desde la biblioteca de Amazon Kids.' },
    ],
  }),
  cfg("kindle", "dispositivo-personal", "basico", {
    titulo: 'Protección básica Kindle/Fire personal del menor',
    resumen: 'DNS en router + perfil infantil básico.',
    tiempoEstimado: '10-15 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLEAN_BROWSING],
    pasos: [
      {
        id: 'kin-own-b1',
        numero: 1,
        titulo: 'DNS en el router',
        descripcion: 'Protege el dispositivo a través del router. Es la única forma fiable de filtrado DNS para Kindle/Fire.',
      },
      {
        id: 'kin-own-b2',
        numero: 2,
        titulo: 'Amazon Kids o control parental',
        descripcion: 'Fire Tablet: perfil infantil con apps aprobadas. Kindle: control parental de tienda.',
      },
    ],
    verificacion: 'Perfil infantil configurado. DNS protege toda la red.',
    erroresFrecuentes: [
      { problema: 'Amazon Kids no está disponible en mi región', solucion: 'Crea una cuenta de Amazon de EE.UU. o Reino Unido. Amazon Kids está disponible en esos mercados.' },
    ],
  }),
  cfg("kindle", "dispositivo-personal", "recomendado", {
    titulo: 'Protección recomendada Kindle/Fire personal del menor',
    resumen: 'DNS en router + Amazon Kids completo + sin navegador + compras bloqueadas + supervisión.',
    tiempoEstimado: '15-25 minutos',
    dnsRecomendado: [DNS_FAMILIA_SURF, CLEAN_BROWSING],
    pasos: [
      {
        id: 'kin-own-r1',
        numero: 1,
        titulo: 'DNS en router + Amazon Kids completo',
        descripcion: 'Router con DNS4.EU + Amazon Kids con todas las restricciones.',
      },
      {
        id: 'kin-own-r2',
        numero: 2,
        titulo: 'Sin navegador + solo contenido apropiado',
        descripcion: 'Bloquea el navegador Silk. Configura el filtro de edad para contenido (libros, apps, videos).',
      },
      {
        id: 'kin-own-r3',
        numero: 3,
        titulo: 'Compras bloqueadas + supervisión',
        descripcion: 'Desactiva compras. Activa notificaciones para cualquier intento de compra.',
      },
    ],
    verificacion: 'Protección completa: DNS vía router, Amazon Kids, sin compras, sin navegador.',
    erroresFrecuentes: [
      { problema: 'El menor sale de Amazon Kids sin permiso', solucion: 'Configura un PIN de salida en Amazon Kids. Sin el PIN, el menor no puede salir del entorno infantil.' },
    ],
  }),
]

// ── HELPER: FIND CONFIG ──────────────────────────────────────

export function findConfig(
  device: DeviceType,
  network: NetworkContext,
  level: ProtectionLevel
): DeviceConfig | null {
  // 1. Exact match (device + network + level)
  const exact = knowledgeBase.find(
    (c) => c.device === device && c.network === network && c.level === level
  )
  if (exact) return exact

  // 2. Fallback: same device + same network (closest level)
  const sameNetwork = knowledgeBase.filter(
    (c) => c.device === device && c.network === network
  )
  if (sameNetwork.length > 0) {
    const levels: ProtectionLevel[] = ["recomendado", "basico", "avanzado"]
    for (const l of levels) {
      const found = sameNetwork.find((c) => c.level === l)
      if (found) return found
    }
  }

  // 3. Fallback: same device + safe fallback — only use router config (protects all)
  const routerConfig = knowledgeBase.find(
    (c) => c.device === "router" && c.network === "wifi-casa" && c.level === "recomendado"
  )
  if (routerConfig) return routerConfig

  // 4. Last resort: any config with same network
  const sameNetAny = knowledgeBase.filter((c) => c.network === network)
  if (sameNetAny.length > 0) return sameNetAny[0]

  return null
}

export function getScenariosByDevice(device: DeviceType): DeviceConfig[] {
  return knowledgeBase.filter((c) => c.device === device)
}

export function getScenariosByNetwork(network: NetworkContext): DeviceConfig[] {
  return knowledgeBase.filter((c) => c.network === network)
}

export function getAllDeviceTypes(): DeviceType[] {
  const types = new Set(knowledgeBase.map((c) => c.device))
  return Array.from(types)
}

export function getAllNetworkContexts(): NetworkContext[] {
  const types = new Set(knowledgeBase.map((c) => c.network))
  return Array.from(types)
}

export function getAllProtectionLevels(): ProtectionLevel[] {
  const types = new Set(knowledgeBase.map((c) => c.level))
  return Array.from(types)
}
