import { test, expect } from "@playwright/test"

test.describe("Next.js Application Smoke Suite", () => {
  test("loads the application and renders the foundation landing page", async ({ page }) => {
    await page.goto("/")

    // Verify page title
    await expect(page).toHaveTitle(/Crochet Store/)

    // Verify main heading
    const heading = page.getByRole("heading", { name: "Crochet Store", level: 1 })
    await expect(heading).toBeVisible()

    // Verify status button indicator
    const statusButton = page.getByRole("button", { name: "Infrastructure Ready" })
    await expect(statusButton).toBeVisible()
  })
})
