/**
 * Core Crochet Product Categories
 * Locks the primary catalog taxonomy for the platform.
 */

export interface ProductCategoryDefinition {
  slug: string
  name: string
  description: string
  featured: boolean
}

export const CROCHET_CATEGORIES: readonly ProductCategoryDefinition[] = [
  {
    slug: "handbags",
    name: "Crochet Handbags",
    description: "Artisan handcrafted crochet tote bags, shoulder bags, and bucket bags.",
    featured: true,
  },
  {
    slug: "purses",
    name: "Crochet Purses",
    description: "Compact clutch purses, coin pouches, and crossbody crochet slings.",
    featured: true,
  },
  {
    slug: "keychains",
    name: "Crochet Keychains",
    description: "Whimsical crochet charms, amigurumi keychains, and bag tags.",
    featured: true,
  },
  {
    slug: "mufflers",
    name: "Crochet Mufflers & Scarves",
    description: "Warm, cozy, premium yarn mufflers and textured winter neck warmers.",
    featured: true,
  },
  {
    slug: "accessories",
    name: "Crochet Accessories",
    description: "Hair scrunchies, headbands, bookmarks, coasters, and floral appliques.",
    featured: false,
  },
  {
    slug: "custom-orders",
    name: "Custom Crochet Orders",
    description:
      "Personalized crochet creations tailored to custom yarn, dimensions, and palettes.",
    featured: true,
  },
] as const
