export const metadata = {
  title: "Unsubscribed | XRED EYEZ",
};

export default function UnsubscribedPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#0a0a0a", color: "#f0ebe2", padding: "64px 24px", fontFamily: "sans-serif", display: "flex", alignItems: "center" }}>
      <div style={{ maxWidth: "480px", margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: "9px", letterSpacing: "0.3em", color: "rgba(240,235,226,0.3)", marginBottom: "12px" }}>
          XRED EYEZ
        </div>
        <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "16px" }}>Unsubscribed.</h1>
        <p style={{ fontSize: "14px", color: "rgba(240,235,226,0.5)", lineHeight: 1.7 }}>
          You won&apos;t receive any more outreach from us. If you change your mind, visit{" "}
          <a href="/partners/claim" style={{ color: "#84C51F" }}>redeyez.co.uk/partners/claim</a>.
        </p>
      </div>
    </main>
  );
}
