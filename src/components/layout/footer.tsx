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
    <footer className="bg-card border-border text-foreground border-t pt-12 pb-10">
      <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter Incentive Box */}
        <div className="border-border bg-surface flex flex-col items-center justify-between gap-6 rounded-2xl border p-6 sm:p-8 lg:flex-row">
          <div className="space-y-1 text-center lg:text-left">
            <span className="text-muted-foreground text-[10px] font-semibold tracking-wider uppercase">
              Yarn club updates
            </span>
            <h3 className="font-heading text-foreground text-xl font-bold">
              15% off your first drop
            </h3>
            <p className="text-muted-foreground max-w-md text-xs">
              Seasonal drop notices and custom commission availability sent directly to your inbox.
            </p>
          </div>

          {subscribed ? (
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-700">
              <Check className="size-4" />
              <span>Welcome to the club. Your 15% code has been sent.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex w-full gap-2 lg:max-w-sm">
              <div className="relative flex-1">
                <Mail className="text-muted-foreground absolute top-1/2 left-3 size-3.5 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="bg-background border-border focus:border-foreground/40 w-full rounded-lg border py-2 pr-3 pl-8 text-xs transition-colors outline-none"
                />
              </div>
              <Button
                type="submit"
                className="bg-foreground text-background hover:bg-foreground/90 shrink-0 rounded-lg px-4 text-xs font-semibold active:scale-[0.98]"
              >
                Join
              </Button>
            </form>
          )}
        </div>

        {/* Multi-column Navigation Links */}
        <div className="grid grid-cols-2 gap-8 text-xs md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Col */}
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="bg-primary/15 border-border flex size-8 items-center justify-center rounded-lg border">
                <span className="font-heading text-foreground text-xs font-bold">YD</span>
              </div>
              <span className="font-heading text-foreground text-base font-bold">Yarn Delight</span>
            </div>
            <p className="text-muted-foreground max-w-sm text-xs leading-relaxed">
              An independent slow-craft atelier. Every piece is hooked with patience using
              hypoallergenic cotton and merino yarns by women artisans in India.
            </p>
            <div className="text-muted-foreground flex items-center gap-2 pt-1 text-xs">
              <span>@yarndelight.craft</span>
            </div>
          </div>

          {/* Collections */}
          <div className="space-y-2.5">
            <h4 className="text-foreground text-[10px] font-semibold tracking-wider uppercase">
              Collections
            </h4>
            <ul className="text-muted-foreground space-y-1.5">
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
                  Winter Mufflers
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-foreground transition-colors">
                  Amigurumi Charms
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-foreground transition-colors">
                  Accessories
                </a>
              </li>
            </ul>
          </div>

          {/* Custom & Care */}
          <div className="space-y-2.5">
            <h4 className="text-foreground text-[10px] font-semibold tracking-wider uppercase">
              Custom & Care
            </h4>
            <ul className="text-muted-foreground space-y-1.5">
              <li>
                <a href="#custom-studio" className="hover:text-foreground transition-colors">
                  Commission Studio
                </a>
              </li>
              <li>
                <a href="#custom-studio" className="hover:text-foreground transition-colors">
                  Swatch Palette
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-foreground transition-colors">
                  Yarn Care Manual
                </a>
              </li>
            </ul>
          </div>

          {/* Delivery & Trust */}
          <div className="space-y-2.5">
            <h4 className="text-foreground text-[10px] font-semibold tracking-wider uppercase">
              Shipping & Help
            </h4>
            <ul className="text-muted-foreground space-y-1.5">
              <li>
                <span className="text-muted-foreground">Pan-India via Shiprocket</span>
              </li>
              <li>
                <span className="text-muted-foreground">Free delivery above ₹999</span>
              </li>
              <li>
                <span className="text-muted-foreground">7-Day exchange guarantee</span>
              </li>
              <li>
                <span className="text-muted-foreground">help@yarndelight.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-border/60 text-muted-foreground flex flex-col items-center justify-between gap-4 border-t pt-6 text-xs sm:flex-row">
          <p>
            © {new Date().getFullYear()} Yarn Delight. Crafted with slow-made integrity in India.
          </p>
          <div className="flex gap-4 text-[11px]">
            <span className="text-muted-foreground">Razorpay UPI & Cards</span>
            <span>•</span>
            <span className="text-muted-foreground">Shiprocket Logistics</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
