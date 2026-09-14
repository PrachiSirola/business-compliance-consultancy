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

      <section className="contact-hero">
        <div className="contact-hero__image" aria-hidden="true" />

        <div className="container contact-hero__inner">
          <Reveal className="contact-hero__content">

            <p className="breadcrumb">
              <Link to="/">Home</Link>{" "}
              <span style={{ opacity: 0.5 }}>/</span>{" "}
              Contact
            </p>

            <h1>Get started</h1>

            <span className="contact-hero__divider" />

            <p className="contact-hero__lead">
              Tell us what you need and Deepika will get back within one
              business day. Your first consultation is on us.
            </p>

            <div className="contact-hero__benefits">

              <div className="contact-hero__benefit">
                <div className="contact-hero__icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
                    <path d="M4 13h3v5H4zM17 13h3v5h-3z" />
                    <path d="M7 18c1 2 3 3 5 3h2" />
                  </svg>
                </div>
                <span>Personal<br />support</span>
              </div>

              <div className="contact-hero__benefit">
                <div className="contact-hero__icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="4" y="5" width="16" height="15" rx="2" />
                    <path d="M8 3v4M16 3v4M4 10h16" />
                    <path d="M12 13v4M10 15h4" />
                  </svg>
                </div>
                <span>Response within<br />one business day</span>
              </div>

              <div className="contact-hero__benefit">
                <div className="contact-hero__icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 6h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-4 3v-3H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
                    <path d="M8 12h.01M12 12h.01M16 12h.01" />
                  </svg>
                </div>
                <span>Free initial<br />consultation</span>
              </div>

            </div>

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
