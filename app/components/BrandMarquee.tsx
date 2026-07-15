import type { Venue } from "../data/platform";

/**
 * Partner brand marquee — the scrolling neon ticker band on premium
 * partner brand rooms. Content comes straight from the venue's own
 * verified highlights, colour from their brand accent. Pure CSS
 * animation; respects prefers-reduced-motion.
 */
export default function BrandMarquee({
  venue,
  reverse = false,
}: {
  venue: Venue;
  reverse?: boolean;
}) {
  const accent = venue.brand?.accentColor || "#E23438";
  const items = [
    ...(venue.brand?.tagline ? venue.brand.tagline.split(". ").map((t) => t.replace(/\.$/, "")) : []),
    ...venue.highlights,
  ]
    .filter(Boolean)
    .slice(0, 7)
    .map((t) => t.toUpperCase());

  if (items.length === 0) return null;

  const row = items.map((item, i) => (
    <span className="brand-marquee-item" key={i}>
      {item}
      <span className="brand-marquee-glyph" aria-hidden>✦</span>
    </span>
  ));

  return (
    <div
      className={`brand-marquee${reverse ? " is-reverse" : ""}`}
      style={{ "--marquee-accent": accent } as React.CSSProperties}
      aria-hidden
    >
      <div className="brand-marquee-track">
        <div className="brand-marquee-row">{row}</div>
        <div className="brand-marquee-row">{row}</div>
      </div>
    </div>
  );
}
