import type { DeviceType, NetworkContext, ProtectionLevel, ConfiguratorStep } from "@/lib/types"

export const deviceTypes: {
  id: DeviceType
  label: string
  icon: string
  descripcion: string
}[] = [
  {
    id: "android",
    label: "Android",
    icon: "Smartphone",
    descripcion:
      "Google Family Link + DNS privado. Control parental nativo y filtrado de red.",
  },
  {
    id: "iphone",
    label: "iPhone / iPad",
    icon: "Smartphone",
    descripcion:
      "Tiempo de Uso + En Familia + DNS personalizado. Configuración robusta pero sencilla.",
  },
  {
    id: "windows",
    label: "Windows",
    icon: "Monitor",
    descripcion:
      "Microsoft Family Safety + DNS manual. Ideal para portátiles y sobremesas compartidos.",
  },
  {
    id: "macos",
    label: "macOS",
    icon: "Monitor",
    descripcion:
      "En Familia + Tiempo de Uso + DNS manual. Protección integrada en el ecosistema Apple.",
  },
  {
    id: "router",
    label: "Router",
    icon: "Router",
    descripcion:
      "Filtro DNS a nivel de red. Protege todos los dispositivos que se conectan en casa.",
  },
  {
    id: "navegador",
    label: "Navegador",
    icon: "Globe",
    descripcion:
      "DNS-over-HTTPS en Chrome, Edge o Firefox. Protección rápida sin instalar nada.",
  },
]

export const networkContexts: {
  id: NetworkContext
  label: string
  descripcion: string
  detalle: string
}[] = [
  {
    id: "wifi-casa",
    label: "Wi-Fi de casa",
    descripcion: "Protege toda la red configurando el router.",
    detalle:
      "El dispositivo solo usa Wi-Fi del hogar. Configurar el router protege también a visitas y dispositivos sin control parental.",
  },
  {
    id: "datos-moviles",
    label: "Datos móviles",
    descripcion: "DNS privado o perfil móvil para filtrar fuera de casa.",
    detalle:
      "El menor usa datos del operador. Es imprescindible activar DNS privado (Android) o un perfil DNS (iOS).",
  },
  {
    id: "wifi-datos",
    label: "Wi-Fi y datos móviles",
    descripcion: "Doble protección: router + DNS en el dispositivo.",
    detalle:
      "El dispositivo alterna entre redes. Configura DNS en el router y también DNS privado en el dispositivo como respaldo.",
  },
  {
    id: "dispositivo-compartido",
    label: "Dispositivo compartido",
    descripcion: "Perfiles separados y restricciones por usuario.",
    detalle:
      "Varias personas usan el mismo dispositivo. Crea perfiles de usuario y bloquea cambios de configuración.",
  },
  {
    id: "dispositivo-personal",
    label: "Dispositivo personal",
    descripcion: "Control parental completo sobre el dispositivo del menor.",
    detalle:
      "El menor es el único usuario. Puedes aplicar Family Link, Tiempo de Uso o Family Safety sin afectar a otros.",
  },
]

export const protectionLevels: {
  id: ProtectionLevel
  label: string
  descripcion: string
  detalle: string
  color: string
}[] = [
  {
    id: "basico",
    label: "Básico",
    descripcion: "Protección mínima. Ideal como primer paso o para adolescentes maduros.",
    detalle:
      "Filtro DNS + límites básicos de contenido. No bloquea apps ni controla tiempos de uso.",
    color: "success",
  },
  {
    id: "recomendado",
    label: "Recomendado",
    descripcion: "Equilibrio entre protección y autonomía. Adecuado para la mayoría de familias.",
    detalle:
      "DNS + control parental (Family Link, Tiempo de Uso o Family Safety) + límites de tiempo y compras.",
    color: "brand",
  },
  {
    id: "avanzado",
    label: "Avanzado",
    descripcion: "Máxima protección. Recomendado para menores de 12 años o situaciones de riesgo.",
    detalle:
      "Todas las capas anteriores + bloqueo de navegadores alternativos, aprobación de apps y restricciones máximas.",
    color: "accent",
  },
]

export const configuratorSteps: ConfiguratorStep[] = [
  {
    dispositivo: "android",
    contexto: "wifi-casa",
    nivel: "basico",
    pasosRecomendados: [
      "Configurar DNS privado en Android",
      "Activar filtros básicos en Play Store",
    ],
    checklist: [
      "DNS privado configurado y verificado",
      "Filtros de contenido en Play Store activados",
    ],
    validacion:
      "Intenta acceder a un sitio bloqueado. Debería mostrar error de conexión.",
  },
  {
    dispositivo: "android",
    contexto: "wifi-casa",
    nivel: "recomendado",
    pasosRecomendados: [
      "Configurar DNS privado en Android",
      "Configurar DNS en el router (protege toda la red)",
      "Instalar y configurar Google Family Link",
      "Establecer límites de tiempo y aprobación de compras",
    ],
    checklist: [
      "DNS privado configurado en el dispositivo",
      "DNS del router configurado",
      "Family Link vinculado y configurado",
      "Límites de tiempo establecidos",
      "Aprobación de compras activada",
    ],
    validacion:
      "Verifica que el sitio bloqueado no carga. Comprueba que Family Link muestra el informe de actividad.",
  },
  {
    dispositivo: "android",
    contexto: "wifi-casa",
    nivel: "avanzado",
    pasosRecomendados: [
      "Configurar DNS en el router (protege toda la red)",
      "Configurar DNS privado en Android como respaldo",
      "Instalar y configurar Google Family Link con restricciones máximas",
      "Bloquear instalación de navegadores alternativos",
      "Configurar límites de tiempo estrictos",
      "Activar aprobación para todas las descargas",
    ],
    checklist: [
      "DNS del router configurado y verificado",
      "DNS privado configurado como respaldo",
      "Family Link con restricciones máximas",
      "Navegadores alternativos bloqueados",
      "Límites de tiempo estrictos configurados",
      "Aprobación de descargas activada",
    ],
    validacion:
      "Intenta instalar una app no permitida. Verifica que se bloquea. Intenta acceder a contenido bloqueado desde cualquier app.",
  },
  {
    dispositivo: "android",
    contexto: "datos-moviles",
    nivel: "recomendado",
    pasosRecomendados: [
      "Configurar DNS privado en Android (funciona en datos móviles)",
      "Verificar que el operador no bloquea DNS privado",
      "Instalar y configurar Google Family Link",
      "Establecer límites de tiempo y aprobación de compras",
    ],
    checklist: [
      "DNS privado configurado y funciona en datos móviles",
      "Family Link vinculado y configurado",
      "Límites de tiempo establecidos",
      "Aprobación de compras activada",
    ],
    validacion:
      "Desactiva Wi-Fi y verifica que el DNS sigue funcionando. Intenta acceder a contenido bloqueado con datos móviles.",
  },
  {
    dispositivo: "iphone",
    contexto: "wifi-casa",
    nivel: "recomendado",
    pasosRecomendados: [
      "Configurar DNS personalizado en Wi-Fi",
      "Configurar DNS en el router (protege toda la red)",
      "Configurar En Familia y Tiempo de Uso",
      "Establecer restricciones de contenido y límites de apps",
      "Bloquear compras en App Store",
    ],
    checklist: [
      "DNS personalizado configurado en Wi-Fi",
      "DNS del router configurado",
      "En Familia configurado",
      "Tiempo de Uso activo con código del adulto",
      "Restricciones de contenido activas",
      "Compras bloqueadas",
    ],
    validacion:
      "Intenta acceder a contenido para adultos. Debería mostrar 'Sitio web bloqueado'. Verifica que los límites de apps funcionan.",
  },
  {
    dispositivo: "iphone",
    contexto: "datos-moviles",
    nivel: "recomendado",
    pasosRecomendados: [
      "Instalar perfil de DNS personalizado (para datos móviles)",
      "Configurar En Familia y Tiempo de Uso",
      "Establecer restricciones de contenido y límites de apps",
      "Bloquear cambios de configuración en Tiempo de Uso",
    ],
    checklist: [
      "Perfil de DNS instalado y activo",
      "En Familia configurado",
      "Tiempo de Uso activo con código del adulto",
      "Cambios de cuenta bloqueados",
      "Restricciones de contenido activas",
    ],
    validacion:
      "Desactiva Wi-Fi y verifica que el DNS sigue funcionando. Intenta modificar la configuración de red (debería estar bloqueada).",
  },
  {
    dispositivo: "windows",
    contexto: "wifi-casa",
    nivel: "recomendado",
    pasosRecomendados: [
      "Configurar DNS manual en la conexión de red",
      "Configurar DNS en el router (protege toda la red)",
      "Crear cuenta Microsoft para el menor",
      "Configurar Microsoft Family Safety",
      "Establecer límites de tiempo y filtros de contenido",
      "Asegurar que el menor usa Microsoft Edge",
    ],
    checklist: [
      "DNS manual configurado en Windows",
      "DNS del router configurado",
      "Cuenta Microsoft del menor creada y vinculada",
      "Family Safety configurado",
      "Límites de tiempo establecidos",
      "El menor usa Edge (no otros navegadores)",
    ],
    validacion:
      "Intenta acceder a contenido bloqueado en Edge. Verifica que el límite de tiempo funciona correctamente.",
  },
  {
    dispositivo: "macos",
    contexto: "wifi-casa",
    nivel: "recomendado",
    pasosRecomendados: [
      "Configurar DNS manual en la conexión de red",
      "Configurar DNS en el router (protege toda la red)",
      "Configurar En Familia",
      "Configurar Tiempo de Uso con restricciones",
      "Bloquear cambios de configuración",
    ],
    checklist: [
      "DNS manual configurado en macOS",
      "DNS del router configurado",
      "En Familia configurado",
      "Tiempo de Uso activo con código del adulto",
      "Cambios de cuenta bloqueados",
    ],
    validacion:
      "Intenta acceder a contenido para adultos en Safari. Verifica que los límites de apps funcionan.",
  },
  {
    dispositivo: "router",
    contexto: "wifi-casa",
    nivel: "recomendado",
    pasosRecomendados: [
      "Acceder al panel del router",
      "Cambiar DNS a 145.102.6.25 y 145.102.6.26",
      "Reiniciar el router",
      "Reconectar todos los dispositivos",
      "Validar con dnsleaktest.com",
    ],
    checklist: [
      "DNS del router cambiados correctamente",
      "Router reiniciado",
      "Dispositivos reconectados",
      "Validación en dnsleaktest.com exitosa",
    ],
    validacion:
      "Desde cualquier dispositivo, visita dnsleaktest.com. Los DNS mostrados deben ser 145.102.6.25 y 145.102.6.26.",
  },
  {
    dispositivo: "navegador",
    contexto: "wifi-casa",
    nivel: "basico",
    pasosRecomendados: [
      "Activar DNS seguro en Chrome/Edge/Firefox",
      "Introducir URL del proveedor: https://dns.familia.surf/dns-query",
      "Verificar con dnsleaktest.com",
    ],
    checklist: [
      "DNS seguro activado en el navegador",
      "URL del proveedor introducida correctamente",
      "Validación en dnsleaktest.com exitosa",
    ],
    validacion:
      "Intenta acceder a un sitio bloqueado. Debería mostrar error de conexión.",
  },
]

export function getRecommendedSteps(
  dispositivo: DeviceType,
  contexto: NetworkContext,
  nivel: ProtectionLevel
): ConfiguratorStep | undefined {
  return configuratorSteps.find(
    (s) =>
      s.dispositivo === dispositivo &&
      s.contexto === contexto &&
      s.nivel === nivel
  )
}
