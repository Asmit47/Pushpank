"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** Renders the server-provided year during SSR/hydration, then the browser's
 * current year after mount, so a long-lived deployment never shows a stale year. */
export function FooterYear({ initial }: { initial: number }) {
  const year = useSyncExternalStore(subscribe, () => new Date().getFullYear(), () => initial);
  return <>{year}</>;
}
