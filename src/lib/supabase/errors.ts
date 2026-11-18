import type { AuthError, PostgrestError } from "@supabase/supabase-js"

export class SupabaseIntegrationError extends Error {
  public readonly code: string
  public readonly status: number
  public readonly details?: string

  constructor(message: string, code = "SUPABASE_ERROR", status = 500, details?: string) {
    super(message)
    this.name = "SupabaseIntegrationError"
    this.code = code
    this.status = status
    this.details = details
    Object.setPrototypeOf(this, SupabaseIntegrationError.prototype)
  }
}

export function isAuthError(error: unknown): error is AuthError {
  return (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    (error as AuthError).name === "AuthError"
  )
}

export function isPostgrestError(error: unknown): error is PostgrestError {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    "message" in error &&
    "details" in error
  )
}

export function formatSupabaseError(error: unknown): SupabaseIntegrationError {
  if (error instanceof SupabaseIntegrationError) {
    return error
  }

  if (isAuthError(error)) {
    return new SupabaseIntegrationError(
      error.message,
      error.code ?? "AUTH_ERROR",
      error.status ?? 401
    )
  }

  if (isPostgrestError(error)) {
    return new SupabaseIntegrationError(error.message, error.code, 500, error.details)
  }

  if (error instanceof Error) {
    return new SupabaseIntegrationError(error.message, "UNKNOWN_ERROR", 500)
  }

  return new SupabaseIntegrationError("An unexpected Supabase error occurred", "UNKNOWN_ERROR", 500)
}
