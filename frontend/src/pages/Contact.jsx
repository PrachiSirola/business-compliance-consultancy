import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import Reveal from "../components/common/Reveal";
import EnquiryForm from "../components/sections/EnquiryForm";
import FeedbackForm from "../components/sections/FeedbackForm";

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact Suits — Get started"
        description="Contact Suits — call or WhatsApp +91 82185 18915, email us, or send an enquiry. First consultation on us. Serving clients across India."
      />

      <section className="pagehead">
        <div className="container">
          <Reveal className="pagehead__in">
            <p className="breadcrumb">
              <Link to="/">Home</Link> <span style={{ opacity: 0.5 }}>/</span> Contact
            </p>
            <h1>Get started</h1>
            <p className="lead">
              Tell us what you need and Deepika will get back within one business day. Your first
              consultation is on us.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section contact-section">
        <div className="container">
         <div className="contact-layout">
            {/* Enquiry form */}
            <Reveal>
              <EnquiryForm idPrefix="c" showTimeField />
            </Reveal>

            {/* Details + WhatsApp */}
            
          </div>
        </div>
      </section>

      {/* Feedback */}
      <section className="section band">
        <div className="container">
          <div className="split" style={{ alignItems: "start" }}>
            <Reveal>
              <p className="eyebrow">Feedback</p>
              <h2>Worked with us before?</h2>
              <p className="lead">
                We'd love to hear how it went — your feedback helps us improve, and may feature
                (with your permission) as a testimonial.
              </p>
            </Reveal>
            <FeedbackForm />
          </div>
        </div>
      </section>
    </>
  );
}
