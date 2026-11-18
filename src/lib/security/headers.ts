import { buildContentSecurityPolicy } from "./csp"

export interface SecurityHeader {
  key: string
  value: string
}

/**
 * Returns the hardened standard HTTP security headers.
 */
export function getSecurityHeaders(
  isDev = process.env.NODE_ENV === "development"
): SecurityHeader[] {
  const headers: SecurityHeader[] = [
    {
      key: "Content-Security-Policy",
      value: buildContentSecurityPolicy(isDev),
    },
    {
      key: "X-Frame-Options",
      value: "DENY",
    },
    {
      key: "X-Content-Type-Options",
      value: "nosniff",
    },
    {
      key: "Referrer-Policy",
      value: "strict-origin-when-cross-origin",
    },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
    },
    {
      key: "X-XSS-Protection",
      value: "0",
    },
  ]

  if (!isDev) {
    headers.push({
      key: "Strict-Transport-Security",
      value: "max-age=63072000; includeSubDomains; preload",
    })
  }

  return headers
}
