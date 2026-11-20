"use client"

import { useState, useMemo } from "react"
import { PRODUCTS, getProductsByCategory } from "@/data/products"
import { AnnouncementBar } from "@/components/layout/announcement-bar"
import { Navbar } from "@/components/layout/navbar"
import { HeroSection } from "@/components/home/hero-section"
import { CategoryGrid } from "@/components/home/category-grid"
import { ProductGrid } from "@/components/products/product-grid"
import { CustomCommissionStudio } from "@/components/home/custom-commission-studio"
import { TrustSignals } from "@/components/home/trust-signals"
import { Footer } from "@/components/layout/footer"
import { CartDrawer } from "@/components/cart/cart-drawer"

export default function StorefrontHomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")

  // Compute filtered product set based on active category & search query
  const displayedProducts = useMemo(() => {
    let result = PRODUCTS

    if (selectedCategory && selectedCategory !== "all") {
      result = getProductsByCategory(selectedCategory)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      )
    }

    return result
  }, [selectedCategory, searchQuery])

  const handleResetFilters = () => {
    setSelectedCategory("all")
    setSearchQuery("")
  }

  return (
    <div className="bg-background selection:bg-primary/40 selection:text-text flex min-h-screen flex-col font-sans">
      {/* 1. Top Incentive Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Sticky Omnichannel Navigation */}
      <Navbar
        onSearchChange={setSearchQuery}
        onSelectCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />

      <main className="flex-1">
        {/* 3. Hero Showcase Section */}
        <HeroSection
          onShopClick={() => {
            document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })
          }}
          onCustomClick={() => {
            document.getElementById("custom-studio")?.scrollIntoView({ behavior: "smooth" })
          }}
        />

        {/* 4. Visual Category Showcase Grid */}
        <CategoryGrid
          onSelectCategory={(slug) => {
            setSelectedCategory(slug)
          }}
        />

        {/* 5. Main Product Catalog & Filters (Flipkart Utility) */}
        <ProductGrid
          products={displayedProducts}
          activeCategory={selectedCategory}
          searchQuery={searchQuery}
          onResetFilters={handleResetFilters}
        />

        {/* 6. Interactive Custom Commission Studio */}
        <CustomCommissionStudio />

        {/* 7. India-First Trust Signals Ribbon */}
        <TrustSignals />
      </main>

      {/* 8. Full-Fledged E-Commerce Footer */}
      <Footer />

      {/* 9. Slide-Over Shopping Bag Drawer */}
      <CartDrawer />
    </div>
  )
}
