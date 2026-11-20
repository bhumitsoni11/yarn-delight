"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, Star, ShoppingBag, Check } from "lucide-react"
import type { StoreProduct } from "@/data/products"
import { useCartStore } from "@/store/cart.store"
import { Button } from "@/components/ui/button"

interface ProductCardProps {
  product: StoreProduct
  onQuickView?: (product: StoreProduct) => void
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [justAdded, setJustAdded] = useState(false)
  const addItem = useCartStore((state) => state.addItem)
  const setCartOpen = useCartStore((state) => state.setCartOpen)

  const discountPercent = product.compareAtPricePaise
    ? Math.round(
        ((product.compareAtPricePaise - product.pricePaise) / product.compareAtPricePaise) * 100
      )
    : 0

  const handleAddToCart = (e: React.MouseEvent) => {
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

  return (
    <div
      onClick={() => onQuickView?.(product)}
      className="group border-border bg-card hover:border-foreground/30 relative flex cursor-pointer flex-col overflow-hidden rounded-xl border transition-colors"
    >
      {/* Product Image Area */}
      <div className="bg-muted/40 relative aspect-square w-full overflow-hidden">
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.title}
            width={500}
            height={500}
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
              className={`rounded-md px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase ${
                product.badge === "Bestseller"
                  ? "bg-foreground text-background"
                  : product.badge === "New Drop"
                    ? "bg-surface border-border text-foreground border"
                    : "bg-surface text-foreground"
              }`}
            >
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="rounded-md bg-rose-600 px-1.5 py-0.5 font-mono text-[10px] font-bold text-white tabular-nums">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Heart (Top Right) */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setIsWishlisted(!isWishlisted)
          }}
          className="bg-surface/90 text-foreground border-border/60 hover:bg-surface absolute top-2.5 right-2.5 z-10 flex size-8 items-center justify-center rounded-lg border backdrop-blur-xs transition-colors active:scale-[0.98]"
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`size-4 transition-colors ${
              isWishlisted
                ? "fill-rose-500 text-rose-500"
                : "text-muted-foreground group-hover:text-foreground"
            }`}
          />
        </button>

        {/* Rating Floating Tag */}
        <div className="bg-surface/90 border-border/60 text-foreground absolute bottom-2 left-2 flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[10px] font-medium backdrop-blur-xs">
          <Star className="size-3 fill-amber-500 text-amber-500" />
          <span className="font-mono tabular-nums">{product.rating.toFixed(1)}</span>
          <span className="text-muted-foreground font-mono text-[9px] tabular-nums">
            ({product.reviewCount})
          </span>
        </div>
      </div>

      {/* Product Details Area */}
      <div className="flex flex-1 flex-col justify-between gap-3 p-3.5">
        <div>
          <span className="text-muted-foreground text-[10px] font-medium tracking-wider uppercase">
            {product.categorySlug.replace("-", " ")}
          </span>
          <h3 className="font-heading text-foreground mt-0.5 line-clamp-1 text-sm font-semibold transition-colors">
            {product.title}
          </h3>
          <p className="text-muted-foreground mt-1 line-clamp-2 text-xs leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="border-border/60 flex items-center justify-between gap-2 border-t pt-2.5">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-foreground font-mono text-sm font-bold tabular-nums">
                ₹{(product.pricePaise / 100).toLocaleString("en-IN")}
              </span>
              {product.compareAtPricePaise && (
                <span className="text-muted-foreground font-mono text-[11px] tabular-nums line-through">
                  ₹{(product.compareAtPricePaise / 100).toLocaleString("en-IN")}
                </span>
              )}
            </div>
            <span className="text-muted-foreground text-[10px]">Free delivery above ₹999</span>
          </div>

          <Button
            onClick={handleAddToCart}
            size="sm"
            variant="default"
            className="bg-foreground text-background hover:bg-foreground/90 h-8 rounded-lg px-3 text-xs font-semibold shadow-xs transition-colors active:scale-[0.98]"
          >
            {justAdded ? (
              <>
                <Check className="size-3.5" />
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
    </div>
  )
}
