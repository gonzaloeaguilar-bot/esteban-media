"use client";

import { useState } from "react";
import { useForm, Controller, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2, Send } from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SERVICES } from "@/lib/services";
import {
  BUDGET_LABELS,
  BUDGET_RANGES,
  DEADLINE_OPTIONS,
  FINAL_PLATFORM_OPTIONS,
  FOOTAGE_STATUS_OPTIONS,
  SHOOT_NEEDED_OPTIONS,
  contactSchema,
  type ContactInput,
  type FinalPlatformOption,
} from "@/lib/contact-schema";

/**
 * Client-side contact form.
 *
 * - `react-hook-form` + `zodResolver` share `contactSchema` with the API
 *   route, so the same constraints validate on both sides of the wire.
 * - The hidden `website` field is the honeypot — it's positioned off-screen
 *   with `aria-hidden` + `tabIndex={-1}` so humans and screen readers skip
 *   it; bots auto-fill it and trigger the silent-drop path on the server.
 * - On success we swap the form for a confirmation panel rather than just a
 *   toast, so the page state matches what the visitor expects after submit.
 * - Visible labels/placeholders/buttons go through `next-intl`. Zod's own
 *   validation messages stay in English for now — translating them needs an
 *   error-map wired through `zodResolver`, which is a follow-up (see
 *   `lib/contact-schema.ts`). Marked as a known limitation in messages/es.
 * - Conversion fields (deadline, city, finalPlatform, footageStatus,
 *   shootNeeded) pre-qualify the lead so Esteban can triage in one read.
 */
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const t = useTranslations("Contact.form");
  const tServices = useTranslations("Services.items");

  // `@hookform/resolvers@5.2.2` was published against `zod@^3.25` (which
  // ships `zod/v4/core` typings pinned to v4.0). Our project tracks the
  // current `zod@4.4`, so the resolver's `_zod.version.minor: 0` type
  // narrowing rejects our `minor: 4` schema even though the runtime
  // detection (`'_zod' in schema`) accepts both. The cast satisfies the
  // overload selection — remove once the resolver republishes against a
  // matching zod minor.
  const resolver = zodResolver(
    contactSchema as never,
  ) as Resolver<ContactInput>;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver,
    defaultValues: {
      name: "",
      email: "",
      projectType: undefined,
      budget: undefined,
      deadline: undefined,
      city: "",
      finalPlatform: [],
      footageStatus: undefined,
      shootNeeded: undefined,
      message: "",
      website: "",
    },
    mode: "onTouched",
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const data: { error?: string } = await res
          .json()
          .catch(() => ({}) as { error?: string });
        toast.error(data.error ?? t("errors.generic"));
        return;
      }

      setSubmitted(true);
      reset();
      toast.success(t("errors.success"));
    } catch {
      toast.error(t("errors.network"));
    }
  });

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex h-full flex-col items-start gap-4 py-6"
      >
        <CheckCircle2 className="size-10 text-foreground" aria-hidden />
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("successHeading")}
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          {t("successBodyBefore")}
          <a
            href="mailto:gagui010@icloud.com"
            className="font-medium text-foreground underline underline-offset-4 transition hover:opacity-80"
          >
            gagui010@icloud.com
          </a>
          {t("successBodyAfter")}
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={() => setSubmitted(false)}
          className="mt-2"
        >
          {t("sendAnother")}
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex flex-col gap-5"
      aria-label={t("ariaLabel")}
    >
      {/* Honeypot — hidden from humans/screen readers, attractive to bots. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-9999px] top-[-9999px] opacity-0"
      >
        <label htmlFor="website">
          {t("honeypotLabel")}
          <input
            id="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </label>
      </div>

      <Field id="name" label={t("nameLabel")} error={errors.name?.message}>
        <Input
          id="name"
          autoComplete="name"
          aria-invalid={Boolean(errors.name) || undefined}
          {...register("name")}
        />
      </Field>

      <Field id="email" label={t("emailLabel")} error={errors.email?.message}>
        <Input
          id="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email) || undefined}
          {...register("email")}
        />
      </Field>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field
          id="projectType"
          label={t("projectTypeLabel")}
          error={errors.projectType?.message}
        >
          <Controller
            control={control}
            name="projectType"
            render={({ field }) => (
              <Select
                value={field.value ?? ""}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  id="projectType"
                  className="w-full"
                  aria-invalid={Boolean(errors.projectType) || undefined}
                >
                  <SelectValue placeholder={t("projectTypePlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  {SERVICES.map(({ slug }) => (
                    <SelectItem key={slug} value={slug}>
                      {tServices(`${slug}.name`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>

        <Field
          id="budget"
          label={t("budgetLabel")}
          error={errors.budget?.message}
        >
          <Controller
            control={control}
            name="budget"
            render={({ field }) => (
              <Select
                value={field.value ?? ""}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  id="budget"
                  className="w-full"
                  aria-invalid={Boolean(errors.budget) || undefined}
                >
                  <SelectValue placeholder={t("budgetPlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  {BUDGET_RANGES.map((value) => (
                    <SelectItem key={value} value={value}>
                      {BUDGET_LABELS[value]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field
          id="deadline"
          label={t("deadlineLabel")}
          error={errors.deadline?.message}
        >
          <Controller
            control={control}
            name="deadline"
            render={({ field }) => (
              <Select
                value={field.value ?? ""}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  id="deadline"
                  className="w-full"
                  aria-invalid={Boolean(errors.deadline) || undefined}
                >
                  <SelectValue placeholder={t("deadlinePlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  {DEADLINE_OPTIONS.map((value) => (
                    <SelectItem key={value} value={value}>
                      {t(`deadlineOptions.${value}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>

        <Field id="city" label={t("cityLabel")} error={errors.city?.message}>
          <Input
            id="city"
            autoComplete="address-level2"
            placeholder={t("cityPlaceholder")}
            aria-invalid={Boolean(errors.city) || undefined}
            {...register("city")}
          />
        </Field>
      </div>

      <Field
        id="footageStatus"
        label={t("footageStatusLabel")}
        error={errors.footageStatus?.message}
      >
        <Controller
          control={control}
          name="footageStatus"
          render={({ field }) => (
            <Select
              value={field.value ?? ""}
              onValueChange={field.onChange}
            >
              <SelectTrigger
                id="footageStatus"
                className="w-full"
                aria-invalid={Boolean(errors.footageStatus) || undefined}
              >
                <SelectValue placeholder={t("footageStatusPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                {FOOTAGE_STATUS_OPTIONS.map((value) => (
                  <SelectItem key={value} value={value}>
                    {t(`footageStatusOptions.${value}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </Field>

      <Field
        id="shootNeeded"
        label={t("shootNeededLabel")}
        error={errors.shootNeeded?.message}
      >
        <Controller
          control={control}
          name="shootNeeded"
          render={({ field }) => (
            <Select
              value={field.value ?? ""}
              onValueChange={field.onChange}
            >
              <SelectTrigger
                id="shootNeeded"
                className="w-full"
                aria-invalid={Boolean(errors.shootNeeded) || undefined}
              >
                <SelectValue placeholder={t("shootNeededPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                {SHOOT_NEEDED_OPTIONS.map((value) => (
                  <SelectItem key={value} value={value}>
                    {t(`shootNeededOptions.${value}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </Field>

      <fieldset
        className="flex flex-col gap-3"
        aria-describedby={
          errors.finalPlatform ? "finalPlatform-error" : undefined
        }
      >
        <legend className="text-sm font-medium leading-none">
          {t("finalPlatformLabel")}
        </legend>
        <p className="text-xs text-muted-foreground">
          {t("finalPlatformHelp")}
        </p>
        <Controller
          control={control}
          name="finalPlatform"
          render={({ field }) => {
            const selected = (field.value ?? []) as FinalPlatformOption[];
            const toggle = (value: FinalPlatformOption) => {
              const next = selected.includes(value)
                ? selected.filter((slug) => slug !== value)
                : [...selected, value];
              field.onChange(next);
            };
            return (
              <div
                className="grid grid-cols-1 gap-2 sm:grid-cols-2"
                role="group"
              >
                {FINAL_PLATFORM_OPTIONS.map((value) => {
                  const id = `finalPlatform-${value}`;
                  const checked = selected.includes(value);
                  return (
                    <label
                      key={value}
                      htmlFor={id}
                      className="flex cursor-pointer items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm transition hover:border-foreground/40 has-[:checked]:border-foreground has-[:checked]:bg-foreground/5"
                    >
                      <input
                        id={id}
                        type="checkbox"
                        className="size-4 accent-foreground"
                        checked={checked}
                        onChange={() => toggle(value)}
                        onBlur={field.onBlur}
                        name={field.name}
                      />
                      <span>{t(`finalPlatformOptions.${value}`)}</span>
                    </label>
                  );
                })}
              </div>
            );
          }}
        />
        {errors.finalPlatform ? (
          <p
            id="finalPlatform-error"
            role="alert"
            className="text-xs font-medium text-destructive"
          >
            {errors.finalPlatform.message}
          </p>
        ) : null}
      </fieldset>

      <Field
        id="message"
        label={t("messageLabel")}
        error={errors.message?.message}
      >
        <Textarea
          id="message"
          rows={6}
          placeholder={t("messagePlaceholder")}
          aria-invalid={Boolean(errors.message) || undefined}
          {...register("message")}
        />
      </Field>

      <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">{t("footnote")}</p>
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="sm:self-end"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden />
              {t("submitting")}
            </>
          ) : (
            <>
              <Send className="size-4" aria-hidden />
              {t("submit")}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      {/*
        Wire the input's aria-describedby through the child instead of cloning
        — children that don't accept aria-describedby still get a visible
        error message below, so this stays a progressive enhancement.
      */}
      <div aria-describedby={errorId}>{children}</div>
      {error ? (
        <p
          id={errorId}
          role="alert"
          className="text-xs font-medium text-destructive"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
