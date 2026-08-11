"use server";

import { SITE } from "@/constants/site";
import { validate } from "@/lib/validation";
import * as rules from "@/lib/validation";

/**
 * Contact form submission.
 *
 * ## Delivery
 *
 * The enquiry is POSTed as JSON to `CONTACT_WEBHOOK_URL` — a mailer endpoint,
 * a CRM intake, a Zapier/Make hook, whatever the business already uses. That
 * indirection is deliberate: it keeps mail credentials out of this codebase
 * and lets the destination change without a deploy.
 *
 * **If that variable is unset the action fails and says so.** It does not
 * report success. A contact form that silently discards enquiries is worse
 * than no contact form, because the sender believes they have been heard —
 * so the error names the address to write to instead, and the page prints the
 * phone number and both inboxes beside the form regardless.
 *
 * ## Validation
 *
 * The rules live in `lib/validation` and are imported by the form too, so the
 * message shown on blur is the same one the server would return. They run
 * again here regardless: the browser's copy is a convenience for honest users
 * and no obstacle at all to anyone else.
 */

export type EnquiryState = {
  status: "idle" | "success" | "error";
  /** Shown above the form. */
  message?: string;
  /** Keyed by field name. */
  errors?: Record<string, string>;
  /** Echoed back so a rejected form does not lose what was typed. */
  values?: Record<string, string>;
};

export const INITIAL_ENQUIRY_STATE: EnquiryState = { status: "idle" };

/** Shared with the form, so the two can never disagree about what is valid. */
export const CONTACT_RULES = {
  name: rules.name,
  email: rules.email,
  phone: rules.phone(false),
  message: rules.message(20),
};

export async function submitEnquiry(
  _previous: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const read = (key: string) => String(formData.get(key) ?? "").trim();

  const values = {
    name: read("name"),
    organisation: read("organisation"),
    email: read("email"),
    phone: read("phone"),
    subject: read("subject"),
    message: read("message"),
  };

  /*
   * Honeypot. A field hidden from people and left empty by them; bots fill
   * every input they find. Accepted silently rather than rejected, so a
   * scripted submitter learns nothing from the response.
   */
  if (read("website")) {
    return { status: "success", message: "Thank you — your message is on its way." };
  }

  const errors = validate(formData, CONTACT_RULES);

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors,
      values,
    };
  }

  const endpoint = process.env.CONTACT_WEBHOOK_URL;
  if (!endpoint) {
    // Never report success we cannot back up.
    console.error(
      "[contact] CONTACT_WEBHOOK_URL is not set — enquiry was not delivered.",
    );
    return {
      status: "error",
      message: `Our form is not accepting messages right now. Please email ${SITE.contact.email} and we will pick it up straight away.`,
      values,
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, receivedAt: new Date().toISOString() }),
    });

    if (!response.ok) {
      throw new Error(`Endpoint responded ${response.status}`);
    }
  } catch (error) {
    console.error("[contact] delivery failed:", error);
    return {
      status: "error",
      message: `We could not send that just now. Please email ${SITE.contact.email} or call ${SITE.contact.phones[0]}.`,
      values,
    };
  }

  return {
    status: "success",
    message: "Thank you — your message is on its way. We reply within one working day.",
  };
}
