"use client";
import { useState } from "react";

interface Artefact {
  year: string;
  title: string;
  type: string;
  description: string;
  detail: string;
}

const artefacts: Artefact[] = [
  {
    year: "2019",
    title: "The Original Vision",
    type: "DOCUMENT",
    description: "The first articulation of what XRED EYEZ could be.",
    detail: "Written in one sitting. Most of it still stands. The frequency was clear from the beginning.",
  },
  {
    year: "2020",
    title: "First Sample",
    type: "OBJECT",
    description: "The prototype that proved the concept.",
    detail: "Not perfect. But it was real. And real was enough.",
  },
  {
    year: "2021",
    title: "The Community Finds Us",
    type: "MOMENT",
    description: "Before we had a website. Before we had a launch.",
    detail: "Word moved through the people who mattered. That's always how it works.",
  },
  {
    year: "2022",
    title: "Quiet Period",
    type: "ARCHIVE",
    description: "We went silent. Not gone. Thinking.",
    detail: "Every brand that means something has a period of silence. Ours was deliberate.",
  },
  {
    year: "2023",
    title: "The Rebuild Begins",
    type: "DOCUMENT",
    description: "Everything re-examined. Nothing kept that didn't deserve to stay.",
    detail: "Standards raised. Team tightened. Direction sharpened.",
  },
  {
    year: "2025",
    title: "Chapter One",
    type: "INCOMING",
    description: "The return. Deliberate. Controlled. Ready.",
    detail: "This is not a comeback. This is the arrival.",
  },
];

export default function ArchiveRoom() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section
      className="relative min-h-screen py-24 px-6 overflow-hidden"
      style={{ background: "var(--void)" }}
      id="archive"
    >
      <div className="red-ambient" />
      {/* Archive grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background: "repeating-linear-gradient(0deg, transparent 0px, transparent 4px, rgba(232,224,212,0.005) 4px, rgba(232,224,212,0.005) 5px)",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-16">
          <div className="font-mono mb-4" style={{ fontSize: "10px", color: "rgba(192,40,42,0.6)", letterSpacing: "0.3em" }}>
            — ARCHIVE
          </div>
          <h2
            data-hover
            className="font-display record-title"
            style={{ fontSize: "clamp(28px, 5vw, 56px)", color: "var(--bone)" }}
          >
            The Record
          </h2>
          <p className="mt-4 font-editorial" style={{ fontSize: "clamp(14px, 1.8vw, 18px)", color: "rgba(232,224,212,0.4)", maxWidth: "440px" }}>
            This brand has a past. These are the moments that count.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute top-0 bottom-0"
            style={{
              left: "clamp(40px, 6vw, 80px)",
              width: "1px",
              background: "linear-gradient(180deg, transparent, rgba(192,40,42,0.3) 20%, rgba(192,40,42,0.3) 80%, transparent)",
            }}
          />

          <div className="flex flex-col gap-1">
            {artefacts.map((item, i) => {
              const isIncoming = item.type === "INCOMING";
              const isOpen = expanded === i;

              return (
                <div
                  key={i}
                  className="relative"
                  style={{ paddingLeft: "clamp(80px, 12vw, 140px)" }}
                >
                  {/* Year marker on timeline */}
                  <div
                    className="absolute flex items-center gap-3"
                    style={{
                      left: 0,
                      top: "18px",
                      width: "clamp(70px, 10vw, 120px)",
                      justifyContent: "flex-end",
                    }}
                  >
                    <span
                      className="font-mono"
                      style={{
                        fontSize: "10px",
                        color: isIncoming ? "var(--xred)" : "rgba(232,224,212,0.25)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {item.year}
                    </span>
                    {/* Dot on line */}
                    <div
                      style={{
                        width: isOpen ? "8px" : "5px",
                        height: isOpen ? "8px" : "5px",
                        borderRadius: "50%",
                        background: isIncoming ? "var(--xred)" : isOpen ? "var(--bone)" : "rgba(192,40,42,0.4)",
                        flexShrink: 0,
                        transition: "all 0.3s",
                        boxShadow: isIncoming ? "0 0 12px rgba(192,40,42,0.6)" : "none",
                      }}
                    />
                  </div>

                  {/* Card */}
                  <div
                    data-hover
                    className="group transition-all duration-300"
                    style={{
                      borderLeft: isOpen ? "1px solid rgba(192,40,42,0.4)" : "1px solid rgba(255,255,255,0.04)",
                      padding: "18px 20px",
                      marginBottom: "2px",
                      background: isOpen ? "rgba(192,40,42,0.04)" : "transparent",
                      cursor: "pointer",
                    }}
                    onClick={() => setExpanded(isOpen ? null : i)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div
                          className="font-mono mb-1"
                          style={{ fontSize: "9px", color: isIncoming ? "var(--xred)" : "rgba(232,224,212,0.3)", letterSpacing: "0.2em" }}
                        >
                          {item.type}
                        </div>
                        <div
                          className="font-display"
                          style={{
                            fontSize: "clamp(14px, 2vw, 18px)",
                            color: isOpen ? "var(--bone)" : "rgba(232,224,212,0.7)",
                          }}
                        >
                          {item.title}
                        </div>
                        <p
                          className="mt-1"
                          style={{ fontSize: "13px", color: "rgba(232,224,212,0.4)", lineHeight: 1.5 }}
                        >
                          {item.description}
                        </p>
                      </div>
                      <div
                        className="font-mono flex-shrink-0 transition-transform duration-300"
                        style={{
                          fontSize: "12px",
                          color: "rgba(232,224,212,0.2)",
                          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                        }}
                      >
                        +
                      </div>
                    </div>

                    {/* Expanded detail */}
                    <div
                      className="overflow-hidden transition-all duration-500"
                      style={{ maxHeight: isOpen ? "120px" : "0px", opacity: isOpen ? 1 : 0 }}
                    >
                      <p
                        className="mt-4 font-editorial"
                        style={{
                          fontSize: "clamp(14px, 1.6vw, 16px)",
                          color: "rgba(232,224,212,0.6)",
                          lineHeight: 1.7,
                          borderTop: "1px solid rgba(255,255,255,0.06)",
                          paddingTop: "14px",
                        }}
                      >
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className="mt-12 font-mono"
          style={{ fontSize: "10px", color: "rgba(232,224,212,0.15)", letterSpacing: "0.2em", paddingLeft: "clamp(80px, 12vw, 140px)" }}
        >
          THE NEXT CHAPTER IS LOADING —
        </div>
      </div>
    </section>
  );
}
