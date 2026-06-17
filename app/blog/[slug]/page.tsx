// Server Component — exports static params for output: "export" compatibility.
// Content is fetched client-side inside BlogPostClient using the Firebase web SDK.

import BlogPostClient from "./BlogPostClient";

// Allow any slug beyond what generateStaticParams returns — the client will
// handle 404s gracefully for unknown slugs.
// Note: dynamicParams cannot be true with output: "export", so we use a
// wildcard placeholder approach instead.
export const dynamicParams = false;

export function generateStaticParams() {
  // Return a single placeholder so Next.js builds the route shell.
  // The real slug is read client-side via useParams(); Firestore is queried
  // in the browser, so this works for any slug the admin creates.
  return [{ slug: "_" }];
}

export default function BlogPostPage() {
  return <BlogPostClient />;
}
