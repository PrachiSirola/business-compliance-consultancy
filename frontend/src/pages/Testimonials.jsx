import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import Reveal from "../components/common/Reveal";
import QuoteCard from "../components/sections/QuoteCard";

export default function Testimonials() {
  return (
    <>
      <SEO title="Testimonials — Suits" description="What clients say about working with Suits and CS Deepika." />

      <section className="pagehead">
        <div className="container">
          <Reveal className="pagehead__in">
            <p className="breadcrumb">
              <Link to="/">Home</Link> <span style={{ opacity: 0.5 }}>/</span> Testimonials
            </p>
            <h1>What clients say</h1>
            <p className="lead">
              A few words from the founders and firms Deepika has worked with. Sample quotes are
              shown for now — real client feedback will replace these.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="grid grid--3">
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
            <QuoteCard
              text="Set up our LLP and the agreement without a hitch. Clear, professional, and quick."
              initials="PK"
              name="Priya Kulkarni"
              role="Co-founder"
            />
            <QuoteCard
              text="As a foreign company entering India, we had a lot of questions. Deepika answered every one."
              initials="DL"
              name="Daniel Lee"
              role="Country Manager"
            />
            <QuoteCard
              text="Our trademark was filed correctly and the objection handled smoothly. Great experience."
              initials="SM"
              name="Sana Malik"
              role="Brand Owner"
            />
          </Reveal>

          <div className="center" style={{ marginTop: 44 }}>
            <Reveal as={Link} className="btn btn--primary" to="/contact">
              Work with Suits
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
