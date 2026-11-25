"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Bell, Lock, Shield, Check } from "lucide-react"

export default function AccountSettingsPage() {
  const [whatsappUpdates, setWhatsappUpdates] = useState(true)
  const [emailNewsletter, setEmailNewsletter] = useState(true)
  const [smsDelivery, setSmsDelivery] = useState(true)
  const [statusMsg, setStatusMsg] = useState("")

  const handleSaveNotifications = () => {
    setStatusMsg("Notification preferences updated.")
    setTimeout(() => setStatusMsg(""), 3000)
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-border/60 pb-4">
        <h1 className="font-heading text-2xl font-bold tracking-tight text-on-surface">
          Account Settings & Security
        </h1>
        <p className="mt-1 text-xs text-muted-foreground">
          Configure notification dispatch, change passwords, and manage privacy settings.
        </p>
      </div>

      {/* Notifications Section */}
      <div className="rounded-3xl border border-border/80 bg-surface-container-lowest p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 border-b border-border/60 pb-3">
          <Bell className="size-4 text-primary" />
          <h2 className="font-heading text-base font-bold text-on-surface">
            Dispatch & Milestone Alerts
          </h2>
        </div>

        <div className="mt-4 space-y-3 text-xs">
          <label className="flex cursor-pointer items-center justify-between p-2 rounded-xl hover:bg-surface-container-low">
            <div>
              <p className="font-bold text-on-surface">WhatsApp Dispatch Alerts</p>
              <p className="text-[11px] text-muted-foreground">
                Receive photos when your artisan finishes stitching and when courier is out for delivery.
              </p>
            </div>
            <input
              type="checkbox"
              checked={whatsappUpdates}
              onChange={(e) => setWhatsappUpdates(e.target.checked)}
              className="size-4 rounded accent-primary cursor-pointer"
            />
          </label>

          <label className="flex cursor-pointer items-center justify-between p-2 rounded-xl hover:bg-surface-container-low">
            <div>
              <p className="font-bold text-on-surface">Small-Batch Seasonal Drop Previews</p>
              <p className="text-[11px] text-muted-foreground">
                Get notified 2 hours before limited-edition crochet collections go live.
              </p>
            </div>
            <input
              type="checkbox"
              checked={emailNewsletter}
              onChange={(e) => setEmailNewsletter(e.target.checked)}
              className="size-4 rounded accent-primary cursor-pointer"
            />
          </label>

          <label className="flex cursor-pointer items-center justify-between p-2 rounded-xl hover:bg-surface-container-low">
            <div>
              <p className="font-bold text-on-surface">SMS OTP & Courier Verification</p>
              <p className="text-[11px] text-muted-foreground">
                Important delivery pin codes sent via SMS.
              </p>
            </div>
            <input
              type="checkbox"
              checked={smsDelivery}
              onChange={(e) => setSmsDelivery(e.target.checked)}
              className="size-4 rounded accent-primary cursor-pointer"
            />
          </label>
        </div>

        {statusMsg && (
          <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-700">
            <Check className="size-4" />
            <span>{statusMsg}</span>
          </div>
        )}

        <div className="mt-4 border-t border-border/60 pt-3">
          <Button
            onClick={handleSaveNotifications}
            size="sm"
            className="rounded-full bg-primary text-xs font-bold text-on-primary shadow-xs"
          >
            Save Preferences
          </Button>
        </div>
      </div>

      {/* Security Section */}
      <div className="rounded-3xl border border-border/80 bg-surface-container-lowest p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 border-b border-border/60 pb-3">
          <Lock className="size-4 text-primary" />
          <h2 className="font-heading text-base font-bold text-on-surface">Password & Security</h2>
        </div>

        <div className="mt-4 max-w-sm space-y-3 text-xs">
          <div>
            <label className="block text-muted-foreground">Current Password</label>
            <input
              type="password"
              placeholder="••••••••••••"
              className="mt-1 w-full rounded-xl border border-border/80 bg-surface px-3 py-2 outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-muted-foreground">New Password</label>
            <input
              type="password"
              placeholder="••••••••••••"
              className="mt-1 w-full rounded-xl border border-border/80 bg-surface px-3 py-2 outline-none focus:border-primary"
            />
          </div>
          <Button size="sm" variant="outline" className="rounded-full text-xs font-semibold">
            Update Password
          </Button>
        </div>
      </div>
    </div>
  )
}
