import type { LegalSection } from "@/lib/types"

export const legalSections: LegalSection[] = [
  {
    id: "objeto",
    titulo: "Objeto del proyecto",
    contenido: [
      "Escudo Digital Familiar es un proyecto divulgativo y educativo que tiene como objetivo proporcionar información, recursos y guías para ayudar a familias, colegios y comunidades a proteger a los menores en el entorno digital.",
      "El contenido de esta plataforma es de carácter informativo y orientativo. No constituye asesoramiento técnico profesional, legal ni médico.",
    ],
  },
  {
    id: "reduccion-riesgo",
    titulo: "Reducción de riesgo, no garantía absoluta",
    contenido: [
      "Los métodos, herramientas y configuraciones descritos en esta plataforma están diseñados para reducir el riesgo de exposición de los menores a contenidos digitales perjudiciales (pornografía, violencia, apuestas, malware, etc.).",
      "Sin embargo, ningún sistema técnico ni método educativo puede garantizar una protección absoluta al 100%. La efectividad de los filtros depende de múltiples factores: la configuración realizada, la evolución tecnológica de las plataformas, el conocimiento técnico del menor y su determinación por eludir las restricciones.",
      "El usuario entiende y acepta que la implementación de estas medidas es una decisión voluntaria y consciente, y que los resultados pueden variar según cada situación particular.",
    ],
  },
  {
    id: "responsabilidad-familiar",
    titulo: "Responsabilidad familiar",
    contenido: [
      "La protección digital de los menores es una responsabilidad compartida entre la familia, la institución educativa y la sociedad en general.",
      "Los filtros técnicos (DNS, control parental) son herramientas de apoyo, pero no sustituyen el diálogo, la supervisión directa ni la educación en valores. El acompañamiento humano es el componente más importante del método.",
      "Los padres o tutores legales son los responsables últimos de decidir qué medidas de protección aplicar a los menores a su cargo, y de adaptarlas a la madurez y circunstancias de cada menor.",
      "Escudo Digital Familiar no se hace responsable del uso que las familias hagan de las recomendaciones proporcionadas, ni de las consecuencias derivadas de la aplicación (o no aplicación) de las medidas sugeridas.",
    ],
  },
  {
    id: "herramientas-terceros",
    titulo: "Herramientas de terceros",
    contenido: [
      "Las guías y recomendaciones de esta plataforma hacen referencia a herramientas y servicios de terceros (DNS de CleanBrowsing, Google Family Link, Apple Tiempo de Uso, Microsoft Family Safety, etc.).",
      "Escudo Digital Familiar no tiene relación comercial ni contractual con estos proveedores. Las recomendaciones se basan en la experiencia práctica y en la idoneidad técnica para el propósito de protección de menores.",
      "El usuario es responsable de leer y aceptar los términos de servicio y políticas de privacidad de cada herramienta de terceros antes de utilizarla.",
      "La disponibilidad, funcionalidad y condiciones de estos servicios pueden cambiar en cualquier momento sin previo aviso. Escudo Digital Familiar se compromete a mantener la información actualizada, pero no puede garantizar que todas las referencias estén vigentes en todo momento.",
    ],
  },
  {
    id: "propiedad-intelectual",
    titulo: "Propiedad intelectual",
    contenido: [
      "Los contenidos originales de esta plataforma (textos, imágenes, gráficos, diseño, código fuente) están protegidos por las leyes de propiedad intelectual y son titularidad de Escudo Digital Familiar o se utilizan con la debida autorización.",
      "Se permite la reproducción, distribución y comunicación pública de los contenidos con fines educativos y no comerciales, siempre que se cite la fuente (Escudo Digital Familiar) y se mantenga la integridad del contenido.",
      "Para usos comerciales o modificaciones sustanciales, se requiere autorización previa por escrito.",
    ],
  },
  {
    id: "limitacion-responsabilidad",
    titulo: "Limitación de responsabilidad",
    contenido: [
      "Escudo Digital Familiar proporciona la información y las guías de buena fe, basándose en el conocimiento técnico disponible en el momento de la publicación.",
      "No obstante, la plataforma se proporciona 'tal cual', sin garantías de ningún tipo, ya sean expresas o implícitas, incluyendo, pero no limitándose a, garantías de comerciabilidad, idoneidad para un propósito particular o no infracción.",
      "En ningún caso Escudo Digital Familiar será responsable de daños directos, indirectos, incidentales, especiales o consecuentes derivados del uso o la imposibilidad de uso de la información proporcionada, incluso si se ha informado de la posibilidad de tales daños.",
    ],
  },
  {
    id: "privacidad",
    titulo: "Privacidad y protección de datos",
    contenido: [
      "Esta plataforma no recopila datos personales de los usuarios. No utiliza sistemas de registro, login, bases de datos ni analítica de usuario.",
      "Toda la navegación es anónima y no se almacena información identificativa de los visitantes.",
      "Si en el futuro se implementan funcionalidades que requieran recopilación de datos, se informará claramente al usuario y se solicitará el consentimiento previo, conforme a la normativa vigente de protección de datos (RGPD, LOPDGDD).",
    ],
  },
  {
    id: "modificaciones",
    titulo: "Modificaciones",
    contenido: [
      "Escudo Digital Familiar se reserva el derecho de modificar este aviso legal en cualquier momento para adaptarlo a novedades legislativas, criterios jurisprudenciales, prácticas del sector o cambios en el servicio.",
      "Se recomienda al usuario leer periódicamente este aviso legal. Los cambios se publicarán en esta misma página con indicación de la fecha de actualización.",
    ],
  },
]

export const contactInfo = {
  proyecto: "Escudo Digital Familiar",
  naturaleza: "Proyecto divulgativo y educativo sin ánimo de lucro",
  contactoEmail: "contacto@escudodigitalfamiliar.org",
}
