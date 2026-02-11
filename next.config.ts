import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: false,
  generateEtags: true,
  compress: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
