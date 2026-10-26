import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "green" | "onDark";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[background-color,color,border-color,box-shadow,transform] duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100";

const variants: Record<Variant, string> = {
  primary:
    "bg-maroon text-ivory hover:bg-maroon-600 shadow-sm focus-visible:outline-maroon",
  secondary:
    "border border-maroon/40 bg-transparent text-maroon hover:border-maroon hover:bg-maroon/5",
  ghost: "text-charcoal hover:bg-charcoal/5",
  green: "bg-forest text-ivory hover:bg-forest/90",
  onDark:
    "bg-ivory text-maroon hover:bg-white focus-visible:outline-ivory",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-[0.95rem]",
  lg: "h-12 px-8 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonProps = CommonProps &
  Omit<ComponentProps<"button">, "className" | "children"> & { href?: undefined };
type LinkProps = CommonProps &
  Omit<ComponentProps<typeof Link>, "className" | "children">;

export function Button(props: ButtonProps | LinkProps) {
  const { variant = "primary", size = "md", className, children, ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in rest && rest.href !== undefined) {
    return (
      <Link {...(rest as Omit<LinkProps, keyof CommonProps>)} className={classes}>
        {children}
      </Link>
    );
  }
  const buttonProps = rest as Omit<ButtonProps, keyof CommonProps>;
  return (
    <button type="button" {...buttonProps} className={classes}>
      {children}
    </button>
  );
}
