"use client";
import { motion, type Variants } from "framer-motion";
import { Children, type ReactNode, type ElementType } from "react";

const parent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};

const child: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * StaggerReveal renders as `as` (default div). Children are wrapped in
 * a motion.div each — becoming direct children of the container. Give
 * the outer a grid className and it will lay children out naturally.
 */
export default function StaggerReveal({
  children,
  className = "",
  amount = 0.1,
  as = "div",
  itemClassName = "",
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
  as?: ElementType;
  itemClassName?: string;
}) {
  const M = motion.create(as as never) as never;
  const Container = M as unknown as typeof motion.div;
  return (
    <Container
      className={className}
      variants={parent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {Children.map(children, (c, i) => (
        <motion.div key={i} className={itemClassName} variants={child}>
          {c}
        </motion.div>
      ))}
    </Container>
  );
}
