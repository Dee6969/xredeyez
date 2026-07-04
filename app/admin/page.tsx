import type { Metadata } from "next";
import Link from "next/link";
import { list } from "@vercel/blob";
import AdminLogin from "../components/AdminLogin";
import AdminNav from "../components/AdminNav";
import { isAdminAuthed } from "../lib/adminAuth";
import { readContacts } from "../lib/outreach/store";
import { cities, venues } from "../data/platform";
import { guides } from "../data/guides";

export const metadata: Metadata = {
  title: "Control Room | XRED EYEZ Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

async function countBlobs(prefix: string): Promise<number> {
  try {
    const { blobs } = await list({ prefix });
    return blobs.length;
  } catch {
    return 0;
  }
}

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
  if (!(await isAdminAuthed())) {
    return (
      <main className="admin-leads-shell">
        <AdminLogin />
      </main>
    );
  }

  const [partnerLeadCount, waitlistCount, contacts, orders] = await Promise.all([
    countBlobs("leads/partner/"),
    countBlobs("leads/waitlist/"),
    readContacts().catch(() => []),
    stripeSnapshot(),
  ]);

  const liveCities = cities.filter((c) => c.status === "flagship" || c.status === "live");
  const claimed = venues.filter((v) => v.claimStatus !== "unclaimed").length;
  const partners = venues.filter((v) => v.claimStatus === "partner").length;
  const outreachActive = contacts.filter((c) => c.status === "active").length;
  const outreachDone = contacts.filter((c) => c.status === "complete").length;
  const outreachUnsub = contacts.filter((c) => c.status === "unsubscribed").length;

  const cards = [
    { label: "Partner enquiries", value: partnerLeadCount, href: "/admin/leads", note: "captured leads" },
    { label: "Waitlist emails", value: waitlistCount, href: "/admin/leads", note: "premium sign-ups" },
    { label: "Outreach pipeline", value: outreachActive, href: "/admin/outreach", note: `${outreachDone} complete · ${outreachUnsub} unsubscribed` },
    { label: "Shop orders", value: orders ? orders.count : "—", href: "/admin/orders", note: orders ? `${orders.revenue} collected` : "Stripe not connected" },
    { label: "Venues live", value: venues.length, href: "/cities", note: `${claimed} claimed · ${partners} partners` },
    { label: "Cities live", value: liveCities.length, href: "/cities", note: `${cities.length - liveCities.length} coming · ${guides.length} guides` },
  ];

  return (
    <main className="admin-leads-shell">
      <header className="admin-leads-head">
        <div className="eyebrow">XRED EYEZ ADMIN</div>
        <h1>Control room</h1>
        <AdminNav />
      </header>

      <div className="admin-overview-grid">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="admin-overview-card">
            <strong>{card.value}</strong>
            <span className="admin-overview-label">{card.label}</span>
            <span className="admin-overview-note">{card.note}</span>
          </Link>
        ))}
      </div>

      <section className="admin-leads-section">
        <h2>Notes</h2>
        <ul className="admin-notes">
          <li>“Sign-ups” today = the premium waitlist. Real member accounts arrive with Supabase Auth in Phase 2 and will appear here.</li>
          <li>Product analytics (saves, map filters, premium clicks, walk-to taps) live in the Vercel Analytics dashboard under custom events.</li>
          <li>Leads are stored privately in Vercel Blob and mirrored to email/webhook when configured — see REDEYEZ_TECH_NOTES.md.</li>
        </ul>
      </section>
    </main>
  );
}
