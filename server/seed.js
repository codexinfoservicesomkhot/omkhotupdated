import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import { Business } from "./models/Business.js";
import { User } from "./models/User.js";
import { SEED_BUSINESSES } from "../src/data/seedBusinesses.js";
import { isWeakSecret } from "./config/validateEnv.js";

/**
 * Seed script.
 *
 *  - Development:  super admin (defaults allowed) + demo admin/owner accounts + demo websites.
 *  - Production (NODE_ENV=production or --production): creates ONLY the super admin,
 *    and only with an explicit SUPER_ADMIN_EMAIL + a strong SUPER_ADMIN_PASSWORD.
 *    No demo accounts, no demo websites, and the password is never printed.
 */
const isProd = process.env.NODE_ENV === "production" || process.argv.includes("--production");
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/cresite";

const DEV_STAFF = [
  { name: "Platform Admin", email: "admin@cresite.in", password: "admin123", role: "admin" },
  { name: "Demo Owner", email: "owner@cresite.in", password: "owner123", role: "owner" },
];

function superAdminFromEnv() {
  const email = (process.env.SUPER_ADMIN_EMAIL || (isProd ? "" : "superadmin@cresite.in")).toLowerCase().trim();
  const password = process.env.SUPER_ADMIN_PASSWORD || (isProd ? "" : "super123");
  const name = process.env.SUPER_ADMIN_NAME || "Super Admin";

  if (isProd) {
    const problems = [];
    if (!email || !email.includes("@")) problems.push("SUPER_ADMIN_EMAIL must be set to a real email address");
    if (password.length < 12 || /^(super123|admin123|owner123|password)/i.test(password) || /change|your[-_ ]|example|placeholder/i.test(password)) {
      problems.push("SUPER_ADMIN_PASSWORD must be set to a strong password (12+ characters, not a default or placeholder)");
    }
    if (problems.length) {
      console.error(`[seed] refusing to seed production:\n  - ${problems.join("\n  - ")}`);
      process.exit(1);
    }
  }
  return { name, email, password, role: "superadmin" };
}

async function ensureUser({ name, email, password, role }) {
  let user = await User.findOne({ email });
  if (user) {
    if (user.role !== role && role === "superadmin") { user.role = "superadmin"; await user.save(); }
    console.log(`[seed]  exists   ${role.padEnd(10)}  ${email}`);
    return user;
  }
  user = await User.create({ name, email, password, role });
  console.log(`[seed]  created  ${role.padEnd(10)}  ${email}${isProd ? "" : `  (password: ${password})`}`);
  return user;
}

async function run() {
  const SUPER_ADMIN = superAdminFromEnv();
  console.log(`[seed] mode: ${isProd ? "PRODUCTION (super admin only)" : "development (demo data included)"}`);
  console.log("[seed] connecting …");
  await connectDB(MONGO_URI);
  console.log("[seed] accounts:");
  await ensureUser(SUPER_ADMIN);

  if (!isProd) {
    const demoAdmin = await ensureUser(DEV_STAFF[0]);
    await ensureUser(DEV_STAFF[1]);

    console.log("[seed] businesses:");
    const demoTerm = { subscriptionStatus: "active", subscriptionStart: new Date(), subscriptionExpiry: new Date(Date.now() + 365 * 86400000), subscriptionRenewals: 1 };
    let created = 0, updated = 0;
    for (const b of SEED_BUSINESSES) {
      const exists = await Business.findOne({ slug: b.slug });
      await Business.findOneAndUpdate({ slug: b.slug }, { $set: { ...b, ...demoTerm, owner: demoAdmin._id, ownerName: demoAdmin.name, ownerEmail: demoAdmin.email, createdBy: demoAdmin._id, createdByName: demoAdmin.name, createdByEmail: demoAdmin.email, createdByRole: demoAdmin.role } }, { upsert: true });
      if (exists) updated++; else created++;
      console.log(`[seed]  ${exists ? "updated" : "created"}  /${b.slug}`);
    }
    console.log(`[seed] done — ${created} created, ${updated} refreshed.`);
    console.log(`[seed] SUPER ADMIN → ${SUPER_ADMIN.email} / ${SUPER_ADMIN.password}   (development only)`);
  } else {
    console.log("[seed] done — super admin ready. Sign in and change the password if it was shared.");
  }
  await mongoose.disconnect();
  process.exit(0);
}

run().catch((e) => { console.error(`[seed] failed: ${e.message}`); process.exit(1); });
