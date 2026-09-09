import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import Reveal from "../components/common/Reveal";
import IcoRaw from "../components/common/IcoRaw";
import { SERVICES } from "../data/business";

const ARROW = '<path d="M5 12h14M13 6l6 6-6 6"/>';

// Bucket blurbs exactly as written on the original services.html
// (kept separate from SERVICES.tags, which drive the nav dropdown instead).
const BUCKET_BLURB = {
  "business-setup": "Company, LLP, OPC, Section 8, Nidhi and public registration, foreign-entity India entry, plus Startup India, MSME, IEC and 12A/80G.",
  "corporate-compliance":
    "Annual and event-based ROC compliance — director changes, registered office, share transfers, capital changes, strike-off, KYC, due diligence and ESOP.",
  "fema-foreign-investment":
    "FC-GPR, FC-TRS, FLA returns, and FDI/ODI compliance for cross-border investment.",
  "conversions-restructuring":
    "Company ↔ LLP, public ↔ private, OPC conversions and LLP agreement amendments.",
  "trademark-legal-drafting":
    "Trademark registration, objection and renewal, plus resolutions, agreements, MOUs, shareholders' agreements and SPAs.",
};

export default function Services() {
  return (
    <>
      <SEO
        title="Services — Suits"
        description="The full Suits service catalogue: business setup, corporate compliance, FEMA & foreign investment, conversions, and trademark & legal drafting."
      />

      <section className="pagehead">
        <div className="container">
          <Reveal className="pagehead__in">
            <p className="breadcrumb">
              <Link to="/">Home</Link> <span style={{ opacity: 0.5 }}>/</span> Services
            </p>
            <h1>Our services</h1>
            <p className="lead">
              Everything a company needs across its lifecycle, organised into five clear areas.
              Explore a bucket, or ask the Suits Assistant to point you to the right one.
            </p>
            <div className="hero__cta" style={{ marginTop: 22 }}>
              <Link className="btn btn--primary" to="/contact">
                Get started
              </Link>
              <Link className="btn btn--ghost" to="/services">
                All services
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} className="bucket">
              <div className="bucket__no">{String(i + 1).padStart(2, "0")}</div>
              <div className="bucket__body">
                <h3>{s.title}</h3>
                <p>{BUCKET_BLURB[s.slug]}</p>
                <Link className="card__link" to={`/${s.slug}`}>
                  Explore {s.title} <IcoRaw paths={ARROW} strokeWidth={2} />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section band--teal">
        <Reveal className="container center" style={{ maxWidth: 620, marginInline: "auto" }}>
          <h2>Not sure which one you need?</h2>
          <p className="lead" style={{ color: "#fff", opacity: 0.92, marginInline: "auto" }}>
            Ask the Suits Assistant or book a free consultation — we'll point you to the right
            service.
          </p>
          <div className="hero__cta" style={{ justifyContent: "center", marginTop: 20 }}>
            <Link className="btn btn--light" to="/contact">
              Book a consultation
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
