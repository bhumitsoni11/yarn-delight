"use client"

import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

interface CategoryGridProps {
  onSelectCategory: (slug: string) => void
}

const ATELIER_CATEGORIES = [
  {
    slug: "handbags",
    name: "Handbags",
    desc: "Totes, Slings & Satchels",
    priceRange: "From ₹2,899",
    count: "14 Designs",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCPqDrkmJ7q4feV66tq4_CTcrfUL295IVuCAQuvAKwalalo9UC1anoCmX0ngaE0_kQfRezjD1EUQS6kkTjvKXb1FbdU_uRHoWW6P5hkiXvjiTmYIhT92VrXvo9bjeFxJXXQ3ypdSrY3gICFqb_HW_30wPqZXSwW_6gy4PziDzC3v2f_vvRrcQ5aeY9mtUfGgHgCXag5MS5Zfv797LhuxL198LxHYLwZnQY2kXV5Z1k",
  },
  {
    slug: "purses",
    name: "Purses & Clutches",
    desc: "Pearl Pouches & Coins",
    priceRange: "From ₹1,499",
    count: "Bestseller",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB_FPtll3lQRGTd15UUIvSe239sbPNBX4bp8Ay0rz9Z6nCnD0H0F3GqkDeA7PMoFJDpw79p3ZLvPbcCN4s0P5utTka_MB_U1A3MwXX-y-lKtC3lxQqvKWZW61tD9bXCT7RIEAN6z122obBRTWWhK0zA-ZkbnIwzogjZ2sPLWcQIS5HYUTjqLdWgDRm4ycO8DtGnyqynzJ4YfE8FzxObvOnhQU8vvBej2IpVSigbOO8",
  },
  {
    slug: "keychains",
    name: "Bag Charms",
    desc: "Cherries, Bows & Florals",
    priceRange: "From ₹499",
    count: "Trending",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAvMQdIODzUmIWsj0922e_64kbwP-bL_TScy8IRZG-gtWJiZhytHhI6GK68HqS9oVA5sKpON5nMVtNYQT7ghM7ypW4tjOpJKU2qelguFS8ERskMHkt-PmEilIz9LlYarAqu9GRwwU8fYFBQOAuRjEmRvAoQ516wLT-FkAJtRiygx7ju6GZcS8EH4Aw4oMpmx5H-_e0gbIRYM110MWgsi9A5h3xvspP3diOTzJXDpIc",
  },
  {
    slug: "mufflers",
    name: "Mufflers & Scarves",
    desc: "Highland Wool Wraps",
    priceRange: "From ₹2,499",
    count: "Cozy Edit",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCIA06YrJth7GSA1yal0zAc0cHKKv0MRyX1WqSdHDScrpJscIQB6VjLTpgUa8gxnVPK_UAilJUMJ2HQdU0k8yU3-pJDp4aiSvdrlngMPveZvFayAcfSGW277cuyJE3t2dhhGQj6Kke12FrDdEhalQDANqgSf64gaiCzZInDhNf-wGFdtqlIMHemiJXHCz06yrhIjXKynTOVyCS_16pm14kuHnbzIehb4lvl1Cg-j0E",
  },
  {
    slug: "accessories",
    name: "Hair & Collars",
    desc: "Bow Ties & Hairbands",
    priceRange: "From ₹699",
    count: "New Drop",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD6kJRwg7jAJHg77AqWuGcBm2RNjwT7lGjNJDRVz0b5vfCcXBx6U8-kd54d-m_l4Qa3gU5RMSD-m2izHQE2TdznB6lQgCaTPQCRA3gM9FnCaf84y_dfxxzxoX0PsWaYGHLu7GmmRWi7EokylXVwds5630_orIIuBRkRdUSeZbJCNMd1E2geG-L0602EFAo4xIv_LxmNc3xaKWrV5j8CInFrusKQ7fH3mpYWjbI1suc",
  },
  {
    slug: "custom-orders",
    name: "Bespoke Studio",
    desc: "Collaborative Commissions",
    priceRange: "From ₹1,599",
    count: "Custom Heirloom",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBJx3Z5kB1jbdGZZPuL7PQIo8LPuKw17n8Y9mLpK9fygOQ9sM9a3KvUOkzKPoIslRiFaKx8G4KjFE1Y8uwgYN-zu6rM64hB4dNp8NtaDeFw5N5SIINjZYqPizSIFoQtoZ8iud-18mN9wsu0YSci-T_HyfTxUwNfBIzFHgYgCkzpsqj3PZDOH4-sws43JZDPUrUdzVcfT0IYTLUU8kd-5MFk7Fche2Ji07_cnoeykZ8",
  },
]

export function CategoryGrid({ onSelectCategory }: CategoryGridProps) {
  return (
    <section
      id="categories"
      className="bg-surface-container-low/40 border-border scroll-mt-24 border-b py-14"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">
        <div className="mb-8 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <span className="text-primary text-[11px] font-bold tracking-widest uppercase">
              Couture Categories
            </span>
            <h2 className="font-heading text-on-surface mt-1 text-3xl font-bold tracking-tight">
              Explore the Studio Archive
            </h2>
          </div>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Each category is thoughtfully designed around organic lines, tactile bobbles, and
            heirloom quality.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
          {ATELIER_CATEGORIES.map((cat) => (
            <div
              key={cat.slug}
              onClick={() => {
                onSelectCategory(cat.slug)
                document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })
              }}
              className="group border-border/80 bg-surface-container-lowest hover:border-primary/40 relative flex cursor-pointer flex-col justify-between rounded-2xl border p-3 shadow-xs transition-colors"
            >
              <div className="bg-surface-container-high relative mb-3 aspect-[4/5] w-full overflow-hidden rounded-xl">
                <Image
                  src={cat.imageUrl}
                  alt={cat.name}
                  width={300}
                  height={375}
                  unoptimized
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-102"
                />
                <span className="bg-surface/90 text-on-surface absolute top-2 left-2 rounded-full px-2 py-0.5 text-[9px] font-bold shadow-xs backdrop-blur-xs">
                  {cat.count}
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-on-surface group-hover:text-primary line-clamp-1 text-sm font-semibold transition-colors">
                    {cat.name}
                  </h3>
                  <ArrowUpRight className="text-muted-foreground group-hover:text-primary size-3.5 transition-colors" />
                </div>
                <p className="text-muted-foreground line-clamp-1 text-[11px]">{cat.desc}</p>
                <span className="text-primary mt-1 block font-mono text-[11px] font-bold tabular-nums">
                  {cat.priceRange}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
