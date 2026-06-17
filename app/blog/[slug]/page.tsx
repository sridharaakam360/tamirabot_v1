import Link from "next/link";
import { getBlogPostBySlug, getAllBlogPosts, getGoogleDriveDirectLink } from "@/lib/blogService";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Next.js dynamic metadata generation (runs on server/build)
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getBlogPostBySlug(slug);
  if (!blog) return { title: "Post Not Found — Tamirabot" };
  return {
    title: `${blog.title} — Tamirabot`,
    description: blog.excerpt,
  };
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getBlogPostBySlug(slug);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (!blog) {
    return (
      <main className="min-h-screen bg-white pt-[96px] pb-24 font-sans text-center">
        <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col items-center">
          <h1 className="text-4xl font-extrabold text-[#24125F] mb-4">Post Not Found</h1>
          <p className="text-[#64748B] mb-8">The blog post you are looking for does not exist or has been removed.</p>
          <Link href="/blog" className="px-6 py-3 bg-[#F04F54] text-white rounded-full font-bold text-sm tracking-wide">
            Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-[96px] pb-24 font-sans text-[#0F172A]">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back navigation */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2.5 text-sm font-semibold text-[#64748B] hover:text-[#F04F54] transition-colors"
          >
            <div className="w-8 h-8 rounded-full border border-[#E5E7EB] flex items-center justify-center group-hover:border-[#F04F54] bg-white shadow-sm transition-all duration-300">
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            Back to Blog
          </Link>
        </div>

        {/* Article header */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#94A3B8] font-bold uppercase tracking-wider mb-4">
            <span className="px-3 py-1 rounded-full bg-[#F04F54]/10 text-[#F04F54]">{blog.category}</span>
            <span>{formatDate(blog.createdAt)}</span>
            {/* <span className="w-1 h-1 rounded-full bg-gray-300" /> */}
            {/* <span>By {blog.author}</span> */}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#24125F] leading-[1.15] tracking-tight mb-6">
            {blog.title}
          </h1>

          {blog.excerpt && (
            <p className="text-[#64748B] text-lg sm:text-xl leading-relaxed font-medium">
              {blog.excerpt}
            </p>
          )}
        </header>

        {/* Cover image */}
        {blog.coverImage && (
          <div className="w-full h-[300px] sm:h-[450px] rounded-[2rem] overflow-hidden mb-12 bg-gray-50 border border-gray-100 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={getGoogleDriveDirectLink(blog.coverImage)} 
              alt={blog.title} 
              className="w-full h-full object-cover" 
            />
          </div>
        )}

        {/* Main Content Body */}
        <article className="prose prose-lg max-w-none text-[#334155] leading-relaxed whitespace-pre-wrap font-medium text-base sm:text-lg">
          {blog.content}
        </article>
      </div>
    </main>
  );
}

// Generate static params for output: "export" build support
export async function generateStaticParams() {
  try {
    const posts = await getAllBlogPosts();
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (err) {
    console.error("Error generating static params:", err);
    return [];
  }
}
