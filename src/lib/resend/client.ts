import "server-only"
import { Resend } from "resend"
import { getServerEnv } from "@/lib/env"
import { BadRequestError } from "@/lib/security/errors"

let resendInstance: Resend | null = null

/**
 * Initializes and returns the server-side Resend SDK instance.
 * Throws if RESEND_API_KEY is not configured.
 */
export function getResendClient(): Resend {
  if (resendInstance) return resendInstance

  const env = getServerEnv()

  if (!env.RESEND_API_KEY) {
    throw new BadRequestError(
      "Resend API key (RESEND_API_KEY) is not configured. Cannot send transactional emails."
    )
  }

  resendInstance = new Resend(env.RESEND_API_KEY)
  return resendInstance
}
