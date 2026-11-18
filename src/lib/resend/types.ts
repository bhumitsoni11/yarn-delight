export interface SendEmailInput {
  to: string | string[]
  subject: string
  html?: string
  text?: string
  replyTo?: string
  tags?: Array<{ name: string; value: string }>
}

export interface SendEmailResult {
  id: string
  success: boolean
}

export type EmailTemplateType =
  "ORDER_CONFIRMATION" | "CUSTOM_ORDER_INQUIRY" | "ORDER_DISPATCHED" | "PAYMENT_FAILED"
