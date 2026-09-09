import mongoose from "mongoose";
import { env } from "./env.js";

let connecting = null;

/**
 * Connects to MongoDB Atlas (or any Mongo URI) once and reuses the
 * connection. Call this before the server starts accepting requests.
 */
export async function connectDB() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  if (connecting) return connecting;

  if (!env.mongoUri) {
    // eslint-disable-next-line no-console
    console.warn(
      "⚠ MONGODB_URI is not set — enquiry storage and admin login will not work until it is configured in .env"
    );
    return null;
  }

  connecting = mongoose
    .connect(env.mongoUri)
    .then((conn) => {
      // eslint-disable-next-line no-console
      console.log(`MongoDB connected: ${conn.connection.host}`);
      return conn;
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error("MongoDB connection error:", err.message);
      connecting = null;
      throw err;
    });

  return connecting;
}
