"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  { src: "/cities/amsterdam-canal-day.png",    city: "Amsterdam",  country: "Netherlands" },
  { src: "/cities/barcelona-terrace.png",       city: "Barcelona",  country: "Spain" },
  { src: "/cities/marbella-marina.png",         city: "Marbella",   country: "Spain" },
  { src: "/cities/tenerife-coast.png",          city: "Tenerife",   country: "Spain" },
  { src: "/cities/thailand-bangkok.png",        city: "Bangkok",    country: "Thailand" },
  { src: "/cities/germany-berlin.png",          city: "Berlin",     country: "Germany" },
  { src: "/cities/czech-prague.png",            city: "Prague",     country: "Czech Republic" },
  { src: "/cities/south-africa-cape-town.png",  city: "Cape Town",  country: "South Africa" },
];

const INTERVAL_MS = 5000;
const TRANSITION_MS = 1400;

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [labelKey, setLabelKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => {
        setPrev(c);
        setLabelKey((k) => k + 1);
        return (c + 1) % slides.length;
      });
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (prev === null) return;
    const t = setTimeout(() => setPrev(null), TRANSITION_MS);
    return () => clearTimeout(t);
  }, [prev]);

  const slide = slides[current];

  return (
    <>
      <div className="home-hero-image" aria-hidden="true">
        {slides.map((s, i) => (
          <div
            key={s.src}
            className="home-hero-slide"
            style={{
              opacity: i === current ? 1 : 0,
              zIndex: i === current ? 2 : i === prev ? 1 : 0,
            }}
          >
            <Image
              src={s.src}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "center 38%" }}
            />
          </div>
        ))}
      </div>

      <div className="home-hero-overlay" />

      <p key={labelKey} className="home-hero-city-label hero-label-fade">
        {slide.city} · {slide.country}
      </p>

      <div className="home-hero-dots" aria-hidden="true">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`home-hero-dot${i === current ? " is-active" : ""}`}
            onClick={() => { setPrev(current); setCurrent(i); setLabelKey((k) => k + 1); }}
          />
        ))}
      </div>
    </>
  );
}
