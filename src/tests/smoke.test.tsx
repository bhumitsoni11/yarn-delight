import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import HomePage from "@/app/page"
import { Button } from "@/components/ui/button"

describe("Storefront Component Tests", () => {
  it("renders the Button component with text", () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument()
  })

  it("renders the storefront navigation, hero heading, and catalog", () => {
    render(<HomePage />)
    // Brand title in navbar and footer
    expect(screen.getAllByText(/yarn delight/i).length).toBeGreaterThan(0)
    // Hero main heading
    expect(screen.getByRole("heading", { name: /wearable art/i, level: 1 })).toBeInTheDocument()
    // Call to action button
    expect(screen.getByRole("button", { name: /shop new drops/i })).toBeInTheDocument()
  })
})
