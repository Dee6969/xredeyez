import Link from "next/link";
import { notFound } from "next/navigation";
import PartnerActions from "../../components/PartnerActions";
import SaveButton from "../../components/SaveButton";
import VenueCard from "../../components/VenueCard";
import VenueShell from "../../components/VenueShell";
import { getSortedVenuesByCity, getVenue, getVibe, venues } from "../../data/platform";

interface VenuePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return venues.map((venue) => ({ slug: venue.slug }));
}

export async function generateMetadata({ params }: VenuePageProps) {
  const { slug } = await params;
  const venue = getVenue(slug);
  return {
    title: venue ? `${venue.name} | XRED EYEZ` : "Venue | XRED EYEZ",
    description: venue?.description,
  };
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

export default async function VenuePage({ params }: VenuePageProps) {
  const { slug } = await params;
  const venue = getVenue(slug);
  if (!venue) notFound();

  const related = getSortedVenuesByCity(venue.cityId)
    .filter((item) => item.id !== venue.id)
    .slice(0, 3);

  const brand = venue.brand;
  const primaryRgb = brand ? hexToRgb(brand.primaryColor) : "24,22,15";
  const accentRgb = brand ? hexToRgb(brand.accentColor) : "181,36,38";

  const tierLabel =
    venue.listingTier === "premium"
      ? "Premium Partner"
      : venue.listingTier === "featured"
        ? "Featured Listing"
        : "Free Listing";

  const hasBanner = !!brand?.bannerUrl;
  const heroStyle: React.CSSProperties = {
    backgroundColor: brand?.primaryColor || "#18160F",
  };

  return (
    <VenueShell>
      {/* ── HERO: real banner image + brand overlay + logo ── */}
      <section className="venue-lp-hero" style={heroStyle}>
        {/* Layer 1: real banner photo from business website */}
        {hasBanner && (
          <div
            className="venue-lp-hero-banner-img"
            style={{ backgroundImage: `url(${brand!.bannerUrl})` }}
          />
        )}

        {/* Layer 2: brand color overlay for identity + readability */}
        <div
          className="venue-lp-hero-overlay"
          style={brand ? {
            background: hasBanner
              ? `linear-gradient(to bottom, rgba(${primaryRgb},0.55) 0%, rgba(0,0,0,0.88) 100%)`
              : `radial-gradient(ellipse at 40% 50%, rgba(${primaryRgb},0.9) 0%, #050505 100%)`,
          } : {
            background: "linear-gradient(to bottom, rgba(10,10,10,0.6) 0%, rgba(0,0,0,0.9) 100%)",
          }}
        />

        {/* Layer 3: subtle grain */}
        <div className="venue-lp-hero-grain" />

        <div className="venue-lp-hero-inner">
          {/* Logo image OR brand name typography */}
          {brand?.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={brand.logoUrl}
              alt={`${venue.name} logo`}
              className="venue-lp-logo"
            />
          ) : (
            <div
              className="venue-lp-brand-wordmark"
              style={{ color: brand?.accentColor || "#84C51F" }}
            >
              {brand?.logoText || venue.name}
            </div>
          )}

          {/* Tagline */}
          {brand?.tagline && (
            <p className="venue-lp-tagline">
              &ldquo;{brand.tagline}&rdquo;
            </p>
          )}

          {/* CTAs */}
          <div className="venue-lp-cta-row">
            {venue.partnerUrl && (
              <a
                href={venue.partnerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="venue-lp-visit-btn"
                style={{
                  background: brand?.accentColor || "#84C51F",
                  color: brand && brand.aesthetic === "light" ? "#fff" : "#000",
                }}
              >
                Visit Website ↗
              </a>
            )}
            <SaveButton itemType="venue" itemId={venue.id} label="Save" />
            <Link
              href={`/cities/${venue.cityId}/map`}
              className="venue-lp-map-btn"
            >
              Map
            </Link>
          </div>

          <PartnerActions venue={venue} sourcePage="venue-detail" />

          {/* Meta strip */}
          <div className="venue-lp-hero-meta">
            <span>{venue.city}</span>
            <span className="venue-lp-hero-meta-sep">·</span>
            <span>{venue.neighborhood}</span>
            <span className="venue-lp-hero-meta-sep">·</span>
            <span>{venue.type}</span>
            {brand?.foundedYear && (
              <>
                <span className="venue-lp-hero-meta-sep">·</span>
                <span>Est. {brand.foundedYear}</span>
              </>
            )}
          </div>
        </div>

        {/* XRED EYEZ badge — bottom-left */}
        <div className="venue-lp-xred-badge">
          <span style={{ color: "#fff", fontFamily: "var(--font-playfair, Georgia, serif)", fontWeight: 700, fontSize: "13px" }}>XRED </span>
          <span style={{ color: "#84C51F", fontFamily: "var(--font-playfair, Georgia, serif)", fontWeight: 700, fontSize: "13px" }}>EYEZ</span>
          <span className="venue-lp-xred-powered">POWERED BY HEMP</span>
        </div>

        {/* Listing tier badge — bottom-right */}
        <div
          className="venue-lp-tier-badge"
          style={{
            borderColor: `rgba(${accentRgb},0.4)`,
            color: brand?.accentColor || "#84C51F",
          }}
        >
          {tierLabel}
          {venue.claimStatus === "partner" && <span className="venue-lp-verified">✓</span>}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="venue-lp-about">
        <div className="venue-lp-about-inner">
          <div className="eyebrow" style={{ marginBottom: "24px" }}>The room.</div>
          <blockquote
            className="venue-lp-pull-quote"
            style={brand ? { borderLeftColor: brand.accentColor } : {}}
          >
            {venue.guideNote}
          </blockquote>
          <p className="venue-lp-description">{venue.description}</p>
        </div>

        {/* Info grid */}
        <div className="venue-lp-info-grid">
          {venue.address && (
            <div className="venue-lp-info-cell">
              <span className="eyebrow">Address</span>
              <strong>
                {venue.address}
                {venue.postcode ? `, ${venue.postcode}` : ""}
              </strong>
            </div>
          )}
          <div className="venue-lp-info-cell">
            <span className="eyebrow">Type</span>
            <strong>{venue.type}</strong>
          </div>
          <div className="venue-lp-info-cell">
            <span className="eyebrow">Neighbourhood</span>
            <strong>{venue.neighborhood}</strong>
          </div>
          {brand?.foundedYear && (
            <div className="venue-lp-info-cell">
              <span className="eyebrow">Founded</span>
              <strong>{brand.foundedYear}</strong>
            </div>
          )}
          {venue.openingHours && (
            <div className="venue-lp-info-cell">
              <span className="eyebrow">Opening Hours</span>
              <strong>{venue.openingHours}</strong>
            </div>
          )}
        </div>
      </section>

      {/* ── GALLERY ── real photos from venue */}
      {venue.galleryImages && venue.galleryImages.length > 0 && (
        <section className="venue-lp-gallery">
          <div className="venue-lp-about-inner">
            <div className="eyebrow" style={{ marginBottom: "20px" }}>Inside.</div>
            <div className="venue-lp-gallery-grid">
              {venue.galleryImages.map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={src}
                  alt={`${venue.name} — photo ${i + 1}`}
                  className="venue-lp-gallery-img"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CHIPS: Best For + Highlights ── */}
      <section className="venue-lp-chips-section">
        <div className="venue-lp-chips-inner">
          <div className="venue-lp-chip-group">
            <div className="eyebrow" style={{ marginBottom: "16px" }}>Best For</div>
            <div className="venue-lp-chips">
              {venue.bestFor.map((item) => (
                <span
                  key={item}
                  className="vibe-chip"
                  style={brand ? { borderColor: `rgba(${accentRgb},0.32)` } : {}}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="venue-lp-chip-group">
            <div className="eyebrow" style={{ marginBottom: "16px" }}>Highlights</div>
            <div className="venue-lp-chips">
              {venue.highlights.map((item) => (
                <span key={item} className="vibe-chip">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VIBES ── */}
      <section className="venue-lp-vibes-section">
        <div className="venue-lp-about-inner">
          <div className="eyebrow" style={{ marginBottom: "16px" }}>Vibes</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {venue.vibeIds.map((vibeId) => {
              const vibe = getVibe(vibeId);
              return (
                <Link
                  key={vibeId}
                  href={`/vibes?vibe=${vibeId}`}
                  className="vibe-chip"
                  style={{ borderColor: `${vibe?.accent || "#fff"}55` }}
                >
                  {vibe?.name || vibeId}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PARTNER CTA — dark section ── */}
      <section
        className="venue-lp-partner-section"
        style={brand ? { borderTop: `1px solid rgba(${accentRgb},0.15)` } : {}}
      >
        <div className="venue-lp-partner-inner">
          <div className="venue-lp-partner-badge">
            <span style={{ color: "#fff", fontFamily: "var(--font-playfair, Georgia, serif)", fontWeight: 700 }}>XRED </span>
            <span style={{ color: "#84C51F", fontFamily: "var(--font-playfair, Georgia, serif)", fontWeight: 700 }}>EYEZ</span>
          </div>
          <h2 className="venue-lp-partner-heading">
            {venue.claimStatus === "partner"
              ? "Active Partner"
              : "List with XRED EYEZ"}
          </h2>
          <p className="venue-lp-partner-sub">
            {venue.claimStatus === "partner"
              ? "This venue is a verified XRED EYEZ partner. Referral, placement, and discovery — active."
              : "Claim this profile, add your brand identity, and unlock referral placement across our city guides."}
          </p>
          <div className="venue-lp-partner-actions">
            {venue.partnerUrl && (
              <a
                href={venue.partnerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="venue-lp-visit-btn"
                style={{ background: "#84C51F", color: "#000" }}
              >
                Visit {brand?.logoText || venue.name} ↗
              </a>
            )}
            <Link
              href={`/partners/claim?venue=${venue.slug}`}
              className="venue-lp-claim-btn"
            >
              {venue.claimStatus === "partner" ? "Partner dashboard →" : "Claim or upgrade →"}
            </Link>
          </div>
        </div>
      </section>

      {/* ── RELATED VENUES ── */}
      {related.length > 0 && (
        <section className="venue-lp-related">
          <div className="venue-lp-about-inner">
            <div className="eyebrow" style={{ marginBottom: "8px" }}>Nearby</div>
            <h2 className="platform-section-title" style={{ marginBottom: "32px" }}>
              Keep moving.
            </h2>
            <div className="platform-card-grid">
              {related.map((item) => (
                <VenueCard key={item.id} venue={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </VenueShell>
  );
}
