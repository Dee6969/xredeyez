"use client";
import { useState } from "react";
import Image from "next/image";

export default function VaultRoom() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMsg("Valid email required.");
      return;
    }
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg("Something went wrong. Try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Connection failed. Try again.");
    }
  };

  return (
    <section
      className="relative min-h-screen overflow-hidden px-6 py-24"
      style={{ background: "linear-gradient(180deg, #050304 0%, #100405 46%, #060204 100%)" }}
      id="vault"
    >
      <div className="red-ambient" />
      {/* Heavy vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 55% at 50% 42%, rgba(255,48,53,0.26) 0%, transparent 64%)",
        }}
      />
      <div className="absolute inset-0 flagship-grid pointer-events-none" />
      <div
        className="absolute left-1/2 top-0 h-[42vh] w-px -translate-x-1/2 pointer-events-none"
        style={{ background: "linear-gradient(180deg, rgba(232,224,212,0.22), transparent)" }}
      />

      {/* Corner lines */}
      {[
        { top: "32px", left: "32px", borderTop: "1px solid rgba(192,40,42,0.2)", borderLeft: "1px solid rgba(192,40,42,0.2)", width: "40px", height: "40px" },
        { top: "32px", right: "32px", borderTop: "1px solid rgba(192,40,42,0.2)", borderRight: "1px solid rgba(192,40,42,0.2)", width: "40px", height: "40px" },
        { bottom: "32px", left: "32px", borderBottom: "1px solid rgba(192,40,42,0.2)", borderLeft: "1px solid rgba(192,40,42,0.2)", width: "40px", height: "40px" },
        { bottom: "32px", right: "32px", borderBottom: "1px solid rgba(192,40,42,0.2)", borderRight: "1px solid rgba(192,40,42,0.2)", width: "40px", height: "40px" },
      ].map((style, i) => (
        <div key={i} className="absolute pointer-events-none" style={style as React.CSSProperties} />
      ))}

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-12rem)] w-full max-w-6xl items-center gap-14 md:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="mb-8 w-[min(68vw,300px)]">
            <Image
              src="/redeyez-logo.jpeg"
              alt="XRED EYEZ"
              width={1024}
              height={1024}
              priority
              style={{ width: "100%", height: "auto", filter: "drop-shadow(0 0 24px rgba(116,190,44,0.18))" }}
            />
          </div>

          <div className="eyebrow mb-5">THE VAULT / PRIVATE ENTRY</div>

          <h2
            className="font-display"
            style={{ fontSize: "clamp(42px, 8vw, 104px)", color: "var(--bone)", lineHeight: 0.88 }}
          >
            Not everyone gets here first.
          </h2>

          <p
            className="font-editorial mt-8"
            style={{
              fontSize: "clamp(17px, 2vw, 24px)",
              color: "rgba(232,224,212,0.58)",
              lineHeight: 1.55,
              maxWidth: "610px",
            }}
          >
            The Vault is the first access layer for Chapter One. No public catalog. No hard sell. Just the signal before the room opens.
          </p>

          <div className="mt-10 grid max-w-2xl gap-px border border-white/[0.06] sm:grid-cols-3">
            {[
              ["01", "FIRST SIGNAL", "Drop alerts before the public room sees them."],
              ["02", "PRIVATE NOTES", "Behind-the-scenes updates from the rebuild."],
              ["03", "EARLY ENTRY", "Priority access when Chapter One unlocks."],
            ].map(([number, title, detail]) => (
              <div key={title} className="min-h-[150px] p-5" style={{ background: "rgba(255,255,255,0.025)" }}>
                <div className="font-mono" style={{ color: "var(--xred)", fontSize: "10px", letterSpacing: "0.2em" }}>
                  {number}
                </div>
                <div className="mt-6 font-display" style={{ color: "var(--bone)", fontSize: "15px", lineHeight: 1 }}>
                  {title}
                </div>
                <p className="mt-4" style={{ color: "rgba(232,224,212,0.38)", fontSize: "12px", lineHeight: 1.55 }}>
                  {detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div
            className="absolute -inset-6 pointer-events-none"
            style={{
              border: "1px solid rgba(192,40,42,0.08)",
              background: "radial-gradient(ellipse at center, rgba(192,40,42,0.08), transparent 70%)",
              filter: "blur(1px)",
            }}
          />
          <div
            className="red-edge relative overflow-hidden border border-white/[0.1] p-6 md:p-8"
            style={{ background: "linear-gradient(180deg, rgba(16,12,12,0.9), rgba(34,8,10,0.78))" }}
          >
            <div className="mb-8 flex items-center justify-between gap-6">
              <div>
                <div className="font-mono" style={{ color: "rgba(232,224,212,0.34)", fontSize: "10px", letterSpacing: "0.2em" }}>
                  ACCESS PANEL
                </div>
                <div className="mt-2 font-display" style={{ color: "var(--bone)", fontSize: "26px", lineHeight: 1 }}>
                  CHAPTER ONE
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "999px",
                    background: "var(--xred)",
                    boxShadow: "0 0 12px rgba(192,40,42,0.8)",
                  }}
                />
                <span className="font-mono" style={{ color: "rgba(192,40,42,0.72)", fontSize: "9px", letterSpacing: "0.18em" }}>
                  LOCKED
                </span>
              </div>
            </div>

            <div className="mb-8 grid gap-3">
              {[
                ["STATUS", "PRIVATE LAUNCH LIST OPEN"],
                ["ACCESS", "EARLY MEMBERS ONLY"],
                ["PRODUCT", "REDACTED UNTIL SIGNAL"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-6 border-t border-white/[0.06] pt-3">
                  <span className="font-mono" style={{ color: "rgba(232,224,212,0.24)", fontSize: "9px", letterSpacing: "0.16em" }}>
                    {label}
                  </span>
                  <span className="font-mono text-right" style={{ color: "rgba(232,224,212,0.58)", fontSize: "10px", letterSpacing: "0.12em" }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {status === "success" ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <div
                  style={{
                    width: "54px", height: "54px",
                    border: "1px solid var(--xred)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 30px rgba(192,40,42,0.3)",
                  }}
                >
                  <span style={{ color: "var(--xred)", fontSize: "20px" }}>✓</span>
                </div>
                <p className="font-display" style={{ fontSize: "22px", color: "var(--bone)", letterSpacing: "0.08em" }}>
                  YOU&apos;RE IN.
                </p>
                <p className="font-editorial" style={{ fontSize: "15px", color: "rgba(232,224,212,0.48)", maxWidth: "300px" }}>
                  Watch for the signal. It comes when it&apos;s ready.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <label className="font-mono" htmlFor="vault-email" style={{ fontSize: "9px", color: "rgba(232,224,212,0.24)", letterSpacing: "0.18em" }}>
                  REQUEST ENTRY
                </label>
                <input
                  id="vault-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  disabled={status === "loading"}
                  className="w-full bg-transparent font-mono transition-all duration-300 outline-none"
                  style={{
                    border: "1px solid rgba(232,224,212,0.12)",
                    padding: "16px 18px",
                    fontSize: "14px",
                    color: "var(--bone)",
                    letterSpacing: "0.08em",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(192,40,42,0.8)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(232,224,212,0.12)")}
                />

                {errorMsg && (
                  <p className="font-mono" style={{ fontSize: "11px", color: "rgba(192,40,42,0.8)", letterSpacing: "0.1em" }}>
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  data-hover
                  className="font-display pulse-border transition-all duration-300 hover:bg-[rgba(192,40,42,0.12)]"
                  style={{
                    border: "1px solid",
                    padding: "16px 22px",
                    fontSize: "11px",
                    letterSpacing: "0.25em",
                    color: status === "loading" ? "rgba(232,224,212,0.4)" : "var(--bone)",
                    background: "transparent",
                    cursor: status === "loading" ? "wait" : "pointer",
                  }}
                >
                  {status === "loading" ? "ENTERING..." : "ENTER THE VAULT"}
                </button>

                <p
                  className="font-mono"
                  style={{ fontSize: "9px", color: "rgba(232,224,212,0.18)", letterSpacing: "0.14em", lineHeight: 1.7 }}
                >
                  NO SPAM. NO NOISE. JUST THE SIGNAL.
                </p>
              </form>
            )}

            <div
              className="mt-10 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(192,40,42,0.5), transparent)" }}
            />
            <div className="mt-5 flex items-center justify-between gap-4">
              <span className="font-mono" style={{ color: "rgba(232,224,212,0.22)", fontSize: "9px", letterSpacing: "0.18em" }}>
                VAULT DOOR
              </span>
              <span className="font-mono" style={{ color: "rgba(232,224,212,0.22)", fontSize: "9px", letterSpacing: "0.18em" }}>
                006 / ACTIVE
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-3 md:flex"
        style={{ color: "rgba(232,224,212,0.18)" }}
      >
        <div className="glow-line w-10" />
        <span className="font-mono" style={{ fontSize: "10px", letterSpacing: "0.2em" }}>
          EARLY ACCESS OPEN
        </span>
        <div className="glow-line w-10" />
      </div>
    </section>
  );
}
