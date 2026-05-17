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
  const accent = brand?.accentColor || "#B52426";
  const hasBanner = !!brand?.bannerUrl;

  const tierLabel =
    venue.listingTier === "premium" ? "Premium Partner"
    : venue.listingTier === "featured" ? "Featured Listing"
    : "Free Listing";

  const gallery = venue.galleryImages || [];

  return (
    <VenueShell>

      {/* ═══════════════════════════════════════════════
          HERO — full-bleed banner + brand overlay + logo
          ═══════════════════════════════════════════════ */}
      <section
        className="vlp-hero"
        style={{ backgroundColor: brand?.primaryColor || "#18160F" }}
      >
        {/* Layer 1: real photo from business website */}
        {hasBanner && (
          <div
            className="vlp-hero-img"
            style={{ backgroundImage: `url(${brand!.bannerUrl})` }}
          />
        )}

        {/* Layer 2: brand colour gradient overlay */}
        <div
          className="vlp-hero-overlay"
          style={{
            background: hasBanner
              ? `linear-gradient(160deg, rgba(${primaryRgb},0.72) 0%, rgba(0,0,0,0.92) 100%)`
              : `radial-gradient(ellipse at 35% 55%, rgba(${primaryRgb},0.88) 0%, #030303 100%)`,
          }}
        />

        {/* Layer 3: grain */}
        <div className="vlp-hero-grain" />

        {/* Content */}
        <div className="vlp-hero-body">
          {/* Logo */}
          {brand?.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={brand.logoUrl}
              alt={`${venue.name} logo`}
              className="vlp-hero-logo"
            />
          ) : (
            <div className="vlp-hero-wordmark" style={{ color: accent }}>
              {brand?.logoText || venue.name}
            </div>
          )}

          {/* Tagline */}
          {brand?.tagline && (
            <p className="vlp-hero-tagline">&ldquo;{brand.tagline}&rdquo;</p>
          )}

          {/* CTAs */}
          <div className="vlp-hero-ctas">
            {venue.partnerUrl && (
              <a
                href={venue.partnerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="vlp-btn-primary"
                style={{ background: accent, color: brand?.aesthetic === "light" ? "#fff" : "#000" }}
              >
                Visit Website ↗
              </a>
            )}
            <SaveButton itemType="venue" itemId={venue.id} label="Save" />
            <Link href={`/cities/${venue.cityId}/map`} className="vlp-btn-ghost">
              View on Map
            </Link>
          </div>

          <PartnerActions venue={venue} sourcePage="venue-detail" />

          {/* Location meta */}
          <div className="vlp-hero-meta">
            <span>{venue.city}</span>
            <span className="vlp-sep">·</span>
            <span>{venue.neighborhood}</span>
            <span className="vlp-sep">·</span>
            <span>{venue.type}</span>
            {brand?.foundedYear && (
              <><span className="vlp-sep">·</span><span>Est. {brand.foundedYear}</span></>
            )}
          </div>
        </div>

        {/* Badges */}
        <div className="vlp-xred-badge">
          <span style={{ color: "#fff", fontFamily: "var(--font-playfair,Georgia,serif)", fontWeight: 700, fontSize: "13px" }}>XRED </span>
          <span style={{ color: "#84C51F", fontFamily: "var(--font-playfair,Georgia,serif)", fontWeight: 700, fontSize: "13px" }}>EYEZ</span>
          <span className="vlp-xred-tag">POWERED BY HEMP</span>
        </div>
        <div className="vlp-tier-pill" style={{ borderColor: `rgba(${accentRgb},0.45)`, color: accent }}>
          {tierLabel}
          {venue.claimStatus === "partner" && <span style={{ color: "#84C51F" }}> ✓</span>}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          BIO — editorial 2-col: text + first real photo
          ═══════════════════════════════════════════════ */}
      <section className="vlp-bio">
        <div className="vlp-bio-text">
          <div className="eyebrow" style={{ marginBottom: "16px" }}>About</div>
          <h2 className="vlp-bio-heading" style={{ color: accent }}>
            {brand?.logoText || venue.name}
          </h2>
          <p className="vlp-bio-body">{venue.description}</p>

          {/* Quick facts */}
          <div className="vlp-bio-facts">
            {brand?.foundedYear && (
              <div className="vlp-bio-fact">
                <span className="vlp-bio-fact-label" style={{ color: accent }}>Founded</span>
                <span className="vlp-bio-fact-val">{brand.foundedYear}</span>
              </div>
            )}
            {venue.address && (
              <div className="vlp-bio-fact">
                <span className="vlp-bio-fact-label" style={{ color: accent }}>Address</span>
                <span className="vlp-bio-fact-val">{venue.address}{venue.postcode ? `, ${venue.postcode}` : ""}</span>
              </div>
            )}
            {venue.openingHours && (
              <div className="vlp-bio-fact">
                <span className="vlp-bio-fact-label" style={{ color: accent }}>Hours</span>
                <span className="vlp-bio-fact-val">{venue.openingHours}</span>
              </div>
            )}
          </div>

          {venue.partnerUrl && (
            <a href={venue.partnerUrl} target="_blank" rel="noopener noreferrer" className="vlp-bio-link" style={{ color: accent }}>
              {brand?.logoText || venue.name} official website →
            </a>
          )}
        </div>

        {/* First real photo */}
        {gallery[0] && (
          <div className="vlp-bio-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={gallery[0]} alt={venue.name} className="vlp-bio-img" />
            <div className="vlp-bio-photo-accent" style={{ background: accent }} />
          </div>
        )}
      </section>

      {/* ═══════════════════════════════════════════════
          GUIDE NOTE — editorial pull quote
          ═══════════════════════════════════════════════ */}
      <section className="vlp-note" style={{ borderLeftColor: accent }}>
        <div className="vlp-note-inner">
          <div className="eyebrow" style={{ marginBottom: "12px", color: accent }}>XRED EYEZ Guide Note</div>
          <blockquote className="vlp-note-quote">{venue.guideNote}</blockquote>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PHOTO GRID — real images from their website
          ═══════════════════════════════════════════════ */}
      {gallery.length > 1 && (
        <section className="vlp-grid">
          <div className={`vlp-grid-inner vlp-grid-${Math.min(gallery.length - 1, 3)}`}>
            {gallery.slice(1, 4).map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={src}
                alt={`${venue.name} — photo ${i + 2}`}
                className="vlp-grid-img"
              />
            ))}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════
          HIGHLIGHTS — vibes + best for + highlights chips
          ═══════════════════════════════════════════════ */}
      <section className="vlp-chips-section" style={{ borderTop: `2px solid rgba(${accentRgb},0.18)` }}>
        <div className="vlp-chips-inner">
          <div className="vlp-chip-col">
            <div className="eyebrow" style={{ color: accent, marginBottom: "14px" }}>Best For</div>
            <div className="vlp-chips">
              {venue.bestFor.map((t) => (
                <span key={t} className="vlp-chip" style={{ borderColor: `rgba(${accentRgb},0.35)`, color: "var(--text-primary)" }}>{t}</span>
              ))}
            </div>
          </div>
          <div className="vlp-chip-col">
            <div className="eyebrow" style={{ color: accent, marginBottom: "14px" }}>Highlights</div>
            <div className="vlp-chips">
              {venue.highlights.map((t) => (
                <span key={t} className="vlp-chip" style={{ borderColor: `rgba(${accentRgb},0.22)` }}>{t}</span>
              ))}
            </div>
          </div>
          <div className="vlp-chip-col">
            <div className="eyebrow" style={{ color: accent, marginBottom: "14px" }}>Vibes</div>
            <div className="vlp-chips">
              {venue.vibeIds.map((id) => {
                const vibe = getVibe(id);
                return (
                  <Link key={id} href={`/vibes?vibe=${id}`} className="vlp-chip" style={{ borderColor: `${vibe?.accent || "#fff"}44` }}>
                    {vibe?.name || id}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PARTNER CTA — dark, brand-accented
          ═══════════════════════════════════════════════ */}
      <section className="vlp-cta-section">
        <div className="vlp-cta-inner">
          {/* Big wordmark */}
          <div className="vlp-cta-brand">
            <span style={{ color: "#fff", fontFamily: "var(--font-playfair,Georgia,serif)", fontWeight: 700, fontSize: "clamp(20px,3vw,28px)" }}>XRED </span>
            <span style={{ color: "#84C51F", fontFamily: "var(--font-playfair,Georgia,serif)", fontWeight: 700, fontSize: "clamp(20px,3vw,28px)" }}>EYEZ</span>
          </div>
          <h2 className="vlp-cta-heading">
            {venue.claimStatus === "partner" ? `${brand?.logoText || venue.name} × XRED EYEZ` : `List ${brand?.logoText || venue.name}`}
          </h2>
          <p className="vlp-cta-sub">
            {venue.claimStatus === "partner"
              ? "Active partner profile. Referral placement, city guide discovery, and verified badge — live."
              : "Claim this profile, add brand identity, and unlock referral placement across our Amsterdam city guide."}
          </p>
          <div className="vlp-cta-btns">
            {venue.partnerUrl && (
              <a href={venue.partnerUrl} target="_blank" rel="noopener noreferrer"
                className="vlp-btn-primary" style={{ background: "#84C51F", color: "#000" }}>
                Visit {brand?.logoText || venue.name} ↗
              </a>
            )}
            <Link href={`/partners/claim?venue=${venue.slug}`} className="vlp-btn-ghost">
              {venue.claimStatus === "partner" ? "Partner dashboard" : "Claim or upgrade"} →
            </Link>
          </div>
        </div>

        {/* Accent line */}
        <div className="vlp-cta-accent" style={{ background: `rgba(${accentRgb},0.25)` }} />
      </section>

      {/* ═══════════════════════════════════════════════
          RELATED VENUES
          ═══════════════════════════════════════════════ */}
      {related.length > 0 && (
        <section className="vlp-related">
          <div className="vlp-related-inner">
            <div className="eyebrow" style={{ marginBottom: "8px" }}>Nearby</div>
            <h2 className="platform-section-title" style={{ marginBottom: "32px" }}>Keep moving.</h2>
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
