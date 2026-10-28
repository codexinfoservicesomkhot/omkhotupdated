import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, X, ArrowLeft, ArrowUpRight, LayoutGrid } from "lucide-react";
import PlatformNav from "../components/common/PlatformNav.jsx";
import BizIcon from "../components/common/BizIcon.jsx";
import { CATEGORIES } from "../data/categories.js";
import { templateForCategory } from "../templates/registry.js";
import { withAlpha, setPageMeta, setLetterFavicon, DEFAULT_META } from "../utils/businessUtils.js";
import { useEffect } from "react";

/**
 * /categories — the full browsable catalog of all business categories.
 * Searchable, filterable by letter, and links directly into the builder.
 */
export default function Categories() {
  const [query, setQuery] = useState("");
  const [letter, setLetter] = useState("all");

  useEffect(() => {
    setPageMeta({
      title: `All Business Categories | ${CATEGORIES.filter((c) => c.id !== "other").length}+ Templates`,
      description: "Browse every business category Cresite supports — clinics, gyms, salons, restaurants, tutors, plumbers and 150+ more.",
      themeColor: "#5046E5",
    });
    setLetterFavicon("C", "#5046E5");
  }, []);

  const all = useMemo(() => CATEGORIES.filter((c) => c.id !== "other"), []);

  const letters = useMemo(() => {
    const set = new Set(all.map((c) => c.label[0].toUpperCase()));
    return ["all", ...[...set].sort()];
  }, [all]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return all.filter((c) => {
      if (letter !== "all" && c.label[0].toUpperCase() !== letter) return false;
      if (!q) return true;
      return (
        c.label.toLowerCase().includes(q) ||
        c.id.replace(/-/g, " ").includes(q) ||
        c.blurb.toLowerCase().includes(q)
      );
    });
  }, [all, query, letter]);

  /* Group by first letter for a clean directory layout */
  const grouped = useMemo(() => {
    const map = {};
    filtered.forEach((c) => {
      const L = c.label[0].toUpperCase();
      if (!map[L]) map[L] = [];
      map[L].push(c);
    });
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  return (
    <div className="min-h-screen bg-[#F6F5F1] text-[#101014]">
      <PlatformNav />

      <main className="mx-auto max-w-7xl px-5 pb-24 pt-28 sm:px-8 sm:pt-36">
        {/* Header */}
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-indigo-600">
            <LayoutGrid size={13} /> All Categories
          </span>
          <h1 className="mt-4 text-balance font-display text-3xl font-bold tracking-tight sm:text-[2.6rem] sm:leading-tight">
            {all.length} business categories,{" "}
            <span className="font-accent-serif italic text-[#5046E5]">one for you</span>
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-[#55555E]">
            Every category gets its own design language — colours, fonts, layouts and sections crafted
            for how that business actually sells. Pick yours and start building.
          </p>
        </div>

        {/* Search + letter filter */}
        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#A1A1AA]" />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setLetter("all"); }}
              placeholder="Search categories — try “dental”, “tiffin”, “welding”…"
              className="w-full rounded-2xl border-2 border-black/10 bg-white py-3.5 pl-12 pr-11 text-[15px] font-medium shadow-sm outline-none transition placeholder:font-normal placeholder:text-black/25 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-black/5 text-[#77777F] transition hover:bg-black/10"
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Letter chips */}
          <div className="no-scrollbar flex gap-1.5 overflow-x-auto pb-1 lg:pb-0">
            {letters.map((L) => (
              <button
                key={L}
                onClick={() => { setLetter(L); if (L !== "all") setQuery(""); }}
                className={`shrink-0 rounded-full px-3.5 py-2 text-[12.5px] font-bold transition ${
                  letter === L
                    ? "bg-[#101014] text-white shadow"
                    : "bg-white text-[#77777F] hover:bg-black/5 hover:text-[#101014]"
                }`}
              >
                {L === "all" ? "All" : L}
              </button>
            ))}
          </div>
        </div>

        {/* Result count */}
        <p className="mt-5 text-[13px] font-semibold text-[#77777F]">
          {filtered.length === all.length
            ? `All ${all.length} categories`
            : `${filtered.length} ${filtered.length === 1 ? "category" : "categories"} ${query ? `matching “${query}”` : `starting with “${letter}””`}`}
        </p>

        {/* Grouped grid */}
        {filtered.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-black/15 bg-white p-16 text-center">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-indigo-50 text-indigo-500">
              <Search size={22} />
            </span>
            <p className="mt-4 font-display text-[16px] font-bold">No categories found</p>
            <p className="mx-auto mt-2 max-w-sm text-[13px] leading-relaxed text-[#77777F]">
              Try a different search term, or pick “Other Business” when you start building — our general
              template adapts to any trade.
            </p>
            <Link
              to="/create"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#5046E5] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#4338CA]"
            >
              Start with a general template <ArrowUpRight size={15} />
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-10">
            {grouped.map(([L, items]) => (
              <div key={L}>
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#101014] font-display text-[15px] font-bold text-white">
                    {L}
                  </span>
                  <span className="h-px flex-1 bg-black/10" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#A1A1AA]">
                    {items.length} {items.length === 1 ? "category" : "categories"}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {items.map((c, i) => {
                    const tpl = templateForCategory(c.id);
                    return (
                      <motion.div
                        key={c.id}
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.35, delay: (i % 5) * 0.04 }}
                      >
                        <Link
                          to={`/create?category=${c.id}`}
                          className="group flex h-full flex-col rounded-2xl border border-black/10 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-500/10"
                        >
                          <span
                            className="mb-4 grid h-11 w-11 place-items-center rounded-xl transition-colors group-hover:bg-[#5046E5] group-hover:text-white"
                            style={{
                              background: withAlpha(tpl.theme.primary, 0.1),
                              color: tpl.theme.primary,
                            }}
                          >
                            <BizIcon name={c.icon} size={19} />
                          </span>
                          <span className="font-display text-[14.5px] font-bold leading-snug">{c.label}</span>
                          <span className="mt-1 text-[12px] leading-snug text-[#77777F]">{c.blurb}</span>
                          <span className="mt-3 inline-flex items-center gap-1 text-[11.5px] font-bold opacity-0 transition-all duration-300 group-hover:opacity-100" style={{ color: tpl.theme.primary }}>
                            Build now <ArrowUpRight size={12} />
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 rounded-[2rem] bg-[#101014] px-8 py-14 text-center text-white sm:px-12">
          <h2 className="mx-auto max-w-xl text-balance font-display text-2xl font-bold sm:text-3xl">
            Don't see your exact trade?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-white/60">
            Pick the closest category or “Other Business” — every template is fully editable so your
            site looks nothing like anyone else's.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to="/create"
              className="inline-flex items-center gap-2 rounded-full bg-[#5046E5] px-7 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#4338CA]"
            >
              Create Your Website
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-bold text-white transition hover:border-white/40"
            >
              <ArrowLeft size={15} /> Back to home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
