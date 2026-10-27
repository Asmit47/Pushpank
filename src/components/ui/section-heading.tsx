import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function SectionHeading({
  id,
  eyebrow,
  title,
  hindi,
  description,
  action,
  align = "left",
  as: Tag = "h2",
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  /** Hindi accent word set beside the title. */
  hindi?: string;
  description?: string;
  action?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center"
          ? "items-center text-center"
          : "sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && <p className={cn("eyebrow", align === "center" && "eyebrow-center")}>{eyebrow}</p>}
        <Tag id={id} className="display-section mt-3 text-gold-soft">
          {title}
          {hindi && (
            <>
              {" "}
              <span lang="hi" className="mantra text-gold/70">
                {hindi}
              </span>
            </>
          )}
        </Tag>
        {description && (
          <p className={cn("mt-4 text-[0.95rem] leading-relaxed text-muted", align === "center" && "mx-auto max-w-xl")}>
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}
