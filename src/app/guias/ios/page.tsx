import type { Metadata } from "next"
import { getDeviceGuide } from "@/content/devices"
import { GuidePage } from "@/components/shared/guide-page"

export const metadata: Metadata = {
  title: "Guía iOS",
  description:
    "Configura DNS personalizado y Tiempo de Uso con En Familia para proteger iPhone y iPad. Guía paso a paso.",
}

export default function IosPage() {
  return <GuidePage guide={getDeviceGuide("iphone")!} nextGuide={{ href: "/guias/windows", label: "Windows" }} />
}
