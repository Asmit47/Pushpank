"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/fields";
import { FormError, FormSection, HoneypotField } from "@/components/ui/form-bits";
import { submitPanditApplication } from "@/lib/actions/pandit";
import { PANDIT_DAYS, PANDIT_LANGUAGES, TIME_WINDOWS, panditApplicationSchema } from "@/lib/schemas";
import type { PanditApplicationValues } from "@/lib/schemas";
import { services } from "@/data/services";

const rituals = [...services.map((s) => ({ value: s.slug, label: s.name })), { value: "other", label: "Other" }];

export function RegisterForm() {
  const router = useRouter();
  const [formError, setFormError] = useState<string>();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<PanditApplicationValues>({
    resolver: zodResolver(panditApplicationSchema),
    defaultValues: {
      rituals: [],
      languages: [],
      days: [],
      timeWindows: [],
      years: "",
      travels: false,
      bringsSamagri: false,
      consent: false,
      website: "",
    },
  });

  async function onSubmit(values: PanditApplicationValues) {
    setFormError(undefined);
    const result = await submitPanditApplication(values);
    if (result.ok) {
      router.push(`/pandits/register/${result.data.reference}`);
      return;
    }
    if (result.fieldErrors) {
      for (const [key, message] of Object.entries(result.fieldErrors)) {
        setError(key as keyof PanditApplicationValues, { message });
      }
    }
    setFormError(result.message);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative space-y-6" noValidate>
      <HoneypotField {...register("website")} />
      <FormError message={formError} />
      <FormSection step={1} title="Personal">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Full name" {...register("name")} error={errors.name?.message} />
          <Input label="Mobile" {...register("phone")} error={errors.phone?.message} />
          <Input label="Email" type="email" {...register("email")} error={errors.email?.message} />
          <Input label="Locality" {...register("locality")} error={errors.locality?.message} />
          <Input label="Pincode" {...register("pincode")} error={errors.pincode?.message} />
        </div>
      </FormSection>
      <FormSection step={2} title="Experience">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Years of practice" type="number" {...register("years")} error={errors.years?.message} />
          <Input label="Gurukul or education" optional {...register("education")} error={errors.education?.message} />
          <Input label="Sampradaya" optional {...register("sampradaya")} error={errors.sampradaya?.message} />
        </div>
      </FormSection>
      <FormSection step={3} title="Rituals, languages and time">
        <CheckGroup legend="Rituals performed" name="rituals" options={rituals} register={register} error={errors.rituals?.message} />
        <CheckGroup legend="Languages" name="languages" options={PANDIT_LANGUAGES.map((l) => ({ value: l, label: l }))} register={register} error={errors.languages?.message} />
        <CheckGroup legend="Days" name="days" options={PANDIT_DAYS.map((l) => ({ value: l, label: l }))} register={register} error={errors.days?.message} />
        <CheckGroup legend="Time windows" name="timeWindows" options={TIME_WINDOWS.map((l) => ({ value: l, label: l }))} register={register} error={errors.timeWindows?.message} />
        <Textarea label="Areas you serve" {...register("areas")} error={errors.areas?.message} />
        <label className="mt-3 flex items-center gap-2 text-sm">
          <input type="checkbox" {...register("travels")} /> Willing to travel within Lucknow
        </label>
        <label className="mt-2 flex items-center gap-2 text-sm">
          <input type="checkbox" {...register("bringsSamagri")} /> I can bring samagri
        </label>
      </FormSection>
      <FormSection step={4} title="About you">
        <Textarea label="Short bio" {...register("bio")} error={errors.bio?.message} />
        <label className="mt-4 flex items-start gap-2 text-sm">
          <input type="checkbox" className="mt-1" {...register("consent")} />
          I confirm these details are mine and Pushpank may review them.
        </label>
        {errors.consent && <p className="mt-1 text-xs text-danger">{errors.consent.message}</p>}
      </FormSection>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending" : "Submit application"}
      </Button>
    </form>
  );
}

function CheckGroup({
  legend,
  name,
  options,
  register,
  error,
}: {
  legend: string;
  name: "rituals" | "languages" | "days" | "timeWindows";
  options: { value: string; label: string }[];
  register: ReturnType<typeof useForm<PanditApplicationValues>>["register"];
  error?: string;
}) {
  return (
    <fieldset className="mb-4">
      <legend className="mb-2 text-sm font-medium">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o.value} className="flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-sm has-[:checked]:border-gold has-[:checked]:bg-gold/10">
            <input type="checkbox" value={o.value} {...register(name)} />
            {o.label}
          </label>
        ))}
      </div>
      {error && <p className="mt-1 text-xs text-danger">{error}</p>}
    </fieldset>
  );
}
