"use client";

import { useEffect } from "react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

/**
 * Route-level error boundary. Must be a Client Component — React needs the
 * `reset` callback to run in the browser.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Replace with a real reporter (Sentry et al.) when one is wired up.
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[70svh] items-center py-section">
      <Container className="text-center">
        <p className="text-label mb-6 uppercase text-accent">Something broke</p>
        <h1 className="text-display-lg mx-auto max-w-2xl text-fg">
          This section failed to load.
        </h1>
        <p className="text-body-lg mx-auto mt-6 max-w-lg text-fg-muted">
          Try again — if it keeps happening, get in touch and we&apos;ll take a
          look.
        </p>
        {error.digest ? (
          <p className="text-body-sm mt-4 font-mono text-fg-subtle">
            Reference: {error.digest}
          </p>
        ) : null}
        <div className="mt-10 flex justify-center">
          <Button size="lg" onClick={reset}>
            Try again
          </Button>
        </div>
      </Container>
    </section>
  );
}
