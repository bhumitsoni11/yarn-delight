import "server-only"
import { getResendClient } from "@/lib/resend/client"
import { getServerEnv } from "@/lib/env"
import { logger } from "@/lib/security/logger"
import type { SendEmailInput, SendEmailResult } from "@/lib/resend/types"

export interface IEmailService {
  sendEmail(input: SendEmailInput): Promise<SendEmailResult>
}

/**
 * Server-side Transactional Email Service Foundation.
 * Prepared for order confirmations and customer communication.
 */
export class ResendEmailService implements IEmailService {
  async sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
    const env = getServerEnv()
    const from = env.RESEND_FROM_EMAIL || "onboarding@resend.dev"

    const resend = getResendClient()

    logger.info("Dispatching email via Resend integration", {
      subject: input.subject,
      from,
    })

    const response = await resend.emails.send({
      from,
      to: input.to,
      subject: input.subject,
      html: input.html ?? "",
      text: input.text,
      replyTo: input.replyTo,
      tags: input.tags,
    })

    if (response.error) {
      logger.error("Failed to send email via Resend", { error: response.error.message })
      throw new Error(`Resend email delivery failure: ${response.error.message}`)
    }

    return {
      id: response.data?.id ?? "",
      success: true,
    }
  }
}

export const emailService: IEmailService = new ResendEmailService()
