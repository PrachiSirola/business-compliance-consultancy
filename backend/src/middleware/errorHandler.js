/**
 * Central error handler. Keep this last in the middleware chain
 * (see server.js). Extend as the app grows (e.g. distinguishing
 * validation errors, auth errors, etc.).
 */
export function errorHandler(err, req, res, _next) {
  // eslint-disable-next-line no-console
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || "Internal server error" });
}

export function notFoundHandler(req, res) {
  res.status(404).json({ error: `Not found: ${req.method} ${req.originalUrl}` });
}
