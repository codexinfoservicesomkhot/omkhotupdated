/**
 * Audit: every category has a unique, readable design.
 * Run: node scripts/check-designs.mjs   (exits 1 on failure)
 */
import { CATEGORIES } from "../src/data/categories.js";
import { CATEGORY_STYLES } from "../src/data/categoryStyles.js";
import { deltaE, contrast } from "../src/data/categoryDesigns.js";

const errs = [];
const ids = CATEGORIES.map((c) => c.id);
ids.forEach((id) => { if (!CATEGORY_STYLES[id]) errs.push(`no style: ${id}`); });

// 1. perceptual colour distance between every pair of primaries
let minDE = 999, minPair = "";
for (let i = 0; i < ids.length; i++) for (let j = i + 1; j < ids.length; j++) {
  const a = CATEGORY_STYLES[ids[i]], b = CATEGORY_STYLES[ids[j]];
  if (!a || !b) continue;
  const d = deltaE(a.theme.primary, b.theme.primary);
  if (d < minDE) { minDE = d; minPair = `${ids[i]} / ${ids[j]}`; }
  if (d < 8.5) errs.push(`colour clash ${ids[i]} ~ ${ids[j]} (ΔE ${d.toFixed(1)})`);
}

// 2. whole-design signature must be unique
const sig = {};
ids.forEach((id) => {
  const s = CATEGORY_STYLES[id]; if (!s) return;
  const k = [s.theme.primary, s.theme.bg, s.fonts.display, s.fonts.body, s.heroVariant, s.servicesVariant, s.teamVariant, s.galleryVariant, s.navVariant, s.testimonialsVariant, s.radius, s.button].join("|");
  (sig[k] ??= []).push(id);
});
Object.values(sig).filter((v) => v.length > 1).forEach((v) => errs.push(`identical design: ${v.join(", ")}`));

// 3. layout + display-font combos shouldn't repeat inside the same palette family
const lay = {};
ids.forEach((id) => {
  const s = CATEGORY_STYLES[id]; if (!s) return;
  const k = [s.scheme, s.fonts.display, s.navVariant, s.heroVariant, s.servicesVariant, s.teamVariant, s.galleryVariant, s.testimonialsVariant].join("|");
  (lay[k] ??= []).push(id);
});
const layoutRepeats = Object.values(lay).filter((v) => v.length > 1);

// 4. readability
ids.forEach((id) => {
  const t = CATEGORY_STYLES[id]?.theme; if (!t) return;
  const chk = (name, a, b, min) => { const c = contrast(a, b); if (c < min) errs.push(`${id}: ${name} contrast ${c.toFixed(2)} < ${min}`); };
  chk("ink/bg", t.ink, t.bg, 7);
  chk("ink/card", t.ink, t.card, 7);
  chk("muted/bg", t.muted, t.bg, 4.2);
  chk("primary/bg", t.primary, t.bg, 3.4);
});

console.log(`categories: ${ids.length} · min primary ΔE: ${minDE.toFixed(1)} (${minPair}) · layout+font repeats: ${layoutRepeats.length}`);
if (errs.length) { console.log(errs.slice(0, 60).join("\n")); console.log(`${errs.length} problem(s)`); process.exit(1); }
console.log("OK — all designs unique and readable");
