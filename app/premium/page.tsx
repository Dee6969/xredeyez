import Link from "next/link";
import MembershipTeaser from "../components/MembershipTeaser";
import PlatformShell from "../components/PlatformShell";

export const metadata = {
  title: "Premium Preview | XRED EYEZ",
};

export default function PremiumPage() {
  return (
    <PlatformShell>
      <section className="platform-hero">
        <div className="eyebrow">PREMIUM STUB</div>
        <h1 className="platform-title">Insider routes next.</h1>
        <p className="platform-lede">
          Premium will package saved boards, city drops, partner rooms, and route intelligence without cluttering the free map.
        </p>
        <div className="platform-action-row">
          <Link href="/vault" data-hover className="platform-primary-action">
            Join Waitlist
          </Link>
          <Link href="/cities/amsterdam/map" data-hover className="platform-secondary-action">
            Use Free Map
          </Link>
        </div>
      </section>
      <section className="platform-section">
        <MembershipTeaser />
      </section>
    </PlatformShell>
  );
}
