import { Link } from "react-router-dom";

export default function PostCard({ to, category, title, children, meta }) {
  return (
    <Link className="post" to={to}>
      <div className="post__body">
        <span className="post__cat">{category}</span>
        <h3>{title}</h3>
        <p>{children}</p>
        <span className="post__meta">{meta}</span>
      </div>
    </Link>
  );
}
