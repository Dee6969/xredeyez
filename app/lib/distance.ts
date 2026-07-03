import type { Venue } from "../data/platform";

/** Haversine distance in metres between two coordinates. */
export function distanceMetres(aLat: number, aLng: number, bLat: number, bLng: number): number {
  const R = 6371000;
  const dLat = ((bLat - aLat) * Math.PI) / 180;
  const dLng = ((bLng - aLng) * Math.PI) / 180;
  const la1 = (aLat * Math.PI) / 180;
  const la2 = (bLat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Rough walking time — 80m/min (~4.8 km/h), minimum 1 minute. */
export function walkMinutes(metres: number): number {
  return Math.max(1, Math.round(metres / 80));
}

export function formatWalk(metres: number): string {
  const mins = walkMinutes(metres);
  if (mins <= 45) return `${mins} min walk`;
  const km = (metres / 1000).toFixed(1);
  return `${km} km away`;
}

/**
 * Nearest venues by real distance when the anchor has coordinates,
 * ranked by proximity with a light boost for featured/premium listings
 * at similar distance. Falls back to the city's editorial sort.
 */
export function nearestVenues(
  anchor: Venue,
  pool: Venue[],
  limit = 3,
): { venue: Venue; metres: number | null }[] {
  const others = pool.filter((v) => v.id !== anchor.id && v.cityId === anchor.cityId);
  const aLat = anchor.coordinates?.lat;
  const aLng = anchor.coordinates?.lng;

  if (!aLat || !aLng) {
    return others.slice(0, limit).map((venue) => ({ venue, metres: null }));
  }

  return others
    .filter((v) => v.coordinates?.lat && v.coordinates?.lng)
    .map((venue) => ({
      venue,
      metres: distanceMetres(aLat, aLng, venue.coordinates.lat!, venue.coordinates.lng!),
    }))
    .sort((a, b) => {
      const boost = (v: Venue) =>
        v.listingTier === "premium" ? 0.82 : v.listingTier === "featured" ? 0.9 : 1;
      return a.metres * boost(a.venue) - b.metres * boost(b.venue);
    })
    .slice(0, limit);
}
