import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, X, Plus, Minus, Trash2, MessageCircle, Phone } from "lucide-react";
import { useBiz } from "./bizContext.js";
import { useCart, money, parsePrice } from "./cartContext.js";
import { productTile } from "../../data/categoryArt.js";
import { getCategory } from "../../data/categories.js";
import { onlyDigits, telLink, waLink } from "../../utils/businessUtils.js";

/** Floating cart button + slide-over checkout (orders are sent on WhatsApp). */
export default function CartDrawer() {
  const { business, skin, preview } = useBiz();
  const cart = useCart();
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [missing, setMissing] = useState(false);

  const catIcon = getCategory(business.category).icon;
  const wa = business.contact?.whatsapp || business.social?.whatsapp || business.contact?.phone || "";
  const phone = business.contact?.phone || "";
  const radius = skin.button === "pill" ? 999 : skin.button === "sharp" ? 6 : 14;

  const message = useMemo(() => {
    const lines = cart.lines.map((l, i) => `${i + 1}. ${l.name} × ${l.qty} — ${money(parsePrice(l.price) * l.qty, cart.currency)}`);
    const details = [
      form.name && `Name: ${form.name}`,
      form.phone && `Phone: ${form.phone}`,
      form.address && `Delivery address: ${form.address}`,
    ].filter(Boolean);
    return [
      `Hi ${business.name}! I'd like to place an order:`,
      "",
      ...lines,
      "",
      `Total: ${money(cart.total, cart.currency)}`,
      ...(details.length ? ["", ...details] : []),
    ].join("\n");
  }, [cart.lines, cart.total, cart.currency, business.name, form]);

  if (!cart.enabled) return null;

  const place = () => {
    if (!form.name.trim() || onlyDigits(form.phone).length < 8) { setMissing(true); return; }
    setMissing(false);
    if (!preview && wa) window.open(waLink(wa, message), "_blank", "noopener");
  };

  const input = "w-full border bg-transparent px-3.5 py-2.5 text-[13px] outline-none transition focus:border-[var(--p)]";
  const inputStyle = { borderColor: "var(--line)", borderRadius: 12 };

  return (
    <>
      <button
        type="button"
        onClick={() => cart.setOpen(true)}
        aria-label={`Open cart, ${cart.count} items`}
        className="fixed z-40 inline-flex items-center gap-2.5 px-4 py-3 text-[13px] font-bold shadow-xl transition hover:-translate-y-0.5"
        style={{
          left: "max(1.25rem, env(safe-area-inset-left, 0px))",
          bottom: "max(1.25rem, env(safe-area-inset-bottom, 0px))",
          background: "var(--p)", color: "var(--onp)", borderRadius: 999,
        }}
      >
        <ShoppingBag size={17} />
        {cart.count > 0 ? `${cart.count} item${cart.count > 1 ? "s" : ""} · ${money(cart.total, cart.currency)}` : "Cart"}
      </button>

      <AnimatePresence>
        {cart.open && (
          <>
            <motion.div
              key="scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px]" onClick={() => cart.setOpen(false)}
            />
            <motion.aside
              key="drawer" role="dialog" aria-label="Shopping cart"
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", duration: 0.28 }}
              className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col shadow-2xl"
              style={{ background: "var(--bg)", color: "var(--ink)", fontFamily: skin.fonts.body }}
            >
              <header className="flex items-center justify-between border-b px-5 py-4" style={{ borderColor: "var(--line)" }}>
                <h2 className="text-lg font-bold" style={{ fontFamily: skin.fonts.display }}>Your cart</h2>
                <button type="button" aria-label="Close cart" onClick={() => cart.setOpen(false)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-black/5">
                  <X size={18} />
                </button>
              </header>

              {cart.lines.length === 0 ? (
                <div className="grid flex-1 place-items-center px-8 text-center">
                  <div>
                    <ShoppingBag size={38} className="mx-auto text-[var(--muted)]" />
                    <p className="mt-3 text-sm font-semibold">Your cart is empty</p>
                    <p className="mt-1 text-[13px] text-[var(--muted)]">Add something you like and it will show up here.</p>
                  </div>
                </div>
              ) : (
                <>
                  <ul className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
                    {cart.lines.map((l) => (
                      <li key={l.key} className="flex gap-3 border p-2.5" style={{ borderColor: "var(--line)", borderRadius: 16, background: "var(--card)" }}>
                        <img src={l.image || productTile(skin.theme, l.icon || catIcon, l.name)} alt="" className="h-20 w-16 shrink-0 rounded-xl object-cover" />
                        <div className="flex min-w-0 flex-1 flex-col">
                          <p className="truncate text-[13.5px] font-semibold">{l.name}</p>
                          <p className="text-[12.5px] text-[var(--muted)]">{l.price}</p>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="inline-flex items-center gap-1 border px-1" style={{ borderColor: "var(--line)", borderRadius: 999 }}>
                              <button type="button" aria-label="Decrease" onClick={() => cart.setQty(l.key, l.qty - 1)} className="grid h-7 w-7 place-items-center rounded-full hover:bg-black/5"><Minus size={13} /></button>
                              <span className="w-5 text-center text-[13px] font-bold">{l.qty}</span>
                              <button type="button" aria-label="Increase" onClick={() => cart.setQty(l.key, l.qty + 1)} className="grid h-7 w-7 place-items-center rounded-full hover:bg-black/5"><Plus size={13} /></button>
                            </div>
                            <span className="text-[13.5px] font-bold">{money(parsePrice(l.price) * l.qty, cart.currency)}</span>
                          </div>
                        </div>
                        <button type="button" aria-label={`Remove ${l.name}`} onClick={() => cart.remove(l.key)} className="self-start p-1 text-[var(--muted)] hover:text-red-500">
                          <Trash2 size={15} />
                        </button>
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-3 border-t px-5 py-4" style={{ borderColor: "var(--line)" }}>
                    <div className="grid grid-cols-2 gap-2.5">
                      <input className={input} style={inputStyle} placeholder="Your name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                      <input className={input} style={inputStyle} placeholder="Phone *" inputMode="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                    </div>
                    <textarea className={`${input} resize-none`} style={inputStyle} rows={2} placeholder="Delivery address (or write “store pickup”)" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                    {missing && <p className="text-[12px] font-semibold text-red-600">Please add your name and a valid phone number.</p>}

                    <div className="flex items-baseline justify-between pt-1">
                      <span className="text-[13px] text-[var(--muted)]">Subtotal</span>
                      <span className="text-xl font-extrabold">{money(cart.total, cart.currency)}</span>
                    </div>
                    <p className="text-[11.5px] leading-relaxed text-[var(--muted)]">Delivery charges and payment (UPI / cash on delivery) are confirmed with the store on WhatsApp.</p>

                    {wa ? (
                      <button type="button" onClick={place} className="inline-flex w-full items-center justify-center gap-2 py-3.5 text-sm font-bold text-white transition hover:brightness-105" style={{ background: "#25D366", borderRadius: radius }}>
                        <MessageCircle size={17} /> Place order on WhatsApp
                      </button>
                    ) : phone ? (
                      <a href={telLink(phone)} className="inline-flex w-full items-center justify-center gap-2 py-3.5 text-sm font-bold" style={{ background: "var(--p)", color: "var(--onp)", borderRadius: radius }}>
                        <Phone size={16} /> Call to order
                      </a>
                    ) : (
                      <p className="rounded-xl bg-amber-50 p-3 text-[12px] text-amber-800">Add a WhatsApp or phone number in the Contact section so customers can send orders.</p>
                    )}
                    <button type="button" onClick={cart.clear} className="w-full text-center text-[12px] font-semibold text-[var(--muted)] hover:underline">Clear cart</button>
                  </div>
                </>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
