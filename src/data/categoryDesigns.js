/**
 * Per-category design identities for the categories that don't have a
 * hand-tuned entry in categoryStyles.js.
 *
 * Each row is a compact recipe:
 *   [hue, mode, accentShift, displayFont, bodyFont, layout, radius, button, heading]
 *
 *  hue          0-360 brand hue chosen for the trade (e.g. pest-control = green)
 *  mode         L light · T tinted/warm paper · D dark · E dark-elegant
 *  accentShift  degrees added to hue to derive the accent colour
 *  layout       6 chars → nav(f|b) hero(s|c|f) services(c|t|r) team(c|o|a|d) gallery(g|m) testimonials(c|s)
 *  radius/button/heading → corner radius, button shape, heading preset
 *
 * The palette (bg / card / ink / muted / line) is derived from the hue, then
 * `resolveDesigns()` nudges any colour that is too close to another category's
 * and enforces WCAG contrast — so no two categories can look the same.
 * See scripts/check-designs.mjs for the automated uniqueness + contrast audit.
 */

/* ------------------------------ fonts ------------------------------ */
export const FONT = {
  inter: "'Inter', sans-serif",
  jakarta: "'Plus Jakarta Sans', sans-serif",
  grotesk: "'Space Grotesk', sans-serif",
  oswald: "'Oswald', sans-serif",
  bebas: "'Bebas Neue', sans-serif",
  fraunces: "'Fraunces', Georgia, serif",
  cormorant: "'Cormorant Garamond', Georgia, serif",
  playfair: "'Playfair Display', Georgia, serif",
  baskerville: "'Libre Baskerville', Georgia, serif",
  marcellus: "'Marcellus', Georgia, serif",
  manrope: "'Manrope', sans-serif",
  sora: "'Sora', sans-serif",
  poppins: "'Poppins', sans-serif",
  rubik: "'Rubik', sans-serif",
  dm: "'DM Sans', sans-serif",
  josefin: "'Josefin Sans', sans-serif",
  quicksand: "'Quicksand', sans-serif",
  outfit: "'Outfit', sans-serif",
  montserrat: "'Montserrat', sans-serif",
  raleway: "'Raleway', sans-serif",
  nunito: "'Nunito', sans-serif",
  lexend: "'Lexend', sans-serif",
  urbanist: "'Urbanist', sans-serif",
  worksans: "'Work Sans', sans-serif",
  archivo: "'Archivo', sans-serif",
  barlow: "'Barlow Condensed', 'Oswald', sans-serif",
  anton: "'Anton', 'Oswald', sans-serif",
  lora: "'Lora', Georgia, serif",
  dmserif: "'DM Serif Display', Georgia, serif",
  merriweather: "'Merriweather', Georgia, serif",
  cinzel: "'Cinzel', Georgia, serif",
  spectral: "'Spectral', Georgia, serif",
  bitter: "'Bitter', Georgia, serif",
  abril: "'Abril Fatface', Georgia, serif",
  yeseva: "'Yeseva One', Georgia, serif",
  syne: "'Syne', sans-serif",
  figtree: "'Figtree', sans-serif",
  albert: "'Albert Sans', sans-serif",
  bricolage: "'Bricolage Grotesque', sans-serif",
  tenor: "'Tenor Sans', sans-serif",
  teko: "'Teko', 'Oswald', sans-serif",
  karla: "'Karla', sans-serif",
};

/** Google Fonts families added on top of the ones index.html already loads. */
export const EXTRA_GOOGLE_FONTS = [
  "Montserrat:wght@400;500;600;700;800", "Raleway:wght@400;500;600;700;800", "Nunito:wght@400;600;700;800",
  "Lexend:wght@400;500;600;700", "Urbanist:wght@400;500;600;700;800", "Work+Sans:wght@400;500;600;700;800",
  "Archivo:wght@400;500;600;700;800", "Barlow+Condensed:wght@500;600;700", "Anton", "Lora:ital,wght@0,500;0,600;0,700;1,500",
  "DM+Serif+Display:ital@0;1", "Merriweather:wght@400;700;900", "Cinzel:wght@400;500;600;700", "Spectral:wght@400;500;600;700;800",
  "Bitter:wght@400;500;600;700;800", "Abril+Fatface", "Yeseva+One", "Syne:wght@500;600;700;800", "Figtree:wght@400;500;600;700;800",
  "Albert+Sans:wght@400;500;600;700;800", "Bricolage+Grotesque:wght@500;600;700;800", "Tenor+Sans", "Teko:wght@500;600;700",
  "Karla:wght@400;500;600;700",
];

/* ------------------------- colour helpers ------------------------- */
const clamp = (n, a, b) => Math.min(b, Math.max(a, n));

export function hslToHex(h, s, l) {
  h = ((h % 360) + 360) % 360; s = clamp(s, 0, 100) / 100; l = clamp(l, 0, 100) / 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const to = (x) => Math.round(x * 255).toString(16).padStart(2, "0");
  return `#${to(f(0))}${to(f(8))}${to(f(4))}`.toUpperCase();
}

export function hexToRgb(hex) {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function hexToHsl(hex) {
  const [r, g, b] = hexToRgb(hex).map((v) => v / 255);
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
  let h = 0;
  if (d) {
    if (mx === r) h = ((g - b) / d) % 6; else if (mx === g) h = (b - r) / d + 2; else h = (r - g) / d + 4;
    h *= 60; if (h < 0) h += 360;
  }
  const l = (mx + mn) / 2;
  const sat = d ? d / (1 - Math.abs(2 * l - 1)) : 0;
  return [h, sat * 100, l * 100];
}

/** A deep, on-brand companion of the primary — used for image overlays and the footer. */
export function deriveSecondary(primary) {
  const [h, s] = hexToHsl(primary);
  return hslToHex(h, Math.min(s, 62), 17);
}

const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
export const luminance = (hex) => { const [r, g, b] = hexToRgb(hex); return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b); };
export const contrast = (a, b) => {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

const LAB_CACHE = new Map();
function lab(hex) {
  if (LAB_CACHE.has(hex)) return LAB_CACHE.get(hex);
  const [r, g, b] = hexToRgb(hex).map(lin);
  let x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  let y = r * 0.2126 + g * 0.7152 + b * 0.0722;
  let z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
  const f = (t) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  [x, y, z] = [f(x), f(y), f(z)];
  const res = [116 * y - 16, 500 * (x - y), 200 * (y - z)];
  LAB_CACHE.set(hex, res);
  return res;
}

/** CIE76 ΔE in Lab — good enough for "do these two brand colours look different?" */
export function deltaE(hexA, hexB) {
  const [l1, a1, b1] = lab(hexA); const [l2, a2, b2] = lab(hexB);
  return Math.sqrt((l1 - l2) ** 2 + (a1 - a2) ** 2 + (b1 - b2) ** 2);
}

/* ------------------------- design presets ------------------------- */
const H = (weight, spacing = "-0.02em", transform = "none") => ({ weight, spacing, transform });
const UP = (weight, spacing = "0.04em") => ({ weight, spacing, transform: "uppercase" });
const HEADINGS = {
  H8: H(800), H7: H(700, "-0.015em"), H6: H(600, "-0.01em"),
  S4: H(400, "0.01em"), S6: H(600, "0.01em"), S7: H(700, "0em"),
  U5: UP(500, "0.05em"), U6: UP(600, "0.04em"), U7: UP(700, "0.03em"),
};
const KICKER_FOR = { U5: "0.32em", U6: "0.28em", U7: "0.26em", S4: "0.3em", S6: "0.28em", S7: "0.24em", H8: "0.18em", H7: "0.2em", H6: "0.22em" };

const NAV = { f: "floating", b: "bar" };
const HERO = { s: "split", c: "center", f: "full" };
const SERV = { c: "cards", t: "tiles", r: "rows" };
const TEAM = { c: "cards", o: "circle", a: "arch", d: "dark" };
const GAL = { g: "grid", m: "masonry" };
const TEST = { c: "cards", s: "spotlight" };

/* ------------------------------ the table ------------------------------ */
/* [hue, mode, accentShift, display, body, layout, radius, button, heading] */
export const DESIGN_ROWS = {
  /* e-commerce stores */
  "cosmetics-store": [338, "L", 35, "cormorant", "figtree", "fccoms", "1.25rem", "pill", "S6"],
  "clothing-store": [18, "T", 175, "bricolage", "inter", "bscogc", "0.75rem", "sharp", "H8"],
  boutique: [320, "L", 40, "cormorant", "figtree", "fccoms", "1.25rem", "pill", "S6"],
  "saree-ethnic": [8, "L", 20, "cormorant", "figtree", "bsccgc", "1rem", "soft", "S6"],
  "jewellery-store": [42, "D", 160, "cormorant", "inter", "bftdmc", "0.5rem", "sharp", "H7"],
  "footwear-store": [210, "T", 30, "urbanist", "inter", "bscogc", "0.75rem", "soft", "H8"],
  "bakery-cake": [25, "L", 15, "quicksand", "dm", "fscogs", "1.5rem", "pill", "H7"],
  "mobile-electronics": [220, "D", 100, "archivo", "inter", "bftdmc", "0.5rem", "sharp", "U7"],
  "furniture-store": [30, "L", -20, "bitter", "inter", "bsccgc", "0.5rem", "soft", "H7"],
  "optical-store": [200, "L", 80, "figtree", "inter", "fstcmc", "1.25rem", "pill", "H7"],
  "gift-shop": [340, "L", 50, "poppins", "inter", "fscogs", "1.5rem", "pill", "H7"],

  /* automotive & transport */
  "car-detailing": [192, "D", 110, "archivo", "inter", "bftdmc", "0.5rem", "sharp", "U7"],
  "bike-service": [48, "D", -40, "barlow", "inter", "bfrdgc", "0.25rem", "sharp", "U7"],
  "car-rental": [350, "T", 190, "urbanist", "dm", "fscogs", "1rem", "soft", "H7"],
  "bike-rental": [135, "L", -80, "lexend", "inter", "fftcgc", "1.25rem", "pill", "H7"],
  "car-accessories": [305, "D", 160, "syne", "inter", "bcrdmc", "0.75rem", "soft", "U5"],
  "used-car-dealer": [160, "L", -125, "montserrat", "inter", "bsccgc", "0.5rem", "soft", "H7"],
  "bike-showroom": [268, "D", 120, "teko", "inter", "bftdgs", "0", "sharp", "U7"],
  "taxi-service": [46, "T", 180, "worksans", "inter", "fsrcgc", "1rem", "soft", "H8"],
  "transport-company": [18, "T", 30, "bitter", "inter", "bfrcgc", "0.25rem", "sharp", "H7"],
  "driving-school": [8, "L", 210, "poppins", "inter", "fsccgc", "1rem", "pill", "H7"],
  "packers-movers": [32, "T", 190, "albert", "inter", "bsrcgc", "0.5rem", "soft", "H7"],
  courier: [262, "L", 100, "figtree", "inter", "fstcmc", "1.25rem", "pill", "H7"],
  "tour-operator": [208, "T", -150, "outfit", "dm", "ffcogs", "1.5rem", "pill", "H8"],

  laundry: [226, "T", 60, "quicksand", "dm", "fscogs", "2rem", "pill", "H7"],

  /* repairs */
  "mobile-repair": [212, "D", 60, "sora", "inter", "bscdgc", "0.75rem", "soft", "H7"],
  "laptop-repair": [178, "D", -70, "grotesk", "inter", "bstcgc", "0.5rem", "sharp", "H7"],
  "appliance-repair": [226, "L", 25, "manrope", "inter", "fsrcgc", "0.75rem", "soft", "H8"],
  "ro-service": [196, "L", 140, "nunito", "inter", "fscogc", "1.5rem", "pill", "H7"],

  /* home & property */
  "pest-control": [128, "L", 200, "rubik", "inter", "bsccgc", "0.5rem", "sharp", "H7"],
  waterproofing: [214, "T", 40, "archivo", "inter", "bfcdgc", "0.5rem", "soft", "U6"],
  "home-renovation": [30, "L", 170, "montserrat", "inter", "fscdmc", "0.75rem", "soft", "H7"],
  "modular-kitchen": [24, "T", 170, "lora", "manrope", "bfrcgs", "0.5rem", "sharp", "S7"],
  "furniture-shop": [36, "T", 150, "dmserif", "dm", "fstcms", "1.5rem", "soft", "S4"],
  "tiles-sanitary": [204, "L", 40, "albert", "inter", "bscdgc", "0.25rem", "sharp", "H7"],
  "hardware-shop": [14, "L", 200, "archivo", "inter", "bstdgc", "0.25rem", "sharp", "U6"],
  "paint-dealer": [330, "L", 150, "bricolage", "dm", "fscomc", "1.25rem", "pill", "H8"],
  "solar-installation": [44, "L", 190, "urbanist", "inter", "ffccgc", "1rem", "pill", "H8"],
  gardening: [112, "T", 60, "fraunces", "dm", "fscams", "2rem", "pill", "S6"],
  "water-supplier": [188, "L", 20, "figtree", "inter", "fsccgc", "1.25rem", "pill", "H7"],

  /* events */
  "wedding-decoration": [338, "T", 40, "cormorant", "montserrat", "fcrams", "2rem", "pill", "S6"],
  "mandap-decoration": [20, "E", 40, "yeseva", "inter", "bfcoms", "0.75rem", "soft", "S4"],
  "dj-sound": [292, "D", 150, "anton", "inter", "bftdmc", "0.25rem", "sharp", "U5"],
  "tent-house": [24, "T", 200, "worksans", "inter", "bsrcgc", "0.5rem", "soft", "H7"],

  /* food */
  florist: [322, "T", 100, "playfair", "karla", "fsrams", "2rem", "pill", "S6"],
  "sweet-shop": [18, "T", 40, "yeseva", "poppins", "fctcgs", "1.5rem", "pill", "S4"],
  "tiffin-service": [86, "T", -50, "nunito", "inter", "fscogc", "1.5rem", "pill", "H8"],
  "cloud-kitchen": [4, "D", 40, "bricolage", "inter", "bfrdgc", "0.75rem", "soft", "H8"],
  "food-truck": [54, "D", -30, "anton", "karla", "bftdmc", "0.25rem", "sharp", "U5"],

  /* pets */
  "pet-grooming": [188, "T", 150, "quicksand", "nunito", "fscomc", "2rem", "pill", "H8"],
  "pet-boarding": [98, "T", 120, "nunito", "dm", "fcccgs", "2rem", "pill", "H8"],
  "pet-training": [28, "L", 200, "poppins", "nunito", "fsrcgc", "1.25rem", "pill", "H8"],

  /* health */
  physiotherapy: [158, "L", 40, "jakarta", "dm", "fsccgc", "1.25rem", "pill", "H8"],
  "eye-care": [246, "L", 120, "outfit", "inter", "fctcgs", "1.5rem", "pill", "H7"],
  pharmacy: [150, "L", 195, "manrope", "inter", "bsccgc", "0.5rem", "soft", "H8"],
  "diagnostic-lab": [200, "L", -40, "grotesk", "inter", "bscdgc", "0.5rem", "sharp", "H7"],
  ayurveda: [95, "T", 30, "cormorant", "karla", "fcrags", "2rem", "pill", "S6"],
  dermatology: [352, "L", 30, "tenor", "inter", "fccags", "1.5rem", "pill", "S4"],
  "hair-transplant": [220, "L", 160, "sora", "inter", "bstcgc", "0.75rem", "soft", "H7"],
  "elder-care": [172, "T", 35, "merriweather", "nunito", "fsccgs", "1.5rem", "soft", "S7"],
  "massage-center": [140, "E", 60, "marcellus", "dm", "fcroms", "2rem", "pill", "S4"],

  /* education */
  "home-tutor": [232, "L", 130, "lexend", "inter", "fsccgc", "1rem", "soft", "H7"],
  "music-dance": [276, "T", 80, "syne", "dm", "fctcms", "1.5rem", "pill", "H8"],
  "computer-training": [204, "D", 120, "grotesk", "inter", "bstcgc", "0.5rem", "soft", "H7"],
  "language-institute": [170, "T", 130, "raleway", "inter", "fsccgs", "1.5rem", "pill", "H8"],
  "study-abroad": [222, "L", 160, "montserrat", "dm", "ffccgs", "1rem", "pill", "H8"],
  "education-consultant": [256, "L", 60, "albert", "inter", "fscdgc", "0.75rem", "soft", "H7"],
  preschool: [52, "T", 170, "quicksand", "nunito", "fcccgs", "2.5rem", "pill", "H8"],
  school: [210, "L", 30, "merriweather", "inter", "bsccgc", "0.5rem", "soft", "S7"],
  "competitive-exam": [16, "L", 200, "worksans", "inter", "bstcgc", "0.5rem", "sharp", "H8"],
  "spoken-english": [196, "T", 190, "figtree", "inter", "fsccgs", "1.25rem", "pill", "H8"],
  "art-craft-classes": [310, "T", 90, "bricolage", "nunito", "fctcms", "2rem", "pill", "H8"],
  "skill-training": [30, "D", 150, "archivo", "inter", "bstdgc", "0.5rem", "sharp", "U6"],
  "online-course": [244, "L", 70, "sora", "inter", "fctcgs", "1.25rem", "pill", "H8"],
  "library-study-room": [34, "T", 200, "spectral", "inter", "bsrcgc", "0.5rem", "soft", "S7"],

  /* creative & media */
  "digital-marketing": [262, "D", 190, "bricolage", "inter", "bstcgc", "0.75rem", "pill", "H8"],
  printing: [196, "L", 160, "archivo", "inter", "bstcgc", "0.5rem", "soft", "H7"],
  signboard: [58, "D", 200, "anton", "inter", "bstdmc", "0.25rem", "sharp", "U5"],
  "graphic-design": [320, "L", 130, "syne", "inter", "fcrcms", "0.5rem", "sharp", "H8"],
  "video-production": [2, "D", 180, "bebas", "inter", "bfrdms", "0", "sharp", "U5"],
  "social-media": [300, "L", 100, "urbanist", "inter", "fctcms", "1.5rem", "pill", "H8"],

  /* industry & trades */
  "security-service": [222, "D", 160, "oswald", "inter", "bfcdgc", "0.25rem", "sharp", "U6"],
  "manpower-recruitment": [188, "L", 220, "jakarta", "inter", "fsccgc", "0.75rem", "soft", "H8"],
  "construction-contractor": [40, "D", 180, "barlow", "inter", "bfrdgc", "0", "sharp", "U7"],
  "civil-contractor": [210, "T", 50, "bitter", "inter", "bsrcgc", "0.25rem", "sharp", "H7"],

  /* beauty & personal */
  "barber-shop": [18, "E", 200, "oswald", "inter", "bfcdms", "0.25rem", "sharp", "U6"],
  "mehendi-artist": [24, "T", 150, "yeseva", "karla", "fcroms", "2rem", "pill", "S4"],
  "tattoo-studio": [30, "D", 300, "abril", "inter", "bfrdms", "0", "sharp", "S4"],
  "nail-art": [345, "T", 60, "josefin", "dm", "fctcms", "2.5rem", "pill", "H6"],
  "boutique-tailor": [334, "E", 30, "cormorant", "montserrat", "bfcams", "0", "sharp", "S6"],
  "saree-showroom": [340, "E", 55, "playfair", "karla", "fcrams", "0.5rem", "soft", "S7"],

  /* food */
  "ice-cream-parlour": [322, "T", 140, "quicksand", "nunito", "fctcgs", "2.5rem", "pill", "H8"],
  "juice-bar": [82, "L", 160, "lexend", "inter", "fscogc", "1.5rem", "pill", "H8"],
  dhaba: [22, "D", 28, "bitter", "karla", "bfrcgs", "0.5rem", "soft", "S7"],
  "catering-equipment-rental": [200, "T", 190, "worksans", "inter", "bsrcgc", "0.5rem", "soft", "H7"],

  /* retail */
  "grocery-store": [120, "L", 70, "nunito", "inter", "fstcgc", "1.25rem", "pill", "H8"],
  "dairy-supplier": [205, "T", 140, "fraunces", "nunito", "fscogs", "1.75rem", "pill", "S6"],
  "meat-fish-shop": [356, "D", 180, "oswald", "karla", "bfrdgc", "0.25rem", "sharp", "U6"],
  "gift-shop": [336, "T", 60, "dmserif", "poppins", "fctcms", "1.5rem", "pill", "S4"],
  "toy-store": [8, "L", 180, "bricolage", "nunito", "fctcms", "2rem", "pill", "H8"],
  "book-store": [28, "T", 210, "spectral", "inter", "bsrcgs", "0.25rem", "soft", "S7"],
  "mobile-accessories": [278, "L", 70, "sora", "inter", "bstcmc", "1rem", "pill", "H8"],
  "electronics-showroom": [232, "D", 140, "montserrat", "inter", "bftcgc", "0.5rem", "sharp", "H8"],
  "footwear-store": [14, "T", 190, "archivo", "inter", "bstcmc", "0.5rem", "soft", "U6"],

  /* home services */
  plumber: [204, "L", 20, "rubik", "inter", "fsccgc", "0.75rem", "soft", "H8"],
  electrician: [50, "D", 160, "teko", "inter", "bstdgc", "0.25rem", "sharp", "U7"],
  carpenter: [28, "T", 120, "bitter", "karla", "bsrcmc", "0.25rem", "sharp", "S7"],
  "cctv-installer": [172, "D", 120, "grotesk", "inter", "bfcdgc", "0.5rem", "sharp", "U6"],
  "water-tank-cleaning": [184, "L", 25, "nunito", "inter", "fsrcgc", "1.25rem", "pill", "H7"],
  borewell: [168, "T", 190, "barlow", "inter", "bfrcgc", "0.25rem", "sharp", "U7"],
  "housekeeping-agency": [150, "T", 190, "albert", "dm", "fsccgc", "1rem", "soft", "H7"],

  /* real estate */
  "property-dealer": [208, "E", 40, "marcellus", "manrope", "bfcdgs", "0.25rem", "sharp", "S4"],
  "rental-pg": [172, "L", 160, "figtree", "inter", "fsccgc", "1rem", "soft", "H8"],
  "coworking-space": [250, "L", 150, "grotesk", "inter", "fctcms", "0.75rem", "soft", "H8"],
  "farm-resort": [104, "T", 40, "fraunces", "dm", "bfcams", "1.5rem", "soft", "S6"],
  "banquet-hall": [326, "E", 40, "cinzel", "montserrat", "bfcoms", "0.25rem", "sharp", "S6"],

  /* spiritual */
  "vastu-astrology": [38, "E", 210, "cinzel", "inter", "bfcams", "0.25rem", "sharp", "S6"],
  "pandit-pooja": [14, "T", 40, "yeseva", "poppins", "fcroms", "1.5rem", "pill", "S4"],
  astrologer: [262, "E", 60, "cinzel", "dm", "bcrdms", "0.5rem", "soft", "S6"],

  /* automotive (new) */
  /* (see above) */

  /* education / legal / finance */
  lawyer: [18, "E", 30, "baskerville", "inter", "bfcdgs", "0", "sharp", "S7"],
  "notary-services": [216, "T", 150, "lora", "inter", "bsrcgs", "0.25rem", "soft", "S7"],
  "insurance-agent": [206, "L", 150, "manrope", "inter", "fsccgc", "1rem", "soft", "H8"],
  "loan-agent": [140, "L", 70, "dm", "inter", "fscdgc", "0.75rem", "soft", "H8"],
  "gst-accounting": [236, "L", 160, "worksans", "inter", "bsrcgc", "0.5rem", "soft", "H7"],
  "stock-broker": [162, "D", 40, "grotesk", "inter", "bfrdgc", "0.5rem", "sharp", "H7"],

  /* creative */
  "web-design-agency": [286, "D", 160, "syne", "inter", "bftcmc", "0.75rem", "pill", "H8"],
  "photo-studio": [24, "L", 190, "tenor", "inter", "fctcms", "0.25rem", "sharp", "S4"],
  "wedding-photographer": [344, "T", 40, "cormorant", "raleway", "fcrams", "0", "sharp", "S6"],
  "drone-photography": [200, "D", 150, "urbanist", "inter", "bftcmc", "0.5rem", "sharp", "U5"],
  "event-anchor": [310, "E", 40, "playfair", "poppins", "bfcoms", "1rem", "pill", "S6"],
  "artist-painter": [8, "T", 200, "abril", "karla", "fcrams", "0", "sharp", "S4"],
  translator: [186, "L", 60, "raleway", "inter", "fsccgc", "1rem", "soft", "H7"],
  "content-writer": [30, "T", 190, "lora", "inter", "fcrcgs", "1rem", "soft", "S7"],

  /* agriculture & industrial */
  "agriculture-dealer": [96, "T", 50, "bitter", "inter", "bsrcgc", "0.5rem", "soft", "H8"],
  "tractor-dealer": [100, "D", 180, "oswald", "inter", "bfcdgc", "0.25rem", "sharp", "U7"],
  "nursery-plant-shop": [132, "T", 70, "fraunces", "nunito", "fstcms", "2rem", "pill", "S6"],
  "fabrication-welding": [20, "D", 190, "barlow", "inter", "bfrdgc", "0", "sharp", "U7"],
  "plywood-dealer": [32, "T", 170, "merriweather", "inter", "bsrcgc", "0.25rem", "soft", "S7"],
  "cement-supplier": [215, "L", 180, "archivo", "inter", "bstcgc", "0.25rem", "sharp", "U6"],
  "scrap-dealer": [145, "D", 195, "teko", "inter", "bstdgc", "0.25rem", "sharp", "U7"],
  "industrial-equipment": [228, "T", 170, "barlow", "inter", "bfcdgc", "0.25rem", "sharp", "U7"],
  "electricals-wholesaler": [56, "L", 180, "worksans", "inter", "bstcgc", "0.5rem", "soft", "H8"],
};

/* --------------------------- resolution --------------------------- */
const MODE = {
  L: { scheme: "light", s: 72, l: 34, accS: 85, accL: 50 },
  T: { scheme: "warm", s: 58, l: 36, accS: 78, accL: 48 },
  D: { scheme: "dark", s: 88, l: 58, accS: 85, accL: 60 },
  E: { scheme: "dark-elegant", s: 50, l: 63, accS: 60, accL: 66 },
};

function palette(hue, mode, accShift) {
  const m = MODE[mode];
  const primary = hslToHex(hue, m.s, m.l);
  const accent = hslToHex(hue + accShift, m.accS, m.accL);
  let theme;
  if (mode === "L") {
    theme = {
      bg: hslToHex(hue, 40, 97), card: "#FFFFFF", ink: hslToHex(hue, 30, 11),
      muted: hslToHex(hue, 12, 40), line: hslToHex(hue, 28, 90),
    };
  } else if (mode === "T") {
    theme = {
      bg: hslToHex(hue + 6, 46, 95), card: hslToHex(hue + 6, 60, 99), ink: hslToHex(hue + 4, 34, 12),
      muted: hslToHex(hue + 4, 14, 38), line: hslToHex(hue + 6, 34, 87),
    };
  } else if (mode === "D") {
    theme = {
      bg: hslToHex(hue, 22, 7), card: hslToHex(hue, 20, 11), ink: hslToHex(hue, 20, 95),
      muted: hslToHex(hue, 10, 66), line: hslToHex(hue, 16, 18),
    };
  } else {
    theme = {
      bg: hslToHex(hue, 20, 9), card: hslToHex(hue, 18, 14), ink: hslToHex(hue + 8, 30, 94),
      muted: hslToHex(hue, 10, 66), line: hslToHex(hue, 14, 22),
    };
  }
  return { primary, secondary: deriveSecondary(primary), accent, ...theme };
}

/** Nudge lightness until `fg` reads on `bg` (WCAG ≥ min). */
function ensureContrast(fg, bg, min, hue, sat, lightBg) {
  let l = 50;
  const [r, g, b] = hexToRgb(fg);
  const mx = Math.max(r, g, b) / 255, mn = Math.min(r, g, b) / 255;
  l = ((mx + mn) / 2) * 100;
  let out = fg, guard = 0;
  while (contrast(out, bg) < min && guard++ < 40) {
    l += lightBg ? -2 : 2;
    out = hslToHex(hue, sat, l);
  }
  return out;
}

export const MIN_PRIMARY_DELTA_E = 11;

/**
 * Build every generated design. `reserved` = primaries that already exist
 * (the hand-tuned categories) which new colours must stay away from.
 * For each category we search outward from the preferred hue/lightness/saturation
 * (cheapest deviation first) until the primary is perceptually distinct from
 * everything issued so far AND readable on its own background.
 */
export function resolveDesigns(reserved = []) {
  const taken = [...reserved];
  const out = {};

  // Candidate offsets ordered by how far they drift from the intended look.
  // Pass 1 stays close to the trade's natural colour; pass 2 roams further.
  const build = (maxH, maxL) => {
    const list = [];
    for (let dh = -maxH; dh <= maxH; dh += 3) for (let dl = -maxL; dl <= maxL; dl += 2) for (const ds of [0, -12, -24, 10]) {
      list.push({ dh, dl, ds, cost: Math.abs(dh) + Math.abs(dl) * 1.6 + Math.abs(ds) * 0.5 });
    }
    return list.sort((a, b) => a.cost - b.cost);
  };
  const passes = [build(75, 8), build(180, 14)];

  for (const [id, row] of Object.entries(DESIGN_ROWS)) {
    const [hue0, mode, accShift, display, body, layout, radius, button, head] = row;
    const m = MODE[mode];
    const lightBg = mode === "L" || mode === "T";
    let chosen = null;

    for (const offsets of passes) {
      for (const o of offsets) {
        const hue = hue0 + o.dh;
        const primary = hslToHex(hue, m.s + o.ds, m.l + o.dl);
        if (taken.some((t) => deltaE(t, primary) < MIN_PRIMARY_DELTA_E)) continue;
        const pal = palette(hue, mode, accShift);
        if (contrast(primary, pal.bg) < 4.2) continue;
        chosen = { hue, primary, pal };
        break;
      }
      if (chosen) break;
    }
    if (!chosen) throw new Error(`Could not find a distinct palette for "${id}"`);

    const { hue, primary, pal } = chosen;
    taken.push(primary);
    pal.primary = primary;
    pal.accent = ensureContrast(pal.accent, pal.bg, 3, hue + accShift, m.accS, lightBg);
    pal.secondary = deriveSecondary(primary);

    out[id] = {
      scheme: m.scheme,
      theme: pal,
      fonts: { display: FONT[display], body: FONT[body] },
      heading: HEADINGS[head],
      kicker: { transform: "uppercase", spacing: KICK(head), style: "normal", weight: mode === "E" || head.startsWith("S") ? 500 : 700 },
      radius,
      button,
      navVariant: NAV[layout[0]], heroVariant: HERO[layout[1]], servicesVariant: SERV[layout[2]],
      teamVariant: TEAM[layout[3]], galleryVariant: GAL[layout[4]], testimonialsVariant: TEST[layout[5]],
      _layout: layout,
    };
  }
  return out;
}
const KICK = (head) => KICKER_FOR[head] || "0.2em";
