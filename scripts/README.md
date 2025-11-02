# Scripts Directory

This directory contains development and CI/CD scripts for the project.

## Scripts

### `lighthouse.mjs`

Runs Lighthouse CI against a preview URL to check performance, accessibility, SEO, and best practices.

**Usage:**

```bash
npm run lighthouse:ci
```

**Environment Variables:**

- `PREVIEW_URL` - The preview URL to test (default: `http://localhost:4321`)
- `VERCEL_URL` - Alternative: Vercel preview URL
- `NETLIFY_URL` - Alternative: Netlify preview URL
- `LHCI_GITHUB_APP_TOKEN` - Optional: GitHub App token for enhanced reporting

**Output:**

- Results stored in `.lighthouseci/`
- Configuration written to `lighthouserc.json`

### `a11y.mjs`

Runs accessibility audits using axe-core via Playwright.

**Usage:**

```bash
npm run a11y
```

**Environment Variables:**

- `PREVIEW_URL` - The preview URL to test (default: `http://localhost:4321`)
- `VERCEL_URL` - Alternative: Vercel preview URL
- `NETLIFY_URL` - Alternative: Netlify preview URL

**Output:**

- Results stored in `.a11y-results.json`
- Test file generated at `tests/e2e/a11y.spec.ts`

## Integration

These scripts are automatically run by GitHub Actions workflows:

- `ci.yml` - Runs during PR checks
- `lighthouse.yml` - Runs Lighthouse and accessibility audits on PRs
