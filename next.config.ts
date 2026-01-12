import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable strict mode to prevent React Three Fiber Scroll component
  // from attempting to create multiple roots (React 18 issue)
  reactStrictMode: false,
  
  // Prevent external interference
  generateEtags: true,
  compress: true,
  
  // Explicit output configuration for production
  output: 'standalone',
};

export default nextConfig;
