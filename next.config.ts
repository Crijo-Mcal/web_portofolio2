import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['172.20.10.3'],
  images: {
    // Development: don't cache optimized images, so a replaced photo shows up after a refresh.
    // Production (Vercel): Next.js default of 4 hours.
    minimumCacheTTL: process.env.NODE_ENV === "development" ? 0 : 14400,
    // Technology icons (Devicon) in the Competências section
    remotePatterns: [{ protocol: "https", hostname: "cdn.jsdelivr.net", pathname: "/gh/devicons/**" }],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
