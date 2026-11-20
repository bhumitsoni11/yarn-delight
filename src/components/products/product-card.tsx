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
      className="group border-border bg-card hover:shadow-card relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1"
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
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-5xl">🧶</div>
        )}

        {/* Badges (Top Left) */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {product.badge && (
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase shadow-xs ${
                product.badge === "Bestseller"
                  ? "bg-secondary text-text"
                  : product.badge === "New Drop"
                    ? "bg-accent text-accent-foreground"
                    : "bg-primary text-text"
              }`}
            >
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
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
          className="bg-surface/90 text-foreground absolute top-3 right-3 z-10 flex size-9 items-center justify-center rounded-full shadow-xs backdrop-blur-xs transition-all hover:scale-110 active:scale-90"
          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart
            className={`size-4.5 transition-colors ${
              isWishlisted
                ? "fill-rose-500 text-rose-500"
                : "text-muted-foreground group-hover:text-foreground"
            }`}
          />
        </button>

        {/* Rating Floating Tag */}
        <div className="bg-surface/90 text-foreground absolute bottom-2.5 left-2.5 flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold shadow-xs backdrop-blur-xs">
          <Star className="size-3 fill-amber-500 text-amber-500" />
          <span>{product.rating.toFixed(1)}</span>
          <span className="text-muted-foreground text-[10px]">({product.reviewCount})</span>
        </div>
      </div>

      {/* Product Details Area */}
      <div className="flex flex-1 flex-col justify-between gap-3 p-4">
        <div>
          <span className="text-muted-foreground text-[11px] font-semibold tracking-wider uppercase">
            {product.categorySlug.replace("-", " ")}
          </span>
          <h3 className="font-heading text-foreground group-hover:text-primary-foreground mt-0.5 line-clamp-1 text-base font-bold transition-colors">
            {product.title}
          </h3>
          <p className="text-muted-foreground mt-1 line-clamp-2 text-xs">{product.description}</p>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="border-border/60 flex items-center justify-between gap-2 border-t pt-2">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-foreground text-base font-bold">
                ₹{(product.pricePaise / 100).toLocaleString("en-IN")}
              </span>
              {product.compareAtPricePaise && (
                <span className="text-muted-foreground text-xs line-through">
                  ₹{(product.compareAtPricePaise / 100).toLocaleString("en-IN")}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium text-emerald-600">
              Free Delivery above ₹999
            </span>
          </div>

          <Button
            onClick={handleAddToCart}
            size="sm"
            variant="default"
            className="bg-primary hover:bg-primary/90 text-text h-9 rounded-xl px-3 text-xs font-bold shadow-xs transition-all hover:scale-105 active:scale-95"
          >
            {justAdded ? (
              <>
                <Check className="size-3.5 text-emerald-700" />
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
