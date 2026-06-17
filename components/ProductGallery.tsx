"use client";

import { useState, useEffect, useCallback } from "react";

interface ProductGalleryProps {
  name: string;
  category: string;
  image: string;
}

/** Sticky image gallery on the product detail page: a main image plus
 *  three selectable thumbnails with a lightbox modal for deep-look zoom. */
export default function ProductGallery({ name, category, image }: ProductGalleryProps) {
  const thumbs = [image, image, image];
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const openLightbox = () => {
    setLightboxOpen(true);
    setZoomed(false);
    setOffset({ x: 0, y: 0 });
    setDragOffset({ x: 0, y: 0 });
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    setZoomed(false);
    setOffset({ x: 0, y: 0 });
    setDragOffset({ x: 0, y: 0 });
  }, []);

  const toggleZoom = () => {
    if (zoomed) {
      setZoomed(false);
      setOffset({ x: 0, y: 0 });
      setDragOffset({ x: 0, y: 0 });
    } else {
      setZoomed(true);
    }
  };

  // Close on Escape key
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    document.addEventListener("keydown", handleKey);
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, closeLightbox]);

  // Mouse drag for panning when zoomed
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!zoomed) return;
    e.preventDefault();
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!zoomed || !dragStart) return;
    setDragOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    if (!dragStart) return;
    setOffset(dragOffset);
    setDragStart(null);
  };

  // Touch drag for panning when zoomed
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!zoomed) return;
    const t = e.touches[0];
    setDragStart({ x: t.clientX - offset.x, y: t.clientY - offset.y });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!zoomed || !dragStart) return;
    e.preventDefault();
    const t = e.touches[0];
    setDragOffset({
      x: t.clientX - dragStart.x,
      y: t.clientY - dragStart.y,
    });
  };

  const handleTouchEnd = () => {
    if (!dragStart) return;
    setOffset(dragOffset);
    setDragStart(null);
  };

  const currentOffset = dragStart ? dragOffset : offset;

  return (
    <>
      {/* Gallery Column — sticky only on large screens */}
      <div className="lg:col-span-7 flex flex-col gap-6 lg:sticky lg:top-32">
        {/* Main image — clicking opens lightbox */}
        <div
          className="w-full bg-[#F8FAFC] rounded-[2rem] relative overflow-hidden flex items-center justify-center min-h-[400px] md:min-h-[600px] group cursor-zoom-in"
          onClick={openLightbox}
          title="Click to enlarge"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={name}
            className="w-full h-full object-cover mix-blend-multiply drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
            src={thumbs[active]}
          />
          <div className="absolute top-8 left-8 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] bg-white text-[#F04F54] shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
            {category}
          </div>
          {/* Zoom hint icon */}
          <div className="absolute bottom-5 right-5 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg className="w-4 h-4 text-[#F04F54]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0zm-2.5 0H9m3.5-3.5v7" />
            </svg>
          </div>
        </div>

        {/* Thumbnails */}
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

      {/* ── Lightbox Modal ── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ animation: "fadeIn 0.2s ease" }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={closeLightbox}
          />

          {/* Modal content */}
          <div className="relative z-10 flex flex-col items-center w-full h-full">
            {/* Top controls */}
            <div className="absolute top-4 right-4 flex items-center gap-3 z-20">
              {/* Zoom toggle */}
              <button
                onClick={toggleZoom}
                title={zoomed ? "Zoom out" : "Zoom in"}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all duration-200"
              >
                {zoomed ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0zM9 11h6" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0zm-2.5 0H9m3.5-3.5v7" />
                  </svg>
                )}
              </button>

              {/* Close */}
              <button
                onClick={closeLightbox}
                title="Close (Esc)"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Image container — scrollable when zoomed */}
            <div
              className="w-full h-full flex items-center justify-center overflow-hidden select-none"
              style={{ cursor: zoomed ? (dragStart ? "grabbing" : "grab") : "zoom-in" }}
              onClick={!zoomed ? toggleZoom : undefined}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={name}
                src={thumbs[active]}
                draggable={false}
                className="max-w-[90vw] max-h-[90vh] object-contain drop-shadow-2xl rounded-2xl bg-white/5 mix-blend-normal"
                style={{
                  transform: zoomed
                    ? `scale(2.2) translate(${currentOffset.x / 2.2}px, ${currentOffset.y / 2.2}px)`
                    : "scale(1)",
                  transition: dragStart ? "none" : "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
                  willChange: "transform",
                }}
              />
            </div>

            {/* Bottom label */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold tracking-wide">
              {name}
              {zoomed && <span className="ml-3 text-white/50 text-xs font-normal">Drag to pan · Click to zoom out</span>}
              {!zoomed && <span className="ml-3 text-white/50 text-xs font-normal">Click to zoom in</span>}
            </div>

            {/* Thumbnail strip */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-3">
              {thumbs.map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setActive(idx); setOffset({ x: 0, y: 0 }); setDragOffset({ x: 0, y: 0 }); }}
                  className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                    idx === active ? "border-[#F04F54] opacity-100" : "border-white/20 opacity-50 hover:opacity-80"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt={`Thumb ${idx + 1}`} src={thumb} className="w-full h-full object-cover bg-white" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </>
  );
}
