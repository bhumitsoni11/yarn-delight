import { z } from "zod"

/**
 * Standard pagination query parameters schema.
 */
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
})

export type PaginationParams = z.infer<typeof paginationSchema>

/**
 * Standard UUID validator (Supabase IDs).
 */
export const uuidSchema = z.string().uuid("Invalid unique identifier")

/**
 * Indian Mobile Phone Number Validator (10 digits, optional +91 prefix).
 */
export const indianPhoneSchema = z
  .string()
  .trim()
  .regex(
    /^(?:(?:\+91|91|0)?\s*)?[6-9]\d{9}$/,
    "Please provide a valid 10-digit Indian mobile number"
  )

/**
 * Indian Postal PIN Code Validator (6 digits).
 */
export const indianPincodeSchema = z
  .string()
  .trim()
  .regex(/^[1-9][0-9]{5}$/, "Please provide a valid 6-digit Indian PIN code")

/**
 * Currency Amount in Paise (INR integer subunit to avoid floating point errors).
 */
export const inrPaiseSchema = z
  .number()
  .int("Amount in paise must be an integer")
  .nonnegative("Amount must be zero or positive")

/**
 * Sanitized trimmed non-empty string.
 */
export const sanitizedStringSchema = z
  .string()
  .trim()
  .min(1, "Field cannot be empty")
  .max(500, "Input exceeds maximum allowed length")

/**
 * Standard Email Validator.
 */
export const emailSchema = z
  .string()
  .trim()
  .email("Please provide a valid email address")
  .toLowerCase()
