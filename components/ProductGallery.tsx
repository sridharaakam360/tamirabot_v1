"use client";

import { useState } from "react";

interface ProductGalleryProps {
  name: string;
  category: string;
  image: string;
}

/** Sticky image gallery on the product detail page: a main image plus
 *  three selectable thumbnails (the original used the same render thrice). */
export default function ProductGallery({ name, category, image }: ProductGalleryProps) {
  const thumbs = [image, image, image];
  const [active, setActive] = useState(0);

  return (
    <div className="lg:col-span-7 flex flex-col gap-6 sticky top-32">
      <div className="w-full bg-[#F8FAFC] rounded-[2rem] relative overflow-hidden flex items-center justify-center min-h-[400px] md:min-h-[600px] group">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={name}
          className="w-full h-full object-cover mix-blend-multiply drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
          src={thumbs[active]}
        />
        <div className="absolute top-8 left-8 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] bg-white text-[#F04F54] shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
          {category}
        </div>
      </div>
      <div className="flex justify-center gap-4">
        {thumbs.map((thumb, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            aria-label={`Thumbnail ${idx + 1}`}
            className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden transition-all duration-300 relative ${
              idx === active
                ? "ring-2 ring-offset-4 ring-[#F04F54]"
                : "opacity-50 hover:opacity-100 bg-[#F8FAFC]"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={`Thumbnail ${idx + 1}`}
              className="w-full h-full object-cover p-2 mix-blend-multiply"
              src={thumb}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
