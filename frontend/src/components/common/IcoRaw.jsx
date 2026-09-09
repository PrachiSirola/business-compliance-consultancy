/**
 * Renders a one-off inline SVG icon from raw path/shape markup.
 * Used for the many ad-hoc <svg><path .../></svg> icons that appear inline
 * throughout the original page markup (card icons, arrow links, features)
 * so the exact original path data is preserved without hand-converting
 * every attribute to JSX camelCase.
 */
export default function IcoRaw({
  paths,
  className,
  viewBox = "0 0 24 24",
  fill = "none",
  stroke = "currentColor",
  strokeWidth = 1.8,
}) {
  return (
    <svg
      className={className}
      viewBox={viewBox}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      dangerouslySetInnerHTML={{ __html: paths }}
    />
  );
}
