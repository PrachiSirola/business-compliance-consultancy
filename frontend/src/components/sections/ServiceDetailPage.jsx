import { Link } from "react-router-dom";
import SEO from "../common/SEO";
import Reveal from "../common/Reveal";
import SvcIcon from "./svcIcons";

/**
 * Shared layout for all 5 service-bucket detail pages (Business Setup,
 * Corporate Compliance, FEMA & Foreign Investment, Conversions &
 * Restructuring, Trademark & Legal Drafting) — a premium hero with a
 * right-side image, and a 3-column card grid below.
 *
 * `heroImage` is the hero's right-side background image for this page.
 * `icon` is the default card icon (from svcIcons) used for every card that
 * doesn't specify its own `icon` — Business Setup's cards each carry their
 * own icon key; the other pages just pass one page-level `icon`.
 */
export default function ServiceDetailPage({
  title,
  seoTitle,
  seoDescription,
  lead,
  heroImage,
  icon,
  cards,
}) {
  return (
    <>
      <SEO title={seoTitle} description={seoDescription} />

      <section className="svc-hero">
        <div className="svc-hero__background" style={{ backgroundImage: `url(${heroImage})` }} />

        <div className="svc-hero__inner">
          <Reveal className="svc-hero__text">
            <p className="breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <Link to="/services">Services</Link>
              <span>/</span>
              {title}
            </p>

            <h1>{title}</h1>

            <p className="svc-hero__lead">{lead}</p>

            <div className="svc-hero__btns">
              <Link className="btn btn--primary" to="/contact">
                Get started <span>→</span>
              </Link>
              <Link className="btn btn--ghost" to="/services">
                All services
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="svc-cards">
        <div className="svc-cards__inner">
          <Reveal className="svc-cards__grid">
            {cards.map((card) => (
              <article className="svc-card" key={card.title}>
                <SvcIcon name={card.icon || icon} />

                <div className="svc-card__body">
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                  <Link className="svc-card__link" to="/contact">
                    Enquire <span>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </Reveal>
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