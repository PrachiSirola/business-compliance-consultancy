import StatusBadge from "../common/StatusBadge";
import { mailtoLink, whatsappLink, telLink } from "../../lib/contactActions";

const STATUSES = ["new", "contacted", "in-progress", "converted", "closed"];

function IconMail() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>;
}
function IconWhatsapp() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4 4V6a1 1 0 0 1 1-1z" /></svg>;
}
function IconPhone() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>;
}
function IconEye() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>;
}
function IconArchive() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="5" rx="1" /><path d="M5 9v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9M10 13h4" /></svg>;
}
function IconTrash() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-9 0 1 12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-12" /></svg>;
}

export default function EnquiryTable({ items, loading, onStatusChange, onView, onViewMessage, onArchiveToggle, onDelete }) {
  if (loading) {
    return (
      <div className="table-card">
        <div className="loading-state">Loading enquiries…</div>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="table-card">
        <div className="empty-state">No enquiries match these filters.</div>
      </div>
    );
  }

  return (
    <div className="table-card">
      <div style={{ overflowX: "auto" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Service / Source</th>
              <th>Message</th>
              <th>Status</th>
              <th>Received</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((e) => (
              <tr key={e._id}>
                <td>
                  <strong>{e.name}</strong>
                </td>
                <td>
                  <div>{e.email || <span className="muted-cell">—</span>}</div>
                  <div className="muted-cell">{e.phone}</div>
                </td>
                <td>
                  <div>{e.service || <span className="muted-cell">—</span>}</div>
                  <div className="muted-cell">{e.source}</div>
                </td>
                <td>
                  {e.message ? (
                    <button
                      type="button"
                      className="msg-preview"
                      onClick={() => onViewMessage(e)}
                      title="Click to read the full message"
                    >
                      {e.message}
                    </button>
                  ) : (
                    <span className="muted-cell">—</span>
                  )}
                </td>
                <td>
                  <select
                    className="status-select"
                    value={e.status}
                    onChange={(ev) => onStatusChange(e, ev.target.value)}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="muted-cell">{new Date(e.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="row-actions">
                    <button className="icon-btn" title="View details" onClick={() => onView(e)}>
                      <IconEye />
                    </button>
                    {e.email && (
                      <a className="icon-btn" title="Email" href={mailtoLink(e)}>
                        <IconMail />
                      </a>
                    )}
                    {e.phone && (
                      <>
                        <a className="icon-btn" title="WhatsApp" href={whatsappLink(e)} target="_blank" rel="noopener noreferrer">
                          <IconWhatsapp />
                        </a>
                        <a className="icon-btn" title="Call" href={telLink(e)}>
                          <IconPhone />
                        </a>
                      </>
                    )}
                    <button className="icon-btn" title={e.archived ? "Unarchive" : "Archive"} onClick={() => onArchiveToggle(e)}>
                      <IconArchive />
                    </button>
                    <button className="icon-btn icon-btn--danger" title="Delete" onClick={() => onDelete(e)}>
                      <IconTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}