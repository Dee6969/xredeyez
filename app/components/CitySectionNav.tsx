"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface CitySectionNavItem {
  id: string;
  label: string;
  href?: string;
}

export default function CitySectionNav({
  items,
  mapHref,
}: {
  items: CitySectionNavItem[];
  mapHref?: string;
}) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heroThreshold = window.innerHeight * 0.55;
    const onScroll = () => {
      setVisible(window.scrollY > heroThreshold);
      let current = items[0]?.id ?? "";
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top < 140) current = item.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  function jump(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 110;
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <nav
      className={`city-section-nav${visible ? " is-visible" : ""}`}
      aria-label="Jump to city section"
    >
      <div className="city-section-nav-inner">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`city-section-nav-link${active === item.id ? " is-active" : ""}`}
            onClick={() => jump(item.id)}
          >
            {item.label}
          </button>
        ))}
        {mapHref && (
          <Link href={mapHref} className="city-section-nav-link city-section-nav-map">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
              <line x1="9" y1="3" x2="9" y2="18" />
              <line x1="15" y1="6" x2="15" y2="21" />
            </svg>
            Map
          </Link>
        )}
      </div>
    </nav>
  );
}
