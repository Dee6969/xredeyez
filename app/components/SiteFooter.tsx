import Link from "next/link";

const legalLinks = [
  ["Privacy", "/privacy"],
  ["Cookies", "/cookies"],
  ["Terms", "/terms"],
  ["Accessibility", "/accessibility"],
  ["Contact", "/contact"],
];

const discoverLinks = [
  ["Explore", "/explore"],
  ["Cities", "/cities"],
  ["Map", "/cities/amsterdam/map"],
  ["Vibes", "/vibes"],
];

const platformLinks = [
  ["Premium", "/premium"],
  ["Signal", "/signal"],
  ["Partners", "/partners"],
  ["Vault", "/vault"],
];

export default function SiteFooter() {
  return (
    <footer
      style={{
        background: "var(--bg-dark)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "72px 24px 48px",
      }}
    >
      <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
        {/* Top */}
        <div
          style={{
            display: "grid",
            gap: "48px",
            paddingBottom: "48px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "40px",
            }}
          >
            {/* Brand */}
            <div>
              <div
                style={{
                  fontFamily: "var(--font-playfair, Georgia, serif)",
                  fontSize: "22px",
                  fontWeight: "700",
                  letterSpacing: "-0.01em",
                  display: "flex",
                  alignItems: "baseline",
                  gap: "1px",
                }}
              >
                <span style={{ color: "var(--text-inverse)" }}>XRED </span>
                <span style={{ color: "#84C51F" }}>EYEZ</span>
              </div>
              <div
                style={{
                  marginTop: "6px",
                  fontFamily: "'Courier New', monospace",
                  fontSize: "9px",
                  letterSpacing: "0.22em",
                  color: "#84C51F",
                  opacity: 0.6,
                  textTransform: "uppercase",
                }}
              >
                Powered by hemp
              </div>
              <p
                style={{
                  marginTop: "16px",
                  color: "rgba(245,240,230,0.44)",
                  fontSize: "14px",
                  lineHeight: "1.65",
                  maxWidth: "260px",
                }}
              >
                Premium cannabis culture discovery. Find cities, venues, vibes, and routes.
              </p>
            </div>

            {/* Link columns */}
            <div style={{ display: "flex", gap: "48px", flexWrap: "wrap" }}>
              <div>
                <div
                  style={{
                    color: "rgba(245,240,230,0.24)",
                    fontFamily: "'Courier New', monospace",
                    fontSize: "9px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    marginBottom: "16px",
                  }}
                >
                  Discover
                </div>
                {discoverLinks.map(([label, href]) => (
                  <div key={href} style={{ marginBottom: "10px" }}>
                    <Link
                      href={href}
                      style={{
                        color: "rgba(245,240,230,0.48)",
                        fontSize: "14px",
                        textDecoration: "none",
                        fontWeight: "500",
                        transition: "color 200ms ease",
                      }}
                    >
                      {label}
                    </Link>
                  </div>
                ))}
              </div>

              <div>
                <div
                  style={{
                    color: "rgba(245,240,230,0.24)",
                    fontFamily: "'Courier New', monospace",
                    fontSize: "9px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    marginBottom: "16px",
                  }}
                >
                  Platform
                </div>
                {platformLinks.map(([label, href]) => (
                  <div key={href} style={{ marginBottom: "10px" }}>
                    <Link
                      href={href}
                      style={{
                        color: "rgba(245,240,230,0.48)",
                        fontSize: "14px",
                        textDecoration: "none",
                        fontWeight: "500",
                        transition: "color 200ms ease",
                      }}
                    >
                      {label}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            paddingTop: "28px",
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {legalLinks.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                style={{
                  color: "rgba(245,240,230,0.26)",
                  fontSize: "12px",
                  textDecoration: "none",
                  fontWeight: "500",
                  fontFamily: "'Courier New', monospace",
                  letterSpacing: "0.06em",
                }}
              >
                {label}
              </Link>
            ))}
          </div>
          <div
            style={{
              color: "rgba(245,240,230,0.18)",
              fontSize: "11px",
              fontFamily: "'Courier New', monospace",
              letterSpacing: "0.1em",
            }}
          >
            © XRED EYEZ 2026 · redeyez.co.uk · <span style={{ color: "#84C51F", opacity: 0.7 }}>Powered by Hemp</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
