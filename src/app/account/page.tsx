"use client"

import Link from "next/link"
import Image from "next/image"
import { MOCK_ORDERS } from "@/data/mock-data"
import { Button } from "@/components/ui/button"
import { Package, Clock, Truck, ArrowRight, Sparkles, MapPin } from "lucide-react"

export default function AccountOverviewPage() {
  const activeOrder = MOCK_ORDERS[0]

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="rounded-3xl border border-border/80 bg-surface-container-low p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
              Atelier Member Portal
            </span>
            <h1 className="font-heading mt-1 text-2xl font-bold tracking-tight text-on-surface sm:text-3xl">
              Hello, Ananya
            </h1>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
              Member of the slow craft collective since October 2025 • 3 Heirloom Commissions Crafted.
            </p>
          </div>
          <Link href="/custom-order">
            <Button className="rounded-full bg-primary text-xs font-bold text-on-primary shadow-xs">
              <Sparkles className="size-3.5" />
              <span>Commission New Piece</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Active Order Spotlight Card */}
      {activeOrder && (
        <div className="rounded-3xl border border-border/80 bg-surface-container-lowest p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-border/60 pb-4">
            <div className="flex items-center gap-2">
              <Package className="size-4 text-primary" />
              <h2 className="font-heading text-base font-bold text-on-surface">
                Active Commission In Crafting
              </h2>
            </div>
            <span className="rounded-full bg-primary-container/40 px-3 py-1 font-mono text-xs font-bold text-on-primary-container">
              {activeOrder.status.toUpperCase()}
            </span>
          </div>

          <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative size-18 shrink-0 overflow-hidden rounded-2xl border border-border/60 bg-surface">
                {activeOrder.items[0]?.imageUrl && (
                  <Image
                    src={activeOrder.items[0].imageUrl}
                    alt=""
                    fill
                    unoptimized
                    className="object-cover"
                  />
                )}
              </div>
              <div>
                <p className="font-mono text-[11px] text-muted-foreground">
                  Reference: {activeOrder.referenceId}
                </p>
                <h3 className="font-heading text-sm font-bold text-on-surface">
                  {activeOrder.items[0]?.title}
                </h3>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Artisan Hand-Stitching in Gujarat studio (Hour 6 of 12)
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:items-end">
              <span className="font-mono text-sm font-bold tabular-nums text-on-surface">
                ₹{(activeOrder.totalPaise / 100).toLocaleString("en-IN")}
              </span>
              <Link href={`/track-order?id=${activeOrder.referenceId}`}>
                <Button
                  size="sm"
                  className="rounded-full bg-inverse-surface text-xs font-bold text-on-primary shadow-xs"
                >
                  <span>Live Tracking</span>
                  <ArrowRight className="size-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Quick Summary Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-border/80 bg-surface-container-lowest p-5 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Total Orders
          </span>
          <p className="font-mono mt-2 text-2xl font-bold tabular-nums text-on-surface">3</p>
          <Link
            href="/account/orders"
            className="mt-3 block text-xs font-semibold text-primary hover:underline"
          >
            View history →
          </Link>
        </div>

        <div className="rounded-3xl border border-border/80 bg-surface-container-lowest p-5 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Saved Delivery Hub
          </span>
          <p className="mt-2 truncate text-sm font-bold text-on-surface">Indiranagar, Bengaluru</p>
          <Link
            href="/account/addresses"
            className="mt-3 block text-xs font-semibold text-primary hover:underline"
          >
            Manage addresses →
          </Link>
        </div>

        <div className="rounded-3xl border border-border/80 bg-surface-container-lowest p-5 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Atelier Rewards
          </span>
          <p className="font-mono mt-2 text-2xl font-bold tabular-nums text-primary">450 Pts</p>
          <span className="mt-3 block text-xs text-muted-foreground">
            Valid for ₹450 off next commission
          </span>
        </div>
      </div>
    </div>
  )
}
