---
name: Atelier Coquette
colors:
  surface: "#fff8f7"
  surface-dim: "#ecd5d6"
  surface-bright: "#fff8f7"
  surface-container-lowest: "#ffffff"
  surface-container-low: "#fff0f0"
  surface-container: "#ffe9e9"
  surface-container-high: "#fae3e4"
  surface-container-highest: "#f4ddde"
  on-surface: "#251819"
  on-surface-variant: "#504446"
  inverse-surface: "#3b2d2e"
  inverse-on-surface: "#ffeced"
  outline: "#827376"
  outline-variant: "#d4c2c5"
  surface-tint: "#80515f"
  primary: "#80515f"
  on-primary: "#ffffff"
  primary-container: "#f4b8c8"
  on-primary-container: "#744654"
  inverse-primary: "#f2b6c6"
  secondary: "#6a5e2c"
  on-secondary: "#ffffff"
  secondary-container: "#f0dfa1"
  on-secondary-container: "#6e6230"
  tertiary: "#66587b"
  on-tertiary: "#ffffff"
  tertiary-container: "#d2c1ea"
  on-tertiary-container: "#5a4e70"
  error: "#ba1a1a"
  on-error: "#ffffff"
  error-container: "#ffdad6"
  on-error-container: "#93000a"
  background: "#fff8f7"
  on-background: "#251819"
  surface-variant: "#f4ddde"
typography:
  display:
    fontFamily: Playfair Display
    fontSize: 56px
    fontWeight: "600"
    lineHeight: 64px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: "500"
    lineHeight: 48px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: "500"
    lineHeight: 36px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: "400"
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: "400"
    lineHeight: 24px
  price-display:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: "700"
    lineHeight: 26px
    letterSpacing: -0.01em
---

# Atelier Coquette: Stitch Design System Specification

## Brand & Style

This design system blends **editorial luxury fashion with playful coquette charm**, tailored for Gen-Z and millennial connoisseurs of slow fashion, artisanal crochet, and bespoke accessories. It strikes a balance between runway-grade high fashion and tactile intimacy—evoking the sensory warmth of combed alpaca wool, hand-crocheted rosettes, and vintage Parisian parlor paper.

The aesthetic philosophy fuses:

- **Soft Editorial Romanticism:** Delicate, sprawling whitespace reminiscent of printed independent fashion journals, anchored by high-contrast typographic pairings.
- **Tactile Coquette Playfulness:** Ribbon-soft curves, pill containers, organic pillowy interactive states, and woven micro-textures.
- **Modern Luxury Commerce:** Precision layout mechanics, Flipkart-grade high-utility cart and sorting, and clear transaction affordances.

## Colors

The palette revolves around whipped pastry tones and confectionary warmth grounded by deep, decadent chocolate brown for authoritative editorial contrast. Pure stark black is banned across the entire design system to maintain romantic warmth.

- **Primary (`#80515F` - Deep Rosette & `#F4B8C8` - Rosette Blush):** Used for focal calls-to-action, hero pill badges, key selection indicators, and intimate accents.
- **Secondary (`#F0DFA1` - Buttercream & `#6A5E2C` - Antique Olive):** Subtle luminous highlight for novelty drops, limited-edition labels, and warm seasonal badges.
- **Tertiary (`#D2C1EA` - Lavender Whisper & `#66587B`):** Secondary interaction states, soft yarn-variant selectors, and gentle hover shifts.
- **Neutral (`#251819` / `#493A3B` - Deep Cocoa Ganache):** Bedrock of readability. Replaces black for all typography, icons, and crisp fine borders.
- **Canvas Base (`#FFF8F7` / `#FFF9F5`):** Soft warm ivory canvas backdrop paired with pure porcelain white (`#FFFFFF`) for elevated card surfaces.

## Typography

- **Playfair Display:** High-fashion editorial display with snug line-heights and intentional letter-spacing for romantic atelier cataloguing.
- **Plus Jakarta Sans:** Functional clarity for commerce touchpoints, sizing tables, fiber specs, and checkout forms.
- **Currency & Pricing Treatment:** All currency denominations (`₹` INR) use `Plus Jakarta Sans` with monospace tabular numerals (`tabular-nums font-mono`).

## Unslop Craft Standard

1. **Zero AI Slop:** No generic purple-indigo gradients, no floating neon blur blobs, no material webfont glitches, and no springy bouncy scale transforms.
2. **Hairline Precision:** Hairline borders (`border-border/70`), subtle surface contrast steps, and quiet chrome.
3. **Real Utility First:** Interactive bespoke studio, live price quotation, slide-over bag drawer with free shipping progress, and instant filter feedback.
