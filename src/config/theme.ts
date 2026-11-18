/**
 * Centralized Design System Foundation
 *
 * Aesthetic Direction: Coquette + Playful Gen-Z + Premium Handmade
 * Target Market: India
 */

export const THEME_COLORS = {
  primary: "#F4B8C8", // Soft Rose Petal Pink (Playful, delicate)
  background: "#FFF9F5", // Warm Vanilla Cream (Warm handcrafted feel)
  secondary: "#F7E6A7", // Pastel Butter Yellow (Warm accent, sunny)
  accent: "#DCCBF4", // Soft Lavender Lilac (Dreamy, coquette)
  text: "#493A3B", // Deep Espresso Truffle (High contrast readability, softer than harsh black)
  surface: "#FFFFFF", // Pure White Card/Surface container
  muted: "#F3EBE6", // Subtle warm linen tone
  mutedForeground: "#7D6B6D", // Soft mocha for secondary text
  border: "#EBDCD5", // Soft biscuit border
  ring: "#F4B8C8", // Soft focus glow
  destructive: "#E57373", // Warm coral red
} as const

export const THEME_TYPOGRAPHY = {
  fontSans: 'var(--font-sans, "Plus Jakarta Sans", system-ui, sans-serif)',
  fontHeading: 'var(--font-heading, "Playfair Display", Georgia, serif)',
  lineHeight: {
    tight: "1.15",
    normal: "1.5",
    relaxed: "1.75",
  },
} as const

export const THEME_RADII = {
  sm: "0.375rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  "2xl": "1.5rem",
  full: "9999px",
} as const

export const THEME_SHADOWS = {
  soft: "0 2px 10px -2px rgba(73, 58, 59, 0.05)",
  card: "0 4px 20px -4px rgba(73, 58, 59, 0.08)",
  floating: "0 10px 30px -5px rgba(244, 184, 200, 0.25)",
} as const
