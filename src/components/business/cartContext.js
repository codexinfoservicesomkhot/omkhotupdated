import { createContext, useContext } from "react";

/**
 * Shopping-cart state for store templates. Lives above the sections so the
 * product grid, the floating cart button and the checkout drawer share it.
 */
export const CartContext = createContext(null);

const NOOP = {
  enabled: false, lines: [], count: 0, total: 0, currency: "₹", open: false,
  add() {}, setQty() {}, remove() {}, clear() {}, setOpen() {}, qtyOf: () => 0,
};
export const useCart = () => useContext(CartContext) || NOOP;

/** "₹1,299" → 1299 */
export const parsePrice = (v) => {
  const m = String(v ?? "").replace(/,/g, "").match(/\d+(?:\.\d+)?/);
  return m ? Number(m[0]) : 0;
};
/** Leading currency symbol of a price string, e.g. "₹499" → "₹" */
export const currencyOf = (v, fallback = "₹") => (String(v ?? "").trim().match(/^[^\d\s]+/) || [fallback])[0];
export const money = (n, cur = "₹") => `${cur}${Math.round(n).toLocaleString("en-IN")}`;
export const discountPct = (price, mrp) => {
  const p = parsePrice(price), m = parsePrice(mrp);
  return m > p && p > 0 ? Math.round(((m - p) / m) * 100) : 0;
};
