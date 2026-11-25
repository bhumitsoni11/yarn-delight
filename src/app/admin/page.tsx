"use client"

import Link from "next/link"
import { PRODUCTS } from "@/data/products"
import { MOCK_ORDERS, MOCK_CUSTOM_REQUESTS, MOCK_INVENTORY_ITEMS } from "@/data/mock-data"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  Package,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  Eye,
  CheckCircle2,
  Clock,
} from "lucide-react"

export default function AdminOverviewPage() {
  const totalRevenuePaise = MOCK_ORDERS.reduce((acc, o) => acc + o.totalPaise, 0)
  const pendingRequests = MOCK_CUSTOM_REQUESTS.filter((c) => c.status === "in_review")
  const lowStockMaterials = MOCK_INVENTORY_ITEMS.filter((i) => i.status !== "healthy")

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-on-surface sm:text-3xl">
            Atelier Command Dashboard
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Monitor Gujarat artisan production queue, Razorpay revenue receipts, and custom commission quotes.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/products/new">
            <Button size="sm" className="rounded-full bg-primary text-xs font-bold text-on-primary shadow-xs">
              + New Product
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Revenue */}
        <div className="rounded-3xl border border-border/80 bg-surface-container-lowest p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-muted-foreground">Captured Revenue</span>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-800">
              +24% MoM
            </span>
          </div>
          <p className="font-mono mt-3 text-2xl font-bold tabular-nums text-on-surface">
            ₹{(totalRevenuePaise / 100).toLocaleString("en-IN")}
          </p>
          <span className="mt-1 block text-[11px] text-muted-foreground">
            Across {MOCK_ORDERS.length} verified customer orders
          </span>
        </div>

        {/* Active Orders */}
        <div className="rounded-3xl border border-border/80 bg-surface-container-lowest p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-muted-foreground">Active Orders</span>
            <Package className="size-4 text-primary" />
          </div>
          <p className="font-mono mt-3 text-2xl font-bold tabular-nums text-on-surface">
            {MOCK_ORDERS.filter((o) => o.status !== "delivered").length}
          </p>
          <span className="mt-1 block text-[11px] text-muted-foreground">
            In crafting or express courier transit
          </span>
        </div>

        {/* Bespoke Requests */}
        <div className="rounded-3xl border border-border/80 bg-surface-container-lowest p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-muted-foreground">Custom Commission Briefs</span>
            <Sparkles className="size-4 text-primary" />
          </div>
          <p className="font-mono mt-3 text-2xl font-bold tabular-nums text-primary">
            {pendingRequests.length} Pending
          </p>
          <span className="mt-1 block text-[11px] text-muted-foreground">
            Awaiting artisan swatch quote video
          </span>
        </div>

        {/* Low Stock Materials */}
        <div className="rounded-3xl border border-border/80 bg-surface-container-lowest p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-muted-foreground">Raw Yarn Alerts</span>
            <AlertTriangle className="size-4 text-amber-500" />
          </div>
          <p className="font-mono mt-3 text-2xl font-bold tabular-nums text-amber-600">
            {lowStockMaterials.length} Batches
          </p>
          <span className="mt-1 block text-[11px] text-muted-foreground">
            Below safe restock threshold
          </span>
        </div>
      </div>

      {/* Two-Column Workspace: Recent Orders + Pending Commission Inquiries */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Recent Orders Table (7 cols) */}
        <div className="rounded-3xl border border-border/80 bg-surface-container-lowest p-6 shadow-xs lg:col-span-7">
          <div className="mb-4 flex items-center justify-between border-b border-border/60 pb-3">
            <h2 className="font-heading text-base font-bold text-on-surface">
              Recent Store Orders
            </h2>
            <Link
              href="/admin/orders"
              className="text-xs font-semibold text-primary hover:underline"
            >
              View all →
            </Link>
          </div>

          <div className="divide-y divide-border/60">
            {MOCK_ORDERS.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between py-3.5 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-on-surface">{order.referenceId}</span>
                    <span
                      className={`rounded-full px-2 py-0.2 font-mono text-[9px] font-bold uppercase ${
                        order.status === "delivered"
                          ? "bg-emerald-100 text-emerald-800"
                          : order.status === "crafting"
                            ? "bg-primary-container text-on-primary-container"
                            : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-muted-foreground mt-0.5">
                    {order.customerName} • {order.items.length} item(s) • {order.shippingAddress.city}
                  </p>
                </div>

                <div className="text-right">
                  <span className="font-mono font-bold tabular-nums text-on-surface">
                    ₹{(order.totalPaise / 100).toLocaleString("en-IN")}
                  </span>
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="mt-0.5 block text-[11px] text-primary hover:underline"
                  >
                    Manage
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Custom Commission Briefs (5 cols) */}
        <div className="rounded-3xl border border-border/80 bg-surface-container-lowest p-6 shadow-xs lg:col-span-5">
          <div className="mb-4 flex items-center justify-between border-b border-border/60 pb-3">
            <h2 className="font-heading text-base font-bold text-on-surface">
              Bespoke Commission Inquiries
            </h2>
            <Link
              href="/admin/custom-requests"
              className="text-xs font-semibold text-primary hover:underline"
            >
              Manage ({MOCK_CUSTOM_REQUESTS.length}) →
            </Link>
          </div>

          <div className="space-y-3">
            {MOCK_CUSTOM_REQUESTS.map((req) => (
              <div
                key={req.id}
                className="rounded-2xl border border-border/60 bg-surface p-4 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-primary">{req.referenceId}</span>
                  <span className="font-mono text-[10px] text-muted-foreground capitalize">
                    {req.status.replace("_", " ")}
                  </span>
                </div>
                <h3 className="font-heading mt-1 font-bold text-on-surface">{req.silhouette}</h3>
                <p className="mt-0.5 line-clamp-2 text-[11px] text-muted-foreground">
                  {req.specialNotes}
                </p>
                <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-2 font-mono text-[11px]">
                  <span className="text-muted-foreground">{req.customerName}</span>
                  <span className="font-bold text-on-surface">
                    Est. ₹{(req.estimatedBudgetPaise / 100).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
