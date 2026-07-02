import type { Metadata } from "next"
import { getDeviceGuide } from "@/content/devices"
import { GuidePage } from "@/components/shared/guide-page"

export const metadata: Metadata = {
  title: "Guía macOS",
  description:
    "Configura DNS manual y Tiempo de Uso para proteger ordenadores Mac. Guía paso a paso.",
}

export default function MacosPage() {
  return <GuidePage guide={getDeviceGuide("macos")!} nextGuide={{ href: "/guias/router", label: "Router" }} />
}
