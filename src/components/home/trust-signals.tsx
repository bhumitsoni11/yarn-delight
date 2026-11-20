import { Truck, ShieldCheck, Heart, RotateCcw } from "lucide-react"

const TRUST_ITEMS = [
  {
    icon: Truck,
    title: "Free Pan-India Delivery",
    desc: "Fast express shipping on all orders above ₹999",
  },
  {
    icon: Heart,
    title: "100% Hand-Crocheted",
    desc: "Lovingly crafted by independent women artisans across India",
  },
  {
    icon: ShieldCheck,
    title: "Secure UPI & Razorpay",
    desc: "Google Pay, PhonePe, Cards, Netbanking & COD support",
  },
  {
    icon: RotateCcw,
    title: "Easy 7-Day Exchange",
    desc: "Hassle-free size and damage replacements guaranteed",
  },
]

export function TrustSignals() {
  return (
    <section className="bg-surface border-border/80 border-y py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_ITEMS.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={index}
                className="bg-background/50 border-border/60 hover:border-primary/50 flex items-start gap-3.5 rounded-2xl border p-4 transition-colors"
              >
                <div className="bg-primary/20 text-text flex size-10 shrink-0 items-center justify-center rounded-xl">
                  <Icon className="text-text size-5" />
                </div>
                <div>
                  <h4 className="font-heading text-foreground text-sm font-bold">{item.title}</h4>
                  <p className="text-muted-foreground mt-0.5 text-xs leading-snug">{item.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
