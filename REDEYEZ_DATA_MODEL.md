# REDEYEZ DATA MODEL

Current shapes live in `app/data/platform.ts` (cities, venues, vibes, featured placements) and are good — this document maps them to the target Postgres/Supabase schema so migration is mechanical, not a rewrite.

## Target tables (Phase 2)

**cities** — id (pk, slug), name, country, status(`flagship|live|coming`), summary, legal_context, hero_image, vibe_ids text[], sponsorship_slots text[], created_at
**neighborhoods** — id, city_id fk, name, mood, note, slug
**venues** — id (pk, slug), city_id fk, name, neighborhood, type, layer(`cannabis|stay|eat|do`), cannabis_friendly bool, description, guide_note, highlights text[], best_for text[], vibe_ids text[], lat, lng, address, postcode, opening_hours jsonb, image, gallery text[], listing_tier(`free|featured|premium`), claim_status(`unclaimed|claimed|partner`), is_featured bool, featured_weight int, partner_url, booking_url, referral_code, brand jsonb, created_at, updated_at
**routes** — `CuratedRoute` from `app/lib/types/routes.ts` verbatim: id, slug, city_id fk, title, mood text[], duration enum, summary, premium_only bool, sponsor_venue_id fk?, stay_anchor jsonb, hero_image, published_at
**route_stops** — id, route_id fk, order int, venue_id fk?, label, area, dwell_minutes int, transit_mode, transit_minutes, transit_note, is_food_reset bool, note
**members** — id (auth uid), email, premium_until timestamptz?, stripe_customer_id, preferences jsonb, created_at
**saves** — member_id fk, item_type(`venue|city|vibe|collection|route`), item_id, collection_id fk?, saved_at (pk: member+type+item)
**collections** — id, member_id fk, name, emoji, created_at
**leads** — id, kind(`partner|waitlist`), payload jsonb, status(`new|reviewing|approved|closed`), source_page, created_at  ← replaces blob files
**claims** — id, venue_id fk?, business_name, contact_name, email, phone, message, package_id, status, created_at
**partner_packages** — id(`starter|featured|premium|sponsor`), price_eur, stripe_price_id, features jsonb
**hotel_links** — venue_id fk, booking_url, affiliate_code, active
**guides** — current `app/data/guides.ts` shape + city_id fk, published_at
**premium_drops** — id, city_id fk, title, body, premium_only bool, published_at
**events** (optional, if self-hosting analytics later) — event, props jsonb, member_id?, created_at
**seo_meta** — path (pk), title, description, canonical, og_image — override layer on top of generated metadata

## Rules that must survive migration
- `city.id === city.slug` is assumed across the codebase — keep or refactor deliberately.
- `getVenueLayer()` infers layer from `type` when `layer` is null; backfill `layer` during import so the DB is explicit.
- `featuredWeight` drives sort order in `getSortedVenuesByCity` — becomes an indexed column.
- Free save allowance: `FREE_SAVE_LIMIT = 10` (`app/components/SaveButton.tsx`); premium = unlimited. Enforce server-side once saves move to the DB.

## Migration path
1. `scripts/export-platform-data.mjs` → JSON from `platform.ts` (types already exported).
2. Supabase migration SQL from the tables above; import JSON.
3. Swap `app/data/platform.ts` getters for a `app/lib/db.ts` module with the same function signatures (`getCity`, `getVenuesByCity`, …) — pages don't change.
4. Keep `platform.ts` as seed/fixture data for local dev.
