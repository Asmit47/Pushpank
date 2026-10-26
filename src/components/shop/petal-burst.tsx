"use client";

import { AnimatePresence, motion } from "motion/react";

const petals = [
  { x: -28, y: -36, r: -24 },
  { x: 18, y: -42, r: 18 },
  { x: 36, y: -8, r: 32 },
  { x: -8, y: -18, r: -12 },
  { x: 8, y: -52, r: 8 },
];

export function PetalBurst({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show &&
        petals.map((p, i) => (
          <motion.span
            key={i}
            aria-hidden
            initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 0.6 }}
            animate={{ opacity: 0, x: p.x, y: p.y, rotate: p.r, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute left-1/2 top-1/2 size-2.5 rounded-full bg-marigold"
          />
        ))}
    </AnimatePresence>
  );
}
