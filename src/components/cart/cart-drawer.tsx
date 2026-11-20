"use client"

import { useState } from "react"
import Image from "next/image"
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Tag } from "lucide-react"
import { useCartStore } from "@/store/cart.store"
import { Button } from "@/components/ui/button"

const FREE_SHIPPING_THRESHOLD_PAISE = 99900 // ₹999 in paise
const FLAT_SHIPPING_FEE_PAISE = 9900 // ₹99 in paise

export function CartDrawer() {
  const { items, isOpen, setCartOpen, removeItem, updateQuantity } = useCartStore()
  const [promoCode, setPromoCode] = useState("")
  const [discountPercent, setDiscountPercent] = useState(0)
  const [promoMessage, setPromoMessage] = useState("")
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  if (!isOpen) return null

  const subtotalPaise = items.reduce((total, item) => total + item.pricePaise * item.quantity, 0)

  const isFreeShipping = subtotalPaise >= FREE_SHIPPING_THRESHOLD_PAISE
  const shippingFeePaise = items.length === 0 ? 0 : isFreeShipping ? 0 : FLAT_SHIPPING_FEE_PAISE
  const discountAmountPaise = Math.round((subtotalPaise * discountPercent) / 100)
  const totalPaise = Math.max(0, subtotalPaise - discountAmountPaise + shippingFeePaise)

  const progressPercent = Math.min(
    100,
    Math.round((subtotalPaise / FREE_SHIPPING_THRESHOLD_PAISE) * 100)
  )

  const remainingForFreeShippingPaise = Math.max(0, FREE_SHIPPING_THRESHOLD_PAISE - subtotalPaise)

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase()
    if (code === "STITCH10") {
      setDiscountPercent(10)
      setPromoMessage("✨ 'STITCH10' applied: 10% discount added!")
    } else {
      setDiscountPercent(0)
      setPromoMessage("❌ Invalid discount code. Try 'STITCH10'")
    }
  }

  const handleCheckout = () => {
    setIsCheckingOut(true)
    setTimeout(() => {
      setIsCheckingOut(false)
      alert(
        `🎉 Razorpay Checkout Ready!\nTotal Payable: ₹${(totalPaise / 100).toLocaleString("en-IN")}\n\nIn Phase 2, this triggers the live Razorpay UPI / Card modal with order ID tracking.`
      )
    }, 600)
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={() => setCartOpen(false)}
        className="animate-in fade-in fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      {/* Slide-over Drawer Container */}
      <div className="bg-card border-border animate-in slide-in-from-right relative z-10 flex h-full w-full max-w-md flex-col border-l shadow-2xl duration-300">
        {/* Drawer Header */}
        <div className="border-border bg-surface/50 flex items-center justify-between border-b p-5">
          <div className="flex items-center gap-2">
            <div className="bg-primary/30 text-primary-foreground flex size-8 items-center justify-center rounded-full">
              <ShoppingBag className="size-4" />
            </div>
            <div>
              <h2 className="font-heading text-foreground text-lg font-bold">Your Shopping Bag</h2>
              <span className="text-muted-foreground text-xs">
                {items.length} {items.length === 1 ? "item" : "items"}
              </span>
            </div>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="hover:bg-muted text-muted-foreground hover:text-foreground rounded-full p-2 transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator (Flipkart / Myntra Style) */}
        {items.length > 0 && (
          <div className="bg-secondary/40 border-border border-b p-3 text-xs">
            <div className="text-foreground mb-1.5 flex items-center justify-between font-medium">
              {isFreeShipping ? (
                <span className="flex items-center gap-1 font-semibold text-emerald-700">
                  🎉 You unlocked FREE Pan-India Delivery!
                </span>
              ) : (
                <span>
                  Add{" "}
                  <strong>₹{(remainingForFreeShippingPaise / 100).toLocaleString("en-IN")}</strong>{" "}
                  more to get <strong>FREE Delivery</strong>
                </span>
              )}
              <span className="text-muted-foreground text-[10px] font-semibold">
                {progressPercent}%
              </span>
            </div>
            <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
              <div
                className="bg-primary h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Cart Line Items */}
        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center space-y-4 p-6 text-center">
              <div className="bg-muted flex size-20 items-center justify-center rounded-full text-3xl">
                🧶
              </div>
              <div>
                <h3 className="font-heading text-foreground text-lg font-bold">
                  Your bag is empty
                </h3>
                <p className="text-muted-foreground mt-1 max-w-xs text-xs">
                  Looks like you haven&apos;t added any handcrafted pieces yet.
                </p>
              </div>
              <Button
                onClick={() => setCartOpen(false)}
                className="bg-primary hover:bg-primary/90 text-text rounded-full px-6 font-semibold"
              >
                Explore Collections
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="border-border/80 bg-surface hover:border-primary/50 flex gap-3.5 rounded-2xl border p-3.5 shadow-xs transition-colors"
              >
                {/* Thumbnail */}
                <div className="bg-muted border-border size-20 shrink-0 overflow-hidden rounded-xl border">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={80}
                      height={80}
                      unoptimized
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-2xl">
                      🧶
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-foreground truncate text-sm font-medium">{item.title}</h4>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground hover:text-destructive p-1 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    {/* Quantity Stepper */}
                    <div className="border-border bg-muted/40 flex items-center rounded-lg border">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="hover:bg-muted text-muted-foreground hover:text-foreground rounded-l p-1"
                      >
                        <Minus className="size-3" />
                      </button>
                      <span className="px-2 text-xs font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="hover:bg-muted text-muted-foreground hover:text-foreground rounded-r p-1"
                      >
                        <Plus className="size-3" />
                      </button>
                    </div>

                    {/* Price */}
                    <span className="text-foreground text-sm font-semibold">
                      ₹{((item.pricePaise * item.quantity) / 100).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer (Summary & Checkout) */}
        {items.length > 0 && (
          <div className="border-border bg-surface/50 space-y-4 border-t p-5">
            {/* Promo Code Input */}
            <div className="space-y-1">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="text-muted-foreground absolute top-1/2 left-3 size-3.5 -translate-y-1/2" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Discount code (try STITCH10)"
                    className="border-border bg-card focus:border-primary w-full rounded-xl border py-1.5 pr-3 pl-9 font-mono text-xs tracking-wider uppercase outline-none"
                  />
                </div>
                <button
                  onClick={handleApplyPromo}
                  className="bg-muted hover:bg-muted/80 text-foreground rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-colors"
                >
                  Apply
                </button>
              </div>
              {promoMessage && (
                <p className="pl-1 text-[11px] font-medium text-emerald-600">{promoMessage}</p>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="text-muted-foreground border-border/40 space-y-1.5 border-t pt-3 text-xs">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{(subtotalPaise / 100).toLocaleString("en-IN")}</span>
              </div>
              {discountAmountPaise > 0 && (
                <div className="flex justify-between font-medium text-emerald-600">
                  <span>Discount ({discountPercent}%)</span>
                  <span>-₹{(discountAmountPaise / 100).toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shippingFeePaise === 0 ? (
                    <span className="font-semibold text-emerald-600">FREE</span>
                  ) : (
                    `₹${(shippingFeePaise / 100).toLocaleString("en-IN")}`
                  )}
                </span>
              </div>
              <div className="text-foreground border-border/80 flex justify-between border-t pt-2 text-sm font-bold">
                <span>Estimated Total</span>
                <span>₹{(totalPaise / 100).toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Razorpay Pay CTA */}
            <Button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="bg-primary hover:bg-primary/90 text-text flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-bold shadow-md transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              {isCheckingOut ? (
                <span>Connecting Razorpay...</span>
              ) : (
                <>
                  <span>Pay ₹{(totalPaise / 100).toLocaleString("en-IN")} with Razorpay</span>
                  <ArrowRight className="size-4" />
                </>
              )}
            </Button>

            <div className="text-muted-foreground flex items-center justify-center gap-2 text-[10px]">
              <ShieldCheck className="size-3.5 text-emerald-600" />
              <span>100% Secure Payment via Razorpay UPI & Cards</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
