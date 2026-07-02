/**
 * Route Builder — data schema (Phase 1 foundation).
 *
 * Routes are the commercial moat: curated movement through a city,
 * not a list. This schema is deliberately storage-agnostic so the same
 * shapes work hardcoded today and in Postgres/Supabase tomorrow.
 *
 * The existing City.routes (title/duration/description/stops[]) remains
 * untouched for backwards compatibility; CuratedRoute is the target
 * shape new routes should be authored in.
 */

export type RouteMood =
  | "first-timer"
  | "social"
  | "premium"
  | "hidden"
  | "recovery"
  | "after-dark"
  | "romantic"
  | "solo"
  | "creative";

export type RouteDuration = "2h" | "half-day" | "full-day" | "weekend";

export type RouteTransport = "walk" | "tram" | "metro" | "taxi" | "bike" | "ferry";

export interface RouteStop {
  /** Order within the route, starting at 1. */
  order: number;
  /** Venue reference — resolves against the venue dataset. */
  venueId?: string;
  /** Free-text stop when no venue exists yet (e.g. "Vondelpark east gate"). */
  label?: string;
  /** Neighbourhood / area name for the stop card. */
  area: string;
  /** Suggested dwell time in minutes. */
  dwellMinutes: number;
  /** How to reach the NEXT stop. */
  transitToNext?: {
    mode: RouteTransport;
    minutes: number;
    note?: string;
  };
  /** Marks food/water/rest stops — every good route has a reset. */
  isFoodReset?: boolean;
  /** Editor's one-liner for this stop. */
  note?: string;
}

export interface CuratedRoute {
  id: string;
  slug: string;
  cityId: string;
  title: string;
  mood: RouteMood[];
  duration: RouteDuration;
  summary: string;
  stops: RouteStop[];
  /** Hotel/stay CTA anchor — venueId of a stay-layer venue or Booking.com deep link. */
  stayAnchor?: { venueId?: string; bookingUrl?: string };
  /** Premium routes render locked for free users. */
  premiumOnly: boolean;
  /** Commercial: partner venue paying for route inclusion. */
  sponsorVenueId?: string;
  heroImage?: string;
  publishedAt?: string;
}

/** Estimated total minutes for a route (dwell + transit). */
export function routeTotalMinutes(route: CuratedRoute): number {
  return route.stops.reduce(
    (total, stop) => total + stop.dwellMinutes + (stop.transitToNext?.minutes ?? 0),
    0,
  );
}
