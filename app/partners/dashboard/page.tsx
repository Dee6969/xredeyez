import Link from "next/link";
import PlatformShell from "../../components/PlatformShell";

export const metadata = {
  title: "Partner Dashboard Preview | XRED EYEZ",
};

export default function PartnerDashboardPage() {
  return (
    <PlatformShell>
      <section className="platform-hero">
        <div className="eyebrow">STUB</div>
        <h1 className="platform-title">Partner dashboard.</h1>
        <p className="platform-lede">
          Future home for listing edits, lead tracking, referral metrics, sponsorship inventory, and billing.
        </p>
        <div className="platform-action-row">
          <Link href="/partners/claim" data-hover className="platform-primary-action">
            Claim First
          </Link>
          <Link href="/cities/amsterdam/map" data-hover className="platform-secondary-action">
            View Inventory
          </Link>
        </div>
      </section>
    </PlatformShell>
  );
}
