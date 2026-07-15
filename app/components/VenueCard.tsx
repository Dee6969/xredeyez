import Link from "next/link";
import type { CSSProperties } from "react";
import { getImageState, getVibe, type Venue } from "../data/platform";
import PlaceImage from "./PlaceImage";
import SaveButton from "./SaveButton";

const PI_FILL: CSSProperties = { position: "absolute", inset: 0, width: "100%", height: "100%" };

function bookingHref(city: string, venueSlug?: string) {
  const params = new URLSearchParams({
    destination: city,
    city: city.toLowerCase().replace(/\s+/g, "-"),
    source: "venue-card",
  });
  if (venueSlug) params.set("venue", venueSlug);
  return `/partners/booking?${params.toString()}`;
}

export default function VenueCard({ venue }: { venue: Venue }) {
  const brand = venue.brand;
  const isPartner = venue.claimStatus === "partner";
  const imageTrusted = ["verified", "official-source", "partner-supplied"].includes(getImageState(venue));
  // Honesty rules for tile imagery:
  //  - only LOCAL assets render (no hotlinked third-party photos)
  //  - untrusted photos never masquerade as the venue
  //  - true partners lead with their real, approved photography
  const localBanner = brand?.bannerUrl?.startsWith("/") ? brand.bannerUrl : undefined;
  const localGallery = venue.galleryImages?.find((g) => g.startsWith("/"));
  const trustedPhoto = imageTrusted && venue.image?.startsWith("/") ? venue.image : undefined;
  const tileImage = isPartner
    ? trustedPhoto || localGallery || localBanner
    : localBanner || localGallery || trustedPhoto;
  const brandName = brand?.logoText || venue.name;
  const hasOfficialVisual = Boolean(tileImage || brand?.logoUrl);
  const isHotelLayer = venue.layer === "stay";
  const isCannabisLayer = venue.layer === "cannabis";

  const cardStyle = {
    "--venue-primary": brand?.primaryColor || "#18160F",
    "--venue-accent": brand?.accentColor || "var(--accent-gold)",
  } as CSSProperties;

  // "Premium Partner" is a commercial fact, not a styling tier.
  const tierLabel = isPartner
    ? "Premium Partner"
    : venue.listingTier === "premium"
    ? "Editor Pick"
    : venue.listingTier === "featured"
    ? "Featured"
    : "";

  return (
    <article className={`platform-card venue-card overflow-hidden is-${venue.listingTier}${isPartner ? " is-partner" : ""}`} style={cardStyle}>
      <Link href={`/venues/${venue.slug}`} style={{ textDecoration: "none", display: "block" }}>
        <div className="venue-tile-media">

          {hasOfficialVisual ? (
            /* ── Real image via PlaceImage (handles load/error/skeleton) ── */
            <>
              <PlaceImage
                src={tileImage}
                alt={`${venue.name} — ${venue.type} in ${venue.city}`}
                category={venue.type}
                name={brandName}
                city={`${venue.city} / ${venue.neighborhood}`}
                style={PI_FILL}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
              />
              <div className="venue-tile-shade" />
              <div className="venue-tile-brand-panel">
                <span className="venue-tile-kicker">{isPartner ? "Official brand room" : `${venue.neighborhood} · ${venue.type}`}</span>
                {brand?.logoUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={brand.logoUrl} alt={`${venue.name} logo`} className="venue-tile-logo" />
                ) : (
                  <span className="venue-tile-wordmark">{brandName}</span>
                )}
                <span className="venue-tile-tagline">
                  {brand?.tagline || `${venue.neighborhood} / ${venue.type}`}
                </span>
              </div>
            </>
          ) : (
            /* ── No image — PlaceImage generates premium category fallback ── */
            <PlaceImage
              src={null}
              alt={`${venue.name} — ${venue.type} in ${venue.city}`}
              category={venue.type}
              name={brandName}
              city={`${venue.city} / ${venue.neighborhood}`}
              style={PI_FILL}
            />
          )}

          {/* Always-present overlays */}
          <div className="venue-tile-accent" />
          <div className="venue-tile-type">{venue.type}</div>
          {tierLabel && <div className="listing-badge venue-tile-badge">{tierLabel}</div>}
        </div>
      </Link>

      <div className="venue-card-body">
        <div className="venue-card-header">
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

        <p className="venue-card-desc">{venue.description}</p>

        {venue.address && (
          <p className="venue-address-line">
            {venue.address}{venue.postcode ? ` · ${venue.postcode}` : ""}
          </p>
        )}

        {isCannabisLayer && (
          <div className="venue-card-know">
            <span className="venue-card-know-label">Know before you go</span>
            <span className="venue-card-know-text">
              {venue.guideNote || "Check local rules and etiquette before visiting."}
            </span>
          </div>
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
          <Link href={`/venues/${venue.slug}`} className="vca-btn vca-view">View</Link>
          <Link href={`/cities/${venue.cityId}/map`} className="vca-btn vca-map" aria-label={`Open ${venue.name} on map`}>
            Map
          </Link>
          {isHotelLayer ? (
            <a
              href={bookingHref(venue.city, venue.slug)}
              className="vca-btn vca-book"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book Stay
            </a>
          ) : (
            <Link href={`/partners/claim?venue=${venue.slug}`} className="vca-btn vca-claim">
              Claim
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
