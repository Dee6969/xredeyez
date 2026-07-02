"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { trackEvent } from "../lib/analytics";
import type { SearchItem, SearchResponse } from "../api/search/route";

const QUICK_LINKS: SearchItem[] = [
  { type: "city", label: "Amsterdam", sublabel: "Netherlands", href: "/cities/amsterdam", meta: "Flagship" },
  { type: "city", label: "Barcelona", sublabel: "Spain", href: "/cities/barcelona", meta: "Live guide" },
  { type: "city", label: "Berlin", sublabel: "Germany", href: "/cities/germany", meta: "Live guide" },
  { type: "city", label: "Prague", sublabel: "Czech Republic", href: "/cities/czech-republic", meta: "Live guide" },
  { type: "city", label: "Bangkok", sublabel: "Thailand", href: "/cities/thailand", meta: "Live guide" },
  { type: "venue", label: "Coffeeshops", sublabel: "Cannabis layer", href: "/explore" },
];

function useDebounce<T>(value: T, ms: number): T {
  const [debounced, setDebounced] = useState<T>(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return debounced;
}

function TypeIcon({ type }: { type: SearchItem["type"] }) {
  switch (type) {
    case "city":
    case "neighbourhood":
      return <span className="gs-item-icon" aria-hidden="true">◎</span>;
    case "venue":
      return <span className="gs-item-icon" aria-hidden="true">◈</span>;
    case "vibe":
      return <span className="gs-item-icon" aria-hidden="true">◉</span>;
    default:
      return <span className="gs-item-icon" aria-hidden="true">◆</span>;
  }
}

interface ResultItemProps {
  item: SearchItem;
  selected: boolean;
  onClick: () => void;
}

function ResultItem({ item, selected, onClick }: ResultItemProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    if (selected) ref.current?.scrollIntoView({ block: "nearest" });
  }, [selected]);

  return (
    <Link
      ref={ref}
      href={item.href}
      onClick={onClick}
      className={`gs-result-item${selected ? " is-selected" : ""}`}
      tabIndex={-1}
    >
      <TypeIcon type={item.type} />
      <div className="gs-result-text">
        <span className="gs-result-label">{item.label}</span>
        {item.sublabel && <span className="gs-result-sub">{item.sublabel}</span>}
      </div>
      <div className="gs-result-right">
        {item.meta && <span className="gs-result-meta">{item.meta}</span>}
        {item.badge && item.badge !== "free" && (
          <span className={`gs-result-badge is-${item.badge}`}>{item.badge}</span>
        )}
        <span className="gs-result-arrow" aria-hidden="true">↗</span>
      </div>
    </Link>
  );
}

export default function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const debouncedQuery = useDebounce(query, 240);

  const allItems: SearchItem[] = results
    ? [...results.destinations, ...results.places, ...results.vibes]
    : [];

  // Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Focus + reset on open/close
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      setQuery("");
      setResults(null);
      setSelectedIndex(-1);
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Fetch results
  useEffect(() => {
    if (!debouncedQuery.trim() || debouncedQuery.length < 2) {
      setResults(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`)
      .then((r) => r.json())
      .then((data: SearchResponse) => {
        setResults(data);
        setSelectedIndex(-1);
        trackEvent("search_query", { length: debouncedQuery.length });
      })
      .catch(() => setResults(null))
      .finally(() => setLoading(false));
  }, [debouncedQuery]);

  const close = useCallback(() => setOpen(false), []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") { close(); return; }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, allItems.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, -1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (selectedIndex >= 0 && allItems[selectedIndex]) {
          router.push(allItems[selectedIndex].href);
          close();
        }
      }
    },
    [allItems, selectedIndex, router, close]
  );

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) close();
    },
    [close]
  );

  const showQuickLinks = !query && !results;
  const showNoResults = results && results.total === 0 && !loading;
  const showResults = results && results.total > 0;

  // Compute flat index offset per group
  const destOffset = 0;
  const placeOffset = results ? results.destinations.length : 0;
  const vibeOffset = results ? results.destinations.length + results.places.length : 0;

  return (
    <>
      {/* Trigger button — rendered in nav */}
      <button
        onClick={() => setOpen(true)}
        className="gs-trigger"
        aria-label="Search (⌘K)"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <span className="gs-trigger-label">Search</span>
        <kbd className="gs-trigger-kbd">⌘K</kbd>
      </button>

      {/* Overlay */}
      {open && (
        <div className="gs-overlay" onClick={handleBackdropClick} role="dialog" aria-modal="true" aria-label="Search">
          <div className="gs-panel">
            {/* Input row */}
            <div className="gs-input-row">
              <svg className="gs-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Where are you going?"
                className="gs-input"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                aria-label="Search destinations, venues and vibes"
              />
              {loading && <div className="gs-spinner" aria-hidden="true" />}
              <button
                onClick={close}
                className="gs-close-btn"
                aria-label="Close search"
              >
                <kbd>Esc</kbd>
              </button>
            </div>

            {/* Quick links */}
            {showQuickLinks && (
              <div className="gs-body">
                <div className="gs-group-label">Quick links</div>
                <div className="gs-quick-links">
                  {QUICK_LINKS.map((item) => (
                    <Link
                      key={item.href + item.label}
                      href={item.href}
                      onClick={close}
                      className="gs-quick-item"
                    >
                      <TypeIcon type={item.type} />
                      <span>{item.label}</span>
                      {item.sublabel && <span className="gs-quick-sub">{item.sublabel}</span>}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* No results */}
            {showNoResults && (
              <div className="gs-body">
                <div className="gs-no-results">
                  No results for <strong>&ldquo;{query}&rdquo;</strong>
                  <span>Try a city name, venue, or vibe.</span>
                </div>
              </div>
            )}

            {/* Results */}
            {showResults && results && (
              <div className="gs-body gs-results-list" role="listbox" aria-label="Search results">
                {results.destinations.length > 0 && (
                  <div className="gs-group">
                    <div className="gs-group-label">Destinations</div>
                    {results.destinations.map((item, i) => (
                      <ResultItem
                        key={item.href + item.label + i}
                        item={item}
                        selected={selectedIndex === destOffset + i}
                        onClick={close}
                      />
                    ))}
                  </div>
                )}
                {results.places.length > 0 && (
                  <div className="gs-group">
                    <div className="gs-group-label">Places</div>
                    {results.places.map((item, i) => (
                      <ResultItem
                        key={item.href + item.label + i}
                        item={item}
                        selected={selectedIndex === placeOffset + i}
                        onClick={close}
                      />
                    ))}
                  </div>
                )}
                {results.vibes.length > 0 && (
                  <div className="gs-group">
                    <div className="gs-group-label">Vibes</div>
                    {results.vibes.map((item, i) => (
                      <ResultItem
                        key={item.href + item.label + i}
                        item={item}
                        selected={selectedIndex === vibeOffset + i}
                        onClick={close}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Footer hint */}
            <div className="gs-footer">
              <span><kbd>↑↓</kbd> navigate</span>
              <span><kbd>↵</kbd> open</span>
              <span><kbd>Esc</kbd> close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
