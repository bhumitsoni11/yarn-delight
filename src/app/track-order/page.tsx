"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { MOCK_ORDERS } from "@/data/mock-data"
import { AnnouncementBar } from "@/components/layout/announcement-bar"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Search, CheckCircle2, Circle, Truck, MapPin, MessageCircle, Clock } from "lucide-react"

function TrackOrderContent() {
  const searchParams = useSearchParams()
  const defaultQuery = searchParams.get("id") || "YD-2026-84920"

  const [searchId, setSearchId] = useState(defaultQuery)
  const [activeOrder, setActiveOrder] = useState(
    MOCK_ORDERS.find((o) => o.referenceId.toLowerCase() === defaultQuery.toLowerCase()) ||
      MOCK_ORDERS[0]
  )

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const found = MOCK_ORDERS.find(
      (o) => o.referenceId.toLowerCase().trim() === searchId.toLowerCase().trim()
    )
    if (found) {
      setActiveOrder(found)
    } else {
      // If user typed custom id, synthesize view
      setActiveOrder({
        ...MOCK_ORDERS[0],
        referenceId: searchId.toUpperCase().trim(),
      })
    }
  }

  return (
    <div className="bg-background selection:bg-primary/40 selection:text-text flex min-h-screen flex-col font-sans">
      <AnnouncementBar />
      <Navbar />

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mx-auto max-w-xl text-center">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
            Slow-Craft Live Status
          </span>
          <h1 className="font-heading mt-2 text-3xl font-bold tracking-tight text-on-surface sm:text-4xl">
            Track Your Handcrafted Order
          </h1>
          <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
            Enter your order reference ID (sent via SMS & WhatsApp) to view hand-stitching milestones and courier dispatch.
          </p>

          {/* Search Lookup */}
          <form onSubmit={handleSearch} className="relative mt-6">
            <Search className="text-muted-foreground absolute top-1/2 left-4 size-4 -translate-y-1/2" />
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="e.g. YD-2026-84920"
              className="w-full rounded-full border border-border/80 bg-surface-container-lowest py-3 pr-28 pl-11 font-mono text-xs uppercase shadow-xs outline-none focus:border-primary"
            />
            <Button
              type="submit"
              size="sm"
              className="absolute top-1/2 right-1.5 -translate-y-1/2 rounded-full bg-primary px-4 text-xs font-bold text-on-primary"
            >
              Track Order
            </Button>
          </form>
        </div>

        {/* Order Tracking Dashboard */}
        {activeOrder && (
          <div className="mt-10 space-y-6">
            {/* Top Overview Strip */}
            <div className="rounded-3xl border border-border/80 bg-surface-container-lowest p-6 shadow-xs">
              <div className="flex flex-col justify-between gap-4 border-b border-border/60 pb-4 sm:flex-row sm:items-center">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Order Reference</span>
                  <h2 className="font-mono text-lg font-bold text-on-surface">{activeOrder.referenceId}</h2>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-primary-container/40 px-3 py-1 font-mono text-xs font-bold capitalize text-on-primary-container">
                    Status: {activeOrder.status}
                  </span>
                  <a
                    href="https://wa.me/919999999999"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-semibold text-on-surface hover:bg-surface-container-low"
                  >
                    <MessageCircle className="size-3.5 text-emerald-600" />
                    <span>Artisan WhatsApp Help</span>
                  </a>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 text-xs sm:grid-cols-3">
                <div>
                  <span className="text-muted-foreground">Courier Partner:</span>
                  <p className="font-semibold text-on-surface">{activeOrder.courierPartner || "Bluedart Air"}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Waybill / Tracking No:</span>
                  <p className="font-mono font-semibold text-on-surface">{activeOrder.trackingNumber || "BD994821034IN"}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Delivery Destination:</span>
                  <p className="truncate font-semibold text-on-surface">{activeOrder.shippingAddress.city}, {activeOrder.shippingAddress.state}</p>
                </div>
              </div>
            </div>

            {/* 5-Step Visual Timeline */}
            <div className="rounded-3xl border border-border/80 bg-surface-container-lowest p-6 sm:p-8 shadow-xs">
              <h3 className="font-heading text-base font-bold text-on-surface mb-6">Craft & Dispatch Milestones</h3>

              <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
                {activeOrder.timeline.map((step, index) => (
                  <div key={index} className="relative">
                    {/* Status Dot */}
                    <div className="absolute -left-6 sm:-left-8 top-0.5 flex size-5 sm:size-7 items-center justify-center rounded-full bg-surface">
                      {step.completed ? (
                        <CheckCircle2 className="size-5 sm:size-6 text-primary fill-primary-container" />
                      ) : (
                        <Circle className="size-4 sm:size-5 text-muted-foreground stroke-1" />
                      )}
                    </div>

                    {/* Step Content */}
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                        <h4 className={`text-xs sm:text-sm font-bold ${step.completed ? "text-on-surface" : "text-muted-foreground"}`}>
                          {step.title}
                        </h4>
                        <span className="font-mono text-[10px] text-muted-foreground">{step.timestamp}</span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Items Included */}
            <div className="rounded-3xl border border-border/80 bg-surface-container-lowest p-6 shadow-xs">
              <h3 className="font-heading text-base font-bold text-on-surface mb-4">Pieces in This Dispatch</h3>
              <div className="divide-y divide-border/60">
                {activeOrder.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 py-3">
                    <div className="relative size-14 shrink-0 overflow-hidden rounded-xl border border-border/60 bg-surface">
                      {item.imageUrl && (
                        <Image src={item.imageUrl} alt={item.title} fill unoptimized className="object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-xs font-bold text-on-surface">{item.title}</p>
                      {item.color && <p className="text-[11px] text-muted-foreground">Color: {item.color}</p>}
                    </div>
                    <span className="font-mono text-xs font-bold tabular-nums text-on-surface">
                      ₹{((item.pricePaise * item.quantity) / 100).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <TrackOrderContent />
    </Suspense>
  )
}
