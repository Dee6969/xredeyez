import Image from "next/image";
import Link from "next/link";
import { getVibe, type Venue } from "../data/platform";
import SaveButton from "./SaveButton";

export default function VenueCard({ venue }: { venue: Venue }) {
  const tierLabel =
    venue.listingTier === "premium"
      ? "Premium Partner"
      : venue.listingTier === "featured"
      ? "Featured"
      : "";

  return (
    <article className={`platform-card venue-card overflow-hidden is-${venue.listingTier}`}>
      <Link href={`/venues/${venue.slug}`} style={{ textDecoration: "none", display: "block" }}>
        <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden", background: "#1A1814" }}>
          <Image
            src={venue.image}
            alt={venue.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, transparent 44%, rgba(24,22,15,0.72))" }}
          />
          <div className="absolute left-4 top-4">
            <span
              style={{
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(8px)",
                padding: "5px 11px",
                borderRadius: "99px",
                fontSize: "10px",
                fontWeight: "600",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--text-primary)",
              }}
            >
              {venue.type}
            </span>
          </div>
          {tierLabel && (
            <div className="listing-badge absolute right-4 top-4">{tierLabel}</div>
          )}
        </div>
      </Link>

      <div style={{ padding: "20px", display: "grid", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
          <div>
            <div className="eyebrow">
              {venue.city} · {venue.neighborhood}
            </div>
            <Link href={`/venues/${venue.slug}`} style={{ textDecoration: "none" }}>
              <h3
                className="font-display"
                style={{ fontSize: "20px", marginTop: "8px", color: "var(--text-primary)" }}
              >
                {venue.name}
              </h3>
            </Link>
          </div>
          <SaveButton itemType="venue" itemId={venue.id} />
        </div>

        <p style={{ fontSize: "14px", lineHeight: "1.6", color: "var(--text-secondary)" }}>
          {venue.description}
        </p>

        {venue.address && (
          <p style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: "'Courier New', monospace" }}>
            {venue.address}{venue.postcode ? ` · ${venue.postcode}` : ""}
          </p>
        )}

        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {venue.vibeIds.slice(0, 3).map((vibeId) => {
            const vibe = getVibe(vibeId);
            return (
              <span
                key={vibeId}
                className="vibe-chip"
                style={{ fontSize: "12px", padding: "5px 12px", minHeight: "28px" }}
              >
                {vibe?.name || vibeId}
              </span>
            );
          })}
        </div>

        <div className="venue-card-actions">
          <Link href={`/venues/${venue.slug}`} className="platform-inline-link">
            Open profile
          </Link>
          <Link href={`/partners/claim?venue=${venue.slug}`} className="platform-inline-link">
            Claim
          </Link>
        </div>
      </div>
    </article>
  );
}
