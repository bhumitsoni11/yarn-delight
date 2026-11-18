# Crochet Store 🧶✨

> **A modern, production-oriented e-commerce platform for artisan handmade crochet creations.**  
> Crafted with Next.js 16 (App Router), React 19, Tailwind CSS v4, shadcn/ui, Supabase, and Razorpay. Tailored for the Indian market.

---

[![Next.js](https://img.shields.io/badge/Next.js-16.4.6-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL_%26_Auth-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com/)
[![Razorpay](https://img.shields.io/badge/Razorpay-Payment_Gateway-0C2340?style=flat-square&logo=razorpay)](https://razorpay.com/)
[![Vitest](https://img.shields.io/badge/Vitest-Unit_Tests-6E9F18?style=flat-square&logo=vitest)](https://vitest.dev/)
[![Playwright](https://img.shields.io/badge/Playwright-E2E_Tests-2EAD33?style=flat-square&logo=playwright)](https://playwright.dev/)
[![Code Style](https://img.shields.io/badge/Code_Style-Prettier-F7B93E?style=flat-square&logo=prettier)](https://prettier.io/)

---

## 📑 Table of Contents

- [Project Overview](#-project-overview)
- [Product Catalog](#-product-catalog)
- [Technology Stack](#-technology-stack)
- [Security & Architectural Invariants](#-security--architectural-invariants)
- [Project Directory Structure](#-project-directory-structure)
- [Getting Started](#-getting-started)
- [Environment Configuration](#-environment-configuration)
- [Available Scripts](#-available-scripts)
- [Testing Infrastructure](#-testing-infrastructure)
- [Integrations](#-integrations)
- [Development Roadmap](#-development-roadmap)
- [Documentation Index](#-documentation-index)

---

## 🌸 Project Overview

**Crochet Store** is a full-stack digital commerce platform engineered specifically for selling premium handmade crochet goods and commissioning custom crochet pieces in India.

Rather than deploying complex, fractured microservices, the platform leverages the modern **Next.js App Router** with Turbopack, React Server Components (RSC), and Supabase PostgreSQL to deliver instant page loads, bank-grade transaction security, and an expressive, tactile shopping experience.

---

## 🧺 Product Catalog

The platform taxonomy supports 6 core crochet product verticals:

1. **Crochet Handbags**: Artisan tote bags, structured bucket bags, and vintage granny-square shoulder bags.
2. **Crochet Purses**: Compact clutch bags, coin pouches, and crossbody slings.
3. **Crochet Keychains**: Whimsical amigurumi charms, floral tags, and miniature plushies.
4. **Crochet Mufflers & Scarves**: Textured winter neck warmers, ribbed wraps, and oversized cozy mufflers.
5. **Crochet Accessories**: Hair scrunchies, headbands, bookmarks, mug rugs, and floral appliques.
6. **Custom Orders**: Interactive bespoke order submission specifying target dimensions, color palettes, yarn choices, and reference photos.

---

## 🛠 Technology Stack

### Frontend

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack, React Server Components)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + `@tailwindcss/turbopack`
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (powered by `@base-ui/react` and Radix primitives)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Motion](https://motion.dev/) (React 19-ready)

### State Management & Forms

- **Client State**: [Zustand](https://zustand.docs.pmnd.rs/) (cart drawer, UI toggles)
- **Server Cache**: [TanStack Query v5](https://tanstack.com/query) (query caching, background refetching)
- **Form State**: [React Hook Form](https://react-hook-form.com/)
- **Validation**: [Zod](https://zod.dev/) + `@hookform/resolvers`

### Backend & Database

- **Backend Architecture**: Next.js Server Actions + Route Handlers (No separate Express server)
- **Database**: [Supabase PostgreSQL](https://supabase.com/) with Row-Level Security (RLS)
- **Authentication**: [Supabase Auth](https://supabase.com/auth) via `@supabase/ssr` (Cookie-based session refresh)
- **Object Storage**: [Supabase Storage](https://supabase.com/storage) (Product photography & custom order uploads)

### Payments & Logistics (India First)

- **Payment Gateway**: [Razorpay Node.js SDK](https://razorpay.com/) (UPI, Netbanking, Cards, Wallets, Webhook HMAC SHA-256 verifier)
- **Domestic Shipping**: [Shiprocket](https://www.shiprocket.in/) (Automated rate calculation & domestic courier dispatch)
- **Transactional Emails**: [Resend](https://resend.com/) (Order confirmation, invoice, dispatch alerts)

### Quality, Security & DevOps

- **Telemetry**: [Sentry for Next.js](https://sentry.io/) (Client, Server & Edge error tracing with stripped sourcemaps)
- **Unit & Component Testing**: [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/) + jsdom
- **End-to-End Testing**: [Playwright](https://playwright.dev/) (Desktop Chrome & Mobile Chrome viewports)
- **Linting & Formatting**: ESLint 9 (Flat Config) + Prettier + Prettier Tailwind Plugin
- **Package Manager**: [pnpm](https://pnpm.io/) (Strict dependency isolation)
- **Hosting**: [Vercel](https://vercel.com/) + Supabase Managed Cloud

---

## 🔒 Security & Architectural Invariants

The platform follows rigorous security-by-default design principles:

1. **Physical Client/Server Separation**:
   All sensitive modules (`SUPABASE_SERVICE_ROLE_KEY`, `RAZORPAY_KEY_SECRET`, `RESEND_API_KEY`, `SHIPROCKET_PASSWORD`) enforce `import "server-only"`. Any accidental import into client components triggers an immediate compile-time failure.
2. **Next.js 16 Proxy Convention**:
   Adheres to Next.js 16 by replacing legacy `middleware.ts` with `src/proxy.ts`, managing Supabase cookie session synchronization and enforcing strict HTTP security headers.
3. **Independent Server-Side Authorization (RBAC)**:
   Does **not** rely solely on Edge middleware for access control. Server Actions and Route Handlers independently verify identity and permissions using `requireRole()` and `requireAuth()`.
4. **Hardened HTTP Headers & CSP**:
   Enforces `Content-Security-Policy`, `Strict-Transport-Security`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and restricted `Permissions-Policy`.
5. **Safe Structured Logging**:
   All logging passes through a custom redacting logger (`src/lib/security/logger.ts`) that scrubs passwords, payment cards, tokens, cookies, and secret keys.
6. **India-Specific Business Logic**:
   - Currency stored strictly as integer **paise** (`₹100.00` = `10000` paise) to prevent floating-point rounding errors.
   - Built-in validation schemas for 10-digit Indian mobile numbers (`+91` / `[6-9]\d{9}`) and 6-digit postal PIN codes.

---

## 📁 Project Directory Structure

```
yarn-delight/
├── docs/                     # Architectural, security, environment, and integration documentation
├── public/                   # Static assets (fonts, icons, placeholder images)
├── src/
│   ├── app/                  # Next.js App Router (storefront, admin, api endpoints)
│   ├── components/           # Reusable UI component hierarchy (ui, cart, products, layout, forms)
│   ├── config/               # Centralized theme tokens, colors, radii, and typography
│   ├── constants/            # Immutable system taxonomies (categories, product types)
│   ├── data/                 # Seed datasets and static mock fixtures
│   ├── hooks/                # Custom React client hooks
│   ├── lib/                  # Shared utilities and third-party SDK client wrappers
│   │   ├── env.ts            # Validated environment schemas (Zod)
│   │   ├── razorpay/         # Server-only Razorpay client and HMAC verifiers
│   │   ├── resend/           # Server-only Resend email client
│   │   ├── security/         # Auth, RBAC, error handlers, CSP, logger, rate-limiter
│   │   ├── shipping/         # Shiprocket configuration and interfaces
│   │   ├── supabase/         # SSR, browser, and admin Supabase clients
│   │   └── validations/      # Common Zod validation schemas
│   ├── services/             # Domain service layer (products, orders, payments, shipping, emails)
│   ├── store/                # Zustand client state stores (e.g. useCartStore)
│   ├── types/                # TypeScript ambient declarations and Supabase DB types
│   └── proxy.ts              # Next.js 16 Proxy (Edge session refresh + CSP headers)
├── supabase/
│   ├── migrations/           # Version-controlled PostgreSQL SQL migrations (Profiles, RLS)
│   └── seed.sql              # Initial database fixtures
├── tests/
│   ├── e2e/                  # Playwright cross-device end-to-end tests
│   └── setup.ts              # Vitest global environment configuration
├── next.config.ts            # Next.js 16 config + Turbopack rules + Sentry wrapper
└── package.json              # Managed scripts and dependencies
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v20.x, v22.x, or v24.x (Active LTS)
- **pnpm**: v9.x or v10.x+ (`npm install -g pnpm`)

### Installation & Local Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-org/yarn-delight.git
   cd yarn-delight
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Configure local environment variables**:

   ```bash
   cp .env.example .env.local
   ```

   _(Edit `.env.local` with your development keys; see below)_

4. **Verify TypeScript & linting**:

   ```bash
   pnpm typecheck
   pnpm lint
   ```

5. **Start the local development server**:
   ```bash
   pnpm dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Environment Configuration

Create a `.env.local` file by copying [.env.example](file:///d:/yarn-delight/.env.example). Never commit `.env.local` to Git.

| Variable                        | Scope           |    Required     | Description                                             |
| ------------------------------- | --------------- | :-------------: | ------------------------------------------------------- |
| `NEXT_PUBLIC_APP_URL`           | Public          |       Yes       | Canonical base URL (`http://localhost:3000`)            |
| `NEXT_PUBLIC_APP_NAME`          | Public          |       Yes       | Application title displayed in UI & emails              |
| `APP_ENV`                       | Server          |       Yes       | `development`, `test`, or `production`                  |
| `NEXT_PUBLIC_SUPABASE_URL`      | Public          |       Yes       | Supabase Project REST URL                               |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public          |       Yes       | Supabase Public Anon Key                                |
| `SUPABASE_SERVICE_ROLE_KEY`     | **Server-Only** |      Prod       | Supabase Privileged Service Role Key                    |
| `RAZORPAY_KEY_ID`               | Server          | Optional in Dev | Razorpay Public Key ID                                  |
| `RAZORPAY_KEY_SECRET`           | **Server-Only** | Optional in Dev | Razorpay Secret Key for HMAC signature checks           |
| `RAZORPAY_WEBHOOK_SECRET`       | **Server-Only** | Optional in Dev | Secret for verifying incoming payment webhooks          |
| `RESEND_API_KEY`                | **Server-Only** | Optional in Dev | Resend API Key for transactional emails                 |
| `RESEND_FROM_EMAIL`             | Server          |    Optional     | Verified sender address (e.g. `orders@crochetstore.in`) |
| `SENTRY_DSN`                    | Server          |    Optional     | Sentry server-side telemetry DSN                        |
| `NEXT_PUBLIC_SENTRY_DSN`        | Public          |    Optional     | Sentry client-side React telemetry DSN                  |
| `SHIPROCKET_EMAIL`              | **Server-Only** | Optional in Dev | Shiprocket account login email                          |
| `SHIPROCKET_PASSWORD`           | **Server-Only** | Optional in Dev | Shiprocket API user password                            |
| `SHIPROCKET_CHANNEL_ID`         | **Server-Only** |    Optional     | Shiprocket custom sales channel ID                      |

> Detailed credentials retrieval steps can be found in the [Environment Setup Guide](file:///d:/yarn-delight/docs/environment/environment-setup.md).

---

## 📜 Available Scripts

| Command             | Purpose                                                    |
| ------------------- | ---------------------------------------------------------- |
| `pnpm dev`          | Starts the Next.js local development server with Turbopack |
| `pnpm build`        | Compiles a production-ready optimized build                |
| `pnpm start`        | Runs the production preview server locally                 |
| `pnpm lint`         | Runs ESLint to verify code style and detect errors         |
| `pnpm typecheck`    | Validates complete TypeScript type safety (`tsc --noEmit`) |
| `pnpm format`       | Formats all files with Prettier and sorts Tailwind classes |
| `pnpm format:check` | Verifies code compliance against Prettier guidelines       |
| `pnpm test`         | Runs the unit and component test suite via Vitest          |
| `pnpm test:watch`   | Runs Vitest in interactive watch mode                      |
| `pnpm test:e2e`     | Runs cross-browser end-to-end user tests via Playwright    |

---

## 🧪 Testing Infrastructure

The project features a comprehensive testing pipeline:

- **Vitest & React Testing Library**:
  - Setup file: `tests/setup.ts`
  - Validates component rendering, accessibility roles, error sanitization, and RBAC matrix.
  - Executed via: `pnpm test`
- **Playwright E2E**:
  - Config file: `playwright.config.ts`
  - Automatically spins up the Next.js server and executes cross-device user flows against **Desktop Chrome** (1280x720) and **Mobile Chrome** (Pixel 5).
  - Executed via: `pnpm test:e2e`

---

## 🔌 Integrations

Detailed configuration guides for all third-party services:

- **Supabase**: See [Supabase Setup Documentation](file:///d:/yarn-delight/docs/integrations/integration-setup.md#1-supabase-connection-setup)
- **Razorpay**: See [Razorpay Integration Guide](file:///d:/yarn-delight/docs/integrations/integration-setup.md#2-razorpay-payment-gateway-setup)
- **Resend**: See [Resend Email Configuration](file:///d:/yarn-delight/docs/integrations/integration-setup.md#3-resend-transactional-email-setup)
- **Shiprocket**: See [Shiprocket Logistics Guide](file:///d:/yarn-delight/docs/integrations/integration-setup.md#4-shiprocket-logistics-integration-setup)
- **Sentry**: See [Sentry Telemetry Guide](file:///d:/yarn-delight/docs/integrations/integration-setup.md#5-sentry-telemetry-configuration)

---

## 🗺 Development Roadmap

- [x] **Phase 0: Technical Foundation & Infrastructure**
  - Next.js 16 + React 19 + TypeScript + Tailwind v4 + shadcn/ui
  - Supabase, Razorpay, Resend, Sentry integration foundations
  - Vitest + RTL + Playwright testing infrastructure
  - Security headers, CSP, Next.js 16 Proxy, RBAC, safe logging
- [ ] **Phase 1: Product Catalog & Storefront UI**
  - Category pages, product cards, dynamic filtering, product detail views
- [ ] **Phase 2: Shopping Cart & Checkout**
  - Persistent cart state, address form validation, Razorpay checkout modal, webhook handling
- [ ] **Phase 3: Custom Crochet Order Engine**
  - Multi-step custom inquiry form, image uploads, price quote review system
- [ ] **Phase 4: Admin Backoffice & Order Management**
  - Product CRUD, inventory tracking, order status updates, Shiprocket courier dispatch
- [ ] **Phase 5: Customer Accounts & Notifications**
  - Order tracking, customer history, transactional email templates via Resend

---

## 📚 Documentation Index

- [Architecture Overview](file:///d:/yarn-delight/docs/architecture/overview.md)
- [Project Directory Structure](file:///d:/yarn-delight/docs/architecture/project-structure.md)
- [Application Security Baseline](file:///d:/yarn-delight/docs/security/security-baseline.md)
- [Environment Configuration Guide](file:///d:/yarn-delight/docs/environment/environment-setup.md)
- [Deployment & Operations Guide](file:///d:/yarn-delight/docs/deployment/deployment-guide.md)
- [Third-Party Integration Setup](file:///d:/yarn-delight/docs/integrations/integration-setup.md)

---

## 📄 License

This project is private and proprietary. All rights reserved.
