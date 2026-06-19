import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import { PremiumCard } from "@/components/ui/premium-card"
import { Users, Shield, Clock, MessageCircle, BookOpen, Presentation } from "lucide-react"
import Link from "next/link"

export default function FamiliasPage() {
  return (
    <>
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/40 via-background to-background" />
        <Container size="md">
          <Badge variant="default" className="mb-6">
            Para familias
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            Protege a tus hijos en el mundo digital
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-2xl">
            Guía práctica para padres y madres. Sin tecnicismos, sin complicaciones. Aprende a configurar la protección digital y acompaña a tus hijos en su crecimiento digital.
          </p>
        </Container>
      </Section>

      <Section>
        <Container size="md">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              El desafío que enfrentamos como familias
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Nuestros hijos crecen en un entorno digital lleno de oportunidades, pero también de riesgos: contenido inapropiado, adicción a las pantallas, ciberacoso, privacidad comprometida. Como padres, nos sentimos abrumados ante la velocidad con la que cambia la tecnología.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              No se trata de prohibir la tecnología, sino de acompañar su uso. Se trata de proteger mientras educamos, de filtrar mientras formamos criterio. El método Escudo Digital Familiar te da las herramientas técnicas y el acompañamiento necesario para lograrlo.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-50/50">
        <Container size="md">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            Cómo te ayuda Escudo Digital Familiar
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <PremiumCard className="h-full">
              <Shield className="w-8 h-8 text-brand-500 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Protección técnica sencilla
              </h3>
              <p className="text-slate-600">
                Configura DNS de protección y control parental en todos los dispositivos de tus hijos. Nuestras guías paso a paso te llevan de la mano, sin necesidad de conocimientos técnicos.
              </p>
            </PremiumCard>

            <PremiumCard className="h-full">
              <MessageCircle className="w-8 h-8 text-brand-500 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Acompañamiento educativo
              </h3>
              <p className="text-slate-600">
                Aprende a hablar con tus hijos sobre el mundo digital. Descubre cómo establecer acuerdos, negociar límites y formar criterio crítico según su edad y madurez.
              </p>
            </PremiumCard>

            <PremiumCard className="h-full">
              <Clock className="w-8 h-8 text-brand-500 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Configuración rápida
              </h3>
              <p className="text-slate-600">
                En menos de 30 minutos puedes tener configurada la protección básica. El configurador interactivo te guía según el dispositivo, contexto y nivel de protección que necesites.
              </p>
            </PremiumCard>

            <PremiumCard className="h-full">
              <BookOpen className="w-8 h-8 text-brand-500 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Recursos por edades
              </h3>
              <p className="text-slate-600">
                Cada etapa de la infancia requiere un enfoque diferente. Te mostramos cómo adaptar la protección y el acompañamiento desde la primera infancia hasta la adolescencia.
              </p>
            </PremiumCard>
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="md">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            Qué puedes hacer hoy mismo
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-500 text-white flex items-center justify-center font-semibold">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Configura la protección básica
                </h3>
                <p className="text-slate-600">
                  Usa el configurador para establecer DNS de protección y control parental en los dispositivos de tus hijos. Es gratis y toma menos de 30 minutos.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-500 text-white flex items-center justify-center font-semibold">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Habla con tus hijos
                </h3>
                <p className="text-slate-600">
                  Explícales por qué estás configurando estas protecciones. No se trata de desconfiar, sino de cuidar. Adapta el mensaje a su edad y madurez.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-500 text-white flex items-center justify-center font-semibold">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Revisa y ajusta periódicamente
                </h3>
                <p className="text-slate-600">
                  Cada mes, revisa la configuración y ajústala según la madurez de tus hijos. A medida que crecen, pueden ganar más autonomía digital.
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
              Empieza hoy a proteger a tus hijos
            </h2>
            <p className="text-brand-100 mb-8">
              No necesitas ser un experto en tecnología. Solo necesitas amor, paciencia y las herramientas adecuadas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/configurador"
                className="px-8 py-4 bg-white text-brand-600 rounded-xl font-semibold hover:bg-brand-50 transition-colors inline-flex items-center justify-center gap-2"
              >
                <Users className="w-5 h-5" />
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
