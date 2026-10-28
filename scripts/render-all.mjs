import React from "react";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import BusinessWebsite from "../src/components/business/BusinessWebsite.jsx";
import { generateBusinessDraft } from "../src/services/aiGenerator.js";
import { CATEGORIES } from "../src/data/categories.js";
globalThis.window = undefined;
let ok = 0, bad = [];
const sizes = [];
for (const c of CATEGORIES) {
  try {
    const draft = generateBusinessDraft({ name: "Sample " + c.label, category: c.id, address: "Main Road, Kolhapur", phone: "9876543210" });
    const biz = { ...draft, slug: "sample", category: c.id, published: true };
    const html = renderToString(React.createElement(MemoryRouter, null, React.createElement(BusinessWebsite, { business: biz })));
    sizes.push(html.length);
    if (!html.includes("data:image/svg+xml") && !/pexels|cloudinary/.test(html)) bad.push(c.id + ": no imagery");
    ok++;
  } catch (e) { bad.push(c.id + ": " + e.message.split("\n")[0]); }
}
console.log("rendered", ok, "of", CATEGORIES.length, "| problems:", bad.slice(0, 15));
