import { createBrowserClient } from "@supabase/ssr"
import { publicEnv } from "@/lib/env"
import type { Database } from "@/types/database"

/**
 * Creates a browser-side Supabase client with standard cookie storage.
 * Safe for use in Client Components and custom hooks.
 */
export function createBrowserSupabaseClient() {
  return createBrowserClient<Database>(
    publicEnv.NEXT_PUBLIC_SUPABASE_URL,
    publicEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

// Alias for convenience
export const createClient = createBrowserSupabaseClient
