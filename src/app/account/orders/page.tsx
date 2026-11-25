"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { MOCK_ORDERS } from "@/data/mock-data"
import { Button } from "@/components/ui/button"
import { Package, ArrowRight, Truck } from "lucide-react"

export default function AccountOrdersPage() {
  const [filter, setFilter] = useState<string>("all")

  const filteredOrders = MOCK_ORDERS.filter((order) => {
    if (filter === "all") return true
    return order.status === filter
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 border-b border-border/60 pb-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-on-surface">
            My Orders & Commissions
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Track individual slow-crafted commissions, invoices, and Pan-India tracking numbers.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 rounded-full border border-border/80 bg-surface-container-lowest p-1 shadow-2xs">
          {["all", "crafting", "dispatched", "delivered"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`rounded-full px-3 py-1 text-xs capitalize transition-colors ${
                filter === status
                  ? "bg-primary font-bold text-on-primary shadow-xs"
                  : "text-muted-foreground hover:text-on-surface"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="rounded-3xl border border-border/80 bg-surface-container-lowest p-6 shadow-xs"
          >
            {/* Header info */}
            <div className="flex flex-col justify-between gap-2 border-b border-border/60 pb-4 sm:flex-row sm:items-center">
              <div>
                <span className="font-mono text-sm font-bold text-on-surface">
                  {order.referenceId}
                </span>
                <span className="ml-2 font-mono text-xs text-muted-foreground">
                  • {new Date(order.createdAt).toLocaleDateString("en-IN", { dateStyle: "medium" })}
                </span>
              </div>
              <span
                className={`rounded-full px-3 py-0.5 font-mono text-xs font-bold uppercase tracking-wider ${
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

            {/* Items */}
            <div className="mt-4 divide-y divide-border/60">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 py-3">
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-xl border border-border/60 bg-surface">
                    {item.imageUrl && (
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="truncate text-xs font-bold text-on-surface">{item.title}</h3>
                    {item.color && (
                      <p className="text-[11px] text-muted-foreground">Palette: {item.color}</p>
                    )}
                    <p className="font-mono text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-mono text-xs font-bold tabular-nums text-on-surface">
                    ₹{((item.pricePaise * item.quantity) / 100).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Actions & Total */}
            <div className="mt-4 flex flex-col justify-between gap-3 border-t border-border/60 pt-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <Truck className="size-4 text-primary" />
                <span className="text-xs text-muted-foreground">
                  Destination: {order.shippingAddress.city}, {order.shippingAddress.state}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-bold tabular-nums text-on-surface">
                  Total: ₹{(order.totalPaise / 100).toLocaleString("en-IN")}
                </span>
                <Link href={`/account/orders/${order.id}`}>
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full text-xs font-semibold"
                  >
                    View Details
                  </Button>
                </Link>
                <Link href={`/track-order?id=${order.referenceId}`}>
                  <Button
                    size="sm"
                    className="rounded-full bg-primary text-xs font-bold text-on-primary shadow-xs"
                  >
                    <span>Track</span>
                    <ArrowRight className="size-3" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
