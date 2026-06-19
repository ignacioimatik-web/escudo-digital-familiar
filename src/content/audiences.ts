import type { AudienceInfo } from "@/lib/types"

export const audiences: AudienceInfo[] = [
  {
    id: "familias",
    titulo: "Familias",
    descripcion:
      "Protege a tus hijos en el entorno digital con un método sencillo, eficaz y gratuito. Configura filtros técnicos y, sobre todo, acompaña su crecimiento digital con diálogo y ejemplo.",
    beneficios: [
      "Protección en dos capas: DNS de protección + control parental",
      "Guías paso a paso para cada dispositivo y sistema operativo",
      "Configurador interactivo adaptado a tu situación familiar",
      "Recursos para hablar con tus hijos sobre el mundo digital",
      "Acompañamiento por edades: de la protección total al criterio propio",
      "Comunidad de familias que comparten experiencias y consejos",
    ],
    recursos: [
      "Guías de configuración para Android, iOS, Windows, macOS",
      "Configurador guiado paso a paso",
      "Material descargable: acuerdos de uso, listas de verificación",
      "Acceso a la comunidad de familias",
    ],
    icono: "Users",
  },
  {
    id: "colegios",
    titulo: "Colegios",
    descripcion:
      "Implementa un sistema de protección digital en tu centro educativo. Protege a los alumnos durante su estancia en el colegio y proporciona recursos para que las familias continúen la protección en casa.",
    beneficios: [
      "Configuración de DNS de protección en la red del centro",
      "Materiales formativos para profesores y personal",
      "Charlas y talleres para familias",
      "Recursos adaptados por ciclos educativos (Infantil, Primaria, ESO)",
      "Protocolo de actuación ante incidentes digitales",
      "Acompañamiento en la implementación del método",
    ],
    recursos: [
      "Guía de implementación para centros educativos",
      "Material para tutorías y sesiones formativas",
      "Modelo de comunicación a familias",
      "Protocolo de actuación ante incidentes",
      "Acceso a la red de centros Escudo Digital",
    ],
    icono: "GraduationCap",
  },
  {
    id: "parroquias",
    titulo: "Parroquias",
    descripcion:
      "Crea entornos digitales seguros para los niños y jóvenes de tu parroquia. Ofrece a las familias herramientas sencillas para proteger a los menores en el mundo digital.",
    beneficios: [
      "Configuración de DNS en la red de la parroquia",
      "Materiales para catequesis y grupos de jóvenes",
      "Charlas para familias en el marco de la pastoral familiar",
      "Recursos adaptados al lenguaje y valores cristianos",
      "Formación para catequistas y monitores",
      "Acompañamiento en la implementación del método",
    ],
    recursos: [
      "Guía de implementación para parroquias",
      "Material para sesiones de catequesis sobre mundo digital",
      "Modelo de comunicación a familias parroquiales",
      "Recursos para grupos de jóvenes",
      "Acceso a la red de parroquias Escudo Digital",
    ],
    icono: "Heart",
  },
  {
    id: "centros-sanitarios",
    titulo: "Centros sanitarios",
    descripcion:
      "Proporciona a las familias recursos de protección digital como parte de la promoción de la salud infantil y adolescente. El entorno digital es un determinante de salud cada vez más relevante.",
    beneficios: [
      "Materiales informativos para entregar a familias en consultas",
      "Formación para profesionales sanitarios sobre riesgos digitales",
      "Protocolos de detección de problemas relacionados con pantallas",
      "Recursos adaptados por edades (pediatría, adolescencia)",
      "Colaboración en estudios e investigaciones sobre salud digital",
      "Red de centros sanitarios comprometidos con la salud digital",
    ],
    recursos: [
      "Folletos informativos para salas de espera y consultas",
      "Guía para profesionales sanitarios",
      "Protocolo de detección y actuación",
      "Materiales para talleres de salud digital",
      "Acceso a la red de centros sanitarios Escudo Digital",
    ],
    icono: "Stethoscope",
  },
]

export function getAudience(id: string): AudienceInfo | undefined {
  return audiences.find((a) => a.id === id)
}
