import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  // static HTML/CSS/JS in out/, so it can be hosted on GitHub Pages
  output: "export",
  // the site is served from bojanognjen.github.io/Quizzical/
  basePath: "/Quizzical",
};

export default nextConfig;