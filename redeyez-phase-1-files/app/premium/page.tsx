import Link from "next/link";
import PlatformShell from "../components/PlatformShell";
import Reveal from "../components/Reveal";

export const metadata = {
  title: "Premium Membership — Full City Access, Routes & Saves | XRED EYEZ",
  description: "Unlock the full XRED EYEZ travel layer. All cities, curated routes, insider picks, unlimited saves — launching soon.",
  alternates: {
    canonical: "https://www.redeyez.co.uk/premium",
  },
  openGraph: {
    title: "XRED EYEZ Premium",
    description: "The full travel layer: every city, every route, unlimited saves, insider drops. Founding rate for waitlist members.",
    type: "website",
    url: "https://www.redeyez.co.uk/premium",
  },
};

const benefits = [
  {
    symbol: "◎",
    title: "Every city. All updates.",
    body: "Full access to every city guide as it drops — flagship cities, live guides, and new cities the moment they go live. Never behind a gate.",
    accent: "#84C51F",
  },
  {
    symbol: "◈",
    title: "Curated routes, unlocked.",
    body: "Every route in every city — Morning Sessions, After-Dark, Social, Solo. Editor-planned, time-stamped, purpose-built for your travel style.",
    accent: "#D4A847",
  },
  {
    symbol: "♡",
    title: "Unlimited saves.",
    body: "Build collections across cities. Hotel shortlists, coffeeshop runs, neighbourhood deep-dives. Cross-device, always synced.",
    accent: "#B52426",
  },
  {
    symbol: "◉",
    title: "Insider drops first.",
    body: "New city previews, hidden venue picks, and partner intel — delivered to premium members before anyone else sees the guide.",
    accent: "#84C51F",
  },
];

const freeFeatures = [
  { text: "City guides (flagship cities)", locked: false },
  { text: "Map discovery", locked: false },
  { text: "Global search", locked: false },
  { text: "Save up to 10 places", locked: false },
  { text: "All city guides + live updates", locked: true },
  { text: "Full route access", locked: true },
  { text: "Unlimited saves + collections", locked: true },
  { text: "Insider drops & early access", locked: true },
  { text: "Ad-free experience", locked: true },
  { text: "Cross-device sync", locked: true },
];

const premiumFeatures = freeFeatures.map(f => ({ ...f, locked: false }));

const faqs = [
  {
    q: "When does Premium launch?",
    a: "We're in final development. Join the waitlist to get notified first — early members lock in the founding rate.",
  },
  {
    q: "What happens to my free account?",
    a: "Your free account stays free. Saved places, preferences, and access to flagship city guides remain. Premium unlocks the full layer.",
  },
  {
    q: "What's the founding rate?",
    a: "Waitlist members lock in a lower rate that won't change — ever. The price on this page reflects the standard rate after launch.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Monthly plans cancel anytime. Annual plans cancel at end of term. No questions, no friction.",
  },
  {
    q: "Is this for travelers only?",
    a: "Yes — Premium is the traveler layer. If you own a venue, see the Partner listing options instead.",
  },
];

export default function PremiumPage() {
  return (
    <PlatformShell>

      {/* ══════════════════════════════════════
          HERO
          ══════════════════════════════════════ */}
      <Reveal>
        <section className="prem-hero">
          <div className="eyebrow prem-eyebrow">PREMIUM</div>
          <h1 className="prem-headline">
            Unlock the full<br />
            <span className="prem-headline-gold">travel layer.</span>
          </h1>
          <p className="prem-sub">
            All cities. Full routes. Insider drops. Unlimited saves.
            Cannabis culture travel — the version that holds nothing back.
          </p>
          <div className="prem-hero-actions">
            <Link href="/vault" className="platform-primary-action prem-cta-primary">
              Join the waitlist
            </Link>
            <span className="prem-hero-note">Founding rate locked for waitlist members.</span>
          </div>

          <div className="prem-stats-row">
            <div className="prem-stat">
              <strong>245+</strong>
              <span>Venues indexed</span>
            </div>
            <div className="prem-stat-sep" />
            <div className="prem-stat">
              <strong>12</strong>
              <span>Cities live</span>
            </div>
            <div className="prem-stat-sep" />
            <div className="prem-stat">
              <strong>60+</strong>
              <span>Curated routes</span>
            </div>
            <div className="prem-stat-sep" />
            <div className="prem-stat">
              <strong>Free</strong>
              <span>to start</span>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ══════════════════════════════════════
          BENEFITS GRID
          ══════════════════════════════════════ */}
      <Reveal>
        <section className="platform-section prem-benefits-section">
          <div className="prem-section-head">
            <div className="eyebrow">What you unlock</div>
            <h2 className="prem-section-title">Everything. No gates.</h2>
          </div>
          <div className="prem-benefits-grid">
            {benefits.map((b) => (
              <div key={b.title} className="prem-benefit-card" style={{ "--b-accent": b.accent } as React.CSSProperties}>
                <span className="prem-benefit-symbol" aria-hidden="true">{b.symbol}</span>
                <h3 className="prem-benefit-title">{b.title}</h3>
                <p className="prem-benefit-body">{b.body}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ══════════════════════════════════════
          PRICING
          ══════════════════════════════════════ */}
      <Reveal>
        <section className="platform-section prem-pricing-section">
          <div className="prem-section-head">
            <div className="eyebrow">Pricing</div>
            <h2 className="prem-section-title">Start free. Upgrade when ready.</h2>
          </div>

          <div className="prem-pricing-grid">

            {/* Free card */}
            <div className="prem-plan-card">
              <div className="prem-plan-badge">Free</div>
              <div className="prem-plan-name">Explorer</div>
              <div className="prem-plan-price-wrap">
                <span className="prem-plan-price">£0</span>
                <span className="prem-plan-period">always free</span>
              </div>
              <ul className="prem-plan-features">
                {freeFeatures.map((f) => (
                  <li key={f.text} className={`prem-plan-feature${f.locked ? " is-locked" : ""}`}>
                    <span className="prem-plan-feature-icon" aria-hidden="true">{f.locked ? "–" : "✓"}</span>
                    <span>{f.text}</span>
                  </li>
                ))}
              </ul>
              <Link href="/explore" className="prem-plan-cta">
                Browse free
              </Link>
            </div>

            {/* Monthly card */}
            <div className="prem-plan-card">
              <div className="prem-plan-badge">Premium</div>
              <div className="prem-plan-name">Member</div>
              <div className="prem-plan-price-wrap">
                <span className="prem-plan-price">£7.99</span>
                <span className="prem-plan-period">per month</span>
              </div>
              <ul className="prem-plan-features">
                {premiumFeatures.map((f) => (
                  <li key={f.text} className="prem-plan-feature">
                    <span className="prem-plan-feature-icon" aria-hidden="true">✓</span>
                    <span>{f.text}</span>
                  </li>
                ))}
              </ul>
              <Link href="/vault" className="prem-plan-cta">
                Join waitlist
              </Link>
            </div>

            {/* Annual card — highlighted */}
            <div className="prem-plan-card is-featured">
              <div className="prem-plan-badge">Best value</div>
              <div className="prem-plan-save-tag">Save 38%</div>
              <div className="prem-plan-name">Member Annual</div>
              <div className="prem-plan-price-wrap">
                <span className="prem-plan-price">£59</span>
                <span className="prem-plan-period">per year · £4.92/mo</span>
              </div>
              <ul className="prem-plan-features">
                {premiumFeatures.map((f) => (
                  <li key={f.text} className="prem-plan-feature">
                    <span className="prem-plan-feature-icon" aria-hidden="true">✓</span>
                    <span>{f.text}</span>
                  </li>
                ))}
              </ul>
              <Link href="/vault" className="prem-plan-cta is-primary">
                Join waitlist — founding rate
              </Link>
            </div>

          </div>
        </section>
      </Reveal>

      {/* ══════════════════════════════════════
          STATEMENT BREAK
          ══════════════════════════════════════ */}
      <Reveal>
        <section className="prem-statement">
          <blockquote className="prem-statement-quote">
            &ldquo;The intel no other platform will publish — built for people who travel with a purpose.&rdquo;
          </blockquote>
          <div className="prem-statement-attr">XRED EYEZ · Est. 2024</div>
        </section>
      </Reveal>

      {/* ══════════════════════════════════════
          FAQ
          ══════════════════════════════════════ */}
      <Reveal>
        <section className="platform-section prem-faq-section">
          <div className="prem-section-head">
            <div className="eyebrow">Questions</div>
            <h2 className="prem-section-title">Straight answers.</h2>
          </div>
          <div className="prem-faq-list">
            {faqs.map((faq) => (
              <div key={faq.q} className="prem-faq-item">
                <div className="prem-faq-q">{faq.q}</div>
                <div className="prem-faq-a">{faq.a}</div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ══════════════════════════════════════
          FINAL CTA
          ══════════════════════════════════════ */}
      <Reveal>
        <section className="prem-final">
          <div className="prem-final-inner">
            <div className="eyebrow" style={{ marginBottom: "16px" }}>Ready when you are</div>
            <h2 className="prem-final-title">
              Get in first.<br />Lock the founding rate.
            </h2>
            <p className="prem-final-sub">
              Waitlist members lock in a lower price that never changes — and get first access when we launch.
            </p>
            <div className="platform-action-row prem-final-actions">
              <Link href="/vault" className="platform-primary-action" style={{ minHeight: "52px", fontSize: "16px", padding: "16px 36px" }}>
                Join the waitlist
              </Link>
              <Link href="/explore" className="platform-secondary-action" style={{ minHeight: "52px", fontSize: "15px" }}>
                Browse free first
              </Link>
            </div>
            <p className="prem-final-hint">
              No card required · Cancel anytime · Founding rate locked forever
            </p>
          </div>
        </section>
      </Reveal>

      {/* Business owner note */}
      <Reveal>
        <div className="prem-b2b-strip">
          <span>Venue owner?</span>
          <Link href="/partners/list">See Partner listing options →</Link>
        </div>
      </Reveal>

    </PlatformShell>
  );
}
