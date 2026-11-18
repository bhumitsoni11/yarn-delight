import "server-only"
import { getServerEnv } from "@/lib/env"
import { BadRequestError } from "@/lib/security/errors"

export interface ShiprocketAuthConfig {
  email: string
  password?: string
  channelId?: string
}

/**
 * Validates and retrieves server-side Shiprocket credentials.
 */
export function getShiprocketConfig(): ShiprocketAuthConfig {
  const env = getServerEnv()

  if (!env.SHIPROCKET_EMAIL || !env.SHIPROCKET_PASSWORD) {
    throw new BadRequestError(
      "Shiprocket credentials (SHIPROCKET_EMAIL / SHIPROCKET_PASSWORD) are not configured."
    )
  }

  return {
    email: env.SHIPROCKET_EMAIL,
    password: env.SHIPROCKET_PASSWORD,
    channelId: env.SHIPROCKET_CHANNEL_ID,
  }
}
