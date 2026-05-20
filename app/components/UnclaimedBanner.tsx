import Link from "next/link";
import type { Venue } from "../data/platform";

export default function UnclaimedBanner({ venue }: { venue: Venue }) {
  if (venue.claimStatus !== "unclaimed") return null;
  return (
    <div className="vlp-unclaimed-banner">
      <div className="vlp-unclaimed-text">
        <span className="vlp-unclaimed-title">Is this your venue?</span>
        <span className="vlp-unclaimed-sub">
          Claim this listing · Add branding · Unlock city guide placement
        </span>
      </div>
      <Link
        href={`/partners/claim?venue=${venue.slug}`}
        className="vlp-unclaimed-cta"
      >
        Take control →
      </Link>
    </div>
  );
}
