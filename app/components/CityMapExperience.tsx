"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useMemo, useState, useCallback } from "react";
import { discoveryLayers, getVenueLayer, type City, type DiscoveryLayer, type Venue } from "../data/platform";
import SaveButton from "./SaveButton";
import { trackEvent } from "../lib/analytics";
import MapActions from "./MapActions";
import { CITY_CENTERS, REGION_BUTTONS } from "../data/geo";

function buildBookingLink(venue: Venue): string {
  const destination = [venue.name, venue.neighborhood, venue.country || venue.city]
    .filter(Boolean)
    .join(", ");
  const params = new URLSearchParams({
    destination,
    city: venue.cityId,
    venue: venue.id,
    source: "map-panel",
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
    source: "map-panel",
  });
  if (venue.bookingUrl) params.set("url", venue.bookingUrl);
  return `/partners/restaurant?${params.toString()}`;
}

const LeafletCityMap = dynamic(() => import("./LeafletCityMap"), {
  ssr: false,
  loading: () => <div className="map-zen-loading">Loading map…</div>,
});

type SheetMode = "hidden" | "compact" | "open";

function venueCta(venue: Venue): { href: string; label: string; cls: string; external: boolean } {
  if (venue.layer === "stay") return { href: buildBookingLink(venue), label: "Book stay →", cls: "map-zen-cta is-book", external: true };
  if (venue.layer === "eat")  return { href: buildRestaurantLink(venue), label: "Reserve →", cls: "map-zen-cta is-eat", external: true };
  return { href: `/venues/${venue.slug}`, label: "Open profile →", cls: "map-zen-cta", external: false };
}

export default function CityMapExperience({
  city,
  venues,
  networkCities, initialVenueId,
}: {
  city: City;
  venues: Venue[];
  networkCities: City[]; initialVenueId?: string;
}) {
  const [activeLayer, setActiveLayer] = useState<DiscoveryLayer | "all">("all");
  const [selectedId, setSelectedId] = useState<string>(initialVenueId ?? "");
  const [sheetMode, setSheetMode] = useState<SheetMode>(initialVenueId ? "compact" : "hidden");
  const defaultCenter = CITY_CENTERS[city.slug] || CITY_CENTERS.amsterdam;
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const regionButtons = REGION_BUTTONS[city.slug] || [];

  const filteredVenues = useMemo(
    () => activeLayer === "all" ? venues : venues.filter(v => getVenueLayer(v) === activeLayer),
    [activeLayer, venues]
  );

  const selected = filteredVenues.find(v => v.id === selectedId) ?? null;

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
    setSheetMode("compact");
  }, []);

  const setLayer = useCallback((layer: DiscoveryLayer | "all") => {
    setActiveLayer(layer);
    setSelectedId("");
    setSheetMode("hidden");
    trackEvent("map_filter", { layer, city: city.slug });
  }, [city.slug]);

  const geoVenues = filteredVenues.filter(v => v.coordinates.lat && v.coordinates.lng);

  return (
    <div className="map-zen-root">

      {/* ══════════════════════════════════════
          MAP CANVAS
          ══════════════════════════════════════ */}
      <div className="map-zen-canvas">
        <LeafletCityMap
          center={mapCenter}
          venues={geoVenues}
          cities={networkCities}
          cityCenters={CITY_CENTERS}
          activeCityId={city.id}
          selectedId={selectedId}
          onSelect={handleSelect}
        />

        {/* City tag — top left */}
        <div className="map-zen-city-tag">
          <Link href={`/cities/${city.slug}`} className="map-zen-back">← Guide</Link>
          <span className="map-zen-city-name">{city.name}</span>
        </div>

        {/* Category filter chips — top centre */}
        <div className="map-zen-cats" aria-label="Filter by category">
          <button
            type="button"
            className={`map-zen-cat${activeLayer === "all" ? " is-active" : ""}`}
            onClick={() => setLayer("all")}
          >All</button>
          {discoveryLayers.map(layer => (
            <button
              key={layer.id}
              type="button"
              className={`map-zen-cat${activeLayer === layer.id ? " is-active" : ""}`}
              onClick={() => setLayer(layer.id)}
            >{layer.label}</button>
          ))}
        </div>

        {/* Region jump — multi-city coverage */}
        {regionButtons.length > 0 && (
          <div className="map-zen-regions" aria-label="Jump to region">
            {regionButtons.map(r => (
              <button
                key={r.label}
                type="button"
                className="platform-map-region-btn"
                onClick={() => setMapCenter({ lat: r.lat, lng: r.lng, zoom: r.zoom })}
              >{r.label}</button>
            ))}
          </div>
        )}

        {/* Selected card — floats on canvas (desktop) / hidden on mobile (use sheet) */}
        {selected && (
          <div
            key={selected.id}
            className={`map-zen-selected${selected.layer === "stay" ? " is-hotel" : ""}${selected.layer === "eat" ? " is-eat" : ""}`}
          >
            <div className="map-zen-sel-type">{selected.type} · {selected.neighborhood}</div>
            <div className="map-zen-sel-name">{selected.name}</div>
            {selected.address && (
              <div className="map-zen-sel-addr">{selected.address}{selected.postcode ? `, ${selected.postcode}` : ""}</div>
            )}
            <div className="map-zen-sel-actions">
              {(() => { const cta = venueCta(selected); return (
                <Link
                  href={cta.href}
                  className={cta.cls}
                  {...(cta.external ? { target: "_blank", rel: "noreferrer" } : {})}
                >{cta.label}</Link>
              ); })()}
              <SaveButton itemType="venue" itemId={selected.id} />
            </div>
          </div>
        )}

        {/* Mobile: pill showing count + opens sheet */}
        <button
          type="button"
          className="map-zen-list-trigger"
          onClick={() => setSheetMode(m => m === "hidden" ? "open" : "hidden")}
          aria-label="Toggle venue list"
        >
          {sheetMode !== "hidden" ? "✕ Close" : `${filteredVenues.length} places`}
        </button>
      </div>

      {/* ══════════════════════════════════════
          DESKTOP SIDEBAR
          ══════════════════════════════════════ */}
      <aside className="map-zen-sidebar" aria-label="Venue list">
        <div className="map-zen-sidebar-head">
          <span className="map-zen-sidebar-city">{city.name}</span>
          <SaveButton itemType="city" itemId={city.id} label="Save" />
        </div>

        {/* Category chips in sidebar */}
        <div className="map-zen-sidebar-cats">
          <button
            type="button"
            className={`map-zen-cat${activeLayer === "all" ? " is-active" : ""}`}
            onClick={() => setLayer("all")}
          >All</button>
          {discoveryLayers.map(layer => (
            <button
              key={layer.id}
              type="button"
              className={`map-zen-cat${activeLayer === layer.id ? " is-active" : ""}`}
              onClick={() => setLayer(layer.id)}
            >{layer.label}</button>
          ))}
        </div>

        <div className="map-zen-sidebar-count">
          {filteredVenues.length} {activeLayer === "all" ? "places" : filteredVenues.length === 1 ? "place" : "places"}
        </div>

        <div className="map-zen-sidebar-list">
          {filteredVenues.map(venue => (
            <button
              key={venue.id}
              type="button"
              className={`map-zen-row${selectedId === venue.id ? " is-active" : ""}${venue.layer === "stay" ? " is-hotel" : ""}${venue.layer === "eat" ? " is-eat" : ""}`}
              onClick={() => handleSelect(venue.id)}
            >
              <span className="map-zen-row-type">{venue.type}</span>
              <strong className="map-zen-row-name">{venue.name}</strong>
              <span className="map-zen-row-area">{venue.neighborhood}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* ══════════════════════════════════════
          MOBILE BOTTOM SHEET
          ══════════════════════════════════════ */}
      <div
        className={`map-zen-sheet${sheetMode === "compact" ? " is-compact" : sheetMode === "open" ? " is-open" : ""}`}
        aria-hidden={sheetMode === "hidden"}
      >
        {/* Drag handle */}
        <button
          type="button"
          className="map-zen-sheet-handle"
          onClick={() => setSheetMode(m => m === "open" ? "compact" : "open")}
          aria-label={sheetMode === "open" ? "Collapse list" : "Expand venue list"}
        >
          <span />
        </button>

        {/* Compact peek: selected venue */}
        <div className="map-zen-sheet-peek">
          {selected ? (
            <>
              <div className="map-zen-sheet-venue-type">{selected.type} · {selected.neighborhood}</div>
              <div className="map-zen-sheet-venue-name">{selected.name}</div>
              <div className="map-zen-sheet-venue-actions">
                {(() => { const cta = venueCta(selected); return (
                  <Link
                    href={cta.href}
                    className={cta.cls}
                    style={{ height: "32px", fontSize: "12px", padding: "0 14px" }}
                    {...(cta.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  >{cta.label}</Link>
                ); })()}
                <SaveButton itemType="venue" itemId={selected.id} />
              </div>
              <MapActions
                lat={selected.entranceLat ?? selected.coordinates.lat}
                lng={selected.entranceLng ?? selected.coordinates.lng}
                name={selected.name}
                address={selected.address}
                city={selected.city}
                placeId={selected.googlePlaceId}
                heading={selected.streetViewHeading}
                venueId={selected.id}
                compact
              />
            </>
          ) : (
            <div className="map-zen-sheet-venue-name" style={{ color: "rgba(245,240,230,0.48)", fontSize: "14px" }}>
              {filteredVenues.length} places — tap a pin to explore
            </div>
          )}
        </div>

        {/* Expanded: full list */}
        <div className="map-zen-sheet-body">
          <div className="map-zen-sheet-cats">
            <button
              type="button"
              className={`map-zen-cat map-zen-cat--sm${activeLayer === "all" ? " is-active" : ""}`}
              onClick={() => setLayer("all")}
            >All</button>
            {discoveryLayers.map(layer => (
              <button
                key={layer.id}
                type="button"
                className={`map-zen-cat map-zen-cat--sm${activeLayer === layer.id ? " is-active" : ""}`}
                onClick={() => setLayer(layer.id)}
              >{layer.label}</button>
            ))}
          </div>
          <div className="map-zen-sheet-list">
            {filteredVenues.map(venue => (
              <button
                key={venue.id}
                type="button"
                className={`map-zen-sheet-row${selectedId === venue.id ? " is-active" : ""}${venue.layer === "stay" ? " is-hotel" : ""}${venue.layer === "eat" ? " is-eat" : ""}`}
                onClick={() => { handleSelect(venue.id); setSheetMode("compact"); }}
              >
                <span className="map-zen-sheet-row-type">{venue.type}</span>
                <strong className="map-zen-sheet-row-name">{venue.name}</strong>
                <span className="map-zen-sheet-row-area">{venue.neighborhood}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
