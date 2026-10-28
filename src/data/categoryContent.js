/**
 * Bespoke per-category content, merged from the sector files in ./content/.
 * Imported by the template registry (section copy / order / CTA label) and the
 * AI content generator (features, reviews, FAQs, stats, team, services…).
 */
import { AUTOMOTIVE } from "./content/automotive.js";
import { REPAIRS } from "./content/repairs.js";
import { HOME_TRADES } from "./content/homeTrades.js";
import { EVENTS_FOOD } from "./content/eventsFood.js";
import { HEALTH_BEAUTY } from "./content/healthBeauty.js";
import { EDUCATION } from "./content/education.js";
import { PROFESSIONAL } from "./content/professional.js";
import { CREATIVE_RETAIL } from "./content/creativeRetail.js";
import { AGRI_INDUSTRIAL } from "./content/agriIndustrial.js";
import { STORES } from "./content/stores.js";

export const CATEGORY_CONTENT = {
  ...AUTOMOTIVE, ...REPAIRS, ...HOME_TRADES, ...EVENTS_FOOD, ...HEALTH_BEAUTY,
  ...EDUCATION, ...PROFESSIONAL, ...CREATIVE_RETAIL, ...AGRI_INDUSTRIAL, ...STORES,
};

/**
 * Section order presets — what each kind of business leads with.
 * Section ids not listed keep their natural place after the listed ones.
 */
export const ORDER_PRESETS = {
  standard: null,
  visual: ["products", "gallery", "about", "services", "menu", "features", "testimonials", "team", "pricing", "faq", "hours"],
  proof: ["products", "features", "services", "testimonials", "about", "gallery", "team", "menu", "pricing", "faq", "hours"],
  shop: ["products", "services", "gallery", "features", "about", "testimonials", "menu", "team", "pricing", "faq", "hours"],
  story: ["products", "about", "gallery", "services", "menu", "testimonials", "features", "team", "pricing", "faq", "hours"],
};
