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
import {
  adminList,
  adminGet,
  adminCreate,
  adminUpdate,
  adminDelete,
} from "../controllers/blogController.js";
import {
  list as listCategories,
  create as createCategory,
  update as updateCategory,
  remove as removeCategory,
} from "../controllers/categoryController.js";

const router = Router();

router.use(requireAuth);

router.get("/stats", getStats);

router.get("/enquiries", listEnquiries);
router.get("/enquiries/:id", getEnquiry);
router.patch("/enquiries/:id", updateEnquiry);
router.post("/enquiries/:id/notes", addNote);
router.delete("/enquiries/:id", deleteEnquiry);

// Blog management
router.get("/blogs", adminList);
router.get("/blogs/:id", adminGet);
router.post("/blogs", adminCreate);
router.patch("/blogs/:id", adminUpdate);
router.delete("/blogs/:id", adminDelete);

// Category management
router.get("/categories", listCategories);
router.post("/categories", createCategory);
router.patch("/categories/:id", updateCategory);
router.delete("/categories/:id", removeCategory);

export default router;