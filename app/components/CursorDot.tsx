"use client";
import { useEffect, useRef } from "react";

export default function CursorDot() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    document.body.style.cursor = "none";

    let mx = 0, my = 0;
    let rx = 0, ry = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = mx + "px";
        dotRef.current.style.top = my + "px";
      }
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      rx = lerp(rx, mx, 0.12);
      ry = lerp(ry, my, 0.12);
      if (ringRef.current) {
        ringRef.current.style.left = rx + "px";
        ringRef.current.style.top = ry + "px";
      }
      raf = requestAnimationFrame(tick);
    };

    const onEnter = () => {
      if (dotRef.current) { dotRef.current.style.width = "14px"; dotRef.current.style.height = "14px"; }
      if (ringRef.current) { ringRef.current.style.width = "44px"; ringRef.current.style.height = "44px"; ringRef.current.style.opacity = "0.6"; }
    };
    const onLeave = () => {
      if (dotRef.current) { dotRef.current.style.width = "8px"; dotRef.current.style.height = "8px"; }
      if (ringRef.current) { ringRef.current.style.width = "28px"; ringRef.current.style.height = "28px"; ringRef.current.style.opacity = "1"; }
    };

    document.addEventListener("mousemove", onMove);
    document.querySelectorAll("a, button, [data-hover]").forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });
    raf = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
