import { type NextRequest } from "next/server"
import { updateSession } from "@/lib/supabase/middleware"
import { getSecurityHeaders } from "@/lib/security/headers"

export async function proxy(request: NextRequest) {
  // 1. Refresh Supabase auth session and manage cookie syncing
  const response = await updateSession(request)

  // 2. Enforce hardened HTTP security headers
  const isDev = process.env.NODE_ENV === "development"
  const securityHeaders = getSecurityHeaders(isDev)

  for (const { key, value } of securityHeaders) {
    response.headers.set(key, value)
  }

  return response
}

export default proxy

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static chunks)
     * - _next/image (Next.js image optimization)
     * - favicon.ico
     * - Static asset extensions (.svg, .png, .jpg, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
