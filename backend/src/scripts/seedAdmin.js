/**
 * Creates or updates the admin account used to log into the dashboard.
 * Run with: npm run seed:admin
 * Reads ADMIN_NAME / ADMIN_EMAIL / ADMIN_PASSWORD from .env.
 */
import bcrypt from "bcryptjs";
import { env } from "../config/env.js";
import { connectDB } from "../config/db.js";
import Admin from "../models/Admin.js";
import mongoose from "mongoose";

async function main() {
  if (!env.mongoUri) {
    console.error("✗ MONGODB_URI is not set in .env — cannot seed the admin account.");
    process.exit(1);
  }
  if (!env.seedAdminEmail || !env.seedAdminPassword) {
    console.error("✗ ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env before seeding.");
    process.exit(1);
  }

  await connectDB();

  const email = env.seedAdminEmail.toLowerCase().trim();
  const passwordHash = await bcrypt.hash(env.seedAdminPassword, 10);

  const admin = await Admin.findOneAndUpdate(
    { email },
    { name: env.seedAdminName, email, passwordHash },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  console.log(`✓ Admin ready: ${admin.email} (${admin.name})`);
  await mongoose.disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
