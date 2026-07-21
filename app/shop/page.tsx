import Link from "next/link";
import Image from "next/image";
import PlatformNav from "../components/PlatformNav";
import SiteFooter from "../components/SiteFooter";
import { listSyncProducts, PrintfulSyncProduct } from "../lib/printful";

async function getProducts(): Promise<PrintfulSyncProduct[]> {
  try {
    return await listSyncProducts();
  } catch {
    return [];
  }
}

export const revalidate = 300;

export const metadata = {
  alternates: { canonical: "https://www.redeyez.co.uk/shop" },
  openGraph: { title: "XRED EYEZ Shop", description: "Culture-first merchandise from XRED EYEZ.", type: "website", url: "https://www.redeyez.co.uk/shop" },
  title: "Merch — XRED EYEZ",
  description: "Official XRED EYEZ merchandise. Cannabis culture clothing and accessories.",
};

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <>
      <PlatformNav />

      {/* Hero */}
      <section
        style={{
          background: "var(--bg-dark)",
          minHeight: "52vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "120px 24px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "400px",
            background: "radial-gradient(ellipse, rgba(132,197,31,0.18) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <span
          className="eyebrow"
          style={{ color: "var(--xgreen)", marginBottom: "20px", letterSpacing: "0.3em" }}
        >
          Official Merchandise
        </span>

        <h1
          className="font-display"
          style={{
            fontSize: "clamp(52px, 8vw, 100px)",
            color: "#fff",
            lineHeight: 0.95,
            marginBottom: "24px",
          }}
        >
          XRED
          <br />
          <span style={{ color: "var(--xgreen)" }}>MERCH</span>
        </h1>

        <p
          style={{
            fontSize: "clamp(15px, 2vw, 18px)",
            color: "rgba(245,240,230,0.6)",
            maxWidth: "420px",
            lineHeight: 1.6,
            fontFamily: "var(--font-playfair, Georgia, serif)",
            fontStyle: "italic",
          }}
        >
          Wear the culture. Premium drops for those who know.
        </p>
      </section>

      {/* Products */}
      <section
        style={{
          background: "var(--bg-primary)",
          padding: "72px 24px 100px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {products.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "80px 0",
                color: "var(--text-muted)",
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  border: "1.5px solid var(--border-medium)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 24px",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
              </div>
              <p style={{ fontSize: "18px", marginBottom: "8px" }}>
                Products loading soon
              </p>
              <p style={{ fontSize: "14px" }}>
                Set <code style={{ fontSize: "12px", background: "var(--bg-secondary)", padding: "2px 6px", borderRadius: "4px" }}>PRINTFUL_API_KEY</code> to display your store.
              </p>
            </div>
          ) : (
            <>
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "48px" }}>
                <h2 className="font-display" style={{ fontSize: "32px" }}>All Products</h2>
                <span style={{ fontSize: "14px", color: "var(--text-muted)" }}>
                  {products.length} {products.length === 1 ? "item" : "items"}
                </span>
              </div>

              <div className="shop-product-grid">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/shop/${product.id}`}
                    style={{ textDecoration: "none", display: "block" }}
                  >
                    <article className="shop-product-card">
                      {/* Product image */}
                      <div
                        style={{
                          aspectRatio: "1 / 1",
                          background: "var(--bg-secondary)",
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        {product.thumbnail_url ? (
                          <Image
                            src={product.thumbnail_url}
                            alt={product.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="shop-product-img"
                            style={{ objectFit: "cover" }}
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
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                              <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                              <circle cx="9" cy="9" r="2"/>
                              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                            </svg>
                          </div>
                        )}

                        {/* Variant count badge */}
                        {product.variants > 1 && (
                          <div
                            style={{
                              position: "absolute",
                              top: "12px",
                              right: "12px",
                              background: "rgba(24,22,15,0.75)",
                              backdropFilter: "blur(8px)",
                              color: "#fff",
                              fontSize: "11px",
                              fontWeight: 600,
                              padding: "4px 10px",
                              borderRadius: "99px",
                              letterSpacing: "0.04em",
                            }}
                          >
                            {product.variants} variants
                          </div>
                        )}
                      </div>

                      {/* Product info */}
                      <div style={{ padding: "18px 20px 22px" }}>
                        <h3
                          style={{
                            fontSize: "15px",
                            fontWeight: 600,
                            color: "var(--text-primary)",
                            marginBottom: "6px",
                            lineHeight: 1.3,
                          }}
                        >
                          {product.name}
                        </h3>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "14px" }}>
                          <span
                            style={{
                              fontSize: "13px",
                              color: "var(--xgreen)",
                              fontWeight: 600,
                              letterSpacing: "0.04em",
                              textTransform: "uppercase",
                            }}
                          >
                            View &amp; Buy →
                          </span>
                          <span
                            style={{
                              fontSize: "11px",
                              color: "var(--text-muted)",
                              fontFamily: "Courier New, monospace",
                              letterSpacing: "0.1em",
                            }}
                          >
                            {product.synced}/{product.variants} synced
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Brand strip */}
      <section
        style={{
          background: "var(--bg-dark)",
          padding: "64px 24px",
          textAlign: "center",
        }}
      >
        <p
          className="font-editorial"
          style={{ fontSize: "clamp(18px, 3vw, 26px)", color: "rgba(245,240,230,0.5)", marginBottom: "6px" }}
        >
          Powered by Hemp
        </p>
        <p
          className="font-display"
          style={{ fontSize: "clamp(28px, 5vw, 48px)", color: "var(--xgreen)" }}
        >
          XRED EYEZ
        </p>
      </section>

      <SiteFooter />
    </>
  );
}
