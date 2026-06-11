import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookingHotelStrip from "../../components/BookingHotelStrip";
import FeaturedPlacementSlot from "../../components/FeaturedPlacementSlot";
import PlatformShell from "../../components/PlatformShell";
import Reveal from "../../components/Reveal";
import SaveButton from "../../components/SaveButton";
import VenueCard from "../../components/VenueCard";
import { cities, discoveryLayers, getCity, getFeaturedPlacements, getSortedVenuesByCity, getVenueLayer, vibes } from "../../data/platform";
import { breadcrumbSchema, faqSchema, touristDestinationSchema, toJsonLd } from "../../lib/schema";
import { hoodSlug } from "../../lib/utils";

interface CityPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return cities.map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({ params }: CityPageProps) {
  const { slug } = await params;
  const city = getCity(slug);
  return {
    title: city
      ? `${city.name} Cannabis Travel Guide | XRED EYEZ`
      : "City Guide | XRED EYEZ",
    description: city
      ? `${city.summary} Discover coffeeshops, social clubs, hotels, restaurants and routes in ${city.name}.`
      : "Cannabis culture city guides on XRED EYEZ.",
    alternates: city ? {
      canonical: `https://www.redeyez.co.uk/cities/${city.slug}`,
    } : undefined,
    openGraph: city ? {
      title: `${city.name} Cannabis Travel Guide | XRED EYEZ`,
      description: city.summary,
      type: "website",
      url: `https://www.redeyez.co.uk/cities/${city.slug}`,
      images: [{ url: city.heroImage }],
    } : undefined,
    twitter: city ? {
      card: "summary_large_image",
      title: `${city.name} Cannabis Travel Guide | XRED EYEZ`,
      description: city.summary,
      images: [city.heroImage],
    } : undefined,
  };
}

function deriveLazyPicks(city: ReturnType<typeof getCity>) {
  if (!city) return null;
  const bestFirstStop =
    city.routes[0]?.stops[0] || city.neighborhoods[0]?.name || city.name;
  const bestArea =
    city.neighborhoods.find((n) =>
      n.mood.toLowerCase().includes("calm") ||
      n.mood.toLowerCase().includes("relax") ||
      n.mood.toLowerCase().includes("local") ||
      n.note.toLowerCase().includes("hotel")
    ) || city.neighborhoods[1] || city.neighborhoods[0];
  const eveningRoute =
    city.routes.find((r) =>
      r.duration.toLowerCase().includes("evening") ||
      r.title.toLowerCase().includes("dark") ||
      r.title.toLowerCase().includes("night") ||
      r.title.toLowerCase().includes("after")
    ) || city.routes[1] || city.routes[0];
  return { bestFirstStop, bestArea, eveningRoute };
}

export default async function CityPage({ params }: CityPageProps) {
  const { slug } = await params;
  const city = getCity(slug);

  if (!city) notFound();

  const cityVenues = getSortedVenuesByCity(city.id);
  const placements = getFeaturedPlacements(city.id).slice(0, 2);
  const isLive = city.status === "flagship" || city.status === "live";
  const layerGroups = discoveryLayers.map((layer) => ({
    ...layer,
    venues: cityVenues.filter((venue) => getVenueLayer(venue) === layer.id),
  }));
  const activeLayerGroups = layerGroups.filter((layer) => layer.venues.length > 0);
  const cityVibes = vibes.filter((v) => city.vibeIds.includes(v.id));
  const lazyPicks = deriveLazyPicks(city);

  const bookingUrl = `/partners/booking?destination=${encodeURIComponent(city.name)}&city=${city.slug}&source=city-page`;

  const cityBreadcrumb = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Cities", href: "/cities" },
    { name: city.name, href: `/cities/${city.slug}` },
  ]);

  return (
    <PlatformShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(touristDestinationSchema(city)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqSchema(city)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(cityBreadcrumb) }} />
      {/* Cinematic city hero */}
      <section className="platform-city-hero">
        <Image
          src={city.heroImage}
          alt={`${city.name} cannabis travel guide`}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", filter: "brightness(0.72) contrast(1.1)" }}
        />
        <div className="platform-city-hero-overlay" />
        <div className="relative z-10">
          <div className="eyebrow">{city.country}</div>
          <h1 className="platform-title">{city.name}</h1>
          <p className="platform-lede">{city.summary}</p>

          {/* Quick action buttons */}
          <div className="city-quick-actions">
            {isLive && (
              <Link href={`/cities/${city.slug}/map`} className="platform-primary-action city-qa-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
                  <line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/>
                </svg>
                Open Map
              </Link>
            )}
            <a href={bookingUrl} className="platform-secondary-action city-qa-btn" target="_blank" rel="noopener noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              Book Hotels
            </a>
            <SaveButton itemType="city" itemId={city.id} label="Save City" />
          </div>
        </div>
      </section>

      {/* City title card */}
      <Reveal>
        <div className="city-title-card">
          <p className="city-title-eyebrow">
            {city.country}
            <span style={{ opacity: 0.4 }}>·</span>
            {city.status === "flagship" ? "Flagship Guide" : city.status === "live" ? "Live Guide" : "Coming Soon"}
          </p>
          <h2 className="city-title-name">{city.name}</h2>
          <p className="city-title-summary">{city.summary}</p>

          {/* Best for chips */}
          {cityVibes.length > 0 && (
            <div className="city-best-for">
              <span className="city-best-for-label">Best for</span>
              <div className="city-best-for-chips">
                {cityVibes.map((vibe) => (
                  <span key={vibe.id} className="city-best-for-chip" style={{ borderColor: `${vibe.accent}44` }}>
                    {vibe.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </Reveal>

      {/* Lazy Traveller Picks — "Just tell me where to go" */}
      {lazyPicks && (
        <Reveal>
          <section className="platform-section">
            <div className="lazy-picks-box">
              <div className="lazy-picks-header">
                <span className="eyebrow">Lazy Traveller</span>
                <h2 className="lazy-picks-title">Just tell me where to go.</h2>
                <p className="lazy-picks-sub">Skip the research. Here is everything you need.</p>
              </div>
              <div className="lazy-picks-grid">
                <div className="lazy-pick-item">
                  <span className="lazy-pick-icon" aria-hidden="true">◉</span>
                  <div>
                    <span className="lazy-pick-label">Best first stop</span>
                    <strong className="lazy-pick-value">{lazyPicks.bestFirstStop}</strong>
                  </div>
                </div>
                {lazyPicks.bestArea && (
                  <div className="lazy-pick-item">
                    <span className="lazy-pick-icon" aria-hidden="true">◆</span>
                    <div>
                      <span className="lazy-pick-label">Best area to stay</span>
                      <strong className="lazy-pick-value">{lazyPicks.bestArea.name}</strong>
                      <span className="lazy-pick-note">{lazyPicks.bestArea.mood}</span>
                    </div>
                  </div>
                )}
                {lazyPicks.eveningRoute && (
                  <div className="lazy-pick-item">
                    <span className="lazy-pick-icon" aria-hidden="true">◎</span>
                    <div>
                      <span className="lazy-pick-label">Best evening route</span>
                      <strong className="lazy-pick-value">{lazyPicks.eveningRoute.title}</strong>
                      <span className="lazy-pick-note">{lazyPicks.eveningRoute.duration}</span>
                    </div>
                  </div>
                )}
                <div className="lazy-pick-item lazy-pick-book">
                  <span className="lazy-pick-icon" aria-hidden="true">✦</span>
                  <div>
                    <span className="lazy-pick-label">Book your stay</span>
                    <strong className="lazy-pick-value">Hotels in {city.name}</strong>
                    <a
                      href={bookingUrl}
                      className="lazy-pick-cta"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Find hotels →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Reveal>
      )}

      {/* Layer overview */}
      <Reveal>
        <section className="platform-section">
          <div className="platform-section-head">
            <div>
              <div className="eyebrow">City Layers</div>
              <h2 className="platform-section-title">Move through the city naturally.</h2>
            </div>
            {isLive && (
              <Link href={`/cities/${city.slug}/map`} className="platform-inline-link">
                Filter on map
              </Link>
            )}
          </div>
          <div className="platform-layer-grid">
            {layerGroups.map((layer) => (
              <Link key={layer.id} href={isLive ? `/cities/${city.slug}/map` : "/cities"} className="platform-layer-card">
                <span>{layer.label}</span>
                <strong>{layer.venues.length || "Soon"}</strong>
                <p>{layer.description}</p>
                <em>{layer.shortAction}</em>
              </Link>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Neighborhoods */}
      {city.neighborhoods.length > 0 && (
        <Reveal>
          <div className="city-neighborhoods">
            <div className="city-neighborhoods-head">
              <h2 className="city-neighborhoods-title">Know the neighbourhoods.</h2>
              <span className="eyebrow">{city.neighborhoods.length} areas</span>
            </div>
            <div className="city-neighborhoods-grid">
              {city.neighborhoods.map((hood) => (
                <Link
                  key={hood.name}
                  href={`/cities/${city.slug}/neighbourhoods/${hoodSlug(hood.name)}`}
                  className="city-hood-item city-hood-item-link"
                >
                  <span className="city-hood-name">{hood.name}</span>
                  <span className="city-hood-mood">{hood.mood}</span>
                  <p className="city-hood-note">{hood.note}</p>
                  <span className="city-hood-arrow" aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {/* Featured placements */}
      {placements.length > 0 && (
        <Reveal>
          <section className="platform-section">
            <div className="platform-section-head">
              <div>
                <div className="eyebrow">Partner Ready</div>
                <h2 className="platform-section-title">Commercial slots.</h2>
              </div>
              <Link href="/partners/list" className="platform-inline-link">
                Get listed
              </Link>
            </div>
            <div className="platform-commercial-grid">
              {placements.map((placement) => (
                <FeaturedPlacementSlot key={placement.id} placement={placement} />
              ))}
            </div>
          </section>
        </Reveal>
      )}

      {/* Hotel booking strip */}
      <Reveal>
        <section className="platform-section">
          <BookingHotelStrip city={city} />
        </section>
      </Reveal>

      {/* Access & etiquette */}
      <Reveal>
        <section className="platform-section">
          <div className="platform-section-head">
            <div>
              <div className="eyebrow">Access & Etiquette</div>
              <h2 className="platform-section-title">Before you go.</h2>
            </div>
          </div>
          <div className="platform-legal-panel">
            <p>{city.legalContext}</p>
          </div>
        </section>
      </Reveal>

      {/* Routes */}
      {city.routes.length > 0 && (
        <Reveal>
          <section className="platform-section">
            <div className="platform-section-head">
              <div>
                <div className="eyebrow">City Flows</div>
                <h2 className="platform-section-title">Choose a route, not a random list.</h2>
              </div>
              {isLive && (
                <Link href={`/cities/${city.slug}/map`} className="platform-inline-link">
                  Open live map
                </Link>
              )}
            </div>
            <div className="platform-flow-grid">
              {city.routes.map((route) => (
                <Link key={route.title} href={isLive ? `/cities/${city.slug}/map` : "/cities"} className="platform-flow-card">
                  <span>{route.duration}</span>
                  <h3>{route.title}</h3>
                  <p>{route.description}</p>
                  <div className="platform-flow-stops">
                    {route.stops.slice(0, 4).map((stop) => (
                      <b key={stop}>{stop}</b>
                    ))}
                  </div>
                  <em>Build this route</em>
                </Link>
              ))}
              <Link href="/partners/list" className="platform-flow-card is-commercial">
                <span>Partner Ready</span>
                <h3>Own a city moment.</h3>
                <p>Feature a hotel, restaurant, social club, lounge, route, or experience inside the guide.</p>
                <div className="platform-flow-stops">
                  <b>Featured slot</b>
                  <b>Route sponsor</b>
                  <b>Premium listing</b>
                </div>
                <em>Get listed from €49/month</em>
              </Link>
            </div>
          </section>
        </Reveal>
      )}

      {/* Venue layers */}
      {activeLayerGroups.map((layer) => (
        <Reveal key={layer.id}>
          <section className="platform-section">
            <div className="platform-section-head">
              <div>
                <div className="eyebrow">{layer.label}</div>
                <h2 className="platform-section-title">
                  {layer.id === "cannabis" ? "Cannabis intelligence." : `${layer.label} picks.`}
                </h2>
              </div>
              <Link href={`/cities/${city.slug}/map`} className="platform-inline-link">
                Map mode
              </Link>
            </div>
            <div className="platform-card-grid">
              {layer.venues.map((venue) => (
                <VenueCard key={venue.id} venue={venue} />
              ))}
            </div>
          </section>
        </Reveal>
      ))}

      {/* Floating map CTA on mobile */}
      {isLive && (
        <div className="city-float-map" aria-hidden="false">
          <Link href={`/cities/${city.slug}/map`} className="city-float-map-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
              <line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/>
            </svg>
            Open {city.name} Map
          </Link>
        </div>
      )}
    </PlatformShell>
  );
}
