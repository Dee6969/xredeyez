import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CursorDot from "../components/CursorDot";
import SiteFooter from "../components/SiteFooter";
import { getLegalPage, legalPages } from "../data/legal";

interface LegalRouteProps {
  params: Promise<{
    legal: string;
  }>;
}

export function generateStaticParams() {
  return legalPages.map((page) => ({ legal: page.slug }));
}

export async function generateMetadata({ params }: LegalRouteProps): Promise<Metadata> {
  const { legal } = await params;
  const page = getLegalPage(legal);

  if (!page) {
    return {
      title: "XRED EYEZ",
    };
  }

  return {
    title: `${page.title} | XRED EYEZ`,
    description: page.description,
  };
}

export default async function LegalPage({ params }: LegalRouteProps) {
  const { legal } = await params;
  const page = getLegalPage(legal);

  if (!page) notFound();

  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <div className="vignette-overlay" aria-hidden="true" />
      <CursorDot />

      <main
        className="relative min-h-screen overflow-hidden px-6 py-24 md:px-10"
        style={{ background: "linear-gradient(180deg, #080405 0%, #120607 46%, #060606 100%)" }}
      >
        <div className="red-ambient" />
        <nav className="fixed left-6 right-6 top-6 z-40 flex flex-wrap items-center justify-between gap-4 md:left-10 md:right-10">
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/" data-hover className="nav-button">
              HOME
            </Link>
            <Link href="/news" data-hover className="nav-button">
              NEWS ROOM
            </Link>
          </div>
          <Link href="/vault" data-hover className="nav-button nav-button-hot">
            ENTER VAULT
          </Link>
        </nav>

        <article className="relative z-10 mx-auto max-w-5xl">
          <header className="border-b border-white/[0.08] pb-12">
            <div className="eyebrow">{page.eyebrow}</div>
            <h1 className="mt-6 font-display" style={{ color: "var(--bone)", fontSize: "clamp(48px, 9vw, 118px)", lineHeight: 0.86 }}>
              {page.title}
            </h1>
            <p className="mt-8 max-w-3xl font-editorial" style={{ color: "rgba(232,224,212,0.66)", fontSize: "clamp(19px, 2.4vw, 30px)", lineHeight: 1.38 }}>
              {page.description}
            </p>
          </header>

          <div className="grid gap-10 py-14">
            {page.sections.map((section) => (
              <section key={section.heading} className="grid gap-5 md:grid-cols-[0.36fr_0.64fr]">
                <h2 className="font-display" style={{ color: "var(--bone)", fontSize: "clamp(24px, 3vw, 38px)", lineHeight: 1 }}>
                  {section.heading}
                </h2>
                <div className="grid gap-5">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} style={{ color: "rgba(232,224,212,0.62)", fontSize: "16px", lineHeight: 1.82 }}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
