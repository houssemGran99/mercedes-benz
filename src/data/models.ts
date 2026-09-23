export type Category =
  | "Sedan"
  | "Coupé & Cabriolet"
  | "Roadster"
  | "SUV & Off-road"
  | "Sports & Supercar"
  | "Electric"
  | "Racing"
  | "Commercial"
  | "Concept";

export type CarModel = {
  slug: string;
  name: string;
  /** Internal chassis code, when there is one. */
  code?: string;
  /** Class letter(s) buyers actually order, e.g. "S", "CLA", "GLC" — only set for models sold under that naming scheme. */
  classCode?: string;
  start: number;
  /** `null` = still in production. */
  end: number | null;
  category: Category;
  /** English Wikipedia article title, used by the image scraper. */
  wiki: string;
  summary: string;
};

export const ERAS = [
  { id: "post-war", name: "Post-War Revival", from: 1946, to: 1969 },
  { id: "engineering", name: "Engineered Like No Other", from: 1970, to: 1989 },
  { id: "expansion", name: "The Great Expansion", from: 1990, to: 2009 },
  { id: "modern", name: "Modern & Electric", from: 2010, to: 9999 },
] as const;

export type EraId = (typeof ERAS)[number]["id"];

export function eraOf(model: CarModel) {
  return ERAS.find((e) => model.start >= e.from && model.start <= e.to)!;
}

export function yearsLabel(model: Pick<CarModel, "start" | "end">) {
  if (model.end === null) return `${model.start}–present`;
  if (model.end === model.start) return `${model.start}`;
  return `${model.start}–${model.end}`;
}

const raw: Omit<CarModel, "slug">[] = [
  // ── Post-War Revival ──────────────────────────────────────────
  {
    name: "Unimog",
    start: 1948,
    end: null,
    category: "Commercial",
    wiki: "Unimog",
    summary:
      "The 'Universal-Motor-Gerät' began as an agricultural machine and became a legendary go-anywhere truck. It is still in production today.",
  },

  // ── Engineered Like No Other ──────────────────────────────────
  {
    name: "Mercedes-Benz G-Class",
    code: "W460 / W463",
    start: 1979,
    classCode: "G",
    end: null,
    category: "SUV & Off-road",
    wiki: "Mercedes-Benz G-Class",
    summary:
      "Designed as a military vehicle, the boxy 'G-Wagen' became a luxury icon. It is one of the longest-produced vehicles in automotive history and now also comes as the all-electric G 580.",
  },

  // ── The Great Expansion ───────────────────────────────────────
  {
    name: "Mercedes-Benz S-Class",
    code: "W140",
    start: 1991,
    classCode: "S",
    end: 1998,
    category: "Sedan",
    wiki: "Mercedes-Benz S-Class (W140)",
    summary:
      "A massive, over-engineered flagship with double glazing, soft-close doors and the first V12 in a Mercedes production car.",
  },
  {
    name: "Mercedes-Benz C-Class",
    code: "W202",
    start: 1993,
    classCode: "C",
    end: 2000,
    category: "Sedan",
    wiki: "Mercedes-Benz C-Class (W202)",
    summary:
      "The first generation of the C-Class, which replaced the 190. The C 36 AMG was the first car developed jointly by Mercedes and AMG.",
  },
  {
    name: "Mercedes-Benz Sprinter",
    start: 1995,
    end: null,
    category: "Commercial",
    wiki: "Mercedes-Benz Sprinter",
    summary:
      "The van that changed the market. Sprinters are used as delivery vans, ambulances and campervans all over the world.",
  },
  {
    name: "Mercedes-Benz E-Class",
    code: "W210",
    start: 1995,
    classCode: "E",
    end: 2002,
    category: "Sedan",
    wiki: "Mercedes-Benz E-Class (W210)",
    summary:
      "Its distinctive twin oval headlights started a new design language for the brand.",
  },
  {
    name: "Mercedes-Benz SLK",
    code: "R170",
    start: 1996,
    classCode: "SLK",
    end: 2004,
    category: "Roadster",
    wiki: "Mercedes-Benz SLK-Class (R170)",
    summary:
      "Popularised the retractable folding hardtop ('Vario-Roof'), which turns a coupé into a roadster in about 25 seconds.",
  },
  {
    name: "Mercedes-Benz A-Class",
    code: "W168",
    start: 1997,
    classCode: "A",
    end: 2004,
    category: "Sedan",
    wiki: "Mercedes-Benz A-Class (W168)",
    summary:
      "A radical compact with a 'sandwich' floor. Failing the famous 'elk test' led Mercedes to make ESP standard across its entire range.",
  },
  {
    name: "Mercedes-Benz M-Class",
    code: "W163",
    start: 1997,
    classCode: "M",
    end: 2005,
    category: "SUV & Off-road",
    wiki: "Mercedes-Benz M-Class (W163)",
    summary:
      "Built in Alabama, this was the first Mercedes luxury SUV and the forerunner of today's GLE.",
  },
  {
    name: "Mercedes-Benz CLK",
    code: "C208",
    start: 1997,
    classCode: "CLK",
    end: 2002,
    category: "Coupé & Cabriolet",
    wiki: "Mercedes-Benz CLK-Class",
    summary:
      "A stylish mid-size coupé and cabriolet based on the C-Class, with E-Class styling.",
  },
  {
    name: "Mercedes-Benz CLK GTR",
    start: 1997,
    end: 1999,
    category: "Sports & Supercar",
    wiki: "Mercedes-Benz CLK GTR",
    summary:
      "A GT1 race car with a small number of road-legal versions. It dominated the 1997 FIA GT Championship and was the most expensive production car of its time.",
  },
  {
    name: "Mercedes-Benz S-Class",
    code: "W220",
    start: 1998,
    classCode: "S",
    end: 2005,
    category: "Sedan",
    wiki: "Mercedes-Benz S-Class (W220)",
    summary:
      "Lighter and sleeker than the W140. It introduced Airmatic suspension, Distronic adaptive cruise control and the COMAND system.",
  },
  {
    name: "Maybach 57 / 62",
    start: 2002,
    end: 2012,
    category: "Sedan",
    wiki: "Maybach 57 and 62",
    summary:
      "Daimler's revival of the historic Maybach name as an ultra-luxury rival to Rolls-Royce and Bentley.",
  },
  {
    name: "Mercedes-Benz SLR McLaren",
    code: "C199",
    start: 2003,
    classCode: "SLR",
    end: 2009,
    category: "Sports & Supercar",
    wiki: "Mercedes-Benz SLR McLaren",
    summary:
      "A carbon-fibre grand tourer built with McLaren, with a supercharged AMG V8 and swing-wing doors. It pays tribute to the 1955 300 SLR.",
  },
  {
    name: "Mercedes-Benz CLS",
    code: "C219",
    start: 2004,
    classCode: "CLS",
    end: 2010,
    category: "Coupé & Cabriolet",
    wiki: "Mercedes-Benz CLS-Class (C219)",
    summary:
      "The original 'four-door coupé', which created a whole new segment that other carmakers rushed to copy.",
  },
  {
    name: "Mercedes-Benz S-Class",
    code: "W221",
    start: 2005,
    classCode: "S",
    end: 2013,
    category: "Sedan",
    wiki: "Mercedes-Benz S-Class (W221)",
    summary:
      "Introduced Night View Assist and PRE-SAFE brake. The S 400 Hybrid was the first production car with a lithium-ion battery.",
  },
  {
    name: "Mercedes-Benz GL-Class",
    code: "X164",
    start: 2006,
    classCode: "GL",
    end: 2012,
    category: "SUV & Off-road",
    wiki: "Mercedes-Benz GL-Class",
    summary:
      "A full-size, seven-seat luxury SUV, the predecessor of today's GLS, 'the S-Class of SUVs'.",
  },
  {
    name: "Mercedes-Benz C-Class",
    code: "W204",
    start: 2007,
    classCode: "C",
    end: 2014,
    category: "Sedan",
    wiki: "Mercedes-Benz C-Class (W204)",
    summary:
      "Offered in Classic, Elegance and Avantgarde lines. The C 63 AMG with its 6.2-litre V8 became a cult car.",
  },
  {
    name: "Mercedes-Benz E-Class",
    code: "W212",
    start: 2009,
    classCode: "E",
    end: 2016,
    category: "Sedan",
    wiki: "Mercedes-Benz E-Class (W212)",
    summary:
      "An angular, safety-focused E-Class that introduced Attention Assist drowsiness detection.",
  },

  // ── Modern & Electric ─────────────────────────────────────────
  {
    name: "Mercedes-Benz SLS AMG",
    code: "C197",
    start: 2010,
    classCode: "SLS",
    end: 2014,
    category: "Sports & Supercar",
    wiki: "Mercedes-Benz SLS AMG",
    summary:
      "The spiritual successor to the 300 SL Gullwing and the first car developed entirely by AMG. An all-electric Electric Drive version was also built.",
  },
  {
    name: "Mercedes-Benz GLA",
    start: 2013,
    classCode: "GLA",
    end: null,
    category: "SUV & Off-road",
    wiki: "Mercedes-Benz GLA-Class",
    summary:
      "A compact crossover based on the A-Class, and the entry point to Mercedes SUVs.",
  },
  {
    name: "Mercedes-Benz S-Class",
    code: "W222",
    start: 2013,
    classCode: "S",
    end: 2020,
    category: "Sedan",
    wiki: "Mercedes-Benz S-Class (W222)",
    summary:
      "The first car without a single light bulb, all LED. It introduced Magic Body Control, which scans the road ahead.",
  },
  {
    name: "Mercedes-Benz C-Class",
    code: "W205",
    start: 2014,
    classCode: "C",
    end: 2021,
    category: "Sedan",
    wiki: "Mercedes-Benz C-Class (W205)",
    summary:
      "Brought S-Class luxury to the compact class. It became the brand's best-selling model worldwide.",
  },
  {
    name: "Mercedes-AMG GT",
    start: 2014,
    end: null,
    category: "Sports & Supercar",
    wiki: "Mercedes-AMG GT",
    summary:
      "AMG's front-mid-engined sports car with a hand-built twin-turbo V8. It later spawned the GT Black Series, the GT 4-Door Coupé and a 2+2 second generation.",
  },
  {
    name: "Mercedes-Benz V-Class",
    code: "W447",
    start: 2014,
    classCode: "V",
    end: null,
    category: "Commercial",
    wiki: "Mercedes-Benz Vito",
    summary:
      "The premium, passenger-carrying version of the Vito van, with business-class seating for up to eight. An electric EQV derivative followed later in the generation's run.",
  },
  {
    name: "Mercedes-Benz GLC",
    start: 2015,
    classCode: "GLC",
    end: null,
    category: "SUV & Off-road",
    wiki: "Mercedes-Benz GLC-Class",
    summary:
      "The mid-size SUV that became Mercedes-Benz's best-selling model globally.",
  },
  {
    name: "Mercedes-Benz E-Class",
    code: "W213",
    start: 2016,
    classCode: "E",
    end: 2023,
    category: "Sedan",
    wiki: "Mercedes-Benz E-Class (W213)",
    summary:
      "Introduced Drive Pilot semi-autonomous driving and a 'Widescreen Cockpit' of two joined displays.",
  },
  {
    name: "Mercedes-Benz A-Class",
    code: "W177",
    start: 2018,
    classCode: "A",
    end: 2025,
    category: "Sedan",
    wiki: "Mercedes-Benz A-Class (W177)",
    summary:
      "The launch car for the MBUX infotainment system with its 'Hey Mercedes' voice assistant.",
  },
  {
    name: "Mercedes-Benz EQC",
    code: "N293",
    start: 2019,
    classCode: "EQC",
    end: 2023,
    category: "Electric",
    wiki: "Mercedes-Benz EQC",
    summary:
      "The first production car under the EQ electric sub-brand: a battery-electric SUV based on the GLC.",
  },
  {
    name: "Mercedes-Benz GLS",
    code: "X167",
    start: 2019,
    classCode: "GLS",
    end: null,
    category: "SUV & Off-road",
    wiki: "Mercedes-Benz GLS-Class",
    summary:
      "'The S-Class of SUVs': a seven-seat flagship, which also comes in an ultra-luxury Mercedes-Maybach GLS version.",
  },
  {
    name: "Mercedes-Benz GLB",
    code: "X247",
    start: 2019,
    classCode: "GLB",
    end: null,
    category: "SUV & Off-road",
    wiki: "Mercedes-Benz GLB",
    summary:
      "A boxier, three-row compact SUV slotted between the GLA and GLC, styled with cues borrowed from the G-Class and GLS.",
  },
  {
    name: "Mercedes-AMG F1 W11 EQ Performance",
    code: "W11",
    start: 2020,
    end: 2020,
    category: "Racing",
    wiki: "Mercedes-AMG F1 W11 EQ Performance",
    summary:
      "Considered one of the most dominant Formula One cars ever. It won Mercedes a record seventh straight Constructors' title, and Lewis Hamilton a record-equalling seventh Drivers' title.",
  },
  {
    name: "Mercedes-Benz S-Class",
    code: "W223",
    start: 2020,
    classCode: "S",
    end: null,
    category: "Sedan",
    wiki: "Mercedes-Benz S-Class (W223)",
    summary:
      "The current flagship, with Level 3 conditionally automated driving, rear-axle steering and an augmented-reality head-up display.",
  },
  {
    name: "Mercedes-Benz EQS",
    code: "V297",
    start: 2021,
    classCode: "EQS",
    end: null,
    category: "Electric",
    wiki: "Mercedes-Benz EQS",
    summary:
      "The electric S-Class, with an extremely low drag coefficient of 0.20 and the 56-inch MBUX Hyperscreen.",
  },
  {
    name: "Mercedes-Benz EQB",
    code: "X243",
    start: 2021,
    classCode: "EQB",
    end: null,
    category: "Electric",
    wiki: "Mercedes-Benz EQB",
    summary:
      "A battery-electric compact SUV on the GLB's platform, offered with front- or all-wheel drive and up to seven seats.",
  },
  {
    name: "Mercedes-Benz C-Class",
    code: "W206",
    start: 2021,
    classCode: "C",
    end: null,
    category: "Sedan",
    wiki: "Mercedes-Benz C-Class (W206)",
    summary:
      "The current C-Class, with only four-cylinder electrified engines, plus plug-in hybrids with long electric range.",
  },
  {
    name: "Mercedes-Benz SL",
    code: "R232",
    start: 2021,
    classCode: "SL",
    end: null,
    category: "Roadster",
    wiki: "Mercedes-Benz SL-Class (R232)",
    summary:
      "The first SL developed entirely by AMG. It went back to a fabric roof and added 2+2 seating and all-wheel drive.",
  },
  {
    name: "Mercedes-Benz EQE",
    code: "V295",
    start: 2022,
    classCode: "EQE",
    end: null,
    category: "Electric",
    wiki: "Mercedes-Benz EQE",
    summary:
      "The electric executive sedan, the E-Class of the EQ family, on the dedicated EVA2 electric platform.",
  },
  {
    name: "Mercedes-Benz EQS SUV",
    code: "X296",
    start: 2022,
    classCode: "EQS",
    end: null,
    category: "Electric",
    wiki: "Mercedes-Benz EQS SUV",
    summary:
      "A seven-seat electric luxury SUV built in Alabama, which also comes as a Mercedes-Maybach version.",
  },
  {
    name: "Mercedes-Benz EQE SUV",
    code: "X294",
    start: 2022,
    classCode: "EQE",
    end: null,
    category: "Electric",
    wiki: "Mercedes-Benz EQE SUV",
    summary:
      "The SUV sibling of the EQE sedan, sharing its platform and battery while adding cargo space and a raised driving position.",
  },
  {
    name: "Mercedes-Benz Vision EQXX",
    start: 2022,
    end: 2022,
    category: "Concept",
    wiki: "Mercedes-Benz Vision EQXX",
    summary:
      "An efficiency-focused research car that drove over 1,200 km on a single charge, from Stuttgart to Silverstone.",
  },
  {
    name: "Mercedes-AMG One",
    start: 2022,
    end: 2024,
    category: "Sports & Supercar",
    wiki: "Mercedes-AMG One",
    summary:
      "A road-legal hypercar with a real Formula One hybrid power unit. It set the production-car lap record at the Nürburgring Nordschleife.",
  },
  {
    name: "Mercedes-Benz CLE",
    code: "C236 / A236",
    start: 2023,
    classCode: "CLE",
    end: null,
    category: "Coupé & Cabriolet",
    wiki: "Mercedes-Benz CLE",
    summary:
      "A coupé and cabriolet that folded the old C-Class and E-Class two-door lines into a single model, simplifying the range.",
  },
  {
    name: "Mercedes-Benz G 580",
    code: "W465",
    start: 2024,
    classCode: "G",
    end: null,
    category: "Electric",
    wiki: "Mercedes-Benz G-Class",
    summary:
      "The first all-electric G-Wagen, with one motor per wheel enabling a 'G-Turn' spin on the spot, wrapped in the same boxy silhouette.",
  },
  {
    name: "Mercedes-Benz E-Class",
    code: "W214",
    start: 2023,
    classCode: "E",
    end: null,
    category: "Sedan",
    wiki: "Mercedes-Benz E-Class (W214)",
    summary:
      "The current E-Class, with the MBUX Superscreen, an optional selfie camera and an app store in the dashboard.",
  },
  {
    name: "Mercedes-Benz CLA",
    code: "C178",
    start: 2025,
    classCode: "CLA",
    end: null,
    category: "Electric",
    wiki: "Mercedes-Benz CLA (C178)",
    summary:
      "The first car on the MMA platform and the debut of the MB.OS operating system, offered as an 800-volt EV with a long range and as a mild hybrid.",
  },
];

function slugify(s: string) {
  return s
    .replace(/ß/g, "ss")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[“”"']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const MODELS: CarModel[] = raw
  .map((m) => ({
    ...m,
    slug: slugify(
      [m.name, m.name.includes(m.code?.split(" ")[0] ?? "") ? "" : m.code?.split(" ")[0], m.start].join(" "),
    ),
  }))
  .sort((a, b) => a.start - b.start || a.name.localeCompare(b.name));

export const CATEGORIES = Array.from(
  new Set(MODELS.map((m) => m.category)),
) as Category[];

export function getModel(slug: string) {
  return MODELS.find((m) => m.slug === slug);
}
