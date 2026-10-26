"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/** A thin gold thread that tracks reading progress. */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 });
  if (reduce) return null;
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-gold"
    />
  );
}
