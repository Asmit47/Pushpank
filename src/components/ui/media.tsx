import Image from "next/image";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type MediaProps = Omit<ComponentProps<typeof Image>, "src" | "alt"> & {
  src: string;
  alt: string;
  wrapperClassName?: string;
};

/**
 * Wraps next/image. Images under /images/placeholder get a small badge in
 * development so placeholder art is never mistaken for real Pushpank photography.
 */
export function Media({ src, alt, wrapperClassName, className, ...props }: MediaProps) {
  const isPlaceholder = src.includes("/images/placeholder/");
  return (
    <div className={cn("relative overflow-hidden", wrapperClassName)}>
      <Image src={src} alt={alt} className={cn("object-cover", className)} {...props} />
      {isPlaceholder && process.env.NODE_ENV !== "production" && (
        <span
          aria-hidden
          className="pointer-events-none absolute left-2 top-2 rounded bg-charcoal/70 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ivory"
        >
          Placeholder
        </span>
      )}
    </div>
  );
}
