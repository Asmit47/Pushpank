"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/fields";
import { FormError } from "@/components/ui/form-bits";
import { trackReference } from "@/lib/actions/track";
import { trackSchema } from "@/lib/schemas";
import type { TrackFormValues } from "@/lib/schemas";

export function TrackForm() {
  const router = useRouter();
  const [formError, setFormError] = useState<string>();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TrackFormValues>({
    resolver: zodResolver(trackSchema),
    defaultValues: { reference: "", phone: "" },
  });

  async function onSubmit(values: TrackFormValues) {
    setFormError(undefined);
    const result = await trackReference(values);
    if (result.ok) {
      router.push(result.data.href);
      return;
    }
    if (result.fieldErrors) {
      for (const [key, message] of Object.entries(result.fieldErrors)) {
        setError(key as keyof TrackFormValues, { message });
      }
    }
    setFormError(result.message);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <Input
        label="Order or booking reference"
        placeholder="PP-ABCDEFGHJK"
        autoCapitalize="characters"
        autoComplete="off"
        error={errors.reference?.message}
        {...register("reference")}
      />
      <Input
        label="Mobile number used for the order or booking"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        error={errors.phone?.message}
        {...register("phone")}
      />
      <FormError message={formError} />
      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Looking up…" : "Track"}
      </Button>
    </form>
  );
}
