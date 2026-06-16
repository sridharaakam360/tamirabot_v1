import Link from "next/link";
import FeaturedProducts from "@/components/FeaturedProducts";
import CtaBanner from "@/components/CtaBanner";
import { PRODUCTS } from "@/lib/products";

export const metadata = {
  title: "Products — Tamirabot",
  description:
    "Precision-engineered EV charging connectors and modules that exceed international standards for safety, performance, and durability.",
};

export default function ProductsPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative pt-[110px] pb-24 md:pt-[140px] md:pb-28 px-6 overflow-hidden bg-[#24125F]">
        <div className="pointer-events-none absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-10 bg-[#F04F54]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div data-reveal>
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] mb-5 text-[#F04F54]">Our Products</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08] mb-6">
              EV Charging
              <br />
              <span className="text-[#F04F54]">Solutions</span> Built to Last
            </h1>
            <p className="text-white/60 text-lg max-w-xl leading-relaxed">
              Precision-engineered connectors and modules that exceed international standards for safety, performance, and durability.
            </p>
          </div>
        </div>
      </section>

      {/* Featured product spotlight (auto-rotating) */}
      <FeaturedProducts />

      {/* Full portfolio */}
      <section className="py-16 md:py-20 px-6 bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" data-reveal>
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] mb-4 text-[#F04F54]">Full Range</span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#24125F]">Complete Product Portfolio</h2>
            <p className="mt-4 max-w-xl mx-auto text-base leading-relaxed text-[#7D7D8C]">
              From AC home charging to ultra-fast DC stations — every connector crafted to the highest standard.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {PRODUCTS.map((product, i) => (
              <div
                key={product.slug}
                className="bg-white rounded-3xl border border-[#E5E7EB] overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col"
                data-reveal
                style={{ transitionDelay: `${(i % 3) * 70}ms` }}
              >
                <div className="relative h-52 overflow-hidden shrink-0 bg-gray-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={product.image}
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#F04F54]">{product.category}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-white bg-[#24125F]">{product.badge}</span>
                  </div>
                  <h3 className="text-base font-bold mb-4 leading-snug text-[#24125F]">{product.name}</h3>
                  <div className="flex flex-col gap-2 mb-5 flex-1">
                    {product.cardSpecs.map(([label, value]) => (
                      <div key={label} className="flex justify-between items-center text-xs pb-2 border-b border-[#E5E7EB] last:border-0">
                        <span className="text-[#7D7D8C] font-medium">{label}</span>
                        <span className="text-[#24125F] font-bold text-right">{value}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href={`/product/${product.slug}`}
                    className="mt-auto w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-200 border border-[#24125F] text-[#24125F] bg-transparent hover:bg-[#24125F] hover:text-white hover:border-[#24125F]"
                  >
                    View Details
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                <div className="h-1 w-0 group-hover:w-full transition-all duration-[400ms] bg-[#F04F54]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        eyebrow="Custom Engineering"
        title="Need a Custom Solution?"
        body="We offer bespoke engineering for OEMs and enterprises. From custom pin configurations to specialized housings — let's build exactly what you need."
        primary={{ href: "/contact", label: "Request Custom Quote" }}
      />
    </main>
  );
}
