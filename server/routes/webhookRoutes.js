import { Router } from "express";
import express from "express";
import mongoose from "mongoose";
import { asyncHandler } from "../middleware/errorMiddleware.js";
import { Payment } from "../models/Payment.js";
import { cashfreeConfig, isCashfreeConfigured, verifyCashfreeWebhookSignature } from "../services/cashfree.js";
import { syncPaymentWithCashfree } from "../services/paymentSync.js";

/**
 * POST /api/payments/webhook/cashfree
 *
 * Configure this URL in the Cashfree dashboard (Developers → Webhooks).
 * Security model: the signature is verified over the RAW body, and even then the
 * payload is not trusted — we re-fetch the order from Cashfree before changing
 * anything. Non-2xx responses make Cashfree retry, which is what we want when
 * the database or Cashfree API is temporarily unavailable.
 */
const router = Router();

router.post(
  "/cashfree",
  express.raw({ type: "*/*", limit: "1mb" }),
  asyncHandler(async (req, res) => {
    const c = cashfreeConfig();
    if (!isCashfreeConfigured(c)) return res.status(503).json({ message: "Payments are not configured." });

    const raw = Buffer.isBuffer(req.body) ? req.body : Buffer.alloc(0);
    if (!verifyCashfreeWebhookSignature(raw, req.get("x-webhook-signature"), req.get("x-webhook-timestamp"), c)) {
      return res.status(401).json({ message: "Invalid webhook signature." });
    }

    if (mongoose.connection.readyState !== 1) return res.status(503).json({ message: "Database unavailable — retry later." });

    let event;
    try {
      event = JSON.parse(raw.toString("utf8"));
    } catch {
      return res.status(400).json({ message: "Malformed webhook body." });
    }

    const orderId = event?.data?.order?.order_id;
    if (!orderId) return res.status(200).json({ ok: true, ignored: true }); // e.g. dashboard test events

    const payment = await Payment.findOne({ orderId: String(orderId) });
    if (!payment) return res.status(200).json({ ok: true, ignored: true }); // not one of our orders

    try {
      await syncPaymentWithCashfree(payment);
    } catch (e) {
      console.error(`[webhook] could not verify ${orderId} with Cashfree: ${e.message}`);
      return res.status(502).json({ message: "Could not verify the order — retry later." });
    }
    return res.json({ ok: true });
  })
);

export default router;
