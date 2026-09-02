"use server";

import { SITE } from "@/constants/site";
import { cv as validateCv, validate } from "@/lib/validation";
import * as rules from "@/lib/validation";

/**
 * Job application submission.
 *
 * ## Delivery
 *
 * Posted as JSON to `CAREERS_WEBHOOK_URL`, falling back to
 * `CONTACT_WEBHOOK_URL` so a single endpoint can take both if that is how the
 * business is set up. The CV rides along base64-encoded.
 *
 * **With neither set the action fails and says so.** It never reports success
 * it cannot back up: an application form that silently discards CVs is worse
 * than no form, because the candidate believes they have applied. The error
 * names the inbox to email instead, and the dialog offers that as a one-click
 * fallback either way.
 *
 * ## The file
 *
 * Capped at 5MB and restricted to PDF and Word documents. Both checks run
 * here rather than only in the browser, because an `accept` attribute is a
 * file-picker filter, not a constraint. `next.config.ts` raises the Server
 * Action body limit to 6MB to leave room for multipart overhead on top of a
 * file at the cap.
 */

/** Shared with the dialog, so the two can never disagree about what is valid. */
export const APPLICATION_RULES = {
  name: rules.name,
  email: rules.email,
  phone: rules.phone(true),
};

export type ApplicationState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string>;
  values?: Record<string, string>;
};

export const INITIAL_APPLICATION_STATE: ApplicationState = { status: "idle" };

export async function submitApplication(
  _previous: ApplicationState,
  formData: FormData,
): Promise<ApplicationState> {
  const read = (key: string) => String(formData.get(key) ?? "").trim();

  const values = {
    role: read("role"),
    name: read("name"),
    email: read("email"),
    phone: read("phone"),
    designation: read("designation"),
    message: read("message"),
  };

  // Honeypot — hidden from people, filled by bots. Accepted silently so a
  // scripted submitter learns nothing from the response.
  if (read("website")) {
    return {
      status: "success",
      message: "Thank you — your application is on its way.",
    };
  }

  const errors = validate(formData, APPLICATION_RULES);

  const uploaded = formData.get("cv");
  const file = uploaded instanceof File && uploaded.size > 0 ? uploaded : null;
  const cvProblem = validateCv(file);
  if (cvProblem) errors.cv = cvProblem;

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors,
      values,
    };
  }

  const endpoint = process.env.CAREERS_WEBHOOK_URL ?? process.env.CONTACT_WEBHOOK_URL;

  if (!endpoint) {
    console.error(
      "[career] CAREERS_WEBHOOK_URL is not set — application was not delivered.",
    );
    return {
      status: "error",
      message: `We cannot accept applications through this form right now. Please email your CV to ${SITE.contact.email} and we will pick it up straight away.`,
      values,
    };
  }

  try {
    const bytes = Buffer.from(await file!.arrayBuffer());

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kind: "application",
        ...values,
        cv: {
          filename: file!.name,
          type: file!.type,
          sizeBytes: file!.size,
          base64: bytes.toString("base64"),
        },
        receivedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) throw new Error(`Endpoint responded ${response.status}`);
  } catch (error) {
    console.error("[career] delivery failed:", error);
    return {
      status: "error",
      message: `We could not send that just now. Please email your CV to ${SITE.contact.email}.`,
      values,
    };
  }

  return {
    status: "success",
    message:
      "Thank you — your application is with us. We review every CV and will be in touch if there is a fit.",
  };
}
