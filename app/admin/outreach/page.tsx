import { isAdminAuthed } from "../../lib/adminAuth";
import { formatAdminDate } from "../../lib/adminData";
import { readContacts } from "../../lib/outreach/store";

export const dynamic = "force-dynamic";

export default async function AdminOutreachPage() {
  if (!(await isAdminAuthed())) return null;

  const contacts = await readContacts().catch(() => []);
  const active = contacts.filter((c) => c.status === "active").length;
  const complete = contacts.filter((c) => c.status === "complete").length;
  const unsubscribed = contacts.filter((c) => c.status === "unsubscribed").length;
  const sorted = [...contacts].sort((a, b) => (b.lastSentAt || b.createdAt).localeCompare(a.lastSentAt || a.createdAt));

  return (
    <>
      <header className="adm-page-head">
        <div>
          <h1>Outreach pipeline</h1>
          <p className="adm-page-sub">
            {contacts.length} contacts · daily cron at 08:00 · sequences via Resend.
          </p>
        </div>
        <div className="adm-head-pills">
          <span className="adm-pill is-green">{active} active</span>
          <span className="adm-pill">{complete} complete</span>
          <span className="adm-pill is-red">{unsubscribed} unsubscribed</span>
        </div>
      </header>

      {contacts.length === 0 ? (
        <div className="adm-empty">
          <strong>No outreach contacts.</strong>
          <p>Contacts appear once added to the outreach store.</p>
        </div>
      ) : (
        <div className="adm-panel adm-panel-flush">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Business</th>
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
                  <td>
                    <strong className="adm-cell-primary">{c.businessName}</strong>
                    <a className="adm-cell-link" href={`mailto:${c.email}`}>{c.email}</a>
                  </td>
                  <td className="adm-cell-sub">{c.sector}</td>
                  <td className="adm-cell-sub">{c.sequence}</td>
                  <td className="adm-cell-time">{c.step}</td>
                  <td>
                    <span className={`adm-pill${c.status === "active" ? " is-green" : c.status === "unsubscribed" ? " is-red" : ""}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="adm-cell-time">{formatAdminDate(c.lastSentAt || c.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
