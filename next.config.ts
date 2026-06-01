import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  transpilePackages: ["react-map-gl", "mapbox-gl"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.shopify.com" },
      { protocol: "https", hostname: "files.cdn.printful.com" },
      { protocol: "https", hostname: "*.printful.com" },
      { protocol: "https", hostname: "files.cdn.printful.com" },
      { protocol: "https", hostname: "ucarecdn.com" },
    ],
  },
};

export default nextConfig;
