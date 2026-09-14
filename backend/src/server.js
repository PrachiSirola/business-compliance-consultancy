import express from "express";
import path from "path";
import cors from "cors";
import { env } from "./config/env.js";
import { connectDB } from "./config/db.js";
import apiRoutes from "./routes/index.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(
  cors({
    origin: env.corsOrigins,
  })
);
app.use(express.json({ limit: "5mb" }));

// Serve uploaded blog images as static files.
app.use("/uploads", express.static(path.resolve("uploads")));

// Health check — useful for uptime checks / deploy verification.
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

connectDB().finally(() => {
  app.listen(env.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Backend listening on http://localhost:${env.port} (${env.nodeEnv})`);
  });
});