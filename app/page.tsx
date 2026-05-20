import Link from "next/link";
import PlatformNav from "./components/PlatformNav";
import CityLightRail from "./components/CityLightRail";
import HeroSlideshow from "./components/HeroSlideshow";
import MembershipTeaser from "./components/MembershipTeaser";
import SiteFooter from "./components/SiteFooter";
import Reveal from "./components/Reveal";

export default function Home() {
  return (
    <>
      <PlatformNav />

      {/* Hero — full viewport, cinematic slideshow */}
      <section className="home-hero" aria-label="Welcome to XRED EYEZ">
        <HeroSlideshow />

        <div className="home-hero-content">
          <h1 className="home-hero-headline anim-fade-up delay-2">
            Know where<br />to go.
          </h1>
          <Link href="/cities" className="home-hero-cta anim-fade-up delay-4">
            Explore cities
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

        <p className="home-hero-scroll" aria-hidden="true">Scroll</p>
      </section>

      {/* Brand statement */}
      <Reveal>
        <div className="scene-interlude" aria-hidden="true">
          <p className="scene-statement">
            Cannabis culture deserves a platform built around{" "}
            <strong>place, ritual, and atmosphere</strong> — not just a list of shops.
          </p>
          <span className="scene-divider" />
        </div>
      </Reveal>

      {/* City discovery rail */}
      <section aria-label="Featured cities">
        <Reveal>
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
        </Reveal>
        <div style={{ paddingLeft: "clamp(16px, 4vw, 48px)", paddingRight: "clamp(16px, 4vw, 48px)" }}>
          <CityLightRail />
        </div>
      </section>

      {/* Second brand statement */}
      <Reveal>
        <div className="scene-interlude" aria-hidden="true">
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
    </>
  );
}
