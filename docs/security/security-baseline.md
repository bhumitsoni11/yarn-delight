# Application Security Baseline & Policies

## 1. Overview & Threat Model

The Crochet Store handles customer personal identifiable information (PII), shipping addresses, and high-volume financial transactions via online payments. The platform's security architecture adheres to the principle of **Defense in Depth**, assuming untrusted client input and enforcing verification across every layer.

---

## 2. Server-Side Execution Barriers

To prevent credential leakage and untrusted client execution:

1. **`import "server-only"`**:
   Every module interacting with secret keys (`SUPABASE_SERVICE_ROLE_KEY`, `RAZORPAY_KEY_SECRET`, `RESEND_API_KEY`, `SHIPROCKET_PASSWORD`) imports `server-only`. If any of these files are accidentally imported into a Client Component (`"use client"`), the Next.js compiler halts the build immediately.
2. **Runtime Environment Validation**:
   `src/lib/env.ts` enforces `if (typeof window !== "undefined")` checks before providing access to server credentials.

---

## 3. Authentication & Authorization (RBAC)

### Independent Server-Side Authorization

Next.js middleware provides superficial edge path routing, but **must never be relied upon as the sole authorization mechanism**.

- Every Server Action, Route Handler, and Server Component must independently authenticate and authorize callers using `requireAuth()`, `requireRole()`, or `requirePermission()` from `src/lib/security/rbac.ts`.

### Role-Based Access Matrix

| Permission             | Customer | Support | Admin |
| ---------------------- | :------: | :-----: | :---: |
| `products:read`        |    ✅    |   ✅    |  ✅   |
| `products:write`       |    ❌    |   ❌    |  ✅   |
| `categories:read`      |    ✅    |   ✅    |  ✅   |
| `categories:write`     |    ❌    |   ❌    |  ✅   |
| `orders:read_own`      |    ✅    |   ✅    |  ✅   |
| `orders:read_all`      |    ❌    |   ✅    |  ✅   |
| `orders:update_status` |    ❌    |   ✅    |  ✅   |
| `custom_orders:create` |    ✅    |   ✅    |  ✅   |
| `custom_orders:manage` |    ❌    |   ✅    |  ✅   |
| `inventory:manage`     |    ❌    |   ❌    |  ✅   |
| `users:manage`         |    ❌    |   ❌    |  ✅   |
| `settings:manage`      |    ❌    |   ❌    |  ✅   |

### Supabase Row-Level Security (RLS)

PostgreSQL policies in `supabase/migrations/` enforce database-level boundaries. Even if application code were compromised, direct database access using user session tokens can only read/update rows matching `auth.uid() = id`.

---

## 4. HTTP Headers & Content Security Policy (CSP)

Implemented in `src/lib/security/headers.ts` and attached at the root edge middleware:

- **`Content-Security-Policy`**: Restricts script execution, frames, styles, and network calls strictly to trusted origins (`'self'`, Supabase endpoints, Razorpay checkout, Sentry).
- **`Strict-Transport-Security`**: `max-age=63072000; includeSubDomains; preload` (enforces HTTPS).
- **`X-Frame-Options`**: `DENY` (prevents clickjacking attacks).
- **`X-Content-Type-Options`**: `nosniff` (mitigates MIME-type sniffing).
- **`Referrer-Policy`**: `strict-origin-when-cross-origin`.
- **`Permissions-Policy`**: Disables unused browser hardware APIs (`camera=(), microphone=(), geolocation=()`).

---

## 5. Safe Logging & Data Redaction

All logging across the application routes through `src/lib/security/logger.ts`.

- Automatically redacts sensitive fields from objects:
  - `authorization` headers
  - `cookie` strings
  - `password` and `token` fields
  - `key_secret` / `secret` values
  - Credit card numbers, CVVs, and payment credentials

---

## 6. Rate Limiting Strategy

Serverless deployments run across dynamic, independent lambda instances. Therefore:

- In-memory rate limiting across serverless lambdas is **architecturally flawed and prohibited** (provides false sense of security).
- `src/lib/security/rate-limit.ts` provides a structured contract.
- When an external distributed key-value store (e.g. Upstash Redis) is not configured, the rate limiter explicitly outputs architectural warnings rather than simulating broken in-memory counters.
