"use client";

import "leaflet/dist/leaflet.css";
import Link from "next/link";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from "react-leaflet";
import type { City, Venue } from "../data/platform";

const NETWORK_CENTER = { lat: 44.6, lng: -8.2, zoom: 3 };

const venueIcon = L.divIcon({
  className: "xred-leaflet-marker",
  html: "<span></span>",
  iconSize: [38, 38],
  iconAnchor: [19, 19],
  popupAnchor: [0, -22],
});

const cityIcon = L.divIcon({
  className: "xred-leaflet-city-marker",
  html: "<span></span><b></b>",
  iconSize: [54, 54],
  iconAnchor: [27, 27],
  popupAnchor: [0, -28],
});

const londonBrandIcon = L.divIcon({
  className: "xred-leaflet-logo-marker",
  html: '<img src="/redeyez-logo.jpeg" alt="" />',
  iconSize: [82, 52],
  iconAnchor: [41, 52],
  popupAnchor: [0, -54],
});

const LONDON_CENTER = { lat: 51.5074, lng: -0.1278 };

const CITY_CENTERS: Record<string, { lat: number; lng: number }> = {
  amsterdam: { lat: 52.3707, lng: 4.8977 },
  "den-haag": { lat: 52.0800, lng: 4.3007 },
  rotterdam: { lat: 51.9244, lng: 4.4777 },
  barcelona: { lat: 41.3851, lng: 2.1734 },
  tenerife: { lat: 28.2916, lng: -16.6291 },
  marbella: { lat: 36.5101, lng: -4.8824 },
  thailand: { lat: 13.7563, lng: 100.5018 },
  germany: { lat: 52.52, lng: 13.405 },
  usa: { lat: 39.8283, lng: -98.5795 },
  "czech-republic": { lat: 50.0755, lng: 14.4378 },
  "south-africa": { lat: -33.9249, lng: 18.4241 },
};

export default function HomepageMap({ venues, cities }: { venues: Venue[]; cities: City[] }) {
  const geoVenues = venues.filter((venue) => venue.coordinates.lat && venue.coordinates.lng);

  return (
    <div className="home-real-map-wrap">
      <MapContainer
        center={[NETWORK_CENTER.lat, NETWORK_CENTER.lng]}
        zoom={NETWORK_CENTER.zoom}
        minZoom={2}
        maxZoom={18}
        zoomControl={false}
        scrollWheelZoom
        className="home-leaflet-map"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {geoVenues.map((venue) => (
          <Marker key={venue.id} position={[venue.coordinates.lat!, venue.coordinates.lng!]} icon={venueIcon}>
            <Popup closeButton={false} className="xred-leaflet-popup">
              <strong>{venue.name}</strong>
              <span>{venue.city} / {venue.type}</span>
              <Link href={`/venues/${venue.slug}`}>Open guide</Link>
            </Popup>
          </Marker>
        ))}
        {cities.map((city) => {
          const center = CITY_CENTERS[city.slug];
          if (!center) return null;

          return (
            <Marker key={city.id} position={[center.lat, center.lng]} icon={cityIcon} zIndexOffset={-100}>
              <Popup closeButton={false} className="xred-leaflet-popup is-city-popup">
                <strong>{city.name}</strong>
                <span>{city.country} / {city.status === "coming" ? "Coming soon" : "Live guide"}</span>
                <Link href={`/cities/${city.slug}`}>Open city guide</Link>
              </Popup>
            </Marker>
          );
        })}
        <Marker position={[LONDON_CENTER.lat, LONDON_CENTER.lng]} icon={londonBrandIcon} zIndexOffset={500}>
          <Popup closeButton={false} className="xred-leaflet-popup is-brand-popup">
            <strong>XRED EYEZ</strong>
            <span>London signal / powered by hemp</span>
          </Popup>
        </Marker>
        <ZoomControl position="bottomright" />
      </MapContainer>
      <div className="platform-map-sheen" />
      <div className="home-real-map-badge" aria-hidden="true">
        Global network / {geoVenues.length} places mapped
      </div>
    </div>
  );
}
