import { Router } from "express";
import { listPublished, publicCategories, getBySlug } from "../controllers/blogController.js";
import { publicList } from "../controllers/categoryController.js";

const router = Router();

router.get("/", listPublished);
router.get("/categories", publicCategories);
router.get("/all-categories", publicList);
router.get("/:slug", getBySlug);

export default router;