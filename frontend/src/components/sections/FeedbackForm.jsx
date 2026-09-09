import { useLeadForm } from "./useLeadForm";

export default function FeedbackForm() {
  const { errors, submitted, handleSubmit } = useLeadForm("Feedback");

  return (
    <div className="card reveal" style={{ padding: 28 }}>
      <div className={"form__ok" + (submitted ? "" : " hidden")}>
        Thank you — we appreciate you taking the time to share this.
      </div>
      <form className="form" data-lead="Feedback" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="f-name">Name</label>
          <input id="f-name" name="name" required />
          <span className="field__err">{errors.name}</span>
        </div>
        <div className="field">
          <label htmlFor="f-rating">How was your experience?</label>
          <select id="f-rating" name="rating" defaultValue="★★★★★ Excellent">
            <option>★★★★★ Excellent</option>
            <option>★★★★ Good</option>
            <option>★★★ Okay</option>
            <option>★★ Needs work</option>
            <option>★ Poor</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="f-msg">Your feedback</label>
          <textarea
            id="f-msg"
            name="message"
            required
            placeholder="Tell us what went well or what we could do better"
          />
          <span className="field__err">{errors.message}</span>
        </div>
        <button className="btn btn--primary" type="submit">
          Share feedback
        </button>
      </form>
    </div>
  );
}