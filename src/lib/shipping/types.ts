export interface ShippingAddress {
  name: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  pincode: string
  phone: string
  email?: string
}

export interface ShippingRateCalculationInput {
  deliveryPincode: string
  weightKg: number
  cod: boolean
}

export interface ShippingRateOption {
  courierId: number
  courierName: string
  estimatedDeliveryDays: number
  ratePaise: number
}

export interface CreateShipmentInput {
  orderId: string
  shippingAddress: ShippingAddress
  weightKg: number
  lengthCm: number
  breadthCm: number
  heightCm: number
  totalAmountPaise: number
  isCod: boolean
}

export interface ShipmentTrackingStatus {
  trackingId: string
  status: "pending" | "manifested" | "in_transit" | "out_for_delivery" | "delivered" | "rto"
  currentLocation?: string
  lastUpdated: string
}
