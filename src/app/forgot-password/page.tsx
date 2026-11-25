"use client"

import { useState } from "react"
import Link from "next/link"
import { AnnouncementBar } from "@/components/layout/announcement-bar"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      setSubmitted(true)
    }, 800)
  }

  return (
    <div className="bg-background selection:bg-primary/40 selection:text-text flex min-h-screen flex-col font-sans">
      <AnnouncementBar />
      <Navbar />

      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-16 sm:px-6">
        <div className="rounded-3xl border border-border/80 bg-surface-container-lowest p-8 shadow-xs">
          <Link
            href="/sign-in"
            className="mb-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-on-surface"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back to Sign In</span>
          </Link>

          {submitted ? (
            <div className="text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="size-6" />
              </div>
              <h1 className="font-heading mt-3 text-xl font-bold text-on-surface">
                Recovery Instructions Sent
              </h1>
              <p className="mt-2 text-xs text-muted-foreground">
                We have dispatched password reset instructions to{" "}
                <strong className="text-on-surface">{email}</strong>. Please check your inbox and
                spam folder.
              </p>
              <Link href="/sign-in" className="mt-6 block">
                <Button className="w-full rounded-full bg-primary text-xs font-bold text-on-primary shadow-xs">
                  Return to Sign In
                </Button>
              </Link>
            </div>
          ) : (
            <div>
              <h1 className="font-heading text-2xl font-bold tracking-tight text-on-surface">
                Reset Password
              </h1>
              <p className="mt-1 text-xs text-muted-foreground">
                Enter your registered email address and we&apos;ll send you a link to reset your
                password.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
                      placeholder="ananya@example.com"
                      className="w-full rounded-2xl border border-border/80 bg-surface py-2.5 pr-4 pl-10 text-xs outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  size="lg"
                  className="w-full rounded-full bg-primary text-xs font-bold text-on-primary shadow-xs hover:bg-primary/90"
                >
                  {isLoading ? "Dispatching Email..." : "Send Reset Link"}
                </Button>
              </form>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
