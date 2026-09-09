import nodemailer from "nodemailer";
import { env } from "../config/env.js";

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  if (!env.smtpUser || !env.smtpPass) return null;

  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: env.smtpUser, pass: env.smtpPass },
  });
  return transporter;
}

/**
 * Sends the password-reset email. If SMTP isn't configured (e.g. local dev
 * without SMTP_USER/SMTP_PASS set), this logs the reset link to the server
 * console instead of throwing, so the rest of the flow still works locally.
 */
export async function sendPasswordResetEmail(to, resetUrl) {
  const t = getTransporter();

  if (!t) {
    console.warn(
      `[mailer] SMTP not configured (SMTP_USER/SMTP_PASS unset) — password reset link for ${to}:\n${resetUrl}`
    );
    return;
  }

  await t.sendMail({
    from: `"Suits Admin" <${env.smtpUser}>`,
    to,
    subject: "Reset your Suits Admin password",
    text: `We received a request to reset your Suits Admin password.\n\nReset it here (valid for ${env.resetTokenExpiresMinutes} minutes):\n${resetUrl}\n\nIf you didn't request this, you can safely ignore this email — your password will not be changed.`,
    html: `
      <div style="background:#F3EBDA;padding:32px 16px;font-family:Arial,Helvetica,sans-serif">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden">
          <tr>
            <td style="background:#F3EBDA;padding:22px 32px;border-bottom:1px solid #E7DEC9">
              <span style="font-family:Georgia,'Times New Roman',serif;font-size:22px;color:#1E2A44">Suits</span>
              <span style="font-size:10px;letter-spacing:.14em;color:#8A867C;margin-left:8px;vertical-align:2px">COMPLIANCE, SIMPLIFIED</span>
            </td>
          </tr>
          <tr>
            <td style="padding:40px 32px 32px;text-align:center">
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 20px">
                <tr>
                  <td width="56" height="56" align="center" valign="middle" style="background:#F3EBDA;border-radius:50%;font-size:22px">🔒</td>
                </tr>
              </table>
              <h1 style="margin:0 0 14px;font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:26px;color:#1E2A44">
                Reset your password
              </h1>
              <p style="margin:0 0 28px;font-size:14px;line-height:1.6;color:#5B5750">
                We received a request to reset your Suits Admin password.<br />
                Click the button below to create a new password.
              </p>
              <a href="${resetUrl}" style="background:#1E2A44;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:13px 28px;border-radius:8px;display:inline-block">
                Reset password &nbsp;→
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 32px">
              <hr style="border:none;border-top:1px solid #E7DEC9;margin:0 0 20px" />
              <p style="margin:0;font-size:12px;line-height:1.6;color:#8A867C;text-align:center">
                This link is valid for ${env.resetTokenExpiresMinutes} minutes. If you didn't request this,
                you can safely ignore this email — your password will not be changed.
              </p>
            </td>
          </tr>
        </table>
      </div>
    `,
  });
}