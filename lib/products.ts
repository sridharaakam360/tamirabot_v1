// Single source of truth for the Tamirabot product catalogue.
// Recovered verbatim from the original compiled SPA (rendered DOM extraction).

import { asset } from "./asset";

export type Pair = [label: string, value: string];

export interface SpecTable {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface Accessory {
  name: string;
  detail: string;
}

export interface Product {
  slug: string;
  name: string;
  /** Charging category — used as the card eyebrow and detail image badge. */
  category: string;
  /** Small pill shown on cards, e.g. "100A DC" / "OEM Ready". */
  badge: string;
  image: string;
  /** Three spec rows shown on the catalogue cards. */
  cardSpecs: Pair[];
  description: string;
  /** Six spec rows shown on the detail page. */
  detailSpecs: Pair[];
  features: string[];
  accessories: Accessory[];
  tables: SpecTable[];
}

const RAW_PRODUCTS: Product[] = [
  {
    slug: "type6-connector",
    name: "TYPE 6 — Vehicle Connector",
    category: "DC Fast Charging",
    badge: "100A DC",
    image: "/images/type6-connector.svg",
    cardSpecs: [
      ["CHARGING TYPE", "DC Fast Charging"],
      ["RATED CURRENT", "Up to 100A"],
      ["VOLTAGE RANGE", "120V DC"],
    ],
    description:
      "Designed for DC fast charging of electric and hybrid vehicles, complying with IEC 62196-6 and IS17017-2-6. It supports up to 120V DC and 100A rated current.",
    detailSpecs: [
      ["CHARGING TYPE", "DC Fast Charging"],
      ["RATED CURRENT", "Up to 100A"],
      ["VOLTAGE RANGE", "120V DC"],
      ["COOLING", "Natural Air Flow"],
      ["STANDARD", "IEC 62196-6"],
      ["WARRANTY", "48 Months"],
    ],
    features: [
      "Uniform, space-saving dimensions for easy installation",
      "Developed per IATF 16949 automotive standard and ISO 9001",
      "Protected against dirt and water (IP55)",
      "Supports up to 100A for faster charging",
      "Copper alloy contact pins with uniform thermal distribution",
      "Compliant with IS17017-2-6 and IEC 62196-6",
      "Ergonomic, comfortable grip",
      "Patent technology for higher charging efficiency",
    ],
    accessories: [
      {
        name: "Protective Cover",
        detail: "GTIN: 91042507 | Weight: 90g (with packing), 40g (without) | Origin: India",
      },
      {
        name: "Docker (Charging Gun Holder)",
        detail: "GTIN: 91042510 | Weight: 100g (with packing), 70g (without) | Origin: India",
      },
    ],
    tables: [
      {
        title: "Product Specifications",
        headers: ["Model Number", "Rated Current (DC)", "Cable Specification"],
        rows: [
          ["T91-T6VC1-25ADC", "25A", "2×4mm²+5×0.75mm²"],
          ["T91-T6VC2-60ADC", "60A", "2×12.5mm²+5×0.75mm²"],
          ["T91-T6VC3-100ADC", "100A", "2×25mm²+5×0.75mm²"],
        ],
      },
      {
        title: "Electrical Properties",
        headers: [],
        rows: [
          ["Charging Voltage", "120V DC"],
          ["Charging Current", "25A / 60A / 100A DC"],
          ["Charging Power", "7.2KW – 12KW max (Boost Mode)"],
          ["Insulation Resistance", ">500MΩ"],
          ["Contact Resistance", "0.5mΩ max"],
          ["Flammability Rating", "UL94V0"],
          ["Signal Transmission", "PWM + Powerline Communication (ISO/IEC 15118 / DIN SPEC 70121)"],
        ],
      },
      {
        title: "Mechanical Properties",
        headers: [],
        rows: [
          ["Dimensions (W×H×D)", "58.22mm × 110.71mm × 256.66mm"],
          ["Insertion/Withdrawal Cycles", ">12,500"],
          ["Insertion/Withdrawal Force", "<100N"],
          ["IP Rating", "IP55"],
          ["Operating Temperature", "-30°C to +50°C"],
          ["Storage Temperature", "-40°C to +80°C"],
          ["Altitude", "Up to 4000m"],
        ],
      },
      {
        title: "Commercial Data",
        headers: [],
        rows: [
          ["GTIN", "91042502"],
          ["Packing Unit", "1 Unit"],
          ["Minimum Order Quantity", "1 Unit"],
          ["Sales Key", "INVC"],
          ["Product Key", "INVC0402"],
          ["Weight (with packing)", "450 g"],
          ["Weight (without packing)", "360 g"],
          ["Customs Tariff Number", "853690"],
          ["Warranty", "48 Months"],
          ["Country of Origin", "India"],
        ],
      },
    ],
  },
  {
    slug: "type6-inlet",
    name: "TYPE 6 — Vehicle Inlet",
    category: "DC Fast Charging",
    badge: "OEM Ready",
    image: "/images/type2-gun-ccs2.svg",
    cardSpecs: [
      ["CHARGING TYPE", "DC Fast Charging"],
      ["RATED CURRENT", "Up to 100A"],
      ["VOLTAGE RANGE", "120V DC"],
    ],
    description:
      "The Type 6 Vehicle Inlet enables DC fast charging compliant with IEC 62196-6 and IS17017-2-6. Rated up to 120V DC and 100A with natural air flow cooling.",
    detailSpecs: [
      ["CHARGING TYPE", "DC Fast Charging"],
      ["RATED CURRENT", "Up to 100A"],
      ["VOLTAGE RANGE", "120V DC"],
      ["COOLING", "Natural Air Flow"],
      ["STANDARD", "IEC 62196-6"],
      ["WARRANTY", "48 Months"],
    ],
    features: [
      "Space-saving dimensions; IATF 16949 and ISO 9001 compliant",
      "IP54 protection (IP64 with protective cover)",
      "Supports up to 100A",
      "Copper alloy contact pins for uniform thermal distribution",
      "Seamless integration into EV charging systems",
      "Patent technology for higher charging efficiency",
    ],
    accessories: [
      {
        name: "Protective Cover",
        detail: "GTIN: 91042506 | Weight: 60g (with packing), 30g (without) | Origin: India",
      },
    ],
    tables: [
      {
        title: "Product Specifications",
        headers: ["Model Number", "Rated Current (DC)", "Cable Specification"],
        rows: [
          ["T91-T6VI1-60ADC", "60A", "2×12.5mm²+5×0.75mm²"],
          ["T91-T6VI2-100ADC", "100A", "2×25mm²+5×0.75mm²"],
        ],
      },
      {
        title: "Electrical Properties",
        headers: [],
        rows: [
          ["Charging Voltage", "120V DC"],
          ["Charging Current", "60A / 100A DC"],
          ["Charging Power", "7.2KW (60A) / 12KW (100A) Boost Mode"],
          ["Insulation Resistance", ">500MΩ"],
          ["Contact Resistance", "0.5mΩ max"],
          ["Flammability Rating", "UL94V0"],
        ],
      },
      {
        title: "Mechanical Properties",
        headers: [],
        rows: [
          ["Dimensions (W×H×D)", "70mm × 70mm × 62.60mm"],
          ["Bore", "6mm"],
          ["Insertion/Withdrawal Cycles", ">12,500"],
          ["IP Rating", "IP54 (IP64 with cover)"],
          ["Operating Temperature", "-30°C to +50°C"],
          ["Mounting", "Front and rear, 0–90° inclination"],
          ["Fixing Screws", "M6"],
        ],
      },
      {
        title: "Commercial Data",
        headers: [],
        rows: [
          ["GTIN", "91042501"],
          ["Packing Unit", "1 Unit"],
          ["Minimum Order Quantity", "1 Unit"],
          ["Sales Key", "INVI"],
          ["Product Key", "INVI0401"],
          ["Weight (with packing)", "180 g"],
          ["Weight (without packing)", "140 g"],
          ["Customs Tariff Number", "853690"],
          ["Warranty", "48 Months"],
          ["Country of Origin", "India"],
        ],
      },
    ],
  },
  {
    slug: "ccs2-connector",
    name: "CCS2 — Vehicle Connector",
    category: "DC Ultra-Fast Charging",
    badge: "250A DC",
    image: "/images/ccs2-connector.svg",
    cardSpecs: [
      ["CHARGING TYPE", "DC Ultra-Fast Charging"],
      ["RATED CURRENT", "Up to 250A"],
      ["VOLTAGE RANGE", "1000V DC"],
    ],
    description:
      "Designed for DC ultra-fast charging per IEC 62196-3. Supports up to 1000V DC and 250A rated current with natural air flow cooling.",
    detailSpecs: [
      ["CHARGING TYPE", "DC Ultra-Fast Charging"],
      ["RATED CURRENT", "Up to 250A"],
      ["VOLTAGE RANGE", "1000V DC"],
      ["COOLING", "Natural Air Flow"],
      ["STANDARD", "IEC 62196-3"],
      ["WARRANTY", "48 Months"],
    ],
    features: [
      "IATF 16949 and ISO 9001 compliant",
      "IP55 protection",
      "Supports up to 250A for ultra-fast charging",
      "Copper alloy contact pins for optimal conductivity",
      "Ergonomic grip design",
      "Patent technology for higher charging efficiency",
    ],
    accessories: [],
    tables: [
      {
        title: "Product Specifications",
        headers: ["Model Number", "Rated Current (DC)", "Cable Specification"],
        rows: [
          ["T91-CCS2VC1-80ADC", "80A", "2×16mm²+1×16mm²+2×0.75mm²+2(2×0.75mm²)"],
          ["T91-CCS2VC2-125ADC", "125A", "2×35mm²+1×25mm²+5×0.75mm²+1×0.75mm²"],
          ["T91-CCS2VC3-150ADC", "150A", "2×50mm²+1×25mm²+5×0.75mm²+1×0.75mm²"],
          ["T91-CCS2VC4-200ADC", "200A", "2×70mm²+1×35mm²+5×0.75mm²+1×0.75mm²"],
          ["T91-CCS2VC5-250ADC", "250A", "2×70mm²+1×35mm²+5×0.75mm²+1×0.75mm²"],
        ],
      },
      {
        title: "Electrical Properties",
        headers: [],
        rows: [
          ["Charging Voltage", "1000V DC"],
          ["Charging Current", "80A / 125A / 150A / 200A / 250A DC"],
          ["Charging Power", "Up to 12KW max (Boost Mode)"],
          ["Insulation Resistance", ">500MΩ"],
          ["Contact Resistance", "0.5mΩ max"],
          ["Flammability Rating", "UL94V0"],
          ["Temperature Sensor", "PT 1000 (DIN EN 60751)"],
        ],
      },
      {
        title: "Mechanical Properties",
        headers: [],
        rows: [
          ["Dimensions (W×H×D)", "63mm × 145.96mm × 246mm"],
          ["Insertion/Withdrawal Cycles", ">12,500"],
          ["IP Rating", "IP55"],
          ["Operating Temperature", "-30°C to +50°C"],
          ["Altitude", "Up to 4000m"],
        ],
      },
      {
        title: "Commercial Data",
        headers: [],
        rows: [
          ["GTIN", "91042504"],
          ["Packing Unit", "1 Unit"],
          ["Minimum Order Quantity", "1 Unit"],
          ["Sales Key", "INVC"],
          ["Product Key", "INVC0404"],
          ["Weight (with packing)", "800 g"],
          ["Weight (without packing)", "740 g"],
          ["Customs Tariff Number", "853690"],
          ["Warranty", "48 Months"],
          ["Country of Origin", "India"],
        ],
      },
    ],
  },
  {
    slug: "type2-connector",
    name: "TYPE 2 — Vehicle Connector",
    category: "AC Charging",
    badge: "32A AC",
    image: "/images/type2-connector.svg",
    cardSpecs: [
      ["CHARGING TYPE", "AC Charging"],
      ["RATED CURRENT", "Up to 32A"],
      ["VOLTAGE RANGE", "250V AC up to 480V AC"],
    ],
    description:
      "Designed for AC charging per IEC 62196-2. Supports 250V single-phase to 480V three-phase AC and up to 32A rated current.",
    detailSpecs: [
      ["CHARGING TYPE", "AC Charging"],
      ["RATED CURRENT", "Up to 32A"],
      ["VOLTAGE RANGE", "250V AC up to 480V AC"],
      ["COOLING", "Natural Air Flow"],
      ["STANDARD", "IEC 62196-2"],
      ["WARRANTY", "48 Months"],
    ],
    features: [
      "IATF 16949 and ISO 9001 compliant",
      "IP55 protection",
      "Weather-resistant thermoplastic outer casing",
      "High-conductivity copper alloy conductors",
      "Ergonomic grip design",
      "Patent technology for higher charging efficiency",
    ],
    accessories: [
      {
        name: "Protective Cover",
        detail: "GTIN: 91042509 | Weight: 90g (with packing), 60g (without) | Origin: India",
      },
      {
        name: "Docker (Charging Gun Holder)",
        detail: "GTIN: 91042512 | Weight: 130g (with packing), 100g (without) | Origin: India",
      },
    ],
    tables: [
      {
        title: "Product Specifications",
        headers: ["Model Number", "Rated Current (AC)", "Cable Specification"],
        rows: [
          ["T91-T2VC1-16AAC-SP", "16A (Single Phase)", "3×2.5mm²+2×0.75mm²"],
          ["T91-T2VC2-16AAC-TP", "16A (Three Phase)", "5×2.5mm²+2×0.75mm²"],
          ["T91-T2VC3-32AAC-SP", "32A (Single Phase)", "3×6mm²+2×0.75mm²"],
          ["T91-T2VC4-32AAC-TP", "32A (Three Phase)", "5×6mm²+2×0.75mm²"],
        ],
      },
      {
        title: "Electrical Properties",
        headers: [],
        rows: [
          ["Charging Voltage", "250V–480V AC"],
          ["Charging Current", "16A / 32A AC"],
          ["Charging Power", "Up to 3.7kW (16A) / 7.2kW (32A)"],
          ["Insulation Resistance", ">500MΩ"],
          ["Contact Resistance", "0.5mΩ max"],
          ["Flammability Rating", "UL94V0"],
        ],
      },
      {
        title: "Mechanical Properties",
        headers: [],
        rows: [
          ["Dimensions (W×H×D)", "71.3mm × 112.62mm × 204.01mm"],
          ["Insertion/Withdrawal Cycles", ">12,500"],
          ["IP Rating", "IP55"],
          ["Operating Temperature", "-30°C to +50°C"],
          ["Altitude", "Up to 4000m"],
        ],
      },
      {
        title: "Commercial Data",
        headers: [],
        rows: [
          ["GTIN", "91042505"],
          ["Packing Unit", "1 Unit"],
          ["Minimum Order Quantity", "1 Unit"],
          ["Sales Key", "INVC"],
          ["Product Key", "INVC0405"],
          ["Weight (with packing)", "370 g"],
          ["Weight (without packing)", "330 g"],
          ["Customs Tariff Number", "853690"],
          ["Warranty", "48 Months"],
          ["Country of Origin", "India"],
        ],
      },
    ],
  },
  {
    slug: "ccs2-inlet",
    name: "CCS2 — Vehicle Inlet",
    category: "DC Ultra-Fast Charging",
    badge: "OEM Ready",
    image: "/images/type2-gun-ccs2.svg",
    cardSpecs: [
      ["CHARGING TYPE", "DC Fast Charging"],
      ["RATED CURRENT", "Up to 250A DC"],
      ["VOLTAGE RANGE", "1000V DC / 480V AC"],
    ],
    description:
      "The CCS2 Vehicle Inlet supports both AC and DC fast charging per IEC 62196-3. Rated up to 1000V DC / 250A DC and 480V AC / 32A AC.",
    detailSpecs: [
      ["CHARGING TYPE", "DC Fast Charging"],
      ["RATED CURRENT", "Up to 250A DC"],
      ["VOLTAGE RANGE", "1000V DC / 480V AC"],
      ["COOLING", "Natural Air Flow"],
      ["STANDARD", "IEC 62196-3"],
      ["WARRANTY", "48 Months"],
    ],
    features: [
      "IATF 16949 and ISO 9001 compliant",
      "IP54 protection",
      "Supports up to 250A DC enabling ultra-fast charging",
      "Copper alloy contact pins for uniform thermal distribution",
      "Electronic locking actuator (12V) with mechanical emergency release",
      "Patent technology for higher charging efficiency",
    ],
    accessories: [
      {
        name: "Protective Cover",
        detail: "GTIN: 91042508 | Weight: 80g (with packing), 50g (without) | Origin: India",
      },
    ],
    tables: [
      {
        title: "Product Specifications",
        headers: ["Model Number", "Rated DC Current", "Rated AC Current", "Cable Specification"],
        rows: [
          ["T91-CCS2VI1-32AAC80ADC", "80A", "32A", "2×16mm²+1×25mm²+4×6mm²+6×0.75mm²"],
          ["T91-CCS2VI2-32AAC125ADC", "125A", "32A", "2×35mm²+1×25mm²+4×6mm²+6×0.75mm²"],
          ["T91-CCS2VI3-32AAC150ADC", "150A", "32A", "2×50mm²+1×25mm²+4×6mm²+6×0.75mm²"],
          ["T91-CCS2VI4-32AAC200ADC", "200A", "32A", "2×70mm²+1×25mm²+4×6mm²+6×0.75mm²"],
          ["T91-CCS2VI5-32AAC250ADC", "250A", "32A", "2×70mm²+1×25mm²+4×6mm²+6×0.75mm²"],
        ],
      },
      {
        title: "Electrical Properties",
        headers: [],
        rows: [
          ["Charging Voltage", "1000V DC / 480V AC"],
          ["Charging Current DC", "80A / 125A / 150A / 200A / 250A"],
          ["Charging Current AC", "32A"],
          ["Charging Power", "7.2KW – 12KW max (Boost Mode)"],
          ["Insulation Resistance", ">500MΩ"],
          ["Contact Resistance", "0.5mΩ max"],
          ["Flammability Rating", "UL94V0"],
          ["Temperature Sensor", "PT 1000 (DIN EN 60751)"],
        ],
      },
      {
        title: "Mechanical Properties",
        headers: [],
        rows: [
          ["Dimensions (W×H×D)", "98mm × 130mm × 92.5mm"],
          ["Bore", "8.5mm"],
          ["Insertion/Withdrawal Cycles", ">12,500"],
          ["IP Rating", "IP54"],
          ["Operating Temperature", "-30°C to +50°C"],
          ["Mounting", "Front and rear, 0–90° inclination"],
          ["Fixing Screws", "M8"],
        ],
      },
      {
        title: "Commercial Data",
        headers: [],
        rows: [
          ["GTIN", "91042503"],
          ["Packing Unit", "1 Unit"],
          ["Minimum Order Quantity", "1 Unit"],
          ["Sales Key", "INVI"],
          ["Product Key", "INVI0403"],
          ["Weight (with packing)", "620 g"],
          ["Weight (without packing)", "520 g"],
          ["Customs Tariff Number", "853690"],
          ["Warranty", "48 Months"],
          ["Country of Origin", "India"],
        ],
      },
    ],
  },
];

// Prefix every product image with the deploy base path (GitHub Pages subpath).
export const PRODUCTS: Product[] = RAW_PRODUCTS.map((p) => ({
  ...p,
  image: asset(p.image),
}));

export const HOME_PRODUCTS = PRODUCTS.slice(0, 4);

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getOtherProducts(slug: string): Product[] {
  return PRODUCTS.filter((p) => p.slug !== slug);
}
