import { Router } from "express";
import chatRoutes from "./chat.js";
import authRoutes from "./auth.js";
import enquiryRoutes from "./enquiries.js";
import adminRoutes from "./admin.js";

const router = Router();

// Ported from the static site: the Suits Assistant chatbot backend.
router.use("/chat", chatRoutes);

// Admin authentication.
router.use("/auth", authRoutes);

// Public enquiry submission (contact/enquiry/feedback forms + chatbot leads).
router.use("/enquiries", enquiryRoutes);

// Admin-only enquiry management + dashboard stats.
router.use("/admin", adminRoutes);

export default router;
