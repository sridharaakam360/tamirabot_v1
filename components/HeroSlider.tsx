"use client";

import { useEffect, useState } from "react";

const SLIDES = [
  { src: "/images/type2-connector.svg", caption: "Type 2 Connector", alt: "Type 2 Vehicle Connector" },
  { src: "/images/type6-connector.svg", caption: "Type 6 Connector", alt: "Type 6 Vehicle Connector" },
  { src: "/images/ccs2-connector.svg", caption: "CCS2 Connector", alt: "CCS2 Vehicle Connector" },
];

export default function HeroSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setActive((p) => (p + 1) % SLIDES.length),
      4000,
    );
    return () => clearInterval(id);
  }, []);

  const slide = SLIDES[active];

  return (
    <>
      <div
        className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5"
        style={{ height: "520px" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={slide.alt}
          className="w-full h-full object-cover transition-opacity duration-500"
          src={slide.src}
          key={slide.src}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#24125F]/60 via-transparent to-transparent" />
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full border border-white/20">
          <span className="text-[11px] font-bold uppercase tracking-widest text-white whitespace-nowrap">
            {slide.caption}
          </span>
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {SLIDES.map((s, idx) => (
          <button
            key={s.src}
            aria-label={`Show slide ${idx + 1}`}
            onClick={() => setActive(idx)}
            className={`rounded-full transition-all duration-300 h-2.5 ${
              idx === active
                ? "bg-[#F04F54] w-7"
                : "bg-white/30 w-2.5 hover:bg-white/50"
            }`}
          />
        ))}
      </div>

      <div
        data-reveal
        className="absolute -top-4 -left-4 bg-white rounded-2xl px-5 py-4 shadow-xl flex items-center gap-3"
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
          style={{ background: "rgba(240, 79, 84, 0.12)" }}
        >
          <span className="text-[#F04F54] font-bold text-xs">IND</span>
        </div>
        <div>
          <p className="text-[11px] text-[#7D7D8C] leading-none mb-0.5">Make in India</p>
          <p className="text-sm font-bold text-[#24125F] leading-none">100% Indigenous R&amp;D</p>
        </div>
      </div>

      <div
        data-reveal
        className="absolute -bottom-4 -right-4 bg-white rounded-2xl px-5 py-4 shadow-xl flex items-center gap-3"
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
          style={{ background: "rgba(36, 18, 95, 0.08)" }}
        >
          <span className="text-[#24125F] font-bold text-xs">B2B</span>
        </div>
        <div>
          <p className="text-[11px] text-[#7D7D8C] leading-none mb-0.5">Trusted Partner</p>
          <p className="text-sm font-bold text-[#24125F] leading-none">50+ Enterprise Clients</p>
        </div>
      </div>
    </>
  );
}
