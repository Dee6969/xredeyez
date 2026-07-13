"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import MapActions from "./MapActions";
import type { Venue } from "../data/platform";

const VenueMiniMap = dynamic(() => import("./VenueMiniMap"), {
  ssr: false,
  loading: () => <div className="venue-minimap venue-minimap-loading">Loading map…</div>,
});

/**
 * The location intelligence block on every venue page:
 * live mini-map, address, and native navigation actions.
 */
export default function VenueLocationCard({ venue, accent }: { venue: Venue; accent?: string }) {
  const hasGeo = Boolean(venue.coordinates?.lat && venue.coordinates?.lng);

  return (
    <div className="venue-location-card">
      {hasGeo && <VenueMiniMap venue={venue} />}
      <div className="venue-location-body">
        <div className="eyebrow" style={accent ? { color: accent } : undefined}>Find it</div>
        <div className="venue-location-address">
          {venue.address ? (
            <>
              <strong>{venue.address}{venue.postcode ? `, ${venue.postcode}` : ""}</strong>
              <span>{venue.neighborhood} · {venue.city}</span>
            </>
          ) : (
            <>
              <strong>{venue.neighborhood}</strong>
              <span>{venue.city}</span>
            </>
          )}
        </div>
        <MapActions
          lat={venue.entranceLat ?? venue.coordinates?.lat}
          lng={venue.entranceLng ?? venue.coordinates?.lng}
          name={venue.name}
          address={venue.address}
          city={venue.city}
          placeId={venue.googlePlaceId}
          heading={venue.streetViewHeading}
          venueId={venue.id}
        />
        <Link href={`/cities/${venue.cityId}/map?venue=${venue.id}`} className="venue-location-maplink">
          See it on the {venue.city} map →
        </Link>
      </div>
    </div>
  );
}
