"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input, Select, Textarea } from "@/components/ui/fields";
import { FormError, HoneypotField } from "@/components/ui/form-bits";
import { decorationServiceOptions, eventTypes } from "@/data/decorations";
import { whatsappLink } from "@/data/site";
import { submitQuote } from "@/lib/actions/quote";
import { quoteFormSchema } from "@/lib/schemas";
import type { QuoteFormValues } from "@/lib/schemas";

const BUDGETS = ["Under ₹10,000", "₹10,000 to ₹25,000", "₹25,000 to ₹50,000", "Above ₹50,000", "Not sure yet"];

export function QuoteForm() {
  const [reference, setReference] = useState<string>();
  const [formError, setFormError] = useState<string>();
  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      eventType: "",
      eventDate: "",
      venue: "",
      guestCount: "",
      services: [],
      budgetRange: "",
      referenceLink: "",
      notes: "",
      website: "",
    },
  });

  async function onSubmit(values: QuoteFormValues) {
    setFormError(undefined);
    const result = await submitQuote(values);
    if (result.ok) {
      setReference(result.data.reference);
      reset();
      return;
    }
    if (result.fieldErrors) {
      for (const [key, message] of Object.entries(result.fieldErrors)) {
        setError(key as keyof QuoteFormValues, { message });
      }
      setFocus(Object.keys(result.fieldErrors)[0] as keyof QuoteFormValues);
    }
    setFormError(result.message);
  }

  if (reference) {
    return (
      <div role="status" className="py-6 text-center">
        <CheckCircle2 className="mx-auto size-12 text-forest" aria-hidden />
        <h3 className="mt-4 text-3xl font-semibold text-gold-soft">Quote request received</h3>
        <p className="mt-2 text-muted">
          Reference{" "}
          <strong className="select-all rounded bg-gold-100 px-2 py-0.5 font-mono text-parchment">{reference}</strong>
        </p>
        <p className="mx-auto mt-4 max-w-md text-sm text-parchment/80">
          Our team will review your requirements and contact you with a quote. This request does{" "}
          <strong>not</strong> confirm the service; it is confirmed only after you accept the quote.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button href={whatsappLink(`Hello Pushpank, my quote request reference is ${reference}.`)} variant="green">
            Message us on WhatsApp
          </Button>
          <Button variant="ghost" onClick={() => setReference(undefined)}>
            Send another request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5" aria-label="Request a custom quote">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Full name" autoComplete="name" error={errors.name?.message} {...register("name")} />
        <Input
          label="Mobile number"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="98765 43210"
          error={errors.phone?.message}
          {...register("phone")}
        />
        <Select label="Event or ritual type" defaultValue="" error={errors.eventType?.message} {...register("eventType")}>
          <option value="" disabled>
            Select one
          </option>
          {eventTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </Select>
        <Input label="Event date" type="date" error={errors.eventDate?.message} {...register("eventDate")} />
        <Input
          label="Venue or locality"
          error={errors.venue?.message}
          wrapperClassName="sm:col-span-2"
          {...register("venue")}
        />
        <Input
          label="Approximate guests"
          type="number"
          inputMode="numeric"
          min={1}
          optional
          error={errors.guestCount?.message}
          {...register("guestCount")}
        />
        <Select label="Budget range" optional error={errors.budgetRange?.message} {...register("budgetRange")}>
          <option value="">Prefer not to say</option>
          {BUDGETS.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </Select>
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-medium">Desired services</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {decorationServiceOptions.map((o) => (
            <label
              key={o}
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-line bg-sanctum px-4 py-3 text-sm has-[:checked]:border-gold has-[:checked]:bg-gold/10"
            >
              <input type="checkbox" value={o} className="size-4 accent-maroon" {...register("services")} />
              {o}
            </label>
          ))}
        </div>
        {errors.services && (
          <p role="alert" className="mt-1.5 text-xs font-medium text-danger">
            {errors.services.message}
          </p>
        )}
      </fieldset>

      <Input
        label="Reference image link"
        type="url"
        optional
        placeholder="https://"
        hint="Paste a link to an image or board that shows what you have in mind."
        error={errors.referenceLink?.message}
        {...register("referenceLink")}
      />
      <Textarea label="Notes" optional rows={4} error={errors.notes?.message} {...register("notes")} />

      <HoneypotField {...register("website")} />
      <FormError message={formError} />

      <p className="rounded-xl bg-gold-100/60 p-4 text-sm text-parchment/80">
        Submitting a quote request does not confirm the service. We will review it and contact you with a quote.
      </p>

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? "Sending…" : "Request a quote"}
      </Button>
    </form>
  );
}
