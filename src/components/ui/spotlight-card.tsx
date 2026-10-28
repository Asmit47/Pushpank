"use client";

import { useMotionTemplate, useMotionValue, motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function SpotlightCard({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const background = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, rgb(214 168 79 / 0.22), transparent 42%)`;

  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left);
        y.set(e.clientY - rect.top);
      }}
      className={cn(
        "group relative overflow-hidden rounded-card border border-gold/20 bg-sanctum",
        className,
      )}
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background }} />
      <div className="relative">{children}</div>
    </div>
  );
}
