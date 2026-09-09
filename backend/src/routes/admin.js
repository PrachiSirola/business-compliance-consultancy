import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  listEnquiries,
  getEnquiry,
  updateEnquiry,
  addNote,
  deleteEnquiry,
  getStats,
} from "../controllers/enquiryController.js";

const router = Router();

router.use(requireAuth);

router.get("/stats", getStats);

router.get("/enquiries", listEnquiries);
router.get("/enquiries/:id", getEnquiry);
router.patch("/enquiries/:id", updateEnquiry);
router.post("/enquiries/:id/notes", addNote);
router.delete("/enquiries/:id", deleteEnquiry);

export default router;
