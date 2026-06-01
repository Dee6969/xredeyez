/* eslint-disable @next/next/no-img-element -- Venue tiles intentionally support remote partner brand assets without remote image config friction. */
import Link from "next/link";
import type { CSSProperties } from "react";
import { getVibe, type Venue } from "../data/platform";
import SaveButton from "./SaveButton";

export default function VenueCard({ venue }: { venue: Venue }) {
  const brand = venue.brand;
  const tileImage = brand?.bannerUrl || venue.galleryImages?.[0] || venue.image;
  const brandName = brand?.logoText || venue.name;
  const signature = getSignatureBanner(venue.id);
  const hasOfficialVisual = Boolean(brand?.bannerUrl || venue.galleryImages?.[0] || venue.image || brand?.logoUrl);
  const cardStyle = {
    "--venue-primary": brand?.primaryColor || "#18160F",
    "--venue-accent": brand?.accentColor || "var(--accent-gold)",
  } as CSSProperties;
  const isTopRated = Boolean(signature);
  const tierLabel =
    isTopRated
      ? "Top Rated"
      : venue.listingTier === "premium"
      ? "Premium Partner"
      : venue.listingTier === "featured"
      ? "Featured"
      : "";

  return (
    <article className={`platform-card venue-card overflow-hidden is-${venue.listingTier}`} style={cardStyle}>
      <Link href={`/venues/${venue.slug}`} style={{ textDecoration: "none", display: "block" }}>
        <div className={`venue-tile-media${signature ? ` venue-signature-media ${signature.className}` : ""}`}>
          {signature ? (
            <div className="venue-signature-banner" aria-hidden="true">
              <div className="venue-signature-orbit" />
              <div className="venue-signature-mark">{signature.mark}</div>
              <div className="venue-signature-copy">
                <span>{signature.kicker}</span>
                <strong>{signature.title}</strong>
                <em>{signature.subtitle}</em>
              </div>
              <div className="venue-signature-meta">{signature.meta}</div>
            </div>
          ) : !hasOfficialVisual ? (
            <div className={`venue-generated-banner is-${brand?.aesthetic || "dark"}`} aria-hidden="true">
              <div className="venue-generated-glow" />
              <div className="venue-generated-grid" />
              <div className="venue-generated-mark">
                {initials(brandName)}
              </div>
              <div className="venue-generated-copy">
                <span>{venue.city} / {venue.neighborhood}</span>
                <strong>{brandName}</strong>
                <em>{brand?.tagline || `${venue.type} / ${venue.city}`}</em>
              </div>
            </div>
          ) : (
            <>
              <img src={venue.image} alt="" className="venue-tile-backdrop" aria-hidden="true" />
              <img src={tileImage} alt={`${venue.name} brand preview`} className="venue-tile-img" />
              <div className="venue-tile-shade" />
            </>
          )}
          <div className="venue-tile-accent" />

          <div className="venue-tile-type">{venue.type}</div>
          {tierLabel && <div className="listing-badge venue-tile-badge">{tierLabel}</div>}

          {!signature && hasOfficialVisual && (
            <div className="venue-tile-brand-panel">
              <span className="venue-tile-kicker">Official brand room</span>
              {brand?.logoUrl ? (
                <img src={brand.logoUrl} alt={`${venue.name} logo`} className="venue-tile-logo" />
              ) : (
                <span className="venue-tile-wordmark">{brandName}</span>
              )}
              <span className="venue-tile-tagline">
                {brand?.tagline || `${venue.neighborhood} / ${venue.type}`}
              </span>
            </div>
          )}
        </div>
      </Link>

      <div style={{ padding: "20px", display: "grid", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
          <div>
            <div className="eyebrow">
              {venue.city} / {venue.neighborhood}
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
          <p className="venue-address-line">
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
            Open brand room
          </Link>
          <Link href={`/partners/claim?venue=${venue.slug}`} className="platform-inline-link">
            Claim
          </Link>
        </div>
      </div>
    </article>
  );
}

function initials(name: string) {
  const clean = name.replace(/[^a-z0-9\s&]/gi, " ").trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 3).toUpperCase();
  return parts.slice(0, 3).map((part) => part[0]).join("").toUpperCase();
}

function getSignatureBanner(venueId: string) {
  switch (venueId) {
    case "grey-area":
      return {
        className: "is-grey-area-signature",
        kicker: "Amsterdam Top Rated",
        title: "GREY AREA",
        subtitle: "The American Dream in Amsterdam",
        meta: "EST. 1993 / CENTRUM",
        mark: "GA",
      };
    case "terps-army":
      return {
        className: "is-terps-army-signature",
        kicker: "Amsterdam Top Rated",
        title: "TERPS ARMY",
        subtitle: "Terpenes. Culture. Amsterdam.",
        meta: "CONNOISSEUR / CENTRUM",
        mark: "TA",
      };
    case "prix-dami":
      return {
        className: "is-prix-dami-signature",
        kicker: "Amsterdam Top Rated",
        title: "PRIX D'AMI",
        subtitle: "Pink is more than a colour.",
        meta: "CENTRAL STATION / 07:00",
        mark: "PDA",
      };
    default:
      return null;
  }
}
