import type { ShippingAddress } from "@/lib/shipping/types"

export type OrderStatus =
  | "pending_payment"
  | "payment_received"
  | "processing"
  | "crafted"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded"

export interface OrderLineItem {
  id: string
  productId: string
  title: string
  quantity: number
  unitPricePaise: number
  totalPricePaise: number
  customizations?: Record<string, string>
}

export interface Order {
  id: string
  customerId: string
  orderNumber: string
  items: OrderLineItem[]
  subtotalPaise: number
  shippingPaise: number
  totalPaise: number
  status: OrderStatus
  shippingAddress: ShippingAddress
  paymentId?: string
  shippingTrackingId?: string
  createdAt: string
  updatedAt: string
}
