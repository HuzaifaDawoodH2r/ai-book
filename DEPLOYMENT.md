# Deploying Your Docusaurus Site to GitHub Pages

This document provides instructions for deploying your Docusaurus-based Physical AI Book to GitHub Pages.

## Prerequisites

1. A GitHub account
2. A repository created for your project (e.g., `your-username/ai-book`)
3. Admin access to the repository settings

## Setup Instructions

### 1. Configure your Docusaurus site

In your `docusaurus.config.js`, make sure you have the correct GitHub Pages configuration:

```js
// docusaurus.config.js
const config = {
  // ...
  url: 'https://your-username.github.io', // Your GitHub username
  baseUrl: '/ai-book/', // Your repository name
  organizationName: 'your-username', // Usually your GitHub username
  projectName: 'ai-book', // Repository name
  // ...
};
```

**Important:** Replace `your-username` with your actual GitHub username and `ai-book` with your actual repository name.

### 2. Commit and Push Changes

Make sure all your changes are committed and pushed to GitHub:

```bash
git add .
git commit -m "Configure for GitHub Pages deployment"
git push origin main
```

### 3. Configure GitHub Pages in Repository Settings

1. Go to your GitHub repository
2. Click on the "Settings" tab
3. In the left sidebar, click on "Pages"
4. Under "Build and deployment", set:
   - Source: "Deploy from a branch"
   - Branch: `gh-pages`, `/ (root)` 
5. Click "Save"

### 4. GitHub Actions Deployment

This project includes a GitHub Actions workflow (`/.github/workflows/gh-pages.yml`) that will automatically build and deploy your site to GitHub Pages whenever you push to the `main` branch.

After pushing your changes, you can monitor the deployment process in the "Actions" tab of your repository.

### 5. View Your Deployed Site

Your site will be available at: `https://your-username.github.io/ai-book/`

**Note:** The first deployment may take a few minutes. Subsequent deployments will occur automatically after each push to the `main` branch.

## Important Notes

- **Backend Services**: This deployment only includes the frontend Docusaurus site. The backend services (FastAPI, Qdrant, etc.) are not deployed with GitHub Pages as it only hosts static files. If you need backend functionality, you'll need a separate hosting service.
- **GitHub Pages Limitations**: GitHub Pages only serves static files, so any dynamic backend features will not work.
- **Repository Name**: If you change your repository name, you must update the `baseUrl` and `projectName` in `docusaurus.config.js` accordingly.

## Troubleshooting

1. **Site not loading**: Check that the `baseUrl` in `docusaurus.config.js` matches your repository name
2. **Images or assets not loading**: Verify all asset paths are relative to your base URL
3. **404 errors**: Ensure your `baseUrl` is correctly configured

For more help, see the [Docusaurus GitHub Pages deployment guide](https://docusaurus.io/docs/deployment#deploying-to-github-pages).