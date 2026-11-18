export type ErrorCode =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "VALIDATION_ERROR"
  | "RATE_LIMIT_EXCEEDED"
  | "INTERNAL_SERVER_ERROR"

export interface SafeErrorResponse {
  success: false
  error: {
    code: ErrorCode
    message: string
    details?: unknown
  }
}

/**
 * Base Application Error class with controlled client exposure.
 */
export class AppError extends Error {
  public readonly code: ErrorCode
  public readonly statusCode: number
  public readonly isOperational: boolean
  public readonly details?: unknown

  constructor(
    message: string,
    code: ErrorCode = "INTERNAL_SERVER_ERROR",
    statusCode = 500,
    isOperational = true,
    details?: unknown
  ) {
    super(message)
    this.name = "AppError"
    this.code = code
    this.statusCode = statusCode
    this.isOperational = isOperational
    this.details = details
    Object.setPrototypeOf(this, AppError.prototype)
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Bad request", details?: unknown) {
    super(message, "BAD_REQUEST", 400, true, details)
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Authentication required", details?: unknown) {
    super(message, "UNAUTHORIZED", 401, true, details)
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Access denied: insufficient permissions", details?: unknown) {
    super(message, "FORBIDDEN", 403, true, details)
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Requested resource not found", details?: unknown) {
    super(message, "NOT_FOUND", 404, true, details)
  }
}

export class ConflictError extends AppError {
  constructor(message = "Conflict with existing resource state", details?: unknown) {
    super(message, "CONFLICT", 409, true, details)
  }
}

export class ValidationError extends AppError {
  constructor(message = "Input validation failed", details?: unknown) {
    super(message, "VALIDATION_ERROR", 422, true, details)
  }
}

export class RateLimitError extends AppError {
  constructor(message = "Too many requests. Please try again later.", details?: unknown) {
    super(message, "RATE_LIMIT_EXCEEDED", 429, true, details)
  }
}

export class InternalServerError extends AppError {
  constructor(message = "An unexpected error occurred", details?: unknown) {
    super(message, "INTERNAL_SERVER_ERROR", 500, false, details)
  }
}

/**
 * Transforms an arbitrary error into a sanitized, client-safe response.
 * Prevents leakage of internal stack traces, DB queries, or server paths.
 */
export function formatSafeErrorResponse(
  error: unknown,
  isDev = process.env.NODE_ENV === "development"
): SafeErrorResponse {
  if (error instanceof AppError && error.isOperational) {
    return {
      success: false,
      error: {
        code: error.code,
        message: error.message,
        details: isDev ? error.details : undefined,
      },
    }
  }

  // Non-operational or unknown unhandled error
  return {
    success: false,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "An internal server error occurred. Please try again later.",
      details: isDev && error instanceof Error ? error.message : undefined,
    },
  }
}
