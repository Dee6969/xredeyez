import type { City, Venue } from "../data/platform";

const SITE_URL = "https://www.redeyez.co.uk";

// ── Country code map ────────────────────────────────────────────────────────
const COUNTRY_CODES: Record<string, string> = {
  Netherlands: "NL",
  Spain: "ES",
  Germany: "DE",
  "Czech Republic": "CZ",
  Thailand: "TH",
  "South Africa": "ZA",
  "United States": "US",
  "United States of America": "US",
  USA: "US",
  Canada: "CA",
  "United Kingdom": "GB",
};

function countryCode(country: string): string {
  return COUNTRY_CODES[country] || country.slice(0, 2).toUpperCase();
}

// ── Schema.org type mapping ─────────────────────────────────────────────────
function schemaType(venueType: string): string {
  const t = venueType.toLowerCase();
  if (t.includes("hotel") || t.includes("hostel") || t.includes("apartment") ||
      t.includes("boutique") || t.includes("stay") || t.includes("lodge")) {
    return "LodgingBusiness";
  }
  if (t.includes("restaurant") || t.includes("cafe") || t.includes("café") ||
      t.includes("brunch") || t.includes("food") || t.includes("diner")) {
    return "Restaurant";
  }
  if (t.includes("bar") || t.includes("lounge") || t.includes("pub")) {
    return "BarOrPub";
  }
  if (t.includes("wellness") || t.includes("spa") || t.includes("gym")) {
    return "HealthAndBeautyBusiness";
  }
  if (t.includes("gallery") || t.includes("museum")) {
    return "ArtGallery";
  }
  return "LocalBusiness";
}

// ── Breadcrumb ──────────────────────────────────────────────────────────────
export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}

// ── LocalBusiness (venue) ───────────────────────────────────────────────────
export function localBusinessSchema(venue: Venue) {
  const type = schemaType(venue.type);
  const code = countryCode(venue.country || "");

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": type,
    name: venue.name,
    description: venue.description,
    url: `${SITE_URL}/venues/${venue.slug}`,
    "@id": `${SITE_URL}/venues/${venue.slug}#business`,
    address: {
      "@type": "PostalAddress",
      addressLocality: venue.city,
      addressCountry: code,
      ...(venue.address ? { streetAddress: venue.address } : {}),
      ...(venue.postcode ? { postalCode: venue.postcode } : {}),
    },
  };

  // Geo coordinates
  if (venue.coordinates?.lat && venue.coordinates?.lng) {
    schema.geo = {
      "@type": "GeoCoordinates",
      latitude: venue.coordinates.lat,
      longitude: venue.coordinates.lng,
    };
  }

  // Opening hours
  if (venue.openingHours) {
    schema.openingHours = venue.openingHours;
  }

  // Website
  if (venue.partnerUrl) {
    schema.sameAs = venue.partnerUrl;
  }

  // Image
  if (venue.image) {
    schema.image = venue.image.startsWith("http") ? venue.image : `${SITE_URL}${venue.image}`;
  }

  // Founded year
  if (venue.brand?.foundedYear) {
    schema.foundingDate = String(venue.brand.foundedYear);
  }

  return schema;
}

// ── FAQ (city etiquette) ────────────────────────────────────────────────────
export function faqSchema(city: City) {
  const faqs: Array<{ question: string; answer: string }> = [
    {
      question: `What is the cannabis culture like in ${city.name}?`,
      answer: city.summary,
    },
    {
      question: `What are the cannabis rules and etiquette in ${city.name}?`,
      answer: city.legalContext,
    },
  ];

  // Add a routes FAQ if city has routes
  if (city.routes.length > 0) {
    const routeNames = city.routes.map((r) => `${r.title} (${r.duration})`).join(", ");
    faqs.push({
      question: `What are the best routes and itineraries in ${city.name}?`,
      answer: `XRED EYEZ recommends the following curated routes in ${city.name}: ${routeNames}. Each route is designed for cannabis culture travellers and covers the best spots for the time available.`,
    });
  }

  // Add a neighbourhood FAQ if city has neighbourhoods
  if (city.neighborhoods.length > 0) {
    const hoodNames = city.neighborhoods
      .slice(0, 4)
      .map((n) => `${n.name} (${n.mood})`)
      .join(", ");
    faqs.push({
      question: `What are the best neighbourhoods to stay in ${city.name}?`,
      answer: `The top areas in ${city.name} for cannabis culture travellers are: ${hoodNames}. Each neighbourhood has its own energy and is suited to different travel styles.`,
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// ── TouristDestination (city) ───────────────────────────────────────────────
export function touristDestinationSchema(city: City) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: city.name,
    description: city.summary,
    url: `${SITE_URL}/cities/${city.slug}`,
    "@id": `${SITE_URL}/cities/${city.slug}#destination`,
    touristType: ["Cannabis culture traveller", "City explorer"],
    image: city.heroImage.startsWith("http")
      ? city.heroImage
      : `${SITE_URL}${city.heroImage}`,
    containedInPlace: {
      "@type": "Country",
      name: city.country,
    },
  };
}

// ── Organization (site-wide) ────────────────────────────────────────────────
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "XRED EYEZ",
    url: SITE_URL,
    logo: `${SITE_URL}/redeyez-logo-clear.png`,
    description: "Premium cannabis culture travel platform. City guides, venue discovery, routes and hotel booking.",
    sameAs: [
      "https://instagram.com/xredeyez",
      "https://x.com/xredeyez",
      "https://tiktok.com/@xredeyez",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: `${SITE_URL}/contact`,
    },
  };
}

// ── Neighbourhood (Place) ───────────────────────────────────────────────────
export function neighbourhoodSchema(
  hood: { name: string; mood: string; note: string },
  city: City,
  hoodSlugStr: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name: `${hood.name}`,
    description: `${hood.mood} in ${city.name}. ${hood.note}`,
    url: `${SITE_URL}/cities/${city.slug}/neighbourhoods/${hoodSlugStr}`,
    "@id": `${SITE_URL}/cities/${city.slug}/neighbourhoods/${hoodSlugStr}#place`,
    containedInPlace: {
      "@type": "City",
      name: city.name,
      containedInPlace: {
        "@type": "Country",
        name: city.country,
      },
    },
  };
}

// ── Helper: serialize to JSON-LD string ────────────────────────────────────
export function toJsonLd(schema: Record<string, unknown>): string {
  return JSON.stringify(schema);
}
