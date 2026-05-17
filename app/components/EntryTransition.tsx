"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
  onComplete: () => void;
}

export default function EntryTransition({ onComplete }: Props) {
  const [phase, setPhase] = useState<"black" | "logo" | "out">("black");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("logo"), 400);
    const t2 = setTimeout(() => setPhase("out"), 2200);
    const t3 = setTimeout(() => onComplete(), 2900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-700"
      style={{
        background: "var(--void)",
        opacity: phase === "out" ? 0 : 1,
        pointerEvents: phase === "out" ? "none" : "all",
      }}
    >
      <div
        className="flex flex-col items-center gap-4 transition-all duration-700"
        style={{
          opacity: phase === "logo" ? 1 : 0,
          transform: phase === "logo" ? "scale(1)" : "scale(0.97)",
        }}
      >
        <Image
          src="/redeyez-logo.jpeg"
          alt="XRED EYEZ"
          width={1024}
          height={1024}
          priority
          style={{
            width: "min(72vw, 420px)",
            height: "auto",
          }}
        />

        <div
          className="font-mono"
          style={{ fontSize: "11px", color: "rgba(232,224,212,0.35)", letterSpacing: "0.25em" }}
        >
          seen differently
        </div>
      </div>
    </div>
  );
}
