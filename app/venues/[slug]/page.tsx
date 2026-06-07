import Link from "next/link";
import { notFound } from "next/navigation";
import SaveButton from "../../components/SaveButton";
import UnclaimedBanner from "../../components/UnclaimedBanner";
import VenueCard from "../../components/VenueCard";
import VenueMobileStrip from "../../components/VenueMobileStrip";
import VenueReveal from "../../components/VenueReveal";
import VenueShell from "../../components/VenueShell";
import { getSortedVenuesByCity, getVenue, venues } from "../../data/platform";
import { breadcrumbSchema, localBusinessSchema, toJsonLd } from "../../lib/schema";

interface VenuePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return venues.map((venue) => ({ slug: venue.slug }));
}

export async function generateMetadata({ params }: VenuePageProps) {
  const { slug } = await params;
  const venue = getVenue(slug);
  if (!venue) return { title: "Venue | XRED EYEZ" };
  return {
    title: `${venue.name} | ${venue.city} Cannabis Guide | XRED EYEZ`,
    description: venue.description,
    openGraph: {
      title: `${venue.name} | ${venue.city}`,
      description: venue.description,
      ...(venue.image ? { images: [{ url: venue.image }] } : {}),
    },
  };
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

function initials(name: string) {
  const clean = name.replace(/[^a-z0-9\s&]/gi, " ").trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 3).toUpperCase();
  return parts.slice(0, 3).map((part) => part[0]).join("").toUpperCase();
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
  const heroBanner = brand?.bannerUrl || venue.image;
  const hasBanner = !!heroBanner;
  const gallery = venue.galleryImages || [];
  const isPartner = venue.claimStatus === "partner";
  const isPremium = venue.listingTier === "premium";
  const tierClass = `vlp-tier-${venue.listingTier}`;

  const tierLabel =
    isPremium ? "Premium Partner"
    : venue.listingTier === "featured" ? "Featured Listing"
    : "Free Listing";

  const breadcrumb = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Cities", href: "/cities" },
    { name: venue.city, href: `/cities/${venue.cityId}` },
    { name: venue.name, href: `/venues/${venue.slug}` },
  ]);

  return (
    <VenueShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(localBusinessSchema(venue)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumb) }} />
      <div className={tierClass}>

        <UnclaimedBanner venue={venue} />

        {/* ══════════════════════════════════════
            HERO — cinematic, full-bleed
            ══════════════════════════════════════ */}
        <section
          className="vlp-hero"
          style={{ backgroundColor: brand?.primaryColor || "#18160F" }}
        >
          {hasBanner && (
            <div
              className="vlp-hero-img"
              style={{ backgroundImage: `url(${heroBanner})` }}
            />
          )}
          {!hasBanner && (
            <div className={`vlp-generated-hero is-${brand?.aesthetic || "dark"}`} aria-hidden="true">
              <div className="vlp-generated-hero-grid" />
              <div className="vlp-generated-hero-mark" style={{ borderColor: accent, color: accent }}>
                {initials(brand?.logoText || venue.name)}
              </div>
              <div className="vlp-generated-hero-lines">
                <span style={{ background: accent }} />
                <span style={{ background: accent }} />
                <span style={{ background: accent }} />
              </div>
            </div>
          )}
          <div
            className="vlp-hero-overlay"
            style={{
              background: hasBanner
                ? `linear-gradient(160deg, rgba(${primaryRgb},0.68) 0%, rgba(0,0,0,0.94) 100%)`
                : `radial-gradient(ellipse at 35% 55%, rgba(${primaryRgb},0.9) 0%, #030303 100%)`,
            }}
          />
          <div className="vlp-hero-grain" />

          <div className="vlp-hero-body">
            {brand?.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={brand.logoUrl} alt={`${venue.name} logo`} className="vlp-hero-logo" />
            ) : (
              <div className="vlp-hero-wordmark" style={{ color: accent }}>
                {brand?.logoText || venue.name}
              </div>
            )}

            {brand?.tagline && (
              <p className="vlp-hero-tagline">&ldquo;{brand.tagline}&rdquo;</p>
            )}

            <div className="vlp-hero-ctas">
              {venue.partnerUrl && (
                <a
                  href={venue.partnerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vlp-btn-primary"
                  style={{ background: accent, color: "#000" }}
                >
                  Visit Website ↗
                </a>
              )}
              <SaveButton itemType="venue" itemId={venue.id} label="Save" />
              <Link href={`/cities/${venue.cityId}/map`} className="vlp-btn-ghost">
                View on Map
              </Link>
            </div>

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

          <div className="vlp-xred-badge">
            <span style={{ color: "#fff", fontFamily: "var(--font-playfair,Georgia,serif)", fontWeight: 700, fontSize: "13px" }}>XRED </span>
            <span style={{ color: "#84C51F", fontFamily: "var(--font-playfair,Georgia,serif)", fontWeight: 700, fontSize: "13px" }}>EYEZ</span>
            <span className="vlp-xred-tag">POWERED BY HEMP</span>
          </div>
          <div className="vlp-tier-pill" style={{ borderColor: `rgba(${accentRgb},0.45)`, color: accent }}>
            {tierLabel}
            {isPartner && <span style={{ color: "#84C51F" }}> ✓</span>}
          </div>
        </section>

        {/* ══════════════════════════════════════
            STATS BAR — premium partners only
            ══════════════════════════════════════ */}
        {isPartner && isPremium && (
          <div className="vlp-stats-bar">
            <div className="vlp-stat">
              <span className="vlp-stat-val">2.4k</span>
              <span className="vlp-stat-label">Views this month</span>
            </div>
            <div className="vlp-stat">
              <span className="vlp-stat-val">148</span>
              <span className="vlp-stat-label">Saves</span>
            </div>
            <div className="vlp-stat">
              <span className="vlp-stat-val" style={{ color: accent }}>#2</span>
              <span className="vlp-stat-label">City ranking</span>
            </div>
            <div className="vlp-stat">
              <span className="vlp-stat-val">38</span>
              <span className="vlp-stat-label">Referral clicks</span>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════
            TITLE CARD — venue name large
            ══════════════════════════════════════ */}
        <VenueReveal>
          <section className="vlp-title-card">
            <p className="vlp-title-card-eyebrow">
              {venue.city} · {venue.neighborhood} · {venue.type}
            </p>
            <h1 className="vlp-title-card-name">
              {brand?.logoText || venue.name}
            </h1>
            <p className="vlp-title-card-sub">
              {brand?.tagline && <span>{brand.tagline}</span>}
              {brand?.tagline && brand?.foundedYear && (
                <span
                  className="vlp-title-card-dot"
                  style={{ background: accent }}
                />
              )}
              {brand?.foundedYear && <span>Est. {brand.foundedYear}</span>}
            </p>
          </section>
        </VenueReveal>

        {/* ══════════════════════════════════════
            EDITORIAL STORY PANEL
            ══════════════════════════════════════ */}
        <VenueReveal>
          <section className="vlp-story">
            <div className="vlp-story-media">
              {gallery[0] || venue.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={gallery[0] || venue.image} alt={venue.name} />
              ) : (
                <div
                  className={`vlp-story-media-placeholder is-${brand?.aesthetic || "dark"}`}
                  style={{
                    background:
                      `radial-gradient(circle at 20% 20%, rgba(${accentRgb},0.28), transparent 32%), ` +
                      `linear-gradient(135deg, rgba(${primaryRgb},0.96), #050505)`,
                  }}
                >
                  <b style={{ borderColor: accent, color: accent }}>
                    {initials(brand?.logoText || venue.name)}
                  </b>
                  <strong>{brand?.logoText || venue.name}</strong>
                  <em>{brand?.tagline || `${venue.neighborhood} / ${venue.type}`}</em>
                </div>
              )}
            </div>

            <div className="vlp-story-body">
              <p className="vlp-story-kicker">About</p>
              <h2 className="vlp-story-heading" style={{ color: accent }}>
                {brand?.logoText || venue.name}
              </h2>
              <p className="vlp-story-body-text">{venue.description}</p>

              {brand?.foundedYear && (
                <div className="vlp-story-pull">
                  <div className="vlp-story-pull-num" style={{ color: accent }}>
                    {brand.foundedYear}
                  </div>
                  <div className="vlp-story-pull-label">Est.</div>
                </div>
              )}

              <div className="vlp-story-facts">
                {venue.address && (
                  <div className="vlp-story-fact-row">
                    <span className="vlp-story-fact-label">Address</span>
                    <span className="vlp-story-fact-val">
                      {venue.address}{venue.postcode ? `, ${venue.postcode}` : ""}
                    </span>
                  </div>
                )}
                {venue.openingHours && (
                  <div className="vlp-story-fact-row">
                    <span className="vlp-story-fact-label">Hours</span>
                    <span className="vlp-story-fact-val">{venue.openingHours}</span>
                  </div>
                )}
                <div className="vlp-story-fact-row">
                  <span className="vlp-story-fact-label">Neighborhood</span>
                  <span className="vlp-story-fact-val">{venue.neighborhood}</span>
                </div>
              </div>

              {venue.partnerUrl && (
                <a
                  href={venue.partnerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    marginTop: "28px",
                    fontSize: "13px",
                    fontWeight: 500,
                    textDecoration: "none",
                    color: accent,
                    borderBottom: `1px solid ${accent}55`,
                    paddingBottom: "2px",
                    letterSpacing: "0.03em",
                  }}
                >
                  {brand?.logoText || venue.name} official site →
                </a>
              )}
            </div>
          </section>
        </VenueReveal>

        {/* ══════════════════════════════════════
            FULL-BLEED PHOTO BREAK
            ══════════════════════════════════════ */}
        {gallery[1] && venue.listingTier !== "free" && (
          <VenueReveal>
            <div className="vlp-photo-break">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={gallery[1]} alt={`${venue.name} — interior`} />
            </div>
          </VenueReveal>
        )}

        {/* ══════════════════════════════════════
            FULL-VIEWPORT STATEMENT
            ══════════════════════════════════════ */}
        <VenueReveal>
          <section
            className="vlp-statement"
            style={{ background: `rgba(${accentRgb},0.035)` }}
          >
            <p className="vlp-statement-eyebrow">XRED EYEZ Guide Note</p>
            <blockquote className="vlp-statement-quote">
              {venue.guideNote}
            </blockquote>
            <div className="vlp-statement-attr">
              XRED EYEZ · {venue.city}
            </div>
          </section>
        </VenueReveal>

        {/* ══════════════════════════════════════
            SECONDARY GALLERY (premium only)
            ══════════════════════════════════════ */}
        {gallery.length > 2 && isPremium && (
          <VenueReveal>
            <section className="vlp-grid">
              <div className={`vlp-grid-inner vlp-grid-${Math.min(gallery.length - 2, 3)}`}>
                {gallery.slice(2, 5).map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={src}
                    alt={`${venue.name} — photo ${i + 3}`}
                    className="vlp-grid-img"
                  />
                ))}
              </div>
            </section>
          </VenueReveal>
        )}

        {/* ══════════════════════════════════════
            NUMBERED HIGHLIGHTS
            ══════════════════════════════════════ */}
        <VenueReveal>
          <section
            className="vlp-highlights"
            style={{ borderTop: `1px solid rgba(${accentRgb},0.15)` }}
          >
            <div className="vlp-highlights-inner">
              <div className="vlp-highlights-head">
                <h2 className="vlp-highlights-title">What sets it apart.</h2>
                <span className="eyebrow" style={{ color: accent }}>
                  {venue.type} · {venue.neighborhood}
                </span>
              </div>
              <div className="vlp-highlights-list">
                {venue.highlights.map((h, i) => (
                  <div key={h} className="vlp-highlight-row">
                    <span className="vlp-highlight-num" style={{ color: accent }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="vlp-highlight-text">{h}</span>
                  </div>
                ))}
                {venue.bestFor.map((t) => (
                  <div key={t} className="vlp-highlight-row vlp-highlight-row--muted">
                    <span className="vlp-highlight-num" style={{ color: `rgba(${accentRgb},0.35)`, fontSize: "clamp(18px,2vw,24px)" }}>
                      ★
                    </span>
                    <span className="vlp-highlight-text">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </VenueReveal>

        {/* ══════════════════════════════════════
            COLOPHON
            ══════════════════════════════════════ */}
        <VenueReveal>
          <section className="vlp-colophon">
            <div className="vlp-colophon-inner">
              <div className="vlp-colophon-venue">
                {brand?.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={brand.logoUrl}
                    alt={venue.name}
                    className="vlp-colophon-logo"
                  />
                ) : (
                  <span className="vlp-colophon-venue-name" style={{ color: accent }}>
                    {brand?.logoText || venue.name}
                  </span>
                )}
                <span className="vlp-colophon-venue-meta">
                  {venue.city}
                  {brand?.foundedYear ? ` · Est. ${brand.foundedYear}` : ""}
                  {` · ${venue.type}`}
                </span>
              </div>

              <div className="vlp-colophon-divider" />

              <div className="vlp-colophon-xred">
                <span className="vlp-colophon-brand">
                  <span style={{ color: "#fff" }}>XRED </span>
                  <span style={{ color: "#84C51F" }}>EYEZ</span>
                </span>
                <span className="vlp-colophon-sub">
                  Powered by Hemp · {venue.city} Guide
                </span>
              </div>

              <div className="vlp-colophon-action">
                {venue.partnerUrl && (
                  <a
                    href={venue.partnerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="vlp-colophon-link vlp-colophon-link-primary"
                  >
                    Visit {brand?.logoText || venue.name} ↗
                  </a>
                )}
                <Link href={`/cities/${venue.cityId}/map`} className="vlp-colophon-link">
                  {venue.city} map →
                </Link>
                <Link
                  href={`/partners/claim?venue=${venue.slug}`}
                  className="vlp-colophon-link"
                >
                  {isPartner ? "Partner dashboard" : "Claim or upgrade"} →
                </Link>
                <SaveButton itemType="venue" itemId={venue.id} label="Save this venue" />
              </div>
            </div>
          </section>
        </VenueReveal>

        {/* ══════════════════════════════════════
            RELATED VENUES
            ══════════════════════════════════════ */}
        {related.length > 0 && (
          <VenueReveal>
            <section className="vlp-related">
              <div className="vlp-related-inner">
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
          </VenueReveal>
        )}

      </div>

      <VenueMobileStrip venue={venue} />
    </VenueShell>
  );
}
