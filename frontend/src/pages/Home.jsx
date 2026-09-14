import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import Reveal from "../components/common/Reveal";
import IcoRaw from "../components/common/IcoRaw";
import ServiceCard from "../components/sections/ServiceCard";
import FeatureItem from "../components/sections/FeatureItem";
import StepItem from "../components/sections/StepItem";
import {
  RequirementIllustration,
  PrepareIllustration,
  CompliantIllustration,
} from "../components/sections/StepIllustrations";
import QuoteCard from "../components/sections/QuoteCard";
import PostCard from "../components/sections/PostCard";
import StatItem from "../components/sections/StatItem";
import EnquiryForm from "../components/sections/EnquiryForm";

const ARROW = '<path d="M5 12h14M13 6l6 6-6 6"/>';
const SHIELD = '<path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z"/><path d="M9 12l2 2 4-4"/>';
const CLOCK = '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>';
const LOCK = '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>';
const HEADSET = '<path d="M4 13v-1a8 8 0 0 1 16 0v1"/><rect x="3" y="13" width="4" height="6" rx="1.5"/><rect x="17" y="13" width="4" height="6" rx="1.5"/><path d="M19 19v1a2 2 0 0 1-2 2h-3"/>';

export default function Home() {
  return (
    <>
      <SEO
        title="Suits — Corporate compliance, made simple."
        description="Suits is a full-service company-secretarial firm led by CS Deepika — company & LLP registration, FEMA/FDI, trademark, and ongoing compliance, serving clients across India."
      />

      {/* Hero — full-bleed photo background (frontend/public/image/herosection.png),
          full viewport height, text column constrained to the site container so it
          aligns with the header logo, exactly as in the approved reference design. */}
      <section className="hero">
        <div className="hero__inner">
          <Reveal className="hero__content">
            <p className="eyebrow">Company Secretary · FEMA · Trademark</p>
            <h1>
              Corporate compliance, <em>made simple.</em>
            </h1>
            <span className="hero__divider" aria-hidden="true" />
            <p className="hero__sub">
              Registrations, filings, FEMA, and trademarks — handled end to end by CS Deepika,
              so you can get back to running your business.
            </p>
            <div className="hero__cta">
              <Link className="btn btn--primary" to="/contact">
                Get started
                <IcoRaw paths={ARROW} className="ico" strokeWidth={1.8} />
              </Link>
              <Link className="btn btn--ghost" to="/services">
                Explore services
              </Link>
            </div>
          </Reveal>

          <Reveal className="hero__features">
            <div className="hero__feature">
              <span className="hero__feature-ico">
                <IcoRaw paths={SHIELD} strokeWidth={1.7} />
              </span>
              <div>
                <h3>Expert Guidance</h3>
                <p>Get professional advice from an experienced CS.</p>
              </div>
            </div>
            <div className="hero__feature">
              <span className="hero__feature-ico">
                <IcoRaw paths={CLOCK} strokeWidth={1.7} />
              </span>
              <div>
                <h3>Timely Filings</h3>
                <p>On-time submissions, every time.</p>
              </div>
            </div>
            <div className="hero__feature">
              <span className="hero__feature-ico">
                <IcoRaw paths={LOCK} strokeWidth={1.7} />
              </span>
              <div>
                <h3>100% Compliant</h3>
                <p>All filings as per MCA guidelines.</p>
              </div>
            </div>
            <div className="hero__feature">
              <span className="hero__feature-ico">
                <IcoRaw paths={HEADSET} strokeWidth={1.7} />
              </span>
              <div>
                <h3>End-to-End Support</h3>
                <p>We handle it all, so you can focus on growth.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stat bar */}
      <section className="stats">
        <div className="container">
          <div className="stats__grid">
            <StatItem count={41} suffix="+" label="Client companies" />
            <StatItem count={105} suffix="+" label="Companies served" />
            <StatItem value="PAN-India" label="Clients across India" />
            <StatItem value="1-day" label="Typical response time" />
          </div>
        </div>
      </section>

      {/* Featured services — wider "container--wide" so this grid spans
          closer to the full screen width, per approved feedback (not the
          site's normal 1160px container, which every other section keeps). */}
      <section className="section">
        <div className="container container--wide">
          <Reveal className="center" style={{ maxWidth: 1200, marginInline: "auto" }}>
            <p className="eyebrow">What we do</p>

            <h2>Everything a growing company needs, under one roof</h2>

            <p className="lead" style={{ marginInline: "auto" }}>
              From incorporation to FEMA filings and trademarks — organised into five clear areas.
            </p>
          </Reveal>
          <Reveal className="grid grid--4" style={{ marginTop: 40 }}>
            <ServiceCard
              to="/company-registration"
              image="/images/companyregistration.png"
              iconPaths='<path d="M3 21h18M6 21V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v16M14 9h3a1 1 0 0 1 1 1v11M9 8h2M9 12h2M9 16h2"/>'
              title="Company registration"
            >
              Private Limited, OPC, Public & more — incorporated right, first time.
            </ServiceCard>
            <ServiceCard
              to="/llp-registration"
              image="/images/llpregistration.png"
              iconPaths='<rect x="6" y="4" width="12" height="16" rx="2"/><path d="M9 4h6M9 10h6M9 14h4"/>'
              title="LLP registration"
            >
              Limited Liability Partnerships set up with the right agreement in place.
            </ServiceCard>
            <ServiceCard
              to="/fema-foreign-investment"
              image="/images/fimafdi.png"
              iconPaths='<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9S14.5 18.5 12 21M12 3C9.5 5.5 8.5 9 8.5 12S9.5 18.5 12 21"/>'
              title="FEMA / FDI"
            >
              FC-GPR, FC-TRS, FLA and FDI/ODI filings handled accurately and on time.
            </ServiceCard>
            <ServiceCard
              to="/trademark"
              image="/images/trademark.png"
              iconPaths='<path d="M3 12l8-8h7v7l-8 8-7-7z"/><circle cx="14.5" cy="7.5" r="1.3"/>'
              title="Trademark"
            >
              Protect your brand — registration, objection replies, and renewals.
            </ServiceCard>
            <ServiceCard
              to="/corporate-compliance"
              image="/images/annualcompliance.png"
              iconPaths='<path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z"/><path d="M9 12l2 2 4-4"/>'
              title="Annual compliance"
            >
              ROC filings and event-based work tracked, so you never miss a deadline.
            </ServiceCard>
            <ServiceCard
              to="/india-entry"
              image="/images/indiaentry.png"
              iconPaths='<path d="M3 21h18M5 21V8l7-4 7 4v13M9 21v-5h6v5"/>'
              title="India entry"
            >
              Branch, liaison, project office or subsidiary for foreign companies.
            </ServiceCard>
            <ServiceCard
              to="/conversions-restructuring"
              image="/images/conversions.png"
              iconPaths='<path d="M4 8h13M4 8l3-3M4 8l3 3M20 16H7M20 16l-3-3M20 16l-3 3"/>'
              title="Conversions"
            >
              Company ↔ LLP, public ↔ private and OPC conversions, done cleanly.
            </ServiceCard>
            <ServiceCard
              to="/legal-drafting"
              image="/images/legaldrafting.png"
              iconPaths='<path d="M20 4C10 6 6 12 5 19M20 4c0 6-3 11-9 12l-3 1 1-3M20 4l-7 7"/>'
              title="Legal drafting"
            >
              Resolutions, agreements, MOUs and shareholders' agreements, drafted well.
            </ServiceCard>
          </Reveal>
          <div className="center" style={{ marginTop: 34 }}>
            <Link className="btn btn--ghost" to="/services">
              View all services
            </Link>
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="section band">
        <div className="container">
          <div className="split">
            <Reveal>
              <p className="eyebrow" style={{ color: "var(--hero-gold, #B8863C)" }}>
                Why Suits
              </p>
              <h2>A partner who treats your compliance like her own</h2>
              <span className="section-divider" aria-hidden="true" />
              <p className="lead">
                No junior-only handling, no jargon, no surprises. Just clear guidance and
                dependable filings — wherever you are in India.
              </p>
              <Link className="btn btn--primary" to="/about" style={{ marginTop: 10 }}>
                Meet Deepika
              </Link>
            </Reveal>
            <Reveal className="grid why-features">
              <FeatureItem
                iconPaths='<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9S14.5 18.5 12 21M12 3C9.5 5.5 8.5 9 8.5 12S9.5 18.5 12 21"/>'
                title="FEMA & foreign expertise"
              >
                Confident handling of cross-border investment and RBI filings.
              </FeatureItem>
              <FeatureItem
                iconPaths='<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>'
                title="Personal attention"
              >
                You work directly with Deepika — not a call centre.
              </FeatureItem>
              <FeatureItem
                iconPaths='<path d="M13 3L5 13h6l-1 8 8-10h-6l1-8z"/>'
                title="Fast turnaround"
              >
                Prompt replies and filings that respect your deadlines.
              </FeatureItem>
              <FeatureItem
                iconPaths='<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 12l3 3 5-6"/>'
                title="Transparent process"
              >
                You always know what's happening and what's next.
              </FeatureItem>
            </Reveal>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section">
        <div className="container">
          <Reveal className="center" style={{ maxWidth: 560, marginInline: "auto" }}>
            <p className="eyebrow">How it works</p>
            <h2>Getting started takes five minutes</h2>
          </Reveal>
          <Reveal className="steps steps--photo" style={{ marginTop: 38 }}>
            <StepItem no="01" title="Tell us what you need" illustration={<RequirementIllustration />}>
              Share your requirement by form, call, or the Suits Assistant.
            </StepItem>
            <StepItem no="02" title="We prepare & file" illustration={<PrepareIllustration />}>
              Deepika handles the documents and filings, keeping you updated.
            </StepItem>
            <StepItem no="03" title="You stay compliant" illustration={<CompliantIllustration />}>
              Approvals, acknowledgements, and reminders for what's next.
            </StepItem>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section band">
        <div className="container">
          <Reveal className="center" style={{ maxWidth: 560, marginInline: "auto" }}>
            <p className="eyebrow">In their words</p>
            <h2>Trusted by founders and firms</h2>
          </Reveal>
          <Reveal className="grid grid--3" style={{ marginTop: 36 }}>
            <QuoteCard
              text="Deepika made our company registration effortless and explained every step in plain language."
              initials="RS"
              name="Rahul Sharma"
              role="Founder"
            />
            <QuoteCard
              text="Our FEMA filings were handled quickly and correctly. Exactly the expertise we needed."
              initials="AN"
              name="Aisha Nair"
              role="Director"
            />
            <QuoteCard
              text="Reliable, responsive, and always on top of our deadlines. Highly recommended."
              initials="VM"
              name="Vikram Mehta"
              role="CFO"
            />
          </Reveal>
          <p className="center muted" style={{ marginTop: 22, fontSize: ".86rem" }}>
            Sample testimonials shown — real client feedback will replace these.
          </p>
        </div>
      </section>

      {/* Lead form */}
      <section className="section contact-section" id="enquiry">
        <div className="container">
          <div className="contact-layout">
            <Reveal>
              <EnquiryForm idPrefix="h" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Blog preview */}
      {/* Insights */}
      <section className="section band insights-section">
        <div className="container">

          <Reveal className="insights-heading">
            <p className="eyebrow">Insights</p>

            <h2>Guides to stay ahead of compliance</h2>

            <p className="insights-intro">
              Actionable guides and updates to help your business stay compliant, avoid penalties, and grow with confidence.
            </p>
          </Reveal>

          <Reveal className="insights-grid">

            {/* Card 1 */}
            <Link
              className="insight-card"
              to="/blog/annual-compliance-calendar"
            >
              <div className="insight-card__image">
                <img
                  src="/images/image1.png"
                  alt="Annual compliance calendar and business documents"
                />
              </div>

              <div className="insight-card__body">
                <span className="insight-card__category">
                  Compliance calendars
                </span>

                <h3>
                  The annual compliance calendar for a private limited company
                </h3>

                <p>
                  The filings every private limited company should plan for
                  through the year.
                </p>

                <div className="insight-card__bottom">
                  <span>6 min read</span>

                  <span className="insight-card__arrow" aria-hidden="true">
                    →
                  </span>
                </div>
              </div>
            </Link>

            {/* Card 2 */}
            <Link
              className="insight-card"
              to="/blog"
            >
              <div className="insight-card__image">
                <img
                  src="/images/image2.png"
                  alt="FEMA and FDI compliance guidance"
                />
              </div>

              <div className="insight-card__body">
                <span className="insight-card__category">
                  FEMA / FDI
                </span>

                <h3>
                  FC-GPR vs FC-TRS: which filing do you need?
                </h3>

                <p>
                  A plain-English guide to the two most common FEMA equity
                  filings.
                </p>

                <div className="insight-card__bottom">
                  <span>5 min read</span>

                  <span className="insight-card__arrow" aria-hidden="true">
                    →
                  </span>
                </div>
              </div>
            </Link>

            {/* Card 3 */}
            <Link
              className="insight-card"
              to="/blog"
            >
              <div className="insight-card__image">
                <img
                  src="/images/image3.png"
                  alt="Private Limited, LLP and OPC business structures"
                />
              </div>

              <div className="insight-card__body">
                <span className="insight-card__category">
                  Startup guides
                </span>

                <h3>
                  Private Limited vs LLP vs OPC: choosing a structure
                </h3>

                <p>
                  How to pick the right entity for how you plan to grow.
                </p>

                <div className="insight-card__bottom">
                  <span>7 min read</span>

                  <span className="insight-card__arrow" aria-hidden="true">
                    →
                  </span>
                </div>
              </div>
            </Link>

          </Reveal>

          <div className="insights-button">
            <Link className="btn btn--ghost" to="/blog">
              Read the blog
              <span aria-hidden="true">→</span>
            </Link>
          </div>

        </div>
      </section>

      {/* Closing CTA */}
      <section className="cta-final">
        <div className="cta-final__inner">
          <div className="cta-final__ornament" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--hero-gold)" strokeWidth="1.6">
              <path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.4l-6.4 4.8 2.4-7.2-6-4.8h7.6z" />
            </svg>
          </div>
          <h2>Ready to make compliance hassle-free?</h2>
          <p className="cta-final__sub">Start with a free consultation.</p>
          <div className="cta-final__btns">
            <Link className="btn cta-final__btn-primary" to="/contact">
              Get started <span aria-hidden="true">→</span>
            </Link>
            <a
              className="btn cta-final__btn-ghost"
              href="https://wa.me/918218518915"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4 4V6a1 1 0 0 1 1-1z"/></svg>
              Message on WhatsApp
            </a>
          </div>
          <div className="cta-final__trust">
            <div className="cta-final__trust-item">
              <span className="cta-final__trust-ico">
                <IcoRaw paths={SHIELD} strokeWidth={1.5} />
              </span>
              <div>
                <strong>Trusted by 41+</strong>
                <span>client companies</span>
              </div>
            </div>
            <div className="cta-final__trust-item">
              <span className="cta-final__trust-ico">
                <IcoRaw paths='<path d="M3 21h18M6 21V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v16M14 9h3a1 1 0 0 1 1 1v11"/>' strokeWidth={1.5} />
              </span>
              <div>
                <strong>105+</strong>
                <span>compliances delivered</span>
              </div>
            </div>
            <div className="cta-final__trust-item">
              <span className="cta-final__trust-ico">
                <IcoRaw paths='<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9S14.5 18.5 12 21M12 3C9.5 5.5 8.5 9 8.5 12S9.5 18.5 12 21"/>' strokeWidth={1.5} />
              </span>
              <div>
                <strong>PAN-India</strong>
                <span>clients across India</span>
              </div>
            </div>
            <div className="cta-final__trust-item">
              <span className="cta-final__trust-ico">
                <IcoRaw paths={CLOCK} strokeWidth={1.5} />
              </span>
              <div>
                <strong>1-day</strong>
                <span>typical response time</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}