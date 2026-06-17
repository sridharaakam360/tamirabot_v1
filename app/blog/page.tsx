"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BlogPost, subscribeToBlogPosts, getGoogleDriveDirectLink } from "@/lib/blogService";

export default function BlogListingPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToBlogPosts((data) => {
      setBlogs(data);
      setLoading(false);
    }, true); // onlyPublished = true

    return () => unsubscribe();
  }, []);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-white pt-[96px] pb-24 font-sans text-[#0F172A]">
      {/* Blog Hero Section */}
      <section className="bg-gradient-to-b from-[#24125F]/5 to-transparent py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span 
            className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-[#F04F54] mb-4"
            style={{ animation: "fadeInUp 0.6s ease" }}
          >
            Insights & Technology
          </span>
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#24125F] leading-tight tracking-tight mb-6"
            style={{ animation: "fadeInUp 0.8s ease" }}
          >
            The Tamirabot Blog
          </h1>
          <p 
            className="max-w-2xl mx-auto text-[#64748B] text-base md:text-lg leading-relaxed font-medium"
            style={{ animation: "fadeInUp 1s ease" }}
          >
            Explore our latest research, EV engineering insights, and industry updates on high-power charging standards.
          </p>
        </div>
      </section>

      {/* Blogs Listing Section */}
      <section className="max-w-7xl mx-auto px-6 mt-12">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-t-[#F04F54] border-r-transparent border-b-transparent border-l-transparent" />
          </div>
        ) : blogs.length === 0 ? (
          <div className="bg-[#F8FAFC] rounded-[2rem] border border-gray-100 py-24 text-center max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 4a2 2 0 00-2-2m2 2a2 2 0 01-2 2m2 5l-3-3m0 0l-3 3m3-3V8" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#24125F]">No Articles Published</h3>
            <p className="text-[#64748B] text-sm mt-2 px-6">Check back soon for news and updates from our engineering department.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {blogs.map((blog) => (
              <article 
                key={blog.id} 
                className="group flex flex-col h-full bg-white rounded-3xl border border-gray-100 hover:border-[#F04F54]/20 hover:shadow-[0_12px_40px_rgba(36,18,95,0.04)] transition-all duration-500 overflow-hidden"
              >
                {/* Cover Image Container */}
                <Link href={`/blog/${blog.slug}/`} className="block relative h-56 bg-[#F8FAFC] overflow-hidden shrink-0 border-b border-gray-50">
                  {blog.coverImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img 
                      src={getGoogleDriveDirectLink(blog.coverImage)} 
                      alt={blog.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 font-medium text-sm">
                      Tamirabot Engineering
                    </div>
                  )}
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-sm text-[#F04F54] shadow-sm border border-gray-100/50">
                      {blog.category}
                    </span>
                  </div>
                </Link>

                {/* Card Content */}
                <div className="p-7 flex flex-col flex-1">
                  {/* Date and Author */}
                  <div className="flex items-center gap-3 text-xs text-[#94A3B8] font-bold uppercase tracking-wider mb-3">
                    <span>{formatDate(blog.createdAt)}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span>By {blog.author}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-extrabold text-[#24125F] leading-snug mb-3 group-hover:text-[#F04F54] transition-colors duration-300">
                    <Link href={`/blog/${blog.slug}/`} className="hover:underline decoration-[#F04F54]/30 underline-offset-4">
                      {blog.title}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="text-[#64748B] text-[15px] leading-relaxed mb-6 line-clamp-3">
                    {blog.excerpt}
                  </p>

                  {/* Read More Link */}
                  <div className="mt-auto pt-6 border-t border-gray-50">
                    <Link 
                      href={`/blog/${blog.slug}/`} 
                      className="inline-flex items-center text-[13px] font-extrabold text-[#F04F54] hover:text-[#D43D42] uppercase tracking-wider group/link"
                    >
                      Read Full Article
                      <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
