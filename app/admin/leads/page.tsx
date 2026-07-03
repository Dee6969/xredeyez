import type { Metadata } from "next";
import { get, list } from "@vercel/blob";

export const metadata: Metadata = {
  title: "Leads Inbox | XRED EYEZ Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

/**
 * Admin leads inbox.
 * Reads partner enquiries + premium waitlist entries from private blob
 * storage (written by /api/partners/enquiry and /api/waitlist).
 * Guarded by ADMIN_DASH_SECRET (falls back to OUTREACH_ADMIN_SECRET):
 *   /admin/leads?key=<secret>
 * Interim tool until the Supabase leads table lands in Phase 2.
 */

interface PartnerLead {
  pathname: string;
  submittedAt?: string;
  businessName?: string;
  contactName?: string;
  email?: string;
  phone?: string;
  venue?: string;
  packageId?: string;
  sourcePage?: string;
  message?: string;
}

interface WaitlistLead {
  email?: string;
  source?: string;
  submittedAt?: string;
}

async function readJsonBlob<T>(pathname: string): Promise<T | null> {
  try {
    const result = await get(pathname, { access: "private", useCache: false });
    if (!result || result.statusCode !== 200) return null;
    const text = await new Response(result.stream).text();
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

async function readLeads<T>(prefix: string, limit: number): Promise<(T & { pathname: string })[]> {
  try {
    const { blobs } = await list({ prefix });
    const recent = blobs
      .sort((a, b) => b.pathname.localeCompare(a.pathname))
      .slice(0, limit);
    const loaded = await Promise.all(
      recent.map(async (blob) => {
        const data = await readJsonBlob<T>(blob.pathname);
        return data ? ({ ...data, pathname: blob.pathname } as T & { pathname: string }) : null;
      }),
    );
    return loaded.filter((item) => item !== null) as (T & { pathname: string })[];
  } catch {
    return [];
  }
}

function formatDate(iso?: string): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString("en-GB", {
      day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key } = await searchParams;
  const secret = process.env.ADMIN_DASH_SECRET || process.env.OUTREACH_ADMIN_SECRET;

  if (!secret || key !== secret) {
    return (
      <main className="admin-leads-shell">
        <div className="admin-leads-lock">
          <div className="eyebrow">XRED EYEZ ADMIN</div>
          <h1>Locked.</h1>
          <p>
            Append <code>?key=&lt;ADMIN_DASH_SECRET&gt;</code> to this URL.
            {!secret && " (No admin secret is configured in the environment yet.)"}
          </p>
        </div>
      </main>
    );
  }

  const [partnerLeads, waitlist] = await Promise.all([
    readLeads<PartnerLead>("leads/partner/", 100),
    readLeads<WaitlistLead>("leads/waitlist/", 500),
  ]);

  const waitlistEmails = [...new Set(waitlist.map((w) => w.email).filter(Boolean))] as string[];

  return (
    <main className="admin-leads-shell">
      <header className="admin-leads-head">
        <div className="eyebrow">XRED EYEZ ADMIN</div>
        <h1>Leads inbox</h1>
        <div className="admin-leads-stats">
          <div className="admin-leads-stat">
            <strong>{partnerLeads.length}</strong>
            <span>Partner enquiries</span>
          </div>
          <div className="admin-leads-stat">
            <strong>{waitlistEmails.length}</strong>
            <span>Waitlist emails</span>
          </div>
        </div>
      </header>

      <section className="admin-leads-section">
        <h2>Partner enquiries</h2>
        {partnerLeads.length === 0 ? (
          <p className="admin-leads-empty">
            No enquiries in storage yet. They&apos;ll appear here the moment the claim form is submitted in production.
          </p>
        ) : (
          <div className="admin-leads-grid">
            {partnerLeads.map((lead) => (
              <article key={lead.pathname} className="admin-lead-card">
                <div className="admin-lead-top">
                  <strong>{lead.businessName || "Unknown business"}</strong>
                  <time>{formatDate(lead.submittedAt)}</time>
                </div>
                <div className="admin-lead-rows">
                  <span>{lead.contactName}</span>
                  {lead.email && <a href={`mailto:${lead.email}`}>{lead.email}</a>}
                  {lead.phone && <span>{lead.phone}</span>}
                  {lead.venue && <span>Listing: {lead.venue}</span>}
                  {lead.packageId && <span className="admin-lead-package">{lead.packageId}</span>}
                  {lead.sourcePage && <span className="admin-lead-source">{lead.sourcePage}</span>}
                </div>
                {lead.message && <p className="admin-lead-message">{lead.message}</p>}
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="admin-leads-section">
        <h2>Premium waitlist</h2>
        {waitlistEmails.length === 0 ? (
          <p className="admin-leads-empty">No waitlist entries in storage yet.</p>
        ) : (
          <>
            <p className="admin-leads-hint">
              {waitlistEmails.length} unique emails, newest first — copy straight into your ESP.
            </p>
            <textarea
              className="admin-leads-emails"
              readOnly
              rows={Math.min(waitlistEmails.length + 1, 14)}
              defaultValue={waitlistEmails.join("\n")}
            />
          </>
        )}
      </section>
    </main>
  );
}
