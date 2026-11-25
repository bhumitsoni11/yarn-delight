"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useCartStore } from "@/store/cart.store"
import { AnnouncementBar } from "@/components/layout/announcement-bar"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  ArrowRight,
  Lock,
  CheckCircle2,
} from "lucide-react"

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Assam",
  "Bihar",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "West Bengal",
]

export default function CheckoutPage() {
  const router = useRouter()
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)

  // Form states
  const [email, setEmail] = useState("ananya.sharma@example.com")
  const [phone, setPhone] = useState("9820144521")
  const [fullName, setFullName] = useState("Ananya Sharma")
  const [address, setAddress] = useState("Flat 402, Magnolia Enclave, 12th Main Road")
  const [city, setCity] = useState("Bengaluru")
  const [state, setState] = useState("Karnataka")
  const [pincode, setPincode] = useState("560038")
  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod">("razorpay")
  const [deliveryMethod, setDeliveryMethod] = useState<"standard" | "express">("standard")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const subtotalPaise = items.reduce((acc, item) => acc + item.pricePaise * item.quantity, 0)
  const shippingPaise =
    deliveryMethod === "express" ? 24900 : subtotalPaise >= 199900 || subtotalPaise === 0 ? 0 : 14900
  const totalPaise = subtotalPaise + shippingPaise

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate order creation with Razorpay test credentials
    setTimeout(() => {
      const generatedOrderId = `YD-2026-${Math.floor(10000 + Math.random() * 90000)}`
      clearCart()
      setIsSubmitting(false)
      router.push(`/order-success?orderId=${generatedOrderId}&total=${totalPaise}`)
    }, 1200)
  }

  return (
    <div className="bg-background selection:bg-primary/40 selection:text-text flex min-h-screen flex-col font-sans">
      <AnnouncementBar />
      <Navbar />

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-8 sm:px-6 lg:px-12">
        {/* Breadcrumb */}
        <div className="mb-8 border-b border-border/60 pb-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/cart" className="hover:text-on-surface">
              Bag
            </Link>
            <span>/</span>
            <span className="font-semibold text-on-surface">Pan-India Checkout</span>
          </div>
          <h1 className="font-heading mt-2 text-2xl font-bold tracking-tight text-on-surface sm:text-3xl">
            Complete Your Atelier Order
          </h1>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left Form Suite (7 cols) */}
          <div className="space-y-8 lg:col-span-7">
            {/* 1. Contact Information */}
            <div className="rounded-3xl border border-border/80 bg-surface-container-lowest p-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <h2 className="font-heading text-base font-bold text-on-surface">
                  1. Contact Information
                </h2>
                <span className="text-[11px] text-muted-foreground">Required for WhatsApp updates</span>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-border/80 bg-surface px-3 py-2 text-xs outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground">
                    Phone (+91 India)
                  </label>
                  <div className="mt-1 flex">
                    <span className="inline-flex items-center rounded-l-xl border border-r-0 border-border/80 bg-surface-container px-3 font-mono text-xs text-muted-foreground">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-r-xl border border-border/80 bg-surface px-3 py-2 font-mono text-xs outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="rounded-3xl border border-border/80 bg-surface-container-lowest p-6 shadow-xs">
              <div className="border-b border-border/60 pb-3">
                <h2 className="font-heading text-base font-bold text-on-surface">
                  2. Pan-India Delivery Address
                </h2>
              </div>

              <div className="mt-4 space-y-4 text-xs">
                <div>
                  <label className="block font-medium text-muted-foreground">Full Recipient Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-border/80 bg-surface px-3 py-2 text-xs outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block font-medium text-muted-foreground">
                    House / Flat No, Street, Colony
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-border/80 bg-surface px-3 py-2 text-xs outline-none focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block font-medium text-muted-foreground">City</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-border/80 bg-surface px-3 py-2 text-xs outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-muted-foreground">State</label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-border/80 bg-surface px-3 py-2 text-xs outline-none focus:border-primary"
                    >
                      {INDIAN_STATES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-medium text-muted-foreground">6-Digit PIN Code</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-border/80 bg-surface px-3 py-2 font-mono text-xs outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Delivery Method */}
            <div className="rounded-3xl border border-border/80 bg-surface-container-lowest p-6 shadow-xs">
              <h2 className="font-heading text-base font-bold text-on-surface">3. Delivery Speed</h2>
              <div className="mt-4 space-y-3">
                <label
                  onClick={() => setDeliveryMethod("standard")}
                  className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all ${
                    deliveryMethod === "standard"
                      ? "border-primary bg-primary-container/20 ring-1 ring-primary"
                      : "border-border/80 bg-surface"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="size-5 text-primary" />
                    <div>
                      <p className="text-xs font-bold text-on-surface">
                        Standard Insured Courier (Bluedart / Delhivery)
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Handcrafted & delivered in 4–6 business days
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-on-surface">
                    {subtotalPaise >= 199900 ? "FREE" : "₹149"}
                  </span>
                </label>

                <label
                  onClick={() => setDeliveryMethod("express")}
                  className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all ${
                    deliveryMethod === "express"
                      ? "border-primary bg-primary-container/20 ring-1 ring-primary"
                      : "border-border/80 bg-surface"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="size-5 text-primary" />
                    <div>
                      <p className="text-xs font-bold text-on-surface">
                        Express Artisan Priority Air Shipping
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Priority queue in workshop; dispatched in 48 hours
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-on-surface">₹249</span>
                </label>
              </div>
            </div>

            {/* 4. Payment Method */}
            <div className="rounded-3xl border border-border/80 bg-surface-container-lowest p-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <h2 className="font-heading text-base font-bold text-on-surface">
                  4. Secure Payment Method
                </h2>
                <span className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
                  <Lock className="size-3 text-emerald-600" />
                  Razorpay Verified
                </span>
              </div>

              {/* Razorpay Setup Details Callout */}
              <div className="mt-4 rounded-2xl border border-primary/30 bg-primary-container/30 p-3.5 text-xs text-on-surface">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-primary" />
                  <span className="font-bold">Configured Razorpay Test Keys Active</span>
                </div>
                <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                  Key ID: rzp_test_U2MxIYHJ3sIV3i (Ready for instant UPI / Debit Cards / Netbanking)
                </p>
              </div>

              <div className="mt-4 space-y-3">
                <label
                  onClick={() => setPaymentMethod("razorpay")}
                  className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all ${
                    paymentMethod === "razorpay"
                      ? "border-primary bg-primary-container/20 ring-1 ring-primary"
                      : "border-border/80 bg-surface"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="size-5 text-primary" />
                    <div>
                      <p className="text-xs font-bold text-on-surface">
                        Razorpay (UPI / Google Pay / PhonePe / Cards / NetBanking)
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Instant zero-fee confirmation & priority slot allocation
                      </p>
                    </div>
                  </div>
                  <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                    Recommended
                  </span>
                </label>

                <label
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all ${
                    paymentMethod === "cod"
                      ? "border-primary bg-primary-container/20 ring-1 ring-primary"
                      : "border-border/80 bg-surface"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Banknote className="size-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs font-bold text-on-surface">
                        Cash on Delivery (Pan-India)
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Pay cash upon delivery. ₹99 artisan verification advance may apply.
                      </p>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Place Order CTA (5 cols) */}
          <div className="space-y-6 lg:col-span-5">
            <div className="sticky top-28 rounded-3xl border border-border/80 bg-surface-container-lowest p-6 shadow-xs">
              <h2 className="font-heading text-lg font-bold text-on-surface">
                Order Review ({items.length} Pieces)
              </h2>

              {/* Items List */}
              <div className="mt-4 max-h-72 divide-y divide-border/60 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 py-3">
                    <div className="relative size-14 shrink-0 overflow-hidden rounded-xl border border-border/60 bg-surface">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs">
                          Crochet
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-xs font-bold text-on-surface">{item.title}</p>
                      <p className="text-[11px] text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-mono text-xs font-bold tabular-nums text-on-surface">
                      ₹{((item.pricePaise * item.quantity) / 100).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              {/* Calculation Breakdown */}
              <div className="mt-4 space-y-2 border-t border-border/60 pt-4 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-on-surface">
                    ₹{(subtotalPaise / 100).toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="font-mono tabular-nums text-on-surface">
                    {shippingPaise === 0 ? "FREE" : `₹${(shippingPaise / 100).toLocaleString("en-IN")}`}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>GST (18%)</span>
                  <span className="font-mono tabular-nums text-on-surface">Included</span>
                </div>
                <div className="border-t border-border/60 pt-3 flex justify-between text-base font-bold text-on-surface">
                  <span>Payable Total</span>
                  <span className="font-mono text-lg tabular-nums text-primary">
                    ₹{(totalPaise / 100).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Place Order CTA */}
              <Button
                type="submit"
                disabled={isSubmitting || items.length === 0}
                size="lg"
                className="mt-6 w-full rounded-full bg-primary text-xs font-bold text-on-primary shadow-xs hover:bg-primary/90"
              >
                {isSubmitting ? (
                  <span>Securing Order on Razorpay...</span>
                ) : (
                  <>
                    <span>Place Order & Pay ₹{(totalPaise / 100).toLocaleString("en-IN")}</span>
                    <ArrowRight className="size-4" />
                  </>
                )}
              </Button>

              <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
                <ShieldCheck className="size-4 text-emerald-600" />
                <span>Pan-India 100% Guaranteed Safe Checkout</span>
              </div>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  )
}
