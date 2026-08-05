import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { SITE } from "@/constants/site";

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Open Graph card, generated at build time.
 *
 * Written with inline styles and literal colours because Satori renders this
 * outside the browser — no Tailwind, no CSS variables, no theme context.
 * Values are copied from the dark theme in `themes.css`.
 *
 * The logo is inlined as a data URI: Satori has no access to the public
 * directory at render time, so the file is read from disk here instead.
 */
export default async function OpenGraphImage() {
  const logo = await readFile(
    join(process.cwd(), "public", "wizard-logo-dark.png"),
  );
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(60% 60% at 12% 8%, rgba(36,176,220,0.28) 0%, transparent 62%), radial-gradient(50% 50% at 88% 92%, rgba(60,155,185,0.22) 0%, transparent 60%), #0B0D0F",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="" width={320} height={100} />

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              color: "#F2F5F7",
              fontSize: 108,
              fontWeight: 800,
              letterSpacing: "-0.035em",
              lineHeight: 1,
            }}
          >
            {SITE.tagline}
          </div>
          <div
            style={{
              color: "#9BA3AA",
              fontSize: 32,
              lineHeight: 1.4,
              maxWidth: 900,
            }}
          >
            Technology and strategic consulting — custom software, AI, cloud and
            security. 22+ years, 200+ projects.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#24B0DC",
            fontSize: 26,
            fontWeight: 600,
          }}
        >
          <div style={{ width: 48, height: 3, background: "#24B0DC" }} />
          {SITE.url.replace("https://", "")}
        </div>
      </div>
    ),
    size,
  );
}
