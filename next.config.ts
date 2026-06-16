import type { NextConfig } from "next";

// Deployed to GitHub Pages at https://sridharaakam360.github.io/tamirabot_v1/
// so production builds are served from the "/tamirabot_v1" subpath. Local dev
// (`next dev`) runs at the root, so basePath is only applied for prod builds.
// If the repo is renamed, update BASE_PATH below.
const BASE_PATH = "/tamirabot_v1";
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? BASE_PATH : "";

const nextConfig: NextConfig = {
  // Emit a fully static site into ./out for GitHub Pages.
  output: "export",
  basePath,
  // GitHub Pages can't run Next's image optimizer — serve images as-is.
  images: { unoptimized: true },
  // Export directory-style routes (/about/ -> /about/index.html).
  trailingSlash: true,
  // Expose the base path to the client for the asset() helper.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
