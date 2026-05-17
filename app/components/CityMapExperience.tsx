"use client";
import Link from "next/link";
import Map, { Marker, NavigationControl } from "react-map-gl/mapbox";
import { useMemo, useState, useCallback } from "react";
import { discoveryLayers, getVenueLayer, type City, type DiscoveryLayer, type Venue, type Vibe } from "../data/platform";
import SaveButton from "./SaveButton";
import VenueCard from "./VenueCard";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const CITY_CENTERS: Record<string, { longitude: number; latitude: number; zoom: number }> = {
  amsterdam: { longitude: 4.8977, latitude: 52.3707, zoom: 13 },
};

export default function CityMapExperience({
  city,
  venues,
  vibes,
}: {
  city: City;
  venues: Venue[];
  vibes: Vibe[];
}) {
  const [activeVibe, setActiveVibe] = useState<string>("all");
  const [activeLayer, setActiveLayer] = useState<DiscoveryLayer | "all">("all");
  const [view, setView] = useState<"map" | "list">("map");
  const [selectedId, setSelectedId] = useState<string>(venues[0]?.id || "");

  const filteredVenues = useMemo(() => {
    return venues.filter((venue) => {
      const layerMatch = activeLayer === "all" || getVenueLayer(venue) === activeLayer;
      const vibeMatch = activeVibe === "all" || venue.vibeIds.includes(activeVibe);
      return layerMatch && vibeMatch;
    });
  }, [activeLayer, activeVibe, venues]);

  const selected = filteredVenues.find((venue) => venue.id === selectedId) || filteredVenues[0];

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
    setView("map");
  }, []);

  const center = CITY_CENTERS[city.slug] ?? { longitude: 4.8977, latitude: 52.3707, zoom: 12 };
  const geoVenues = filteredVenues.filter((v) => v.coordinates.lat && v.coordinates.lng);

  return (
    <div className="platform-map-shell">
      {/* Map canvas */}
      <div
        className={`platform-map-canvas ${view === "list" ? "is-mobile-collapsed" : ""}`}
        aria-label={`${city.name} map`}
        style={{ position: "relative" }}
      >
        {MAPBOX_TOKEN ? (
          <Map
            mapboxAccessToken={MAPBOX_TOKEN}
            initialViewState={center}
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
                  aria-label={`Select ${venue.name}`}
                  className={`platform-map-pin ${venue.isFeatured ? "is-featured" : ""} ${selected?.id === venue.id ? "is-active" : ""}`}
                  onClick={() => handleSelect(venue.id)}
                >
                  <span />
                </button>
              </Marker>
            ))}
            <NavigationControl position="top-right" showCompass={false} />
          </Map>
        ) : (
          <>
            <div className="platform-map-grid" />
            {filteredVenues.map((venue) => (
              <button
                key={venue.id}
                type="button"
                className={`platform-map-pin ${venue.isFeatured ? "is-featured" : ""} ${selected?.id === venue.id ? "is-active" : ""}`}
                style={{ left: `${venue.coordinates.x}%`, top: `${venue.coordinates.y}%` }}
                aria-label={`Preview ${venue.name}`}
                onClick={() => handleSelect(venue.id)}
              >
                <span />
              </button>
            ))}
          </>
        )}

        {/* Overlays — sit above the map */}
        <div className="platform-map-label" style={{ zIndex: 10 }}>
          {geoVenues.length > 0 ? "Live map" : "Preview map"} · {filteredVenues.length} places
        </div>

        {selected && (
          <article className="map-preview-card" style={{ zIndex: 10 }}>
            <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">
              {selected.type} / {selected.neighborhood}
            </div>
            <h2>{selected.name}</h2>
            <p>{selected.description}</p>
            <div className="platform-action-row">
              <Link href={`/venues/${selected.slug}`} className="platform-primary-action">
                Open
              </Link>
              <SaveButton itemType="venue" itemId={selected.id} />
            </div>
          </article>
        )}
      </div>

      {/* Sidebar */}
      <aside className="platform-map-panel">
        <div className="platform-map-tabs" role="tablist" aria-label="Map view">
          <button type="button" className={view === "map" ? "is-active" : ""} onClick={() => setView("map")}>
            Map
          </button>
          <button type="button" className={view === "list" ? "is-active" : ""} onClick={() => setView("list")}>
            List
          </button>
          <Link href="/saved">Saved</Link>
        </div>
        <div className="map-filter-strip">
          <button
            type="button"
            className={`vibe-chip ${activeVibe === "all" ? "is-active" : ""}`}
            onClick={() => {
              setActiveLayer("all");
              setActiveVibe("all");
            }}
          >
            All
          </button>
          {discoveryLayers.map((layer) => (
            <button
              key={layer.id}
              type="button"
              className={`vibe-chip ${activeLayer === layer.id ? "is-active" : ""}`}
              onClick={() => setActiveLayer(layer.id)}
            >
              {layer.label}
            </button>
          ))}
        </div>
        <div className="map-filter-strip">
          {vibes.slice(0, 8).map((vibe) => (
            <button
              key={vibe.id}
              type="button"
              className={`vibe-chip ${activeVibe === vibe.id ? "is-active" : ""}`}
              style={{ borderColor: `${vibe.accent}66` }}
              onClick={() => setActiveVibe(vibe.id)}
            >
              {vibe.name}
            </button>
          ))}
        </div>
        <div className="grid gap-4">
          {filteredVenues.map((venue) => (
            <button
              key={venue.id}
              type="button"
              className={`map-list-item ${selected?.id === venue.id ? "is-active" : ""}`}
              onClick={() => handleSelect(venue.id)}
            >
              <span>{venue.type} / {venue.neighborhood}</span>
              <strong>{venue.name}</strong>
              {venue.address && (
                <em>{venue.address}{venue.postcode ? ` / ${venue.postcode}` : ""}</em>
              )}
              <small>{venue.description}</small>
            </button>
          ))}
        </div>
      </aside>

      {/* Full cards below */}
      <section className="platform-section px-0 md:col-span-2">
        <div className="platform-section-head">
          <div>
            <div className="eyebrow">Full cards</div>
            <h2 className="platform-section-title">Compare places.</h2>
          </div>
        </div>
        <div className="platform-card-grid">
          {filteredVenues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      </section>
    </div>
  );
}
