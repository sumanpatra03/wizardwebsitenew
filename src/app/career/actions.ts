"use server";

import { SITE } from "@/constants/site";

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

const MAX_CV_BYTES = 5 * 1024 * 1024;

const ACCEPTED = new Map([
  ["application/pdf", "PDF"],
  ["application/msword", "DOC"],
  [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "DOCX",
  ],
]);

export type ApplicationState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string>;
  values?: Record<string, string>;
};

export const INITIAL_APPLICATION_STATE: ApplicationState = { status: "idle" };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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
    return { status: "success", message: "Thank you — your application is on its way." };
  }

  const errors: Record<string, string> = {};
  if (values.name.length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL.test(values.email)) {
    errors.email = "That email address does not look right.";
  }
  if (values.phone.replace(/[^\d]/g, "").length < 7) {
    errors.phone = "Please give us a number we can reach you on.";
  }

  const cv = formData.get("cv");
  const file = cv instanceof File && cv.size > 0 ? cv : null;

  if (!file) {
    errors.cv = "Please attach your CV.";
  } else if (!ACCEPTED.has(file.type)) {
    errors.cv = "Please attach a PDF or Word document.";
  } else if (file.size > MAX_CV_BYTES) {
    errors.cv = `That file is ${(file.size / 1024 / 1024).toFixed(1)}MB. Please keep it under 5MB.`;
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors,
      values,
    };
  }

  const endpoint =
    process.env.CAREERS_WEBHOOK_URL ?? process.env.CONTACT_WEBHOOK_URL;

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
