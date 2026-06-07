import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PlatformShell from "../../../../components/PlatformShell";
import Reveal from "../../../../components/Reveal";
import VenueCard from "../../../../components/VenueCard";
import { cities, getCity, getSortedVenuesByCity } from "../../../../data/platform";
import { breadcrumbSchema, neighbourhoodSchema, toJsonLd } from "../../../../lib/schema";
import { hoodSlug } from "../../../../lib/utils";

interface HoodPageProps {
  params: Promise<{ slug: string; hood: string }>;
}

export function generateStaticParams() {
  const params: { slug: string; hood: string }[] = [];
  for (const city of cities) {
    for (const nb of city.neighborhoods) {
      params.push({ slug: city.slug, hood: hoodSlug(nb.name) });
    }
  }
  return params;
}

export async function generateMetadata({ params }: HoodPageProps) {
  const { slug, hood } = await params;
  const city = getCity(slug);
  const nb = city?.neighborhoods.find(n => hoodSlug(n.name) === hood);
  if (!city || !nb) return { title: "Neighbourhood | XRED EYEZ" };

  const title = `${nb.name}, ${city.name} Cannabis Guide | XRED EYEZ`;
  const description = `${nb.mood} in ${city.name}. ${nb.note} Discover cannabis culture venues, local intel and routes in ${nb.name}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: city.heroImage }],
    },
    alternates: {
      canonical: `https://www.redeyez.co.uk/cities/${slug}/neighbourhoods/${hood}`,
    },
  };
}

export default async function NeighbourhoodPage({ params }: HoodPageProps) {
  const { slug, hood } = await params;
  const city = getCity(slug);
  const nb = city?.neighborhoods.find(n => hoodSlug(n.name) === hood);
  if (!city || !nb) notFound();

  const allCityVenues = getSortedVenuesByCity(city.id);

  // Venues in this neighbourhood — case-insensitive match
  const hoodVenues = allCityVenues.filter(
    v => v.neighborhood.toLowerCase() === nb.name.toLowerCase()
  );

  // Other venues in same city for "explore nearby"
  const nearbyVenues = allCityVenues
    .filter(v => v.neighborhood.toLowerCase() !== nb.name.toLowerCase())
    .slice(0, 3);

  // Sibling neighbourhoods
  const siblings = city.neighborhoods.filter(n => n.name !== nb.name);

  // Routes that mention this neighbourhood in stops
  const relevantRoutes = city.routes.filter(r =>
    r.stops.some(s => s.toLowerCase().includes(nb.name.toLowerCase()))
  );

  const breadcrumb = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Cities", href: "/cities" },
    { name: city.name, href: `/cities/${city.slug}` },
    { name: nb.name, href: `/cities/${city.slug}/neighbourhoods/${hood}` },
  ]);

  return (
    <PlatformShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(neighbourhoodSchema(nb, city, hood)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumb) }} />

      {/* ══════════════════════════════════════
          HERO
          ══════════════════════════════════════ */}
      <Reveal>
        <section className="hood-hero">
          <div className="hood-hero-img">
            <Image
              src={city.heroImage}
              alt={`${nb.name}, ${city.name}`}
              fill
              priority
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
            <div className="hood-hero-overlay" />
          </div>

          <div className="hood-hero-body">
            <div className="hood-hero-nav">
              <Link href={`/cities/${city.slug}`} className="hood-back">
                ← {city.name}
              </Link>
              <span className="hood-hero-country">{city.country}</span>
            </div>

            <div className="hood-hero-label">Neighbourhood</div>
            <h1 className="hood-hero-name">{nb.name}</h1>
            <p className="hood-hero-mood">{nb.mood}</p>
          </div>
        </section>
      </Reveal>

      {/* ══════════════════════════════════════
          LOCAL INTEL
          ══════════════════════════════════════ */}
      <Reveal>
        <section className="platform-section hood-intel-section">
          <div className="hood-intel-grid">
            <div className="hood-intel-main">
              <div className="eyebrow">Local intel</div>
              <h2 className="hood-intel-title">What to expect in {nb.name}.</h2>
              <p className="hood-intel-note">{nb.note}</p>
              <p className="hood-intel-context">{city.legalContext}</p>
            </div>

            <div className="hood-intel-sidebar">
              <div className="hood-stat">
                <span className="hood-stat-label">Mood</span>
                <strong className="hood-stat-val">{nb.mood}</strong>
              </div>
              <div className="hood-stat">
                <span className="hood-stat-label">City</span>
                <strong className="hood-stat-val">{city.name}</strong>
              </div>
              <div className="hood-stat">
                <span className="hood-stat-label">Venues indexed</span>
                <strong className="hood-stat-val">{hoodVenues.length || "Coming soon"}</strong>
              </div>
              {relevantRoutes.length > 0 && (
                <div className="hood-stat">
                  <span className="hood-stat-label">Featured in routes</span>
                  <strong className="hood-stat-val">{relevantRoutes.length}</strong>
                </div>
              )}
              <div className="hood-stat-actions">
                <Link
                  href={`/cities/${city.slug}/map`}
                  className="platform-primary-action"
                  style={{ fontSize: "13px", minHeight: "40px", padding: "10px 20px" }}
                >
                  View on map
                </Link>
                <Link
                  href={`/cities/${city.slug}`}
                  className="platform-secondary-action"
                  style={{ fontSize: "13px", minHeight: "40px", padding: "10px 20px" }}
                >
                  Full city guide
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ══════════════════════════════════════
          ROUTES (if any pass through here)
          ══════════════════════════════════════ */}
      {relevantRoutes.length > 0 && (
        <Reveal>
          <section className="platform-section">
            <div className="platform-section-head">
              <div>
                <div className="eyebrow">Curated routes</div>
                <h2 className="platform-section-title">{nb.name} is on the route.</h2>
              </div>
              <Link href={`/cities/${city.slug}`} className="platform-inline-link">
                All {city.name} routes →
              </Link>
            </div>
            <div className="hood-routes-list">
              {relevantRoutes.map(r => (
                <div key={r.title} className="hood-route-item">
                  <div className="hood-route-meta">
                    <span className="hood-route-duration">{r.duration}</span>
                  </div>
                  <strong className="hood-route-title">{r.title}</strong>
                  <p className="hood-route-desc">{r.description}</p>
                  <div className="hood-route-stops">
                    {r.stops.map(s => (
                      <span key={s} className="hood-route-stop">{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Reveal>
      )}

      {/* ══════════════════════════════════════
          VENUES IN THIS NEIGHBOURHOOD
          ══════════════════════════════════════ */}
      <Reveal>
        <section className="platform-section">
          <div className="platform-section-head">
            <div>
              <div className="eyebrow">{nb.name} · {city.name}</div>
              <h2 className="platform-section-title">
                {hoodVenues.length > 0
                  ? `${hoodVenues.length} ${hoodVenues.length === 1 ? "place" : "places"} in ${nb.name}.`
                  : `Coming to ${nb.name}.`}
              </h2>
            </div>
            {hoodVenues.length > 0 && (
              <Link href={`/explore?city=${city.id}&layer=all`} className="platform-inline-link">
                All {city.name} venues →
              </Link>
            )}
          </div>

          {hoodVenues.length > 0 ? (
            <div className="platform-card-grid">
              {hoodVenues.map(venue => (
                <VenueCard key={venue.id} venue={venue} />
              ))}
            </div>
          ) : (
            <div className="hood-empty">
              <p>Venue coverage for {nb.name} is being built. Check back soon or explore the full {city.name} map.</p>
              <Link href={`/cities/${city.slug}/map`} className="platform-primary-action" style={{ marginTop: "20px", display: "inline-flex", minHeight: "40px", fontSize: "13px", padding: "10px 24px" }}>
                Open map
              </Link>
            </div>
          )}
        </section>
      </Reveal>

      {/* ══════════════════════════════════════
          NEARBY IN THE CITY
          ══════════════════════════════════════ */}
      {nearbyVenues.length > 0 && (
        <Reveal>
          <section className="platform-section">
            <div className="platform-section-head">
              <div>
                <div className="eyebrow">Wider city</div>
                <h2 className="platform-section-title">Beyond {nb.name}.</h2>
              </div>
              <Link href={`/cities/${city.slug}`} className="platform-inline-link">
                Full {city.name} guide →
              </Link>
            </div>
            <div className="platform-card-grid">
              {nearbyVenues.map(venue => (
                <VenueCard key={venue.id} venue={venue} />
              ))}
            </div>
          </section>
        </Reveal>
      )}

      {/* ══════════════════════════════════════
          SIBLING NEIGHBOURHOODS
          ══════════════════════════════════════ */}
      {siblings.length > 0 && (
        <Reveal>
          <section className="platform-section">
            <div className="eyebrow" style={{ marginBottom: "16px" }}>More {city.name} neighbourhoods</div>
            <div className="hood-sibling-grid">
              {siblings.map(sib => (
                <Link
                  key={sib.name}
                  href={`/cities/${city.slug}/neighbourhoods/${hoodSlug(sib.name)}`}
                  className="hood-sibling-card"
                >
                  <strong className="hood-sibling-name">{sib.name}</strong>
                  <span className="hood-sibling-mood">{sib.mood}</span>
                  <span className="hood-sibling-note">{sib.note}</span>
                  <span className="hood-sibling-arrow" aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </section>
        </Reveal>
      )}

      {/* ══════════════════════════════════════
          CITY FOOTER CTA
          ══════════════════════════════════════ */}
      <Reveal>
        <section className="platform-section" style={{ textAlign: "center", padding: "48px 0 72px" }}>
          <div className="eyebrow" style={{ marginBottom: "12px" }}>{city.name} Cannabis Guide</div>
          <h2 className="platform-section-title" style={{ marginBottom: "28px" }}>
            Every neighbourhood. Every layer.
          </h2>
          <div className="platform-action-row" style={{ justifyContent: "center" }}>
            <Link href={`/cities/${city.slug}`} className="platform-primary-action">
              Full {city.name} guide
            </Link>
            <Link href={`/cities/${city.slug}/map`} className="platform-secondary-action">
              Open map
            </Link>
          </div>
        </section>
      </Reveal>

    </PlatformShell>
  );
}
