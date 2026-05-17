"use client";
import { useState } from "react";

interface Teaser {
  label: string;
  detail: string;
  status: string;
  hintColor: string;
}

const teasers: Teaser[] = [
  {
    label: "CHAPTER ONE",
    detail: "███████████ ████ ████████████",
    status: "INCOMING",
    hintColor: "var(--xred)",
  },
  {
    label: "PRODUCT LINE 01",
    detail: "██████ ███ ████████ █ ██████",
    status: "CLASSIFIED",
    hintColor: "var(--brass)",
  },
  {
    label: "COLLABORATION",
    detail: "████████████ × ██████████████",
    status: "UNANNOUNCED",
    hintColor: "rgba(200,200,210,0.4)",
  },
  {
    label: "DROP LOCATION",
    detail: "██████████████ ██████",
    status: "PENDING",
    hintColor: "rgba(80,200,120,0.4)",
  },
];

export default function SignalRoom() {
  const [revealed, setRevealed] = useState<number | null>(null);

  return (
    <section
      className="relative min-h-screen flex items-center py-24 px-6 overflow-hidden"
      style={{ background: "#080408" }}
      id="signal"
    >
      <div className="red-ambient" />
      {/* Transmission lines */}
      {[20, 40, 60, 80].map((pct) => (
        <div
          key={pct}
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{
            left: `${pct}%`,
            width: "1px",
            background: "linear-gradient(180deg, transparent, rgba(255,48,53,0.1) 50%, transparent)",
          }}
        />
      ))}

      {/* Signal blink */}
      <div
        className="absolute top-8 right-8 flex items-center gap-2"
        style={{ animation: "pulse-red 1.5s ease-in-out infinite" }}
      >
        <div
          style={{
            width: "6px", height: "6px",
            borderRadius: "50%", background: "var(--xred)",
            boxShadow: "0 0 8px rgba(192,40,42,0.8)",
          }}
        />
        <span className="font-mono" style={{ fontSize: "9px", color: "rgba(192,40,42,0.6)", letterSpacing: "0.2em" }}>
          LIVE
        </span>
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10">
        <div className="mb-16">
          <div className="font-mono mb-4" style={{ fontSize: "10px", color: "rgba(192,40,42,0.6)", letterSpacing: "0.3em" }}>
            — THE SIGNAL
          </div>
          <h2 className="font-display" style={{ fontSize: "clamp(28px, 5vw, 56px)", color: "var(--bone)" }}>
            What&apos;s Coming
          </h2>
          <p className="mt-4 font-editorial" style={{ fontSize: "clamp(14px, 1.8vw, 18px)", color: "rgba(232,224,212,0.4)", maxWidth: "400px" }}>
            Some information is not yet available. Hover to decode.
          </p>
        </div>

        {/* Teaser items */}
        <div className="flex flex-col gap-2">
          {teasers.map((item, i) => (
            <div
              key={i}
              data-hover
              className="relative overflow-hidden transition-all duration-400 group"
              style={{
                padding: "20px 24px",
                border: "1px solid",
                borderColor: revealed === i ? item.hintColor : "rgba(255,255,255,0.05)",
                background: revealed === i ? "rgba(192,40,42,0.04)" : "rgba(255,255,255,0.01)",
                cursor: "pointer",
              }}
              onMouseEnter={() => setRevealed(i)}
              onMouseLeave={() => setRevealed(null)}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <div
                    className="font-display"
                    style={{
                      fontSize: "clamp(14px, 2vw, 18px)",
                      color: revealed === i ? item.hintColor : "rgba(232,224,212,0.6)",
                      transition: "color 0.3s",
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    className="font-mono transition-all duration-500"
                    style={{
                      fontSize: "11px",
                      color: revealed === i ? "rgba(232,224,212,0.4)" : "transparent",
                      filter: revealed === i ? "blur(0)" : "blur(4px)",
                      letterSpacing: revealed === i ? "0.1em" : "0.3em",
                    }}
                  >
                    {item.detail}
                  </div>
                </div>
                <div
                  className="font-mono flex-shrink-0"
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.2em",
                    color: item.hintColor,
                    opacity: 0.8,
                  }}
                >
                  {item.status}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress indicator */}
        <div className="mt-12 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-mono" style={{ fontSize: "9px", color: "rgba(232,224,212,0.2)", letterSpacing: "0.2em" }}>
              CHAPTER ONE — PROGRESS
            </span>
            <span className="font-mono" style={{ fontSize: "9px", color: "var(--xred)", letterSpacing: "0.1em" }}>
              ██░░░ 40%
            </span>
          </div>
          <div style={{ height: "1px", background: "rgba(255,255,255,0.06)" }}>
            <div
              style={{
                height: "1px",
                width: "40%",
                background: "linear-gradient(90deg, var(--ember), var(--xred))",
                boxShadow: "0 0 8px rgba(192,40,42,0.5)",
              }}
            />
          </div>
        </div>

        {/* CTA to vault */}
        <div className="mt-12">
          <p
            className="font-editorial mb-6"
            style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "rgba(232,224,212,0.5)" }}
          >
            Be first to know when Chapter One drops.
          </p>
          <a
            href="#vault"
            data-hover
            className="inline-block font-display pulse-border transition-all duration-300 hover:bg-[rgba(192,40,42,0.1)]"
            style={{
              border: "1px solid",
              padding: "14px 40px",
              fontSize: "11px",
              letterSpacing: "0.3em",
              color: "var(--bone)",
              textDecoration: "none",
            }}
          >
            GET EARLY ACCESS
          </a>
        </div>
      </div>
    </section>
  );
}
