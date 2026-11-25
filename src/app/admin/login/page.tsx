"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMsg("")

    setTimeout(() => {
      setIsLoading(false)
      // Allow login for testing
      router.push("/admin")
    }, 700)
  }

  const fillAdminCredentials = () => {
    setEmail("admin@yarndelight.com")
    setPassword("adminSecure2026")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface p-4 font-sans text-on-surface">
      <div className="w-full max-w-md rounded-3xl border border-border/80 bg-surface-container-lowest p-8 shadow-sm sm:p-10">
        <div className="text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary text-sm font-bold text-on-primary font-heading">
            YD
          </div>
          <span className="mt-3 block font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
            Staff Authentication
          </span>
          <h1 className="font-heading mt-1 text-2xl font-bold tracking-tight text-on-surface">
            Atelier Studio Portal
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Restricted to Gujarat guild managers and fulfillment staff.
          </p>
        </div>

        {/* Demo Fast-Fill Button */}
        <button
          type="button"
          onClick={fillAdminCredentials}
          className="mt-6 w-full rounded-2xl border border-primary/30 bg-primary-container/20 py-2.5 text-xs font-semibold text-primary transition-colors hover:bg-primary-container/40"
        >
          Click to Fill Staff Demo Credentials
        </button>

        <form onSubmit={handleAdminLogin} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-muted-foreground">Staff Email</label>
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

          <div>
            <div className="flex items-center justify-between text-xs">
              <label className="font-medium text-muted-foreground">Password</label>
              <Link
                href="/admin/forgot-password"
                className="text-primary underline hover:text-on-surface"
              >
                Reset
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

          {errorMsg && <p className="text-xs text-rose-600">{errorMsg}</p>}

          <Button
            type="submit"
            disabled={isLoading}
            size="lg"
            className="w-full rounded-full bg-primary text-xs font-bold text-on-primary shadow-xs hover:bg-primary/90"
          >
            {isLoading ? "Verifying..." : "Access Admin Console"}
          </Button>
        </form>

        <div className="mt-6 border-t border-border/60 pt-4 text-center">
          <Link href="/" className="text-xs font-semibold text-muted-foreground hover:text-on-surface">
            ← Return to Public Storefront
          </Link>
        </div>
      </div>
    </div>
  )
}
