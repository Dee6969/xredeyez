import Link from "next/link";
import Image from "next/image";
import BookingHotelStrip from "./components/BookingHotelStrip";
import PlatformNav from "./components/PlatformNav";
import CityLightRail from "./components/CityLightRail";
import MembershipTeaser from "./components/MembershipTeaser";
import SiteFooter from "./components/SiteFooter";
import HomepageMapClient from "./components/HomepageMapClient";
import { cities, vibes, venues } from "./data/platform";

export default function Home() {
  const displayVibes = vibes.slice(0, 8);
  const flagshipCity = cities.find((city) => city.slug === "amsterdam") || cities[0];

  return (
    <>
      <PlatformNav />

      {/* Hero — full viewport, cinematic */}
      <section className="home-hero" aria-label="Welcome to XRED EYEZ">
        <div className="home-hero-image">
          <Image
            src="/cities/amsterdam-canal-day.png"
            alt="Amsterdam — XRED EYEZ city guide"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center 38%" }}
          />
        </div>
        <div className="home-hero-overlay" aria-hidden="true" />

        <div className="home-hero-content">
          <p className="home-hero-city-label anim-fade-up">Amsterdam · Netherlands</p>
          <h1 className="home-hero-headline anim-fade-up delay-2">
            Know where<br />to go.
          </h1>
          <Link href="/explore" className="home-hero-cta anim-fade-up delay-4">
            Start exploring
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

        <p className="home-hero-scroll" aria-hidden="true">Scroll</p>
      </section>

      {/* Scene interlude — world-setting */}
      <div className="scene-interlude" aria-hidden="true">
        <p className="scene-statement">
          Cannabis culture deserves a platform built around{" "}
          <strong>place, ritual, and atmosphere</strong> — not just a list of shops.
        </p>
        <span className="scene-divider" />
      </div>

      {/* City discovery rail */}
      <section aria-label="Featured cities">
        <div className="home-section" style={{ paddingBottom: "24px" }}>
          <div className="home-section-header">
            <div>
              <p className="eyebrow">City guides</p>
              <h2 className="home-section-title" style={{ marginTop: "8px" }}>
                Choose your city.
              </h2>
            </div>
            <Link href="/cities" className="platform-inline-link">All cities →</Link>
          </div>
        </div>
        <div style={{ paddingLeft: "clamp(16px, 4vw, 48px)", paddingRight: "clamp(16px, 4vw, 48px)" }}>
          <CityLightRail />
        </div>
      </section>

      {/* Scene interlude — vibe transition */}
      <div className="scene-interlude" aria-hidden="true">
        <p className="scene-statement">
          Every place has a feeling. Every culture has a room.{" "}
          <strong>Find yours.</strong>
        </p>
        <span className="scene-divider" />
      </div>

      <div className="home-section" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
        <BookingHotelStrip city={flagshipCity} />
      </div>

      {/* Vibe filters */}
      <section className="home-section" aria-label="Browse by vibe">
        <div className="home-section-header">
          <div>
            <p className="eyebrow">Browse by mood</p>
            <h2 className="home-section-title" style={{ marginTop: "8px" }}>
              How do you want to feel?
            </h2>
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

      {/* Map teaser — real live map */}
      <section className="home-map-teaser" aria-label="Explore the live map">
        <div className="home-map-teaser-head">
          <p className="eyebrow" style={{ color: "rgba(245,240,230,0.44)" }}>Live city maps</p>
          <h2 className="home-map-teaser-title">Every venue. One map.</h2>
          <p className="home-map-teaser-lede">
            Zoom out for the full network, tap a pin, then open the city or venue guide.
          </p>
        </div>
        <div className="home-real-map-section">
          <HomepageMapClient venues={venues} cities={cities} />
        </div>
        <div className="home-map-teaser-foot">
          <Link href="/cities/amsterdam/map" className="btn-ghost">
            Open full map →
          </Link>
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
