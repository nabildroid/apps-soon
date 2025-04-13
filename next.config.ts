import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    useCache: true,
    dynamicIO: true,
    cacheLife: {
      notionApp: {
        stale: 60 * 60 * 24 * 7, // 1 week
        expire: 60 * 60 * 24 * 30, // 1 month
        revalidate: 60 * 60 * 24 * 7, // 1 week
      }
    }

  },
};

export default nextConfig;
