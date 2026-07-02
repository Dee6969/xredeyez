# REDEYEZ SEO PLAN

## Technical state after Phase 1
✅ Dynamic `app/sitemap.ts` — every city, venue (tier-weighted priority), guide, neighbourhood, dna, room, legal page; auto-updates each build
✅ Canonicals + real OG on all money pages (`/map`, `/premium`, `/partners/list`) — previously generic
✅ Schema already strong: Organization, Website, TouristDestination, FAQPage, LocalBusiness, BreadcrumbList, Article
✅ Stats no longer render "0 venues" to crawlers (E-E-A-T / trust signal)
✅ robots.ts correct (blocks /api, /partners/claim, /admin; points at sitemap)

## Next technical actions (Phase 2)
1. **OG images**: `opengraph-image.tsx` per city + venue with `next/og` — city hero + name + "245+ venues" framing. Biggest CTR lever available.
2. **Venue schema enrichment**: add `openingHours`, `geo` (lat/lng exists for ~330 venues), `sameAs` (partnerUrl) to `localBusinessSchema`.
3. **Internal linking**: guides → venues mentioned (currently weak); neighbourhood pages → their venues; "Nearby" already good.
4. **Google Search Console**: submit new sitemap, request re-crawl of `/map`, `/premium`, `/partners/list`; watch for legacy shop-era URLs 404ing — add redirects for any with backlinks.
5. **Domain history**: redeyez.co.uk previously operated as a CBD e-commerce shop (old Trustpilot reviews exist). Decide the story: keep shop on `/shop` with distinct branding, and ensure old product URLs 301 to `/shop` or 410 — don't leave them soft-404ing.

## Keyword architecture (city pages already structurally match)
Per live city, target with existing page sections + FAQ blocks:
- `cannabis travel guide {city}` → city page hero + FAQ (exists)
- `best coffeeshops {city}` / `cannabis social clubs {city}` → cannabis layer section (exists — add anchor headings with the phrase)
- `cannabis friendly hotels {city}` → stay layer + Booking strip (add the phrase to the section heading, "where lawful" wording intact)
- `things to do in {city}` → do layer
- `{neighbourhood} {city} guide` → neighbourhood pages (exist — thin; enrich to 300+ words each)
- `alternative travel guide {city}` → guides

Long-form guides (`/guides`) are the ranking engine: current 4 are strong; Phase 3 targets 2 per live city, each internally linking 10+ venue pages.

## Content rules (keeps rankings AND compliance)
- Never "buy cannabis in X" phrasing — always culture/guide/etiquette framing (matches the compliance layer added this pass)
- FAQ blocks answer legality questions factually with "check current local rules" framing — this is both the compliant and the featured-snippet-winning move
- Every city page ends with one clear next action (map / premium / hotel) — search traffic must land in the conversion loop
