"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { dnaSections as items } from "../data/dna";

export default function CultureWall() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      className="relative min-h-screen overflow-hidden py-24 px-6"
      style={{ background: "linear-gradient(180deg, #111 0%, #080b08 50%, #111 100%)" }}
      id="culture"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 20%, rgba(71,140,75,0.16), transparent 58%), radial-gradient(ellipse at 86% 14%, rgba(255,48,53,0.13), transparent 34%)" }}
      />
      <div className="red-ambient" />
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-16">
          <div className="font-mono mb-4" style={{ fontSize: "10px", color: "rgba(192,40,42,0.6)", letterSpacing: "0.3em" }}>
            — CULTURE
          </div>
          <h2 className="font-display" style={{ fontSize: "clamp(28px, 5vw, 56px)", color: "var(--bone)" }}>
            The DNA
          </h2>
          <p className="mt-4 font-editorial" style={{ fontSize: "clamp(16px, 2vw, 22px)", color: "rgba(232,224,212,0.56)", maxWidth: "620px", lineHeight: 1.45 }}>
            Four codes shape the world: sound, object, ritual, and origin. Everything else grows from there.
          </p>
        </div>

        {/* Grid */}
        <div
          className="grid gap-3 md:grid-cols-2"
        >
          {items.map((item, i) => (
            <Link
              key={item.slug}
              href={`/dna/${item.slug}`}
              data-hover
              className="red-edge relative overflow-hidden text-left transition-all duration-500"
              style={{
                background: "#050505",
                aspectRatio: "1.45 / 1",
                cursor: "pointer",
                transform: hovered === i ? "scale(1.02)" : "scale(1)",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: 0,
                textDecoration: "none",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              aria-label={`Open ${item.label} DNA content`}
            >
              <Image
                src={item.image}
                alt={`${item.label} - ${item.aspect}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{
                  objectFit: "cover",
                  objectPosition: item.position,
                  transform: hovered === i ? "scale(1.1)" : "scale(1)",
                  transition: "transform 900ms ease, filter 500ms ease, opacity 500ms ease",
                  filter: hovered === i
                    ? "brightness(1.24) contrast(1.08) saturate(1.2)"
                    : "brightness(0.76) contrast(1.04) saturate(0.96)",
                  opacity: hovered === i ? 1 : 0.92,
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: hovered === i
                    ? "radial-gradient(ellipse at 55% 35%, rgba(150,255,165,0.2), transparent 46%), linear-gradient(180deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.16) 42%, rgba(0,0,0,0.78) 100%)"
                    : "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.28) 38%, rgba(0,0,0,0.74) 100%)",
                  transition: "background 400ms ease",
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                style={{
                  opacity: hovered === i ? 1 : 0,
                  boxShadow: `inset 0 0 80px ${item.accent}, 0 0 28px ${item.accent}`,
                }}
              />

              {/* Accent line top */}
              <div
                className="absolute top-0 left-0 right-0"
                style={{
                  height: "2px",
                  background: item.accent,
                  opacity: hovered === i ? 1 : 0.3,
                  transition: "opacity 0.3s",
                }}
              />

              {/* Content */}
              <div className="absolute inset-0 p-5 flex flex-col justify-between">
                <div>
                  <div
                    className="font-display"
                    style={{
                      fontSize: "clamp(28px, 5.6vw, 72px)",
                      color: hovered === i ? item.accent : "var(--bone)",
                      textShadow: "0 2px 18px rgba(0,0,0,0.75)",
                      lineHeight: 0.9,
                      transition: "color 0.3s",
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    className="font-mono mt-1"
                    style={{ fontSize: "9px", color: "rgba(232,224,212,0.3)", letterSpacing: "0.15em" }}
                  >
                    {item.city}
                  </div>
                </div>

                <div
                  className="transition-all duration-400"
                  style={{
                    opacity: hovered === i ? 1 : 0.78,
                    transform: hovered === i ? "translateY(0)" : "translateY(8px)",
                  }}
                >
                  <div
                    className="font-display mb-3"
                    style={{
                      fontSize: "clamp(16px, 2.1vw, 24px)",
                      color: hovered === i ? item.accent : "rgba(232,224,212,0.86)",
                      lineHeight: 1.05,
                    }}
                  >
                    {hovered === i ? item.title : item.description}
                  </div>
                  <p
                    className="font-editorial"
                    style={{ fontSize: "clamp(13px, 1.4vw, 16px)", color: "rgba(232,224,212,0.68)", lineHeight: 1.5, maxWidth: "440px" }}
                  >
                    {hovered === i ? item.content : "Open the full room."}
                  </p>
                  <div
                    className="font-mono mt-3"
                    style={{ fontSize: "9px", color: hovered === i ? item.accent : "rgba(232,224,212,0.32)", letterSpacing: "0.1em", lineHeight: 1.5 }}
                  >
                    {hovered === i ? "ENTER SECTION" : item.aspect}
                  </div>
                </div>
              </div>

              {/* Index number */}
              <div
                className="absolute bottom-4 right-4 font-mono"
                style={{ fontSize: "9px", color: "rgba(232,224,212,0.1)", letterSpacing: "0.1em" }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
            </Link>
          ))}
        </div>

        {/* Footer line */}
        <div className="mt-16 flex items-center gap-4">
          <div className="glow-line flex-1" />
          <span className="font-mono" style={{ fontSize: "9px", color: "rgba(232,224,212,0.2)", letterSpacing: "0.2em" }}>
            MORE COMING
          </span>
          <div className="glow-line flex-1" />
        </div>
      </div>
    </section>
  );
}
