import Link from "next/link";

interface CtaLink {
  href: string;
  label: string;
}

interface CtaBannerProps {
  eyebrow: string;
  title: string;
  body: string;
  primary: CtaLink;
  secondary?: CtaLink;
}

/** Shared navy CTA banner used on the About and Products pages. */
export default function CtaBanner({ eyebrow, title, body, primary, secondary }: CtaBannerProps) {
  return (
    <section className="py-16 md:py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div
          className="relative rounded-3xl overflow-hidden px-10 py-16 md:px-20 md:py-20 text-center bg-[#24125F]"
          data-reveal
        >
          <div className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-10 bg-[#F04F54]" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 w-72 h-72 rounded-full opacity-10 bg-[#F04F54]" />
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] mb-4 px-3 py-1.5 rounded-full border text-[#F04F54] border-[#F04F54]/30 bg-[#F04F54]/10">
            {eyebrow}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 relative z-10">{title}</h2>
          <p className="text-white/60 max-w-md mx-auto mb-9 text-sm leading-relaxed relative z-10">{body}</p>
          <div className="flex flex-wrap justify-center gap-3 relative z-10">
            <Link
              href={primary.href}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm text-white hover:opacity-90 active:scale-95 transition-all duration-200 shadow-sm bg-[#F04F54]"
            >
              {primary.label}
            </Link>
            {secondary && (
              <Link
                href={secondary.href}
                className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-white/10 active:scale-95 transition-all duration-200"
              >
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
