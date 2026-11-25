import type { Metadata } from "next"
import "./globals.css"
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google"
import { cn } from "@/lib/utils"
import { QueryProvider } from "@/components/providers/query-provider"

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Yarn Delight | Atelier Crochet Luxury Handmade Boutique",
  description:
    "Artisanal slow-fashion crochet handbags, mufflers, clutches, and custom bespoke commissions lovingly hand-stitched in India.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn("font-sans", plusJakartaSans.variable, playfairDisplay.variable)}>
      <body className="bg-background text-foreground min-h-screen antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
