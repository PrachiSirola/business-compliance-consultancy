import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import Reveal from "../components/common/Reveal";
import IcoRaw from "../components/common/IcoRaw";
import { SERVICES } from "../data/business";

const ARROW = '<path d="M5 12h14M13 6l6 6-6 6"/>';
const CHECK = '<path d="M5 12l4 4L19 6"/>';

const BUCKET_BLURB = {
  "business-setup":
    "Company, LLP, OPC, Section 8, Nidhi and public registration, foreign-entity India entry, plus Startup India, MSME, IEC and 12A/80G.",

  "corporate-compliance":
    "Annual and event-based ROC compliance — director changes, registered office, share transfers, capital changes, strike-off, KYC, due diligence and ESOP.",

  "fema-foreign-investment":
    "FC-GPR, FC-TRS, FLA returns, and FDI/ODI compliance for cross-border investment.",

  "conversions-restructuring":
    "Company ↔ LLP, public ↔ private, OPC conversions and LLP agreement amendments.",

  "trademark-legal-drafting":
    "Trademark registration, objection and renewal, plus resolutions, agreements, MOUs, shareholders' agreements and SPAs.",
};

const SERVICE_ICONS = [
  '<path d="M6 3h9l3 3v15H6z"/><path d="M15 3v4h4"/><path d="M9 12h6M9 16h6"/>',
  '<path d="M4 7h16M6 4h12v17H6z"/><path d="M9 11h6M9 15h6"/>',
  '<path d="M12 3v18M5 7h14M5 17h14"/><circle cx="12" cy="12" r="8"/>',
  '<path d="M4 6h16v12H4z"/><path d="M8 10l2 2 5-5M8 15h8"/>',
  '<path d="M5 5h14v14H5z"/><path d="M8 9h8M8 13h5M8 17h3"/>',
];

export default function Services() {
  return (
    <>
      <SEO
        title="Services — Suits"
        description="The full Suits service catalogue: business setup, corporate compliance, FEMA & foreign investment, conversions, and trademark & legal drafting."
      />

      {/* HERO */}
      <section className="services-hero">
        <div className="services-hero__image" aria-hidden="true" />

        <div className="container services-hero__inner">
          <Reveal className="services-hero__content">
            <p className="breadcrumb">
              <Link to="/">Home</Link>{" "}
              <span style={{ opacity: 0.5 }}>/</span>{" "}
              Services
            </p>

            <h1>Our services</h1>

            <p className="services-hero__lead">
              Everything a company needs across its lifecycle, organised
              into five clear areas. Explore a bucket, or ask the Suits
              Assistant to point you to the right one.
            </p>

            <div className="hero__cta services-hero__cta">
              <Link className="btn btn--primary" to="/contact">
                Get started
              </Link>

              <Link className="btn btn--ghost" to="/services">
                All services
              </Link>
            </div>

            <div className="services-hero__stats">
              <div className="services-hero__stat">
                <strong>5</strong>
                <span>Service areas</span>
              </div>

              <div className="services-hero__stat">
                <strong>50+</strong>
                <span>Compliance tasks</span>
              </div>

              <div className="services-hero__stat">
                <strong>End-to-end</strong>
                <span>Support</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services-list">
        <div className="container">
          <div className="services-list__intro">
            <p className="eyebrow">What we handle</p>
            <h2>One partner. Every stage.</h2>
          </div>

          <div className="services-list__items">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} className="service-row">
                <div className="service-row__no">
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div className="service-row__icon">
                  <IcoRaw
                    paths={SERVICE_ICONS[i % SERVICE_ICONS.length]}
                    strokeWidth={1.7}
                  />
                </div>

                <div className="service-row__body">
                  <h3>{s.title}</h3>

                  <p>{BUCKET_BLURB[s.slug]}</p>

                  <Link
                    className="service-row__link"
                    to={`/${s.slug}`}
                  >
                    Explore {s.title}
                    <IcoRaw paths={ARROW} strokeWidth={2} />
                  </Link>
                </div>

                <Link
                  className="service-row__arrow"
                  to={`/${s.slug}`}
                  aria-label={`Explore ${s.title}`}
                >
                  <IcoRaw paths={ARROW} strokeWidth={1.8} />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="services-bottom">
        <Reveal className="container services-bottom__inner">
          <div>
            <p className="eyebrow">Need some direction?</p>

            <h2>Not sure which service you need?</h2>

            <p>
              Tell us what you're trying to accomplish and we'll point
              you to the right service.
            </p>
          </div>

          <Link className="btn btn--light" to="/contact">
            Book a consultation
            <IcoRaw paths={ARROW} strokeWidth={2} />
          </Link>
        </Reveal>
      </section>
    </>
  );
}