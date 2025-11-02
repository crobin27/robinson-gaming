#!/usr/bin/env node
/**
 * Accessibility Audit Script
 * Runs axe-core accessibility checks against preview URLs
 */

import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Get preview URL from environment or use default
const previewUrl = process.env.PREVIEW_URL || process.env.VERCEL_URL || process.env.NETLIFY_URL || 'http://localhost:4321';

console.log(`? Running accessibility audit against: ${previewUrl}`);

try {
  // Run Playwright a11y test
  try {
    execSync(`npx playwright test tests/e2e/a11y.spec.ts --reporter=list`, {
      stdio: 'inherit',
      cwd: rootDir,
      env: {
        ...process.env,
        PREVIEW_URL: previewUrl,
      },
    });
  } catch (testError) {
    // Test may fail if violations exist, but we want the results file
    console.log('Accessibility test completed (checking for results...)');
  }

  // Read and summarize results
  const resultsPath = join(rootDir, '.a11y-results.json');
  if (existsSync(resultsPath)) {
    try {
      const results = JSON.parse(readFileSync(resultsPath, 'utf-8'));
      
      console.log(`\n?? Accessibility Results:`);
      console.log(`   Violations: ${results.violations?.length || 0}`);
      console.log(`   Passes: ${results.passes?.length || 0}`);
      console.log(`   Incomplete: ${results.incomplete?.length || 0}`);
      
      if (results.violations && results.violations.length > 0) {
        console.log(`\n??  Top accessibility violations:`);
        results.violations.slice(0, 10).forEach((violation, idx) => {
          console.log(`   ${idx + 1}. ${violation.id}: ${violation.description}`);
          if (violation.nodes && violation.nodes.length > 0) {
            console.log(`      Affects ${violation.nodes.length} element(s)`);
          }
        });
        if (results.violations.length > 10) {
          console.log(`   ... and ${results.violations.length - 10} more violations`);
        }
        console.log(`\n   Full report saved to: .a11y-results.json`);
      } else {
        console.log(`\n? No accessibility violations found!`);
      }
    } catch (readError) {
      console.warn('Could not read accessibility results:', readError.message);
    }
  } else {
    console.warn('Accessibility results file not found. Test may not have run successfully.');
    console.warn('Ensure the a11y test writes results to .a11y-results.json');
  }

  console.log('? Accessibility audit completed');
  process.exit(0);
} catch (error) {
  console.error('? Accessibility audit failed:', error.message);
  // Don't fail the build, but log the error
  process.exit(0);
}
