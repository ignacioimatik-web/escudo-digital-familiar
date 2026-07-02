import type { Metadata } from "next"
import { getDeviceGuide } from "@/content/devices"
import { GuidePage } from "@/components/shared/guide-page"

export const metadata: Metadata = {
  title: "Guía Windows",
  description:
    "Configura DNS manual y Microsoft Family Safety para proteger ordenadores Windows. Guía paso a paso.",
}

export default function WindowsPage() {
  return <GuidePage guide={getDeviceGuide("windows")!} nextGuide={{ href: "/guias/macos", label: "macOS" }} />
}
