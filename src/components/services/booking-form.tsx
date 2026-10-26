"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input, Select, Textarea } from "@/components/ui/fields";
import { FormError, HoneypotField } from "@/components/ui/form-bits";
import { submitBooking } from "@/lib/actions/booking";
import { formatPrice } from "@/lib/format";
import { bookingFormSchema, SAMAGRI_OPTIONS, TIME_WINDOWS } from "@/lib/schemas";
import type { BookingFormValues } from "@/lib/schemas";
import type { Service } from "@/types";

export function BookingForm({ service }: { service: Service }) {
  const router = useRouter();
  const [formError, setFormError] = useState<string>();
  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      serviceSlug: service.slug,
      packageId: "",
      name: "",
      phone: "",
      eventDate: "",
      timeWindow: undefined,
      line1: "",
      locality: "",
      pincode: "",
      samagri: undefined,
      notes: "",
      website: "",
    },
  });

  async function onSubmit(values: BookingFormValues) {
    setFormError(undefined);
    const result = await submitBooking(values);
    if (result.ok) {
      router.push(`/bookings/${result.data.reference}`);
      return;
    }
    if (result.fieldErrors) {
      for (const [key, message] of Object.entries(result.fieldErrors)) {
        setError(key as keyof BookingFormValues, { message });
      }
      setFocus(Object.keys(result.fieldErrors)[0] as keyof BookingFormValues);
    }
    setFormError(result.message);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5" aria-label={`Request a booking for ${service.name}`}>
      <input type="hidden" {...register("serviceSlug")} />

      <Select
        label="Package"
        optional
        error={errors.packageId?.message}
        hint="Not sure? Leave this blank and our team will suggest one."
        {...register("packageId")}
      >
        <option value="">Help me choose</option>
        {service.packages.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
            {p.indicativePrice ? ` (indicative ${formatPrice(p.indicativePrice)})` : ""}
          </option>
        ))}
      </Select>

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
        <Input label="Event date" type="date" error={errors.eventDate?.message} {...register("eventDate")} />
        <Select
          label="Preferred time"
          defaultValue=""
          error={errors.timeWindow?.message}
          {...register("timeWindow")}
        >
          <option value="" disabled>
            Select a time window
          </option>
          {TIME_WINDOWS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </Select>
        <Input
          label="House / flat, street"
          autoComplete="address-line1"
          error={errors.line1?.message}
          wrapperClassName="sm:col-span-2"
          {...register("line1")}
        />
        <Input label="Area / locality" error={errors.locality?.message} {...register("locality")} />
        <Input
          label="Pincode"
          inputMode="numeric"
          maxLength={6}
          autoComplete="postal-code"
          placeholder="226001"
          error={errors.pincode?.message}
          {...register("pincode")}
        />
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-medium">Samagri</legend>
        <div className="grid gap-2">
          {SAMAGRI_OPTIONS.map((o) => (
            <label key={o.value} className="flex cursor-pointer items-center gap-3 rounded-xl border border-line bg-sanctum px-4 py-3 text-sm has-[:checked]:border-gold has-[:checked]:bg-gold/10">
              <input type="radio" value={o.value} className="accent-maroon" {...register("samagri")} />
              {o.label}
            </label>
          ))}
        </div>
        {errors.samagri && (
          <p role="alert" className="mt-1.5 text-xs font-medium text-danger">
            {errors.samagri.message}
          </p>
        )}
      </fieldset>

      <Textarea
        label="Additional notes"
        optional
        rows={3}
        error={errors.notes?.message}
        {...register("notes")}
      />

      <HoneypotField {...register("website")} />
      <FormError message={formError} />

      <div className="rounded-xl bg-gold-100/60 p-4 text-sm text-parchment/80">
        This is a <strong>booking request</strong>, not a confirmed booking. Our team will check pandit availability and
        contact you to confirm. Payment is not taken at this step.
      </div>

      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
        {isSubmitting ? "Sending request…" : "Request a booking"}
      </Button>
    </form>
  );
}
