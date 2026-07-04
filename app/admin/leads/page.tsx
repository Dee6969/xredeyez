import { isAdminAuthed } from "../../lib/adminAuth";
import { formatAdminDate, readLeadRecords, type PartnerLead } from "../../lib/adminData";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key } = await searchParams;
  if (!(await isAdminAuthed(key))) return null;

  const leads = await readLeadRecords<PartnerLead>("leads/partner/", 200);

  return (
    <>
      <header className="adm-page-head">
        <div>
          <h1>Partner leads</h1>
          <p className="adm-page-sub">
            {leads.length} enquiries · captured from the claim form, redundantly stored.
          </p>
        </div>
      </header>

      {leads.length === 0 ? (
        <div className="adm-empty">
          <strong>No enquiries yet.</strong>
          <p>They land here the moment a business submits the claim form on the live site.</p>
        </div>
      ) : (
        <div className="adm-panel adm-panel-flush">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Received</th>
                <th>Business</th>
                <th>Contact</th>
                <th>Package</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.pathname}>
                  <td className="adm-cell-time">{formatAdminDate(lead.submittedAt)}</td>
                  <td>
                    <strong className="adm-cell-primary">{lead.businessName || "—"}</strong>
                    {lead.venue && <span className="adm-cell-sub">listing: {lead.venue}</span>}
                    {lead.message && (
                      <details className="adm-cell-details">
                        <summary>Message</summary>
                        <p>{lead.message}</p>
                      </details>
                    )}
                  </td>
                  <td>
                    <span className="adm-cell-primary">{lead.contactName || "—"}</span>
                    {lead.email && (
                      <a className="adm-cell-link" href={`mailto:${lead.email}`}>{lead.email}</a>
                    )}
                    {lead.phone && <span className="adm-cell-sub">{lead.phone}</span>}
                  </td>
                  <td>
                    {lead.packageId ? (
                      <span className="adm-pill is-gold">{lead.packageId}</span>
                    ) : (
                      <span className="adm-cell-sub">—</span>
                    )}
                  </td>
                  <td className="adm-cell-sub">{lead.sourcePage || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
