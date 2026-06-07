"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type SlimVenue = { id: string; name: string; city: string; neighborhood: string; slug: string };
type SlimCity = { id: string; name: string; country: string; slug: string };
type SlimVibe = { id: string; name: string; slug: string };

interface SavedListProps {
  venues: SlimVenue[];
  cities: SlimCity[];
  vibes: SlimVibe[];
}

const storageKey = "xred-saved-items";

function readSaved() {
  try {
    return JSON.parse(window.localStorage.getItem(storageKey) || "[]") as string[];
  } catch {
    return [];
  }
}

export default function SavedList({ venues, cities, vibes }: SavedListProps) {
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    const update = () => setSaved(readSaved());
    update();
    window.addEventListener("xred-saved-change", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("xred-saved-change", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  const items = useMemo(() => {
    return saved.map((key) => {
      const [type, id] = key.split(":");
      if (type === "venue") {
        const venue = venues.find((item) => item.id === id);
        if (!venue) return null;
        return { key, type, title: venue.name, meta: `${venue.city} / ${venue.neighborhood}`, href: `/venues/${venue.slug}` };
      }
      if (type === "city") {
        const city = cities.find((item) => item.id === id);
        if (!city) return null;
        return { key, type, title: city.name, meta: city.country, href: `/cities/${city.slug}` };
      }
      if (type === "vibe") {
        const vibe = vibes.find((item) => item.id === id);
        if (!vibe) return null;
        return { key, type, title: vibe.name, meta: "Vibe", href: `/vibes?vibe=${vibe.id}` };
      }
      return null;
    }).filter(Boolean) as { key: string; type: string; title: string; meta: string; href: string }[];
  }, [saved]);

  const clear = (key: string) => {
    const next = saved.filter((item) => item !== key);
    window.localStorage.setItem(storageKey, JSON.stringify(next));
    setSaved(next);
  };

  if (!items.length) {
    return (
      <div className="platform-panel">
        <div className="eyebrow">EMPTY BOARD</div>
        <h2 className="mt-4 font-display text-[36px] leading-none text-[var(--bone)]">Start building your map.</h2>
        <p className="mt-5 max-w-2xl text-[16px] leading-7 text-white/60">
          Save venues, cities, and vibes as you explore. Your board stays on this device for now; profile sync comes later.
        </p>
        <div className="platform-action-row">
          <Link href="/explore" data-hover className="platform-primary-action">
            Explore Now
          </Link>
          <Link href="/cities/amsterdam/map" data-hover className="platform-secondary-action">
            Amsterdam Map
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <article key={item.key} className="platform-card flex items-center justify-between gap-4 p-5">
          <Link href={item.href} data-hover style={{ textDecoration: "none" }}>
            <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/35">{item.type} / {item.meta}</div>
            <h2 className="mt-2 font-display text-[28px] leading-none text-[var(--bone)]">{item.title}</h2>
          </Link>
          <button type="button" data-hover className="save-button is-saved" onClick={() => clear(item.key)}>
            Remove
          </button>
        </article>
      ))}
    </div>
  );
}
