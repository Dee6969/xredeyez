"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "../../components/CartContext";
import { PrintfulSyncProductDetail, PrintfulSyncVariant } from "../../lib/printful";

function getImage(variant: PrintfulSyncVariant): string {
  const preview = variant.files?.find((f) => f.type === "preview");
  const defaultFile = variant.files?.find((f) => f.type === "default");
  return preview?.preview_url ?? defaultFile?.preview_url ?? variant.product?.image ?? "";
}

function groupVariantsByOption(
  variants: PrintfulSyncVariant[],
  optionId: string
): string[] {
  const values = new Set<string>();
  variants.forEach((v) => {
    const opt = v.options?.find((o) => o.id === optionId);
    if (opt) values.add(opt.value);
  });
  return Array.from(values);
}

export default function ProductClient({ product }: { product: PrintfulSyncProductDetail }) {
  const { dispatch } = useCart();
  const { sync_product, sync_variants } = product;

  const validVariants = sync_variants.filter((v) => v.synced);

  // Detect option types
  const hasColors = validVariants.some((v) => v.options?.some((o) => o.id === "color"));
  const hasSizes = validVariants.some((v) => v.options?.some((o) => o.id === "size"));
  const colors = groupVariantsByOption(validVariants, "color");
  const sizes = groupVariantsByOption(validVariants, "size");

  const [selectedColor, setSelectedColor] = useState<string>(colors[0] ?? "");
  const [selectedSize, setSelectedSize] = useState<string>(sizes[0] ?? "");
  const [added, setAdded] = useState(false);

  const selectedVariant = validVariants.find((v) => {
    const colorMatch = !hasColors || v.options?.some((o) => o.id === "color" && o.value === selectedColor);
    const sizeMatch = !hasSizes || v.options?.some((o) => o.id === "size" && o.value === selectedSize);
    return colorMatch && sizeMatch;
  }) ?? validVariants[0];

  const heroImage = selectedVariant ? getImage(selectedVariant) : sync_product.thumbnail_url;
  const price = selectedVariant ? parseFloat(selectedVariant.retail_price) : 0;
  const currency = selectedVariant?.currency ?? "USD";

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
        image: heroImage,
        quantity: 1,
        printfulVariantId: selectedVariant.id,
      },
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <main className="shop-page-main" style={{ background: "var(--bg-primary)", paddingTop: "80px" }}>
      {/* Breadcrumb */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px 0" }}>
        <nav style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <Link href="/shop" style={{ fontSize: "13px", color: "var(--text-muted)", textDecoration: "none" }}>
            Merch
          </Link>
          <span style={{ color: "var(--border-medium)", fontSize: "13px" }}>→</span>
          <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
            {sync_product.name}
          </span>
        </nav>
      </div>

      {/* Product layout */}
      <div
        className="shop-product-layout"
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px 0" }}
      >
        {/* Image */}
        <div>
          <div
            style={{
              borderRadius: "20px",
              overflow: "hidden",
              background: "var(--bg-secondary)",
              aspectRatio: "1 / 1",
              position: "relative",
            }}
          >
            {heroImage ? (
              <Image
                src={heroImage}
                alt={sync_product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
                priority
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-muted)",
                }}
              >
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/>
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                </svg>
              </div>
            )}
          </div>

          {/* Thumbnail strip */}
          {validVariants.length > 1 && (
            <div style={{ display: "flex", gap: "10px", marginTop: "16px", flexWrap: "wrap" }}>
              {validVariants.slice(0, 6).map((v) => {
                const img = getImage(v);
                if (!img) return null;
                const isSel = selectedVariant?.id === v.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => {
                      const colorOpt = v.options?.find((o) => o.id === "color");
                      const sizeOpt = v.options?.find((o) => o.id === "size");
                      if (colorOpt) setSelectedColor(colorOpt.value);
                      if (sizeOpt) setSelectedSize(sizeOpt.value);
                    }}
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: "10px",
                      overflow: "hidden",
                      border: isSel ? "2px solid var(--xgreen)" : "2px solid transparent",
                      padding: 0,
                      cursor: "pointer",
                      background: "var(--bg-secondary)",
                      flexShrink: 0,
                      transition: "border-color 150ms",
                    }}
                    aria-label={`Select variant ${v.name}`}
                  >
                    <Image src={img} alt={v.name} width={72} height={72} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <span className="eyebrow" style={{ marginBottom: "14px", display: "block" }}>
            XRED EYEZ — Official Merch
          </span>

          <h1
            className="font-display"
            style={{ fontSize: "clamp(28px, 4vw, 42px)", marginBottom: "16px", lineHeight: 1.1 }}
          >
            {sync_product.name}
          </h1>

          <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "32px" }}>
            <span
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              {currency} {price.toFixed(2)}
            </span>
            {selectedVariant && (
              <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                incl. tax
              </span>
            )}
          </div>

          {/* Color picker */}
          {hasColors && colors.length > 0 && (
            <div style={{ marginBottom: "28px" }}>
              <p style={{ fontSize: "13px", fontWeight: 600, marginBottom: "12px", color: "var(--text-secondary)" }}>
                Color: <span style={{ color: "var(--text-primary)" }}>{selectedColor}</span>
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    style={{
                      padding: "8px 18px",
                      borderRadius: "99px",
                      border: selectedColor === color ? "2px solid var(--xgreen)" : "1.5px solid var(--border-medium)",
                      background: selectedColor === color ? "var(--xgreen-soft)" : "transparent",
                      cursor: "pointer",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: selectedColor === color ? "var(--text-primary)" : "var(--text-secondary)",
                      transition: "all 150ms",
                    }}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size picker */}
          {hasSizes && sizes.length > 0 && (
            <div style={{ marginBottom: "36px" }}>
              <p style={{ fontSize: "13px", fontWeight: 600, marginBottom: "12px", color: "var(--text-secondary)" }}>
                Size: <span style={{ color: "var(--text-primary)" }}>{selectedSize}</span>
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {sizes.map((size) => {
                  const hasVariant = validVariants.some(
                    (v) =>
                      v.options?.some((o) => o.id === "size" && o.value === size) &&
                      (!hasColors || v.options?.some((o) => o.id === "color" && o.value === selectedColor))
                  );
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      disabled={!hasVariant}
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: "10px",
                        border: selectedSize === size ? "2px solid var(--xgreen)" : "1.5px solid var(--border-medium)",
                        background: selectedSize === size ? "var(--xgreen-soft)" : "transparent",
                        cursor: hasVariant ? "pointer" : "not-allowed",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: !hasVariant ? "var(--text-muted)" : selectedSize === size ? "var(--text-primary)" : "var(--text-secondary)",
                        textDecoration: !hasVariant ? "line-through" : "none",
                        transition: "all 150ms",
                        opacity: hasVariant ? 1 : 0.4,
                      }}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            disabled={!selectedVariant || added}
            style={{
              width: "100%",
              padding: "18px 24px",
              borderRadius: "12px",
              border: "none",
              background: added ? "var(--accent-olive)" : "var(--bg-dark)",
              color: "#fff",
              fontSize: "15px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: selectedVariant ? "pointer" : "not-allowed",
              transition: "all 250ms ease",
              marginBottom: "12px",
            }}
          >
            {added ? "✓ Added to Cart" : "Add to Cart"}
          </button>

          <Link
            href="/shop/checkout"
            style={{
              display: "block",
              width: "100%",
              textAlign: "center",
              padding: "18px 24px",
              borderRadius: "12px",
              border: "2px solid var(--xgreen)",
              color: "var(--xgreen)",
              fontSize: "15px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "all 250ms ease",
              boxSizing: "border-box",
            }}
          >
            Buy Now →
          </Link>

          {/* Shipping / trust signals */}
          <div style={{ marginTop: "36px", display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { icon: "🚚", text: "Free worldwide shipping on orders over $100" },
              { icon: "♻️", text: "Print-on-demand — made only when you order" },
              { icon: "🔒", text: "Secure checkout powered by Stripe" },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <span style={{ fontSize: "16px" }}>{icon}</span>
                <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
