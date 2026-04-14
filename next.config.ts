import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i1-vnexpress.vnecdn.net",
      },
      {
        protocol: "https",
        hostname: "vnexpress.net"
      }
    ],
  },
};

export default nextConfig;
