import { test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { writeFileSync } from 'fs';
import { join } from 'path';

test.describe('Accessibility Audit', () => {
  test('homepage accessibility', async ({ page }) => {
    await page.goto('/');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'])
      .analyze();

    // Write results to file for CI/CD scripts
    const resultsPath = join(process.cwd(), '.a11y-results.json');
    writeFileSync(resultsPath, JSON.stringify(accessibilityScanResults, null, 2));

    // Log summary
    console.log(`Accessibility Results: Violations: ${accessibilityScanResults.violations.length}, Passes: ${accessibilityScanResults.passes.length}`);

    // Don't fail the test, just report violations
    if (accessibilityScanResults.violations.length > 0) {
      console.warn('Accessibility violations detected. Check .a11y-results.json for details.');
    }
  });
});
