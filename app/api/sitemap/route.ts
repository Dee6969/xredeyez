import { cities, venues } from "../../data/platform";
import { hoodSlug } from "../../lib/utils";

const BASE = "https://www.redeyez.co.uk";
const TODAY = new Date().toISOString().split("T")[0];

function entry(path: string, priority: string, freq: string): string {
  return `  <url>\n    <loc>${BASE}${path}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

export function GET() {
  const lines: string[] = [];

  lines.push(entry("/", "1.0", "daily"));
  lines.push(entry("/cities", "0.90", "daily"));
  lines.push(entry("/explore", "0.90", "daily"));
  lines.push(entry("/premium", "0.70", "monthly"));
  lines.push(entry("/vault", "0.60", "monthly"));
  lines.push(entry("/contact", "0.50", "monthly"));
  lines.push(entry("/about", "0.50", "monthly"));
  lines.push(entry("/partners/list", "0.60", "monthly"));

  for (const city of cities) {
    lines.push(entry(`/cities/${city.slug}`, "0.85", "weekly"));
    if (city.status === "flagship" || city.status === "live") {
      lines.push(entry(`/cities/${city.slug}/map`, "0.75", "weekly"));
    }
    for (const nb of city.neighborhoods) {
      lines.push(entry(`/cities/${city.slug}/neighbourhoods/${hoodSlug(nb.name)}`, "0.80", "weekly"));
    }
  }

  for (const venue of venues) {
    lines.push(entry(`/venues/${venue.slug}`, "0.70", "weekly"));
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${lines.join("\n")}\n</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
