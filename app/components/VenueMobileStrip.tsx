import type { Venue } from "../data/platform";

export default function VenueMobileStrip({ venue }: { venue: Venue }) {
  const mapsUrl = venue.coordinates?.lat
    ? `https://www.google.com/maps/search/?api=1&query=${venue.coordinates.lat},${venue.coordinates.lng}`
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
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="vlp-mobile-btn"
        >
          Directions
        </a>
        {venue.partnerUrl ? (
          <a
            href={venue.partnerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="vlp-mobile-btn vlp-mobile-btn-primary"
          >
            Website ↗
          </a>
        ) : (
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="vlp-mobile-btn vlp-mobile-btn-primary"
          >
            Open Maps
          </a>
        )}
      </div>
    </div>
  );
}
