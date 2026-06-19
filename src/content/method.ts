import type { MethodLayer, AgeTransition } from "@/lib/types"

export const methodLayers: MethodLayer[] = [
  {
    id: "dns",
    titulo: "Capa 1: DNS de protección",
    subtitulo: "Filtrado a nivel de red",
    descripcion:
      "El DNS (Sistema de Nombres de Dominio) es la agenda telefónica de Internet. Al configurar un DNS de protección, bloqueamos el acceso a dominios maliciosos, pornográficos, de apuestas y violentos antes de que lleguen al dispositivo.",
    queHace: [
      "Bloquea dominios con malware, phishing y ransomware",
      "Filtra contenido pornográfico y violento a nivel de red",
      "Impide acceso a sitios de apuestas online",
      "Protege todos los dispositivos conectados a la red",
      "Funciona de forma transparente, sin instalar apps",
    ],
    queNoHace: [
      "No controla el tiempo de uso de aplicaciones",
      "No filtra contenido dentro de apps instaladas",
      "No sustituye la supervisión parental directa",
      "No bloquea contenido en apps de mensajería cifrada",
      "No reemplaza la educación digital del menor",
    ],
    dondeSeConfigura: [
      "En el router doméstico (protege toda la red)",
      "En cada dispositivo individualmente (DNS privado)",
      "En el navegador (DNS seguro / DoH)",
    ],
    icono: "Wifi",
  },
  {
    id: "control-parental",
    titulo: "Capa 2: Control parental",
    subtitulo: "Supervisión y acompañamiento",
    descripcion:
      "El control parental complementa al DNS añadiendo gestión de tiempos, restricciones de aplicaciones, límites de compras y supervisión adaptada a cada edad. Es la capa que permite acompañar el crecimiento digital del menor.",
    queHace: [
      "Establece límites de tiempo de uso por app y por franja horaria",
      "Restringe la instalación de aplicaciones no adecuadas",
      "Bloquea compras dentro de aplicaciones",
      "Filtra contenido por edad en tiendas de apps",
      "Permite supervisar la actividad digital básica",
      "Facilita acuerdos de uso claros y objetivos",
    ],
    queNoHace: [
      "No garantiza una protección total si no se combina con diálogo",
      "No sustituye la educación en valores digitales",
      "No elimina la necesidad de acompañamiento humano",
      "No es un sistema de vigilancia encubierta",
      "No funciona correctamente si el menor conoce las contraseñas",
    ],
    dondeSeConfigura: [
      "Google Family Link (Android)",
      "En Familia + Tiempo de Uso (iOS/iPadOS)",
      "Microsoft Family Safety (Windows)",
      "Tiempo de Uso (macOS)",
    ],
    icono: "Smartphone",
  },
]

export const vpnExplanation = {
  titulo: "Por qué no empezamos con VPN",
  contenido: [
    "Una VPN (Red Privada Virtual) cifra el tráfico y oculta la dirección IP, pero no es su función principal filtrar contenido inadecuado para menores.",
    "Muchas VPNs gratuitas pueden recopilar datos del usuario, lo que las convierte en un riesgo adicional para la privacidad de los menores.",
    "Las VPNs añadiden complejidad innecesaria cuando el objetivo es la protección de contenidos, no el anonimato o el acceso a contenido geobloqueado.",
    "El DNS de protección es más sencillo de configurar, más rápido (no cifra todo el tráfico) y más adecuado para el propósito de filtrado de contenidos.",
    "En fases posteriores, cuando el menor necesite herramientas de privacidad para su autonomía digital, se puede valorar el uso de VPN con supervisión.",
  ],
  razonPrincipal:
    "El DNS de protección resuelve el 80% del problema de exposición con el 20% de la complejidad técnica.",
}

export const ageTransitions: AgeTransition[] = [
  {
    rango: "0-6",
    titulo: "Primera infancia (0-6 años)",
    descripcion:
      "Control total del entorno digital. El adulto elige qué contenido, cuándo y cuánto tiempo.",
    filtros: "DNS estricto + control parental máximo + sin acceso autónomo",
    criterio: "El adulto ejerce de filtro principal. El dispositivo es del adulto.",
    acompanamiento:
      "Uso compartido. El adulto siempre presente. El dispositivo es una herramienta del adulto que se presta.",
  },
  {
    rango: "7-11",
    titulo: "Infancia (7-11 años)",
    descripcion:
      "Se amplían gradualmente los permisos. Se introducen las primeras conversaciones sobre lo que ven online.",
    filtros: "DNS estricto + control parental con límites claros + primeras apps supervisadas",
    criterio: "Se empieza a explicar por qué se bloquea cierto contenido. Diálogo inicial.",
    acompanamiento:
      "Revisión conjunta semanal. El adulto acompaña en las primeras exploraciones. Se establecen acuerdos básicos.",
  },
  {
    rango: "12-14",
    titulo: "Adolescencia temprana (12-14 años)",
    descripcion:
      "Transición hacia la autonomía. Los filtros se relajan progresivamente mientras se fortalece el criterio.",
    filtros: "DNS recomendado + control parental con negociación + supervisión por confianza",
    criterio: "Se prioriza el diálogo sobre el bloqueo. Se explican los riesgos reales.",
    acompanamiento:
      "Conversaciones regulares. Interés genuino por lo que hacen online. Acuerdos revisables.",
  },
  {
    rango: "15-17",
    titulo: "Adolescencia tardía (15-17 años)",
    descripcion:
      "Preparación para la vida digital adulta. El criterio personal es el filtro principal.",
    filtros: "DNS básico + sin control parental activo + confianza y responsabilidad",
    criterio: "El joven decide con criterio formado. El adulto es referencia, no vigilante.",
    acompanamiento:
      "Disponibilidad para consultar. Respeto a la privacidad. Espacio para el error con red de apoyo.",
  },
]

export const methodPrinciples = [
  {
    titulo: "Simplicidad ante complejidad",
    descripcion:
      "Un método que cualquier familia puede aplicar sin conocimientos técnicos avanzados.",
  },
  {
    titulo: "Protección progresiva",
    descripcion:
      "La protección se adapta a la madurez del menor, no al revés.",
  },
  {
    titulo: "Filtros + criterio",
    descripcion:
      "Los filtros técnicos son un puente, no el destino. El objetivo es formar criterio propio.",
  },
  {
    titulo: "Acompañamiento real",
    descripcion:
      "Ninguna tecnología sustituye el diálogo, la presencia y el ejemplo de los adultos.",
  },
]
