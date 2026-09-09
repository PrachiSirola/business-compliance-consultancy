import Counter from "../common/Counter";

/**
 * One entry in the .stats bar. Pass `count` (+ optional `suffix`) for stats
 * that should animate on scroll (matches [data-count] in the original);
 * otherwise pass `value` for a plain-text stat like "PAN-India" or "1-day".
 */
export default function StatItem({ count, suffix = "", value, label }) {
  return (
    <div className="stat">
      {count != null ? (
        <Counter target={count} suffix={suffix} />
      ) : (
        <span className="stat__num">{value}</span>
      )}
      <span className="stat__lab">{label}</span>
    </div>
  );
}