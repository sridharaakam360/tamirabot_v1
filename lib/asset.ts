// Prefixes public/ asset URLs with the deploy base path so they resolve when
// the site is served from a subpath (GitHub Pages: /tamirabot_v1/).
//
// Next.js auto-applies basePath to <Link> and its own _next/* bundles, but NOT
// to raw <img src> / favicon URLs that point at the public folder — those must
// be wrapped with asset(). NEXT_PUBLIC_BASE_PATH is set in next.config.ts.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  if (/^https?:\/\//.test(path)) return path; // leave fully-qualified URLs alone
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}
