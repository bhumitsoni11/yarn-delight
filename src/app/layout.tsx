import type { Metadata } from "next"
import "./globals.css"
import { Plus_Jakarta_Sans } from "next/font/google"
import { cn } from "@/lib/utils"
import { QueryProvider } from "@/components/providers/query-provider"

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Crochet Store | Handmade Crochet Creations",
  description:
    "Artisan handmade crochet handbags, mufflers, keychains, and custom accessories crafted with love in India.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn("font-sans", plusJakartaSans.variable)}>
      <body className="bg-background text-foreground min-h-screen antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
