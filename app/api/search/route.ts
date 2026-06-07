import { type NextRequest, NextResponse } from "next/server";
import { cities, venues, vibes } from "../../data/platform";

export interface SearchItem {
  type: "city" | "venue" | "vibe" | "neighbourhood";
  label: string;
  sublabel?: string;
  href: string;
  meta?: string;
  badge?: string;
}

export interface SearchResponse {
  destinations: SearchItem[];
  places: SearchItem[];
  vibes: SearchItem[];
  total: number;
}

function score(text: string, query: string): number {
  const t = text.toLowerCase();
  const q = query.toLowerCase();
  if (t === q) return 100;
  if (t.startsWith(q)) return 80;
  if (t.includes(q)) return 60;
  // word boundary match
  if (t.split(/\s+/).some((w) => w.startsWith(q))) return 50;
  return 0;
}

function bestScore(fields: string[], query: string): number {
  return Math.max(0, ...fields.map((f) => score(f, query)));
}

export async function GET(request: NextRequest) {
  const q = (request.nextUrl.searchParams.get("q") || "").trim();

  if (!q || q.length < 2) {
    return NextResponse.json<SearchResponse>(
      { destinations: [], places: [], vibes: [], total: 0 },
      { headers: { "Cache-Control": "no-store" } }
    );
  }

  // --- Destinations (cities + neighbourhoods) ---
  const destResults: Array<SearchItem & { _score: number }> = [];

  for (const city of cities) {
    const s = bestScore([city.name, city.country, city.slug], q);
    if (s > 0) {
      destResults.push({
        _score: s + (city.status === "flagship" ? 10 : city.status === "live" ? 5 : 0),
        type: "city",
        label: city.name,
        sublabel: city.country,
        href: `/cities/${city.slug}`,
        meta: city.status === "flagship" ? "Flagship" : city.status === "live" ? "Live guide" : "Coming soon",
        badge: city.status,
      });
    }
    // Also search neighbourhood names
    for (const hood of city.neighborhoods) {
      const hs = score(hood.name, q);
      if (hs > 0) {
        destResults.push({
          _score: hs - 5,
          type: "neighbourhood",
          label: hood.name,
          sublabel: `${city.name} neighbourhood`,
          href: `/cities/${city.slug}`,
          meta: hood.mood,
        });
      }
    }
  }

  // --- Places (venues) ---
  const placeResults: Array<SearchItem & { _score: number }> = [];

  for (const venue of venues) {
    const s = bestScore(
      [venue.name, venue.type, venue.neighborhood, venue.city, venue.country || ""],
      q
    );
    if (s > 0) {
      placeResults.push({
        _score: s + (venue.listingTier === "premium" ? 8 : venue.listingTier === "featured" ? 4 : 0),
        type: "venue",
        label: venue.name,
        sublabel: `${venue.city} · ${venue.type}`,
        href: `/venues/${venue.slug}`,
        meta: venue.neighborhood,
        badge: venue.listingTier !== "free" ? venue.listingTier : undefined,
      });
    }
  }

  // --- Vibes ---
  const vibeResults: Array<SearchItem & { _score: number }> = [];

  for (const vibe of vibes) {
    const s = bestScore([vibe.name, vibe.description], q);
    if (s > 0) {
      vibeResults.push({
        _score: s,
        type: "vibe",
        label: vibe.name,
        sublabel: vibe.description,
        href: `/vibes?vibe=${vibe.id}`,
      });
    }
  }

  // Sort each group by score desc, cap at 5 results each
  const sort = <T extends { _score: number }>(arr: T[]) =>
    arr.sort((a, b) => b._score - a._score).slice(0, 5);

  const destinations = sort(destResults).map(({ _score: _s, ...rest }) => rest);
  const places = sort(placeResults).map(({ _score: _s, ...rest }) => rest);
  const vibesFinal = sort(vibeResults).map(({ _score: _s, ...rest }) => rest);

  const total = destinations.length + places.length + vibesFinal.length;

  return NextResponse.json<SearchResponse>(
    { destinations, places, vibes: vibesFinal, total },
    { headers: { "Cache-Control": "no-store" } }
  );
}
