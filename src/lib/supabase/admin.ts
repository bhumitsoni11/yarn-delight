import "server-only"
import { createClient } from "@supabase/supabase-js"
import { publicEnv, getServerEnv } from "@/lib/env"
import type { Database } from "@/types/database"

/**
 * Creates an administrative Supabase client using the privileged SUPABASE_SERVICE_ROLE_KEY.
 *
 * CRITICAL SECURITY INVARIANTS:
 * 1. Protected by `import 'server-only'`. Bundling into client code fails at build time.
 * 2. Bypasses PostgreSQL Row-Level Security (RLS).
 * 3. Never use for user-directed queries without explicit server-side authorization checks.
 * 4. Auth session persistence is disabled.
 */
export function createAdminSupabaseClient() {
  const env = getServerEnv()

  if (!env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not configured. Admin operations cannot be initialized."
    )
  }

  return createClient<Database>(publicEnv.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
