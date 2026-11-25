"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Search, ShoppingBag, Heart, User, Menu, X, Sparkles, ArrowRight } from "lucide-react"
import { useCartStore } from "@/store/cart.store"
import { useWishlistStore } from "@/store/wishlist.store"
import { Button } from "@/components/ui/button"
import { CROCHET_CATEGORIES } from "@/constants/categories"

interface NavbarProps {
  onSearchChange?: (query: string) => void
  onSelectCategory?: (slug: string) => void
  selectedCategory?: string
}

export function Navbar({ onSearchChange, onSelectCategory, selectedCategory }: NavbarProps) {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchVal, setSearchVal] = useState("")

  const cartItems = useCartStore((state) => state.items)
  const toggleCart = useCartStore((state) => state.toggleCart)
  const wishlistItems = useWishlistStore((state) => state.items)

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const subtotalPaise = cartItems.reduce((acc, item) => acc + item.pricePaise * item.quantity, 0)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setSearchVal(val)
    onSearchChange?.(val)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchVal.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchVal.trim())}`)
    }
  }

  return (
    <header className="bg-surface/95 border-border sticky top-0 z-40 border-b shadow-[0_4px_20px_-2px_rgba(73,58,59,0.04)] backdrop-blur-md">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">
        <div className="flex h-18 items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link href="/" className="group flex shrink-0 items-center gap-2.5">
            <div className="bg-primary-container/40 border-primary/20 flex size-9 items-center justify-center rounded-xl border">
              <span className="font-heading text-primary text-sm font-bold">YD</span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-on-surface text-xl font-bold tracking-tight">
                Yarn Delight
              </span>
              <span className="text-muted-foreground text-[10px] font-medium tracking-wider uppercase">
                Atelier Crochet • India
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden items-center gap-6 lg:flex">
            <Link
              href="/shop"
              className="text-on-surface-variant hover:text-primary text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Shop All
            </Link>
            <Link
              href="/collections"
              className="text-on-surface-variant hover:text-primary text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Collections
            </Link>
            <Link
              href="/custom-order"
              className="text-primary hover:text-on-surface flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <Sparkles className="size-3.5" />
              Custom Orders
            </Link>
            <Link
              href="/#story"
              className="text-on-surface-variant hover:text-primary text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Our Story
            </Link>
          </nav>

          {/* Search Bar (Desktop) */}
          <form
            onSubmit={handleSearchSubmit}
            className="mx-2 hidden max-w-xs flex-1 sm:max-w-sm md:flex lg:max-w-md"
          >
            <div className="relative w-full">
              <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
              <input
                type="text"
                value={searchVal}
                onChange={handleSearch}
                placeholder="Search tote bags, mufflers, bespoke charms..."
                className="bg-surface-container-lowest border-border/80 focus:border-primary/60 placeholder:text-muted-foreground w-full rounded-full border py-2 pr-16 pl-10 text-xs shadow-xs transition-colors outline-none"
              />
              <kbd className="bg-surface-container border-border/60 text-muted-foreground pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 rounded border px-1.5 py-0.5 font-mono text-[10px]">
                ↵
              </kbd>
              {searchVal && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchVal("")
                    onSearchChange?.("")
                  }}
                  className="text-muted-foreground hover:text-on-surface absolute top-1/2 right-9 -translate-y-1/2 text-xs"
                >
                  Clear
                </button>
              )}
            </div>
          </form>

          {/* Right Action Icons (Wishlist, Account, Cart, Mobile Menu) */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className="hover:bg-surface-container-low text-on-surface group relative rounded-full p-2 transition-colors"
              title="Your Saved Pieces"
            >
              <Heart className="text-muted-foreground group-hover:text-primary size-5 transition-colors" />
              {wishlistItems.length > 0 && (
                <span className="bg-primary-container text-on-primary-container absolute top-1 right-1 flex size-4 items-center justify-center rounded-full font-mono text-[10px] font-bold tabular-nums">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Account Link */}
            <Link
              href="/account"
              className="hover:bg-surface-container-low text-on-surface group relative rounded-full p-2 transition-colors"
              title="Account & Orders"
            >
              <User className="text-muted-foreground group-hover:text-on-surface size-5 transition-colors" />
            </Link>

            {/* Cart Trigger Button */}
            <Button
              onClick={toggleCart}
              variant="default"
              className="bg-inverse-surface text-on-primary hover:bg-inverse-surface/90 relative flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold shadow-xs transition-colors active:scale-[0.98]"
            >
              <ShoppingBag className="size-4" />
              <span className="hidden sm:inline">Bag</span>
              {subtotalPaise > 0 && (
                <span className="hidden font-mono text-xs font-bold tabular-nums md:inline">
                  ₹{(subtotalPaise / 100).toLocaleString("en-IN")}
                </span>
              )}
              {totalQuantity > 0 && (
                <span className="bg-primary-container text-on-primary-container py-0.2 rounded-full px-1.5 font-mono text-[10px] font-bold tabular-nums">
                  {totalQuantity}
                </span>
              )}
            </Button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="hover:bg-muted text-on-surface rounded-lg p-2 md:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Category Filter Horizontal Bar */}
        <div className="border-border/60 flex scrollbar-none items-center gap-2 overflow-x-auto border-t py-2.5">
          {onSelectCategory ? (
            <button
              onClick={() => onSelectCategory("all")}
              className={`rounded-full px-3.5 py-1 text-xs whitespace-nowrap transition-colors ${
                !selectedCategory || selectedCategory === "all"
                  ? "bg-primary text-on-primary font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-on-surface hover:bg-surface-container-low"
              }`}
            >
              All Pieces
            </button>
          ) : (
            <Link
              href="/shop"
              className="bg-surface-container-low text-muted-foreground hover:text-on-surface rounded-full px-3.5 py-1 text-xs whitespace-nowrap transition-colors"
            >
              All Pieces
            </Link>
          )}

          {CROCHET_CATEGORIES.map((cat) =>
            onSelectCategory ? (
              <button
                key={cat.slug}
                onClick={() => onSelectCategory(cat.slug)}
                className={`rounded-full px-3.5 py-1 text-xs whitespace-nowrap transition-colors ${
                  selectedCategory === cat.slug
                    ? "bg-primary text-on-primary font-semibold shadow-xs"
                    : "text-muted-foreground hover:text-on-surface hover:bg-surface-container-low"
                }`}
              >
                {cat.name}
              </button>
            ) : (
              <Link
                key={cat.slug}
                href={`/collections/${cat.slug}`}
                className="text-muted-foreground hover:text-on-surface hover:bg-surface-container-low rounded-full px-3.5 py-1 text-xs whitespace-nowrap transition-colors"
              >
                {cat.name}
              </Link>
            )
          )}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="bg-surface/98 border-border border-b px-6 py-6 shadow-xl backdrop-blur-xl md:hidden">
          <form onSubmit={handleSearchSubmit} className="mb-6">
            <div className="relative w-full">
              <Search className="text-muted-foreground absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
              <input
                type="text"
                value={searchVal}
                onChange={handleSearch}
                placeholder="Search tote bags, mufflers..."
                className="bg-surface-container-lowest border-border/80 w-full rounded-full border py-2.5 pr-4 pl-10 text-xs shadow-xs outline-none"
              />
            </div>
          </form>

          <nav className="flex flex-col space-y-3">
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="text-on-surface hover:text-primary flex items-center justify-between py-2 text-sm font-semibold tracking-wide"
            >
              <span>Shop All Catalogue</span>
              <ArrowRight className="text-muted-foreground size-4" />
            </Link>
            <Link
              href="/collections"
              onClick={() => setMobileMenuOpen(false)}
              className="text-on-surface hover:text-primary flex items-center justify-between py-2 text-sm font-semibold tracking-wide"
            >
              <span>Collections</span>
              <ArrowRight className="text-muted-foreground size-4" />
            </Link>
            <Link
              href="/custom-order"
              onClick={() => setMobileMenuOpen(false)}
              className="text-primary flex items-center justify-between py-2 text-sm font-bold tracking-wide"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="size-4" />
                Custom Commission Studio
              </span>
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className="text-on-surface hover:text-primary flex items-center justify-between py-2 text-sm font-semibold tracking-wide"
            >
              <span className="flex items-center gap-2">
                <Heart className="size-4" />
                Wishlist ({wishlistItems.length})
              </span>
              <ArrowRight className="text-muted-foreground size-4" />
            </Link>
            <Link
              href="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="text-on-surface hover:text-primary flex items-center justify-between py-2 text-sm font-semibold tracking-wide"
            >
              <span className="flex items-center gap-2">
                <ShoppingBag className="size-4" />
                Shopping Bag ({totalQuantity})
              </span>
              <ArrowRight className="text-muted-foreground size-4" />
            </Link>
            <Link
              href="/account"
              onClick={() => setMobileMenuOpen(false)}
              className="text-on-surface hover:text-primary flex items-center justify-between py-2 text-sm font-semibold tracking-wide"
            >
              <span className="flex items-center gap-2">
                <User className="size-4" />
                Customer Account
              </span>
              <ArrowRight className="text-muted-foreground size-4" />
            </Link>
            <Link
              href="/track-order"
              onClick={() => setMobileMenuOpen(false)}
              className="text-muted-foreground hover:text-on-surface flex items-center justify-between py-2 text-sm"
            >
              <span>Track Your Order</span>
              <ArrowRight className="text-muted-foreground size-4" />
            </Link>
            <div className="border-border/60 my-2 border-t pt-2">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-muted-foreground hover:text-primary flex items-center justify-between text-xs"
              >
                <span>Atelier Admin Portal</span>
                <span className="font-mono text-[10px]">Staff Only →</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
