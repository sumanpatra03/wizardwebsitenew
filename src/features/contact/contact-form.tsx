"use client";

import { AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { useActionState, useId } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { useFieldValidation } from "@/hooks/use-field-validation";
import { cn } from "@/lib/utils";
import {
  CONTACT_RULES,
  INITIAL_ENQUIRY_STATE,
  submitEnquiry,
  type EnquiryState,
} from "@/app/contact/actions";

const field = cn(
  "w-full rounded-lg border border-border bg-bg px-4 py-3",
  "text-body-base text-fg placeholder:text-fg-subtle",
  "transition-colors duration-(--duration-fast)",
  "hover:border-border-strong",
  "focus-visible:border-accent focus-visible:outline-2",
  "focus-visible:outline-offset-2 focus-visible:outline-ring",
  "aria-[invalid=true]:border-danger",
);

/**
 * Enquiry form.
 *
 * `useActionState` keeps the whole thing working without JavaScript: the
 * `<form action>` posts to the Server Action directly, and the same action
 * returns the state the client renders once hydrated. Progressive enhancement
 * is free here, and on the one page where a failed submission means a lost
 * lead it is worth having.
 *
 * Errors are wired with `aria-describedby` and `aria-invalid` rather than
 * colour alone, and the result banner is a live region so it is announced
 * without moving focus out of the form.
 */
export function ContactForm() {
  const [state, action] = useActionState<EnquiryState, FormData>(
    submitEnquiry,
    INITIAL_ENQUIRY_STATE,
  );

  const { errors, onBlur, onChange, checkAll } = useFieldValidation(CONTACT_RULES);

  const id = useId();
  const errorId = (name: string) => `${id}-${name}-error`;
  const value = (name: keyof NonNullable<EnquiryState["values"]>) =>
    state.values?.[name] ?? "";

  /*
   * The client's answer wins while the form is being corrected: once a field
   * has been re-typed, the server's message from the previous submission is
   * about a value that no longer exists.
   */
  const errorFor = (field: string) => errors[field] ?? state.errors?.[field];

  /*
   * Block a submission that is certainly going to fail, and move focus to the
   * first field at fault — an error message nobody is looking at is not much
   * of a message. Without JavaScript none of this runs and the form posts
   * straight to the Server Action, which validates with the same rules.
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const firstInvalid = checkAll(event.currentTarget);
    if (!firstInvalid) return;

    event.preventDefault();
    event.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
  };

  if (state.status === "success") {
    return (
      <div
        role="status"
        className={cn(
          "flex flex-col items-start gap-4 rounded-xl border p-8",
          "border-accent/30 bg-accent-muted",
        )}
      >
        <CheckCircle2 aria-hidden="true" className="text-accent size-8" />
        <p className="font-display text-heading-md text-fg">Message sent</p>
        <p className="text-body-base text-fg-muted">{state.message}</p>
      </div>
    );
  }

  return (
    <form
      action={action}
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5"
    >
      {state.status === "error" && state.message ? (
        <p
          role="alert"
          className={cn(
            "text-body-sm flex items-start gap-3 rounded-lg border p-4",
            "border-danger/40 bg-danger/10 text-fg",
          )}
        >
          <AlertCircle
            aria-hidden="true"
            className="text-danger mt-0.5 size-4 shrink-0"
          />
          {state.message}
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Name"
          name="name"
          required
          defaultValue={value("name")}
          error={errorFor("name")}
          errorId={errorId("name")}
          onBlur={onBlur}
          onChange={onChange}
          autoComplete="name"
        />

        <Field
          label="Email"
          name="email"
          type="email"
          required
          defaultValue={value("email")}
          error={errorFor("email")}
          errorId={errorId("email")}
          onBlur={onBlur}
          onChange={onChange}
          autoComplete="email"
          inputMode="email"
        />
        <Field
          label="Phone"
          name="phone"
          type="tel"
          defaultValue={value("phone")}
          error={errorFor("phone")}
          errorId={errorId("phone")}
          onBlur={onBlur}
          onChange={onChange}
          autoComplete="tel"
          inputMode="tel"
        />
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-label text-fg-subtle uppercase">
          Message <span className="text-accent">*</span>
        </span>
        <textarea
          name="message"
          rows={6}
          required
          defaultValue={value("message")}
          onBlur={onBlur}
          onChange={onChange}
          aria-invalid={Boolean(errorFor("message"))}
          aria-describedby={errorFor("message") ? errorId("message") : undefined}
          placeholder="What are you trying to build, and what is getting in the way?"
          className={cn(field, "resize-y")}
        />
        {errorFor("message") ? (
          <span id={errorId("message")} className="text-body-sm text-danger">
            {errorFor("message")}
          </span>
        ) : null}
      </label>

      {/* Honeypot. Hidden from people and from assistive tech; bots fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <Submit />
    </form>
  );
}

function Submit() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="lg" disabled={pending} className="self-start">
      {pending ? "Sending…" : "Send message"}
      <ArrowRight
        aria-hidden="true"
        className={cn(
          "size-4 transition-transform duration-(--duration-fast)",
          "group-hover:translate-x-1 motion-reduce:translate-none",
        )}
      />
    </Button>
  );
}

function Field({
  label,
  name,
  error,
  errorId,
  required,
  ...props
}: React.ComponentPropsWithoutRef<"input"> & {
  label: string;
  name: string;
  error?: string;
  errorId?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-label text-fg-subtle uppercase">
        {label} {required ? <span className="text-accent">*</span> : null}
      </span>
      <input
        name={name}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={field}
        {...props}
      />
      {error ? (
        <span id={errorId} className="text-body-sm text-danger">
          {error}
        </span>
      ) : null}
    </label>
  );
}
