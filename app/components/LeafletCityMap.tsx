"use client";

import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from "react-leaflet";
import type { City, Venue } from "../data/platform";

const markerIcon = L.divIcon({
  className: "xred-leaflet-marker",
  html: "<span></span>",
  iconSize: [38, 38],
  iconAnchor: [19, 19],
  popupAnchor: [0, -22],
});

const activeMarkerIcon = L.divIcon({
  className: "xred-leaflet-marker is-active",
  html: "<span></span>",
  iconSize: [44, 44],
  iconAnchor: [22, 22],
  popupAnchor: [0, -24],
});

const cityMarkerIcon = L.divIcon({
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

export default function LeafletCityMap({
  center,
  venues,
  cities,
  cityCenters,
  activeCityId,
  selectedId,
  onSelect,
}: {
  center: { lat: number; lng: number; zoom: number };
  venues: Venue[];
  cities: City[];
  cityCenters: Record<string, { lat: number; lng: number; zoom: number }>;
  activeCityId: string;
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={center.zoom}
      minZoom={3}
      maxZoom={18}
      zoomControl={false}
      scrollWheelZoom
      className="platform-leaflet-map"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {venues.map((venue) => (
        <Marker
          key={venue.id}
          position={[venue.coordinates.lat!, venue.coordinates.lng!]}
          icon={selectedId === venue.id ? activeMarkerIcon : markerIcon}
          eventHandlers={{
            click: () => onSelect(venue.id),
          }}
        >
          <Popup closeButton={false} className="xred-leaflet-popup">
            <strong>{venue.name}</strong>
            <span>{venue.type} / {venue.neighborhood}</span>
          </Popup>
        </Marker>
      ))}
      {cities.map((city) => {
        const cityCenter = cityCenters[city.slug];
        if (!cityCenter || city.id === activeCityId) return null;

        return (
          <Marker
            key={city.id}
            position={[cityCenter.lat, cityCenter.lng]}
            icon={cityMarkerIcon}
            zIndexOffset={-100}
          >
            <Popup closeButton={false} className="xred-leaflet-popup is-city-popup">
              <strong>{city.name}</strong>
              <span>{city.country} / {city.status === "coming" ? "Coming soon" : "Live guide"}</span>
              <a href={`/cities/${city.slug}`}>Open city guide</a>
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
      <ZoomControl position="topright" />
    </MapContainer>
  );
}
