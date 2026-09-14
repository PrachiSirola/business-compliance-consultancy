import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function Categories() {
  const [cats, setCats] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [error, setError] = useState("");
  const [deleteCategory, setDeleteCategory] = useState(null);
  const [deleting, setDeleting] = useState(false);

  async function load() {
    try {
      const data = await api.listCategories();
      setCats(data);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleCreate(e) {
    e.preventDefault();
    setError("");
    try {
      await api.createCategory(name);
      setName("");
      load();
    } catch (e) {
      setError(e.message);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    setError("");
    try {
      await api.updateCategory(editId, editName);
      setEditId(null);
      setEditName("");
      load();
    } catch (e) {
      setError(e.message);
    }
  }

  function handleDelete(id, catName) {
    setDeleteCategory({ id, name: catName });
  }

  async function confirmDelete() {
    if (!deleteCategory) return;

    setDeleting(true);
    setError("");

    try {
        await api.deleteCategory(deleteCategory.id);
        setDeleteCategory(null);
        await load();
    } catch (e) {
        setError(e.message);
    } finally {
        setDeleting(false);
    }
}

  return (
    <div>
      <h1 className="page-title">Blog Categories</h1>

      {error && <p style={{ color: "var(--danger)", marginBottom: 12 }}>{error}</p>}

      <form onSubmit={handleCreate} style={{ display: "flex", gap: 10, marginBottom: 24 }}>
        <input
          className="input"
          placeholder="New category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ maxWidth: 300 }}
        />
        <button type="submit" className="btn btn--primary btn--sm">Add</button>
      </form>

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Slug</th>
              <th style={{ width: 180 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cats.map((c) => (
              <tr key={c._id}>
                <td>
                  {editId === c._id ? (
                    <form onSubmit={handleUpdate} style={{ display: "flex", gap: 8 }}>
                      <input
                        className="input"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        autoFocus
                        style={{ width: 200 }}
                      />
                      <button type="submit" className="btn btn--sm btn--primary">Save</button>
                      <button type="button" className="btn btn--sm btn--ghost" onClick={() => setEditId(null)}>Cancel</button>
                    </form>
                  ) : (
                    c.name
                  )}
                </td>
                <td className="muted">{c.slug}</td>
                <td>
                  {editId !== c._id && (
                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        className="btn btn--sm btn--ghost"
                        onClick={() => { setEditId(c._id); setEditName(c.name); }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn--sm btn--danger"
                        onClick={() => handleDelete(c._id, c.name)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {cats.length === 0 && (
              <tr><td colSpan={3} className="muted">No categories yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      {deleteCategory && (
        <div
          className="delete-modal-overlay"
          onClick={() => !deleting && setDeleteCategory(null)}
        >
          <div
            className="delete-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="delete-modal__icon">
              !
            </div>

            <h2>Delete category?</h2>

            <p>
              Are you sure you want to delete{" "}
              <strong>"{deleteCategory.name}"</strong>?
            </p>

            <div className="delete-modal__actions">
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => setDeleteCategory(null)}
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