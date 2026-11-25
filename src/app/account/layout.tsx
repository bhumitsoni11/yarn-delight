"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnnouncementBar } from "@/components/layout/announcement-bar"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { User, Package, MapPin, Heart, Settings, LogOut, Sparkles } from "lucide-react"

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const NAV_ITEMS = [
    { label: "Account Overview", href: "/account", icon: User },
    { label: "My Orders & Crafting", href: "/account/orders", icon: Package },
    { label: "Delivery Addresses", href: "/account/addresses", icon: MapPin },
    { label: "Saved Wishlist", href: "/wishlist", icon: Heart },
    { label: "Artisan Profile", href: "/account/profile", icon: Sparkles },
    { label: "Account Settings", href: "/account/settings", icon: Settings },
  ]

  return (
    <div className="bg-background selection:bg-primary/40 selection:text-text flex min-h-screen flex-col font-sans">
      <AnnouncementBar />
      <Navbar />

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-8 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Customer Left Sidebar (3 cols) */}
          <aside className="space-y-6 lg:col-span-3">
            {/* User Profile Card */}
            <div className="rounded-3xl border border-border/80 bg-surface-container-lowest p-6 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-primary-container text-primary font-heading font-bold text-lg">
                  AS
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-sm font-bold text-on-surface">Ananya Sharma</h2>
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-primary">
                    <Sparkles className="size-3" />
                    Bespoke Patron
                  </span>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="mt-6 space-y-1 border-t border-border/60 pt-4">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-xs font-semibold transition-colors ${
                        isActive
                          ? "bg-primary-container/40 text-on-primary-container font-bold"
                          : "text-muted-foreground hover:bg-surface-container-low hover:text-on-surface"
                      }`}
                    >
                      <Icon className="size-4" />
                      <span>{item.label}</span>
                    </Link>
                  )
                })}

                <Link
                  href="/sign-in"
                  className="flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-xs font-semibold text-rose-600 transition-colors hover:bg-rose-50"
                >
                  <LogOut className="size-4" />
                  <span>Sign Out</span>
                </Link>
              </nav>
            </div>
          </aside>

          {/* Right Main Content Area (9 cols) */}
          <div className="lg:col-span-9">{children}</div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
