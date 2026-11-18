# Third-Party Integrations Setup Guide

This guide details the steps required to configure and connect third-party external services.

---

## 1. Supabase Connection Setup

1. **Create Account & Project**:
   - Go to [supabase.com](https://supabase.com) and create an organization and project.
   - Choose the region nearest to your customers (**Mumbai, India**).
2. **Retrieve API Keys**:
   - Go to **Project Settings** -> **API**.
   - Copy `Project URL` to `NEXT_PUBLIC_SUPABASE_URL`.
   - Copy `anon public` key to `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
   - Copy `service_role secret` key to `SUPABASE_SERVICE_ROLE_KEY`.
3. **Database Migration**:
   - Navigate to the **SQL Editor** in Supabase.
   - Run the contents of `supabase/migrations/00000_baseline_schema.sql` to initialize the profiles table, role enum, and RLS policies.
4. **Auth Settings**:
   - In **Authentication** -> **URL Configuration**, set Site URL to `http://localhost:3000` (development) and your production domain in Redirect URLs.

---

## 2. Razorpay Payment Gateway Setup

1. **Create Account**:
   - Register at [razorpay.com](https://razorpay.com). Complete KYC for live payments or start in Test Mode.
2. **Generate API Keys**:
   - Navigate to **Settings** -> **API Keys** -> **Generate Key**.
   - Copy `Key Id` to `RAZORPAY_KEY_ID`.
   - Copy `Key Secret` to `RAZORPAY_KEY_SECRET`.
3. **Configure Webhook**:
   - Navigate to **Settings** -> **Webhooks** -> **Add New Webhook**.
   - **Webhook URL**: `https://<your-domain>/api/webhooks/razorpay`
   - **Secret**: Set a strong random secret and add to `RAZORPAY_WEBHOOK_SECRET`.
   - **Active Events**:
     - `order.paid`
     - `payment.captured`
     - `payment.failed`

---

## 3. Resend Transactional Email Setup

1. **Create Account**:
   - Register at [resend.com](https://resend.com).
2. **Generate API Key**:
   - Go to **API Keys** -> **Create API Key**.
   - Name: `crochet-store-prod`.
   - Set value to `RESEND_API_KEY`.
3. **Domain Verification**:
   - Go to **Domains** -> **Add Domain** (e.g. `crochetstore.in`).
   - Add the specified DKIM and SPF TXT records to your DNS registrar (Cloudflare / GoDaddy / Namecheap).
   - Once verified, update `RESEND_FROM_EMAIL=orders@crochetstore.in`.

---

## 4. Shiprocket Logistics Integration Setup

1. **Create Account**:
   - Register at [shiprocket.in](https://shiprocket.in).
2. **Generate API Credentials**:
   - Navigate to **Settings** -> **API** -> **Configure**.
   - Create API User with designated email and password.
   - Set credentials in `SHIPROCKET_EMAIL` and `SHIPROCKET_PASSWORD`.
   - Set Channel ID (if multi-channel is enabled) in `SHIPROCKET_CHANNEL_ID`.
3. **Pickup Address**:
   - Register primary workshop / warehouse pickup address in Shiprocket console.

---

## 5. Sentry Telemetry Configuration

1. **Create Sentry Project**:
   - Sign in to [sentry.io](https://sentry.io).
   - Create a new project selecting **Next.js**.
2. **Configure DSN**:
   - Copy the Client Keys (DSN) to `NEXT_PUBLIC_SENTRY_DSN` and `SENTRY_DSN`.
3. **Build Options**:
   - In `next.config.ts`, Sentry is configured to automatically strip and delete sourcemaps after upload (`sourcemaps: { deleteSourcemapsAfterUpload: true }`), ensuring client bundles never leak internal server paths or unminified code.
