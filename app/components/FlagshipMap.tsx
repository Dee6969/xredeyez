"use client";
import Image from "next/image";
import Link from "next/link";
import { roomIntros as rooms } from "../data/rooms";

export default function FlagshipMap() {
  return (
    <section
      className="relative min-h-screen overflow-hidden px-3 py-10 md:px-5 md:py-12"
      style={{ background: "linear-gradient(180deg, #0d0d0b 0%, #060606 46%, #100807 100%)" }}
      id="lobby"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 18% 8%, rgba(232,224,212,0.15), transparent 30%), radial-gradient(ellipse at 74% 16%, rgba(255,48,53,0.18), transparent 38%), radial-gradient(ellipse at 50% 100%, rgba(192,40,42,0.16), transparent 42%)",
        }}
      />
      <div className="red-ambient" />

      <div className="relative z-10 mx-auto flex max-w-[1680px] flex-col gap-7">
        <div className="grid gap-7 px-2 md:grid-cols-[0.9fr_1.1fr_0.8fr] md:items-start">
          <h1
            className="font-display"
            style={{ color: "var(--bone)", fontSize: "clamp(58px, 8vw, 126px)", lineHeight: 0.78, textShadow: "0 0 28px rgba(232,224,212,0.14)" }}
          >
            THE<br />ROOMS.
          </h1>
          <div
            className="font-mono self-center"
            style={{ color: "rgba(232,224,212,0.68)", fontSize: "clamp(11px, 1vw, 16px)", letterSpacing: "0.16em", lineHeight: 1.9, textTransform: "uppercase" }}
          >
            XRED EYEZ returns as a world before it returns as a product.<br />
            Move through the flagship, collect the codes,<br />
            and follow the signal before Chapter One opens.
          </div>
          <div
            className="hidden justify-self-end md:flex"
            style={{
              width: "min(24vw, 330px)",
              minHeight: "120px",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "linear-gradient(135deg, rgba(0,0,0,0.78), rgba(20,20,18,0.58))",
              boxShadow: "0 18px 70px rgba(0,0,0,0.5), inset 0 0 28px rgba(255,255,255,0.035)",
              padding: "18px",
            }}
          >
            <Image
              src="/redeyez-logo.jpeg"
              alt="XRED EYEZ"
              width={1024}
              height={1024}
              priority
              style={{
                width: "100%",
                height: "auto",
                filter: "contrast(1.06) brightness(1.08)",
              }}
            />
          </div>
        </div>

        <div className="grid gap-px overflow-hidden border border-white/[0.13] md:grid-cols-3">
          {rooms.map((room) => (
            <Link
              key={room.id}
              href={`/rooms/${room.slug}`}
              data-hover
              className="group red-edge relative min-h-[330px] overflow-hidden p-6 transition-colors duration-300 md:min-h-[390px]"
              style={{
                background: "#070707",
                textDecoration: "none",
              }}
            >
              <Image
                src={room.image}
                alt={room.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{
                  objectFit: "cover",
                  transform: "scale(1)",
                  transition: "transform 900ms ease, filter 500ms ease",
                  filter: "brightness(0.92) contrast(1.05) saturate(0.94)",
                }}
                className="group-hover:scale-[1.06]"
              />
              <div
                className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-90"
                style={{
                  background: "linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.12) 42%, rgba(0,0,0,0.6) 100%)",
                }}
              />
              <div
                className="absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: "radial-gradient(circle at 90% 88%, rgba(255,48,53,0.34), transparent 17%), radial-gradient(ellipse at 18% 12%, rgba(232,224,212,0.16), transparent 30%)",
                  boxShadow: "inset 0 0 70px rgba(255,255,255,0.05)",
                }}
              />
              <div
                className="absolute inset-x-0 top-0 h-px transition-opacity duration-300"
                style={{
                  background: "rgba(255,255,255,0.16)",
                  opacity: 1,
                }}
              />
              <div className="relative z-10 flex h-full flex-col justify-between gap-8">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono" style={{ color: "var(--xred)", fontSize: "14px", letterSpacing: "0.18em" }}>
                    {room.number}
                  </span>
                  <span
                    className="font-mono opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ color: "var(--bone)", fontSize: "12px", letterSpacing: "0.2em" }}
                  >
                    ENTER →
                  </span>
                </div>
                <div>
                  <h2 className="font-display" style={{ color: "var(--bone)", fontSize: "clamp(30px, 3vw, 46px)", lineHeight: 0.92 }}>
                    {room.name}
                  </h2>
                  <div className="mt-3 font-mono" style={{ color: "rgba(232,224,212,0.68)", fontSize: "12px", letterSpacing: "0.24em", textTransform: "uppercase" }}>
                    {room.role}
                  </div>
                  <p className="mt-4 max-w-[390px]" style={{ color: "rgba(232,224,212,0.74)", fontSize: "16px", lineHeight: 1.45 }}>
                    {room.detail}
                  </p>
                </div>
                <div
                  className="absolute bottom-7 right-7 flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 group-hover:scale-110"
                  style={{ borderColor: "rgba(192,40,42,0.75)", color: "var(--xred)", boxShadow: "0 0 18px rgba(192,40,42,0.35)" }}
                >
                  <span className="h-2 w-2 rounded-full" style={{ background: "var(--xred)" }} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center px-2 pt-4">
          <p className="font-mono" style={{ color: "rgba(232,224,212,0.42)", fontSize: "13px", letterSpacing: "0.32em" }}>
            FOLLOW THE SIGNAL <span style={{ color: "var(--xred)" }}>•</span> TRUST THE PROCESS <span style={{ color: "var(--xred)" }}>•</span> CHAPTER ONE COMING SOON
          </p>
        </div>
      </div>
    </section>
  );
}
