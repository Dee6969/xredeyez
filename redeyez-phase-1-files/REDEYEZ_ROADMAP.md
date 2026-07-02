# REDEYEZ ROADMAP

## Phase 1 — 48-hour high-impact upgrade ✅ (this branch)
- [x] Partner enquiry capture: blob + email + webhook (was: 100% lead loss)
- [x] Waitlist durable persistence (was: console.log)
- [x] Homepage stats SSR real values (was: "0+ Venues" to crawlers)
- [x] Dynamic sitemap from platform data (was: stale static file)
- [x] Canonicals/OG on `/map`, `/premium`, `/partners/list`
- [x] `/map` → network overview map gateway (was: card list only)
- [x] Typed analytics event layer + wired: saves, save-limit, search, map filters, enquiries, premium clicks
- [x] Free save limit (10) → premium moment
- [x] Locked premium route card on every live city
- [x] Reusable compliance module (city access sections, cannabis venue pages, footer)
- [x] Route-builder schema (`CuratedRoute`) committed
- [x] Package intent carried through claim links (`?package=`)

## Phase 2 — 7-day MVP platform
**Goal: accounts, durable data, premium billable.**
1. Supabase project + schema from REDEYEZ_DATA_MODEL.md; export/import script from `platform.ts`
2. Supabase Auth (email magic link + Google); `members` table
3. Saves sync: localStorage → DB merge on sign-in; premium = unlimited (server-enforced)
4. Stripe Premium subscription: product + founding-rate price, checkout, customer portal, webhook → `members.premium_until`; email the waitlist blobs first
5. Lead inbox: minimal `/admin/leads` (guarded) reading `leads/partner/` + `leads/waitlist/`
6. Shop containment: remove global cart from travel routes; shop keeps its own layout
7. OG image generation (cities first); `hotel_click`/`partner_click` on Booking strips + redirect-route server logging
8. Outreach blob → private (spec in tech notes); delete `netlify.toml`; drop unused mapbox deps

## Phase 3 — 30-day commercial platform
1. Route Builder v1: author 3 `CuratedRoute`s per flagship city; mood/time picker UI; premium routes gated; save/share routes
2. Partner dashboard v1: claim → account link, listing edit, per-venue views/saves/clicks from the event stream
3. Partner billing: Stripe recurring for €49/€149/€299; self-serve upgrade from dashboard
4. City sponsor inventory: `FeaturedPlacement` admin + availability page for sales
5. Search v2: vibe/best-for/layer facets, no-result partner suggestion
6. Content: +2 long-form guides per live city; neighbourhood pages to 300+ words; internal-link pass
7. Compliance review pass with counsel on partner claims + outreach (UK PECR / GDPR)

## Phase 4 — investor-ready travel network
1. New-city playbook: data template + checklist proving city launch <1 week
2. Member travel boards (venues + routes + hotels + notes, shareable)
3. Partner ROI reporting: booking referrals + clicks per venue, monthly statements
4. Proprietary data moat: hours, vibe scoring, seasonal signals per venue
5. B2B: tourism boards / hotel groups API + white-label city intelligence
6. Multi-language (NL/ES/DE first), currency display
7. Metrics pack for raise: MRR by line, save→premium conversion, partner retention, city unit economics

## Next 10 build tasks in priority order
1. Set `PARTNER_LEADS_TO` in Vercel env and deploy this branch
2. Send a test enquiry + waitlist entry in prod; confirm blob + email arrive
3. Submit new sitemap in Search Console
4. Supabase project + schema + import script
5. Supabase Auth + saves sync
6. Stripe Premium subscription end-to-end
7. `/admin/leads` inbox
8. Remove global cart from travel routes
9. City OG images
10. Author first 3 `CuratedRoute`s for Amsterdam + route picker UI
