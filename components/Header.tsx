"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { asset } from "@/lib/asset";

const NAV = [
  { href: "/", label: "Home", match: (p: string) => p === "/" },
  { href: "/about", label: "About", match: (p: string) => p.startsWith("/about") },
  { href: "/products", label: "Products", match: (p: string) => p.startsWith("/product") },
  { href: "/contact", label: "Contact", match: (p: string) => p.startsWith("/contact") },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#24125F]/8 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 h-[80px] flex items-center justify-between">
        <Link className="flex items-center" aria-label="Tamirabot Home" href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="Tamirabot" className="h-[36px] w-auto" src={asset("/images/logo.svg")} />
        </Link>

        <div className="hidden lg:flex items-center gap-10">
          <div className="flex items-center gap-8">
            {NAV.map((item) => {
              const active = item.match(pathname);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative py-2 text-[14px] font-medium tracking-[-0.006em] transition-colors duration-200 ${
                    active
                      ? "text-[#F04F54]"
                      : "text-[#24125F]/80 hover:text-[#24125F]"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute left-0 right-0 -bottom-[2px] h-[2px] rounded-full bg-[#F04F54] transition-all duration-200 ${
                      active ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                    }`}
                  />
                </Link>
              );
            })}
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center h-[40px] px-6 rounded-full text-[13px] font-semibold tracking-[-0.006em] text-white bg-[#F04F54] hover:bg-[#E5424A] shadow-[0_1px_3px_rgba(240,79,84,0.2),0_4px_12px_rgba(240,79,84,0.15)] hover:shadow-[0_2px_6px_rgba(240,79,84,0.3),0_8px_24px_rgba(240,79,84,0.2)] active:scale-[0.97] transition-all duration-200"
          >
            Get a Quote
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden justify-self-end w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[#F8F9FA] transition-colors duration-200"
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <div className="w-[18px] h-[14px] flex flex-col justify-between">
            <span
              className={`block w-full h-[1.5px] bg-[#24125F] rounded-full transition-all duration-300 origin-center ${
                open ? "translate-y-[6.25px] rotate-45" : ""
              }`}
            />
            <span
              className={`block w-full h-[1.5px] bg-[#24125F] rounded-full transition-all duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-full h-[1.5px] bg-[#24125F] rounded-full transition-all duration-300 origin-center ${
                open ? "-translate-y-[6.25px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] bg-white ${
          open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="px-6 py-5 flex flex-col gap-1">
          {NAV.map((item) => {
            const active = item.match(pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center h-[48px] px-4 rounded-xl text-[15px] font-medium transition-all duration-200 ${
                  active
                    ? "text-[#F04F54] bg-[#F04F54]/[0.04]"
                    : "text-[#24125F] hover:bg-[#F8F9FA]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="pt-3 mt-2 border-t border-[#ECEDF3]">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center h-[48px] rounded-full text-[14px] font-semibold text-white bg-[#F04F54]"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
