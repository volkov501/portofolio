import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure portfolio.json is bundled into the Vercel serverless output
  // so getPortfolioData() can read it at runtime on Vercel.
  outputFileTracingIncludes: {
    "/": ["./data/**/*"],
  },
};

export default nextConfig;
