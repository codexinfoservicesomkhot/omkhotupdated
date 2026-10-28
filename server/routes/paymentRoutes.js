import { Router } from "express";
import { randomBytes } from "node:crypto";
import { asyncHandler, dbGuard } from "../middleware/errorMiddleware.js";
import { protect, superAdminOnly, optionalAuth } from "../middleware/authMiddleware.js";
import { Business } from "../models/Business.js";
import { Payment } from "../models/Payment.js";
import { createCashfreeOrder, cashfreeConfig, isCashfreeConfigured, resolveCashfreeReturnBase, buildCashfreeReturnUrl } from "../services/cashfree.js";
import { reconcileSubscription, syncSubscription, sweepSubscriptions, effectiveStatus, daysRemaining, reminderFor, REMINDER_DAYS } from "../services/subscription.js";
import { syncPaymentWithCashfree } from "../services/paymentSync.js";
import { paymentLimiter } from "../middleware/rateLimiters.js";
import { PLANS } from "../../src/data/plans.js";

const router = Router();
router.use(dbGuard);

const normalize = (p) => {
  const o = p.toObject ? p.toObject() : p;
  const { __v, raw, ...rest } = o;
  return { ...rest, id: String(rest._id) };
};

/** GET /api/payments/config */
router.get("/config", optionalAuth, (req, res) => {
  const c = cashfreeConfig();
  const returnUrlBase = resolveCashfreeReturnBase(req, c);
  const credentialsConfigured = isCashfreeConfigured(c);
  res.json({
    configured: credentialsConfigured && !!returnUrlBase,
    credentialsConfigured,
    returnUrlReady: !!returnUrlBase,
    returnUrlBase,
    configurationMessage: !credentialsConfigured
      ? "Set CASHFREE_APP_ID and CASHFREE_SECRET_KEY on the server."
      : !returnUrlBase
      ? "Cashfree requires HTTPS. Set APP_URL=https://your-domain.com, or use an HTTPS tunnel for local testing."
      : null,
    environment: c.environment,
    currency: "INR",
    plans: PLANS.map((p) => ({ id: p.id, name: p.name, price: p.price, priceLabel: p.priceLabel })),
  });
});

/** POST /api/payments/create-order */
router.post("/create-order", protect, paymentLimiter, asyncHandler(async (req, res) => {
  const { plan: planId, businessSlug } = req.body || {};
  const plan = PLANS.find((p) => p.id === planId);
  if (!plan) return res.status(400).json({ message: "Unknown plan." });
  if (plan.price === null) return res.status(400).json({ message: "Custom websites are quoted per project — contact us for pricing." });
  if (!businessSlug) return res.status(400).json({ message: "Which website is this payment for?" });

  const business = await Business.findOne({ slug: String(businessSlug).toLowerCase() });
  if (!business) return res.status(404).json({ message: `No website at /${businessSlug}` });
  const ownsBusiness = req.user.role === "superadmin" || (business.owner && String(business.owner) === String(req.user._id));
  if (!ownsBusiness) return res.status(403).json({ message: "You can only pay for websites created by your account." });
  if (business.paymentExempt || business.createdByRole === "superadmin") {
    return res.status(400).json({ paymentExempt: true, message: "No payment is required — websites created by the super admin are free." });
  }

  const c = cashfreeConfig();
  if (!isCashfreeConfigured(c)) return res.status(503).json({ message: "Payments aren't configured yet. Set CASHFREE_APP_ID and CASHFREE_SECRET_KEY." });
  if (!resolveCashfreeReturnBase(req, c)) {
    return res.status(503).json({ configurationError: "cashfree_https_return_url", message: "Cashfree requires an HTTPS return URL. Set APP_URL=https://your-domain.com in production. For local testing, expose the frontend with ngrok and set CASHFREE_RETURN_URL_BASE." });
  }

  const orderId = `sf-${Date.now()}-${randomBytes(3).toString("hex")}`;
  const returnUrl = buildCashfreeReturnUrl(req, orderId, c);
  if (!returnUrl) return res.status(503).json({ configurationError: "cashfree_https_return_url", message: "Could not construct a valid HTTPS Cashfree return URL." });

  const digits = String(business.contact?.phone || business.contact?.whatsapp || "").replace(/\D/g, "");
  const phone = digits.length >= 10 ? `+${digits}` : "9999999999";

  const cfOrder = await createCashfreeOrder({
    orderId, amount: plan.price,
    customer: { id: String(req.user._id), name: req.user.name || business.ownerName || "Customer", email: req.user.email || business.ownerEmail, phone },
    returnUrl,
    note: `${plan.name} for ${business.name} (/${business.slug})`,
  });

  const payment = await Payment.create({
    orderId, cfOrderId: cfOrder.cf_order_id || "", paymentSessionId: cfOrder.payment_session_id || "",
    businessSlug: business.slug, plan: plan.id, amount: plan.price,
    userId: req.user._id, customerEmail: req.user.email, customerName: req.user.name, customerPhone: phone,
    status: "PENDING", raw: cfOrder,
  });

  return res.status(201).json({ payment: normalize(payment), orderId, paymentSessionId: cfOrder.payment_session_id, amount: plan.price, environment: c.environment });
}));

/** GET /api/payments/status/:orderId */
router.get("/status/:orderId", protect, asyncHandler(async (req, res) => {
  const payment = await Payment.findOne({ orderId: req.params.orderId });
  if (!payment) return res.status(404).json({ message: "Payment not found." });
  const ownsPayment = req.user.role === "superadmin" || (payment.userId && String(payment.userId) === String(req.user._id)) || payment.customerEmail === req.user.email;
  if (!ownsPayment) return res.status(403).json({ message: "You cannot view another account's payment." });

  try { await syncPaymentWithCashfree(payment); } catch { /* Cashfree unreachable — keep stored state */ }

  const refreshedPayment = await Payment.findById(payment._id);
  return res.json(normalize(refreshedPayment || payment));
}));

/** GET /api/payments/orders */
router.get("/orders", protect, asyncHandler(async (req, res) => {
  const filter = req.user.role === "superadmin" ? {} : { $or: [{ userId: req.user._id }, { customerEmail: req.user.email }] };
  const docs = await Payment.find(filter).sort({ createdAt: -1 }).limit(200);
  const slugs = [...new Set(docs.map((d) => d.businessSlug).filter(Boolean))];
  const sites = slugs.length ? await Business.find({ slug: { $in: slugs } }).select("slug name") : [];
  const nameBySlug = Object.fromEntries(sites.map((s) => [s.slug, s.name]));
  const rows = docs.map((d) => { const n = normalize(d); n.businessName = nameBySlug[d.businessSlug] || d.businessSlug || ""; return n; });
  if (req.user.role !== "superadmin") return res.json({ payments: rows });
  const paid = rows.filter((r) => r.status === "PAID");
  const thisMonthStart = new Date(new Date().setDate(1));
  thisMonthStart.setHours(0, 0, 0, 0);
  return res.json({
    payments: rows,
    stats: {
      totalCollected: paid.reduce((s, r) => s + (r.amount || 0), 0),
      paidCount: paid.length,
      pendingCount: rows.filter((r) => r.status === "PENDING").length,
      failedCount: rows.filter((r) => r.status === "FAILED").length,
      thisMonthCollected: paid.filter((r) => new Date(r.createdAt) >= thisMonthStart).reduce((s, r) => s + (r.amount || 0), 0),
      thisMonthCount: paid.filter((r) => new Date(r.createdAt) >= thisMonthStart).length,
    },
  });
}));

/** GET /api/payments/subscription/:slug */
router.get("/subscription/:slug", asyncHandler(async (req, res) => {
  const site = await Business.findOne({ slug: String(req.params.slug).toLowerCase() });
  if (!site) return res.status(404).json({ message: `No website at /${req.params.slug}` });
  await reconcileSubscription(site);
  await syncSubscription(site);
  const exempt = site.paymentExempt || site.createdByRole === "superadmin";
  const status = exempt ? "active" : effectiveStatus(site);
  const days = exempt ? null : daysRemaining(site.subscriptionExpiry);
  return res.json({ slug: site.slug, name: site.name, status, expiry: site.subscriptionExpiry, daysRemaining: days, reminderDays: REMINDER_DAYS, reminder: status === "expiring" || status === "expired" ? reminderFor(site) : null });
}));

/** GET /api/payments/subscriptions */
router.get("/subscriptions", protect, asyncHandler(async (req, res) => {
  const filter = req.user.role === "superadmin" ? {} : { owner: req.user._id };
  const docs = await Business.find(filter).sort({ subscriptionExpiry: 1 });
  const groups = { active: [], expiring: [], expired: [] };
  for (const site of docs) {
    await reconcileSubscription(site);
    await syncSubscription(site);
    const exempt = site.paymentExempt || site.createdByRole === "superadmin";
    const status = exempt ? "active" : effectiveStatus(site);
    if (status === "none" && !exempt) continue;
    const entry = { slug: site.slug, name: site.name, category: site.category, plan: site.plan, published: site.published, paymentExempt: !!site.paymentExempt, status, start: site.subscriptionStart, expiry: site.subscriptionExpiry, daysRemaining: site.paymentExempt ? null : daysRemaining(site.subscriptionExpiry), renewals: site.subscriptionRenewals };
    if (status === "expired") groups.expired.push(entry);
    else if (status === "expiring") groups.expiring.push(entry);
    else groups.active.push(entry);
  }
  return res.json(groups);
}));

/** POST /api/payments/subscriptions/sweep */
router.post("/subscriptions/sweep", protect, superAdminOnly, asyncHandler(async (req, res) => {
  return res.json(await sweepSubscriptions());
}));

export default router;
