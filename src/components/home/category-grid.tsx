"use client"

import { CROCHET_CATEGORIES } from "@/constants/categories"
import { ArrowUpRight } from "lucide-react"

interface CategoryGridProps {
  onSelectCategory: (slug: string) => void
}

const CATEGORY_VISUALS: Record<string, { emoji: string; bg: string; count: string }> = {
  handbags: { emoji: "👜", bg: "bg-primary/20", count: "8 Designs" },
  purses: { emoji: "👛", bg: "bg-secondary/30", count: "12 Designs" },
  keychains: { emoji: "🌸", bg: "bg-accent/30", count: "24 Charms" },
  mufflers: { emoji: "🧣", bg: "bg-amber-100", count: "6 Warm Drops" },
  accessories: { emoji: "✨", bg: "bg-rose-100", count: "18 Essentials" },
  "custom-orders": { emoji: "🧵", bg: "bg-emerald-100", count: "Bespoke" },
}

export function CategoryGrid({ onSelectCategory }: CategoryGridProps) {
  return (
    <section id="categories" className="bg-surface/50 border-border/60 scroll-mt-24 border-y py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <span className="text-primary text-xs font-bold tracking-widest uppercase">
              Browse by Craft
            </span>
            <h2 className="font-heading text-foreground mt-0.5 text-3xl font-bold tracking-tight">
              Explore Product Lines
            </h2>
          </div>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Pick your favorite stitch aesthetic or commission a bespoke creation.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
          {CROCHET_CATEGORIES.map((cat) => {
            const visual = CATEGORY_VISUALS[cat.slug] || {
              emoji: "🧶",
              bg: "bg-muted",
              count: "Curated",
            }

            return (
              <div
                key={cat.slug}
                onClick={() => {
                  onSelectCategory(cat.slug)
                  document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })
                }}
                className="group border-border bg-card hover:border-primary/60 hover:shadow-card relative flex cursor-pointer flex-col justify-between rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`size-12 rounded-2xl ${visual.bg} flex items-center justify-center text-2xl transition-transform group-hover:scale-110`}
                  >
                    {visual.emoji}
                  </div>
                  <div className="bg-muted/60 group-hover:bg-primary group-hover:text-text flex size-6 items-center justify-center rounded-full transition-colors">
                    <ArrowUpRight className="size-3.5" />
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="font-heading text-foreground group-hover:text-primary-foreground line-clamp-1 text-sm font-bold transition-colors">
                    {cat.name}
                  </h3>
                  <span className="text-muted-foreground text-[11px] font-medium">
                    {visual.count}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
