# Preview Deployment Setup Guide

This document outlines the steps to set up automatic preview deployments for pull requests.

## Vercel Setup

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New..." ? "Project"
3. Import your GitHub repository
4. Configure project settings:
   - **Framework Preset:** Astro
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm ci`
5. Enable "Automatically assign Preview Deployment URLs to every Pull Request"
6. Vercel will automatically create preview deployments for each PR

### Required Secrets
- No additional secrets required for basic setup
- Vercel GitHub App integration handles authentication automatically

### Required Secrets
- No additional secrets required for basic setup
- Netlify GitHub App integration handles authentication automatically

## GitHub Actions Integration

The `preview-comment.yml` workflow will automatically detect and post preview URLs from:
- Vercel (via GitHub App integration)

If you need to manually specify a preview URL, you can set it as an environment variable in your workflow or add it to the PR description.

## Lighthouse CI Setup

To enable Lighthouse CI comments on PRs:

1. Install Lighthouse CI GitHub App: https://github.com/apps/lighthouse-ci
2. Authorize it for your repository
3. Add `LHCI_GITHUB_APP_TOKEN` secret to your repository (optional, for richer reporting)

The Lighthouse CI workflow will run automatically on PRs and post results as comments.

## Troubleshooting

### Preview URLs not appearing
- Verify GitHub App integration is enabled for Vercel/Netlify
- Check that preview deployments are enabled in your hosting provider settings
- Ensure the `preview-comment.yml` workflow has permission to write comments

### Lighthouse CI not running
- Check that `PREVIEW_URL` environment variable is set
- Verify Lighthouse CI dependencies are installed (`@lhci/cli`)
- Review workflow logs for specific error messages
