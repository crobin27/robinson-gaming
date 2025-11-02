# Required GitHub Branch Protection Checks

To make every PR shippable, enable the following required checks on the `dev` branch:

## How to Enable Branch Protection

1. Go to your repository on GitHub
2. Navigate to **Settings** ? **Branches**
3. Under **Branch protection rules**, add or edit the rule for `dev`
4. Enable the following:

### Required Status Checks

Enable these checks to be required before merging:

- ? **CI** (from `.github/workflows/ci.yml`)

  - Ensures: typecheck, lint, format, build, unit tests, E2E tests all pass

- ? **Lighthouse CI** (from `.github/workflows/lighthouse.yml`)

  - Ensures: Performance, accessibility, SEO, and best practices meet thresholds

- ?? **Preview Deployment Comment** (from `.github/workflows/preview-comment.yml`)
  - Optional: Information only, doesn't block merges

### Additional Branch Protection Settings

- ? Require pull request reviews before merging (recommended: 1 approval)
- ? Require status checks to pass before merging
- ? Require conversation resolution before merging (optional but recommended)
- ? Do not allow bypassing the above settings

## Expected Workflow

When a PR is created:

1. **CI workflow** runs and checks:

   - TypeScript type checking
   - ESLint code linting
   - Prettier format checking
   - Astro build
   - Unit tests (Vitest)
   - E2E smoke tests (Playwright)

2. **Preview Deployment** workflow:

   - Posts preview URL information (if Vercel/Netlify is configured)
   - Updates comment when PR is updated

3. **Lighthouse CI** workflow:
   - Runs performance audit on preview URL
   - Runs accessibility audit
   - Posts results as PR comment

## Performance Budgets

Lighthouse CI enforces these minimum scores:

- **Performance:** 80+ (can be adjusted in `scripts/lighthouse.mjs`)
- **Accessibility:** 90+ (WCAG 2.1 AA)
- **Best Practices:** 90+
- **SEO:** 90+

Adjust thresholds in `scripts/lighthouse.mjs` if needed for your project.
