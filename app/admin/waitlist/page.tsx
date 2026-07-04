import { isAdminAuthed } from "../../lib/adminAuth";
import { formatAdminDate, readLeadRecords, type WaitlistEntry } from "../../lib/adminData";

export const dynamic = "force-dynamic";

export default async function AdminWaitlistPage() {
  if (!(await isAdminAuthed())) return null;

  const entries = await readLeadRecords<WaitlistEntry>("leads/waitlist/", 1000);
  const unique = [...new Map(entries.map((e) => [e.email, e])).values()].filter((e) => e.email);

  return (
    <>
      <header className="adm-page-head">
        <div>
          <h1>Premium waitlist</h1>
          <p className="adm-page-sub">
            {unique.length} unique emails · these people get the founding rate when Premium launches.
          </p>
        </div>
      </header>

      {unique.length === 0 ? (
        <div className="adm-empty">
          <strong>No waitlist entries yet.</strong>
          <p>Signups from the Vault and Premium pages appear here.</p>
        </div>
      ) : (
        <>
          <div className="adm-panel">
            <div className="adm-panel-head">
              <h2>Export</h2>
              <span className="adm-panel-note">Copy straight into your email tool</span>
            </div>
            <textarea
              className="adm-export-box"
              readOnly
              rows={Math.min(unique.length + 1, 10)}
              defaultValue={unique.map((e) => e.email).join("\n")}
            />
          </div>

          <div className="adm-panel adm-panel-flush">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Joined</th>
                  <th>Email</th>
                  <th>Source</th>
                </tr>
              </thead>
              <tbody>
                {unique.map((entry) => (
                  <tr key={entry.pathname}>
                    <td className="adm-cell-time">{formatAdminDate(entry.submittedAt)}</td>
                    <td>
                      <a className="adm-cell-link" href={`mailto:${entry.email}`}>{entry.email}</a>
                    </td>
                    <td><span className="adm-pill">{entry.source || "unknown"}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
