# Deployment & Operations Guide

## 1. Local Development Workflow

### Prerequisites

- **Node.js**: Version 20.x, 22.x, or 24.x (Active LTS)
- **pnpm**: Version 9.x or 10.x+ (Recommended package manager)

### Starting the Local Development Server

```bash
# Install dependencies
pnpm install

# Verify type safety
pnpm typecheck

# Run unit and component test suite
pnpm test

# Launch Next.js local development server (Turbopack)
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 2. Production Build Verification

Always test production builds locally before triggering deployment:

```bash
# Run production build
pnpm build

# Start local production preview
pnpm start
```

---

## 3. Vercel Deployment Configuration

The application is optimized for deployment on Vercel with automatic edge configuration.

### Steps:

1. Push repository to GitHub/GitLab.
2. In the Vercel Dashboard, select **Import Project** and select the repository.
3. Configure **Build & Development Settings**:
   - **Framework Preset**: Next.js
   - **Package Manager**: pnpm
   - **Build Command**: `pnpm build`
   - **Install Command**: `pnpm install`
4. Configure **Environment Variables** in the Vercel project settings:
   - `NEXT_PUBLIC_APP_URL`: Production domain (e.g. `https://crochetstore.in`)
   - `NEXT_PUBLIC_APP_NAME`: `Crochet Store`
   - `APP_ENV`: `production`
   - `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anon key
   - `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role secret
   - `RAZORPAY_KEY_ID`: Live Razorpay Key ID
   - `RAZORPAY_KEY_SECRET`: Live Razorpay Key Secret
   - `RAZORPAY_WEBHOOK_SECRET`: Configured Webhook Secret
   - `RESEND_API_KEY`: Production Resend API Key
   - `RESEND_FROM_EMAIL`: `orders@crochetstore.in`
   - `SENTRY_DSN` & `NEXT_PUBLIC_SENTRY_DSN`: Sentry production DSNs
   - `SHIPROCKET_EMAIL` & `SHIPROCKET_PASSWORD`: Production shipping credentials

---

## 4. Supabase Managed Infrastructure Setup

1. **Create Supabase Project**:
   - Region: Select **South Asia (Mumbai)** for lowest latency to the Indian target market.
2. **Apply Migrations**:
   ```bash
   pnpm dlx supabase db push
   # Or execute SQL files from supabase/migrations/ via Supabase SQL Editor
   ```
3. **Storage Buckets**:
   - Create public bucket `product-media` for crochet photos.
   - Create private bucket `custom-order-attachments` for customer reference images.
4. **Row-Level Security (RLS)**:
   - Ensure RLS remains enabled on all created tables.
