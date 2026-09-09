import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import Reveal from "../components/common/Reveal";
import PostCard from "../components/sections/PostCard";

export default function Blog() {
  return (
    <>
      <SEO
        title="Insights — Suits blog"
        description="Plain-English guides on company registration, FEMA/FDI, trademarks, compliance calendars, and MCA updates from Suits."
      />

      {/* =====================================================
          BLOG HERO
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

          {/* Search only — category filters removed */}
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
              />
            </div>
          </Reveal>

          <Reveal className="grid grid--3 blog-post-grid">

            <PostCard
              to="/blog/annual-compliance-calendar"
              category="Compliance calendars"
              title="The annual compliance calendar for a private limited company"
              meta="6 min read"
            >
              The filings every private limited company should plan for
              through the year.
            </PostCard>

            <PostCard
              to="/contact"
              category="Compliance calendars"
              title="LLP annual filings: what's due and when"
              meta="Coming soon"
            >
              Form 8 and Form 11, explained simply — with a checklist.
            </PostCard>

            <PostCard
              to="/contact"
              category="FEMA / FDI"
              title="FDI into India, explained: a founder's plain-English guide"
              meta="Coming soon"
            >
              How foreign investment works, and what it means for your
              company.
            </PostCard>

            <PostCard
              to="/contact"
              category="FEMA / FDI"
              title="FC-GPR vs FC-TRS: which filing do you need, and when?"
              meta="Coming soon"
            >
              The two most common FEMA equity filings, side by side.
            </PostCard>

            <PostCard
              to="/contact"
              category="FEMA / FDI"
              title="Setting up in India as a foreign company"
              meta="Coming soon"
            >
              Branch vs subsidiary vs liaison office — which fits your
              plans.
            </PostCard>

            <PostCard
              to="/contact"
              category="Trademark"
              title="How to register a trademark in India, step by step"
              meta="Coming soon"
            >
              From search to registration — the full journey, demystified.
            </PostCard>

            <PostCard
              to="/contact"
              category="Trademark"
              title="Got a trademark objection? Here's what to do"
              meta="Coming soon"
            >
              What an objection means and how to respond effectively.
            </PostCard>

            <PostCard
              to="/contact"
              category="Startup guides"
              title="Private Limited vs LLP vs OPC: choosing a structure"
              meta="Coming soon"
            >
              Pick the right entity for how you plan to grow.
            </PostCard>

            <PostCard
              to="/contact"
              category="MCA updates"
              title="Director KYC (DIR-3 KYC): who must file and how"
              meta="Coming soon"
            >
              Keep your directors compliant and avoid deactivation.
            </PostCard>

          </Reveal>

          <p className="blog-note">
            Topics shown are the launch line-up — full articles are being
            written and published progressively.
          </p>

        </div>
      </section>
    </>
  );
}