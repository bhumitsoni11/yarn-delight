"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { AnnouncementBar } from "@/components/layout/announcement-bar"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import {
  Sparkles,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Clock,
  Heart,
  CheckCircle2,
} from "lucide-react"

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMsg("")

    setTimeout(() => {
      setIsLoading(false)
      // Check if admin email
      if (email.includes("admin")) {
        router.push("/admin")
      } else {
        router.push("/account")
      }
    }, 800)
  }

  const fillDemoCustomer = () => {
    setEmail("ananya.sharma@example.com")
    setPassword("atelier2026")
  }

  const fillDemoAdmin = () => {
    setEmail("admin@yarndelight.com")
    setPassword("adminSecure2026")
  }

  return (
    <div className="bg-background selection:bg-primary/40 selection:text-text flex min-h-screen flex-col font-sans">
      <AnnouncementBar />
      <Navbar />

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-8 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Editorial Guild Privileges (5 cols) */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-surface-container-low p-6 sm:p-10 lg:col-span-5 shadow-xs">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-secondary-container px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-on-secondary-container">
                  Heirloom Guild
                </span>
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  Member Lounge
                </span>
              </div>

              <h1 className="font-heading mt-4 text-2xl font-bold tracking-tight text-on-surface sm:text-4xl">
                Welcome back to our slow craft haven.
              </h1>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                Sign in to track ongoing bespoke commissions, manage your saved pieces, and access
                VIP small-batch seasonal drops.
              </p>

              {/* Atelier Spotlight Image */}
              <div className="relative mt-6 aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border/60 bg-surface shadow-2xs">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQsVbNvRSpbNMgfo_PZlK-Z1QBhEuC7WH9sJy9rA3hr2LlyIuMeU3LLlc0yBsLmCJHCKHhYxLDbZUyN_iRSIezvjs5qr0ZQsGnmtPGwTdHu3seHQ02dNw46qUynLAvn6CZgDahyVB7C6XvSaVFe4DJhDrBQvhEGKQY1L_45pAk1bQHbamgpRhbyOmmsaXaqvcqxeJsLlN_reVrxBP2UQ7_4QcYrThkeR-Y62Yw4JU"
                  alt="Atelier Crochet Guild"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>

              {/* Guild Benefits */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-surface-container-lowest p-3 shadow-2xs">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-container/40 text-primary">
                    <Clock className="size-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-on-surface">Track Bespoke Craft Milestones</p>
                    <p className="text-[11px] text-muted-foreground">
                      Real-time updates as your artisan stitches your commission.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-surface-container-lowest p-3 shadow-2xs">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-container/40 text-primary">
                    <Sparkles className="size-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-on-surface">Small-Batch Early Access</p>
                    <p className="text-[11px] text-muted-foreground">
                      Get first notice 2 hours before numbered drops sell out.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sign In Form (7 cols) */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <div className="mx-auto w-full max-w-lg rounded-3xl border border-border/80 bg-surface-container-lowest p-8 shadow-xs sm:p-10">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
                Atelier Account
              </span>
              <h2 className="font-heading mt-1 text-2xl font-bold tracking-tight text-on-surface sm:text-3xl">
                Sign In to Yarn Delight
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Enter your credentials or use the one-click demo credentials below.
              </p>

              {/* One-Click Demo Helper Strip */}
              <div className="mt-5 rounded-2xl border border-primary/20 bg-primary-container/20 p-3.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface">
                  Instant Demo Access:
                </span>
                <div className="mt-2 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={fillDemoCustomer}
                    className="rounded-full border border-primary/40 bg-surface px-3 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary-container/40"
                  >
                    Use Demo Customer (Ananya)
                  </button>
                  <button
                    type="button"
                    onClick={fillDemoAdmin}
                    className="rounded-full border border-border/80 bg-surface px-3 py-1 text-xs font-semibold text-on-surface transition-colors hover:bg-surface-container"
                  >
                    Use Demo Admin
                  </button>
                </div>
              </div>

              <form onSubmit={handleSignIn} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground">
                    Email Address
                  </label>
                  <div className="relative mt-1">
                    <Mail className="text-muted-foreground absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full rounded-2xl border border-border/80 bg-surface py-2.5 pr-4 pl-10 text-xs outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs">
                    <label className="font-medium text-muted-foreground">Password</label>
                    <Link
                      href="/forgot-password"
                      className="text-primary underline hover:text-on-surface"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative mt-1">
                    <Lock className="text-muted-foreground absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full rounded-2xl border border-border/80 bg-surface py-2.5 pr-4 pl-10 text-xs outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="size-4 rounded accent-primary cursor-pointer"
                    />
                    <span>Remember my studio session</span>
                  </label>
                </div>

                {errorMsg && <p className="text-xs text-rose-600">{errorMsg}</p>}

                <Button
                  type="submit"
                  disabled={isLoading}
                  size="lg"
                  className="mt-2 w-full rounded-full bg-primary text-xs font-bold text-on-primary shadow-xs hover:bg-primary/90"
                >
                  {isLoading ? (
                    <span>Signing In...</span>
                  ) : (
                    <>
                      <span>Enter Studio Account</span>
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 border-t border-border/60 pt-4 text-center text-xs text-muted-foreground">
                <span>Don&apos;t have an Atelier account yet? </span>
                <Link href="/sign-up" className="font-bold text-primary underline hover:text-on-surface">
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
