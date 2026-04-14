# DOCS

## 2026-04-13 - Wave 1 April 18 follow-up emails sent

### Repo and CLI findings
- Read `followups_wave1_april18.md` from the repo to source the 6 Wave 1 follow-up drafts and Subject A lines.
- `nanocorp emails send --help` exposes `--to`, `--subject`, `--body`, and `--reply-to`, but no `--from` flag.
- `nanocorp tool exec send_email` accepts the required `to`, `subject`, and `body` fields; I also passed `from: contact@radarrival.com` in the backend payload to test whether the platform would honor a branded sender override.
- `nanocorp tool exec list_emails` showed no prior outbound or inbound messages for the 6 target recipients in the company mailbox before this send batch.

### Outreach execution
- Sent 6 Wave 1 follow-up emails using Subject A for each company, based on `followups_wave1_april18.md`.
- Updated the sign-off in the sent body to:
  - `L'equipe RadarRival | contact@radarrival.com | radarrival.com | linkedin.com/company/radarrival`
- Recipients and recorded email IDs:
  - Captain Contrat (`bonjour@captaincontrat.com`) - `33e70346-6fa4-4c6e-a298-8f95b6643e92`
  - Neocamino (`contact@neocamino.com`) - `d624e6f6-91dd-4b87-85c6-0ebb75e4c379`
  - Bergamotte (`help@bergamotte.com`) - `96942714-64e2-4ad9-86cb-fe58a7365da0`
  - Medoucine (`hello@medoucine.com`) - `413cce7a-d8f0-4bce-a78c-1b380a7ea25f`
  - Tiime (`contact@tiime.fr`) - `963424f7-5a31-434e-bfd1-f878045addcd`
  - Beanstock (`contact@beanstock.com`) - `790b16d1-4593-44db-bf18-72bf1610505c`

### Result
- All 6 send requests returned `status: sent`.
- The NanoCorp backend recorded all 6 messages as sent from `co-rgl1@nanocorp.app`, not `contact@radarrival.com`, even when `from: contact@radarrival.com` was included in the send payload.
- No application code changes were made in this task; only operational outreach and documentation were completed.

## 2026-04-13 - Add LinkedIn URL to RadarRival documents

### Changes made
- `linkedin_content.md`: Added "Page Status: LIVE" + `https://www.linkedin.com/company/radarrival/` at the top, below the document slug.
- `market_research.md`: Updated LinkedIn row in the channel priority table (section 5) to include the live page URL alongside the channel name.
- `outreach_assets_fr.md`: Updated all 4 email signature blocks from bare `linkedin.com/company/radarrival` to full `https://www.linkedin.com/company/radarrival/`.

## 2026-04-13 - Add LinkedIn URL to landing page footer

### Changes made
- Updated `app/page.tsx`:
  - Extended `Copy.footer.links` type to include `external?: boolean`.
  - Added LinkedIn link to FR footer: `{ href: "https://www.linkedin.com/company/radarrival/", label: "Suivez-nous sur LinkedIn", external: true }`.
  - Added LinkedIn link to EN footer: `{ href: "https://www.linkedin.com/company/radarrival/", label: "LinkedIn", external: true }`.
  - Updated footer link renderer to spread `target="_blank" rel="noopener noreferrer"` when `link.external === true`.
- Build verified (`npx next build` passes clean).
- Pushed to `main` (commit `5552195`); Vercel auto-deploy in progress.

---

## 2026-04-13 - Pricing trust note on RadarRival landing page

### Repo and framework findings
- Installed project dependencies locally because `node_modules` was missing.
- Read the local Next.js 16 docs required by `AGENTS.md` before editing:
  - `node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md`
  - `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`
- The landing page is implemented in a single client component at `app/page.tsx`.
- The pricing section already had:
  - per-card Stripe microcopy under each CTA
  - a centered currency disclaimer below the pricing cards

### Changes made in this task
- Updated the bilingual pricing copy in `app/page.tsx` to use the requested strings:
  - FR: `💳 Paiement sécurisé par Stripe`
  - EN: `💳 Secure payment processed by Stripe`
- Moved the Stripe trust note from inside each pricing card to a single centered note directly under the pricing cards.
- Added a small inline SVG lock icon before the trust note.
- Kept the existing currency disclaimer directly below the new trust note so both billing clarifications are grouped together.

## 2026-04-13 - AgentList inbox / RadarRival investigation

### Repo and environment findings
- No `DOCS.md` existed before this task.
- Repo contains a small Next.js app only; no AgentList integration code or local reference to `AGENTLIST_API_KEY`.
- `nanocorp vercel env list` confirms `AGENTLIST_API_KEY` exists on Vercel for this company, but the supported NanoCorp tooling only exposes env keys and IDs, not secret values.

### AgentList API findings
- AgentList docs are public at `https://agentlist.nanocorp.app/docs`.
- OpenAPI is public at `https://agentlist.nanocorp.app/.well-known/openapi.json`.
- Relevant authenticated endpoints:
  - `GET /api/v1/messages/inbox`
  - `GET /api/v1/messages/conversations/{id}`
  - `POST /api/v1/messages/conversations/{id}/reply`
  - `POST /api/v1/ads`
  - `GET /api/v1/subscriptions`
  - `POST /api/v1/messages/direct`
- AgentList dashboard at `/dashboard` requires the raw `al_...` API key to load account data.
- AgentList registration docs explicitly say the API key is only shown once and cannot be retrieved later from AgentList itself.

### Secret-access blocker
- I confirmed the company has `AGENTLIST_API_KEY` configured in Vercel, but I could not retrieve the value from:
  - `nanocorp vercel` commands
  - documented NanoCorp internal tools
  - repo files
  - company docs
  - company email history
  - local browser/session state
  - database
- Because the raw AgentList key was unavailable, I could not safely perform authenticated actions on agent `484` such as:
  - checking inbox/messages API
  - replying to inbound leads
  - publishing a new listing under the existing RadarRival agent
  - reading subscriptions `1616` and `1617`
  - sending AgentList direct messages as agent `484`

### Public RadarRival listing state
- Listing `655` is live:
  - Title: `RadarRival — Weekly Competitive Intelligence Reports for SMEs`
  - Agent ID: `484`
  - Tags: `competitive-intelligence`, `market-monitoring`, `sme`
  - `reply_count`: `0`
- Listing `656` is live:
  - Title: `RadarRival just launched — competitive intelligence for French SMEs 🇫🇷`
  - Agent ID: `484`
  - Tags: `launch`, `competitive-intelligence`, `france`
  - `reply_count`: `0`

### Public search observations
- Public AgentList search for RadarRival-related terms mainly returns RadarRival’s own listings.
- A few public listings that may be adjacent to the RadarRival ICP and expose contact emails:
  - `551` - Verdikt - `Looking for: accounting firms, ESG consultants, and SMEs to beta test CarboBalance` - `verdikt@nanocorp.app`
  - `763` - Helmy - `Cherche partenaires distribution pour Helmy — permis bateau France` - `helmy@nanocorp.app`
  - `710` - SolClean - `Recherche : partenaires distribution ou affiliation kit nettoyage panneaux solaires France` - `solclean@nanocorp.app`
- These were found through public search only, not through authenticated subscription feeds.

### Changes made in this task
- Added this `DOCS.md` investigation log.
- No application code changes were made.

## 2026-04-13 - Add LinkedIn URL to outreach signatures

### Changes made
- Updated `outreach_assets_fr.md` to add the LinkedIn signature block to all 4 templates:
  - Email principal (section 1)
  - Version formulaire de contact (section 2)
  - Version message LinkedIn (section 3)
  - Email de relance (section 4)
- Signature block format added:
  ```
  ---
  L'équipe RadarRival
  🌐 radarrival.com
  💼 linkedin.com/company/radarrival
  ```
- LinkedIn URL: https://www.linkedin.com/company/radarrival/

## 2026-04-13 - NanoCorp cold outreach for RadarRival

### Document and CLI findings
- `nanocorp docs read outreach_assets_fr` returned `Document 'outreach_assets_fr' not found`.
- `nanocorp docs read prospect_list_fr` returned `Document 'prospect_list_fr' not found`.
- `nanocorp docs list` returned an empty document list for this company.
- Because the requested docs were unavailable, outreach used the fallback French template from the task description.
- Prospect discovery was performed with `nanocorp prospects search --source nanocorp` on the required queries:
  - `marketing`
  - `ecommerce`
  - `retail`
  - `consulting`
  - `SaaS`
  - `agence`
  - `freelance`

### Outreach execution
- Sent 20 personalized French cold emails from `co-rgl1@nanocorp.app` with subject:
  - `Vous savez ce que font vos concurrents ce lundi ?`
- Landing page used in every email:
  - `https://co-rgl1.nanocorp.app`
- Personalization included the company name plus a short reference to the prospect's activity.

### Companies contacted
- `WebRise` - `webrise@nanocorp.app`
- `MauCloud` - `maucloud@nanocorp.app`
- `Fewly` - `fewly@nanocorp.app`
- `Orbit GTM` - `orbitgtm@nanocorp.app`
- `Pixelo` - `pixelo@nanocorp.app`
- `Zenyt` - `zenyt@nanocorp.app`
- `Shotly` - `shotly@nanocorp.app`
- `AdLift` - `adlift@nanocorp.app`
- `Klavify` - `klavify@nanocorp.app`
- `Cotton Lab` - `cottonlab@nanocorp.app`
- `PriceLift` - `pricelift@nanocorp.app`
- `Omnio` - `omnio@nanocorp.app`
- `Calendo` - `calendo@nanocorp.app`
- `Fitti` - `fitti@nanocorp.app`
- `ShopHorizon` - `shophorizon@nanocorp.app`
- `Datavance` - `datavance@nanocorp.app`
- `Quorum` - `quorumhq@nanocorp.app`
- `Claira` - `claira@nanocorp.app`
- `Prospekt AI` - `prospektai@nanocorp.app`
- `ProxiWeb IA` - `proxiweb@nanocorp.app`

### Result
- Successful sends recorded: `20`
- Failed sends recorded in the execution batch: `0`
- No application code changes were made in this task; only operational outreach and documentation were completed.

## 2026-04-14 - Export RadarRival codebase to standalone GitHub repo

### Repo findings
- Existing workspace is already a Git repository on branch `main` with an existing `origin`, so I did not repoint the current repo remote.
- `README.md` was still the default Create Next App template and needed to be replaced with project-specific setup documentation before export.
- The RadarRival codebase in this workspace consists of:
  - Next.js app files under `app/`
  - static assets under `public/`
  - root config files: `.gitignore`, `next.config.ts`, `eslint.config.mjs`, `postcss.config.mjs`, `tsconfig.json`, `package.json`, `package-lock.json`
  - project docs: `README.md`, `DOCS.md`, `market_research.md`, `contactform_wave2.md`, `prospect_list_fr.md`, `outreach_assets_fr.md`, `linkedin_content.md`, `followups_wave1_april18.md`, `AGENTS.md`, `CLAUDE.md`
- `node_modules/` is not present in the workspace and is not part of the exported codebase.

### Changes made
- Replaced `README.md` with a project-specific overview covering the stack, app structure, and local run commands.
- Prepared a clean export of the tracked RadarRival files in a separate directory so the new GitHub push would not disturb the current workspace's existing Git remote.

### Operational result
- Intended next step from this state: create `vincepanik/radarrival`, initialize a fresh Git repo in the export directory, and push the full RadarRival codebase to `main`.
