export interface CreatePaymentOrderInput {
  amountPaise: number
  currency?: "INR"
  receipt: string
  notes?: Record<string, string>
}

export interface PaymentOrderOutput {
  id: string
  entity: "order"
  amount: number
  currency: string
  receipt: string
  status: "created" | "attempted" | "paid"
  created_at: number
}

export interface VerifyPaymentInput {
  orderId: string
  paymentId: string
  signature: string
}

export interface WebhookEventPayload {
  entity: string
  account_id: string
  event: string
  contains: string[]
  payload: {
    payment?: {
      entity: Record<string, unknown>
    }
    order?: {
      entity: Record<string, unknown>
    }
  }
  created_at: number
}
