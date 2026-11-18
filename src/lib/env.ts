import { z } from "zod"

/**
 * Public Environment Schema
 * Only variables prefixed with NEXT_PUBLIC_ are permitted here.
 * These are baked into client-side bundles and accessible in the browser.
 */
export const publicEnvSchema = z.object({
  NEXT_PUBLIC_APP_URL: z
    .string()
    .url("NEXT_PUBLIC_APP_URL must be a valid URL")
    .default("http://localhost:3000"),
  NEXT_PUBLIC_APP_NAME: z
    .string()
    .min(1, "NEXT_PUBLIC_APP_NAME cannot be empty")
    .default("Crochet Store"),
  NEXT_PUBLIC_SUPABASE_URL: z
    .string()
    .url("NEXT_PUBLIC_SUPABASE_URL must be a valid URL")
    .default("https://placeholder-project.supabase.co"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .min(1, "NEXT_PUBLIC_SUPABASE_ANON_KEY is required")
    .default("placeholder-anon-key"),
  NEXT_PUBLIC_SENTRY_DSN: z
    .string()
    .url("NEXT_PUBLIC_SENTRY_DSN must be a valid URL")
    .optional()
    .or(z.literal("")),
})

/**
 * Server-Only Environment Schema
 * Sensitive credentials, API keys, and internal secrets.
 * Must NEVER be exposed to or imported in client-side code.
 */
export const serverEnvSchema = z.object({
  APP_ENV: z.enum(["development", "test", "production"]).default("development"),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  // Supabase Service Role Key (Admin operations only)
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  // Razorpay
  RAZORPAY_KEY_ID: z.string().optional(),
  RAZORPAY_KEY_SECRET: z.string().optional(),
  RAZORPAY_WEBHOOK_SECRET: z.string().optional(),
  // Resend
  RESEND_API_KEY: z.string().optional(),
  RESEND_FROM_EMAIL: z.string().optional().default("onboarding@resend.dev"),
  // Sentry
  SENTRY_DSN: z.string().optional(),
  // Shiprocket
  SHIPROCKET_EMAIL: z.string().optional(),
  SHIPROCKET_PASSWORD: z.string().optional(),
  SHIPROCKET_CHANNEL_ID: z.string().optional(),
})

export type PublicEnv = z.infer<typeof publicEnvSchema>
export type ServerEnv = z.infer<typeof serverEnvSchema>

/**
 * Validated public environment variables.
 * Safe to access in both server and client environments.
 */
export const publicEnv: PublicEnv = (() => {
  const result = publicEnvSchema.safeParse({
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  })

  if (!result.success) {
    console.error("❌ Invalid public environment variables:", result.error.format())
    throw new Error("Invalid public environment variables. Check .env configuration.")
  }

  return result.data
})()

/**
 * Validated server-only environment variables.
 * Protected by runtime environment check to prevent accidental browser leakage.
 */
export function getServerEnv(): ServerEnv {
  if (typeof window !== "undefined") {
    throw new Error(
      "SECURITY VIOLATION: Attempted to access server-only environment variables from the browser."
    )
  }

  const result = serverEnvSchema.safeParse({
    APP_ENV: process.env.APP_ENV,
    NODE_ENV: process.env.NODE_ENV,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
    RAZORPAY_WEBHOOK_SECRET: process.env.RAZORPAY_WEBHOOK_SECRET,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
    SENTRY_DSN: process.env.SENTRY_DSN,
    SHIPROCKET_EMAIL: process.env.SHIPROCKET_EMAIL,
    SHIPROCKET_PASSWORD: process.env.SHIPROCKET_PASSWORD,
    SHIPROCKET_CHANNEL_ID: process.env.SHIPROCKET_CHANNEL_ID,
  })

  if (!result.success) {
    console.error("❌ Invalid server environment variables:", result.error.format())
    throw new Error("Invalid server environment variables. Check .env configuration.")
  }

  return result.data
}
