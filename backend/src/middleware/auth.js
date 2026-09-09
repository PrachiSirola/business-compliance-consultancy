import { verifyToken } from "../utils/jwt.js";

/**
 * Protects admin-only routes. Expects `Authorization: Bearer <token>`.
 * On success, attaches the decoded payload as req.admin.
 */
export function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ error: "Missing or invalid Authorization header" });
  }

  try {
    req.admin = verifyToken(token);
    next();
  } catch (_err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
