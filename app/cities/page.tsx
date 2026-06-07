import Image from "next/image";
import Link from "next/link";
import CityCard from "../components/CityCard";
import CityLightRail from "../components/CityLightRail";
import PlatformShell from "../components/PlatformShell";
import Reveal from "../components/Reveal";
import { cities, getSortedVenuesByCity } from "../data/platform";

export const metadata = {
  title: "Cannabis City Guides — Amsterdam, Barcelona, Prague & More | XRED EYEZ",
  description: "Browse XRED EYEZ cannabis culture city guides. Coffeeshops, social clubs, hotels, restaurants and curated routes across Europe and beyond.",
  alternates: {
    canonical: "https://www.redeyez.co.uk/cities",
  },
};

export default function CitiesPage() {
  const countrySections = cities.map((city) => ({
    city,
    venues: getSortedVenuesByCity(city.id).slice(0, 4),
  }));

  return (
    <PlatformShell>
      <Reveal>
        <section className="platform-hero">
          <div className="eyebrow">DESTINATIONS</div>
          <h1 className="platform-title">Countries & cities, mapped.</h1>
          <p className="platform-lede">
            Amsterdam, Barcelona, USA, and Canada are flagship and live. Tenerife, Marbella, Thailand, Germany, Czech Republic, and South Africa guides are open — maps, venues, and culture layers across every destination.
          </p>
        </section>
      </Reveal>

      <CityLightRail />

      <Reveal>
        <section className="platform-section">
          <div className="platform-section-head">
            <div>
              <div className="eyebrow">MARKET LAYERS</div>
              <h2 className="platform-section-title">Each country, cleanly mapped.</h2>
            </div>
            <Link href="/map" className="platform-inline-link">
              Open map
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
      </Reveal>

      <Reveal>
        <section className="platform-section">
          <div className="platform-section-head">
            <div>
              <div className="eyebrow">ALL DESTINATIONS</div>
              <h2 className="platform-section-title">Every country & city.</h2>
            </div>
          </div>
          <div className="platform-card-grid">
            {cities.map((city) => (
              <CityCard key={city.id} city={city} />
            ))}
          </div>
        </section>
      </Reveal>
    </PlatformShell>
  );
}
