/**
 * Form validation rules, shared by the browser and the Server Action.
 *
 * One definition, imported by both. The client runs these on blur so a typo
 * is caught the moment focus leaves the field; the server runs the same
 * functions on submit and is the only authority — client-side validation is a
 * convenience for honest users and no obstacle at all to anyone else.
 *
 * Pure string functions rather than a schema library: there are six rules
 * here, and they have to run in a Server Action, in a Client Component, and
 * against both a `FormData` entry and an `<input>` value.
 */

/** Deliberately permissive — the only real test of an address is sending to it. */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Accepted CV formats, mapped to the label shown if one is rejected. */
export const CV_TYPES = new Map([
  ["application/pdf", "PDF"],
  ["application/msword", "DOC"],
  ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "DOCX"],
]);

export const MAX_CV_BYTES = 5 * 1024 * 1024;

/** Every rule returns a message, or `undefined` when the value is fine. */
export type Rule = (value: string) => string | undefined;

export const required =
  (label: string): Rule =>
  (value) =>
    value.trim().length === 0 ? `${label} is required.` : undefined;

export const name: Rule = (value) =>
  value.trim().length < 2 ? "Please tell us your name." : undefined;

export const email: Rule = (value) =>
  EMAIL_PATTERN.test(value.trim())
    ? undefined
    : "That email address does not look right.";

export const phone =
  (isRequired: boolean): Rule =>
  (value) => {
    const digits = value.replace(/[^\d]/g, "");
    if (digits.length === 0) {
      return isRequired ? "Please give us a number we can reach you on." : undefined;
    }
    return digits.length < 7 ? "That phone number looks too short." : undefined;
  };

export const message =
  (min: number): Rule =>
  (value) =>
    value.trim().length < min
      ? "A sentence or two about the project helps us reply usefully."
      : undefined;

/**
 * The CV. Takes a `File` rather than a string, and runs identically in both
 * places — the browser has the File API and so does the Server Action.
 */
export function cv(file: File | null): string | undefined {
  if (!file || file.size === 0) return "Please attach your CV.";
  if (!CV_TYPES.has(file.type)) return "Please attach a PDF or Word document.";
  if (file.size > MAX_CV_BYTES) {
    return `That file is ${(file.size / 1024 / 1024).toFixed(1)}MB. Please keep it under 5MB.`;
  }
  return undefined;
}

/** Runs a set of rules over a `FormData`, returning only the failures. */
export function validate(
  data: FormData,
  rules: Record<string, Rule>,
): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const [field, rule] of Object.entries(rules)) {
    const problem = rule(String(data.get(field) ?? ""));
    if (problem) errors[field] = problem;
  }
  return errors;
}
