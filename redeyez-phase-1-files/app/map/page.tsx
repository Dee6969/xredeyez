import Image from "next/image";
import Link from "next/link";
import PlatformShell from "../components/PlatformShell";
import NetworkMap from "../components/NetworkMap";
import { cities } from "../data/platform";

export const metadata = {
  title: "Cannabis Culture City Maps — Live Venue Discovery | XRED EYEZ",
  description:
    "Explore the XRED EYEZ network on the live map. Coffeeshops, social clubs, hotels, restaurants and things to do across Amsterdam, Barcelona, Prague and beyond.",
  alternates: {
    canonical: "https://www.redeyez.co.uk/map",
  },
  openGraph: {
    title: "Live City Maps | XRED EYEZ",
    description: "Map-first discovery for cannabis culture travel. Pick a city, filter the layers, save what matters.",
    type: "website",
    url: "https://www.redeyez.co.uk/map",
  },
};

export default function MapIndexPage() {
  const liveCities = cities.filter(c => c.status === "flagship" || c.status === "live");
  const comingCities = cities.filter(c => c.status === "coming");

  return (
    <PlatformShell>
      <div className="map-index-header">
        <div className="eyebrow map-eyebrow">MAP</div>
        <h1 className="map-index-title">The network, live.</h1>
        <p className="map-index-sub">
          {liveCities.length} cities live · tap a pin · filter by vibe · save what matters.
        </p>
      </div>

      <NetworkMap cities={cities} />

      <div className="map-index-header" style={{ marginTop: "56px" }}>
        <h2 className="map-index-title" style={{ fontSize: "clamp(26px, 4vw, 40px)" }}>Or choose a city.</h2>
      </div>

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

      {comingCities.length > 0 && (
        <div className="map-index-coming">
          <div className="eyebrow" style={{ marginBottom: "8px" }}>Coming soon</div>
          <p style={{ fontSize: "14px", color: "var(--text-muted)", fontFamily: "var(--font-mono, monospace)" }}>
            {comingCities.map(c => c.name).join(" · ")}
          </p>
        </div>
      )}
    </PlatformShell>
  );
}
