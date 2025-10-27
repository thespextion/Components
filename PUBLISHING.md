# Publishing Guide

This package is published to **npm** registry.

## Prerequisites

1. **npm Account**: You need an npm account with publish permissions for `@spextion` organization
2. **npm Token**: Classic Token with "Automation" type for GitHub Actions

## Automated Publishing (Recommended)

The repository includes a GitHub Actions workflow that automatically publishes to npm when you create a release.

### Setup (One-time):

**1. Create npm Access Token:**
   - Go to: https://www.npmjs.com/settings/YOUR_USERNAME/tokens
   - Click **"Generate New Token"** → **"Classic Token"**
   - Select type: **"Automation"**
   - Name it: `github-actions-components`
   - Copy the token immediately

**2. Add npm Token to GitHub Secrets:**
   - Go to: https://github.com/thespextion/Components/settings/secrets/actions
   - Click **"New repository secret"**
   - Name: `NPM_TOKEN`
   - Value: Paste your npm token
   - Click **"Add secret"**

### Publishing a New Version:

**1. Update version:**
```bash
npm version patch  # 0.1.0 → 0.1.1
npm version minor  # 0.1.0 → 0.2.0
npm version major  # 0.1.0 → 1.0.0
```

**2. Push changes:**
```bash
git push && git push --tags
```

**3. Create a GitHub Release:**
   - Go to: https://github.com/thespextion/Components/releases/new
   - Select the tag you just pushed (e.g., `v0.1.1`)
   - **Release title**: `Release v0.1.1`
   - **Description**: Describe what's new
   - Click **"Publish release"**

**4. Done!**
   - The workflow automatically builds and publishes to npm
   - Check workflow status: https://github.com/thespextion/Components/actions

---

## Manual Publishing

If you need to publish manually:

```bash
# Login to npm
npm login

# Build the package
npm run build

# Publish to npm
npm publish
```

---

## Installation by Users

Users can install your package with:

```bash
npm install @spextion/components
# or
yarn add @spextion/components
# or
pnpm add @spextion/components
```

---

## Usage Example

```tsx
import { ThreeDButton, ThreeDButtonGroup } from '@spextion/components';

function App() {
  return (
    <>
      <ThreeDButton variant="ai" size="lg" leadingIcon="star">
        Click me
      </ThreeDButton>

      <ThreeDButtonGroup>
        <ThreeDButton variant="default">One</ThreeDButton>
        <ThreeDButton variant="outline">Two</ThreeDButton>
      </ThreeDButtonGroup>
    </>
  );
}
```

---

## Troubleshooting

**Build errors**:
- Run `npm run build` locally first to catch any issues

**Authentication errors**:
- Make sure `NPM_TOKEN` secret is valid and has correct permissions
- Check you're a member of `@spextion` organization on npm

**Version conflicts**:
- Ensure you've bumped the version number before publishing
- You cannot republish the same version

**Workflow not running**:
- Make sure you created a **Release**, not just a tag
- Check Actions tab for workflow runs and errors

---

## Package URLs

- **npm**: https://www.npmjs.com/package/@spextion/components
- **GitHub**: https://github.com/thespextion/Components
- **Issues**: https://github.com/thespextion/Components/issues
