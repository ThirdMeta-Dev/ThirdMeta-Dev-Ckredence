# Ckredence Wealth

React homepage with an Express backend. Use Node.js 22.12 or newer.

## Local development

Run `npm.cmd ci` after cloning, then `npm.cmd run dev`. Open [the homepage](http://127.0.0.1:3001/). Express serves both the React development client and the API. To change the local port, copy `.env.example` to `.env` and set `API_PORT`.

## Production build

Run `npm.cmd run build` followed by `npm.cmd start` to serve the compiled homepage locally.

## Homepage content

The section order follows the supplied UX audit. Service-detail pages, contact, onboarding, disclosures and reports link to Ckredence’s existing destinations. The published charts carry their source dates. Brand media and fonts are served from `public/media`.

`GET /api/articles` refreshes the four articles from the official homepage at most once per hour. The last successful list, or the bundled November 23, 2026 snapshot, is used if the source is unavailable. `GET /api/health` returns the API status.

FAQ 6 links to the official FAQ and contact team pending approval of the answer text. Other editorial and regulatory content is a snapshot of the published site.
