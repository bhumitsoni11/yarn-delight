"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { AnnouncementBar } from "@/components/layout/announcement-bar"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { CheckCircle2, Package, ArrowRight, Truck, Clock } from "lucide-react"

function OrderSuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId") || "YD-2026-84920"
  const total = searchParams.get("total") || "349900"
  const totalInRupees = (parseInt(total, 10) / 100).toLocaleString("en-IN")

  return (
    <div className="bg-background selection:bg-primary/40 selection:text-text flex min-h-screen flex-col font-sans">
      <AnnouncementBar />
      <Navbar />

      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
        {/* Animated Checkmark Badge */}
        <div className="flex size-20 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-600 shadow-sm">
          <CheckCircle2 className="size-10 stroke-[2]" />
        </div>

        <span className="mt-6 font-mono text-xs font-bold uppercase tracking-widest text-primary">
          Order Confirmed • Razorpay Verified
        </span>
        <h1 className="font-heading mt-2 text-3xl font-bold tracking-tight text-on-surface sm:text-4xl">
          Thank You for Supporting Handcrafted Art
        </h1>
        <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
          Your payment of <strong className="text-on-surface">₹{totalInRupees}</strong> has been received. Our master artisans in Gujarat have begun queueing your yarn.
        </p>

        {/* Order Details Card */}
        <div className="mt-8 w-full rounded-3xl border border-border/80 bg-surface-container-lowest p-6 text-left shadow-xs">
          <div className="flex items-center justify-between border-b border-border/60 pb-4">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Order Reference</span>
              <p className="font-mono text-base font-bold text-on-surface">{orderId}</p>
            </div>
            <span className="rounded-full bg-primary-container/40 px-3 py-1 font-mono text-xs font-bold text-on-primary-container">
              Crafting Stage
            </span>
          </div>

          <div className="mt-4 space-y-3 text-xs">
            <div className="flex items-center gap-3">
              <Clock className="size-4 text-primary" />
              <span>
                <strong>Estimated Handcrafting:</strong> 2–3 business days of detailed finger-tension stitching.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Truck className="size-4 text-primary" />
              <span>
                <strong>Pan-India Delivery:</strong> 4–6 business days via insured express partner.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Package className="size-4 text-primary" />
              <span>
                <strong>Packaging:</strong> Shipped in eco-friendly cotton keepsake dustbag with artisan care card.
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href={`/track-order?id=${orderId}`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-bold text-on-primary shadow-xs transition-colors hover:bg-primary/90"
          >
            <span>Live Craft & Order Tracking</span>
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center rounded-full border border-border/80 bg-surface-container-lowest px-6 py-3 text-xs font-bold text-on-surface shadow-xs transition-colors hover:bg-surface-container-low"
          >
            Continue Exploring Catalogue
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <OrderSuccessContent />
    </Suspense>
  )
}
