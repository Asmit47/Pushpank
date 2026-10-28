import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "neutral" | "green" | "maroon" | "gold" | "danger";

const tones: Record<Tone, string> = {
  neutral: "bg-parchment/10 text-parchment",
  green: "bg-tulsi-100 text-tulsi",
  maroon: "bg-gold/15 text-gold-soft",
  gold: "bg-gold/15 text-gold-soft",
  danger: "bg-sindoor/20 text-danger",
};

export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
