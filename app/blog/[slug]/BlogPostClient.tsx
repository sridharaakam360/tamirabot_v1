"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getBlogPostBySlug, getGoogleDriveDirectLink, BlogPost } from "@/lib/blogService";

function formatDate(timestamp: any): string {
  if (!timestamp) return "";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogPostClient() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "";

  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    getBlogPostBySlug(slug)
      .then((post) => {
        if (!post) setNotFound(true);
        else setBlog(post);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white pt-[96px] pb-24 font-sans flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-t-[#F04F54] border-r-transparent border-b-transparent border-l-transparent" />
      </main>
    );
  }

  if (notFound || !blog) {
    return (
      <main className="min-h-screen bg-white pt-[96px] pb-24 font-sans text-center">
        <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col items-center">
          <h1 className="text-4xl font-extrabold text-[#24125F] mb-4">Post Not Found</h1>
          <p className="text-[#64748B] mb-8">
            The blog post you are looking for does not exist or has been removed.
          </p>
          <Link
            href="/blog"
            className="px-6 py-3 bg-[#F04F54] text-white rounded-full font-bold text-sm tracking-wide"
          >
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
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
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
