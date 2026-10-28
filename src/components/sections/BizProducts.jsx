import { useMemo, useState } from "react";
import { Search, ShoppingBag, Plus, Minus, Check } from "lucide-react";
import { useBiz } from "../business/bizContext.js";
import { useCart, discountPct } from "../business/cartContext.js";
import { Reveal, SectionShell, SectionHead, Stars } from "./primitives.jsx";
import { productTile } from "../../data/categoryArt.js";
import { getCategory } from "../../data/categories.js";
import { withAlpha } from "../../utils/businessUtils.js";

/** One product card: image / art tile, badges, price + MRP, add-to-cart. */
function ProductCard({ item, categoryIcon, delay }) {
  const { skin } = useBiz();
  const cart = useCart();
  const qty = cart.qtyOf(item);
  const off = discountPct(item.price, item.mrp);
  const radius = skin.button === "pill" ? 999 : skin.button === "sharp" ? 6 : 12;

  const img = useMemo(
    () => item.image || productTile(skin.theme, item.icon || categoryIcon, item.name),
    [item.image, item.icon, item.name, categoryIcon, skin.theme]
  );

  return (
    <Reveal delay={delay} className="h-full">
      <article
        className="group flex h-full flex-col overflow-hidden border transition-shadow duration-300 hover:shadow-xl"
        style={{ borderRadius: "var(--r)", background: "var(--card)", borderColor: "var(--line)" }}
      >
        <div className="relative aspect-[4/5] overflow-hidden" style={{ background: withAlpha(skin.theme.muted, 0.08) }}>
          <img
            src={img}
            alt={item.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          {item.tag && (
            <span
              className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em]"
              style={{ background: "var(--p)", color: "var(--onp)" }}
            >
              {item.tag}
            </span>
          )}
          {off > 0 && (
            <span
              className="absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold"
              style={{ background: "var(--a)", color: "var(--ona)" }}
            >
              {off}% OFF
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <h3 className="text-[14.5px] font-semibold leading-snug" style={{ fontFamily: skin.fonts.display }}>
            {item.name}
          </h3>
          {item.description && <p className="mt-1 line-clamp-2 text-[12.5px] leading-relaxed text-[var(--muted)]">{item.description}</p>}
          {item.rating > 0 && (
            <div className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-[var(--muted)]">
              <Stars n={Math.round(item.rating)} size={12} /> {Number(item.rating).toFixed(1)}
            </div>
          )}

          <div className="mt-auto pt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-[17px] font-extrabold" style={{ color: "var(--p)" }}>{item.price}</span>
              {item.mrp && off > 0 && <span className="text-[12.5px] text-[var(--muted)] line-through">{item.mrp}</span>}
            </div>

            {qty === 0 ? (
              <button
                type="button"
                onClick={() => cart.add(item)}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 py-2.5 text-[13px] font-semibold transition hover:opacity-90 active:scale-[0.98]"
                style={{ background: "var(--p)", color: "var(--onp)", borderRadius: radius }}
              >
                <ShoppingBag size={15} /> Add to cart
              </button>
            ) : (
              <div
                className="mt-3 flex items-center justify-between border px-1.5 py-1"
                style={{ borderColor: "var(--p)", borderRadius: radius }}
              >
                <button type="button" aria-label="Decrease quantity" onClick={() => cart.setQty(`${item.category || ""}::${item.name}`, qty - 1)} className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-black/5">
                  <Minus size={15} />
                </button>
                <span className="inline-flex items-center gap-1.5 text-[13px] font-bold">
                  <Check size={13} style={{ color: "var(--p)" }} /> {qty} in cart
                </span>
                <button type="button" aria-label="Increase quantity" onClick={() => cart.add(item)} className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-black/5">
                  <Plus size={15} />
                </button>
              </div>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/** Storefront grid with category chips + search — store family. */
export default function BizProducts() {
  const { business, skin } = useBiz();
  const [active, setActive] = useState("All");
  const [q, setQ] = useState("");

  const groups = (business.products || []).filter((g) => g.items?.length);
  const catIcon = getCategory(business.category).icon;

  const all = useMemo(
    () => groups.flatMap((g) => g.items.map((it) => ({ ...it, category: g.category }))),
    [groups]
  );
  if (!all.length) return null;

  const needle = q.trim().toLowerCase();
  const shown = all.filter(
    (it) =>
      (active === "All" || it.category === active) &&
      (!needle || `${it.name} ${it.description || ""} ${it.category}`.toLowerCase().includes(needle))
  );

  const chip = (label, count) => {
    const on = active === label;
    return (
      <button
        key={label}
        type="button"
        onClick={() => setActive(label)}
        className="whitespace-nowrap px-4 py-2 text-[12.5px] font-semibold transition"
        style={{
          borderRadius: 999,
          background: on ? "var(--p)" : "var(--card)",
          color: on ? "var(--onp)" : "var(--ink)",
          border: `1px solid ${on ? "var(--p)" : "var(--line)"}`,
        }}
      >
        {label} <span className="opacity-60">· {count}</span>
      </button>
    );
  };

  return (
    <SectionShell id="products" tone="base">
      <SectionHead id="products" />

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {chip("All", all.length)}
          {groups.map((g) => chip(g.category, g.items.length))}
        </div>
        <label
          className="flex items-center gap-2 border px-4 py-2.5 md:w-72"
          style={{ borderRadius: 999, background: "var(--card)", borderColor: "var(--line)" }}
        >
          <Search size={15} className="text-[var(--muted)]" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products"
            className="w-full bg-transparent text-[13px] outline-none placeholder:text-[var(--muted)]"
            aria-label="Search products"
          />
        </label>
      </div>

      {shown.length ? (
        <div className="grid grid-cols-2 gap-3.5 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {shown.map((it, i) => (
            <ProductCard key={`${it.category}-${it.name}-${i}`} item={it} categoryIcon={catIcon} delay={(i % 4) * 0.05} />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-sm text-[var(--muted)]">No products match “{q}”. Try a different word or category.</p>
      )}
      <span className="sr-only">{skin.name}</span>
    </SectionShell>
  );
}
