"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";

/** Horizontal snap-scroll rail with smooth arrow controls on large screens. */
export function Rail({ label, children }: { label: string; children: React.ReactNode }) {
  const ref = useRef<HTMLUListElement>(null);
  const nudge = (dir: 1 | -1) =>
    ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.75, behavior: "smooth" });

  return (
    <div className="group/rail relative mt-8">
      <ul ref={ref} className="rail flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 lg:gap-5" aria-label={label}>
        {children}
      </ul>
      <div className="pointer-events-none absolute -top-16 right-0 hidden gap-2 lg:flex">
        <button
          type="button"
          onClick={() => nudge(-1)}
          aria-label={`Scroll ${label} left`}
          className="pointer-events-auto grid size-10 place-items-center rounded-full border border-gold/35 text-gold-soft transition-colors duration-300 hover:bg-gold/15"
        >
          <ArrowLeft className="size-4" strokeWidth={1.5} aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          aria-label={`Scroll ${label} right`}
          className="pointer-events-auto grid size-10 place-items-center rounded-full border border-gold/35 text-gold-soft transition-colors duration-300 hover:bg-gold/15"
        >
          <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
        </button>
      </div>
    </div>
  );
}
