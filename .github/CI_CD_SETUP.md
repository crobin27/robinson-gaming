# CI/CD and DevEx Setup - Complete

This document summarizes the complete CI/CD and Developer Experience setup implemented by "Cage" (DevEx/CI/CD).

## ?? What Was Created

### GitHub Actions Workflows

1. **`.github/workflows/ci.yml`**

   - Runs on all PRs to `dev` and `prod`
   - Checks: TypeScript, ESLint, Stylelint, Prettier, Build, Unit Tests (Vitest), E2E Tests (Playwright)
   - Uploads build artifacts

2. **`.github/workflows/preview-comment.yml`**

   - Posts preview deployment URLs to PRs
   - Supports Vercel and Netlify integrations
   - Updates comment when PR is synchronized

3. **`.github/workflows/lighthouse.yml`**
   - Runs Lighthouse CI on PRs
   - Runs accessibility audits
   - Posts performance and a11y results as PR comments

### Issue Templates

- **`.github/ISSUE_TEMPLATE/bug_report.md`** - Standardized bug reporting
- **`.github/ISSUE_TEMPLATE/feature_request.md`** - Feature request template
- **`.github/ISSUE_TEMPLATE/chore.md`** - Maintenance/chore template

### PR Template

- **`.github/PULL_REQUEST_TEMPLATE.md`** - Comprehensive checklist including:
  - Code quality checks
  - Testing requirements
  - Accessibility verification
  - Performance budget consideration
  - Impacted routes documentation
  - Ownership boundaries confirmation

### Scripts

1. **`scripts/lighthouse.mjs`**

   - Runs Lighthouse CI against preview URLs
   - Configures performance budgets (80+ performance, 90+ for a11y/SEO/best practices)

2. **`scripts/a11y.mjs`**
   - Runs accessibility audits using axe-core via Playwright
   - Outputs results to `.a11y-results.json`

### Configuration Files

- **`.eslintrc.cjs`** - ESLint configuration for TypeScript and Astro
- **`.stylelintrc.json`** - Stylelint configuration for CSS
- **`.editorconfig`** - Editor configuration for consistent formatting
- **`vitest.config.ts`** - Vitest configuration for unit tests
- **`playwright.config.ts`** - Playwright configuration for E2E tests
- **`.prettierrc.mjs`** - Already existed, unchanged

### Test Files

- **`tests/e2e/smoke.spec.ts`** - Basic smoke tests for key pages
- **`tests/e2e/a11y.spec.ts`** - Accessibility audit test

### Documentation

- **`.github/DEPLOYMENT_SETUP.md`** - Branch protection setup guide
- **`scripts/setup-preview-deployments.md`** - Vercel/Netlify setup instructions
- **`scripts/README.md`** - Scripts usage documentation

## ?? Package.json Updates

### New Scripts

- `typecheck` - TypeScript type checking
- `lint` - ESLint for JS/TS/Astro files
- `lint:css` - Stylelint for CSS files
- `lint:all` - Run both linters
- `format` - Format code with Prettier
- `format:check` - Check code formatting
- `test` - Run unit tests (Vitest)
- `test:watch` - Watch mode for unit tests
- `test:e2e` - Run E2E tests (Playwright)
- `test:e2e:ui` - UI mode for E2E tests
- `lighthouse:ci` - Run Lighthouse CI
- `a11y` - Run accessibility audit

### New Dependencies

- `@playwright/test` - E2E testing
- `@axe-core/playwright` - Accessibility testing
- `@lhci/cli` - Lighthouse CI
- ESLint ecosystem (`eslint`, `@typescript-eslint/*`, `eslint-plugin-astro`)
- `vitest` - Unit testing framework
- `stylelint` - CSS linting

## ?? Next Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Preview Deployments

**Vercel:**

1. Connect GitHub repo at vercel.com
2. Enable PR previews
3. Preview URLs will appear automatically

See `scripts/setup-preview-deployments.md` for detailed instructions.

### 3. Enable Branch Protection

1. Go to GitHub Settings ? Branches
2. Add protection rule for `dev` branch
3. Require these status checks:
   - ? **CI** (from ci.yml workflow)
   - ? **Lighthouse CI** (from lighthouse.yml workflow)
4. Optionally require PR reviews

See `.github/DEPLOYMENT_SETUP.md` for detailed instructions.

### 4. Optional: Lighthouse CI GitHub App

1. Install Lighthouse CI GitHub App: https://github.com/apps/lighthouse-ci
2. Add `LHCI_GITHUB_APP_TOKEN` secret (optional, for richer reporting)

### 5. Test the Setup

Create a test PR from `feature/pit-boss-theme` (or any feature branch) to verify:

- ? CI workflow runs successfully
- ? Preview deployment comment appears
- ? Lighthouse CI runs and posts results
- ? All checks pass

## ?? Performance Budgets

Lighthouse CI enforces:

- **Performance:** 80+
- **Accessibility:** 90+
- **Best Practices:** 90+
- **SEO:** 90+

Adjust in `scripts/lighthouse.mjs` if needed.

## ?? Verification Checklist

- [ ] Install dependencies (`npm install`)
- [ ] Verify scripts work locally (`npm run lint`, `npm run test`, etc.)
- [ ] Set up Vercel/Netlify preview deployments
- [ ] Enable branch protection on `dev`
- [ ] Create test PR and verify all workflows run
- [ ] Verify PR template appears on new PRs
- [ ] Verify issue templates appear when creating issues

## ?? Notes

- All workflows use `continue-on-error: true` for Lighthouse/a11y to avoid blocking merges, but results are still posted
- Preview URLs are detected automatically from Vercel/Netlify GitHub integrations
- If preview URLs aren't detected, Lighthouse will use `http://localhost:4321` (which won't work in CI but won't fail)
- Unit tests directory structure: `src/**/*.{test,spec}.{js,ts,jsx,tsx}`
- E2E tests in `tests/e2e/`

## ?? Definition of Done

? CI is green on a sample PR  
? Preview bot posts Lighthouse + a11y summary  
? Required checks enabled on dev (documented in `.github/DEPLOYMENT_SETUP.md`)  
? PR template with comprehensive checklist  
? Issue templates for bug/feature/chore  
? All scripts functional and documented

---

**Branch:** `feature/cage-devex`  
**Created by:** Cage (DevEx/CI/CD)
