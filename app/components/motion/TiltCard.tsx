"use client";
import { motion, useMotionValue, useSpring, useTransform, type MotionStyle } from "framer-motion";
import { useRef, type ReactNode, type CSSProperties } from "react";

const MAX_TILT = 6;

export default function TiltCard({
  children,
  className = "",
  style,
  max = MAX_TILT,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  max?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const rx = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), { stiffness: 220, damping: 22, mass: 0.5 });
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), { stiffness: 220, damping: 22, mass: 0.5 });

  const glareX = useTransform(px, [-0.5, 0.5], ["18%", "82%"]);
  const glareY = useTransform(py, [-0.5, 0.5], ["18%", "82%"]);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }

  function onLeave() {
    px.set(0);
    py.set(0);
  }

  const wrapStyle: MotionStyle = {
    perspective: 1200,
    transformStyle: "preserve-3d",
    ...(style as MotionStyle),
  };

  return (
    <motion.div
      ref={ref}
      className={`tilt-card ${className}`}
      style={wrapStyle}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <motion.div
        className="tilt-card-inner"
        style={{
          rotateX: rx,
          rotateY: ry,
          transformStyle: "preserve-3d",
          willChange: "transform",
          position: "relative",
          height: "100%",
        }}
      >
        {children}
        {glare && (
          <motion.span
            aria-hidden
            className="tilt-card-glare"
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              borderRadius: "inherit",
              background: useTransform(
                [glareX, glareY] as never,
                ([x, y]: [string, string]) =>
                  `radial-gradient(circle at ${x} ${y}, rgba(245,240,230,0.16), transparent 55%)`
              ) as unknown as string,
              mixBlendMode: "screen",
              opacity: 0.9,
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
