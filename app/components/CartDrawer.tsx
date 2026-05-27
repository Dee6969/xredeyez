"use client";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "./CartContext";
import { useEffect } from "react";

export default function CartDrawer() {
  const { state, dispatch, total, itemCount } = useCart();

  useEffect(() => {
    document.body.style.overflow = state.isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [state.isOpen]);

  return (
    <>
      {/* Backdrop */}
      {state.isOpen && (
        <div
          className="fixed inset-0 z-[900]"
          style={{ background: "rgba(24,22,15,0.72)", backdropFilter: "blur(4px)" }}
          onClick={() => dispatch({ type: "CLOSE" })}
        />
      )}

      {/* Drawer */}
      <aside
        aria-label="Shopping cart"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100%",
          width: "min(420px, 96vw)",
          background: "var(--bg-primary)",
          zIndex: 901,
          transform: state.isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 380ms cubic-bezier(0.22,1,0.36,1)",
          display: "flex",
          flexDirection: "column",
          boxShadow: "var(--shadow-float)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 24px",
            borderBottom: "1px solid var(--border-light)",
          }}
        >
          <div>
            <span className="eyebrow">Cart</span>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "2px" }}>
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </p>
          </div>
          <button
            onClick={() => dispatch({ type: "CLOSE" })}
            aria-label="Close cart"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-secondary)",
              padding: "8px",
              borderRadius: "8px",
              lineHeight: 0,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
          {state.items.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <p style={{ color: "var(--text-muted)", fontSize: "15px", marginBottom: "24px" }}>
                Your cart is empty
              </p>
              <Link
                href="/shop"
                onClick={() => dispatch({ type: "CLOSE" })}
                style={{
                  display: "inline-block",
                  padding: "12px 28px",
                  background: "var(--xgreen)",
                  color: "#fff",
                  borderRadius: "6px",
                  fontSize: "13px",
                  fontWeight: 600,
                  textDecoration: "none",
                  letterSpacing: "0.04em",
                }}
              >
                Browse Merch
              </Link>
            </div>
          ) : (
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "16px" }}>
              {state.items.map((item) => (
                <li
                  key={item.id}
                  style={{
                    display: "flex",
                    gap: "14px",
                    paddingBottom: "16px",
                    borderBottom: "1px solid var(--border-light)",
                  }}
                >
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: "8px",
                      overflow: "hidden",
                      flexShrink: 0,
                      background: "var(--bg-secondary)",
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      style={{ objectFit: "cover", width: "100%", height: "100%" }}
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 600, fontSize: "14px", marginBottom: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {item.name}
                    </p>
                    <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "10px" }}>
                      {item.variantName}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <button
                          onClick={() => dispatch({ type: "UPDATE_QTY", id: item.id, qty: item.quantity - 1 })}
                          style={{ width: 26, height: 26, borderRadius: "50%", border: "1px solid var(--border-medium)", background: "none", cursor: "pointer", fontSize: "16px", lineHeight: 1 }}
                        >−</button>
                        <span style={{ fontSize: "14px", fontWeight: 600, minWidth: "18px", textAlign: "center" }}>{item.quantity}</span>
                        <button
                          onClick={() => dispatch({ type: "UPDATE_QTY", id: item.id, qty: item.quantity + 1 })}
                          style={{ width: 26, height: 26, borderRadius: "50%", border: "1px solid var(--border-medium)", background: "none", cursor: "pointer", fontSize: "16px", lineHeight: 1 }}
                        >+</button>
                      </div>
                      <span style={{ fontWeight: 700, fontSize: "14px" }}>
                        {item.currency} {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => dispatch({ type: "REMOVE_ITEM", id: item.id })}
                    aria-label="Remove item"
                    style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: "4px", alignSelf: "flex-start", lineHeight: 0 }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6 6 18M6 6l12 12"/>
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div style={{ padding: "20px 24px", borderTop: "1px solid var(--border-light)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
              <span style={{ color: "var(--text-secondary)", fontSize: "14px" }}>Subtotal</span>
              <span style={{ fontWeight: 700, fontSize: "16px" }}>
                {state.items[0]?.currency} {total.toFixed(2)}
              </span>
            </div>
            <p style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "14px" }}>
              Shipping & taxes calculated at checkout
            </p>
            <Link
              href="/shop/checkout"
              onClick={() => dispatch({ type: "CLOSE" })}
              style={{
                display: "block",
                textAlign: "center",
                padding: "15px",
                background: "var(--xgreen)",
                color: "#fff",
                borderRadius: "8px",
                fontWeight: 700,
                fontSize: "14px",
                textDecoration: "none",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Checkout →
            </Link>
            <button
              onClick={() => dispatch({ type: "CLOSE" })}
              style={{
                display: "block",
                width: "100%",
                textAlign: "center",
                padding: "12px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--text-muted)",
                fontSize: "13px",
                marginTop: "8px",
              }}
            >
              Continue shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
