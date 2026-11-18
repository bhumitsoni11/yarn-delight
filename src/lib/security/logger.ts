const SENSITIVE_KEYS = new Set([
  "authorization",
  "cookie",
  "password",
  "secret",
  "token",
  "apikey",
  "api_key",
  "access_token",
  "refresh_token",
  "key_secret",
  "service_role",
  "creditcard",
  "cardnumber",
  "cvv",
  "webhook_secret",
])

function maskValue(value: unknown): unknown {
  if (typeof value === "string") {
    if (value.length <= 8) return "[REDACTED]"
    return `${value.slice(0, 4)}...[REDACTED]...${value.slice(-2)}`
  }
  return "[REDACTED]"
}

/**
 * Deeply sanitizes an object, redacting keys containing sensitive information.
 */
export function sanitizeLogData<T>(data: T): T {
  if (data === null || data === undefined) return data
  if (typeof data !== "object") return data

  if (Array.isArray(data)) {
    return data.map((item) => sanitizeLogData(item)) as unknown as T
  }

  const sanitized: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(data)) {
    const lowerKey = key.toLowerCase()
    const isSensitive = Array.from(SENSITIVE_KEYS).some((sensitive) => lowerKey.includes(sensitive))

    if (isSensitive) {
      sanitized[key] = maskValue(value)
    } else if (typeof value === "object" && value !== null) {
      sanitized[key] = sanitizeLogData(value)
    } else {
      sanitized[key] = value
    }
  }

  return sanitized as T
}

export type LogLevel = "debug" | "info" | "warn" | "error"

class SafeLogger {
  private log(level: LogLevel, message: string, meta?: Record<string, unknown>) {
    const timestamp = new Date().toISOString()
    const safeMeta = meta ? sanitizeLogData(meta) : undefined

    const payload = {
      timestamp,
      level: level.toUpperCase(),
      message,
      ...(safeMeta ? { meta: safeMeta } : {}),
    }

    if (level === "error") {
      console.error(JSON.stringify(payload))
    } else if (level === "warn") {
      console.warn(JSON.stringify(payload))
    } else if (level === "info") {
      console.info(JSON.stringify(payload))
    } else {
      if (process.env.NODE_ENV === "development") {
        console.debug(JSON.stringify(payload))
      }
    }
  }

  debug(message: string, meta?: Record<string, unknown>) {
    this.log("debug", message, meta)
  }

  info(message: string, meta?: Record<string, unknown>) {
    this.log("info", message, meta)
  }

  warn(message: string, meta?: Record<string, unknown>) {
    this.log("warn", message, meta)
  }

  error(message: string, meta?: Record<string, unknown>) {
    this.log("error", message, meta)
  }
}

export const logger = new SafeLogger()
