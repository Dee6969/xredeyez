# REDEYEZ PLATFORM AUDIT

**Repo:** `Dee6969/xredeyez` · **Audited:** July 2026 · **Branch:** `platform-phase-1`

---

## 1. What exists now

**Stack (confirmed, not assumed):**
- Next.js 16.2.6 (App Router, Turbopack), React 19.2.4, TypeScript, Tailwind v4
- Deployed on Vercel (cron configured) — a `netlify.toml` also exists (leftover; pick one)
- Maps: Leaflet + react-leaflet (active) *and* mapbox-gl + react-map-gl (installed, unused)
- Payments: Stripe SDK wired for the **shop** (payment intents + webhook) and outreach checkout — not for Premium subscriptions
- Email: Resend + react-email (used by the partner outreach sequence engine)
- Storage: Vercel Blob (outreach contacts)
- Analytics: Vercel Analytics + Speed Insights (pageviews only — no custom events until this pass)

**Routing (App Router):** Home, `/cities` + `/cities/[slug]` + per-city `/map` + `/neighbourhoods/[hood]`, `/venues/[slug]` (328 SSG pages), `/guides`, `/explore`, `/map`, `/premium`, `/partners/*` (list, claim, dashboard stub, outreach funnel, booking/restaurant redirect routes), `/shop/*`, `/vault`, `/saved`, `/profile`, `/trips`, `/news`, `/dna`, `/rooms`, `/vibes`, `/signal`, legal pages.

**Data:** One 8,731-line `app/data/platform.ts` — 12 cities, ~330 venues, vibes, featured placements, plus typed interfaces that are genuinely good (ListingTier, ClaimStatus, DiscoveryLayer, VenueBrand, PartnerClaim). Everything hardcoded; no database.

**Auth:** None. Saves are localStorage, device-only. Profile/trips pages are stubs.

**SEO:** Strong on city/venue/guide pages (metadata, canonicals, breadcrumb/LocalBusiness/FAQ/TouristDestination schema, OG). Weak on commercial pages (fixed this pass). Sitemap was a hand-maintained static file, already stale.

**Admin/CMS:** None. Partner dashboard is an honest stub.

## 2. What was commercially dangerous (found → fixed this pass)

| # | Issue | Impact | Status |
|---|-------|--------|--------|
| 1 | **Partner claim form discarded every lead** — `preventDefault()` + fake "Enquiry captured" success | Every partner enquiry since launch lost. Direct revenue leak on the €49–€999/mo funnel | ✅ Fixed — real API with blob + email + webhook redundancy |
| 2 | **Homepage stats rendered "0+ Venues · 0 Live cities"** to crawlers, previews and pre-hydration views | Platform looks empty exactly where partners and travellers judge it | ✅ Fixed — SSR real values |
| 3 | **Waitlist emails dropped to `console.log`** when `WAITLIST_WEBHOOK_URL` unset | Premium demand silently lost | ✅ Fixed — private blob persistence always |
| 4 | **Stale static sitemap** shadowing 300+ pages of new content | Indexing lag on every new venue/city | ✅ Fixed — dynamic `app/sitemap.ts` |
| 5 | **Outreach contact list stored as a *public* blob** at a predictable pathname | GDPR exposure: prospect emails publicly downloadable if URL discovered | ⚠️ Flagged — fix spec in REDEYEZ_TECH_NOTES.md (needs prod data migration, don't hot-swap blind) |
| 6 | Legacy shop cart bleeds into every page incl. Premium and city guides | Undercuts "serious travel platform" positioning | ⚠️ Decision needed (see roadmap) |

## 3. What is missing

- **Auth + accounts** — no cross-device saves, no premium state, no member anything
- **Premium billing** — Stripe subscription products/checkout/portal (waitlist only today)
- **Database** — content, leads, claims, partners all need to leave the 8.7k-line TS file to scale
- **Partner dashboard** — stub; no listing self-service, no metrics (views/saves/clicks/route inclusions)
- **Route builder** — routes exist as flat strings on cities; no stop ordering, timing, transport, food resets, premium locking (schema now exists: `app/lib/types/routes.ts`)
- **Custom event analytics** — pageviews only (typed event layer now exists: `app/lib/analytics.ts`)
- **Venue enrichment** — opening hours mostly absent, few galleries, lat/lng on ~330/359 coordinate blocks

## 4. What can be improved quickly (done or ≤1 day each)

Done this pass: lead capture, stats, sitemap, metadata on money pages, network map on `/map`, save limit + premium moment, compliance module, locked premium route cards, analytics events.
Next quick wins: OG image generation per city (`next/og`), venue page FAQ schema, hotel_click events on Booking strips, `/saved` collections grouping, removing the unused mapbox dependency pair (~1MB install weight).

## 5. What needs rebuilding properly

1. **Data layer → Supabase/Postgres** (recommended; gives auth + storage + admin in one move). Keep `platform.ts` shapes as the schema source of truth — they're portable.
2. **Auth → Supabase Auth** (email + OAuth), replacing localStorage saves with synced saves + premium flag.
3. **Premium → Stripe Billing** (subscription product, customer portal, webhook → member state).
4. **Partner self-service** — claims table + dashboard reading real metrics from the analytics events.
5. **Outreach store** — private blob or (better) a `contacts` table once Postgres lands.

## 6. Priority roadmap

### Phase 1 — 48-hour high-impact (THIS PASS ✅)
Lead capture fixed · stats fixed · dynamic sitemap · money-page SEO · network map gateway · save limit premium moment · compliance layer · locked premium cards · typed analytics · route schema.

### Phase 2 — 7-day MVP platform
- Supabase project: `cities`, `venues`, `routes`, `leads`, `claims`, `members` tables; import script from `platform.ts`
- Supabase Auth + synced saves + premium flag
- Stripe Premium subscription (checkout + portal + webhook) — founding rate honoured for waitlist blob records
- Partner enquiry admin view (read `leads/partner/` blobs or table)
- Retire or subdomain the shop; remove cart from travel pages
- OG images per city; `hotel_click`/`partner_click` wired on all Booking/partner CTAs

### Phase 3 — 30-day commercial platform
- Route builder v1 (schema already in repo): mood + time → generated path from venue data; premium routes live
- Partner dashboard v1: listing edit, lead inbox, views/saves/clicks per venue
- Stripe for partner listings (€49/€149/€299 recurring) with self-serve upgrade
- City sponsor inventory management
- Search v2: vibe + "best for" + layer facets
- Editorial pipeline: 2 new long-form guides/city, internal linking pass

### Phase 4 — investor-ready travel network
- CMS-driven city expansion playbook (new city in <1 week)
- Member travel boards (saves + routes + notes + hotels)
- Booking.com conversion reporting per venue → partner ROI proof
- Data moat: proprietary venue intelligence (hours, vibe scores, seasonal signals)
- B2B API for hotels/tourism boards · multi-language cities

## 7. Environment variables (current + new)

| Var | Status | Purpose |
|-----|--------|---------|
| `RESEND_API_KEY` | existing | outreach + now partner lead notifications |
| `BLOB_READ_WRITE_TOKEN` | existing (Vercel-managed) | outreach + now lead persistence |
| `CRON_SECRET`, `OUTREACH_ADMIN_SECRET` | existing | outreach guards |
| `STRIPE_SECRET_KEY` + shop keys | existing | shop |
| `WAITLIST_WEBHOOK_URL` | optional | ESP forward (blob backup now always on) |
| **`PARTNER_LEADS_TO`** | **NEW — set this** | email address that receives partner enquiries |
| `PARTNER_LEADS_WEBHOOK_URL` | new, optional | CRM/Zapier forward for leads |
