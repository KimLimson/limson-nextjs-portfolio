import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: '/limson-nextjs-portfolio',
  assetPrefix: '/limson-nextjs-portfolio/',
};

export default nextConfig;
