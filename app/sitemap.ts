import type { MetadataRoute } from "next";
import { cities, venues } from "./data/platform";
import { guides } from "./data/guides";
import { dnaSections } from "./data/dna";
import { roomIntros } from "./data/rooms";
import { legalPages } from "./data/legal";
import { hoodSlug } from "./lib/utils";

const BASE = "https://www.redeyez.co.uk";

/**
 * Dynamic sitemap generated from platform data.
 * Replaces the hand-maintained public/sitemap.xml, which went stale the
 * moment a venue was added. New cities, venues, guides and neighbourhoods
 * are now indexed automatically on every build.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/cities`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/explore`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/map`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/medical`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/medical/clinics`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/premium`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/partners/list`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/vibes`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE}/news`, lastModified: now, changeFrequency: "daily", priority: 0.6 },
    { url: `${BASE}/shop`, lastModified: now, changeFrequency: "weekly", priority: 0.5 },
    { url: `${BASE}/vault`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/trips`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
  ];

  const cityRoutes: MetadataRoute.Sitemap = cities.flatMap((city) => {
    const isLive = city.status === "flagship" || city.status === "live";
    return [
      {
        url: `${BASE}/cities/${city.slug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: isLive ? 0.9 : 0.5,
      },
      ...(isLive
        ? [
            {
              url: `${BASE}/cities/${city.slug}/map`,
              lastModified: now,
              changeFrequency: "weekly" as const,
              priority: 0.7,
            },
          ]
        : []),
      ...city.neighborhoods.map((nb) => ({
        url: `${BASE}/cities/${city.slug}/neighbourhoods/${hoodSlug(nb.name)}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
    ];
  });

  const venueRoutes: MetadataRoute.Sitemap = venues.map((venue) => ({
    url: `${BASE}/venues/${venue.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: venue.listingTier === "premium" ? 0.8 : venue.isFeatured ? 0.7 : 0.6,
  }));

  const guideRoutes: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${BASE}/guides/${guide.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const dnaRoutes: MetadataRoute.Sitemap = dnaSections.map((entry) => ({
    url: `${BASE}/dna/${entry.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.4,
  }));

  const roomRoutes: MetadataRoute.Sitemap = roomIntros.map((room) => ({
    url: `${BASE}/rooms/${room.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.4,
  }));

  const legalRoutes: MetadataRoute.Sitemap = legalPages.map((page) => ({
    url: `${BASE}/${page.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.3,
  }));

  return [
    ...staticRoutes,
    ...cityRoutes,
    ...venueRoutes,
    ...guideRoutes,
    ...dnaRoutes,
    ...roomRoutes,
    ...legalRoutes,
  ];
}
