import Image from "next/image";
import Link from "next/link";
import CityCard from "../components/CityCard";
import CityLightRail from "../components/CityLightRail";
import PlatformShell from "../components/PlatformShell";
import { cities, getSortedVenuesByCity } from "../data/platform";

export const metadata = {
  title: "Cities | XRED EYEZ",
  description: "Browse X Red Eyez cannabis culture city guides and market guides.",
};

export default function CitiesPage() {
  const countrySections = cities.map((city) => ({
    city,
    venues: getSortedVenuesByCity(city.id).slice(0, 4),
  }));

  return (
    <PlatformShell>
      <section className="platform-hero">
        <div className="eyebrow">CITIES</div>
        <h1 className="platform-title">City guides that move with you.</h1>
        <p className="platform-lede">
          Start with Amsterdam, then follow the platform as Barcelona, Tenerife, Marbella, Thailand, Germany, Czech Republic, and South Africa open up.
        </p>
      </section>

      <CityLightRail />

      <section className="platform-section">
        <div className="platform-section-head">
          <div>
            <div className="eyebrow">MARKET LAYERS</div>
            <h2 className="platform-section-title">Each country, cleanly mapped.</h2>
          </div>
          <Link href="/cities/amsterdam/map" className="platform-inline-link">
            Open network map
          </Link>
        </div>

        <div className="country-market-stack">
          {countrySections.map(({ city, venues }) => {
            const isLive = city.status === "flagship" || city.status === "live";
            return (
              <article key={city.id} className="country-market-section">
                <Link
                  href={isLive ? `/cities/${city.slug}` : `/cities/${city.slug}/map`}
                  className="country-market-media"
                  aria-label={`Open ${city.name}`}
                >
                  <Image
                    src={city.heroImage}
                    alt={`${city.name} market guide`}
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    style={{ objectFit: "cover" }}
                  />
                  <span>{city.status === "flagship" ? "Flagship" : city.status === "live" ? "Live" : "Research"}</span>
                </Link>

                <div className="country-market-copy">
                  <div className="eyebrow">{city.country}</div>
                  <h3>{city.name}</h3>
                  <p>{city.summary}</p>
                  <div className="country-market-actions">
                    <Link href={`/cities/${city.slug}`}>Guide</Link>
                    <Link href={`/cities/${city.slug}/map`}>Map</Link>
                  </div>
                </div>

                <div className="country-business-panel">
                  <div className="country-business-heading">
                    <span>Businesses to watch</span>
                    <small>{venues.length ? `${venues.length} listed` : "Opening soon"}</small>
                  </div>
                  <div className="country-business-list">
                    {venues.length > 0 ? (
                      venues.map((venue) => (
                        <Link key={venue.id} href={`/venues/${venue.slug}`} className="country-business-row">
                          <span>
                            <strong>{venue.name}</strong>
                            <small>{venue.type} / {venue.neighborhood}</small>
                          </span>
                          <em>{venue.listingTier}</em>
                        </Link>
                      ))
                    ) : (
                      <div className="country-business-empty">
                        Partner research is being verified before this market opens.
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="platform-section">
        <div className="platform-section-head">
          <div>
            <div className="eyebrow">ALL GUIDES</div>
            <h2 className="platform-section-title">Browse the full board.</h2>
          </div>
        </div>
        <div className="platform-card-grid">
          {cities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>
      </section>
    </PlatformShell>
  );
}
