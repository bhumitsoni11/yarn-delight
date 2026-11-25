"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { AnnouncementBar } from "@/components/layout/announcement-bar"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Mail, CheckCircle2, ArrowRight } from "lucide-react"

function VerifyEmailContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || "your.email@example.com"
  const [resent, setResent] = useState(false)

  const handleResend = () => {
    setResent(true)
    setTimeout(() => setResent(false), 4000)
  }

  return (
    <div className="bg-background selection:bg-primary/40 selection:text-text flex min-h-screen flex-col font-sans">
      <AnnouncementBar />
      <Navbar />

      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-16 sm:px-6 text-center">
        <div className="rounded-3xl border border-border/80 bg-surface-container-lowest p-8 shadow-xs">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary-container/40 text-primary">
            <Mail className="size-7" />
          </div>

          <h1 className="font-heading mt-4 text-2xl font-bold tracking-tight text-on-surface">
            Verify Your Email Address
          </h1>
          <p className="mt-2 text-xs text-muted-foreground">
            We&apos;ve sent a slow-craft verification link to{" "}
            <strong className="text-on-surface">{email}</strong>. Click the link inside to activate
            your Atelier account and save custom order preferences.
          </p>

          {resent && (
            <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-emerald-700">
              <CheckCircle2 className="size-4" />
              <span>A fresh verification link has been sent!</span>
            </div>
          )}

          <div className="mt-6 space-y-3">
            <Button
              onClick={handleResend}
              variant="outline"
              className="w-full rounded-full text-xs font-semibold"
            >
              Resend Verification Email
            </Button>
            <Link href="/account" className="block">
              <Button className="w-full rounded-full bg-primary text-xs font-bold text-on-primary shadow-xs">
                <span>Continue to Customer Account</span>
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <VerifyEmailContent />
    </Suspense>
  )
}
