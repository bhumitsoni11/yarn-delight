import { notFound } from "next/navigation"
import { PRODUCTS, StoreProduct } from "@/data/products"
import { AnnouncementBar } from "@/components/layout/announcement-bar"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { CartDrawer } from "@/components/cart/cart-drawer"
import { ProductDetailClient } from "./product-detail-client"

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = PRODUCTS.find((p) => p.slug === slug)

  if (!product) {
    notFound()
  }

  // Get related products from same category or popular
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4)

  return (
    <div className="bg-background selection:bg-primary/40 selection:text-text flex min-h-screen flex-col font-sans">
      <AnnouncementBar />
      <Navbar />

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-8 sm:px-6 lg:px-12">
        <ProductDetailClient product={product} relatedProducts={relatedProducts} />
      </main>

      <Footer />
      <CartDrawer />
    </div>
  )
}
