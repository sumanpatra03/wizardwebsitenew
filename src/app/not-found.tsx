import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Page not found",
  description: "The page you are looking for could not be found.",
  noIndex: true,
});

export default function NotFound() {
  // No grid of its own: this section paints no background colour, so the fixed
  // PageBackdrop grid and beams already show through.
  return (
    <section className="bg-mesh relative flex min-h-[70svh] items-center py-section">
      <Container className="relative text-center">
        <p className="text-label mb-6 uppercase text-accent">Error 404</p>
        <h1 className="text-display-xl mx-auto max-w-2xl text-fg">
          We couldn&apos;t find that page.
        </h1>
        <p className="text-body-lg mx-auto mt-6 max-w-lg text-fg-muted">
          The link may be out of date, or the page may have moved. Let&apos;s get
          you back on track.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/">Back to home</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
