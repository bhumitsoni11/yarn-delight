import { describe, it, expect } from "vitest"
import { formatSafeErrorResponse, BadRequestError } from "@/lib/security/errors"
import { hasPermission } from "@/lib/security/rbac"
import { publicEnv } from "@/lib/env"

describe("Security Foundation Unit Tests", () => {
  it("never leaks internal error messages or stacks in production error formatting", () => {
    const rawError = new Error(
      "FATAL: Database connection string postgresql://user:pass@host:5432/db failed"
    )
    const safeResponse = formatSafeErrorResponse(rawError, false) // isDev = false

    expect(safeResponse.success).toBe(false)
    expect(safeResponse.error.code).toBe("INTERNAL_SERVER_ERROR")
    expect(safeResponse.error.message).toBe(
      "An internal server error occurred. Please try again later."
    )
    expect(safeResponse.error.details).toBeUndefined()
  })

  it("exposes operational AppError messages cleanly", () => {
    const badRequest = new BadRequestError("Invalid input format")
    const safeResponse = formatSafeErrorResponse(badRequest, false)

    expect(safeResponse.success).toBe(false)
    expect(safeResponse.error.code).toBe("BAD_REQUEST")
    expect(safeResponse.error.message).toBe("Invalid input format")
  })

  it("enforces role-based permissions matrix correctly", () => {
    // Customer cannot write products or manage users
    expect(hasPermission("customer", "products:read")).toBe(true)
    expect(hasPermission("customer", "products:write")).toBe(false)
    expect(hasPermission("customer", "users:manage")).toBe(false)

    // Admin has full management permissions
    expect(hasPermission("admin", "products:write")).toBe(true)
    expect(hasPermission("admin", "inventory:manage")).toBe(true)
    expect(hasPermission("admin", "users:manage")).toBe(true)

    // Support has orders view/update but not user management
    expect(hasPermission("support", "orders:read_all")).toBe(true)
    expect(hasPermission("support", "users:manage")).toBe(false)
  })

  it("ensures public environment variables contain safe defaults", () => {
    expect(publicEnv.NEXT_PUBLIC_APP_URL).toBeDefined()
    expect(publicEnv.NEXT_PUBLIC_APP_NAME).toBe("Crochet Store")
  })
})
