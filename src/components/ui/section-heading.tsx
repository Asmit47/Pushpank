import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  action,
  align = "left",
  as: Tag = "h2",
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center"
          ? "items-center text-center"
          : "sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            {eyebrow}
          </p>
        )}
        <Tag id={id} className="text-3xl font-semibold leading-tight text-maroon sm:text-4xl">
          {title}
        </Tag>
        {description && (
          <p className="mt-3 text-base leading-relaxed text-muted">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
