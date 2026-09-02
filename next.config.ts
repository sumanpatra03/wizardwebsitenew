import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Image pipeline: modern formats first, capped at our widest breakpoint.
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920],
  },

  // Tree-shake barrel imports from icon/animation packages so unused
  // exports never reach the client bundle.
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],

    // Server Actions cap request bodies at 1MB by default, which a CV in PDF
    // form regularly exceeds. The form itself rejects anything over 5MB, and
    // this leaves headroom for the multipart boundaries and part headers that
    // sit on top of the file's own bytes.
    serverActions: {
      bodySizeLimit: "6mb",
    },
  },

  // `/career` was the published URL before the section was renamed to the
  // plural. Permanent, so the link equity and any bookmark follow it over.
  async redirects() {
    return [{ source: "/career", destination: "/careers", permanent: true }];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
};

export default nextConfig;
