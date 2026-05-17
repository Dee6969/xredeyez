"use client";
import { useEffect, useRef, useState } from "react";

const lines = [
  "We don't explain ourselves.",
  "We don't chase.",
  "We don't ask permission.",
  "XRED EYEZ was built for people who already know.",
  "The frequency is either yours or it isn't.",
  "We see what others walk past.",
  "We move when others wait.",
  "This isn't for everyone.",
  "That's the point.",
];

export default function ManifestoRoom() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleLines, setVisibleLines] = useState<boolean[]>(lines.map(() => false));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt((entry.target as HTMLElement).dataset.idx || "0");
            setTimeout(() => {
              setVisibleLines((prev) => {
                const next = [...prev];
                next[idx] = true;
                return next;
              });
            }, idx * 120);
          }
        });
      },
      { threshold: 0.3 }
    );

    const lineEls = containerRef.current?.querySelectorAll("[data-idx]");
    lineEls?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--void)" }}
      id="manifesto"
    >
      {/* Concrete wall texture suggestion */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(36,18,18,1) 0%, rgba(10,10,10,1) 100%)",
        }}
      />
      <div className="red-ambient" />
      {/* Single overhead light */}
      <div
        className="absolute top-0 left-1/2 pointer-events-none"
        style={{
          transform: "translateX(-50%)",
          width: "2px",
          height: "40px",
          background: "rgba(232,224,212,0.15)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "clamp(200px, 30vw, 400px)",
          height: "clamp(200px, 50vh, 500px)",
          background: "radial-gradient(ellipse at top, rgba(232,224,212,0.1) 0%, transparent 70%)",
        }}
      />

      <div ref={containerRef} className="relative z-10 px-8 py-24 max-w-3xl w-full mx-auto">
        {/* Room label */}
        <div
          className="font-mono mb-16 anim-fade-up"
          style={{ fontSize: "10px", color: "rgba(192,40,42,0.6)", letterSpacing: "0.3em" }}
        >
          — MANIFESTO
        </div>

        {/* Manifesto lines */}
        <div className="flex flex-col gap-6">
          {lines.map((line, i) => (
            <p
              key={i}
              data-idx={i}
              className="font-editorial transition-all duration-700"
              style={{
                fontSize: "clamp(20px, 3.5vw, 36px)",
                lineHeight: 1.3,
                color: visibleLines[i]
                  ? i === lines.length - 1
                    ? "var(--xred)"
                    : "var(--bone)"
                  : "transparent",
                transform: visibleLines[i] ? "translateY(0)" : "translateY(16px)",
                opacity: visibleLines[i] ? 1 : 0,
              }}
            >
              {line}
            </p>
          ))}
        </div>

        {/* Divider */}
        <div className="glow-line mt-16 mb-6" />
        <div
          className="font-mono"
          style={{ fontSize: "10px", color: "rgba(232,224,212,0.2)", letterSpacing: "0.2em" }}
        >
          XRED EYEZ — EST. MMXXV
        </div>
      </div>
    </section>
  );
}
