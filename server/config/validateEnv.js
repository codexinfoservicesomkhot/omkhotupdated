/**
 * Startup environment validation.
 *
 * In production a bad configuration is a hard failure (exit 1) rather than a
 * silent fallback to insecure defaults. In development it only warns.
 */
const WEAK_SECRET = /change[-_ ]?me|^change|your[-_ ]|example|placeholder|dev[-_ ]?secret|cresite-dev|^secret$|password/i;

export const isWeakSecret = (value = "") => value.length < 32 || WEAK_SECRET.test(value);

export function validateEnv({ isProd }) {
  const errors = [];
  const warnings = [];
  const env = process.env;

  if (isWeakSecret(env.JWT_SECRET || "")) {
    (isProd ? errors : warnings).push(
      "JWT_SECRET is missing, shorter than 32 characters, or still a placeholder. Generate one with: node -e \"console.log(require('crypto').randomBytes(48).toString('hex'))\""
    );
  }
  if (env.OTP_SECRET && isWeakSecret(env.OTP_SECRET)) {
    (isProd ? errors : warnings).push("OTP_SECRET is set but weak or a placeholder (use 32+ random characters, or unset it to reuse JWT_SECRET).");
  }

  if (isProd) {
    if (!env.MONGO_URI) errors.push("MONGO_URI is not set (production will not fall back to localhost).");
    if (!env.BREVO_API_KEY || !env.BREVO_SENDER_EMAIL) {
      warnings.push("Brevo is not configured — password reset emails cannot be sent (codes are never logged in production).");
    }
    if (!env.CASHFREE_APP_ID || !env.CASHFREE_SECRET_KEY) {
      warnings.push("Cashfree is not configured — payments and the payment webhook are disabled.");
    } else if (env.CASHFREE_ENVIRONMENT !== "production") {
      warnings.push("CASHFREE_ENVIRONMENT is not \"production\" — real payments will not be taken.");
    }
    if (!/^https:\/\//i.test(env.APP_URL || "")) warnings.push("APP_URL should be your public https:// URL (needed for Cashfree return URLs).");
  }

  return { errors, warnings };
}
