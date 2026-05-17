"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Explore", href: "/explore" },
  { label: "Cities", href: "/cities" },
  { label: "Map", href: "/cities/amsterdam/map" },
  { label: "Saved", href: "/saved" },
  { label: "Signal", href: "/signal" },
];

const desktopItems = [
  { label: "Explore", href: "/explore" },
  { label: "Cities", href: "/cities" },
  { label: "Map", href: "/cities/amsterdam/map" },
  { label: "Signal", href: "/signal" },
  { label: "Profile", href: "/profile" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/explore") return pathname === "/explore";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const icons: Record<string, React.ReactNode> = {
  Explore: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  ),
  Cities: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18M9 21V7l6-4v18M9 7H5a2 2 0 0 0-2 2v12M15 21V11h4v10"/>
    </svg>
  ),
  Map: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
      <line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/>
    </svg>
  ),
  Saved: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  Signal: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  ),
};

export default function PlatformNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [heroNav, setHeroNav] = useState(isHome);

  useEffect(() => {
    if (!isHome) { setHeroNav(false); return; }
    const threshold = window.innerHeight * 0.72;
    const onScroll = () => setHeroNav(window.scrollY < threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  return (
    <>
      {/* Desktop top bar */}
      <nav className={`platform-top-nav${heroNav ? " is-hero" : ""}`} aria-label="Primary navigation">
        <Link href="/" className="platform-brand">
          XRED EYEZ
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

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/premium" className="platform-secondary-action" style={{ minHeight: "38px", padding: "9px 20px", fontSize: "13px" }}>
            Premium
          </Link>
        </div>
      </nav>

      {/* Mobile bottom nav */}
      <nav className="platform-bottom-nav" aria-label="Mobile navigation">
        {navItems.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`platform-bottom-item${active ? " is-active" : ""}`}
            >
              <span style={{ color: active ? "var(--accent-red)" : "var(--text-muted)", transition: "color 200ms ease" }}>
                {icons[item.label]}
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
