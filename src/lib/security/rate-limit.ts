/**
 * Rate-Limiting Abstraction & Interface
 *
 * ARCHITECTURAL NOTICE:
 * In accordance with application security best practices:
 * In-memory rate limiting across serverless/edge environments (Vercel) provides false security
 * because each lambda instance maintains its own ephemeral memory state.
 *
 * For production, configure a distributed stateful store (e.g. Upstash Redis / Vercel KV).
 * When unconfigured, requests are allowed through with an explicit architectural log warning.
 */

import { logger } from "./logger"

export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number // epoch ms
}

export interface RateLimiterOptions {
  limit: number
  windowMs: number
}

export interface RateLimiter {
  check(identifier: string): Promise<RateLimitResult>
}

/**
 * Unconfigured fallback rate limiter.
 * Clearly documents that distributed rate limiting is currently inactive.
 */
export class UnconfiguredRateLimiter implements RateLimiter {
  private hasWarned = false
  private readonly options: RateLimiterOptions

  constructor(options: RateLimiterOptions) {
    this.options = options
  }

  async check(identifier: string): Promise<RateLimitResult> {
    if (!this.hasWarned) {
      logger.warn(
        "ARCHITECTURAL ALERT: Distributed rate limiting (e.g. Upstash Redis) is NOT configured. Rate limiting is currently INACTIVE.",
        { identifier, limit: this.options.limit }
      )
      this.hasWarned = true
    }

    return {
      success: true,
      limit: this.options.limit,
      remaining: this.options.limit,
      reset: Date.now() + this.options.windowMs,
    }
  }
}

/**
 * Factory to obtain a RateLimiter instance.
 * Replace with distributed provider (e.g., @upstash/ratelimit) when Redis credentials are provided.
 */
export function createRateLimiter(options: RateLimiterOptions): RateLimiter {
  // In Phase 0, we instantiate the documented unconfigured rate limiter.
  return new UnconfiguredRateLimiter(options)
}
