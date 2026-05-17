import Link from "next/link";
import MembershipTeaser from "../components/MembershipTeaser";
import PlatformShell from "../components/PlatformShell";

export const metadata = {
  title: "Vault Membership | XRED EYEZ",
  description: "XRED EYEZ member layer for saved boards, premium city drops, insider routes, and early access.",
};

const benefits = [
  { title: "Saved boards", copy: "Keep venues, cities, vibes, and routes synced across devices when profiles go live." },
  { title: "Premium city drops", copy: "Early access to deeper Amsterdam lists, Barcelona social club intelligence, and future market guides." },
  { title: "Insider routes", copy: "Curated day and night plans built around mood, access, food, culture, and recovery." },
  { title: "Partner rooms", copy: "Priority access to featured venues, launch events, private offers, and claim-ready business profiles." },
];

export default function VaultPage() {
  return (
    <PlatformShell>
      <section className="platform-hero">
        <div className="eyebrow">VAULT</div>
        <h1 className="platform-title">Membership without the noise.</h1>
        <p className="platform-lede">
          The Vault turns saved places into boards, boards into routes, and routes into early-access city intelligence.
        </p>
        <div className="platform-action-row">
          <Link href="/saved" data-hover className="platform-primary-action">
            Open Saved
          </Link>
          <Link href="/cities/amsterdam/map" data-hover className="platform-secondary-action">
            Amsterdam Map
          </Link>
        </div>
      </section>

      <section className="platform-section">
        <div className="platform-info-strip">
          <div>
            <span>Where am I?</span>
            <strong>Vault preview</strong>
          </div>
          <div>
            <span>What can I do?</span>
            <strong>Join, save, preview</strong>
          </div>
          <div>
            <span>Tap next</span>
            <strong>Open Saved</strong>
          </div>
        </div>
      </section>

      <section className="platform-section">
        <div className="platform-module-grid">
          {benefits.map((benefit) => (
            <article key={benefit.title} className="platform-card p-5">
              <div className="eyebrow">MEMBER VALUE</div>
              <h2 className="mt-4 font-display text-[32px] leading-none text-[var(--bone)]">{benefit.title}</h2>
              <p className="mt-4 text-[14px] leading-6 text-white/58">{benefit.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="platform-section">
        <MembershipTeaser />
      </section>
    </PlatformShell>
  );
}
