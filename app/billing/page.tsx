import Link from "next/link";
import PlatformShell from "../components/PlatformShell";

export const metadata = {
  title: "Billing Preview | XRED EYEZ",
};

export default function BillingPage() {
  return (
    <PlatformShell>
      <section className="platform-hero">
        <div className="eyebrow">BILLING STUB</div>
        <h1 className="platform-title">Stripe-ready later.</h1>
        <p className="platform-lede">
          Billing is intentionally stubbed so Amsterdam discovery can launch first while premium and partner plans are structured.
        </p>
        <div className="platform-action-row">
          <Link href="/premium" data-hover className="platform-primary-action">
            Premium Preview
          </Link>
          <Link href="/partners/claim" data-hover className="platform-secondary-action">
            Partner Enquiry
          </Link>
        </div>
      </section>
    </PlatformShell>
  );
}
