import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import PlatformNav from "./components/PlatformNav";
import HeroSlideshow from "./components/HeroSlideshow";
import MembershipTeaser from "./components/MembershipTeaser";
import SiteFooter from "./components/SiteFooter";
import Reveal from "./components/Reveal";
import MagneticButton from "./components/motion/MagneticButton";
import StaggerReveal from "./components/motion/StaggerReveal";
import CountUp from "./components/motion/CountUp";
import SiteMobileCTA from "./components/motion/SiteMobileCTA";
import { cities, venues } from "./data/platform";
import { guides } from "./data/guides";
import { websiteSchema, toJsonLd } from "./lib/schema";

export const metadata: Metadata = {
  title: "Cannabis Culture Travel Guides — City Intel, Venues & Routes | XRED EYEZ",
  description: "XRED EYEZ is the premium cannabis culture travel platform. City guides for Amsterdam, Barcelona, Prague and more — coffeeshops, social clubs, hotels, restaurants and curated routes.",
  alternates: {
    canonical: "https://www.redeyez.co.uk",
  },
  openGraph: {
    title: "Cannabis Culture Travel Guides | XRED EYEZ",
    description: "City guides, venue discovery and curated routes for cannabis culture travellers. Amsterdam, Barcelona, Prague and beyond.",
    type: "website",
    url: "https://www.redeyez.co.uk",
    images: [{ url: "/cities/amsterdam-canal-day.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cannabis Culture Travel Guides | XRED EYEZ",
    description: "City guides, venue discovery and curated routes for cannabis culture travellers.",
  },
};

const cityImages: Record<string, string> = {
  amsterdam:        "/cities/amsterdam-canal-day.png",
  barcelona:        "/cities/barcelona-terrace.png",
  tenerife:         "/cities/tenerife-sunrise.png",
  marbella:         "/cities/marbella-marina.png",
  thailand:         "/cities/thailand-bangkok.png",
  germany:          "/cities/germany-berlin.png",
  "czech-republic": "/cities/czech-prague.png",
  "south-africa":   "/cities/south-africa-cape-town.png",
  usa:              "/cities/usa-market-hero.png",
  canada:           "/cities/canada-market-hero.png",
  "den-haag":       "/cities/den-haag-binnenhof.jpg",
  rotterdam:        "/cities/rotterdam-erasmusbrug.jpg",
};

const actionBlocks = [
  {
    label: "Explore Cities",
    desc: "Browse destination guides",
    href: "/cities",
    symbol: "◎",
    accent: "#84C51F",
  },
  {
    label: "Find Cannabis",
    desc: "Coffeeshops & social clubs",
    href: "/explore",
    symbol: "◉",
    accent: "#84C51F",
  },
  {
    label: "Book Hotels",
    desc: "Cannabis-friendly stays",
    href: "/partners/booking?destination=Amsterdam&source=homepage",
    symbol: "◆",
    accent: "#B8A07A",
    external: true,
  },
  {
    label: "Open Map",
    desc: "Browse the city map",
    href: "/map",
    symbol: "✦",
    accent: "#38BDF8",
  },
  {
    label: "List Your Business",
    desc: "From €49/month",
    href: "/partners/list",
    symbol: "◈",
    accent: "#9E8B6A",
  },
];

export default function Home() {
  const venueCount = venues.length;
  const cityCount = cities.filter(c => c.status === "flagship" || c.status === "live").length;
  const guideCount = guides.length;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(websiteSchema()) }} />
      <PlatformNav />

      {/* Hero — full viewport, cinematic slideshow */}
      <section className="home-hero" aria-label="Welcome to XRED EYEZ">
        <HeroSlideshow />
        <div className="home-hero-content">
          <h1 className="home-hero-headline anim-fade-up delay-2">
            Know where<br />to go.
          </h1>
          <p className="home-hero-sub anim-fade-up delay-3">
            Cannabis culture travel. City guides, venues, routes and hotels — curated for real travellers.
          </p>
          <div className="home-hero-actions anim-fade-up delay-4">
            <MagneticButton>
              <Link href="/cities" className="home-hero-cta">
                Explore destinations
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </MagneticButton>
            <Link href="/map" className="home-hero-cta-secondary">
              Open Map
            </Link>
          </div>
        </div>
        <p className="home-hero-scroll" aria-hidden="true">Scroll</p>
      </section>

      {/* Action blocks — 5 quick access tiles */}
      <Reveal>
        <section className="home-action-section" aria-label="Quick actions">
          <div className="home-action-blocks">
            {actionBlocks.map((block) =>
              block.external ? (
                <a
                  key={block.label}
                  href={block.href}
                  className="home-action-block"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ "--block-accent": block.accent } as React.CSSProperties}
                >
                  <span className="home-action-symbol" aria-hidden="true">{block.symbol}</span>
                  <strong className="home-action-label">{block.label}</strong>
                  <span className="home-action-desc">{block.desc}</span>
                </a>
              ) : (
                <Link
                  key={block.label}
                  href={block.href}
                  className="home-action-block"
                  style={{ "--block-accent": block.accent } as React.CSSProperties}
                >
                  <span className="home-action-symbol" aria-hidden="true">{block.symbol}</span>
                  <strong className="home-action-label">{block.label}</strong>
                  <span className="home-action-desc">{block.desc}</span>
                </Link>
              )
            )}
          </div>
        </section>
      </Reveal>

      {/* Stat strip — venues / cities / guides */}
      <Reveal>
        <section className="home-stat-strip" aria-label="Platform stats">
          <div className="home-stat-cell">
            <strong><CountUp to={venueCount} suffix="+" /></strong>
            <span>Venues</span>
          </div>
          <div className="home-stat-cell">
            <strong><CountUp to={cityCount} /></strong>
            <span>Live cities</span>
          </div>
          <div className="home-stat-cell">
            <strong><CountUp to={guideCount} /></strong>
            <span>Long-form guides</span>
          </div>
        </section>
      </Reveal>

      {/* Brand statement */}
      <Reveal>
        <div className="scene-interlude">
          <p className="scene-statement">
            Cannabis culture deserves a platform built around{" "}
            <strong>place, ritual, and atmosphere</strong> — not just a list of shops.
          </p>
          <span className="scene-divider" />
        </div>
      </Reveal>

      {/* All destinations */}
      <section className="home-section" aria-label="All destinations">
        <div className="home-section-header">
          <div>
            <p className="eyebrow">Where to go</p>
            <h2 className="home-section-title" style={{ marginTop: "8px" }}>
              Pick a country.<br />Find the culture.
            </h2>
          </div>
          <Link href="/cities" className="platform-inline-link">Full guide list →</Link>
        </div>

        <StaggerReveal className="home-destinations-grid">
          {cities.map((city) => {
            const img = cityImages[city.slug] || city.heroImage;
            const isLive = city.status === "flagship" || city.status === "live";
            return (
              <Link
                key={city.id}
                href={`/cities/${city.slug}`}
                className="home-dest-card"
                aria-label={`${city.name}, ${city.country}`}
              >
                <div className="home-dest-img">
                  <Image
                    src={img}
                    alt={city.name}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: "cover", viewTransitionName: `city-hero-${city.slug}` } as React.CSSProperties}
                  />
                  <div className="home-dest-wash" />
                </div>
                <div className="home-dest-info">
                  <span className="home-dest-country">{city.country}</span>
                  <strong className="home-dest-city">{city.name}</strong>
                  <span className={`home-dest-status${isLive ? " is-live" : ""}`}>
                    {isLive ? "Live guide" : "Coming soon"}
                  </span>
                </div>
              </Link>
            );
          })}

          {[0, 1].map((i) => (
            <div key={i} className="home-dest-card home-dest-next" aria-label="Next destination — coming soon">
              <div className="home-dest-next-inner">
                <div className="home-dest-next-ring">
                  <span className="home-dest-next-ring-dot" />
                </div>
                <div className="home-dest-next-brand">
                  <strong>Who is next?</strong>
                  <span>Drop incoming</span>
                </div>
              </div>
            </div>
          ))}
        </StaggerReveal>
      </section>

      {/* Brand statement */}
      <Reveal>
        <div className="scene-interlude">
          <p className="scene-statement">
            Every place has a feeling. Every culture has a room.{" "}
            <strong>Find yours.</strong>
          </p>
          <span className="scene-divider" />
        </div>
      </Reveal>

      {/* Membership */}
      <Reveal>
        <div className="home-section">
          <MembershipTeaser />
        </div>
      </Reveal>

      <SiteFooter />
      <SiteMobileCTA />
    </>
  );
}
