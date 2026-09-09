import { Router } from "express";
import { postChat } from "../controllers/chatController.js";

const router = Router();

// POST /api/chat — Suits Assistant chatbot backend (ported from the
// original Netlify function so the frontend's existing feature keeps working).
router.post("/", postChat);

export default router;
