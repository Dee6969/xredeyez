"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import GlobalSearch from "./GlobalSearch";

const mobileNavItems = [
  {
    label: "Explore",
    href: "/explore",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
    ),
  },
  {
    label: "Map",
    href: "/map",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
        <line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/>
      </svg>
    ),
  },
  {
    label: "Cities",
    href: "/cities",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="4" y="8" width="5" height="12"/><rect x="10" y="4" width="5" height="16"/><rect x="16" y="10" width="5" height="10"/>
      </svg>
    ),
  },
  {
    label: "Medical",
    href: "/medical",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
      </svg>
    ),
  },
];

const moreSheetItems = [
  { label: "Guides", href: "/guides", note: "Long-form city intelligence" },
  { label: "Saved", href: "/saved", note: "Your saved venues & routes" },
  { label: "Profile", href: "/profile", note: "Your account" },
  { label: "List Your Business", href: "/partners/list", note: "From £9.99/month" },
  { label: "Premium", href: "/premium", note: "The traveller tier" },
];

const desktopItems = [
  { label: "Explore", href: "/explore" },
  { label: "Cities", href: "/cities" },
  { label: "Guides", href: "/guides" },
  { label: "Medical", href: "/medical" },
  { label: "Map", href: "/map" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/explore") return pathname === "/explore";
  if (href === "/map") return pathname === "/map" || pathname.endsWith("/map");
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function PlatformNav() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);
  const isHome = pathname === "/";
  const [heroNav, setHeroNav] = useState(true);
  const { itemCount, dispatch: cartDispatch } = useCart();

  useEffect(() => {
    if (!isHome) return;
    const threshold = window.innerHeight * 0.72;
    const onScroll = () => setHeroNav(window.scrollY < threshold);
    const frame = window.requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [isHome]);

  return (
    <>
      {/* Desktop top bar */}
      <nav className={`platform-top-nav${isHome && heroNav ? " is-hero" : ""}`} aria-label="Primary navigation">
        <Link href="/" className="platform-brand" aria-label="XRED EYEZ — home">
          <span className="platform-brand-xred">XRED </span>
          <span className="platform-brand-eyez">EYEZ</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {desktopItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`platform-nav-pill${isActive(pathname, item.href) ? " is-active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right side — search always visible, rest desktop-only */}
        <div className="platform-nav-right">
          <GlobalSearch />
          <div className="hidden items-center gap-2 md:flex">
            <Link href="/partners/list" className="platform-nav-pill platform-list-pill">
              List Your Business
            </Link>
            {(pathname?.startsWith("/shop") || itemCount > 0) && (
            <button
              onClick={() => cartDispatch({ type: "OPEN" })}
              aria-label={`Cart${itemCount > 0 ? ` (${itemCount} items)` : ""}`}
              className="platform-cart-btn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {itemCount > 0 && (
                <span className="platform-cart-count">{itemCount}</span>
              )}
            </button>
            )}
            <Link href="/premium" className="platform-secondary-action" style={{ minHeight: "38px", padding: "9px 20px", fontSize: "13px" }}>
              Premium
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile bottom nav — 4 destinations + More */}
      <nav className="platform-bottom-nav" aria-label="Mobile navigation">
        {mobileNavItems.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`platform-bottom-item${active ? " is-active" : ""}`}
              aria-current={active ? "page" : undefined}
              onClick={() => setMoreOpen(false)}
            >
              <span style={{ position: "relative", color: active ? "var(--accent-red)" : "var(--text-muted)", transition: "color 200ms ease" }}>
                {item.icon}
              </span>
              {item.label}
              <span className="platform-bottom-dot" />
            </Link>
          );
        })}
        <button
          type="button"
          className={`platform-bottom-item${moreOpen ? " is-active" : ""}`}
          aria-expanded={moreOpen}
          aria-controls="mobile-more-sheet"
          onClick={() => setMoreOpen((v) => !v)}
        >
          <span style={{ position: "relative", color: moreOpen ? "var(--accent-red)" : "var(--text-muted)", transition: "color 200ms ease" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
              <circle cx="5" cy="12" r="1.6" fill="currentColor" stroke="none"/>
              <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/>
              <circle cx="19" cy="12" r="1.6" fill="currentColor" stroke="none"/>
            </svg>
          </span>
          More
          <span className="platform-bottom-dot" />
        </button>
      </nav>

      {/* More sheet */}
      {moreOpen && (
        <div className="mobile-more-backdrop" onClick={() => setMoreOpen(false)} aria-hidden />
      )}
      <div
        id="mobile-more-sheet"
        className={`mobile-more-sheet${moreOpen ? " is-open" : ""}`}
        role="dialog"
        aria-label="More navigation"
      >
        <div className="mobile-more-grab" aria-hidden />
        {moreSheetItems.map((item) => (
          <Link key={item.href} href={item.href} className="mobile-more-link" onClick={() => setMoreOpen(false)}>
            <span>
              <strong>{item.label}</strong>
              <em>{item.note}</em>
            </span>
            <span aria-hidden>→</span>
          </Link>
        ))}
      </div>
    </>
  );
}
