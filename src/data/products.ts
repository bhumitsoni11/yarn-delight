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
    title: "Strawberry Blossom Crochet Tote",
    slug: "strawberry-blossom-crochet-tote",
    description:
      "Hand-stitched with 100% premium milk cotton yarn. Features delicate 3D strawberry blossoms, sturdy reinforced shoulder straps, and a roomy silhouette perfect for college or weekend outings.",
    categorySlug: "handbags",
    pricePaise: 169900, // ₹1,699
    compareAtPricePaise: 229900, // ₹2,299
    inStock: true,
    stockQuantity: 8,
    rating: 4.9,
    reviewCount: 148,
    badge: "Bestseller",
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
    ],
    tags: ["cotton", "tote", "handbag", "strawberry", "coquette"],
    colorOptions: ["Pastel Pink", "Vanilla Cream", "Butter Yellow"],
    yarnDetails: {
      material: "100% Milk Cotton (5-ply)",
      careInstructions: "Hand wash in cold water with mild detergent; lay flat to dry in shade.",
    },
    createdAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-02-01T12:00:00Z",
  },
  {
    id: "prod-2",
    title: "Vintage Pastel Granny Square Sling",
    slug: "vintage-pastel-granny-square-sling",
    description:
      "Nostalgic 70s-inspired granny square crochet shoulder purse with an antique brass zipper and magnetic snap closure. Woven with pastel lilac, sage, and cream yarn.",
    categorySlug: "purses",
    pricePaise: 129900, // ₹1,299
    compareAtPricePaise: 179900, // ₹1,799
    inStock: true,
    stockQuantity: 14,
    rating: 4.8,
    reviewCount: 92,
    badge: "Trending",
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
    ],
    tags: ["granny-square", "sling", "vintage", "pastel", "purse"],
    colorOptions: ["Lilac Mix", "Butter Cream", "Sage Whisper"],
    yarnDetails: {
      material: "Organic Mercerized Cotton",
      careInstructions: "Spot clean with damp cloth or hand wash gently.",
    },
    createdAt: "2026-01-18T14:30:00Z",
    updatedAt: "2026-02-05T09:15:00Z",
  },
  {
    id: "prod-3",
    title: "Vanilla Cloud Chunky Ribbed Muffler",
    slug: "vanilla-cloud-chunky-ribbed-muffler",
    description:
      "Ultra-soft, heavyweight ribbed winter muffler designed for cold evenings and cozy cafe dates. Features hand-knotted fringe edges and premium thermal insulation.",
    categorySlug: "mufflers",
    pricePaise: 189900, // ₹1,899
    compareAtPricePaise: 249900, // ₹2,499
    inStock: true,
    stockQuantity: 5,
    rating: 5.0,
    reviewCount: 64,
    badge: "Artisan Pick",
    images: [
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=800&auto=format&fit=crop",
    ],
    tags: ["muffler", "scarf", "winter", "chunky", "cream"],
    colorOptions: ["Warm Vanilla", "Espresso Mocha", "Lavender Mist"],
    yarnDetails: {
      material: "Australian Merino Blend & Premium Acrylic",
      careInstructions: "Dry clean or gentle hand wash; do not wring or tumble dry.",
    },
    createdAt: "2026-01-10T08:00:00Z",
    updatedAt: "2026-02-10T16:00:00Z",
  },
  {
    id: "prod-4",
    title: "Matcha Bunny Amigurumi Bag Charm",
    slug: "matcha-bunny-amigurumi-bag-charm",
    description:
      "Adorably detailed mini bunny keychain in soft matcha green with a tiny crochet strawberry hat. Equipped with a gold-tone lobster clasp to clip onto bags or key rings.",
    categorySlug: "keychains",
    pricePaise: 44900, // ₹449
    compareAtPricePaise: 69900, // ₹699
    inStock: true,
    stockQuantity: 25,
    rating: 4.9,
    reviewCount: 210,
    badge: "Bestseller",
    images: [
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?q=80&w=800&auto=format&fit=crop",
    ],
    tags: ["amigurumi", "keychain", "bunny", "matcha", "charm"],
    colorOptions: ["Matcha Green", "Strawberry Pink", "Honey Peach"],
    yarnDetails: {
      material: "Combed Anti-Pilling Cotton",
      careInstructions: "Surface clean with mild soapy water.",
    },
    createdAt: "2026-01-22T11:20:00Z",
    updatedAt: "2026-02-12T10:00:00Z",
  },
  {
    id: "prod-5",
    title: "Daisy Bloom Hair Clip & Scrunchie Duo",
    slug: "daisy-bloom-hair-clip-scrunchie-duo",
    description:
      "Set of two handcrafted hair accessories: one fluffy ruffled crochet scrunchie and one French alligator barrette adorned with 3 micro crochet daisies.",
    categorySlug: "accessories",
    pricePaise: 59900, // ₹599
    compareAtPricePaise: 89900, // ₹899
    inStock: true,
    stockQuantity: 30,
    rating: 4.8,
    reviewCount: 76,
    badge: "New Drop",
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=800&auto=format&fit=crop",
    ],
    tags: ["hair", "scrunchie", "daisy", "accessories", "coquette"],
    colorOptions: ["Butter & White", "Blush Pink", "Lavender Petal"],
    yarnDetails: {
      material: "Velvet Chenille & Bamboo Cotton",
      careInstructions: "Gentle hand rinse; dry flat.",
    },
    createdAt: "2026-02-01T09:00:00Z",
    updatedAt: "2026-02-14T11:00:00Z",
  },
  {
    id: "prod-6",
    title: "Lilac Sky Ruffle Bucket Bag",
    slug: "lilac-sky-ruffle-bucket-bag",
    description:
      "Statement structured bucket bag featuring dramatic tiered ruffles, dual top handles, and a removable cotton drawstring inner pouch to keep your essentials secure.",
    categorySlug: "handbags",
    pricePaise: 219900, // ₹2,199
    compareAtPricePaise: 299900, // ₹2,999
    inStock: true,
    stockQuantity: 6,
    rating: 4.9,
    reviewCount: 52,
    badge: "Trending",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop",
    ],
    tags: ["bucket-bag", "ruffle", "lilac", "handbag", "statement"],
    colorOptions: ["Lilac Sky", "Rose Marshmallow", "Caramel Cream"],
    yarnDetails: {
      material: "Corded Cotton & Silk Thread Blend",
      careInstructions: "Do not machine wash. Spot wipe gently.",
    },
    createdAt: "2026-02-05T13:00:00Z",
    updatedAt: "2026-02-15T15:00:00Z",
  },
  {
    id: "prod-7",
    title: "Cherry Cherish Coin Pouch",
    slug: "cherry-cherish-coin-pouch",
    description:
      "Handy pocket pouch with embroidered 3D sweet cherries, bronze kiss-lock clasp, and smooth satin lining. Fits cards, AirPods, lip tint, and coins.",
    categorySlug: "purses",
    pricePaise: 79900, // ₹799
    compareAtPricePaise: 119900, // ₹1,199
    inStock: true,
    stockQuantity: 18,
    rating: 4.7,
    reviewCount: 88,
    badge: "Bestseller",
    images: [
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
    ],
    tags: ["pouch", "cherry", "coin-purse", "kiss-lock"],
    colorOptions: ["Vanilla Cherry", "Cream Berry"],
    yarnDetails: {
      material: "100% Egyptian Cotton",
      careInstructions: "Hand wash with cold water; dry flat.",
    },
    createdAt: "2026-02-08T10:00:00Z",
    updatedAt: "2026-02-16T12:00:00Z",
  },
  {
    id: "prod-8",
    title: "Custom Monogram Crochet Commission",
    slug: "custom-monogram-crochet-commission",
    description:
      "Work directly with our master crochet artisan to design a personalized piece. Choose your silhouette, custom letters/initials, color palette, and preferred yarn texture.",
    categorySlug: "custom-orders",
    pricePaise: 249900, // ₹2,499 base
    compareAtPricePaise: 329900, // ₹3,299
    inStock: true,
    stockQuantity: 10,
    rating: 5.0,
    reviewCount: 115,
    badge: "Artisan Pick",
    images: [
      "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop",
    ],
    tags: ["custom", "bespoke", "monogram", "personalized"],
    colorOptions: ["Custom Palette on Request"],
    yarnDetails: {
      material: "Selected based on design consultation",
      careInstructions: "Custom care manual included in parcel.",
    },
    createdAt: "2026-02-10T14:00:00Z",
    updatedAt: "2026-02-18T16:00:00Z",
  },
]

export function getProductsByCategory(categorySlug?: string): StoreProduct[] {
  if (!categorySlug || categorySlug === "all") return PRODUCTS
  return PRODUCTS.filter((p) => p.categorySlug === categorySlug)
}

export function searchProducts(query: string): StoreProduct[] {
  const clean = query.trim().toLowerCase()
  if (!clean) return PRODUCTS
  return PRODUCTS.filter(
    (p) =>
      p.title.toLowerCase().includes(clean) ||
      p.description.toLowerCase().includes(clean) ||
      p.tags.some((t) => t.toLowerCase().includes(clean))
  )
}
