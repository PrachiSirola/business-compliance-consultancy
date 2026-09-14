import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import Reveal from "../components/common/Reveal";
import { API_BASE } from "../lib/api";

export default function BlogArticle() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetch(`${API_BASE}/api/blog/${slug}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then(setBlog)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <section className="section" style={{ textAlign: "center" }}>
        <p style={{ color: "var(--stone)", padding: "60px 0" }}>Loading…</p>
      </section>
    );
  }

  if (error || !blog) {
    return (
      <section className="section" style={{ textAlign: "center" }}>
        <div className="container">
          <h1>Post not found</h1>
          <p style={{ marginBottom: 20 }}>The article you're looking for doesn't exist or has been unpublished.</p>
          <Link className="btn btn--primary" to="/blog">← Back to blog</Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <SEO
        title={blog.metaTitle || `${blog.title} — Suits`}
        description={blog.metaDescription || blog.excerpt}
      />

      <section className="pagehead">
        <div className="container">
          <Reveal className="pagehead__in">
            <p className="breadcrumb">
              <Link to="/">Home</Link>{" "}
              <span style={{ opacity: 0.5 }}>/</span>{" "}
              <Link to="/blog">Blog</Link>{" "}
              <span style={{ opacity: 0.5 }}>/</span>{" "}
              {blog.category}
            </p>
            <h1>{blog.title}</h1>
            {blog.excerpt && <p className="lead">{blog.excerpt}</p>}
            {(blog.author || blog.readTime) && (
              <p style={{ fontSize: ".9rem", color: "var(--stone)", marginTop: 8 }}>
                {blog.author && <span>By {blog.author}</span>}
                {blog.author && blog.readTime && <span> · </span>}
                {blog.readTime && <span>{blog.readTime}</span>}
              </p>
            )}
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal
            as="article"
            className="prose"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </section>
    </>
  );
}