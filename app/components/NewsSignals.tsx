"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Signal {
  slug: string;
  title: string;
  originalTitle: string;
  source: string;
  url: string;
  publishedAt: string;
  summary: string;
  category: string;
}

export default function NewsSignals() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let active = true;

    fetch("/api/news")
      .then((res) => {
        if (!res.ok) throw new Error("News unavailable");
        return res.json();
      })
      .then((data) => {
        if (!active) return;
        setSignals(data.signals || []);
        setStatus("ready");
      })
      .catch(() => {
        if (!active) return;
        setStatus("error");
      });

    return () => {
      active = false;
    };
  }, []);

  const visibleSignals = signals.slice(0, 6);

  return (
    <section
      className="relative overflow-hidden px-6 py-24 md:px-10"
      style={{ background: "linear-gradient(180deg, #090405 0%, #130708 48%, #070707 100%)" }}
      id="news"
    >
      <div className="red-ambient" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-14 grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <div className="eyebrow">GLOBAL CANNABIS SIGNALS</div>
            <h2 className="mt-5 font-display" style={{ color: "var(--bone)", fontSize: "clamp(38px, 6vw, 82px)", lineHeight: 0.9 }}>
              Daily watch.
            </h2>
          </div>
          <p className="font-editorial" style={{ color: "rgba(232,224,212,0.62)", fontSize: "clamp(17px, 2vw, 23px)", lineHeight: 1.45 }}>
            A daily scan of cannabis policy, genetics, culture, wellness formats, market movement, and enforcement stories from ports, cities, and borders around the world.
          </p>
        </div>

        {status === "loading" && (
          <div className="font-mono" style={{ color: "rgba(232,224,212,0.42)", fontSize: "11px", letterSpacing: "0.18em" }}>
            SCANNING GLOBAL SIGNALS...
          </div>
        )}

        {status === "error" && (
          <div className="font-mono" style={{ color: "rgba(255,48,53,0.75)", fontSize: "11px", letterSpacing: "0.18em" }}>
            SIGNAL TEMPORARILY UNAVAILABLE.
          </div>
        )}

        {status === "ready" && (
          <div className="grid gap-px overflow-hidden border border-white/[0.08] md:grid-cols-3">
            {visibleSignals.map((signal) => (
              <Link
                key={`${signal.source}-${signal.url}`}
                href={`/news/${signal.slug}`}
                data-hover
                className="red-edge min-h-[260px] p-6 transition-colors duration-300 hover:bg-white/[0.04]"
                style={{ background: "rgba(255,255,255,0.026)", textDecoration: "none" }}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono" style={{ color: "var(--xred-hot)", fontSize: "10px", letterSpacing: "0.18em" }}>
                    {signal.category}
                  </span>
                  <span className="font-mono" style={{ color: "rgba(232,224,212,0.28)", fontSize: "9px", letterSpacing: "0.12em" }}>
                    {new Date(signal.publishedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short" }).toUpperCase()}
                  </span>
                </div>
                <h3 className="mt-8 font-display" style={{ color: "var(--bone)", fontSize: "22px", lineHeight: 1.04 }}>
                  {signal.title}
                </h3>
                <p className="mt-5" style={{ color: "rgba(232,224,212,0.55)", fontSize: "13px", lineHeight: 1.65 }}>
                  {signal.summary}
                </p>
                <div className="mt-8 font-mono" style={{ color: "rgba(232,224,212,0.34)", fontSize: "9px", letterSpacing: "0.16em" }}>
                  X RED EYEZ SIGNAL / SOURCE: {signal.source}
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="font-mono" style={{ color: "rgba(232,224,212,0.28)", fontSize: "10px", letterSpacing: "0.16em" }}>
            UPDATED DAILY / ORIGINAL SIGNAL PAGES / SOURCE LINKS
          </p>
          <Link href="/news" data-hover className="signal-link">
            OPEN NEWS ROOM
          </Link>
        </div>
      </div>
    </section>
  );
}
