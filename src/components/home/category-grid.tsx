"use client"

import { CROCHET_CATEGORIES } from "@/constants/categories"
import { ArrowUpRight, ShoppingBag, Wallet, Flower2, Wind, Scissors, Layers } from "lucide-react"

interface CategoryGridProps {
  onSelectCategory: (slug: string) => void
}

const CATEGORY_ICONS: Record<
  string,
  { icon: React.ComponentType<{ className?: string }>; count: string }
> = {
  handbags: { icon: ShoppingBag, count: "8 Designs" },
  purses: { icon: Wallet, count: "12 Designs" },
  keychains: { icon: Flower2, count: "24 Charms" },
  mufflers: { icon: Wind, count: "6 Warm Drops" },
  accessories: { icon: Scissors, count: "18 Essentials" },
  "custom-orders": { icon: Layers, count: "Bespoke" },
}

export function CategoryGrid({ onSelectCategory }: CategoryGridProps) {
  return (
    <section id="categories" className="bg-surface/40 border-border scroll-mt-24 border-b py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col justify-between gap-1 sm:flex-row sm:items-end">
          <div>
            <span className="text-muted-foreground text-[11px] font-semibold tracking-wider uppercase">
              Browse by craft
            </span>
            <h2 className="font-heading text-foreground mt-0.5 text-2xl font-bold tracking-tight">
              Product Lines
            </h2>
          </div>
          <p className="text-muted-foreground text-xs">
            Filter by stitch collection or commission a bespoke piece.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
          {CROCHET_CATEGORIES.map((cat) => {
            const visual = CATEGORY_ICONS[cat.slug] || {
              icon: ShoppingBag,
              count: "Curated",
            }
            const Icon = visual.icon

            return (
              <div
                key={cat.slug}
                onClick={() => {
                  onSelectCategory(cat.slug)
                  document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })
                }}
                className="group border-border bg-card hover:border-foreground/30 relative flex cursor-pointer flex-col justify-between rounded-xl border p-3.5 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="bg-muted text-foreground flex size-9 items-center justify-center rounded-lg">
                    <Icon className="size-4.5" />
                  </div>
                  <div className="text-muted-foreground group-hover:text-foreground flex size-5 items-center justify-center transition-colors">
                    <ArrowUpRight className="size-3.5" />
                  </div>
                </div>

                <div className="mt-3">
                  <h3 className="font-heading text-foreground line-clamp-1 text-xs font-semibold">
                    {cat.name}
                  </h3>
                  <span className="text-muted-foreground text-[10px]">{visual.count}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
