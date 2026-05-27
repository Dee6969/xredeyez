"use client";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
  const searchParams = useSearchParams();
  const [_status, setStatus] = useState<"loading" | "success" | "error">("success");
  const paymentIntent = searchParams.get("payment_intent");

  useEffect(() => {
    if (!paymentIntent) return;
    fetch(`/api/shop/order-status?payment_intent=${paymentIntent}`)
      .then((r) => r.json())
      .then((d) => setStatus(d.status === "succeeded" ? "success" : "error"))
      .catch(() => setStatus("success"));
  }, [paymentIntent]);

  return (
    <main
      style={{
        background: "var(--bg-dark)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px 24px",
      }}
    >
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: "50%",
          background: "rgba(132,197,31,0.12)",
          border: "2px solid var(--xgreen)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "32px",
        }}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--xgreen)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>

      <span className="eyebrow" style={{ color: "var(--xgreen)", marginBottom: "16px" }}>
        Order Confirmed
      </span>

      <h1
        className="font-display"
        style={{ fontSize: "clamp(36px, 6vw, 64px)", color: "#fff", marginBottom: "20px" }}
      >
        Thank you!
      </h1>

      <p
        style={{
          fontSize: "clamp(15px, 2vw, 18px)",
          color: "rgba(245,240,230,0.6)",
          maxWidth: "440px",
          lineHeight: 1.7,
          marginBottom: "48px",
          fontFamily: "var(--font-playfair, Georgia, serif)",
          fontStyle: "italic",
        }}
      >
        Your order is confirmed and will be made and shipped by Printful.
        You&apos;ll receive a confirmation email shortly.
      </p>

      <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", justifyContent: "center" }}>
        <Link
          href="/shop"
          style={{
            padding: "14px 32px",
            borderRadius: "8px",
            background: "var(--xgreen)",
            color: "#fff",
            fontWeight: 700,
            fontSize: "14px",
            letterSpacing: "0.06em",
            textDecoration: "none",
            textTransform: "uppercase",
          }}
        >
          Continue Shopping
        </Link>
        <Link
          href="/"
          style={{
            padding: "14px 32px",
            borderRadius: "8px",
            border: "1.5px solid rgba(255,255,255,0.2)",
            color: "rgba(255,255,255,0.7)",
            fontWeight: 600,
            fontSize: "14px",
            letterSpacing: "0.06em",
            textDecoration: "none",
            textTransform: "uppercase",
          }}
        >
          Back Home
        </Link>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <main
          style={{
            background: "var(--bg-dark)",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: 40, height: 40, border: "3px solid var(--xgreen)", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        </main>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
