import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="Pushpank home" className={cn("inline-flex items-center gap-2", className)}>
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
