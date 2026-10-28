import type { ReactNode } from "react";

/**
 * Remounts with a unique key on every navigation (Next special file), so the
 * CSS-only `page-enter` animation runs per route change. Reduced-motion users
 * skip it entirely (scoped in globals.css).
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
