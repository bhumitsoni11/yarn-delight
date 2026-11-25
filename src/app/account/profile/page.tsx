"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles, Check, User, Mail, Phone, Heart } from "lucide-react"

export default function AccountProfilePage() {
  const [fullName, setFullName] = useState("Ananya Sharma")
  const [email, setEmail] = useState("ananya.sharma@example.com")
  const [phone, setPhone] = useState("+91 98201 44521")
  const [favoriteCraft, setFavoriteCraft] = useState("Handbags & Shoulder Bags")
  const [savedSuccess, setSavedSuccess] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 3000)
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-border/60 pb-4">
        <h1 className="font-heading text-2xl font-bold tracking-tight text-on-surface">
          Artisan Profile & Preferences
        </h1>
        <p className="mt-1 text-xs text-muted-foreground">
          Manage your personal details, bespoke craft preferences, and member credentials.
        </p>
      </div>

      <div className="rounded-3xl border border-border/80 bg-surface-container-lowest p-6 sm:p-8 shadow-xs">
        <form onSubmit={handleSave} className="max-w-xl space-y-4 text-xs">
          <div>
            <label className="block font-medium text-muted-foreground">Full Name</label>
            <div className="relative mt-1">
              <User className="text-muted-foreground absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-2xl border border-border/80 bg-surface py-2.5 pr-4 pl-10 text-xs outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-muted-foreground">Email Address</label>
            <div className="relative mt-1">
              <Mail className="text-muted-foreground absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-border/80 bg-surface py-2.5 pr-4 pl-10 text-xs outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-muted-foreground">Phone Number (+91)</label>
            <div className="relative mt-1">
              <Phone className="text-muted-foreground absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-2xl border border-border/80 bg-surface py-2.5 pr-4 pl-10 font-mono text-xs outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-muted-foreground">Favorite Crochet Silhouette</label>
            <select
              value={favoriteCraft}
              onChange={(e) => setFavoriteCraft(e.target.value)}
              className="mt-1 w-full rounded-2xl border border-border/80 bg-surface px-3 py-2.5 text-xs outline-none focus:border-primary"
            >
              <option value="Handbags & Shoulder Bags">Handbags & Shoulder Bags</option>
              <option value="Clutches & Evening Pouches">Clutches & Evening Pouches</option>
              <option value="Chunky Mufflers & Scarves">Chunky Mufflers & Scarves</option>
              <option value="Hair Accessories & Bows">Hair Accessories & Bows</option>
              <option value="Amigurumi Charms">Amigurumi Charms</option>
            </select>
          </div>

          {savedSuccess && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-700">
              <Check className="size-4" />
              <span>Profile preferences successfully updated!</span>
            </div>
          )}

          <div className="pt-2">
            <Button
              type="submit"
              className="rounded-full bg-primary text-xs font-bold text-on-primary shadow-xs hover:bg-primary/90"
            >
              Save Profile Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
