import Category from "../models/Category.js";

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "");
}

/** GET /api/admin/categories */
export async function list(_req, res) {
  const cats = await Category.find().sort({ name: 1 }).lean();
  res.json(cats);
}

/** POST /api/admin/categories */
export async function create(req, res) {
  const { name } = req.body;
  if (!name?.trim()) return res.status(400).json({ error: "Name is required" });
  const slug = slugify(name);
  const exists = await Category.findOne({ slug });
  if (exists) return res.status(409).json({ error: "Category already exists" });
  const cat = await Category.create({ name: name.trim(), slug });
  res.status(201).json(cat);
}

/** PATCH /api/admin/categories/:id */
export async function update(req, res) {
  const { name } = req.body;
  if (!name?.trim()) return res.status(400).json({ error: "Name is required" });
  const slug = slugify(name);
  const dup = await Category.findOne({ slug, _id: { $ne: req.params.id } });
  if (dup) return res.status(409).json({ error: "Category already exists" });
  const cat = await Category.findByIdAndUpdate(
    req.params.id,
    { name: name.trim(), slug },
    { new: true }
  );
  if (!cat) return res.status(404).json({ error: "Category not found" });
  res.json(cat);
}

/** DELETE /api/admin/categories/:id */
export async function remove(req, res) {
  const cat = await Category.findByIdAndDelete(req.params.id);
  if (!cat) return res.status(404).json({ error: "Category not found" });
  res.json({ message: "Deleted" });
}

/** GET /api/categories — public (no auth) */
export async function publicList(_req, res) {
  const cats = await Category.find().sort({ name: 1 }).lean();
  res.json(cats);
}