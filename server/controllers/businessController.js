import { Business } from "../models/Business.js";
import { canManage, isSuperAdmin } from "../middleware/authMiddleware.js";
import { reconcileSubscription, syncSubscription, isPubliclyVisible, effectiveStatus, daysRemaining } from "../services/subscription.js";
import { SEED_BUSINESSES } from "../../src/data/seedBusinesses.js";

const isPaymentExempt = (b) => !!b.paymentExempt || b.createdByRole === "superadmin";

const normalize = (doc) => {
  const o = doc.toObject ? doc.toObject() : doc;
  const { __v, ...rest } = o;
  const exempt = isPaymentExempt(rest);
  return { ...rest, paymentExempt: exempt, subscriptionStatus: exempt ? "active" : effectiveStatus(rest), daysRemaining: exempt ? null : daysRemaining(rest.subscriptionExpiry), id: rest.id || String(o._id), owner: rest.owner ? String(rest.owner) : null, createdBy: rest.createdBy ? String(rest.createdBy) : null };
};

const sanitize = (body) => {
  const { _id, id, __v, createdAt, updatedAt, owner, ownerName, ownerEmail, createdBy, createdByName, createdByEmail, createdByRole, paid, paidAt, paymentExempt, paymentExemptReason, paymentExemptBy, paymentExemptAt, subscriptionStatus, subscriptionStart, subscriptionExpiry, subscriptionRenewals, appliedSubscriptionOrderIds, lastReminderAt, ...payload } = body || {};
  return payload;
};

export async function listBusinesses(req, res) {
  const filter = {};
  if (req.query.category) filter.category = req.query.category;
  if (req.query.mine === "true") {
    if (!req.user) return res.status(401).json({ message: "Sign in to view your websites." });
    if (!isSuperAdmin(req.user)) filter.owner = req.user._id;
  } else if (!isSuperAdmin(req.user)) {
    filter.$or = req.user ? [{ published: true }, { owner: req.user._id }] : [{ published: true }];
  }
  if (req.query.published === "true") { filter.published = true; delete filter.$or; }
  const docs = await Business.find(filter).sort({ createdAt: -1 });
  if (req.user) await Promise.all(docs.filter((d) => canManage(req.user, d)).map((d) => reconcileSubscription(d)));
  const visible = isSuperAdmin(req.user) ? docs : docs.filter((d) => isPubliclyVisible(d) || (req.user && d.owner && String(d.owner) === String(req.user._id)));
  res.json(visible.map(normalize));
}

export async function getBusiness(req, res) {
  const doc = await Business.findOne({ slug: req.params.slug.toLowerCase() });
  if (!doc) return res.status(404).json({ message: `No business at /${req.params.slug}` });
  await reconcileSubscription(doc);
  await syncSubscription(doc);
  const manager = canManage(req.user, doc);
  if (!doc.published && !manager) return res.status(403).json({ message: "This website is not published yet." });
  if (!manager && !isPubliclyVisible(doc)) return res.status(419).json({ subscriptionExpired: true, slug: doc.slug, name: doc.name, message: "This website's subscription has expired." });
  return res.json(normalize(doc));
}

export async function createBusiness(req, res) {
  const payload = sanitize(req.body);
  if (payload.slug) payload.slug = payload.slug.toLowerCase();
  const exists = payload.slug ? await Business.findOne({ slug: payload.slug }) : null;
  if (exists) return res.status(409).json({ message: `/${payload.slug} is already taken — choose another slug.` });
  if (!["basic", "domain", "custom"].includes(payload.plan)) return res.status(400).json({ message: "Please select a plan for your website before saving." });
  const free = req.user.role === "superadmin";
  payload.published = free;
  const doc = await Business.create({ ...payload, owner: req.user._id, ownerName: req.user.name, ownerEmail: req.user.email, createdBy: req.user._id, createdByName: req.user.name, createdByEmail: req.user.email, createdByRole: req.user.role, paymentExempt: free, paymentExemptReason: free ? "superadmin_creation" : "", paymentExemptBy: free ? req.user._id : null, paymentExemptAt: free ? new Date() : null });
  return res.status(201).json(normalize(doc));
}

export async function updateBusiness(req, res) {
  const current = await Business.findOne({ slug: req.params.slug.toLowerCase() });
  if (!current) return res.status(404).json({ message: `No business at /${req.params.slug}` });
  if (!canManage(req.user, current)) return res.status(403).json({ message: "You can only edit websites created by your account." });
  const payload = sanitize(req.body);
  if (payload.slug) payload.slug = payload.slug.toLowerCase();
  if (payload.slug && payload.slug !== current.slug) {
    const clash = await Business.findOne({ slug: payload.slug });
    if (clash) return res.status(409).json({ message: `/${payload.slug} is already taken.` });
  }
  if (payload.published === true && !current.paid && !isPaymentExempt(current)) return res.status(402).json({ paymentRequired: true, message: "Payment required before publishing." });
  Object.assign(current, payload);
  return res.json(normalize(await current.save()));
}

export async function togglePublish(req, res) {
  const doc = await Business.findOne({ slug: req.params.slug.toLowerCase() });
  if (!doc) return res.status(404).json({ message: `No business at /${req.params.slug}` });
  if (!canManage(req.user, doc)) return res.status(403).json({ message: "You can only publish websites created by your account." });
  if (!doc.published && !doc.paid && !isPaymentExempt(doc)) return res.status(402).json({ paymentRequired: true, plan: doc.plan || null, message: "Payment required before publishing." });
  doc.published = !doc.published;
  await doc.save();
  return res.json(normalize(doc));
}

export async function deleteBusiness(req, res) {
  const doc = await Business.findOne({ slug: req.params.slug.toLowerCase() });
  if (!doc) return res.status(404).json({ message: `No business at /${req.params.slug}` });
  if (!canManage(req.user, doc)) return res.status(403).json({ message: "You can only delete websites created by your account." });
  await doc.deleteOne();
  return res.json({ success: true, slug: doc.slug });
}

export async function seedDemo(req, res) {
  const stamp = { owner: req.user._id, ownerName: req.user.name, ownerEmail: req.user.email, createdBy: req.user._id, createdByName: req.user.name, createdByEmail: req.user.email, createdByRole: req.user.role };
  const ops = SEED_BUSINESSES.map((b) => ({ updateOne: { filter: { slug: b.slug }, update: { $set: { ...b, ...stamp } }, upsert: true } }));
  await Business.bulkWrite(ops);
  const docs = await Business.find({ slug: { $in: SEED_BUSINESSES.map((b) => b.slug) } });
  return res.json({ seeded: docs.length, slugs: docs.map((d) => d.slug) });
}
