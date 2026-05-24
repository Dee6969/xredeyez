import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CursorDot from "../../components/CursorDot";
import { getRoomIntro, roomIntros } from "../../data/rooms";

export function generateStaticParams() {
  return roomIntros.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoomIntro(slug);

  if (!room) {
    return { title: "Rooms | XRED EYEZ" };
  }

  return {
    title: `${room.name} | XRED EYEZ`,
    description: room.intro,
  };
}

export default async function RoomIntroPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const room = getRoomIntro(slug);

  if (!room) notFound();

  const currentIndex = roomIntros.findIndex((item) => item.slug === room.slug);
  const previous = roomIntros[(currentIndex - 1 + roomIntros.length) % roomIntros.length];
  const next = roomIntros[(currentIndex + 1) % roomIntros.length];

  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <div className="vignette-overlay" aria-hidden="true" />
      <CursorDot />

      <main
        className="relative min-h-screen overflow-hidden"
        style={{ background: "linear-gradient(180deg, #080606 0%, #130707 54%, #050505 100%)" }}
      >
        <div className="red-ambient" />

        <nav className="fixed left-6 right-6 top-6 z-40 flex items-center justify-between gap-4 md:left-10 md:right-10">
          <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/"
            data-hover
            className="nav-button"
          >
            HOME
          </Link>
          <Link
            href="/explore"
            data-hover
            className="nav-button nav-button-hot"
          >
            EXPLORE
          </Link>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/news" data-hover className="nav-button">
              NEWS ROOM
            </Link>
            <Link href="/vault" data-hover className="nav-button">
              VAULT
            </Link>
          </div>
        </nav>

        <section className="relative flex min-h-screen items-end overflow-hidden px-6 pb-12 pt-28 md:px-10 md:pb-20">
          <Image
            src={room.image}
            alt={room.name}
            fill
            priority
            sizes="100vw"
            style={{
              objectFit: "cover",
              filter: "brightness(0.82) contrast(1.08) saturate(0.95)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at 76% 32%, rgba(255,48,53,0.22), transparent 32%), linear-gradient(90deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.46) 42%, rgba(0,0,0,0.28) 100%), linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.84) 100%)",
            }}
          />

          <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-end">
            <div>
              <div className="font-mono" style={{ color: "var(--xred-hot)", fontSize: "13px", letterSpacing: "0.24em" }}>
                ROOM {room.number}
              </div>
              <h1
                className="mt-5 font-display"
                style={{ color: "var(--bone)", fontSize: "clamp(54px, 9vw, 132px)", lineHeight: 0.82 }}
              >
                {room.name}
              </h1>
            </div>
            <div>
              <div className="font-mono" style={{ color: "rgba(232,224,212,0.62)", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase" }}>
                {room.role}
              </div>
              <p
                className="mt-5 font-editorial"
                style={{ color: "rgba(232,224,212,0.78)", fontSize: "clamp(20px, 2.8vw, 34px)", lineHeight: 1.25 }}
              >
                {room.intro}
              </p>
            </div>
          </div>
        </section>

        <section className="relative px-6 py-16 md:px-10 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.8fr_1.2fr]">
            <aside>
              <div className="sticky top-24">
                <div className="eyebrow">INTRO BRIEFING</div>
                <h2 className="mt-5 font-display" style={{ color: "var(--bone)", fontSize: "clamp(30px, 4vw, 56px)", lineHeight: 0.94 }}>
                  Before you enter.
                </h2>
                <Link href="/explore" data-hover className="signal-link mt-8">
                  {room.cta}
                </Link>
              </div>
            </aside>

            <div className="grid gap-10">
              {room.briefing.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={index === 0 ? "font-editorial" : ""}
                  style={{
                    color: index === 0 ? "rgba(232,224,212,0.78)" : "rgba(232,224,212,0.58)",
                    fontSize: index === 0 ? "clamp(22px, 3vw, 34px)" : "clamp(16px, 1.8vw, 20px)",
                    lineHeight: index === 0 ? 1.32 : 1.8,
                  }}
                >
                  {paragraph}
                </p>
              ))}

              <div className="grid gap-px border border-white/[0.08] md:grid-cols-4">
                {room.codes.map((code, index) => (
                  <div key={code} className="red-edge min-h-[140px] p-5" style={{ background: "rgba(255,255,255,0.035)" }}>
                    <div className="font-mono" style={{ color: "var(--xred-hot)", fontSize: "10px", letterSpacing: "0.2em" }}>
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="mt-8 font-display" style={{ color: "var(--bone)", fontSize: "17px", lineHeight: 1 }}>
                      {code}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <nav className="relative grid border-t border-white/[0.08] md:grid-cols-2" aria-label="Room intros">
          <Link
            href={`/rooms/${previous.slug}`}
            data-hover
            className="min-h-[170px] p-8 transition-colors duration-300 hover:bg-white/[0.035]"
            style={{ textDecoration: "none" }}
          >
            <div className="font-mono" style={{ color: "rgba(232,224,212,0.34)", fontSize: "10px", letterSpacing: "0.2em" }}>
              PREVIOUS ROOM
            </div>
            <div className="mt-5 font-display" style={{ color: "var(--bone)", fontSize: "clamp(28px, 4.5vw, 58px)", lineHeight: 0.9 }}>
              {previous.name}
            </div>
          </Link>
          <Link
            href={`/rooms/${next.slug}`}
            data-hover
            className="min-h-[170px] border-t border-white/[0.08] p-8 text-right transition-colors duration-300 hover:bg-white/[0.035] md:border-l md:border-t-0"
            style={{ textDecoration: "none" }}
          >
            <div className="font-mono" style={{ color: "rgba(232,224,212,0.34)", fontSize: "10px", letterSpacing: "0.2em" }}>
              NEXT ROOM
            </div>
            <div className="mt-5 font-display" style={{ color: "var(--bone)", fontSize: "clamp(28px, 4.5vw, 58px)", lineHeight: 0.9 }}>
              {next.name}
            </div>
          </Link>
        </nav>
      </main>
    </>
  );
}
