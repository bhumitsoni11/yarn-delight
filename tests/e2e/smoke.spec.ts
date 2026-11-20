import { test, expect } from "@playwright/test"

test.describe("Next.js Storefront E2E Suite", () => {
  test("loads the storefront and renders navigation, hero, and catalog", async ({ page }) => {
    await page.goto("/")

    // Verify page title
    await expect(page).toHaveTitle(/Crochet Store/)

    // Verify main brand presence
    await expect(page.getByText("Yarn Delight").first()).toBeVisible()

    // Verify main hero heading
    const heading = page.getByRole("heading", { name: /wearable art/i, level: 1 })
    await expect(heading).toBeVisible()

    // Verify primary shopping CTA
    const ctaButton = page.getByRole("button", { name: /shop new drops/i })
    await expect(ctaButton).toBeVisible()
  })
})
