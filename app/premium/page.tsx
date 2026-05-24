import Link from "next/link";
import PlatformShell from "../components/PlatformShell";
import Reveal from "../components/Reveal";

export const metadata = {
  title: "Premium Partner | XRED EYEZ",
  description: "List your venue on XRED EYEZ. Three tiers: free listing, featured placement, premium partner.",
};

const tiers = [
  {
    name: "Free Listing",
    badge: "Start here",
    price: "€0",
    priceSub: "Always free",
    featured: false,
    cta: "Claim free listing",
    ctaHref: "/partners/claim",
    features: [
      "Basic venue profile",
      "City map pin",
      "Contact info + hours",
      "Discoverable in search",
    ],
  },
  {
    name: "Featured",
    badge: "Most popular",
    price: "€49",
    priceSub: "per month",
    featured: true,
    cta: "Upgrade to Featured",
    ctaHref: "/partners/claim",
    features: [
      "Everything in Free",
      "Brand identity (logo, colours, tagline)",
      "Gallery — up to 2 photos",
      "Featured placement in city guide",
      "Priority map pin",
      "Guide note from XRED EYEZ editors",
      "Referral tracking",
    ],
  },
  {
    name: "Premium Partner",
    badge: "Full partnership",
    price: "Custom",
    priceSub: "contact us",
    featured: false,
    cta: "Talk to us",
    ctaHref: "/partners/claim",
    features: [
      "Everything in Featured",
      "Full gallery — up to 6 photos",
      "Live stats dashboard",
      "City ranking display",
      "Verified partner badge",
      "Route placements",
      "Dedicated account manager",
      "Custom editorial feature",
    ],
  },
];

export default function PremiumPage() {
  return (
    <PlatformShell>
      <Reveal>
        <section className="platform-hero">
          <div className="eyebrow">LIST YOUR VENUE</div>
          <h1 className="platform-title">Your venue deserves its own room.</h1>
          <p className="platform-lede">
            XRED EYEZ venue profiles are the first premium listing platform built specifically for cannabis culture travel. Three tiers — start free, upgrade when the value is clear.
          </p>
        </section>
      </Reveal>

      <Reveal>
        <section className="platform-section">
          <div className="tier-grid">
            {tiers.map((tier) => (
              <div key={tier.name} className={`tier-card${tier.featured ? " is-featured" : ""}`}>
                <span className="tier-badge">{tier.badge}</span>
                <span className="tier-name">{tier.name}</span>
                <span className="tier-price">{tier.price}</span>
                <span className="tier-price-sub">{tier.priceSub}</span>
                <div className="tier-features">
                  {tier.features.map((f) => (
                    <div key={f} className="tier-feature">
                      <span className="tier-feature-dot" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <Link href={tier.ctaHref} className={`tier-cta${tier.featured ? " is-primary" : ""}`}>
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="platform-section">
          <div className="platform-section-head">
            <div>
              <div className="eyebrow">WHY IT WORKS</div>
              <h2 className="platform-section-title">The intel no other platform will publish.</h2>
            </div>
          </div>
          <div className="platform-legal-panel">
            <p>
              Cannabis travelers search for information that Google Maps won&apos;t surface and TripAdvisor doesn&apos;t understand. XRED EYEZ is the platform they find first — and a listing here is the signal that your venue is ready for that audience. Featured and Premium partners get direct referral traffic, editorial coverage, and city guide placement that builds sustained visibility.
            </p>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="platform-section" style={{ textAlign: "center", padding: "64px 0 80px" }}>
          <p className="eyebrow" style={{ marginBottom: "20px" }}>Ready?</p>
          <h2 className="platform-section-title" style={{ marginBottom: "32px" }}>
            Claim your listing today.
          </h2>
          <div className="platform-action-row" style={{ justifyContent: "center" }}>
            <Link href="/partners/claim" className="platform-primary-action">
              Claim Free Listing
            </Link>
            <Link href="/cities/amsterdam" className="platform-secondary-action">
              See Amsterdam Guide
            </Link>
          </div>
        </section>
      </Reveal>
    </PlatformShell>
  );
}
