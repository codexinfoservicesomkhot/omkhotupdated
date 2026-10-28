import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CartContext, parsePrice, currencyOf } from "./cartContext.js";

const keyOf = (item) => `${item.category || ""}::${item.name}`;

/** Cart state with per-site persistence (localStorage, safely guarded). */
export default function CartProvider({ slug, enabled, preview, children }) {
  const [lines, setLines] = useState([]);
  const [open, setOpen] = useState(false);
  const storeKey = `cresite-cart:${slug || "site"}`;
  const loaded = useRef(false);

  useEffect(() => {
    if (!enabled || preview) { loaded.current = true; return; }
    try {
      const raw = window.localStorage.getItem(storeKey);
      if (raw) setLines(JSON.parse(raw));
    } catch { /* storage unavailable — cart just won't persist */ }
    loaded.current = true;
  }, [enabled, preview, storeKey]);

  useEffect(() => {
    if (!enabled || preview || !loaded.current) return;
    try { window.localStorage.setItem(storeKey, JSON.stringify(lines)); } catch { /* ignore */ }
  }, [lines, enabled, preview, storeKey]);

  const add = useCallback((item) => {
    const key = keyOf(item);
    setLines((ls) => {
      const found = ls.find((l) => l.key === key);
      if (found) return ls.map((l) => (l.key === key ? { ...l, qty: Math.min(l.qty + 1, 99) } : l));
      return [...ls, { key, name: item.name, price: item.price, image: item.image || "", icon: item.icon || "", qty: 1 }];
    });
  }, []);
  const setQty = useCallback((key, qty) => {
    setLines((ls) => (qty <= 0 ? ls.filter((l) => l.key !== key) : ls.map((l) => (l.key === key ? { ...l, qty: Math.min(qty, 99) } : l))));
  }, []);
  const remove = useCallback((key) => setLines((ls) => ls.filter((l) => l.key !== key)), []);
  const clear = useCallback(() => setLines([]), []);

  const value = useMemo(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const total = lines.reduce((n, l) => n + parsePrice(l.price) * l.qty, 0);
    return {
      enabled, lines, count, total, open,
      currency: currencyOf(lines[0]?.price),
      add, setQty, remove, clear, setOpen,
      qtyOf: (item) => lines.find((l) => l.key === keyOf(item))?.qty || 0,
    };
  }, [enabled, lines, open, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
