import { Tag } from "lucide-react"

export function AnnouncementBar() {
  return (
    <div className="bg-secondary-container/70 border-border/80 text-on-surface border-b px-4 py-2 text-xs">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 text-center font-medium">
        <Tag className="text-primary hidden size-3.5 sm:inline" />
        <span>
          <span className="text-primary font-semibold">Handcrafted with love in India.</span>{" "}
          Pan-India free delivery on orders over{" "}
          <strong className="decoration-primary/40 font-mono tabular-nums underline">₹999</strong> •
          Custom slots open for season • Use code{" "}
          <span className="bg-primary-container/60 border-primary/30 text-on-primary-container rounded border px-1.5 py-0.5 font-mono font-bold tracking-wide">
            STITCH10
          </span>{" "}
          for 10% off
        </span>
      </div>
    </div>
  )
}
