"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, ZoomControl, useMap } from "react-leaflet";
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

const hotelMarkerIcon = L.divIcon({
  className: "xred-leaflet-marker is-hotel",
  html: '<span></span>',
  iconSize: [38, 38],
  iconAnchor: [19, 19],
  popupAnchor: [0, -22],
});

const activeHotelMarkerIcon = L.divIcon({
  className: "xred-leaflet-marker is-hotel is-active",
  html: '<span></span>',
  iconSize: [44, 44],
  iconAnchor: [22, 22],
  popupAnchor: [0, -24],
});

const restaurantMarkerIcon = L.divIcon({
  className: "xred-leaflet-marker is-restaurant",
  html: '<span></span>',
  iconSize: [38, 38],
  iconAnchor: [19, 19],
  popupAnchor: [0, -22],
});

const activeRestaurantMarkerIcon = L.divIcon({
  className: "xred-leaflet-marker is-restaurant is-active",
  html: '<span></span>',
  iconSize: [44, 44],
  iconAnchor: [22, 22],
  popupAnchor: [0, -24],
});

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

        let icon;
        if (isHotel) icon = isSelected ? activeHotelMarkerIcon : hotelMarkerIcon;
        else if (isRestaurant) icon = isSelected ? activeRestaurantMarkerIcon : restaurantMarkerIcon;
        else icon = isSelected ? activeMarkerIcon : markerIcon;

        const popupClass = `xred-leaflet-popup${isHotel ? " is-hotel-popup" : ""}${isRestaurant ? " is-restaurant-popup" : ""}`;

        return (
          <Marker
            key={venue.id}
            position={[venue.coordinates.lat!, venue.coordinates.lng!]}
            icon={icon}
            zIndexOffset={isHotel || isRestaurant ? 50 : 0}
            eventHandlers={{ click: () => onSelect(venue.id) }}
          >
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
