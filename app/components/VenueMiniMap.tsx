"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import type { Venue } from "../data/platform";
import { getTileConfig } from "../data/geo";

const pinIcon = L.divIcon({
  className: "xred-leaflet-marker is-active",
  html: "<span></span>",
  iconSize: [38, 38],
  iconAnchor: [19, 19],
});

export default function VenueMiniMap({ venue }: { venue: Venue }) {
  const lat = venue.coordinates.lat!;
  const lng = venue.coordinates.lng!;
  const tiles = getTileConfig();

  return (
    <div className="venue-minimap">
      <MapContainer
        center={[lat, lng]}
        zoom={15}
        zoomControl={false}
        scrollWheelZoom={false}
        dragging={false}
        doubleClickZoom={false}
        touchZoom={false}
        keyboard={false}
        attributionControl={false}
        className="venue-minimap-canvas"
      >
        <TileLayer url={tiles.url} attribution={tiles.attribution} maxZoom={tiles.maxZoom} />
        <Marker position={[lat, lng]} icon={pinIcon} interactive={false} />
      </MapContainer>
    </div>
  );
}
