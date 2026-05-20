"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useMemo, useState, useCallback } from "react";
import { discoveryLayers, getVenueLayer, type City, type DiscoveryLayer, type Venue, type Vibe } from "../data/platform";
import SaveButton from "./SaveButton";
import VenueCard from "./VenueCard";

const LeafletCityMap = dynamic(() => import("./LeafletCityMap"), {
  ssr: false,
  loading: () => <div className="platform-map-loading">Loading street map...</div>,
});

const CITY_CENTERS: Record<string, { lat: number; lng: number; zoom: number }> = {
  amsterdam: { lat: 52.3707, lng: 4.8977, zoom: 13 },
  barcelona: { lat: 41.3851, lng: 2.1734, zoom: 12 },
  tenerife: { lat: 28.2916, lng: -16.6291, zoom: 10 },
  marbella: { lat: 36.5101, lng: -4.8824, zoom: 11 },
  thailand: { lat: 13.7563, lng: 100.5018, zoom: 11 },
  germany: { lat: 52.5200, lng: 13.4050, zoom: 11 },
  usa: { lat: 39.8283, lng: -98.5795, zoom: 4 },
  "czech-republic": { lat: 50.0755, lng: 14.4378, zoom: 12 },
  "south-africa": { lat: -33.9249, lng: 18.4241, zoom: 11 },
};

export default function CityMapExperience({
  city,
  venues,
  networkCities,
  vibes,
}: {
  city: City;
  venues: Venue[];
  networkCities: City[];
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

  const center = CITY_CENTERS[city.slug] || CITY_CENTERS.amsterdam;
  const geoVenues = filteredVenues.filter((venue) => venue.coordinates.lat && venue.coordinates.lng);

  return (
    <div className={`platform-map-shell ${view === "list" ? "is-list-view" : ""}`}>
      <div className="platform-map-canvas" aria-label={`${city.name} map`}>
        <LeafletCityMap
          center={center}
          venues={geoVenues}
          cities={networkCities}
          cityCenters={CITY_CENTERS}
          activeCityId={city.id}
          selectedId={selected?.id || ""}
          onSelect={handleSelect}
        />
        <div className="platform-map-sheen" />

        <div className="platform-map-label">
          Live street map / {geoVenues.length} places
        </div>
      </div>

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

        {selected && (
          <article className="map-selected-card">
            <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/45">
              {selected.type} / {selected.neighborhood}
            </div>
            <h2>{selected.name}</h2>
            {selected.address && (
              <p className="map-selected-address">
                {selected.address}{selected.postcode ? ` / ${selected.postcode}` : ""}
              </p>
            )}
            <p>{selected.description}</p>
            <div className="platform-action-row">
              <Link href={`/venues/${selected.slug}`} className="platform-primary-action">
                Open brand room
              </Link>
              <SaveButton itemType="venue" itemId={selected.id} />
            </div>
          </article>
        )}

        <div className="map-filter-strip">
          <button
            type="button"
            className={`vibe-chip ${activeLayer === "all" && activeVibe === "all" ? "is-active" : ""}`}
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

        <div className="map-list-stack">
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
