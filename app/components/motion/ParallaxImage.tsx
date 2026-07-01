"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

export default function ParallaxImage({
  children,
  distance = 80,
  className = "",
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  return (
    <motion.div
      ref={ref}
      className={`parallax-image ${className}`}
      style={{ position: "absolute", inset: 0, willChange: "transform", y, scale }}
    >
      {children}
    </motion.div>
  );
}
