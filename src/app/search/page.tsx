"use client"

import { useState, useMemo, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { PRODUCTS, searchProducts } from "@/data/products"
import { AnnouncementBar } from "@/components/layout/announcement-bar"
import { Navbar } from "@/components/layout/navbar"
import { ProductCard } from "@/components/products/product-card"
import { Footer } from "@/components/layout/footer"
import { CartDrawer } from "@/components/cart/cart-drawer"
import { Search, X, Sparkles } from "lucide-react"

const POPULAR_SEARCHES = [
  "Rosebud Tote",
  "Daisy Mini Bag",
  "Pearl Clutch",
  "Amigurumi Strawberry",
  "Hair Bows",
  "Lavender Scarf",
  "Custom Commission",
]

function SearchContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""

  const [query, setQuery] = useState(initialQuery)

  const results = useMemo(() => {
    return searchProducts(query)
  }, [query])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <div className="bg-background selection:bg-primary/40 selection:text-text flex min-h-screen flex-col font-sans">
      <AnnouncementBar />
      <Navbar />

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-8 sm:px-6 lg:px-12">
        {/* Search Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary-container/40 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-on-primary-container">
            <Sparkles className="size-3 text-primary" />
            Curated Atelier Search
          </span>
          <h1 className="font-heading mt-3 text-3xl font-bold tracking-tight text-on-surface sm:text-4xl">
            Find Your Handcrafted Treasure
          </h1>
          <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
            Search across bespoke tote bags, milk cotton clutches, fruit keychains, and winter mufflers.
          </p>

          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative mt-6">
            <Search className="text-muted-foreground absolute top-1/2 left-4 size-5 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type to search pieces, yarn types, motifs..."
              className="w-full rounded-full border border-border/80 bg-surface-container-lowest py-3.5 pr-12 pl-12 text-sm shadow-xs outline-none transition-colors focus:border-primary"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-muted-foreground hover:text-on-surface absolute top-1/2 right-4 -translate-y-1/2 rounded-full p-1"
              >
                <X className="size-4" />
              </button>
            )}
          </form>

          {/* Popular Tag Chips */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="text-[11px] font-medium text-muted-foreground">Trending:</span>
            {POPULAR_SEARCHES.map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="rounded-full border border-border/60 bg-surface-container-lowest px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-on-surface"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results Area */}
        <div className="mt-12 border-t border-border/60 pt-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-heading text-xl font-bold text-on-surface">
              {query.trim() ? `Search Results for "${query}"` : "All Artisan Pieces"}
            </h2>
            <span className="font-mono text-xs tabular-nums text-muted-foreground">
              {results.length} Pieces Found
            </span>
          </div>

          {results.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border py-16 text-center">
              <p className="font-heading text-lg font-semibold text-on-surface">
                No pieces found matching &ldquo;{query}&rdquo;
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Check your spelling or explore our bestselling categories below.
              </p>
              <button
                onClick={() => setQuery("")}
                className="mt-4 rounded-full bg-primary px-5 py-2 text-xs font-semibold text-on-primary shadow-xs transition-colors hover:bg-primary/90"
              >
                View All Pieces
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <SearchContent />
    </Suspense>
  )
}
