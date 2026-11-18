# Technical Architecture Overview: Crochet Store Platform

## 1. Executive Summary

This document specifies the technical architecture for the **Crochet Store** e-commerce platform—a modern, production-oriented application tailored for handmade crochet items (handbags, purses, keychains, mufflers, accessories, and custom orders) targeting the Indian market.

The platform is designed with a monolithic full-stack architecture powered by the Next.js App Router, Supabase PostgreSQL, and managed cloud infrastructure, prioritizing type safety, robust security, high performance, and rapid developer velocity without unnecessary multi-tier microservice complexity.

---

## 2. Core Architectural Principles

1. **Next.js App Router as Full-Stack Engine**
   - Eliminates need for separate Express/Fastify backend.
   - Utilizes React Server Components (RSC) for zero-bundle-size database querying.
   - Server Actions and Route Handlers encapsulate mutative business operations with strict server-only boundaries.

2. **Strict Client-Server Isolation**
   - Secret keys, payment credentials, shipping auth tokens, and administrative database clients are physically prohibited from client bundles via the `server-only` package and explicit lint/type barriers.
   - Only variables explicitly prefixed with `NEXT_PUBLIC_` are allowed in browser code.

3. **Defense in Depth**
   - Multi-tier validation: Client-side validation via React Hook Form + Zod, followed by mandatory server-side Zod validation in every Route Handler and Server Action.
   - Authorization is enforced directly in server operations (RBAC) and NOT solely in Next.js middleware.
   - Row-Level Security (RLS) in Supabase PostgreSQL guarantees database-level isolation.

4. **India-First E-Commerce Foundations**
   - Currency stored in integer subunits (paise / INR cents) to eliminate floating-point calculation errors.
   - Built-in validation for 10-digit Indian mobile numbers (`+91` / `[6-9]\d{9}`) and 6-digit Indian PIN codes.
   - Domestic integration points: Razorpay (UPI, Netbanking, Cards) and Shiprocket (Domestic Logistics).

5. **Type Safety & Observability**
   - End-to-end TypeScript strict mode.
   - Unified telemetry with Sentry for real-time error tracking and performance profiling without exposing source maps.

---

## 3. Technology Responsibilities

| Layer              | Technology                            | Primary Responsibility                                            |
| ------------------ | ------------------------------------- | ----------------------------------------------------------------- |
| **Framework**      | Next.js (App Router)                  | Hybrid rendering, routing, API Route Handlers, Server Actions     |
| **UI Library**     | React 19 + shadcn/ui                  | Accessible, customizable component primitives with Radix/Base UI  |
| **Styling**        | Tailwind CSS v4                       | High-performance CSS engine with CSS variable tokens              |
| **Animations**     | Motion                                | Micro-interactions and smooth page transitions                    |
| **State (Client)** | Zustand + TanStack Query              | Client UI state (Cart modal) + Server state caching/refetching    |
| **Validation**     | Zod + React Hook Form                 | Declarative schema validation and form state handling             |
| **Database/Auth**  | Supabase (PostgreSQL + Auth)          | Relational persistence, Row Level Security, Auth sessions         |
| **Payments**       | Razorpay Node.js SDK                  | Order creation, UPI/Card/Netbanking gateway, webhook verification |
| **Emails**         | Resend                                | Transactional emails (order confirmation, dispatch notices)       |
| **Logistics**      | Shiprocket                            | Shipping rate calculation, domestic courier allocation, tracking  |
| **Monitoring**     | Sentry for Next.js                    | Exception tracking, tracing, performance monitoring               |
| **Testing**        | Vitest + Testing Library + Playwright | Unit, component, integration, and cross-device E2E testing        |

---

## 4. High-Level Architecture Diagram

```
+---------------------------------------------------------------+
|                       Client Browser                          |
|  - React 19 Client Components                                 |
|  - Zustand Cart Store / TanStack Query Cache                  |
|  - Razorpay Checkout Modal (External Script)                  |
+------------------------------+--------------------------------+
                               | HTTPS
                               v
+---------------------------------------------------------------+
|                    Vercel Edge / Serverless                   |
|                                                               |
|  [Middleware]: Session Refresh, Security Headers, CSP Nonce   |
|                                                               |
|  [App Router]:                                                |
|    - Server Components (RSC): Read directly via Supabase SSR  |
|    - Route Handlers / Actions: Validate with Zod              |
|                                                               |
|  [Server-Only Isolation Barrier]:                             |
|    - Supabase Admin Client (Service Role)                     |
|    - Razorpay SDK Client (Secrets & Signature Verifier)       |
|    - Resend Client (API Key)                                  |
|    - Shiprocket Client (Credentials)                          |
|    - Rate Limiter Abstraction                                 |
+------------------------------+--------------------------------+
                               |
            +------------------+------------------+
            |                  |                  |
            v                  v                  v
+--------------------+ +----------------+ +----------------+
|  Supabase Cloud    | |  Razorpay API  | |  Resend API    |
|  - PostgreSQL + RLS| |  - Orders      | |  - Transact.   |
|  - Auth Sessions   | |  - Webhooks    | |    Emails      |
|  - Media Storage   | +----------------+ +----------------+
+--------------------+
```
