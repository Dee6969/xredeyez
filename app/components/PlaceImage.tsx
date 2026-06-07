"use client";
import { useState } from "react";
import Image from "next/image";

const CONFIGS: Record<string, { label: string; bg: string; accent: string; symbol: string }> = {
  "coffeeshop":    { label: "Coffeeshop",    bg: "#111d08", accent: "#84C51F", symbol: "◉" },
  "cannabis":      { label: "Cannabis",      bg: "#111d08", accent: "#84C51F", symbol: "◉" },
  "dispensary":    { label: "Dispensary",    bg: "#111d08", accent: "#84C51F", symbol: "◉" },
  "social club":   { label: "Social Club",   bg: "#0d0d1e", accent: "#8B5CF6", symbol: "◎" },
  "club":          { label: "Club",          bg: "#0d0d1e", accent: "#8B5CF6", symbol: "◎" },
  "lounge":        { label: "Lounge",        bg: "#0e0e18", accent: "#A78BFA", symbol: "◈" },
  "bar":           { label: "Bar",           bg: "#0e0e18", accent: "#A78BFA", symbol: "◈" },
  "hotel":         { label: "Hotel",         bg: "#1a1610", accent: "#B8A07A", symbol: "◆" },
  "boutique":      { label: "Boutique Stay", bg: "#1a1610", accent: "#B8A07A", symbol: "◆" },
  "hostel":        { label: "Hostel",        bg: "#1a1610", accent: "#B8A07A", symbol: "◆" },
  "apartment":     { label: "Apartment",     bg: "#1a1610", accent: "#B8A07A", symbol: "◆" },
  "restaurant":    { label: "Restaurant",    bg: "#1e1208", accent: "#D97706", symbol: "○" },
  "café":          { label: "Café",          bg: "#1e1208", accent: "#D97706", symbol: "○" },
  "cafe":          { label: "Café",          bg: "#1e1208", accent: "#D97706", symbol: "○" },
  "brunch":        { label: "Brunch Spot",   bg: "#1e1208", accent: "#D97706", symbol: "○" },
  "wellness":      { label: "Wellness",      bg: "#0e1810", accent: "#34D399", symbol: "◉" },
  "spa":           { label: "Spa",           bg: "#0e1810", accent: "#34D399", symbol: "◉" },
  "market":        { label: "Market Guide",  bg: "#101618", accent: "#38BDF8", symbol: "✦" },
  "event":         { label: "Event Space",   bg: "#18100e", accent: "#F59E0B", symbol: "◐" },
  "gallery":       { label: "Gallery",       bg: "#160e18", accent: "#EC4899", symbol: "□" },
  "experience":    { label: "Experience",    bg: "#141018", accent: "#818CF8", symbol: "◌" },
};

function resolveConfig(type: string) {
  const t = (type || "").toLowerCase();
  for (const [key, val] of Object.entries(CONFIGS)) {
    if (t === key || t.startsWith(key) || t.includes(key)) return val;
  }
  return { label: "Venue", bg: "#18160f", accent: "#9E8B6A", symbol: "◈" };
}

interface PlaceImageProps {
  src?: string | null;
  alt: string;
  category?: string;
  name?: string;
  city?: string;
  className?: string;
  sizes?: string;
  fill?: boolean;
  priority?: boolean;
  style?: React.CSSProperties;
}

export default function PlaceImage({
  src,
  alt,
  category = "",
  name,
  city,
  className = "",
  sizes,
  fill = true,
  priority = false,
  style,
}: PlaceImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const cfg = resolveConfig(category);
  const showFallback = !src || hasError;

  return (
    <div className={`pi-root${className ? " " + className : ""}`} style={style}>
      {showFallback ? (
        <div
          className="pi-fallback"
          style={{ background: cfg.bg }}
          role="img"
          aria-label={alt || name || category || "Venue image"}
        >
          <div className="pi-fallback-noise" aria-hidden="true" />
          <div className="pi-fallback-grid" aria-hidden="true" />
          <div
            className="pi-fallback-glow"
            aria-hidden="true"
            style={{ background: `radial-gradient(ellipse at 30% 60%, ${cfg.accent}22 0%, transparent 65%)` }}
          />
          <div className="pi-fallback-content">
            <span className="pi-fallback-symbol" style={{ color: cfg.accent }} aria-hidden="true">
              {cfg.symbol}
            </span>
            <div className="pi-fallback-text">
              <span className="pi-fallback-label" style={{ color: cfg.accent }}>{cfg.label}</span>
              {name && <strong className="pi-fallback-name">{name}</strong>}
              {city && <span className="pi-fallback-city">{city}</span>}
            </div>
          </div>
        </div>
      ) : (
        <>
          {!loaded && <div className="pi-skeleton" aria-hidden="true" />}
          <Image
            src={src!}
            alt={alt}
            fill={fill}
            sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
            priority={priority}
            className={`pi-photo${loaded ? " is-loaded" : ""}`}
            style={{ objectFit: "cover" }}
            onLoad={() => setLoaded(true)}
            onError={() => setHasError(true)}
          />
        </>
      )}
    </div>
  );
}
