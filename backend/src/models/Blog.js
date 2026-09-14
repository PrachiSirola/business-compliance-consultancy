import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: { type: String, required: true, trim: true },
    excerpt: { type: String, default: "", trim: true },
    /** Sanitised HTML produced by TipTap on the admin side. */
    content: { type: String, default: "" },
    featuredImage: { type: String, default: "" },
    author: { type: String, default: "CS Deepika", trim: true },
    readTime: { type: String, default: "", trim: true },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    publishedAt: { type: Date, default: null },
    metaTitle: { type: String, default: "", trim: true },
    metaDescription: { type: String, default: "", trim: true },
  },
  { timestamps: true }
);

blogSchema.index({ title: "text", excerpt: "text", content: "text" });
blogSchema.index({ status: 1, publishedAt: -1 });
blogSchema.index({ category: 1 });

export default mongoose.model("Blog", blogSchema);