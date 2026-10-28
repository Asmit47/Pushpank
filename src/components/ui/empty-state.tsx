import type { ReactNode } from "react";

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center rounded-card border border-dashed border-gold/40 bg-sanctum px-6 py-14 text-center">
      {icon && <div className="mb-4 text-gold">{icon}</div>}
      <h2 className="text-2xl font-semibold text-gold-soft">{title}</h2>
      {description && <p className="mt-2 text-muted">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
