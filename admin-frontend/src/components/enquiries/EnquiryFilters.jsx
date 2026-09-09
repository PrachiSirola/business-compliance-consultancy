export default function EnquiryFilters({ filters, onChange, onExportCSV, onExportExcel, exporting }) {
  function set(key, value) {
    onChange({ ...filters, [key]: value, page: 1 });
  }

  return (
    <div className="toolbar">
      <input
        className="toolbar__search"
        type="search"
        placeholder="Search name, email, phone, message…"
        value={filters.search}
        onChange={(e) => set("search", e.target.value)}
      />
      <select value={filters.status} onChange={(e) => set("status", e.target.value)}>
        <option value="">All statuses</option>
        <option value="new">New</option>
        <option value="contacted">Contacted</option>
        <option value="in-progress">In Progress</option>
        <option value="converted">Converted</option>
        <option value="closed">Closed</option>
      </select>
      <select value={filters.source} onChange={(e) => set("source", e.target.value)}>
        <option value="">All sources</option>
        <option value="Enquiry">Enquiry</option>
        <option value="Feedback">Feedback</option>
        <option value="Chatbot">Chatbot</option>
      </select>
      <select value={filters.archived} onChange={(e) => set("archived", e.target.value)}>
        <option value="false">Active</option>
        <option value="true">Archived</option>
        <option value="all">All</option>
      </select>
      <div className="toolbar__spacer" />
      <button className="btn btn--ghost btn--sm" onClick={onExportCSV} disabled={exporting}>
        {exporting ? "Exporting…" : "Export CSV"}
      </button>
      <button className="btn btn--ghost btn--sm" onClick={onExportExcel} disabled={exporting}>
        {exporting ? "Exporting…" : "Export Excel"}
      </button>
    </div>
  );
}
