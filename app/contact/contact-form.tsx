"use client";

import { useState } from "react";
import { useForm, Controller, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2, Send } from "lucide-react";
import { toast } from "sonner";

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
  contactSchema,
  type ContactInput,
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
 */
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

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
        toast.error(
          data.error ??
            "Something went wrong sending your message. Please try again.",
        );
        return;
      }

      setSubmitted(true);
      reset();
      toast.success("Message sent — we'll be in touch shortly.");
    } catch {
      toast.error(
        "Network error. Please try again, or email gagui010@icloud.com directly.",
      );
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
          Message sent.
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          Thanks for reaching out — we&rsquo;ll review the details and reply
          within two business days, usually sooner. If it&rsquo;s urgent, feel
          free to email{" "}
          <a
            href="mailto:gagui010@icloud.com"
            className="font-medium text-foreground underline underline-offset-4 transition hover:opacity-80"
          >
            gagui010@icloud.com
          </a>{" "}
          directly.
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={() => setSubmitted(false)}
          className="mt-2"
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex flex-col gap-5"
      aria-label="Contact form"
    >
      {/* Honeypot — hidden from humans/screen readers, attractive to bots. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-9999px] top-[-9999px] opacity-0"
      >
        <label htmlFor="website">
          Website (leave blank)
          <input
            id="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </label>
      </div>

      <Field
        id="name"
        label="Name"
        error={errors.name?.message}
      >
        <Input
          id="name"
          autoComplete="name"
          aria-invalid={Boolean(errors.name) || undefined}
          {...register("name")}
        />
      </Field>

      <Field
        id="email"
        label="Email"
        error={errors.email?.message}
      >
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
          label="Project type"
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
                  <SelectValue placeholder="Pick a service" />
                </SelectTrigger>
                <SelectContent>
                  {SERVICES.map(({ slug, name }) => (
                    <SelectItem key={slug} value={slug}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>

        <Field
          id="budget"
          label="Budget range"
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
                  <SelectValue placeholder="Pick a range" />
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

      <Field
        id="message"
        label="Tell us about the project"
        error={errors.message?.message}
      >
        <Textarea
          id="message"
          rows={6}
          placeholder="Dates, location, vibe, references — anything that helps us scope it."
          aria-invalid={Boolean(errors.message) || undefined}
          {...register("message")}
        />
      </Field>

      <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          We&rsquo;ll never share your details. Replies usually come within
          two business days.
        </p>
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="sm:self-end"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            <>
              <Send className="size-4" aria-hidden />
              Send message
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
