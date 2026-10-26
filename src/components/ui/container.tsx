import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export function Container({ className, ...props }: ComponentProps<"div">) {
  // A caller-supplied max-width replaces the default instead of fighting it in CSS order.
  const hasMax = className?.split(" ").some((c) => c.startsWith("max-w-"));
  return (
    <div
      className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", !hasMax && "max-w-7xl", className)}
      {...props}
    />
  );
}
