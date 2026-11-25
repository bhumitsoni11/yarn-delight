"use client"

import { useState, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { PRODUCTS, StoreProduct } from "@/data/products"
import { CROCHET_CATEGORIES } from "@/constants/categories"
import { AnnouncementBar } from "@/components/layout/announcement-bar"
import { Navbar } from "@/components/layout/navbar"
import { ProductCard } from "@/components/products/product-card"
import { Footer } from "@/components/layout/footer"
import { CartDrawer } from "@/components/cart/cart-drawer"
import { SlidersHorizontal, ArrowUpDown, X, Check } from "lucide-react"

function ShopContent() {
  const searchParams = useSearchParams()
  const initialCat = searchParams.get("category") || "all"

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCat)
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("all")
  const [inStockOnly, setInStockOnly] = useState<boolean>(false)
  const [sortBy, setSortBy] = useState<string>("featured")
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false)

  // Filter products
  const filteredProducts = useMemo(() => {
    let list: StoreProduct[] = [...PRODUCTS]

    // Category filter
    if (selectedCategory !== "all") {
      list = list.filter((p) => p.categorySlug === selectedCategory)
    }

    // Price range filter
    if (selectedPriceRange === "under-1000") {
      list = list.filter((p) => p.pricePaise < 100000)
    } else if (selectedPriceRange === "1000-2500") {
      list = list.filter((p) => p.pricePaise >= 100000 && p.pricePaise <= 250000)
    } else if (selectedPriceRange === "above-2500") {
      list = list.filter((p) => p.pricePaise > 250000)
    }

    // Availability filter
    if (inStockOnly) {
      list = list.filter((p) => p.inStock)
    }

    // Sorting
    if (sortBy === "price-low") {
      list.sort((a, b) => a.pricePaise - b.pricePaise)
    } else if (sortBy === "price-high") {
      list.sort((a, b) => b.pricePaise - a.pricePaise)
    } else if (sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === "newest") {
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    return list
  }, [selectedCategory, selectedPriceRange, inStockOnly, sortBy])

  const clearAllFilters = () => {
    setSelectedCategory("all")
    setSelectedPriceRange("all")
    setInStockOnly(false)
    setSortBy("featured")
  }

  const hasActiveFilters =
    selectedCategory !== "all" || selectedPriceRange !== "all" || inStockOnly

  return (
    <div className="bg-background selection:bg-primary/40 selection:text-text flex min-h-screen flex-col font-sans">
      <AnnouncementBar />
      <Navbar onSelectCategory={setSelectedCategory} selectedCategory={selectedCategory} />

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-8 sm:px-6 lg:px-12">
        {/* Header Breadcrumbs & Title */}
        <div className="mb-8 border-b border-border/60 pb-6">
          <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
            <span>Home</span>
            <span>/</span>
            <span className="font-semibold text-on-surface">Curated Catalogue</span>
          </div>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="font-heading text-3xl font-bold tracking-tight text-on-surface sm:text-4xl">
                The Atelier Catalogue
              </h1>
              <p className="mt-1 max-w-xl text-xs text-muted-foreground sm:text-sm">
                Each piece is slow-crafted by hand with pure organic cottons, alpacas, and heirloom
                techniques. Pan-India complimentary shipping on orders over ₹1,999.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Mobile Filter Trigger */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="flex items-center gap-2 rounded-full border border-border bg-surface-container-lowest px-4 py-2 text-xs font-semibold text-on-surface shadow-xs lg:hidden"
              >
                <SlidersHorizontal className="size-3.5" />
                <span>Filters {hasActiveFilters && "•"}</span>
              </button>

              {/* Sort Selector */}
              <div className="flex items-center gap-2 rounded-full border border-border bg-surface-container-lowest px-3 py-1.5 shadow-xs">
                <ArrowUpDown className="size-3.5 text-muted-foreground" />
                <span className="hidden text-[11px] text-muted-foreground sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-on-surface outline-none"
                >
                  <option value="featured">Featured Curations</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest Drops</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Content Layout: Filter Sidebar + Products Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Desktop Left Filter Sidebar */}
          <aside className="sticky top-28 hidden h-fit space-y-6 rounded-2xl border border-border/80 bg-surface-container-lowest p-5 shadow-xs lg:block">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="size-4 text-primary" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-on-surface">
                  Filter Pieces
                </h2>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-[11px] font-semibold text-primary underline transition-colors hover:text-on-surface"
                >
                  Reset All
                </button>
              )}
            </div>

            {/* Categories */}
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Categories
              </span>
              <div className="mt-2.5 space-y-1.5">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs transition-colors ${
                    selectedCategory === "all"
                      ? "bg-primary-container/40 font-bold text-on-primary-container"
                      : "text-muted-foreground hover:bg-surface-container-low hover:text-on-surface"
                  }`}
                >
                  <span>All Categories</span>
                  <span className="font-mono text-[10px] tabular-nums">{PRODUCTS.length}</span>
                </button>
                {CROCHET_CATEGORIES.map((cat) => {
                  const count = PRODUCTS.filter((p) => p.categorySlug === cat.slug).length
                  const isSelected = selectedCategory === cat.slug
                  return (
                    <button
                      key={cat.slug}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs transition-colors ${
                        isSelected
                          ? "bg-primary-container/40 font-bold text-on-primary-container"
                          : "text-muted-foreground hover:bg-surface-container-low hover:text-on-surface"
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="font-mono text-[10px] tabular-nums">{count}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Price Range */}
            <div className="border-t border-border/60 pt-4">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Price (INR)
              </span>
              <div className="mt-2.5 space-y-1.5">
                {[
                  { id: "all", label: "Any Price" },
                  { id: "under-1000", label: "Under ₹1,000" },
                  { id: "1000-2500", label: "₹1,000 – ₹2,500" },
                  { id: "above-2500", label: "Above ₹2,500" },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedPriceRange(tier.id)}
                    className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs transition-colors ${
                      selectedPriceRange === tier.id
                        ? "bg-primary-container/40 font-bold text-on-primary-container"
                        : "text-muted-foreground hover:bg-surface-container-low hover:text-on-surface"
                    }`}
                  >
                    <span>{tier.label}</span>
                    {selectedPriceRange === tier.id && <Check className="size-3 text-primary" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="border-t border-border/60 pt-4">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Stock & Craft
              </span>
              <label className="mt-2.5 flex cursor-pointer items-center justify-between rounded-lg p-2 hover:bg-surface-container-low">
                <span className="text-xs text-on-surface">Ready to Ship Only</span>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="size-4 rounded accent-primary cursor-pointer"
                />
              </label>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Active Filter Chips */}
            {hasActiveFilters && (
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="text-xs text-muted-foreground">Active:</span>
                {selectedCategory !== "all" && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary-container/30 px-3 py-1 text-xs font-medium text-on-surface">
                    {CROCHET_CATEGORIES.find((c) => c.slug === selectedCategory)?.name ||
                      selectedCategory}
                    <button
                      onClick={() => setSelectedCategory("all")}
                      className="hover:text-primary"
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                )}
                {selectedPriceRange !== "all" && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary-container/30 px-3 py-1 text-xs font-medium text-on-surface">
                    {selectedPriceRange === "under-1000"
                      ? "Under ₹1,000"
                      : selectedPriceRange === "1000-2500"
                        ? "₹1,000 – ₹2,500"
                        : "Above ₹2,500"}
                    <button
                      onClick={() => setSelectedPriceRange("all")}
                      className="hover:text-primary"
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                )}
                {inStockOnly && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary-container/30 px-3 py-1 text-xs font-medium text-on-surface">
                    Ready to Ship
                    <button onClick={() => setInStockOnly(false)} className="hover:text-primary">
                      <X className="size-3" />
                    </button>
                  </span>
                )}
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-primary underline hover:text-on-surface"
                >
                  Clear all
                </button>
              </div>
            )}

            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border py-16 text-center">
                <p className="font-heading text-lg font-semibold text-on-surface">
                  No artisan pieces match these criteria
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Try adjusting your price range or category filter.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-4 rounded-full bg-primary px-5 py-2 text-xs font-semibold text-on-primary shadow-xs transition-colors hover:bg-primary/90"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Filter Drawer Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex bg-black/40 backdrop-blur-xs lg:hidden">
          <div className="relative ml-auto flex h-full w-full max-w-xs flex-col bg-surface p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h2 className="font-heading text-lg font-bold text-on-surface">Refine Filters</h2>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="rounded-full p-1.5 text-muted-foreground hover:bg-muted"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto py-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Category
                </span>
                <div className="mt-2 space-y-1">
                  <button
                    onClick={() => {
                      setSelectedCategory("all")
                      setMobileFilterOpen(false)
                    }}
                    className={`block w-full rounded-md px-3 py-2 text-left text-xs ${
                      selectedCategory === "all"
                        ? "bg-primary text-on-primary font-semibold"
                        : "text-on-surface"
                    }`}
                  >
                    All Categories
                  </button>
                  {CROCHET_CATEGORIES.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => {
                        setSelectedCategory(cat.slug)
                        setMobileFilterOpen(false)
                      }}
                      className={`block w-full rounded-md px-3 py-2 text-left text-xs ${
                        selectedCategory === cat.slug
                          ? "bg-primary text-on-primary font-semibold"
                          : "text-on-surface"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Price
                </span>
                <div className="mt-2 space-y-1">
                  {[
                    { id: "all", label: "Any Price" },
                    { id: "under-1000", label: "Under ₹1,000" },
                    { id: "1000-2500", label: "₹1,000 – ₹2,500" },
                    { id: "above-2500", label: "Above ₹2,500" },
                  ].map((tier) => (
                    <button
                      key={tier.id}
                      onClick={() => {
                        setSelectedPriceRange(tier.id)
                        setMobileFilterOpen(false)
                      }}
                      className={`block w-full rounded-md px-3 py-2 text-left text-xs ${
                        selectedPriceRange === tier.id
                          ? "bg-primary text-on-primary font-semibold"
                          : "text-on-surface"
                      }`}
                    >
                      {tier.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full rounded-full bg-primary py-2.5 text-xs font-bold text-on-primary shadow-xs"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <CartDrawer />
    </div>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ShopContent />
    </Suspense>
  )
}
