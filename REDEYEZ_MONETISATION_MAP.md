# REDEYEZ MONETISATION MAP

Every revenue line, the surface that sells it, the event that measures it, and what unblocks it.

| Revenue line | Price | Selling surfaces | Conversion event(s) | Status / unblock |
|---|---|---|---|---|
| Partner listing — Starter | €49/mo | `/partners/list`, unclaimed banners on venue pages, "Own a city moment" flow cards | `listing_claim_click` → `enquiry_submit` | **Funnel now captures leads** (was losing 100%). Unblock recurring billing: Stripe prices per package (Phase 3) |
| Partner listing — Featured | €149/mo | same + top-of-section placement proof | same | same |
| Premium Partner | €299/mo | same + brand-room venue pages (`VenueBrand` already supports it) | same | same |
| City Sponsor | custom | `/partners/list` sponsor tier, route sponsor slots on city pages, `FeaturedPlacement` type | `partner_click`, `enquiry_submit` | Inventory exists in data; needs sales collateral + dashboard proof |
| Premium traveller | ~€? /mo founding rate | `/premium`, save-limit moment (10 free saves), locked route cards on every live city, vault waitlist | `premium_click` (sources: `save_limit`, `city_routes_<slug>`), `waitlist_join` | Waitlist capture now durable. Unblock: Stripe subscription + auth (Phase 2). Founding-rate promise: honour blob waitlist records |
| Booking.com hotels | affiliate % | `BookingHotelStrip` on cities, stay-layer map CTAs, `/partners/booking` redirect | `hotel_click` (wire onto strips in Phase 2 — redirect route can also log server-side) | Live; needs click attribution to prove partner ROI |
| Restaurant referrals | per deal | eat-layer map CTAs via `/partners/restaurant` | `partner_click` | Live redirect; same attribution need |
| Merch shop | margin | `/shop` (Printful + Stripe) | shop webhook | **Decision needed:** cart currently bleeds into travel UX. Recommend: keep shop, remove global cart from non-shop routes, treat as brand line not core revenue |
| Outreach engine | pipeline, not revenue | cron email sequences → `/partners/outreach` | outreach checkout route | Working; fix contact-list privacy (tech notes) before scaling volume |

## The premium moment architecture
Free users hit real value walls, never fake ones:
1. **Save #11** → "Limit reached — go Premium" (implemented)
2. **Locked insider route** per live city (implemented)
3. Full-city access + drops + cross-device sync (Phase 2, needs auth)

## Measurement (all live in `app/lib/analytics.ts`)
`city_view · venue_view · save_place · save_route · save_limit_hit · map_filter · hotel_click · partner_click · premium_click · listing_claim_click · enquiry_submit · waitlist_join · search_query · route_build_click`
Dashboards read from Vercel Analytics today; the abstraction lets PostHog/GA4 attach without touching call sites. These same numbers become the partner dashboard metrics (views, saves, clicks, route inclusions) — one event system feeds both product and sales.
