# REDEYEZ TECH NOTES

## Stack decisions (confirmed)
- **Next.js 16.2.6** — note: Next 16 has breaking changes vs 14/15 (async `params`/`searchParams`, Turbopack default). The repo already follows the new conventions; keep doing so. Docs ship in `node_modules/next/dist/docs/`.
- **Maps:** Leaflet is the active stack. `mapbox-gl`, `react-map-gl` and `react-leaflet-cluster` are installed but unused — remove them in Phase 2 unless Mapbox styling is wanted (if so, set `NEXT_PUBLIC_MAPBOX_TOKEN` and swap the TileLayer; the component boundaries added this pass make that a one-file change).
- **Two deploy configs exist** (`vercel.json` with cron + `netlify.toml`). Production is Vercel (cron depends on it). Delete `netlify.toml` to avoid accidental split-brain deploys.

## Lead capture architecture (new)
```
POST /api/partners/enquiry
  ├─ 1. Vercel Blob (private): leads/partner/<timestamp>-<rand>.json   ← always
  ├─ 2. Resend email → PARTNER_LEADS_TO (reply-to = lead)              ← if configured
  └─ 3. Webhook → PARTNER_LEADS_WEBHOOK_URL                            ← if configured
  succeeds if ≥1 path lands; 502 with a mailto fallback if all fail

POST /api/waitlist
  ├─ 1. Vercel Blob (private): leads/waitlist/<timestamp>-<rand>.json  ← always
  └─ 2. Webhook → WAITLIST_WEBHOOK_URL                                 ← if configured
```
One file per lead = no read-modify-write races. List with `list({ prefix: "leads/partner/" })` for a future admin inbox.
**Action required:** set `PARTNER_LEADS_TO` in Vercel env (e.g. `partners@redeyez.co.uk`).

## ⚠️ Outreach contacts blob — privacy fix (not applied, do deliberately)
`app/lib/outreach/store.ts` writes the full prospect list to a **public** blob at the fixed path `outreach/contacts.json`. Fix when you can verify against production data:

1. Change `put(..., { access: "public" })` → `access: "private"`.
2. Change `readContacts()` from `list()` + public `downloadUrl` fetch to:
   ```ts
   import { get } from "@vercel/blob";
   const { blob } = await get(BLOB_PATHNAME, { access: "private", useCache: false });
   const contacts = blob ? JSON.parse(await blob.text()) : [];
   ```
3. Migration: read the existing public blob once, rewrite as private, then `del()` the public one.
4. Verify the 08:00 cron still processes contacts the next day before deleting anything.

Not hot-swapped in this pass because a mixed public/private state could silently stall the live outreach cron.

## Sandbox/build notes
- `scripts/sandbox-build.sh` exists only because this audit environment can't reach Google Fonts; it stubs `next/font/google`, builds, restores. **Vercel builds are unaffected** — you can delete the script or keep it for offline CI.
- Build baseline after Phase 1: **438 static pages**, zero type errors, zero lint errors on changed files.

## Conventions for new code
- Client components import `trackEvent` from `app/lib/analytics.ts` — never call a vendor SDK directly.
- New route-shaped content should use `CuratedRoute` from `app/lib/types/routes.ts`, not ad-hoc shapes.
- City coordinates live in `app/data/geo.ts` — single source for all map surfaces.
- All lead-capturing endpoints must persist before they notify (blob first, email second).

## Night Field Guide re-skin (dark theme) — implementation notes
- The entire theme flip lives in the `:root` token block of `globals.css` plus ~40 surgical remaps of hardcoded ink/glass values. To tune the theme, edit tokens — don't scatter new hex values.
- `--text-inverse` deliberately stays bone (#F5F0E6): 150+ legacy dark-surface rules (map sheet, popups, footer, hero overlays) depend on it. Treat it as "text on dark accents", not a literal inverse.
- Basemaps switched to CARTO `dark_all` (retina). `NEXT_PUBLIC_MAPTILER_KEY` now selects MapTiler `streets-v2-dark`.
- The atmosphere signature is a single fixed `body::before` smoke field (amber haze top-right, ember low-left). Resist adding more glows — the red ember is reserved for primary money CTAs only.
- Venue brand rooms (`--venue-accent` color-mix gradients) were intentionally left self-contained; they carry their own palettes.
- Pre-dark stylesheet snapshot: `git show` the commit before this one, or `/tmp/globals.css.pre-dark` during this session.
