"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag, Check } from "lucide-react"
import type { StoreProduct } from "@/data/products"
import { useCartStore } from "@/store/cart.store"
import { useWishlistStore } from "@/store/wishlist.store"
import { Button } from "@/components/ui/button"

interface ProductCardProps {
  product: StoreProduct
  onQuickView?: (product: StoreProduct) => void
}

const SWATCH_PALETTES: Record<string, string[]> = {
  "sweetheart-rosebud-tote": ["#f4b8c8", "#f7e6a7", "#dccbf4", "#cbd5c0"],
  "cloud-nine-pearl-clutch": ["#fbf5e6", "#dccbf4", "#f4b8c8"],
  "lavender-ombre-chunky-scarf": ["#dccbf4", "#f4ddde", "#cbd5c0"],
  "coquette-bow-hair-barrettes": ["#f7e6a7", "#f4b8c8", "#ffffff"],
  "daisy-coquette-mini-shoulder-bag": ["#f7e6a7", "#dccbf4", "#f4b8c8"],
  "blossom-berry-amigurumi-bag-charm": ["#e57373", "#a8d5ba", "#dccbf4"],
  "scalloped-peter-pan-lace-collar": ["#f7e6a7", "#fff9f5", "#f4b8c8"],
  "bespoke-heirloom-custom-piece": ["#f4b8c8", "#f7e6a7", "#dccbf4", "#493a3b"],
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [justAdded, setJustAdded] = useState(false)
  const addItem = useCartStore((state) => state.addItem)
  const setCartOpen = useCartStore((state) => state.setCartOpen)

  const isWishlisted = useWishlistStore((state) => state.isInWishlist(product.id))
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist)

  const swatches = SWATCH_PALETTES[product.slug] || ["#f4b8c8", "#f7e6a7", "#dccbf4"]

  const discountPercent = product.compareAtPricePaise
    ? Math.round(
        ((product.compareAtPricePaise - product.pricePaise) / product.compareAtPricePaise) * 100
      )
    : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id: product.id,
      productId: product.id,
      title: product.title,
      pricePaise: product.pricePaise,
      quantity: 1,
      imageUrl: product.images[0],
    })
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1500)
    setCartOpen(true)
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product.id)
  }

  return (
    <div className="group bg-surface-container-lowest border-border/80 hover:border-primary/40 relative flex flex-col justify-between overflow-hidden rounded-3xl border p-3.5 shadow-xs transition-colors">
      <Link href={`/products/${product.slug}`} className="flex flex-1 flex-col">
        {/* Product Image Area */}
        <div className="bg-surface-container relative mb-3 aspect-[3/4] w-full overflow-hidden rounded-2xl">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.title}
              width={500}
              height={667}
              unoptimized
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-102"
            />
          ) : (
            <div className="text-muted-foreground flex h-full w-full items-center justify-center">
              <ShoppingBag className="size-10 stroke-1" />
            </div>
          )}

          {/* Badges (Top Left) */}
          <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
            {product.badge && (
              <span
                className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-wider uppercase shadow-xs ${
                  product.badge === "Bestseller"
                    ? "bg-primary text-on-primary"
                    : product.badge === "New Drop"
                      ? "bg-primary-container text-on-primary-container"
                      : "bg-secondary-container text-on-secondary-container"
                }`}
              >
                {product.badge}
              </span>
            )}
            {discountPercent > 0 && (
              <span className="rounded-full bg-rose-600 px-2 py-0.5 font-mono text-[9px] font-bold text-white tabular-nums shadow-xs">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Wishlist Heart Toggle (Top Right) */}
          <button
            type="button"
            onClick={handleWishlistToggle}
            className="bg-surface/85 border-border/60 text-on-surface hover:bg-surface absolute top-2.5 right-2.5 z-10 flex size-8 items-center justify-center rounded-full border shadow-xs backdrop-blur-md transition-colors active:scale-[0.98]"
            title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className={`size-3.5 transition-colors ${
                isWishlisted
                  ? "fill-rose-500 text-rose-500"
                  : "text-muted-foreground group-hover:text-on-surface"
              }`}
            />
          </button>
        </div>

        {/* Product Details Area */}
        <div className="flex flex-1 flex-col justify-between">
          <div>
            {/* Color Swatch Dots */}
            <div className="mb-2 flex items-center gap-1.5">
              {swatches.map((color, i) => (
                <span
                  key={i}
                  className="border-border/80 size-3 rounded-full border shadow-2xs"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            <h3 className="font-heading text-on-surface group-hover:text-primary line-clamp-1 text-sm font-semibold transition-colors">
              {product.title}
            </h3>
            <p className="text-muted-foreground mt-0.5 line-clamp-1 text-[11px]">
              {product.description}
            </p>
          </div>
        </div>
      </Link>

      {/* Price & Add to Bag Action */}
      <div className="border-border/60 mt-3 flex items-center justify-between gap-2 border-t pt-2.5">
        <div className="flex items-baseline gap-1.5">
          <span className="text-on-surface font-mono text-sm font-bold tabular-nums">
            ₹{(product.pricePaise / 100).toLocaleString("en-IN")}
          </span>
          {product.compareAtPricePaise && (
            <span className="text-muted-foreground font-mono text-[11px] tabular-nums line-through">
              ₹{(product.compareAtPricePaise / 100).toLocaleString("en-IN")}
            </span>
          )}
        </div>

        <Button
          onClick={handleAddToCart}
          size="sm"
          variant="default"
          className="bg-inverse-surface text-on-primary hover:bg-inverse-surface/90 h-8 rounded-full px-3 text-xs font-semibold shadow-xs transition-colors active:scale-[0.98]"
        >
          {justAdded ? (
            <>
              <Check className="size-3.5 text-emerald-400" />
              <span>Added</span>
            </>
          ) : (
            <>
              <ShoppingBag className="size-3.5" />
              <span>Add</span>
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
