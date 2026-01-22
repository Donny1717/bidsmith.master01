import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BidSmith ASF | Institution-Grade AI for Winning Bids",
  description:
    "Enterprise AI platform for UK government & enterprise bid writing, compliance, and procurement intelligence. By Honey-B2024 Ltd.",
  generator: "BidSmith ASF",
  keywords: ["bid writing", "AI", "procurement", "compliance", "government", "enterprise", "UK"],
}

export const viewport: Viewport = {
  themeColor: "#1a1f35",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
