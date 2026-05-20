import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookingHotelStrip from "../../components/BookingHotelStrip";
import FeaturedPlacementSlot from "../../components/FeaturedPlacementSlot";
import PlatformShell from "../../components/PlatformShell";
import Reveal from "../../components/Reveal";
import SaveButton from "../../components/SaveButton";
import VenueCard from "../../components/VenueCard";
import { cities, discoveryLayers, getCity, getFeaturedPlacements, getSortedVenuesByCity, getVenueLayer } from "../../data/platform";

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
    title: city ? `${city.name} Guide | XRED EYEZ` : "City Guide | XRED EYEZ",
    description: city?.summary,
  };
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

  return (
    <PlatformShell>
      {/* Cinematic city hero */}
      <section className="platform-city-hero">
        <Image
          src={city.heroImage}
          alt={`${city.name} guide`}
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
          <div className="platform-action-row">
            {isLive && (
              <Link href={`/cities/${city.slug}/map`} className="platform-primary-action">
                Open Map
              </Link>
            )}
            <SaveButton itemType="city" itemId={city.id} label="Save City" />
          </div>
        </div>
      </section>

      {/* City title card — large name */}
      <Reveal>
        <div className="city-title-card">
          <p className="city-title-eyebrow">
            {city.country}
            <span style={{ opacity: 0.4 }}>·</span>
            {city.status === "flagship" ? "Flagship Guide" : city.status === "live" ? "Live Guide" : "Coming Soon"}
          </p>
          <h2 className="city-title-name">{city.name}</h2>
          <p className="city-title-summary">{city.summary}</p>
        </div>
      </Reveal>

      {/* Layer overview */}
      <Reveal>
        <section className="platform-section">
          <div className="platform-section-head">
            <div>
              <div className="eyebrow">CITY LAYERS</div>
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
                <div key={hood.name} className="city-hood-item">
                  <span className="city-hood-name">{hood.name}</span>
                  <span className="city-hood-mood">{hood.mood}</span>
                  <p className="city-hood-note">{hood.note}</p>
                </div>
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
                <div className="eyebrow">PARTNER READY</div>
                <h2 className="platform-section-title">Commercial slots.</h2>
              </div>
              <Link href="/partners/claim" className="platform-inline-link">
                Claim / sponsor
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

      <Reveal>
        <section className="platform-section">
          <BookingHotelStrip city={city} />
        </section>
      </Reveal>

      {/* Legal context — editorial panel */}
      <Reveal>
        <section className="platform-section">
          <div className="platform-section-head">
            <div>
              <div className="eyebrow">ACCESS & ETIQUETTE</div>
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
                <div className="eyebrow">CITY FLOWS</div>
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
              <Link href="/partners/claim" className="platform-flow-card is-commercial">
                <span>PARTNER READY</span>
                <h3>Own a city moment.</h3>
                <p>Feature a hotel, restaurant, social club, lounge, route, or experience inside the guide without making the product feel crowded.</p>
                <div className="platform-flow-stops">
                  <b>Featured slot</b>
                  <b>Route sponsor</b>
                  <b>Premium listing</b>
                </div>
                <em>Claim / sponsor</em>
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

    </PlatformShell>
  );
}
