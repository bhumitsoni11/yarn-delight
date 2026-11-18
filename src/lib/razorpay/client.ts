import "server-only"
import Razorpay from "razorpay"
import crypto from "node:crypto"
import { getServerEnv } from "@/lib/env"
import { BadRequestError } from "@/lib/security/errors"
import type { VerifyPaymentInput } from "./types"

let razorpayInstance: Razorpay | null = null

/**
 * Initializes and returns the server-side Razorpay SDK instance.
 * Throws an explicit error if credentials are not configured.
 */
export function getRazorpayClient(): Razorpay {
  if (razorpayInstance) return razorpayInstance

  const env = getServerEnv()

  if (!env.RAZORPAY_KEY_ID || !env.RAZORPAY_KEY_SECRET) {
    throw new BadRequestError(
      "Razorpay credentials (RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET) are not configured."
    )
  }

  razorpayInstance = new Razorpay({
    key_id: env.RAZORPAY_KEY_ID,
    key_secret: env.RAZORPAY_KEY_SECRET,
  })

  return razorpayInstance
}

/**
 * Timing-safe signature verification for Razorpay payment callbacks.
 */
export function verifyRazorpaySignature({
  orderId,
  paymentId,
  signature,
}: VerifyPaymentInput): boolean {
  const env = getServerEnv()
  if (!env.RAZORPAY_KEY_SECRET) {
    throw new BadRequestError("RAZORPAY_KEY_SECRET is not configured for signature verification.")
  }

  const payload = `${orderId}|${paymentId}`
  const generatedSignature = crypto
    .createHmac("sha256", env.RAZORPAY_KEY_SECRET)
    .update(payload)
    .digest("hex")

  const generatedBuffer = Buffer.from(generatedSignature, "utf-8")
  const signatureBuffer = Buffer.from(signature, "utf-8")

  if (generatedBuffer.length !== signatureBuffer.length) {
    return false
  }

  return crypto.timingSafeEqual(generatedBuffer, signatureBuffer)
}

/**
 * Timing-safe signature verification for Razorpay Webhooks.
 */
export function verifyRazorpayWebhookSignature(rawBody: string, webhookSignature: string): boolean {
  const env = getServerEnv()
  if (!env.RAZORPAY_WEBHOOK_SECRET) {
    throw new BadRequestError("RAZORPAY_WEBHOOK_SECRET is not configured.")
  }

  const expectedSignature = crypto
    .createHmac("sha256", env.RAZORPAY_WEBHOOK_SECRET)
    .update(rawBody)
    .digest("hex")

  const expectedBuffer = Buffer.from(expectedSignature, "utf-8")
  const receivedBuffer = Buffer.from(webhookSignature, "utf-8")

  if (expectedBuffer.length !== receivedBuffer.length) {
    return false
  }

  return crypto.timingSafeEqual(expectedBuffer, receivedBuffer)
}
