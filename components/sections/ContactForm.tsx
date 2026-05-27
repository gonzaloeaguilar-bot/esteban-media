"use client";

import { useId, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import {
  BUDGET_RANGES,
  PROJECT_TYPES,
  projectTypeLabel,
  validateSubmission,
  type BudgetRange,
  type ContactSubmission,
  type ProjectType,
  type ValidationError,
} from "@/lib/contact";

/**
 * Client component — the form itself. Server page (`app/contact/page.tsx`)
 * provides the page chrome + bilingual heading copy.
 *
 * Behavior:
 *  - HTML `required` + `pattern` give us first-pass validation for free.
 *  - On submit, we also run `validateSubmission` so error messages match the
 *    server exactly and we never round-trip just to surface a typo.
 *  - Honeypot input named `website` is visually hidden but reachable by bots.
 *  - On success we replace the form with a confirmation panel (no toast lib
 *    needed; one bool of state).
 */

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "error"; message: string }
  | { kind: "success" };

type FieldErrors = Partial<Record<keyof ContactSubmission, string>>;

function errorsToMap(errors: ValidationError[]): FieldErrors {
  const out: FieldErrors = {};
  for (const e of errors) {
    if (!out[e.field]) out[e.field] = e.message;
  }
  return out;
}

export function ContactForm() {
  const nameId = useId();
  const emailId = useId();
  const projectId = useId();
  const budgetId = useId();
  const messageId = useId();
  const honeypotId = useId();

  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ kind: "submitting" });
    setFieldErrors({});

    const formData = new FormData(event.currentTarget);
    const payload: ContactSubmission = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      projectType: String(formData.get("projectType") ?? "") as ProjectType,
      budgetRange: String(formData.get("budgetRange") ?? "") as BudgetRange,
      message: String(formData.get("message") ?? "").trim(),
      website: String(formData.get("website") ?? ""),
    };

    // Optimistic client-side validation.
    const local = validateSubmission(payload);
    if (!local.ok) {
      setFieldErrors(errorsToMap(local.errors));
      setStatus({
        kind: "error",
        message: "Please double-check the highlighted fields.",
      });
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus({ kind: "success" });
        return;
      }

      if (res.status === 422) {
        const data = (await res.json()) as { errors?: ValidationError[] };
        if (data.errors) setFieldErrors(errorsToMap(data.errors));
        setStatus({
          kind: "error",
          message: "Please double-check the highlighted fields.",
        });
        return;
      }

      setStatus({
        kind: "error",
        message:
          "Something went wrong sending your message. Please try again or email gagui010@icloud.com directly.",
      });
    } catch {
      setStatus({
        kind: "error",
        message:
          "Network hiccup — please try again, or email gagui010@icloud.com directly.",
      });
    }
  }

  if (status.kind === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-border bg-card p-8 shadow-sm"
      >
        <h2 className="text-2xl font-semibold tracking-tight">
          Thanks — message received.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Esteban (or Gonzalo, on his behalf) will reply within one business
          day. If it&apos;s time-sensitive, email{" "}
          <a
            href="mailto:gagui010@icloud.com"
            className="font-medium text-foreground underline underline-offset-4"
          >
            gagui010@icloud.com
          </a>{" "}
          directly.
        </p>
        {/* TRANSLATION REVIEW NEEDED */}
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground" lang="es">
          Gracias — recibimos tu mensaje. Te respondemos en menos de un día
          hábil.
        </p>
      </div>
    );
  }

  const submitting = status.kind === "submitting";

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="space-y-6"
      aria-describedby={status.kind === "error" ? "contact-form-error" : undefined}
    >
      {/* Honeypot. Bots fill every input; humans never see this one. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={honeypotId}>
          Website (leave blank)
          <input
            id={honeypotId}
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <Field
        id={nameId}
        label="Your name"
        htmlName="name"
        type="text"
        required
        minLength={2}
        maxLength={120}
        autoComplete="name"
        error={fieldErrors.name}
        disabled={submitting}
      />

      <Field
        id={emailId}
        label="Email"
        htmlName="email"
        type="email"
        required
        autoComplete="email"
        error={fieldErrors.email}
        disabled={submitting}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <SelectField
          id={projectId}
          label="Project type"
          name="projectType"
          required
          error={fieldErrors.projectType}
          disabled={submitting}
          defaultValue=""
        >
          <option value="" disabled>
            Choose one…
          </option>
          {PROJECT_TYPES.map((slug) => (
            <option key={slug} value={slug}>
              {projectTypeLabel(slug)}
            </option>
          ))}
        </SelectField>

        <SelectField
          id={budgetId}
          label="Budget range"
          name="budgetRange"
          required
          error={fieldErrors.budgetRange}
          disabled={submitting}
          defaultValue=""
        >
          <option value="" disabled>
            Choose one…
          </option>
          {BUDGET_RANGES.map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
        </SelectField>
      </div>

      <div>
        <label
          htmlFor={messageId}
          className="block text-sm font-medium text-foreground"
        >
          Tell us about the project
        </label>
        <textarea
          id={messageId}
          name="message"
          required
          minLength={10}
          maxLength={4000}
          rows={6}
          disabled={submitting}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={
            fieldErrors.message ? `${messageId}-err` : undefined
          }
          className="mt-2 block w-full rounded-lg border border-border bg-background px-3 py-2 text-sm leading-relaxed shadow-sm transition placeholder:text-muted-foreground focus:border-foreground/30 focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-60"
          placeholder="Dates, location, deliverables, vibe references — anything that helps Esteban quote it well."
        />
        {fieldErrors.message ? (
          <p
            id={`${messageId}-err`}
            className="mt-2 text-sm text-destructive"
            role="alert"
          >
            {fieldErrors.message}
          </p>
        ) : null}
      </div>

      {status.kind === "error" ? (
        <p
          id="contact-form-error"
          role="alert"
          className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
        >
          {status.message}
        </p>
      ) : null}

      <div className="flex items-center gap-4">
        <Button
          type="submit"
          size="lg"
          disabled={submitting}
          aria-busy={submitting}
        >
          {submitting ? "Sending…" : "Send message"}
        </Button>
        <p className="text-xs text-muted-foreground">
          We reply within one business day.
        </p>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Small, local field primitives. Kept inline because they're not used */
/* anywhere else and shadcn ships no `Input` in this scaffold yet.    */
/* ------------------------------------------------------------------ */

type FieldProps = {
  id: string;
  label: string;
  htmlName: string;
  type: "text" | "email";
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  autoComplete?: string;
  error?: string;
  disabled?: boolean;
};

function Field({
  id,
  label,
  htmlName,
  type,
  required,
  minLength,
  maxLength,
  autoComplete,
  error,
  disabled,
}: FieldProps) {
  const errId = error ? `${id}-err` : undefined;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
        {required ? <span className="ml-1 text-destructive">*</span> : null}
      </label>
      <input
        id={id}
        name={htmlName}
        type={type}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        autoComplete={autoComplete}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={errId}
        className="mt-2 block w-full rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm transition placeholder:text-muted-foreground focus:border-foreground/30 focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-60"
      />
      {error ? (
        <p id={errId} className="mt-2 text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type SelectFieldProps = {
  id: string;
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  defaultValue?: string;
  children: React.ReactNode;
};

function SelectField({
  id,
  label,
  name,
  required,
  error,
  disabled,
  defaultValue,
  children,
}: SelectFieldProps) {
  const errId = error ? `${id}-err` : undefined;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
        {required ? <span className="ml-1 text-destructive">*</span> : null}
      </label>
      <select
        id={id}
        name={name}
        required={required}
        disabled={disabled}
        defaultValue={defaultValue}
        aria-invalid={Boolean(error)}
        aria-describedby={errId}
        className="mt-2 block w-full rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm transition focus:border-foreground/30 focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-60"
      >
        {children}
      </select>
      {error ? (
        <p id={errId} className="mt-2 text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
