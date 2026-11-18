import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import HomePage from "@/app/page"
import { Button } from "@/components/ui/button"

describe("Foundation Smoke Tests", () => {
  it("renders the Button component with text", () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument()
  })

  it("renders the HomePage foundation heading", () => {
    render(<HomePage />)
    expect(screen.getByRole("heading", { name: /crochet store/i, level: 1 })).toBeInTheDocument()
    expect(screen.getByText(/infrastructure ready/i)).toBeInTheDocument()
  })
})
