import "server-only"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { publicEnv } from "@/lib/env"
import type { Database } from "@/types/database"

/**
 * Creates a server-side Supabase client for Server Components,
 * Server Actions, and Route Handlers with secure cookie persistence.
 */
export async function createServerSupabaseClient() {
  const cookieStore = await cookies()

  return createServerClient<Database>(
    publicEnv.NEXT_PUBLIC_SUPABASE_URL,
    publicEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be safely ignored when middleware refreshes user sessions.
          }
        },
      },
    }
  )
}
