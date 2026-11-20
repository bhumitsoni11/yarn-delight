"use client"

import { useState } from "react"
import { Sparkles, Scissors, Send, HeartHandshake } from "lucide-react"
import { Button } from "@/components/ui/button"

const SILHOUETTES = [
  { id: "tote", name: "Structured Tote", basePrice: 1599, icon: "👜" },
  { id: "sling", name: "Crossbody Sling", basePrice: 1299, icon: "👛" },
  { id: "muffler", name: "Cozy Ribbed Muffler", basePrice: 1799, icon: "🧣" },
  { id: "plushie", name: "Amigurumi Mascot", basePrice: 599, icon: "🐰" },
  { id: "buckethat", name: "Floral Bucket Hat", basePrice: 999, icon: "👒" },
]

const YARNS = [
  {
    id: "milk-cotton",
    name: "100% Milk Cotton",
    desc: "Soft, hypoallergenic & breathable",
    extraPrice: 0,
  },
  {
    id: "chenille",
    name: "Velvet Chenille",
    desc: "Super fluffy, cloud-like texture",
    extraPrice: 200,
  },
  {
    id: "merino",
    name: "Chunky Merino Blend",
    desc: "Heavyweight, ultra-warm winter weave",
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
    setTimeout(() => {
      alert(
        `🎉 Custom Commission Received!\n\nPiece: ${selectedSilhouette.name}\nYarn: ${selectedYarn.name}\nPalette: ${selectedPalette.name}\nEstimated Quote: ₹${estimatedPrice.toLocaleString("en-IN")}\n\nOur artisan will reach out via WhatsApp / Email with the exact yarn swatches!`
      )
      setSubmitted(false)
      setCustomNote("")
    }, 600)
  }

  return (
    <section
      id="custom-studio"
      className="from-background via-surface to-background border-border scroll-mt-24 border-b bg-linear-to-b py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl space-y-3 text-center">
          <div className="bg-accent/30 border-accent text-accent-foreground inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 text-xs font-bold tracking-wider uppercase">
            <Scissors className="size-3.5" />
            <span>Interactive Commission Studio</span>
          </div>
          <h2 className="font-heading text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl">
            Design Your Own Custom Crochet Creation
          </h2>
          <p className="text-muted-foreground text-sm">
            Have a dream palette or specific silhouette in mind? Configure your piece below to
            calculate an instant estimate and commission our master crochet artists.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Controls Column */}
          <div className="bg-card border-border space-y-8 rounded-3xl border p-6 shadow-sm sm:p-8 lg:col-span-7">
            {/* 1. Pick Silhouette */}
            <div>
              <label className="text-muted-foreground mb-3 flex items-center gap-2 text-xs font-bold tracking-wider uppercase">
                <span className="bg-primary/30 text-text flex size-5 items-center justify-center rounded-full text-[11px] font-bold">
                  1
                </span>
                <span>Select Silhouette</span>
              </label>
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {SILHOUETTES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedSilhouette(s)}
                    className={`rounded-2xl border p-3 text-left transition-all ${
                      selectedSilhouette.id === s.id
                        ? "border-primary bg-primary/10 shadow-xs"
                        : "border-border hover:bg-muted/50"
                    }`}
                  >
                    <span className="mb-1 block text-2xl">{s.icon}</span>
                    <span className="text-foreground block text-xs font-bold">{s.name}</span>
                    <span className="text-muted-foreground text-[11px]">From ₹{s.basePrice}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Pick Yarn */}
            <div>
              <label className="text-muted-foreground mb-3 flex items-center gap-2 text-xs font-bold tracking-wider uppercase">
                <span className="bg-primary/30 text-text flex size-5 items-center justify-center rounded-full text-[11px] font-bold">
                  2
                </span>
                <span>Select Yarn Texture</span>
              </label>
              <div className="space-y-2">
                {YARNS.map((y) => (
                  <button
                    key={y.id}
                    type="button"
                    onClick={() => setSelectedYarn(y)}
                    className={`flex w-full items-center justify-between rounded-2xl border p-3.5 text-left transition-all ${
                      selectedYarn.id === y.id
                        ? "border-primary bg-primary/10 shadow-xs"
                        : "border-border hover:bg-muted/50"
                    }`}
                  >
                    <div>
                      <span className="text-foreground block text-xs font-bold">{y.name}</span>
                      <span className="text-muted-foreground text-[11px]">{y.desc}</span>
                    </div>
                    {y.extraPrice > 0 ? (
                      <span className="text-text bg-secondary rounded-md px-2 py-0.5 text-xs font-semibold">
                        +₹{y.extraPrice}
                      </span>
                    ) : (
                      <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                        Standard
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Pick Palette */}
            <div>
              <label className="text-muted-foreground mb-3 flex items-center gap-2 text-xs font-bold tracking-wider uppercase">
                <span className="bg-primary/30 text-text flex size-5 items-center justify-center rounded-full text-[11px] font-bold">
                  3
                </span>
                <span>Choose Aesthetic Colorway</span>
              </label>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {PALETTES.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPalette(p)}
                    className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition-all ${
                      selectedPalette.id === p.id
                        ? "border-primary bg-primary/10 shadow-xs"
                        : "border-border hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex shrink-0 -space-x-1.5">
                      {p.colors.map((c, i) => (
                        <div
                          key={i}
                          className="size-5 rounded-full border border-white shadow-xs"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                    <span className="text-foreground truncate text-xs font-bold">{p.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Special Requests Input */}
            <div>
              <label className="text-muted-foreground mb-2 flex items-center gap-2 text-xs font-bold tracking-wider uppercase">
                <span className="bg-primary/30 text-text flex size-5 items-center justify-center rounded-full text-[11px] font-bold">
                  4
                </span>
                <span>Special Instructions or Monogram Initials</span>
              </label>
              <textarea
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="e.g. Please embroider the letter 'S' in cursive on the front corner, or make the strap 4 inches longer..."
                rows={3}
                className="border-border bg-surface text-foreground placeholder:text-muted-foreground focus:border-primary w-full resize-none rounded-2xl border p-3 text-xs outline-none"
              />
            </div>
          </div>

          {/* Real-time Live Estimation Summary Card */}
          <div className="bg-surface border-border sticky top-28 space-y-6 rounded-3xl border p-6 shadow-lg sm:p-7 lg:col-span-5">
            <div className="border-border flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="text-primary fill-primary/40 size-5" />
                <h3 className="font-heading text-foreground text-lg font-bold">
                  Your Bespoke Spec
                </h3>
              </div>
              <span className="bg-secondary text-text rounded-full px-2.5 py-0.5 text-xs font-bold">
                Custom Made
              </span>
            </div>

            {/* Spec Visual Summary */}
            <div className="space-y-3 text-xs">
              <div className="border-border/60 flex items-center justify-between border-b py-2">
                <span className="text-muted-foreground">Silhouette</span>
                <span className="text-foreground flex items-center gap-1.5 font-bold">
                  <span>{selectedSilhouette.icon}</span>
                  <span>{selectedSilhouette.name}</span>
                </span>
              </div>

              <div className="border-border/60 flex items-center justify-between border-b py-2">
                <span className="text-muted-foreground">Yarn Texture</span>
                <span className="text-foreground font-bold">{selectedYarn.name}</span>
              </div>

              <div className="border-border/60 flex items-center justify-between border-b py-2">
                <span className="text-muted-foreground">Color Aesthetic</span>
                <span className="text-foreground flex items-center gap-2 font-bold">
                  <div className="flex -space-x-1">
                    {selectedPalette.colors.map((c, i) => (
                      <div
                        key={i}
                        className="size-3.5 rounded-full border border-white"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                  <span>{selectedPalette.name}</span>
                </span>
              </div>

              <div className="border-border/60 flex items-center justify-between border-b py-2">
                <span className="text-muted-foreground">Crafting Window</span>
                <span className="text-foreground font-semibold">5-7 Business Days</span>
              </div>

              {/* Price Calculation */}
              <div className="text-foreground flex items-baseline justify-between pt-3">
                <div>
                  <span className="font-heading text-xl font-bold sm:text-2xl">
                    ₹{estimatedPrice.toLocaleString("en-IN")}
                  </span>
                  <p className="text-[10px] font-semibold text-emerald-600">
                    Includes Free Pan-India Delivery
                  </p>
                </div>
                <span className="text-muted-foreground text-[11px]">Estimate Price</span>
              </div>
            </div>

            <Button
              onClick={handleInquirySubmit}
              disabled={submitted}
              className="bg-text hover:bg-text/90 text-surface flex h-12 w-full items-center justify-center gap-2 rounded-2xl text-sm font-bold shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {submitted ? (
                <span>Submitting Spec...</span>
              ) : (
                <>
                  <Send className="size-4" />
                  <span>Request Custom Piece</span>
                </>
              )}
            </Button>

            <div className="bg-muted/40 text-muted-foreground space-y-1 rounded-2xl p-3 text-[11px]">
              <p className="text-foreground flex items-center gap-1 font-bold">
                <HeartHandshake className="text-primary size-3.5" />
                Handcrafted Guarantee
              </p>
              <p>
                You won&apos;t be charged immediately. An artisan will confirm exact yarn swatches
                and dimensional measurements with you before production starts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
