import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import { PremiumCard } from "@/components/ui/premium-card"
import { Heart, Shield, Stethoscope, Clock, BookOpen, Presentation, Baby, Smartphone } from "lucide-react"
import Link from "next/link"

export default function CentrosSanitariosPage() {
  return (
    <>
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/40 via-background to-background" />
        <Container size="md">
          <Badge variant="accent" className="mb-6">
            Para centros sanitarios
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            Salud digital infantil desde tu consulta
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-2xl">
            Ayuda a las familias a proteger la salud digital de sus hijos desde la pediatría
            y la atención primaria. La protección digital es también prevención y educación para la salud.
          </p>
        </Container>
      </Section>

      <Section>
        <Container size="md">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              El impacto del mundo digital en la salud infantil
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              La exposición temprana y sin supervisión a pantallas, redes sociales y contenido
              digital tiene consecuencias documentadas en la salud física y mental de niños y
              adolescentes: alteraciones del sueño, sedentarismo, problemas de atención, ansiedad,
              baja autoestima, y acceso prematuro a contenido inapropiado.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              Desde la consulta pediátrica tenemos una oportunidad única de intervenir de forma
              preventiva. Del mismo modo que educamos sobre alimentación saludable, ejercicio
              físico o higiene del sueño, debemos incorporar la salud digital como una dimensión
              más del cuidado integral del menor.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              Escudo Digital Familiar ofrece a los profesionales sanitarios un recurso práctico
              y gratuito para recomendar a las familias: guías paso a paso para configurar la
              protección digital en cualquier dispositivo, adaptadas a la edad del menor y al
              contexto familiar.
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
              <Stethoscope className="w-8 h-8 text-brand-500 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Recomendación en consulta
              </h3>
              <p className="text-slate-600">
                Ofrece a las familias un recurso profesional y gratuito para proteger la salud
                digital de sus hijos. Incluye guías para configurar la protección en dispositivos
                según la edad y el contexto del menor.
              </p>
            </PremiumCard>

            <PremiumCard className="h-full">
              <Baby className="w-8 h-8 text-brand-500 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Prevención desde la primera infancia
              </h3>
              <p className="text-slate-600">
                Proporciona pautas de salud digital adaptadas a cada etapa del desarrollo: desde
                recomendaciones de la OMS sobre tiempo de pantalla en bebés hasta la gestión del
                primer móvil en la preadolescencia.
              </p>
            </PremiumCard>

            <PremiumCard className="h-full">
              <Heart className="w-8 h-8 text-brand-500 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Coordinación con las familias
              </h3>
              <p className="text-slate-600">
                Refuerza las recomendaciones pediátricas con herramientas prácticas que las
                familias pueden implementar en casa. La protección digital continuada fuera de
                la consulta multiplica el impacto de tu consejo médico.
              </p>
            </PremiumCard>

            <PremiumCard className="h-full">
              <BookOpen className="w-8 h-8 text-brand-500 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Recursos para la sala de espera
              </h3>
              <p className="text-slate-600">
                Imprime trípticos, carteles y guías rápidas de salud digital para la sala de
                espera o el consultorio. Contenido claro, visual y sin tecnicismos que las
                familias pueden llevar a casa.
              </p>
            </PremiumCard>
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="md">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            Cómo integrarlo en tu práctica diaria
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-500 text-white flex items-center justify-center font-semibold">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Incorpora la pregunta digital en la anamnesis
                </h3>
                <p className="text-slate-600">
                  Pregunta en cada revisión por el tiempo de pantalla, el uso de redes sociales,
                  dónde y con qué dispositivos se conecta el menor. Incluye la salud digital como
                  un signo vital más.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-500 text-white flex items-center justify-center font-semibold">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Recomienda el configurador en la consulta
                </h3>
                <p className="text-slate-600">
                  El configurador interactivo guía a las familias paso a paso. En menos de 30
                  minutos pueden tener la protección básica configurada. Comparte el enlace
                  directamente desde tu móvil o imprime el código QR.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-500 text-white flex items-center justify-center font-semibold">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Haz seguimiento en las revisiones
                </h3>
                <p className="text-slate-600">
                  Pregunta en la siguiente consulta si configuraron la protección y cómo ha ido.
                  Ofrece recursos adicionales según la edad y las necesidades del menor. El
                  acompañamiento continuo marca la diferencia.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-500 text-white flex items-center justify-center font-semibold">
                4
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Forma a otros profesionales
                </h3>
                <p className="text-slate-600">
                  Comparte estos recursos con otros pediatras, enfermeras de pediatría y
                  profesionales de atención primaria. La salud digital es responsabilidad de
                  todo el equipo sanitario.
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
              La salud digital empieza en tu consulta
            </h2>
            <p className="text-brand-100 mb-8">
              Cada recomendación que das a una familia sobre protección digital es una
              intervención preventiva que puede cambiar la vida de un menor.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/configurador"
                className="px-8 py-4 bg-white text-brand-600 rounded-xl font-semibold hover:bg-brand-50 transition-colors inline-flex items-center justify-center gap-2"
              >
                <Shield className="w-5 h-5" />
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
