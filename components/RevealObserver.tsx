"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Drives the scroll-reveal animations. Elements opt in with a `data-reveal`
 * attribute (see globals.css); this observer adds `.is-visible` when they
 * enter the viewport. It re-scans on route change so client-side navigation
 * picks up the freshly rendered page's elements.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );

    const scan = () => {
      document
        .querySelectorAll("[data-reveal]:not(.is-visible)")
        .forEach((el) => observer.observe(el));
    };

    const raf = requestAnimationFrame(scan);
    const timer = setTimeout(scan, 150);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
