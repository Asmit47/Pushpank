import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";

export function Logo({ className, light }: { className?: string; light?: boolean }) {
  return (
    <Link href="/" aria-label="Pushpank home" className={cn("inline-flex items-center gap-2", className)}>
      <span className={cn("block", !light && "rounded bg-maroon p-0.5")}>
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
