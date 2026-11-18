import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Map assets carry a ?v=<hash> cache-buster that changes when the base map is swapped.
    localPatterns: [{ pathname: "/map/**" }, { pathname: "/**", search: "" }],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
