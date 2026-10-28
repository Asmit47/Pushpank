"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLayoutEffect, type MouseEvent } from "react";
import { cn } from "@/lib/cn";

function forceTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}

function smoothTop() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, left: 0, behavior: reduce ? "instant" : "smooth" });
}

/** Shared across header, menu and footer so an unmounting instance cannot drop the intent. */
let pendingHomeScroll = false;

export function Logo({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (!pendingHomeScroll || pathname !== "/") return;
    pendingHomeScroll = false;
    forceTop();
    const frame = requestAnimationFrame(() => {
      forceTop();
      requestAnimationFrame(forceTop);
    });
    const timer = window.setTimeout(forceTop, 80);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [pathname]);

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.();
    if (pathname !== "/") {
      pendingHomeScroll = true;
      return;
    }
    // Same-route Link is a refresh in Next.js 16 and keeps scroll position.
    e.preventDefault();
    if (window.location.hash) {
      window.history.replaceState(null, "", "/");
    }
    smoothTop();
  }

  return (
    <Link href="/" aria-label="Pushpank home" className={cn("inline-flex items-center gap-2", className)} onClick={handleClick}>
      <span className="block">
        <Image
          src="/images/brand/pushpank-logo.png"
          alt=""
          width={1280}
          height={650}
          priority
          className="h-14 w-28 object-contain"
        />
      </span>
    </Link>
  );
}
