"use client";
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
  ["Map", "/map"],
  ["Saved Places", "/saved"],
];

const platformLinks = [
  ["List Your Business", "/partners/list"],
  ["Premium", "/premium"],
  ["Signal", "/signal"],
  ["Merch", "/shop"],
  ["Vault", "/vault"],
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/xredeyez",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: "X / Twitter",
    href: "https://x.com/xredeyez",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.626L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@xredeyez",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34l-.03-8.26a8.17 8.17 0 0 0 4.78 1.52V5.13a4.85 4.85 0 0 1-1-.44z"/>
      </svg>
    ),
  },
];

export default function SiteFooter() {
  return (
    <footer
      style={{
        background: "var(--bg-dark)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Top bar — brand + tagline + social */}
      <div
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "48px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "28px",
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-playfair, Georgia, serif)",
                fontSize: "24px",
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
                marginTop: "4px",
                fontFamily: "'Courier New', monospace",
                fontSize: "9px",
                letterSpacing: "0.26em",
                color: "#84C51F",
                opacity: 0.56,
                textTransform: "uppercase",
              }}
            >
              Powered by hemp
            </div>
          </div>

          {/* Social icons */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {socialLinks.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(245,240,230,0.38)",
                  textDecoration: "none",
                  transition: "color 200ms ease, background 200ms ease, border-color 200ms ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "rgba(245,240,230,0.88)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.borderColor = "rgba(132,197,31,0.32)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(245,240,230,0.38)";
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main links grid */}
      <div style={{ padding: "56px 24px 48px" }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "40px",
              paddingBottom: "48px",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {/* Description */}
            <p
              style={{
                color: "rgba(245,240,230,0.38)",
                fontSize: "14px",
                lineHeight: "1.72",
                maxWidth: "280px",
              }}
            >
              Premium cannabis culture discovery. Find cities, venues, vibes, and curated routes built for culture.
            </p>

            {/* Link columns */}
            <div style={{ display: "flex", gap: "56px", flexWrap: "wrap" }}>
              <div>
                <div
                  style={{
                    color: "rgba(245,240,230,0.22)",
                    fontFamily: "'Courier New', monospace",
                    fontSize: "9px",
                    letterSpacing: "0.20em",
                    textTransform: "uppercase",
                    marginBottom: "18px",
                  }}
                >
                  Discover
                </div>
                {discoverLinks.map(([label, href]) => (
                  <div key={href} style={{ marginBottom: "12px" }}>
                    <Link
                      href={href}
                      style={{
                        color: "rgba(245,240,230,0.44)",
                        fontSize: "14px",
                        textDecoration: "none",
                        fontWeight: "500",
                        transition: "color 200ms ease",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(245,240,230,0.82)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(245,240,230,0.44)"; }}
                    >
                      {label}
                    </Link>
                  </div>
                ))}
              </div>

              <div>
                <div
                  style={{
                    color: "rgba(245,240,230,0.22)",
                    fontFamily: "'Courier New', monospace",
                    fontSize: "9px",
                    letterSpacing: "0.20em",
                    textTransform: "uppercase",
                    marginBottom: "18px",
                  }}
                >
                  Platform
                </div>
                {platformLinks.map(([label, href]) => (
                  <div key={href} style={{ marginBottom: "12px" }}>
                    <Link
                      href={href}
                      style={{
                        color: "rgba(245,240,230,0.44)",
                        fontSize: "14px",
                        textDecoration: "none",
                        fontWeight: "500",
                        transition: "color 200ms ease",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(245,240,230,0.82)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(245,240,230,0.44)"; }}
                    >
                      {label}
                    </Link>
                  </div>
                ))}
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
                    color: "rgba(245,240,230,0.22)",
                    fontSize: "11px",
                    textDecoration: "none",
                    fontWeight: "500",
                    fontFamily: "'Courier New', monospace",
                    letterSpacing: "0.07em",
                    transition: "color 200ms ease",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(245,240,230,0.54)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(245,240,230,0.22)"; }}
                >
                  {label}
                </Link>
              ))}
            </div>
            <div
              style={{
                color: "rgba(245,240,230,0.16)",
                fontSize: "11px",
                fontFamily: "'Courier New', monospace",
                letterSpacing: "0.10em",
              }}
            >
              © XRED EYEZ 2026 ·{" "}
              <span style={{ color: "#84C51F", opacity: 0.56 }}>Powered by Hemp</span>
            </div>
          </div>

          <div
            style={{
              paddingTop: "18px",
              color: "rgba(245,240,230,0.30)",
              fontSize: "11.5px",
              lineHeight: 1.7,
              maxWidth: "760px",
            }}
          >
            For adults. Editorial guide only — cannabis laws vary by country and region; always check
            current local rules and only visit venues operating lawfully. XRED EYEZ does not sell cannabis,
            facilitate purchases, or provide consumption or medical advice. Travel respectfully.
          </div>
        </div>
      </div>
    </footer>
  );
}
