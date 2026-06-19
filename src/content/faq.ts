import type { FaqItem } from "@/lib/types"

export const faqItems: FaqItem[] = [
  {
    id: "que-es-dns",
    pregunta: "¿Qué es un DNS de protección y cómo funciona?",
    respuesta:
      "El DNS (Sistema de Nombres de Dominio) es como la agenda telefónica de Internet: traduce los nombres de los sitios web (como google.com) a direcciones IP numéricas. Un DNS de protección filtra esas consultas y bloquea el acceso a dominios conocidos por contener malware, pornografía, apuestas o contenido violento. Funciona de forma transparente, sin necesidad de instalar software en cada dispositivo.",
    categoria: "Conceptos básicos",
  },
  {
    id: "es-infalible",
    pregunta: "¿La protección es infalible? ¿Mi hijo no verá nada inapropiado?",
    respuesta:
      "Ningún sistema técnico es infalible. Los filtros DNS bloquean la mayoría del contenido nocivo, pero no el 100%. Un menor con conocimientos técnicos podría encontrar formas de eludirlos. Por eso el método combina dos capas: filtros técnicos (DNS + control parental) y acompañamiento humano (diálogo, educación, ejemplo). El objetivo final no es crear una burbuja imposible, sino formar criterio mientras el menor madura.",
    categoria: "Efectividad",
  },
  {
    id: "que-edad",
    pregunta: "¿A partir de qué edad debería aplicar este método?",
    respuesta:
      "Lo antes posible. Cuanto antes se establezcan los filtros y los hábitos digitales saludables, mejor. Para menores de 7 años, se recomienda protección máxima (DNS estricto + control parental total). Entre 7-11 años, se mantienen los filtros pero se introduce el diálogo. A partir de 12 años, los filtros se relajan progresivamente mientras se fortalece el criterio personal. A los 15-17 años, el joven debería tener criterio propio y los filtros técnicos ser mínimos.",
    categoria: "Edades",
  },
  {
    id: "reemplaza-dialogo",
    pregunta: "¿Puedo sustituir el diálogo y la supervisión por estos filtros?",
    respuesta:
      "No. Los filtros técnicos son una herramienta de apoyo, no un sustituto de la educación. Un menor que no entiende por qué ciertas cosas son peligrosas, que no tiene confianza para hablar con sus padres, buscará formas de eludir los filtros. El método Escudo Digital Familiar combina protección técnica (capa 1: DNS, capa 2: control parental) con acompañamiento humano (diálogo, acuerdos, ejemplo). Los filtros son el puente; el destino es formar criterio.",
    categoria: "Filosofía",
  },
  {
    id: "vpn-vs-dns",
    pregunta: "¿Por qué no usar una VPN en lugar de DNS?",
    respuesta:
      "Una VPN (Red Privada Virtual) cifra el tráfico y oculta la dirección IP, pero no es su función principal filtrar contenido. Además, muchas VPNs gratuitas recopilan datos del usuario, lo que las convierte en un riesgo adicional para la privacidad. El DNS de protección es más sencillo, más rápido (no cifra todo el tráfico) y está específicamente diseñado para filtrar contenidos. Si más adelante el menor necesita privacidad para su autonomía digital, se puede valorar una VPN con supervisión.",
    categoria: "Conceptos básicos",
  },
  {
    id: "funciona-todos-dispositivos",
    pregunta: "¿Funciona en todos los dispositivos? ¿Y en datos móviles?",
    respuesta:
      "El DNS configurado en el router protege todos los dispositivos conectados a la red Wi-Fi de casa. Para dispositivos individuales, se puede configurar DNS privado (Android) o DNS personalizado (iOS). En datos móviles, el DNS del router no funciona, pero sí el DNS privado/personal del dispositivo. Algunos operadores móviles bloquean el DNS privado; en ese caso, se puede usar un perfil de configuración o confiar en el control parental de la plataforma (Family Link, Tiempo de Uso).",
    categoria: "Configuración",
  },
  {
    id: "eluden-filtros",
    pregunta: "¿Qué hago si mi hijo logra eludir los filtros?",
    respuesta:
      "Lo primero: no lo tomes como un fracaso. Es una señal de que tu hijo está creciendo y desarrollando habilidades técnicas. En lugar de reforzar los controles, aprovecha para hablar con él. Pregúntale qué intentaba acceder y por qué. Explícale los riesgos reales. Ajusta los filtros si es necesario, pero sobre todo, fortalece el diálogo. El objetivo no es ganar una carrera técnica contra tu hijo, sino que él mismo decida no buscar ese contenido porque entiende por qué es perjudicial.",
    categoria: "Situaciones comunes",
  },
  {
    id: "redes-sociales",
    pregunta: "¿Los filtros bloquean el contenido inapropiado en redes sociales?",
    respuesta:
      "Los filtros DNS no pueden filtrar contenido dentro de apps como Instagram, TikTok o WhatsApp, porque el tráfico está cifrado y el contenido se sirve desde los mismos dominios que el contenido legítimo. Para redes sociales, el control parental (Family Link, Tiempo de Uso) permite restringir por edad la instalación de estas apps y limitar el tiempo de uso. Pero la mejor protección es el diálogo: hablar con tu hijo sobre lo que ve, qué es apropiado compartir, y cómo gestionar la presión social online.",
    categoria: "Redes sociales",
  },
  {
    id: "compartir-dispositivo",
    pregunta: "¿Qué hago si el dispositivo es compartido (tablet familiar)?",
    respuesta:
      "Para dispositivos compartidos, configura un perfil de usuario separado para el menor con restricciones específicas. En Android, usa 'Usuarios múltiples' y configura Family Link para el perfil del menor. En iOS/iPadOS, usa 'Tiempo en pantalla' con restricciones por usuario. Asegúrate de que el menor no tiene acceso a la cuenta del adulto, y viceversa. Revisa periódicamente que las configuraciones se mantienen correctas.",
    categoria: "Configuración",
  },
  {
    id: "cuanto-tiempo",
    pregunta: "¿Cuánto tiempo lleva configurar todo esto?",
    respuesta:
      "La configuración inicial lleva entre 30 minutos y 2 horas, dependiendo del número de dispositivos y del nivel de protección deseado. Configurar el DNS en el router (5-10 min) es lo más rápido y protege toda la red. Luego, dispositivo por dispositivo, configura el control parental (15-20 min cada uno). Lo más importante: dedica 10 minutos semanales a revisar los informes de actividad y ajustar los permisos según la madurez del menor.",
    categoria: "Configuración",
  },
  {
    id: "gratuito",
    pregunta: "¿Es gratuito este método?",
    respuesta:
      "Sí, el método Escudo Digital Familiar es completamente gratuito. Los DNS de protección recomendados son gratuitos. Las herramientas de control parental (Family Link, Tiempo de Uso, Family Safety) son gratuitas y vienen integradas en los sistemas operativos. No necesitas comprar software adicional ni suscripciones. Solo necesitas tiempo para configurar y, sobre todo, tiempo para acompañar.",
    categoria: "Coste",
  },
  {
    id: "colegios",
    pregunta: "¿Puedo aplicar este método en un colegio o institución?",
    respuesta:
      "Sí. El método es escalable a instituciones educativas, parroquias y centros juveniles. Para colegios, se recomienda configurar el DNS en el router del centro y usar las herramientas de gestión de dispositivos (Google Workspace for Education, Apple School Manager, Microsoft 365 Education). Para parroquias y centros juveniles, con configurar el DNS en el router y establecer normas claras de uso de dispositivos es suficiente. Contacta con nosotros para materiales específicos para instituciones.",
    categoria: "Instituciones",
  },
]

export function getFaqByCategory(category: string): FaqItem[] {
  return faqItems.filter((item) => item.categoria === category)
}

export function getAllCategories(): string[] {
  return [...new Set(faqItems.map((item) => item.categoria))]
}
