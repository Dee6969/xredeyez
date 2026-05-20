import Image from "next/image";
import Link from "next/link";
import { type City } from "../data/platform";
import SaveButton from "./SaveButton";

export default function CityCard({ city }: { city: City }) {
  const isLive = city.status === "flagship" || city.status === "live";

  return (
    <article className="platform-card city-card overflow-hidden">
      <Link href={isLive ? `/cities/${city.slug}` : "/cities"} style={{ textDecoration: "none", display: "block" }}>
        <div
          className="city-card-media relative overflow-hidden"
          style={{ aspectRatio: "3/2", background: "#1A1814" }}
        >
          <Image
            src={city.heroImage}
            alt={`${city.name} guide`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <div className="city-card-wash absolute inset-0" />
          <div className="city-status-chip absolute left-4 top-4">
            {city.status === "flagship" ? "Flagship" : city.status === "live" ? "Live" : "Coming soon"}
          </div>
        </div>
      </Link>

      <div style={{ padding: "20px", display: "grid", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
          <div>
            <div className="eyebrow">{city.country}</div>
            <h3
              className="font-display"
              style={{ fontSize: "22px", marginTop: "8px", color: "var(--text-primary)" }}
            >
              {city.name}
            </h3>
          </div>
          <SaveButton itemType="city" itemId={city.id} />
        </div>

        <p style={{ fontSize: "14px", lineHeight: "1.6", color: "var(--text-secondary)" }}>
          {city.summary}
        </p>

        <div style={{ display: "flex", gap: "8px" }}>
          <Link
            href={isLive ? `/cities/${city.slug}` : "/cities"}
            className="experience-link"
            style={{ flex: 1 }}
          >
            {isLive ? "Open Guide" : "Preview"}
          </Link>
          <Link
            href={`/cities/${city.slug}/map`}
            className="platform-secondary-action"
            style={{ flex: 1, textAlign: "center", fontSize: "13px", padding: "9px 12px" }}
          >
            Open Map
          </Link>
        </div>
      </div>
    </article>
  );
}
