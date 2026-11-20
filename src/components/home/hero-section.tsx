"use client"

import { ArrowRight, Star, ShieldCheck } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  onShopClick?: () => void
  onCustomClick?: () => void
}

export function HeroSection({ onShopClick, onCustomClick }: HeroSectionProps) {
  return (
    <section className="bg-background border-border relative border-b py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="space-y-6 text-center lg:col-span-7 lg:text-left">
            {/* Handcrafted Tag Badge */}
            <div className="bg-surface border-border text-foreground mx-auto inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-xs font-medium lg:mx-0">
              <span className="size-2 rounded-full bg-emerald-600" />
              <span>Winter &apos;26 Drop</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">100% Pure Milk Cotton</span>
            </div>

            {/* Main Catchphrase */}
            <h1 className="font-heading text-foreground text-4xl leading-[1.12] font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Wearable Art, <br />
              <span className="text-foreground relative inline-block">
                Hand-Stitched
                <svg
                  className="text-primary/70 absolute -bottom-2 left-0 -z-10 h-3 w-full"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                  fill="currentColor"
                >
                  <path d="M0,15 Q50,0 100,15 L100,20 Q50,5 0,20 Z" />
                </svg>
              </span>{" "}
              For You.
            </h1>

            {/* Sub-headline */}
            <p className="text-muted-foreground mx-auto max-w-xl text-sm leading-relaxed sm:text-base lg:mx-0">
              Slow-made crochet handbags, mufflers, and custom pieces individually hooked by
              independent women artisans across India. No mass production.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row lg:justify-start">
              <Button
                onClick={() => {
                  if (onShopClick) onShopClick()
                  else document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })
                }}
                className="bg-foreground text-background hover:bg-foreground/90 flex h-11 w-full items-center justify-center gap-2 rounded-xl px-6 text-xs font-semibold shadow-xs transition-colors active:scale-[0.98] sm:w-auto"
              >
                <span>Shop New Drops</span>
                <ArrowRight className="size-3.5" />
              </Button>

              <Button
                onClick={() => {
                  if (onCustomClick) onCustomClick()
                  else
                    document.getElementById("custom-studio")?.scrollIntoView({ behavior: "smooth" })
                }}
                variant="outline"
                className="border-border bg-surface hover:bg-muted text-foreground h-11 w-full rounded-xl border px-6 text-xs font-semibold shadow-xs transition-colors active:scale-[0.98] sm:w-auto"
              >
                <span>Custom Commission Studio</span>
              </Button>
            </div>

            {/* Verified Trust Stats */}
            <div className="border-border/80 mx-auto grid max-w-md grid-cols-3 gap-4 border-t pt-6 text-center lg:mx-0 lg:text-left">
              <div>
                <span className="font-heading text-foreground font-mono text-xl font-bold tabular-nums">
                  5,000+
                </span>
                <p className="text-muted-foreground text-xs">Stitches hooked</p>
              </div>
              <div>
                <span className="font-heading text-foreground flex items-center justify-center gap-1 font-mono text-xl font-bold tabular-nums lg:justify-start">
                  4.9 <Star className="inline size-3.5 fill-amber-500 text-amber-500" />
                </span>
                <p className="text-muted-foreground text-xs">Verified reviews</p>
              </div>
              <div>
                <span className="font-heading text-foreground text-xl font-bold">Pan-India</span>
                <p className="text-muted-foreground text-xs">Express delivery</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="relative flex items-center justify-center lg:col-span-5">
            {/* Main Showcase Card */}
            <div className="bg-surface border-border group relative w-full max-w-sm rounded-2xl border p-4 shadow-sm">
              <div className="bg-muted/40 relative aspect-square w-full overflow-hidden rounded-xl">
                <Image
                  src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop"
                  alt="Strawberry Blossom Handbag"
                  width={800}
                  height={800}
                  unoptimized
                  priority
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-102"
                />
                <span className="bg-surface/90 border-border/80 text-foreground absolute top-3 left-3 rounded-md border px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase backdrop-blur-xs">
                  Bestseller
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <h3 className="font-heading text-foreground text-sm font-semibold">
                    Strawberry Blossom Tote
                  </h3>
                  <p className="text-muted-foreground text-xs">100% Milk cotton yarn</p>
                </div>
                <div className="text-right">
                  <span className="text-foreground font-mono text-sm font-bold tabular-nums">
                    ₹1,699
                  </span>
                  <p className="text-muted-foreground font-mono text-[11px] tabular-nums line-through">
                    ₹2,299
                  </p>
                </div>
              </div>

              {/* Artisan Note */}
              <div className="border-border/60 bg-muted/30 text-muted-foreground mt-3 flex items-center gap-2 rounded-lg border p-2 text-[11px]">
                <ShieldCheck className="size-3.5 shrink-0 text-emerald-600" />
                <span>Fair-wage certified • Crafted in Gujarat</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
