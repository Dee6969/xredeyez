"use client";
import { animate, useInView, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Server-renders the real value so crawlers, link previews and no-JS
 * visitors never see "0". The count-up animation runs client-side
 * once the element scrolls into view.
 */
export default function CountUp({
  to,
  duration = 1.6,
  suffix = "",
}: {
  to: number;
  duration?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState(String(to));

  useEffect(() => {
    if (!inView) return;
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(String(to));
      return;
    }
    const controls = animate(mv, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(String(Math.round(v))),
    });
    return () => controls.stop();
  }, [inView, to, duration, mv]);

  return (
    <span ref={ref} className="count-up">
      {display}{suffix}
    </span>
  );
}
