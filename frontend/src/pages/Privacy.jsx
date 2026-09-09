import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import Reveal from "../components/common/Reveal";

export default function Privacy() {
  return (
    <>
      <SEO title="Privacy — Suits" description="How Suits handles the information you share through this website." />

      <section className="pagehead">
        <div className="container">
          <Reveal className="pagehead__in">
            <p className="breadcrumb">
              <Link to="/">Home</Link> <span style={{ opacity: 0.5 }}>/</span> Privacy
            </p>
            <h1>Privacy note</h1>
            <p className="lead">
              A short, plain-English summary of how we handle your information. This is a starting
              template — please have it reviewed before you rely on it.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal as="article" className="prose" style={{ marginInline: "auto" }}>
            <h2>What we collect</h2>
            <p>
              When you send an enquiry, sign up for the newsletter, or chat with the Suits
              Assistant, we collect the details you choose to share — typically your name, email,
              phone number, and a description of what you need.
            </p>
            <h2>How we use it</h2>
            <p>
              We use your information only to respond to your enquiry, provide the services you
              ask for, and — if you opt in — to send occasional compliance updates. We don't sell
              your data.
            </p>
            <h2>The Suits Assistant</h2>
            <p>
              Messages you send to the Suits Assistant are used to answer your questions and,
              where relevant, to pass your request to Deepika so she can follow up.
            </p>
            <h2>Newsletter</h2>
            <p>You can unsubscribe from the newsletter at any time using the link in any email we send.</p>
            <h2>Contact</h2>
            <p>
              Questions about your information? Email{" "}
              <a href="mailto:bhardwajkarunesh29@gmail.com">bhardwajkarunesh29@gmail.com</a>.
            </p>
            <p className="muted" style={{ fontSize: ".9rem", marginTop: "2em" }}>
              This template should be reviewed and adapted to your final data practices and any
              applicable law before publication.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
