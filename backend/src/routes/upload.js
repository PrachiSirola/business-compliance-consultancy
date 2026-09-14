import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = Router();

/** POST /api/upload — single image upload (admin only) */
router.post("/", requireAuth, upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No image uploaded" });
  const url = `/uploads/${req.file.filename}`;
  res.json({ url });
});

export default router;