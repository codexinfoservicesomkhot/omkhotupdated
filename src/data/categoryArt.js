/**
 * Category artwork.
 *
 * Every category gets its own hero / about / gallery imagery, composed from
 *  - the category's palette (so art always matches the template colours),
 *  - the trade's own icons (pest-control → bug + shield, plumber → wrench + droplets…),
 *  - one of six scene compositions, chosen per category so neighbours differ.
 *
 * Output is a self-contained SVG data-URI: no network, instantly responsive
 * (object-cover friendly), and it can be replaced any time by uploading a photo
 * (a real image always wins — see BusinessWebsite.jsx).
 */
import { GLYPHS } from "./artGlyphs.js";

/** Set to false to hide placeholder art in the gallery until real photos are uploaded. */
export const ART_GALLERY_FALLBACK = true;

/* ----------------------------- utilities ----------------------------- */
function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const num = (n) => Math.round(n * 10) / 10;

function mix(a, b, t) {
  const pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16);
  const ch = (s) => Math.round(((pa >> s) & 255) * (1 - t) + ((pb >> s) & 255) * t);
  return `#${[16, 8, 0].map((s) => ch(s).toString(16).padStart(2, "0")).join("")}`;
}
const isDark = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return 0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255) < 120;
};

/** Draw a lucide glyph centred at (cx, cy) with the given pixel size. */
function glyph(name, cx, cy, size, { stroke = "#fff", width = 1.6, opacity = 1, rotate = 0 } = {}) {
  const inner = GLYPHS[name] || GLYPHS.Sparkles;
  const k = size / 24;
  const rot = rotate ? ` rotate(${rotate} 12 12)` : "";
  return `<g transform="translate(${num(cx - size / 2)} ${num(cy - size / 2)}) scale(${num(k)})${rot}" fill="none" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" opacity="${opacity}">${inner}</g>`;
}

const W = 1200, H = 800;
const wrap = (body, defs = "") =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice"><defs>${defs}</defs>${body}</svg>`;
const uri = (svg) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

/* ------------------------------- scenes ------------------------------- */
/** Each scene: (palette, icons[], random) → svg string. icons[0] is the hero glyph. */

function orbit(p, icons, r) {
  const cx = W * (0.5 + (r() - 0.5) * 0.12), cy = H * 0.5;
  let rings = "";
  for (let i = 1; i <= 5; i++) rings += `<circle cx="${cx}" cy="${cy}" r="${70 + i * 82}" fill="none" stroke="${p.light}" stroke-opacity="${num(0.22 - i * 0.03)}" stroke-width="${i % 2 ? 2 : 1}"/>`;
  let sats = "";
  const n = Math.min(icons.length - 1, 5);
  for (let i = 0; i < n; i++) {
    const a = (Math.PI * 2 * i) / n + r() * 0.6, rad = 150 + (i % 3) * 82;
    const x = cx + Math.cos(a) * rad * 1.35, y = cy + Math.sin(a) * rad * 0.9;
    sats += `<circle cx="${num(x)}" cy="${num(y)}" r="46" fill="${p.card}" fill-opacity="0.92"/>${glyph(icons[i + 1], x, y, 44, { stroke: p.primary, width: 1.7 })}`;
  }
  return wrap(
    `<rect width="${W}" height="${H}" fill="url(#g)"/>${rings}
     <circle cx="${cx}" cy="${cy}" r="132" fill="${p.card}" fill-opacity="0.14"/>
     <circle cx="${cx}" cy="${cy}" r="98" fill="${p.card}" fill-opacity="0.96"/>
     ${glyph(icons[0], cx, cy, 120, { stroke: p.primary, width: 1.5 })}${sats}`,
    `<radialGradient id="g" cx="50%" cy="50%" r="75%"><stop offset="0" stop-color="${p.primary}"/><stop offset="1" stop-color="${p.secondary}"/></radialGradient>`
  );
}

function pattern(p, icons, r) {
  let tiles = "";
  const cols = 9, rows = 6, gx = W / cols, gy = H / rows;
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
    const ic = icons[(x + y * 2) % icons.length];
    tiles += glyph(ic, gx * (x + 0.5) + (y % 2) * gx * 0.5, gy * (y + 0.5), 52, { stroke: p.light, width: 1.4, opacity: 0.16 });
  }
  const cx = W * (0.5 + (r() - 0.5) * 0.2), cy = H * 0.5;
  return wrap(
    `<rect width="${W}" height="${H}" fill="url(#g)"/><g transform="rotate(-10 ${W / 2} ${H / 2})">${tiles}</g>
     <circle cx="${cx}" cy="${cy}" r="190" fill="${p.accent}" fill-opacity="0.95"/>
     <circle cx="${cx}" cy="${cy}" r="226" fill="none" stroke="${p.light}" stroke-opacity="0.5" stroke-width="3" stroke-dasharray="4 14"/>
     ${glyph(icons[0], cx, cy, 200, { stroke: p.onAccent, width: 1.4 })}`,
    `<linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${p.primary}"/><stop offset="1" stop-color="${p.secondary}"/></linearGradient>`
  );
}

function horizon(p, icons, r) {
  const sx = W * (0.25 + r() * 0.5);
  const wave = (y, amp, col, o) =>
    `<path d="M0 ${y} C ${W * 0.2} ${y - amp}, ${W * 0.35} ${y + amp}, ${W * 0.55} ${y} S ${W * 0.85} ${y - amp}, ${W} ${y} V ${H} H0 Z" fill="${col}" fill-opacity="${o}"/>`;
  return wrap(
    `<rect width="${W}" height="${H}" fill="url(#g)"/>
     <circle cx="${num(sx)}" cy="300" r="150" fill="${p.light}" fill-opacity="0.22"/>
     <circle cx="${num(sx)}" cy="300" r="96" fill="${p.light}" fill-opacity="0.4"/>
     ${wave(470, 44, p.secondary, 0.35)}${wave(540, 54, p.secondary, 0.55)}${wave(620, 40, p.secondary, 0.85)}${wave(700, 26, p.secondary, 1)}
     ${glyph(icons[0], W * 0.5, 330, 250, { stroke: p.light, width: 1.3 })}
     ${icons.slice(1, 4).map((ic, i) => glyph(ic, W * (0.2 + i * 0.3), 640 + (i % 2) * 22, 64, { stroke: p.light, width: 1.6, opacity: 0.9 })).join("")}`,
    `<linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.accent}"/><stop offset="0.6" stop-color="${p.primary}"/><stop offset="1" stop-color="${p.secondary}"/></linearGradient>`
  );
}

function blocks(p, icons, r) {
  const rects = [
    [60, 80, 420, 300, p.primary, 0.9], [300, 330, 520, 360, p.accent, 0.95], [700, 60, 430, 330, p.primary, 0.55],
    [820, 470, 320, 250, p.light, 0.14], [30, 470, 300, 250, p.accent, 0.35],
  ];
  const shapes = rects.map(([x, y, w, h, c, o], i) => {
    const j = (r() - 0.5) * 40;
    return `<rect x="${num(x + j)}" y="${num(y - j / 2)}" width="${w}" height="${h}" rx="${40 + (i % 3) * 20}" fill="${c}" fill-opacity="${o}" transform="rotate(${num((r() - 0.5) * 8)} ${x + w / 2} ${y + h / 2})"/>`;
  }).join("");
  let dots = "";
  for (let y = 0; y < 6; y++) for (let x = 0; x < 10; x++) dots += `<circle cx="${760 + x * 26}" cy="${560 + y * 26}" r="3.2" fill="${p.light}" fill-opacity="0.35"/>`;
  return wrap(
    `<rect width="${W}" height="${H}" fill="${p.secondary}"/>${shapes}${dots}
     <circle cx="560" cy="400" r="150" fill="${p.card}"/>
     ${glyph(icons[0], 560, 400, 170, { stroke: p.primary, width: 1.5 })}
     ${icons.slice(1, 3).map((ic, i) => glyph(ic, i ? 930 : 230, i ? 560 : 230, 120, { stroke: p.light, width: 1.5, opacity: 0.95 })).join("")}`
  );
}

function diagonal(p, icons, r) {
  let stripes = "";
  for (let i = -6; i < 16; i++) stripes += `<rect x="${i * 120}" y="-200" width="56" height="${H + 400}" fill="${p.light}" fill-opacity="${i % 2 ? 0.06 : 0.12}" transform="rotate(24 ${W / 2} ${H / 2})"/>`;
  const cx = W * (0.5 + (r() - 0.5) * 0.14), cy = H * 0.5;
  const hex = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    return `${num(cx + Math.cos(a) * 210)},${num(cy + Math.sin(a) * 210)}`;
  }).join(" ");
  return wrap(
    `<rect width="${W}" height="${H}" fill="url(#g)"/>${stripes}
     <polygon points="${hex}" fill="${p.card}" fill-opacity="0.96" stroke="${p.accent}" stroke-width="10" stroke-linejoin="round"/>
     ${glyph(icons[0], cx, cy, 220, { stroke: p.primary, width: 1.4 })}
     ${icons.slice(1, 3).map((ic, i) => glyph(ic, i ? W * 0.84 : W * 0.14, i ? H * 0.78 : H * 0.22, 110, { stroke: p.light, width: 1.5, opacity: 0.85 })).join("")}`,
    `<linearGradient id="g" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="${p.secondary}"/><stop offset="1" stop-color="${p.primary}"/></linearGradient>`
  );
}

function spotlight(p, icons, r) {
  let stars = "";
  for (let i = 0; i < 46; i++) {
    const x = r() * W, y = r() * H, s = 2 + r() * 5;
    stars += `<circle cx="${num(x)}" cy="${num(y)}" r="${num(s)}" fill="${i % 4 ? p.light : p.accent}" fill-opacity="${num(0.2 + r() * 0.6)}"/>`;
  }
  const cx = W * (0.5 + (r() - 0.5) * 0.1), cy = H * 0.5;
  return wrap(
    `<rect width="${W}" height="${H}" fill="${p.secondary}"/>
     <rect width="${W}" height="${H}" fill="url(#g)"/>${stars}
     <circle cx="${cx}" cy="${cy}" r="215" fill="none" stroke="${p.accent}" stroke-opacity="0.75" stroke-width="3"/>
     <circle cx="${cx}" cy="${cy}" r="260" fill="none" stroke="${p.light}" stroke-opacity="0.18" stroke-width="2"/>
     ${glyph(icons[0], cx, cy, 250, { stroke: p.light, width: 1.2 })}
     ${icons.slice(1, 5).map((ic, i) => glyph(ic, cx + Math.cos(i * 1.6 + 0.4) * 330, cy + Math.sin(i * 1.6 + 0.4) * 250, 66, { stroke: p.accent, width: 1.6, opacity: 0.9 })).join("")}`,
    `<radialGradient id="g" cx="50%" cy="50%" r="60%"><stop offset="0" stop-color="${p.primary}" stop-opacity="0.65"/><stop offset="1" stop-color="${p.secondary}" stop-opacity="0"/></radialGradient>`
  );
}

const SCENES = [orbit, pattern, horizon, blocks, diagonal, spotlight];

/* ------------------------------ public API ------------------------------ */
const CACHE = new Map();

function paletteOf(theme) {
  const dark = isDark(theme.bg);
  const primary = theme.primary, accent = theme.accent || theme.primary;
  const secondary = theme.secondary || mix(primary, "#000000", 0.7);
  // Hero art always sits on a rich, saturated field — keep text/glyphs readable on it.
  const field = dark ? primary : primary;
  const light = mix("#ffffff", accent, 0.08);
  const card = dark ? mix("#ffffff", primary, 0.06) : "#ffffff";
  const onAccent = isDark(accent) ? "#ffffff" : mix(secondary, "#000000", 0.4);
  return { primary: field, secondary, accent, light, card, onAccent, dark };
}

/**
 * Build the artwork set for a category.
 * @param {object} theme   resolved theme ({primary, secondary, accent, bg…})
 * @param {string[]} icons lucide icon names, most representative first
 * @param {string} seed    stable string (category id) so art is deterministic
 */
export function buildArt(theme, icons, seed) {
  const key = `${seed}|${theme.primary}|${theme.secondary}|${theme.accent}|${icons.join(",")}`;
  if (CACHE.has(key)) return CACHE.get(key);

  const list = (icons.length ? icons : ["Sparkles"]).filter((n) => GLYPHS[n]);
  if (!list.length) list.push("Sparkles");
  while (list.length < 5) list.push(list[list.length % Math.max(1, list.length)] === list[0] ? "Sparkles" : list[0]);

  const p = paletteOf(theme);
  const base = hash(seed);
  const pick = (i) => SCENES[(base + i) % SCENES.length];
  const rot = (offset) => [...list.slice(offset), ...list.slice(0, offset)];

  const heroScene = pick(0);
  const aboutScene = pick(2 + (base % 3)); // always a different composition from the hero
  const art = {
    hero: uri(heroScene(p, rot(0), rng(base))),
    about: uri(aboutScene(p, rot(1), rng(base ^ 0x9e3779b9))),
    gallery: [1, 2, 3, 4].map((i) => uri(pick(i + 1)(p, rot(i % list.length), rng(base + i * 7919)))),
  };
  CACHE.set(key, art);
  return art;
}

/** Fill missing images of a business with category art (real uploads always win). */
export function withArtFallback(business, theme, categoryIcon, seed) {
  const hasHero = !!business.heroImage, hasAbout = !!business.aboutImage;
  const realGallery = (business.gallery || []).filter(Boolean);
  const needsGallery = ART_GALLERY_FALLBACK && realGallery.length === 0;
  if (hasHero && hasAbout && !needsGallery) return business;

  const own = [...(business.services || []), ...(business.features || [])].map((s) => s.icon).filter(Boolean);
  const icons = [categoryIcon, ...own].filter((v, i, a) => v && a.indexOf(v) === i).slice(0, 7);
  const art = buildArt(theme, icons, seed);

  return {
    ...business,
    heroImage: business.heroImage || art.hero,
    aboutImage: business.aboutImage || art.about,
    gallery: needsGallery ? art.gallery : business.gallery,
  };
}


/**
 * Product placeholder tile (portrait) — used by store templates until a real
 * product photo is uploaded. Soft palette-tinted field + the product's icon.
 */
const TILE_CACHE = new Map();
export function productTile(theme, icon, seed = "p") {
  const key = `${theme.primary}|${theme.accent}|${theme.bg}|${icon}|${seed}`;
  if (TILE_CACHE.has(key)) return TILE_CACHE.get(key);
  const r = rng(hash(seed + icon));
  const tintA = mix(theme.bg, theme.primary, 0.16 + r() * 0.1);
  const tintB = mix(theme.bg, theme.accent || theme.primary, 0.22 + r() * 0.12);
  const cx = 400 + (r() - 0.5) * 60, cy = 470 + (r() - 0.5) * 40;
  let dots = "";
  for (let i = 0; i < 14; i++) dots += `<circle cx="${num(r() * 800)}" cy="${num(r() * 1000)}" r="${num(3 + r() * 6)}" fill="${theme.primary}" fill-opacity="${num(0.08 + r() * 0.14)}"/>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${tintA}"/><stop offset="1" stop-color="${tintB}"/></linearGradient></defs>
<rect width="800" height="1000" fill="url(#g)"/>${dots}
<circle cx="${num(cx)}" cy="${num(cy)}" r="250" fill="#fff" fill-opacity="0.55"/>
<circle cx="${num(cx)}" cy="${num(cy)}" r="190" fill="#fff" fill-opacity="0.8"/>
${glyph(icon, cx, cy, 230, { stroke: theme.primary, width: 1.25 })}</svg>`;
  const out = uri(svg);
  TILE_CACHE.set(key, out);
  return out;
}
