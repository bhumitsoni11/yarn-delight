import { create } from "zustand"

export interface WishlistStoreState {
  items: string[] // product IDs
  toggleWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
}

export const useWishlistStore = create<WishlistStoreState>((set, get) => ({
  // Initialize with two starter items for great out-of-the-box demo UX
  items: ["prod-1", "prod-5"],
  toggleWishlist: (productId: string) =>
    set((state) => {
      const exists = state.items.includes(productId)
      return {
        items: exists
          ? state.items.filter((id) => id !== productId)
          : [...state.items, productId],
      }
    }),
  isInWishlist: (productId: string) => get().items.includes(productId),
  clearWishlist: () => set({ items: [] }),
}))
