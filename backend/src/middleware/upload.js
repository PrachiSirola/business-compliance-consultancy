import multer from "multer";
import path from "path";
import crypto from "crypto";

const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    cb(null, path.resolve("uploads"));
  },
  filename(_req, file, cb) {
    const unique = crypto.randomBytes(8).toString("hex");
    const ext = path.extname(file.originalname).toLowerCase() || ".jpg";
    cb(null, `${Date.now()}-${unique}${ext}`);
  },
});

function fileFilter(_req, file, cb) {
  const allowed = /jpeg|jpg|png|gif|webp|svg/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.test(ext) && allowed.test(file.mimetype.split("/")[1] || "")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files (jpg, png, gif, webp, svg) are allowed"));
  }
}

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});