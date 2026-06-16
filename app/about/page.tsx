import CtaBanner from "@/components/CtaBanner";
import { asset } from "@/lib/asset";

export const metadata = {
  title: "About — Tamirabot",
  description:
    "From a bold vision to a trusted name in EV infrastructure — engineering the future of sustainable mobility from India to the world.",
};

const WHY = [
  { n: "01", title: "R&D Driven Innovation", body: "In-house research lab with IIT Madras collaboration, pushing boundaries of EV connector technology." },
  { n: "02", title: "ISO 9001 Certified Quality", body: "Every product passes through 100% quality inspection with zero-defect manufacturing philosophy." },
  { n: "03", title: "Made in India, Built for the World", body: "Proudly designed and manufactured in Chennai for global markets and international standards." },
  { n: "04", title: "End-to-End Engineering", body: "From concept design to mass production — complete in-house capability with full traceability." },
];

const MILESTONES = [
  { year: "2019", title: "Founded", body: "Tamirabot established with a vision to revolutionize EV charging in India." },
  { year: "2020", title: "IIT Madras Incubation", body: "Selected for incubation at IIT Madras Research Park." },
  { year: "2022", title: "First Product Launch", body: "Launched Type 2 AC connectors meeting IEC 62196 standards." },
  { year: "2024", title: "Scale & Growth", body: "Expanded to 50+ enterprise clients with pan-India operations." },
];

const STATS = [
  { value: "500+", label: "Products Delivered" },
  { value: "50+", label: "Enterprise Clients" },
  { value: "99.9%", label: "Quality Assurance" },
  { value: "6+", label: "Certifications" },
];

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative pt-[110px] pb-24 md:pt-[140px] md:pb-28 px-6 overflow-hidden bg-[#24125F]">
        <div className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-10 bg-[#F04F54]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div data-reveal>
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] mb-5 text-[#F04F54]">About Tamirabot</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08] mb-6">
              Pioneering EV Charging
              <br />
              <span className="text-[#F04F54]">Innovation</span> Since Day One
            </h1>
            <p className="text-white/60 text-lg max-w-xl leading-relaxed">
              From a bold vision to a trusted name in EV infrastructure — engineering the future of sustainable mobility from India to the world.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div data-reveal>
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] mb-4 text-[#F04F54]">Our Story</span>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6 text-[#24125F]">
              Born from the Belief that India Deserves World-Class EV Infrastructure
            </h2>
            <p className="text-base leading-relaxed mb-5 text-[#7D7D8C]">
              Tamirabot was founded with a singular mission — to prove that precision EV charging components don&apos;t need to be imported. They can be engineered right here, with global standards baked into every micron.
            </p>
            <p className="text-base leading-relaxed mb-8 text-[#7D7D8C]">
              Today, our connectors power charging stations across the country, trusted by enterprises, OEMs, and government projects for unmatched reliability, safety, and performance.
            </p>
            <div className="flex items-center gap-6">
              <div className="pr-6 border-r border-[#E5E7EB]">
                <p className="text-xl font-bold text-[#24125F]">2019</p>
                <p className="text-xs font-medium mt-0.5 text-[#7D7D8C]">Founded</p>
              </div>
              <div className="pr-6 border-r border-[#E5E7EB]">
                <p className="text-xl font-bold text-[#24125F]">IIT-M</p>
                <p className="text-xs font-medium mt-0.5 text-[#7D7D8C]">Incubated</p>
              </div>
              <div>
                <p className="text-xl font-bold text-[#24125F]">Pan India</p>
                <p className="text-xs font-medium mt-0.5 text-[#7D7D8C]">Operations</p>
              </div>
            </div>
          </div>
          <div className="relative" data-reveal>
            <div className="rounded-3xl overflow-hidden shadow-lg border border-[#E5E7EB]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Tamirabot EV Connectors" className="w-full h-[420px] object-cover" src={asset("/images/type2-gun-ccs2.svg")} />
            </div>
            <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl px-5 py-4 shadow-lg border border-[#E5E7EB]">
              <p className="text-2xl font-bold text-[#24125F]">5+</p>
              <p className="text-[11px] font-medium text-[#7D7D8C]">Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 md:py-20 px-6 bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" data-reveal>
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] mb-4 text-[#F04F54]">What Drives Us</span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#24125F]">Vision &amp; Mission</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-10 border border-[#E5E7EB] shadow-sm" data-reveal>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-[#24125F]/8">
                <svg className="w-7 h-7 text-[#24125F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#24125F]">Our Vision</h3>
              <p className="text-base leading-relaxed text-[#7D7D8C]">
                To become India&apos;s most trusted manufacturer of EV charging components — setting global benchmarks in quality, innovation, and sustainability while powering the nation&apos;s electric future.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-10 border border-[#E5E7EB] shadow-sm" data-reveal>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-[#F04F54]/8">
                <svg className="w-7 h-7 text-[#F04F54]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#24125F]">Our Mission</h3>
              <p className="text-base leading-relaxed text-[#7D7D8C]">
                To engineer and deliver precision EV connectors that exceed international safety and performance standards — making reliable, high-quality charging infrastructure accessible to every corner of India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Tamirabot */}
      <section className="py-16 md:py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative" data-reveal>
              <div className="rounded-3xl overflow-hidden shadow-lg border border-[#E5E7EB]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="Tamirabot Engineering" className="w-full h-[400px] object-cover" src={asset("/images/type6-connector.svg")} />
              </div>
            </div>
            <div data-reveal>
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] mb-4 text-[#F04F54]">Why Tamirabot</span>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-8 text-[#24125F]">Engineering Excellence at Every Level</h2>
              <div className="space-y-6">
                {WHY.map((item) => (
                  <div key={item.n} className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-0.5 bg-[#F04F54]/8">
                      <span className="text-sm font-bold text-[#F04F54]">{item.n}</span>
                    </div>
                    <div>
                      <h4 className="font-bold mb-1 text-[#24125F]">{item.title}</h4>
                      <p className="text-sm leading-relaxed text-[#7D7D8C]">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 md:py-20 px-6 bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" data-reveal>
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] mb-4 text-[#F04F54]">Our Journey</span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#24125F]">Milestones That Define Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MILESTONES.map((m, i) => (
              <div key={m.year} className="bg-white rounded-2xl p-7 border border-[#E5E7EB] shadow-sm relative overflow-hidden" data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
                <div className={`absolute top-0 left-0 w-full h-1 rounded-t-2xl ${i === MILESTONES.length - 1 ? "bg-[#F04F54] opacity-100" : "bg-[#24125F] opacity-15"}`} />
                <p className="text-3xl font-bold mb-2 text-[#24125F]">{m.year}</p>
                <h4 className="font-bold text-sm mb-2 text-[#24125F]">{m.title}</h4>
                <p className="text-sm leading-relaxed text-[#7D7D8C]">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="py-16 px-6 bg-[#24125F]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <div key={s.label} className="text-center" data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
              <p className="text-3xl md:text-4xl font-bold text-white mb-1">{s.value}</p>
              <p className="text-xs text-white/50 uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBanner
        eyebrow="Let's Collaborate"
        title="Ready to Partner With Us?"
        body="Join the growing network of enterprises trusting Tamirabot for world-class EV charging infrastructure."
        primary={{ href: "/contact", label: "Get in Touch" }}
        secondary={{ href: "/products", label: "View Products" }}
      />
    </main>
  );
}
