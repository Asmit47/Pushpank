"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Entrance animations are plain CSS (see `enter` keyframes in globals.css) so
 * content is never hidden behind JavaScript: keyframes run without hydration,
 * and every rule is scoped to `prefers-reduced-motion: no-preference`.
 *
 * Stagger additionally gates its choreography behind a client-added class
 * (`.stagger-on`) and sequences each item as it enters the viewport via
 * IntersectionObserver (`.stagger-run`), so without JavaScript everything is
 * simply visible.
 */

/** Scroll-triggered fade/slide via CSS scroll-driven animations where supported; fully visible otherwise. */
export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("reveal", className)}>{children}</div>;
}

export function Stagger({
  children,
  className,
  step = 60,
}: {
  children: ReactNode;
  className?: string;
  /** Milliseconds between items in a concurrently-visible group. */
  step?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    root.style.setProperty("--stagger-step", `${step}ms`);
    root.classList.add("stagger-on");
    const items = root.querySelectorAll<HTMLElement>(".stagger-item");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("stagger-run");
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      root.classList.remove("stagger-on");
      root.style.removeProperty("--stagger-step");
    };
  }, [step]);

  return (
    <div ref={ref} className={cn("stagger", className)}>
      {children}
    </div>
  );
}

export function StaggerItem({
  children,
  className,
  index = 0,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
}) {
  return (
    <div className={cn("stagger-item", className)} style={{ "--stagger-i": index } as CSSProperties}>
      {children}
    </div>
  );
}

/** Immediate (on-load) fade/slide for above-the-fold content. */
export function FadeIn({
  children,
  delay = 0,
  duration,
  className,
}: {
  children: ReactNode;
  /** Seconds. */
  delay?: number;
  /** Seconds. */
  duration?: number;
  className?: string;
}) {
  const style = {
    "--enter-delay": `${delay}s`,
    ...(duration != null && { "--enter-duration": `${duration}s` }),
  } as CSSProperties;
  return (
    <div className={cn("fade-in", className)} style={style}>
      {children}
    </div>
  );
}
