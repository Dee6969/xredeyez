"use client";
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
        <Link
          href="/premium"
          style={{
            display: "inline-flex",
            minHeight: "48px",
            alignItems: "center",
            justifyContent: "center",
            padding: "14px 28px",
            background: "rgba(255,255,255,0.08)",
            color: "rgba(245,240,230,0.72)",
            fontSize: "15px",
            fontWeight: "500",
            letterSpacing: "0",
            textDecoration: "none",
            borderRadius: "99px",
            border: "1px solid rgba(255,255,255,0.14)",
            transition: "background 200ms ease, color 200ms ease, border-color 200ms ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.14)";
            e.currentTarget.style.color = "rgba(245,240,230,0.96)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.24)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.08)";
            e.currentTarget.style.color = "rgba(245,240,230,0.72)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
          }}
        >
          Preview Premium
        </Link>
      </div>
    </aside>
  );
}
