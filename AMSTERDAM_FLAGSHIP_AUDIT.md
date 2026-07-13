# AMSTERDAM FLAGSHIP AUDIT — July 2026

**Scope:** Amsterdam as flagship proof-of-concept. 54 venues after dedupe (was 58 with 4 duplicates).

## Current state (post-cleanup pass 1)

**Routes:** `/cities/amsterdam`, `/cities/amsterdam/map` (+ `?venue=` deep-selection, new), 5 neighbourhood pages, 54 venue profiles, 3 city routes (string-based stops).

**Data model:** venues in `platform.ts` — now extended with image-trust fields (`imageStatus`, `imageRights`, `imageSource`, `imageSourceUrl`, `imageAlt`, `lastImageCheckedAt`) and entrance-level location fields (`entranceLat/Lng`, `googlePlaceId`, `streetViewLat/Lng/Heading`, `coordinateStatus`, `lastLocationCheckedAt`). All optional; absence = honest defaults (`pending`/`approximate`).

**Map:** Leaflet + CARTO Voyager tiles; layer + region filters; venue drawer with save/route/walk/street-view; locate-me. NEW: venue cards and profiles open the map with that venue pre-selected and the drawer open.

**Images — the critical finding:** no Amsterdam venue has a verified photo. Venue `image` fields recycle generic city shots (`/cities/amsterdam-canal-day.png` across many venues); `public/venues/` holds 180 generated SVG brand banners (stylised art, not photos). FIXED at render layer: untrusted photos no longer display as venue imagery anywhere (cards, hero, OG images) — premium generated category/brand art renders instead. Real photos return per-venue by setting `imageStatus` once a genuine image is sourced (partner-supplied preferred).

**Coordinates:** all approximate (directory-grade, not entrance-level). Grey Area corrected earlier (verified). Directions already address-first + now Place-ID-first; Street View accepts headings. Google Place IDs: 0 of 54 — the single highest-value data task remaining.

**Trust labels:** 7 unearned `partner`/`claimed` statuses reset to `unclaimed`. Public fake stats were removed in an earlier pass. Remaining rule: `claimStatus: "partner"` may only be set against a real commercial relationship.

**Merch language:** cart contained to /shop earlier. Remaining: Shop link in main nav/footer — pending an explicit call (it's revenue infrastructure; recommend de-linking from travel nav, keeping the route).

**Duplicates:** resolved — see AMSTERDAM_DATA_CLEANUP_REPORT.md.

## What remains (in priority order)
1. **Google Place IDs for all 54 venues** — unlocks entrance-perfect directions. Manual or Places API task; fields + URL builders are ready.
2. **18 venues missing opening hours, 6 missing addresses** — full lists in AMSTERDAM_VENUE_QA.md. Hours gaps already render as claim CTAs.
3. **Real images** — source partner-supplied or official photos venue-by-venue; set `imageStatus` + `imageRights` as they land.
4. **Run `scripts/geocode-venues.mjs` locally** — batch-corrects approximate pins from addresses (5 min).
5. **Routes as venue-ID structures** — schema exists (`CuratedRoute`); Amsterdam's 3 routes need re-authoring with exact IDs + 5 new presets per the brief.
6. **SEO layer 2** — FAQ block, OG image, richer internal links on the city page.
