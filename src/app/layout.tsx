import type { Metadata, Viewport } from "next";

import "@/styles/globals.css";

import { JsonLd } from "@/components/common/json-ld";
import { PageBackdrop } from "@/components/layout/page-backdrop";
import { SITE } from "@/constants/site";
import { Footer } from "@/features/navigation/footer";
import { Header } from "@/features/navigation/header";
import { fontVariables } from "@/lib/fonts";
import { organizationJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { siteUrl } from "@/lib/seo";
import { SmoothScrollProvider } from "@/providers/smooth-scroll-provider";
import { ThemeProvider } from "@/providers/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.metaDescription,
  applicationName: SITE.name,
  keywords: [
    "software development",
    "digital transformation",
    "IT consulting",
    "custom software",
    "artificial intelligence",
    "mobile app development",
    "Kolkata",
    SITE.name,
  ],
  authors: [{ name: SITE.legalName, url: SITE.url }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  alternates: { canonical: "/" },
  formatDetection: { telephone: true, address: true, email: true },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: SITE.locale,
    url: siteUrl,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.metaDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.metaDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  // Matches --bg in each theme so the mobile browser chrome blends in.
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0d0f" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // `className="dark"` is the SSR default that matches ThemeProvider's
    // defaultTheme, and `suppressHydrationWarning` covers the class that
    // next-themes' pre-paint script may swap in. Together: no theme flash.
    <html lang="en" className={`dark ${fontVariables}`} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col">
        <ThemeProvider>
          <SmoothScrollProvider>
            <a href="#main" className="sr-only-focusable z-100 rounded-pill bg-accent px-5 py-3 text-body-sm font-medium text-accent-fg top-4 left-4">
              Skip to content
            </a>

            <PageBackdrop />

            <Header />

            <main id="main" className="flex-1">
              {children}
            </main>

            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>

        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
      </body>
    </html>
  );
}
