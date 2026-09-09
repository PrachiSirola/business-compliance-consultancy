import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";

export default function NotFound() {
  return (
    <>
      <SEO title="Page not found — Suits" description="The page you're looking for doesn't exist." />
      <section className="section center" style={{ padding: "120px 0" }}>
        <div className="container">
          <p className="eyebrow" style={{ justifyContent: "center" }}>404</p>
          <h1>Page not found</h1>
          <p className="lead" style={{ marginInline: "auto" }}>
            The page you're looking for doesn't exist or may have moved.
          </p>
          <div className="hero__cta" style={{ justifyContent: "center", marginTop: 22 }}>
            <Link className="btn btn--primary" to="/">
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
