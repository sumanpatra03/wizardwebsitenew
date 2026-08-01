/**
 * Emits a JSON-LD block.
 *
 * `<` is escaped so a stray sequence in the data can never terminate the
 * script element early.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
