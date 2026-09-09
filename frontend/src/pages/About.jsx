import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import Reveal from "../components/common/Reveal";
import IcoRaw from "../components/common/IcoRaw";
import FeatureItem from "../components/sections/FeatureItem";
import StatItem from "../components/sections/StatItem";

const ARROW = '<path d="M5 12h14M13 6l6 6-6 6"/>';
const SHIELD = '<path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z"/><path d="M9 12l2 2 4-4"/>';
const PEOPLE =
  '<circle cx="8" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><path d="M2 21c0-3 3-5 6-5s6 2 6 5"/><path d="M12 21c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4"/>';
const GROWTH = '<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>';

export default function About() {
  return (
    <>
      <SEO
        title="About CS Deepika — Suits"
        description="Meet CS Deepika — a Company Secretary specialising in corporate law, FEMA, and trademark, leading Suits as a full-service, PAN-India, fully-remote practice."
      />

      <section className="about-hero">
        <div className="container about-hero__inner">
          <Reveal className="about-hero__text">
            <p className="eyebrow">About us</p>
            <h1>
              Compliance handled with <em>care.</em>
            </h1>
            <p className="lead">
              Suits is a full-service company-secretarial practice led by CS Deepika — built to
              take the stress of corporate compliance off your plate.
            </p>
            <div className="hero__cta" style={{ marginTop: 26 }}>
              <Link className="btn btn--primary" to="/contact">
                Get started
                <IcoRaw paths={ARROW} className="ico" strokeWidth={1.8} />
              </Link>
              <Link className="btn btn--ghost" to="/services">
                Our services
              </Link>
            </div>
            <div className="about-hero__badges">
              <div className="about-hero__badge">
                <span className="about-hero__badge-ico">
                  <IcoRaw paths={SHIELD} strokeWidth={1.6} />
                </span>
                <div>
                  <h3>Trusted Guidance</h3>
                  <p>For every business stage</p>
                </div>
              </div>
              <div className="about-hero__badge">
                <span className="about-hero__badge-ico">
                  <IcoRaw paths={PEOPLE} strokeWidth={1.6} />
                </span>
                <div>
                  <h3>Client-First Approach</h3>
                  <p>Simple, responsive & reliable</p>
                </div>
              </div>
              <div className="about-hero__badge">
                <span className="about-hero__badge-ico">
                  <IcoRaw paths={GROWTH} strokeWidth={1.6} />
                </span>
                <div>
                  <h3>Long-Term Partnership</h3>
                  <p>Your compliance ally</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="about-hero__media">
            <img src="/images/aboutcs.png" alt="CS Deepika's workspace — compliance, made simple" />
          </Reveal>
        </div>
      </section>

      {/* Founder note */}
      <section className="section">
        <div className="container">
          <div className="split">
            <Reveal>
              <p className="eyebrow">Founder's note</p>
              <h2>A note from Deepika</h2>
              <p>
                "I became a Company Secretary because I enjoy turning complicated regulation into
                clear, doable steps. Too many good businesses lose time and sleep over compliance
                that should be routine.
              </p>
              <p>
                I started Suits to be the partner I'd want in my corner — someone who picks up the
                phone, explains things plainly, and gets the filings done right. Whether you're
                incorporating your first company, bringing in foreign investment, or protecting
                your brand, you'll work with me directly, not a queue."
              </p>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  color: "var(--espresso)",
                  marginTop: 6,
                }}
              >
                — CS Deepika, Founder
              </p>
            </Reveal>
            <Reveal className="card" style={{ padding: 0, overflow: "hidden" }}>
              <div
                style={{
                  background: "var(--sand)",
                  padding: 34,
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                }}
              >
                <p className="eyebrow" style={{ margin: 0 }}>
                  Areas of expertise
                </p>
                <FeatureItem iconPaths='<path d="M3 21h18M6 21V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v16M14 9h3a1 1 0 0 1 1 1v11"/>' title="Company law">
                  Incorporation, compliance and restructuring.
                </FeatureItem>
                <FeatureItem iconPaths='<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9S14.5 18.5 12 21"/>' title="FEMA & foreign investment">
                  FC-GPR, FC-TRS, FLA, FDI and ODI.
                </FeatureItem>
                <FeatureItem iconPaths='<path d="M3 12l8-8h7v7l-8 8-7-7z"/><circle cx="14.5" cy="7.5" r="1.3"/>' title="Trademark">
                  Registration, objections and renewals.
                </FeatureItem>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats">
        <div className="container">
          <div className="stats__grid">
            <StatItem count={41} suffix="+" label="Client companies" />
            <StatItem count={105} suffix="+" label="Companies served" />
            <StatItem value="PAN-India" label="Across India" />
            <StatItem value="CS" label="Qualified Company Secretary" />
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="section band">
        <div className="container">
          <Reveal className="center" style={{ maxWidth: 560, marginInline: "auto" }}>
            <p className="eyebrow">How we work</p>
            <h2>What working with Suits feels like</h2>
          </Reveal>
          <Reveal className="grid grid--3" style={{ marginTop: 36 }}>
            <div className="card">
              <div className="card__ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />
                </svg>
              </div>
              <h3>Personal attention</h3>
              <p>You work with Deepika directly — no junior-only handling, no call centre.</p>
            </div>
            <div className="card">
              <div className="card__ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="4" y="4" width="16" height="16" rx="3" />
                  <path d="M8 12l3 3 5-6" />
                </svg>
              </div>
              <h3>Plain language</h3>
              <p>Clear explanations and honest advice — never jargon for its own sake.</p>
            </div>
            <div className="card">
              <div className="card__ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
                </svg>
              </div>
              <h3>Easy to reach</h3>
              <p>Responsive over email, call, and WhatsApp — quick answers when you need them.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section band--teal">
        <Reveal className="container center" style={{ maxWidth: 620, marginInline: "auto" }}>
          <h2>Let's work together</h2>
          <p className="lead" style={{ color: "#fff", opacity: 0.92, marginInline: "auto" }}>
            Reach out for anything from a single filing to ongoing retainer support.
          </p>
          <div className="hero__cta" style={{ justifyContent: "center", marginTop: 20 }}>
            <Link className="btn btn--light" to="/contact">
              Get started
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}