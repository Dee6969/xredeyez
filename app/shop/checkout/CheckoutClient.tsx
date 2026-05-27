"use client";
import { useState, useEffect } from "react";
import { useCart } from "../../components/CartContext";
import Link from "next/link";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);

interface ShippingForm {
  name: string;
  email: string;
  address1: string;
  address2: string;
  city: string;
  state_code: string;
  country_code: string;
  zip: string;
}

function PaymentForm({
  shipping,
  onSuccess,
}: {
  shipping: ShippingForm;
  onSuccess: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setError("");

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/shop/checkout/success`,
        payment_method_data: {
          billing_details: {
            name: shipping.name,
            email: shipping.email,
            address: {
              line1: shipping.address1,
              line2: shipping.address2 || undefined,
              city: shipping.city,
              state: shipping.state_code || undefined,
              country: shipping.country_code,
              postal_code: shipping.zip,
            },
          },
        },
      },
    });

    if (result.error) {
      setError(result.error.message ?? "Payment failed");
      setLoading(false);
    } else {
      onSuccess();
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement
        options={{
          layout: "tabs",
        }}
      />
      {error && (
        <p
          style={{
            marginTop: "16px",
            fontSize: "13px",
            color: "var(--accent-red)",
            padding: "12px 16px",
            background: "var(--accent-red-soft)",
            borderRadius: "8px",
          }}
        >
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={!stripe || loading}
        style={{
          marginTop: "24px",
          width: "100%",
          padding: "17px",
          borderRadius: "10px",
          border: "none",
          background: loading ? "var(--text-muted)" : "var(--bg-dark)",
          color: "#fff",
          fontSize: "15px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "background 200ms",
        }}
      >
        {loading ? "Processing…" : "Pay Now →"}
      </button>
    </form>
  );
}

export default function CheckoutClient() {
  const { state, dispatch, total } = useCart();
  const [step, setStep] = useState<"shipping" | "payment">("shipping");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loadingPI, setLoadingPI] = useState(false);
  const [piError, setPiError] = useState("");

  const [shipping, setShipping] = useState<ShippingForm>({
    name: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    state_code: "",
    country_code: "GB",
    zip: "",
  });

  async function handleShippingSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoadingPI(true);
    setPiError("");
    try {
      const res = await fetch("/api/shop/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: state.items,
          shipping: {
            name: shipping.name,
            email: shipping.email,
            address1: shipping.address1,
            address2: shipping.address2 || undefined,
            city: shipping.city,
            state_code: shipping.state_code || undefined,
            country_code: shipping.country_code,
            zip: shipping.zip,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.clientSecret) {
        setPiError(data.error ?? "Could not initialise payment");
        return;
      }
      setClientSecret(data.clientSecret);
      setStep("payment");
    } catch {
      setPiError("Network error. Please try again.");
    } finally {
      setLoadingPI(false);
    }
  }

  if (state.items.length === 0) {
    return (
      <main
        style={{
          background: "var(--bg-primary)",
          minHeight: "100vh",
          paddingTop: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "20px",
          padding: "120px 24px",
          textAlign: "center",
        }}
      >
        <h1 className="font-display" style={{ fontSize: "32px" }}>Cart is empty</h1>
        <p style={{ color: "var(--text-secondary)" }}>Add some merch before checking out.</p>
        <Link
          href="/shop"
          style={{
            padding: "14px 32px",
            background: "var(--xgreen)",
            color: "#fff",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: "14px",
            letterSpacing: "0.06em",
          }}
        >
          Browse Shop
        </Link>
      </main>
    );
  }

  const fieldStyle = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1.5px solid var(--border-medium)",
    background: "var(--bg-card)",
    color: "var(--text-primary)",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box" as const,
    fontFamily: "inherit",
  };

  const labelStyle = {
    display: "block",
    fontSize: "12px",
    fontWeight: 600,
    color: "var(--text-secondary)",
    marginBottom: "6px",
    letterSpacing: "0.06em",
    textTransform: "uppercase" as const,
  };

  return (
    <main
      style={{
        background: "var(--bg-primary)",
        minHeight: "100vh",
        paddingTop: "80px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "48px 24px 100px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
          gap: "48px",
          alignItems: "start",
        }}
      >
        {/* Left: form */}
        <div>
          {/* Progress */}
          <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "36px" }}>
            {["shipping", "payment"].map((s, i) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {i > 0 && <span style={{ color: "var(--border-medium)", fontSize: "12px" }}>—</span>}
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: step === s ? "var(--bg-dark)" : step === "payment" && s === "shipping" ? "var(--xgreen)" : "var(--border-light)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: step === s || (step === "payment" && s === "shipping") ? "#fff" : "var(--text-muted)",
                    }}
                  >
                    {step === "payment" && s === "shipping" ? "✓" : i + 1}
                  </div>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: step === s ? "var(--text-primary)" : "var(--text-muted)",
                    }}
                  >
                    {s}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {step === "shipping" && (
            <form onSubmit={handleShippingSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <h2 className="font-display" style={{ fontSize: "22px", marginBottom: "8px" }}>
                Shipping Details
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input
                    required
                    value={shipping.name}
                    onChange={(e) => setShipping((s) => ({ ...s, name: e.target.value }))}
                    style={fieldStyle}
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email *</label>
                  <input
                    required
                    type="email"
                    value={shipping.email}
                    onChange={(e) => setShipping((s) => ({ ...s, email: e.target.value }))}
                    style={fieldStyle}
                    placeholder="jane@example.com"
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Address Line 1 *</label>
                <input
                  required
                  value={shipping.address1}
                  onChange={(e) => setShipping((s) => ({ ...s, address1: e.target.value }))}
                  style={fieldStyle}
                  placeholder="123 High Street"
                />
              </div>

              <div>
                <label style={labelStyle}>Address Line 2</label>
                <input
                  value={shipping.address2}
                  onChange={(e) => setShipping((s) => ({ ...s, address2: e.target.value }))}
                  style={fieldStyle}
                  placeholder="Apartment, suite, etc."
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={labelStyle}>City *</label>
                  <input
                    required
                    value={shipping.city}
                    onChange={(e) => setShipping((s) => ({ ...s, city: e.target.value }))}
                    style={fieldStyle}
                    placeholder="London"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Postcode / ZIP *</label>
                  <input
                    required
                    value={shipping.zip}
                    onChange={(e) => setShipping((s) => ({ ...s, zip: e.target.value }))}
                    style={fieldStyle}
                    placeholder="EC1A 1BB"
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={labelStyle}>State / Region</label>
                  <input
                    value={shipping.state_code}
                    onChange={(e) => setShipping((s) => ({ ...s, state_code: e.target.value }))}
                    style={fieldStyle}
                    placeholder="Optional"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Country Code *</label>
                  <input
                    required
                    maxLength={2}
                    value={shipping.country_code}
                    onChange={(e) => setShipping((s) => ({ ...s, country_code: e.target.value.toUpperCase() }))}
                    style={fieldStyle}
                    placeholder="GB"
                  />
                </div>
              </div>

              {piError && (
                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--accent-red)",
                    padding: "12px 16px",
                    background: "var(--accent-red-soft)",
                    borderRadius: "8px",
                  }}
                >
                  {piError}
                </p>
              )}

              <button
                type="submit"
                disabled={loadingPI}
                style={{
                  marginTop: "8px",
                  padding: "17px",
                  borderRadius: "10px",
                  border: "none",
                  background: loadingPI ? "var(--text-muted)" : "var(--bg-dark)",
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  cursor: loadingPI ? "not-allowed" : "pointer",
                }}
              >
                {loadingPI ? "Please wait…" : "Continue to Payment →"}
              </button>
            </form>
          )}

          {step === "payment" && clientSecret && (
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
                <h2 className="font-display" style={{ fontSize: "22px" }}>Payment</h2>
                <button
                  onClick={() => setStep("shipping")}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "13px",
                    color: "var(--text-muted)",
                    textDecoration: "underline",
                  }}
                >
                  Edit shipping
                </button>
              </div>

              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  appearance: {
                    theme: "stripe",
                    variables: {
                      colorPrimary: "#84C51F",
                      colorBackground: "#FAF8F4",
                      colorText: "#1A1814",
                      colorDanger: "#B52426",
                      fontFamily: "Inter, system-ui, sans-serif",
                      borderRadius: "8px",
                    },
                  },
                }}
              >
                <PaymentForm shipping={shipping} onSuccess={() => dispatch({ type: "CLEAR" })} />
              </Elements>
            </div>
          )}
        </div>

        {/* Right: order summary */}
        <div
          style={{
            background: "var(--bg-card)",
            borderRadius: "16px",
            padding: "28px",
            boxShadow: "var(--shadow-card)",
            position: "sticky",
            top: "100px",
          }}
        >
          <h3 style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "20px", color: "var(--text-secondary)" }}>
            Order Summary
          </h3>

          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "14px", marginBottom: "24px" }}>
            {state.items.map((item) => (
              <li key={item.id} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <div style={{ position: "relative", width: 56, height: 56, borderRadius: "8px", overflow: "hidden", background: "var(--bg-secondary)", flexShrink: 0 }}>
                  <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }} />
                  <span
                    style={{
                      position: "absolute",
                      top: -4,
                      right: -4,
                      background: "var(--bg-dark)",
                      color: "#fff",
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      fontSize: "10px",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.quantity}
                  </span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "13px", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</p>
                  <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>{item.variantName}</p>
                </div>
                <span style={{ fontSize: "14px", fontWeight: 700, flexShrink: 0 }}>
                  {item.currency} {(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "var(--text-secondary)" }}>
              <span>Subtotal</span>
              <span>{state.items[0]?.currency} {total.toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "var(--text-secondary)" }}>
              <span>Shipping</span>
              <span>Calculated by Printful</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: 700, marginTop: "8px", paddingTop: "12px", borderTop: "1px solid var(--border-light)" }}>
              <span>Total</span>
              <span style={{ color: "var(--xgreen)" }}>{state.items[0]?.currency} {total.toFixed(2)}</span>
            </div>
          </div>

          <div style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-muted)" }}>
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>Secured by Stripe</span>
          </div>
        </div>
      </div>
    </main>
  );
}
