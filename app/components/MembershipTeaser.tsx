import Link from "next/link";

export default function MembershipTeaser({ compact = false }: { compact?: boolean }) {
  return (
    <aside className={`membership-teaser${compact ? " is-compact" : ""}`}>
      <div>
        <div className="eyebrow">Member layer</div>
        <h2>Discover more with a membership.</h2>
        <p>
          Saved places, curated routes, insider city drops, cross-device boards, and early partner access — all in one membership.
        </p>
      </div>
      <div className="platform-action-row">
        <Link href="/vault" className="platform-primary-action">
          Join the waitlist
        </Link>
        <Link href="/premium" className="platform-secondary-action">
          Preview Premium
        </Link>
      </div>
    </aside>
  );
}
