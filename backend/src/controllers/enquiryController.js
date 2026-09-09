import Enquiry, { ENQUIRY_STATUSES, ENQUIRY_SOURCES } from "../models/Enquiry.js";

/* ---------------------------------------------------------------------- */
/* Public — used by the website's contact/enquiry/feedback forms and the   */
/* chatbot's lead-capture mini-form.                                       */
/* ---------------------------------------------------------------------- */
export async function createEnquiry(req, res) {
  const { name, email, phone, service, preferredTime, message, rating, source, type } =
    req.body || {};

  if (!name || !String(name).trim()) {
    return res.status(400).json({ error: "Name is required" });
  }

  const resolvedSource = ENQUIRY_SOURCES.includes(source)
    ? source
    : ENQUIRY_SOURCES.includes(type)
    ? type
    : "Enquiry";

  const enquiry = await Enquiry.create({
    name: String(name).trim(),
    email: email ? String(email).trim() : "",
    phone: phone ? String(phone).trim() : "",
    service: service || "",
    preferredTime: preferredTime || "",
    message: message || "",
    rating: rating || "",
    source: resolvedSource,
  });

  return res.status(201).json({ enquiry });
}

/* ---------------------------------------------------------------------- */
/* Admin — protected by requireAuth in routes/admin.js                     */
/* ---------------------------------------------------------------------- */

export async function listEnquiries(req, res) {
  const {
    search = "",
    status,
    source,
    archived,
    page = 1,
    limit = 20,
    sort = "-createdAt",
  } = req.query;

  const query = {};

  if (status && ENQUIRY_STATUSES.includes(status)) query.status = status;
  if (source && ENQUIRY_SOURCES.includes(source)) query.source = source;
  if (archived === "true") query.archived = true;
  else if (archived === "false" || archived === undefined) query.archived = { $ne: true };
  // archived === "all" -> no filter on archived

  if (search && search.trim()) {
    const re = new RegExp(search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    query.$or = [{ name: re }, { email: re }, { phone: re }, { message: re }, { service: re }];
  }

  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));

  const [items, total] = await Promise.all([
    Enquiry.find(query)
      .sort(sort)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Enquiry.countDocuments(query),
  ]);

  return res.json({
    items,
    total,
    page: pageNum,
    limit: limitNum,
    totalPages: Math.max(1, Math.ceil(total / limitNum)),
  });
}

export async function getEnquiry(req, res) {
  const enquiry = await Enquiry.findById(req.params.id);
  if (!enquiry) return res.status(404).json({ error: "Enquiry not found" });
  return res.json({ enquiry });
}

export async function updateEnquiry(req, res) {
  const { status, assignedTo, archived } = req.body || {};
  const update = {};

  if (status !== undefined) {
    if (!ENQUIRY_STATUSES.includes(status)) {
      return res.status(400).json({ error: `status must be one of: ${ENQUIRY_STATUSES.join(", ")}` });
    }
    update.status = status;
  }
  if (assignedTo !== undefined) update.assignedTo = assignedTo;
  if (archived !== undefined) update.archived = Boolean(archived);

  const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, update, { new: true });
  if (!enquiry) return res.status(404).json({ error: "Enquiry not found" });
  return res.json({ enquiry });
}

export async function addNote(req, res) {
  const { text } = req.body || {};
  if (!text || !String(text).trim()) {
    return res.status(400).json({ error: "Note text is required" });
  }

  const enquiry = await Enquiry.findByIdAndUpdate(
    req.params.id,
    { $push: { notes: { text: String(text).trim(), author: req.admin?.name || req.admin?.email || "" } } },
    { new: true }
  );
  if (!enquiry) return res.status(404).json({ error: "Enquiry not found" });
  return res.status(201).json({ enquiry });
}

export async function deleteEnquiry(req, res) {
  const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
  if (!enquiry) return res.status(404).json({ error: "Enquiry not found" });
  return res.json({ deleted: true });
}

export async function getStats(req, res) {
  const [total, archived, byStatus] = await Promise.all([
    Enquiry.countDocuments({ archived: { $ne: true } }),
    Enquiry.countDocuments({ archived: true }),
    Enquiry.aggregate([
      { $match: { archived: { $ne: true } } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]),
  ]);

  const counts = Object.fromEntries(ENQUIRY_STATUSES.map((s) => [s, 0]));
  byStatus.forEach((row) => {
    if (row._id in counts) counts[row._id] = row.count;
  });

  return res.json({ total, archived, ...counts });
}
