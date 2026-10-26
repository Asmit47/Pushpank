import { forwardRef, useId } from "react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

const control =
  "w-full rounded-xl border bg-night px-3.5 text-[0.95rem] text-parchment placeholder:text-muted/80 transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/25 disabled:bg-parchment/5";

type FieldShellProps = {
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  className?: string;
  children: (ids: { id: string; describedBy?: string; invalid: boolean }) => ReactNode;
};

function FieldShell({ label, error, hint, optional, className, children }: FieldShellProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 flex items-baseline justify-between text-sm font-medium text-parchment">
        <span>{label}</span>
        {optional && <span className="text-xs font-normal text-muted">Optional</span>}
      </label>
      {children({ id, describedBy, invalid: Boolean(error) })}
      {hint && !error && (
        <p id={hintId} className="mt-1.5 text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-xs font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

type BaseProps = {
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  wrapperClassName?: string;
};

export const Input = forwardRef<
  HTMLInputElement,
  BaseProps & Omit<ComponentProps<"input">, "className">
>(function Input({ label, error, hint, optional, wrapperClassName, ...props }, ref) {
  return (
    <FieldShell label={label} error={error} hint={hint} optional={optional} className={wrapperClassName}>
      {({ id, describedBy, invalid }) => (
        <input
          ref={ref}
          id={id}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className={cn(control, "h-11", invalid ? "border-danger" : "border-line")}
          {...props}
        />
      )}
    </FieldShell>
  );
});

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  BaseProps & Omit<ComponentProps<"textarea">, "className">
>(function Textarea({ label, error, hint, optional, wrapperClassName, ...props }, ref) {
  return (
    <FieldShell label={label} error={error} hint={hint} optional={optional} className={wrapperClassName}>
      {({ id, describedBy, invalid }) => (
        <textarea
          ref={ref}
          id={id}
          rows={4}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className={cn(control, "py-3", invalid ? "border-danger" : "border-line")}
          {...props}
        />
      )}
    </FieldShell>
  );
});

export const Select = forwardRef<
  HTMLSelectElement,
  BaseProps & Omit<ComponentProps<"select">, "className">
>(function Select({ label, error, hint, optional, wrapperClassName, children, ...props }, ref) {
  return (
    <FieldShell label={label} error={error} hint={hint} optional={optional} className={wrapperClassName}>
      {({ id, describedBy, invalid }) => (
        <select
          ref={ref}
          id={id}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className={cn(control, "h-11 appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23766d63%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:16px] bg-[right_0.9rem_center] bg-no-repeat pr-10", invalid ? "border-danger" : "border-line")}
          {...props}
        >
          {children}
        </select>
      )}
    </FieldShell>
  );
});
