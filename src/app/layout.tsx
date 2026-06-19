import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "Escudo Digital Familiar — Protección digital para menores",
    template: "%s | Escudo Digital Familiar",
  },
  description:
    "Plataforma premium para proteger a los menores en el entorno digital. Método en dos capas: DNS de protección y control parental. Guías para familias, colegios y parroquias.",
  keywords: ["protección digital", "menores", "DNS", "control parental", "familia", "seguridad infantil"],
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Escudo Digital Familiar",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
