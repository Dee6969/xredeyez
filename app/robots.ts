import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/partners/claim",
          "/admin",
        ],
      },
    ],
    sitemap: "https://www.redeyez.co.uk/sitemap.xml",
    host: "https://www.redeyez.co.uk",
  };
}
