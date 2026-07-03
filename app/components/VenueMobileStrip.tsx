"use client";
import type { Venue } from "../data/platform";
import { walkingDirectionsUrl, streetViewUrl } from "./MapActions";
import { trackEvent } from "../lib/analytics";

export default function VenueMobileStrip({ venue }: { venue: Venue }) {
  const hasGeo = Boolean(venue.coordinates?.lat && venue.coordinates?.lng);
  const walkUrl = hasGeo
    ? walkingDirectionsUrl(venue.coordinates.lat!, venue.coordinates.lng!, venue.name, venue.address, venue.city)
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${venue.name} ${venue.city}`)}`;

  return (
    <div className="vlp-mobile-strip">
      <div className="vlp-mobile-strip-meta">
        <span className="vlp-mobile-strip-name">{venue.name}</span>
        <span className="vlp-mobile-strip-hours">
          {venue.openingHours ?? venue.neighborhood}
        </span>
      </div>
      <div className="vlp-mobile-strip-actions">
        {venue.partnerUrl ? (
          <a
            href={venue.partnerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="vlp-mobile-btn"
            onClick={() => trackEvent("partner_click", { venue: venue.id, source: "mobile_strip" })}
          >
            Website ↗
          </a>
        ) : hasGeo ? (
          <a
            href={streetViewUrl(venue.coordinates.lat!, venue.coordinates.lng!)}
            target="_blank"
            rel="noopener noreferrer"
            className="vlp-mobile-btn"
            onClick={() => trackEvent("streetview_click", { venue: venue.id })}
          >
            ◉ Street
          </a>
        ) : null}
        <a
          href={walkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="vlp-mobile-btn vlp-mobile-btn-primary"
          onClick={() => trackEvent("directions_click", { venue: venue.id, mode: "walk" })}
        >
          ➤ Walk there
        </a>
      </div>
    </div>
  );
}
