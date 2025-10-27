# Publishing Guide

This package is configured to publish to both **npm** and **GitHub Packages**.

## Prerequisites

1. **npm Account**: You need an npm account with publish permissions
2. **GitHub Account**: You need access to the `thespextion` GitHub organization
3. **Tokens**:
   - npm token (for npm registry)
   - GitHub token (automatically provided in GitHub Actions)

## Manual Publishing

### Publish to npm only:
```bash
npm login
npm run build
npm publish --registry https://registry.npmjs.org/
```

### Publish to GitHub Packages only:
```bash
export GITHUB_TOKEN=your_github_token
npm run build
npm publish --registry https://npm.pkg.github.com/
```

### Publish to both registries:
```bash
# First, login to npm
npm login

# Build the package
npm run build

# Publish to npm
npm publish --registry https://registry.npmjs.org/

# Publish to GitHub Packages (requires GITHUB_TOKEN environment variable)
export GITHUB_TOKEN=your_github_token
npm publish --registry https://npm.pkg.github.com/
```

## Automated Publishing (Recommended)

The repository includes a GitHub Actions workflow that automatically publishes to both registries when you create a release.

### Setup:

1. **Add npm token to GitHub Secrets:**
   - Go to your repository settings
   - Navigate to Secrets and variables → Actions
   - Add a new secret named `NPM_TOKEN`
   - Paste your npm access token (create one at https://www.npmjs.com/settings/your-username/tokens)

2. **Create a release:**
   - Go to your repository on GitHub
   - Click "Releases" → "Create a new release"
   - Create a new tag (e.g., `v0.1.0`)
   - Fill in release details
   - Click "Publish release"

3. **The workflow will automatically:**
   - Install dependencies
   - Build the package
   - Publish to npm registry
   - Publish to GitHub Packages

### Manual workflow trigger:

You can also manually trigger the publish workflow from the Actions tab.

## Version Management

Before publishing, update the version in [package.json](package.json):

```bash
npm version patch  # 0.1.0 → 0.1.1
npm version minor  # 0.1.0 → 0.2.0
npm version major  # 0.1.0 → 1.0.0
```

## Installation by Users

### From npm:
```bash
npm install @spextion/components
```

### From GitHub Packages:
Users need to configure their `.npmrc`:
```
@spextion:registry=https://npm.pkg.github.com
```

Then install:
```bash
npm install @spextion/components
```

## Troubleshooting

- **Authentication errors**: Make sure your tokens are valid and have correct permissions
- **Build errors**: Run `npm run build` locally first to catch any issues
- **Version conflicts**: Ensure you've bumped the version number before publishing
- **GitHub Packages 404**: Make sure the package name matches your GitHub organization (`@spextion`)
