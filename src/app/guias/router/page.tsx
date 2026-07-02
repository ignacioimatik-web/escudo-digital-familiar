import type { Metadata } from "next"
import { getDeviceGuide } from "@/content/devices"
import { GuidePage } from "@/components/shared/guide-page"

export const metadata: Metadata = {
  title: "Guía Router",
  description:
    "Configura DNS de protección en el router para proteger todos los dispositivos de la red doméstica. Guía paso a paso.",
}

export default function RouterPage() {
  return <GuidePage guide={getDeviceGuide("router")!} nextGuide={{ href: "/guias/navegadores", label: "Navegadores" }} />
}
