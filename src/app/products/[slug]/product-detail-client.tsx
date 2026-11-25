"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  Sparkles,
  ChevronDown,
  ArrowRight,
  Check,
  Clock,
  Layers,
  MapPin,
} from "lucide-react"
import type { StoreProduct } from "@/data/products"
import { useCartStore } from "@/store/cart.store"
import { useWishlistStore } from "@/store/wishlist.store"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/products/product-card"

interface ProductDetailClientProps {
  product: StoreProduct
  relatedProducts: StoreProduct[]
}

export function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const router = useRouter()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedColor, setSelectedColor] = useState(product.colorOptions?.[0] || "Default")
  const [quantity, setQuantity] = useState(1)
  const [pincode, setPincode] = useState("")
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null)
  const [openAccordion, setOpenAccordion] = useState<string>("specs")
  const [isAdded, setIsAdded] = useState(false)

  const addItem = useCartStore((state) => state.addItem)
  const setCartOpen = useCartStore((state) => state.setCartOpen)

  const isWishlisted = useWishlistStore((state) => state.isInWishlist(product.id))
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist)

  // Curate gallery views
  const galleryImages = [
    product.images[0],
    product.images[1] || product.images[0],
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB8A8HUFrKiAxHc5H6PprhxM_NRpPwBlnAUVzVSPQjgOcTDgIlBpI5Aud7z2am-H12D7iiFFbkqgrxb36sPC3mOAScd_ttpoZ-NEI3ewq200lNudcUpyQBuZBhpKDxaiJEcsyNrRw4hRRqCt9zyYTfEZDfJgOVm9vr0BnUNTL82FpXi2I8pH-ekMVdpEE4oNNYvyRB1piLrDR2QGvPirxfRGbyiCtbzxNLhGsAn9hE",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCBpGgUKqIN0o6IRZSXvc3o14yEbRsHoImRXb2cZTB6X_jNz6wuHtIFZ3XsyBV0ZAHjXf3zLFbnmtLws2zTYd4LaH8HJEzNh3LdiEMjvTdqupjyNoQv2brb3mDv8OoYS1kmSX5YRfof28soxXT-NhcRhyGbmdR4lAdZecEprnsRJsRyj9zv9t9zFir8ZfGKvLlKMTuQH4D-j-Bmh-1kugJRqKW_qZUyzJK3NTqMduI",
  ]

  const galleryLabels = ["Front View", "Macro Stitch", "On Body", "Interior Detail"]

  const discountPercent = product.compareAtPricePaise
    ? Math.round(
        ((product.compareAtPricePaise - product.pricePaise) / product.compareAtPricePaise) * 100
      )
    : 0

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${selectedColor}`,
      productId: product.id,
      title: `${product.title} (${selectedColor})`,
      pricePaise: product.pricePaise,
      quantity,
      imageUrl: galleryImages[0],
      customizations: { color: selectedColor },
    })
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 1800)
    setCartOpen(true)
  }

  const handleBuyNow = () => {
    addItem({
      id: `${product.id}-${selectedColor}`,
      productId: product.id,
      title: `${product.title} (${selectedColor})`,
      pricePaise: product.pricePaise,
      quantity,
      imageUrl: galleryImages[0],
      customizations: { color: selectedColor },
    })
    router.push("/checkout")
  }

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault()
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeStatus("Delivery available in 3-5 business days. Pan-India Express shipping active.")
    } else {
      setPincodeStatus("Please enter a valid 6-digit Indian PIN code.")
    }
  }

  return (
    <div>
      {/* Breadcrumbs */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-on-surface">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-on-surface">
          Shop
        </Link>
        <span>/</span>
        <Link href={`/collections/${product.categorySlug}`} className="capitalize hover:text-on-surface">
          {product.categorySlug}
        </Link>
        <span>/</span>
        <span className="font-semibold text-on-surface truncate max-w-xs">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Left Column: Visual Gallery Suite (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Visual Stage */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border/80 bg-surface-container-low shadow-xs">
            <Image
              src={galleryImages[selectedImageIndex]}
              alt={product.title}
              fill
              unoptimized
              priority
              className="object-cover transition-all duration-300"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
              {product.badge && (
                <span className="rounded-full bg-primary px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-on-primary shadow-xs">
                  {product.badge}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="rounded-full bg-rose-600 px-2.5 py-0.5 font-mono text-[10px] font-bold text-white shadow-xs">
                  {discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-4 right-4 z-10 flex size-10 items-center justify-center rounded-full border border-border/80 bg-surface/90 shadow-xs backdrop-blur-md transition-colors hover:bg-surface active:scale-[0.98]"
              title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart
                className={`size-5 transition-colors ${
                  isWishlisted ? "fill-rose-500 text-rose-500" : "text-muted-foreground"
                }`}
              />
            </button>
          </div>

          {/* Gallery Thumbnails */}
          <div className="grid grid-cols-4 gap-3">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`group relative aspect-square overflow-hidden rounded-2xl border transition-all ${
                  selectedImageIndex === idx
                    ? "border-primary ring-2 ring-primary/30"
                    : "border-border/80 opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={img} alt="" fill unoptimized className="object-cover" />
                <span className="absolute bottom-1.5 right-1.5 rounded bg-surface/85 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-on-surface backdrop-blur-xs">
                  {galleryLabels[idx]}
                </span>
              </button>
            ))}
          </div>

          {/* Artisan Maker Profile Ribbon */}
          <div className="flex items-center gap-4 rounded-2xl border border-border/70 bg-surface-container-lowest p-4 shadow-2xs">
            <div className="relative size-12 shrink-0 overflow-hidden rounded-full border border-primary/20 bg-primary-container">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWSJmDsgLRLMJWLIubfqUlopAD16fGBB7GEuM4VYa30jx4Y1EfXxuc-DCRxyDtXF3TPaFLpmMIpXscErqq4LXIeghbYygjgyaHpQWZPvRniEz436J0qv-rQYpn3oNNvh4tqhhr1j9e6wnuVYD8Fo0RBfZJAoymF1peEnqKc1D7HvuUZWHKItM-8SdNr5vbi1cQv_w7LV1I63TzDIaI-Y3YyFpx1r_7h6byFLk8wIs"
                alt="Master Artisan"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-on-surface">Stitched by Artisan Meenakshi D.</span>
                <span className="rounded-full bg-primary-container/40 px-2 py-0.2 text-[10px] font-bold text-on-primary-container">
                  Gujarat Atelier
                </span>
              </div>
              <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                “Every crochet petal is formed with finger tension for a soft, sculpted heirloom feel.”
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Purchasing & Specifications (5 cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          {/* Title & Review Stars */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-3.5 fill-amber-500" />
                ))}
              </div>
              <span className="font-mono text-xs font-bold text-on-surface">{product.rating}</span>
              <span className="text-xs text-muted-foreground">({product.reviewCount} verified reviews)</span>
            </div>

            <h1 className="font-heading text-2xl font-bold tracking-tight text-on-surface sm:text-3xl">
              {product.title}
            </h1>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
              {product.description}
            </p>
          </div>

          {/* Pricing Box */}
          <div className="rounded-2xl border border-border/80 bg-surface-container-lowest p-4 shadow-2xs">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-3xl font-bold tabular-nums text-on-surface">
                ₹{(product.pricePaise / 100).toLocaleString("en-IN")}
              </span>
              {product.compareAtPricePaise && (
                <span className="font-mono text-base tabular-nums text-muted-foreground line-through">
                  ₹{(product.compareAtPricePaise / 100).toLocaleString("en-IN")}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="rounded-full bg-primary-container/60 px-2.5 py-0.5 text-xs font-bold text-on-primary-container">
                  Save {discountPercent}%
                </span>
              )}
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Inclusive of all taxes. Free Pan-India insured shipping applied at checkout.
            </p>
          </div>

          {/* Color Variant Swatches */}
          {product.colorOptions && product.colorOptions.length > 0 && (
            <div>
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="font-bold text-on-surface">Artisan Palette:</span>
                <span className="font-medium text-primary">{selectedColor}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colorOptions.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all ${
                      selectedColor === color
                        ? "border-primary bg-primary text-on-primary shadow-xs"
                        : "border-border/80 bg-surface-container-lowest text-on-surface hover:border-primary/50"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector & CTAs */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-on-surface">Quantity:</span>
              <div className="flex items-center rounded-full border border-border/80 bg-surface-container-lowest p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="size-7 rounded-full text-xs font-bold hover:bg-muted"
                >
                  -
                </button>
                <span className="w-8 text-center font-mono text-xs font-bold tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stockQuantity || 10, q + 1))}
                  className="size-7 rounded-full text-xs font-bold hover:bg-muted"
                >
                  +
                </button>
              </div>
              <span className="font-mono text-[11px] text-muted-foreground">
                ({product.stockQuantity} ready in Gujarat workshop)
              </span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 pt-2">
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="bg-inverse-surface text-on-primary hover:bg-inverse-surface/90 h-12 rounded-full font-bold shadow-xs active:scale-[0.98]"
              >
                {isAdded ? (
                  <>
                    <Check className="size-4 text-emerald-400" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="size-4" />
                    <span>Add to Bag</span>
                  </>
                )}
              </Button>

              <Button
                onClick={handleBuyNow}
                size="lg"
                className="bg-primary text-on-primary hover:bg-primary/90 h-12 rounded-full font-bold shadow-xs active:scale-[0.98]"
              >
                <span>Buy Now (Instant Checkout)</span>
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>

          {/* Pan-India Pincode Estimator */}
          <div className="rounded-2xl border border-border/80 bg-surface-container-lowest p-4 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-on-surface">
              <Truck className="size-4 text-primary" />
              <span>Pan-India Delivery Estimator</span>
            </div>
            <form onSubmit={handlePincodeCheck} className="mt-3 flex gap-2">
              <div className="relative flex-1">
                <MapPin className="text-muted-foreground absolute top-1/2 left-3 size-3.5 -translate-y-1/2" />
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter 6-digit Indian PIN (e.g. 560001)"
                  className="w-full rounded-full border border-border/80 bg-surface py-2 pr-3 pl-9 text-xs outline-none focus:border-primary"
                />
              </div>
              <Button type="submit" size="sm" variant="outline" className="rounded-full px-4 text-xs font-semibold">
                Verify
              </Button>
            </form>
            {pincodeStatus && (
              <p className="mt-2 text-[11px] font-medium text-emerald-700">{pincodeStatus}</p>
            )}
          </div>

          {/* Accordion Tabs */}
          <div className="divide-y divide-border/60 rounded-2xl border border-border/80 bg-surface-container-lowest">
            {/* Specs */}
            <div className="p-4">
              <button
                onClick={() => setOpenAccordion(openAccordion === "specs" ? "" : "specs")}
                className="flex w-full items-center justify-between text-left text-xs font-bold text-on-surface"
              >
                <div className="flex items-center gap-2">
                  <Layers className="size-4 text-primary" />
                  <span>Craft & Material Specifications</span>
                </div>
                <ChevronDown
                  className={`size-4 text-muted-foreground transition-transform ${
                    openAccordion === "specs" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openAccordion === "specs" && (
                <div className="mt-3 space-y-2 text-xs text-muted-foreground">
                  <p>
                    <strong className="text-on-surface">Material:</strong>{" "}
                    {product.yarnDetails?.material || "100% Organic Milk Cotton Yarn (5-ply)"}
                  </p>
                  <p>
                    <strong className="text-on-surface">Artisan Craft Time:</strong> 12–14 hours of continuous hand-stitching.
                  </p>
                  <p>
                    <strong className="text-on-surface">Lining:</strong> Unbleached organic cotton twill with interior slip pocket.
                  </p>
                  <p>
                    <strong className="text-on-surface">Hardware:</strong> Anti-tarnish brushed brass magnetic clasp.
                  </p>
                </div>
              )}
            </div>

            {/* Shipping & Returns */}
            <div className="p-4">
              <button
                onClick={() => setOpenAccordion(openAccordion === "shipping" ? "" : "shipping")}
                className="flex w-full items-center justify-between text-left text-xs font-bold text-on-surface"
              >
                <div className="flex items-center gap-2">
                  <Truck className="size-4 text-primary" />
                  <span>Pan-India Shipping & Care</span>
                </div>
                <ChevronDown
                  className={`size-4 text-muted-foreground transition-transform ${
                    openAccordion === "shipping" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openAccordion === "shipping" && (
                <div className="mt-3 space-y-2 text-xs text-muted-foreground">
                  <p>
                    • Free express Pan-India shipping via Bluedart / Delhivery on orders above ₹1,999.
                  </p>
                  <p>• Carefully packaged in plastic-free recycled luxury boxes with cotton dustbags.</p>
                  <p>
                    • <strong className="text-on-surface">Care Instructions:</strong>{" "}
                    {product.yarnDetails?.careInstructions ||
                      "Gentle cold hand wash; do not wring; lay flat to dry in shade."}
                  </p>
                </div>
              )}
            </div>

            {/* Authentic slow craft guarantee */}
            <div className="p-4">
              <button
                onClick={() => setOpenAccordion(openAccordion === "guarantee" ? "" : "guarantee")}
                className="flex w-full items-center justify-between text-left text-xs font-bold text-on-surface"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-primary" />
                  <span>Slow-Craft Heirloom Guarantee</span>
                </div>
                <ChevronDown
                  className={`size-4 text-muted-foreground transition-transform ${
                    openAccordion === "guarantee" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openAccordion === "guarantee" && (
                <div className="mt-3 text-xs text-muted-foreground">
                  Every Yarn Delight piece is signed with an artisan guild authentication code. We offer complimentary lifetime repair service for any pulled stitches or hardware maintenance.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products: You May Also Cherish */}
      <section className="mt-16 border-t border-border/60 pt-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
              Handpicked Pairings
            </span>
            <h2 className="font-heading mt-1 text-2xl font-bold tracking-tight text-on-surface">
              You May Also Cherish
            </h2>
          </div>
          <Link
            href="/shop"
            className="flex items-center gap-1 text-xs font-bold text-primary hover:underline"
          >
            <span>Explore All</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Mobile Sticky Add to Bag Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-surface/95 p-3 backdrop-blur-md lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="font-mono text-base font-bold text-on-surface">
              ₹{(product.pricePaise / 100).toLocaleString("en-IN")}
            </span>
            <span className="block text-[10px] text-muted-foreground">{selectedColor}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleAddToCart}
              size="sm"
              className="bg-inverse-surface text-on-primary rounded-full px-5 text-xs font-bold shadow-xs"
            >
              <ShoppingBag className="size-3.5" />
              <span>Add to Bag</span>
            </Button>
            <Button
              onClick={handleBuyNow}
              size="sm"
              className="bg-primary text-on-primary rounded-full px-4 text-xs font-bold shadow-xs"
            >
              <span>Buy Now</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
