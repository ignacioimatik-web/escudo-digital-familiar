import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import { PremiumCard } from "@/components/ui/premium-card"
import { Heart, Shield, Users, BookOpen, Presentation, Lightbulb } from "lucide-react"
import Link from "next/link"

export default function ParroquiasPage() {
  return (
    <>
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/40 via-background to-background" />
        <Container size="md">
          <Badge variant="accent" className="mb-6">
            Para parroquias
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            Protege a los niños y jóvenes de tu comunidad
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-2xl">
            La protección digital es una forma de amor y responsabilidad comunitaria. Ayuda a las familias de tu parroquia a crear entornos digitales seguros para sus hijos.
          </p>
        </Container>
      </Section>

      <Section>
        <Container size="md">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              La protección digital como responsabilidad comunitaria
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Como comunidad parroquial, tenemos la responsabilidad de cuidar a los niños y jóvenes que nos han sido confiados. En el mundo digital actual, esto significa también protegerlos de los riesgos que encuentran en internet: contenido inapropiado, adicción a las pantallas, relaciones tóxicas, pérdida de la privacidad.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              La protección digital no es solo una cuestión técnica, sino también educativa y moral. Se trata de ayudar a las familias a formar en sus hijos un uso responsable y crítico de la tecnología, acorde con los valores cristianos de dignidad, verdad y amor.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-50/50">
        <Container size="md">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            Cómo puede ayudarte Escudo Digital Familiar
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <PremiumCard className="h-full">
              <Shield className="w-8 h-8 text-brand-500 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Protección en los dispositivos del centro
              </h3>
              <p className="text-slate-600">
                Configura DNS de protección en los ordenadores y tablets de la parroquia para filtrar contenido inapropiado en todas las actividades con niños y jóvenes.
              </p>
            </PremiumCard>

            <PremiumCard className="h-full">
              <Users className="w-8 h-8 text-brand-500 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Apoyo a las familias
              </h3>
              <p className="text-slate-600">
                Ofrece a las familias recursos y formación para que protejan a sus hijos en casa. Organiza charlas y talleres sobre protección digital y educación en valores.
              </p>
            </PremiumCard>

            <PremiumCard className="h-full">
              <BookOpen className="w-8 h-8 text-brand-500 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Educación en valores digitales
              </h3>
              <p className="text-slate-600">
                Integra la educación digital en la catequesis y los grupos de jóvenes. Enseña a usar la tecnología con responsabilidad, respeto y espíritu crítico.
              </p>
            </PremiumCard>

            <PremiumCard className="h-full">
              <Lightbulb className="w-8 h-8 text-brand-500 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Formación para catequistas
              </h3>
              <p className="text-slate-600">
                Forma a tus catequistas y monitores en protección digital para que puedan guiar a los jóvenes y detectar posibles problemas.
              </p>
            </PremiumCard>
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="md">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            Qué puedes hacer en una sesión o charla
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-500 text-white flex items-center justify-center font-semibold">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Conecta con los valores
                </h3>
                <p className="text-slate-600">
                  Empieza conectando la protección digital con los valores cristianos: el cuidado de los más pequeños, la verdad, la dignidad de la persona, el amor responsable.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-500 text-white flex items-center justify-center font-semibold">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Muestra la realidad
                </h3>
                <p className="text-slate-600">
                  Presenta datos sobre los riesgos digitales que enfrentan los niños y jóvenes: edad media de acceso a la pornografía, tiempo de pantalla diario, casos de ciberacoso.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-500 text-white flex items-center justify-center font-semibold">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Presenta la solución práctica
                </h3>
                <p className="text-slate-600">
                  Muestra el método de dos capas: DNS de protección y control parental. Explica que es sencillo, gratuito y efectivo. Haz una demostración en vivo.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-500 text-white flex items-center justify-center font-semibold">
                4
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Llama a la acción
                </h3>
                <p className="text-slate-600">
                  Anima a las familias a configurar la protección esa misma semana. Ofrece ayuda y acompañamiento. Crea un grupo de apoyo entre las familias de la parroquia.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-gradient-to-br from-brand-500 to-brand-600 text-white">
        <Container size="md">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              Proteger es amar
            </h2>
            <p className="text-brand-100 mb-8">
              &ldquo;Dejad que los niños vengan a mí&rdquo; (Mc 10,14). Proteger a los niños en el mundo digital es una forma concreta de amor y responsabilidad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/configurador"
                className="px-8 py-4 bg-white text-brand-600 rounded-xl font-semibold hover:bg-brand-50 transition-colors inline-flex items-center justify-center gap-2"
              >
                <Heart className="w-5 h-5" />
                Ir al configurador
              </Link>
              <Link
                href="/presentacion"
                className="px-8 py-4 bg-brand-400/30 text-white rounded-xl font-semibold hover:bg-brand-400/50 transition-colors inline-flex items-center justify-center gap-2"
              >
                <Presentation className="w-5 h-5" />
                Ver presentación
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
