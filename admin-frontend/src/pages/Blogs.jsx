import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteBlog, setDeleteBlog] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.listBlogs({ search, status, category, page, limit: 15 });
      setBlogs(res.blogs);
      setTotal(res.total);
      setPages(res.pages);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [search, status, category, page]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  useEffect(() => {
    api.listCategories().then(setCategories).catch(() => {});
  }, []);

  // Debounced search
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  function handleDelete(id, title) {
    setDeleteBlog({ id, title });
  }

  async function confirmDelete() {
    if (!deleteBlog) return;

    setDeleting(true);

    try {
        await api.deleteBlog(deleteBlog.id);
        setDeleteBlog(null);
        await fetchBlogs();
    } catch (e) {
        alert(e.message);
    } finally {
        setDeleting(false);
    }
 }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <h1 className="page-title">Blog Posts ({total})</h1>
        <Link to="/blogs/new" className="btn btn--primary">+ New Post</Link>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
        <input
          className="input"
          type="text"
          placeholder="Search posts…"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          style={{ flex: "1 1 200px", minWidth: 160 }}
        />
        <select className="input" value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }} style={{ width: 140 }}>
          <option value="">All statuses</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        <select className="input" value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }} style={{ width: 180 }}>
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c._id} value={c.name}>{c.name}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="muted">Loading…</p>
      ) : blogs.length === 0 ? (
        <p className="muted">No blog posts found.</p>
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Date</th>
                <th style={{ width: 130 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((b) => (
                <tr key={b._id}>
                  <td>
                    <Link to={`/blogs/${b._id}/edit`} className="link">{b.title}</Link>
                  </td>
                  <td>{b.category}</td>
                  <td>
                    <span className={`badge badge--${b.status === "published" ? "success" : "muted"}`}>
                      {b.status}
                    </span>
                  </td>
                  <td>{b.publishedAt ? new Date(b.publishedAt).toLocaleDateString() : "—"}</td>
                  <td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <Link to={`/blogs/${b._id}/edit`} className="btn btn--sm btn--ghost">Edit</Link>
                      <button className="btn btn--sm btn--danger" onClick={() => handleDelete(b._id, b.title)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

            {pages > 1 && (
                <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 20 }}>
                    <button className="btn btn--sm btn--ghost" disabled={page <= 1} onClick={() => setPage(page - 1)}>
                        ← Prev
                    </button>
                    <span style={{ padding: "7px 10px", fontSize: ".88rem" }}>
                        {page} / {pages}
                    </span>
                    <button className="btn btn--sm btn--ghost" disabled={page >= pages} onClick={() => setPage(page + 1)}>
                        Next →
                    </button>
                    </div>
                )}

                {deleteBlog && (
                    <div
                    className="delete-modal-overlay"
                    onClick={() => !deleting && setDeleteBlog(null)}
                    >
                    <div
                        className="delete-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="delete-modal__icon">
                        !
                        </div>

                        <h2>Delete blog post?</h2>

                        <p>
                        Are you sure you want to delete{" "}
                        <strong>"{deleteBlog.title}"</strong>?
                        </p>

                        <div className="delete-modal__actions">
                        <button
                            type="button"
                            className="btn btn--ghost"
                            onClick={() => setDeleteBlog(null)}
                            disabled={deleting}
                        >
                            Discard
                        </button>

                        <button
                            type="button"
                            className="btn btn--danger"
                            onClick={confirmDelete}
                            disabled={deleting}
                        >
                            {deleting ? "Deleting…" : "Confirm Delete"}
                        </button>
                        </div>
                    </div>
                    </div>
                )}
                </div>
            );
            }