import Image from "next/image";
import Link from "next/link";
import PlatformShell from "../components/PlatformShell";
import { cities } from "../data/platform";

export const metadata = {
  title: "Map | XRED EYEZ",
  description: "Choose a city and open its live cannabis culture map.",
};

export default function MapIndexPage() {
  return (
    <PlatformShell>
      <section className="platform-hero map-page-hero" style={{ paddingBottom: "32px" }}>
        <div className="eyebrow map-eyebrow">MAP</div>
        <h1 className="platform-title">Choose a city.</h1>
        <p className="platform-lede">
          Select a city to open its live map — venues, hotels, restaurants, and cannabis culture all pinned.
        </p>
        <div className="map-page-stat-row">
          <span><strong>{cities.filter(c => c.status === "flagship" || c.status === "live").length}</strong> live cities</span>
          <span className="map-page-stat-dot" />
          <span>Venues · Hotels · Cannabis</span>
          <span className="map-page-stat-dot" />
          <span>Pins updated live</span>
        </div>
      </section>

      <section className="platform-section" style={{ paddingTop: 0 }}>
        <div className="map-city-picker-grid">
          {cities.map((city) => {
            const isLive = city.status === "flagship" || city.status === "live";
            return (
              <Link
                key={city.id}
                href={`/cities/${city.slug}/map`}
                className={`map-city-picker-card${!isLive ? " is-coming" : ""}`}
                aria-label={`Open ${city.name} map`}
              >
                <div className="map-city-picker-img">
                  <Image
                    src={city.heroImage}
                    alt={city.name}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="map-city-picker-wash" />
                </div>

                <div className="map-city-picker-info">
                  <span className="map-city-picker-country">{city.country}</span>
                  <strong className="map-city-picker-name">{city.name}</strong>
                  <span className={`map-city-picker-status${isLive ? " is-live" : ""}`}>
                    {city.status === "flagship" ? "Flagship" : city.status === "live" ? "Live" : "Coming soon"}
                  </span>
                </div>

                <div className="map-city-picker-cta">
                  {isLive ? "Open map →" : "Preview →"}
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </PlatformShell>
  );
}
