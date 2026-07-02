import type { Metadata } from "next"
import { getDeviceGuide } from "@/content/devices"
import { GuidePage } from "@/components/shared/guide-page"
import { NetworkDiagram } from "@/components/shared/network-diagram"

export const metadata: Metadata = {
  title: "Guía Router",
  description:
    "Configura DNS de protección en el router para proteger todos los dispositivos de la red doméstica. Guía paso a paso.",
}

export default function RouterPage() {
  const guide = getDeviceGuide("router")!

  return (
    <>
      {/* Visual diagram section */}
      <section className="relative overflow-hidden py-8 md:py-12 bg-gradient-to-b from-brand-50/40 via-background to-background">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-6">
            <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-success-100 text-success-600 mb-4">
              Visualización de red
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
              Así protege el DNS tu hogar
            </h2>
            <p className="text-sm text-slate-500 max-w-lg">
              Al configurar el DNS en el router, todos los dispositivos conectados quedan protegidos automáticamente.
            </p>
          </div>
          <NetworkDiagram variant="full-home" protected_={true} className="my-4" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto mt-4">
            {[
              { label: "Router", desc: "Filtra el contenido" },
              { label: "WiFi", desc: "Protege toda la red" },
              { label: "DNS", desc: "Bloquea lo malo" },
            ].map(item => (
              <div key={item.label} className="text-center p-2.5 rounded-lg bg-white border border-slate-100">
                <p className="text-xs font-bold text-slate-800">{item.label}</p>
                <p className="text-[10px] text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GuidePage guide={guide} nextGuide={{ href: "/guias/navegadores", label: "Navegadores" }} />
    </>
  )
}
