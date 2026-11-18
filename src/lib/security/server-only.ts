import "server-only"

/**
 * Server-only execution barrier.
 * Importing this module ensures that code can never be bundled or executed on the client.
 */
export function assertServerOnly(context = "Operation"): void {
  if (typeof window !== "undefined") {
    throw new Error(`SECURITY VIOLATION: ${context} is restricted to server execution only.`)
  }
}
