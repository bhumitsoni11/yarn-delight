"use client"

import { useState, useMemo } from "react"
import { SlidersHorizontal, Sparkles } from "lucide-react"
import type { StoreProduct } from "@/data/products"
import { ProductCard } from "./product-card"

interface ProductGridProps {
  products: StoreProduct[]
  activeCategory?: string
  searchQuery?: string
  onResetFilters?: () => void
}

type SortOption = "featured" | "price-asc" | "price-desc" | "rating"

export function ProductGrid({
  products,
  activeCategory,
  searchQuery,
  onResetFilters,
}: ProductGridProps) {
  const [sortBy, setSortBy] = useState<SortOption>("featured")
  const [selectedTag, setSelectedTag] = useState<string>("all")

  // Extract unique tags across current products
  const availableTags = useMemo(() => {
    const set = new Set<string>()
    products.forEach((p) => p.tags.forEach((t) => set.add(t)))
    return ["all", ...Array.from(set).slice(0, 5)]
  }, [products])

  const filteredAndSortedProducts = useMemo(() => {
    let list = [...products]

    // Tag filter
    if (selectedTag !== "all") {
      list = list.filter((p) => p.tags.includes(selectedTag))
    }

    // Sort order
    switch (sortBy) {
      case "price-asc":
        list.sort((a, b) => a.pricePaise - b.pricePaise)
        break
      case "price-desc":
        list.sort((a, b) => b.pricePaise - a.pricePaise)
        break
      case "rating":
        list.sort((a, b) => b.rating - a.rating)
        break
      default:
        // Featured default
        break
    }

    return list
  }, [products, selectedTag, sortBy])

  return (
    <section id="products" className="scroll-mt-24 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="text-primary mb-1 flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase">
              <Sparkles className="fill-primary size-3.5" />
              <span>Handcrafted Collections</span>
            </div>
            <h2 className="font-heading text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
              {searchQuery?.trim()
                ? `Results for "${searchQuery.trim()}"`
                : activeCategory && activeCategory !== "all"
                  ? `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1).replace("-", " ")} Drops`
                  : "Curated Handmade Creations"}
            </h2>
            <p className="text-muted-foreground mt-1 max-w-xl text-sm">
              Each piece is individually crocheted by artisan hands using hypoallergenic, premium
              milk cotton and merino wool yarns.
            </p>
          </div>

          {/* Sort & Filter Controls (Flipkart Utility) */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="bg-surface border-border text-foreground flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium shadow-xs">
              <SlidersHorizontal className="text-muted-foreground size-3.5" />
              <span className="text-muted-foreground hidden sm:inline">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="cursor-pointer border-none bg-transparent font-semibold outline-none"
              >
                <option value="featured">Featured Picks</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Micro-Filter Tag Pills */}
        <div className="mb-6 flex scrollbar-none items-center gap-2 overflow-x-auto pb-4 text-xs">
          <span className="text-muted-foreground mr-1 shrink-0 text-[11px] font-semibold tracking-wider uppercase">
            Tags:
          </span>
          {availableTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`rounded-full px-3 py-1 whitespace-nowrap capitalize transition-all ${
                selectedTag === tag
                  ? "bg-primary text-text scale-105 font-bold shadow-xs"
                  : "bg-surface hover:bg-muted text-muted-foreground border-border border"
              }`}
            >
              #{tag}
            </button>
          ))}
          <span className="text-muted-foreground ml-auto hidden shrink-0 text-xs sm:inline">
            Showing <strong>{filteredAndSortedProducts.length}</strong> items
          </span>
        </div>

        {/* Product Cards Grid */}
        {filteredAndSortedProducts.length === 0 ? (
          <div className="bg-surface border-border space-y-4 rounded-3xl border border-dashed p-8 py-16 text-center">
            <span className="text-4xl">🔍</span>
            <h3 className="font-heading text-foreground text-xl font-bold">
              No matching pieces found
            </h3>
            <p className="text-muted-foreground mx-auto max-w-md text-sm">
              We couldn&apos;t find anything matching your search. Try resetting filters or request
              a bespoke crochet piece!
            </p>
            <button
              onClick={() => {
                setSelectedTag("all")
                onResetFilters?.()
              }}
              className="bg-primary text-text rounded-full px-5 py-2 text-xs font-semibold shadow-xs transition-transform hover:scale-105"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
