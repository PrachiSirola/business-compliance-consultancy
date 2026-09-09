import crypto from "crypto";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import { signToken } from "../utils/jwt.js";
import { env } from "../config/env.js";
import { sendPasswordResetEmail } from "../utils/mailer.js";
import { isValidPassword, PASSWORD_REQUIREMENTS_MESSAGE } from "../utils/passwordPolicy.js";

const RESET_TOKEN_BYTES = 32;
const PASSWORD_HISTORY_LIMIT = 3;

function hashResetToken(rawToken) {
  return crypto.createHash("sha256").update(rawToken).digest("hex");
}

export async function login(req, res) {
  const { email, password, rememberMe } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
  if (!admin) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const ok = await bcrypt.compare(password, admin.passwordHash);
  if (!ok) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  // "Remember me" only changes the token's lifetime — the frontend decides
  // where to store it (localStorage vs sessionStorage) based on the same flag.
  const expiresIn = rememberMe ? env.jwtRememberExpiresIn : env.jwtExpiresIn;
  const token = signToken({ id: admin._id.toString(), email: admin.email, name: admin.name }, expiresIn);

  return res.json({
    token,
    admin: { id: admin._id, name: admin.name, email: admin.email },
  });
}

export async function me(req, res) {
  // req.admin is set by the requireAuth middleware from the JWT payload.
  return res.json({ admin: req.admin });
}

export async function forgotPassword(req, res) {
  const { email } = req.body || {};

  // Always respond the same way regardless of whether the email exists, so
  // this endpoint can't be used to enumerate admin accounts.
  const genericResponse = {
    message: "If an account exists with this email address, a password reset link has been sent.",
  };

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
  if (!admin) {
    return res.json(genericResponse);
  }

  const rawToken = crypto.randomBytes(RESET_TOKEN_BYTES).toString("hex");
  admin.resetPasswordTokenHash = hashResetToken(rawToken);
  admin.resetPasswordExpires = new Date(Date.now() + env.resetTokenExpiresMinutes * 60 * 1000);
  await admin.save();

  const resetUrl = `${env.adminFrontendUrl}/reset-password?token=${rawToken}`;

  try {
    await sendPasswordResetEmail(admin.email, resetUrl);
  } catch (err) {
    // Don't leak delivery failures to the client — that would reveal the
    // email exists. Log server-side for debugging instead.
    console.error("[forgotPassword] failed to send reset email:", err);
  }

  return res.json(genericResponse);
}

export async function resetPassword(req, res) {
  const { token, newPassword, confirmPassword } = req.body || {};

  if (!token || !newPassword || !confirmPassword) {
    return res.status(400).json({ error: "Token, new password, and confirmation are required" });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  if (!isValidPassword(newPassword)) {
    return res.status(400).json({ error: PASSWORD_REQUIREMENTS_MESSAGE });
  }

  const tokenHash = hashResetToken(token);
  const admin = await Admin.findOne({
    resetPasswordTokenHash: tokenHash,
    resetPasswordExpires: { $gt: new Date() },
  });

  if (!admin) {
    return res.status(400).json({ error: "This reset link is invalid or has expired. Please request a new one." });
  }

  // Reject reuse of the current password or any of the last 3 previous ones.
  const recentHashes = [admin.passwordHash, ...admin.passwordHistory];
  for (const oldHash of recentHashes) {
    const reused = await bcrypt.compare(newPassword, oldHash);
    if (reused) {
      return res.status(400).json({ error: "You can't reuse a recent password. Please choose a different one." });
    }
  }

  const newHash = await bcrypt.hash(newPassword, 10);
  admin.passwordHistory = [admin.passwordHash, ...admin.passwordHistory].slice(0, PASSWORD_HISTORY_LIMIT);
  admin.passwordHash = newHash;
  admin.resetPasswordTokenHash = null;
  admin.resetPasswordExpires = null;
  await admin.save();

  return res.json({ message: "Password updated. You can now sign in." });
}