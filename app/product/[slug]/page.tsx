import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/ProductGallery";
import { PRODUCTS, getProduct, getOtherProducts, type SpecTable } from "@/lib/products";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product — Tamirabot" };
  return { title: `${product.name} — Tamirabot`, description: product.description };
}

function TableCard({
  table,
  firstColWidth = "",
  fill = false,
  className = "",
}: {
  table: SpecTable;
  firstColWidth?: string;
  fill?: boolean;
  className?: string;
}) {
  const hasHead = table.headers.length > 0;
  return (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden ${fill ? "flex flex-col" : ""} ${className}`}>
      <div className={`bg-[#24125F] px-6 py-4 ${fill ? "shrink-0" : ""}`}>
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">{table.title}</h3>
      </div>
      <div className={`overflow-x-auto ${fill ? "flex-1" : ""}`}>
        <table className="w-full text-left text-[14px]">
          {hasHead && (
            <thead>
              <tr className="border-b border-gray-200 bg-white">
                {table.headers.map((h, i) => (
                  <th
                    key={h}
                    className={`px-6 py-4 font-bold text-xs text-gray-400 uppercase tracking-wider ${i < table.headers.length - 1 ? "border-r border-gray-200" : ""}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {table.rows.map((row, ri) => (
              <tr key={ri} className="border-b border-gray-200 last:border-0 hover:bg-gray-50 transition-colors">
                {row.map((cell, ci) =>
                  ci === 0 ? (
                    <td key={ci} className={`px-6 py-4 font-bold text-[#24125F] border-r border-gray-200 ${firstColWidth}`}>
                      {cell}
                    </td>
                  ) : (
                    <td key={ci} className={`px-6 py-4 text-gray-500 ${ci < row.length - 1 ? "border-r border-gray-200" : ""}`}>
                      {cell}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const others = getOtherProducts(slug);
  const find = (title: string) => product.tables.find((t) => t.title === title)!;
  const specTable = find("Product Specifications");
  const electrical = find("Electrical Properties");
  const mechanical = find("Mechanical Properties");
  const commercial = find("Commercial Data");

  return (
    <main>
      <div className="min-h-screen bg-white pt-[96px] pb-24 font-sans text-[#0F172A]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Back */}
          <div className="mb-3" data-reveal="left">
            <Link
              href="/products"
              className="group inline-flex items-center gap-2.5 text-sm font-semibold text-[#64748B] hover:text-[#F04F54] transition-colors"
            >
              <div className="w-8 h-8 rounded-full border border-[#E5E7EB] flex items-center justify-center group-hover:border-[#F04F54] bg-white shadow-sm transition-all duration-300">
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
              Back to Products
            </Link>
          </div>

          {/* Top: gallery + info */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            <ProductGallery name={product.name} category={product.category} image={product.image} />

            <div className="lg:col-span-5 flex flex-col justify-center pt-4 lg:pt-10">
              <div data-reveal>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#F04F54] mb-4 block">CHARGING CONNECTOR</span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0F172A] leading-[1.1] tracking-tight mb-4">{product.name}</h1>
                <p className="text-[#64748B] text-base md:text-lg mb-10 leading-relaxed font-medium">{product.description}</p>

                <div className="flex flex-col gap-5 border-y border-gray-100 py-8 mb-10">
                  {product.detailSpecs.map(([label, value]) => (
                    <div key={label} className="flex justify-between items-center group">
                      <span className="text-sm font-semibold uppercase tracking-wider text-[#94A3B8] transition-colors group-hover:text-[#64748B]">{label}</span>
                      <span className="text-base font-bold text-[#0F172A] text-right">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-6 mb-12">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                    </span>
                    <span className="text-sm font-bold text-[#0F172A]">Ready for Dispatch</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#94A3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-sm font-bold text-[#0F172A]">48 Month Warranty</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact"
                    className="flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-white bg-[#F04F54] hover:bg-[#D43D42] active:scale-95 transition-all duration-300 shadow-[0_8px_20px_rgba(240,79,84,0.3)] hover:shadow-[0_12px_25px_rgba(240,79,84,0.4)]"
                  >
                    Request Technical Quotation
                  </Link>
                </div>

                <div className="mt-8 flex items-center justify-between text-[10px] md:text-xs font-bold text-[#94A3B8] uppercase tracking-[0.15em]">
                  <span>Tamirabot Engineering</span>
                  <span className="flex gap-4">
                    <span className="text-[#0F172A]">ISO 9001</span> <span className="text-[#0F172A]">IATF 16949</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Datasheet */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <div className="max-w-3xl mb-16">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-[#F04F54] mb-4">Comprehensive Details</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight">Technical Datasheet</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-4 space-y-12">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-[#94A3B8] mb-6">Key Features</h3>
                  <ul className="space-y-5">
                    {product.features.map((f) => (
                      <li key={f} className="flex items-start gap-4 text-[15px] text-[#334155] leading-relaxed">
                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#F04F54] shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {product.accessories.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#94A3B8] mb-6">Accessories</h3>
                    <div className="space-y-4">
                      {product.accessories.map((a) => (
                        <div key={a.name} className="p-5 rounded-2xl bg-[#F8FAFC] border border-gray-100">
                          <span className="font-bold text-[#0F172A] block mb-2">{a.name}</span>
                          <span className="text-[#64748B] text-sm leading-relaxed block">{a.detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="lg:col-span-8">
                <TableCard table={specTable} className="mb-10" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <TableCard table={electrical} firstColWidth="w-2/5" fill />
                  <TableCard table={mechanical} firstColWidth="w-2/5" fill />
                </div>
                <TableCard table={commercial} firstColWidth="w-1/3" className="mb-10" />
              </div>
            </div>
          </div>

          {/* Explore Portfolio */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-extrabold text-[#0F172A] tracking-tight mb-2">Explore Portfolio</h2>
                <p className="text-[#64748B] text-[15px]">Discover our complete range of certified charging solutions.</p>
              </div>
              <Link href="/products" className="hidden sm:inline-flex text-sm font-bold text-[#F04F54] hover:text-[#D43D42] transition-colors items-center gap-2">
                View All
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/product/${o.slug}`}
                  className="group block rounded-3xl border border-gray-100 bg-white hover:border-[#F04F54]/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 overflow-hidden flex flex-col h-full"
                >
                  <div className="relative h-56 bg-[#F8FAFC] p-8 flex items-center justify-center overflow-hidden shrink-0 border-b border-gray-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={o.name}
                      className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out"
                      src={o.image}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-[#F04F54] shadow-sm border border-gray-100/50">
                        {o.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-[#0F172A] mb-auto group-hover:text-[#F04F54] transition-colors leading-tight">{o.name}</h3>
                    <div className="mt-6 flex items-center text-[13px] font-bold text-[#64748B] group-hover:text-[#F04F54] transition-colors uppercase tracking-wider">
                      View Specs
                      <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-12 text-center sm:hidden">
              <Link href="/products" className="inline-flex text-sm font-bold text-[#F04F54] hover:text-[#D43D42] transition-colors items-center gap-2">
                View All Products
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
