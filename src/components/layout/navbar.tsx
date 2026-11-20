"use client"

import Link from "next/link"
import { useState } from "react"
import { Search, ShoppingBag, Heart, Sparkles, Menu, X } from "lucide-react"
import { useCartStore } from "@/store/cart.store"
import { Button } from "@/components/ui/button"
import { CROCHET_CATEGORIES } from "@/constants/categories"

interface NavbarProps {
  onSearchChange?: (query: string) => void
  onSelectCategory?: (slug: string) => void
  selectedCategory?: string
}

export function Navbar({ onSearchChange, onSelectCategory, selectedCategory }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchVal, setSearchVal] = useState("")
  const [wishlistCount, setWishlistCount] = useState(2)

  const items = useCartStore((state) => state.items)
  const toggleCart = useCartStore((state) => state.toggleCart)

  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setSearchVal(val)
    onSearchChange?.(val)
  }

  return (
    <header className="bg-background/95 border-border sticky top-0 z-40 border-b shadow-xs backdrop-blur-md transition-all">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link href="/" className="group flex shrink-0 items-center gap-2.5">
            <div className="bg-primary/30 border-primary/40 flex size-11 items-center justify-center rounded-2xl border shadow-xs transition-transform group-hover:scale-105">
              <span className="text-xl">🧶</span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-foreground flex items-center gap-1.5 text-2xl font-bold tracking-tight">
                Yarn Delight
                <Sparkles className="text-primary fill-primary/40 size-4" />
              </span>
              <span className="text-muted-foreground text-[10px] font-medium tracking-widest uppercase">
                Artisan Crochet • India
              </span>
            </div>
          </Link>

          {/* Flipkart-Style Omni Search Bar (Desktop) */}
          <div className="mx-6 hidden max-w-lg flex-1 md:flex">
            <div className="relative w-full">
              <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
              <input
                type="text"
                value={searchVal}
                onChange={handleSearch}
                placeholder="Search tote bags, mufflers, amigurumi charms..."
                className="bg-surface border-border focus:border-primary focus:ring-primary/20 placeholder:text-muted-foreground w-full rounded-full border py-2 pr-4 pl-10 text-sm transition-all outline-none focus:ring-3"
              />
              {searchVal && (
                <button
                  onClick={() => {
                    setSearchVal("")
                    onSearchChange?.("")
                  }}
                  className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3.5 -translate-y-1/2 text-xs"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Right Action Icons (Wishlist, Cart, Mobile Toggle) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Wishlist Button */}
            <button
              onClick={() => setWishlistCount((c) => c + 1)}
              className="hover:bg-muted text-foreground group relative rounded-full p-2.5 transition-colors"
              title="Your Wishlist"
            >
              <Heart className="text-foreground group-hover:text-primary size-5 transition-colors" />
              {wishlistCount > 0 && (
                <span className="bg-accent text-accent-foreground absolute top-1 right-1 flex size-4 items-center justify-center rounded-full text-[10px] font-bold shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Trigger Button */}
            <Button
              onClick={toggleCart}
              variant="default"
              className="bg-primary hover:bg-primary/90 text-text relative flex items-center gap-2 rounded-full px-4 py-2 font-medium shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <ShoppingBag className="size-4" />
              <span className="hidden sm:inline">Bag</span>
              {totalQuantity > 0 && (
                <span className="bg-text text-surface flex size-5 animate-bounce items-center justify-center rounded-full text-xs font-bold">
                  {totalQuantity}
                </span>
              )}
            </Button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-foreground hover:bg-muted rounded-xl p-2 md:hidden"
            >
              {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="pb-3 md:hidden">
          <div className="relative w-full">
            <Search className="text-muted-foreground absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
            <input
              type="text"
              value={searchVal}
              onChange={handleSearch}
              placeholder="Search crochet goods..."
              className="bg-surface border-border focus:border-primary w-full rounded-full border py-2 pr-4 pl-10 text-sm outline-none"
            />
          </div>
        </div>

        {/* Category Horizontal Nav Bar (Desktop & Mobile Scroll) */}
        <nav className="border-border/40 flex scrollbar-none items-center gap-1.5 overflow-x-auto border-t py-2.5 text-xs font-medium">
          <button
            onClick={() => onSelectCategory?.("all")}
            className={`rounded-full px-3.5 py-1.5 whitespace-nowrap transition-all ${
              !selectedCategory || selectedCategory === "all"
                ? "bg-text text-surface font-semibold shadow-xs"
                : "bg-surface hover:bg-muted text-muted-foreground border-border border"
            }`}
          >
            ✨ All Creations
          </button>
          {CROCHET_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.slug
            return (
              <button
                key={cat.slug}
                onClick={() => onSelectCategory?.(cat.slug)}
                className={`rounded-full px-3.5 py-1.5 whitespace-nowrap transition-all ${
                  isSelected
                    ? "bg-text text-surface font-semibold shadow-xs"
                    : "bg-surface hover:bg-muted text-muted-foreground border-border border"
                }`}
              >
                {cat.name}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-border bg-card space-y-3 border-t p-4 md:hidden">
          <div className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            Explore Collections
          </div>
          <div className="grid grid-cols-2 gap-2">
            {CROCHET_CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => {
                  onSelectCategory?.(cat.slug)
                  setMobileMenuOpen(false)
                }}
                className="bg-muted/60 hover:bg-muted text-foreground rounded-xl px-3 py-2 text-left text-sm"
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
