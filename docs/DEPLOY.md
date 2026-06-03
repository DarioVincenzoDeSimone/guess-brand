# Deploy to GitHub Pages

## Prerequisites

- Node.js 20+
- A GitHub repository named `guess-brand` under your account
- GitHub Pages enabled on the `gh-pages` branch (Settings → Pages → Branch: `gh-pages`)
- **On Windows**: run deploy commands from **Git Bash** (not PowerShell/cmd) so that `angular-cli-ghpages` can find the `git` executable

## One-time setup

```bash
npm install
npm run download-logos   # downloads SVG logos into public/assets/logos/
```

## Deploy

```bash
# From Git Bash:
npm run deploy
```

This single command:
1. Builds: `ng build --base-href "https://DarioVincenzoDeSimone.github.io/guess-brand/"`
   - Bundles and hashes all assets
   - Sets the absolute base href so all relative asset paths resolve correctly
2. Publishes `dist/guess-brand/browser/` to the `gh-pages` branch via `angular-cli-ghpages`

Live URL: **https://DarioVincenzoDeSimone.github.io/guess-brand/**

## Important: asset paths must be relative

Logo images in the app use **relative paths** (`assets/logos/toyota.svg`, no leading `/`).
A leading `/` would resolve to the domain root (`github.io/assets/…`) and miss the
`/guess-brand/` base path, causing 404s on GitHub Pages.

## Routing

The app uses **HashLocationStrategy** (`#`-based URLs), so all routes work on GitHub Pages without a server:

- `https://…/guess-brand/#/` — Home
- `https://…/guess-brand/#/game` — Game
- `https://…/guess-brand/#/results` — Results

A `404.html` fallback is also included in `public/` as an extra safety net.

## Local production preview

```bash
npm run build:prod
npx http-server dist/guess-brand/browser -p 8080
# Open http://localhost:8080/guess-brand/
```

> Note: `npm run build:prod` uses `--configuration production` without a `--base-href` override,
> so links resolve from `/` — correct for local previewing with the http-server above.
