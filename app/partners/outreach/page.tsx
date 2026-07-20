"use client";
import { useState } from "react";
import { getSectorLabel, type Sector } from "@/app/lib/outreach/content";

const SECTORS: Sector[] = ["coffeeshop", "social-club", "clinic", "cannabis", "stay", "eat"];

interface ContactRow {
  id: string;
  email: string;
  businessName: string;
  venueName?: string;
  sector: Sector;
  sequence: string;
  step: number;
  status: string;
  lastSentAt?: string;
  scheduledAt?: string;
}

export default function OutreachAdminPage() {
  const [adminSecret, setAdminSecret] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [venueName, setVenueName] = useState("");
  const [sector, setSector] = useState<Sector>("cannabis");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ ok?: boolean; error?: string; contactId?: string; nextDue?: string } | null>(null);
  const [contacts, setContacts] = useState<ContactRow[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(false);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/outreach/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": adminSecret,
        },
        body: JSON.stringify({ email, businessName, venueName, sector }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ error: "Network error" });
    } finally {
      setLoading(false);
    }
  }

  async function loadContacts() {
    setLoadingContacts(true);
    try {
      const res = await fetch("/api/outreach/contacts", {
        headers: { "x-admin-secret": adminSecret },
      });
      const data = await res.json();
      setContacts(data.contacts ?? []);
    } catch {
      setContacts([]);
    } finally {
      setLoadingContacts(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#f0ebe2", padding: "40px 24px", fontFamily: "monospace" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ fontSize: "9px", letterSpacing: "0.3em", color: "#84C51F", marginBottom: "8px" }}>
          XRED EYEZ — INTERNAL
        </div>
        <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "40px", lineHeight: 1 }}>
          Outreach Console
        </h1>

        {/* Admin secret */}
        <div style={{ marginBottom: "32px" }}>
          <label style={labelStyle}>Admin Secret</label>
          <input
            type="password"
            value={adminSecret}
            onChange={(e) => setAdminSecret(e.target.value)}
            placeholder="OUTREACH_ADMIN_SECRET"
            style={inputStyle}
          />
        </div>

        {/* Start outreach form */}
        <div style={cardStyle}>
          <div style={eyebrowStyle}>START OUTREACH SEQUENCE</div>
          <form onSubmit={handleSend} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={labelStyle}>Business email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="owner@venue.com"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Business name *</label>
              <input
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
                placeholder="The Greenhouse Café"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Venue name (if listed)</label>
              <input
                value={venueName}
                onChange={(e) => setVenueName(e.target.value)}
                placeholder="Optional — matches platform listing"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Sector *</label>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value as Sector)}
                style={inputStyle}
              >
                {SECTORS.map((s) => (
                  <option key={s} value={s}>{getSectorLabel(s)}</option>
                ))}
              </select>
            </div>
            <button type="submit" disabled={loading} style={btnStyle}>
              {loading ? "Sending…" : "Send Cold Email 1 + Schedule Sequence"}
            </button>
          </form>

          {result && (
            <div style={{
              marginTop: "16px",
              padding: "12px 16px",
              borderRadius: "4px",
              background: result.ok ? "rgba(132,197,31,0.1)" : "rgba(255,50,50,0.1)",
              border: `1px solid ${result.ok ? "#84C51F" : "#ff3232"}`,
              fontSize: "12px",
            }}>
              {result.ok
                ? `✓ Sent. Contact ID: ${result.contactId} · Next email due: ${result.nextDue ? new Date(result.nextDue).toLocaleDateString() : "—"}`
                : `✗ ${result.error}`}
            </div>
          )}
        </div>

        {/* Contact list */}
        <div style={{ ...cardStyle, marginTop: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div style={eyebrowStyle}>CONTACT LIST</div>
            <button onClick={loadContacts} disabled={loadingContacts} style={{ ...btnStyle, padding: "8px 16px", fontSize: "11px" }}>
              {loadingContacts ? "Loading…" : "Refresh"}
            </button>
          </div>

          {contacts.length === 0 ? (
            <div style={{ fontSize: "12px", color: "rgba(240,235,226,0.35)" }}>
              No contacts loaded. Hit Refresh to load.
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
              <thead>
                <tr>
                  {["Email", "Business", "Sector", "Sequence", "Step", "Status", "Next Due"].map((h) => (
                    <th key={h} style={{ textAlign: "left", padding: "6px 8px", borderBottom: "1px solid rgba(255,255,255,0.08)", color: "rgba(240,235,226,0.4)", fontWeight: 600, fontSize: "9px", letterSpacing: "0.1em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <td style={tdStyle}>{c.email}</td>
                    <td style={tdStyle}>{c.businessName}</td>
                    <td style={tdStyle}>{c.sector}</td>
                    <td style={tdStyle}>{c.sequence}</td>
                    <td style={tdStyle}>{c.step}</td>
                    <td style={{ ...tdStyle, color: c.status === "active" ? "#84C51F" : "rgba(240,235,226,0.4)" }}>{c.status}</td>
                    <td style={tdStyle}>{c.scheduledAt ? new Date(c.scheduledAt).toLocaleDateString() : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div style={{ marginTop: "24px", fontSize: "11px", color: "rgba(240,235,226,0.25)", lineHeight: 1.8 }}>
          Cron runs daily at 08:00 UTC · Sequences: Cold (day 0, 3, 7) → Nurture (day 0, 3 after &quot;more info&quot; click)
        </div>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "9px",
  letterSpacing: "0.2em",
  color: "rgba(240,235,226,0.4)",
  marginBottom: "6px",
  textTransform: "uppercase",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "4px",
  color: "#f0ebe2",
  padding: "10px 12px",
  fontSize: "13px",
  boxSizing: "border-box",
};

const cardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "8px",
  padding: "24px",
};

const eyebrowStyle: React.CSSProperties = {
  fontSize: "9px",
  letterSpacing: "0.25em",
  color: "#84C51F",
  marginBottom: "20px",
};

const btnStyle: React.CSSProperties = {
  background: "#84C51F",
  color: "#0a0a0a",
  border: "none",
  borderRadius: "4px",
  padding: "12px 20px",
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.06em",
  cursor: "pointer",
};

const tdStyle: React.CSSProperties = {
  padding: "8px 8px",
  color: "rgba(240,235,226,0.7)",
};
