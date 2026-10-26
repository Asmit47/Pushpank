import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "neutral" | "green" | "maroon" | "gold" | "danger";

const tones: Record<Tone, string> = {
  neutral: "bg-charcoal/5 text-charcoal",
  green: "bg-forest-100 text-forest",
  maroon: "bg-maroon/10 text-maroon",
  gold: "bg-gold-100 text-[#6b5320]",
  danger: "bg-danger/10 text-danger",
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
