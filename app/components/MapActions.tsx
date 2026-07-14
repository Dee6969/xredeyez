"use client";

import { trackEvent } from "../lib/analytics";

/**
 * Native map deep links for a venue.
 *
 * "Walk there" opens turn-by-turn walking directions in the visitor's
 * native maps app — Apple Maps on iPhone/iPad, Google Maps everywhere
 * else. "Street View" drops them at the venue's doorstep in Google
 * Street View. No API keys, no embeds — pure deep links, which is also
 * the fastest possible mobile experience.
 */

function isAppleDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

/**
 * Directions destination strategy: prefer the human address.
 * Google/Apple resolve "Name, Street, City" against their own business
 * registry and route to the real entrance — more accurate than our pin,
 * which may sit on a rooftop or street centreline. Raw coordinates are
 * the fallback when no address exists.
 */
export function walkingDirectionsUrl(
  lat: number,
  lng: number,
  name?: string,
  address?: string,
  city?: string,
  placeId?: string,
): string {
  // Google Place ID is the gold standard: routes to the registered
  // business entrance regardless of our pin accuracy.
  if (placeId && !isAppleDevice()) {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${placeId}&travelmode=walking`;
  }
  const destination =
    address && city ? `${name ? `${name}, ` : ""}${address}, ${city}` : `${lat},${lng}`;
  if (isAppleDevice()) {
    const params = new URLSearchParams({ daddr: destination, dirflg: "w" });
    return `https://maps.apple.com/?${params.toString()}`;
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}&travelmode=walking`;
}

export function streetViewUrl(lat: number, lng: number, heading?: number): string {
  const head = typeof heading === "number" ? `&heading=${heading}` : "";
  return `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${lat},${lng}${head}`;
}

export function placeUrl(lat: number, lng: number, placeId?: string): string {
  const pid = placeId ? `&query_place_id=${placeId}` : "";
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}${pid}`;
}

export default function MapActions({
  lat,
  lng,
  name,
  address,
  city,
  placeId,
  heading,
  venueId,
  compact = false,
  streetView = false,
}: {
  lat?: number;
  lng?: number;
  name?: string;
  address?: string;
  city?: string;
  placeId?: string;
  heading?: number;
  venueId?: string;
  compact?: boolean;
  /** Street View renders ONLY for venues with verified entrance coordinates. */
  streetView?: boolean;
}) {
  if (!lat || !lng) return null;

  return (
    <div className={`map-actions${compact ? " is-compact" : ""}`}>
      <a
        href={walkingDirectionsUrl(lat, lng, name, address, city, placeId)}
        target="_blank"
        rel="noopener noreferrer"
        className="map-action-btn is-walk"
        data-hover
        onClick={() => trackEvent("directions_click", { venue: venueId ?? "unknown", mode: "walk" })}
      >
        <span className="map-action-icon" aria-hidden>➤</span>
        Walk there
      </a>
      {streetView && (
      <a
        href={streetViewUrl(lat, lng, heading)}
        target="_blank"
        rel="noopener noreferrer"
        className="map-action-btn is-street"
        data-hover
        onClick={() => trackEvent("streetview_click", { venue: venueId ?? "unknown" })}
      >
        <span className="map-action-icon" aria-hidden>◉</span>
        Street View
      </a>
      )}
    </div>
  );
}
