import { ICON } from "../../data/icons";

/**
 * Named icon from the shared ICON set.
 * Mirrors the `svg(name, cls)` helper from the original main.js.
 */
export default function Icon({ name, className = "ico", ...rest }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: ICON[name] || "" }}
      {...rest}
    />
  );
}
