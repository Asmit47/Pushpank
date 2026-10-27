import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Entrance animations are plain CSS (see `enter` keyframes in globals.css) so
 * content is never hidden behind JavaScript: keyframes run without hydration,
 * and every rule is scoped to `prefers-reduced-motion: no-preference`.
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
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("stagger", className)}>{children}</div>;
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
