import "server-only"
import {
  getRazorpayClient,
  verifyRazorpaySignature,
  verifyRazorpayWebhookSignature,
} from "@/lib/razorpay/client"
import type {
  CreatePaymentOrderInput,
  PaymentOrderOutput,
  VerifyPaymentInput,
} from "@/lib/razorpay/types"

export interface IPaymentService {
  createOrder(input: CreatePaymentOrderInput): Promise<PaymentOrderOutput>
  verifyPayment(input: VerifyPaymentInput): boolean
  verifyWebhook(rawBody: string, signature: string): boolean
}

/**
 * Server-side Razorpay Payment Service Foundation.
 * Prepared for checkout implementation in subsequent phases.
 */
export class RazorpayPaymentService implements IPaymentService {
  async createOrder(input: CreatePaymentOrderInput): Promise<PaymentOrderOutput> {
    const razorpay = getRazorpayClient()

    const order = await razorpay.orders.create({
      amount: input.amountPaise,
      currency: input.currency ?? "INR",
      receipt: input.receipt,
      notes: input.notes,
    })

    return {
      id: order.id,
      entity: "order",
      amount: Number(order.amount),
      currency: order.currency,
      receipt: order.receipt ?? input.receipt,
      status: order.status as "created" | "attempted" | "paid",
      created_at: Number(order.created_at),
    }
  }

  verifyPayment(input: VerifyPaymentInput): boolean {
    return verifyRazorpaySignature(input)
  }

  verifyWebhook(rawBody: string, signature: string): boolean {
    return verifyRazorpayWebhookSignature(rawBody, signature)
  }
}

export const paymentService: IPaymentService = new RazorpayPaymentService()
