import "server-only"
import { ForbiddenError } from "@/lib/security/errors"
import { requireAuth, type AuthUser, type UserRole } from "@/lib/security/auth"

export type AppPermission =
  | "products:read"
  | "products:write"
  | "categories:read"
  | "categories:write"
  | "orders:read_own"
  | "orders:read_all"
  | "orders:update_status"
  | "custom_orders:create"
  | "custom_orders:manage"
  | "inventory:manage"
  | "users:manage"
  | "settings:manage"

export const ROLE_PERMISSIONS: Record<UserRole, readonly AppPermission[]> = {
  customer: ["products:read", "categories:read", "orders:read_own", "custom_orders:create"],
  support: [
    "products:read",
    "categories:read",
    "orders:read_own",
    "orders:read_all",
    "orders:update_status",
    "custom_orders:create",
    "custom_orders:manage",
  ],
  admin: [
    "products:read",
    "products:write",
    "categories:read",
    "categories:write",
    "orders:read_own",
    "orders:read_all",
    "orders:update_status",
    "custom_orders:create",
    "custom_orders:manage",
    "inventory:manage",
    "users:manage",
    "settings:manage",
  ],
} as const

/**
 * Checks whether a given role holds the requested permission.
 */
export function hasPermission(role: UserRole, permission: AppPermission): boolean {
  const permissions = ROLE_PERMISSIONS[role] ?? []
  return permissions.includes(permission)
}

/**
 * Enforces that the current authenticated user has an acceptable role.
 * Independent of middleware; executed directly within Server Components/Actions.
 */
export async function requireRole(allowedRoles: UserRole[]): Promise<AuthUser> {
  const user = await requireAuth()

  if (!allowedRoles.includes(user.role)) {
    throw new ForbiddenError(
      `Access denied. Role '${user.role}' is not authorized for this operation.`
    )
  }

  return user
}

/**
 * Enforces that the current user holds the required specific permission.
 */
export async function requirePermission(permission: AppPermission): Promise<AuthUser> {
  const user = await requireAuth()

  if (!hasPermission(user.role, permission)) {
    throw new ForbiddenError(`Access denied. Required permission: '${permission}'`)
  }

  return user
}
