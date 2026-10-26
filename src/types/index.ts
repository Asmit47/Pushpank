/** Prices are whole Indian rupees (INR). */
export type Money = number;

export type Variant = {
  id: string;
  label: string;
  sku: string;
  price: Money;
  salePrice?: Money;
  inStock: boolean;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  /** Collection slugs this product appears in. The first one is the primary category. */
  collections: string[];
  images: { src: string; alt: string }[];
  variants: Variant[];
  inclusions: string[];
  details: { label: string; value: string }[];
  storage?: string;
  perishable: boolean;
  featured: boolean;
  /** ISO date, used for "Newest" sorting. */
  createdAt: string;
  /** Occasion/festival tags, only where there is real data. */
  occasions: string[];
  badge?: "Bestseller" | "New" | "Same-day" | "Festive";
  secondaryImage?: { src: string; alt: string };
  highlights?: string[];
  isFeatured?: boolean;
};

export type Category = {
  slug: string;
  name: string;
  hindi?: string;
  description: string;
  image: { src: string; alt: string };
};

export type ServicePackage = {
  id: string;
  name: string;
  description: string;
  /** Indicative only; final price is confirmed by the Pushpank team. */
  indicativePrice?: Money;
  includes: string[];
};

export type Faq = { question: string; answer: string };

export type Service = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: { src: string; alt: string };
  duration: string;
  inclusions: string[];
  exclusions: string[];
  customerProvides: string[];
  coverage: string;
  packages: ServicePackage[];
  cancellationPolicy: string;
  faqs: Faq[];
};

export type DecorationCategory = {
  slug: string;
  name: string;
  description: string;
  image: { src: string; alt: string };
  examples: string[];
};

// --- Bookings / orders / quotes -------------------------------------------

export const BOOKING_STATUSES = [
  "requested",
  "awaiting_confirmation",
  "confirmed",
  "reschedule_requested",
  "completed",
  "cancelled",
] as const;
export type BookingStatus = (typeof BOOKING_STATUSES)[number];

export const PAYMENT_STATUSES = ["not_applicable", "pending", "paid", "failed", "refunded"] as const;
export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

export const ORDER_STATUSES = ["placed", "confirmed", "packed", "out_for_delivery", "delivered", "cancelled"] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export type CustomerDetails = { name: string; phone: string; email?: string };

export type OrderLineSnapshot = {
  productId: string;
  productName: string;
  variantId: string;
  variantLabel: string;
  sku: string;
  unitPrice: Money;
  quantity: number;
  lineTotal: Money;
  image: string;
};

export type Order = {
  reference: string;
  customer: CustomerDetails;
  items: OrderLineSnapshot[];
  subtotal: Money;
  deliveryFee: Money;
  discount: Money;
  total: Money;
  deliveryAddress: { line1: string; locality: string; city: string; pincode: string };
  deliveryNotes?: string;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
};

export type Booking = {
  reference: string;
  serviceSlug: string;
  serviceName: string;
  packageSnapshot?: { id: string; name: string; indicativePrice?: Money };
  customer: CustomerDetails;
  eventDate: string;
  timeWindow: string;
  address: { line1: string; locality: string; pincode: string };
  samagri: string;
  notes?: string;
  bookingStatus: BookingStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
};

export type QuoteRequest = {
  reference: string;
  customer: CustomerDetails;
  eventType: string;
  eventDate: string;
  venue: string;
  guestCount?: number;
  services: string[];
  budgetRange?: string;
  notes?: string;
  status: "received" | "in_review" | "quoted" | "closed";
  createdAt: string;
};

export type Pandit = {
  slug: string;
  name: string;
  title: string;
  /** Placeholder portrait until a real photograph is provided. */
  image: { src: string; alt: string };
  years: number;
  languages: string[];
  areas: string[];
  specialities: string[];
  bio: string;
  placeholder: true;
};

export const PANDIT_APPLICATION_STATUSES = ["received", "under_review", "approved", "declined"] as const;
export type PanditApplicationStatus = (typeof PANDIT_APPLICATION_STATUSES)[number];

export type PanditApplication = {
  reference: string;
  name: string;
  phone: string;
  email: string;
  locality: string;
  pincode: string;
  years: number;
  education?: string;
  sampradaya?: string;
  rituals: string[];
  languages: string[];
  days: string[];
  timeWindows: string[];
  areas: string;
  travels: boolean;
  bringsSamagri: boolean;
  bio: string;
  status: PanditApplicationStatus;
  createdAt: string;
};

export type ActionState<T = undefined> =
  | { status: "idle" }
  | { status: "error"; message?: string; fieldErrors?: Record<string, string> }
  | { status: "success"; data: T };
