import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { api, API_BASE } from "../lib/api";

/* ── Slug helper ─────────────────────────────────────────── */
function toSlug(s) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "");
}

/* ── Toolbar ─────────────────────────────────────────────── */
function Toolbar({ editor, onUploadImage }) {
  if (!editor) return null;
  const btn = (label, action, isActive) => (
    <button
      type="button"
      className={"te-btn" + (isActive ? " active" : "")}
      onClick={action}
      title={label}
    >
      {label}
    </button>
  );

  function handleInsertLink() {
    const url = prompt("Enter URL:");
    if (url) editor.chain().focus().setLink({ href: url, target: "_blank" }).run();
  }

  function handleInsertImageUrl() {
    const url = prompt("Enter image URL:");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  }

  return (
    <div className="te-toolbar">
      {btn("B", () => editor.chain().focus().toggleBold().run(), editor.isActive("bold"))}
      {btn("I", () => editor.chain().focus().toggleItalic().run(), editor.isActive("italic"))}
      {btn("H2", () => editor.chain().focus().toggleHeading({ level: 2 }).run(), editor.isActive("heading", { level: 2 }))}
      {btn("H3", () => editor.chain().focus().toggleHeading({ level: 3 }).run(), editor.isActive("heading", { level: 3 }))}
      {btn("• List", () => editor.chain().focus().toggleBulletList().run(), editor.isActive("bulletList"))}
      {btn("1. List", () => editor.chain().focus().toggleOrderedList().run(), editor.isActive("orderedList"))}
      {btn("Quote", () => editor.chain().focus().toggleBlockquote().run(), editor.isActive("blockquote"))}
      {btn("Link", handleInsertLink, editor.isActive("link"))}
      <span className="te-sep" />
      {btn("🖼 Upload", onUploadImage, false)}
      {btn("🔗 Image URL", handleInsertImageUrl, false)}
    </div>
  );
}

/* ── Main Editor Page ────────────────────────────────────── */
export default function BlogEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "",
    excerpt: "",
    featuredImage: "",
    author: "CS Deepika",
    readTime: "",
    status: "draft",
    metaTitle: "",
    metaDescription: "",
  });
  const [categories, setCategories] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ allowBase64: false, inline: false }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: "Write your article…" }),
    ],
    content: "",
  });

  // Load categories
  useEffect(() => {
    api.listCategories().then(setCategories).catch(() => {});
  }, []);

  // Load existing blog for edit
  useEffect(() => {
    if (!isEdit) return;
    api.getBlog(id).then((b) => {
      setForm({
        title: b.title || "",
        slug: b.slug || "",
        category: b.category || "",
        excerpt: b.excerpt || "",
        featuredImage: b.featuredImage || "",
        author: b.author || "CS Deepika",
        readTime: b.readTime || "",
        status: b.status || "draft",
        metaTitle: b.metaTitle || "",
        metaDescription: b.metaDescription || "",
      });
      setSlugEdited(true);
      if (editor) editor.commands.setContent(b.content || "");
    }).catch((e) => setError(e.message));
  }, [id, isEdit, editor]);

  // Auto-generate slug from title
  useEffect(() => {
    if (!slugEdited && form.title) {
      setForm((f) => ({ ...f, slug: toSlug(f.title) }));
    }
  }, [form.title, slugEdited]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  /* ── Image upload (for inline content images) ──────────── */
  const handleUploadImage = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      try {
        const { url } = await api.uploadImage(file);
        const fullUrl = url.startsWith("http") ? url : `${API_BASE}${url}`;
        editor?.chain().focus().setImage({ src: fullUrl }).run();
      } catch (e) {
        alert("Image upload failed: " + e.message);
      }
    };
    input.click();
  }, [editor]);

  /* ── Featured image upload ─────────────────────────────── */
  async function handleFeaturedUpload() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      try {
        const { url } = await api.uploadImage(file);
        setForm((f) => ({ ...f, featuredImage: url }));
      } catch (e) {
        alert("Upload failed: " + e.message);
      }
    };
    input.click();
  }

  /* ── Drop/paste images into editor ─────────────────────── */
  useEffect(() => {
    if (!editor) return;
    const handleDrop = async (view, event) => {
      const file = event.dataTransfer?.files?.[0];
      if (!file || !file.type.startsWith("image/")) return false;
      event.preventDefault();
      try {
        const { url } = await api.uploadImage(file);
        const fullUrl = url.startsWith("http") ? url : `${API_BASE}${url}`;
        editor.chain().focus().setImage({ src: fullUrl }).run();
      } catch (e) {
        alert("Upload failed: " + e.message);
      }
      return true;
    };

    const handlePaste = async (view, event) => {
      const file = event.clipboardData?.files?.[0];
      if (!file || !file.type.startsWith("image/")) return false;
      event.preventDefault();
      try {
        const { url } = await api.uploadImage(file);
        const fullUrl = url.startsWith("http") ? url : `${API_BASE}${url}`;
        editor.chain().focus().setImage({ src: fullUrl }).run();
      } catch (e) {
        alert("Upload failed: " + e.message);
      }
      return true;
    };

    editor.view.dom.addEventListener("drop", (e) => handleDrop(editor.view, e));
    editor.view.dom.addEventListener("paste", (e) => handlePaste(editor.view, e));
  }, [editor]);

  /* ── Save ───────────────────────────────────────────────── */
  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const body = { ...form, content: editor?.getHTML() || "" };
      if (isEdit) {
        await api.updateBlog(id, body);
      } else {
        await api.createBlog(body);
      }
      navigate("/blogs");
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  const featuredSrc = form.featuredImage
    ? form.featuredImage.startsWith("http")
      ? form.featuredImage
      : `${API_BASE}${form.featuredImage}`
    : "";

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <h1 className="page-title">{isEdit ? "Edit Post" : "New Post"}</h1>
        <button type="button" className="btn btn--ghost" onClick={() => navigate("/blogs")}>← Back</button>
      </div>

      {error && <p style={{ color: "var(--danger)", marginBottom: 14 }}>{error}</p>}

      <form onSubmit={handleSave}>
        <div className="be-grid">
          {/* ── Main column ── */}
          <div className="be-main">
            <label className="be-label">Title</label>
            <input className="input" value={form.title} onChange={set("title")} required />

            <label className="be-label">Slug</label>
            <input
              className="input"
              value={form.slug}
              onChange={(e) => { setSlugEdited(true); set("slug")(e); }}
            />

            <label className="be-label">Content</label>
            <div className="te-wrap">
              <Toolbar editor={editor} onUploadImage={handleUploadImage} />
              <EditorContent editor={editor} className="te-content" />
            </div>

            <label className="be-label">Excerpt</label>
            <textarea className="input" rows={3} value={form.excerpt} onChange={set("excerpt")} />
          </div>

          {/* ── Sidebar column ── */}
          <div className="be-side">
            <div className="be-card">
              <label className="be-label">Status</label>
              <select className="input" value={form.status} onChange={set("status")}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>

              <label className="be-label">Category</label>
              <select className="input" value={form.category} onChange={set("category")} required>
                <option value="">Select…</option>
                {categories.map((c) => (
                  <option key={c._id} value={c.name}>{c.name}</option>
                ))}
              </select>

              <label className="be-label">Author</label>
              <input className="input" value={form.author} onChange={set("author")} />

              <label className="be-label">Read Time</label>
              <input className="input" placeholder="e.g. 6 min read" value={form.readTime} onChange={set("readTime")} />
            </div>

            <div className="be-card">
              <label className="be-label">Featured Image</label>
              {featuredSrc && (
                <img src={featuredSrc} alt="" style={{ width: "100%", borderRadius: 8, marginBottom: 10 }} />
              )}
              <div style={{ display: "flex", gap: 8 }}>
                <button type="button" className="btn btn--sm btn--ghost" onClick={handleFeaturedUpload}>Upload</button>
                <input
                  className="input"
                  placeholder="or paste URL"
                  value={form.featuredImage}
                  onChange={set("featuredImage")}
                  style={{ flex: 1 }}
                />
              </div>
              {form.featuredImage && (
                <button
                  type="button"
                  className="btn btn--sm btn--ghost"
                  style={{ marginTop: 6 }}
                  onClick={() => setForm((f) => ({ ...f, featuredImage: "" }))}
                >
                  Remove
                </button>
              )}
            </div>

            <div className="be-card">
              <label className="be-label">SEO Title</label>
              <input className="input" value={form.metaTitle} onChange={set("metaTitle")} />
              <label className="be-label">SEO Description</label>
              <textarea className="input" rows={2} value={form.metaDescription} onChange={set("metaDescription")} />
            </div>

            <button type="submit" className="btn btn--primary" disabled={saving} style={{ width: "100%" }}>
              {saving ? "Saving…" : isEdit ? "Update Post" : "Create Post"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}