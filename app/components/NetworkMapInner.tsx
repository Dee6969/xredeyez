"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Link from "next/link";
import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from "react-leaflet";
import type { City } from "../data/platform";
import { CITY_CENTERS } from "../data/geo";

const liveIcon = L.divIcon({
  className: "xred-leaflet-marker",
  html: "<span></span>",
  iconSize: [38, 38],
  iconAnchor: [19, 19],
  popupAnchor: [0, -22],
});

const comingIcon = L.divIcon({
  className: "xred-leaflet-marker is-coming",
  html: "<span></span>",
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -18],
});

export default function NetworkMapInner({ cities }: { cities: City[] }) {
  const pins = cities
    .map((city) => ({ city, center: CITY_CENTERS[city.slug] }))
    .filter((p): p is { city: City; center: { lat: number; lng: number; zoom: number } } => Boolean(p.center));

  return (
    <MapContainer
      center={[44, 8]}
      zoom={4}
      minZoom={2}
      zoomControl={false}
      scrollWheelZoom={false}
      className="network-map-canvas"
      worldCopyJump
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="bottomright" />
      {pins.map(({ city, center }) => {
        const isLive = city.status === "flagship" || city.status === "live";
        return (
          <Marker key={city.id} position={[center.lat, center.lng]} icon={isLive ? liveIcon : comingIcon}>
            <Popup className="xred-leaflet-popup">
              <div className="network-map-popup">
                <span className="network-map-popup-country">{city.country}</span>
                <strong className="network-map-popup-name">{city.name}</strong>
                <span className={`map-city-picker-status${isLive ? " is-live" : ""}`}>
                  {city.status === "flagship" ? "Flagship" : city.status === "live" ? "Live" : "Coming soon"}
                </span>
                {isLive ? (
                  <Link href={`/cities/${city.slug}/map`} className="network-map-popup-cta">
                    Open live map →
                  </Link>
                ) : (
                  <Link href={`/cities/${city.slug}`} className="network-map-popup-cta">
                    Preview city →
                  </Link>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
