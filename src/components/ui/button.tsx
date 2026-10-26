"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "green" | "onDark";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,color,border-color,box-shadow,transform] duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100";

const variants: Record<Variant, string> = {
  primary: "bg-gold text-night shadow-sm hover:bg-gold-soft focus-visible:outline-gold",
  secondary: "border border-gold/45 bg-transparent text-gold-soft hover:border-gold hover:bg-gold/10",
  ghost: "text-parchment hover:bg-parchment/8",
  green: "bg-tulsi text-night hover:bg-tulsi/90",
  onDark: "bg-parchment text-night hover:bg-gold-soft focus-visible:outline-gold",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-[0.95rem]",
  lg: "h-12 px-7 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  magnetic?: boolean;
};

type ButtonProps = CommonProps &
  Omit<ComponentProps<"button">, "className" | "children"> & { href?: undefined };
type LinkProps = CommonProps & Omit<ComponentProps<typeof Link>, "className" | "children">;

export function Button(props: ButtonProps | LinkProps) {
  const { variant = "primary", size = "md", className, children, magnetic, ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], className);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 20 });
  const sy = useSpring(y, { stiffness: 260, damping: 20 });

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!magnetic) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.18);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.25);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  if ("href" in rest && rest.href !== undefined) {
    const link = (
      <Link
        {...(rest as Omit<LinkProps, keyof CommonProps>)}
        className={classes}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        {children}
      </Link>
    );
    if (!magnetic) return link;
    return (
      <motion.span style={{ x: sx, y: sy }} className="inline-flex">
        {link}
      </motion.span>
    );
  }

  const buttonProps = rest as Omit<ButtonProps, keyof CommonProps>;
  const button = (
    <button
      type="button"
      {...buttonProps}
      className={classes}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </button>
  );
  if (!magnetic) return button;
  return (
    <motion.span style={{ x: sx, y: sy }} className="inline-flex">
      {button}
    </motion.span>
  );
}
