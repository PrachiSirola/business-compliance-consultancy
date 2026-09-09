export default function StatCard({ label, value, accent }) {
  return (
    <div className={"stat-card" + (accent ? " stat-card--accent" : "")}>
      <div className="stat-card__num">{value}</div>
      <div className="stat-card__lab">{label}</div>
    </div>
  );
}
