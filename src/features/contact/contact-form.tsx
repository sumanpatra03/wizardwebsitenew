"use client";

import { AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { useActionState, useId } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { CONTACT_PAGE } from "@/constants/contact";
import { cn } from "@/lib/utils";
import {
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

  const id = useId();
  const errorId = (name: string) => `${id}-${name}-error`;
  const value = (name: keyof NonNullable<EnquiryState["values"]>) =>
    state.values?.[name] ?? "";

  if (state.status === "success") {
    return (
      <div
        role="status"
        className={cn(
          "flex flex-col items-start gap-4 rounded-xl border p-8",
          "border-accent/30 bg-accent-muted",
        )}
      >
        <CheckCircle2 aria-hidden="true" className="size-8 text-accent" />
        <p className="font-display text-heading-md text-fg">Message sent</p>
        <p className="text-body-base text-fg-muted">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="flex flex-col gap-5">
      {state.status === "error" && state.message ? (
        <p
          role="alert"
          className={cn(
            "text-body-sm flex items-start gap-3 rounded-lg border p-4",
            "border-danger/40 bg-danger/10 text-fg",
          )}
        >
          <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-danger" />
          {state.message}
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Name"
          name="name"
          required
          defaultValue={value("name")}
          error={state.errors?.name}
          errorId={errorId("name")}
          autoComplete="name"
        />
   
        <Field
          label="Email"
          name="email"
          type="email"
          required
          defaultValue={value("email")}
          error={state.errors?.email}
          errorId={errorId("email")}
          autoComplete="email"
          inputMode="email"
        />
        <Field
          label="Phone"
          name="phone"
          type="tel"
          defaultValue={value("phone")}
          error={state.errors?.phone}
          errorId={errorId("phone")}
          autoComplete="tel"
          inputMode="tel"
        />
      </div>

      

      <label className="flex flex-col gap-2">
        <span className="text-label uppercase text-fg-subtle">
          Message <span className="text-accent">*</span>
        </span>
        <textarea
          name="message"
          rows={6}
          required
          defaultValue={value("message")}
          aria-invalid={Boolean(state.errors?.message)}
          aria-describedby={state.errors?.message ? errorId("message") : undefined}
          placeholder="What are you trying to build, and what is getting in the way?"
          className={cn(field, "resize-y")}
        />
        {state.errors?.message ? (
          <span id={errorId("message")} className="text-body-sm text-danger">
            {state.errors.message}
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
      <span className="text-label uppercase text-fg-subtle">
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
