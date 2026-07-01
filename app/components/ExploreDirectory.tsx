"use client";
import { useMemo, useState, useCallback, useRef, useDeferredValue } from "react";
import VenueCard from "./VenueCard";
import { discoveryLayers, getVenueLayer, type City, type DiscoveryLayer, type Venue } from "../data/platform";

type SortOption = "featured" | "alpha" | "city";

const SORT_LABELS: Record<SortOption, string> = {
  featured: "Featured first",
  alpha: "A – Z",
  city: "By city",
};

function tierScore(v: Venue): number {
  return v.listingTier === "premium" ? 3 : v.listingTier === "featured" ? 2 : 1;
}

export default function ExploreDirectory({
  venues,
  cities,
}: {
  venues: Venue[];
  cities: City[];
}) {
  const [query, setQuery]           = useState("");
  const deferredQuery                = useDeferredValue(query);
  const [activeLayer, setActiveLayer] = useState<DiscoveryLayer | "all">("all");
  const [activeCity, setActiveCity] = useState<string>("all");
  const [sort, setSort]             = useState<SortOption>("featured");
  const [sheetOpen, setSheetOpen]   = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const isStale = query !== deferredQuery;

  const liveCities = useMemo(
    () => cities.filter(c => c.status === "flagship" || c.status === "live"),
    [cities]
  );

  const filteredVenues = useMemo(() => {
    let result = venues;

    if (activeLayer !== "all") {
      result = result.filter(v => getVenueLayer(v) === activeLayer);
    }
    if (activeCity !== "all") {
      result = result.filter(v => v.cityId === activeCity);
    }
    if (deferredQuery.trim()) {
      const q = deferredQuery.toLowerCase();
      result = result.filter(
        v =>
          v.name.toLowerCase().includes(q) ||
          v.type.toLowerCase().includes(q) ||
          v.neighborhood.toLowerCase().includes(q) ||
          v.city.toLowerCase().includes(q) ||
          v.description.toLowerCase().includes(q)
      );
    }

    if (sort === "featured") {
      return [...result].sort((a, b) => tierScore(b) - tierScore(a));
    }
    if (sort === "alpha") {
      return [...result].sort((a, b) => a.name.localeCompare(b.name));
    }
    return [...result].sort(
      (a, b) => a.city.localeCompare(b.city) || a.name.localeCompare(b.name)
    );
  }, [venues, activeLayer, activeCity, deferredQuery, sort]);

  const resetFilters = useCallback(() => {
    setQuery("");
    setActiveLayer("all");
    setActiveCity("all");
    setSort("featured");
  }, []);

  const hasFilters = query || activeLayer !== "all" || activeCity !== "all" || sort !== "featured";

  const cityLabel = activeCity !== "all"
    ? liveCities.find(c => c.id === activeCity)?.name ?? ""
    : "";
  const layerLabel = activeLayer !== "all"
    ? discoveryLayers.find(l => l.id === activeLayer)?.label ?? ""
    : "";

  return (
    <div className="xdir-root">

      {/* ══════════════════════════════════════
          STICKY FILTER BAR
          ══════════════════════════════════════ */}
      <div className="xdir-bar">
        {/* Row 1: search + (desktop chips) + controls */}
        <div className="xdir-bar-row">
          {/* Search */}
          <div className="xdir-search-wrap">
            <svg className="xdir-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              ref={searchRef}
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search venues, types, neighbourhoods…"
              className={`xdir-search-input${isStale ? " is-stale" : ""}`}
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              aria-label="Search venues"
            />
            {query && (
              <button
                type="button"
                className="xdir-search-clear"
                onClick={() => { setQuery(""); searchRef.current?.focus(); }}
                aria-label="Clear search"
              >✕</button>
            )}
          </div>

          {/* Layer chips — desktop only, inline */}
          <div className="xdir-layer-chips" role="group" aria-label="Filter by category">
            <button
              type="button"
              className={`xdir-chip${activeLayer === "all" ? " is-active" : ""}`}
              onClick={() => setActiveLayer("all")}
            >All</button>
            {discoveryLayers.map(layer => (
              <button
                key={layer.id}
                type="button"
                className={`xdir-chip${activeLayer === layer.id ? " is-active" : ""}`}
                onClick={() => setActiveLayer(layer.id)}
              >{layer.label}</button>
            ))}
          </div>

          {/* City + sort selects — desktop */}
          <div className="xdir-bar-selects">
            <select
              className="xdir-select"
              value={activeCity}
              onChange={e => setActiveCity(e.target.value)}
              aria-label="Filter by city"
            >
              <option value="all">All cities</option>
              {liveCities.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

            <select
              className="xdir-select"
              value={sort}
              onChange={e => setSort(e.target.value as SortOption)}
              aria-label="Sort order"
            >
              {(Object.keys(SORT_LABELS) as SortOption[]).map(s => (
                <option key={s} value={s}>{SORT_LABELS[s]}</option>
              ))}
            </select>
          </div>

          {/* Mobile filter toggle */}
          <button
            type="button"
            className={`xdir-filter-btn${hasFilters && (activeCity !== "all" || sort !== "featured") ? " has-filters" : ""}`}
            onClick={() => setSheetOpen(true)}
            aria-label="Open filters"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <line x1="4" y1="6" x2="20" y2="6"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
              <line x1="11" y1="18" x2="13" y2="18"/>
            </svg>
            <span>Filters</span>
            {(activeCity !== "all" || sort !== "featured") && <span className="xdir-filter-dot" />}
          </button>
        </div>

        {/* Row 2: layer chips — mobile horizontal scroll */}
        <div className="xdir-mobile-cats" role="group" aria-label="Filter by category">
          <button
            type="button"
            className={`xdir-chip${activeLayer === "all" ? " is-active" : ""}`}
            onClick={() => setActiveLayer("all")}
          >All</button>
          {discoveryLayers.map(layer => (
            <button
              key={layer.id}
              type="button"
              className={`xdir-chip${activeLayer === layer.id ? " is-active" : ""}`}
              onClick={() => setActiveLayer(layer.id)}
            >{layer.label}</button>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          RESULTS META
          ══════════════════════════════════════ */}
      <div className="xdir-meta" aria-live="polite">
        <span className="xdir-count">{filteredVenues.length} {filteredVenues.length === 1 ? "place" : "places"}</span>
        {cityLabel  && <><span className="xdir-meta-sep">·</span><span className="xdir-meta-tag">{cityLabel}</span></>}
        {layerLabel && <><span className="xdir-meta-sep">·</span><span className="xdir-meta-tag">{layerLabel}</span></>}
        {query      && <><span className="xdir-meta-sep">·</span><span className="xdir-meta-tag">&ldquo;{query}&rdquo;</span></>}
        {hasFilters && (
          <button type="button" className="xdir-clear-all" onClick={resetFilters}>
            Clear all
          </button>
        )}
      </div>

      {/* ══════════════════════════════════════
          VENUE GRID
          ══════════════════════════════════════ */}
      {filteredVenues.length > 0 ? (
        <div className="platform-card-grid">
          {filteredVenues.map(venue => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      ) : (
        <div className="xdir-empty">
          <span className="xdir-empty-icon" aria-hidden="true">◈</span>
          <p className="xdir-empty-title">No places found.</p>
          <p className="xdir-empty-sub">Try different filters or broaden your search.</p>
          <button type="button" className="xdir-clear-all" style={{ marginTop: "16px" }} onClick={resetFilters}>
            Clear all filters
          </button>
        </div>
      )}

      {/* ══════════════════════════════════════
          MOBILE FILTER SHEET
          ══════════════════════════════════════ */}
      {sheetOpen && (
        <div className="xdir-sheet-overlay" onClick={() => setSheetOpen(false)} aria-hidden="true" />
      )}
      <div
        className={`xdir-sheet${sheetOpen ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
        aria-hidden={!sheetOpen}
      >
        <div className="xdir-sheet-head">
          <span>Filters</span>
          <button type="button" onClick={() => setSheetOpen(false)} aria-label="Close filters" className="xdir-sheet-close">✕</button>
        </div>

        <div className="xdir-sheet-body">
          <div className="xdir-sheet-section">
            <div className="xdir-sheet-label">City</div>
            <div className="xdir-sheet-chips">
              <button
                type="button"
                className={`xdir-chip${activeCity === "all" ? " is-active" : ""}`}
                onClick={() => setActiveCity("all")}
              >All cities</button>
              {liveCities.map(c => (
                <button
                  key={c.id}
                  type="button"
                  className={`xdir-chip${activeCity === c.id ? " is-active" : ""}`}
                  onClick={() => { setActiveCity(c.id); }}
                >{c.name}</button>
              ))}
            </div>
          </div>

          <div className="xdir-sheet-section">
            <div className="xdir-sheet-label">Sort</div>
            <div className="xdir-sheet-chips">
              {(Object.keys(SORT_LABELS) as SortOption[]).map(s => (
                <button
                  key={s}
                  type="button"
                  className={`xdir-chip${sort === s ? " is-active" : ""}`}
                  onClick={() => setSort(s)}
                >{SORT_LABELS[s]}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="xdir-sheet-footer">
          {hasFilters && (
            <button type="button" className="xdir-clear-all" onClick={() => { resetFilters(); setSheetOpen(false); }}>
              Clear all
            </button>
          )}
          <button
            type="button"
            className="platform-primary-action"
            style={{ minHeight: "44px", fontSize: "14px" }}
            onClick={() => setSheetOpen(false)}
          >
            Show {filteredVenues.length} {filteredVenues.length === 1 ? "place" : "places"}
          </button>
        </div>
      </div>

    </div>
  );
}
