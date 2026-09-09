import { Router } from "express";
import { createEnquiry } from "../controllers/enquiryController.js";

const router = Router();

// POST /api/enquiries — public submission from the website's contact/
// enquiry/feedback forms and the chatbot's lead-capture mini-form.
router.post("/", createEnquiry);

export default router;
