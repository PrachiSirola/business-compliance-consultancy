import { Link } from "react-router-dom";
import { API_BASE } from "../../lib/api";

export default function PostCard({ to, category, title, children, meta, image }) {
  const imgSrc = image
    ? image.startsWith("http") ? image : `${API_BASE}${image}`
    : "";

  return (
    <Link className="post" to={to}>
      {imgSrc && (
        <div className="post__img">
          <img src={imgSrc} alt="" loading="lazy" />
        </div>
      )}
      <div className="post__body">
        <span className="post__cat">{category}</span>
        <h3>{title}</h3>
        <p>{children}</p>
        {meta && <span className="post__meta">{meta}</span>}
      </div>
    </Link>
  );
}