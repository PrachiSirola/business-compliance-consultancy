import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import Reveal from "../components/common/Reveal";
import PostCard from "../components/sections/PostCard";
import { API_BASE } from "../lib/api";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [searchInput, setSearchInput] = useState("");

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  // Fetch blogs
  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(
        Object.fromEntries(
          Object.entries({ search,limit: 12 }).filter(
            ([, v]) => v !== undefined && v !== ""
          )
        )
      );
      const res = await fetch(`${API_BASE}/api/blog?${params}`);
      const data = await res.json();
      setBlogs(data.blogs || []);
      setTotal(data.total || 0);
      setPages(data.pages || 1);
    } catch {
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, [search, page]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return (
    <>
      <SEO
        title="Insights — Suits blog"
        description="Plain-English guides on company registration, FEMA/FDI, trademarks, compliance calendars, and MCA updates from Suits."
      />

      {/* =====================================================
          BLOG HERO  (unchanged from original design)
          ===================================================== */}
      <section className="blog-hero">
        <div className="blog-hero__inner">
          <Reveal className="blog-hero__content">
            <p className="blog-hero__breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              Blog
            </p>

            <p className="blog-hero__eyebrow">
              KNOWLEDGE · COMPLIANCE · BUSINESS
            </p>

            <h1>Insights</h1>

            <p className="blog-hero__lead">
              Practical, plain-English guides to keep you ahead of
              compliance. New articles added regularly.
            </p>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          BLOG CONTENT
          ===================================================== */}
      <section className="blog-content">
        <div className="container">

          {/* Search + category filter */}
          <Reveal className="blog-toolbar">
            <div className="blog-search">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" />
              </svg>

              <input
                type="text"
                placeholder="Search articles, topics..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </Reveal>

          {loading ? (
            <p style={{ textAlign: "center", padding: "40px 0", color: "var(--stone)" }}>
              Loading articles…
            </p>
          ) : blogs.length === 0 ? (
            <p style={{ textAlign: "center", padding: "40px 0", color: "var(--stone)" }}>
              No articles found.
            </p>
          ) : (
            <Reveal className="grid grid--3 blog-post-grid">
              {blogs.map((b) => (
                <PostCard
                  key={b._id}
                  to={`/blog/${b.slug}`}
                  category={b.category}
                  title={b.title}
                  meta={b.readTime || ""}
                  image={b.featuredImage}
                >
                  {b.excerpt}
                </PostCard>
              ))}
            </Reveal>
          )}

          {/* Pagination */}
          {pages > 1 && (
            <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 28 }}>
              <button
                className="btn btn--ghost"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
              >
                ← Newer
              </button>
              <span style={{ padding: "10px 6px", fontSize: ".9rem", color: "var(--stone)" }}>
                {page} / {pages}
              </span>
              <button
                className="btn btn--ghost"
                disabled={page >= pages}
                onClick={() => setPage(page + 1)}
              >
                Older →
              </button>
            </div>
          )}

        </div>
      </section>
    </>
  );
}