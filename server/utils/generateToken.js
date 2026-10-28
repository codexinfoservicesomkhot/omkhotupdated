import jwt from "jsonwebtoken";

/**
 * JWT helpers. The secret is read lazily (not at import time) so values loaded
 * from .env by dotenv are always picked up, and production can never silently
 * fall back to a known development secret.
 */
const DEV_FALLBACK_SECRET = "cresite-dev-secret-change-me";

export function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (secret) return secret;
  if (process.env.NODE_ENV === "production") {
    throw new Error("JWT_SECRET is not set — refusing to sign or verify tokens in production.");
  }
  return DEV_FALLBACK_SECRET;
}

const expiresIn = () => process.env.JWT_EXPIRES_IN || "7d";

/** Sign a JWT carrying the user id + role (role is re-verified from DB on each request). */
export function generateToken(user) {
  return jwt.sign({ id: String(user._id), role: user.role }, getJwtSecret(), { expiresIn: expiresIn() });
}

export function verifyToken(token) {
  return jwt.verify(token, getJwtSecret());
}
