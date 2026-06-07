import Link from "next/link";

export const metadata = {
  title: "Welcome to XRED EYEZ Partners",
  description: "Your featured listing is being set up.",
};

export default function OutreachSuccessPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#0a0a0a", color: "#f0ebe2", padding: "64px 24px", fontFamily: "sans-serif", display: "flex", alignItems: "center" }}>
      <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: "48px", marginBottom: "24px" }}>✓</div>
        <div style={{ fontSize: "9px", letterSpacing: "0.3em", color: "#84C51F", marginBottom: "12px" }}>
          XRED EYEZ PARTNERS
        </div>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 700, lineHeight: 1.1, marginBottom: "20px" }}>
          You&apos;re on the map.
        </h1>
        <p style={{ fontSize: "15px", color: "rgba(240,235,226,0.65)", lineHeight: 1.7, marginBottom: "32px" }}>
          Your featured listing will be live within 24 hours. A confirmation has been sent to your email.
          We&apos;ll be in touch to confirm your map pin placement and guide entry.
        </p>
        <Link href="/" style={{ color: "#84C51F", fontSize: "13px", textDecoration: "underline" }}>
          Back to XRED EYEZ →
        </Link>
      </div>
    </main>
  );
}
