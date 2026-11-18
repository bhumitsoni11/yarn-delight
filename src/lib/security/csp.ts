/**
 * Content Security Policy (CSP) Strategy
 *
 * Configured specifically for the locked technology stack:
 * - Supabase (Storage, Auth)
 * - Razorpay Checkout (JS SDK, APIs, Lumberjack analytics, Frames)
 * - Sentry (Telemetry ingestion)
 * - Next.js internal chunks and styles
 */
export function buildContentSecurityPolicy(isDev = process.env.NODE_ENV === "development"): string {
  const directives: Record<string, string[]> = {
    "default-src": ["'self'"],
    "script-src": [
      "'self'",
      ...(isDev ? ["'unsafe-eval'", "'unsafe-inline'"] : ["'unsafe-inline'"]),
      "https://checkout.razorpay.com",
      "https://*.sentry.io",
    ],
    "style-src": ["'self'", "'unsafe-inline'"],
    "img-src": [
      "'self'",
      "blob:",
      "data:",
      "https://*.supabase.co",
      "https://checkout.razorpay.com",
    ],
    "font-src": ["'self'", "data:"],
    "connect-src": [
      "'self'",
      "https://*.supabase.co",
      "wss://*.supabase.co",
      "https://api.razorpay.com",
      "https://lumberjack.razorpay.com",
      "https://*.sentry.io",
      ...(isDev ? ["ws://localhost:*", "http://localhost:*"] : []),
    ],
    "frame-src": ["'self'", "https://api.razorpay.com", "https://checkout.razorpay.com"],
    "object-src": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'", "https://api.razorpay.com"],
    "frame-ancestors": ["'none'"],
  }

  if (!isDev) {
    directives["upgrade-insecure-requests"] = []
  }

  return Object.entries(directives)
    .map(([key, values]) => (values.length > 0 ? `${key} ${values.join(" ")}` : key))
    .join("; ")
}
