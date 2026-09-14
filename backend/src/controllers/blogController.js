import Blog from "../models/Blog.js";

/* =========================================================
   HELPERS
   ========================================================= */

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

/* =========================================================
   PUBLIC
   ========================================================= */

/** GET /api/blog — published posts, server-side search + filter + pagination */
export async function listPublished(req, res) {
  const { search, category, page = 1, limit = 12 } = req.query;
  const filter = { status: "published" };

  if (category) filter.category = category;
  if (search) filter.$text = { $search: search };

  const skip = (Math.max(1, +page) - 1) * +limit;
  const [blogs, total] = await Promise.all([
    Blog.find(filter)
      .select("-content")
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(+limit)
      .lean(),
    Blog.countDocuments(filter),
  ]);

  res.json({ blogs, total, page: +page, pages: Math.ceil(total / +limit) });
}

/** GET /api/blog/categories — distinct categories from published posts */
export async function publicCategories(_req, res) {
  const cats = await Blog.distinct("category", { status: "published" });
  res.json(cats.sort());
}

/** GET /api/blog/:slug — single published post by slug */
export async function getBySlug(req, res) {
  const blog = await Blog.findOne({ slug: req.params.slug, status: "published" }).lean();
  if (!blog) return res.status(404).json({ error: "Post not found" });
  res.json(blog);
}

/* =========================================================
   ADMIN
   ========================================================= */

/** GET /api/admin/blogs — all posts (any status), with search + filter */
export async function adminList(req, res) {
  const { search, category, status, page = 1, limit = 20 } = req.query;
  const filter = {};

  if (status) filter.status = status;
  if (category) filter.category = category;
  if (search) filter.$text = { $search: search };

  const skip = (Math.max(1, +page) - 1) * +limit;
  const [blogs, total] = await Promise.all([
    Blog.find(filter)
      .select("-content")
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(+limit)
      .lean(),
    Blog.countDocuments(filter),
  ]);

  res.json({ blogs, total, page: +page, pages: Math.ceil(total / +limit) });
}

/** GET /api/admin/blogs/:id */
export async function adminGet(req, res) {
  const blog = await Blog.findById(req.params.id).lean();
  if (!blog) return res.status(404).json({ error: "Post not found" });
  res.json(blog);
}

/** POST /api/admin/blogs */
export async function adminCreate(req, res) {
  const { title, slug: rawSlug, ...rest } = req.body;
  const slug = rawSlug ? slugify(rawSlug) : slugify(title || "untitled");

  // Ensure unique slug
  let finalSlug = slug;
  let i = 1;
  while (await Blog.exists({ slug: finalSlug })) {
    finalSlug = `${slug}-${i++}`;
  }

  if (rest.status === "published" && !rest.publishedAt) {
    rest.publishedAt = new Date();
  }

  const blog = await Blog.create({ title, slug: finalSlug, ...rest });
  res.status(201).json(blog);
}

/** PATCH /api/admin/blogs/:id */
export async function adminUpdate(req, res) {
  const update = { ...req.body };

  // Auto-generate slug from title if slug not explicitly provided
  if (update.title && !update.slug) {
    update.slug = slugify(update.title);
  } else if (update.slug) {
    update.slug = slugify(update.slug);
  }

  // Ensure unique slug (excluding self)
  if (update.slug) {
    let finalSlug = update.slug;
    let i = 1;
    while (await Blog.exists({ slug: finalSlug, _id: { $ne: req.params.id } })) {
      finalSlug = `${update.slug}-${i++}`;
    }
    update.slug = finalSlug;
  }

  // Set publishedAt on first publish
  if (update.status === "published") {
    const existing = await Blog.findById(req.params.id).select("publishedAt").lean();
    if (!existing?.publishedAt) update.publishedAt = new Date();
  }

  const blog = await Blog.findByIdAndUpdate(req.params.id, update, { new: true }).lean();
  if (!blog) return res.status(404).json({ error: "Post not found" });
  res.json(blog);
}

/** DELETE /api/admin/blogs/:id */
export async function adminDelete(req, res) {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  if (!blog) return res.status(404).json({ error: "Post not found" });
  res.json({ message: "Deleted" });
}