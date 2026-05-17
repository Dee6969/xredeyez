"use client";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl/mapbox";
import { useState, useCallback } from "react";
import Link from "next/link";
import type { Venue } from "../data/platform";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const AMSTERDAM = { longitude: 4.8977, latitude: 52.3707, zoom: 13 };

export default function HomepageMap({ venues }: { venues: Venue[] }) {
  const [popup, setPopup] = useState<Venue | null>(null);

  const geoVenues = venues.filter((v) => v.coordinates.lat && v.coordinates.lng);

  const closePopup = useCallback(() => setPopup(null), []);

  if (!MAPBOX_TOKEN) {
    return <MapFallback />;
  }

  return (
    <div className="home-real-map-wrap">
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={AMSTERDAM}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        attributionControl={false}
        reuseMaps
      >
        {geoVenues.map((venue) => (
          <Marker
            key={venue.id}
            longitude={venue.coordinates.lng!}
            latitude={venue.coordinates.lat!}
            anchor="center"
          >
            <button
              type="button"
              aria-label={venue.name}
              className={`home-map-real-pin${venue.isFeatured ? " is-featured" : ""}`}
              onClick={() => setPopup((p) => (p?.id === venue.id ? null : venue))}
            />
          </Marker>
        ))}

        {popup && popup.coordinates.lat && popup.coordinates.lng && (
          <Popup
            longitude={popup.coordinates.lng}
            latitude={popup.coordinates.lat}
            anchor="bottom"
            onClose={closePopup}
            closeButton={false}
            offset={16}
            className="home-map-popup"
          >
            <div className="home-map-popup-inner">
              <span className="home-map-popup-meta">
                {popup.type} · {popup.neighborhood}
              </span>
              <strong className="home-map-popup-name">{popup.name}</strong>
              <Link
                href={`/venues/${popup.slug}`}
                className="home-map-popup-link"
              >
                View guide →
              </Link>
            </div>
          </Popup>
        )}

        <NavigationControl position="bottom-right" showCompass={false} />
      </Map>

      <div className="home-real-map-badge" aria-hidden="true">
        Amsterdam · {geoVenues.length} venues mapped
      </div>
    </div>
  );
}

function MapFallback() {
  return (
    <div className="home-map-mock" style={{ height: "100%" }}>
      <div className="home-map-mock-grid" />
      <div className="home-map-mock-overlay" />
      {[
        { x: 48, y: 38, featured: true },
        { x: 36, y: 54 },
        { x: 55, y: 42, featured: true },
        { x: 62, y: 26 },
        { x: 44, y: 62 },
      ].map((pin, i) => (
        <div
          key={i}
          className={`platform-map-pin${pin.featured ? " is-featured" : ""}`}
          style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
        >
          <span />
        </div>
      ))}
      <div className="platform-map-label">Amsterdam · Add MAPBOX_TOKEN to unlock</div>
    </div>
  );
}
