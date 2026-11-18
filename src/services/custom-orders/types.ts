export type CustomOrderStatus =
  | "inquiry_submitted"
  | "under_review"
  | "quote_sent"
  | "quote_accepted"
  | "in_production"
  | "completed"
  | "rejected"

export interface CustomOrderInquiry {
  id: string
  customerId: string
  title: string
  description: string
  colorPalette?: string[]
  yarnPreference?: string
  dimensions?: string
  targetDeliveryDate?: string
  referenceImageUrls: string[]
  budgetInr?: number
  status: CustomOrderStatus
  adminNotes?: string
  quotedAmountPaise?: number
  createdAt: string
  updatedAt: string
}
