import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import Reveal from "../components/common/Reveal";

export default function BlogAnnualComplianceCalendar() {
  return (
    <>
      <SEO
        title="The annual compliance calendar for a private limited company — Suits"
        description="A plain-English overview of the recurring filings a private limited company in India should plan for through the year."
      />

      <section className="pagehead">
        <div className="container">
          <Reveal className="pagehead__in">
            <p className="breadcrumb">
              <Link to="/">Home</Link> <span style={{ opacity: 0.5 }}>/</span>{" "}
              <Link to="/blog">Blog</Link> <span style={{ opacity: 0.5 }}>/</span> Compliance
              calendars
            </p>
            <h1>The annual compliance calendar for a private limited company</h1>
            <p className="lead">
              A private limited company has a handful of recurring obligations each year. Here's
              the shape of them, in plain English — so nothing catches you by surprise.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal as="article" className="prose" style={{ marginInline: "auto" }}>
            <p>
              Running a private limited company in India means a set of filings that come around
              every year, plus a few one-time items after incorporation. None of them are
              difficult on their own — the trouble usually comes from losing track of what's due
              and when. This guide gives you the map. (For the exact dates in any given year,
              always confirm the current position, as timelines can change.)
            </p>

            <h2>Just after incorporation</h2>
            <p>
              Before the annual rhythm begins, a new company has a few first-year housekeeping
              tasks — for example, appointing its first auditor, holding its initial board
              meeting, and getting its statutory registers and share certificates in order.
              Getting these right early keeps everything downstream clean.
            </p>

            <h2>The recurring annual filings</h2>
            <ul>
              <li>
                <strong>Annual return</strong> — a yearly return to the Registrar of Companies
                capturing the company's shareholding and management details.
              </li>
              <li>
                <strong>Financial statements</strong> — the audited accounts, filed with the
                Registrar after they're adopted by shareholders.
              </li>
              <li>
                <strong>Director KYC</strong> — each director keeps their KYC current with the
                ministry, or risks their identification number being deactivated.
              </li>
              <li>
                <strong>Board and general meetings</strong> — companies must hold the required
                board meetings through the year and an annual general meeting, with minutes
                properly recorded.
              </li>
            </ul>

            <h2>Event-based filings</h2>
            <p>
              Alongside the annual items, some filings are triggered by things that happen during
              the year — a change of directors, a new registered office, a share transfer, or an
              increase in authorised capital. These have their own timelines from the date of the
              event, so they're easy to miss if you're only watching the annual calendar.
            </p>

            <h2>Why a tracked calendar matters</h2>
            <p>
              Late filings can attract additional fees and, in some cases, knock-on consequences
              for directors. The simplest protection is a maintained compliance calendar with
              reminders ahead of each due date — which is exactly what an ongoing engagement with
              Suits gives you.
            </p>

            <div className="card" style={{ background: "var(--sand)", border: "none", marginTop: "2em" }}>
              <h3 style={{ marginTop: 0 }}>Want this handled for you?</h3>
              <p style={{ marginBottom: 16 }}>
                We track your filings and prepare everything ahead of time, so you never miss a
                deadline.
              </p>
              <Link className="btn btn--primary" to="/contact">
                Talk to Suits
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
