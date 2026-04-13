# DOCS

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
