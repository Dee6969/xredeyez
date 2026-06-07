import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import PlatformShell from "../components/PlatformShell";
import Reveal from "../components/Reveal";
import { guides } from "../data/guides";

export const metadata: Metadata = {
  title: "Cannabis Culture Travel Guides — Amsterdam, Barcelona, Prague & More | XRED EYEZ",
  description: "In-depth cannabis culture travel guides for Amsterdam, Barcelona, Prague, Tenerife and beyond. Coffeeshops, social clubs, laws, neighbourhoods and insider tips.",
  alternates: {
    canonical: "https://www.redeyez.co.uk/guides",
  },
  openGraph: {
    title: "Cannabis Travel Guides | XRED EYEZ",
    description: "In-depth cannabis culture guides for every XRED EYEZ city. Coffeeshops, social clubs, laws and insider tips.",
    type: "website",
  },
};

export default function GuidesPage() {
  return (
    <PlatformShell>
      <Reveal>
        <section className="platform-section guides-hero-section">
          <div className="eyebrow">Travel Guides</div>
          <h1 className="platform-title guides-page-title">Know before you go.</h1>
          <p className="platform-lede guides-page-lede">
            In-depth cannabis culture guides for every city we cover. Laws, social clubs, coffeeshops, neighbourhoods and the intel no other travel platform publishes.
          </p>
        </section>
      </Reveal>

      <Reveal>
        <section className="platform-section">
          <div className="guides-grid">
            {guides.map((guide) => (
              <Link key={guide.slug} href={`/guides/${guide.slug}`} className="guide-card">
                <div className="guide-card-img">
                  <Image
                    src={guide.heroImage}
                    alt={guide.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="guide-card-img-overlay" />
                  <span className="guide-card-city">{guide.city}</span>
                </div>
                <div className="guide-card-body">
                  <div className="guide-card-meta">
                    <span className="guide-card-tag">{guide.tags[0]}</span>
                    <span className="guide-card-read">{guide.readTime}</span>
                  </div>
                  <h2 className="guide-card-title">{guide.title}</h2>
                  <p className="guide-card-sub">{guide.subtitle}</p>
                  <span className="guide-card-cta">Read guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="platform-section" style={{ textAlign: "center", padding: "48px 0 72px" }}>
          <div className="eyebrow" style={{ marginBottom: "12px" }}>More coming</div>
          <h2 className="platform-section-title" style={{ marginBottom: "20px" }}>
            Berlin, Marbella, Cape Town and beyond.
          </h2>
          <p style={{ color: "rgba(245,240,230,0.48)", maxWidth: "480px", margin: "0 auto 28px", fontSize: "0.9rem", lineHeight: "1.65" }}>
            New guides drop regularly as XRED EYEZ expands city coverage. Join the vault for early access.
          </p>
          <Link href="/vault" className="platform-primary-action">
            Join the vault →
          </Link>
        </section>
      </Reveal>
    </PlatformShell>
  );
}
