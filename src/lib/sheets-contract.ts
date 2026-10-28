import type { Order, OrderLineSnapshot, OrderStatus, PanditApplication, PanditApplicationStatus, PaymentStatus } from "@/types";
import { formatPrice } from "@/lib/format";

export const ORDERS_TAB = "Orders";
export const PANDIT_TAB = "Pundit Registrations";

export const ORDER_HEADERS = [
  "Reference",
  "Created at",
  "Name",
  "Phone",
  "Email",
  "Address",
  "Locality",
  "City",
  "Pincode",
  "Items",
  "Subtotal",
  "Delivery fee",
  "Discount",
  "Total",
  "Payment status",
  "Order status",
  "Delivery notes",
  "Line items JSON",
] as const;

export const PANDIT_HEADERS = [
  "Reference",
  "Created at",
  "Name",
  "Phone",
  "Email",
  "Locality",
  "Pincode",
  "Years",
  "Education",
  "Sampradaya",
  "Rituals",
  "Languages",
  "Days",
  "Time windows",
  "Areas",
  "Travels",
  "Brings samagri",
  "Bio",
  "Status",
] as const;

export const ORDER_STATUS_OPTIONS: { value: OrderStatus; label: string }[] = [
  { value: "placed", label: "Placed" },
  { value: "confirmed", label: "Confirmed" },
  { value: "packed", label: "Packed" },
  { value: "out_for_delivery", label: "Out for delivery" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

export const PANDIT_STATUS_OPTIONS: { value: PanditApplicationStatus; label: string }[] = [
  { value: "received", label: "Received" },
  { value: "under_review", label: "Under review" },
  { value: "approved", label: "Approved" },
  { value: "declined", label: "Declined" },
];

const PAYMENT_STATUSES = ["not_applicable", "pending", "paid", "failed", "refunded"] as const;

export function orderStatusLabel(status: OrderStatus) {
  return ORDER_STATUS_OPTIONS.find((option) => option.value === status)?.label ?? status;
}

export function panditStatusLabel(status: PanditApplicationStatus) {
  return PANDIT_STATUS_OPTIONS.find((option) => option.value === status)?.label ?? status;
}

export function parseOrderStatus(value: string): OrderStatus {
  const normalized = value.trim().toLowerCase();
  const match = ORDER_STATUS_OPTIONS.find(
    (option) => option.value === normalized || option.label.toLowerCase() === normalized,
  );
  return match?.value ?? "placed";
}

export function parsePanditStatus(value: string): PanditApplicationStatus {
  const normalized = value.trim().toLowerCase();
  const match = PANDIT_STATUS_OPTIONS.find(
    (option) => option.value === normalized || option.label.toLowerCase() === normalized,
  );
  return match?.value ?? "received";
}

function parsePaymentStatus(value: string): PaymentStatus {
  const normalized = value.trim().toLowerCase();
  return PAYMENT_STATUSES.find((status) => status === normalized) ?? "pending";
}

export function formatItemsSummary(items: OrderLineSnapshot[]) {
  return items
    .map((item) => `${item.productName} (${item.variantLabel}) x ${item.quantity} @ ${formatPrice(item.unitPrice)}`)
    .join("; ");
}

export function orderToRow(order: Order): string[] {
  return [
    order.reference,
    order.createdAt,
    order.customer.name,
    order.customer.phone,
    order.customer.email ?? "",
    order.deliveryAddress.line1,
    order.deliveryAddress.locality,
    order.deliveryAddress.city,
    order.deliveryAddress.pincode,
    formatItemsSummary(order.items),
    String(order.subtotal),
    String(order.deliveryFee),
    String(order.discount),
    String(order.total),
    order.paymentStatus,
    orderStatusLabel(order.orderStatus),
    order.deliveryNotes ?? "",
    JSON.stringify(order.items),
  ];
}

function cell(row: string[], index: number) {
  return (row[index] ?? "").trim();
}

function money(value: string) {
  const amount = Number(value.replace(/[^\d.-]/g, ""));
  return Number.isFinite(amount) ? amount : 0;
}

export function rowToOrder(row: string[]): Order | undefined {
  const reference = cell(row, 0);
  if (!reference) return undefined;
  let items: OrderLineSnapshot[] = [];
  try {
    const parsed = JSON.parse(cell(row, 17) || "[]") as OrderLineSnapshot[];
    if (Array.isArray(parsed)) items = parsed;
  } catch {
    items = [];
  }
  return {
    reference,
    createdAt: cell(row, 1),
    customer: {
      name: cell(row, 2),
      phone: cell(row, 3),
      email: cell(row, 4) || undefined,
    },
    deliveryAddress: {
      line1: cell(row, 5),
      locality: cell(row, 6),
      city: cell(row, 7) || "Lucknow",
      pincode: cell(row, 8),
    },
    items,
    subtotal: money(cell(row, 10)),
    deliveryFee: money(cell(row, 11)),
    discount: money(cell(row, 12)),
    total: money(cell(row, 13)),
    paymentStatus: parsePaymentStatus(cell(row, 14)),
    orderStatus: parseOrderStatus(cell(row, 15)),
    deliveryNotes: cell(row, 16) || undefined,
  };
}

export function applicationToRow(application: PanditApplication): string[] {
  return [
    application.reference,
    application.createdAt,
    application.name,
    application.phone,
    application.email,
    application.locality,
    application.pincode,
    String(application.years),
    application.education ?? "",
    application.sampradaya ?? "",
    application.rituals.join(", "),
    application.languages.join(", "),
    application.days.join(", "),
    application.timeWindows.join(", "),
    application.areas,
    application.travels ? "Yes" : "No",
    application.bringsSamagri ? "Yes" : "No",
    application.bio,
    panditStatusLabel(application.status),
  ];
}

function splitList(value: string) {
  return value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

function yes(value: string) {
  return value.trim().toLowerCase() === "yes";
}

export function rowToApplication(row: string[]): PanditApplication | undefined {
  const reference = cell(row, 0);
  if (!reference) return undefined;
  return {
    reference,
    createdAt: cell(row, 1),
    name: cell(row, 2),
    phone: cell(row, 3),
    email: cell(row, 4),
    locality: cell(row, 5),
    pincode: cell(row, 6),
    years: Number(cell(row, 7)) || 0,
    education: cell(row, 8) || undefined,
    sampradaya: cell(row, 9) || undefined,
    rituals: splitList(cell(row, 10)),
    languages: splitList(cell(row, 11)),
    days: splitList(cell(row, 12)),
    timeWindows: splitList(cell(row, 13)),
    areas: cell(row, 14),
    travels: yes(cell(row, 15)),
    bringsSamagri: yes(cell(row, 16)),
    bio: cell(row, 17),
    status: parsePanditStatus(cell(row, 18)),
  };
}
