"use client"

import { useState } from "react"
import {
  Scissors,
  Send,
  HeartHandshake,
  Check,
  ShoppingBag,
  Wallet,
  Wind,
  Smile,
  Flower2,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const SILHOUETTES = [
  { id: "tote", name: "The Rosebud Tote", basePrice: 3499, icon: ShoppingBag },
  { id: "clutch", name: "Pearl Evening Clutch", basePrice: 1899, icon: Wallet },
  { id: "muffler", name: "Chunky Ribbed Muffler", basePrice: 2799, icon: Wind },
  { id: "charm", name: "Amigurumi Mascot Charm", basePrice: 499, icon: Smile },
  { id: "collar", name: "Peter-Pan Scalloped Collar", basePrice: 899, icon: Flower2 },
]

const YARNS = [
  {
    id: "milk-cotton",
    name: "100% Organic Milk Cotton",
    desc: "Silky soft, hypoallergenic & breathable",
    extraPrice: 0,
  },
  {
    id: "chenille",
    name: "Velvet Cloud Chenille",
    desc: "Super plush, tactile 3D volume",
    extraPrice: 300,
  },
  {
    id: "alpaca",
    name: "Highland Alpaca & Merino Blend",
    desc: "Heavyweight winter warmth & natural lustre",
    extraPrice: 600,
  },
]

const PALETTES = [
  { id: "strawberry", name: "Strawberry Rosette", colors: ["#F4B8C8", "#FFF9F5", "#E57373"] },
  { id: "buttercup", name: "Buttercup Meadow", colors: ["#F7E6A7", "#FFF9F5", "#CBD5C0"] },
  { id: "lavender", name: "Lavender Whisper", colors: ["#DCCBF4", "#FFF9F5", "#BBA5DE"] },
  { id: "ganache", name: "Cocoa Ganache", colors: ["#493A3B", "#F3EBE6", "#A1887F"] },
]

const STEPS = [
  { num: "01", title: "Submit Spec", desc: "Silhouette & colors" },
  { num: "02", title: "Studio Review", desc: "Within 24 hours" },
  { num: "03", title: "Swatch Video", desc: "Confirm yarn shade" },
  { num: "04", title: "Your Approval", desc: "Lock dimensions" },
  { num: "05", title: "Handcrafting", desc: "5–8 studio days" },
  { num: "06", title: "Quality Check", desc: "Tension & lining" },
  { num: "07", title: "Pan-India Ship", desc: "Eco muslin pouch" },
]

export function CustomCommissionStudio() {
  const [selectedSilhouette, setSelectedSilhouette] = useState(SILHOUETTES[0])
  const [selectedYarn, setSelectedYarn] = useState(YARNS[0])
  const [selectedPalette, setSelectedPalette] = useState(PALETTES[0])
  const [customNote, setCustomNote] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const estimatedPrice = selectedSilhouette.basePrice + selectedYarn.extraPrice

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section
      id="custom-studio"
      className="bg-surface-container-low/50 border-border scroll-mt-24 border-b py-16"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-2xl space-y-2 text-center">
          <div className="bg-secondary-container/70 border-border/80 text-on-secondary-container inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 text-xs font-semibold">
            <Scissors className="text-primary size-3.5" />
            <span>Exclusive Bespoke Studio</span>
          </div>
          <h2 className="font-heading text-on-surface text-3xl font-bold tracking-tight sm:text-4xl">
            Bespoke Studio: Made For You, Stitch By Stitch
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Collaborate directly with our master crochet artisans in Gujarat on individual bespoke
            creations.
          </p>
        </div>

        {/* 7-Milestone Slow Craft Stepper Ribbon */}
        <div className="bg-surface-container-lowest border-border/80 mb-10 rounded-2xl border p-4 shadow-xs">
          <div className="mb-3 flex items-center justify-between px-1 text-xs">
            <span className="text-primary text-[10px] font-bold tracking-wider uppercase">
              The Slow Craft Journey
            </span>
            <span className="text-muted-foreground hidden font-mono text-[11px] sm:inline">
              Average Turnaround: 9 to 12 Business Days
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-7">
            {STEPS.map((s, idx) => (
              <div
                key={idx}
                className="bg-surface-container-low/70 border-border/60 rounded-xl border p-2.5 transition-colors"
              >
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-primary font-mono text-[11px] font-bold">{s.num}</span>
                </div>
                <p className="font-heading text-on-surface text-xs leading-tight font-semibold">
                  {s.title}
                </p>
                <span className="text-muted-foreground text-[10px]">{s.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Configurator Grid */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Controls Column */}
          <div className="bg-surface-container-lowest border-border/80 space-y-6 rounded-3xl border p-5 shadow-xs sm:p-7 lg:col-span-7">
            {/* 1. Pick Silhouette */}
            <div>
              <label className="text-muted-foreground mb-2.5 flex items-center gap-2 text-xs font-semibold tracking-wider uppercase">
                <span className="bg-primary-container text-on-primary-container flex size-4.5 items-center justify-center rounded-full font-mono text-[10px] font-bold">
                  1
                </span>
                <span>Select Silhouette</span>
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {SILHOUETTES.map((s) => {
                  const SIcon = s.icon
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedSilhouette(s)}
                      className={`rounded-2xl border p-3 text-left transition-colors ${
                        selectedSilhouette.id === s.id
                          ? "border-primary bg-primary-container/20 shadow-xs"
                          : "border-border/80 hover:bg-surface-container-low"
                      }`}
                    >
                      <SIcon className="text-primary mb-1.5 size-5" />
                      <span className="text-on-surface block text-xs font-semibold">{s.name}</span>
                      <span className="text-muted-foreground font-mono text-[11px] tabular-nums">
                        From ₹{s.basePrice}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 2. Pick Yarn */}
            <div>
              <label className="text-muted-foreground mb-2.5 flex items-center gap-2 text-xs font-semibold tracking-wider uppercase">
                <span className="bg-primary-container text-on-primary-container flex size-4.5 items-center justify-center rounded-full font-mono text-[10px] font-bold">
                  2
                </span>
                <span>Choose Yarn Material</span>
              </label>
              <div className="space-y-2">
                {YARNS.map((y) => (
                  <button
                    key={y.id}
                    type="button"
                    onClick={() => setSelectedYarn(y)}
                    className={`flex w-full items-center justify-between rounded-2xl border p-3 text-left transition-colors ${
                      selectedYarn.id === y.id
                        ? "border-primary bg-primary-container/20 shadow-xs"
                        : "border-border/80 hover:bg-surface-container-low"
                    }`}
                  >
                    <div>
                      <span className="text-on-surface block text-xs font-semibold">{y.name}</span>
                      <span className="text-muted-foreground text-[11px]">{y.desc}</span>
                    </div>
                    {y.extraPrice > 0 ? (
                      <span className="bg-secondary-container text-on-secondary-container rounded-full px-2 py-0.5 font-mono text-xs font-semibold tabular-nums">
                        +₹{y.extraPrice}
                      </span>
                    ) : (
                      <span className="text-muted-foreground text-xs">Included</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Pick Palette */}
            <div>
              <label className="text-muted-foreground mb-2.5 flex items-center gap-2 text-xs font-semibold tracking-wider uppercase">
                <span className="bg-primary-container text-on-primary-container flex size-4.5 items-center justify-center rounded-full font-mono text-[10px] font-bold">
                  3
                </span>
                <span>Atelier Color Palette</span>
              </label>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {PALETTES.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPalette(p)}
                    className={`flex items-center gap-3 rounded-2xl border p-2.5 text-left transition-colors ${
                      selectedPalette.id === p.id
                        ? "border-primary bg-primary-container/20 shadow-xs"
                        : "border-border/80 hover:bg-surface-container-low"
                    }`}
                  >
                    <div className="flex shrink-0 -space-x-1.5">
                      {p.colors.map((c, i) => (
                        <div
                          key={i}
                          className="size-4.5 rounded-full border border-white shadow-2xs"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                    <span className="text-on-surface truncate text-xs font-medium">{p.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Special Requests Input */}
            <div>
              <label className="text-muted-foreground mb-2 flex items-center gap-2 text-xs font-semibold tracking-wider uppercase">
                <span className="bg-primary-container text-on-primary-container flex size-4.5 items-center justify-center rounded-full font-mono text-[10px] font-bold">
                  4
                </span>
                <span>Monogram Initial & Custom Instructions</span>
              </label>
              <textarea
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="e.g. Embroider initial S in cursive on front corner, or make the shoulder strap 4 inches longer..."
                rows={2}
                className="bg-surface-container-low/40 border-border/80 text-on-surface placeholder:text-muted-foreground focus:border-primary/60 w-full resize-none rounded-2xl border p-3 text-xs transition-colors outline-none"
              />
            </div>
          </div>

          {/* Real-time Live Estimation Summary Card */}
          <div className="bg-surface-container-lowest border-border/80 sticky top-24 space-y-5 rounded-3xl border p-5 shadow-sm sm:p-6 lg:col-span-5">
            <div className="border-border flex items-center justify-between border-b pb-3">
              <h3 className="font-heading text-on-surface text-sm font-semibold">
                Bespoke Specification
              </h3>
              <span className="bg-primary-container text-on-primary-container rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold">
                BATCH-28
              </span>
            </div>

            {/* Spec Visual Summary */}
            <div className="space-y-2.5 text-xs">
              <div className="border-border/60 flex items-center justify-between border-b py-1.5">
                <span className="text-muted-foreground">Silhouette</span>
                <span className="text-on-surface font-medium">{selectedSilhouette.name}</span>
              </div>

              <div className="border-border/60 flex items-center justify-between border-b py-1.5">
                <span className="text-muted-foreground">Yarn Texture</span>
                <span className="text-on-surface font-medium">{selectedYarn.name}</span>
              </div>

              <div className="border-border/60 flex items-center justify-between border-b py-1.5">
                <span className="text-muted-foreground">Color Palette</span>
                <span className="text-on-surface flex items-center gap-1.5 font-medium">
                  <div className="flex -space-x-1">
                    {selectedPalette.colors.map((c, i) => (
                      <div
                        key={i}
                        className="size-3 rounded-full border border-white"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                  <span>{selectedPalette.name}</span>
                </span>
              </div>

              <div className="border-border/60 flex items-center justify-between border-b py-1.5">
                <span className="text-muted-foreground">Crafting window</span>
                <span className="text-on-surface font-mono">5–8 business days</span>
              </div>

              {/* Price Calculation */}
              <div className="text-on-surface flex items-baseline justify-between pt-2">
                <div>
                  <span className="font-heading font-mono text-xl font-bold tabular-nums">
                    ₹{estimatedPrice.toLocaleString("en-IN")}
                  </span>
                  <p className="text-[10px] font-semibold text-emerald-700">
                    Includes Pan-India Free Delivery
                  </p>
                </div>
                <span className="text-muted-foreground text-[11px]">Estimate Quote</span>
              </div>
            </div>

            {submitted ? (
              <div className="border-border/80 bg-surface-container-low/70 space-y-2 rounded-2xl border p-4 text-xs">
                <div className="flex items-center gap-1.5 font-semibold text-emerald-700">
                  <Check className="size-4" />
                  <span>Custom Commission Received</span>
                </div>
                <p className="text-muted-foreground text-[11px] leading-relaxed">
                  Our master artisan will reach out on WhatsApp/email with yarn video swatches and
                  dimensional measurements.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-primary text-[11px] font-medium hover:underline"
                >
                  Configure another piece
                </button>
              </div>
            ) : (
              <Button
                onClick={handleInquirySubmit}
                className="bg-inverse-surface text-on-primary hover:bg-inverse-surface/90 flex h-11 w-full items-center justify-center gap-2 rounded-full text-xs font-semibold shadow-md transition-colors active:scale-[0.98]"
              >
                <Send className="size-3.5" />
                <span>Request Custom Piece</span>
              </Button>
            )}

            <div className="bg-surface-container-low/50 text-muted-foreground space-y-1 rounded-2xl p-3 text-[11px]">
              <p className="text-on-surface flex items-center gap-1 font-semibold">
                <HeartHandshake className="text-primary size-3.5" />
                <span>Slow-Made Guarantee</span>
              </p>
              <p className="leading-relaxed">
                You won&apos;t be charged immediately. Yarn swatches and tension measurements are
                verified with you beforehand.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
