import "server-only";

import { Resend } from "resend";
import { formatItemsSummary } from "@/lib/sheets-contract";
import { formatPrice } from "@/lib/format";
import type { Order, PanditApplication } from "@/types";

async function send(subject: string, text: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.SHOP_NOTIFY_EMAIL;
  const from = process.env.EMAIL_FROM;
  if (!apiKey || !to || !from) {
    console.error("Shop email is not configured. Set RESEND_API_KEY, EMAIL_FROM, and SHOP_NOTIFY_EMAIL.");
    return;
  }
  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({ from, to, subject, text });
    if (result.error) console.error("Shop email failed", result.error);
  } catch (error) {
    console.error("Shop email failed", error);
  }
}

export function notifyOrder(order: Order) {
  const address = `${order.deliveryAddress.line1}, ${order.deliveryAddress.locality}, ${order.deliveryAddress.city} ${order.deliveryAddress.pincode}`;
  return send(
    `New order ${order.reference}`,
    [
      `A new order was placed on Pushpank.`,
      ``,
      `Reference: ${order.reference}`,
      `Name: ${order.customer.name}`,
      `Phone: ${order.customer.phone}`,
      order.customer.email ? `Email: ${order.customer.email}` : "",
      `Address: ${address}`,
      `Items: ${formatItemsSummary(order.items)}`,
      `Total: ${formatPrice(order.total)}`,
      `Payment: ${order.paymentStatus}`,
      order.deliveryNotes ? `Notes: ${order.deliveryNotes}` : "",
      ``,
      `Update the order status in the Orders tab of the shop spreadsheet.`,
    ]
      .filter(Boolean)
      .join("\n"),
  );
}

export function notifyPanditApplication(application: PanditApplication) {
  return send(
    `New pandit registration ${application.reference}`,
    [
      `A pandit registration was submitted on Pushpank.`,
      ``,
      `Reference: ${application.reference}`,
      `Name: ${application.name}`,
      `Phone: ${application.phone}`,
      `Email: ${application.email}`,
      `Locality: ${application.locality} ${application.pincode}`,
      `Years: ${application.years}`,
      `Rituals: ${application.rituals.join(", ")}`,
      `Languages: ${application.languages.join(", ")}`,
      `Areas: ${application.areas}`,
      ``,
      application.bio,
    ].join("\n"),
  );
}
