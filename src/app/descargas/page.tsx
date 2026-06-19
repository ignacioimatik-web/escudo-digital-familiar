import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import { PremiumCard } from "@/components/ui/premium-card"
import { FileText, Download, Clock } from "lucide-react"

interface DownloadItemProps {
  titulo: string
  descripcion: string
  tipo: string
  disponible: boolean
}

function DownloadItem({ titulo, descripcion, tipo, disponible }: DownloadItemProps) {
  return (
    <PremiumCard className="h-full">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            disponible ? "bg-brand-500" : "bg-slate-200"
          }`}>
            <FileText className={`w-6 h-6 ${disponible ? "text-white" : "text-slate-400"}`} />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-slate-900">{titulo}</h3>
            <Badge variant={disponible ? "success" : "muted"}>
              {disponible ? "Disponible" : "Próximamente"}
            </Badge>
          </div>
          <p className="text-slate-600 text-sm mb-3">{descripcion}</p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <FileText className="w-3 h-3" />
              {tipo}
            </span>
            {disponible && (
              <button className="flex items-center gap-1 text-brand-500 hover:text-brand-600 font-semibold transition-colors">
                <Download className="w-3 h-3" />
                Descargar
              </button>
            )}
            {!disponible && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                En desarrollo
              </span>
            )}
          </div>
        </div>
      </div>
    </PremiumCard>
  )
}

export default function DescargasPage() {
  const resources = [
    {
      titulo: "Guía rápida de configuración",
      descripcion: "Resumen en una página de los pasos esenciales para configurar DNS y control parental.",
      tipo: "PDF",
      disponible: false,
    },
    {
      titulo: "Checklist de protección digital",
      descripcion: "Lista de verificación para asegurarte de que has configurado correctamente todos los dispositivos.",
      tipo: "PDF",
      disponible: false,
    },
    {
      titulo: "Cartel para centros educativos",
      descripcion: "Cartel imprimible para anunciar charlas de protección digital en colegios y parroquias.",
      tipo: "PDF A4",
      disponible: false,
    },
    {
      titulo: "Guía técnica completa",
      descripcion: "Documento técnico detallado sobre DNS, configuraciones avanzadas y resolución de problemas.",
      tipo: "PDF",
      disponible: false,
    },
    {
      titulo: "Acuerdo familiar de uso digital",
      descripcion: "Plantilla imprimible para establecer acuerdos de uso de tecnología con tus hijos.",
      tipo: "PDF",
      disponible: false,
    },
    {
      titulo: "Presentación para charlas",
      descripcion: "Diapositivas listas para usar en charlas para familias, colegios o parroquias.",
      tipo: "PDF / PPTX",
      disponible: false,
    },
  ]

  return (
    <>
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/40 via-background to-background" />
        <Container size="md">
          <Badge variant="outline" className="mb-6">
            Recursos descargables
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            Descargas
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-2xl">
            Recursos gratuitos para complementar tu protección digital. Guías, checklists, carteles y materiales para charlas.
          </p>
        </Container>
      </Section>

      <Section>
        <Container size="md">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-50 text-accent-700 rounded-full text-sm font-medium">
              <Clock className="w-4 h-4" />
              Estamos preparando estos recursos. Estarán disponibles próximamente.
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {resources.map((resource, index) => (
              <DownloadItem
                key={index}
                titulo={resource.titulo}
                descripcion={resource.descripcion}
                tipo={resource.tipo}
                disponible={resource.disponible}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-50/50">
        <Container size="md">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              ¿Necesitas algo específico?
            </h2>
            <p className="text-slate-600 mb-6">
              Si necesitas un recurso que no está en la lista, contáctanos y lo prepararemos.
            </p>
            <a
              href="mailto:contacto@escudodigitalfamiliar.org"
              className="inline-block px-6 py-3 bg-brand-500 text-white rounded-xl font-semibold hover:bg-brand-600 transition-colors"
            >
              Contactar
            </a>
          </div>
        </Container>
      </Section>
    </>
  )
}
