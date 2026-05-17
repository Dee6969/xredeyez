"use client";
import Image from "next/image";
import { useRef, useState } from "react";

interface Slide {
  title: string;
  subtitle: string;
  palette: string[];
  mood: string;
  image: string;
  copy: string;
}

const slides: Slide[] = [
  {
    title: "2am somewhere",
    subtitle: "London, UK",
    palette: ["#0A0509", "#1A0A0A", "#C0282A"],
    mood: "NIGHT / MOVEMENT",
    image: "/banners/2am-somewhere.png",
    copy: "Late-night city energy, quiet rituals, and the feeling that the brand is alive after the ordinary world goes silent.",
  },
  {
    title: "The right room",
    subtitle: "Amsterdam, NL",
    palette: ["#0A0509", "#2A1026", "#D3358C"],
    mood: "SPACE / BELONGING",
    image: "/banners/the-right-room.png",
    copy: "A lifestyle space for conversation, taste, music, and shared codes. The brand belongs in rooms with atmosphere.",
  },
  {
    title: "Before the drop",
    subtitle: "Los Angeles, US",
    palette: ["#050806", "#132406", "#7AB828"],
    mood: "WARMTH / TENSION",
    image: "/banners/before-the-drop.png",
    copy: "Anticipation before product. Build the want, protect the mystery, let Chapter One feel earned.",
  },
  {
    title: "Between sessions",
    subtitle: "Amsterdam, NL",
    palette: ["#060608", "#170817", "#84C51F"],
    mood: "RITUAL / WELLNESS",
    image: "/banners/between-sessions.png",
    copy: "Movement, reset, nutrition, recovery, and the health-led side of cannabis lifestyle culture.",
  },
  {
    title: "Seen differently",
    subtitle: "Worldwide",
    palette: ["#0A0A0A", "#140A0A", "#C0282A"],
    mood: "XRED EYEZ",
    image: "/banners/seen-differently.png",
    copy: "The core signal: sharper vision, deeper culture, and a brand that looks at the world from its own angle.",
  },
];

export default function LifestyleGallery() {
  const [current, setCurrent] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);

  const prev = () => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));

  const onDragStart = (x: number) => {
    setDragging(true);
    startX.current = x;
  };

  const onDragEnd = (x: number) => {
    if (!dragging) return;
    setDragging(false);
    const delta = startX.current - x;
    if (Math.abs(delta) > 50) {
      if (delta > 0) next();
      else prev();
    }
  };

  const slide = slides[current];

  return (
    <section
      className="relative min-h-screen overflow-hidden px-6 py-24 md:px-10"
      style={{ background: "linear-gradient(180deg, #070707 0%, #120606 52%, #070707 100%)" }}
      id="gallery"
    >
      <div className="red-ambient" />
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-12rem)] w-full max-w-7xl flex-col justify-center gap-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="font-mono mb-3" style={{ fontSize: "10px", color: "rgba(192,40,42,0.62)", letterSpacing: "0.3em" }}>
              GALLERY
            </div>
            <h2 className="font-display" style={{ fontSize: "clamp(34px, 6vw, 78px)", color: "var(--bone)", lineHeight: 0.92 }}>
              Lifestyle Signals
            </h2>
          </div>
          <div className="font-mono" style={{ fontSize: "10px", color: "rgba(232,224,212,0.32)", letterSpacing: "0.2em" }}>
            {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </div>
        </header>

        <div
          className="relative overflow-hidden border border-white/[0.08] bg-black select-none"
          style={{ cursor: "ew-resize" }}
          onMouseDown={(e) => onDragStart(e.clientX)}
          onMouseUp={(e) => onDragEnd(e.clientX)}
          onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
          onTouchEnd={(e) => onDragEnd(e.changedTouches[0].clientX)}
        >
          <div className="relative w-full" style={{ aspectRatio: "2.66 / 1", minHeight: "260px" }}>
            <Image
              key={slide.image}
              src={slide.image}
              alt={`${slide.title} X Red Eyez banner`}
              fill
              priority
              sizes="100vw"
              style={{
                objectFit: "contain",
                objectPosition: "center",
                filter: "brightness(1.06) contrast(1.04) saturate(1.04)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                boxShadow: `inset 0 0 90px rgba(0,0,0,0.34), inset 0 -50px 90px ${slide.palette[2]}18`,
              }}
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <div className="font-mono" style={{ fontSize: "9px", color: slide.palette[2], letterSpacing: "0.24em" }}>
              {slide.mood} / {slide.subtitle}
            </div>
            <h3 className="mt-3 font-display" style={{ fontSize: "clamp(30px, 5vw, 72px)", color: "var(--bone)", lineHeight: 0.94 }}>
              {slide.title}
            </h3>
            <p className="mt-4 max-w-2xl" style={{ fontSize: "clamp(15px, 1.8vw, 19px)", color: "rgba(232,224,212,0.58)", lineHeight: 1.62 }}>
              {slide.copy}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={prev}
              data-hover
              className="font-mono transition-colors duration-200 hover:text-[var(--bone)]"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "11px",
                color: "rgba(232,224,212,0.38)",
                letterSpacing: "0.1em",
              }}
            >
              PREV
            </button>

            <div className="flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  data-hover
                  aria-label={`Show ${slides[i].title}`}
                  style={{
                    width: i === current ? "24px" : "7px",
                    height: "3px",
                    background: i === current ? slide.palette[2] : "rgba(232,224,212,0.2)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              data-hover
              className="font-mono transition-colors duration-200 hover:text-[var(--bone)]"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "11px",
                color: "rgba(232,224,212,0.38)",
                letterSpacing: "0.1em",
              }}
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
