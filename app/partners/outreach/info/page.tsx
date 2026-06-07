import Link from "next/link";

export const metadata = {
  title: "XRED EYEZ Partner Package",
  description: "Everything included in the XRED EYEZ featured listing uplift package.",
};

export default function OutreachInfoPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#0a0a0a", color: "#f0ebe2", padding: "64px 24px", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: "640px", margin: "0 auto" }}>
        <div style={{ fontSize: "9px", letterSpacing: "0.3em", color: "#84C51F", marginBottom: "12px" }}>
          XRED EYEZ — PARTNER PACKAGE
        </div>

        <h1 style={{ fontSize: "clamp(32px, 6vw, 52px)", fontWeight: 700, lineHeight: 1.1, marginBottom: "32px" }}>
          Everything in the<br />Featured Listing Package
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "40px" }}>
          {[
            ["Premium map pin", "Your venue pinned above free listings on the city map — the first thing every visitor sees."],
            ["City guide placement", "Featured in the curated city guide with full description, highlights, and atmosphere tags."],
            ["Booking / referral CTA", "A direct link from your listing to your booking page or website, tracked monthly."],
            ["Vibe matching", "Tagged with the exact vibes your customers search for: lounge, social, late-night, and more."],
            ["Cross-recommendation", "Shown alongside complementary venues in routes, guides, and city plans."],
            ["Monthly visibility report", "See how many visitors viewed, clicked, and navigated to your venue each month."],
            ["Partner dashboard (Q3 2025)", "Manage photos, update details, and track performance directly."],
          ].map(([title, desc]) => (
            <div key={title} style={{ padding: "16px 20px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "6px" }}>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#f0ebe2", marginBottom: "4px" }}>{title}</div>
              <div style={{ fontSize: "13px", color: "rgba(240,235,226,0.6)", lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ padding: "24px", background: "rgba(132,197,31,0.08)", border: "1px solid rgba(132,197,31,0.25)", borderRadius: "8px", marginBottom: "32px" }}>
          <div style={{ fontSize: "28px", fontWeight: 700, color: "#84C51F" }}>£49 / month</div>
          <div style={{ fontSize: "13px", color: "rgba(240,235,226,0.6)", marginTop: "4px" }}>Cancel any time. No setup fees. Live within 24 hours.</div>
        </div>

        <Link
          href="/api/outreach/stripe-checkout"
          style={{
            display: "inline-block",
            background: "#84C51F",
            color: "#0a0a0a",
            fontWeight: 700,
            fontSize: "14px",
            letterSpacing: "0.06em",
            padding: "16px 32px",
            borderRadius: "4px",
            textDecoration: "none",
            marginBottom: "16px",
          }}
        >
          Complete Setup — £49/month
        </Link>

        <div style={{ marginTop: "24px", fontSize: "13px", color: "rgba(240,235,226,0.4)" }}>
          Questions? Email us at{" "}
          <a href="mailto:partners@redeyez.co.uk" style={{ color: "#84C51F" }}>
            partners@redeyez.co.uk
          </a>
        </div>
      </div>
    </main>
  );
}
