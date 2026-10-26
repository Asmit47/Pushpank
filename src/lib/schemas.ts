import { z } from "zod";

const phoneRegex = /^(?:\+?91)?[6-9]\d{9}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const name = z.string().trim().min(2, "Enter your full name").max(80, "Name is too long");
const phone = z
  .string()
  .trim()
  .refine((v) => phoneRegex.test(v.replace(/[\s-]/g, "")), "Enter a valid 10-digit mobile number");
const optionalEmail = z
  .string()
  .trim()
  .refine((v) => v === "" || emailRegex.test(v), "Enter a valid email address");
const pincode = z.string().trim().regex(/^\d{6}$/, "Enter a valid 6-digit pincode");
const line1 = z.string().trim().min(5, "Enter the full address").max(200, "Address is too long");
const locality = z.string().trim().min(2, "Enter your area or locality").max(80);
const optionalNotes = z.string().trim().max(500, "Please keep notes under 500 characters");
/** Honeypot: real users never fill this in. */
const honeypot = z.string().max(0).optional();

const todayIST = () => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date());
const futureDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a date")
  .refine((v) => v >= todayIST(), "Choose today or a future date");

// --- Checkout -------------------------------------------------------------

export const cartItemSchema = z.object({
  productId: z.string().min(1),
  variantId: z.string().min(1),
  quantity: z.number().int().min(1).max(20),
});

export const checkoutFormSchema = z.object({
  name,
  phone,
  email: optionalEmail,
  line1,
  locality,
  pincode,
  notes: optionalNotes,
  website: honeypot,
});
export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

export const placeOrderSchema = checkoutFormSchema.extend({
  items: z.array(cartItemSchema).min(1, "Your cart is empty").max(30),
});

// --- Booking --------------------------------------------------------------

export const TIME_WINDOWS = [
  "Early morning (5 am to 8 am)",
  "Morning (8 am to 12 pm)",
  "Afternoon (12 pm to 4 pm)",
  "Evening (4 pm to 8 pm)",
  "Flexible",
] as const;

export const SAMAGRI_OPTIONS = [
  { value: "i-will-arrange", label: "I will arrange the samagri" },
  { value: "need-kit", label: "I need a samagri kit" },
  { value: "not-sure", label: "Not sure yet, please advise" },
] as const;

export const bookingFormSchema = z.object({
  serviceSlug: z.string().min(1),
  packageId: z.string(),
  name,
  phone,
  eventDate: futureDate,
  timeWindow: z.enum(TIME_WINDOWS, "Choose a time window"),
  line1,
  locality,
  pincode,
  samagri: z.enum(SAMAGRI_OPTIONS.map((o) => o.value) as [string, ...string[]], "Choose a samagri option"),
  notes: optionalNotes,
  website: honeypot,
});
export type BookingFormValues = z.infer<typeof bookingFormSchema>;

// --- Quote ----------------------------------------------------------------

export const quoteFormSchema = z.object({
  name,
  phone,
  eventType: z.string().min(1, "Choose an event type"),
  eventDate: futureDate,
  venue: z.string().trim().min(3, "Enter the venue or locality").max(160),
  guestCount: z
    .string()
    .trim()
    .refine((v) => v === "" || (/^\d{1,5}$/.test(v) && Number(v) > 0), "Enter a number of guests"),
  services: z.array(z.string()).min(1, "Select at least one service"),
  budgetRange: z.string().trim().max(60),
  referenceLink: z
    .string()
    .trim()
    .refine((v) => v === "" || /^https?:\/\/\S+$/.test(v), "Enter a link starting with http:// or https://"),
  notes: optionalNotes,
  website: honeypot,
});
export type QuoteFormValues = z.infer<typeof quoteFormSchema>;

// --- Tracking -------------------------------------------------------------

export const PANDIT_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;
export const PANDIT_LANGUAGES = ["Hindi", "Sanskrit", "Awadhi", "English"] as const;

export const panditApplicationSchema = z.object({
  name,
  phone,
  email: z.string().trim().regex(emailRegex, "Enter a valid email address"),
  locality,
  pincode,
  years: z.string().trim().regex(/^\d{1,2}$/, "Enter years of practice"),
  education: z.string().trim().max(160).optional(),
  sampradaya: z.string().trim().max(80).optional(),
  rituals: z.array(z.string()).min(1, "Choose at least one ritual"),
  languages: z.array(z.string()).min(1, "Choose at least one language"),
  days: z.array(z.string()).min(1, "Choose the days you are available"),
  timeWindows: z.array(z.string()).min(1, "Choose at least one time window"),
  areas: z.string().trim().min(2, "Enter the areas you serve").max(200),
  travels: z.boolean(),
  bringsSamagri: z.boolean(),
  bio: z.string().trim().min(20, "Write a short bio").max(600),
  consent: z.boolean().refine((v) => v, "Please confirm your details can be reviewed"),
  website: honeypot,
});
export type PanditApplicationValues = z.infer<typeof panditApplicationSchema>;

export const trackSchema = z.object({
  reference: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^PP-[A-Z2-7]{10}$/, "Enter the reference exactly as sent to you, for example PP-ABCDEFGHJK"),
  phone,
});
export type TrackFormValues = z.infer<typeof trackSchema>;
