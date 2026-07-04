import type { Metadata } from "next";
import AdminLogin from "../../components/AdminLogin";
import AdminNav from "../../components/AdminNav";
import { isAdminAuthed } from "../../lib/adminAuth";
import { readContacts } from "../../lib/outreach/store";

export const metadata: Metadata = {
  title: "Outreach Pipeline | XRED EYEZ Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function formatDate(iso?: string): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
  } catch {
    return iso;
  }
}

export default async function AdminOutreachPage() {
  if (!(await isAdminAuthed())) {
    return (
      <main className="admin-leads-shell">
        <AdminLogin />
      </main>
    );
  }

  const contacts = await readContacts().catch(() => []);
  const sorted = [...contacts].sort((a, b) => (b.lastSentAt || b.createdAt).localeCompare(a.lastSentAt || a.createdAt));

  return (
    <main className="admin-leads-shell">
      <header className="admin-leads-head">
        <div className="eyebrow">XRED EYEZ ADMIN</div>
        <h1>Outreach pipeline</h1>
        <AdminNav />
      </header>

      {sorted.length === 0 ? (
        <p className="admin-leads-empty">No outreach contacts in storage.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Business</th>
                <th>Email</th>
                <th>Sector</th>
                <th>Sequence</th>
                <th>Step</th>
                <th>Status</th>
                <th>Last sent</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((c) => (
                <tr key={c.id}>
                  <td>{c.businessName}{c.venueName ? ` (${c.venueName})` : ""}</td>
                  <td><a href={`mailto:${c.email}`}>{c.email}</a></td>
                  <td>{c.sector}</td>
                  <td>{c.sequence}</td>
                  <td>{c.step}</td>
                  <td>
                    <span className={`admin-status is-${c.status}`}>{c.status}</span>
                  </td>
                  <td>{formatDate(c.lastSentAt || c.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
