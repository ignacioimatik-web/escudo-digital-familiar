import type { Metadata } from "next"
import { getDeviceGuide } from "@/content/devices"
import { GuidePage } from "@/components/shared/guide-page"

export const metadata: Metadata = {
  title: "Guía Android",
  description:
    "Configura DNS privado y Google Family Link para proteger dispositivos Android. Guía paso a paso.",
}

export default function AndroidPage() {
  return <GuidePage guide={getDeviceGuide("android")!} nextGuide={{ href: "/guias/ios", label: "iOS" }} />
}
