"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useCartStore } from "@/store/cart.store"
import { AnnouncementBar } from "@/components/layout/announcement-bar"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  Tag,
  Check,
} from "lucide-react"

export default function CartPage() {
  const items = useCartStore((state) => state.items)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)
  const clearCart = useCartStore((state) => state.clearCart)

  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; percent: number } | null>(null)
  const [couponError, setCouponError] = useState("")

  const FREE_SHIPPING_THRESHOLD_PAISE = 199900 // ₹1,999
  const subtotalPaise = items.reduce((acc, item) => acc + item.pricePaise * item.quantity, 0)

  const freeShippingProgress = Math.min(
    100,
    Math.round((subtotalPaise / FREE_SHIPPING_THRESHOLD_PAISE) * 100)
  )
  const remainingForFreeShip = Math.max(0, FREE_SHIPPING_THRESHOLD_PAISE - subtotalPaise)

  // Calculate discount
  const discountPaise = appliedCoupon
    ? Math.round(subtotalPaise * (appliedCoupon.percent / 100))
    : 0

  const shippingPaise =
    subtotalPaise >= FREE_SHIPPING_THRESHOLD_PAISE || subtotalPaise === 0 ? 0 : 14900
  const totalPaise = Math.max(0, subtotalPaise - discountPaise + shippingPaise)

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault()
    setCouponError("")
    const code = couponCode.trim().toUpperCase()

    if (code === "ATELIER10") {
      setAppliedCoupon({ code: "ATELIER10", percent: 10 })
    } else if (code === "GENZCOQUETTE") {
      setAppliedCoupon({ code: "GENZCOQUETTE", percent: 15 })
    } else if (code === "FREESHIP") {
      setAppliedCoupon({ code: "FREESHIP", percent: 0 })
    } else {
      setCouponError("Invalid coupon code. Try 'ATELIER10' or 'GENZCOQUETTE'.")
    }
  }

  return (
    <div className="bg-background selection:bg-primary/40 selection:text-text flex min-h-screen flex-col font-sans">
      <AnnouncementBar />
      <Navbar />

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-8 sm:px-6 lg:px-12">
        {/* Page Header */}
        <div className="mb-8 border-b border-border/60 pb-6">
          <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-on-surface">
              Home
            </Link>
            <span>/</span>
            <span className="font-semibold text-on-surface">Shopping Bag</span>
          </div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-on-surface sm:text-4xl">
            Your Artisan Shopping Bag
          </h1>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            Review your slow-crafted crochet selections. All orders are wrapped in sustainable
            keepsake packaging.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border py-20 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-primary-container/40">
              <ShoppingBag className="size-6 text-primary" />
            </div>
            <h2 className="font-heading mt-4 text-xl font-bold text-on-surface">
              Your Bag is Empty
            </h2>
            <p className="mt-1 max-w-sm text-xs text-muted-foreground">
              You haven&apos;t added any handcrafted pieces yet. Discover our latest boutique
              creations crafted in organic milk cotton.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-bold text-on-primary shadow-xs transition-colors hover:bg-primary/90"
            >
              <span>Explore Catalogue</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Left Items Column (8 cols) */}
            <div className="space-y-6 lg:col-span-8">
              {/* Free Shipping Progress Ribbon */}
              <div className="rounded-2xl border border-border/80 bg-surface-container-lowest p-4 shadow-2xs">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 font-bold text-on-surface">
                    <Truck className="size-4 text-primary" />
                    {remainingForFreeShip > 0 ? (
                      <>
                        Add ₹{(remainingForFreeShip / 100).toLocaleString("en-IN")} more for{" "}
                        <strong className="text-primary">Free Pan-India Delivery</strong>
                      </>
                    ) : (
                      <span className="font-bold text-emerald-700">
                        You have unlocked FREE Pan-India Insured Shipping!
                      </span>
                    )}
                  </span>
                  <span className="font-mono text-[11px] font-bold tabular-nums text-muted-foreground">
                    {freeShippingProgress}%
                  </span>
                </div>
                <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-surface-container">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items List Table */}
              <div className="divide-y divide-border/60 rounded-3xl border border-border/80 bg-surface-container-lowest shadow-xs">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    {/* Item Thumbnail & Title */}
                    <div className="flex items-center gap-4">
                      <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl border border-border/60 bg-surface-container">
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.title}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <ShoppingBag className="size-6 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-heading text-sm font-semibold text-on-surface">
                          {item.title}
                        </h3>
                        {item.customizations?.color && (
                          <span className="text-[11px] text-muted-foreground">
                            Color: {item.customizations.color}
                          </span>
                        )}
                        <p className="mt-1 font-mono text-xs font-bold tabular-nums text-on-surface">
                          ₹{(item.pricePaise / 100).toLocaleString("en-IN")} each
                        </p>
                      </div>
                    </div>

                    {/* Stepper, Subtotal, Remove */}
                    <div className="flex items-center justify-between gap-6 sm:justify-end">
                      <div className="flex items-center rounded-full border border-border/80 bg-surface p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="flex size-7 items-center justify-center rounded-full text-xs font-bold hover:bg-muted"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-mono text-xs font-bold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex size-7 items-center justify-center rounded-full text-xs font-bold hover:bg-muted"
                        >
                          +
                        </button>
                      </div>

                      <span className="w-24 text-right font-mono text-sm font-bold tabular-nums text-on-surface">
                        ₹{((item.pricePaise * item.quantity) / 100).toLocaleString("en-IN")}
                      </span>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-rose-600"
                        title="Remove item"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Clear Bag Link */}
              <div className="flex justify-between">
                <Link
                  href="/shop"
                  className="text-xs font-bold text-primary underline hover:text-on-surface"
                >
                  ← Continue Shopping
                </Link>
                <button
                  onClick={clearCart}
                  className="text-xs text-muted-foreground underline hover:text-rose-600"
                >
                  Clear Shopping Bag
                </button>
              </div>
            </div>

            {/* Right Summary Column (4 cols) */}
            <div className="space-y-6 lg:col-span-4">
              <div className="rounded-3xl border border-border/80 bg-surface-container-lowest p-6 shadow-xs">
                <h2 className="font-heading text-lg font-bold text-on-surface">Order Summary</h2>

                {/* Promo Code Input */}
                <form onSubmit={handleApplyCoupon} className="mt-4 border-b border-border/60 pb-4">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="text-muted-foreground absolute top-1/2 left-3 size-3.5 -translate-y-1/2" />
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Promo code (e.g. ATELIER10)"
                        className="w-full rounded-full border border-border/80 bg-surface py-2 pr-3 pl-9 text-xs uppercase outline-none focus:border-primary"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="sm"
                      variant="outline"
                      className="rounded-full px-4 text-xs font-semibold"
                    >
                      Apply
                    </Button>
                  </div>
                  {appliedCoupon && (
                    <div className="mt-2 flex items-center justify-between text-xs text-emerald-700">
                      <span className="flex items-center gap-1 font-semibold">
                        <Check className="size-3.5" /> Code &apos;{appliedCoupon.code}&apos; applied
                      </span>
                      <button
                        type="button"
                        onClick={() => setAppliedCoupon(null)}
                        className="text-[10px] text-muted-foreground underline hover:text-rose-600"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                  {couponError && <p className="mt-2 text-xs text-rose-600">{couponError}</p>}
                </form>

                {/* Price Breakdown */}
                <div className="mt-4 space-y-2.5 text-xs">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Bag Subtotal</span>
                    <span className="font-mono tabular-nums text-on-surface">
                      ₹{(subtotalPaise / 100).toLocaleString("en-IN")}
                    </span>
                  </div>

                  {discountPaise > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Artisan Promo Discount</span>
                      <span className="font-mono tabular-nums">
                        -₹{(discountPaise / 100).toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-muted-foreground">
                    <span>Pan-India Shipping</span>
                    <span className="font-mono tabular-nums text-on-surface">
                      {shippingPaise === 0 ? (
                        <span className="font-semibold text-emerald-700">FREE</span>
                      ) : (
                        `₹${(shippingPaise / 100).toLocaleString("en-IN")}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-muted-foreground">
                    <span>Estimated GST (18% Included)</span>
                    <span className="font-mono tabular-nums text-on-surface">Included</span>
                  </div>

                  <div className="border-t border-border/60 pt-3 flex justify-between text-sm font-bold text-on-surface">
                    <span>Total Amount</span>
                    <span className="font-mono text-base tabular-nums">
                      ₹{(totalPaise / 100).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link href="/checkout" className="mt-6 block">
                  <Button
                    size="lg"
                    className="w-full rounded-full bg-primary text-xs font-bold text-on-primary shadow-xs hover:bg-primary/90"
                  >
                    <span>Proceed to Secure Checkout</span>
                    <ArrowRight className="size-4" />
                  </Button>
                </Link>

                {/* Trust Badges */}
                <div className="mt-4 space-y-2 border-t border-border/60 pt-4 text-[11px] text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="size-4 text-primary" />
                    <span>Razorpay 256-bit Encrypted Checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-4 text-primary" />
                    <span>100% Authentic Handcrafted Guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
