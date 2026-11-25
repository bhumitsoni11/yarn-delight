"use client"

import { ArrowRight, Star, ShieldCheck, Heart } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  onShopClick?: () => void
  onCustomClick?: () => void
}

export function HeroSection({ onShopClick, onCustomClick }: HeroSectionProps) {
  return (
    <section className="bg-surface border-border relative border-b py-12 lg:py-16">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="space-y-6 text-center lg:col-span-7 lg:text-left">
            {/* Handcrafted Tag Badge */}
            <div className="bg-primary-container/40 border-primary/20 text-on-primary-container mx-auto inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-semibold lg:mx-0">
              <span className="bg-primary size-2 rounded-full" />
              <span>Spring Solstice Drop • Studio Edition</span>
              <span className="text-muted-foreground">•</span>
              <span>100% Organic Cotton</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="font-heading text-on-surface text-4xl leading-[1.12] font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Artisanal Knots, <br />
              <span className="text-primary font-normal italic">Wearable Art.</span> <br />
              Handcrafted for You.
            </h1>

            {/* Sub-headline */}
            <p className="text-muted-foreground mx-auto max-w-xl text-sm leading-relaxed sm:text-base lg:mx-0">
              Lovingly made by women artisans in Gujarat using sustainably sourced organic cotton
              and combed highland wool. Pure slow fashion designed to be treasured for generations.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row lg:justify-start">
              <Button
                onClick={() => {
                  if (onShopClick) onShopClick()
                  else document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })
                }}
                className="bg-inverse-surface text-on-primary hover:bg-inverse-surface/90 flex h-12 w-full items-center justify-center gap-2 rounded-full px-7 text-xs font-semibold shadow-md transition-colors active:scale-[0.98] sm:w-auto"
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
                className="border-border bg-surface-container-lowest hover:bg-surface-container text-on-surface h-12 w-full rounded-full border px-7 text-xs font-semibold shadow-xs transition-colors active:scale-[0.98] sm:w-auto"
              >
                <span>Commission Custom Piece</span>
              </Button>
            </div>

            {/* Verified Trust Stats Ribbon */}
            <div className="bg-surface-container-low/70 border-border/60 mx-auto grid max-w-md grid-cols-3 gap-3 rounded-2xl border p-4 text-center lg:mx-0 lg:text-left">
              <div>
                <span className="font-heading text-primary font-mono text-xl font-bold tabular-nums">
                  4,800+
                </span>
                <p className="text-muted-foreground text-[11px]">Heirloom pieces</p>
              </div>
              <div>
                <span className="font-heading text-secondary flex items-center justify-center gap-1 font-mono text-xl font-bold tabular-nums lg:justify-start">
                  4.9 <Star className="fill-secondary text-secondary inline size-3.5" />
                </span>
                <p className="text-muted-foreground text-[11px]">Customer love</p>
              </div>
              <div>
                <span className="font-heading text-tertiary text-xl font-bold">18</span>
                <p className="text-muted-foreground text-[11px]">Female artisans</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="relative flex items-center justify-center lg:col-span-5">
            {/* Main Showcase Card */}
            <div className="bg-surface-container-lowest border-border/80 group relative w-full max-w-md rounded-3xl border p-3.5 shadow-xl">
              <div className="bg-surface-container relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJx3Z5kB1jbdGZZPuL7PQIo8LPuKw17n8Y9mLpK9fygOQ9sM9a3KvUOkzKPoIslRiFaKx8G4KjFE1Y8uwgYN-zu6rM64hB4dNp8NtaDeFw5N5SIINjZYqPizSIFoQtoZ8iud-18mN9wsu0YSci-T_HyfTxUwNfBIzFHgYgCkzpsqj3PZDOH4-sws43JZDPUrUdzVcfT0IYTLUU8kd-5MFk7Fche2Ji07_cnoeykZ8"
                  alt="Editorial handcrafted crochet boutique collection"
                  width={800}
                  height={1000}
                  unoptimized
                  priority
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-102"
                />

                {/* Floating Badge 1: 100% Hand-Stitched */}
                <div className="bg-surface/90 border-border/80 absolute top-4 left-4 flex items-center gap-1.5 rounded-full border px-3 py-1 shadow-sm backdrop-blur-md">
                  <ShieldCheck className="text-primary size-3.5" />
                  <span className="font-mono text-[10px] font-bold tracking-wider uppercase">
                    100% Hand-Stitched
                  </span>
                </div>

                {/* Floating Badge 2: Micro Batch */}
                <div className="bg-secondary-container text-on-secondary-container absolute bottom-4 left-4 rounded-full px-3 py-1 text-[10px] font-bold tracking-wider uppercase shadow-sm">
                  Micro Batch • 8 Left
                </div>
              </div>

              {/* Overlapping Mini Teaser Card (The Rosebud Tote) */}
              <div className="bg-surface-container-lowest border-border/80 absolute -bottom-5 -left-4 flex items-center gap-3 rounded-2xl border p-3 shadow-xl backdrop-blur-md sm:left-4">
                <div className="bg-primary-container size-12 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5F8HlNs4AFhg3MeJC3KmWZx-Gb0AuLb1ITIISy1JUc0J_zBjJLyH7C2NKoqtycspa_TXBqP0MU5y81gafmCDHqGm-cA0vq2upGNFTnNkiGh93y3ZeG4U1ztuAUDCz0-CU7MlKjMTHR-L9BbG-djr-9Oj-A2dxJ67-WioLKlahJbmz-nD6zH_KGboir75kvQ7yn8nRMb3xmZvUWFibmfIuqsr6LSA0RkpOuGhji84"
                    alt="Rosebud Tote macro stitch preview"
                    width={48}
                    height={48}
                    unoptimized
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-heading text-on-surface text-xs font-bold">The Rosebud Tote</p>
                  <p className="text-primary font-mono text-xs font-bold tabular-nums">₹3,499</p>
                </div>
                <div className="bg-primary-container text-on-primary-container ml-2 flex size-6 items-center justify-center rounded-full">
                  <Heart className="fill-primary size-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
