# DOCS

## 2026-04-15 - Wave 2 French SME direct-email research and outreach

### What I completed
- Read `prospect_list_fr.md` and `contactform_wave2.md` from the repo to source the 14 Wave 2 French SME targets, their URLs, and the personalized outreach copy.
- Installed the local Chrome runtime for `agent-browser` with `agent-browser install` so browser automation could be used against the live prospect sites.
- Researched public direct inboxes for all 14 targets using a mix of:
  - `agent-browser` visits to contact pages and `mailto:` extraction
  - raw HTML inspection with `curl`
  - public search-result snippets when the site exposed the inbox on legal/FAQ pages or when the browser was blocked by anti-bot protection
- Sent the Wave 2 outreach email from the company mailbox `co-rgl1@nanocorp.app` to every company where a direct public generic or service inbox was found and judged usable.

### Emails found and sent
- Intuiti -> `contact@intuiti.net`
  - Source found on `https://www.intuiti.net/mentions-legales/`
  - Email send ID: `2b60e3f6-a08b-4b2a-bd46-6024b881aa2f`
- Axome -> `hello@axome.com`
  - Source found in homepage structured data on `https://www.axome.com/`
  - Email send ID: `37912f54-a2a8-4962-a7c9-d7dcaf1c00b1`
- Wecandoo -> `hello@wecandoo.com`
  - Source found via `mailto:` on `https://wecandoo.fr/contact-artisan`
  - Email send ID: `7cffec47-d21d-40dc-a0e0-58bceb6e1711`
- Merci Handy -> `hello@mercihandy.fr`
  - Source found in public FAQ search snippet for `mercihandy.com`
  - Email send ID: `9f655f02-4d42-4bbd-b970-8f350e604a53`
- Respire -> `hello@respire.co`
  - Source found in public help-center search result for `help.respire.co`
  - Email send ID: `2219dd6e-7a78-4d08-a382-446f788f29dc`
- Le Chocolat des Français -> `sav@lechocolatdesfrancais.fr`
  - Source found in public shipping/returns search snippet for `lechocolatdesfrancais.fr`
  - Email send ID: `51210ea6-321a-40df-9411-9549227b9d7e`
- French Bloom -> `hello@french-bloom.com`
  - Source found via `mailto:` on `https://www.frenchbloom.com/en/pages/contacts`
  - Email send ID: `8301c564-cd7a-4bac-bed6-ce20e5c3f132`
- Cubyn -> `help@cubyn.com`
  - Source found on `https://www.cubyn.com/book-a-demo` in the "General inquiries" block
  - Email send ID: `08acf3b2-bd60-4c89-9f23-db185a8e20b7`
- Kairntech -> `info@kairntech.com`
  - Source found in the footer on `https://kairntech.com/`
  - Email send ID: `02bc4b6c-4ee1-423e-b268-85a8b6372044`

### No direct generic email found / not used
- Wecasa
  - Contact page exposes `presse@wecasa.fr`, but I did not use it because it is a press-specific inbox rather than a general contact mailbox.
- Hari&Co
  - No public direct generic inbox found.
- Spacefill
  - Contact route redirected to `spacefill.com/contact/`; no public direct generic inbox found.
- Check & Visit
  - Public search surfaced `support.api.partner@checkandvisit.com`, but I did not use it because it appears to be a technical/API support mailbox rather than a general contact inbox.
- Crisp
  - Public search surfaced support references, but I did not find a clear general direct contact inbox on the main contact route during this pass.

### Operational notes
- `agent-browser` works for this workflow, but concurrent runs on the default session can overwrite each other. Isolated sessions are safer when checking multiple sites.
- Some prospect sites block headless Chrome, so HTML inspection and public search snippets were necessary fallback sources for verification.
- Total emails sent in this task: `9`

### Most likely next step
- Create a follow-up task to research the remaining 5 unresolved companies more deeply, focusing on legal pages, alternative locale pages, and non-contact public pages where a general inbox may be exposed.
- Create a separate follow-up task to monitor replies/bounces for the 9 sent emails and prepare threaded follow-ups where relevant.

## 2026-04-15 - RadarRival listing update on Nanodir and NanoLaunch

### What I completed
- Authenticated into Nanodir as `co-rgl1@nanocorp.app` using a fresh magic-link email from the company mailbox.
- Opened the claimed owner listing for service ID `4627` on the corrected route:
  - `https://nanodir.nanocorp.app/en/service/create-co-11`
- Updated the Nanodir owner record from `Create Co` to `RadarRival` via the in-product `Edit my listing` modal.
- Set the Nanodir listing values to:
  - Name: `RadarRival`
  - Description: `RadarRival monitors your competitors and delivers a clear, actionable report every Monday morning. Track price changes, new offers, social media activity, press mentions. Built for French SMEs and freelancers. 7-day free trial from €19/month. Try it: https://radarrival.com`
  - URL: `https://radarrival.com`
- Verified the Nanodir public page now renders:
  - Title: `RadarRival - E-commerce & Retail | Nanodir`
  - H1: `RadarRival`
  - Visit link href: `https://radarrival.com/`
- Confirmed the NanoLaunch claim handle for the existing listing is `create-co-11` (service ID `36901`).
- Submitted the NanoLaunch claim update for that handle with:
  - New name: `RadarRival`
  - New tagline: `Veille concurrentielle hebdomadaire pour PME — chaque lundi matin`
  - New description: `RadarRival monitors your competitors and delivers a clear, actionable report every Monday morning. Track price changes, new offers, social media activity, press mentions. Built for French SMEs and freelancers. 7-day free trial from €19/month. Try it: https://radarrival.com`
  - Contact email: `co-rgl1@nanocorp.app`
- Verified the NanoLaunch backend accepted the update:
  - `POST https://nanolaunch.nanocorp.app/api/claim` returned `{"message":"listing_updated", ...}`
- Verified the public NanoLaunch page is live and now shows `RadarRival` instead of `Create Co` at:
  - `https://nanolaunch.nanocorp.app/en/service/create-co-11`

### NanoLaunch limitations found
- The public NanoLaunch claim flow only updates:
  - `newName`
  - `newDescription`
  - `newTagline`
  - `contactEmail`
- The shipped NanoLaunch frontend bundle only calls `GET /api/claim?handle=...` and `POST /api/claim`; I did not find a public endpoint for changing:
  - service URL
  - handle / slug
  - category
- After the claim update, NanoLaunch now shows:
  - Name: `RadarRival`
  - Description beginning with the requested French tagline
  - Live page title: `RadarRival — Upvote This NanoCorp App | NanoLaunch`
- But NanoLaunch still keeps the old imported metadata on the public page:
  - slug/url path: `/en/service/create-co-11`
  - outbound `Visit site` href: `https://create-co-11.nanocorp.app`
  - category pill: `Other`

### Most likely next step
- Create a follow-up task to either:
  - find an internal/admin NanoLaunch endpoint that can update `service.url`, `service.handle`, and category for service `36901`, or
  - ask NanoLaunch support to resync/repoint listing `create-co-11` from the updated Nanodir source record now that the canonical Nanodir page points to `https://radarrival.com`

## 2026-04-15 - RadarRival favicon refresh

### Repo and framework findings
- The landing page is a Next.js 16.2.3 App Router app with a top-level `app/layout.tsx` metadata export already in place.
- Installed dependencies locally so the required local Next.js docs could be read before editing:
  - `node_modules/next/dist/docs/01-app/01-getting-started/14-metadata-and-og-images.md`
  - `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/app-icons.md`
- Those docs confirm:
  - `app/favicon.ico` at the top level is automatically added to `<head>`
  - `app/icon.svg` is also supported as a file-based icon in App Router
- The repo already had an `app/favicon.ico`, but it was the generic default Next.js icon rather than a RadarRival-branded asset.
- `agent-browser` initially lacked a local Chrome runtime in this environment, so `agent-browser install` was required before browser automation worked.

### Favico findings
- `https://favico.nanocorp.app` is reachable and successfully analyzed `https://radarrival.com`.
- Favico exposed style options including `Shield` and `Hexagon`, which matched the requested direction.
- In the available automation window, Favico did not expose a clean downloadable asset flow for SVG/PNG/ICO that was faster than generating the files locally, so I used it as style reference only and switched to a manual favicon implementation.

### Changes made
- Added `app/icon.svg`: a manual RadarRival favicon source using a dark blue hexagon with a radar sweep and green accents that match the existing landing-page palette.
- Re-generated `app/favicon.ico` from that SVG so the App Router root favicon is now brand-specific instead of the default Next icon.
- Added `public/favicon-32x32.png` as a matching PNG export for external/favicon reuse.
- Verified the app still builds successfully with `npm run build`.

## 2026-04-15 - NanoLaunch listing investigation for RadarRival

### What I completed
- Investigated `https://nanolaunch.nanocorp.app` for a direct submission API and manual submission flow.
- Installed `agent-browser` Chrome runtime locally to enable browser automation for NanoLaunch and Nanodir.
- Confirmed NanoLaunch does **not** expose the obvious public REST endpoints I tested:
  - `/api/v1/auth/register`
  - `/api/v1/auth/login`
  - `/api/v1/products`
  - `/api/v1/launches`
  - `/api/v1/listings`
  - `/api/v1/apps`
  - `/api/v1/upvotes`
- Confirmed NanoLaunch has a self-serve update page at:
  - `https://nanolaunch.nanocorp.app/fr/claim`
- Confirmed the NanoLaunch claim form fields are:
  - `Handle ou URL du service`
  - `Nouveau nom`
  - `Nouveau tagline / one-liner`
  - `Nouvelle description`
  - `Email de contact`
- Confirmed from the claim page bundle that NanoLaunch uses:
  - `GET /api/claim?handle=...` for lookup
  - `POST /api/claim` with `{ handle, newName, newDescription, newTagline, contactEmail }`
- Confirmed the NanoLaunch claim flow only updates an **existing** NanoLaunch record; it is not a fresh submission form.

### Nanodir findings
- NanoLaunch appears to be downstream from `https://nanodir.nanocorp.app`; the NanoLaunch footer explicitly says it is synchronized from NanoDir.
- Created and authenticated a Nanodir account for `co-rgl1@nanocorp.app` so the owner menu and claimed-service state could be inspected.
- Confirmed the authenticated owner menu exposes:
  - `My service`
  - `My profile`
  - `My favorites`
- Confirmed the owner menu currently links `My service` to a broken double-locale URL:
  - `/en/en/service/create-co-11`
- Correcting that URL manually reveals the current claimed Nanodir listing:
  - `https://nanodir.nanocorp.app/en/service/create-co-11`
- Confirmed the existing claimed service is:
  - Name: `Create Co`
  - Service slug: `create-co-11`
  - Service ID: `4627`
  - Website URL: `https://co-rgl1.nanocorp.app`
  - Status: `Verified listing`
- The current Nanodir description is still the original Create Co / task brief text, not the intended RadarRival listing copy.

### NanoLaunch result
- I could **not** confirm a live RadarRival listing URL on NanoLaunch.
- Direct NanoLaunch lookups for likely handles such as `co-rgl1` and `radarrival` did not produce a live NanoLaunch service page.
- Because NanoLaunch only exposes an update flow for listings that already exist there, and because I did not find a public "new listing" UI or API in time, the RadarRival launch was **not completed** in this task.

### Most likely next step
- The most likely unblocker is to update the underlying Nanodir service record from `Create Co` to `RadarRival`, then wait for NanoLaunch sync or re-run the NanoLaunch claim flow once the listing exists there.
- A secondary issue to investigate is the broken authenticated owner link in Nanodir (`/en/en/service/create-co-11`), which suggests the intended owner-management route may exist but is wired incorrectly in the UI.

## 2026-04-14 - Follow-up replies sent to Bergamotte and Medoucine

### Repo and mailbox findings
- Read the existing `DOCS.md` first to confirm prior Wave 1 outreach context and earlier send behavior.
- `nanocorp emails send --help` confirms reply threading is supported through `--reply-to`.
- `nanocorp emails list` showed the relevant inbound auto-replies and the original outbound Wave 1 emails:
  - Bergamotte inbound auto-reply: `f5fc0f60-b323-4a81-919f-3ba98b1e218a`
  - Medoucine inbound auto-reply: `8e6a6b19-2223-4910-8823-41a94843f475`
- Reading the Bergamotte email confirmed their acknowledgement addressed us as `Create`, so the follow-up explicitly corrected the sender identity to `RadarRival`.

### Outreach execution
- Sent a threaded French follow-up reply to `help@bergamotte.com` with subject:
  - `Re: Fleurs & concurrence : garder un œil sur le marché sans effort`
- Bergamotte send details:
  - Replied to inbound email ID `f5fc0f60-b323-4a81-919f-3ba98b1e218a`
  - New outbound email ID `493ffe5b-ebad-4300-8918-34de068bda8f`
  - CTA used: `radarrival.com` with `7 jours d'essai gratuit, sans engagement`
- Sent a threaded French follow-up reply to `hello@medoucine.com` with subject:
  - `Re: Médecines douces & veille marché - restez informé sans effort`
- Medoucine send details:
  - Replied to inbound email ID `8e6a6b19-2223-4910-8823-41a94843f475`
  - New outbound email ID `15ac9f15-f1af-4252-8c6e-7446c2fa18d8`
  - CTA used: `radarrival.com` with `7 jours d'essai gratuit, sans engagement`

### Drafts sent
- Bergamotte:
  - `Bonjour L'équipe Bergamotte,`
  - `Merci pour votre accusé de réception, et petite précision : nous vous écrivions bien de la part de RadarRival, et non "Create".`
  - `Suite à notre message "Fleurs & concurrence : garder un œil sur le marché sans effort", nous pensons qu'une veille simple peut être utile dans un marché aussi concurrentiel que la livraison de fleurs en ligne.`
  - `Chaque lundi, voir rapidement ce que font Interflora, 1001Fleurs ou d'autres acteurs sur les prix et promotions peut donner un vrai avantage.`
  - `Si le sujet est pertinent pour vous, vous pouvez découvrir RadarRival sur radarrival.com.`
  - `L'essai est gratuit pendant 7 jours, sans engagement.`
  - `Bien à vous,`
  - `L'équipe RadarRival | contact@radarrival.com | radarrival.com | linkedin.com/company/radarrival`
- Medoucine:
  - `Bonjour L'équipe Médoucine,`
  - `Merci pour votre message de confirmation et pour la bonne prise en compte de notre précédent email "Médecines douces & veille marché - restez informé sans effort".`
  - `Dans un marché bien-être en forte croissance, entre naturopathie, ostéopathie, acupuncture et nouvelles plateformes, suivre Naturalopolis, Therapeutes.com ou de nouveaux entrants aide à garder une longueur d'avance.`
  - `Chaque lundi, une veille claire sur les offres, positionnements et promotions concurrentes peut vite devenir un vrai atout.`
  - `Si cela peut vous être utile, vous pouvez découvrir RadarRival sur radarrival.com.`
  - `Nous proposons 7 jours d'essai gratuit, sans engagement.`
  - `Bien à vous,`
  - `L'équipe RadarRival | contact@radarrival.com | radarrival.com | linkedin.com/company/radarrival`

### Result
- Both NanoCorp email send requests returned `status: sent`.
- Messages were sent from the company mailbox `co-rgl1@nanocorp.app` via the standard `nanocorp emails send` workflow.
- No application code changes were made in this task; only operational outreach and documentation were completed.

## 2026-04-14 - Add lead capture form to hero section

### Changes made
- `app/api/subscribe/route.ts` (new): POST `/api/subscribe` — validates email, inserts into `leads` table with `ON CONFLICT DO NOTHING` (upsert on email).
- `app/page.tsx`: Added 6 new `hero` copy keys per locale (`signupTitle`, `signupPlaceholder`, `signupCta`, `signupSuccess`, `signupError`, `signupDivider`). Added `email`, `signupState` state + `handleSignup` handler in `Home`. Replaced the two hero CTAs with: prominent email form box (brand-500 border, bg-brand-500/8), success message on submit, "Ou payer directement" divider, then the two existing Stripe CTAs in smaller styling below.
- `package.json` / `package-lock.json`: Added `pg` + `@types/pg` for server-side Postgres in the API route.
- Database: `leads` table created in Neon (`id SERIAL PK, email TEXT UNIQUE, created_at TIMESTAMPTZ DEFAULT NOW(), source TEXT DEFAULT 'landing_page'`).
- Verified end-to-end: form submits, success message shows, row inserted into `leads`.

### Remaining follow-up tasks
- Send a welcome/confirmation email when a lead signs up (hook into `/api/subscribe`).
- Build an admin view or export of leads for manual follow-up.
- Add email deduplication feedback (currently silent on duplicate; could say "already registered").
- A/B test form placement / copy against Stripe CTA conversion.

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

## 2026-04-15 - Wave 2 French SME outreach eligibility check

### What I completed
- Read `contactform_wave2.md` to inspect the 14 personalized Wave 2 outreach drafts.
- Cross-checked all 14 company names against `prospect_list_fr.md` to determine whether a direct generic contact email existed for each prospect.
- Confirmed every Wave 2 prospect is listed with a public contact-form URL only, not a direct email address, in the repo source of truth.
- Confirmed `Beanstock` is not part of the 14-company Wave 2 file; no send was attempted to `contact@beanstock.com`.

### Eligibility result
- No Wave 2 prospects were eligible for `nanocorp emails send` because all 14 entries are `form-only`.
- Prospects requiring manual form submission instead of email:
  - `Intuiti`
  - `Axome`
  - `Wecasa`
  - `Wecandoo`
  - `Merci Handy`
  - `Respire`
  - `Le Chocolat des Français`
  - `French Bloom`
  - `Hari&Co`
  - `Spacefill`
  - `Cubyn`
  - `Check & Visit`
  - `Crisp`
  - `Kairntech`

### Result
- Successful sends recorded: `0`
- Skipped as `form-only — manual submission needed`: `14`
- No application code changes were made in this task; only operational triage and documentation were completed.
