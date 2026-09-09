import { useLeadForm } from "./useLeadForm";

/**
 * Enquiry form used on Home and Contact pages.
 */
export default function EnquiryForm({ idPrefix = "c", showTimeField = false }) {
  const { errors, submitted, handleSubmit } = useLeadForm("Enquiry");
  const id = (suffix) => `${idPrefix}-${suffix}`;

  return (
    <div className="enquiry-box">
      {/* LEFT CONTENT */}
      <div className="enquiry-box__intro">
        <p className="eyebrow">Get started</p>

        <h2>
          Tell us what you're
          <br />
          working on
        </h2>

        <span className="hero__divider" />

        <p className="enquiry-box__description">
          Send a quick enquiry and Deepika will get back within one business
          day. Your first consultation is on us.
        </p>

        <div className="enquiry-box__contact">
          <div className="enquiry-box__phone">
            <span>⌕</span>
          </div>

          <div>
            <strong>Prefer to talk?</strong>
            <p>Call or WhatsApp +91 82185 18915</p>
          </div>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="enquiry-box__form">
        <div className={"form__ok" + (submitted ? "" : " hidden")}>
          Thanks — your enquiry is on its way. Deepika will be in touch
          shortly.
        </div>

        <form
          className="form"
          data-lead="Enquiry"
          onSubmit={handleSubmit}
        >
          {/* Name */}
          <div className="field">
            <label htmlFor={id("name")}>Name</label>

            <input
              id={id("name")}
              name="name"
              placeholder="Enter your name"
              required
            />

            <span className="field__err">{errors.name}</span>
          </div>

          {/* Email + Phone */}
          <div className="field--row">
            <div className="field">
              <label htmlFor={id("email")}>Email</label>

              <input
                id={id("email")}
                type="email"
                name="email"
                placeholder="Enter your email"
                required
              />

              <span className="field__err">{errors.email}</span>
            </div>

            <div className="field">
              <label htmlFor={id("phone")}>Phone</label>

              <input
                id={id("phone")}
                name="phone"
                placeholder="Enter your phone number"
                required
              />

              <span className="field__err">{errors.phone}</span>
            </div>
          </div>

          {/* Service */}
          <div className="field">
            <label htmlFor={id("service")}>Service needed</label>

            <select
              id={id("service")}
              name="service"
              defaultValue="Business Setup"
            >
              <option>Business Setup</option>
              <option>Corporate Compliance</option>
              <option>FEMA & Foreign Investment</option>
              <option>Conversions & Restructuring</option>
              <option>Trademark & Legal Drafting</option>
              <option>Not sure yet</option>
            </select>
          </div>

          {/* Preferred callback time — Contact page only */}
          {showTimeField && (
            <div className="field">
              <label htmlFor={id("time")}>
                Preferred callback time
              </label>

              <select
                id={id("time")}
                name="preferredTime"
                defaultValue="Morning (11:00–13:00)"
              >
                <option>Morning (11:00–13:00)</option>
                <option>Afternoon (13:00–16:00)</option>
                <option>Late afternoon (16:00–18:00)</option>
                <option>Any time</option>
              </select>
            </div>
          )}

          {/* Message */}
          <div className="field">
            <label htmlFor={id("msg")}>Message</label>

            <textarea
              id={id("msg")}
              name="message"
              placeholder="A line or two about what you need"
            />
          </div>

          {/* Submit */}
          <button className="btn btn--primary" type="submit">
            Send enquiry
          </button>

          <p className="form__note">
            By sending this you agree to be contacted about your enquiry.
          </p>
        </form>
      </div>
    </div>
  );
}