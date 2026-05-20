import Image from "next/image";
import Link from "next/link";
import PlatformNav from "./components/PlatformNav";
import HeroSlideshow from "./components/HeroSlideshow";
import MembershipTeaser from "./components/MembershipTeaser";
import SiteFooter from "./components/SiteFooter";
import Reveal from "./components/Reveal";
import { cities } from "./data/platform";

const cityImages: Record<string, string> = {
  amsterdam:        "/cities/amsterdam-canal-day.png",
  barcelona:        "/cities/barcelona-terrace.png",
  tenerife:         "/cities/tenerife-sunrise.png",
  marbella:         "/cities/marbella-marina.png",
  thailand:         "/cities/thailand-bangkok.png",
  germany:          "/cities/germany-berlin.png",
  "czech-republic": "/cities/czech-prague.png",
  "south-africa":   "/cities/south-africa-cape-town.png",
  canada:           "/banners/between-sessions.png",
};

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
            Explore destinations
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
        <p className="home-hero-scroll" aria-hidden="true">Scroll</p>
      </section>

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
      <Reveal>
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

          <div className="home-destinations-grid">
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
                      style={{ objectFit: "cover" }}
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

            {/* Who is next? */}
            <div className="home-dest-card home-dest-next" aria-hidden="true">
              <div className="home-dest-next-inner">
                <span>WHO IS NEXT?</span>
              </div>
            </div>
            <div className="home-dest-card home-dest-next" aria-hidden="true">
              <div className="home-dest-next-inner">
                <span>WHO IS NEXT?</span>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

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
    </>
  );
}
