"use client"

import { useState } from "react"
import { Sparkles, Heart, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setTimeout(() => {
      alert(`🎉 Welcome to the Yarn Club! We sent your 15% discount code to ${email}`)
      setEmail("")
      setSubscribed(false)
    }, 500)
  }

  return (
    <footer className="bg-card border-border text-foreground border-t pt-16 pb-12">
      <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter Incentive Box (Gen-Z Vibe) */}
        <div className="from-primary/25 via-secondary/25 to-accent/25 border-border/80 flex flex-col items-center justify-between gap-6 rounded-3xl border bg-linear-to-r p-8 sm:p-10 lg:flex-row">
          <div className="space-y-1.5 text-center lg:text-left">
            <span className="text-primary flex items-center justify-center gap-1 text-xs font-bold tracking-wider uppercase lg:justify-start">
              <Sparkles className="fill-primary size-3.5" />
              <span>Join the Yarn Club</span>
            </span>
            <h3 className="font-heading text-foreground text-2xl font-extrabold sm:text-3xl">
              Unlock 15% OFF Your First Drop
            </h3>
            <p className="text-muted-foreground max-w-md text-xs sm:text-sm">
              Receive secret seasonal drops, crochet care secrets, and VIP custom order slots
              directly in your inbox.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex w-full gap-2 lg:max-w-md">
            <div className="relative flex-1">
              <Mail className="text-muted-foreground absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="bg-surface border-border focus:border-primary w-full rounded-full border py-2.5 pr-4 pl-10 text-xs outline-none"
              />
            </div>
            <Button
              type="submit"
              disabled={subscribed}
              className="bg-text hover:bg-text/90 text-surface shrink-0 rounded-full px-6 text-xs font-bold"
            >
              {subscribed ? "Subscribed!" : "Join Now"}
            </Button>
          </form>
        </div>

        {/* Multi-column Navigation Links */}
        <div className="grid grid-cols-2 gap-8 text-xs md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary/30 flex size-9 items-center justify-center rounded-2xl text-xl">
                🧶
              </div>
              <span className="font-heading text-foreground text-xl font-bold">Yarn Delight</span>
            </div>
            <p className="text-muted-foreground max-w-sm text-xs leading-relaxed">
              We are an independent crochet atelier celebrating the slow-made movement. Every single
              stitch is hooked with patience, using 100% natural, skin-friendly yarns crafted by
              women artisans across India.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="bg-muted text-muted-foreground hover:text-foreground hover:bg-primary/30 flex size-8 items-center justify-center rounded-full transition-colors"
              >
                <svg
                  className="size-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <span className="text-muted-foreground text-[11px] font-medium">
                @yarndelight.craft
              </span>
            </div>
          </div>

          {/* Collections */}
          <div className="space-y-3">
            <h4 className="text-foreground text-[11px] font-bold tracking-wider uppercase">
              Collections
            </h4>
            <ul className="text-muted-foreground space-y-2">
              <li>
                <a href="#products" className="hover:text-foreground transition-colors">
                  Crochet Handbags
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-foreground transition-colors">
                  Shoulder Slings & Purses
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-foreground transition-colors">
                  Winter Mufflers & Scarves
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-foreground transition-colors">
                  Amigurumi Keychains
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-foreground transition-colors">
                  Hair & Home Accessories
                </a>
              </li>
            </ul>
          </div>

          {/* Custom & Care */}
          <div className="space-y-3">
            <h4 className="text-foreground text-[11px] font-bold tracking-wider uppercase">
              Custom & Care
            </h4>
            <ul className="text-muted-foreground space-y-2">
              <li>
                <a href="#custom-studio" className="hover:text-foreground transition-colors">
                  Bespoke Commission Studio
                </a>
              </li>
              <li>
                <a href="#custom-studio" className="hover:text-foreground transition-colors">
                  Colorway Swatch Palette
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-foreground transition-colors">
                  Yarn Care & Washing Manual
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-foreground transition-colors">
                  Artisan Collective Stories
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-3">
            <h4 className="text-foreground text-[11px] font-bold tracking-wider uppercase">
              Help & Policies
            </h4>
            <ul className="text-muted-foreground space-y-2">
              <li>
                <span className="hover:text-foreground cursor-pointer">Track Your Parcel</span>
              </li>
              <li>
                <span className="hover:text-foreground cursor-pointer">
                  Shipping & Delivery Info
                </span>
              </li>
              <li>
                <span className="hover:text-foreground cursor-pointer">
                  7-Day Easy Exchange Policy
                </span>
              </li>
              <li>
                <span className="hover:text-foreground cursor-pointer">
                  Privacy & Cookie Policy
                </span>
              </li>
              <li>
                <span className="hover:text-foreground cursor-pointer">Terms of Service</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="border-border text-muted-foreground flex flex-col items-center justify-between gap-4 border-t pt-8 text-xs sm:flex-row">
          <p className="flex items-center gap-1">
            © {new Date().getFullYear()} Yarn Delight. Crafted with{" "}
            <Heart className="inline size-3 fill-rose-500 text-rose-500" /> in India.
          </p>

          {/* Payment Badges (Flipkart Trust Vibe) */}
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground/80 text-[10px] font-bold uppercase">
              Secured by Razorpay:
            </span>
            <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold">
              <span className="bg-surface border-border text-foreground rounded border px-2 py-0.5">
                UPI
              </span>
              <span className="bg-surface border-border text-foreground rounded border px-2 py-0.5">
                RuPay
              </span>
              <span className="bg-surface border-border text-foreground rounded border px-2 py-0.5">
                Visa
              </span>
              <span className="bg-surface border-border text-foreground rounded border px-2 py-0.5">
                Mastercard
              </span>
              <span className="rounded border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-emerald-700">
                COD
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
