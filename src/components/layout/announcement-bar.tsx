import { Sparkles } from "lucide-react"

export function AnnouncementBar() {
  return (
    <div className="bg-secondary/80 border-border/60 text-foreground border-b px-4 py-2 text-xs transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 text-center font-medium">
        <Sparkles className="text-primary-foreground hidden size-3.5 animate-pulse sm:inline" />
        <span>
          <span className="text-text font-semibold">Winter Drops Are Live!</span> Free Shipping on
          orders over <strong className="decoration-primary underline">₹999</strong> • 100%
          Hand-Stitched in India • Use code{" "}
          <span className="bg-primary/30 rounded px-1.5 py-0.5 font-mono font-bold tracking-wide">
            STITCH10
          </span>{" "}
          for 10% OFF
        </span>
        <Sparkles className="text-primary-foreground hidden size-3.5 animate-pulse sm:inline" />
      </div>
    </div>
  )
}
