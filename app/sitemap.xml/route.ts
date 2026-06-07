import { cities, venues } from "../data/platform";
import { hoodSlug } from "../lib/utils";

const BASE = "https://www.redeyez.co.uk";

function url(path: string, priority: string, freq: string): string {
  return `  <url>
    <loc>${BASE}${path}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export function GET() {
  const entries: string[] = [];

  // Static pages
  entries.push(url("/", "1.0", "daily"));
  entries.push(url("/cities", "0.90", "daily"));
  entries.push(url("/explore", "0.90", "daily"));
  entries.push(url("/premium", "0.70", "monthly"));
  entries.push(url("/vault", "0.60", "monthly"));
  entries.push(url("/contact", "0.50", "monthly"));
  entries.push(url("/about", "0.50", "monthly"));
  entries.push(url("/partners/list", "0.60", "monthly"));

  // City guides + neighbourhood pages
  for (const city of cities) {
    entries.push(url(`/cities/${city.slug}`, "0.85", "weekly"));
    if (city.status === "flagship" || city.status === "live") {
      entries.push(url(`/cities/${city.slug}/map`, "0.75", "weekly"));
    }
    for (const nb of city.neighborhoods) {
      entries.push(url(`/cities/${city.slug}/neighbourhoods/${hoodSlug(nb.name)}`, "0.80", "weekly"));
    }
  }

  // Venue pages
  for (const venue of venues) {
    entries.push(url(`/venues/${venue.slug}`, "0.70", "weekly"));
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
