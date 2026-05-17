import type { Metadata } from "next";
import Link from "next/link";
import CursorDot from "../components/CursorDot";
import { getCannabisSignals } from "../data/news";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Global Cannabis Signals | XRED EYEZ",
  description: "Daily cannabis news signals covering policy, genetics, culture, wellness, enforcement, and market movement.",
};

export default async function NewsPage() {
  const signals = await getCannabisSignals(24);

  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <div className="vignette-overlay" aria-hidden="true" />
      <CursorDot />

      <main
        className="relative min-h-screen overflow-hidden px-6 py-24 md:px-10"
        style={{ background: "linear-gradient(180deg, #080405 0%, #140708 45%, #060606 100%)" }}
      >
        <div className="red-ambient" />
        <nav className="fixed left-6 right-6 top-6 z-40 flex flex-wrap items-center justify-between gap-4 md:left-10 md:right-10">
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/?inside=1#news" data-hover className="nav-button">
              BACK TO WORLD
            </Link>
            <Link href="/?inside=1#gallery" data-hover className="nav-button">
              GALLERY
            </Link>
          </div>
          <Link href="/vault" data-hover className="nav-button nav-button-hot">
            ENTER VAULT
          </Link>
        </nav>

        <section className="relative z-10 mx-auto max-w-6xl">
          <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <div>
              <div className="eyebrow">NEWS ROOM</div>
              <h1 className="mt-5 font-display" style={{ color: "var(--bone)", fontSize: "clamp(50px, 9vw, 132px)", lineHeight: 0.84 }}>
                Global<br />signals.
              </h1>
            </div>
            <p className="font-editorial" style={{ color: "rgba(232,224,212,0.66)", fontSize: "clamp(19px, 2.4vw, 30px)", lineHeight: 1.35 }}>
              A daily editorial scan of cannabis policy, genetics, retail, culture, wellness formats, market movement, and enforcement stories from ports, cities, and borders. Each signal opens into original X Red Eyez commentary with source credit inside.
            </p>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden border border-white/[0.08] md:grid-cols-2 lg:grid-cols-3">
            {signals.map((signal) => (
              <Link
                key={`${signal.source}-${signal.url}`}
                href={`/news/${signal.slug}`}
                data-hover
                className="red-edge min-h-[300px] p-6 transition-colors duration-300 hover:bg-white/[0.04]"
                style={{ background: "rgba(255,255,255,0.028)", textDecoration: "none" }}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono" style={{ color: "var(--xred-hot)", fontSize: "10px", letterSpacing: "0.18em" }}>
                    {signal.category}
                  </span>
                  <span className="font-mono" style={{ color: "rgba(232,224,212,0.28)", fontSize: "9px", letterSpacing: "0.12em" }}>
                    {new Date(signal.publishedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase()}
                  </span>
                </div>
                <h2 className="mt-8 font-display" style={{ color: "var(--bone)", fontSize: "24px", lineHeight: 1.04 }}>
                  {signal.title}
                </h2>
                <p className="mt-5" style={{ color: "rgba(232,224,212,0.58)", fontSize: "14px", lineHeight: 1.7 }}>
                  {signal.summary}
                </p>
                <div className="mt-8 font-mono" style={{ color: "rgba(232,224,212,0.34)", fontSize: "9px", letterSpacing: "0.16em" }}>
                  X RED EYEZ SIGNAL / SOURCE: {signal.source}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
