import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact — Tamirabot",
  description:
    "Ready to discuss your EV charging requirements? Our engineering team is here to help you find the perfect solution.",
};

const CONTACT_ROWS = [
  {
    icon: "📍",
    label: "Office Address",
    value:
      "Tamirabot Advanced Engineering Private Limited, SF No. 70/3, Suriagounder Street, S N Patty, Dasanaickenpatti, Salem, Tamilnadu - 636201, India",
  },
  { icon: "✉️", label: "Email", value: "info@tamirabot.com" },
  { icon: "📞", label: "Phone", value: "+91 81486 82557" },
  { icon: "🕐", label: "Working Hours", value: "Mon – Fri: 9:00 AM – 6:00 PM IST" },
];

export default function ContactPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative pt-[110px] pb-24 md:pt-[140px] md:pb-28 px-6 overflow-hidden bg-[#24125F]">
        <div className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-10 bg-[#F04F54]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div data-reveal>
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] mb-5 text-[#F04F54]">Contact Us</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08] mb-6">
              Let&apos;s Build the
              <br />
              <span className="text-[#F04F54]">Future</span> Together
            </h1>
            <p className="text-white/60 text-lg max-w-xl leading-relaxed">
              Ready to discuss your EV charging requirements? Our engineering team is here to help you find the perfect solution.
            </p>
          </div>
        </div>
      </section>

      {/* Form + info */}
      <section className="py-16 md:py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16">
          <div className="lg:col-span-3" data-reveal>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[#24125F]">Send Us a Message</h2>
            <p className="text-sm mb-8 text-[#7D7D8C]">Fill out the form and our team will respond within 24 hours.</p>
            <ContactForm />
          </div>

          <div className="lg:col-span-2" data-reveal>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-10 flex flex-col">
              <div className="bg-[#24125F] px-6 py-4 flex items-center justify-between shrink-0">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Contact Information</h3>
                <span className="w-2 h-2 rounded-full bg-[#F04F54]" />
              </div>
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left text-[14px]">
                  <tbody>
                    {CONTACT_ROWS.map((row) => (
                      <tr key={row.label} className="border-b border-gray-200 last:border-0 hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-[#24125F] border-r border-gray-200 w-2/5 sm:w-1/3 align-top">
                          <div className="flex items-center gap-2.5">
                            <span className="text-[#F04F54] text-base">{row.icon}</span>
                            <span>{row.label}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600 align-top leading-relaxed">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border h-56 flex items-center justify-center border-[#E5E7EB] bg-[#F7F7F7]">
              <div className="text-center">
                <p className="text-sm font-medium text-[#7D7D8C]">📍 SF No. 70/3, Suriagounder Street</p>
                <p className="text-xs mt-1 text-[#7D7D8C]">S N Patty, Dasanaickenpatti, Salem, Tamilnadu - 636201</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="rounded-2xl p-5 border text-center border-[#E5E7EB] bg-[#F7F7F7]">
                <p className="text-xl font-bold text-[#24125F]">&lt;24h</p>
                <p className="text-[11px] font-medium mt-1 text-[#7D7D8C]">Response Time</p>
              </div>
              <div className="rounded-2xl p-5 border text-center border-[#E5E7EB] bg-[#F7F7F7]">
                <p className="text-xl font-bold text-[#24125F]">100%</p>
                <p className="text-[11px] font-medium mt-1 text-[#7D7D8C]">Client Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
