import { test, expect } from "@playwright/test";

test.describe("Smoke Tests", () => {
  test("homepage loads", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Robinson Gaming/i);
  });

  test("navigation works", async ({ page }) => {
    await page.goto("/");

    // Check that main navigation elements are present
    const nav = page.locator("nav");
    await expect(nav).toBeVisible();
  });

  test("about page loads", async ({ page }) => {
    await page.goto("/about");
    await expect(page).toHaveTitle(/about/i);
  });

  test("photography page loads", async ({ page }) => {
    await page.goto("/photography");
    await expect(page).toHaveTitle(/photography/i);
  });
});
