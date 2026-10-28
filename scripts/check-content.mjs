/**
 * Audit: every category has complete, bespoke, non-duplicated content.
 * Run: node scripts/check-content.mjs   (exits 1 on failure)
 */
import * as Lucide from "lucide-react";
import { CATEGORIES } from "../src/data/categories.js";
import { CATEGORY_CONTENT, ORDER_PRESETS } from "../src/data/categoryContent.js";
import { AI_CONTENT_PACKS } from "../src/data/aiContentPacks.js";

const errs = [], warns = [];
const ids = CATEGORIES.map((c) => c.id);
const extra = Object.keys(CATEGORY_CONTENT).filter((k) => !ids.includes(k));
if (extra.length) errs.push(`content for unknown categories: ${extra.join(", ")}`);

const count = {};
const bump = (k, id) => ((count[k] ??= new Set()).add(id));

for (const id of ids) {
  const c = CATEGORY_CONTENT[id];
  if (!c) { errs.push(`${id}: no content entry`); continue; }
  const need = (cond, msg) => { if (!cond) errs.push(`${id}: ${msg}`); };
  need(typeof c.cta === "string" && c.cta.length > 3, "missing cta label");
  need(Array.isArray(c.h) && (c.h.length === 8 || c.h.length === 10) && c.h.every((x) => x && x.length > 3), "h needs 8 (or 10 for stores) strings");
  if (CATEGORIES.find((x) => x.id === id).template === "store") {
    need(c.p?.length >= 3 && c.p.every((g) => g[1].length >= 3), "store needs ≥3 product groups of ≥3 items");
    (c.p || []).forEach((g) => g[1].forEach((it) => { if (!Lucide[it[5]]) errs.push(`${id}: unknown product icon "${it[5]}"`); if (!/^₹/.test(it[2])) errs.push(`${id}: price "${it[2]}" should start with ₹`); }));
  }
  need(c.o in ORDER_PRESETS, `bad order preset ${c.o}`);
  need(c.f?.length === 4, "need 4 features");
  need(c.t?.length >= 2, "need ≥2 testimonials");
  need(c.q?.length >= 3, "need ≥3 faqs");
  need(c.s?.length === 3, "need 3 stats");
  need(c.m?.length >= 1, "need ≥1 team member");
  need(Array.isArray(c.cb) && c.cb.length === 2, "need cta banner [title, sub]");
  if (!AI_CONTENT_PACKS[id] || c.sv) {
    if (!AI_CONTENT_PACKS[id]) {
      const isStore = CATEGORIES.find((x) => x.id === id).template === "store";
      need(isStore || c.sv?.length >= 5, "no base pack → need ≥5 services");
      need(c.tag && c.about && c.hrs?.length, "no base pack → need tag, about, hrs");
    }
  }
  [...(c.f || []), ...(c.sv || [])].forEach((r) => { if (!Lucide[r[0]]) errs.push(`${id}: unknown lucide icon "${r[0]}"`); });
  (c.q || []).forEach(([q, a]) => {
    if (!q.endsWith("?") || q.length < 16) warns.push(`${id}: terse FAQ question "${q}"`);
    if (a.length < 18) warns.push(`${id}: terse FAQ answer for "${q}"`);
  });
  (c.t || []).forEach(([, , text]) => { if (text.length < 30) warns.push(`${id}: short testimonial "${text}"`); bump("t:" + text, id); });
  (c.q || []).forEach(([q]) => bump("q:" + q, id));
  (c.f || []).forEach(([, title]) => bump("f:" + title, id));
  (c.m || []).forEach(([name]) => bump("m:" + name, id));
}
// Testimonials must never repeat; FAQ questions & feature titles may only overlap rarely.
for (const [k, set] of Object.entries(count)) {
  if (k.startsWith("t:") && set.size > 1) errs.push(`duplicate testimonial in ${[...set].join(", ")}: ${k.slice(2, 60)}`);
  if (k.startsWith("q:") && set.size > 1) warns.push(`shared FAQ question (${[...set].join(", ")}): ${k.slice(2)}`);
  if (k.startsWith("f:") && set.size > 2) warns.push(`feature title used by ${set.size} categories: ${k.slice(2)}`);
}
console.log(`categories: ${ids.length} · with content: ${ids.filter((i) => CATEGORY_CONTENT[i]).length}`);
console.log(`warnings: ${warns.length}`);
if (process.argv.includes("-v")) console.log(warns.join("\n"));
if (errs.length) { console.log(errs.slice(0, 80).join("\n")); console.log(`${errs.length} error(s)`); process.exit(1); }
console.log("OK — content complete");
