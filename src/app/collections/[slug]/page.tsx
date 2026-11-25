import Link from "next/link"
import { notFound } from "next/navigation"
import { CROCHET_CATEGORIES } from "@/constants/categories"
import { PRODUCTS } from "@/data/products"
import { AnnouncementBar } from "@/components/layout/announcement-bar"
import { Navbar } from "@/components/layout/navbar"
import { ProductCard } from "@/components/products/product-card"
import { Footer } from "@/components/layout/footer"
import { CartDrawer } from "@/components/cart/cart-drawer"
import { ArrowLeft } from "lucide-react"

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const category = CROCHET_CATEGORIES.find((c) => c.slug === slug)
  if (!category && slug !== "all") {
    notFound()
  }

  const categoryProducts =
    slug === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.categorySlug === slug)

  const title = category ? category.name : "All Handcrafted Pieces"
  const description = category
    ? category.description
    : "Explore all slow-crafted artisan crochet pieces from our Gujarat studio."

  return (
    <div className="bg-background selection:bg-primary/40 selection:text-text flex min-h-screen flex-col font-sans">
      <AnnouncementBar />
      <Navbar />

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-8 sm:px-6 lg:px-12">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/collections"
            className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-on-surface"
          >
            <ArrowLeft className="size-3.5" />
            <span>All Collections</span>
          </Link>
          <span className="font-mono text-xs tabular-nums text-muted-foreground">
            {categoryProducts.length} Pieces Available
          </span>
        </div>

        {/* Collection Hero Banner */}
        <div className="mb-8 rounded-3xl border border-border/80 bg-surface-container-low p-6 sm:p-10">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
            Curated Collection
          </span>
          <h1 className="font-heading mt-2 text-3xl font-bold tracking-tight text-on-surface sm:text-4xl">
            {title}
          </h1>
          <p className="mt-2 max-w-2xl text-xs text-muted-foreground sm:text-sm">{description}</p>
        </div>

        {/* Products Grid */}
        {categoryProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border py-16 text-center">
            <p className="font-heading text-lg font-semibold text-on-surface">
              No pieces currently in this collection
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              New seasonal drops are handcrafted weekly. Check our other collections or request a
              custom commission.
            </p>
            <Link
              href="/shop"
              className="mt-4 rounded-full bg-primary px-5 py-2 text-xs font-semibold text-on-primary shadow-xs transition-colors hover:bg-primary/90"
            >
              Browse All Pieces
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
      <CartDrawer />
    </div>
  )
}
