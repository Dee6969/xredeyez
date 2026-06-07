import Link from "next/link";
import type { CSSProperties } from "react";
import { getVibe, type Venue } from "../data/platform";
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
  const tileImage = brand?.bannerUrl || venue.galleryImages?.[0] || (venue.image || undefined);
  const brandName = brand?.logoText || venue.name;
  const signature = getSignatureBanner(venue.id);
  const hasOfficialVisual = Boolean(brand?.bannerUrl || venue.galleryImages?.[0] || venue.image || brand?.logoUrl);
  const isHotelLayer = venue.layer === "stay";
  const isCannabisLayer = venue.layer === "cannabis";

  const cardStyle = {
    "--venue-primary": brand?.primaryColor || "#18160F",
    "--venue-accent": brand?.accentColor || "var(--accent-gold)",
  } as CSSProperties;

  const tierLabel =
    signature
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

          {/* ── Signature (premium hardcoded brands) ── */}
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
          ) : hasOfficialVisual ? (
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
                <span className="venue-tile-kicker">Official brand room</span>
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
