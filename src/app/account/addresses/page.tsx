"use client"

import { useState } from "react"
import { MOCK_ADDRESSES, MockAddress } from "@/data/mock-data"
import { Button } from "@/components/ui/button"
import { MapPin, Plus, Check, Trash2, Edit2, Home, Briefcase } from "lucide-react"

export default function AccountAddressesPage() {
  const [addresses, setAddresses] = useState<MockAddress[]>(MOCK_ADDRESSES)
  const [showAddModal, setShowAddModal] = useState(false)

  // New address form state
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [street, setStreet] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("Karnataka")
  const [postalCode, setPostalCode] = useState("")
  const [type, setType] = useState<"home" | "work">("home")

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    )
  }

  const handleDelete = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id))
  }

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault()
    const newAddr: MockAddress = {
      id: `addr-${Date.now()}`,
      name,
      phone,
      street,
      city,
      state,
      postalCode,
      type,
      isDefault: addresses.length === 0,
    }
    setAddresses([...addresses, newAddr])
    setShowAddModal(false)
    setName("")
    setPhone("")
    setStreet("")
    setCity("")
    setPostalCode("")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 border-b border-border/60 pb-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-on-surface">
            Delivery Addresses
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Manage your verified Indian shipping destinations for doorstep delivery.
          </p>
        </div>
        <Button
          onClick={() => setShowAddModal(true)}
          size="sm"
          className="rounded-full bg-primary text-xs font-bold text-on-primary shadow-xs"
        >
          <Plus className="size-3.5" />
          <span>Add New Address</span>
        </Button>
      </div>

      {/* Addresses Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`flex flex-col justify-between rounded-3xl border p-5 transition-all ${
              addr.isDefault
                ? "border-primary bg-primary-container/10 ring-1 ring-primary shadow-xs"
                : "border-border/80 bg-surface-container-lowest"
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-bold text-on-surface">
                  {addr.type === "home" ? <Home className="size-3.5" /> : <Briefcase className="size-3.5" />}
                  {addr.name}
                </span>
                {addr.isDefault && (
                  <span className="rounded-full bg-primary-container px-2 py-0.5 font-mono text-[10px] font-bold text-on-primary-container">
                    Default
                  </span>
                )}
              </div>

              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{addr.street}</p>
              <p className="text-xs text-muted-foreground">
                {addr.city}, {addr.state} – {addr.postalCode}
              </p>
              <p className="mt-2 font-mono text-[11px] text-on-surface">Phone: {addr.phone}</p>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 text-xs">
              {!addr.isDefault ? (
                <button
                  onClick={() => handleSetDefault(addr.id)}
                  className="font-semibold text-primary underline hover:text-on-surface"
                >
                  Set as default
                </button>
              ) : (
                <span className="text-[11px] font-semibold text-emerald-700">Primary delivery hub</span>
              )}

              <button
                onClick={() => handleDelete(addr.id)}
                className="text-muted-foreground transition-colors hover:text-rose-600"
                title="Delete address"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Address Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl border border-border bg-surface p-6 shadow-2xl">
            <h2 className="font-heading text-lg font-bold text-on-surface">Add Delivery Address</h2>
            <form onSubmit={handleAddAddress} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-medium text-muted-foreground">Recipient Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  className="mt-1 w-full rounded-xl border border-border/80 bg-surface px-3 py-2 outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block font-medium text-muted-foreground">Phone (+91)</label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit mobile"
                  className="mt-1 w-full rounded-xl border border-border/80 bg-surface px-3 py-2 font-mono outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block font-medium text-muted-foreground">Street & Landmark</label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="Flat/House, building, street"
                  className="mt-1 w-full rounded-xl border border-border/80 bg-surface px-3 py-2 outline-none focus:border-primary"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-medium text-muted-foreground">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    className="mt-1 w-full rounded-xl border border-border/80 bg-surface px-3 py-2 outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block font-medium text-muted-foreground">PIN Code</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="6-digit PIN"
                    className="mt-1 w-full rounded-xl border border-border/80 bg-surface px-3 py-2 font-mono outline-none focus:border-primary"
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 rounded-full text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 rounded-full bg-primary text-xs font-bold text-on-primary shadow-xs"
                >
                  Save Address
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
