import { Link } from "react-router-dom";
import IcoRaw from "../common/IcoRaw";

const ARROW = '<path d="M5 12h14M13 6l6 6-6 6"/>';

/**
 * The homepage "featured service" card: photo, overlapping icon badge,
 * title, blurb, "Learn more" link — matches the approved reference design.
 */
export default function ServiceCard({ to, image, iconPaths, title, children }) {
  return (
    <Link className="card card--photo" to={to}>
      <span className="card__media">
        <img src={image} alt="" loading="lazy" />
        <span className="card__ico card__ico--badge">
          <IcoRaw paths={iconPaths} strokeWidth={1.6} />
        </span>
      </span>
      <div className="card__body">
        <h3>{title}</h3>
        <p>{children}</p>
        <span className="card__link">
          Learn more <IcoRaw paths={ARROW} strokeWidth={2} />
        </span>
      </div>
    </Link>
  );
}