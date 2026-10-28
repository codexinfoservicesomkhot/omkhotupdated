import React from "react";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import BusinessWebsite from "../src/components/business/BusinessWebsite.jsx";
import { generateBusinessDraft } from "../src/services/aiGenerator.js";
import { parsePrice, discountPct, money, currencyOf } from "../src/components/business/cartContext.js";
import { templateForCategory, editorsFor } from "../src/templates/registry.js";
const assert = (c, m) => { if (!c) { console.error("FAIL:", m); process.exitCode = 1; } else console.log("ok  ", m); };
assert(parsePrice("₹1,299") === 1299 && parsePrice("") === 0 && parsePrice("Rs. 499.50") === 499.5, "parsePrice");
assert(discountPct("₹549", "₹799") === 31 && discountPct("₹499", "") === 0, "discountPct");
assert(money(2999, "₹") === "₹2,999" && currencyOf("₹349") === "₹", "money/currency");
for (const id of ["cosmetics-store", "clothing-store"]) {
  const t = templateForCategory(id);
  assert(t.id === "store" && t.sections.some((s) => s.id === "products") && t.ctaTarget === "products", `${id}: store template + CTA → products`);
  assert(editorsFor(id).products === true, `${id}: dashboard shows Products editor`);
  const d = generateBusinessDraft({ name: "Glow Beauty", category: id, address: "MG Road, Kolhapur", phone: "9876543210" });
  const n = d.products.reduce((a, g) => a + g.items.length, 0);
  assert(d.products.length >= 3 && n >= 12 && d.products[0].items[0].price.startsWith("₹"), `${id}: draft has ${d.products.length} groups / ${n} products`);
  const html = renderToString(React.createElement(MemoryRouter, null, React.createElement(BusinessWebsite, { business: { ...d, slug: "x", category: id, published: true } })));
  assert(html.includes("Add to cart") && html.includes("Search products") && html.includes("% OFF") && html.includes("Cart"), `${id}: renders grid, search, discount badges, cart button`);
  assert(html.includes('id="products"') && html.indexOf('id="products"') < html.indexOf('id="about"'), `${id}: shop section leads the page`);
}
