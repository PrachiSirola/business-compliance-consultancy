import { Link } from "react-router-dom";
import IcoRaw from "../common/IcoRaw";

const ARROW = '<path d="M5 12h14M13 6l6 6-6 6"/>';

/**
 * The repeated "<h3>Title</h3><p>desc</p>Enquire →" card used on every
 * service-bucket page (business-setup, corporate-compliance, etc.).
 */
export default function EnquireCard({ title, children }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{children}</p>
      <Link className="card__link" to="/contact">
        Enquire <IcoRaw paths={ARROW} strokeWidth={2} />
      </Link>
    </div>
  );
}
