import "dotenv/config"; // must be first: loads .env before any other module reads process.env
import express from "express";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { connectDB, ensureIndexes } from "./config/db.js";
import { validateEnv } from "./config/validateEnv.js";
import { User } from "./models/User.js";
import { Business } from "./models/Business.js";
import { Payment } from "./models/Payment.js";
import { Lead } from "./models/Lead.js";
import webhookRoutes from "./routes/webhookRoutes.js";
import businessRoutes from "./routes/businessRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";
import { apiNotFound, errorHandler } from "./middleware/errorMiddleware.js";
import { generalLimiter } from "./middleware/rateLimiters.js";

if (process.argv.includes("--production")) process.env.NODE_ENV = "production";
const isProd = process.env.NODE_ENV === "production";

/* Fail fast on an insecure production config instead of running with defaults. */
{
  const { errors, warnings } = validateEnv({ isProd });
  warnings.forEach((w) => console.warn(`[config] WARNING: ${w}`));
  if (errors.length) {
    errors.forEach((e) => console.error(`[config] ERROR: ${e}`));
    console.error("[config] Refusing to start with an insecure production configuration.");
    process.exit(1);
  }
}
const PORT = Number(process.env.PORT) || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/cresite";

const app = express();
app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false, crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(compression());
app.use(cors({ origin: true, credentials: true }));

/* Cashfree webhook — mounted BEFORE the JSON parser because the signature is
   computed over the exact raw request body. */
app.use("/api/payments/webhook", webhookRoutes);

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));

app.get("/api/health", (req, res) => {
  const m = process.memoryUsage();
  res.json({ status: "ok", service: "cresite-api", version: "1.0.0", environment: process.env.NODE_ENV || "development", db: mongoose.connection.readyState === 1 ? "connected" : "offline", uptimeSeconds: Math.floor(process.uptime()), memory: { rssMB: Math.round(m.rss / 1048576), heapUsedMB: Math.round(m.heapUsed / 1048576) }, timestamp: new Date().toISOString() });
});

app.use("/api", generalLimiter);
app.use("/api/auth", authRoutes);
app.use("/api/businesses", businessRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api", apiNotFound);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "../dist");
const indexHtml = path.join(distDir, "index.html");

if (isProd) {
  if (fs.existsSync(indexHtml)) {
    app.use(express.static(distDir, { index: false, setHeaders: (res, fp) => res.setHeader("Cache-Control", fp.endsWith("index.html") ? "no-cache, no-store, must-revalidate" : "public, max-age=31536000, immutable") }));
    app.use((req, res, next) => { if (req.method === "GET" && !req.path.startsWith("/api")) { res.setHeader("Cache-Control", "no-cache"); return res.sendFile(indexHtml); } return next(); });
  } else { console.warn("[server] dist not found — run `npm run build`."); }
}
app.use(errorHandler);

let server;
connectDB(MONGO_URI)
  .then(async (c) => {
    console.log(`[server] MongoDB: ${c.connection.name}`);
    /* autoIndex is off in production, so make sure unique indexes (slug, email, orderId) really exist. */
    if (isProd) await ensureIndexes([User, Business, Payment, Lead]);
  }).catch((e) => console.warn(`[server] MongoDB offline: ${e.message}`));
mongoose.connection.on("disconnected", () => console.warn("[server] MongoDB disconnected"));
mongoose.connection.on("reconnected", () => console.log("[server] MongoDB reconnected"));
server = app.listen(PORT, () => console.log(`[server] http://localhost:${PORT} · health: /api/health`));

const shutdown = async (s) => { console.log(`\n[server] ${s} — shutting down`); if (server) server.close(() => console.log("[server] HTTP closed")); try { if (mongoose.connection.readyState) await mongoose.connection.close(false); } catch {} process.exit(0); };
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("unhandledRejection", (r) => console.error("[server] Unhandled rejection:", r));
process.on("uncaughtException", (e) => { console.error("[server] Uncaught:", e); shutdown("UNCAUGHT"); });
