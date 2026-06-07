import type { MetadataRoute } from "next";
import { cities, venues } from "./data/platform";
import { hoodSlug } from "./lib/utils";

const BASE = "https://www.redeyez.co.uk";
const now = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // ── Static pages ──────────────────────────────────────────────
  const statics: [string, "daily" | "weekly" | "monthly", number][] = [
    ["/", "daily", 1.0],
    ["/cities", "daily", 0.9],
    ["/explore", "daily", 0.9],
    ["/premium", "monthly", 0.7],
    ["/vault", "monthly", 0.6],
    ["/contact", "monthly", 0.5],
    ["/about", "monthly", 0.5],
    ["/partners/list", "monthly", 0.6],
  ];
  for (const [path, freq, priority] of statics) {
    entries.push({ url: `${BASE}${path}`, lastModified: now, changeFrequency: freq, priority });
  }

  // ── City guides ───────────────────────────────────────────────
  for (const city of cities) {
    entries.push({
      url: `${BASE}/cities/${city.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    });
    if (city.status === "flagship" || city.status === "live") {
      entries.push({
        url: `${BASE}/cities/${city.slug}/map`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.75,
      });
    }

    // ── Neighbourhood pages ──────────────────────────────────────
    for (const nb of city.neighborhoods) {
      entries.push({
        url: `${BASE}/cities/${city.slug}/neighbourhoods/${hoodSlug(nb.name)}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  // ── Venue pages ───────────────────────────────────────────────
  for (const venue of venues) {
    entries.push({
      url: `${BASE}/venues/${venue.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  return entries;
}
