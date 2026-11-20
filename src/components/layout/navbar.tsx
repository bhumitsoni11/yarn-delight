"use client"

import Link from "next/link"
import { useState } from "react"
import { Search, ShoppingBag, Heart, Menu, X } from "lucide-react"
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
    <header className="bg-background/95 border-border sticky top-0 z-40 border-b backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link href="/" className="group flex shrink-0 items-center gap-2.5">
            <div className="bg-primary/15 border-border flex size-9 items-center justify-center rounded-xl border">
              <span className="font-heading text-foreground text-sm font-bold">YD</span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-foreground text-xl font-bold tracking-tight">
                Yarn Delight
              </span>
              <span className="text-muted-foreground text-[10px] font-medium tracking-wider uppercase">
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
                placeholder="Search tote bags, mufflers, charms..."
                className="bg-surface border-border focus:border-foreground/40 placeholder:text-muted-foreground w-full rounded-xl border py-2 pr-4 pl-10 text-xs transition-colors outline-none"
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
              className="hover:bg-muted text-foreground group relative rounded-lg p-2 transition-colors"
              title="Your Wishlist"
            >
              <Heart className="text-muted-foreground group-hover:text-foreground size-5 transition-colors" />
              {wishlistCount > 0 && (
                <span className="bg-secondary text-foreground absolute top-1 right-1 flex size-4 items-center justify-center rounded-full font-mono text-[10px] font-bold tabular-nums">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Trigger Button */}
            <Button
              onClick={toggleCart}
              variant="default"
              className="bg-foreground text-background hover:bg-foreground/90 relative flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold shadow-xs transition-colors active:scale-[0.98]"
            >
              <ShoppingBag className="size-4" />
              <span className="hidden sm:inline">Bag</span>
              {totalQuantity > 0 && (
                <span className="bg-background text-foreground py-0.2 rounded-md px-1.5 font-mono text-[11px] font-bold tabular-nums">
                  {totalQuantity}
                </span>
              )}
            </Button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="hover:bg-muted text-foreground rounded-lg p-2 md:hidden"
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Category Filter Horizontal Bar */}
        <div className="border-border/60 flex scrollbar-none items-center gap-2 overflow-x-auto border-t py-2.5">
          <button
            onClick={() => onSelectCategory?.("all")}
            className={`rounded-lg px-3 py-1 text-xs whitespace-nowrap transition-colors ${
              !selectedCategory || selectedCategory === "all"
                ? "bg-foreground text-background font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            All Pieces
          </button>
          {CROCHET_CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => onSelectCategory?.(cat.slug)}
              className={`rounded-lg px-3 py-1 text-xs whitespace-nowrap transition-colors ${
                selectedCategory === cat.slug
                  ? "bg-foreground text-background font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
