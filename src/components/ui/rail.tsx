"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Horizontal snap-scroll rail with arrow controls at the container edges.
 * `className` lets the caller bleed the track past the container gutter
 * (negative margins + matching padding) while headings stay aligned.
 */
export function Rail({ label, className, children }: { label: string; className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLUListElement>(null);
  const nudge = (dir: 1 | -1) =>
    ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.75, behavior: "smooth" });

  return (
    <div className="group/rail relative mt-8">
      <ul ref={ref} className={cn("rail flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 lg:gap-5", className)} aria-label={label}>
        {children}
      </ul>
      <div className="pointer-events-none absolute inset-y-0 -left-4 -right-4 z-10 hidden items-center justify-between lg:flex">
        <button
          type="button"
          onClick={() => nudge(-1)}
          aria-label={`Scroll ${label} left`}
          className="pointer-events-auto grid size-10 place-items-center rounded-full border border-gold/35 bg-night/80 text-gold-soft backdrop-blur-sm transition-colors duration-300 hover:bg-gold/15"
        >
          <ArrowLeft className="size-4" strokeWidth={1.5} aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          aria-label={`Scroll ${label} right`}
          className="pointer-events-auto grid size-10 place-items-center rounded-full border border-gold/35 bg-night/80 text-gold-soft backdrop-blur-sm transition-colors duration-300 hover:bg-gold/15"
        >
          <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
        </button>
      </div>
    </div>
  );
}
