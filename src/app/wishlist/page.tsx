"use client"

import Link from "next/link"
import Image from "next/image"
import { PRODUCTS } from "@/data/products"
import { useWishlistStore } from "@/store/wishlist.store"
import { useCartStore } from "@/store/cart.store"
import { AnnouncementBar } from "@/components/layout/announcement-bar"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { CartDrawer } from "@/components/cart/cart-drawer"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react"

export default function WishlistPage() {
  const wishlistIds = useWishlistStore((state) => state.items)
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist)
  const clearWishlist = useWishlistStore((state) => state.clearWishlist)

  const addItem = useCartStore((state) => state.addItem)
  const setCartOpen = useCartStore((state) => state.setCartOpen)

  const wishlistedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id))

  const handleMoveToBag = (product: (typeof PRODUCTS)[0]) => {
    addItem({
      id: product.id,
      productId: product.id,
      title: product.title,
      pricePaise: product.pricePaise,
      quantity: 1,
      imageUrl: product.images[0],
    })
    toggleWishlist(product.id)
    setCartOpen(true)
  }

  return (
    <div className="bg-background selection:bg-primary/40 selection:text-text flex min-h-screen flex-col font-sans">
      <AnnouncementBar />
      <Navbar />

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-8 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="mb-8 border-b border-border/60 pb-6">
          <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-on-surface">
              Home
            </Link>
            <span>/</span>
            <span className="font-semibold text-on-surface">My Wishlist</span>
          </div>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="font-heading text-3xl font-bold tracking-tight text-on-surface sm:text-4xl">
                Saved Creations
              </h1>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                Keep track of your dream handmade pieces or move them into your bag for crafting.
              </p>
            </div>
            {wishlistedProducts.length > 0 && (
              <button
                onClick={clearWishlist}
                className="text-xs font-semibold text-muted-foreground underline transition-colors hover:text-on-surface"
              >
                Clear Wishlist
              </button>
            )}
          </div>
        </div>

        {/* Wishlist Grid or Empty State */}
        {wishlistedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border py-20 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-primary-container/40">
              <Heart className="size-6 text-primary" />
            </div>
            <h2 className="font-heading mt-4 text-xl font-bold text-on-surface">
              Your Wishlist is Empty
            </h2>
            <p className="mt-1 max-w-sm text-xs text-muted-foreground">
              You haven&apos;t saved any handcrafted crochet pieces yet. Tap the heart on any piece
              you adore to save it here.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-bold text-on-primary shadow-xs transition-colors hover:bg-primary/90"
            >
              <span>Explore Boutique Pieces</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {wishlistedProducts.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-surface-container-lowest p-4 shadow-xs"
              >
                {/* Visual Area */}
                <Link
                  href={`/products/${product.slug}`}
                  className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-surface-container"
                >
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-102"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      toggleWishlist(product.id)
                    }}
                    className="absolute top-2.5 right-2.5 z-10 flex size-8 items-center justify-center rounded-full border border-border/60 bg-surface/90 shadow-xs backdrop-blur-md transition-colors hover:bg-surface"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="size-3.5 text-rose-500" />
                  </button>
                </Link>

                {/* Details */}
                <div className="mt-3 flex flex-1 flex-col justify-between">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-primary">
                      {product.categorySlug}
                    </span>
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="font-heading mt-0.5 text-sm font-semibold text-on-surface hover:text-primary">
                        {product.title}
                      </h3>
                    </Link>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="font-mono text-sm font-bold tabular-nums text-on-surface">
                        ₹{(product.pricePaise / 100).toLocaleString("en-IN")}
                      </span>
                      {product.compareAtPricePaise && (
                        <span className="font-mono text-xs tabular-nums text-muted-foreground line-through">
                          ₹{(product.compareAtPricePaise / 100).toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Move to Bag Action */}
                  <div className="mt-4 border-t border-border/60 pt-3">
                    <Button
                      onClick={() => handleMoveToBag(product)}
                      size="sm"
                      className="w-full rounded-full bg-inverse-surface text-xs font-semibold text-on-primary shadow-xs hover:bg-inverse-surface/90"
                    >
                      <ShoppingBag className="size-3.5" />
                      <span>Move to Bag</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
      <CartDrawer />
    </div>
  )
}
