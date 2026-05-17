import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import FeaturedPlacementSlot from "../../components/FeaturedPlacementSlot";
import PlatformShell from "../../components/PlatformShell";
import SaveButton from "../../components/SaveButton";
import VenueCard from "../../components/VenueCard";
import { cities, getCity, getFeaturedPlacements, getSortedVenuesByCity, getVibe } from "../../data/platform";

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

  return (
    <PlatformShell>
      <section className="platform-city-hero">
        <Image
          src={city.heroImage}
          alt={`${city.name} guide`}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", filter: "brightness(0.78) contrast(1.08)" }}
        />
        <div className="platform-city-hero-overlay" />
        <div className="relative z-10">
          <div className="eyebrow">{city.country}</div>
          <h1 className="platform-title">{city.name}</h1>
          <p className="platform-lede">{city.summary}</p>
          <div className="platform-action-row">
            {isLive && (
              <Link href={`/cities/${city.slug}/map`} data-hover className="platform-primary-action">
                Open Map
              </Link>
            )}
            <SaveButton itemType="city" itemId={city.id} label="Save City" />
          </div>
        </div>
      </section>

      <section className="platform-section">
        <div className="platform-info-strip">
          <div>
            <span>Where am I?</span>
            <strong>{city.name} guide</strong>
          </div>
          <div>
            <span>What can I do?</span>
            <strong>{isLive ? "Map, vibes, venues, routes" : "Preview market guide"}</strong>
          </div>
          <div>
            <span>Tap next</span>
            <strong>{isLive ? "Open Map" : "Save City"}</strong>
          </div>
        </div>
      </section>

      {placements.length > 0 && (
        <section className="platform-section">
          <div className="platform-section-head">
            <div>
              <div className="eyebrow">PARTNER READY</div>
              <h2 className="platform-section-title">Commercial slots.</h2>
            </div>
            <Link href="/partners/claim" data-hover className="platform-inline-link">
              Claim / sponsor
            </Link>
          </div>
          <div className="platform-commercial-grid">
            {placements.map((placement) => (
              <FeaturedPlacementSlot key={placement.id} placement={placement} />
            ))}
          </div>
        </section>
      )}

      <section className="platform-section">
        <div className="platform-section-head">
          <div>
            <div className="eyebrow">CONTEXT</div>
            <h2 className="platform-section-title">Access and etiquette.</h2>
          </div>
        </div>
        <div className="platform-panel">
          <p>{city.legalContext}</p>
        </div>
      </section>

      <section className="platform-section">
        <div className="platform-section-head">
          <div>
            <div className="eyebrow">VIBES</div>
            <h2 className="platform-section-title">Best moods here.</h2>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {city.vibeIds.map((vibeId) => {
            const vibe = getVibe(vibeId);
            return (
              <Link key={vibeId} href={`/vibes?vibe=${vibeId}`} data-hover className="vibe-chip" style={{ borderColor: `${vibe?.accent || "#fff"}66` }}>
                {vibe?.name || vibeId}
              </Link>
            );
          })}
        </div>
      </section>

      {city.neighborhoods.length > 0 && (
        <section className="platform-section">
          <div className="platform-section-head">
            <div>
              <div className="eyebrow">NEIGHBORHOODS</div>
              <h2 className="platform-section-title">Browse by zone.</h2>
            </div>
          </div>
          <div className="platform-module-grid">
            {city.neighborhoods.map((area) => (
              <article key={area.name} className="platform-card p-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">{area.mood}</div>
                <h3 className="mt-3 font-display text-[28px] leading-none text-[var(--bone)]">{area.name}</h3>
                <p className="mt-4 text-[14px] leading-6 text-white/58">{area.note}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {cityVenues.length > 0 && (
        <section className="platform-section">
          <div className="platform-section-head">
            <div>
              <div className="eyebrow">VENUES</div>
              <h2 className="platform-section-title">Featured places.</h2>
            </div>
            <Link href={`/cities/${city.slug}/map`} data-hover className="platform-inline-link">
              Map mode
            </Link>
          </div>
          <div className="platform-card-grid">
            {cityVenues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        </section>
      )}

      {city.routes.length > 0 && (
        <section className="platform-section">
          <div className="platform-section-head">
            <div>
              <div className="eyebrow">ROUTES</div>
              <h2 className="platform-section-title">Suggested movement.</h2>
            </div>
          </div>
          <div className="platform-module-grid">
            {city.routes.map((route) => (
              <article key={route.title} className="platform-card p-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--xred-hot)]">{route.duration}</div>
                <h3 className="mt-3 font-display text-[28px] leading-none text-[var(--bone)]">{route.title}</h3>
                <p className="mt-4 text-[14px] leading-6 text-white/58">{route.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {route.stops.map((stop) => (
                    <span key={stop} className="vibe-chip">{stop}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </PlatformShell>
  );
}
