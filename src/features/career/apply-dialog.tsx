"use client";

import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  FileText,
  Paperclip,
  X,
} from "lucide-react";
import { useActionState, useId, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SITE } from "@/constants/site";
import { cn } from "@/lib/utils";
import {
  INITIAL_APPLICATION_STATE,
  submitApplication,
  type ApplicationState,
} from "@/app/career/actions";

const field = cn(
  "w-full rounded-lg border border-border bg-bg px-4 py-2.5",
  "text-body-sm text-fg placeholder:text-fg-subtle",
  "transition-colors duration-(--duration-fast)",
  "hover:border-border-strong",
  "focus-visible:border-accent focus-visible:outline-2",
  "focus-visible:outline-offset-2 focus-visible:outline-ring",
  "aria-[invalid=true]:border-danger",
);

/**
 * Apply-for-a-role dialog.
 *
 * The trigger carries the role, so the form opens knowing what it is for and
 * the applicant never has to restate it — the role travels through as a
 * hidden field rather than a select they could get wrong.
 *
 * The form still posts to a Server Action, so it degrades to a normal
 * submission if the dialog's JavaScript has not loaded. What it cannot do
 * without JavaScript is open, which is why every role also keeps a plain
 * mailto route on the page beneath it.
 */
export function ApplyDialog({ role }: { role: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-8">
          Apply for this role
          <ArrowRight
            aria-hidden="true"
            className={cn(
              "size-4 transition-transform duration-(--duration-fast)",
              "group-hover:translate-x-1 motion-reduce:translate-none",
            )}
          />
        </Button>
      </DialogTrigger>

      <DialogContent aria-describedby={undefined}>
        <ApplyForm role={role} onDone={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

function ApplyForm({ role, onDone }: { role: string; onDone: () => void }) {
  const [state, action] = useActionState<ApplicationState, FormData>(
    submitApplication,
    INITIAL_APPLICATION_STATE,
  );

  const id = useId();
  const errorId = (name: string) => `${id}-${name}-error`;
  const value = (name: string) => state.values?.[name] ?? "";

  if (state.status === "success") {
    return (
      <>
        <DialogHeader>
          <DialogTitle>Application received</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <div className="flex flex-col items-start gap-4">
            <CheckCircle2 aria-hidden="true" className="size-8 text-accent" />
            <p className="text-body-base text-fg-muted">{state.message}</p>
            <Button variant="outline" onClick={onDone}>
              Close
            </Button>
          </div>
        </DialogBody>
      </>
    );
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Apply — {role}</DialogTitle>
        <DialogDescription>
          Four fields and your CV. We read every one.
        </DialogDescription>
      </DialogHeader>

      <DialogBody>
        <form action={action} noValidate className="flex flex-col gap-4">
          {/* Carries the role through without the applicant restating it. */}
          <input type="hidden" name="role" value={role} />

          {state.status === "error" && state.message ? (
            <p
              role="alert"
              className={cn(
                "text-body-sm flex items-start gap-3 rounded-lg border p-3",
                "border-danger/40 bg-danger/10 text-fg",
              )}
            >
              <AlertCircle
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-danger"
              />
              {state.message}
            </p>
          ) : null}

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
            label="Phone number"
            name="phone"
            type="tel"
            required
            defaultValue={value("phone")}
            error={state.errors?.phone}
            errorId={errorId("phone")}
            autoComplete="tel"
            inputMode="tel"
          />
          <Field
            label="Current designation"
            name="designation"
            defaultValue={value("designation")}
            autoComplete="organization-title"
            placeholder="e.g. Senior QA Engineer at Acme"
          />

          <CvField error={state.errors?.cv} errorId={errorId("cv")} />

          <label className="flex flex-col gap-1.5">
            <span className="text-label uppercase text-fg-subtle">
              Anything else
            </span>
            <textarea
              name="message"
              rows={3}
              defaultValue={value("message")}
              placeholder="What have you built, and what would you like to build next?"
              className={cn(field, "resize-y")}
            />
          </label>

          {/* Honeypot. Hidden from people and from assistive tech. */}
          <div aria-hidden="true" className="absolute -left-[9999px]">
            <label>
              Website
              <input name="website" type="text" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <Submit />

          <p className="text-body-sm text-fg-subtle">
            Or email your CV to{" "}
            <a
              href={`mailto:${SITE.contact.email}?subject=${encodeURIComponent(`Application: ${role}`)}`}
              className="text-accent hover:underline"
            >
              {SITE.contact.email}
            </a>
            .
          </p>
        </form>
      </DialogBody>
    </>
  );
}

/**
 * CV upload.
 *
 * A styled button rather than a bare `<input type="file">`, whose native
 * rendering cannot be restyled and looks nothing like the rest of the form.
 * The input stays in the DOM and keeps the label association — it is the
 * label that is styled, not a button pretending — so clicking, tabbing and
 * screen readers all behave normally.
 */
function CvField({ error, errorId }: { error?: string; errorId: string }) {
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-label uppercase text-fg-subtle">
        Upload CV <span className="text-accent">*</span>
      </span>

      <label
        className={cn(
          "flex cursor-pointer items-center gap-3 rounded-lg border border-dashed",
          "border-border-strong bg-bg px-4 py-3 transition-colors",
          "duration-(--duration-fast) hover:border-accent hover:bg-accent-muted/40",
          "focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ring",
          error && "border-danger",
        )}
      >
        <Paperclip aria-hidden="true" className="size-4 shrink-0 text-accent" />
        <span className="text-body-sm min-w-0 flex-1 truncate text-fg-muted">
          {file ? file.name : "Choose a PDF or Word document"}
        </span>
        <span className="text-label shrink-0 uppercase text-accent">Browse</span>

        <input
          ref={inputRef}
          type="file"
          name="cv"
          required
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          className="sr-only"
        />
      </label>

      {file ? (
        <p className="text-body-sm flex items-center gap-2 text-fg-subtle">
          <FileText aria-hidden="true" className="size-3.5" />
          {(file.size / 1024 / 1024).toFixed(1)}MB
          <button
            type="button"
            onClick={() => {
              setFile(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
            className={cn(
              "inline-flex items-center gap-1 text-fg-muted",
              "transition-colors duration-(--duration-fast) hover:text-accent",
              "focus-visible:outline-2 focus-visible:outline-offset-2",
              "focus-visible:outline-ring",
            )}
          >
            <X aria-hidden="true" className="size-3.5" />
            Remove
          </button>
        </p>
      ) : (
        <p className="text-body-sm text-fg-subtle">PDF or Word, up to 5MB.</p>
      )}

      {error ? (
        <span id={errorId} className="text-body-sm text-danger">
          {error}
        </span>
      ) : null}
    </div>
  );
}

function Submit() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="mt-2 self-start">
      {pending ? "Sending…" : "Submit your application"}
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
    <label className="flex flex-col gap-1.5">
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
