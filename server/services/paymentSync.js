import { Payment } from "../models/Payment.js";
import { Business } from "../models/Business.js";
import { fetchCashfreeOrder } from "./cashfree.js";
import { reconcileSubscription } from "./subscription.js";

/**
 * Re-check one payment against Cashfree (the source of truth), store the result
 * and activate the website's subscription when it is PAID.
 *
 * Shared by the browser-return endpoint (GET /payments/status/:orderId) and the
 * Cashfree webhook, so a paid order activates even if the customer closes the tab.
 * Idempotent: running it any number of times yields the same result.
 * Throws if Cashfree can't be reached (callers decide how to react).
 */
export async function syncPaymentWithCashfree(payment) {
  const cfOrder = await fetchCashfreeOrder(payment.orderId);

  const group = (cfOrder.payment_group || cfOrder.order_status || "").toString().toUpperCase();
  const orderStatus = (cfOrder.order_status || "").toString().toUpperCase();
  let next = group === "SUCCESS" || orderStatus === "PAID" ? "PAID" : group === "FAILED" ? "FAILED" : orderStatus || payment.status;

  /* Defence in depth: never accept PAID for an amount that differs from what we asked for. */
  if (next === "PAID" && cfOrder.order_amount != null && Number(cfOrder.order_amount) !== Number(payment.amount)) {
    console.error(`[payments] amount mismatch on ${payment.orderId}: expected ${payment.amount}, Cashfree says ${cfOrder.order_amount}`);
    next = payment.status;
  }

  if (next !== payment.status) {
    payment.status = next;
    if (next === "PAID") {
      payment.paidAt = new Date();
      const pay = cfOrder.payments?.[0] || {};
      payment.cfPaymentId = pay.cf_payment_id || payment.cfPaymentId;
      payment.paymentMethod = pay.payment_method || payment.paymentMethod;
    }
    payment.raw = cfOrder;
    await payment.save();
  }

  if (payment.status === "PAID") {
    const site = await Business.findOne({ slug: payment.businessSlug });
    if (site && !site.paymentExempt) await reconcileSubscription(site, { publishOnActivation: true });
  }
  return Payment.findById(payment._id);
}
