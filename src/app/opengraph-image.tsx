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
 */
export default function OpenGraphImage() {
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
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 32 32" fill="none">
            <rect
              x="0.75"
              y="0.75"
              width="30.5"
              height="30.5"
              rx="9"
              stroke="#24B0DC"
              strokeWidth="1.5"
              opacity="0.4"
            />
            <path
              d="M7 10.5 L11.6 22 L16 14.4 L20.4 22 L25 10.5"
              stroke="#24B0DC"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="16" cy="8.4" r="1.7" fill="#24B0DC" />
          </svg>
          <div style={{ color: "#F2F5F7", fontSize: 34, fontWeight: 700 }}>
            {SITE.name}
          </div>
        </div>

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
            security. 16+ years, 200+ projects.
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
