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
  const [checkoutComplete, setCheckoutComplete] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)

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
      setPromoMessage("STITCH10 applied: 10% discount added")
    } else {
      setDiscountPercent(0)
      setPromoMessage("Invalid coupon code. Try STITCH10")
    }
  }

  const handleCheckout = () => {
    setIsCheckingOut(true)
    setTimeout(() => {
      setIsCheckingOut(false)
      setOrderId(`YD-${Math.floor(100000 + Math.random() * 900000)}`)
      setCheckoutComplete(true)
    }, 600)
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={() => setCartOpen(false)}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      {/* Slide-over Drawer Container */}
      <div className="bg-card border-border relative z-10 flex h-full w-full max-w-md flex-col border-l shadow-xl">
        {/* Drawer Header */}
        <div className="border-border bg-surface/50 flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-2">
            <div className="bg-muted text-foreground flex size-7 items-center justify-center rounded-lg">
              <ShoppingBag className="size-3.5" />
            </div>
            <div>
              <h2 className="font-heading text-foreground text-sm font-semibold">Shopping Bag</h2>
              <span className="text-muted-foreground font-mono text-[11px]">
                {items.length} {items.length === 1 ? "item" : "items"}
              </span>
            </div>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="hover:bg-muted text-muted-foreground hover:text-foreground rounded-lg p-1.5 transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        {items.length > 0 && (
          <div className="bg-muted/30 border-border border-b p-3 text-xs">
            <div className="text-foreground mb-1 flex items-center justify-between text-[11px] font-medium">
              {isFreeShipping ? (
                <span className="font-medium text-emerald-700">
                  Free Pan-India delivery unlocked
                </span>
              ) : (
                <span>
                  Add{" "}
                  <strong className="font-mono tabular-nums">
                    ₹{(remainingForFreeShippingPaise / 100).toLocaleString("en-IN")}
                  </strong>{" "}
                  more for free delivery
                </span>
              )}
              <span className="text-muted-foreground font-mono text-[10px] tabular-nums">
                {progressPercent}%
              </span>
            </div>
            <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
              <div
                className="bg-foreground h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Bag Items List Area */}
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center space-y-3 text-center">
              <div className="bg-muted text-muted-foreground flex size-12 items-center justify-center rounded-xl">
                <ShoppingBag className="size-6 stroke-1" />
              </div>
              <div>
                <h3 className="font-heading text-foreground text-sm font-semibold">
                  Your bag is empty
                </h3>
                <p className="text-muted-foreground mt-1 max-w-xs text-xs">
                  Looks like you haven&apos;t added any handcrafted pieces yet.
                </p>
              </div>
              <Button
                onClick={() => setCartOpen(false)}
                className="bg-foreground text-background hover:bg-foreground/90 rounded-lg px-4 text-xs font-semibold"
              >
                Explore collections
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="border-border bg-surface flex gap-3 rounded-xl border p-3 transition-colors"
              >
                {/* Thumbnail */}
                <div className="bg-muted border-border size-16 shrink-0 overflow-hidden rounded-lg border">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={64}
                      height={64}
                      unoptimized
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="text-muted-foreground flex h-full w-full items-center justify-center">
                      <ShoppingBag className="size-5" />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-foreground truncate text-xs font-medium">{item.title}</h4>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground transition-colors hover:text-rose-600"
                      title="Remove"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>

                  <div className="flex items-end justify-between pt-1">
                    <span className="text-foreground font-mono text-xs font-bold tabular-nums">
                      ₹{((item.pricePaise * item.quantity) / 100).toLocaleString("en-IN")}
                    </span>

                    {/* Stepper */}
                    <div className="border-border bg-background flex items-center rounded-lg border">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="hover:bg-muted text-muted-foreground hover:text-foreground p-1 transition-colors"
                      >
                        <Minus className="size-3" />
                      </button>
                      <span className="w-5 text-center font-mono text-xs font-medium tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="hover:bg-muted text-muted-foreground hover:text-foreground p-1 transition-colors"
                      >
                        <Plus className="size-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer Summary (Flipkart Checkout Flow) */}
        {items.length > 0 && (
          <div className="border-border bg-surface/50 space-y-3.5 border-t p-4 text-xs">
            {/* Promo Code Input */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="text-muted-foreground absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Coupon (try STITCH10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="bg-background border-border focus:border-foreground/40 w-full rounded-lg border py-1.5 pr-3 pl-8 font-mono text-xs uppercase outline-none"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleApplyPromo}
                className="border-border text-foreground rounded-lg text-xs"
              >
                Apply
              </Button>
            </div>
            {promoMessage && (
              <p
                className={`text-[11px] ${
                  discountPercent > 0 ? "font-medium text-emerald-700" : "text-rose-600"
                }`}
              >
                {promoMessage}
              </p>
            )}

            {/* Price Breakdown */}
            <div className="border-border/60 space-y-1.5 border-t pt-2 text-xs">
              <div className="text-muted-foreground flex justify-between">
                <span>Subtotal</span>
                <span className="text-foreground font-mono tabular-nums">
                  ₹{(subtotalPaise / 100).toLocaleString("en-IN")}
                </span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount ({discountPercent}%)</span>
                  <span className="font-mono tabular-nums">
                    -₹{(discountAmountPaise / 100).toLocaleString("en-IN")}
                  </span>
                </div>
              )}
              <div className="text-muted-foreground flex justify-between">
                <span>Shipping</span>
                <span>
                  {shippingFeePaise === 0 ? (
                    <span className="font-medium text-emerald-700">Free</span>
                  ) : (
                    <span className="font-mono tabular-nums">
                      ₹{(shippingFeePaise / 100).toLocaleString("en-IN")}
                    </span>
                  )}
                </span>
              </div>
              <div className="border-border/80 text-foreground flex items-baseline justify-between border-t pt-2 font-bold">
                <span>Total</span>
                <span className="font-heading font-mono text-base tabular-nums">
                  ₹{(totalPaise / 100).toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {checkoutComplete ? (
              <div className="border-border/80 bg-muted/40 rounded-lg border p-3 text-center text-xs">
                <p className="font-semibold text-emerald-700">Razorpay test checkout initialized</p>
                <p className="text-muted-foreground mt-0.5 font-mono text-[10px]">
                  Order ID: {orderId}
                </p>
              </div>
            ) : (
              <Button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="bg-foreground text-background hover:bg-foreground/90 flex h-10 w-full items-center justify-center gap-2 rounded-xl text-xs font-semibold transition-colors active:scale-[0.98]"
              >
                {isCheckingOut ? (
                  <span>Initializing checkout...</span>
                ) : (
                  <>
                    <span>Proceed to checkout</span>
                    <ArrowRight className="size-3.5" />
                  </>
                )}
              </Button>
            )}

            <div className="text-muted-foreground flex items-center justify-center gap-1.5 text-[10px]">
              <ShieldCheck className="size-3 text-emerald-600" />
              <span>Razorpay 256-bit SSL secured • UPI & COD available</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
