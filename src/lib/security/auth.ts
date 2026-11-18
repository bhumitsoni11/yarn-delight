import "server-only"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { UnauthorizedError } from "@/lib/security/errors"
import type { Database } from "@/types/database"

export type UserRole = Database["public"]["Enums"]["user_role"]

export interface AuthUser {
  id: string
  email: string
  role: UserRole
  fullName: string | null
}

/**
 * Retrieves the currently authenticated user from Supabase Auth and Profiles.
 * Returns null if not authenticated.
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user || !user.email) {
    return null
  }

  // Fetch the user's profile to obtain assigned application role
  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .single()

  const role: UserRole = profile?.role ?? "customer"

  return {
    id: user.id,
    email: user.email,
    role,
    fullName: profile?.full_name ?? (user.user_metadata?.full_name as string | null) ?? null,
  }
}

/**
 * Enforces that a request is authenticated.
 * Throws UnauthorizedError if no valid session exists.
 */
export async function requireAuth(): Promise<AuthUser> {
  const user = await getCurrentUser()

  if (!user) {
    throw new UnauthorizedError("You must be logged in to access this resource.")
  }

  return user
}
