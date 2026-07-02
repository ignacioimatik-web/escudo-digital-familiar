import type { Metadata } from "next"
import { getDeviceGuide } from "@/content/devices"
import { GuidePage } from "@/components/shared/guide-page"

export const metadata: Metadata = {
  title: "Guía Navegadores",
  description:
    "Configura DNS seguro (DoH) en Chrome, Edge, Firefox y Opera para filtrar contenido a nivel de navegador. Guía paso a paso.",
}

export default function NavegadoresPage() {
  return <GuidePage guide={getDeviceGuide("navegador")!} />
}
