"use client"

import { Sparkles, ArrowRight, Heart, Star, ShieldCheck } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  onShopClick?: () => void
  onCustomClick?: () => void
}

export function HeroSection({ onShopClick, onCustomClick }: HeroSectionProps) {
  return (
    <section className="from-primary/15 via-background to-background relative overflow-hidden bg-linear-to-b pt-8 pb-16 lg:py-20">
      {/* Decorative Pastel Background Blobs */}
      <div className="bg-primary/20 pointer-events-none absolute top-10 left-1/2 -z-10 h-[350px] w-[700px] -translate-x-1/2 rounded-full blur-[100px]" />
      <div className="bg-secondary/30 pointer-events-none absolute top-32 right-10 -z-10 h-[300px] w-[300px] rounded-full blur-[80px]" />
      <div className="bg-accent/25 pointer-events-none absolute bottom-10 left-10 -z-10 h-[250px] w-[250px] rounded-full blur-[90px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="space-y-6 text-center lg:col-span-7 lg:text-left">
            {/* Gen-Z Handcrafted Pill Badge */}
            <div className="bg-surface border-border text-foreground mx-auto inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold shadow-xs lg:mx-0">
              <span className="bg-primary size-2 animate-ping rounded-full" />
              <span>Winter &apos;26 Drop Is Live</span>
              <span className="text-muted-foreground">•</span>
              <span className="font-bold text-emerald-700">100% Pure Milk Cotton</span>
            </div>

            {/* Main Catchphrase */}
            <h1 className="font-heading text-foreground text-4xl leading-[1.12] font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Wearable Art, <br />
              <span className="text-text relative inline-block">
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
            <p className="text-muted-foreground mx-auto max-w-xl text-base leading-relaxed font-normal sm:text-lg lg:mx-0">
              Ditch factory mass-production. Explore whimsical crochet handbags, dreamy mufflers,
              and custom pieces individually hooked by artisan hands in India.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col items-center justify-center gap-3.5 pt-2 sm:flex-row lg:justify-start">
              <Button
                onClick={() => {
                  if (onShopClick) onShopClick()
                  else document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })
                }}
                className="bg-primary hover:bg-primary/90 text-text flex h-13 w-full items-center justify-center gap-2 rounded-full px-8 text-sm font-bold shadow-md transition-all hover:scale-105 active:scale-95 sm:w-auto"
              >
                <span>Shop New Drops</span>
                <ArrowRight className="size-4" />
              </Button>

              <Button
                onClick={() => {
                  if (onCustomClick) onCustomClick()
                  else
                    document.getElementById("custom-studio")?.scrollIntoView({ behavior: "smooth" })
                }}
                variant="outline"
                className="border-border bg-surface/80 hover:bg-muted text-foreground h-13 w-full rounded-full border-2 px-7 text-sm font-bold shadow-xs transition-all hover:scale-105 active:scale-95 sm:w-auto"
              >
                <span>Custom Commission Studio</span>
                <Sparkles className="text-primary fill-primary/40 size-4" />
              </Button>
            </div>

            {/* Social Proof & Trust Stats (Flipkart/Myntra Vibe) */}
            <div className="border-border/80 mx-auto grid max-w-md grid-cols-3 gap-4 border-t pt-6 text-center lg:mx-0 lg:text-left">
              <div>
                <span className="font-heading text-foreground text-2xl font-bold">5,000+</span>
                <p className="text-muted-foreground text-xs">Stitches Hooked</p>
              </div>
              <div>
                <span className="font-heading text-foreground flex items-center justify-center gap-1 text-2xl font-bold lg:justify-start">
                  4.9 <Star className="inline size-4 fill-amber-500 text-amber-500" />
                </span>
                <p className="text-muted-foreground text-xs">Verified Reviews</p>
              </div>
              <div>
                <span className="font-heading text-foreground text-2xl font-bold">Pan-India</span>
                <p className="text-muted-foreground text-xs">Fast Delivery</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="relative flex items-center justify-center lg:col-span-5">
            {/* Main Showcase Card */}
            <div className="bg-surface border-border group relative w-full max-w-sm rotate-1 rounded-3xl border p-4 shadow-xl transition-transform duration-500 hover:rotate-0">
              <div className="bg-muted/50 relative aspect-square w-full overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop"
                  alt="Strawberry Blossom Handbag"
                  width={800}
                  height={800}
                  unoptimized
                  priority
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="bg-secondary text-text absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase shadow-xs">
                  Bestseller
                </span>
                <div className="bg-surface/90 absolute top-3 right-3 flex size-9 items-center justify-center rounded-full text-rose-500 shadow-xs">
                  <Heart className="size-4.5 fill-rose-500" />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <h3 className="font-heading text-foreground text-base font-bold">
                    Strawberry Blossom Tote
                  </h3>
                  <p className="text-muted-foreground text-xs">100% Soft Milk Cotton Yarn</p>
                </div>
                <div className="text-right">
                  <span className="text-foreground text-lg font-bold">₹1,699</span>
                  <p className="text-muted-foreground text-[10px] line-through">₹2,299</p>
                </div>
              </div>
            </div>

            {/* Floating Gen-Z Badge 1 (Top Left) */}
            <div className="bg-surface/95 border-border absolute -top-4 -left-4 flex animate-bounce items-center gap-2.5 rounded-2xl border px-3.5 py-2 shadow-lg backdrop-blur-xs duration-1000 sm:-left-6">
              <span className="text-xl">🌸</span>
              <div className="text-left">
                <p className="text-foreground text-xs font-bold">Zero Synthetic Feel</p>
                <p className="text-muted-foreground text-[10px]">Natural & Breathable</p>
              </div>
            </div>

            {/* Floating Gen-Z Badge 2 (Bottom Right) */}
            <div className="bg-surface/95 border-border absolute -right-4 -bottom-5 flex items-center gap-2.5 rounded-2xl border px-3.5 py-2 shadow-lg backdrop-blur-xs sm:-right-6">
              <div className="flex size-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <ShieldCheck className="size-4" />
              </div>
              <div className="text-left">
                <p className="text-foreground text-xs font-bold">Direct from Artisans</p>
                <p className="text-muted-foreground text-[10px]">Fair Wage Certified</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
