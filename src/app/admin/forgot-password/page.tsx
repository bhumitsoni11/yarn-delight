"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react"

export default function AdminForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface p-4 font-sans text-on-surface">
      <div className="w-full max-w-md rounded-3xl border border-border/80 bg-surface-container-lowest p-8 shadow-xs">
        <Link
          href="/admin/login"
          className="mb-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-on-surface"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to Admin Login</span>
        </Link>

        {submitted ? (
          <div className="text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="size-6" />
            </div>
            <h1 className="font-heading mt-3 text-xl font-bold text-on-surface">
              Staff Reset Dispatched
            </h1>
            <p className="mt-2 text-xs text-muted-foreground">
              Recovery link has been forwarded to the guild administrator.
            </p>
            <Link href="/admin/login" className="mt-6 block">
              <Button className="w-full rounded-full bg-primary text-xs font-bold text-on-primary shadow-xs">
                Back to Sign In
              </Button>
            </Link>
          </div>
        ) : (
          <div>
            <h1 className="font-heading text-2xl font-bold tracking-tight text-on-surface">
              Staff Password Recovery
            </h1>
            <p className="mt-1 text-xs text-muted-foreground">
              Enter your registered staff email address to receive password reset authorization.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground">Email</label>
                <div className="relative mt-1">
                  <Mail className="text-muted-foreground absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@yarndelight.com"
                    className="w-full rounded-2xl border border-border/80 bg-surface py-2.5 pr-4 pl-10 text-xs outline-none focus:border-primary"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full rounded-full bg-primary text-xs font-bold text-on-primary shadow-xs"
              >
                Send Recovery Link
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
