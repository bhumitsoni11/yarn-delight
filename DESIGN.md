# DESIGN.md — Stitch Design System Specification: Crochet Store

> **Design System Architecture & Visual Language**  
> **Brand Persona**: _Coquette + Playful Gen-Z + Premium Handcrafted Luxury_  
> **E-Commerce Benchmarks**: High-conversion utility inspired by Flipkart/Myntra combined with tactile boutique aesthetics.  
> **Target Market**: India (INR `₹`, Domestic Logistics, UPI Payments).

---

## 1. Visual Identity & Design Philosophy

The Crochet Store design system blends the playful, tactile charm of handcrafted crochet with high-velocity e-commerce performance:

- **The "Stitch" Metaphor**: Surfaces, pills, and containers evoke soft tactile yarn textures—pillowy rounded corners (`rounded-2xl`, `rounded-3xl`), gentle woven borders (`border-[#EBDCD5]`), and soft ambient shadows.
- **Warmth Over Clinical White**: Interfaces avoid cold clinical whites in favor of a warm vanilla cream background (`#FFF9F5`), preventing visual fatigue and elevating the handmade craft feel.
- **Editorial Contrast**: Deep espresso truffle text (`#493A3B`) replaces harsh pure black `#000000`, preserving crisp readability while feeling gentle and premium.

---

## 2. Color Palette & Semantic Tokens

| Token                | Hex Value | Role                                  | Mood / Association                                 |
| -------------------- | --------- | ------------------------------------- | -------------------------------------------------- |
| `--color-primary`    | `#F4B8C8` | Hero CTAs, active states, key accents | Soft Rose Petal Pink (Playful, feminine, delicate) |
| `--color-background` | `#FFF9F5` | Main viewport background              | Warm Vanilla Cream (Inviting, artisanal canvas)    |
| `--color-secondary`  | `#F7E6A7` | Badges, offer tags, highlight banners | Pastel Butter Yellow (Sunny, vibrant, cheerful)    |
| `--color-accent`     | `#DCCBF4` | Secondary chips, subtle highlights    | Dreamy Lavender Lilac (Whimsical, Gen-Z chic)      |
| `--color-text`       | `#493A3B` | Headings, body text, primary icons    | Deep Espresso Truffle (Rich contrast, warm tone)   |
| `--color-surface`    | `#FFFFFF` | Product cards, modals, sheets         | Pure White (Clean product showcase)                |
| `--color-muted`      | `#F3EBE6` | Disabled states, neutral chips        | Warm Linen (Understated secondary fill)            |
| `--color-border`     | `#EBDCD5` | Card outlines, dividers               | Soft Biscuit (Delicate framing)                    |
| `--color-success`    | `#A8D5BA` | In-stock badges, order confirmations  | Sage Mint (Natural, peaceful)                      |
| `--color-discount`   | `#E57373` | Sale badges, savings indicators       | Warm Coral Red (Urgent without hostility)          |

---

## 3. Typography Strategy

- **Headings**: Editorial Serif (`Playfair Display`, Georgia, serif)
  - Scale: `text-4xl` / `text-5xl` for Hero statements; `text-2xl` for Section titles; `text-lg` for Product titles.
  - Weight: SemiBold (600) to Bold (700) with tight letter tracking (`tracking-tight`).
- **Body & Controls**: Geometric Sans (`Plus Jakarta Sans`, system-ui, sans-serif)
  - Scale: `text-sm` (14px) for descriptions and filters; `text-xs` (12px) for micro-badges and metadata.
  - Weight: Regular (400) for prose; Medium (500) for controls; SemiBold (600) for prices and CTAs.

---

## 4. Layout Architecture & Screen Anatomy

### A. Utility Top Announcement Bar

- Height: 36px.
- Background: Pastel Butter Yellow (`#F7E6A7`) or Soft Rose (`#F4B8C8`).
- Content: "🎉 Free Shipping on all orders above ₹999 | 100% Handcrafted with Love in India | Use code **STITCH10** for 10% off".

### B. Sticky Omnichannel Navigation Bar

- Height: 72px.
- Features:
  - Brand Logo: "Yarn Delight / Crochet Store" with yarn ball icon and handcrafted sub-badge.
  - Smart Search Input: Center-aligned search bar with placeholder "Search handbags, mufflers, custom keychains...".
  - Quick Actions: Categories popover, Wishlist icon with counter, Cart Drawer trigger with dynamic item counter badge and bounce animation on update.

### C. Hero Section ("New Drops & Custom Commissions")

- Split layout:
  - Left: Headline ("Wearable Art, Hand-Stitched for You"), subtext, dual CTAs ("Shop Drops" & "Custom Inquiry"), and Social Proof stats (e.g. "4.9★ Rated", "500+ Happy Customers", "Pan-India Delivery").
  - Right: Floating Gen-Z aesthetic product collage with animated floating badges ("100% Organic Cotton", "Artisan Made").

### D. Category Pill Nav & Showcase

- 6 Primary Verticals with visual badges:
  1. Handbags (`👜`)
  2. Purses & Slings (`👛`)
  3. Amigurumi Keychains (`🌸`)
  4. Mufflers & Scarves (`🧣`)
  5. Hair & Home Accessories (`✨`)
  6. Custom Bespoke Commissions (`🧵`)

### E. High-Conversion Product Cards (Flipkart / Myntra Utility)

- Visual Container: `rounded-2xl` border with `#EBDCD5`, pure white background, hover lift effect.
- Badges: Floating pill at top-left ("Bestseller" in `#F7E6A7` or "25% OFF" in coral red).
- Wishlist Heart: Top-right floating toggle button with micro-bounce.
- Content:
  - Product title with category subtitle.
  - Star rating with review count (e.g. `★ 4.8 (124)`).
  - Price in INR (`₹1,499`) with strike-through original price (`₹1,999`) and savings badge.
  - Fast-action "Add to Bag" button that syncs directly with the Zustand cart store and triggers the slide-over cart drawer.

### F. Interactive Custom Commission Studio

- Interactive preview banner allowing users to visualize custom crochet requests:
  - Select Category (Bag, Keychain, Muffler).
  - Pick Yarn Material (Cotton Yarn, Velvet Chenille, Chunky Wool).
  - Pick Custom Color Palette.
  - Estimated dispatch and direct inquiry CTA.

### G. Slide-Over Shopping Cart Drawer

- Full slide-over sheet from right viewport.
- Dynamic Free Shipping Progress Bar ("Add ₹350 more to unlock FREE Delivery!").
- Line items with thumbnail, title, price in paise / INR, quantity increment/decrement stepper, and trash removal.
- Order Summary: Subtotal, Estimated Shipping, Total.
- Primary Checkout Button integrated with Razorpay gateway readiness.

### H. Trust & Value Signals (India E-Commerce Essentials)

- 4-column trust ribbon:
  1. **100% Handmade Authenticity**: Crafted by independent Indian women artisans.
  2. **Pan-India Express Delivery**: Safely shipped via Shiprocket with live tracking.
  3. **Cash on Delivery & Secure UPI**: Pay via Google Pay, PhonePe, Paytm, Cards, or Netbanking.
  4. **Custom Made to Measure**: Personalize your colors, stitches, and sizes.

### I. Comprehensive Footer

- Brand narrative, curated collection links, customer support (FAQ, Shipping Policy, Return Policy, Care Guide for Crochet), and newsletter signup with instant discount incentive.

---

## 5. Micro-Interactions & Animation Guidelines

- **Buttons**: `active:scale-[0.98] transition-all duration-200` with soft focus glow (`focus-visible:ring-ring`).
- **Product Card Hover**: Subtle vertical lift (`hover:-translate-y-1.5 hover:shadow-card`).
- **Cart Badge**: Spring scale bounce (`motion.span` or CSS scale) whenever item count updates.
- **Drawer / Modals**: Smooth slide-in from right with backdrop blur (`backdrop-blur-sm`).
