const LABELS = {
  new: "New",
  contacted: "Contacted",
  "in-progress": "In Progress",
  converted: "Converted",
  closed: "Closed",
};

export default function StatusBadge({ status }) {
  return <span className={`badge badge--${status}`}>{LABELS[status] || status}</span>;
}
