"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AnnouncementBar } from "@/components/layout/announcement-bar"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { User, Mail, Phone, Lock, ArrowRight, ShieldCheck, Sparkles } from "lucide-react"

export default function SignUpPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      router.push("/verify-email?email=" + encodeURIComponent(email))
    }, 900)
  }

  return (
    <div className="bg-background selection:bg-primary/40 selection:text-text flex min-h-screen flex-col font-sans">
      <AnnouncementBar />
      <Navbar />

      <main className="mx-auto w-full max-w-xl flex-1 px-4 py-12 sm:px-6">
        <div className="rounded-3xl border border-border/80 bg-surface-container-lowest p-8 shadow-xs sm:p-10">
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary-container/40 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-on-primary-container">
              <Sparkles className="size-3.5 text-primary" />
              Join The Heirloom Guild
            </span>
            <h1 className="font-heading mt-3 text-2xl font-bold tracking-tight text-on-surface sm:text-3xl">
              Create Your Atelier Account
            </h1>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
              Enjoy custom bespoke commission tracking, order histories, and early invitations.
            </p>
          </div>

          <form onSubmit={handleSignUp} className="mt-8 space-y-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground">Full Name</label>
              <div className="relative mt-1">
                <User className="text-muted-foreground absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Shanaya Kapoor"
                  className="w-full rounded-2xl border border-border/80 bg-surface py-2.5 pr-4 pl-10 text-xs outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-muted-foreground">Email Address</label>
              <div className="relative mt-1">
                <Mail className="text-muted-foreground absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="shanaya@example.com"
                  className="w-full rounded-2xl border border-border/80 bg-surface py-2.5 pr-4 pl-10 text-xs outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-muted-foreground">
                Phone Number (+91 India)
              </label>
              <div className="relative mt-1">
                <Phone className="text-muted-foreground absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="9876543210"
                  className="w-full rounded-2xl border border-border/80 bg-surface py-2.5 pr-4 pl-10 font-mono text-xs outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-muted-foreground">Password</label>
              <div className="relative mt-1">
                <Lock className="text-muted-foreground absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full rounded-2xl border border-border/80 bg-surface py-2.5 pr-4 pl-10 text-xs outline-none focus:border-primary"
                />
              </div>
            </div>

            <label className="flex cursor-pointer items-start gap-2 pt-2 text-xs text-muted-foreground">
              <input
                type="checkbox"
                required
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 size-4 rounded accent-primary cursor-pointer"
              />
              <span>
                I agree to the Atelier Slow-Craft Terms, Pan-India Dispatch Policy, and Artisan Privacy Code.
              </span>
            </label>

            <Button
              type="submit"
              disabled={isLoading}
              size="lg"
              className="mt-4 w-full rounded-full bg-primary text-xs font-bold text-on-primary shadow-xs hover:bg-primary/90"
            >
              {isLoading ? (
                <span>Creating Account...</span>
              ) : (
                <>
                  <span>Create Atelier Account</span>
                  <ArrowRight className="size-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 border-t border-border/60 pt-4 text-center text-xs text-muted-foreground">
            <span>Already have an account? </span>
            <Link href="/sign-in" className="font-bold text-primary underline hover:text-on-surface">
              Sign In
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
