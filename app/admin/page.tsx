import Link from "next/link";
import { isAdminAuthed } from "../lib/adminAuth";
import { countBlobs } from "../lib/adminData";
import { readContacts } from "../lib/outreach/store";
import { cities, venues } from "../data/platform";
import { guides } from "../data/guides";

export const dynamic = "force-dynamic";

async function stripeSnapshot(): Promise<{ count: number; revenue: string } | null> {
  if (!process.env.STRIPE_SECRET_KEY) return null;
  try {
    const { default: getStripe } = await import("../lib/stripe");
    const stripe = getStripe();
    const intents = await stripe.paymentIntents.list({ limit: 100 });
    const paid = intents.data.filter((p) => p.status === "succeeded");
    const total = paid.reduce((sum, p) => sum + p.amount, 0);
    const currency = paid[0]?.currency?.toUpperCase() || "GBP";
    return { count: paid.length, revenue: `${(total / 100).toFixed(2)} ${currency}` };
  } catch {
    return null;
  }
}

export default async function AdminOverviewPage() {
  if (!(await isAdminAuthed())) return null;

  const [partnerLeadCount, waitlistCount, contacts, orders] = await Promise.all([
    countBlobs("leads/partner/"),
    countBlobs("leads/waitlist/"),
    readContacts().catch(() => []),
    stripeSnapshot(),
  ]);

  const liveCities = cities.filter((c) => c.status === "flagship" || c.status === "live").length;
  const claimed = venues.filter((v) => v.claimStatus !== "unclaimed").length;
  const partners = venues.filter((v) => v.claimStatus === "partner").length;
  const activeOutreach = contacts.filter((c) => c.status === "active").length;
  const unsubscribed = contacts.filter((c) => c.status === "unsubscribed").length;

  const kpis = [
    { label: "Partner leads", value: partnerLeadCount, href: "/admin/leads", note: "enquiries captured" },
    { label: "Waitlist", value: waitlistCount, href: "/admin/waitlist", note: "premium signups" },
    { label: "Outreach active", value: activeOutreach, href: "/admin/outreach", note: `${contacts.length} contacts total` },
    {
      label: "Revenue",
      value: orders ? orders.revenue : "—",
      href: "/admin/orders",
      note: orders ? `${orders.count} paid orders` : "Stripe not connected",
    },
  ];

  return (
    <>
      <header className="adm-page-head">
        <div>
          <h1>Overview</h1>
          <p className="adm-page-sub">Everything the platform is capturing, in one place.</p>
        </div>
      </header>

      <section className="adm-kpi-grid" aria-label="Key metrics">
        {kpis.map((kpi) => (
          <Link key={kpi.label} href={kpi.href} className="adm-kpi">
            <span className="adm-kpi-label">{kpi.label}</span>
            <strong className="adm-kpi-value">{kpi.value}</strong>
            <span className="adm-kpi-note">{kpi.note}</span>
          </Link>
        ))}
      </section>

      <section className="adm-panel">
        <div className="adm-panel-head">
          <h2>Platform inventory</h2>
        </div>
        <div className="adm-inline-stats">
          <div><strong>{liveCities}</strong><span>live cities</span></div>
          <div><strong>{venues.length}</strong><span>venues</span></div>
          <div><strong>{claimed}</strong><span>claimed listings</span></div>
          <div><strong>{partners}</strong><span>paying partners</span></div>
          <div><strong>{guides.length}</strong><span>long-form guides</span></div>
          <div><strong>{unsubscribed}</strong><span>outreach unsubs</span></div>
        </div>
      </section>

      <section className="adm-panel">
        <div className="adm-panel-head">
          <h2>Quick actions</h2>
        </div>
        <div className="adm-quick-row">
          <Link href="/admin/leads" className="adm-btn-secondary">Review new leads</Link>
          <Link href="/admin/waitlist" className="adm-btn-secondary">Export waitlist</Link>
          <a href="https://vercel.com/dashboard" target="_blank" rel="noreferrer" className="adm-btn-secondary">Vercel ↗</a>
          <a href="https://dashboard.stripe.com" target="_blank" rel="noreferrer" className="adm-btn-secondary">Stripe ↗</a>
        </div>
      </section>
    </>
  );
}
