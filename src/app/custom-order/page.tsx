"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { AnnouncementBar } from "@/components/layout/announcement-bar"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import {
  Sparkles,
  Layers,
  Palette,
  Upload,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
} from "lucide-react"

const SILHOUETTES = [
  {
    id: "shoulder-bag",
    name: "Coquette Shoulder Bag",
    basePricePaise: 329900,
    desc: "Arch handle, structured body, daisy or bow appliques",
    time: "12-14 hours",
  },
  {
    id: "tote-bag",
    name: "Sweetheart Rosebud Tote",
    basePricePaise: 369900,
    desc: "Spacious everyday tote, dual reinforced handles",
    time: "14-16 hours",
  },
  {
    id: "clutch-pouch",
    name: "Pearl Evening Clutch / Pouch",
    basePricePaise: 189900,
    desc: "Satin lining, mother-of-pearl or beaded handle",
    time: "8-10 hours",
  },
  {
    id: "scarf-muffler",
    name: "Chunky Ribbed Muffler / Scarf",
    basePricePaise: 279900,
    desc: "Plush oversized scarf, ombré color transitions",
    time: "10-12 hours",
  },
  {
    id: "wearable-vest",
    name: "Artisan Vest / Peter-Pan Collar",
    basePricePaise: 249900,
    desc: "Custom chest & shoulder measurements",
    time: "14-18 hours",
  },
  {
    id: "amigurumi-charms",
    name: "Bag Charms & Micro Keychains",
    basePricePaise: 69900,
    desc: "Strawberries, cherries, bows, initial letters",
    time: "4-6 hours",
  },
]

const YARN_BLENDS = [
  {
    id: "milk-cotton",
    name: "100% Organic Milk Cotton (5-Ply)",
    premiumPaise: 0,
    desc: "Soft matte finish, sturdy stitch definition, hypoallergenic.",
  },
  {
    id: "velvet-chenille",
    name: "Plush Velvet Chenille",
    premiumPaise: 40000,
    desc: "Buttery soft, cloud-like texture, rich light reflection.",
  },
  {
    id: "mercerized-cotton",
    name: "Fine Egyptian Mercerized Cotton",
    premiumPaise: 30000,
    desc: "Silky subtle sheen, crisp lace detail, high tensile strength.",
  },
  {
    id: "alpaca-wool",
    name: "Highland Alpaca & Merino Blend",
    premiumPaise: 70000,
    desc: "Supreme warmth, ethereal halo fuzz, ultra-premium feel.",
  },
]

const PALETTES = [
  { id: "blush-ivory", name: "Blush Pink & Warm Ivory", colors: ["#f4b8c8", "#fff9f5"] },
  { id: "matcha-butter", name: "Matcha Latte & Buttercup", colors: ["#cbd5c0", "#f7e6a7"] },
  { id: "lavender-cream", name: "Lavender Dream & Cream", colors: ["#dccbf4", "#ffffff"] },
  { id: "mocha-powder", name: "Deep Mocha & Powder Rose", colors: ["#493a3b", "#f4b8c8"] },
  { id: "custom", name: "Custom Palette (Artisan Match)", colors: ["#e0e0e0", "#888888"] },
]

export default function CustomOrderPage() {
  const [selectedSilhouette, setSelectedSilhouette] = useState(SILHOUETTES[0].id)
  const [selectedYarn, setSelectedYarn] = useState(YARN_BLENDS[0].id)
  const [selectedPalette, setSelectedPalette] = useState(PALETTES[0].id)
  const [hardware, setHardware] = useState("Antique Gold Clasp")
  const [customNotes, setCustomNotes] = useState("")
  const [dimensions, setDimensions] = useState("Standard proportions")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [submittedRef, setSubmittedRef] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const activeSilhouetteObj = SILHOUETTES.find((s) => s.id === selectedSilhouette)!
  const activeYarnObj = YARN_BLENDS.find((y) => y.id === selectedYarn)!

  const basePricePaise = activeSilhouetteObj.basePricePaise
  const yarnPremiumPaise = activeYarnObj.premiumPaise
  const hardwarePremiumPaise = hardware.includes("Pearl") ? 50000 : 0
  const totalEstimatedPaise = basePricePaise + yarnPremiumPaise + hardwarePremiumPaise

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      const generatedRef = `CR-2026-${Math.floor(100 + Math.random() * 900)}`
      setIsSubmitting(false)
      setSubmittedRef(generatedRef)
    }, 1000)
  }

  return (
    <div className="bg-background selection:bg-primary/40 selection:text-text flex min-h-screen flex-col font-sans">
      <AnnouncementBar />
      <Navbar />

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-8 sm:px-6 lg:px-12">
        {/* Editorial Studio Header */}
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary-container/40 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-on-primary-container">
            <Sparkles className="size-3.5 text-primary" />
            Bespoke Slow-Craft Studio
          </span>
          <h1 className="font-heading mt-3 text-3xl font-bold tracking-tight text-on-surface sm:text-5xl">
            Custom Crochet Commissions
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-xs text-muted-foreground sm:text-sm">
            Work directly with our Gujarat atelier guild. From initial sketch to yarn dyeing and
            final stitch, each custom piece is an individual heirloom tailored to your vision.
          </p>
        </div>

        {/* 7-Step Craft Timeline Banner */}
        <section className="mb-12 rounded-3xl border border-border/80 bg-surface-container-low p-6 sm:p-8">
          <div className="mb-4 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
            <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
              The 7-Stage Bespoke Journey
            </h2>
            <span className="font-mono text-xs text-muted-foreground">
              Average Craft & Dispatch: 9–12 Business Days
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {[
              { num: "01", title: "Submit Brief", desc: "Silhouette & Mood" },
              { num: "02", title: "Studio Review", desc: "Within 24 Hours" },
              { num: "03", title: "Video Swatch", desc: "Yarn & Palette Video" },
              { num: "04", title: "Your Lock-in", desc: "Specs Confirmed" },
              { num: "05", title: "Hand-Stitching", desc: "5–8 Studio Days" },
              { num: "06", title: "Quality Check", desc: "Tension & Lining" },
              { num: "07", title: "Pan-India Ship", desc: "Eco Dustbag Box" },
            ].map((step, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border/60 bg-surface-container-lowest p-3 shadow-2xs"
              >
                <span className="font-mono text-xs font-bold text-primary">{step.num}</span>
                <p className="mt-1 text-xs font-bold text-on-surface">{step.title}</p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {submittedRef ? (
          <div className="mx-auto max-w-xl rounded-3xl border border-border/80 bg-surface-container-lowest p-8 text-center shadow-xs">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="size-8" />
            </div>
            <span className="mt-4 inline-block font-mono text-xs font-bold uppercase tracking-wider text-primary">
              Commission Brief Logged
            </span>
            <h2 className="font-heading mt-2 text-2xl font-bold text-on-surface">
              We&apos;ve Received Your Custom Request!
            </h2>
            <p className="mt-2 text-xs text-muted-foreground">
              Reference: <strong className="font-mono text-on-surface">{submittedRef}</strong>. Our
              master artisan will review your silhouette & yarn blend and reach out via WhatsApp
              within 24 hours with yarn swatch video previews.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Link
                href="/shop"
                className="rounded-full bg-primary px-6 py-2.5 text-xs font-bold text-on-primary shadow-xs"
              >
                Explore Ready-to-Ship Pieces
              </Link>
              <button
                onClick={() => setSubmittedRef(null)}
                className="rounded-full border border-border px-5 py-2.5 text-xs font-semibold text-on-surface"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Left Configurator Columns (8 cols) */}
            <div className="space-y-8 lg:col-span-8">
              {/* Step 1: Silhouette */}
              <div className="rounded-3xl border border-border/80 bg-surface-container-lowest p-6 shadow-xs">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
                    Step 01
                  </span>
                  <span className="text-xs text-muted-foreground">Choose Base Canvas</span>
                </div>
                <h3 className="font-heading text-xl font-bold text-on-surface">
                  Select Item Silhouette
                </h3>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {SILHOUETTES.map((s) => (
                    <label
                      key={s.id}
                      onClick={() => setSelectedSilhouette(s.id)}
                      className={`flex cursor-pointer flex-col justify-between rounded-2xl border p-4 transition-all ${
                        selectedSilhouette === s.id
                          ? "border-primary bg-primary-container/20 ring-1 ring-primary"
                          : "border-border/80 bg-surface hover:border-primary/40"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-on-surface">{s.name}</h4>
                          <span className="font-mono text-xs font-bold text-primary">
                            ₹{(s.basePricePaise / 100).toLocaleString("en-IN")}
                          </span>
                        </div>
                        <p className="mt-1 text-[11px] text-muted-foreground">{s.desc}</p>
                      </div>
                      <div className="mt-3 flex items-center gap-1.5 border-t border-border/60 pt-2 text-[10px] text-muted-foreground">
                        <Clock className="size-3 text-primary" />
                        <span>Craft Time: {s.time}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Step 2: Yarn Blend */}
              <div className="rounded-3xl border border-border/80 bg-surface-container-lowest p-6 shadow-xs">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
                    Step 02
                  </span>
                  <span className="text-xs text-muted-foreground">Texture & Feel</span>
                </div>
                <h3 className="font-heading text-xl font-bold text-on-surface">
                  Select Artisan Yarn Blend
                </h3>

                <div className="mt-4 space-y-3">
                  {YARN_BLENDS.map((y) => (
                    <label
                      key={y.id}
                      onClick={() => setSelectedYarn(y.id)}
                      className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all ${
                        selectedYarn === y.id
                          ? "border-primary bg-primary-container/20 ring-1 ring-primary"
                          : "border-border/80 bg-surface hover:border-primary/40"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Layers className="size-5 text-primary" />
                        <div>
                          <p className="text-xs font-bold text-on-surface">{y.name}</p>
                          <p className="text-[11px] text-muted-foreground">{y.desc}</p>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold text-on-surface">
                        {y.premiumPaise === 0
                          ? "Included"
                          : `+₹${(y.premiumPaise / 100).toLocaleString("en-IN")}`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Step 3: Color Palette & Hardware */}
              <div className="rounded-3xl border border-border/80 bg-surface-container-lowest p-6 shadow-xs">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
                    Step 03
                  </span>
                  <span className="text-xs text-muted-foreground">Colors & Details</span>
                </div>
                <h3 className="font-heading text-xl font-bold text-on-surface">
                  Palette & Finishing Touches
                </h3>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {PALETTES.map((p) => (
                    <label
                      key={p.id}
                      onClick={() => setSelectedPalette(p.id)}
                      className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-3.5 transition-all ${
                        selectedPalette === p.id
                          ? "border-primary bg-primary-container/20 ring-1 ring-primary"
                          : "border-border/80 bg-surface"
                      }`}
                    >
                      <div className="flex -space-x-1.5">
                        {p.colors.map((c, i) => (
                          <span
                            key={i}
                            className="size-5 rounded-full border border-white shadow-xs"
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-semibold text-on-surface">{p.name}</span>
                    </label>
                  ))}
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 border-t border-border/60 pt-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-on-surface">
                      Hardware / Handles Preference
                    </label>
                    <select
                      value={hardware}
                      onChange={(e) => setHardware(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-border/80 bg-surface px-3 py-2 text-xs outline-none focus:border-primary"
                    >
                      <option value="Antique Gold Clasp">Antique Brushed Gold Clasp (Included)</option>
                      <option value="Silver Chrome">Silver Chrome Metal Accents (Included)</option>
                      <option value="Natural Bamboo Handle">Natural Bamboo Arch Handles (Included)</option>
                      <option value="Freshwater Pearl Handle">
                        Freshwater Mother-of-Pearl Handle (+₹500)
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-on-surface">
                      Dimensions / Special Sizing
                    </label>
                    <input
                      type="text"
                      value={dimensions}
                      onChange={(e) => setDimensions(e.target.value)}
                      placeholder="e.g. Must fit 14-inch laptop / 25x18 cm"
                      className="mt-1.5 w-full rounded-xl border border-border/80 bg-surface px-3 py-2 text-xs outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Step 4: Notes & Contact */}
              <div className="rounded-3xl border border-border/80 bg-surface-container-lowest p-6 shadow-xs">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
                    Step 04
                  </span>
                  <span className="text-xs text-muted-foreground">Notes & Artisan Contact</span>
                </div>
                <h3 className="font-heading text-xl font-bold text-on-surface">
                  Share Your Inspiration & Details
                </h3>

                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground">
                      Special Design Notes, Monogram Initials or Motif Requests
                    </label>
                    <textarea
                      rows={3}
                      value={customNotes}
                      onChange={(e) => setCustomNotes(e.target.value)}
                      placeholder="Tell us any motifs you'd love (strawberries, daisies, bows, initials) or occasion..."
                      className="mt-1.5 w-full rounded-2xl border border-border/80 bg-surface p-3 text-xs outline-none focus:border-primary"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Aadhya Iyer"
                        className="mt-1 w-full rounded-xl border border-border/80 bg-surface px-3 py-2 text-xs outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="aadhya@example.com"
                        className="mt-1 w-full rounded-xl border border-border/80 bg-surface px-3 py-2 text-xs outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground">
                        WhatsApp (+91 India)
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="9884019283"
                        className="mt-1 w-full rounded-xl border border-border/80 bg-surface px-3 py-2 font-mono text-xs outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Transparent Quote Summary (4 cols) */}
            <div className="space-y-6 lg:col-span-4">
              <div className="sticky top-28 rounded-3xl border border-border/80 bg-surface-container-lowest p-6 shadow-xs">
                <h3 className="font-heading text-lg font-bold text-on-surface">
                  Live Transparent Estimate
                </h3>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Our quotes are honest and directly compensate the artisan guild for slow craft hours.
                </p>

                <div className="mt-5 space-y-3 text-xs border-y border-border/60 py-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{activeSilhouetteObj.name}</span>
                    <span className="font-mono font-semibold tabular-nums text-on-surface">
                      ₹{(basePricePaise / 100).toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Yarn: {activeYarnObj.name}</span>
                    <span className="font-mono font-semibold tabular-nums text-on-surface">
                      {yarnPremiumPaise === 0
                        ? "Included"
                        : `+₹${(yarnPremiumPaise / 100).toLocaleString("en-IN")}`}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Hardware: {hardware}</span>
                    <span className="font-mono font-semibold tabular-nums text-on-surface">
                      {hardwarePremiumPaise === 0
                        ? "Included"
                        : `+₹${(hardwarePremiumPaise / 100).toLocaleString("en-IN")}`}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pan-India Insured Shipping</span>
                    <span className="font-semibold text-emerald-700">FREE</span>
                  </div>

                  <div className="border-t border-border/60 pt-2 flex justify-between text-sm font-bold text-on-surface">
                    <span>Estimated Total</span>
                    <span className="font-mono text-base tabular-nums text-primary">
                      ₹{(totalEstimatedPaise / 100).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className="mt-6 w-full rounded-full bg-primary text-xs font-bold text-on-primary shadow-xs hover:bg-primary/90"
                >
                  {isSubmitting ? (
                    <span>Submitting Brief to Guild...</span>
                  ) : (
                    <>
                      <span>Submit Commission Request</span>
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </Button>

                <div className="mt-4 space-y-2 text-[11px] text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="size-4 text-emerald-600" />
                    <span>No upfront payment required until swatch approval</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="size-4 text-primary" />
                    <span>WhatsApp video review sent within 24 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </main>

      <Footer />
    </div>
  )
}
