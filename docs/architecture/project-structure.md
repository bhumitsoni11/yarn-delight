# Project Directory Structure & Responsibilities

This guide outlines the directory architecture of the Crochet Store repository and details the responsibilities and boundaries of each folder.

```
yarn-delight/
├── .github/                  # CI/CD workflows and automated pipelines
├── docs/                     # Architectural, security, and deployment documentation
│   ├── architecture/         # System designs, domain models, decisions
│   ├── deployment/           # Vercel & Supabase hosting guidelines
│   ├── environment/          # Environment variable reference and setup
│   ├── integrations/         # Third-party service integration documentation
│   └── security/             # Security baseline and threat mitigations
├── public/                   # Static public assets (SVGs, favicon, fonts, banners)
│   ├── fonts/                # Self-hosted typography assets
│   ├── icons/                # Iconography and platform badges
│   └── images/               # Fallback and static banner imagery
├── src/
│   ├── app/                  # Next.js App Router (pages, layouts, routes)
│   │   ├── (store)/          # Route group: Customer-facing storefront
│   │   ├── admin/            # Route group: Admin backoffice portal
│   │   ├── api/              # Route handlers: REST endpoints & webhooks
│   │   ├── globals.css       # Global Tailwind CSS and design token variables
│   │   ├── layout.tsx        # Root HTML layout and provider injection
│   │   └── page.tsx          # Initial entry point
│   ├── components/           # Reusable UI component tree
│   │   ├── admin/            # Admin-only dashboard widgets & tables
│   │   ├── cart/             # Shopping cart sheet, drawer, item rows
│   │   ├── forms/            # Form controls and specialized field inputs
│   │   ├── layout/           # Shared wrappers: Header, Footer, Sidebars
│   │   ├── navigation/       # Menus, category bars, search trigger
│   │   ├── products/         # Product cards, gallery, specs, filters
│   │   ├── providers/        # Context providers (QueryClientProvider, Theme)
│   │   └── ui/               # shadcn/ui atom components (Button, Input, etc.)
│   ├── config/               # Static runtime configurations and theme tokens
│   │   └── theme.ts          # Centralized color, font, and spacing design system
│   ├── constants/            # Immutable system constants
│   │   └── categories.ts     # Locked crochet catalog taxonomies
│   ├── data/                 # Static catalogs, mock fixtures, initial datasets
│   ├── hooks/                # Custom React client hooks
│   ├── lib/                  # Shared core utilities and external wrappers
│   │   ├── env.ts            # Validated environment schemas (Zod)
│   │   ├── razorpay/         # Server-only Razorpay client and signature logic
│   │   ├── resend/           # Server-only email transport client
│   │   ├── security/         # Auth, RBAC, error handlers, CSP, rate limiter
│   │   ├── shipping/         # Shiprocket credentials and client configuration
│   │   ├── supabase/         # SSR, browser, and admin Supabase clients
│   │   ├── utils.ts          # Generic utilities (cn, formatting)
│   │   └── validations/      # Reusable Zod schemas (common, inputs, pagination)
│   ├── services/             # Domain service layer (Business Logic Modules)
│   │   ├── categories/       # Category operations
│   │   ├── custom-orders/    # Custom crochet commission inquiries
│   │   ├── inventory/        # Stock checking, locks, reservations
│   │   ├── notifications/    # Transactional email and customer alerts
│   │   ├── orders/           # Order placement, status transitions, history
│   │   ├── payments/         # Payment session creation, webhooks
│   │   ├── products/         # Product catalog queries and filtering
│   │   └── shipping/         # Shipping rates, manifest creation, tracking
│   ├── store/                # Zustand client state stores
│   │   ├── cart.store.ts     # Shopping cart state (persisted)
│   │   └── index.ts          # Barrel export for Zustand stores
│   ├── styles/               # Supplementary styles or utility classes
│   ├── tests/                # Test utilities and unit/component suites
│   ├── types/                # Shared TypeScript ambient and domain declarations
│   │   └── database.ts       # Supabase PostgreSQL schema types
│   └── middleware.ts         # Edge middleware: Session refresh & security headers
├── supabase/
│   ├── migrations/           # Version-controlled SQL migration scripts
│   └── seed.sql              # Initial local and test database fixtures
├── tests/
│   ├── e2e/                  # Playwright end-to-end user journeys
│   └── setup.ts              # Vitest global environment setup
├── .env.example              # Sanitized template for environment variables
├── .env.local                # Local environment secrets (NEVER COMMITTED)
├── .gitignore                # Git exclusion rules
├── .prettierrc               # Prettier code formatting rules
├── eslint.config.mjs         # ESLint flat configuration (Next.js + Prettier)
├── next.config.ts            # Next.js build and Sentry monitoring config
├── package.json              # Managed dependencies and lifecycle scripts
├── playwright.config.ts      # Cross-browser E2E testing configuration
├── tsconfig.json             # TypeScript strict compiler configuration
└── vitest.config.mts         # Vitest unit testing configuration
```

---

## Key Boundary Guidelines

1. **`src/services/*`**: Houses all business rules. UI components must never call Supabase or external APIs directly; components interact through Server Actions that call these services.
2. **`src/lib/security/*`**: Encapsulates all authorization, authentication, and sanitization boundaries.
3. **`src/components/ui/*`**: Primitives only. Free of domain knowledge or business logic.
