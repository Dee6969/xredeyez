"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, ZoomControl, useMap, Tooltip } from "react-leaflet";
import { getCoordinateState } from "../data/platform";
import type { City, Venue } from "../data/platform";
import { getTileConfig } from "../data/geo";
import { walkingDirectionsUrl, streetViewUrl } from "./MapActions";
import { trackEvent } from "../lib/analytics";

function FlyTo({ lat, lng, zoom }: { lat: number; lng: number; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], zoom, { duration: 1.2 });
  }, [map, lat, lng, zoom]);
  return null;
}

// ── Category pin factory: SVG glyph chips, layer-coloured, partner-aware ──
const PIN_GLYPHS: Record<string, string> = {
  cannabis:
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c.9 2.4 1.4 4.9 1.2 7.4 1.5-1.9 3.4-3.3 5.6-4.2-1 2.2-1.6 4.6-1.5 7 1.6-.9 3.4-1.4 5.2-1.5-1.3 1.7-2.9 3-4.8 3.9 1.2.3 2.4.8 3.4 1.5-1.6.6-3.3.8-5 .5.6 1 1 2.2 1.1 3.4-1.4-.6-2.6-1.5-3.6-2.6V21h-1.2v-2.6c-1 1.1-2.2 2-3.6 2.6.1-1.2.5-2.4 1.1-3.4-1.7.3-3.4.1-5-.5 1-.7 2.2-1.2 3.4-1.5-1.9-.9-3.5-2.2-4.8-3.9 1.8.1 3.6.6 5.2 1.5-.1-2.4-.5-4.8-1.5-7 2.2.9 4.1 2.3 5.6 4.2-.2-2.5.3-5 1.2-7.4z"/></svg>',
  stay:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M3 18v-6a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v6"/><path d="M3 18h18"/><path d="M5 11V7a1 1 0 0 1 1-1h5v5"/><circle cx="8" cy="8.6" r="0.4" fill="currentColor"/></svg>',
  eat:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M7 3v7a2 2 0 0 0 4 0V3"/><path d="M9 3v18"/><path d="M17 3c-1.7 1.4-2.5 3.4-2.5 5.5 0 1.4.9 2.5 2.5 2.5V21"/></svg>',
  do:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/></svg>',
};

const iconCache = new Map<string, L.DivIcon>();
function venuePinIcon(layer: string | undefined, selected: boolean, partnerColor?: string): L.DivIcon {
  const kind = layer === "stay" || layer === "eat" ? layer : layer === "cannabis" ? "cannabis" : "do";
  const key = `${kind}|${selected ? 1 : 0}|${partnerColor || ""}`;
  const hit = iconCache.get(key);
  if (hit) return hit;
  const size = selected ? 48 : 38;
  const ring = partnerColor
    ? `style="--pin-partner:${partnerColor}"`
    : "";
  const icon = L.divIcon({
    className: `xpin-wrap`,
    html: `<span class="xpin is-${kind}${selected ? " is-selected" : ""}${partnerColor ? " is-partner" : ""}" ${ring}>${PIN_GLYPHS[kind]}</span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2 + 6)],
  });
  iconCache.set(key, icon);
  return icon;
}

function buildBookingLink(venue: Venue): string {
  const destination = [venue.name, venue.neighborhood, venue.country || venue.city]
    .filter(Boolean)
    .join(", ");
  const params = new URLSearchParams({
    destination,
    city: venue.cityId,
    venue: venue.id,
    source: "map-pin",
  });
  if (venue.bookingUrl && venue.bookingUrl.includes("booking.com/searchresults")) {
    params.set("url", venue.bookingUrl);
  }
  return `/partners/booking?${params.toString()}`;
}

function buildRestaurantLink(venue: Venue): string {
  const params = new URLSearchParams({
    name: venue.name,
    city: venue.city.toLowerCase(),
    venue: venue.id,
    source: "map-pin",
  });
  if (venue.bookingUrl) {
    params.set("url", venue.bookingUrl);
  }
  return `/partners/restaurant?${params.toString()}`;
}

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

const userLocationIcon = L.divIcon({
  className: "xred-leaflet-user-marker",
  html: "<span></span><i></i>",
  iconSize: [22, 22],
  iconAnchor: [11, 11],
});

function LocateButton() {
  const map = useMap();
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [state, setState] = useState<"idle" | "locating" | "denied">("idle");

  const locate = () => {
    if (!navigator.geolocation) { setState("denied"); return; }
    setState("locating");
    trackEvent("locate_me", {});
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const next = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setPosition(next);
        setState("idle");
        map.flyTo([next.lat, next.lng], Math.max(map.getZoom(), 15), { duration: 1.1 });
      },
      () => setState("denied"),
      { enableHighAccuracy: true, timeout: 8000 },
    );
  };

  return (
    <>
      <button
        type="button"
        className={`map-locate-btn${state === "locating" ? " is-locating" : ""}`}
        onClick={locate}
        aria-label="Show my location"
        title={state === "denied" ? "Location permission denied" : "Show my location"}
      >
        {state === "locating" ? "…" : "◎"}
      </button>
      {position && <Marker position={[position.lat, position.lng]} icon={userLocationIcon} zIndexOffset={500} />}
    </>
  );
}

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
      maxZoom={19}
      zoomControl={false}
      scrollWheelZoom
      className="platform-leaflet-map"
    >
      <FlyTo lat={center.lat} lng={center.lng} zoom={center.zoom} />
      <TileLayer
        attribution={getTileConfig().attribution}
        url={getTileConfig().url}
        maxZoom={getTileConfig().maxZoom}
      />
      <LocateButton />
      {venues.map((venue) => {
        const isHotel = venue.layer === "stay";
        const isRestaurant = venue.layer === "eat";
        const isSelected = selectedId === venue.id;
        const isPartner = venue.claimStatus === "partner";
        const icon = venuePinIcon(venue.layer, isSelected, isPartner ? venue.brand?.accentColor : undefined);

        const popupClass = `xred-leaflet-popup${isHotel ? " is-hotel-popup" : ""}${isRestaurant ? " is-restaurant-popup" : ""}`;

        return (
          <Marker
            key={venue.id}
            position={[venue.coordinates.lat!, venue.coordinates.lng!]}
            icon={icon}
            zIndexOffset={isPartner ? 500 : isSelected ? 200 : isHotel || isRestaurant ? 50 : 0}
            eventHandlers={{ click: () => onSelect(venue.id) }}
          >
            <Tooltip direction="top" offset={[0, -14]} opacity={1} className="xpin-tooltip">
              {venue.name}
            </Tooltip>
            <Popup closeButton={false} className={popupClass}>
              <strong>{venue.name}</strong>
              <span>{venue.type} / {venue.neighborhood}</span>
              {isHotel && (
                <a href={buildBookingLink(venue)} target="_blank" rel="noreferrer">
                  Book on Booking.com →
                </a>
              )}
              {isRestaurant && (
                <a href={buildRestaurantLink(venue)} target="_blank" rel="noreferrer">
                  Reserve table →
                </a>
              )}
              {!isHotel && !isRestaurant && (
                <a href={`/venues/${venue.slug}`}>
                  View profile →
                </a>
              )}
              <span className="xred-popup-nav">
                <a
                  href={walkingDirectionsUrl(venue.entranceLat ?? venue.coordinates.lat!, venue.entranceLng ?? venue.coordinates.lng!, venue.name, venue.address, venue.city, venue.googlePlaceId)}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent("directions_click", { venue: venue.id, mode: "walk" })}
                >➤ Walk</a>
                {getCoordinateState(venue) === "verified" && (
                <a
                  href={streetViewUrl(venue.coordinates.lat!, venue.coordinates.lng!, venue.streetViewHeading)}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent("streetview_click", { venue: venue.id })}
                >◉ Street View</a>
                )}
              </span>
            </Popup>
          </Marker>
        );
      })}
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
