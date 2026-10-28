/**
 * Per-category visual identities.
 *
 * Template families (templates/registry.js) decide WHICH sections a website renders.
 * These styles decide HOW it looks — palette, type, corner radius, button
 * shape and every section variant. They are merged over the family, so all
 * categories get a genuinely distinct design while sharing one engine.
 */

const f = {
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
};

const H = (weight, spacing = "-0.02em", transform = "none") => ({ weight, spacing, transform });
const UPPER = (weight = 600, spacing = "0.04em") => ({ weight, spacing, transform: "uppercase" });
const KICK = (spacing, weight = 600) => ({ transform: "uppercase", spacing, style: "normal", weight });

const light = (primary, accent, extra = {}) => ({
  scheme: "light",
  theme: { primary, accent, bg: "#FFFFFF", card: "#FFFFFF", ink: "#14161A", muted: "#5E6672", line: "#E7EAEE", ...extra },
});
const tinted = (primary, accent, bg, card, ink, muted, line) => ({
  scheme: "warm",
  theme: { primary, accent, bg, card, ink, muted, line },
});
const dark = (primary, accent, bg, card, ink, muted, line, scheme = "dark") => ({
  scheme,
  theme: { primary, accent, bg, card, ink, muted, line },
});

/* Health family */
const clinic = {
  ...light("#0E7490", "#14B8A6", { bg: "#F6FAFB" }),
  fonts: { display: f.jakarta, body: f.inter },
  heading: H(800), kicker: KICK("0.18em", 700), radius: "1.5rem", button: "pill",
  navVariant: "floating", heroVariant: "split", servicesVariant: "cards",
  teamVariant: "cards", galleryVariant: "grid", testimonialsVariant: "cards",
};
const hospital = {
  ...light("#15417E", "#C0392B", { bg: "#F7F9FC", line: "#E2E8F2" }),
  fonts: { display: f.manrope, body: f.inter },
  heading: H(700, "-0.015em"), kicker: KICK("0.2em", 700), radius: "0.5rem", button: "sharp",
  navVariant: "bar", heroVariant: "full", servicesVariant: "cards",
  teamVariant: "cards", galleryVariant: "grid", testimonialsVariant: "cards",
};
const dental = {
  ...tinted("#0BA5A5", "#7C3AED", "#F2FBFC", "#FFFFFF", "#0E2C33", "#5C7A80", "#D8EEF0"),
  fonts: { display: f.sora, body: f.dm },
  heading: H(700), kicker: KICK("0.22em", 700), radius: "2rem", button: "pill",
  navVariant: "floating", heroVariant: "center", servicesVariant: "cards",
  teamVariant: "circle", galleryVariant: "grid", testimonialsVariant: "spotlight",
};

/* Fitness family */
const gym = {
  ...dark("#D8FF3E", "#FF5A1F", "#0B0B0D", "#141417", "#F4F4F2", "#9C9CA3", "#242429"),
  fonts: { display: f.oswald, body: f.inter },
  heading: UPPER(600, "0.01em"), kicker: KICK("0.3em", 600), radius: "0.6rem", button: "sharp",
  navVariant: "bar", heroVariant: "full", servicesVariant: "tiles",
  teamVariant: "dark", galleryVariant: "masonry", testimonialsVariant: "cards",
};
const fitness = {
  ...dark("#FF4D4D", "#FFB020", "#101014", "#1A1A20", "#FAFAFA", "#A0A0AA", "#282830"),
  fonts: { display: f.bebas, body: f.rubik },
  heading: UPPER(400, "0.03em"), kicker: KICK("0.34em", 600), radius: "0.4rem", button: "sharp",
  navVariant: "bar", heroVariant: "full", servicesVariant: "tiles",
  teamVariant: "dark", galleryVariant: "masonry", testimonialsVariant: "cards",
};
const yoga = {
  ...tinted("#5B7C6D", "#C9A227", "#F7F5F0", "#FFFFFF", "#25302A", "#6E7B72", "#E6E2D8"),
  fonts: { display: f.cormorant, body: f.dm },
  heading: H(600, "0.01em"), kicker: KICK("0.3em", 500), radius: "2.25rem", button: "pill",
  navVariant: "floating", heroVariant: "center", servicesVariant: "cards",
  teamVariant: "arch", galleryVariant: "grid", testimonialsVariant: "spotlight",
};

/* Food family */
const cafe = {
  ...tinted("#7C4A2D", "#C98F52", "#FAF4EA", "#FFFDF8", "#2E211A", "#8A7568", "#EADFD0"),
  fonts: { display: f.fraunces, body: f.inter },
  heading: H(600, "-0.01em"), kicker: KICK("0.26em", 600), radius: "1.75rem", button: "pill",
  navVariant: "floating", heroVariant: "center", servicesVariant: "cards",
  teamVariant: "circle", galleryVariant: "grid", testimonialsVariant: "spotlight",
};
const bakery = {
  ...tinted("#C0567A", "#E8A33D", "#FFF6F8", "#FFFFFF", "#3B1F2B", "#8A6B77", "#F4DFE6"),
  fonts: { display: f.josefin, body: f.quicksand },
  heading: H(600, "0em"), kicker: KICK("0.24em", 600), radius: "2.5rem", button: "pill",
  navVariant: "floating", heroVariant: "center", servicesVariant: "cards",
  teamVariant: "circle", galleryVariant: "grid", testimonialsVariant: "spotlight",
};
const restaurant = {
  ...dark("#E0A526", "#C4492E", "#131110", "#1C1917", "#F1EAE0", "#A79C8D", "#2A2622", "dark-elegant"),
  fonts: { display: f.playfair, body: f.inter },
  heading: H(700, "0em"), kicker: KICK("0.3em", 500), radius: "1rem", button: "soft",
  navVariant: "bar", heroVariant: "full", servicesVariant: "cards",
  teamVariant: "circle", galleryVariant: "grid", testimonialsVariant: "spotlight",
};

/* Beauty family */
const salon = {
  ...tinted("#B76E79", "#D9A5A0", "#FBF4F2", "#FFFFFF", "#211513", "#8A6F6A", "#F0DEDA"),
  fonts: { display: f.cormorant, body: f.inter },
  heading: H(600, "0.01em"), kicker: KICK("0.32em", 500), radius: "2rem", button: "pill",
  navVariant: "floating", heroVariant: "center", servicesVariant: "rows",
  teamVariant: "arch", galleryVariant: "grid", testimonialsVariant: "spotlight",
};
const spa = {
  ...tinted("#3E6B5A", "#A8BFA0", "#F4F7F3", "#FFFFFF", "#1E2A24", "#67786F", "#E1EAE2"),
  fonts: { display: f.marcellus, body: f.dm },
  heading: H(400, "0.02em"), kicker: KICK("0.3em", 500), radius: "2.5rem", button: "pill",
  navVariant: "floating", heroVariant: "center", servicesVariant: "rows",
  teamVariant: "arch", galleryVariant: "grid", testimonialsVariant: "spotlight",
};
const beauty = {
  ...tinted("#DB2777", "#F472B6", "#FFF5FA", "#FFFFFF", "#3B0F26", "#8B5A72", "#FBDCEA"),
  fonts: { display: f.poppins, body: f.dm },
  heading: H(700, "-0.01em"), kicker: KICK("0.2em", 700), radius: "1.75rem", button: "pill",
  navVariant: "floating", heroVariant: "split", servicesVariant: "cards",
  teamVariant: "cards", galleryVariant: "grid", testimonialsVariant: "cards",
};

/* Professional family */
const hotel = {
  ...dark("#C8A75A", "#8C6D2F", "#1B1A22", "#25242C", "#F5F1E8", "#A9A29A", "#34333B", "dark-elegant"),
  fonts: { display: f.playfair, body: f.inter },
  heading: H(700, "0em"), kicker: KICK("0.3em", 500), radius: "0.25rem", button: "sharp",
  navVariant: "bar", heroVariant: "full", servicesVariant: "cards",
  teamVariant: "cards", galleryVariant: "grid", testimonialsVariant: "spotlight",
};
const coaching = {
  ...light("#1D4ED8", "#F97316", { bg: "#F5F8FF", line: "#E0E8F7" }),
  fonts: { display: f.poppins, body: f.inter },
  heading: H(700, "-0.015em"), kicker: KICK("0.16em", 700), radius: "1rem", button: "soft",
  navVariant: "floating", heroVariant: "split", servicesVariant: "cards",
  teamVariant: "cards", galleryVariant: "grid", testimonialsVariant: "cards",
};
const consultancy = {
  ...light("#334155", "#2563EB", { bg: "#F8FAFC", line: "#E2E8F0" }),
  fonts: { display: f.grotesk, body: f.inter },
  heading: H(700, "-0.02em"), kicker: KICK("0.2em", 600), radius: "0.75rem", button: "soft",
  navVariant: "floating", heroVariant: "split", servicesVariant: "cards",
  teamVariant: "cards", galleryVariant: "grid", testimonialsVariant: "cards",
};
const realEstate = {
  ...tinted("#0F3D3E", "#B08D57", "#F7F8F7", "#FFFFFF", "#16211F", "#5E6C69", "#E3E8E5"),
  fonts: { display: f.marcellus, body: f.manrope },
  heading: H(400, "0.01em"), kicker: KICK("0.26em", 600), radius: "0.5rem", button: "soft",
  navVariant: "bar", heroVariant: "full", servicesVariant: "cards",
  teamVariant: "cards", galleryVariant: "grid", testimonialsVariant: "cards",
};
const photography = {
  ...dark("#FFFFFF", "#E11D48", "#0A0A0A", "#131313", "#FAFAFA", "#8E8E8E", "#262626"),
  fonts: { display: f.manrope, body: f.inter },
  heading: H(800, "-0.03em"), kicker: KICK("0.36em", 500), radius: "0", button: "sharp",
  navVariant: "bar", heroVariant: "full", servicesVariant: "tiles",
  teamVariant: "dark", galleryVariant: "masonry", testimonialsVariant: "cards",
};
const travel = {
  ...tinted("#0369A1", "#FB923C", "#F2F9FD", "#FFFFFF", "#0C2434", "#5B7484", "#DCEBF4"),
  fonts: { display: f.outfit, body: f.dm },
  heading: H(700, "-0.02em"), kicker: KICK("0.2em", 700), radius: "1.5rem", button: "pill",
  navVariant: "floating", heroVariant: "full", servicesVariant: "cards",
  teamVariant: "cards", galleryVariant: "masonry", testimonialsVariant: "cards",
};
const automobile = {
  ...dark("#F97316", "#EF4444", "#121316", "#1B1D21", "#F5F5F4", "#9A9CA3", "#2A2D33"),
  fonts: { display: f.rubik, body: f.inter },
  heading: UPPER(700, "0.02em"), kicker: KICK("0.24em", 700), radius: "0.5rem", button: "sharp",
  navVariant: "bar", heroVariant: "full", servicesVariant: "tiles",
  teamVariant: "dark", galleryVariant: "grid", testimonialsVariant: "cards",
};
const freelancer = {
  ...tinted("#7C3AED", "#06B6D4", "#FBFAFF", "#FFFFFF", "#1C1533", "#6A6486", "#EBE6FA"),
  fonts: { display: f.sora, body: f.dm },
  heading: H(700, "-0.025em"), kicker: KICK("0.18em", 700), radius: "1.75rem", button: "pill",
  navVariant: "floating", heroVariant: "split", servicesVariant: "cards",
  teamVariant: "cards", galleryVariant: "masonry", testimonialsVariant: "spotlight",
};
const interior = {
  ...tinted("#A85832", "#6B705C", "#FAF7F2", "#FFFFFF", "#2B211B", "#7C716A", "#EBE4DA"),
  fonts: { display: f.baskerville, body: f.inter },
  heading: H(700, "0em"), kicker: KICK("0.28em", 500), radius: "0", button: "sharp",
  navVariant: "bar", heroVariant: "full", servicesVariant: "rows",
  teamVariant: "cards", galleryVariant: "grid", testimonialsVariant: "spotlight",
};
const jewellery = {
  ...dark("#E5C07B", "#F5E6C8", "#16141A", "#201E25", "#F8F4EC", "#A79E92", "#332F38", "dark-elegant"),
  fonts: { display: f.cormorant, body: f.josefin },
  heading: H(600, "0.04em"), kicker: KICK("0.4em", 500), radius: "0", button: "sharp",
  navVariant: "bar", heroVariant: "full", servicesVariant: "cards",
  teamVariant: "circle", galleryVariant: "grid", testimonialsVariant: "spotlight",
};
const charteredAccountant = {
  ...light("#1E3A5F", "#0E7490", { bg: "#F7F9FB", line: "#E4EAF0" }),
  fonts: { display: f.manrope, body: f.inter },
  heading: H(700, "-0.01em"), kicker: KICK("0.18em", 700), radius: "0.5rem", button: "soft",
  navVariant: "floating", heroVariant: "split", servicesVariant: "cards",
  teamVariant: "cards", galleryVariant: "grid", testimonialsVariant: "cards",
};
const architect = {
  ...light("#111827", "#F59E0B", { bg: "#F5F5F4", card: "#FFFFFF", line: "#E5E5E4" }),
  fonts: { display: f.grotesk, body: f.inter },
  heading: UPPER(700, "0.06em"), kicker: KICK("0.32em", 600), radius: "0", button: "sharp",
  navVariant: "bar", heroVariant: "full", servicesVariant: "tiles",
  teamVariant: "cards", galleryVariant: "grid", testimonialsVariant: "cards",
};
const acRepair = {
  ...tinted("#0284C7", "#38BDF8", "#F4FBFF", "#FFFFFF", "#0B2434", "#5A7484", "#DCEFF9"),
  fonts: { display: f.rubik, body: f.dm },
  heading: H(700, "-0.02em"), kicker: KICK("0.14em", 700), radius: "1rem", button: "soft",
  navVariant: "floating", heroVariant: "split", servicesVariant: "cards",
  teamVariant: "cards", galleryVariant: "grid", testimonialsVariant: "cards",
};
const cleaning = {
  ...tinted("#0891B2", "#22D3EE", "#F3FCFE", "#FFFFFF", "#0E2A33", "#5B7780", "#DCF1F6"),
  fonts: { display: f.dm, body: f.inter },
  heading: H(700, "-0.02em"), kicker: KICK("0.2em", 700), radius: "1.5rem", button: "pill",
  navVariant: "floating", heroVariant: "split", servicesVariant: "cards",
  teamVariant: "cards", galleryVariant: "grid", testimonialsVariant: "cards",
};
const eventPlanner = {
  ...tinted("#7E22CE", "#EC4899", "#FDF7FF", "#FFFFFF", "#2A0F3D", "#7A5E8C", "#F0E1F8"),
  fonts: { display: f.sora, body: f.poppins },
  heading: H(700, "-0.025em"), kicker: KICK("0.22em", 700), radius: "2rem", button: "pill",
  navVariant: "floating", heroVariant: "full", servicesVariant: "cards",
  teamVariant: "cards", galleryVariant: "masonry", testimonialsVariant: "spotlight",
};
const caterer = {
  ...tinted("#B45309", "#DC2626", "#FFFDF6", "#FFFFFF", "#331F0B", "#87694C", "#F3E6D3"),
  fonts: { display: f.fraunces, body: f.manrope },
  heading: H(700, "-0.01em"), kicker: KICK("0.24em", 700), radius: "1.25rem", button: "soft",
  navVariant: "bar", heroVariant: "full", servicesVariant: "cards",
  teamVariant: "cards", galleryVariant: "grid", testimonialsVariant: "spotlight",
};
const nutritionist = {
  ...tinted("#3F8F4F", "#84CC16", "#F6FBF4", "#FFFFFF", "#1B2E1E", "#5F7A63", "#DFEEDD"),
  fonts: { display: f.dm, body: f.inter },
  heading: H(700, "-0.02em"), kicker: KICK("0.18em", 700), radius: "1.75rem", button: "pill",
  navVariant: "floating", heroVariant: "split", servicesVariant: "cards",
  teamVariant: "cards", galleryVariant: "grid", testimonialsVariant: "cards",
};
const makeupArtist = {
  ...tinted("#9D174D", "#F9A8D4", "#FFF8FB", "#FFFFFF", "#340B21", "#8A5A6E", "#F7DEE9"),
  fonts: { display: f.cormorant, body: f.poppins },
  heading: H(600, "0.02em"), kicker: KICK("0.34em", 500), radius: "2.25rem", button: "pill",
  navVariant: "floating", heroVariant: "center", servicesVariant: "rows",
  teamVariant: "arch", galleryVariant: "grid", testimonialsVariant: "spotlight",
};
const other = {
  ...light("#4F46E5", "#F59E0B", { bg: "#F8FAFC", line: "#E2E8F0" }),
  fonts: { display: f.grotesk, body: f.inter },
  heading: H(700, "-0.02em"), kicker: KICK("0.2em", 600), radius: "1.25rem", button: "soft",
  navVariant: "floating", heroVariant: "split", servicesVariant: "cards",
  teamVariant: "cards", galleryVariant: "grid", testimonialsVariant: "cards",
};

import { resolveDesigns, deriveSecondary, hexToHsl, hslToHex, contrast } from "./categoryDesigns.js";

/** Hand-tuned identities (the original 31). */
const HAND_TUNED = {
  clinic, hospital, dental,
  gym, fitness, yoga,
  cafe, bakery, restaurant,
  salon, spa, beauty,
  hotel, coaching, consultancy, "real-estate": realEstate, photography, travel,
  automobile, freelancer, interior, jewellery, ca: charteredAccountant, architect,
  "ac-repair": acRepair, cleaning, event: eventPlanner, caterer,
  nutritionist, makeup: makeupArtist, other,
};

/** Darken `fg` until it reaches `min` contrast on `bg` (light schemes only). */
const readable = (fg, bg, min) => {
  let [h, s, l] = hexToHsl(fg), out = fg, guard = 0;
  while (contrast(out, bg) < min && guard++ < 40) { l -= 1.5; out = hslToHex(h, s, l); }
  return out;
};

Object.values(HAND_TUNED).forEach((st) => {
  /* Give hand-tuned palettes a matching secondary so overlays/footers follow the brand colour. */
  if (!st.theme.secondary) st.theme.secondary = deriveSecondary(st.theme.primary);
  /* Keep light designs legible: muted copy ≥ 4.5:1, brand colour ≥ 3.4:1 on the page background. */
  if (st.scheme === "light" || st.scheme === "warm") {
    st.theme.muted = readable(st.theme.muted, st.theme.bg, 4.5);
    st.theme.primary = readable(st.theme.primary, st.theme.bg, 3.4);
  }
});

/**
 * Every category gets its own identity: the hand-tuned ones above, plus
 * generated designs for the rest (categoryDesigns.js) that are guaranteed not
 * to collide with them.
 */
export const CATEGORY_STYLES = {
  ...resolveDesigns(Object.values(HAND_TUNED).map((st) => st.theme.primary)),
  ...HAND_TUNED,
};

export const getCategoryStyle = (categoryId) => CATEGORY_STYLES[categoryId] || other;
