import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    // Tile and preview URLs carry a ?v=<hash> that changes whenever the base map is swapped, so they can be cached forever.
    const immutable = [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }];
    return [
      { source: "/map/tiles/:path*", headers: immutable },
      { source: "/map/base-preview.webp", headers: immutable },
    ];
  },
  images: {
    // Map assets carry a ?v=<hash> cache-buster that changes when the base map is swapped.
    localPatterns: [{ pathname: "/map/**" }, { pathname: "/**", search: "" }],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
