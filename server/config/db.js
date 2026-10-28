import mongoose from "mongoose";

/**
 * Connect to MongoDB.
 * Uses a short server-selection timeout so the API can boot in "offline mode"
 * (helpful warning + 503s) instead of hanging when Mongo isn't reachable.
 */
/**
 * Connect to MongoDB with production-grade connection pooling,
 * heartbeat monitoring, and automatic reconnection.
 */
export async function connectDB(uri) {
  mongoose.set("strictQuery", true);
  const isProd = process.env.NODE_ENV === "production";

  const conn = await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    maxPoolSize: isProd ? 50 : 10,
    minPoolSize: isProd ? 5 : 1,
    heartbeatFrequencyMS: 10000,
    autoIndex: !isProd, // In production, indices should be built in advance or via migrations
  });

  return conn;
}

/**
 * Make sure every schema index exists (non-destructive: creates missing ones,
 * never drops). Needed in production where `autoIndex` is disabled — without
 * this, unique constraints on slug / email / orderId are NOT enforced by MongoDB.
 */
export async function ensureIndexes(models) {
  for (const model of models) {
    try {
      await model.createIndexes();
      console.log(`[db] indexes ready: ${model.modelName}`);
    } catch (e) {
      console.error(`[db] FAILED to create indexes for ${model.modelName}: ${e.message} (duplicate data? fix it, then restart)`);
    }
  }
}
