# Coordinate Audit — 2026-07-03

Total venues parsed: 329

| Issue | Count |
|---|---|
| Missing coordinates | 0 |
| Low precision (<4dp, >11m error) | 0 |
| >30km from city centre | 1 |
| Duplicate pins (shared coords) | 2 groups |

## Duplicate pins (likely copy-paste — pins stack on the map)
- `25.7617,-80.1918` shared by: Miami Cannabis Market (usa) · Curaleaf Miami (usa)
- `36.4887,-4.9525` shared by: Marbella Lifestyle Market (marbella) · La Cabane (marbella)

## Far from city centre (wrong city or swapped lat/lng)
- CzecHemp (czech-republic) — 79km out at 49.8175,15.4730


---

## Verdicts & actions (July 2026 review)

**Fixed now (verified):**
- Grey Area Amsterdam: pin was ~210m south of the shop; corrected to 52.374596, 4.888972 (verified against coffeeshop directory listing for Oude Leliestraat 2).

**Needs an editorial decision (placeholder coordinates — pins stack / point at city centres):**
- Curaleaf Miami + Miami Cannabis Market both sit on Miami's downtown centroid. Curaleaf has multiple real Miami stores — pick which location the listing represents, then pin that address.
- La Cabane + Marbella Lifestyle Market share one placeholder pin. La Cabane is at Los Monteros (east Marbella) — needs its real position.
- CzecHemp sits at the literal geographic centre of the Czech Republic. It's an association, not a walk-in venue — either pin its Prague office or remove coordinates so no misleading pin renders.

**Cleared as legitimate:** Alo + Aloette (same building, 163 Spadina Ave Toronto), Koh Tao venues, Demecan (Dresden), Boulders Beach (Simon's Town).

## The systematic fix: batch re-geocode every address
Dataset pins are approximations. `scripts/geocode-venues.mjs` re-geocodes every venue that has a street address via OpenStreetMap Nominatim (free, no key) and writes a review file of corrections >25m. Run it locally (1 req/sec, ~5 min for 329 venues):

```
node scripts/geocode-venues.mjs          # writes geocode-corrections.json
node scripts/geocode-venues.mjs --apply  # applies corrections to platform.ts
```

Review the JSON before applying. Once venues live in Supabase (Phase 2), geocoding happens on save in the admin instead.
