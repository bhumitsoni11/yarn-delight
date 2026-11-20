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
  { id: "tote", name: "Structured Tote", basePrice: 1599, icon: ShoppingBag },
  { id: "sling", name: "Crossbody Sling", basePrice: 1299, icon: Wallet },
  { id: "muffler", name: "Ribbed Muffler", basePrice: 1799, icon: Wind },
  { id: "plushie", name: "Amigurumi Mascot", basePrice: 599, icon: Smile },
  { id: "buckethat", name: "Floral Bucket Hat", basePrice: 999, icon: Flower2 },
]

const YARNS = [
  {
    id: "milk-cotton",
    name: "100% Milk Cotton",
    desc: "Soft, hypoallergenic, breathable",
    extraPrice: 0,
  },
  {
    id: "chenille",
    name: "Velvet Chenille",
    desc: "Cloud-like, fluffy texture",
    extraPrice: 200,
  },
  {
    id: "merino",
    name: "Chunky Merino Blend",
    desc: "Heavyweight, thermal winter weave",
    extraPrice: 400,
  },
]

const PALETTES = [
  { id: "strawberry", name: "Strawberry Blossom", colors: ["#F4B8C8", "#FFF9F5", "#E57373"] },
  { id: "matcha", name: "Matcha Latte", colors: ["#A8D5BA", "#FFF9F5", "#81C784"] },
  { id: "lavender", name: "Lavender Lilac", colors: ["#DCCBF4", "#FFF9F5", "#BBA5DE"] },
  { id: "butter", name: "Butter Vanilla", colors: ["#F7E6A7", "#FFF9F5", "#F4B8C8"] },
  { id: "espresso", name: "Espresso Mocha", colors: ["#493A3B", "#F3EBE6", "#A1887F"] },
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
    <section id="custom-studio" className="bg-surface/30 border-border scroll-mt-24 border-b py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl space-y-2 text-center">
          <div className="bg-surface border-border text-foreground inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-medium">
            <Scissors className="size-3.5" />
            <span>Commission studio</span>
          </div>
          <h2 className="font-heading text-foreground text-3xl font-bold tracking-tight">
            Design Your Custom Piece
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Select your silhouette, yarn texture, and colorway for an instant estimate.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Controls Column */}
          <div className="bg-card border-border space-y-6 rounded-2xl border p-5 sm:p-7 lg:col-span-7">
            {/* 1. Pick Silhouette */}
            <div>
              <label className="text-muted-foreground mb-2.5 flex items-center gap-2 text-xs font-semibold tracking-wider uppercase">
                <span className="bg-muted text-foreground flex size-4.5 items-center justify-center rounded-md font-mono text-[10px]">
                  1
                </span>
                <span>Silhouette</span>
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {SILHOUETTES.map((s) => {
                  const SIcon = s.icon
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedSilhouette(s)}
                      className={`rounded-xl border p-3 text-left transition-colors ${
                        selectedSilhouette.id === s.id
                          ? "border-foreground bg-muted/60"
                          : "border-border hover:bg-muted/30"
                      }`}
                    >
                      <SIcon className="text-foreground mb-2 size-5" />
                      <span className="text-foreground block text-xs font-semibold">{s.name}</span>
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
                <span className="bg-muted text-foreground flex size-4.5 items-center justify-center rounded-md font-mono text-[10px]">
                  2
                </span>
                <span>Yarn material</span>
              </label>
              <div className="space-y-2">
                {YARNS.map((y) => (
                  <button
                    key={y.id}
                    type="button"
                    onClick={() => setSelectedYarn(y)}
                    className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition-colors ${
                      selectedYarn.id === y.id
                        ? "border-foreground bg-muted/60"
                        : "border-border hover:bg-muted/30"
                    }`}
                  >
                    <div>
                      <span className="text-foreground block text-xs font-semibold">{y.name}</span>
                      <span className="text-muted-foreground text-[11px]">{y.desc}</span>
                    </div>
                    {y.extraPrice > 0 ? (
                      <span className="bg-muted text-foreground rounded px-1.5 py-0.5 font-mono text-xs font-medium tabular-nums">
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
                <span className="bg-muted text-foreground flex size-4.5 items-center justify-center rounded-md font-mono text-[10px]">
                  3
                </span>
                <span>Palette</span>
              </label>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {PALETTES.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPalette(p)}
                    className={`flex items-center gap-3 rounded-xl border p-2.5 text-left transition-colors ${
                      selectedPalette.id === p.id
                        ? "border-foreground bg-muted/60"
                        : "border-border hover:bg-muted/30"
                    }`}
                  >
                    <div className="flex shrink-0 -space-x-1.5">
                      {p.colors.map((c, i) => (
                        <div
                          key={i}
                          className="size-4.5 rounded-full border border-white"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                    <span className="text-foreground truncate text-xs font-medium">{p.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Special Requests Input */}
            <div>
              <label className="text-muted-foreground mb-2 flex items-center gap-2 text-xs font-semibold tracking-wider uppercase">
                <span className="bg-muted text-foreground flex size-4.5 items-center justify-center rounded-md font-mono text-[10px]">
                  4
                </span>
                <span>Instructions or monogram</span>
              </label>
              <textarea
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="e.g. Embroider initial S in cursive on front corner, or adjust strap length..."
                rows={2}
                className="border-border bg-surface text-foreground placeholder:text-muted-foreground focus:border-foreground/40 w-full resize-none rounded-xl border p-2.5 text-xs transition-colors outline-none"
              />
            </div>
          </div>

          {/* Real-time Live Estimation Summary Card */}
          <div className="bg-surface border-border sticky top-24 space-y-5 rounded-2xl border p-5 shadow-xs sm:p-6 lg:col-span-5">
            <div className="border-border flex items-center justify-between border-b pb-3">
              <h3 className="font-heading text-foreground text-sm font-semibold">
                Bespoke Specification
              </h3>
              <span className="border-border/80 bg-muted/60 text-muted-foreground rounded-md border px-2 py-0.5 font-mono text-[10px]">
                YD-CUSTOM
              </span>
            </div>

            {/* Spec Visual Summary */}
            <div className="space-y-2.5 text-xs">
              <div className="border-border/60 flex items-center justify-between border-b py-1.5">
                <span className="text-muted-foreground">Silhouette</span>
                <span className="text-foreground font-medium">{selectedSilhouette.name}</span>
              </div>

              <div className="border-border/60 flex items-center justify-between border-b py-1.5">
                <span className="text-muted-foreground">Yarn</span>
                <span className="text-foreground font-medium">{selectedYarn.name}</span>
              </div>

              <div className="border-border/60 flex items-center justify-between border-b py-1.5">
                <span className="text-muted-foreground">Palette</span>
                <span className="text-foreground flex items-center gap-1.5 font-medium">
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
                <span className="text-foreground font-mono">5–7 business days</span>
              </div>

              {/* Price Calculation */}
              <div className="text-foreground flex items-baseline justify-between pt-2">
                <div>
                  <span className="font-heading font-mono text-xl font-bold tabular-nums">
                    ₹{estimatedPrice.toLocaleString("en-IN")}
                  </span>
                  <p className="text-muted-foreground text-[10px]">Includes Pan-India delivery</p>
                </div>
                <span className="text-muted-foreground text-[11px]">Estimate</span>
              </div>
            </div>

            {submitted ? (
              <div className="border-border/80 bg-muted/30 space-y-2 rounded-xl border p-3.5 text-xs">
                <div className="flex items-center gap-1.5 font-medium text-emerald-700">
                  <Check className="size-4" />
                  <span>Specification received</span>
                </div>
                <p className="text-muted-foreground text-[11px] leading-relaxed">
                  Our Gujarat atelier will confirm exact yarn swatches and dimensional details with
                  you before hooking begins.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-foreground text-[11px] font-medium hover:underline"
                >
                  Configure another piece
                </button>
              </div>
            ) : (
              <Button
                onClick={handleInquirySubmit}
                className="bg-foreground text-background hover:bg-foreground/90 flex h-10 w-full items-center justify-center gap-2 rounded-xl text-xs font-semibold transition-colors active:scale-[0.98]"
              >
                <Send className="size-3.5" />
                <span>Request Custom Quote</span>
              </Button>
            )}

            <div className="bg-muted/30 text-muted-foreground space-y-1 rounded-xl p-3 text-[11px]">
              <p className="text-foreground flex items-center gap-1 font-medium">
                <HeartHandshake className="size-3.5" />
                <span>Slow-made guarantee</span>
              </p>
              <p className="leading-relaxed">
                You won&apos;t be charged immediately. Exact measurements and custom yarn swatches
                are confirmed beforehand.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
