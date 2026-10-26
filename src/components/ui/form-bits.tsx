import { AlertCircle } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

/** Hidden anti-spam field. Real users never see or fill it. */
export function HoneypotField(props: ComponentProps<"input">) {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Website
        <input type="text" tabIndex={-1} autoComplete="off" {...props} />
      </label>
    </div>
  );
}

export function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className="flex items-start gap-2 rounded-xl border border-danger/30 bg-danger/5 p-3.5 text-sm text-danger"
    >
      <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
      <p>{message}</p>
    </div>
  );
}

export function FormSection({
  step,
  title,
  description,
  children,
}: {
  step?: number;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="rounded-[20px] border border-line bg-sanctum p-5 sm:p-6">
      <legend className="sr-only">{title}</legend>
      <div className="mb-5 flex items-start gap-3">
        {step !== undefined && (
          <span
            aria-hidden
            className="grid size-8 shrink-0 place-items-center rounded-full bg-gold text-sm font-semibold text-night"
          >
            {step}
          </span>
        )}
        <div>
          <h2 className="text-2xl font-semibold leading-tight text-gold-soft" aria-hidden>
            {title}
          </h2>
          {description && <p className="mt-1 text-sm text-muted">{description}</p>}
        </div>
      </div>
      {children}
    </fieldset>
  );
}
