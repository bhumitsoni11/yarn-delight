# Environment Configuration & Setup Guide

This guide details all environment variables utilized across the Crochet Store platform, where to obtain each credential from third-party vendor consoles, and how variables are validated.

---

## 1. Quick Start

1. Duplicate `.env.example` to create your local `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Fill in the values for the services you are working with.
3. Validate configuration:
   ```bash
   pnpm typecheck
   ```

> [!CAUTION]
> Never commit `.env.local` or any production secret keys to Git. `.gitignore` is pre-configured to strictly ignore `.env*` files except `.env.example`.

---

## 2. Environment Variables Reference

### Application Variables

| Variable               | Scope                    | Required | Default                 | Description                                                   |
| ---------------------- | ------------------------ | -------- | ----------------------- | ------------------------------------------------------------- |
| `NEXT_PUBLIC_APP_URL`  | Public (Client + Server) | Yes      | `http://localhost:3000` | Canonical platform URL. Used for absolute URLs and redirects. |
| `NEXT_PUBLIC_APP_NAME` | Public (Client + Server) | Yes      | `Crochet Store`         | Public brand title displayed in UI and emails.                |
| `APP_ENV`              | Server-Only              | Yes      | `development`           | Operating tier: `development`, `test`, or `production`.       |

---

### Supabase (Database, Auth, Storage)

Obtain from: **Supabase Console** -> Select Project -> **Project Settings** -> **API**.

| Variable                        | Scope                    | Required        | Description                                                                |
| ------------------------------- | ------------------------ | --------------- | -------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Public (Client + Server) | Yes             | Project REST / Realtime URL (e.g. `https://xyzcompany.supabase.co`).       |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public (Client + Server) | Yes             | Public anon key for browser authentication and RLS queries.                |
| `SUPABASE_SERVICE_ROLE_KEY`     | **SERVER-ONLY**          | Production Only | Privileged admin key. Bypasses Row Level Security. Never expose to client! |

---

### Razorpay (Payment Gateway)

Obtain from: **Razorpay Dashboard** -> **Settings** -> **API Keys** / **Webhooks**.

| Variable                  | Scope           | Required     | Description                                                                        |
| ------------------------- | --------------- | ------------ | ---------------------------------------------------------------------------------- |
| `RAZORPAY_KEY_ID`         | Server-Only     | For Checkout | Public Key ID (e.g. `rzp_test_...` or `rzp_live_...`).                             |
| `RAZORPAY_KEY_SECRET`     | **SERVER-ONLY** | For Checkout | Secret key used for order creation and HMAC-SHA256 signature verification.         |
| `RAZORPAY_WEBHOOK_SECRET` | **SERVER-ONLY** | For Webhooks | Secret configured in the webhook dashboard to verify signature of incoming events. |

---

### Resend (Transactional Email)

Obtain from: **Resend Console** -> **API Keys** & **Domains**.

| Variable            | Scope           | Required   | Description                                                                                   |
| ------------------- | --------------- | ---------- | --------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY`    | **SERVER-ONLY** | For Emails | API key (starts with `re_...`).                                                               |
| `RESEND_FROM_EMAIL` | Server-Only     | No         | Verified sender address (e.g. `orders@crochetstore.in`). Defaults to `onboarding@resend.dev`. |

---

### Sentry (Error & Performance Telemetry)

Obtain from: **Sentry.io** -> Select Project -> **Settings** -> **Client Keys (DSN)**.

| Variable                 | Scope       | Required | Description                                           |
| ------------------------ | ----------- | -------- | ----------------------------------------------------- |
| `NEXT_PUBLIC_SENTRY_DSN` | Public      | Optional | DSN for client-side React exception capturing.        |
| `SENTRY_DSN`             | Server-Only | Optional | DSN for Node.js / edge server runtime error tracking. |

---

### Shiprocket (Domestic Logistics & Shipping)

Obtain from: **Shiprocket Console** -> **Settings** -> **API** -> **Configure**.

| Variable                | Scope           | Required     | Description                            |
| ----------------------- | --------------- | ------------ | -------------------------------------- |
| `SHIPROCKET_EMAIL`      | **SERVER-ONLY** | For Shipping | Shiprocket account registration email. |
| `SHIPROCKET_PASSWORD`   | **SERVER-ONLY** | For Shipping | Shiprocket API user password.          |
| `SHIPROCKET_CHANNEL_ID` | **SERVER-ONLY** | Optional     | Custom integration channel identifier. |

---

## 3. Schema Enforcement (`src/lib/env.ts`)

Environment variables are strongly typed and validated through **Zod**:

- `publicEnvSchema`: Validates variables immediately upon module import.
- `serverEnvSchema`: Validates secrets only when `getServerEnv()` is executed on the server.
- Optional integrations (Razorpay, Resend, Shiprocket, Sentry) do not block local development when empty.
