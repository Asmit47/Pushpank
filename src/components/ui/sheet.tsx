"use client";

import { AnimatePresence, motion } from "motion/react";
import type { TargetAndTransition } from "motion/react";
import { X } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Side = "left" | "right" | "top";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const panelMotion: Record<
  Side,
  { initial: TargetAndTransition; animate: TargetAndTransition; exit: TargetAndTransition; className: string }
> = {
  left: {
    initial: { x: "-100%" },
    animate: { x: 0 },
    exit: { x: "-100%" },
    className: "left-0 top-0 h-full w-[88%] max-w-sm",
  },
  right: {
    initial: { x: "100%" },
    animate: { x: 0 },
    exit: { x: "100%" },
    className: "right-0 top-0 h-full w-full max-w-md",
  },
  top: {
    initial: { y: -24, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -24, opacity: 0 },
    // Mobile starts below the 64px sticky header so the palette never sits under it.
    className: "left-1/2 top-[4.5rem] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 rounded-panel sm:top-24",
  },
};

/** Accessible modal panel: focus trap, Esc to close, scroll lock, focus restore. */
export function Sheet({
  open,
  onClose,
  side,
  label,
  children,
  hideClose,
}: {
  open: boolean;
  onClose: () => void;
  side: Side;
  label: string;
  children: ReactNode;
  hideClose?: boolean;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const cfg = panelMotion[side];

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => {
      const target =
        panelRef.current?.querySelector<HTMLElement>("[data-autofocus]") ??
        panelRef.current?.querySelector<HTMLElement>(FOCUSABLE);
      target?.focus();
    }, 30);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus?.();
    };
  }, [open]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!nodes || nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[var(--z-overlay)]" onKeyDown={onKeyDown}>
          <motion.div
            className="absolute inset-0 bg-black/65"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            className={cn(
              "absolute flex flex-col bg-sanctum text-parchment shadow-lift",
              cfg.className,
            )}
            initial={cfg.initial}
            animate={cfg.animate}
            exit={cfg.exit}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            {!hideClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label={`Close ${label.toLowerCase()}`}
                className="absolute right-3 top-3 z-10 grid size-10 place-items-center rounded-full text-parchment hover:bg-parchment/10"
              >
                <X className="size-5" aria-hidden />
              </button>
            )}
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
