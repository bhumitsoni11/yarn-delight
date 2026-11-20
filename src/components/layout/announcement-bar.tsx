import { Tag } from "lucide-react"

export function AnnouncementBar() {
  return (
    <div className="bg-secondary/70 border-border/80 text-foreground border-b px-4 py-2 text-xs">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 text-center font-medium">
        <Tag className="text-foreground/70 hidden size-3.5 sm:inline" />
        <span>
          <span className="text-foreground font-semibold">Winter collection is live.</span> Free
          shipping on orders over{" "}
          <strong className="decoration-foreground/30 font-mono tabular-nums underline">
            ₹999
          </strong>{" "}
          • 100% Hand-stitched in India • Use code{" "}
          <span className="bg-primary/20 border-border/60 rounded border px-1.5 py-0.5 font-mono font-bold tracking-wide">
            STITCH10
          </span>{" "}
          for 10% off
        </span>
      </div>
    </div>
  )
}
