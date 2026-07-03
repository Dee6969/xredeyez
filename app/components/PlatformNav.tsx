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
    label: "Saved",
    href: "/saved",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
  {
    label: "Book",
    href: "/cities",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    label: "Profile",
    href: "/profile",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
];

const desktopItems = [
  { label: "Explore", href: "/explore" },
  { label: "Cities", href: "/cities" },
  { label: "Guides", href: "/guides" },
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

      {/* Mobile bottom nav — 5 items */}
      <nav className="platform-bottom-nav" aria-label="Mobile navigation">
        {mobileNavItems.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`platform-bottom-item${active ? " is-active" : ""}`}
              aria-current={active ? "page" : undefined}
            >
              <span style={{ position: "relative", color: active ? "var(--accent-red)" : "var(--text-muted)", transition: "color 200ms ease" }}>
                {item.icon}
              </span>
              {item.label}
              <span className="platform-bottom-dot" />
            </Link>
          );
        })}
      </nav>
    </>
  );
}
