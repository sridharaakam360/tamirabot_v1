"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/lib/products";

export default function FeaturedProducts() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % PRODUCTS.length), 4500);
    return () => clearInterval(id);
  }, []);

  const product = PRODUCTS[active];
  const boxes = product.detailSpecs.slice(0, 4);

  return (
    <section className="py-16 md:py-20 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative" data-reveal>
          <div className="rounded-3xl overflow-hidden bg-white border border-[#E5E7EB] shadow-lg relative h-[450px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={product.slug}
              alt={`Featured - ${product.name}`}
              className="w-full h-full object-cover absolute inset-0 transition-opacity duration-500"
              src={product.image}
            />
          </div>
          <div className="absolute top-6 left-6 px-4 py-2 rounded-full text-white text-xs font-bold uppercase tracking-wider shadow-md z-10 bg-[#F04F54]">
            Featured Product
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {PRODUCTS.map((p, idx) => (
              <button
                key={p.slug}
                onClick={() => setActive(idx)}
                aria-label={`Show featured product ${idx + 1}`}
                className={`rounded-full transition-all duration-300 h-2.5 ${
                  idx === active ? "w-6 bg-[#F04F54]" : "w-2.5 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="min-h-[400px]" data-reveal="right-sm">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] mb-4 text-[#F04F54]">
            {product.category}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6 text-[#24125F]">
            {product.name}
          </h2>
          <p className="text-base leading-relaxed mb-8 min-h-[72px] text-[#7D7D8C]">
            {product.description}
          </p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {boxes.map(([label, value]) => (
              <div key={label} className="rounded-xl p-4 border border-[#E5E7EB] bg-[#F7F7F7]">
                <p className="text-lg font-bold text-[#24125F]">{value}</p>
                <p className="text-[10px] font-bold uppercase tracking-wider mt-0.5 text-[#7D7D8C]">
                  {label}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href={`/product/${product.slug}`}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-white hover:opacity-90 active:scale-95 transition-all duration-200 shadow-sm bg-[#F04F54]"
            >
              View Full Datasheet
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm border-2 transition-all duration-200 hover:bg-gray-50 border-[#24125F] text-[#24125F]"
            >
              Request Quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
