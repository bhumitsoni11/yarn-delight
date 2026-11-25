import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { MOCK_ORDERS } from "@/data/mock-data"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Truck, Package, Printer, Clock, CheckCircle2 } from "lucide-react"

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const order = MOCK_ORDERS.find((o) => o.id === id) || MOCK_ORDERS[0]

  if (!order) {
    notFound()
  }

  return (
    <div className="space-y-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/account/orders"
          className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-on-surface"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to All Orders</span>
        </Link>
        <span className="font-mono text-xs text-muted-foreground">
          Ordered on {new Date(order.createdAt).toLocaleDateString("en-IN", { dateStyle: "long" })}
        </span>
      </div>

      {/* Invoice Overview Card */}
      <div className="rounded-3xl border border-border/80 bg-surface-container-lowest p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col justify-between gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-center">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
              Tax Invoice & Receipt
            </span>
            <h1 className="font-mono text-xl font-bold text-on-surface">{order.referenceId}</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-primary-container px-3 py-1 font-mono text-xs font-bold uppercase text-on-primary-container">
              {order.status}
            </span>
            <Link href={`/track-order?id=${order.referenceId}`}>
              <Button
                size="sm"
                className="rounded-full bg-primary text-xs font-bold text-on-primary shadow-xs"
              >
                Track Live
              </Button>
            </Link>
          </div>
        </div>

        {/* Shipping & Payment Meta */}
        <div className="mt-6 grid grid-cols-1 gap-6 border-b border-border/60 pb-6 sm:grid-cols-3 text-xs">
          <div>
            <span className="font-bold text-on-surface">Recipient Details:</span>
            <p className="mt-1 font-medium">{order.customerName}</p>
            <p className="text-muted-foreground">{order.customerPhone}</p>
            <p className="text-muted-foreground">{order.customerEmail}</p>
          </div>
          <div>
            <span className="font-bold text-on-surface">Delivery Address:</span>
            <p className="mt-1 text-muted-foreground">{order.shippingAddress.street}</p>
            <p className="text-muted-foreground">
              {order.shippingAddress.city}, {order.shippingAddress.state} –{" "}
              {order.shippingAddress.postalCode}
            </p>
          </div>
          <div>
            <span className="font-bold text-on-surface">Payment Method:</span>
            <p className="mt-1 font-medium capitalize">
              {order.paymentMethod.replace("_", " ").toUpperCase()}
            </p>
            <p className="text-emerald-700">Payment captured via Razorpay</p>
          </div>
        </div>

        {/* Itemized Table */}
        <div className="mt-6">
          <h2 className="font-heading text-sm font-bold text-on-surface mb-3">Itemized Pieces</h2>
          <div className="divide-y divide-border/60">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center gap-4 py-3">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-xl border border-border/60 bg-surface">
                  {item.imageUrl && (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="truncate text-xs font-bold text-on-surface">{item.title}</h3>
                  {item.color && (
                    <p className="text-[11px] text-muted-foreground">Color: {item.color}</p>
                  )}
                  <p className="font-mono text-xs text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <span className="font-mono text-xs font-bold tabular-nums text-on-surface">
                  ₹{((item.pricePaise * item.quantity) / 100).toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t border-border/60 pt-4 flex justify-between font-mono text-sm font-bold text-on-surface">
            <span>Total Paid (INR)</span>
            <span className="text-base text-primary">
              ₹{(order.totalPaise / 100).toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
