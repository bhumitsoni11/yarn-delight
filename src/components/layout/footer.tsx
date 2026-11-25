"use client"

import { useState } from "react"
import { Mail, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
  }

  return (
    <footer className="bg-surface border-border text-on-surface border-t pt-14 pb-12">
      <div className="mx-auto max-w-[1440px] space-y-12 px-4 sm:px-6 lg:px-12">
        {/* Top Newsletter Incentive Box */}
        <div className="border-border/80 bg-surface-container-low/60 flex flex-col items-center justify-between gap-6 rounded-3xl border p-6 shadow-xs sm:p-8 lg:flex-row">
          <div className="space-y-1 text-center lg:text-left">
            <span className="text-primary text-[10px] font-bold tracking-wider uppercase">
              Join the Atelier Yarn Club
            </span>
            <h3 className="font-heading text-on-surface text-2xl font-bold">
              Unlock 15% off your first drop
            </h3>
            <p className="text-muted-foreground max-w-md text-xs sm:text-sm">
              Receive secret seasonal drops, crochet care guides, and VIP custom order slots.
            </p>
          </div>

          {subscribed ? (
            <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700">
              <Check className="size-4" />
              <span>Welcome to the club. Your 15% code has been sent.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex w-full gap-2 lg:max-w-md">
              <div className="relative flex-1">
                <Mail className="text-muted-foreground absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="bg-surface-container-lowest border-border/80 focus:border-primary/60 w-full rounded-full border py-2.5 pr-4 pl-10 text-xs transition-colors outline-none"
                />
              </div>
              <Button
                type="submit"
                className="bg-inverse-surface text-on-primary hover:bg-inverse-surface/90 shrink-0 rounded-full px-6 text-xs font-semibold shadow-xs active:scale-[0.98]"
              >
                Join Now
              </Button>
            </form>
          )}
        </div>

        {/* Multi-column Navigation Links */}
        <div className="grid grid-cols-2 gap-8 text-xs md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Col */}
          <div className="col-span-2 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="bg-primary-container/40 border-primary/20 flex size-9 items-center justify-center rounded-xl border">
                <span className="font-heading text-primary text-sm font-bold">YD</span>
              </div>
              <span className="font-heading text-on-surface text-lg font-bold">Yarn Delight</span>
            </div>
            <p className="text-muted-foreground max-w-sm text-xs leading-relaxed">
              An independent slow-craft crochet atelier celebrating slow fashion. Every single
              stitch is hooked with patience, using 100% natural, skin-friendly yarns crafted by
              women artisans in Gujarat, India.
            </p>
            <div className="text-muted-foreground flex items-center gap-2 pt-1 text-xs">
              <span className="text-primary font-medium">@yarndelight.craft</span>
              <span>•</span>
              <span>Handmade in Gujarat</span>
            </div>
          </div>

          {/* Collections */}
          <div className="space-y-3">
            <h4 className="text-on-surface font-mono text-[10px] font-bold tracking-wider uppercase">
              Collections
            </h4>
            <ul className="text-muted-foreground space-y-2">
              <li>
                <a href="#products" className="hover:text-primary transition-colors">
                  Crochet Handbags
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-primary transition-colors">
                  Purses &amp; Clutches
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-primary transition-colors">
                  Winter Mufflers &amp; Wraps
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-primary transition-colors">
                  Amigurumi Charms
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-primary transition-colors">
                  Hair Barrettes &amp; Collars
                </a>
              </li>
            </ul>
          </div>

          {/* Custom & Care */}
          <div className="space-y-3">
            <h4 className="text-on-surface font-mono text-[10px] font-bold tracking-wider uppercase">
              Custom &amp; Care
            </h4>
            <ul className="text-muted-foreground space-y-2">
              <li>
                <a href="#custom-studio" className="hover:text-primary transition-colors">
                  Bespoke Commission Studio
                </a>
              </li>
              <li>
                <a href="#custom-studio" className="hover:text-primary transition-colors">
                  Swatch Video Palette
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-primary transition-colors">
                  Yarn Washing &amp; Care Manual
                </a>
              </li>
              <li>
                <a href="#custom-studio" className="hover:text-primary transition-colors">
                  Slow-Made Movement FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Shipping & Help */}
          <div className="space-y-3">
            <h4 className="text-on-surface font-mono text-[10px] font-bold tracking-wider uppercase">
              Shipping &amp; Support
            </h4>
            <ul className="text-muted-foreground space-y-2">
              <li>
                <span className="text-muted-foreground">Pan-India via Shiprocket</span>
              </li>
              <li>
                <span className="text-muted-foreground">Free delivery above ₹999</span>
              </li>
              <li>
                <span className="text-muted-foreground">7-Day exchange policy</span>
              </li>
              <li>
                <span className="text-primary">help@yarndelight.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-border/60 text-muted-foreground flex flex-col items-center justify-between gap-4 border-t pt-6 text-xs sm:flex-row">
          <p>
            © {new Date().getFullYear()} Yarn Delight Atelier. Slow-made slow-fashion integrity in
            India.
          </p>
          <div className="flex gap-4 font-mono text-[11px]">
            <span>Razorpay 256-bit SSL</span>
            <span>•</span>
            <span>Shiprocket Pan-India Logistics</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
