"use client";

import { useCallback, useState } from "react";

import type { Rule } from "@/lib/validation";

/**
 * Blur-time field validation for a form that posts to a Server Action.
 *
 * ## When it runs
 *
 * On blur, and thereafter on every change to a field that has already been
 * blurred. Validating while someone is still typing their email tells them
 * it is wrong before they have finished writing it, which is worse than
 * saying nothing; validating once they leave the field is the moment they
 * have finished with it.
 *
 * ## What it does not do
 *
 * It does not replace the server. `checkAll` runs on submit and blocks a
 * request that would certainly fail, but the Server Action validates
 * everything again with the same rules and is the only authority.
 *
 * The form keeps working without JavaScript: none of this exists until
 * hydration, and `action={…}` posts to the server either way.
 */
export function useFieldValidation(rules: Record<string, Rule>) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, true>>({});

  const check = useCallback(
    (field: string, value: string) => {
      const rule = rules[field];
      if (!rule) return undefined;

      const problem = rule(value);
      setErrors((previous) => {
        const next = { ...previous };
        if (problem) next[field] = problem;
        else delete next[field];
        return next;
      });
      return problem;
    },
    [rules],
  );

  const onBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.currentTarget;
      setTouched((previous) => ({ ...previous, [name]: true }));
      check(name, value);
    },
    [check],
  );

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.currentTarget;
      // Only after the field has been left once — see the note above.
      if (touched[name]) check(name, value);
    },
    [check, touched],
  );

  /**
   * Validates every rule against the submitted form. Returns the name of the
   * first field that failed, so the caller can move focus there — an error
   * message nobody is looking at is not much of a message.
   */
  const checkAll = useCallback(
    (form: HTMLFormElement): string | undefined => {
      const data = new FormData(form);
      const found: Record<string, string> = {};

      for (const [field, rule] of Object.entries(rules)) {
        const problem = rule(String(data.get(field) ?? ""));
        if (problem) found[field] = problem;
      }

      setErrors(found);
      setTouched(Object.fromEntries(Object.keys(rules).map((f) => [f, true as const])));

      return Object.keys(rules).find((field) => found[field]);
    },
    [rules],
  );

  /** Lets a caller set or clear an error the rules do not cover, like a file. */
  const setError = useCallback((field: string, problem?: string) => {
    setErrors((previous) => {
      const next = { ...previous };
      if (problem) next[field] = problem;
      else delete next[field];
      return next;
    });
  }, []);

  return { errors, onBlur, onChange, checkAll, setError };
}
