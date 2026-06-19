import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import { PremiumCard } from "@/components/ui/premium-card"
import { GraduationCap, Shield, Users, BookOpen, Presentation, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function ColegiosPage() {
  return (
    <>
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/40 via-background to-background" />
        <Container size="md">
          <Badge variant="cyan" className="mb-6">
            Para centros educativos
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            Protege a tus alumnos dentro y fuera del aula
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-2xl">
            Implementa un sistema de protección digital en tu centro educativo. Coordina con las familias y crea un entorno digital seguro para toda la comunidad educativa.
          </p>
        </Container>
      </Section>

      <Section>
        <Container size="md">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              El desafío digital en los centros educativos
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Los colegios nos enfrentamos a un desafío sin precedentes: nuestros alumnos están expuestos a riesgos digitales que afectan su bienestar, su rendimiento académico y sus relaciones. El ciberacoso, la adicción a las pantallas, la exposición a contenido inapropiado y la falta de concentración son problemas cada vez más frecuentes.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              No podemos ignorar la realidad digital de nuestros alumnos. Necesitamos actuar desde la prevención, la educación y la coordinación con las familias. Escudo Digital Familiar te proporciona el marco y las herramientas para hacerlo de forma efectiva.
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
                Protección en la red del centro
              </h3>
              <p className="text-slate-600">
                Configura DNS de protección en el router del colegio para filtrar contenido inapropiado en todos los dispositivos conectados a la red escolar.
              </p>
            </PremiumCard>

            <PremiumCard className="h-full">
              <Users className="w-8 h-8 text-brand-500 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Coordinación con familias
              </h3>
              <p className="text-slate-600">
                Proporciona a las familias recursos y guías para que continúen la protección digital en casa. La protección es más efectiva cuando hay coherencia entre el centro y el hogar.
              </p>
            </PremiumCard>

            <PremiumCard className="h-full">
              <BookOpen className="w-8 h-8 text-brand-500 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Educación digital integrada
              </h3>
              <p className="text-slate-600">
                Integra la educación digital en el currículo. Enseña a tus alumnos a usar la tecnología de forma responsable, crítica y segura.
              </p>
            </PremiumCard>

            <PremiumCard className="h-full">
              <AlertTriangle className="w-8 h-8 text-brand-500 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Protocolo de actuación
              </h3>
              <p className="text-slate-600">
                Define un protocolo claro para actuar ante incidentes digitales: ciberacoso, exposición a contenido inapropiado, uso problemático de redes sociales.
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
                  Presenta el problema
                </h3>
                <p className="text-slate-600">
                  Explica a las familias los riesgos digitales que enfrentan sus hijos: exposición a contenido inapropiado, adicción a pantallas, ciberacoso. Usa datos y ejemplos concretos.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-500 text-white flex items-center justify-center font-semibold">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Presenta la solución
                </h3>
                <p className="text-slate-600">
                  Muestra el método de dos capas: DNS de protección y control parental. Explica que es sencillo, gratuito y efectivo.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-500 text-white flex items-center justify-center font-semibold">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Haz una demostración práctica
                </h3>
                <p className="text-slate-600">
                  Usa el configurador en vivo para mostrar lo sencillo que es configurar la protección. Pide a las familias que saquen sus móviles y sigan los pasos.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-500 text-white flex items-center justify-center font-semibold">
                4
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Establece compromisos
                </h3>
                <p className="text-slate-600">
                  Anima a las familias a configurar la protección esa misma semana. Ofrece apoyo para resolver dudas y haz seguimiento.
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
              Protege a toda tu comunidad educativa
            </h2>
            <p className="text-brand-100 mb-8">
              La protección digital es responsabilidad de todos. Empieza hoy a crear un entorno digital seguro para tus alumnos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/configurador"
                className="px-8 py-4 bg-white text-brand-600 rounded-xl font-semibold hover:bg-brand-50 transition-colors inline-flex items-center justify-center gap-2"
              >
                <GraduationCap className="w-5 h-5" />
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
