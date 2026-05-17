import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CursorDot from "../../components/CursorDot";
import { dnaSections, getDnaSection } from "../../data/dna";

export function generateStaticParams() {
  return dnaSections.map((section) => ({ slug: section.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const section = getDnaSection(slug);

  if (!section) {
    return { title: "DNA | XRED EYEZ" };
  }

  return {
    title: `${section.label} | XRED EYEZ DNA`,
    description: section.intro,
  };
}

export default async function DnaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const section = getDnaSection(slug);

  if (!section) notFound();

  const currentIndex = dnaSections.findIndex((item) => item.slug === section.slug);
  const previous = dnaSections[(currentIndex - 1 + dnaSections.length) % dnaSections.length];
  const next = dnaSections[(currentIndex + 1) % dnaSections.length];

  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <div className="vignette-overlay" aria-hidden="true" />
      <CursorDot />

      <main
        className="relative min-h-screen overflow-hidden"
        style={{ background: "linear-gradient(180deg, #050706 0%, #111 48%, #060606 100%)" }}
      >
        <div className="red-ambient" />
        <div className="fixed left-6 right-6 top-6 z-40 flex flex-wrap items-center justify-between gap-4 md:left-10 md:right-10">
          <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/?inside=1#culture"
            data-hover
            className="nav-button"
          >
            BACK TO DNA
          </Link>
          <Link
            href="/news"
            data-hover
            className="nav-button"
          >
            NEWS ROOM
          </Link>
          </div>
          <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/vault"
            data-hover
            className="nav-button nav-button-hot"
          >
            ENTER VAULT
          </Link>
          </div>
        </div>

        <section className="relative flex min-h-screen items-end overflow-hidden px-6 pb-16 pt-28 md:px-10 md:pb-24">
          <Image
            src={section.image}
            alt={`${section.label} - ${section.aspect}`}
            fill
            priority
            sizes="100vw"
            style={{
              objectFit: "cover",
              objectPosition: section.position,
              filter: "brightness(0.78) contrast(1.05) saturate(1)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at 62% 36%, ${section.accent}, transparent 36%), radial-gradient(ellipse at 20% 18%, rgba(255,48,53,0.18), transparent 36%), linear-gradient(90deg, rgba(0,0,0,0.76) 0%, rgba(0,0,0,0.38) 46%, rgba(0,0,0,0.28) 100%), linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.76) 100%)`,
              opacity: 0.76,
            }}
          />
          <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <div>
              <div className="eyebrow">DNA / {section.city}</div>
              <h1
                className="mt-5 font-display"
                style={{ color: "var(--bone)", fontSize: "clamp(58px, 12vw, 150px)", lineHeight: 0.82 }}
              >
                {section.label}
              </h1>
            </div>
            <div>
              <div className="font-mono" style={{ color: section.accent, fontSize: "11px", letterSpacing: "0.22em" }}>
                {section.aspect}
              </div>
              <p
                className="mt-5 font-editorial"
                style={{ color: "rgba(232,224,212,0.72)", fontSize: "clamp(20px, 2.8vw, 34px)", lineHeight: 1.25 }}
              >
                {section.intro}
              </p>
            </div>
          </div>
        </section>

        <section className="relative px-6 py-20 md:px-10 md:py-28">
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${section.accent}, transparent)` }}
          />
          <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[0.8fr_1.2fr]">
            <aside>
              <div className="sticky top-24">
                <div className="font-mono" style={{ color: "rgba(232,224,212,0.28)", fontSize: "10px", letterSpacing: "0.2em" }}>
                  SECTION NOTES
                </div>
                <h2 className="mt-5 font-display" style={{ color: "var(--bone)", fontSize: "clamp(28px, 4vw, 54px)", lineHeight: 0.96 }}>
                  {section.title}
                </h2>
                <p className="mt-6" style={{ color: "rgba(232,224,212,0.44)", fontSize: "14px", lineHeight: 1.7 }}>
                  {section.signal}
                </p>
              </div>
            </aside>

            <div className="grid gap-12">
              {section.editorial.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={index === 0 ? "font-editorial" : ""}
                  style={{
                    color: index === 0 ? "rgba(232,224,212,0.78)" : "rgba(232,224,212,0.58)",
                    fontSize: index === 0 ? "clamp(22px, 3vw, 36px)" : "clamp(16px, 1.7vw, 20px)",
                    lineHeight: index === 0 ? 1.32 : 1.8,
                  }}
                >
                  {paragraph}
                </p>
              ))}

              <div className="grid gap-px border border-white/[0.06] md:grid-cols-2">
                {section.codes.map((code, index) => (
                  <div key={code} className="min-h-[150px] p-6" style={{ background: "rgba(255,255,255,0.025)" }}>
                    <div className="font-mono" style={{ color: section.accent, fontSize: "10px", letterSpacing: "0.2em" }}>
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="mt-8 font-display" style={{ color: "var(--bone)", fontSize: "20px", lineHeight: 1 }}>
                      {code}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid gap-px border border-white/[0.08] lg:grid-cols-2">
                <div className="red-edge p-7 md:p-8" style={{ background: "rgba(255,255,255,0.035)" }}>
                  <div className="font-mono" style={{ color: section.accent, fontSize: "10px", letterSpacing: "0.2em" }}>
                    GENETICS DESK
                  </div>
                  <div className="mt-6 grid gap-5">
                    {section.genetics.map((item) => (
                      <p key={item} style={{ color: "rgba(232,224,212,0.62)", fontSize: "14px", lineHeight: 1.7 }}>
                        {item}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="red-edge p-7 md:p-8" style={{ background: "rgba(255,255,255,0.035)" }}>
                  <div className="font-mono" style={{ color: "var(--xred-hot)", fontSize: "10px", letterSpacing: "0.2em" }}>
                    GLOBAL CANNABIS SIGNALS
                  </div>
                  <div className="mt-6 grid gap-5">
                    {section.worldSignals.map((item) => (
                      <p key={item} style={{ color: "rgba(232,224,212,0.62)", fontSize: "14px", lineHeight: 1.7 }}>
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className="relative overflow-hidden border border-white/[0.08] p-8 md:p-10"
                style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.035), rgba(255,255,255,0.01))" }}
              >
                <div
                  className="absolute inset-x-0 top-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${section.accent}, transparent)` }}
                />
                <div className="font-mono" style={{ color: section.accent, fontSize: "10px", letterSpacing: "0.2em" }}>
                  {section.dispatchTitle}
                </div>
                <p className="mt-6 font-editorial" style={{ color: "rgba(232,224,212,0.72)", fontSize: "clamp(19px, 2.3vw, 28px)", lineHeight: 1.45 }}>
                  {section.dispatch}
                </p>
              </div>

              <p className="font-display" style={{ color: section.accent, fontSize: "clamp(24px, 4vw, 48px)", lineHeight: 1 }}>
                {section.closing}
              </p>
            </div>
          </div>
        </section>

        <nav className="relative grid border-t border-white/[0.06] md:grid-cols-2" aria-label="DNA sections">
          <Link
            href={`/dna/${previous.slug}`}
            data-hover
            className="group min-h-[180px] p-8 transition-colors duration-300 hover:bg-white/[0.03]"
            style={{ textDecoration: "none" }}
          >
            <div className="font-mono" style={{ color: "rgba(232,224,212,0.28)", fontSize: "10px", letterSpacing: "0.2em" }}>
              PREVIOUS
            </div>
            <div className="mt-6 font-display" style={{ color: "var(--bone)", fontSize: "clamp(28px, 5vw, 62px)", lineHeight: 0.9 }}>
              {previous.label}
            </div>
          </Link>
          <Link
            href={`/dna/${next.slug}`}
            data-hover
            className="group min-h-[180px] border-t border-white/[0.06] p-8 text-right transition-colors duration-300 hover:bg-white/[0.03] md:border-l md:border-t-0"
            style={{ textDecoration: "none" }}
          >
            <div className="font-mono" style={{ color: "rgba(232,224,212,0.28)", fontSize: "10px", letterSpacing: "0.2em" }}>
              NEXT
            </div>
            <div className="mt-6 font-display" style={{ color: "var(--bone)", fontSize: "clamp(28px, 5vw, 62px)", lineHeight: 0.9 }}>
              {next.label}
            </div>
          </Link>
        </nav>
      </main>
    </>
  );
}
