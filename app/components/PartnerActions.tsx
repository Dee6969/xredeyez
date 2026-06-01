import Link from "next/link";
import type { Venue } from "../data/platform";

function referralHref(url: string, venue: Venue, sourcePage: string) {
  if (url.startsWith("/")) {
    const params = new URLSearchParams({
      source: sourcePage,
      venue: venue.slug,
    });
    if (venue.referralCode) params.set("ref", venue.referralCode);
    return `${url}${url.includes("?") ? "&" : "?"}${params.toString()}`;
  }

  try {
    const next = new URL(url);
    next.searchParams.set("utm_source", "xred_eyez");
    next.searchParams.set("utm_medium", "partner_click");
    next.searchParams.set("utm_campaign", sourcePage);
    if (venue.referralCode) next.searchParams.set("ref", venue.referralCode);
    return next.toString();
  } catch {
    return url;
  }
}

function bookingAffiliateHref(venue: Venue, sourcePage: string) {
  const destination = [venue.name, venue.neighborhood, venue.country || venue.city]
    .filter(Boolean)
    .join(", ");
  const params = new URLSearchParams({
    destination,
    city: venue.cityId,
    venue: venue.slug,
    source: sourcePage,
  });
  if (venue.referralCode) params.set("ref", venue.referralCode);
  return `/partners/booking?${params.toString()}`;
}

export default function PartnerActions({
  venue,
  sourcePage,
}: {
  venue: Venue;
  sourcePage: string;
}) {
  const partnerHref = venue.partnerUrl ? referralHref(venue.partnerUrl, venue, sourcePage) : null;
  const bookingHref = venue.layer === "stay"
    ? bookingAffiliateHref(venue, sourcePage)
    : venue.bookingUrl
      ? referralHref(venue.bookingUrl, venue, sourcePage)
      : null;

  return (
    <div className="partner-actions">
      {partnerHref && (
        <a href={partnerHref} target="_blank" rel="noreferrer" data-hover className="platform-primary-action">
          Visit Partner
        </a>
      )}
      {bookingHref && (
        <a href={bookingHref} target={bookingHref.startsWith("/") ? undefined : "_blank"} rel={bookingHref.startsWith("/") ? undefined : "noreferrer"} data-hover className="platform-secondary-action">
          {venue.layer === "stay" ? "Book Hotel" : "Book / Enquire"}
        </a>
      )}
      <Link href={`/partners/claim?venue=${venue.slug}`} data-hover className="platform-secondary-action">
        {venue.claimStatus === "unclaimed" ? "Claim Listing" : "Partner Enquiry"}
      </Link>
    </div>
  );
}
