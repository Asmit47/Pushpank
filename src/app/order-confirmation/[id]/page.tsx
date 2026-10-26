import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, SearchX } from "lucide-react";
import { ClearCart } from "@/components/checkout/clear-cart";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { Media } from "@/components/ui/media";
import { StatusBadge } from "@/components/ui/status-badge";
import { whatsappLink } from "@/data/site";
import { formatDate, formatPrice } from "@/lib/format";
import { getOrder } from "@/lib/server/store";

// Records are looked up per request; never cache a confirmation page.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Order confirmation",
  robots: { index: false, follow: false },
};

export default async function OrderConfirmationPage({ params }: PageProps<"/order-confirmation/[id]">) {
  const { id } = await params;
  const order = await getOrder(id);

  if (!order) {
    return (
      <Container className="py-16">
        <EmptyState
          icon={<SearchX className="size-10" aria-hidden />}
          title="We could not find this order"
          description="Check the link, or look it up with your reference and phone number."
          action={<Button href="/track">Track an order</Button>}
        />
      </Container>
    );
  }

  const a = order.deliveryAddress;
  return (
    <Container className="max-w-3xl py-10 lg:py-14">
      <ClearCart />
      <div className="text-center">
        <CheckCircle2 className="mx-auto size-12 text-forest" aria-hidden />
        <h1 className="mt-4 text-4xl font-semibold text-gold-soft sm:text-5xl">Thank you, we have your order</h1>
        <p className="mt-3 text-muted">
          Your order reference is{" "}
          <strong className="select-all rounded bg-gold-100 px-2 py-0.5 font-mono text-parchment">{order.reference}</strong>.
          Keep it to track your order.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
        <span className="inline-flex items-center gap-2">
          Order status: <StatusBadge status={order.orderStatus} />
        </span>
        <span className="inline-flex items-center gap-2">
          Payment: <StatusBadge status={order.paymentStatus} label="Payment pending" />
        </span>
      </div>

      <section className="mt-8 rounded-2xl border border-line bg-sanctum p-5 sm:p-6" aria-labelledby="items">
        <h2 id="items" className="text-2xl font-semibold text-gold-soft">
          Items
        </h2>
        <ul className="mt-3 divide-y divide-line">
          {order.items.map((i) => (
            <li key={i.variantId} className="flex items-center gap-3 py-3 text-sm">
              <Media
                src={i.image}
                alt=""
                width={56}
                height={56}
                wrapperClassName="size-14 shrink-0 rounded-lg border border-line"
                className="size-full"
              />
              <div className="min-w-0 flex-1">
                <p className="font-medium">{i.productName}</p>
                <p className="text-muted">
                  {i.variantLabel} · Qty {i.quantity} · {formatPrice(i.unitPrice)} each
                </p>
              </div>
              <p className="tabular-nums">{formatPrice(i.lineTotal)}</p>
            </li>
          ))}
        </ul>
        <dl className="mt-4 space-y-1.5 border-t border-line pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted">Subtotal</dt>
            <dd className="tabular-nums">{formatPrice(order.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Delivery</dt>
            <dd className="tabular-nums">{order.deliveryFee === 0 ? "Free" : formatPrice(order.deliveryFee)}</dd>
          </div>
          <div className="flex justify-between text-base font-semibold">
            <dt>Total</dt>
            <dd className="tabular-nums">{formatPrice(order.total)}</dd>
          </div>
        </dl>
      </section>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <section className="rounded-2xl border border-line bg-sanctum p-5" aria-labelledby="deliver-to">
          <h2 id="deliver-to" className="text-xl font-semibold text-gold-soft">
            Delivering to
          </h2>
          <address className="mt-2 text-sm not-italic leading-relaxed text-parchment/80">
            {order.customer.name}
            <br />
            {a.line1}, {a.locality}
            <br />
            {a.city} {a.pincode}
            <br />
            {order.customer.phone}
          </address>
          {order.deliveryNotes && <p className="mt-2 text-sm text-muted">Notes: {order.deliveryNotes}</p>}
        </section>
        <section className="rounded-2xl border border-line bg-sanctum p-5" aria-labelledby="next-steps">
          <h2 id="next-steps" className="text-xl font-semibold text-gold-soft">
            What happens next
          </h2>
          <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm text-parchment/80">
            <li>Our team reviews your order and delivery details.</li>
            <li>We contact you to confirm and share payment instructions.</li>
            <li>Your order is dispatched once confirmed.</li>
          </ol>
          <p className="mt-3 text-xs text-muted">Placed on {formatDate(order.createdAt)}.</p>
        </section>
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Button href={whatsappLink(`Hello Pushpank, my order reference is ${order.reference}.`)} variant="green">
          Message us on WhatsApp
        </Button>
        <Button href="/shop" variant="secondary">
          Continue shopping
        </Button>
      </div>
      <p className="mt-6 text-center text-sm text-muted">
        Need to change or cancel? Read our{" "}
        <Link href="/shipping-returns" className="text-gold-soft underline">
          cancellation policy
        </Link>{" "}
        and contact us as soon as possible.
      </p>
    </Container>
  );
}
