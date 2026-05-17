import Link from "next/link";
import Image from "next/image";
import PlatformNav from "./components/PlatformNav";
import CityLightRail from "./components/CityLightRail";
import MembershipTeaser from "./components/MembershipTeaser";
import SiteFooter from "./components/SiteFooter";
import { vibes } from "./data/platform";

export default function Home() {
  const displayVibes = vibes.slice(0, 8);

  return (
    <>
      <PlatformNav />

      {/* Hero */}
      <section className="home-hero" aria-label="Welcome to XRED EYEZ">
        <div className="home-hero-image">
          <Image
            src="/cities/amsterdam-canal-day.png"
            alt="Amsterdam canal — premium cannabis culture discovery"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center 40%" }}
          />
        </div>
        <div className="home-hero-overlay" aria-hidden="true" />
        <div className="home-hero-bar home-hero-bar-top" aria-hidden="true" />

        <div className="home-hero-content">
          <p className="home-hero-city-label anim-fade-up">Amsterdam · Netherlands</p>
          <h1 className="home-hero-headline anim-fade-up delay-2">
            Find the city<br />that moves you.
          </h1>
          <Link href="/explore" className="home-hero-cta anim-fade-up delay-4">
            Explore Now
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

        <p className="home-hero-scroll" aria-hidden="true">Scroll</p>
      </section>

      {/* Value strip */}
      <div className="home-value-strip" role="list" aria-label="Platform stats">
        <div className="home-value-cell" role="listitem">
          <strong>42</strong>
          <span>Cities mapped</span>
        </div>
        <div className="home-value-cell" role="listitem">
          <strong>200+</strong>
          <span>Curated venues</span>
        </div>
        <div className="home-value-cell" role="listitem">
          <strong>Free</strong>
          <span>Always to browse</span>
        </div>
      </div>

      {/* City discovery rail */}
      <section aria-label="Featured cities">
        <div className="home-section" style={{ paddingBottom: "24px" }}>
          <div className="home-section-header">
            <div>
              <p className="eyebrow">City guides</p>
              <h2 className="home-section-title" style={{ marginTop: "8px" }}>Start with a city.</h2>
            </div>
            <Link href="/cities" className="platform-inline-link">All cities →</Link>
          </div>
        </div>
        <div style={{ paddingLeft: "clamp(16px, 4vw, 48px)", paddingRight: "clamp(16px, 4vw, 48px)" }}>
          <CityLightRail />
        </div>
      </section>

      {/* Vibe filters */}
      <section className="home-section" aria-label="Browse by vibe">
        <div className="home-section-header">
          <div>
            <p className="eyebrow">Browse by mood</p>
            <h2 className="home-section-title" style={{ marginTop: "8px" }}>How do you want to feel?</h2>
          </div>
          <Link href="/vibes" className="platform-inline-link">All vibes →</Link>
        </div>
        <div className="home-vibes-row">
          {displayVibes.map((vibe) => (
            <Link key={vibe.id} href={`/vibes?vibe=${vibe.id}`} className="vibe-chip">
              {vibe.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Map teaser */}
      <section className="home-map-teaser" aria-label="Explore the live map">
        <div className="home-map-inner">
          <div className="home-map-mock" aria-hidden="true">
            <div className="home-map-mock-grid" />
            <div className="home-map-mock-overlay" />
            {/* Mock venue pins */}
            {[
              { x: 48, y: 38, featured: true },
              { x: 36, y: 54 },
              { x: 55, y: 42, featured: true },
              { x: 62, y: 26 },
              { x: 44, y: 62 },
            ].map((pin, i) => (
              <div
                key={i}
                className={`platform-map-pin${pin.featured ? " is-featured" : ""}`}
                style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
              >
                <span />
              </div>
            ))}
            <div className="platform-map-label">Amsterdam · Live</div>
          </div>

          <div className="home-map-copy">
            <p className="eyebrow">Live city maps</p>
            <h2>Explore every venue in one view.</h2>
            <p>
              Filter by vibe, tap a pin, read the guide, save it. The Amsterdam map is live now — more cities coming.
            </p>
            <div className="platform-action-row">
              <Link href="/cities/amsterdam/map" className="btn-ghost">
                Open Amsterdam Map →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Membership moment */}
      <div className="home-section">
        <MembershipTeaser />
      </div>

      <SiteFooter />
    </>
  );
}
