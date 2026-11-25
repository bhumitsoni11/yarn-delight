import { Truck, ShieldCheck, Heart, RotateCcw } from "lucide-react"

const TRUST_ITEMS = [
  {
    icon: Truck,
    title: "Free Pan-India Delivery",
    desc: "Fast express shipping on all orders above ₹999 via Shiprocket",
  },
  {
    icon: Heart,
    title: "100% Handcrafted in India",
    desc: "Lovingly hooked by independent female artisans across Gujarat",
  },
  {
    icon: ShieldCheck,
    title: "Secure UPI & Razorpay",
    desc: "256-bit SSL encrypted. Google Pay, PhonePe, Cards & Netbanking",
  },
  {
    icon: RotateCcw,
    title: "7-Day Exchange Guarantee",
    desc: "Hassle-free size and damage replacements guaranteed",
  },
]

export function TrustSignals() {
  return (
    <section className="bg-surface-container-low/40 border-border border-y py-12">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_ITEMS.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={index}
                className="bg-surface-container-lowest border-border/80 hover:border-primary/40 flex items-start gap-3.5 rounded-2xl border p-4.5 shadow-xs transition-colors"
              >
                <div className="bg-primary-container/40 text-primary flex size-10 shrink-0 items-center justify-center rounded-xl">
                  <Icon className="size-5" />
                </div>
                <div>
                  <h4 className="font-heading text-on-surface text-sm font-semibold">
                    {item.title}
                  </h4>
                  <p className="text-muted-foreground mt-0.5 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
