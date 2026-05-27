"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { useCart } from "../../components/CartContext";
import { PrintfulSyncProductDetail, PrintfulSyncVariant } from "../../lib/printful";

// ─── Color name → hex ────────────────────────────────────────────────────────
const COLOR_MAP: Record<string, string> = {
  black: "#1a1a1a", "vintage black": "#1e1c1c", "faded black": "#2a2828",
  "washed black": "#222020", "jet black": "#0d0d0d",
  white: "#f5f5f5", "off white": "#faf6ef", cream: "#fffdd0",
  grey: "#808080", gray: "#808080", "dark grey": "#4a4a4a",
  "heather grey": "#c0bdb8", "light grey": "#d1d1d1", charcoal: "#374151",
  navy: "#1b2a4a", "navy blue": "#1b2a4a", "dark navy": "#0f1d36",
  blue: "#1d3557", "royal blue": "#2147a8", "light blue": "#93c5fd",
  "sky blue": "#38bdf8", "steel blue": "#4682b4",
  red: "#cc2200", "dark red": "#8b1a1a", maroon: "#7f1d1d",
  green: "#2d6a4f", "forest green": "#2d5016", "military green": "#4a5240",
  olive: "#556b2f", "dark green": "#1a3a2a",
  pink: "#f4a0b5", "light pink": "#ffccd5", "hot pink": "#e91e8c",
  purple: "#6b21a8", "dark purple": "#3b0764", violet: "#7c3aed",
  yellow: "#fbbf24", "bright yellow": "#facc15",
  orange: "#ea580c", "burnt orange": "#c2410c",
  brown: "#78350f", tan: "#d4a853", sand: "#c2b280", caramel: "#b5651d",
  beige: "#f5f0e0", natural: "#f0ead6",
  mint: "#98e0c8", teal: "#0d9488", turquoise: "#0891b2",
  burgundy: "#800020", wine: "#722f37", rose: "#f43f5e",
};

function colorHex(name: string): string {
  return COLOR_MAP[name.toLowerCase().trim()] ?? "#c8c8c8";
}

function isLight(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 180;
}

// ─── Variant image ────────────────────────────────────────────────────────────
function getVariantImage(v: PrintfulSyncVariant): string {
  const preview = v.files?.find((f) => f.type === "preview");
  const def = v.files?.find((f) => f.type === "default");
  return (
    preview?.preview_url ??
    def?.preview_url ??
    v.product?.image ??
    ""
  );
}

// ─── Unique gallery images across all variants ────────────────────────────────
function buildGallery(variants: PrintfulSyncVariant[]): Array<{ url: string; label: string }> {
  const seen = new Set<string>();
  const gallery: Array<{ url: string; label: string }> = [];
  variants.forEach((v) => {
    const url = getVariantImage(v);
    if (url && !seen.has(url)) {
      seen.add(url);
      const colorOpt = v.options?.find((o) => o.id === "color");
      gallery.push({ url, label: colorOpt?.value ?? v.name });
    }
  });
  return gallery;
}

// ─── Group variants by option ─────────────────────────────────────────────────
function groupByOption(variants: PrintfulSyncVariant[], id: string): string[] {
  const seen = new Set<string>();
  variants.forEach((v) => {
    const opt = v.options?.find((o) => o.id === id);
    if (opt) seen.add(opt.value);
  });
  return Array.from(seen);
}

// ─── Size chart data ──────────────────────────────────────────────────────────
const SIZE_CHART = [
  { size: "XS",  chest: '31–33"',  length: '26"',  cm: "79–84" },
  { size: "S",   chest: '34–36"',  length: '27"',  cm: "86–91" },
  { size: "M",   chest: '38–40"',  length: '28"',  cm: "97–102" },
  { size: "L",   chest: '42–44"',  length: '29"',  cm: "107–112" },
  { size: "XL",  chest: '46–48"',  length: '30"',  cm: "117–122" },
  { size: "2XL", chest: '50–52"',  length: '31"',  cm: "127–132" },
  { size: "3XL", chest: '54–56"',  length: '32"',  cm: "137–142" },
];

// ─── Product description generator ───────────────────────────────────────────
function getDescription(name: string, productType: string): { tagline: string; bullets: string[] } {
  const n = (name + " " + productType).toLowerCase();

  if (n.includes("hoodie") || n.includes("sweatshirt")) {
    return {
      tagline: "Stay wrapped. Stay elevated.",
      bullets: [
        "Premium heavyweight fleece — 80% cotton, 20% polyester",
        "Double-layered hood with flat draw cord",
        "Relaxed, drop-shoulder silhouette. Runs oversized.",
      ],
    };
  }
  if (n.includes("tee") || n.includes("t-shirt") || n.includes("shirt")) {
    return {
      tagline: "Wear the culture. No explanation needed.",
      bullets: [
        "100% ring-spun cotton — soft from day one",
        "Pre-shrunk. True-to-size. Garment-dyed finish.",
        "Vibrant print. Made to order. Ships direct.",
      ],
    };
  }
  if (n.includes("cap") || n.includes("hat") || n.includes("beanie")) {
    return {
      tagline: "Top it off right.",
      bullets: [
        "One size, structured fit",
        "Embroidered or printed logo — crisp and durable",
        "Ships within 3–7 business days",
      ],
    };
  }
  if (n.includes("bag") || n.includes("tote") || n.includes("backpack")) {
    return {
      tagline: "Carry the vibe wherever you go.",
      bullets: [
        "Durable canvas or polyester construction",
        "Spacious main compartment",
        "Printed graphic — made to last",
      ],
    };
  }
  if (n.includes("phone") || n.includes("case")) {
    return {
      tagline: "Protect your device. Rep your culture.",
      bullets: [
        "Tough polycarbonate shell",
        "Slim profile. Full-wrap print.",
        "Available for all major phone models",
      ],
    };
  }
  return {
    tagline: "Premium drops for those who know.",
    bullets: [
      "Quality materials. Designed to last.",
      "Limited edition — print-on-demand only",
      "Ships worldwide within 5–10 business days",
    ],
  };
}

// ─── Quantity stepper ─────────────────────────────────────────────────────────
function QtyBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 40,
        height: 40,
        border: "1.5px solid var(--border-medium)",
        borderRadius: "8px",
        background: "var(--bg-card)",
        cursor: "pointer",
        fontSize: "18px",
        fontWeight: 500,
        lineHeight: 1,
        color: "var(--text-primary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {label}
    </button>
  );
}

// ─── Size guide modal ─────────────────────────────────────────────────────────
function SizeGuide({ onClose }: { onClose: () => void }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "rgba(24,22,15,0.7)",
        backdropFilter: "blur(6px)",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--bg-primary)",
          borderRadius: "20px",
          padding: "32px",
          maxWidth: "480px",
          width: "100%",
          boxShadow: "var(--shadow-float)",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <div>
            <span className="eyebrow" style={{ display: "block", marginBottom: "4px" }}>Fit Guide</span>
            <h3 className="font-display" style={{ fontSize: "22px" }}>Size Chart</h3>
          </div>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", lineHeight: 0, padding: "8px" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "20px", lineHeight: 1.6 }}>
          Measurements are in inches. Chest measured across the chest 1&quot; below armpit.
          When between sizes, size up for a more relaxed fit.
        </p>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border-medium)" }}>
                {["Size", "Chest", "Length", "Chest (cm)"].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "8px 12px", fontWeight: 700, color: "var(--text-secondary)", letterSpacing: "0.06em", fontSize: "11px", textTransform: "uppercase" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SIZE_CHART.map((row, i) => (
                <tr key={row.size} style={{ borderBottom: "1px solid var(--border-light)", background: i % 2 === 0 ? "transparent" : "var(--bg-secondary)" }}>
                  <td style={{ padding: "12px", fontWeight: 700 }}>{row.size}</td>
                  <td style={{ padding: "12px", color: "var(--text-secondary)" }}>{row.chest}</td>
                  <td style={{ padding: "12px", color: "var(--text-secondary)" }}>{row.length}</td>
                  <td style={{ padding: "12px", color: "var(--text-muted)" }}>{row.cm} cm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={{ marginTop: "20px", fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.6 }}>
          All garments are cut and sewn by Printful. Actual measurements may vary ±0.5&quot;.
        </p>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ProductClient({ product }: { product: PrintfulSyncProductDetail }) {
  const { dispatch } = useCart();
  const { sync_product, sync_variants } = product;

  const validVariants = sync_variants.filter((v) => v.synced);
  const gallery = useMemo(() => buildGallery(validVariants), [validVariants]);

  const hasColors = validVariants.some((v) => v.options?.some((o) => o.id === "color"));
  const hasSizes  = validVariants.some((v) => v.options?.some((o) => o.id === "size"));
  const colors    = groupByOption(validVariants, "color");
  const sizes     = groupByOption(validVariants, "size");

  const [selectedColor, setSelectedColor] = useState<string>(colors[0] ?? "");
  const [selectedSize,  setSelectedSize]  = useState<string>(sizes[0] ?? "");
  const [activeImage,   setActiveImage]   = useState<string>(gallery[0]?.url ?? sync_product.thumbnail_url);
  const [qty,           setQty]           = useState(1);
  const [added,         setAdded]         = useState(false);
  const [sizeGuide,     setSizeGuide]     = useState(false);

  const selectedVariant = useMemo(() =>
    validVariants.find((v) => {
      const colorOk = !hasColors || v.options?.some((o) => o.id === "color" && o.value === selectedColor);
      const sizeOk  = !hasSizes  || v.options?.some((o) => o.id === "size"  && o.value === selectedSize);
      return colorOk && sizeOk;
    }) ?? validVariants[0],
    [validVariants, hasColors, hasSizes, selectedColor, selectedSize]
  );

  const price    = selectedVariant ? parseFloat(selectedVariant.retail_price) : 0;
  const currency = selectedVariant?.currency ?? "GBP";
  const productType = validVariants[0]?.product?.name ?? "";
  const { tagline, bullets } = getDescription(sync_product.name, productType);

  function pickColor(color: string) {
    setSelectedColor(color);
    // Snap gallery to first image for this color
    const match = validVariants.find((v) =>
      v.options?.some((o) => o.id === "color" && o.value === color)
    );
    if (match) {
      const img = getVariantImage(match);
      if (img) setActiveImage(img);
    }
  }

  function handleAddToCart() {
    if (!selectedVariant) return;
    dispatch({
      type: "ADD_ITEM",
      item: {
        id: String(selectedVariant.id),
        productId: String(sync_product.id),
        name: sync_product.name,
        variantName: selectedVariant.name,
        price,
        currency,
        image: activeImage || sync_product.thumbnail_url,
        quantity: qty,
        printfulVariantId: selectedVariant.id,
      },
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  }

  return (
    <>
      {sizeGuide && <SizeGuide onClose={() => setSizeGuide(false)} />}

      <main className="shop-page-main" style={{ background: "var(--bg-primary)", paddingTop: "80px" }}>
        {/* Breadcrumb */}
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "28px 20px 0" }}>
          <nav aria-label="Breadcrumb" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <Link href="/shop" style={{ fontSize: "12px", color: "var(--text-muted)", textDecoration: "none" }}>Merch</Link>
            <span style={{ color: "var(--border-medium)", fontSize: "12px" }}>›</span>
            <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>{sync_product.name}</span>
          </nav>
        </div>

        {/* ── Product grid ── */}
        <div
          className="shop-product-layout"
          style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 20px 0" }}
        >
          {/* ── Left: image gallery ── */}
          <div>
            {/* Main image */}
            <div
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                background: "var(--bg-secondary)",
                aspectRatio: "1 / 1",
                position: "relative",
              }}
            >
              {activeImage ? (
                <Image
                  key={activeImage}
                  src={activeImage}
                  alt={sync_product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  style={{ objectFit: "cover", transition: "opacity 250ms ease" }}
                  priority
                />
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)" }}>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="3" rx="2" /><circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                </div>
              )}
            </div>

            {/* Thumbnail strip — all unique gallery images */}
            {gallery.length > 1 && (
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "14px",
                  overflowX: "auto",
                  paddingBottom: "4px",
                  scrollbarWidth: "none",
                }}
              >
                {gallery.map(({ url, label }) => (
                  <button
                    key={url}
                    onClick={() => setActiveImage(url)}
                    title={label}
                    aria-label={`View ${label}`}
                    style={{
                      width: 76,
                      height: 76,
                      borderRadius: "12px",
                      overflow: "hidden",
                      border: activeImage === url
                        ? "2.5px solid var(--xgreen)"
                        : "2px solid var(--border-light)",
                      padding: 0,
                      cursor: "pointer",
                      background: "var(--bg-secondary)",
                      flexShrink: 0,
                      transition: "border-color 150ms, transform 150ms",
                      transform: activeImage === url ? "scale(1.04)" : "scale(1)",
                    }}
                  >
                    <Image src={url} alt={label} width={76} height={76} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Right: details ── */}
          <div>
            <span className="eyebrow" style={{ marginBottom: "10px", display: "block" }}>
              XRED EYEZ — Official Merch
            </span>

            {/* Name + tagline */}
            <h1 className="font-display" style={{ fontSize: "clamp(26px, 4vw, 44px)", lineHeight: 1.05, marginBottom: "6px" }}>
              {sync_product.name}
            </h1>
            <p className="font-editorial" style={{ fontSize: "clamp(15px, 2vw, 18px)", color: "var(--text-secondary)", marginBottom: "20px" }}>
              {tagline}
            </p>

            {/* Price */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "28px", paddingBottom: "24px", borderBottom: "1px solid var(--border-light)" }}>
              <span style={{ fontSize: "32px", fontWeight: 800, letterSpacing: "-0.02em" }}>
                {currency} {price.toFixed(2)}
              </span>
              <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>Free delivery over £100</span>
            </div>

            {/* ── Color swatches ── */}
            {hasColors && colors.length > 0 && (
              <div style={{ marginBottom: "28px" }}>
                <p style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-secondary)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>
                  Colour — <span style={{ color: "var(--text-primary)", fontWeight: 600, textTransform: "none", letterSpacing: 0 }}>{selectedColor}</span>
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {colors.map((color) => {
                    const hex = colorHex(color);
                    const light = isLight(hex);
                    const isSel = selectedColor === color;
                    return (
                      <button
                        key={color}
                        onClick={() => pickColor(color)}
                        title={color}
                        aria-label={`Select colour ${color}`}
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: "50%",
                          background: hex,
                          border: isSel
                            ? `3px solid var(--xgreen)`
                            : light
                              ? "2px solid var(--border-medium)"
                              : "2px solid transparent",
                          cursor: "pointer",
                          padding: 0,
                          boxShadow: isSel
                            ? "0 0 0 2px var(--bg-primary), 0 0 0 4px var(--xgreen)"
                            : "0 2px 6px rgba(0,0,0,0.15)",
                          transition: "box-shadow 150ms, transform 150ms",
                          transform: isSel ? "scale(1.12)" : "scale(1)",
                          position: "relative",
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Size selector ── */}
            {hasSizes && sizes.length > 0 && (
              <div style={{ marginBottom: "28px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-secondary)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    Size — <span style={{ color: "var(--text-primary)", fontWeight: 600, textTransform: "none", letterSpacing: 0 }}>{selectedSize}</span>
                  </p>
                  <button
                    onClick={() => setSizeGuide(true)}
                    style={{ background: "none", border: "none", cursor: "pointer", fontSize: "12px", color: "var(--xgreen)", fontWeight: 600, textDecoration: "underline", padding: 0 }}
                  >
                    Size guide →
                  </button>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {sizes.map((size) => {
                    const available = validVariants.some(
                      (v) =>
                        v.options?.some((o) => o.id === "size" && o.value === size) &&
                        (!hasColors || v.options?.some((o) => o.id === "color" && o.value === selectedColor))
                    );
                    const isSel = selectedSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => available && setSelectedSize(size)}
                        disabled={!available}
                        style={{
                          minWidth: 52,
                          height: 48,
                          padding: "0 14px",
                          borderRadius: "10px",
                          border: isSel
                            ? "2px solid var(--text-primary)"
                            : available
                              ? "1.5px solid var(--border-medium)"
                              : "1.5px dashed var(--border-light)",
                          background: isSel ? "var(--text-primary)" : "transparent",
                          color: isSel ? "#fff" : available ? "var(--text-primary)" : "var(--text-muted)",
                          cursor: available ? "pointer" : "not-allowed",
                          fontSize: "13px",
                          fontWeight: 700,
                          opacity: available ? 1 : 0.4,
                          transition: "all 150ms",
                          position: "relative",
                        }}
                      >
                        {size}
                        {!available && (
                          <span style={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}>
                            <span style={{ position: "absolute", width: "70%", height: "1.5px", background: "var(--border-medium)", transform: "rotate(-20deg)" }} />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Quantity ── */}
            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-secondary)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>
                Quantity
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <QtyBtn label="−" onClick={() => setQty((q) => Math.max(1, q - 1))} />
                <span style={{ fontSize: "16px", fontWeight: 700, minWidth: "28px", textAlign: "center" }}>{qty}</span>
                <QtyBtn label="+" onClick={() => setQty((q) => q + 1)} />
              </div>
            </div>

            {/* ── CTAs ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
              <button
                onClick={handleAddToCart}
                disabled={!selectedVariant || added}
                style={{
                  padding: "17px 24px",
                  borderRadius: "12px",
                  border: "none",
                  background: added ? "#4a5240" : "var(--bg-dark)",
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  cursor: selectedVariant && !added ? "pointer" : "default",
                  transition: "background 300ms ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                {added ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    Added to Cart
                  </>
                ) : "Add to Cart"}
              </button>

              <Link
                href="/shop/checkout"
                style={{
                  padding: "17px 24px",
                  borderRadius: "12px",
                  border: "2px solid var(--xgreen)",
                  background: "var(--xgreen-soft)",
                  color: "var(--xgreen)",
                  fontSize: "15px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  textAlign: "center",
                  transition: "background 200ms ease",
                  display: "block",
                }}
              >
                Buy Now →
              </Link>
            </div>

            {/* ── Product bullets ── */}
            <div
              style={{
                background: "var(--bg-secondary)",
                borderRadius: "14px",
                padding: "20px",
                marginBottom: "24px",
              }}
            >
              <p style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "14px" }}>
                Product Details
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
                {bullets.map((b) => (
                  <li key={b} style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    <span style={{ color: "var(--xgreen)", fontWeight: 700, flexShrink: 0, marginTop: "1px" }}>—</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Trust strip ── */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              {[
                { icon: "📦", title: "Made to Order", sub: "Printed fresh, just for you" },
                { icon: "🔒", title: "Secure Pay", sub: "Powered by Stripe" },
                { icon: "🌍", title: "Ships Worldwide", sub: "Tracked & insured" },
                { icon: "↩️", title: "Easy Returns", sub: "Get in touch within 14 days" },
              ].map(({ icon, title, sub }) => (
                <div
                  key={title}
                  style={{
                    padding: "14px",
                    borderRadius: "12px",
                    border: "1px solid var(--border-light)",
                    background: "var(--bg-card)",
                  }}
                >
                  <span style={{ fontSize: "18px", display: "block", marginBottom: "6px" }}>{icon}</span>
                  <p style={{ fontSize: "12px", fontWeight: 700, marginBottom: "2px" }}>{title}</p>
                  <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
