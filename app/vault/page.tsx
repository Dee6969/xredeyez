import Link from "next/link";
import PlatformShell from "../components/PlatformShell";
import Reveal from "../components/Reveal";

export const metadata = {
  title: "Vault Membership | XRED EYEZ",
  description: "XRED EYEZ member layer for saved boards, premium city drops, insider routes, and early access.",
};

const benefits = [
  {
    num: "01",
    title: "Saved boards.",
    copy: "Keep venues, cities, vibes, and routes synced across devices. Your board travels with you.",
  },
  {
    num: "02",
    title: "Premium city drops.",
    copy: "Early access to deeper Amsterdam lists, Barcelona social club intelligence, and future market guides before they go public.",
  },
  {
    num: "03",
    title: "Insider routes.",
    copy: "Curated day and night plans built around mood, access, food, culture, and recovery. Pre-built, not generic.",
  },
  {
    num: "04",
    title: "Partner rooms.",
    copy: "Priority access to featured venues, launch events, private offers, and claim-ready business profiles — directly from the platform.",
  },
];

export default function VaultPage() {
  return (
    <PlatformShell>
      <Reveal>
        <section className="platform-hero">
          <div className="eyebrow">VAULT</div>
          <h1 className="platform-title">Membership without the noise.</h1>
          <p className="platform-lede">
            The Vault turns saved places into boards, boards into routes, and routes into early-access city intelligence. No algorithm. No feed. Just the information serious cannabis travellers actually need.
          </p>
          <div className="platform-action-row">
            <Link href="/saved" className="platform-primary-action">
              Open Saved
            </Link>
            <Link href="/cities/amsterdam/map" className="platform-secondary-action">
              Amsterdam Map
            </Link>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="platform-section">
          <div className="platform-section-head">
            <div>
              <div className="eyebrow">MEMBER VALUE</div>
              <h2 className="platform-section-title">What you actually get.</h2>
            </div>
          </div>
          <div className="editorial-benefits">
            {benefits.map((b) => (
              <div key={b.num} className="editorial-benefit">
                <span className="editorial-benefit-num">{b.num}</span>
                <div className="editorial-benefit-body">
                  <h3 className="editorial-benefit-title">{b.title}</h3>
                  <p className="editorial-benefit-copy">{b.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="platform-section">
          <div className="platform-legal-panel">
            <p>
              Vault membership is currently in early access. Join the waitlist and you'll be first in when premium routes, city drops, and cross-device boards launch. No spam, no algorithm — just the intel.
            </p>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="platform-section" style={{ textAlign: "center", padding: "48px 0 72px" }}>
          <p className="eyebrow" style={{ marginBottom: "20px" }}>Early access</p>
          <h2 className="platform-section-title" style={{ marginBottom: "32px" }}>
            Join the Vault.
          </h2>
          <div className="platform-action-row" style={{ justifyContent: "center" }}>
            <Link href="/saved" className="platform-primary-action">
              Start Saving
            </Link>
            <Link href="/premium" className="platform-secondary-action">
              See Listing Plans
            </Link>
          </div>
        </section>
      </Reveal>
    </PlatformShell>
  );
}
