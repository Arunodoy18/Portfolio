import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable strict mode to prevent React Three Fiber Scroll component
  // from attempting to create multiple roots (React 18+ issue)
  reactStrictMode: false,
  
  // Performance optimizations
  generateEtags: true,
  compress: true,
};

export default nextConfig;
