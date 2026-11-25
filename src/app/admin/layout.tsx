"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  ShoppingBag,
  PlusCircle,
  FolderTree,
  Boxes,
  Truck,
  Sparkles,
  Users,
  CreditCard,
  Tag,
  BarChart3,
  Settings,
  ArrowUpRight,
  LogOut,
  ShieldAlert,
} from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // If on admin login or forgot password, do not wrap in admin sidebar
  if (pathname === "/admin/login" || pathname === "/admin/forgot-password") {
    return <>{children}</>
  }

  const ADMIN_NAV = [
    { label: "Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Products Catalog", href: "/admin/products", icon: ShoppingBag },
    { label: "Add New Product", href: "/admin/products/new", icon: PlusCircle },
    { label: "Categories", href: "/admin/categories", icon: FolderTree },
    { label: "Raw Yarn Inventory", href: "/admin/inventory", icon: Boxes },
    { label: "Orders & Fulfillment", href: "/admin/orders", icon: Truck },
    { label: "Bespoke Requests", href: "/admin/custom-requests", icon: Sparkles },
    { label: "Customer CRM", href: "/admin/customers", icon: Users },
    { label: "Razorpay Payments", href: "/admin/payments", icon: CreditCard },
    { label: "Coupons & Discounts", href: "/admin/coupons", icon: Tag },
    { label: "Sales Analytics", href: "/admin/analytics", icon: BarChart3 },
    { label: "Store Settings", href: "/admin/settings", icon: Settings },
  ]

  return (
    <div className="flex min-h-screen bg-surface font-sans text-on-surface">
      {/* Admin Desktop Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col justify-between border-r border-border/80 bg-surface-container-lowest p-5 lg:flex">
        <div>
          {/* Logo / Header */}
          <div className="flex items-center gap-2.5 border-b border-border/60 pb-5">
            <div className="flex size-8 items-center justify-center rounded-xl bg-primary text-xs font-bold text-on-primary font-heading">
              YD
            </div>
            <div>
              <span className="font-heading text-sm font-bold tracking-tight text-on-surface">
                Yarn Delight
              </span>
              <span className="block font-mono text-[9px] uppercase tracking-wider text-primary">
                Atelier Admin Console
              </span>
            </div>
          </div>

          {/* Nav List */}
          <nav className="mt-5 space-y-1 overflow-y-auto max-h-[calc(100vh-210px)] pr-1">
            {ADMIN_NAV.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${
                    isActive
                      ? "bg-primary text-on-primary font-bold shadow-xs"
                      : "text-muted-foreground hover:bg-surface-container hover:text-on-surface"
                  }`}
                >
                  <Icon className="size-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="border-t border-border/60 pt-4 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between rounded-xl border border-border/80 px-3 py-2 text-xs font-semibold text-on-surface hover:bg-surface-container"
          >
            <span>View Public Store</span>
            <ArrowUpRight className="size-3.5 text-muted-foreground" />
          </Link>
          <Link
            href="/admin/login"
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-rose-600 hover:underline"
          >
            <LogOut className="size-3.5" />
            <span>Admin Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Pane */}
      <div className="flex flex-1 flex-col overflow-x-hidden">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/80 bg-surface/90 px-6 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-800">
              ● Production Environment Active
            </span>
            <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
              Razorpay Test Mode: rzp_test_U2MxIYHJ3sIV3i
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-semibold text-primary underline hover:text-on-surface lg:hidden"
            >
              Storefront →
            </Link>
            <div className="flex size-8 items-center justify-center rounded-full bg-primary-container text-xs font-bold text-on-primary-container font-mono">
              ADM
            </div>
          </div>
        </header>

        {/* Content View */}
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
