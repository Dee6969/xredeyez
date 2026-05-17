"use client";
import { useEffect, useState } from "react";

interface Props {
  onEnter: () => void;
}

export default function ExteriorScene({ onEnter }: Props) {
  const [visible, setVisible] = useState(false);
  const [doorHover, setDoorHover] = useState(false);
  const [entering, setEntering] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  const handleEnter = () => {
    if (entering) return;
    setEntering(true);
    setTimeout(onEnter, 900);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-700 ${entering ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      style={{ background: "var(--void)" }}
    >
      <div className="red-ambient" />
      {/* Atmospheric background layers */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Ground reflection / wet street effect */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "50%",
            background: "linear-gradient(0deg, rgba(10,5,5,1) 0%, rgba(15,8,8,0.8) 40%, transparent 100%)",
          }}
        />
        {/* Ambient fog layers */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 60% 40% at 50% 70%, rgba(255,48,53,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(5,2,2,0) 0%, rgba(0,0,0,0.6) 100%)",
          }}
        />
        {/* Subtle vertical light streaks suggesting a building */}
        {[15, 25, 75, 85].map((pos) => (
          <div
            key={pos}
            className="absolute top-0 bottom-0"
            style={{
              left: `${pos}%`,
              width: "1px",
              background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.015) 30%, rgba(255,255,255,0.03) 60%, transparent 100%)",
            }}
          />
        ))}
      </div>

      {/* The Door — centre stage */}
      <div className={`relative flex flex-col items-center transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        {/* Building facade suggestion */}
        <div
          className="relative flex flex-col items-center"
          style={{ filter: "drop-shadow(0 0 80px rgba(0,0,0,0.9))" }}
        >
          {/* Door frame */}
          <div
            className={`relative transition-all duration-500 ${doorHover ? "scale-[1.01]" : "scale-100"}`}
            style={{
              width: "clamp(100px, 16vw, 180px)",
              height: "clamp(200px, 30vw, 340px)",
            }}
          >
            {/* Door frame outer */}
            <div
              className="absolute inset-0 door-glow"
              style={{
                border: "1px solid rgba(192,40,42,0.25)",
                background: "rgba(18,6,6,0.96)",
              }}
            />
            {/* Door inner panel */}
            <div
              className="absolute"
              style={{
                inset: "12px",
                border: "1px solid rgba(192,40,42,0.12)",
                background: "rgba(24,8,8,0.98)",
              }}
            />
            {/* Door knob */}
            <div
              className="absolute"
              style={{
                width: "8px",
                height: "8px",
                background: "var(--brass)",
                borderRadius: "50%",
                right: "18px",
                top: "50%",
                transform: "translateY(-50%)",
                boxShadow: "0 0 8px rgba(158,139,106,0.5)",
              }}
            />
            {/* Red light seeping under door */}
            <div
              className="absolute bottom-0 left-0 right-0"
              style={{
                height: "2px",
                background: "linear-gradient(90deg, transparent 10%, rgba(192,40,42,0.6) 50%, transparent 90%)",
                boxShadow: "0 4px 20px rgba(192,40,42,0.4)",
              }}
            />
          </div>

          {/* Step count / address */}
          <div
            className="font-mono mt-6 text-center"
            style={{
              fontSize: "10px",
              color: "rgba(232,224,212,0.2)",
              letterSpacing: "0.2em",
            }}
          >
            01 — ENTER
          </div>
        </div>

        {/* Enter CTA */}
        <button
          className={`mt-10 font-display pulse-border transition-all duration-300 anim-fade-up delay-8 ${doorHover ? "opacity-100" : "opacity-70"} hover:opacity-100`}
          style={{
            border: "1px solid",
            padding: "14px 48px",
            fontSize: "clamp(10px, 1.2vw, 12px)",
            letterSpacing: "0.35em",
            color: "var(--bone)",
            background: "transparent",
            cursor: "pointer",
          }}
          onMouseEnter={() => setDoorHover(true)}
          onMouseLeave={() => setDoorHover(false)}
          onClick={handleEnter}
        >
          ENTER
        </button>

        {/* Tagline */}
        <p
          className="mt-6 font-mono anim-fade-up delay-10"
          style={{
            fontSize: "10px",
            color: "rgba(232,224,212,0.25)",
            letterSpacing: "0.2em",
          }}
        >
          seen differently
        </p>
      </div>

      {/* Ground mist */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "120px",
          background: "linear-gradient(0deg, rgba(192,40,42,0.03) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}
