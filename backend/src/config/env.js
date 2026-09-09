import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  // Comma-separated list of allowed origins for CORS (public site + admin
  // dashboard, both in dev and once deployed).
  corsOrigins: (
    process.env.CORS_ORIGINS ||
    "http://localhost:5173,http://localhost:4173,http://localhost:5174,http://localhost:4174"
  )
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),

  anthropicApiKey: process.env.ANTHROPIC_API_KEY || "",

  mongoUri: process.env.MONGODB_URI || "",

  jwtSecret: process.env.JWT_SECRET || "dev-only-insecure-secret-change-me",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "12h",
  // Used when the admin checks "Remember me" on login — a much longer-lived
  // token, stored client-side in localStorage instead of sessionStorage.
  jwtRememberExpiresIn: process.env.JWT_REMEMBER_EXPIRES_IN || "30d",

  // Gmail SMTP (via nodemailer) — used only to send password-reset emails.
  smtpUser: process.env.SMTP_USER || "",
  smtpPass: process.env.SMTP_PASS || "",

  // Base URL of admin-frontend, used to build the password-reset link sent
  // by email (e.g. `${adminFrontendUrl}/reset-password?token=...`).
  adminFrontendUrl: process.env.ADMIN_FRONTEND_URL || "http://localhost:5174",
  // How long a password-reset link stays valid.
  resetTokenExpiresMinutes: Number(process.env.RESET_TOKEN_EXPIRES_MINUTES || 20),

  // Used only by the seed script (npm run seed:admin) to create the first
  // admin account — not read anywhere else.
  seedAdminName: process.env.ADMIN_NAME || "Deepika",
  seedAdminEmail: process.env.ADMIN_EMAIL || "",
  seedAdminPassword: process.env.ADMIN_PASSWORD || "",
};