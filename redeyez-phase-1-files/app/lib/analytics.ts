"use client";

/**
 * XRED EYEZ analytics abstraction.
 *
 * One typed entry point for every commercial event on the platform.
 * Currently dispatches to Vercel Analytics (already installed) and can be
 * extended to PostHog / Plausible / GA4 by adding a provider below —
 * no call sites need to change.
 */
import { track as vercelTrack } from "@vercel/analytics";

export type AnalyticsEvent =
  | "city_view"
  | "venue_view"
  | "save_place"
  | "save_route"
  | "save_limit_hit"
  | "map_filter"
  | "hotel_click"
  | "partner_click"
  | "premium_click"
  | "listing_claim_click"
  | "enquiry_submit"
  | "waitlist_join"
  | "search_query"
  | "route_build_click";

export type AnalyticsProps = Record<string, string | number | boolean>;

type Provider = (event: AnalyticsEvent, props?: AnalyticsProps) => void;

const providers: Provider[] = [
  // Vercel Analytics custom events
  (event, props) => {
    try {
      vercelTrack(event, props);
    } catch {
      // Analytics must never break the product.
    }
  },
];

/** Register an additional provider (PostHog, Plausible, GA4...) at runtime. */
export function addAnalyticsProvider(provider: Provider) {
  providers.push(provider);
}

export function trackEvent(event: AnalyticsEvent, props?: AnalyticsProps) {
  if (typeof window === "undefined") return;
  if (process.env.NODE_ENV === "development") {
    console.debug(`[analytics] ${event}`, props ?? {});
  }
  for (const provider of providers) provider(event, props);
}
