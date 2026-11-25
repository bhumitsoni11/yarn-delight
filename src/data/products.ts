import type { Product } from "@/services/products/types"

export interface StoreProduct extends Product {
  rating: number
  reviewCount: number
  badge?: "Bestseller" | "New Drop" | "Trending" | "Artisan Pick"
  colorOptions?: string[]
}

export const PRODUCTS: StoreProduct[] = [
  {
    id: "prod-1",
    title: "The Sweetheart Rosebud Tote",
    slug: "sweetheart-rosebud-tote",
    description:
      "Handcrafted with 100% pure milk cotton. Features 12 hours of meticulous hand-stitching with delicate 3D micro rosette appliques, reinforced dual straps, and ample room for daily essentials.",
    categorySlug: "handbags",
    pricePaise: 349900, // ₹3,499
    compareAtPricePaise: 420000, // ₹4,200
    inStock: true,
    stockQuantity: 6,
    rating: 4.9,
    reviewCount: 182,
    badge: "Bestseller",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBKfeFFDTmNtsDMxOBh7yYBD9iQ7URH7qdFY0zhG5ylGqf_9QbytjlD6JwaHjnQApHQ5ceC7pQ7Nat_XTNNx4ERysrHDeT3-rf3D9btV82PRzx_ytx_ou_BW-FpMOEyliqSUys-san_fPSFfmUCHr78nXorh8BYqI9EAaWbc9f4HKcjqHZ2rbNczBzTognLceP7wPpNqKioA8OWVXnAcQdfeOiLHwZ6teZXdhzn6tI",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB5F8HlNs4AFhg3MeJC3KmWZx-Gb0AuLb1ITIISy1JUc0J_zBjJLyH7C2NKoqtycspa_TXBqP0MU5y81gafmCDHqGm-cA0vq2upGNFTnNkiGh93y3ZeG4U1ztuAUDCz0-CU7MlKjMTHR-L9BbG-djr-9Oj-A2dxJ67-WioLKlahJbmz-nD6zH_KGboir75kvQ7yn8nRMb3xmZvUWFibmfIuqsr6LSA0RkpOuGhji84",
    ],
    tags: ["cotton", "tote", "handbag", "rosette", "coquette"],
    colorOptions: ["Blush Pink", "Buttercup", "Soft Lilac", "Sage Green"],
    yarnDetails: {
      material: "100% Organic Milk Cotton (5-ply)",
      careInstructions: "Gentle cold hand wash with mild wool wash; lay flat to dry in shade.",
    },
    createdAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-02-01T12:00:00Z",
  },
  {
    id: "prod-2",
    title: "Cloud Nine Pearl Clutch",
    slug: "cloud-nine-pearl-clutch",
    description:
      "Hand-spun ecru cotton evening pouch with an authentic freshwater mother-of-pearl handle, satin interior lining, and secure braided magnetic closure.",
    categorySlug: "purses",
    pricePaise: 189900, // ₹1,899
    compareAtPricePaise: 235000, // ₹2,350
    inStock: true,
    stockQuantity: 12,
    rating: 4.9,
    reviewCount: 96,
    badge: "Trending",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBKKITwEuAaZoZ8TbaydldOLmDJb7_Uy-zKm1slr3xZS0hpLbJWLkm3S42dQ0L2LZBjhMlElIOePn3OZUL82aQXelX_ZbqhJh-Anho0V5yrOKFd-kPaZ8Ylic5c3EcUuXhujoxgcJ-JK1HKuMP1bhmKIdeUtfXlsU_GtbXxJv01JGRxBax9b8OCbe-A1GZpqjx6odaeFwmUIVp5o-uVIHu9VlGGtaMmV2okUokpRe8",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB_FPtll3lQRGTd15UUIvSe239sbPNBX4bp8Ay0rz9Z6nCnD0H0F3GqkDeA7PMoFJDpw79p3ZLvPbcCN4s0P5utTka_MB_U1A3MwXX-y-lKtC3lxQqvKWZW61tD9bXCT7RIEAN6z122obBRTWWhK0zA-ZkbnIwzogjZ2sPLWcQIS5HYUTjqLdWgDRm4ycO8DtGnyqynzJ4YfE8FzxObvOnhQU8vvBej2IpVSigbOO8",
    ],
    tags: ["pearl", "clutch", "evening", "ecru", "purse"],
    colorOptions: ["Ecru Cream", "Soft Lavender", "Rosette Blush"],
    yarnDetails: {
      material: "Organic Mercerized Cotton & Freshwater Pearls",
      careInstructions: "Spot clean gently with a damp cotton cloth.",
    },
    createdAt: "2026-01-18T14:30:00Z",
    updatedAt: "2026-02-05T09:15:00Z",
  },
  {
    id: "prod-3",
    title: "Lavender Ombré Chunky Scarf",
    slug: "lavender-ombre-chunky-scarf",
    description:
      "Plush, oversized chunky ribbed scarf in a dreamy lavender-to-cream ombré transition. Finished with generous hand-knotted tassel fringe for cold evening walks.",
    categorySlug: "mufflers",
    pricePaise: 279900, // ₹2,799
    compareAtPricePaise: 340000, // ₹3,400
    inStock: true,
    stockQuantity: 5,
    rating: 5.0,
    reviewCount: 74,
    badge: "Artisan Pick",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAqX9VJP8MDy86pK5j4BDXniLjtBo0ZZNVxKM_xHPsCQC_iW8S9MrwTK58wPdnOk2IzNojOaMDcmXn0l1Gt_uy3AEZ7ksocHKg1cQwNfI2xn0hrQ021SNsTe3074Cx_EtIMsgvVTsravulC-TpTZZdVtt7bKHUmICi7t7V1p3ITu2Vk5TD3zKBHpAGhHU1Ia3iqvc0N4tj9lcxdxGOTwjXNnHNss0nuIOWq8pujo8g",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCIA06YrJth7GSA1yal0zAc0cHKKv0MRyX1WqSdHDScrpJscIQB6VjLTpgUa8gxnVPK_UAilJUMJ2HQdU0k8yU3-pJDp4aiSvdrlngMPveZvFayAcfSGW277cuyJE3t2dhhGQj6Kke12FrDdEhalQDANqgSf64gaiCzZInDhNf-wGFdtqlIMHemiJXHCz06yrhIjXKynTOVyCS_16pm14kuHnbzIehb4lvl1Cg-j0E",
    ],
    tags: ["muffler", "scarf", "winter", "alpaca", "lavender"],
    colorOptions: ["Lavender Ombré", "Sugar Rose", "Pistachio Cream"],
    yarnDetails: {
      material: "Highland Alpaca & Merino Blend",
      careInstructions: "Dry clean recommended or gentle lukewarm wool wash.",
    },
    createdAt: "2026-01-10T08:00:00Z",
    updatedAt: "2026-02-10T16:00:00Z",
  },
  {
    id: "prod-4",
    title: "Coquette Bow Hair Barrettes (Set of 2)",
    slug: "coquette-bow-hair-barrettes",
    description:
      "Dainty pair of hand-crocheted hair ribbons anchored on non-slip French alligator barrettes. Adds an effortless Parisian coquette finish to any hairstyle.",
    categorySlug: "accessories",
    pricePaise: 79900, // ₹799
    compareAtPricePaise: 99900, // ₹999
    inStock: true,
    stockQuantity: 20,
    rating: 4.8,
    reviewCount: 110,
    badge: "New Drop",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDgC7HrRR8wzReU8as-tNNdk4yEw3jHB1A1fyKCjGHVmeRv-SRBWD8__kSRDAyzAVBAnbm57ghwbf3cj9f38MlLT6rpr4JAUFmXHAyvxGRXzm2IV4zf3WuIlXqbIIrSUYnEFs3elvevnS77nBKtZL48KWxB3T5Zs3Bg2s3j7O6UlJDNY5ACNf9Y4tHyoxxF9mveRaXCwzKYYFElEfObt_tW7t_DmPD5LqKF2NUXRl0",
    ],
    tags: ["bow", "hair", "accessory", "barrette", "coquette"],
    colorOptions: ["Buttercup Duo", "Blush Duo", "Snow Crisp"],
    yarnDetails: {
      material: "Japanese Mercerized Combed Cotton",
      careInstructions: "Spot clean with damp cloth; reshape bow loops while damp.",
    },
    createdAt: "2026-01-22T11:00:00Z",
    updatedAt: "2026-02-12T10:00:00Z",
  },
  {
    id: "prod-5",
    title: "Daisy Coquette Mini Shoulder Bag",
    slug: "daisy-coquette-mini-shoulder-bag",
    description:
      "The viral atelier signature bag. Structured crochet weave adorned with raised 3D daisy petals, braided arch handle, and organic unbleached cotton interior lining.",
    categorySlug: "handbags",
    pricePaise: 329900, // ₹3,299
    compareAtPricePaise: 399900, // ₹3,999
    inStock: true,
    stockQuantity: 8,
    rating: 4.9,
    reviewCount: 240,
    badge: "Bestseller",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCPqDrkmJ7q4feV66tq4_CTcrfUL295IVuCAQuvAKwalalo9UC1anoCmX0ngaE0_kQfRezjD1EUQS6kkTjvKXb1FbdU_uRHoWW6P5hkiXvjiTmYIhT92VrXvo9bjeFxJXXQ3ypdSrY3gICFqb_HW_30wPqZXSwW_6gy4PziDzC3v2f_vvRrcQ5aeY9mtUfGgHgCXag5MS5Zfv797LhuxL198LxHYLwZnQY2kXV5Z1k",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB8A8HUFrKiAxHc5H6PprhxM_NRpPwBlnAUVzVSPQjgOcTDgIlBpI5Aud7z2am-H12D7iiFFbkqgrxb36sPC3mOAScd_ttpoZ-NEI3ewq200lNudcUpyQBuZBhpKDxaiJEcsyNrRw4hRRqCt9zyYTfEZDfJgOVm9vr0BnUNTL82FpXi2I8pH-ekMVdpEE4oNNYvyRB1piLrDR2QGvPirxfRGbyiCtbzxNLhGsAn9hE",
    ],
    tags: ["daisy", "shoulder-bag", "mini-bag", "handbag", "viral"],
    colorOptions: ["Butter Daisy", "Lavender Meadow", "Blush Petal"],
    yarnDetails: {
      material: "100% Organic Spun Cotton",
      careInstructions: "Spot clean gently with mild detergent; dry flat.",
    },
    createdAt: "2026-01-05T09:00:00Z",
    updatedAt: "2026-02-14T15:00:00Z",
  },
  {
    id: "prod-6",
    title: "Blossom Berry Amigurumi Bag Charm",
    slug: "blossom-berry-amigurumi-bag-charm",
    description:
      "Playful handmade charm featuring miniature ripe strawberries, hand-knotted white blossoms, and a pastel ribbon hook with a gold-tone luxury clasp.",
    categorySlug: "keychains",
    pricePaise: 49900, // ₹499
    compareAtPricePaise: 69900, // ₹699
    inStock: true,
    stockQuantity: 25,
    rating: 4.9,
    reviewCount: 135,
    badge: "Trending",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAvMQdIODzUmIWsj0922e_64kbwP-bL_TScy8IRZG-gtWJiZhytHhI6GK68HqS9oVA5sKpON5nMVtNYQT7ghM7ypW4tjOpJKU2qelguFS8ERskMHkt-PmEilIz9LlYarAqu9GRwwU8fYFBQOAuRjEmRvAoQ516wLT-FkAJtRiygx7ju6GZcS8EH4Aw4oMpmx5H-_e0gbIRYM110MWgsi9A5h3xvspP3diOTzJXDpIc",
    ],
    tags: ["strawberry", "charm", "keychain", "amigurumi", "blossom"],
    colorOptions: ["Strawberry Red", "Matcha Green", "Berry Lilac"],
    yarnDetails: {
      material: "Fine Mercerized 4-Ply Cotton",
      careInstructions: "Wipe with damp cloth.",
    },
    createdAt: "2026-01-20T12:00:00Z",
    updatedAt: "2026-02-15T08:00:00Z",
  },
  {
    id: "prod-7",
    title: "Scalloped Peter-Pan Lace Collar",
    slug: "scalloped-peter-pan-lace-collar",
    description:
      "Detachable heirloom crochet collar with vintage scalloped edges and a satin ribbon tie closure. Elevates shirts, knit jumpers, and dresses with delicate craft.",
    categorySlug: "accessories",
    pricePaise: 89900, // ₹899
    compareAtPricePaise: 119900, // ₹1,199
    inStock: true,
    stockQuantity: 10,
    rating: 4.8,
    reviewCount: 52,
    badge: "New Drop",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD6kJRwg7jAJHg77AqWuGcBm2RNjwT7lGjNJDRVz0b5vfCcXBx6U8-kd54d-m_l4Qa3gU5RMSD-m2izHQE2TdznB6lQgCaTPQCRA3gM9FnCaf84y_dfxxzxoX0PsWaYGHLu7GmmRWi7EokylXVwds5630_orIIuBRkRdUSeZbJCNMd1E2geG-L0602EFAo4xIv_LxmNc3xaKWrV5j8CInFrusKQ7fH3mpYWjbI1suc",
    ],
    tags: ["collar", "lace", "peter-pan", "accessory", "vintage"],
    colorOptions: ["Buttercream", "Ivory White", "Powder Rose"],
    yarnDetails: {
      material: "Fine Egyptian Spun Cotton",
      careInstructions: "Hand wash in cool water; iron on low through a cloth.",
    },
    createdAt: "2026-01-25T15:00:00Z",
    updatedAt: "2026-02-16T11:00:00Z",
  },
  {
    id: "prod-8",
    title: "Bespoke Heirloom Custom Piece",
    slug: "bespoke-heirloom-custom-piece",
    description:
      "Work directly with our master atelier artisans in Gujarat. Choose your silhouette, custom yarn blend, and palette for an individual, slow-crafted commission.",
    categorySlug: "custom-orders",
    pricePaise: 159900, // ₹1,599 base
    compareAtPricePaise: 199900, // ₹1,999
    inStock: true,
    stockQuantity: 4, // 4 slots remaining
    rating: 5.0,
    reviewCount: 48,
    badge: "Artisan Pick",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBJx3Z5kB1jbdGZZPuL7PQIo8LPuKw17n8Y9mLpK9fygOQ9sM9a3KvUOkzKPoIslRiFaKx8G4KjFE1Y8uwgYN-zu6rM64hB4dNp8NtaDeFw5N5SIINjZYqPizSIFoQtoZ8iud-18mN9wsu0YSci-T_HyfTxUwNfBIzFHgYgCkzpsqj3PZDOH4-sws43JZDPUrUdzVcfT0IYTLUU8kd-5MFk7Fche2Ji07_cnoeykZ8",
    ],
    tags: ["custom", "bespoke", "heirloom", "atelier", "commission"],
    colorOptions: ["Custom Palette", "Strawberry Blossom", "Matcha Latte"],
    yarnDetails: {
      material: "Choice of Organic Milk Cotton, Velvet Chenille or Highland Merino",
      careInstructions: "Personalized care manual shipped with each finished commission.",
    },
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-02-18T18:00:00Z",
  },
]

export function getProductsByCategory(categorySlug: string): StoreProduct[] {
  if (categorySlug === "all") return PRODUCTS
  return PRODUCTS.filter((p) => p.categorySlug === categorySlug)
}

export function getProductBySlug(slug: string): StoreProduct | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function searchProducts(query: string): StoreProduct[] {
  const q = query.toLowerCase().trim()
  if (!q) return PRODUCTS
  return PRODUCTS.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
  )
}
