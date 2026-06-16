import Link from "next/link";

const PAGE_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
];

const PRODUCT_LINKS = [
  { href: "/product/type2-connector", label: "TYPE 2 — Vehicle Connector" },
  { href: "/product/ccs2-connector", label: "CCS2 — Vehicle Connector" },
  { href: "/product/type6-connector", label: "TYPE 6 — Vehicle Connector" },
  { href: "/product/type6-inlet", label: "TYPE 6 — Vehicle Inlet" },
  { href: "/product/ccs2-inlet", label: "CCS2 — Vehicle Inlet" },
];

export default function Footer() {
  return (
    <footer className="bg-[#24125F]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Tamirabot"
              className="h-9 w-auto brightness-0 invert mb-4"
              src="/images/logo.svg"
            />
            <p className="text-sm text-white/50 leading-relaxed">
              Crafting EV connectors that exceed international standards.
              Engineering excellence for a sustainable future.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">
              Pages
            </h4>
            <div className="flex flex-col gap-2.5">
              {PAGE_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">
              Products
            </h4>
            <div className="flex flex-col gap-2.5">
              {PRODUCT_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">
              Contact
            </h4>
            <div className="flex flex-col gap-2.5 text-sm text-white/50">
              <p>SF No. 70/3, Suriagounder Street</p>
              <p>S N Patty, Dasanaickenpatti</p>
              <p>Salem, Tamilnadu - 636201, India</p>
              <p>info@tamirabot.com</p>
              <p>+91 81486 82557</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/10">
          <p className="text-sm text-white/40">
            © 2026 Tamirabot. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/about"
              className="text-sm text-white/40 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/about"
              className="text-sm text-white/40 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
