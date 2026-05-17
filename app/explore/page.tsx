import Link from "next/link";
import CityCard from "../components/CityCard";
import CityLightRail from "../components/CityLightRail";
import FeaturedPlacementSlot from "../components/FeaturedPlacementSlot";
import PlatformShell from "../components/PlatformShell";
import VenueCard from "../components/VenueCard";
import { cities, getFeaturedPlacements, getSortedVenuesByCity, vibes } from "../data/platform";

export const metadata = {
  title: "Explore | XRED EYEZ",
  description: "Explore cannabis culture, city guides, vibes, venues, and lifestyle spots.",
};

export default function ExplorePage() {
  const featuredCities = cities.slice(0, 4);
  const featuredVenues = getSortedVenuesByCity("amsterdam").slice(0, 3);
  const placements = getFeaturedPlacements("amsterdam").slice(0, 2);

  return (
    <PlatformShell>
      <section className="platform-hero">
        <div className="eyebrow">Explore</div>
        <h1 className="platform-title">Find the room. Read the city.</h1>
        <p className="platform-lede">
          Start with Amsterdam, browse by vibe, save places, and discover the world&apos;s best cannabis culture destinations.
        </p>
        <div className="platform-action-row">
          <Link href="/cities/amsterdam/map" className="platform-primary-action">
            Open Amsterdam Map
          </Link>
          <Link href="/cities" className="platform-secondary-action">
            Browse Cities
          </Link>
          <Link href="/partners/claim" className="platform-secondary-action">
            Claim a Listing
          </Link>
        </div>
      </section>

      <CityLightRail />

      <section className="platform-section">
        <div className="platform-info-strip">
          <div>
            <span>Where am I?</span>
            <strong>Explore hub</strong>
          </div>
          <div>
            <span>What can I do?</span>
            <strong>Map, filter, save</strong>
          </div>
          <div>
            <span>Best first step</span>
            <strong>Amsterdam Map</strong>
          </div>
        </div>
      </section>

      {placements.length > 0 && (
        <section className="platform-section">
          <div className="platform-section-head">
            <div>
              <div className="eyebrow">Featured</div>
              <h2 className="platform-section-title">Partner highlights.</h2>
            </div>
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
            <div className="eyebrow">Vibes</div>
            <h2 className="platform-section-title">Browse by mood.</h2>
          </div>
          <Link href="/vibes" className="platform-inline-link">
            All vibes →
          </Link>
        </div>
        <div className="platform-chip-grid">
          {vibes.slice(0, 12).map((vibe) => (
            <Link
              key={vibe.id}
              href={`/vibes?vibe=${vibe.id}`}
              className="platform-vibe-tile"
              style={{ borderLeftColor: `${vibe.accent}55`, borderLeftWidth: "3px" }}
            >
              <span>{vibe.name}</span>
              <small>{vibe.description}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="platform-section">
        <div className="platform-section-head">
          <div>
            <div className="eyebrow">Cities</div>
            <h2 className="platform-section-title">Featured guides.</h2>
          </div>
          <Link href="/cities" className="platform-inline-link">
            View all →
          </Link>
        </div>
        <div className="platform-card-grid">
          {featuredCities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>
      </section>

      <section className="platform-section">
        <div className="platform-section-head">
          <div>
            <div className="eyebrow">Amsterdam picks</div>
            <h2 className="platform-section-title">Start here.</h2>
          </div>
          <Link href="/cities/amsterdam" className="platform-inline-link">
            Amsterdam guide →
          </Link>
        </div>
        <div className="platform-card-grid">
          {featuredVenues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      </section>
    </PlatformShell>
  );
}
