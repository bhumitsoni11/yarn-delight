"use client"

import { useState, useMemo } from "react"
import { SlidersHorizontal } from "lucide-react"
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
        break
    }

    return list
  }, [products, selectedTag, sortBy])

  return (
    <section id="products" className="scroll-mt-24 py-14">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <span className="bg-primary size-2 rounded-full" />
              <span className="text-primary text-[11px] font-bold tracking-widest uppercase">
                Fresh Off The Hook
              </span>
            </div>
            <h2 className="font-heading text-on-surface text-3xl font-bold tracking-tight sm:text-4xl">
              {searchQuery?.trim()
                ? `Results for "${searchQuery.trim()}"`
                : activeCategory && activeCategory !== "all"
                  ? `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1).replace("-", " ")} Releases`
                  : "Handcrafted Studio Releases"}
            </h2>
            <p className="text-muted-foreground mt-1 max-w-xl text-xs sm:text-sm">
              Individually hooked using organic cotton, combed highland wool, and hypoallergenic
              yarns.
            </p>
          </div>

          {/* Sort & Filter Controls (Flipkart Utility) */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="bg-surface-container-lowest border-border/80 text-on-surface flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium shadow-xs">
              <SlidersHorizontal className="text-muted-foreground size-3.5" />
              <span className="text-muted-foreground hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="cursor-pointer border-none bg-transparent font-medium outline-none"
              >
                <option value="featured">Featured picks</option>
                <option value="price-asc">Price: Low to high</option>
                <option value="price-desc">Price: High to low</option>
                <option value="rating">Highest rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Micro-Filter Tag Pills */}
        <div className="mb-6 flex scrollbar-none items-center gap-2 overflow-x-auto pb-2 text-xs">
          <span className="text-muted-foreground mr-1 shrink-0 text-[10px] font-semibold tracking-wider uppercase">
            Tags:
          </span>
          {availableTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`rounded-full px-3 py-1 whitespace-nowrap capitalize transition-colors ${
                selectedTag === tag
                  ? "bg-primary text-on-primary font-semibold shadow-xs"
                  : "bg-surface-container-lowest hover:bg-surface-container text-muted-foreground border-border/80 border"
              }`}
            >
              #{tag}
            </button>
          ))}
          <span className="text-muted-foreground ml-auto hidden shrink-0 font-mono text-xs tabular-nums sm:inline">
            Showing {filteredAndSortedProducts.length} pieces
          </span>
        </div>

        {/* Product Cards Grid */}
        {filteredAndSortedProducts.length === 0 ? (
          <div className="bg-surface-container-lowest border-border/80 space-y-4 rounded-3xl border border-dashed p-8 py-16 text-center">
            <h3 className="font-heading text-on-surface text-base font-semibold">
              No matching pieces found
            </h3>
            <p className="text-muted-foreground mx-auto max-w-md text-xs">
              We couldn&apos;t find anything matching your search. Try resetting filters or
              commission a custom piece.
            </p>
            <button
              onClick={() => {
                setSelectedTag("all")
                onResetFilters?.()
              }}
              className="bg-primary text-on-primary hover:bg-primary/90 rounded-full px-4 py-1.5 text-xs font-semibold shadow-xs transition-colors active:scale-[0.98]"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
