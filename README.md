# RadarRival

RadarRival is a bilingual competitive-intelligence landing site for French SMEs, agencies, and independents. The product offers weekly Monday-morning competitor monitoring reports, with Starter and Pro plans, checkout flows, and NanoCorp payment webhook handling.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- NanoCorp checkout and webhook integration

## Project Contents

- `app/page.tsx`: main bilingual EN/FR landing page and pricing experience
- `app/checkout/[plan]/route.ts`: plan-specific checkout redirect flow
- `app/checkout/success/page.tsx`: post-checkout success page
- `app/api/webhooks/nanocorp/route.ts`: NanoCorp payment webhook endpoint
- `app/layout.tsx` and `app/globals.css`: shared layout and global styling
- `prospect_list_fr.md`, `outreach_assets_fr.md`, `linkedin_content.md`, `followups_wave1_april18.md`: GTM and outreach documentation
- `market_research.md` and `contactform_wave2.md`: supporting market and outreach assets

## Local Development

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Deployment

The app is structured for Vercel deployment. Pushing the codebase to a GitHub repository connected to Vercel will trigger a new deployment automatically.
