import { Badge } from "@/components/ui/badge";
import { humanize } from "@/lib/format";

const TONES: Record<string, "neutral" | "green" | "maroon" | "gold" | "danger"> = {
  requested: "gold",
  awaiting_confirmation: "gold",
  confirmed: "green",
  reschedule_requested: "maroon",
  completed: "green",
  cancelled: "danger",
  placed: "gold",
  packed: "green",
  out_for_delivery: "green",
  delivered: "green",
  pending: "gold",
  paid: "green",
  failed: "danger",
  refunded: "neutral",
  not_applicable: "neutral",
};

/** Status is always conveyed as text, never by colour or animation alone. */
export function StatusBadge({ status, label }: { status: string; label?: string }) {
  return <Badge tone={TONES[status] ?? "neutral"}>{label ?? humanize(status)}</Badge>;
}
