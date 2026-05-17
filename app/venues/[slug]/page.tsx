import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PartnerActions from "../../components/PartnerActions";
import PlatformShell from "../../components/PlatformShell";
import SaveButton from "../../components/SaveButton";
import VenueCard from "../../components/VenueCard";
import { getSortedVenuesByCity, getVenue, getVibe, venues } from "../../data/platform";
import type { VenueBrand } from "../../data/platform";

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

function BrandHeroOverlay({ brand }: { brand: VenueBrand }) {
  const rgb = hexToRgb(brand.primaryColor);
  const overlay =
    brand.aesthetic === "light"
      ? `linear-gradient(90deg, rgba(${rgb},0.62), rgba(24,22,15,0.08)), linear-gradient(0deg, rgba(24,22,15,0.88), transparent 58%)`
      : `linear-gradient(90deg, rgba(${rgb},0.54), rgba(24,22,15,0.14)), linear-gradient(0deg, rgba(24,22,15,0.9), transparent 56%)`;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: overlay,
        borderRadius: "20px",
        zIndex: 1,
      }}
    />
  );
}

export default async function VenuePage({ params }: VenuePageProps) {
  const { slug } = await params;
  const venue = getVenue(slug);

  if (!venue) notFound();

  const related = getSortedVenuesByCity(venue.cityId)
    .filter((item) => item.id !== venue.id)
    .slice(0, 3);

  const tierLabel =
    venue.listingTier === "premium"
      ? "Premium partner"
      : venue.listingTier === "featured"
        ? "Featured listing"
        : "Free listing";

  const brand = venue.brand;
  const accentRgb = brand ? hexToRgb(brand.accentColor) : null;

  return (
    <PlatformShell>
      {/* Brand-aware CSS custom properties injected at page level */}
      {brand && (
        <style>{`
          .venue-brand-accent { color: ${brand.accentColor}; }
          .venue-brand-border { border-color: rgba(${hexToRgb(brand.accentColor)},0.32); }
          .venue-brand-bg { background: rgba(${hexToRgb(brand.primaryColor)},0.06); }
          .venue-brand-glow { box-shadow: 0 0 0 1px rgba(${hexToRgb(brand.accentColor)},0.18); }
        `}</style>
      )}

      {/* Hero */}
      <section className="platform-city-hero" style={brand ? { boxShadow: `0 24px 64px rgba(${hexToRgb(brand.primaryColor)},0.22)` } : {}}>
        <Image
          src={venue.image}
          alt={venue.name}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", filter: "brightness(0.7) contrast(1.1)" }}
        />
        {brand ? (
          <BrandHeroOverlay brand={brand} />
        ) : (
          <div className="platform-city-hero-overlay" />
        )}

        <div className="relative z-10">
          <div className="eyebrow">{venue.city} / {venue.neighborhood}</div>

          {/* Brand identity lockup */}
          {brand && (
            <div className="venue-hero-brand-lockup">
              <span
                className="venue-hero-brand-name"
                style={{ color: brand.accentColor }}
              >
                {brand.logoText || venue.name}
              </span>
              {brand.foundedYear && (
                <span className="venue-hero-brand-year">Est. {brand.foundedYear}</span>
              )}
            </div>
          )}

          <h1 className="platform-title">{venue.name}</h1>
          {brand?.tagline && (
            <p className="venue-hero-tagline">&ldquo;{brand.tagline}&rdquo;</p>
          )}
          <p className="platform-lede">{venue.description}</p>
          <div className="platform-action-row">
            <SaveButton itemType="venue" itemId={venue.id} label="Save Place" />
            <Link href={`/cities/${venue.cityId}/map`} className="platform-secondary-action">
              Back to Map
            </Link>
          </div>
          <PartnerActions venue={venue} sourcePage="venue-detail" />
        </div>
      </section>

      {/* Brand identity strip — only for venues with brand data */}
      {brand && (
        <section className="venue-brand-strip">
          <div className="venue-brand-strip-inner">
            {/* XRED EYEZ attribution */}
            <div className="venue-xred-badge" aria-label="Listed on XRED EYEZ">
              <span className="venue-xred-badge-text">
                <span style={{ color: "var(--text-primary)" }}>XRED </span>
                <span style={{ color: "#84C51F" }}>EYEZ</span>
              </span>
              <span className="venue-xred-badge-sub">Powered by Hemp</span>
            </div>
            <div className="venue-brand-palette">
              <div
                className="venue-brand-swatch"
                style={{ background: brand.primaryColor }}
                title={`Primary: ${brand.primaryColor}`}
              />
              <div
                className="venue-brand-swatch"
                style={{ background: brand.accentColor }}
                title={`Accent: ${brand.accentColor}`}
              />
            </div>
            <div className="venue-brand-meta">
              <span className="eyebrow">Brand identity</span>
              <strong className="venue-brand-title" style={{ color: brand.accentColor }}>
                {brand.logoText || venue.name}
              </strong>
              {brand.tagline && (
                <em className="venue-brand-tagline-small">{brand.tagline}</em>
              )}
            </div>
            <div className="venue-brand-tier">
              <span
                className="venue-brand-tier-badge"
                style={{
                  background: `rgba(${accentRgb},0.1)`,
                  borderColor: `rgba(${accentRgb},0.3)`,
                  color: brand.accentColor,
                }}
              >
                {tierLabel}
              </span>
              {venue.claimStatus === "partner" && (
                <span className="venue-verified-badge">✓ Verified Partner</span>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Powered by badge for non-brand venues */}
      {!brand && (
        <div className="venue-plain-badge">
          <span style={{ color: "var(--text-primary)", fontFamily: "var(--font-playfair, Georgia, serif)", fontWeight: 700 }}>XRED </span>
          <span style={{ color: "#84C51F", fontFamily: "var(--font-playfair, Georgia, serif)", fontWeight: 700 }}>EYEZ</span>
          <span style={{ color: "var(--text-muted)", fontSize: "11px", marginLeft: "8px", fontFamily: "'Courier New', monospace", letterSpacing: "0.12em" }}>POWERED BY HEMP</span>
        </div>
      )}

      <section className="platform-section">
        <div
          className="platform-info-strip"
          style={brand ? { borderTopColor: brand.accentColor, borderTopWidth: "2px" } : {}}
        >
          <div>
            <span>Where am I?</span>
            <strong>{venue.type} / {venue.neighborhood}</strong>
          </div>
          <div>
            <span>Address</span>
            <strong>
              {venue.address
                ? `${venue.address}${venue.postcode ? `, ${venue.postcode}` : ""}`
                : "Save, visit, enquire"}
            </strong>
          </div>
          <div>
            <span>Tap next</span>
            <strong>Map or partner action</strong>
          </div>
        </div>
      </section>

      <section className="platform-section">
        <div className="platform-module-grid">
          <article
            className={`platform-card p-5${brand ? " venue-brand-glow" : ""}`}
            style={brand ? { borderTopColor: brand.accentColor, borderTopWidth: "2px" } : {}}
          >
            <div className="eyebrow">LISTING</div>
            <h2 className="mt-4 font-display text-[32px] leading-none" style={brand ? { color: brand.accentColor } : {}}>
              {tierLabel}
            </h2>
            <p className="mt-4 text-[14px] leading-6 text-[var(--text-secondary)]">
              {venue.claimStatus === "partner"
                ? "Partner profile is active and referral-ready."
                : venue.claimStatus === "claimed"
                  ? "Claimed profile. Partner upgrades can add richer placement."
                  : "This venue can claim its profile and upgrade placement."}
            </p>
            <div className="mt-5">
              <Link href={`/partners/claim?venue=${venue.slug}`} className="platform-inline-link">
                Claim or upgrade →
              </Link>
            </div>
          </article>

          <article className="platform-card p-5">
            <div className="eyebrow">BEST FOR</div>
            <div className="mt-5 flex flex-wrap gap-2">
              {venue.bestFor.map((item) => (
                <span
                  key={item}
                  className="vibe-chip"
                  style={brand ? { borderColor: `rgba(${accentRgb},0.3)` } : {}}
                >
                  {item}
                </span>
              ))}
            </div>
          </article>

          <article className="platform-card p-5">
            <div className="eyebrow">HIGHLIGHTS</div>
            <div className="mt-5 flex flex-wrap gap-2">
              {venue.highlights.map((item) => (
                <span key={item} className="vibe-chip">
                  {item}
                </span>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="platform-section">
        <div className="platform-section-head">
          <div>
            <div className="eyebrow">GUIDE NOTE</div>
            <h2
              className="platform-section-title"
              style={brand ? { color: `rgba(${hexToRgb(brand.primaryColor)},0.9)` } : {}}
            >
              Read the room.
            </h2>
          </div>
        </div>
        <div
          className="platform-panel"
          style={brand ? { borderLeftColor: brand.accentColor, borderLeftWidth: "3px" } : {}}
        >
          <p>{venue.guideNote}</p>
        </div>
      </section>

      <section className="platform-section">
        <div className="platform-section-head">
          <div>
            <div className="eyebrow">VIBES</div>
            <h2 className="platform-section-title">Why it matches.</h2>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {venue.vibeIds.map((vibeId) => {
            const vibe = getVibe(vibeId);
            return (
              <Link
                key={vibeId}
                href={`/vibes?vibe=${vibeId}`}
                className="vibe-chip"
                style={{ borderColor: `${vibe?.accent || "#fff"}66` }}
              >
                {vibe?.name || vibeId}
              </Link>
            );
          })}
        </div>
      </section>

      {related.length > 0 && (
        <section className="platform-section">
          <div className="platform-section-head">
            <div>
              <div className="eyebrow">NEARBY</div>
              <h2 className="platform-section-title">Keep moving.</h2>
            </div>
          </div>
          <div className="platform-card-grid">
            {related.map((item) => (
              <VenueCard key={item.id} venue={item} />
            ))}
          </div>
        </section>
      )}
    </PlatformShell>
  );
}
