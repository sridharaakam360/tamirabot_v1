import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import { HOME_PRODUCTS } from "@/lib/products";
import { asset } from "@/lib/asset";

const HERO_STATS = [
  { value: "500+", label: "Connectors Shipped" },
  { value: "50+", label: "B2B Partners" },
  { value: "99.9%", label: "Quality Rate" },
  { value: "IEC", label: "62196 Certified" },
];

const APPROACH = [
  {
    title: "Our Startup Journey: A Proud Participant",
    body: "Recognized under the esteemed Start-up India initiative, we stand proud as contributors to entrepreneurship, job creation, and economic growth in our nation. Aligned with the Make in India policy, we prioritize domestic manufacturing, adding strength to the vision of a self-reliant and globally competitive Indian manufacturing sector.",
  },
  {
    title: "Expert Engineering for Superior Connectors: IEC62196 Compliant",
    body: "At Tamirabot, our team of industry experts, armed with advanced engineering capabilities, passionately crafts superior electric vehicle connectors. Engineered to meet and surpass international standards, such as IEC62196, our connectors guarantee seamless compatibility, reliable performance, and optimal safety.",
  },
  {
    title: "Rigorous Testing and Innovation: A Commitment to Excellence",
    body: "Focused on performance, reliability, and safety, our connectors undergo stringent testing and quality assurance processes. Leveraging cutting-edge technologies and proudly manufactured in India, these connectors ensure not just optimal charging experiences but also exhibit long-lasting durability.",
  },
  {
    title: "Customer-Centric Approach: Tailored Solutions for Every Need",
    body: "Understanding the unique requirements of electric vehicle manufacturers, charging station providers, and end-users is our forte. Our customer-centric approach propels us to deliver personalized support, exceptional service, and tailor-made solutions that adapt to the evolving demands of the electric vehicle ecosystem.",
  },
  {
    title: "More Than Connectors: Catalysts of Change",
    body: "Tamirabot transcends the role of a mere connector manufacturer. We are dynamic catalysts, propelling the widespread adoption of electric vehicles and hastening the transition towards a sustainable transportation future. Join us on this electrifying journey as we collectively shape the future of sustainable mobility right here in India.",
  },
  {
    title: "The Power of Innovation: Supported by Start-up India and Make in India",
    body: "Experience the dynamism of innovation with Tamirabot. Together, let's steer towards a greener and brighter future, supported by the pillars of Start-up India and Make in India.",
  },
];

const PROCESS = [
  { step: "01", title: "Consultation", body: "Understand your charging infrastructure requirements and specifications." },
  { step: "02", title: "Engineering", body: "Custom design and prototyping with precision CNC manufacturing." },
  { step: "03", title: "Testing", body: "Rigorous IEC compliance testing, thermal analysis, and cycle testing." },
  { step: "04", title: "Delivery", body: "Production, quality inspection, and on-time delivery to your facility." },
];

const CERTS = ["IEC 62196", "ISO 9001", "Startup India", "MSME", "IIT Madras", "BIS"];

const TESTIMONIALS = [
  { quote: "Tamirabot connectors have exceeded our expectations in quality and durability. Their engineering precision is genuinely unmatched in the Indian market.", initial: "R", name: "Rajesh Kumar", role: "CTO, EV Solutions Ltd" },
  { quote: "Reliable, certified, and built to last. Tamirabot is our go-to partner for all EV charging infrastructure projects across India.", initial: "P", name: "Priya Sharma", role: "Director, GreenCharge India" },
  { quote: "The quality of their CCS2 connectors is on par with European manufacturers. Exceptional value and outstanding technical support.", initial: "A", name: "Arun Mehta", role: "VP Engineering, ChargeGrid" },
];

const ArrowRight = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const ChevronRight = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="relative pt-[120px] pb-20 md:pt-[150px] md:pb-28 overflow-hidden bg-[#24125F]">
        <div className="pointer-events-none absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full opacity-10 bg-[#F04F54]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div data-reveal="left">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] mb-6 px-4 py-2 rounded-full border border-white/20 bg-white/5 text-white/80">
                <span className="w-2 h-2 rounded-full bg-[#F04F54] animate-pulse shrink-0" />
                India&apos;s Leading EV Connector Manufacturer
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] mb-6">
                Crafting EV Connectors with{" "}
                <span className="inline-block text-[#F04F54]">Precision</span>
              </h1>
              <p className="text-base md:text-lg text-white/55 leading-relaxed mb-8 max-w-[480px]">
                IEC 62196 certified. ISO 9001 quality. Engineered at IIT Madras Research Park for the world&apos;s EV infrastructure.
              </p>
              <div className="flex flex-wrap gap-3 mb-12">
                <Link className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-white bg-[#F04F54] hover:bg-[#d9434a] active:scale-95 transition-all shadow-lg shadow-[#F04F54]/25" href="/products">
                  Explore Products
                  <ArrowRight />
                </Link>
                <Link className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-white border-2 border-white/25 hover:bg-white/10 active:scale-95 transition-all" href="/contact">
                  Get a Quote
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/10">
                {HERO_STATS.map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-bold text-white">{s.value}</p>
                    <p className="text-[11px] text-white/40 mt-1 uppercase tracking-wider">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative hidden lg:block" data-reveal="right">
              <HeroSlider />
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 hidden md:flex" aria-hidden="true">
          <span className="text-[10px] text-white/40 uppercase tracking-widest">Scroll</span>
          <div className="w-5 h-8 rounded-full border-2 border-white/20 flex justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-white/50" />
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-16 md:py-20 px-6 bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start" data-reveal>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F04F54]">Why Tamirabot</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-3 text-[#24125F] leading-tight">What Sets Us Apart</h2>
              <p className="text-sm leading-relaxed text-[#7D7D8C] mt-4">
                Every connector we ship carries the weight of precision engineering, rigorous testing, and a relentless pursuit of quality.
              </p>
              <div className="hidden lg:block mt-8 w-12 h-1 rounded-full bg-[#F04F54]" />
            </div>
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E5E7EB] flex items-start gap-5" data-reveal>
                <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-[#24125F]/5 text-[#24125F]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84 51.39 51.39 0 0 0-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#24125F] mb-1.5">IIT Madras Incubated</h3>
                  <p className="text-sm leading-relaxed text-[#7D7D8C]">Born from world-class research infrastructure with access to cutting-edge labs and mentorship.</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E5E7EB] flex items-start gap-5" data-reveal>
                <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-[#F04F54]/5 text-[#F04F54]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#24125F] mb-1.5">Zero-Defect Manufacturing</h3>
                  <p className="text-sm leading-relaxed text-[#7D7D8C]">100% quality inspection on every unit. ISO 9001 certified processes with full traceability.</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E5E7EB] flex items-start gap-5" data-reveal>
                <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-[#24125F]/5 text-[#24125F]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A9 9 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#24125F] mb-1.5">Global Standards</h3>
                  <p className="text-sm leading-relaxed text-[#7D7D8C]">IEC 62196, IP67, BIS compliant. Every connector meets or exceeds international benchmarks.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#24125F] rounded-2xl p-6 md:p-8" data-reveal>
                  <div className="flex items-center gap-3 mb-3 text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                    </svg>
                    <p className="text-2xl font-bold">350 kW</p>
                  </div>
                  <h3 className="text-sm font-semibold text-white/90 mb-1">Peak Power</h3>
                  <p className="text-xs leading-relaxed text-white/50">Ultra-fast charging with advanced thermal management and liquid cooling.</p>
                </div>
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E5E7EB]" data-reveal>
                  <div className="flex items-center gap-3 mb-3 text-[#24125F]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.992 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                    <p className="text-2xl font-bold">10,000+</p>
                  </div>
                  <h3 className="text-sm font-semibold text-[#24125F] mb-1">Mating Cycles</h3>
                  <p className="text-xs leading-relaxed text-[#7D7D8C]">Tested beyond industry requirements. Built to last decades of daily use.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beyond Connectors */}
      <section className="py-16 md:py-20 px-6 bg-[#24125F] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, rgb(255, 255, 255) 1.5px, transparent 1.5px)", backgroundSize: "48px 48px" }} />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 md:mb-20" data-reveal>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">Beyond Connectors, Tamirabot Connect EVs</h2>
            <p className="text-base md:text-lg text-white/70 max-w-4xl mx-auto leading-relaxed">
              We are rewriting the way electric vehicle chargers are made. Our unwavering commitment to innovation, quality, and sustainability propels us towards a future where electric mobility becomes the standard, contributing to a cleaner and greener world.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {APPROACH.map((item, i) => (
              <div key={item.title} className="bg-[#F04F54] rounded-2xl p-8 hover:-translate-y-2 transition-transform duration-300 shadow-xl" data-reveal style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
                <span className="text-white/70 font-bold text-lg block mb-3">{i + 1}.</span>
                <h3 className="text-xl font-bold text-white mb-4 leading-tight">{item.title}</h3>
                <p className="text-white/90 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* From Concept to Connector */}
      <section className="py-16 md:py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16" data-reveal>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F04F54]">Our Process</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 text-[#24125F]">From Concept to Connector</h2>
            <p className="mt-4 max-w-lg mx-auto text-[#7D7D8C]">A streamlined 4-step process that delivers world-class EV connectors on time, every time.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-4">
            {PROCESS.map((p, i) => (
              <div key={p.step} className="relative flex flex-col items-center text-center px-2" data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
                {i < PROCESS.length - 1 && (
                  <div className="hidden md:block absolute h-[2px] bg-[#E5E7EB] top-7 left-[calc(50%+30px)] right-[calc(-50%+30px)]" aria-hidden="true" />
                )}
                <div className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md shrink-0 ${i === PROCESS.length - 1 ? "bg-[#F04F54]" : "bg-[#24125F]"}`}>
                  {p.step}
                </div>
                <h4 className="font-bold mt-5 mb-2 text-[#24125F]">{p.title}</h4>
                <p className="text-sm leading-relaxed text-[#7D7D8C] max-w-[200px]">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted & Certified */}
      <section className="py-14 md:py-16 px-6 bg-[#24125F]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-white">Trusted &amp; Certified</h3>
              <p className="text-sm text-white/50 mt-1">Meeting global standards at every level</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {CERTS.map((c) => (
                <div key={c} className="px-4 py-2 rounded-full border border-white/20 bg-white/5">
                  <span className="text-sm font-semibold text-white/80 whitespace-nowrap">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Range */}
      <section className="py-16 md:py-20 px-6 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 md:mb-16" data-reveal>
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F04F54] mb-4 block">Product Range</span>
              <h2 className="text-4xl md:text-5xl font-extrabold leading-[1.15] text-[#0F172A] tracking-tight max-w-lg">Engineering the Future of Charging</h2>
            </div>
            <Link className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-[#0F172A] bg-white border border-gray-200 hover:border-[#F04F54] hover:text-[#F04F54] shadow-sm hover:shadow-md transition-all shrink-0" href="/products">
              View Full Catalog
              <ArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOME_PRODUCTS.map((product, i) => (
              <article key={product.slug} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col" data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="relative h-48 bg-gray-50 overflow-hidden shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={product.image} />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#F04F54]">{product.category}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-white bg-[#24125F]">{product.badge}</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#24125F] mb-4 leading-snug">{product.name}</h3>
                  <Link className="mt-auto w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-xs border-2 border-[#24125F] text-[#24125F] hover:bg-[#24125F] hover:text-white transition-all duration-200" href={`/product/${product.slug}`}>
                    View Details
                    <ChevronRight />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20 px-6 bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-14" data-reveal>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F04F54]">Client Voices</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 text-[#24125F]">Trusted by Industry Leaders</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <blockquote key={t.name} className="bg-white rounded-2xl p-7 border border-[#E5E7EB] relative overflow-hidden flex flex-col" data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
                <span className="absolute top-4 right-6 text-6xl font-serif text-[#24125F] opacity-5 select-none" aria-hidden="true">&ldquo;</span>
                <p className="text-sm leading-relaxed text-[#7D7D8C] mb-6 flex-1 relative z-10">{t.quote}</p>
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm bg-[#24125F]">{t.initial}</div>
                  <div>
                    <p className="font-bold text-sm text-[#24125F]">{t.name}</p>
                    <p className="text-xs text-[#7D7D8C]">{t.role}</p>
                  </div>
                </div>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-[#24125F]" data-reveal>
            <div className="absolute inset-0 opacity-10" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="w-full h-full object-cover" src={asset("/images/type6-connector.svg")} />
            </div>
            <div className="pointer-events-none absolute -top-32 -right-32 w-72 md:w-96 h-72 md:h-96 rounded-full bg-[#F04F54] opacity-15" aria-hidden="true" />
            <div className="relative z-10 px-8 py-16 md:px-16 lg:px-20 md:py-20 lg:py-24 flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="max-w-lg text-center lg:text-left">
                <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#F04F54] mb-4">Ready to Start?</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">Let&apos;s Power India&apos;s EV Revolution Together</h2>
                <p className="text-white/50 leading-relaxed">Whether you need 10 connectors or 10,000 — our engineering team is ready to deliver world-class quality on your timeline.</p>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full sm:w-auto">
                <Link className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-sm text-white bg-[#F04F54] hover:bg-[#d9434a] active:scale-95 transition-all shadow-lg" href="/contact">
                  Get a Quote Today
                  <ArrowRight />
                </Link>
                <Link className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-sm text-white border border-white/20 hover:bg-white/10 active:scale-95 transition-all" href="/about">
                  Learn About Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
