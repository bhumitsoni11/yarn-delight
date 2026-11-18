import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="border-border bg-card max-w-md space-y-4 rounded-2xl border p-8 shadow-sm">
        <h1 className="font-heading text-foreground text-3xl font-bold tracking-tight">
          Crochet Store
        </h1>
        <p className="text-muted-foreground text-sm">
          Technical foundation and infrastructure initialized. Platform architecture is ready for
          storefront and administration development.
        </p>
        <div className="pt-2">
          <Button variant="default">Infrastructure Ready</Button>
        </div>
      </div>
    </main>
  )
}
