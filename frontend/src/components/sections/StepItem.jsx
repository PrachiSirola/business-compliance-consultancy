/**
 * "How it works" step — image on the left, a small numbered badge + title +
 * description stacked on the right. No card border/background: image and
 * text sit directly on the page, matching the approved reference exactly.
 * `illustration` is an inline SVG (generated in code — no photo asset needed).
 */
export default function StepItem({ no, title, children, illustration }) {
  return (
    <div className="step step--inline">
      <div className="step__media">{illustration}</div>
      <div className="step__body">
        <span className="step__badge">{no}</span>
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </div>
  );
}