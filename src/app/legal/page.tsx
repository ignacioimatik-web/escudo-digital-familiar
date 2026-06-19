import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import { legalSections } from "@/content/legal"

export default function LegalPage() {
  return (
    <>
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/40 via-background to-background" />
        <Container size="md">
          <Badge variant="outline" className="mb-6">
            Información legal
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            Aviso legal
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-2xl">
            Información importante sobre el uso de esta plataforma, limitaciones de responsabilidad y protección de datos.
          </p>
        </Container>
      </Section>

      <Section>
        <Container size="md">
          <div className="space-y-8">
            {legalSections.map((section) => (
              <div key={section.id} className="prose prose-slate max-w-none">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  {section.titulo}
                </h2>
                <div className="space-y-4">
                  {section.contenido.map((parrafo, index) => (
                    <p key={index} className="text-slate-600 leading-relaxed">
                      {parrafo}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-50/50">
        <Container size="md">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Contacto
            </h2>
            <p className="text-slate-600 mb-2">
              <strong>Proyecto:</strong> {legalSections[0].titulo}
            </p>
            <p className="text-slate-600 mb-2">
              <strong>Naturaleza:</strong> Proyecto divulgativo y educativo sin ánimo de lucro
            </p>
            <p className="text-slate-600">
              <strong>Email:</strong> contacto@escudodigitalfamiliar.org
            </p>
          </div>
        </Container>
      </Section>
    </>
  )
}
