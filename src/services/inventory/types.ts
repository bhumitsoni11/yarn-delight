export interface StockCheckResult {
  productId: string
  available: boolean
  availableQuantity: number
  requestedQuantity: number
}

export interface InventoryReservation {
  reservationId: string
  productId: string
  quantity: number
  expiresAt: string
}
