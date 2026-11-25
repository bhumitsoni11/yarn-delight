import Link from "next/link"
import Image from "next/image"
import { CROCHET_CATEGORIES } from "@/constants/categories"
import { PRODUCTS } from "@/data/products"
import { AnnouncementBar } from "@/components/layout/announcement-bar"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { CartDrawer } from "@/components/cart/cart-drawer"
import { ArrowRight, Sparkles } from "lucide-react"

// Category imagery mapping to Stitch product photography
const CATEGORY_META: Record<string, { image: string; tag: string }> = {
  handbags: {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBKfeFFDTmNtsDMxOBh7yYBD9iQ7URH7qdFY0zhG5ylGqf_9QbytjlD6JwaHjnQApHQ5ceC7pQ7Nat_XTNNx4ERysrHDeT3-rf3D9btV82PRzx_ytx_ou_BW-FpMOEyliqSUys-san_fPSFfmUCHr78nXorh8BYqI9EAaWbc9f4HKcjqHZ2rbNczBzTognLceP7wPpNqKioA8OWVXnAcQdfeOiLHwZ6teZXdhzn6tI",
    tag: "14 Pieces Hand-stitched",
  },
  purses: {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBKKITwEuAaZoZ8TbaydldOLmDJb7_Uy-zKm1slr3xZS0hpLbJWLkm3S42dQ0L2LZBjhMlElIOePn3OZUL82aQXelX_ZbqhJh-Anho0V5yrOKFd-kPaZ8Ylic5c3EcUuXhujoxgcJ-JK1HKuMP1bhmKIdeUtfXlsU_GtbXxJv01JGRxBax9b8OCbe-A1GZpqjx6odaeFwmUIVp5o-uVIHu9VlGGtaMmV2okUokpRe8",
    tag: "8 Pieces Clutches & Pouches",
  },
  keychains: {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAvMQdIODzUmIWsj0922e_64kbwP-bL_TScy8IRZG-gtWJiZhytHhI6GK68HqS9oVA5sKpON5nMVtNYQT7ghM7ypW4tjOpJKU2qelguFS8ERskMHkt-PmEilIz9LlYarAqu9GRwwU8fYFBQOAuRjEmRvAoQ516wLT-FkAJtRiygx7ju6GZcS8EH4Aw4oMpmx5H-_e0gbIRYM110MWgsi9A5h3xvspP3diOTzJXDpIc",
    tag: "9 Pieces Amigurumi Charms",
  },
  mufflers: {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAqX9VJP8MDy86pK5j4BDXniLjtBo0ZZNVxKM_xHPsCQC_iW8S9MrwTK58wPdnOk2IzNojOaMDcmXn0l1Gt_uy3AEZ7ksocHKg1cQwNfI2xn0hrQ021SNsTe3074Cx_EtIMsgvVTsravulC-TpTZZdVtt7bKHUmICi7t7V1p3ITu2Vk5TD3zKBHpAGhHU1Ia3iqvc0N4tj9lcxdxGOTwjXNnHNss0nuIOWq8pujo8g",
    tag: "4 Pieces Alpaca & Merino",
  },
  accessories: {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDgC7HrRR8wzReU8as-tNNdk4yEw3jHB1A1fyKCjGHVmeRv-SRBWD8__kSRDAyzAVBAnbm57ghwbf3cj9f38MlLT6rpr4JAUFmXHAyvxGRXzm2IV4zf3WuIlXqbIIrSUYnEFs3elvevnS77nBKtZL48KWxB3T5Zs3Bg2s3j7O6UlJDNY5ACNf9Y4tHyoxxF9mveRaXCwzKYYFElEfObt_tW7t_DmPD5LqKF2NUXRl0",
    tag: "12 Pieces Hair & Collars",
  },
  "custom-orders": {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBJx3Z5kB1jbdGZZPuL7PQIo8LPuKw17n8Y9mLpK9fygOQ9sM9a3KvUOkzKPoIslRiFaKx8G4KjFE1Y8uwgYN-zu6rM64hB4dNp8NtaDeFw5N5SIINjZYqPizSIFoQtoZ8iud-18mN9wsu0YSci-T_HyfTxUwNfBIzFHgYgCkzpsqj3PZDOH4-sws43JZDPUrUdzVcfT0IYTLUU8kd-5MFk7Fche2Ji07_cnoeykZ8",
    tag: "Bespoke Commissions Open",
  },
}

export default function CollectionsIndexPage() {
  return (
    <div className="bg-background selection:bg-primary/40 selection:text-text flex min-h-screen flex-col font-sans">
      <AnnouncementBar />
      <Navbar />

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-8 sm:px-6 lg:px-12">
        {/* Breadcrumb & Editorial Header */}
        <div className="mb-10 border-b border-border/60 pb-6">
          <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-on-surface">
              Home
            </Link>
            <span>/</span>
            <span className="font-semibold text-on-surface">Curated Collections</span>
          </div>
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary-container/40 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-on-primary-container">
              <Sparkles className="size-3 text-primary" />
              Slow Fashion Archives
            </span>
            <h1 className="font-heading mt-3 text-3xl font-bold tracking-tight text-on-surface sm:text-4xl">
              Artisan Collections
            </h1>
            <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
              Explore our taxonomies of slow-made crochet fashion — structured milk-cotton shoulder
              bags, freshwater pearl evening pouches, amigurumi charms, and bespoke commissions.
            </p>
          </div>
        </div>

        {/* Collections Editorial Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CROCHET_CATEGORIES.map((cat) => {
            const meta = CATEGORY_META[cat.slug] || {
              image: CATEGORY_META["handbags"].image,
              tag: "Artisan Pieces",
            }
            const productCount = PRODUCTS.filter((p) => p.categorySlug === cat.slug).length

            return (
              <Link
                key={cat.slug}
                href={cat.slug === "custom-orders" ? "/custom-order" : `/collections/${cat.slug}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-surface-container-lowest p-5 shadow-xs transition-colors hover:border-primary/50"
              >
                {/* Visual Cover */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-surface-container">
                  <Image
                    src={meta.image}
                    alt={cat.name}
                    width={600}
                    height={450}
                    unoptimized
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full bg-surface/90 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-on-surface shadow-xs backdrop-blur-md">
                      {meta.tag}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="mt-4 flex flex-1 flex-col justify-between">
                  <div>
                    <h2 className="font-heading text-lg font-bold text-on-surface transition-colors group-hover:text-primary">
                      {cat.name}
                    </h2>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                      {cat.description}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
                    <span className="font-mono text-xs font-semibold tabular-nums text-muted-foreground">
                      {productCount > 0 ? `${productCount} Designs in Stock` : "Commissions Open"}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-bold text-primary group-hover:underline">
                      Explore
                      <ArrowRight className="size-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  )
}
