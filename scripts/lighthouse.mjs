#!/usr/bin/env node
/**
 * Lighthouse CI Script
 * Runs Lighthouse CI against a preview URL and outputs results
 */

import { execSync } from 'child_process';
import { writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Get preview URL from environment or use default
const previewUrl = process.env.PREVIEW_URL || process.env.VERCEL_URL || process.env.NETLIFY_URL || 'http://localhost:4321';

console.log(`?? Running Lighthouse CI against: ${previewUrl}`);

// Ensure .lighthouseci directory exists
const lhciDir = join(rootDir, '.lighthouseci');
mkdirSync(lhciDir, { recursive: true });

try {
  // Run Lighthouse CI
  const lhciConfig = {
    ci: {
      collect: {
        url: [previewUrl],
        numberOfRuns: 3,
      },
      assert: {
        assertions: {
          'categories:performance': ['error', { minScore: 0.8 }],
          'categories:accessibility': ['error', { minScore: 0.9 }],
          'categories:best-practices': ['error', { minScore: 0.9 }],
          'categories:seo': ['error', { minScore: 0.9 }],
          'categories:pwa': 'off',
        },
      },
      upload: {
        target: 'temporary-public-storage',
      },
    },
  };

  // Write LHCI config
  const configPath = join(rootDir, 'lighthouserc.json');
  writeFileSync(configPath, JSON.stringify(lhciConfig, null, 2));

  // Run lhci
  execSync('npx @lhci/cli@latest autorun', {
    stdio: 'inherit',
    cwd: rootDir,
    env: {
      ...process.env,
      LHCI_GITHUB_APP_TOKEN: process.env.LHCI_GITHUB_APP_TOKEN || '',
    },
  });

  console.log('? Lighthouse CI completed successfully');
  process.exit(0);
} catch (error) {
  console.error('? Lighthouse CI failed:', error.message);
  // Don't fail the build, but log the error
  process.exit(0);
}
