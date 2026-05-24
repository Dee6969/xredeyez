import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CursorDot from "../../components/CursorDot";
import { getCannabisSignalBySlug, getCannabisSignals } from "../../data/news";

interface SignalPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 86400;

export async function generateStaticParams() {
  const signals = await getCannabisSignals(36);
  return signals.map((signal) => ({ slug: signal.slug }));
}

export async function generateMetadata({ params }: SignalPageProps): Promise<Metadata> {
  const { slug } = await params;
  const signal = await getCannabisSignalBySlug(slug);

  if (!signal) {
    return {
      title: "Signal Not Found | XRED EYEZ",
    };
  }

  return {
    title: `${signal.title} | XRED EYEZ`,
    description: signal.summary,
    alternates: {
      canonical: `/news/${signal.slug}`,
    },
  };
}

export default async function SignalPage({ params }: SignalPageProps) {
  const { slug } = await params;
  const signal = await getCannabisSignalBySlug(slug);

  if (!signal) notFound();

  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <div className="vignette-overlay" aria-hidden="true" />
      <CursorDot />

      <main
        className="relative min-h-screen overflow-hidden px-6 py-24 md:px-10"
        style={{ background: "linear-gradient(180deg, #080405 0%, #160708 38%, #060606 100%)" }}
      >
        <div className="red-ambient" />
        <nav className="fixed left-6 right-6 top-6 z-40 flex flex-wrap items-center justify-between gap-4 md:left-10 md:right-10">
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/news" data-hover className="nav-button">
              NEWS ROOM
            </Link>
            <Link href="/" data-hover className="nav-button">
              HOME
            </Link>
          </div>
          <Link href="/vault" data-hover className="nav-button nav-button-hot">
            ENTER VAULT
          </Link>
        </nav>

        <article className="relative z-10 mx-auto max-w-6xl">
          <header
            className="relative overflow-hidden border border-white/[0.08]"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.045), rgba(192,40,42,0.08) 44%, rgba(0,0,0,0.2))",
            }}
          >
            <div className="red-ambient" />
            <div className="relative z-10 grid min-h-[58vh] gap-10 p-8 md:grid-cols-[0.75fr_1.25fr] md:items-end md:p-12">
              <div>
                <div className="eyebrow">{signal.article.kicker}</div>
                <div className="mt-8 font-mono" style={{ color: "var(--xred-hot)", fontSize: "10px", letterSpacing: "0.2em" }}>
                  {signal.category} / {new Date(signal.publishedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }).toUpperCase()}
                </div>
              </div>
              <div>
                <h1 className="font-display" style={{ color: "var(--bone)", fontSize: "clamp(42px, 7vw, 96px)", lineHeight: 0.9 }}>
                  {signal.title}
                </h1>
                <p className="mt-8 font-editorial" style={{ color: "rgba(232,224,212,0.68)", fontSize: "clamp(18px, 2.2vw, 28px)", lineHeight: 1.38 }}>
                  {signal.article.intro}
                </p>
              </div>
            </div>
          </header>

          <section className="grid gap-12 py-14 md:grid-cols-[0.72fr_1.28fr]">
            <aside className="red-edge h-fit border border-white/[0.08] p-6" style={{ background: "rgba(255,255,255,0.03)" }}>
              <div className="font-mono" style={{ color: "rgba(232,224,212,0.36)", fontSize: "9px", letterSpacing: "0.18em" }}>
                ORIGINAL SOURCE SIGNAL
              </div>
              <h2 className="mt-5 font-display" style={{ color: "var(--bone)", fontSize: "24px", lineHeight: 1.04 }}>
                {signal.originalTitle}
              </h2>
              <p className="mt-5" style={{ color: "rgba(232,224,212,0.54)", fontSize: "13px", lineHeight: 1.7 }}>
                {signal.summary}
              </p>
              <a href={signal.url} target="_blank" rel="noreferrer" data-hover className="signal-link mt-8 inline-flex">
                READ ORIGINAL SOURCE
              </a>
            </aside>

            <div className="space-y-12">
              {signal.article.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="font-display" style={{ color: "var(--bone)", fontSize: "clamp(26px, 3vw, 42px)", lineHeight: 1 }}>
                    {section.heading}
                  </h2>
                  <p className="mt-5" style={{ color: "rgba(232,224,212,0.66)", fontSize: "17px", lineHeight: 1.85 }}>
                    {section.body}
                  </p>
                </section>
              ))}

              <section className="border-t border-white/[0.08] pt-10">
                <div className="font-mono" style={{ color: "var(--xred-hot)", fontSize: "10px", letterSpacing: "0.2em" }}>
                  SOURCE CREDIT
                </div>
                <p className="mt-5" style={{ color: "rgba(232,224,212,0.54)", fontSize: "14px", lineHeight: 1.75 }}>
                  {signal.article.sourceNote}
                </p>
              </section>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
