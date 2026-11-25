"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AnnouncementBar } from "@/components/layout/announcement-bar"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Lock, CheckCircle2 } from "lucide-react"

export default function ResetPasswordPage() {
  const router = useRouter()
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg("")

    if (newPassword !== confirmPassword) {
      setErrorMsg("Passwords do not match.")
      return
    }

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
          {submitted ? (
            <div className="text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="size-6" />
              </div>
              <h1 className="font-heading mt-3 text-xl font-bold text-on-surface">
                Password Successfully Reset
              </h1>
              <p className="mt-2 text-xs text-muted-foreground">
                Your Atelier security credentials have been updated. You can now sign in with your new
                password.
              </p>
              <Link href="/sign-in" className="mt-6 block">
                <Button className="w-full rounded-full bg-primary text-xs font-bold text-on-primary shadow-xs">
                  Sign In Now
                </Button>
              </Link>
            </div>
          ) : (
            <div>
              <h1 className="font-heading text-2xl font-bold tracking-tight text-on-surface">
                Create New Password
              </h1>
              <p className="mt-1 text-xs text-muted-foreground">
                Your password must be at least 8 characters long and include numbers or symbols.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground">
                    New Password
                  </label>
                  <div className="relative mt-1">
                    <Lock className="text-muted-foreground absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      minLength={8}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full rounded-2xl border border-border/80 bg-surface py-2.5 pr-4 pl-10 text-xs outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground">
                    Confirm New Password
                  </label>
                  <div className="relative mt-1">
                    <Lock className="text-muted-foreground absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      minLength={8}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full rounded-2xl border border-border/80 bg-surface py-2.5 pr-4 pl-10 text-xs outline-none focus:border-primary"
                    />
                  </div>
                </div>

                {errorMsg && <p className="text-xs text-rose-600">{errorMsg}</p>}

                <Button
                  type="submit"
                  disabled={isLoading}
                  size="lg"
                  className="w-full rounded-full bg-primary text-xs font-bold text-on-primary shadow-xs hover:bg-primary/90"
                >
                  {isLoading ? "Updating Password..." : "Update Password"}
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
