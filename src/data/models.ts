export type Category =
  | "Pioneer"
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
  start: number;
  /** `null` = still in production. */
  end: number | null;
  category: Category;
  /** English Wikipedia article title, used by the image scraper. */
  wiki: string;
  summary: string;
};

export const ERAS = [
  { id: "pioneers", name: "The Pioneers", from: 1885, to: 1925 },
  { id: "pre-war", name: "Pre-War Grandeur", from: 1926, to: 1945 },
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
  // ── The Pioneers ──────────────────────────────────────────────
  {
    name: "Daimler Reitwagen",
    start: 1885,
    end: 1885,
    category: "Pioneer",
    wiki: "Daimler Reitwagen",
    summary:
      "Gottlieb Daimler and Wilhelm Maybach's 'riding car' was the first vehicle powered by a petrol internal-combustion engine. It was a test bed for their high-speed engine.",
  },
  {
    name: "Benz Patent-Motorwagen",
    start: 1886,
    end: 1893,
    category: "Pioneer",
    wiki: "Benz Patent-Motorwagen",
    summary:
      "Patented by Carl Benz on 29 January 1886, it is widely regarded as the world's first practical automobile. In 1888, Bertha Benz drove it 106 km to Pforzheim, the first long-distance car journey.",
  },
  {
    name: "Benz Velo",
    start: 1894,
    end: 1902,
    category: "Pioneer",
    wiki: "Benz Velo",
    summary:
      "The first car built in series production. Over 1,200 were made, which made the Velo the best-selling car of the 1890s.",
  },
  {
    name: "Mercedes 35 hp",
    start: 1901,
    end: 1902,
    category: "Pioneer",
    wiki: "Mercedes 35 hp",
    summary:
      "Built for Emil Jellinek and named after his daughter Mercédès. Its long wheelbase, low centre of gravity and honeycomb radiator made it the template for the modern car.",
  },
  {
    name: "Mercedes Simplex",
    start: 1902,
    end: 1909,
    category: "Pioneer",
    wiki: "Mercedes Simplex",
    summary:
      "The successor to the 35 hp. It was fast and easy to drive for its day, which is where the name 'Simplex' came from.",
  },
  {
    name: "Blitzen Benz",
    start: 1909,
    end: 1909,
    category: "Racing",
    wiki: "Blitzen Benz",
    summary:
      "A 21.5-litre record car. In 1911 it reached 228 km/h at Daytona Beach, faster than any aeroplane, train or car of the time.",
  },

  // ── Pre-War Grandeur ──────────────────────────────────────────
  {
    name: "Mercedes-Benz SSK",
    code: "W06",
    start: 1928,
    end: 1932,
    category: "Sports & Supercar",
    wiki: "Mercedes-Benz SSK",
    summary:
      "Designed by Ferdinand Porsche, the supercharged 'Super Sport Kurz' was one of the fastest cars of its era and won races across Europe with drivers like Rudolf Caracciola.",
  },
  {
    name: "Mercedes-Benz 770 “Großer Mercedes”",
    code: "W07 / W150",
    start: 1930,
    end: 1943,
    category: "Sedan",
    wiki: "Mercedes-Benz 770",
    summary:
      "A huge, supercharged limousine built in small numbers for heads of state, royalty and industrialists.",
  },
  {
    name: "Mercedes-Benz W25",
    code: "W25",
    start: 1934,
    end: 1936,
    category: "Racing",
    wiki: "Mercedes-Benz W25",
    summary:
      "The first 'Silver Arrow'. According to legend, its white paint was scraped off overnight to meet the weight limit, leaving bare silver aluminium.",
  },
  {
    name: "Mercedes-Benz 500K",
    code: "W29",
    start: 1934,
    end: 1936,
    category: "Coupé & Cabriolet",
    wiki: "Mercedes-Benz 500K",
    summary:
      "A supercharged grand tourer with independent suspension and elegant coachwork. It was a status symbol of 1930s high society.",
  },
  {
    name: "Mercedes-Benz 540K",
    code: "W29",
    start: 1936,
    end: 1940,
    category: "Coupé & Cabriolet",
    wiki: "Mercedes-Benz 540K",
    summary:
      "The larger-engined evolution of the 500K. The Spezial-Roadster body is one of the most valuable pre-war cars in the world.",
  },
  {
    name: "Mercedes-Benz 170 V",
    code: "W136",
    start: 1936,
    end: 1955,
    category: "Sedan",
    wiki: "Mercedes-Benz W136",
    summary:
      "The brand's best-selling car before the war. After 1945 it was the model that got Mercedes-Benz production restarted.",
  },
  {
    name: "Mercedes-Benz 260 D",
    code: "W138",
    start: 1936,
    end: 1940,
    category: "Sedan",
    wiki: "Mercedes-Benz 260 D",
    summary:
      "The world's first series-production diesel passenger car, and the start of the brand's long diesel tradition. It was popular with taxi drivers.",
  },
  {
    name: "Mercedes-Benz G4",
    code: "W31",
    start: 1934,
    end: 1939,
    category: "SUV & Off-road",
    wiki: "Mercedes-Benz G4",
    summary:
      "A three-axle, six-wheeled off-road touring car built in very small numbers, mostly for parades.",
  },
  {
    name: "Mercedes-Benz W125",
    code: "W125",
    start: 1937,
    end: 1937,
    category: "Racing",
    wiki: "Mercedes-Benz W125",
    summary:
      "A 646 hp Grand Prix car. Its power output was not beaten in Grand Prix racing until the turbo era of the 1980s.",
  },

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
  {
    name: "Mercedes-Benz 300 “Adenauer”",
    code: "W186",
    start: 1951,
    end: 1957,
    category: "Sedan",
    wiki: "Mercedes-Benz W186",
    summary:
      "Germany's top luxury car of the post-war years, nicknamed after Chancellor Konrad Adenauer, who used several of them.",
  },
  {
    name: "Mercedes-Benz 300 S",
    code: "W188",
    start: 1951,
    end: 1958,
    category: "Coupé & Cabriolet",
    wiki: "Mercedes-Benz W188",
    summary:
      "A hand-built coupé, cabriolet and roadster based on the 300. It was one of the most expensive cars of its day.",
  },
  {
    name: "Mercedes-Benz “Ponton”",
    code: "W120 / W180",
    start: 1953,
    end: 1962,
    category: "Sedan",
    wiki: "Mercedes-Benz Ponton",
    summary:
      "The brand's first cars with modern unibody 'pontoon' styling. They set the pattern for the mid-size Mercedes that later became the E-Class.",
  },
  {
    name: "Mercedes-Benz 300 SL “Gullwing”",
    code: "W198",
    start: 1954,
    end: 1963,
    category: "Sports & Supercar",
    wiki: "Mercedes-Benz 300 SL",
    summary:
      "Its upward-opening doors were needed because of its tubular spaceframe. It was also the first production car with direct fuel injection, and one of the great automotive icons.",
  },
  {
    name: "Mercedes-Benz W196",
    code: "W196",
    start: 1954,
    end: 1955,
    category: "Racing",
    wiki: "Mercedes-Benz W196",
    summary:
      "Juan Manuel Fangio won two Formula One world championships in the W196, which was offered with both streamlined and open-wheel bodies.",
  },
  {
    name: "Mercedes-Benz 300 SLR",
    code: "W196 S",
    start: 1955,
    end: 1955,
    category: "Racing",
    wiki: "Mercedes-Benz 300 SLR",
    summary:
      "Stirling Moss won the 1955 Mille Miglia in it with a record that still stands. The 'Uhlenhaut Coupé' version is the most expensive car ever sold at auction.",
  },
  {
    name: "Mercedes-Benz 190 SL",
    code: "W121",
    start: 1955,
    end: 1963,
    category: "Roadster",
    wiki: "Mercedes-Benz 190 SL",
    summary:
      "The more affordable, elegant sister of the 300 SL. It made open-top Mercedes motoring accessible to more buyers.",
  },
  {
    name: "Mercedes-Benz “Fintail”",
    code: "W110 / W111 / W112",
    start: 1959,
    end: 1968,
    category: "Sedan",
    wiki: "Mercedes-Benz W111",
    summary:
      "Nicknamed 'Heckflosse' for its tail fins, this was the first car with a safety cell of front and rear crumple zones, invented by Béla Barényi.",
  },
  {
    name: "Mercedes-Benz 600",
    code: "W100",
    start: 1963,
    end: 1981,
    category: "Sedan",
    wiki: "Mercedes-Benz 600",
    summary:
      "The ultimate limousine of its time, with hydraulic comfort systems and a 6.3-litre V8. It was driven by popes, presidents and rock stars.",
  },
  {
    name: "Mercedes-Benz SL “Pagoda”",
    code: "W113",
    start: 1963,
    end: 1971,
    category: "Roadster",
    wiki: "Mercedes-Benz W113",
    summary:
      "Named for its concave hardtop roof. The 230/250/280 SL combined elegance with the safety-cell engineering of the Fintail.",
  },
  {
    name: "Mercedes-Benz W108 / W109",
    code: "W108 / W109",
    start: 1965,
    end: 1972,
    category: "Sedan",
    wiki: "Mercedes-Benz W108",
    summary:
      "The direct ancestor of the S-Class. The 300 SEL 6.3 version put the 600's V8 into a mid-size body and became the first super-saloon.",
  },
  {
    name: "Mercedes-Benz “Stroke 8”",
    code: "W114 / W115",
    start: 1968,
    end: 1976,
    category: "Sedan",
    wiki: "Mercedes-Benz W114",
    summary:
      "Nearly two million were built. Its famous durability made it a favourite of taxi drivers around the world.",
  },
  {
    name: "Mercedes-Benz C111",
    code: "C111",
    start: 1969,
    end: 1979,
    category: "Concept",
    wiki: "Mercedes-Benz C111",
    summary:
      "An experimental wedge with gullwing doors, used to test Wankel, diesel and turbo engines. It set several world speed records.",
  },

  // ── Engineered Like No Other ──────────────────────────────────
  {
    name: "Mercedes-Benz SL",
    code: "R107 / C107",
    start: 1971,
    end: 1989,
    category: "Roadster",
    wiki: "Mercedes-Benz R107 and C107",
    summary:
      "In production for 18 years, the R107 SL was a symbol of the 1970s and 1980s and one of the longest-running single car designs ever.",
  },
  {
    name: "Mercedes-Benz S-Class",
    code: "W116",
    start: 1972,
    end: 1980,
    category: "Sedan",
    wiki: "Mercedes-Benz W116",
    summary:
      "The first car officially called the 'S-Class' and the first production car available with ABS. The 450 SEL 6.9 was its hydropneumatic flagship.",
  },
  {
    name: "Mercedes-Benz W123",
    code: "W123",
    start: 1976,
    end: 1986,
    category: "Sedan",
    wiki: "Mercedes-Benz W123",
    summary:
      "Built to last almost forever. The W123 made it common to see a Mercedes with a million kilometres on the clock, from German suburbs to African taxi ranks.",
  },
  {
    name: "Mercedes-Benz G-Class",
    code: "W460 / W463",
    start: 1979,
    end: null,
    category: "SUV & Off-road",
    wiki: "Mercedes-Benz G-Class",
    summary:
      "Designed as a military vehicle, the boxy 'G-Wagen' became a luxury icon. It is one of the longest-produced vehicles in automotive history and now also comes as the all-electric G 580.",
  },
  {
    name: "Mercedes-Benz S-Class",
    code: "W126",
    start: 1979,
    end: 1991,
    category: "Sedan",
    wiki: "Mercedes-Benz W126",
    summary:
      "The best-selling S-Class ever. It introduced the driver's airbag and is widely thought of as one of the best-engineered cars ever made.",
  },
  {
    name: "Mercedes-Benz 190",
    code: "W201",
    start: 1982,
    end: 1993,
    category: "Sedan",
    wiki: "Mercedes-Benz W201",
    summary:
      "The 'Baby Benz' was the brand's first compact car and the ancestor of the C-Class. The 2.5-16 Evolution II was a touring-car racing legend.",
  },
  {
    name: "Mercedes-Benz W124",
    code: "W124",
    start: 1984,
    end: 1997,
    category: "Sedan",
    wiki: "Mercedes-Benz W124",
    summary:
      "The first model to carry the 'E-Class' name. It includes the Porsche-assembled 500 E and is known for being almost indestructible.",
  },

  // ── The Great Expansion ───────────────────────────────────────
  {
    name: "Mercedes-Benz SL",
    code: "R129",
    start: 1989,
    end: 2001,
    category: "Roadster",
    wiki: "Mercedes-Benz SL-Class (R129)",
    summary:
      "It introduced an automatic pop-up roll bar and a power soft top. The SL 73 AMG was one of the rarest versions.",
  },
  {
    name: "Mercedes-Benz S-Class",
    code: "W140",
    start: 1991,
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
    end: 2014,
    category: "Sports & Supercar",
    wiki: "Mercedes-Benz SLS AMG",
    summary:
      "The spiritual successor to the 300 SL Gullwing and the first car developed entirely by AMG. An all-electric Electric Drive version was also built.",
  },
  {
    name: "Mercedes-Benz GLA",
    start: 2013,
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
    name: "Mercedes-Benz GLC",
    start: 2015,
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
    end: null,
    category: "SUV & Off-road",
    wiki: "Mercedes-Benz GLS-Class",
    summary:
      "'The S-Class of SUVs': a seven-seat flagship, which also comes in an ultra-luxury Mercedes-Maybach GLS version.",
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
    end: null,
    category: "Electric",
    wiki: "Mercedes-Benz EQS",
    summary:
      "The electric S-Class, with an extremely low drag coefficient of 0.20 and the 56-inch MBUX Hyperscreen.",
  },
  {
    name: "Mercedes-Benz C-Class",
    code: "W206",
    start: 2021,
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
    end: null,
    category: "Electric",
    wiki: "Mercedes-Benz EQS SUV",
    summary:
      "A seven-seat electric luxury SUV built in Alabama, which also comes as a Mercedes-Maybach version.",
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
    name: "Mercedes-Benz E-Class",
    code: "W214",
    start: 2023,
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
