import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";
import StatCard from "../components/common/StatCard";

const CARD_DEFS = [
  { key: "total", label: "Total enquiries", accent: true },
  { key: "new", label: "New" },
  { key: "contacted", label: "Contacted" },
  { key: "in-progress", label: "In Progress" },
  { key: "converted", label: "Converted" },
  { key: "closed", label: "Closed" },
];

export default function Overview() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .stats()
      .then(setStats)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <>
      {error && <div className="login-error">{error}</div>}

      {!stats && !error && <div className="loading-state">Loading stats…</div>}

      {stats && (
        <div className="stat-grid">
          {CARD_DEFS.map((c) => (
            <StatCard key={c.key} label={c.label} value={stats[c.key] ?? 0} accent={c.accent} />
          ))}
        </div>
      )}

      <div className="table-card" style={{ padding: 26 }}>
        <h2 style={{ marginBottom: 8 }}>Welcome back</h2>
        <p className="muted" style={{ marginBottom: 16 }}>
          New enquiries submitted on the public website — through the contact form, service
          pages, or the Suits Assistant chatbot — appear automatically in{" "}
          <Link to="/enquiries">Enquiries</Link>.
        </p>
        <Link className="btn btn--primary" to="/enquiries">
          View all enquiries
        </Link>
      </div>
    </>
  );
}
