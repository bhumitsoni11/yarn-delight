export interface Product {
  id: string
  title: string
  slug: string
  description: string
  categorySlug: string
  pricePaise: number
  compareAtPricePaise?: number
  inStock: boolean
  stockQuantity: number
  images: string[]
  tags: string[]
  yarnDetails?: {
    material: string
    careInstructions: string
  }
  createdAt: string
  updatedAt: string
}

export interface ProductFilterParams {
  categorySlug?: string
  minPricePaise?: number
  maxPricePaise?: number
  inStockOnly?: boolean
  searchQuery?: string
  limit?: number
  offset?: number
}
