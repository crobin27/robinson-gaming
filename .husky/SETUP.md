# Git Hooks Setup Guide

## Overview

This project uses Husky to enforce code quality checks before commits and pushes. This helps catch issues early and ensures all code pushed to the repository meets quality standards.

## What Gets Checked

### Pre-commit Hook

Runs before every commit:

- ✅ Code formatting (Prettier)
- ✅ Linting (ESLint + Stylelint)

### Pre-push Hook

Runs before every push:

- ✅ TypeScript type checking
- ✅ All linting checks
- ✅ Unit tests (Vitest)
- ✅ E2E tests (Playwright)

## First-Time Setup

After cloning the repository or pulling these changes, run:

```bash
# Install all dependencies (includes Husky)
npm install

# Install Playwright browsers for E2E tests
npx playwright install

# Verify installation
npm run test:all
```

## Troubleshooting

### Playwright Browser Installation Issues

If you see errors about missing browser executables, run:

```bash
npx playwright install --with-deps
```

Or install specific browsers:

```bash
npx playwright install chromium
npx playwright install firefox
npx playwright install webkit
```

### Hooks Not Running

If hooks aren't executing, ensure they're executable:

```bash
chmod +x .husky/pre-commit
chmod +x .husky/pre-push
```

Or on Windows with Git Bash:

```bash
git update-index --chmod=+x .husky/pre-commit
git update-index --chmod=+x .husky/pre-push
```

### Skipping Hooks (Emergency Only)

If you absolutely need to skip hooks (not recommended):

```bash
git commit --no-verify -m "your message"
git push --no-verify
```

**Note**: Only skip hooks when absolutely necessary, as this bypasses quality checks.

## Manual Testing

Run all checks manually without committing:

```bash
# Run all checks
npm run test:all

# Or run individually
npm run format:check
npm run lint:all
npm run typecheck
npm run test
npm run test:e2e
```

## Debugging E2E Tests

For interactive debugging of E2E tests:

```bash
npm run test:e2e:ui
```

This opens the Playwright UI for step-by-step test execution and debugging.
