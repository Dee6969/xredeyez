"use client";

import Link from "next/link";
import { trackEvent } from "../lib/analytics";

/**
 * Locked premium card — used for premium routes, insider drops and
 * member-only briefs. Sells the upgrade by showing exactly what's
 * behind the line, without hiding free content.
 */
export default function PremiumLockCard({
  eyebrow = "Premium route",
  title,
  teaser,
  meta,
  source,
}: {
  eyebrow?: string;
  title: string;
  teaser: string;
  meta?: string;
  source: string;
}) {
  return (
    <Link
      href="/premium"
      className="premium-lock-card"
      onClick={() => trackEvent("premium_click", { source })}
      data-hover
    >
      <div className="premium-lock-badge" aria-hidden>
        <span className="premium-lock-icon">◈</span>
        <span>Premium</span>
      </div>
      {meta && <span className="premium-lock-meta">{meta}</span>}
      <div className="eyebrow premium-lock-eyebrow">{eyebrow}</div>
      <h3 className="premium-lock-title">{title}</h3>
      <p className="premium-lock-teaser">{teaser}</p>
      <em className="premium-lock-cta">Unlock with Premium →</em>
    </Link>
  );
}
