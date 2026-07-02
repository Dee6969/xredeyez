import Link from "next/link";
import PartnerClaimForm from "../../components/PartnerClaimForm";
import PlatformShell from "../../components/PlatformShell";
import { getVenue, venues } from "../../data/platform";

export const metadata = {
  title: "Claim Listing | XRED EYEZ",
  description: "Claim or upgrade a venue listing on XRED EYEZ.",
};

interface ClaimListingPageProps {
  searchParams: Promise<{ venue?: string; package?: string }>;
}

export default async function ClaimListingPage({ searchParams }: ClaimListingPageProps) {
  const { venue, package: packageId } = await searchParams;
  const currentVenue = venue ? getVenue(venue) : undefined;
  const slimVenues = venues.map(({ id, name, city, slug }) => ({ id, name, city, slug }));

  return (
    <PlatformShell>
      <section className="platform-hero">
        <div className="eyebrow">PARTNERS</div>
        <h1 className="platform-title">Claim your listing.</h1>
        <p className="platform-lede">
          Free profiles, featured placements, premium map pins, city sponsorships, and referral-ready partner actions.
        </p>
        <div className="platform-action-row">
          <Link href="/cities/amsterdam/map" data-hover className="platform-primary-action">
            View Map Inventory
          </Link>
          <Link href="/explore" data-hover className="platform-secondary-action">
            Explore Platform
          </Link>
        </div>
      </section>

      <section className="platform-section">
        <div className="platform-info-strip">
          <div>
            <span>Where am I?</span>
            <strong>Partner claim</strong>
          </div>
          <div>
            <span>What can I do?</span>
            <strong>Claim, feature, sponsor</strong>
          </div>
          <div>
            <span>Tap next</span>
            <strong>Send enquiry</strong>
          </div>
        </div>
      </section>

      <section className="platform-section">
        <div className="claim-layout">
          <PartnerClaimForm
            venues={slimVenues}
            currentVenue={currentVenue ? { id: currentVenue.id, name: currentVenue.name, city: currentVenue.city, slug: currentVenue.slug } : undefined}
            packageId={packageId}
          />

          <aside className="platform-panel">
            <div className="eyebrow">COMMERCIAL OPTIONS</div>
            <h2 className="mt-4 font-display text-[36px] leading-none text-[var(--bone)]">Revenue rails are ready.</h2>
            <p>
              The platform supports free listings, featured venue cards, premium map pins, sponsored city slots,
              referral links, booking CTAs, and future dashboard access.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="vibe-chip">Featured listing</span>
              <span className="vibe-chip">Premium pin</span>
              <span className="vibe-chip">City sponsor</span>
              <span className="vibe-chip">Referral CTA</span>
            </div>
          </aside>
        </div>
      </section>
    </PlatformShell>
  );
}
